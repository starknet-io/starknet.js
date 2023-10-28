import {
  ADDRESS,
  BLOCK_HASH,
  BLOCK_WITH_TX_HASHES,
  BROADCASTED_TXN,
  CONTRACT_CLASS,
  CONTRACT_STORAGE_DIFF_ITEM,
  DEPRECATED_CONTRACT_CLASS,
  EVENT_FILTER,
  FEE_ESTIMATE,
  FELT,
  PENDING_BLOCK_WITH_TX_HASHES,
  PENDING_TXN_RECEIPT,
  REPLACED_CLASS,
  RESULT_PAGE_REQUEST,
  Methods as RPCMethods,
  SIMULATION_FLAG,
  TRANSACTION_TRACE,
  TXN_EXECUTION_STATUS,
  TXN_FINALITY_STATUS,
  TXN_HASH,
  TXN_RECEIPT,
  TXN_TYPE,
  TransactionWithHash,
} from './rpcspec';

export { JRPC } from './jsonrpc';

export * as SPEC from './rpcspec';

export type Methods = RPCMethods;
// export type ChainId = OPENRPC.CHAIN_ID;
// export type CallResponse = OPENRPC.CallResponse;
export type ContractAddress = ADDRESS;
export type Felt = FELT;
export type Nonce = FELT;
export type ContractClass = CONTRACT_CLASS | DEPRECATED_CONTRACT_CLASS;
// export type StateUpdate = STATE_UPDATE | PENDING_STATE_UPDATE;
// export type Transaction = TXN;
// export type PendingTransactions = TXN & { transaction_hash: TXN_HASH };
export type TransactionHash = TXN_HASH;
export type Trace = TRANSACTION_TRACE;
export type Traces = { transaction_hash: FELT; trace_root: TRANSACTION_TRACE };
export type BlockHash = BLOCK_HASH;
// export type BlockHashAndNumber = OPENRPC.BlockHashAndNumber;
export type EstimateFeeResponse = FEE_ESTIMATE;
export type GetBlockWithTxHashesResponse = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
// export type GetBlockWithTxs = OPENRPC.BlockWithTxs;
// export type GetStorageAtResponse = OPENRPC.Storage;
export type TransactionReceipt = TXN_RECEIPT | PENDING_TXN_RECEIPT;
export type GetTransactionByHashResponse = TransactionWithHash;
// export type GetTransactionByBlockIdAndIndex = OPENRPC.TransactionWithHash;
// export type GetTransactionCountResponse = number;
// export type GetBlockNumberResponse = OPENRPC.BlockNumber;
// export type GetSyncingStatsResponse = OPENRPC.SyncingStatus;
export type EventFilter = EVENT_FILTER & RESULT_PAGE_REQUEST;
// export type GetEventsResponse = OPENRPC.Events;
// export type InvokedTransaction = OPENRPC.InvokedTransaction;
// export type DeclaredTransaction = OPENRPC.DeclaredTransaction;
// export type DeployedTransaction = OPENRPC.DeployedTransaction;
export type SimulationFlags = Array<SIMULATION_FLAG>;
// export type EstimatedFee = OPENRPC.EstimatedFee;
// export type Storage = OPENRPC.Storage;
export type SimulateTransactionResponse = {
  transaction_trace: TRANSACTION_TRACE;
  fee_estimation: FEE_ESTIMATE;
}[];

export type TransactionType = TXN_TYPE;
export type SimulationFlag = SIMULATION_FLAG;

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

export const TransactionFinalityStatus = TXN_FINALITY_STATUS;
export const TransactionExecutionStatus = TXN_EXECUTION_STATUS;

// Default Supported Transactions
export type BaseTransaction = BROADCASTED_TXN;

// Exported Diff on Sequencer (can be removed when diff resolved by new RPC v)
export type StorageDiffs = Array<CONTRACT_STORAGE_DIFF_ITEM>;
export type DeprecatedDeclaredClasses = Array<FELT>;
export type Nonces = Array<{
  contract_address: ADDRESS;
  nonce: FELT;
}>;
export type ReplacedClasses = REPLACED_CLASS[];
