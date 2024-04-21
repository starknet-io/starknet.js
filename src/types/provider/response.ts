/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import {
  CompiledSierra,
  LegacyContractClass,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionType,
  TransactionStatus,
  BlockNumber,
} from '../lib';
import {
  BLOCK_HASH,
  BLOCK_NUMBER,
  DECLARE_TXN_RECEIPT,
  DEPLOY_ACCOUNT_TXN_RECEIPT,
  FELT,
  INVOKE_TXN_RECEIPT,
  L1_HANDLER_TXN_RECEIPT,
  PENDING_DECLARE_TXN_RECEIPT,
  PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT,
  PENDING_INVOKE_TXN_RECEIPT,
  PENDING_L1_HANDLER_TXN_RECEIPT,
  PENDING_STATE_UPDATE,
  PRICE_UNIT,
  RESOURCE_PRICE,
  SIMULATION_FLAG,
  STATE_UPDATE,
  TXN_HASH,
  DeclaredTransaction,
  InvokedTransaction,
  ResourceBounds,
  SimulateTransaction,
  TransactionWithHash,
} from './spec';

export type { BLOCK_HASH, BLOCK_NUMBER, RESOURCE_PRICE, TXN_HASH };

export { BlockWithTxHashes, ContractClassPayload, FeeEstimate, TransactionReceipt } from './spec';

export type GetBlockResponse = PendingBlock | Block;

export type PendingBlock = {
  status: 'PENDING';
  parent_hash: BLOCK_HASH;
  timestamp: number;
  sequencer_address: FELT;
  l1_gas_price: RESOURCE_PRICE;
  starknet_version: string;
  transactions: TXN_HASH[];
};

export type Block = {
  status: 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
  block_hash: BLOCK_HASH;
  parent_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
  new_root: FELT;
  timestamp: number;
  sequencer_address: FELT;
  l1_gas_price: RESOURCE_PRICE;
  starknet_version: string;
  transactions: TXN_HASH[];
};

export interface MessageToL1 {
  to_address: string;
  payload: Array<string>;
}

export type RevertedTransactionReceiptResponse = {
  type?: TransactionType | any; // RPC only // any due to RPC Spec issue
  execution_status: TransactionExecutionStatus.REVERTED | any; // any due to RPC Spec issue
  finality_status: TransactionFinalityStatus | any;
  status?: TransactionStatus; // SEQ only
  actual_fee: string;
  block_hash?: string; // ?~ optional due to RPC spec issue
  block_number?: BlockNumber; // ?~ optional due to RCP spec issue
  transaction_hash: string;
  transaction_index?: number; // SEQ only
  messages_sent: Array<MessageToL1>; // SEQ Casted l2_to_l1_messages
  events: any[];
  revert_reason?: string; // SEQ Casted revert_error // ?~ optional due to RCP spec issue
};

export type RejectedTransactionReceiptResponse = {
  status: `${TransactionStatus.REJECTED}`;
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
};

export type GetTxReceiptResponseWithoutHelper =
  | SuccessfulTransactionReceiptResponse
  | RevertedTransactionReceiptResponse
  | RejectedTransactionReceiptResponse;

export type SuccessfulTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeployTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export type { TransactionWithHash };
export type GetTransactionResponse = TransactionWithHash;
// Spread individual types for usage convenience
export type { INVOKE_TXN_RECEIPT, PENDING_INVOKE_TXN_RECEIPT };
export type InvokeTransactionReceiptResponse = INVOKE_TXN_RECEIPT | PENDING_INVOKE_TXN_RECEIPT;
export type { DECLARE_TXN_RECEIPT, PENDING_DECLARE_TXN_RECEIPT };
export type DeclareTransactionReceiptResponse = DECLARE_TXN_RECEIPT | PENDING_DECLARE_TXN_RECEIPT;
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
export type { DEPLOY_ACCOUNT_TXN_RECEIPT, PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT };
export type DeployAccountTransactionReceiptResponse =
  | DEPLOY_ACCOUNT_TXN_RECEIPT
  | PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT;
export type { L1_HANDLER_TXN_RECEIPT, PENDING_L1_HANDLER_TXN_RECEIPT };
export type L1HandlerTransactionReceiptResponse =
  | L1_HANDLER_TXN_RECEIPT
  | PENDING_L1_HANDLER_TXN_RECEIPT;

export type { PRICE_UNIT };
export interface EstimateFeeResponse {
  gas_consumed: bigint;
  overall_fee: bigint;
  gas_price: bigint;
  unit: PRICE_UNIT;
  suggestedMaxFee: bigint;
  resourceBounds: ResourceBounds;
  data_gas_consumed: bigint;
  data_gas_price: bigint;
}

export type EstimateFeeResponseBulk = Array<EstimateFeeResponse>;

export type { InvokedTransaction };
export type InvokeFunctionResponse = InvokedTransaction;

export type { DeclaredTransaction };
export type DeclareContractResponse = DeclaredTransaction;

export type CallContractResponse = string[];

export type { FELT };
export type Storage = FELT;

export type Nonce = string;

export type { SIMULATION_FLAG };
export type SimulationFlags = Array<SIMULATION_FLAG>;

export type { SimulateTransaction, ResourceBounds };
export type SimulatedTransaction = SimulateTransaction & {
  suggestedMaxFee: bigint;
  resourceBounds: ResourceBounds;
};

export type SimulateTransactionResponse = SimulatedTransaction[];

export type StateUpdateResponse = StateUpdate | PendingStateUpdate;
export type { STATE_UPDATE };
export type StateUpdate = STATE_UPDATE;
export type { PENDING_STATE_UPDATE };
export type PendingStateUpdate = PENDING_STATE_UPDATE;

/**
 * Standardized type
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 * abi Abi
 * CompiledSierra without '.sierra_program_debug_info'
 */
export type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>;
