import {
  HEX_STR_TRANSACTION_VERSION_1,
  HEX_STR_TRANSACTION_VERSION_2,
  NetworkName,
  RPC_DEFAULT_VERSION,
  RPC_NODES,
  StarknetChainId,
} from '../constants';
import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  BlockTag,
  Call,
  ContractVersion,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  GetCodeResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  RPC,
  RpcProviderOptions,
  TransactionType,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from '../types';
import { CallData } from '../utils/calldata';
import { getAbiContractVersion } from '../utils/calldata/cairo';
import { isSierra } from '../utils/contract';
import fetch from '../utils/fetchPonyfill';
import { getSelector, getSelectorFromName, getVersionsByType } from '../utils/hash';
import { stringify } from '../utils/json';
import { getHexStringArray, toHex, toStorageKey } from '../utils/num';
import { wait } from '../utils/provider';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { decompressProgram, signatureToHexArray } from '../utils/stark';
import { LibraryError } from './errors';
import { ProviderInterface } from './interface';
import { getAddressFromStarkName, getStarkName } from './starknetId';
import { Block } from './utils';

/**
 * Return randomly select available public node
 * @param networkName NetworkName
 * @param mute mute public node warning
 * @returns default node url
 */
export const getDefaultNodeUrl = (
  networkName?: NetworkName,
  mute: boolean = false,
  version: 'v0_5' | 'v0_6' = RPC_DEFAULT_VERSION
): string => {
  if (!mute)
    // eslint-disable-next-line no-console
    console.warn('Using default public node url, please provide nodeUrl in provider options!');
  const nodes = RPC_NODES[networkName ?? NetworkName.SN_GOERLI];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return `${nodes[randIdx]}${version}`;
};

const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
  blockIdentifier: BlockTag.pending,
  retries: 200,
};

export class RpcProvider implements ProviderInterface {
  public nodeUrl: string;

  public headers: object;

  private responseParser = new RPCResponseParser();

  private retries: number;

  private blockIdentifier: BlockIdentifier;

  private chainId?: StarknetChainId;

  constructor(optionsOrProvider?: RpcProviderOptions) {
    const { nodeUrl, retries, headers, blockIdentifier, chainId, rpcVersion } =
      optionsOrProvider || {};
    if (Object.values(NetworkName).includes(nodeUrl as NetworkName)) {
      // Network name provided for nodeUrl
      this.nodeUrl = getDefaultNodeUrl(
        nodeUrl as NetworkName,
        optionsOrProvider?.default,
        rpcVersion
      );
    } else if (nodeUrl) {
      // NodeUrl provided
      this.nodeUrl = nodeUrl;
    } else {
      // none provided fallback to default testnet
      this.nodeUrl = getDefaultNodeUrl(undefined, optionsOrProvider?.default, rpcVersion);
    }
    this.retries = retries || defaultOptions.retries;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.blockIdentifier = blockIdentifier || defaultOptions.blockIdentifier;
    this.chainId = chainId; // setting to a non-null value skips making a request in getChainId()
  }

  public fetch(method: string, params?: object, id: string | number = 0) {
    const rpcRequestBody: RPC.JRPC.RequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return fetch(this.nodeUrl, {
      method: 'POST',
      body: stringify(rpcRequestBody),
      headers: this.headers as Record<string, string>,
    });
  }

