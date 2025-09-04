import {
  NetworkName,
  StarknetChainId,
  SupportedRpcVersion,
  SYSTEM_MESSAGES,
} from '../global/constants';
import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  BlockTag,
  Call,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  Invocation,
  InvocationsDetailsWithNonce,
  isRPC08Plus_ResourceBoundsBN,
  RPC_ERROR,
  RpcProviderOptions,
  waitForTransactionOptions,
  type fastWaitForTransactionOptions,
} from '../types';
import assert from '../utils/assert';
import { ETransactionType, JRPC, RPCSPEC09 as RPC } from '../types/api';
import { BatchClient } from '../utils/batch';
import { CallData } from '../utils/calldata';
import { isSierra } from '../utils/contract';
import { LibraryError, RpcError } from '../utils/errors';
import { validateAndParseEthAddress } from '../utils/eth';
import fetch from '../utils/connect/fetch';
import { getSelector, getSelectorFromName } from '../utils/hash';
import { stringify } from '../utils/json';
import { isNumber } from '../utils/typed';
import {
  bigNumberishArrayToHexadecimalStringArray,
  getHexStringArray,
  toHex,
  toStorageKey,
} from '../utils/num';
import { Block, getDefaultNodeUrl, wait } from '../utils/provider';
import { isSupportedSpecVersion, isV3Tx, isVersion } from '../utils/resolve';
import {
  decompressProgram,
  signatureToHexArray,
  resourceBoundsToHexString,
  toTransactionVersion,
} from '../utils/stark';
import { getVersionsByType } from '../utils/transaction';
import { logger } from '../global/logger';
import { config } from '../global/config';
// TODO: check if we can filet type before entering to this method, as so to specify here only RPC 0.8 types

const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
  blockIdentifier: BlockTag.LATEST,
  retries: 200,
};

export class RpcChannel {
  readonly id = 'RPC090';

  /**
   * RPC specification version this Channel class implements
   */
  readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_9_0;

  public nodeUrl: string;

  public headers: object;

  public requestId: number;

  readonly blockIdentifier: BlockIdentifier;

  readonly retries: number;

  readonly waitMode: boolean; // behave like web2 rpc and return when tx is processed

  private chainId?: StarknetChainId;

  /**
   * RPC specification version of the connected node
   */
  private specVersion?: SupportedRpcVersion;

  private transactionRetryIntervalFallback?: number;

  private batchClient?: BatchClient<RPC.Methods>;

  private baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;

  constructor(optionsOrProvider?: RpcProviderOptions) {
    const {
      baseFetch,
      batch,
      blockIdentifier,
      chainId,
      headers,
      nodeUrl,
      retries,
      specVersion,
      transactionRetryIntervalFallback,
      waitMode,
    } = optionsOrProvider || {};
    if (Object.values(NetworkName).includes(nodeUrl as NetworkName)) {
      this.nodeUrl = getDefaultNodeUrl(
        nodeUrl as NetworkName,
        optionsOrProvider?.default,
        this.channelSpecVersion
      );
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultNodeUrl(
        undefined,
        optionsOrProvider?.default,
        this.channelSpecVersion
      );
    }
    this.baseFetch = baseFetch || config.get('fetch') || fetch;
    this.blockIdentifier = blockIdentifier ?? defaultOptions.blockIdentifier;
    this.chainId = chainId;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.retries = retries ?? defaultOptions.retries;
    this.specVersion = specVersion;
    this.transactionRetryIntervalFallback = transactionRetryIntervalFallback;
    this.waitMode = waitMode ?? false;

    this.requestId = 0;

    if (isNumber(batch)) {
      this.batchClient = new BatchClient<RPC.Methods>({
        nodeUrl: this.nodeUrl,
        headers: this.headers,
        interval: batch,
        baseFetch: this.baseFetch,
        rpcMethods: {} as RPC.Methods, // Type information only, not used at runtime
      });
    }

    logger.debug('Using Channel', this.id);
  }

  public readSpecVersion() {
    return this.specVersion;
  }

