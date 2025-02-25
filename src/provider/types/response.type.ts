/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import { IsReverted, IsSucceeded, IsType } from 'starknet-types-08';
import { CompiledSierra, LegacyContractClass } from '../../types/lib';
import {
  BLOCK_HASH,
  BLOCK_NUMBER,
  FELT,
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
} from './spec.type';

import { TransactionReceipt } from '../../types/api';

export { BlockWithTxHashes, ContractClassPayload, FeeEstimate } from './spec.type';

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

/* 
export type RevertedTransactionReceiptResponse = {
  type?: TransactionType | any; // RPC only // any due to RPC Spec issue
  execution_status: typeof TransactionExecutionStatus.REVERTED | any; // any due to RPC Spec
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
*/

// This do not exist any more as tx receipt
/* export type RejectedTransactionReceiptResponse = {
  status: typeof TransactionStatus.REJECTED;
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
}; */

export type GetTxReceiptResponseWithoutHelper = TransactionReceipt;

// TODO: This has misleading name as it is all types not just success
/* export type SuccessfulTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeployTransactionReceiptResponse
  | DeclareTransactionReceiptResponse; */

export type SuccessfulTransactionReceiptResponse = IsSucceeded<TransactionReceipt>;
export type RevertedTransactionReceiptResponse = IsReverted<TransactionReceipt>;

export type InvokeTransactionReceiptResponse = IsType<TransactionReceipt, 'INVOKE'>;
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
export type DeclareTransactionReceiptResponse = IsType<TransactionReceipt, 'DECLARE'>;

// Spread individual types for usage convenience
/* 
export type InvokeTransactionReceiptResponse = INVOKE_TXN_RECEIPT | PENDING_INVOKE_TXN_RECEIPT;
export type DeclareTransactionReceiptResponse = DECLARE_TXN_RECEIPT | PENDING_DECLARE_TXN_RECEIPT;

export type DeployAccountTransactionReceiptResponse =
  | DEPLOY_ACCOUNT_TXN_RECEIPT
  | PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT;
export type L1HandlerTransactionReceiptResponse =
  | L1_HANDLER_TXN_RECEIPT
  | PENDING_L1_HANDLER_TXN_RECEIPT; 
*/

export type GetTransactionResponse = TransactionWithHash;

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

export type InvokeFunctionResponse = InvokedTransaction;

export type DeclareContractResponse = DeclaredTransaction;

export type CallContractResponse = string[];

export type Storage = FELT;

export type Nonce = string;

export type { SIMULATION_FLAG };
export type SimulationFlags = Array<SIMULATION_FLAG>;

export type SimulatedTransaction = SimulateTransaction & {
  suggestedMaxFee: bigint;
  resourceBounds: ResourceBounds;
};

export type SimulateTransactionResponse = SimulatedTransaction[];

export type StateUpdateResponse = StateUpdate | PendingStateUpdate;
export type StateUpdate = STATE_UPDATE;
export type PendingStateUpdate = PENDING_STATE_UPDATE;

/**
 * Standardized type
 *
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 *
 * abi Abi
 *
 * CompiledSierra without '.sierra_program_debug_info'
 */
export type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>;
