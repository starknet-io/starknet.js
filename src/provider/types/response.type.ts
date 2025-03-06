/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import {
  BLOCK_WITH_TX_HASHES,
  BlockWithTxHashes,
  IsReverted,
  IsSucceeded,
  IsType,
  PENDING_BLOCK_WITH_TX_HASHES,
} from 'starknet-types-08';
import { CompiledSierra, LegacyContractClass } from '../../types/lib';
import {
  FELT,
  PENDING_STATE_UPDATE,
  PRICE_UNIT,
  SIMULATION_FLAG,
  STATE_UPDATE,
  DeclaredTransaction,
  InvokedTransaction,
  ResourceBounds,
  SimulateTransaction,
  TransactionWithHash,
  Simplify,
} from './spec.type';

import { TransactionReceipt } from '../../types/api';

export type Block = Simplify<BLOCK_WITH_TX_HASHES>;
export type PendingBlock = Simplify<PENDING_BLOCK_WITH_TX_HASHES>;
export type GetBlockResponse = Simplify<BlockWithTxHashes>;

/* export interface MessageToL1 {
  to_address: string;
  payload: Array<string>;
} */

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
  overall_fee: bigint;
  unit: PRICE_UNIT;

  l1_gas_consumed: bigint;
  l1_gas_price: bigint;
  l2_gas_consumed: bigint | undefined;
  l2_gas_price: bigint | undefined;
  l1_data_gas_consumed: bigint;
  l1_data_gas_price: bigint;

  suggestedMaxFee: bigint;
  resourceBounds: ResourceBounds;
}

export type EstimateFeeResponseBulk = Array<EstimateFeeResponse>;

export type InvokeFunctionResponse = InvokedTransaction;

export type DeclareContractResponse = DeclaredTransaction;

export type CallContractResponse = string[];

export type Storage = FELT;

export type Nonce = string;

// export type { SIMULATION_FLAG };
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
