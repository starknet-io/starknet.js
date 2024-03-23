import { NetworkName, StarknetChainId } from '../constants';
import { LibraryError } from '../provider/errors';
import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  BlockTag,
  Call,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  Invocation,
  InvocationsDetailsWithNonce,
  RpcProviderOptions,
  TransactionType,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from '../types';
import { JRPC, RPCSPEC07 as RPC } from '../types/api';
import { CallData } from '../utils/calldata';
import { isSierra } from '../utils/contract';
import fetch from '../utils/fetchPonyfill';
import { getSelector, getSelectorFromName } from '../utils/hash';
import { stringify } from '../utils/json';
import { getHexStringArray, toHex, toStorageKey } from '../utils/num';
import { Block, getDefaultNodeUrl, isV3Tx, isVersion, wait } from '../utils/provider';
import { decompressProgram, signatureToHexArray } from '../utils/stark';
import { getVersionsByType } from '../utils/transaction';

const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
  blockIdentifier: BlockTag.pending,
  retries: 200,
};

export class RpcChannel {
  public nodeUrl: string;

  public headers: object;

  readonly retries: number;

  public requestId: number;

  readonly blockIdentifier: BlockIdentifier;

  private chainId?: StarknetChainId;

  private speckVersion?: string;

  readonly waitMode: Boolean; // behave like web2 rpc and return when tx is processed

  constructor(optionsOrProvider?: RpcProviderOptions) {
    const { nodeUrl, retries, headers, blockIdentifier, chainId, waitMode } =
      optionsOrProvider || {};
    if (Object.values(NetworkName).includes(nodeUrl as NetworkName)) {
      this.nodeUrl = getDefaultNodeUrl(nodeUrl as NetworkName, optionsOrProvider?.default);
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultNodeUrl(undefined, optionsOrProvider?.default);
    }
    this.retries = retries || defaultOptions.retries;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.blockIdentifier = blockIdentifier || defaultOptions.blockIdentifier;
    this.chainId = chainId;
    this.waitMode = waitMode || false;
    this.requestId = 0;
  }

  /**
   * Sets the chain ID for the Starknet.
   *
   * @param {StarknetChainId} chainId - The chain ID to be set.
   *
   * @return {void}
   */
  public setChainId(chainId: StarknetChainId): void {
    this.chainId = chainId;
  }

