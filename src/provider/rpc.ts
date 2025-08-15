import { RPC08, RPC09 } from '../channel';
import { config } from '../global/config';
import { SupportedRpcVersion } from '../global/constants';
import { logger } from '../global/logger';
import {
  AccountInvocations,
  BigNumberish,
  Block,
  BlockIdentifier,
  BlockTag,
  Call,
  ContractClassIdentifier,
  ContractClassResponse,
  ContractVersion,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  type fastWaitForTransactionOptions,
  type GasPrices,
  GetBlockResponse,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  GetTransactionReceiptResponse,
  GetTxReceiptResponseWithoutHelper,
  Invocation,
  Invocations,
  InvocationsDetailsWithNonce,
  PendingBlock,
  PreConfirmedStateUpdate,
  RPC,
  RpcProviderOptions,
  type Signature,
  StateUpdate,
  StateUpdateResponse,
  type TypedData,
  waitForTransactionOptions,
} from '../types';
import { ETransactionType, RPCSPEC08, RPCSPEC09 } from '../types/api';
import assert from '../utils/assert';
import { getAbiContractVersion } from '../utils/calldata/cairo';
import { extractContractHashes, isSierra } from '../utils/contract';
import { LibraryError } from '../utils/errors';
import { solidityUint256PackedKeccak256 } from '../utils/hash';
import { toHex } from '../utils/num';
import { wait } from '../utils/provider';
import { isSupportedSpecVersion, isVersion } from '../utils/resolve';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { getTipStatsFromBlocks, TipAnalysisOptions, TipEstimate } from './modules/tip';
import { createTransactionReceipt } from '../utils/transactionReceipt/transactionReceipt';
import { ProviderInterface } from './interface';
import type {
  DeclaredTransaction,
  DeployedAccountTransaction,
  InvokedTransaction,
  L1_HANDLER_TXN,
  TransactionWithHash,
} from './types/spec.type';
import { verifyMessageInStarknet } from './modules/verifyMessageInStarknet';
import { getGasPrices } from './modules';

export class RpcProvider implements ProviderInterface {
  public responseParser: RPCResponseParser;

  public channel: RPC08.RpcChannel | RPC09.RpcChannel;

  constructor(optionsOrProvider?: RpcProviderOptions | ProviderInterface | RpcProvider) {
    if (optionsOrProvider && 'channel' in optionsOrProvider) {
      this.channel = optionsOrProvider.channel;
      this.responseParser =
        'responseParser' in optionsOrProvider
          ? optionsOrProvider.responseParser
          : new RPCResponseParser();
    } else {
      const options = optionsOrProvider as RpcProviderOptions | undefined;
      if (options && options.specVersion) {
        if (isVersion('0.8', options.specVersion)) {
          this.channel = new RPC08.RpcChannel({ ...options, waitMode: false });
        } else if (isVersion('0.9', options.specVersion)) {
          this.channel = new RPC09.RpcChannel({ ...options, waitMode: false });
        } else throw new Error(`unsupported channel for spec version: ${options.specVersion}`);
      } else if (isVersion('0.8', config.get('rpcVersion'))) {
        // default channel when unspecified
        this.channel = new RPC08.RpcChannel({ ...options, waitMode: false });
      } else if (isVersion('0.9', config.get('rpcVersion'))) {
        // default channel when unspecified
        this.channel = new RPC09.RpcChannel({ ...options, waitMode: false });
      } else throw new Error('unable to define spec version for channel');

      this.responseParser = new RPCResponseParser(options?.resourceBoundsOverhead);
    }
  }

  /**
   * auto configure channel based on provided node
   * leave space for other async before constructor
   */
  // NOTE: the generic T and 'this' reference are used so that the expanded class is generated when a mixin is applied
  static async create<T extends RpcProvider>(
    this: { new (...args: ConstructorParameters<typeof RpcProvider>): T },
    optionsOrProvider?: RpcProviderOptions
  ): Promise<T> {
    const channel = new RPC08.RpcChannel({ ...optionsOrProvider });
    const spec = await channel.getSpecVersion();

    // Optimistic Warning in case of the patch version
    if (!isSupportedSpecVersion(spec)) {
      logger.warn(`Using incompatible node spec version ${spec}`);
    }

    if (isVersion('0.8', spec)) {
      return new this({
        ...optionsOrProvider,
        specVersion: SupportedRpcVersion.v0_8_1,
      }) as T;
    }
    if (isVersion('0.9', spec)) {
      return new this({
        ...optionsOrProvider,
        specVersion: SupportedRpcVersion.v0_9_0,
      }) as T;
    }

    throw new LibraryError(
      `Provided RPC node specification version ${spec} is not compatible with the SDK. SDK supported RPC versions ${Object.keys(SupportedRpcVersion).toString()}`
    );
  }