  protected errorHandler(method: string, params: any, rpcError?: RPC.JRPC.Error, otherError?: any) {
    if (rpcError) {
      const { code, message, data } = rpcError;
      throw new LibraryError(
        `RPC: ${method} with params ${stringify(params)}\n ${code}: ${message}: ${stringify(data)}`
      );
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
      const rawResult = await this.fetch(method, params);
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
   * NEW: Returns the version of the Starknet JSON-RPC specification being used
   */
  public async getSpecVersion() {
    return this.fetchEndpoint('starknet_specVersion');
  }

  public async getNonceForAddress(
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
   * @deprecated use getBlockWithTxHashes or getBlockWithTxs (will be removed on sequencer deprecation)
   */
  public async getBlock(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    return this.getBlockWithTxHashes(blockIdentifier).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  /**
   * @deprecated renamed to getBlockLatestAccepted(); (will be removed in next minor version)
   */
  public getBlockHashAndNumber = this.getBlockLatestAccepted;

  /**
   * Get the most recent accepted block hash and number
   */
  public async getBlockLatestAccepted() {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }

  /**
   * @deprecated redundant use getBlockLatestAccepted();
   * Get the most recent accepted block number
   * @returns Number of the latest block
   */
  public async getBlockNumber() {
    return this.fetchEndpoint('starknet_blockNumber');
  }

  public async getBlockWithTxHashes(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }

  public async getBlockWithTxs(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }

  public async getBlockStateUpdate(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }

  /**
   * @deprecated renamed to getBlockStateUpdate();
   */
  public getStateUpdate = this.getBlockStateUpdate;

  public async getBlockTransactionsTraces(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_id });
  }

  /**
   * Returns the execution traces of all transactions included in the given block
   * @deprecated renamed to getBlockTransactionsTraces()
   */
  public traceBlockTransactions = this.getBlockTransactionsTraces;

  public async getBlockTransactionCount(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }

  /**
   * Get the number of transactions in a block given a block id
   * @deprecated renamed to getBlockTransactionCount()
   * @returns Number of transactions
   */
  public getTransactionCount = this.getBlockTransactionCount;

  /**
   * Return transactions from pending block
   * @deprecated Instead use getBlock(BlockTag.pending); (will be removed in next minor version)
   */
  public async getPendingTransactions() {
    const { transactions } = await this.getBlock(BlockTag.pending);
    return Promise.all(transactions.map((it) => this.getTransactionByHash(it)));
  }

  /**
   * @deprecated use getTransactionByHash or getTransactionByBlockIdAndIndex (will be removed on sequencer deprecation)
   */
  public async getTransaction(txHash: BigNumberish) {
    return this.getTransactionByHash(txHash).then(this.responseParser.parseGetTransactionResponse);
  }

  public async getTransactionByHash(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
    });
  }

