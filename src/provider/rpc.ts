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
  PendingStateUpdate,
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
import { CallData } from '../utils/calldata';
import { getAbiContractVersion } from '../utils/calldata/cairo';
import { extractContractHashes, isSierra } from '../utils/contract';
import { LibraryError } from '../utils/errors';
import { solidityUint256PackedKeccak256 } from '../utils/hash';
import { isBigNumberish, toBigInt, toHex } from '../utils/num';
import { wait } from '../utils/provider';
import { isSupportedSpecVersion, isVersion } from '../utils/resolve';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { formatSignature } from '../utils/stark';
import { ReceiptTx } from '../utils/transactionReceipt/transactionReceipt';
import { getMessageHash, validateTypedData } from '../utils/typedData';
import { ProviderInterface } from './interface';
import type {
  DeclaredTransaction,
  DeployedAccountTransaction,
  InvokedTransaction,
  L1_HANDLER_TXN,
  TransactionWithHash,
} from './types/spec.type';

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
      if (optionsOrProvider && optionsOrProvider.specVersion) {
        if (isVersion('0.8', optionsOrProvider.specVersion)) {
          this.channel = new RPC08.RpcChannel({ ...optionsOrProvider, waitMode: false });
        } else if (isVersion('0.9', optionsOrProvider.specVersion)) {
          this.channel = new RPC09.RpcChannel({ ...optionsOrProvider, waitMode: false });
        } else
          throw new Error(`unsupported channel for spec version: ${optionsOrProvider.specVersion}`);
      } else if (isVersion('0.8', config.get('rpcVersion'))) {
        // default channel when unspecified
        this.channel = new RPC08.RpcChannel({ ...optionsOrProvider, waitMode: false });
      } else if (isVersion('0.9', config.get('rpcVersion'))) {
        // default channel when unspecified
        this.channel = new RPC09.RpcChannel({ ...optionsOrProvider, waitMode: false });
      } else throw new Error('unable to define spec version for channel');

      this.responseParser = new RPCResponseParser(optionsOrProvider?.resourceBoundsOverhead);
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

  /**
   * read channel spec version
   */
  public readSpecVersion() {
    return this.channel.readSpecVersion();
  }

  /**
   * get channel spec version
   */
  public async getSpecVersion() {
    return this.channel.getSpecVersion();
  }

  /**
   * setup channel spec version and return it
   */
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

  /**
   * Get the most recent accepted block hash and number
   */
  public async getBlockLatestAccepted() {
    return this.channel.getBlockLatestAccepted();
  }

  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  public async getBlockNumber() {
    return this.channel.getBlockNumber();
  }

  public async getBlockWithTxHashes(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxHashes(blockIdentifier);
  }

  public async getBlockWithTxs(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxs(blockIdentifier);
  }

  /**
   * Pause the execution of the script until a specified block is created.
   * @param {BlockIdentifier} blockIdentifier bloc number (BigNumberish) or tag
   * Use of 'latest" or of a block already created will generate no pause.
   * @param {number} [retryInterval] number of milliseconds between 2 requests to the node
   * @example
   * ```typescript
   * await myProvider.waitForBlock();
   * // wait the creation of the block
   * ```
   */
  public async waitForBlock(
    blockIdentifier: BlockIdentifier = BlockTag.LATEST,
    retryInterval: number = 5000
  ) {
    if (blockIdentifier === BlockTag.LATEST) return;
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

  public async getBlockStateUpdate(): Promise<PendingStateUpdate>;
  public async getBlockStateUpdate(blockIdentifier: 'pre_confirmed'): Promise<PendingStateUpdate>;
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
    return new ReceiptTx(txReceiptWoHelperModified);
  }

  public async getTransactionTrace(
    txHash: BigNumberish
  ): Promise<RPCSPEC08.TRANSACTION_TRACE | RPCSPEC09.TRANSACTION_TRACE> {
    return this.channel.getTransactionTrace(txHash);
  }

  /**
   * Get the status of a transaction
   */
  public async getTransactionStatus(transactionHash: BigNumberish) {
    return this.channel.getTransactionStatus(transactionHash);
  }

  /**
   * @param invocations AccountInvocations
   * @param options blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default false)<br/>
   * - skipFeeCharge (default true)<br/>
   */
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

    return new ReceiptTx(receiptWoHelper) as GetTransactionReceiptResponse;
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
    const estimates = await this.getEstimateFeeBulk(
      [
        {
          type: ETransactionType.INVOKE,
          ...invocation,
          ...details,
        },
      ],
      { blockIdentifier, skipValidate }
    );
    return estimates[0]; // Return the first (and only) estimate
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    const estimates = await this.getEstimateFeeBulk(
      [
        {
          type: ETransactionType.DECLARE,
          ...invocation,
          ...details,
        },
      ],
      { blockIdentifier, skipValidate }
    );
    return estimates[0]; // Return the first (and only) estimate
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    const estimates = await this.getEstimateFeeBulk(
      [
        {
          type: ETransactionType.DEPLOY_ACCOUNT,
          ...invocation,
          ...details,
        },
      ],
      { blockIdentifier, skipValidate }
    );
    return estimates[0]; // Return the first (and only) estimate
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    options: getEstimateFeeBulkOptions
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

  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  public async estimateMessageFee(
    message: RPCSPEC09.L1Message, // same as spec08.L1Message
    blockIdentifier?: BlockIdentifier
  ): Promise<RPCSPEC08.FEE_ESTIMATE | RPCSPEC09.MESSAGE_FEE_ESTIMATE> {
    return this.channel.estimateMessageFee(message, blockIdentifier);
  }

  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  public async getSyncingStats() {
    return this.channel.getSyncingStats();
  }

  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
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

  /**
   * Verify in Starknet a signature of a TypedData object or of a given hash.
   * @param {BigNumberish | TypedData} message TypedData object to be verified, or message hash to be verified.
   * @param {Signature} signature signature of the message.
   * @param {BigNumberish} accountAddress address of the account that has signed the message.
   * @param {string} [signatureVerificationFunctionName] if account contract with non standard account verification function name.
   * @param { okResponse: string[]; nokResponse: string[]; error: string[] } [signatureVerificationResponse] if account contract with non standard response of verification function.
   * @returns
   * ```typescript
   * const myTypedMessage: TypedMessage = .... ;
   * const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
   * const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
   * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
   * const result1 = myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
   * const result2 = myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
   * // result1 = result2 = true
   * ```
   */
  public async verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: { okResponse: string[]; nokResponse: string[]; error: string[] }
  ): Promise<boolean> {
    const isTypedData = validateTypedData(message);
    if (!isBigNumberish(message) && !isTypedData) {
      throw new Error('message has a wrong format.');
    }
    if (!isBigNumberish(accountAddress)) {
      throw new Error('accountAddress shall be a BigNumberish');
    }
    const messageHash = isTypedData ? getMessageHash(message, accountAddress) : toHex(message);
    // HOTFIX: Accounts should conform to SNIP-6
    // (https://github.com/starknet-io/SNIPs/blob/f6998f779ee2157d5e1dea36042b08062093b3c5/SNIPS/snip-6.md?plain=1#L61),
    // but they don't always conform. Also, the SNIP doesn't standardize the response if the signature isn't valid.
    const knownSigVerificationFName = signatureVerificationFunctionName
      ? [signatureVerificationFunctionName]
      : ['isValidSignature', 'is_valid_signature'];
    const knownSignatureResponse = signatureVerificationResponse || {
      okResponse: [
        // any non-nok response is true
      ],
      nokResponse: [
        '0x0', // Devnet
        '0x00', // OpenZeppelin 0.7.0 to 0.9.0 invalid signature
      ],
      error: [
        'argent/invalid-signature',
        '0x617267656e742f696e76616c69642d7369676e6174757265', // ArgentX 0.3.0 to 0.3.1
        'is invalid, with respect to the public key',
        '0x697320696e76616c6964', // OpenZeppelin until 0.6.1, Braavos 0.0.11
        'INVALID_SIG',
        '0x494e56414c49445f534947', // Braavos 1.0.0
      ],
    };
    let error: any;

    // eslint-disable-next-line no-restricted-syntax
    for (const SigVerificationFName of knownSigVerificationFName) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const resp = await this.callContract({
          contractAddress: toHex(accountAddress),
          entrypoint: SigVerificationFName,
          calldata: CallData.compile({
            hash: toBigInt(messageHash).toString(),
            signature: formatSignature(signature),
          }),
        });
        // Response NOK Signature
        if (knownSignatureResponse.nokResponse.includes(resp[0].toString())) {
          return false;
        }
        // Response OK Signature
        // Empty okResponse assume all non-nok responses are valid signatures
        // OpenZeppelin 0.7.0 to 0.9.0, ArgentX 0.3.0 to 0.3.1 & Braavos Cairo 0.0.11 to 1.0.0 valid signature
        if (
          knownSignatureResponse.okResponse.length === 0 ||
          knownSignatureResponse.okResponse.includes(resp[0].toString())
        ) {
          return true;
        }
        throw Error('signatureVerificationResponse Error: response is not part of known responses');
      } catch (err) {
        // Known NOK Errors
        if (
          knownSignatureResponse.error.some((errMessage) =>
            (err as Error).message.includes(errMessage)
          )
        ) {
          return false;
        }
        // Unknown Error
        error = err;
      }
    }

    throw Error(`Signature verification Error: ${error}`);
  }

  /**
   * Test if class is already declared from ContractClassIdentifier
   * Helper method using getClass
   * @param ContractClassIdentifier
   * @param blockIdentifier
   */
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

  /**
   * Build bulk invocations with auto-detect declared class
   * 1. Test if class is declared if not declare it preventing already declared class error and not declared class errors
   * 2. Order declarations first
   * @param invocations
   */
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

  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  public async getL1MessagesStatus(
    transactionHash: BigNumberish
  ): Promise<RPC.RPCSPEC08.L1L2MessagesStatus | RPC.RPCSPEC09.L1L2MessagesStatus> {
    return this.channel.getMessagesStatus(transactionHash);
  }

  /**
   * Get merkle paths in one of the state tries: global state, classes, individual contract
   */
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

  /**
   * Get the contract class definition in the given block associated with the given hash
   */
  public async getCompiledCasm(classHash: BigNumberish): Promise<RPC.CASM_COMPILED_CONTRACT_CLASS> {
    return this.channel.getCompiledCasm(classHash);
  }
}
