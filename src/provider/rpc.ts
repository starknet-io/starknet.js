import { ProviderInterface } from './interface';
import { LibraryError } from './errors';
import { RpcChannel, RPC06, RPC07 } from '../channel';
import {
  AccountInvocations,
  BigNumberish,
  Block,
  BlockIdentifier,
  BlockTag,
  Call,
  ContractVersion,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  GetBlockResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  PendingBlock,
  PendingStateUpdate,
  RPC,
  RpcProviderOptions,
  StateUpdate,
  StateUpdateResponse,
  TransactionType,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
  GetTxReceiptResponseWithoutHelper,
} from '../types';
import { getAbiContractVersion } from '../utils/calldata/cairo';
import { isSierra } from '../utils/contract';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { ReceiptTx, GetTransactionReceiptResponse } from '../utils/transactionReceipt';

export class RpcProvider implements ProviderInterface {
  private responseParser: RPCResponseParser;

  public channel: RPC07.RpcChannel | RPC06.RpcChannel;

  constructor(optionsOrProvider?: RpcProviderOptions | ProviderInterface | RpcProvider) {
    if (optionsOrProvider && 'channel' in optionsOrProvider) {
      this.channel = optionsOrProvider.channel;
      this.responseParser = (optionsOrProvider as any).responseParser;
    } else {
      this.channel = new RpcChannel({ ...optionsOrProvider, waitMode: false });
      this.responseParser = new RPCResponseParser(optionsOrProvider?.feeMarginPercentage);
    }
  }

  /**
   * Fetches data using the specified method, parameters, and ID.
   *
   * @param {string} method - The method to be used for fetching the data.
   * @param {object} [params] - The parameters to be passed for fetching the data. (optional)
   * @param {string|number} [id=0] - The ID for fetching the data. (optional, default: 0)
   * @return {Promise} A Promise that resolves to the fetched data.
   */
  public fetch(method: string, params?: object, id: string | number = 0) {
    return this.channel.fetch(method, params, id);
  }

  /**
   * Retrieves the chain ID of the current channel.
   *
   * @async
   * @returns {Promise<number>} - A Promise that resolves to the chain ID of the channel.
   */
  public async getChainId() {
    return this.channel.getChainId();
  }

  /**
   * Retrieves the specification version from the channel.
   *
   * @return {Promise<Number>} A promise that resolves to the specification version.
   */
  public async getSpecVersion() {
    return this.channel.getSpecVersion();
  }

