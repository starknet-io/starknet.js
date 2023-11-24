/**
 * Types that are not in spec but required for UX
 */
import {
  ADDRESS,
  BLOCK_HASH,
  BLOCK_NUMBER,
  BLOCK_WITH_TXS,
  BLOCK_WITH_TX_HASHES,
  BROADCASTED_TXN,
  CHAIN_ID,
  CONTRACT_CLASS,
  CONTRACT_STORAGE_DIFF_ITEM,
  DEPRECATED_CONTRACT_CLASS,
  EVENTS_CHUNK,
  EVENT_FILTER,
  FEE_ESTIMATE,
  FELT,
  MSG_FROM_L1,
  NONCE_UPDATE,
  PENDING_BLOCK_WITH_TXS,
  PENDING_BLOCK_WITH_TX_HASHES,
  PENDING_STATE_UPDATE,
  PENDING_TXN_RECEIPT,
  REPLACED_CLASS,
  RESULT_PAGE_REQUEST,
  SIMULATION_FLAG,
  STATE_UPDATE,
  SYNC_STATUS,
  TRANSACTION_TRACE,
  TXN,
  TXN_EXECUTION_STATUS,
  TXN_HASH,
  TXN_RECEIPT,
  TXN_STATUS,
} from './components';

// METHOD RESPONSES
// response starknet_getClass
export type ContractClass = CONTRACT_CLASS | DEPRECATED_CONTRACT_CLASS;
// response starknet_simulateTransactions
export type SimulateTransactionResponse = {
  transaction_trace: TRANSACTION_TRACE;
  fee_estimation: FEE_ESTIMATE;
}[];
// response starknet_estimateFee
export type FeeEstimate = FEE_ESTIMATE;
// response starknet_getTransactionByHash, starknet_getTransactionByBlockIdAndIndex
export type TransactionWithHash = TXN & { transaction_hash: TXN_HASH };
// response starknet_blockHashAndNumber
export type BlockHashAndNumber = { block_hash: BLOCK_HASH; block_number: BLOCK_NUMBER };
// response starknet_getBlockWithTxs
export type BlockWithTxs = BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS;
// response starknet_getBlockWithTxHashes
export type BlockWithTxHashes = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
// response starknet_getStateUpdate
export type StateUpdate = STATE_UPDATE | PENDING_STATE_UPDATE;
// response starknet_traceBlockTransactions
export type BlockTransactionsTraces = { transaction_hash: FELT; trace_root: TRANSACTION_TRACE }[];
// response starknet_syncing
export type Syncing = false | SYNC_STATUS;
// response starknet_getEvents
export type Events = EVENTS_CHUNK;
// response starknet_addInvokeTransaction
export type InvokedTransaction = { transaction_hash: TXN_HASH };
// response starknet_addDeclareTransaction
export type DeclaredTransaction = { transaction_hash: TXN_HASH; class_hash: FELT };
// response starknet_addDeployAccountTransaction
export type DeployedAccountTransaction = { transaction_hash: TXN_HASH; contract_address: FELT };

// Nice Components names
export type ContractAddress = ADDRESS;
export type Felt = FELT;
export type Nonce = FELT;
export type TransactionHash = TXN_HASH;
export type TransactionTrace = TRANSACTION_TRACE;
export type BlockHash = BLOCK_HASH;
export type TransactionReceipt = TXN_RECEIPT | PENDING_TXN_RECEIPT;
export type EventFilter = EVENT_FILTER & RESULT_PAGE_REQUEST;
export type SimulationFlags = Array<SIMULATION_FLAG>;
export type L1Message = MSG_FROM_L1;
export type BaseTransaction = BROADCASTED_TXN;
export type ChainId = CHAIN_ID;
export type Transaction = TXN;
export type TransactionStatus = {
  finality_status: TXN_STATUS;
  execution_status?: TXN_EXECUTION_STATUS;
};

// Diff Than Seq
export type StorageDiffs = Array<CONTRACT_STORAGE_DIFF_ITEM>;
export type DeprecatedDeclaredClasses = Array<FELT>;
export type NonceUpdates = NONCE_UPDATE[];
export type ReplacedClasses = REPLACED_CLASS[];

// Enums Derived From Spec Types (require manual check for changes)
export enum ETransactionType {
  DECLARE = 'DECLARE',
  DEPLOY = 'DEPLOY',
  DEPLOY_ACCOUNT = 'DEPLOY_ACCOUNT',
  INVOKE = 'INVOKE',
  L1_HANDLER = 'L1_HANDLER',
}

export enum ESimulationFlag {
  SKIP_VALIDATE = 'SKIP_VALIDATE',
  SKIP_FEE_CHARGE = 'SKIP_FEE_CHARGE',
}

export enum ETransactionStatus {
  RECEIVED = 'RECEIVED',
  REJECTED = 'REJECTED',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
}

export enum ETransactionFinalityStatus {
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
}
export enum ETransactionExecutionStatus {
  SUCCEEDED = 'SUCCEEDED',
  REVERTED = 'REVERTED',
}

export enum EBlockTag {
  LATEST = 'latest',
  PENDING = 'pending',
}

export enum EDataAvailabilityMode {
  L1 = 'L1',
  L2 = 'L2',
}