  /**
   * Sends a JSON-RPC request to the specified method with optional parameters and ID.
   *
   * @param {string} method - The name of the method to call.
   * @param {object} [params] - Optional parameters to pass to the method.
   * @param {string|number} [id=0] - Optional ID to associate with the request.
   *
   * @returns - A promise that resolves to the response from the server.
   */
  public fetch(method: string, params?: object, id: string | number = 0) {
    const rpcRequestBody: JRPC.RequestBody = {
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

  /**
   * Handles errors in library methods execution.
   *
   * @param {string} method - The name of the method that caused the error.
   * @param {any} params - The parameters passed to the method.
   * @param {JRPC.Error} [rpcError] - The JSON-RPC error object, if applicable.
   * @param {any} [otherError] - Any other error object encountered.
   *
   * @throws {LibraryError} - If an RPC error occurs.
   * @throws {LibraryError} - If the "otherError" parameter is an instance of LibraryError.
   * @throws {Error} - If any other error occurs.
   */
  protected errorHandler(method: string, params: any, rpcError?: JRPC.Error, otherError?: any) {
    if (rpcError) {
      const { code, message, data } = rpcError;
      throw new LibraryError(
        `RPC: ${method} with params ${stringify(params, null, 2)}\n 
        ${code}: ${message}: ${stringify(data)}`
      );
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }

  /**
   * Fetches an endpoint using the specified method and parameters.
   *
   * @param {string} method - The name of the method to be called.
   * @param {object} [params] - The parameters to be passed to the method.
   * @returns {Promise} - A promise that resolves to the result of the method call.
   * @throws {Error} - If an error occurs during the method call.
   */
  protected async fetchEndpoint<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params']
  ): Promise<RPC.Methods[T]['result']> {
    try {
      const rawResult = await this.fetch(method, params, (this.requestId += 1));
      const { error, result } = await rawResult.json();
      this.errorHandler(method, params, error);
      return result as RPC.Methods[T]['result'];
    } catch (error: any) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }

  /**
   * Fetches the chainId from the Starknet API endpoint if not already fetched,
   * and returns the fetched chainId.
   *
   * @returns - The fetched chainId from the Starknet API.
   */
  public async ΩgetChainId(): Promise<StarknetChainId> {
    this.chainId ??= (await this.fetchEndpoint('starknet_chainId')) as StarknetChainId;
    return this.chainId;
  }

  /**
   * Retrieves the specification version of the Starknet chain.
   *
   * @returns  - The speck version of the Starknet chain.
   */
  public async getSpecVersion() {
    this.speckVersion ??= (await this.fetchEndpoint('starknet_specVersion')) as StarknetChainId;
    return this.speckVersion;
  }

  /**
   * Retrieves the nonce for a given contract address.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier (default: current block).
   * @returns - A Promise that resolves with the nonce of the contract.
   */
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

  /**
   * Retrieves a block with transaction hashes from the StarkNet blockchain.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to retrieve.
   * @returns - A Promise that resolves with the block object containing transaction hashes.
   */
  public getBlockWithTxHashes(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }

  /**
   * Retrieves the block with transactions identified by the given block identifier.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to retrieve.
   * @return - A Promise that resolves to the block with transactions.
   */
  public getBlockWithTxs(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }

  /**
   * Fetches the block with receipts for the given block identifier.
   *
   * @param {BlockIdentifier} blockIdentifier - The identifier of the block. Defaults to this.blockIdentifier.
   *
   * @return - A promise that resolves with the block along with its receipts.
   */
  public getBlockWithReceipts(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithReceipts', { block_id });
  }

  /**
   * Retrieves the state update for a given block.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block. Defaults to the
   *                                                                 previously set block identifier.
   * @returns - A Promise that resolves with the state update object.
   */
  public getBlockStateUpdate(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }

  /**
   * Retrieves the transaction traces for the given block identifier.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block. Defaults to the current block identifier.
   *
   * @return - A promise that resolves to an array of transaction traces for the block.
   */
  public getBlockTransactionsTraces(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_id });
  }

  /**
   * Retrieves the number of transactions in a block.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block.
   * @return - A promise that resolves to the number of transactions in the block.
   */
  public getBlockTransactionCount(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }

  /**
   * Retrieves transaction information by hash.
   *
   * @param {BigNumberish} txHash - The hash of the transaction to retrieve.
   * @return - A promise that resolves to the transaction details.
   */
  public getTransactionByHash(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
    });
  }

  /**
   * Returns the transaction at a specific index in a block identified by its ID.
   *
   * @param {BlockIdentifier} blockIdentifier - The identifier of the block.
   * @param {number} index - The index of the transaction in the block.
   * @return - A promise that resolves with the transaction data.
   */
  public getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }

  /**
   * Retrieves the transaction receipt for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The transaction hash to retrieve the receipt for.
   * @return - A promise that resolves to the transaction receipt object.
   */
  public getTransactionReceipt(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }

  /**
   * Retrieves the transaction trace for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The transaction hash to retrieve the trace for.
   * @return - A promise that resolves with the transaction trace object.
   */
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
    {
      blockIdentifier = this.blockIdentifier,
      skipValidate = true,
      skipFeeCharge = true,
    }: getSimulateTransactionOptions = {}
  ) {
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

  /**
   * Waits for a transaction to be confirmed on the blockchain.
   *
   * @param {BigNumberish} txHash - The transaction hash.
   * @param {waitForTransactionOptions} [options] - Optional parameters.
   * @param {number} [options.retryInterval=5000] - The interval in milliseconds between each retry.
   * @param {Array<RPC.TransactionStatus>} [options.errorStates] - The list of error states to consider.
   * @param {Array<RPC.TransactionStatus>} [options.successStates] - The list of success states to consider.
   *
   * @throws {Error} - Throws an error if the transaction status cannot be obtained or if it reaches the maximum number of retries.
   *
   * @returns - The transaction receipt.
   */
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
    return txReceipt as RPC.SPEC.TXN_RECEIPT;
  }

  /**
   * Retrieves the storage value at a specific key in a smart contract.
   *
   * @param {BigNumberish} contractAddress - The address of the smart contract.
   * @param {BigNumberish} key - The key for the desired storage value.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier to retrieve storage from (optional, defaults to this.blockIdentifier).
   * @return - A promise that resolves with the storage value at the specified key.
   */
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

  /**
   * Retrieves the class hash of a contract at a specific block.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier.
   *
   * @return - A promise that resolves to the class hash of the contract.
   */
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

  /**
   * Retrieves the class information for a given class hash and block identifier.
   *
   * @param {BigNumberish} classHash - The hash of the class to retrieve.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier
   * associated with the class.
   * @return - The class information.
   */
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

  /**
   * Returns the class at the specified contract address and block identifier.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier.
   * @return - A promise that resolves to the class at the specified contract address and block identifier.
   */
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

  /**
   * Get an estimate of the fee for executing multiple invocations on the StarkNet network.
   *
   * @async
   * @param {AccountInvocations} invocations - The list of invocations to estimate the fee for.
   * @param {getEstimateFeeBulkOptions} options - Additional options for the estimation process.
   * @param {string} [options.blockIdentifier=this.blockIdentifier] - The identifier of the block to estimate the fee for. Defaults to the current block identifier.
   * @param {boolean} [options.skipValidate=true] - Indicates whether validation should be skipped during the fee estimation. Defaults to true.
   * @returns - A Promise that resolves to the estimated fee for executing the invocations.
   */
  public async getEstimateFee(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = true }: getEstimateFeeBulkOptions
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    let flags = {};
    if (!isVersion('0.5', await this.getSpecVersion())) {
      flags = {
        simulation_flags: skipValidate ? [RPC.ESimulationFlag.SKIP_VALIDATE] : [],
      };
    } // else v(0.5) no flags

    return this.fetchEndpoint('starknet_estimateFee', {
      request: invocations.map((it) => this.buildTransaction(it, 'fee')),
      block_id,
      ...flags,
    });
  }

  /**
   * Invokes a function on a contract.
   *
   * @param {Invocation} functionInvocation - The details of the function invocation.
   * @param {InvocationsDetailsWithNonce} details - The additional details of the invocation with nonce.
   *
   * @returns - A promise that resolves to the transaction hash or the transaction details if wait mode is enabled.
   */
  public async invoke(functionInvocation: Invocation, details: InvocationsDetailsWithNonce) {
    let promise;
    if (!isV3Tx(details)) {
      // V1
      promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
        invoke_transaction: {
          sender_address: functionInvocation.contractAddress,
          calldata: CallData.toHex(functionInvocation.calldata),
          type: RPC.ETransactionType.INVOKE,
          max_fee: toHex(details.maxFee || 0),
          version: RPC.ETransactionVersion.V1,
          signature: signatureToHexArray(functionInvocation.signature),
          nonce: toHex(details.nonce),
        },
      });
    } else {
      // V3
      promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
        invoke_transaction: {
          type: RPC.ETransactionType.INVOKE,
          sender_address: functionInvocation.contractAddress,
          calldata: CallData.toHex(functionInvocation.calldata),
          version: RPC.ETransactionVersion.V3,
          signature: signatureToHexArray(functionInvocation.signature),
          nonce: toHex(details.nonce),
          resource_bounds: details.resourceBounds,
          tip: toHex(details.tip),
          paymaster_data: details.paymasterData.map((it) => toHex(it)),
          account_deployment_data: details.accountDeploymentData.map((it) => toHex(it)),
          nonce_data_availability_mode: details.nonceDataAvailabilityMode,
          fee_data_availability_mode: details.feeDataAvailabilityMode,
        },
      });
    }

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  /**
   * Sends a declare transaction to the StarkNet network.
   *
   * @param {DeclareContractTransaction} transaction - The transaction object containing contract, signature, senderAddress, and compiledClassHash.
   * @param {InvocationsDetailsWithNonce} details - The invocation details with nonce.
   * @returns - A promise that resolves with the transaction result.
   * @throws {Error} - If the parameters are invalid.
   */
  public async declare(
    { contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    let promise;
    if (!isSierra(contract) && !isV3Tx(details)) {
      // V1 Cairo 0
      promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
        declare_transaction: {
          type: RPC.ETransactionType.DECLARE,
          contract_class: {
            program: contract.program,
            entry_points_by_type: contract.entry_points_by_type,
            abi: contract.abi,
          },
          version: RPC.ETransactionVersion.V1,
          max_fee: toHex(details.maxFee || 0),
          signature: signatureToHexArray(signature),
          sender_address: senderAddress,
          nonce: toHex(details.nonce),
        },
      });
    } else if (isSierra(contract) && !isV3Tx(details)) {
      // V2 Cairo1
      promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
        declare_transaction: {
          type: RPC.ETransactionType.DECLARE,
          contract_class: {
            sierra_program: decompressProgram(contract.sierra_program),
            contract_class_version: contract.contract_class_version,
            entry_points_by_type: contract.entry_points_by_type,
            abi: contract.abi,
          },
          compiled_class_hash: compiledClassHash || '',
          version: RPC.ETransactionVersion.V2,
          max_fee: toHex(details.maxFee || 0),
          signature: signatureToHexArray(signature),
          sender_address: senderAddress,
          nonce: toHex(details.nonce),
        },
      });
    } else if (isSierra(contract) && isV3Tx(details)) {
      // V3 Cairo1
      promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
        declare_transaction: {
          type: RPC.ETransactionType.DECLARE,
          sender_address: senderAddress,
          compiled_class_hash: compiledClassHash || '',
          version: RPC.ETransactionVersion.V3,
          signature: signatureToHexArray(signature),
          nonce: toHex(details.nonce),
          contract_class: {
            sierra_program: decompressProgram(contract.sierra_program),
            contract_class_version: contract.contract_class_version,
            entry_points_by_type: contract.entry_points_by_type,
            abi: contract.abi,
          },
          resource_bounds: details.resourceBounds,
          tip: toHex(details.tip),
          paymaster_data: details.paymasterData.map((it) => toHex(it)),
          account_deployment_data: details.accountDeploymentData.map((it) => toHex(it)),
          nonce_data_availability_mode: details.nonceDataAvailabilityMode,
          fee_data_availability_mode: details.feeDataAvailabilityMode,
        },
      });
    } else {
      throw Error('declare unspotted parameters');
    }

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  /**
   * Deploys an account contract transaction.
   *
   * @param {DeployAccountContractTransaction} transaction - The transaction details.
   * @param {InvocationsDetailsWithNonce} details - The invocation details with nonce.
   *
   * @return - A promise that resolves with the result of the deployment transaction.
   */
  public async deployAccount(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    let promise;
    if (!isV3Tx(details)) {
      // v1
      promise = this.fetchEndpoint('starknet_addDeployAccountTransaction', {
        deploy_account_transaction: {
          constructor_calldata: CallData.toHex(constructorCalldata || []),
          class_hash: toHex(classHash),
          contract_address_salt: toHex(addressSalt || 0),
          type: RPC.ETransactionType.DEPLOY_ACCOUNT,
          max_fee: toHex(details.maxFee || 0),
          version: RPC.ETransactionVersion.V1,
          signature: signatureToHexArray(signature),
          nonce: toHex(details.nonce),
        },
      });
    } else {
      // v3
      promise = this.fetchEndpoint('starknet_addDeployAccountTransaction', {
        deploy_account_transaction: {
          type: RPC.ETransactionType.DEPLOY_ACCOUNT,
          version: RPC.ETransactionVersion.V3,
          signature: signatureToHexArray(signature),
          nonce: toHex(details.nonce),
          contract_address_salt: toHex(addressSalt || 0),
          constructor_calldata: CallData.toHex(constructorCalldata || []),
          class_hash: toHex(classHash),
          resource_bounds: details.resourceBounds,
          tip: toHex(details.tip),
          paymaster_data: details.paymasterData.map((it) => toHex(it)),
          nonce_data_availability_mode: details.nonceDataAvailabilityMode,
          fee_data_availability_mode: details.feeDataAvailabilityMode,
        },
      });
    }

    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }

  /**
   * Calls a contract on the StarkNet blockchain.
   *
   * @param {Call} call - The contract call details.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to call the contract in. Defaults to the current block.
   * @returns - A promise that resolves to the response of the contract call.
   */
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
   * @param blockIdentifier
   */
  public estimateMessageFee(
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

  /**
   * Builds a transaction object based on the provided invocation and version type.
   *
   * @param {AccountInvocationItem} invocation - The invocation object.
   * @param {('fee' | 'transaction')} [versionType] - The version type ('fee' or 'transaction').
   *
   * @return {RPC.BaseTransaction} - The built transaction object.
   */
  public buildTransaction(
    invocation: AccountInvocationItem,
    versionType?: 'fee' | 'transaction'
  ): RPC.BaseTransaction {
    const defaultVersions = getVersionsByType(versionType);
    let details;

    if (!isV3Tx(invocation)) {
      // V0,V1,V2
      details = {
        signature: signatureToHexArray(invocation.signature),
        nonce: toHex(invocation.nonce),
        max_fee: toHex(invocation.maxFee || 0),
      };
    } else {
      // V3
      details = {
        signature: signatureToHexArray(invocation.signature),
        nonce: toHex(invocation.nonce),
        resource_bounds: invocation.resourceBounds,
        tip: toHex(invocation.tip),
        paymaster_data: invocation.paymasterData.map((it) => toHex(it)),
        nonce_data_availability_mode: invocation.nonceDataAvailabilityMode,
        fee_data_availability_mode: invocation.feeDataAvailabilityMode,
        account_deployment_data: invocation.accountDeploymentData.map((it) => toHex(it)),
      };
    }

    if (invocation.type === TransactionType.INVOKE) {
      return {
        // v0 v1 v3
        type: RPC.ETransactionType.INVOKE, // TODO: Diff between sequencer and rpc invoke type
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        version: toHex(invocation.version || defaultVersions.v3),
        ...details,
      } as RPC.SPEC.BROADCASTED_INVOKE_TXN;
    }
    if (invocation.type === TransactionType.DECLARE) {
      if (!isSierra(invocation.contract)) {
        // Cairo 0 - v1
        return {
          type: invocation.type,
          contract_class: invocation.contract,
          sender_address: invocation.senderAddress,
          version: toHex(invocation.version || defaultVersions.v1),
          ...details,
        } as RPC.SPEC.BROADCASTED_DECLARE_TXN_V1;
      }
      return {
        // Cairo 1 - v2 v3
        type: invocation.type,
        contract_class: {
          ...invocation.contract,
          sierra_program: decompressProgram(invocation.contract.sierra_program),
        },
        compiled_class_hash: invocation.compiledClassHash || '',
        sender_address: invocation.senderAddress,
        version: toHex(invocation.version || defaultVersions.v3),
        ...details,
      } as RPC.SPEC.BROADCASTED_DECLARE_TXN;
    }
    if (invocation.type === TransactionType.DEPLOY_ACCOUNT) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { account_deployment_data, ...restDetails } = details;
      // v1 v3
      return {
        type: invocation.type,
        constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        version: toHex(invocation.version || defaultVersions.v3) as RPC.SPEC.INVOKE_TXN['version'],
        ...restDetails,
      } as RPC.SPEC.BROADCASTED_DEPLOY_ACCOUNT_TXN;
    }
    throw Error('RPC buildTransaction received unknown TransactionType');
  }
}