  private get transactionRetryIntervalDefault() {
    return this.transactionRetryIntervalFallback ?? 5000;
  }

  public setChainId(chainId: StarknetChainId) {
    this.chainId = chainId;
  }

  public fetch(method: string, params?: object, id: string | number = 0) {
    const rpcRequestBody: JRPC.RequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify(rpcRequestBody),
      headers: this.headers as Record<string, string>,
    });
  }

  protected errorHandler(method: string, params: any, rpcError?: JRPC.Error, otherError?: any) {
    if (rpcError) {
      throw new RpcError(rpcError as RPC_ERROR, method, params);
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }

  protected async fetchEndpoint<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params']
  ): Promise<RPC.Methods[T]['result']> {
    try {
      if (this.batchClient) {
        const { error, result } = await this.batchClient.fetch(
          method,
          params,
          (this.requestId += 1)
        );
        this.errorHandler(method, params, error);
        return result as RPC.Methods[T]['result'];
      }

      const rawResult = await this.fetch(method, params, (this.requestId += 1));
      const { error, result } = await rawResult.json();
      this.errorHandler(method, params, error);
      return result as RPC.Methods[T]['result'];
    } catch (error: any) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }

  public async getChainId() {
    this.chainId ??= (await this.fetchEndpoint('starknet_chainId')) as StarknetChainId;
    return this.chainId;
  }

  /**
   * fetch rpc node specVersion
   * @example this.specVersion = "0.9.0"
   */
  public getSpecVersion() {
    return this.fetchEndpoint('starknet_specVersion');
  }

  /**
   * fetch if undefined else just return this.specVersion
   * @example this.specVersion = "0.9.0"
   */
  public async setUpSpecVersion() {
    if (!this.specVersion) {
      const unknownSpecVersion = await this.fetchEndpoint('starknet_specVersion');

      // check if the channel is compatible with the node
      if (!isVersion(this.channelSpecVersion, unknownSpecVersion)) {
        logger.error(SYSTEM_MESSAGES.channelVersionMismatch, {
          channelId: this.id,
          channelSpecVersion: this.channelSpecVersion,
          nodeSpecVersion: this.specVersion,
        });
      }

      if (!isSupportedSpecVersion(unknownSpecVersion)) {
        throw new LibraryError(`${SYSTEM_MESSAGES.unsupportedSpecVersion}, channelId: ${this.id}`);
      }

      this.specVersion = unknownSpecVersion;
    }
    return this.specVersion;
  }

  // TODO: New Method add test
  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  public getMessagesStatus(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getMessagesStatus', {
      transaction_hash,
    });
  }

  // TODO: New Method add test
  public getStorageProof(
    classHashes: BigNumberish[] = [],
    contractAddresses: BigNumberish[] = [],
    contractsStorageKeys: RPC.CONTRACT_STORAGE_KEYS[] = [], // TODO: allow BigNUmberish[] and fix formatting before request
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const class_hashes = bigNumberishArrayToHexadecimalStringArray(classHashes);
    const contract_addresses = bigNumberishArrayToHexadecimalStringArray(contractAddresses);

    return this.fetchEndpoint('starknet_getStorageProof', {
      block_id,
      class_hashes,
      contract_addresses,
      contracts_storage_keys: contractsStorageKeys,
    });
  }

  // TODO: New Method add test
  public getCompiledCasm(classHash: BigNumberish): Promise<RPC.CASM_COMPILED_CONTRACT_CLASS> {
    const class_hash = toHex(classHash);

    return this.fetchEndpoint('starknet_getCompiledCasm', {
      class_hash,
    });
  }

  public getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getNonce', {
      contract_address,
      block_id,
    });
  }

  /**
   * Get the most recent accepted block hash and number
   */
  public getBlockLatestAccepted() {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }

  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  public getBlockNumber() {
    return this.fetchEndpoint('starknet_blockNumber');
  }

  public getBlockWithTxHashes(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }

  public getBlockWithTxs(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }

  public getBlockWithReceipts(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithReceipts', { block_id });
  }

  public getBlockStateUpdate(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }

  public getBlockTransactionsTraces(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_id });
  }

  public getBlockTransactionCount(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }

  public getTransactionByHash(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
    });
  }

  public getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }

  public getTransactionReceipt(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }

  public getTransactionTrace(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash });
  }

  /**
   * Get the status of a transaction
   */
  public getTransactionStatus(transactionHash: BigNumberish) {
    const transaction_hash = toHex(transactionHash);
    return this.fetchEndpoint('starknet_getTransactionStatus', { transaction_hash });
  }

  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default false)<br/>
   * - skipFeeCharge (default true)<br/>
   */
  public simulateTransaction(
    invocations: AccountInvocations,
    simulateTransactionOptions: getSimulateTransactionOptions = {}
  ) {
    const {
      blockIdentifier = this.blockIdentifier,
      skipValidate = true,
      skipFeeCharge = true,
    } = simulateTransactionOptions;
    const block_id = new Block(blockIdentifier).identifier;
    const simulationFlags: RPC.ESimulationFlag[] = [];
    if (skipValidate) simulationFlags.push(RPC.ESimulationFlag.SKIP_VALIDATE);
    if (skipFeeCharge) simulationFlags.push(RPC.ESimulationFlag.SKIP_FEE_CHARGE);

    return this.fetchEndpoint('starknet_simulateTransactions', {
      block_id,
      transactions: invocations.map((it) => this.buildTransaction(it)),
      simulation_flags: simulationFlags,
    });
  }

  public async waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions) {
    const transactionHash = toHex(txHash);
    let { retries } = this;
    let onchain = false;
    let isErrorState = false;
    const retryInterval = options?.retryInterval ?? this.transactionRetryIntervalDefault;
    const errorStates: any = options?.errorStates ?? [];
    const successStates: any = options?.successStates ?? [
      // RPC.ETransactionExecutionStatus.SUCCEEDED, // UDC  on SUCCEEDED + pre_confirmed had no proper events to parse UDC
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L2,
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L1,
    ];

    const txLife: string[] = [];
    let txStatus: RPC.TransactionStatus;
    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      try {
        // eslint-disable-next-line no-await-in-loop
        txStatus = await this.getTransactionStatus(transactionHash);
        txLife.push(txStatus.finality_status);

        const executionStatus = txStatus.execution_status;
        const finalityStatus = txStatus.finality_status;

        if (!finalityStatus) {
          // Transaction is potentially NOT_RECEIVED or RPC not Synced yet
          // so we will retry '{ retries }' times
          const error = new Error('waiting for transaction status');
          throw error;
        }

        if (errorStates.includes(executionStatus) || errorStates.includes(finalityStatus)) {
          const message = `${executionStatus}: ${finalityStatus}`;
          const error = new Error(message) as Error & { response: RPC.TransactionStatus };
          error.response = txStatus;
          isErrorState = true;
          throw error;
        } else if (
          successStates.includes(executionStatus) ||
          successStates.includes(finalityStatus)
        ) {
          onchain = true;
        }
      } catch (error) {
        if (error instanceof Error && isErrorState) {
          throw error;
        }

        if (error instanceof RpcError && error.isType('TXN_HASH_NOT_FOUND')) {
          logger.info('txLife: ', txLife);
          const errorMessages: Record<string, string> = {
            [RPC.ETransactionStatus.RECEIVED]: SYSTEM_MESSAGES.txEvictedFromMempool,
            [RPC.ETransactionStatus.PRE_CONFIRMED]: SYSTEM_MESSAGES.consensusFailed,
            [RPC.ETransactionStatus.CANDIDATE]: SYSTEM_MESSAGES.txFailsBlockBuildingValidation,
          };
          const errorMessage = errorMessages[txLife.at(-1) as string];
          if (errorMessage) {
            throw new Error(errorMessage);
          }
        }

        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }

      retries -= 1;
    }

    /**
     * For some nodes even though the transaction has executionStatus SUCCEEDED finalityStatus ACCEPTED_ON_L2, getTransactionReceipt returns "Transaction hash not found"
     * Retry until rpc is actually ready to work with txHash
     */
    let txReceipt = null;
    while (txReceipt === null) {
      try {
        // eslint-disable-next-line no-await-in-loop
        txReceipt = await this.getTransactionReceipt(transactionHash);
      } catch (error) {
        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }
      retries -= 1;
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
    }
    return txReceipt as RPC.TXN_RECEIPT;
  }

  public async fastWaitForTransaction(
    txHash: BigNumberish,
    address: string,
    initNonceBN: BigNumberish,
    options?: fastWaitForTransactionOptions
  ): Promise<boolean> {
    const initNonce = BigInt(initNonceBN);
    let retries = options?.retries ?? 50;
    const retryInterval = options?.retryInterval ?? 500; // 0.5s
    const errorStates: string[] = [RPC.ETransactionExecutionStatus.REVERTED];
    const successStates: string[] = [
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L2,
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L1,
      RPC.ETransactionFinalityStatus.PRE_CONFIRMED,
    ];
    let txStatus: RPC.TransactionStatus;
    const start = new Date().getTime();
    while (retries > 0) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);

      // eslint-disable-next-line no-await-in-loop
      txStatus = await this.getTransactionStatus(txHash);
      logger.info(
        `${retries} ${JSON.stringify(txStatus)} ${(new Date().getTime() - start) / 1000}s.`
      );
      const executionStatus = txStatus.execution_status ?? '';
      const finalityStatus = txStatus.finality_status;
      if (errorStates.includes(executionStatus)) {
        const message = `${executionStatus}: ${finalityStatus}`;
        const error = new Error(message) as Error & { response: RPC.TransactionStatus };
        error.response = txStatus;
        throw error;
      } else if (successStates.includes(finalityStatus)) {
        let currentNonce = initNonce;
        while (currentNonce === initNonce && retries > 0) {
          // eslint-disable-next-line no-await-in-loop
          currentNonce = BigInt(await this.getNonceForAddress(address, BlockTag.PRE_CONFIRMED));
          logger.info(
            `${retries} Checking new nonce ${currentNonce} ${(new Date().getTime() - start) / 1000}s.`
          );
          if (currentNonce !== initNonce) return true;
          // eslint-disable-next-line no-await-in-loop
          await wait(retryInterval);
          retries -= 1;
        }
        return false;
      }

      retries -= 1;
    }
    return false;
  }

  public getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const contract_address = toHex(contractAddress);
    const parsedKey = toStorageKey(key);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStorageAt', {
      contract_address,
      key: parsedKey,
      block_id,
    });
  }

  public getClassHashAt(
    contractAddress: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassHashAt', {
      block_id,
      contract_address,
    });
  }

  public getClass(
    classHash: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const class_hash = toHex(classHash);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClass', {
      class_hash,
      block_id,
    });
  }

  public getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassAt', {
      block_id,
      contract_address,
    });
  }

  public async getEstimateFee(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = true }: getEstimateFeeBulkOptions = {}
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const flags = {
      simulation_flags: (skipValidate
        ? [RPC.ESimulationFlag.SKIP_VALIDATE]
        : []) as RPC.Methods['starknet_estimateFee']['params']['simulation_flags'],
    };

    return this.fetchEndpoint('starknet_estimateFee', {
      request: invocations.map((it) => this.buildTransaction(it, 'fee')),
      block_id,
      ...flags,
    });
  }

  public async invoke(functionInvocation: Invocation, details: InvocationsDetailsWithNonce) {
    const transaction = this.buildTransaction(
      {
        type: ETransactionType.INVOKE,
        ...functionInvocation,
        ...details,
      },
      'transaction'
    );

    const promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: transaction,
    });

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  public async declare(
    declareTransaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    const transaction = this.buildTransaction(
      {
        type: ETransactionType.DECLARE,
        ...declareTransaction,
        ...details,
      },
      'transaction'
    );

    const promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
      declare_transaction: transaction,
    });

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  public async deployAccount(
    deployAccountTransaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    const transaction = this.buildTransaction(
      {
        type: ETransactionType.DEPLOY_ACCOUNT,
        ...deployAccountTransaction,
        ...details,
      },
      'transaction'
    );

    const promise = this.fetchEndpoint('starknet_addDeployAccountTransaction', {
      deploy_account_transaction: transaction,
    });

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  public callContract(call: Call, blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_call', {
      request: {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: CallData.toHex(call.calldata),
      },
      block_id,
    });
  }

  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  public estimateMessageFee(
    message: RPC.L1Message,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const { from_address, to_address, entry_point_selector, payload } = message;
    const formattedMessage = {
      from_address: validateAndParseEthAddress(from_address),
      to_address: toHex(to_address),
      entry_point_selector: getSelector(entry_point_selector),
      payload: getHexStringArray(payload),
    };

    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateMessageFee', {
      message: formattedMessage,
      block_id,
    });
  }

  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  public getSyncingStats() {
    return this.fetchEndpoint('starknet_syncing');
  }

  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  public getEvents(eventFilter: RPC.EventFilter) {
    return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  }

  // Generic buildTransaction that automatically narrows return type based on input
  public buildTransaction<T extends AccountInvocationItem>(
    invocation: T,
    versionType?: 'fee' | 'transaction'
  ): T extends { type: typeof ETransactionType.INVOKE }
    ? RPC.INVOKE_TXN_V3
    : T extends { type: typeof ETransactionType.DECLARE }
      ? RPC.BROADCASTED_DECLARE_TXN_V3
      : T extends { type: typeof ETransactionType.DEPLOY_ACCOUNT }
        ? RPC.DEPLOY_ACCOUNT_TXN_V3
        : never {
    const defaultVersions = getVersionsByType(versionType);

    // V0,V1,V2 not supported on RPC 0.9
    assert(isV3Tx(invocation), SYSTEM_MESSAGES.legacyTxRPC08Message);

    // V3 - Add resource bounds validation for transaction building (not fee estimation)
    assert(
      versionType !== 'transaction' || isRPC08Plus_ResourceBoundsBN(invocation.resourceBounds),
      SYSTEM_MESSAGES.SWOldV3
    );

    const details = {
      signature: signatureToHexArray(invocation.signature),
      nonce: toHex(invocation.nonce),
      resource_bounds: resourceBoundsToHexString(invocation.resourceBounds),
      tip: toHex(invocation.tip),
      paymaster_data: invocation.paymasterData.map((it) => toHex(it)),
      nonce_data_availability_mode: invocation.nonceDataAvailabilityMode,
      fee_data_availability_mode: invocation.feeDataAvailabilityMode,
      account_deployment_data: invocation.accountDeploymentData.map((it) => toHex(it)),
      version: toTransactionVersion(defaultVersions.v3, invocation.version),
    };

    if (invocation.type === ETransactionType.INVOKE) {
      const btx: RPC.INVOKE_TXN_V3 = {
        type: RPC.ETransactionType.INVOKE,
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        ...details,
      };
      return btx as any; // This 'as any' is internal to the generic function - the external API is type-safe
    }
    if (invocation.type === ETransactionType.DECLARE) {
      // Sierra contracts required for DECLARE transactions in RPC 0.9
      assert(isSierra(invocation.contract), 'Declaring non Sierra contract using RPC 0.9');

      const btx: RPC.BROADCASTED_DECLARE_TXN_V3 = {
        type: invocation.type,
        contract_class: {
          ...invocation.contract,
          sierra_program: decompressProgram(invocation.contract.sierra_program),
        },
        compiled_class_hash: invocation.compiledClassHash || '',
        sender_address: invocation.senderAddress,
        ...details,
      };
      return btx as any; // This 'as any' is internal to the generic function - the external API is type-safe
    }
    if (invocation.type === ETransactionType.DEPLOY_ACCOUNT) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { account_deployment_data, ...restDetails } = details;
      const btx: RPC.DEPLOY_ACCOUNT_TXN_V3 = {
        type: invocation.type,
        constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        ...restDetails,
      };
      return btx as any; // This 'as any' is internal to the generic function - the external API is type-safe
    }
    throw Error('RPC buildTransaction received unknown TransactionType');
  }
}