  /**
   * Retrieves the nonce for a given contract address.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier] - Optional block identifier.
   * @return {Promise<number>} - The nonce for the contract address.
   */
  public async getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return this.channel.getNonceForAddress(contractAddress, blockIdentifier);
  }

  /**
   * Retrieves the pending block.
   *
   * @return {Promise<PendingBlock>} A promise that resolves to the pending block object.
   */
  public async getBlock(): Promise<PendingBlock>;
  /**
   * Retrieves the pending block based on the provided block identifier.
   *
   * @param {string} blockIdentifier - The identifier of the block (e.g., 'pending').
   * @return {Promise<PendingBlock>} - A promise that resolves with the pending block.
   */
  public async getBlock(blockIdentifier: 'pending'): Promise<PendingBlock>;
  /**
   * Retrieves the latest block from the blockchain.
   *
   * @param {string} blockIdentifier - The block identifier. Here, the value should always be 'latest'.
   * @returns {Promise<Block>} - A Promise that resolves to the latest block object.
   */
  public async getBlock(blockIdentifier: 'latest'): Promise<Block>;
  /**
   * Retrieves the block with the given blockIdentifier.
   *
   * @async
   * @function getBlock
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block to retrieve.
   * @return {Promise<GetBlockResponse>} - A Promise that resolves to the GetBlockResponse object.
   */
  public async getBlock(blockIdentifier?: BlockIdentifier): Promise<GetBlockResponse>;
  /**
   * Retrieves a block with its transaction hashes from the channel.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block to retrieve.
   * @return {Promise} - A promise that resolves to the block with its transaction hashes.
   */
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

  /**
   * Retrieves a block with its transaction hashes.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block to retrieve. Optional.
   * @returns {Promise<Block>} - A promise that resolves with the block object containing transaction hashes.
   */
  public async getBlockWithTxHashes(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxHashes(blockIdentifier);
  }

  /**
   * Retrieves a block with its transactions from the channel.
   *
   * @param {BlockIdentifier} blockIdentifier - An optional block identifier.
   * @returns {Promise<Object>} - A promise that resolves with the block and its transactions.
   */
  public async getBlockWithTxs(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockWithTxs(blockIdentifier);
  }

  /**
   * Retrieves a block with its receipts from the blockchain.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block to retrieve. If not provided, returns the latest block.
   * @returns {Promise<BlockWithReceipts>} A promise that resolves to the requested block with its receipts.
   * @throws {LibraryError} Throws a LibraryError if the method is not supported for the RPC version.
   */
  public async getBlockWithReceipts(blockIdentifier?: BlockIdentifier) {
    if (this.channel instanceof RPC06.RpcChannel)
      throw new LibraryError('Unsupported method for RPC version');

    return this.channel.getBlockWithReceipts(blockIdentifier);
  }

  public getStateUpdate = this.getBlockStateUpdate;

  /**
   * Retrieves the pending state update for a block.
   *
   * @returns {Promise<PendingStateUpdate>} A promise that resolves to the pending state update for the block.
   */
  public async getBlockStateUpdate(): Promise<PendingStateUpdate>;
  /**
   * Retrieves the current state update for the specified block.
   *
   * @param {string} blockIdentifier - The identifier of the block. Must be set to 'pending'.
   *
   * @return {Promise<PendingStateUpdate>} - A promise that resolves with the pending state update for the specified block.
   */
  public async getBlockStateUpdate(blockIdentifier: 'pending'): Promise<PendingStateUpdate>;
  /**
   * Retrieves the state update for a given block identifier.
   *
   * @param {string} blockIdentifier - The identifier of the block to retrieve the state update for.
   *                                  Use 'latest' to get the state update of the latest block.
   *
   * @return {Promise<StateUpdate>} - A Promise that resolves with the state update object.
   */
  public async getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
  /**
   * Retrieves the state update for a given block identifier.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block. Optional, if not provided, the latest block is assumed.
   * @return {Promise<StateUpdateResponse>} - A promise that resolves with the state update response.
   */
  public async getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
  /**
   * Retrieves the block state update from the channel using the provided block identifier.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The block identifier to query the state update for.
   * @returns {Promise} - A promise that resolves with the block state update.
   */
  public async getBlockStateUpdate(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockStateUpdate(blockIdentifier);
  }

  /**
   * Retrieves the transaction traces for a given block.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The unique identifier of the block.
   * @return {Promise} - A promise that resolves to the transaction traces for the given block.
   */
  public async getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockTransactionsTraces(blockIdentifier);
  }

  /**
   * Returns the transaction count of a specific block or the latest block.
   * If no block identifier is provided, the method will return the transaction count of the latest block.
   *
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block. Defaults to the latest block.
   * @returns {Promise<number>} - The transaction count of the specified block.
   */
  public async getBlockTransactionCount(blockIdentifier?: BlockIdentifier) {
    return this.channel.getBlockTransactionCount(blockIdentifier);
  }

  /**
   * Return transactions from pending block
   * @deprecated Instead use getBlock(BlockTag.pending); (will be removed in next minor version)
   * Utility method, same result can be achieved using getBlockWithTxHashes(BlockTag.pending);
   */
  public async getPendingTransactions() {
    const { transactions } = await this.getBlockWithTxHashes(BlockTag.pending).then(
      this.responseParser.parseGetBlockResponse
    );
    return Promise.all(transactions.map((it: any) => this.getTransactionByHash(it)));
  }

  /**
   * Retrieves a transaction by its hash.
   *
   * @param {BigNumberish} txHash - The hash of the transaction.
   * @return {Promise<Transaction>} - A promise that resolves to the transaction object.
   */
  public async getTransaction(txHash: BigNumberish) {
    return this.channel.getTransactionByHash(txHash);
  }

  /**
   * Retrieves a transaction by its hash from the channel.
   *
   * @param {BigNumberish} txHash - The hash of the transaction to retrieve.
   * @return {Promise<Transaction>} - A promise that resolves to the retrieved transaction.
   */
  public async getTransactionByHash(txHash: BigNumberish) {
    return this.channel.getTransactionByHash(txHash);
  }

  /**
   * Retrieves a transaction by block ID and index.
   *
   * @param {BlockIdentifier} blockIdentifier - The identifier of the block containing the transaction.
   * @param {number} index - The index of the transaction within the block.
   * @return {Promise<Transaction>} - A promise that resolves to the transaction.
   */
  public async getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number) {
    return this.channel.getTransactionByBlockIdAndIndex(blockIdentifier, index);
  }

  /**
   * Retrieves the transaction receipt for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The hash of the transaction.
   * @return {Promise<any>} - A promise that resolves with the transaction receipt.
   */
  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    const txReceiptWoHelper = await this.channel.getTransactionReceipt(txHash);
    const txReceiptWoHelperModified: GetTxReceiptResponseWithoutHelper =
      this.responseParser.parseTransactionReceipt(txReceiptWoHelper);
    return new ReceiptTx(txReceiptWoHelperModified) as GetTransactionReceiptResponse;
  }

  /**
   * Retrieves the transaction trace for a given transaction hash.
   *
   * @param {BigNumberish} txHash - The transaction hash to retrieve the trace for.
   * @return {Promise<any>} - A promise that resolves with the transaction trace.
   */
  public async getTransactionTrace(txHash: BigNumberish) {
    return this.channel.getTransactionTrace(txHash);
  }

  /**
   * Get the status of a transaction
   * @param {BigNumberish} transactionHash - The hash of the transaction
   * @return {Promise<string>} - The status of the transaction
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

  /**
   * Waits for a transaction to be mined and returns a promise.
   *
   * @param {BigNumberish} txHash - The transaction hash to wait for.
   * @param {waitForTransactionOptions} [options] - Optional parameters for waiting for the transaction.
   * @return {Promise} A promise that resolves when the transaction is mined.
   */
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

  /**
   * Retrieves the value stored at a given storage slot of a smart contract.
   *
   * @param {BigNumberish} contractAddress - The address of the smart contract.
   * @param {BigNumberish} key - The storage slot key.
   * @param {BlockIdentifier} [blockIdentifier] - The optional block identifier.
   *
   * @return {Promise<any>} - A Promise that resolves to the value stored at the given storage slot.
   */
  public async getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return this.channel.getStorageAt(contractAddress, key, blockIdentifier);
  }

  /**
   * Returns the hash of the contract at the specified address, at the given block.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block. (optional)
   * @return {Promise<string>} - The hash of the contract.
   */
  public async getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel.getClassHashAt(contractAddress, blockIdentifier);
  }

  /**
   * Retrieves a class by its hash.
   *
   * @param {BigNumberish} classHash - The hash of the class to be retrieved.
   * @returns {Promise<Class>} - A promise that resolves to the class object.
   */
  public async getClassByHash(classHash: BigNumberish) {
    return this.getClass(classHash);
  }

  /**
   * Retrieves a contract class from the specified channel.
   *
   * @param {BigNumberish} classHash - The hash of the contract class.
   * @param {BlockIdentifier} [blockIdentifier] - The optional block identifier.
   * @returns {Promise} - A promise that resolves to the contract class.
   */
  public async getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getClass(classHash, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }

  /**
   * Retrieves the class at the specified contract address.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block. (optional)
   *
   * @return {Promise<ContractClass>} A promise that resolves to the class at the contract address.
   */
  public async getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.channel
      .getClassAt(contractAddress, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }

  /**
   * Retrieves the version of a contract.
   *
   * @param {BigNumberish} contractAddress - The address of the contract.
   * @param {undefined} classHash - The class hash (optional).
   * @param {getContractVersionOptions} options - Additional options (optional).
   * @returns {Promise<ContractVersion>} - A Promise that resolves to the ContractVersion object.
   */
  public async getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  /**
   * Retrieves the version of a contract based on its class hash.
   *
   * @async
   * @param {undefined} contractAddress - The address of the contract. (Currently not used)
   * @param {BigNumberish} classHash - The class hash of the contract.
   * @param {getContractVersionOptions} [options] - Additional options to customize the retrieval. (Optional)
   * @returns {Promise<ContractVersion>} - A Promise that resolves to the ContractVersion object containing the version information.
   */
  public async getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  /**
   * Retrieves the version of a contract.
   *
   * @param {BigNumberish} [contractAddress] - The address of the contract.
   * @param {BigNumberish} [classHash] - The hash of the class.
   * @param {object} [options] - Additional options for retrieving the contract version.
   * @param {BlockIdentifier} [options.blockIdentifier] - The block identifier.
   * @param {boolean} [options.compiler=true] - Specifies whether to include the compiler version or not.
   *
   * @returns {Promise<ContractVersion>} A promise that resolves to an object representing the contract version.
   *
   * @throws {Error} If contractAddress and classHash are both not provided.
   */
  public async getContractVersion(
    contractAddress?: BigNumberish,
    classHash?: BigNumberish,
    {
      blockIdentifier = this.channel.blockIdentifier,
      compiler = true,
    }: getContractVersionOptions = {}
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
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier, skipValidate);
  }

  /**
   * Get the estimated fee for invoking a smart contract.
   *
   * @param {Invocation} invocation - The invocation object containing the smart contract invocation details.
   * @param {InvocationDetailsWithNonce} invocationDetails - The invocation details with nonce.
   * @param {BlockIdentifier} [blockIdentifier] - The block identifier (optional).
   * @param {boolean} [skipValidate] - Whether to skip the validation (optional).
   *
   * @returns {Promise<number>} - A promise that resolves to the estimated fee.
   */
  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return this.channel
      .getEstimateFee(
        [
          {
            type: TransactionType.INVOKE,
            ...invocation,
            ...invocationDetails,
          },
        ],
        { blockIdentifier, skipValidate }
      )
      .then((r) => this.responseParser.parseFeeEstimateResponse(r));
  }

  /**
   * Retrieves the estimated fee for declaring a contract transaction.
   *
   * @param {DeclareContractTransaction} invocation - The declaration contract transaction to estimate the fee for.
   * @param {InvocationsDetailsWithNonce} details - The invocation details with nonce associated with the transaction.
   * @param {BlockIdentifier} [blockIdentifier] - The block identifier for the fee estimation.
   * @param {boolean} [skipValidate] - Flag indicating whether to skip validation during fee estimation.
   *
   * @return {Promise<number>} A promise that resolves to the estimated fee for the given declaration transaction.
   */
  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return this.channel
      .getEstimateFee(
        [
          {
            type: TransactionType.DECLARE,
            ...invocation,
            ...details,
          },
        ],
        { blockIdentifier, skipValidate }
      )
      .then((r) => this.responseParser.parseFeeEstimateResponse(r));
  }

  /**
   * Get the estimated fee for deploying an account contract.
   *
   * @param {DeployAccountContractTransaction} invocation - The transaction details for deploying the account contract.
   * @param {InvocationsDetailsWithNonce} details - The additional details and nonce for the deployment.
   * @param {BlockIdentifier} [blockIdentifier] - The identifier of the block to use for fee estimation. (optional)
   * @param {boolean} [skipValidate] - Flag indicating whether to skip validation. (optional)
   * @return {Promise<number>} - A promise that resolves to the estimated fee for the deployment.
   */
  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ) {
    return this.channel
      .getEstimateFee(
        [
          {
            type: TransactionType.DEPLOY_ACCOUNT,
            ...invocation,
            ...details,
          },
        ],
        { blockIdentifier, skipValidate }
      )
      .then((r) => this.responseParser.parseFeeEstimateResponse(r));
  }

  /**
   * Retrieves estimated fee for multiple account invocations.
   *
   * @param {AccountInvocations} invocations - The account invocations for which to retrieve fee estimates.
   * @param {getEstimateFeeBulkOptions} options - The options for fee estimation.
   * @returns {Promise} - A promise that resolves with the fee estimate response.
   */
  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    options: getEstimateFeeBulkOptions
  ) {
    return this.channel
      .getEstimateFee(invocations, options)
      .then((r) => this.responseParser.parseFeeEstimateBulkResponse(r));
  }

  /**
   * Invokes a specified function with the provided invocation and details.
   *
   * @param {Invocation} functionInvocation - The invocation to be passed to the function.
   * @param {InvocationsDetailsWithNonce} details - The details to be passed to the function.
   * @return {Promise<RPC.InvokedTransaction>} - A promise that resolves with the invoked transaction.
   */
  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.invoke(functionInvocation, details) as Promise<RPC.InvokedTransaction>;
  }

  /**
   * Declare a contract transaction with the provided transaction and details.
   *
   * @param {DeclareContractTransaction} transaction - The transaction to declare.
   * @param {InvocationsDetailsWithNonce} details - The details of the invocation with nonce.
   *
   * @return {Promise<RPC.DeclaredTransaction>} A promise that resolves to the declared transaction.
   */
  public async declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.declare(transaction, details) as Promise<RPC.DeclaredTransaction>;
  }

  /**
   * Deploys an account contract.
   *
   * @param {DeployAccountContractTransaction} transaction - The transaction for deploying the account contract.
   * @param {InvocationsDetailsWithNonce} details - The invocation details with nonce.
   * @return {Promise<RPC.DeployedAccountTransaction>} - A promise that resolves to the deployed account transaction.
   */
  public async deployAccountContract(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ) {
    return this.channel.deployAccount(
      transaction,
      details
    ) as Promise<RPC.DeployedAccountTransaction>;
  }

  /**
   * Calls a contract using the provided call object and optional block identifier.
   * @param {Call} call - The call object containing the contract information and method to call.
   * @param {BlockIdentifier} [blockIdentifier] - The optional block identifier for the contract call.
   * @return {Promise} - A promise that resolves with the result of the contract call.
   */
  public async callContract(call: Call, blockIdentifier?: BlockIdentifier) {
    return this.channel.callContract(call, blockIdentifier);
  }

  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   * @param blockIdentifier
   */
  public async estimateMessageFee(message: RPC.L1Message, blockIdentifier?: BlockIdentifier) {
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
  public async getEvents(eventFilter: RPC.EventFilter) {
    return this.channel.getEvents(eventFilter);
  }
}
