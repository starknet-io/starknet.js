import { RPC08, RPC09 } from '../channel';
import { StarknetChainId } from '../global/constants';
import type {
  AccountInvocations,
  BigNumberish,
  Block,
  BlockIdentifier,
  Call,
  CallContractResponse,
  ContractClassResponse,
  ContractVersion,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractPayload,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponseOverhead,
  EstimateFeeResponseBulkOverhead,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  Nonce,
  PendingBlock,
  PreConfirmedStateUpdate,
  StateUpdate,
  StateUpdateResponse,
  Storage,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
  SimulateTransactionOverheadResponse,
  RPC,
  ContractClassIdentifier,
  Invocations,
  Signature,
  TypedData,
} from '../types';
import { TipAnalysisOptions, TipEstimate } from './modules/tip';
import { RPCSPEC08, RPCSPEC09 } from '../types/api';
import { RPCResponseParser } from '../utils/responseParser/rpc';

export abstract class ProviderInterface {
  public abstract channel: RPC08.RpcChannel | RPC09.RpcChannel;

  public abstract responseParser: RPCResponseParser;

  /**
   * Gets the Starknet chain Id
   *
   * @returns the chain Id
   */
  public abstract getChainId(): Promise<StarknetChainId>;

  /**
   * Calls a function on the Starknet contract.
   *
   * @param call transaction to be called
   * @param blockIdentifier block identifier
   * @returns the result of the function on the smart contract.
   */
  public abstract callContract(
    call: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;

  /**
   * Gets the block information
   *
   * @param blockIdentifier block identifier
   * @returns the block object
   */
  public abstract getBlock(): Promise<PendingBlock>;
  public abstract getBlock(blockIdentifier: 'pre_confirmed'): Promise<PendingBlock>;
  public abstract getBlock(blockIdentifier: 'latest'): Promise<Block>;
  public abstract getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;

  /**
   * Gets the contract class of the deployed contract.
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Contract class of compiled contract
   */
  public abstract getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClassResponse>;

  /**
   * Gets the price of l1 gas in the block
   *
   * @param blockIdentifier block identifier
   * @returns gas price of the block
   */
  public abstract getL1GasPrice(blockIdentifier?: BlockIdentifier): Promise<string>;

  /**
   * Get L1 message hash from L2 transaction hash
   * @param {BigNumberish} l2TxHash L2 transaction hash
   * @returns {string} Hex string of L1 message hash
   * @example
   * In Sepolia Testnet:
   * ```typescript
   * const result = provider.getL1MessageHash('0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819');
   * // result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
   * ```
   */
  public abstract getL1MessageHash(l2TxHash: BigNumberish): Promise<string>;

  /**
   * Returns the contract class hash in the given block for the contract deployed at the given address
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Class hash
   */
  public abstract getClassHashAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;

  /**
   * Returns the contract class deployed under the given class hash.
   *
   * @param classHash - class hash
   * @returns Contract class of compiled contract
   */
  public abstract getClassByHash(classHash: BigNumberish): Promise<ContractClassResponse>;

  /**
   * Returns the nonce associated with the given address in the given block
   *
   * @param contractAddress - contract address
   * @returns the hex nonce
   */
  public abstract getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<Nonce>;

  /**
   * Get the value of the storage (contract's variable) at the given address and key
   *
   * @param contractAddress
   * @param key - from starknetKeccak()
   * @param blockIdentifier - block identifier
   * @returns the value of the storage variable
   */
  public abstract getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<Storage>;

  /**
   * Gets the transaction information from a tx id.
   *
   * @param transactionHash
   * @returns the transaction object `{ transaction_id, status, transaction, block_number?, transaction_index?, transaction_failure_reason? }`
   */
  public abstract getTransaction(transactionHash: BigNumberish): Promise<GetTransactionResponse>;

  /**
   * Gets the transaction receipt from a tx hash.
   *
   * @param transactionHash
   * @returns the transaction receipt object
   */
  public abstract getTransactionReceipt(
    transactionHash: BigNumberish
  ): Promise<GetTransactionReceiptResponse>;

  /**
   * Deploys a given compiled Account contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract deployAccountContract(
    payload: DeployAccountContractPayload,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse>;

  /**
   * Invokes a function on starknet
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - (optional) the entrypoint of the contract
   * - calldata - (optional, defaults to []) the calldata
   * - signature - (optional, defaults to []) the signature
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * - maxFee - optional maxFee
   * @returns response from addTransaction
   */
  public abstract invokeFunction(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse>;

  /**
   * Declares a given compiled contract (json) to starknet
   * @param transaction transaction payload to be deployed containing:
   * - compiled contract code
   * - sender address
   * - signature
   * @param details Invocation Details containing:
   * - nonce
   * - optional version
   * - optional maxFee
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse>;

  /**
   * Estimates the fee for a given INVOKE transaction
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - (optional) the entrypoint of the contract
   * - calldata - (optional, defaults to []) the calldata
   * - signature - (optional, defaults to []) the signature
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getInvokeEstimateFee(invocation, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.INVOKE, ...invocation, ...details }], options);
   * ```
   * @alias getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  public abstract getInvokeEstimateFee(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimates the fee for a given DECLARE transaction
   *
   * @param transaction transaction payload to be declared containing:
   * - compiled contract code
   * - sender address
   * - signature - (defaults to []) the signature
   * @param details - optional details containing:
   * - nonce
   * - version - optional version
   * - optional maxFee
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getDeclareEstimateFee(transaction, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.DECLARE, ...transaction, ...details }], options);
   * ```
   * @alias getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  public abstract getDeclareEstimateFee(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimates the fee for a given DEPLOY_ACCOUNT transaction
   *
   * @param transaction transaction payload to be deployed containing:
   * - classHash
   * - constructorCalldata
   * - addressSalt
   * - signature - (defaults to []) the signature
   * @param details - optional details containing:
   * - nonce
   * - version - optional version
   * - optional maxFee
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getDeployAccountEstimateFee(transaction, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.DEPLOY_ACCOUNT, ...transaction, ...details }], options);
   * ```
   * @alias getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  public abstract getDeployAccountEstimateFee(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimates the fee for a list of INVOKE transaction
   *
   * @param invocations AccountInvocations - Complete invocations array with account details
   * @param options getEstimateFeeBulkOptions
   * - (optional) blockIdentifier - BlockIdentifier
   * @returns the estimated fee
   */
  public abstract getEstimateFeeBulk(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulkOverhead>;

  /**
   * Wait for the transaction to be accepted
   * @param txHash - transaction hash
   * @param options waitForTransactionOptions
   * - (optional) retryInterval: number | undefined;
   * - (optional) successStates: TransactionStatus[] | undefined;
   * @return GetTransactionReceiptResponse
   */
  public abstract waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<GetTransactionReceiptResponse>;

  /**
   * Simulates the transaction and returns the transaction trace and estimated fee.
   *
   * @param invocations AccountInvocations - Complete invocations array with account details
   * @param options - getSimulateTransactionOptions
   *  - (optional) blockIdentifier - block identifier
   *  - (optional) skipValidate - skip cairo __validate__ method
   *  - (optional) skipExecute - skip cairo __execute__ method
   * @returns an array of transaction trace and estimated fee
   */
  public abstract getSimulateTransaction(
    invocations: AccountInvocations,
    options?: getSimulateTransactionOptions
  ): Promise<SimulateTransactionOverheadResponse>;

  /**
   * Gets the state changes in a specific block (result of executing the requested block)
   *
   * @param blockIdentifier - block identifier
   * @returns StateUpdateResponse
   */
  public abstract getStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;

  /**
   * Gets the state changes in a specific block (result of executing the requested block)
   * Alternative method name for getStateUpdate with specific overloads
   *
   * @param blockIdentifier - block identifier
   * @returns StateUpdateResponse
   */
  public abstract getBlockStateUpdate(): Promise<StateUpdate>;
  public abstract getBlockStateUpdate(
    blockIdentifier: 'pre_confirmed'
  ): Promise<PreConfirmedStateUpdate>;
  public abstract getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
  public abstract getBlockStateUpdate(
    blockIdentifier?: BlockIdentifier
  ): Promise<StateUpdateResponse>;

  /**
   * Gets the contract version from the provided address
   * @param contractAddress string
   * @param classHash undefined
   * @param options - getContractVersionOptions
   *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
   *   - (optional) blockIdentifier - block identifier
   */
  public abstract getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  /**
   * Gets the contract version from the provided address
   * @param contractAddress undefined
   * @param classHash
   * @param options - getContractVersionOptions
   *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
   *   - (optional) blockIdentifier - block identifier
   */
  public abstract getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  // Block utility methods
  /**
   * Get the most recent accepted block hash and number
   * @returns Object containing block hash and number
   */
  public abstract getBlockLatestAccepted(): Promise<{ block_hash: string; block_number: number }>;

  /**
   * Get the most recent accepted block number
   * @returns Number of the latest block
   */
  public abstract getBlockNumber(): Promise<number>;

  /**
   * Get block information with transaction hashes
   * @param blockIdentifier - block identifier
   * @returns Block with transaction hashes
   */
  public abstract getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<any>;

  /**
   * Get block information with full transactions
   * @param blockIdentifier - block identifier
   * @returns Block with full transactions
   */
  public abstract getBlockWithTxs(blockIdentifier?: BlockIdentifier): Promise<any>;

  /**
   * Get block information with transaction receipts
   * @param blockIdentifier - block identifier
   * @returns Block with transaction receipts
   */
  public abstract getBlockWithReceipts(blockIdentifier?: BlockIdentifier): Promise<any>;

  /**
   * Get transaction traces for all transactions in a block
   * @param blockIdentifier - block identifier
   * @returns Array of transaction traces
   */
  public abstract getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier): Promise<any>;

  /**
   * Get the number of transactions in a block
   * @param blockIdentifier - block identifier
   * @returns Transaction count
   */
  public abstract getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;

  /**
   * Pause execution until a specified block is created
   * @param blockIdentifier - block number or tag
   * @param retryInterval - milliseconds between requests (default: 5000)
   * @example
   * ```typescript
   * await provider.waitForBlock(12345);
   * await provider.waitForBlock('latest');
   * ```
   */
  public abstract waitForBlock(
    blockIdentifier?: BlockIdentifier,
    retryInterval?: number
  ): Promise<void>;

  // Transaction utility methods
  /**
   * Gets the transaction information from a tx hash (alias for getTransaction)
   * @param txHash - transaction hash
   * @returns Transaction information
   */
  public abstract getTransactionByHash(txHash: BigNumberish): Promise<GetTransactionResponse>;

  /**
   * Gets transaction by block identifier and index
   * @param blockIdentifier - block identifier
   * @param index - transaction index in the block
   * @returns Transaction information
   */
  public abstract getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number
  ): Promise<GetTransactionResponse>;

  /**
   * Gets the transaction trace
   * @param txHash - transaction hash
   * @returns Transaction trace
   */
  public abstract getTransactionTrace(
    txHash: BigNumberish
  ): Promise<RPCSPEC08.TRANSACTION_TRACE | RPCSPEC09.TRANSACTION_TRACE>;

  /**
   * Get the status of a transaction
   * @param transactionHash - transaction hash
   * @returns Transaction status
   */
  public abstract getTransactionStatus(transactionHash: BigNumberish): Promise<any>;

  // Provider utility methods
  /**
   * Direct RPC method call
   * @param method - RPC method name
   * @param params - method parameters
   * @param id - request ID
   * @returns RPC response
   */
  public abstract fetch(method: string, params?: object, id?: string | number): Promise<any>;

  /**
   * Read channel spec version
   * @returns Spec version string or undefined if not set
   */
  public abstract readSpecVersion(): string | undefined;

  /**
   * Get channel spec version
   * @returns Promise resolving to spec version
   */
  public abstract getSpecVersion(): Promise<string>;

  /**
   * Setup channel spec version and return it
   * @returns Promise resolving to spec version
   */
  public abstract setUpSpecVersion(): Promise<string>;

  // Advanced methods
  /**
   * Get contract class by hash with optional block identifier
   * @param classHash - class hash
   * @param blockIdentifier - block identifier
   * @returns Contract class
   */
  public abstract getClass(
    classHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClassResponse>;

  /**
   * Estimate the fee for a message from L1
   * @param message - L1 message
   * @param blockIdentifier - block identifier
   * @returns Fee estimate
   */
  public abstract estimateMessageFee(
    message: RPCSPEC09.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<RPCSPEC08.FEE_ESTIMATE | RPCSPEC09.MESSAGE_FEE_ESTIMATE>;

  /**
   * Get node synchronization status
   * @returns Sync status or false if not syncing
   */
  public abstract getSyncingStats(): Promise<any>;

  /**
   * Get events matching the given filter
   * @param eventFilter - event filter
   * @returns Events and pagination info
   */
  public abstract getEvents(
    eventFilter: RPCSPEC08.EventFilter | RPCSPEC09.EventFilter
  ): Promise<RPCSPEC08.EVENTS_CHUNK | RPCSPEC09.EVENTS_CHUNK>;

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
   * const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
   * const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
   * // result1 = result2 = true
   * ```
   */
  public abstract verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: {
      okResponse: string[];
      nokResponse: string[];
      error: string[];
    }
  ): Promise<boolean>;

  /**
   * Test if class is already declared
   * @param contractClassIdentifier - contract class identifier
   * @param blockIdentifier - block identifier
   * @returns true if class is declared
   */
  public abstract isClassDeclared(
    contractClassIdentifier: ContractClassIdentifier,
    blockIdentifier?: BlockIdentifier
  ): Promise<boolean>;

  /**
   * Build bulk invocations with auto-detect declared class
   * @param invocations - array of invocations
   * @returns Prepared invocations
   */
  public abstract prepareInvocations(invocations: Invocations): Promise<Invocations>;

  /**
   * Get L1 messages status for a transaction
   * @param transactionHash - L1 transaction hash
   * @returns L1 message status
   */
  public abstract getL1MessagesStatus(
    transactionHash: BigNumberish
  ): Promise<RPC.RPCSPEC08.L1L2MessagesStatus | RPC.RPCSPEC09.L1L2MessagesStatus>;

  /**
   * Get Merkle paths in state tries
   * @param classHashes - class hashes
   * @param contractAddresses - contract addresses
   * @param contractsStorageKeys - storage keys
   * @param blockIdentifier - block identifier
   * @returns Storage proof
   */
  public abstract getStorageProof(
    classHashes: BigNumberish[],
    contractAddresses: BigNumberish[],
    contractsStorageKeys: RPC.CONTRACT_STORAGE_KEYS[],
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.StorageProof>;

  /**
   * Get compiled CASM contract class
   * @param classHash - class hash
   * @returns Compiled CASM contract class
   */
  public abstract getCompiledCasm(
    classHash: BigNumberish
  ): Promise<RPC.CASM_COMPILED_CONTRACT_CLASS>;

  /**
   * Get transaction tip estimation based on network analysis
   * @param blockIdentifier - block identifier to analyze from
   * @param options - tip analysis options
   * @returns Tip estimation with statistics
   * @example
   * ```typescript
   * const tipEstimate = await provider.getEstimateTip('latest', {
   *   maxBlocks: 10,
   *   minTxsNecessary: 5
   * });
   * console.log('Recommended tip:', tipEstimate.recommendedTip);
   * ```
   */
  public abstract getEstimateTip(
    blockIdentifier?: BlockIdentifier,
    options?: TipAnalysisOptions
  ): Promise<TipEstimate>;
}
