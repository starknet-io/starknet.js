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
import { JRPC, RPCSPEC06 as RPC } from '../types/api';
import { CallData } from '../utils/calldata';
import { isSierra } from '../utils/contract';
import { validateAndParseEthAddress } from '../utils/eth';
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

  private specVersion?: string;

  readonly waitMode: Boolean; // behave like web2 rpc and return when tx is processed

  constructor(optionsOrProvider?: RpcProviderOptions) {
    const { nodeUrl, retries, headers, blockIdentifier, chainId, specVersion, waitMode } =
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
    this.specVersion = specVersion;
    this.waitMode = waitMode || false;
    this.requestId = 0;
  }

  /**
   * Sets the chain ID for the Starknet.
   *
   * @param {StarknetChainId} chainId - The chain ID to be set.
   *
   * @return
   */
  public setChainId(chainId: StarknetChainId) {
    this.chainId = chainId;
  }

  /**
   * Fetches data from a remote server using the provided method, parameters, and ID.
   *
   * @param {string} method - The method to be called on the remote server.
   * @param {?object} params - Optional parameters to be passed to the remote server.
   * @param {string|number} id - The ID to identify the request. Default value is 0.
   *
   * @return - A Promise that resolves to the Response object representing the fetched data.
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
   * Handles errors in the software library.
   *
   * @param {string} method - The name of the method that encountered the error.
   * @param {any} params - The parameters passed to the method.
   * @param {JRPC.Error} [rpcError] - The error object returned by the remote procedure call. Defaults to undefined.
   * @param {any} [otherError] - Any other error object encountered. Defaults to undefined.
   * @throws {LibraryError} - If rpcError is provided, it throws a LibraryError with the error code, message, and data.
   * @throws {LibraryError} - If otherError instance is provided, it throws the same LibraryError.
   * @throws {Error} - If otherError is provided, it throws a generic Error with the error message.
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
   * Fetches data from the specified API endpoint.
   *
   * @param method - The method name of the API endpoint.
   * @param params - Optional parameters for the API endpoint.
   * @returns A Promise that resolves to the result of the API endpoint.
   * @throws If an error occurs during the fetch operation.
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
   * Retrieves the chain ID from the Starknet endpoint.
   * If the chain ID has already been fetched, it returns the cached value.
   *
   * @returns - A promise that resolves to the chain ID.
   */
  public async getChainId() {
    this.chainId ??= (await this.fetchEndpoint('starknet_chainId')) as StarknetChainId;
    return this.chainId;
  }

  /**
   * Returns the version of the Starknet JSON-RPC specification being used
   *
   * @returns - A Promise that resolves with the spec version of the Starknet chain.
   */
  public async getSpecVersion() {
    this.specVersion ??= (await this.fetchEndpoint('starknet_specVersion')) as StarknetChainId;
    return this.specVersion;
  }

  /**
   * Retrieves the nonce for a given contract address and block identifier.
   *
   * @param {BigNumberish} contractAddress - The contract address to retrieve the nonce for.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier to retrieve the nonce from (optional, defaults to this.blockIdentifier).
   *
   * @return - A promise that resolves to the nonce value.
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
   * Retrieves a block with transaction hashes.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to retrieve.
   * @return {Promise<BlockWithTxHashes>} - A promise that resolves with the block containing transaction hashes.
   */
  public getBlockWithTxHashes(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }

  /**
   * Retrieves a block with its transactions.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to retrieve. Defaults to the current block identifier.
   * @return {Promise<BlockWithTxs>} A promise that resolves to the block with its transactions.
   */
  public getBlockWithTxs(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }

  /**
   * Retrieve the state update for a given block.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to retrieve the state update for.
   * @return {Promise<StateUpdate>} - A promise that resolves with the state update of the specified block.
   */
  public getBlockStateUpdate(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }

  /**
   * Fetches the transaction traces for a given block identifier.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier.
   * @returns {Promise<Trace[]>} - A promise that resolves with an array of transaction traces.
   */
  public getBlockTransactionsTraces(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_id });
  }

  /**
   * Retrieves the number of transactions in a given block.
   *
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block. Defaults to the current block identifier.
   *
   * @return {Promise<number>} - A Promise that resolves to the number of transactions in the block.
   */
  public getBlockTransactionCount(blockIdentifier: BlockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }

  /**
   * Fetches transaction details by its hash.
   *
   * @param {BigNumberish} txHash - The hash of the transaction.
   * @returns {Promise<any>} - A promise that resolves with the transaction details.
   */
  public getTransactionByHash(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
    });
  }

  /**
   * Retrieves a transaction from the StarkNet blockchain by its block identifier and index.
   *
   * @param {BlockIdentifier} blockIdentifier - The identifier of the block containing the transaction.
   * @param {number} index - The index of the transaction within the block.
   * @return {Promise<any>} - A Promise that resolves to the requested transaction object.
   */
  public getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }

  /**
   * Retrieves the transaction receipt for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The transaction hash to retrieve the receipt for.
   * @return {Promise<Object>} A promise that resolves with the transaction receipt object.
   */
  public getTransactionReceipt(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }

  /**
   * Retrieves the transaction trace for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The transaction hash to fetch the trace for.
   * @returns {Promise<any>} - The transaction trace object.
   */
  public getTransactionTrace(txHash: BigNumberish) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash });
  }

  /**
   * Get the status of a transaction
   *
   * @param {BigNumberish} transactionHash - The hash of the transaction.
   * @return {Promise<Object>} - A promise that resolves to the transaction status object.
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
   * Asynchronously waits for a transaction to be confirmed on the blockchain.
   *
   * @param {BigNumberish} txHash - The transaction hash to wait for.
   * @param {waitForTransactionOptions} [options] - Optional parameters for the method.
   * @return {Promise<RPC.SPEC.TXN_RECEIPT>} - A promise that resolves with the transaction receipt.
   * @throws {Error} - If the transaction is rejected or encounters an error.
   * @throws {Error} - If the maximum number of retries is reached.
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
   * Retrieves the storage value at the specified key for a given contract address and block identifier.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BigNumberish} key - The key to retrieve the storage value from.
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block. Defaults to the current block identifier.
   *
   * @return {Promise<any>} - A promise resolving to the storage value at the specified key.
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
   * Gets the class hash of a contract at a given block.
   *
   * @param {BigNumberish} contractAddress - The contract address.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier.
   * @returns {Promise<string>} - A Promise that resolves with the class hash of the contract at the given block.
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
   * Retrieves the class information for the given class hash.
   *
   * @param {BigNumberish} classHash - The hash of the class.
   * @param {BlockIdentifier} [blockIdentifier] - The block identifier. Default value is set to 'this.blockIdentifier'.
   * @returns {Promise<Object>} - A promise that resolves to the class information object.
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
   * Retrieves the class at the specified contract address and block identifier.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The block identifier.
   * @return {Promise} - A promise that resolves with the class information.
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
   * Retrieves the estimated fee for a given set of account invocations.
   *
   * @param {AccountInvocations} invocations - The list of account invocations.
   * @param {getEstimateFeeBulkOptions} options - The options for getting estimated fee.
   *       - blockIdentifier: The identifier of the block to use. Default is the current block identifier.
   *       - skipValidate: A flag indicating whether to skip validation. Default is true.
   *
   * @return {Promise<number>} - The estimated fee.
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
   * @param {Invocation} functionInvocation - The function invocation details.
   * @param {InvocationsDetailsWithNonce} details - The transaction details.
   * @returns {Promise} - A promise that resolves to the transaction hash or the transaction object.
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
   * Declares a contract transaction on the StarkNet blockchain.
   *
   * @param {DeclareContractTransaction} transaction - The transaction details.
   * @param {InvocationsDetailsWithNonce} details - The details of the transaction invocations.
   * @throws {Error} If the parameters of the transaction are incorrect.
   * @returns {Promise<any>} A promise that resolves to the transaction hash.
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
   * Deploy an account contract transaction.
   *
   * @param {DeployAccountContractTransaction} deployAccountTransaction - The transaction details.
   * @param {InvocationsDetailsWithNonce} details - The additional transaction details.
   *
   * @return {Promise} - Promise resolved with the transaction result or transaction hash if `waitMode` is enabled.
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
   * Calls a contract on the StarkNet protocol.
   *
   * @param {Call} call - The call object representing the contract call.
   * @param {BlockIdentifier} [blockIdentifier=this.blockIdentifier] - The identifier of the block to execute the contract call.
   * @returns {Promise} - A promise that resolves with the result of the contract call.
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