  public async getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }

  public async getTransactionReceipt(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }

  public async getTransactionTrace(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash });
  }

  /**
   * @deprecated renamed to getTransactionTrace();
   * For a given executed transaction, return the trace of its execution, including internal calls
   */
  public traceTransaction = this.getTransactionTrace;

  /**
   * NEW: Get the status of a transaction
   */
  public async getTransactionStatus(transactionHash: BigNumberish) {
    const transaction_hash = toHex(transactionHash);
    return this.fetchEndpoint('starknet_getTransactionStatus', { transaction_hash });
  }

  /**
   * @deprecated renamed to simulateTransaction();
   */
  public getSimulateTransaction = this.simulateTransaction;

  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default false)<br/>
   * - skipFeeCharge (default true)<br/>
   */
  public async simulateTransaction(
    invocations: AccountInvocations,
    {
      blockIdentifier = this.blockIdentifier,
      skipValidate = false,
      skipFeeCharge = true,
    }: getSimulateTransactionOptions
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const simulationFlags = [];
    if (skipValidate) simulationFlags.push(RPC.ESimulationFlag.SKIP_VALIDATE);
    if (skipFeeCharge) simulationFlags.push(RPC.ESimulationFlag.SKIP_FEE_CHARGE);

    return this.fetchEndpoint('starknet_simulateTransactions', {
      block_id,
      transactions: invocations.map((it) => this.buildTransaction(it)),
      simulation_flags: simulationFlags,
    }).then(this.responseParser.parseSimulateTransactionResponse);
  }

  public async waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions) {
    const transactionHash = toHex(txHash);
    let { retries } = this;
    let onchain = false;
    let isErrorState = false;
    const retryInterval = options?.retryInterval ?? 5000;
    const errorStates: any = options?.errorStates ?? [
      RPC.ETransactionStatus.REJECTED,
      // TODO: commented out to preserve the long-standing behavior of "reverted" not being treated as an error by default
      // should decide which behavior to keep in the future
      // RPC.ETransactionExecutionStatus.REVERTED,
    ];
    const successStates: any = options?.successStates ?? [
      RPC.ETransactionExecutionStatus.SUCCEEDED,
      RPC.ETransactionStatus.ACCEPTED_ON_L2,
      RPC.ETransactionStatus.ACCEPTED_ON_L1,
    ];

    let txStatus: RPC.TransactionStatus;
    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      try {
        // eslint-disable-next-line no-await-in-loop
        txStatus = await this.getTransactionStatus(transactionHash);

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
    return txReceipt as RPC.TransactionReceipt;
  }

  public async getStorageAt(
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

  public async getClassHashAt(
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

  public async getClassByHash(classHash: BigNumberish) {
    return this.getClass(classHash);
  }

  public async getClass(
    classHash: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const class_hash = toHex(classHash);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClass', {
      class_hash,
      block_id,
    }).then(this.responseParser.parseContractClassResponse);
  }

  public async getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassAt', {
      block_id,
      contract_address,
    }).then(this.responseParser.parseContractClassResponse);
  }

  public async getCode(
    _contractAddress: string,
    _blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    throw new Error('RPC does not implement getCode function');
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
    { blockIdentifier = this.blockIdentifier, compiler = true }: getContractVersionOptions = {}
  ): Promise<ContractVersion> {
    let contractClass;
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

  /**
   * @deprecated use get*type*EstimateFee (will be refactored based on type after sequencer deprecation)
   */
  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier);
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const transaction = this.buildTransaction(
      {
        type: TransactionType.INVOKE,
        ...invocation,
        ...invocationDetails,
      },
      'fee'
    );
    return this.fetchEndpoint('starknet_estimateFee', {
      request: [transaction],
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const transaction = this.buildTransaction(
      {
        type: TransactionType.DECLARE,
        ...invocation,
        ...details,
      },
      'fee'
    );
    return this.fetchEndpoint('starknet_estimateFee', {
      request: [transaction],
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const transaction = this.buildTransaction(
      {
        type: TransactionType.DEPLOY_ACCOUNT,
        ...invocation,
        ...details,
      },
      'fee'
    );
    return this.fetchEndpoint('starknet_estimateFee', {
      request: [transaction],
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = false }: getEstimateFeeBulkOptions
  ) {
    if (skipValidate) {
      // eslint-disable-next-line no-console
      console.warn('getEstimateFeeBulk RPC does not support skipValidate');
    }
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateFee', {
      request: invocations.map((it) => this.buildTransaction(it, 'fee')),
      block_id,
    }).then(this.responseParser.parseFeeEstimateBulkResponse);
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ) {
    return this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: {
        sender_address: functionInvocation.contractAddress,
        calldata: CallData.toHex(functionInvocation.calldata),
        type: RPC.ETransactionType.INVOKE,
        max_fee: toHex(details.maxFee || 0),
        version: '0x1',
        signature: signatureToHexArray(functionInvocation.signature),
        nonce: toHex(details.nonce),
      },
    });
  }

  public async declareContract(
    { contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    if (!isSierra(contract)) {
      return this.fetchEndpoint('starknet_addDeclareTransaction', {
        declare_transaction: {
          type: RPC.ETransactionType.DECLARE,
          contract_class: {
            program: contract.program,
            entry_points_by_type: contract.entry_points_by_type,
            abi: contract.abi,
          },
          version: HEX_STR_TRANSACTION_VERSION_1,
          max_fee: toHex(details.maxFee || 0),
          signature: signatureToHexArray(signature),
          sender_address: senderAddress,
          nonce: toHex(details.nonce),
        },
      });
    }
    return this.fetchEndpoint('starknet_addDeclareTransaction', {
      declare_transaction: {
        type: RPC.ETransactionType.DECLARE,
        contract_class: {
          sierra_program: decompressProgram(contract.sierra_program),
          contract_class_version: contract.contract_class_version,
          entry_points_by_type: contract.entry_points_by_type,
          abi: contract.abi,
        },
        compiled_class_hash: compiledClassHash || '',
        version: HEX_STR_TRANSACTION_VERSION_2,
        max_fee: toHex(details.maxFee || 0),
        signature: signatureToHexArray(signature),
        sender_address: senderAddress,
        nonce: toHex(details.nonce),
      },
    });
  }

  public async deployAccountContract(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return this.fetchEndpoint('starknet_addDeployAccountTransaction', {
      deploy_account_transaction: {
        constructor_calldata: CallData.toHex(constructorCalldata || []),
        class_hash: toHex(classHash),
        contract_address_salt: toHex(addressSalt || 0),
        type: RPC.ETransactionType.DEPLOY_ACCOUNT,
        max_fee: toHex(details.maxFee || 0),
        version: toHex(details.version || 0),
        signature: signatureToHexArray(signature),
        nonce: toHex(details.nonce),
      },
    });
  }

  public async callContract(call: Call, blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    const result = await this.fetchEndpoint('starknet_call', {
      request: {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: CallData.toHex(call.calldata),
      },
      block_id,
    });

    return this.responseParser.parseCallContractResponse(result);
  }

  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  public async estimateMessageFee(
    message: RPC.L1Message,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ) {
    const { from_address, to_address, entry_point_selector, payload } = message;
    const formattedMessage = {
      from_address: toHex(from_address),
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
  public async getSyncingStats() {
    return this.fetchEndpoint('starknet_syncing');
  }

  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  public async getEvents(eventFilter: RPC.EventFilter) {
    return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  }

  /**
   * StarknetId Endpoint (get name from address)
   */
  public async getStarkName(address: BigNumberish, StarknetIdContract?: string) {
    return getStarkName(this, address, StarknetIdContract);
  }

  /**
   * StarknetId Endpoint (get address from name)
   */
  public async getAddressFromStarkName(name: string, StarknetIdContract?: string) {
    return getAddressFromStarkName(this, name, StarknetIdContract);
  }

  public buildTransaction(
    invocation: AccountInvocationItem,
    versionType?: 'fee' | 'transaction'
  ): RPC.BaseTransaction {
    const defaultVersions = getVersionsByType(versionType);
    const details = {
      signature: signatureToHexArray(invocation.signature),
      nonce: toHex(invocation.nonce),
      max_fee: toHex(invocation.maxFee || 0),
    };

    if (invocation.type === TransactionType.INVOKE) {
      return {
        type: RPC.ETransactionType.INVOKE, // Diff between sequencer and rpc invoke type
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        version: toHex(invocation.version || defaultVersions.v1),
        ...details,
      };
    }
    if (invocation.type === TransactionType.DECLARE) {
      if (!isSierra(invocation.contract)) {
        return {
          type: invocation.type,
          contract_class: invocation.contract,
          sender_address: invocation.senderAddress,
          version: toHex(invocation.version || defaultVersions.v1),
          ...details,
        };
      }
      return {
        // compiled_class_hash
        type: invocation.type,
        contract_class: {
          ...invocation.contract,
          sierra_program: decompressProgram(invocation.contract.sierra_program),
        },
        compiled_class_hash: invocation.compiledClassHash || '',
        sender_address: invocation.senderAddress,
        version: toHex(invocation.version || defaultVersions.v2),
        ...details,
      };
    }
    if (invocation.type === TransactionType.DEPLOY_ACCOUNT) {
      return {
        type: invocation.type,
        constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        version: toHex(invocation.version || defaultVersions.v1),
        ...details,
      };
    }
    throw Error('RPC buildTransaction received unknown TransactionType');
  }
}