  public fetch(method: string, params?: object, id: string | number = 0) {
    return this.channel.fetch(method, params, id);
  }

  public async getChainId() {
    return this.channel.getChainId();
  }

  public readSpecVersion() {
    return this.channel.readSpecVersion();
  }

  public async getSpecVersion() {
    return this.channel.getSpecVersion();
  }

  public setUpSpecVersion() {
    return this.channel.setUpSpecVersion();
  }

  public async getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return this.channel.getNonceForAddress(contractAddress, blockIdentifier);
  }

  public async getBlock(): Promise<PendingBlock>;
  public async getBlock(blockIdentifier: 'pre_confirmed'): Promise<PendingBlock>;
  public async getBlock(blockIdentifier: 'latest'): Promise<Block>;
  public async getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;
  public async getBlock(blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getBlockWithTxHashes(blockIdentifier)
      .then(this.responseParser.parseGetBlockResponse);
  }

  public async getBlockLatestAccepted() {
    return this.channel.getBlockLatestAccepted();
  }

  public async getBlockNumber() {
    return this.channel.getBlockNumber();
  }

  public async getBlockWithTxHashes(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxHashes(blockIdentifier);
  }

  public async getBlockWithTxs(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxs(blockIdentifier);
  }

  public async waitForBlock(
    blockIdentifier: BlockIdentifier = BlockTag.LATEST,
    retryInterval: number = 5000
  ) {
    if (blockIdentifier === BlockTag.LATEST) return;
    if (blockIdentifier === 'pending') return; // For RPC 0.8.1
    const currentBlock = await this.getBlockNumber();
    const targetBlock =
      blockIdentifier === BlockTag.PRE_CONFIRMED
        ? currentBlock + 1
        : Number(toHex(blockIdentifier as BigNumberish));
    if (targetBlock <= currentBlock) return;
    const { retries } = this.channel;
    let retriesCount = retries;
    let isTargetBlock: boolean = false;
    while (!isTargetBlock) {
      // eslint-disable-next-line no-await-in-loop
      const currBlock = await this.getBlockNumber();
      if (currBlock === targetBlock) {
        isTargetBlock = true;
      } else {
        // eslint-disable-next-line no-await-in-loop
        await wait(retryInterval);
      }
      retriesCount -= 1;
      if (retriesCount <= 0) {
        throw new Error(`waitForBlock() timed-out after ${retries} tries.`);
      }
    }
  }

  public async getL1GasPrice(blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getBlockWithTxHashes(blockIdentifier)
      .then(this.responseParser.parseL1GasPriceResponse);
  }

  /**
   * Get the gas prices related to a block.
   * @param {BlockIdentifier} [blockIdentifier = this.identifier] - Optional. Can be 'pending', 'latest' or a block number (an integer type).
   * @returns {Promise<GasPrices>} an object with l1DataGasPrice, l1GasPrice, l2GasPrice properties (all bigint type).
   * @example
   * ```ts
   * const result = await myProvider.getGasPrices();
   * // result = { l1DataGasPrice: 3039n, l1GasPrice: 55590341542890n, l2GasPrice: 8441845008n }
   * ```
   */
  public async getGasPrices(
    blockIdentifier: BlockIdentifier = this.channel.blockIdentifier
  ): Promise<GasPrices> {
    if (this.channel instanceof RPC09.RpcChannel)
      return getGasPrices(this.channel, blockIdentifier);
    throw new LibraryError('Unsupported method for RPC version');
  }

  public async getL1MessageHash(l2TxHash: BigNumberish): Promise<string> {
    const transaction = (await this.channel.getTransactionByHash(l2TxHash)) as TransactionWithHash;
    assert(transaction.type === 'L1_HANDLER', 'This L2 transaction is not a L1 message.');
    const { calldata, contract_address, entry_point_selector, nonce } =
      transaction as L1_HANDLER_TXN;
    const params = [
      calldata[0],
      contract_address,
      nonce,
      entry_point_selector,
      calldata.length - 1,
      ...calldata.slice(1),
    ];
    return solidityUint256PackedKeccak256(params);
  }

  public async getBlockWithReceipts(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithReceipts(blockIdentifier);
  }

  public getStateUpdate = this.getBlockStateUpdate;

  public async getBlockStateUpdate(): Promise<StateUpdate>;
  public async getBlockStateUpdate(
    blockIdentifier: 'pre_confirmed'
  ): Promise<PreConfirmedStateUpdate>;
  public async getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
  public async getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
  public async getBlockStateUpdate(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockStateUpdate(blockIdentifier);
  }

  public async getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockTransactionsTraces(blockIdentifier);
  }

  public async getBlockTransactionCount(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockTransactionCount(blockIdentifier);
  }

  public async getTransaction(txHash: BigNumberish) {
    return this.channel.getTransactionByHash(txHash);
  }

  public async getTransactionByHash(txHash: BigNumberish) {
    return this.channel.getTransactionByHash(txHash);
  }

  public async getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    return this.channel.getTransactionByBlockIdAndIndex(blockIdentifier, index);
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    const txReceiptWoHelper = await this.channel.getTransactionReceipt(txHash);
    const txReceiptWoHelperModified =
      this.responseParser.parseTransactionReceipt(txReceiptWoHelper);
    return createTransactionReceipt(txReceiptWoHelperModified);
  }

  public async getTransactionTrace(
    txHash: BigNumberish
  ): Promise<RPCSPEC08.TRANSACTION_TRACE | RPCSPEC09.TRANSACTION_TRACE> {
    return this.channel.getTransactionTrace(txHash);
  }

  public async getTransactionStatus(transactionHash: BigNumberish) {
    return this.channel.getTransactionStatus(transactionHash);
  }

  public async getSimulateTransaction(
    invocations: AccountInvocations,
    options?: getSimulateTransactionOptions
  ) {
    // can't be named simulateTransaction because of argument conflict with account
    return this.channel
      .simulateTransaction(invocations, options)
      .then((r) => this.responseParser.parseSimulateTransactionResponse(r));
  }

  public async waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<GetTransactionReceiptResponse> {
    const receiptWoHelper = (await this.channel.waitForTransaction(
      txHash,
      options
    )) as GetTxReceiptResponseWithoutHelper;

    return createTransactionReceipt(receiptWoHelper);
  }

  /**
   * Wait up until a new transaction is possible with same the account.
   * This method is fast, but Events and transaction report are not yet
   * available. Useful for gaming activity.
   * - only rpc 0.9 and onwards.
   * @param {BigNumberish} txHash - transaction hash
   * @param {string} address - address of the account
   * @param {BigNumberish} initNonce - initial nonce of the account (before the transaction).
   * @param {fastWaitForTransactionOptions} [options={retries: 50, retryInterval: 500}] - options to scan the network for the next possible transaction. `retries` is the number of times to retry.
   * @returns {Promise<boolean>} Returns true if the next transaction is possible,
   * false if the timeout has been reached,
   * throw an error in case of provider communication.
   */
  public async fastWaitForTransaction(
    txHash: BigNumberish,
    address: string,
    initNonce: BigNumberish,
    options?: fastWaitForTransactionOptions
  ): Promise<boolean> {
    if (this.channel instanceof RPC09.RpcChannel) {
      const isSuccess = await this.channel.fastWaitForTransaction(
        txHash,
        address,
        initNonce,
        options
      );
      return isSuccess;
    }
    throw new Error('Unsupported channel type');
  }

  public async getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return this.channel.getStorageAt(contractAddress, key, blockIdentifier);
  }

  public async getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel.getClassHashAt(contractAddress, blockIdentifier);
  }

  public async getClassByHash(classHash: BigNumberish) {
    return this.getClass(classHash);
  }

  public async getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getClass(classHash, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }

  public async getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getClassAt(contractAddress, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }

  public async getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  public async getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  public async getContractVersion(
    contractAddress?: BigNumberish,
    classHash?: BigNumberish,
    {
      blockIdentifier = this.channel.blockIdentifier,
      compiler = true,
    }: getContractVersionOptions = {}
  ): Promise<ContractVersion> {
    let contractClass: ContractClassResponse;
    if (contractAddress) {
      contractClass = await this.getClassAt(contractAddress, blockIdentifier);
    } else if (classHash) {
      contractClass = await this.getClass(classHash, blockIdentifier);
    } else {
      throw Error('getContractVersion require contractAddress or classHash');
    }

    if (isSierra(contractClass)) {
      if (compiler) {
        const abiTest = getAbiContractVersion(contractClass.abi);
        return { cairo: '1', compiler: abiTest.compiler };
      }
      return { cairo: '1', compiler: undefined };
    }
    return { cairo: '0', compiler: '0' };
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: ETransactionType.INVOKE, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0]; // Return the first (and only) estimate
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: ETransactionType.DECLARE, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0]; // Return the first (and only) estimate
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: ETransactionType.DEPLOY_ACCOUNT, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0]; // Return the first (and only) estimate
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ) {
    return this.channel
      .getEstimateFee(invocations, options)
      .then((r) => this.responseParser.parseFeeEstimateBulkResponse(r));
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.invoke(functionInvocation, details) as Promise<InvokedTransaction>;
  }

  public async declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.declare(transaction, details) as Promise<DeclaredTransaction>;
  }

  public async deployAccountContract(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.deployAccount(transaction, details) as Promise<DeployedAccountTransaction>;
  }

  public async callContract(call: Call, blockIdentifier?: BlockIdentifier) {
    return this.channel.callContract(call, blockIdentifier);
  }

  public async estimateMessageFee(
    message: RPCSPEC09.L1Message, // same as spec08.L1Message
    blockIdentifier?: BlockIdentifier
  ): Promise<RPCSPEC08.FEE_ESTIMATE | RPCSPEC09.MESSAGE_FEE_ESTIMATE> {
    return this.channel.estimateMessageFee(message, blockIdentifier);
  }

  public async getSyncingStats() {
    return this.channel.getSyncingStats();
  }

  public async getEvents(
    eventFilter: RPCSPEC08.EventFilter | RPCSPEC09.EventFilter
  ): Promise<RPCSPEC08.EVENTS_CHUNK | RPCSPEC09.EVENTS_CHUNK> {
    if (this.channel instanceof RPC08.RpcChannel) {
      return this.channel.getEvents(eventFilter as RPCSPEC08.EventFilter);
    }
    if (this.channel instanceof RPC09.RpcChannel) {
      return this.channel.getEvents(eventFilter as RPCSPEC09.EventFilter);
    }
    throw new Error('Unsupported channel type');
  }

  public async verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: { okResponse: string[]; nokResponse: string[]; error: string[] }
  ): Promise<boolean> {
    return verifyMessageInStarknet(
      this,
      message,
      signature,
      accountAddress,
      signatureVerificationFunctionName,
      signatureVerificationResponse
    );
  }

  public async isClassDeclared(
    contractClassIdentifier: ContractClassIdentifier,
    blockIdentifier?: BlockIdentifier
  ) {
    let classHash: string;
    if (!contractClassIdentifier.classHash && 'contract' in contractClassIdentifier) {
      const hashes = extractContractHashes(contractClassIdentifier);
      classHash = hashes.classHash;
    } else if (contractClassIdentifier.classHash) {
      classHash = contractClassIdentifier.classHash;
    } else {
      throw Error('contractClassIdentifier type not satisfied');
    }

    try {
      const result = await this.getClass(classHash, blockIdentifier);
      return result instanceof Object;
    } catch (error) {
      if (error instanceof LibraryError) {
        return false;
      }
      throw error;
    }
  }

  public async prepareInvocations(invocations: Invocations) {
    const bulk: Invocations = [];
    // Build new ordered array
    // eslint-disable-next-line no-restricted-syntax
    for (const invocation of invocations) {
      if (invocation.type === ETransactionType.DECLARE) {
        // Test if already declared
        // eslint-disable-next-line no-await-in-loop
        const isDeclared = await this.isClassDeclared(
          'payload' in invocation ? invocation.payload : invocation
        );
        if (!isDeclared) {
          bulk.unshift(invocation);
        }
      } else {
        bulk.push(invocation);
      }
    }
    return bulk;
  }

  public async getL1MessagesStatus(
    transactionHash: BigNumberish
  ): Promise<RPC.RPCSPEC08.L1L2MessagesStatus | RPC.RPCSPEC09.L1L2MessagesStatus> {
    return this.channel.getMessagesStatus(transactionHash);
  }

  public async getStorageProof(
    classHashes: BigNumberish[],
    contractAddresses: BigNumberish[],
    contractsStorageKeys: RPC.CONTRACT_STORAGE_KEYS[],
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.StorageProof> {
    return this.channel.getStorageProof(
      classHashes,
      contractAddresses,
      contractsStorageKeys,
      blockIdentifier
    );
  }

  public async getCompiledCasm(classHash: BigNumberish): Promise<RPC.CASM_COMPILED_CONTRACT_CLASS> {
    return this.channel.getCompiledCasm(classHash);
  }

  public async getEstimateTip(
    blockIdentifier?: BlockIdentifier,
    options: TipAnalysisOptions = {}
  ): Promise<TipEstimate> {
    return getTipStatsFromBlocks(this, blockIdentifier, options);
  }
}
