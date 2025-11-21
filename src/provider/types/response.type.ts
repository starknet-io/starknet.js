/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import {
  BLOCK_WITH_TX_HASHES,
  IsReverted,
  IsSucceeded,
  IsType,
  PRE_CONFIRMED_BLOCK_WITH_TX_HASHES,
  TransactionReceipt,
} from '../../types/api';

import { CompiledSierra, LegacyContractClass } from '../../types/lib';
import {
  FELT,
  PRICE_UNIT,
  SIMULATION_FLAG,
  STATE_UPDATE,
  DeclaredTransaction,
  InvokedTransaction,
  TransactionWithHash,
  Simplify,
  ResourceBoundsBN,
  TransactionTrace,
  BlockWithTxHashes,
  PRE_CONFIRMED_STATE_UPDATE,
} from './spec.type';

export type Block = Simplify<BLOCK_WITH_TX_HASHES>;
export type PreConfirmedBlock = Simplify<PRE_CONFIRMED_BLOCK_WITH_TX_HASHES>;
export type GetBlockResponse = Simplify<BlockWithTxHashes>;

export type GetTxReceiptResponseWithoutHelper = TransactionReceipt;

export type SuccessfulTransactionReceiptResponse = IsSucceeded<TransactionReceipt>;
export type RevertedTransactionReceiptResponse = IsReverted<TransactionReceipt>;
export type InvokeTransactionReceiptResponse = IsType<TransactionReceipt, 'INVOKE'>;
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
export type DeclareTransactionReceiptResponse = IsType<TransactionReceipt, 'DECLARE'>;
export type DeployAccountTransactionReceiptResponse = IsType<TransactionReceipt, 'DEPLOY_ACCOUNT'>;
export type L1HandlerTransactionReceiptResponse = IsType<TransactionReceipt, 'L1_HANDLER'>;

export type GetTransactionResponse = TransactionWithHash;

/**
 * Estimate fee response with overhead
 */
export type EstimateFeeResponseOverhead = {
  resourceBounds: ResourceBoundsBN;
  overall_fee: bigint;
  unit: PRICE_UNIT;
};

export type EstimateFeeResponseBulkOverhead = Array<EstimateFeeResponseOverhead>;

export type InvokeFunctionResponse = InvokedTransaction;

export type DeclareContractResponse = DeclaredTransaction;

export type CallContractResponse = string[];

export type Storage = FELT;

export type Nonce = string;

// export type { SIMULATION_FLAG };
export type SimulationFlags = Array<SIMULATION_FLAG>;

export type SimulateTransactionOverhead = {
  transaction_trace: TransactionTrace;
} & EstimateFeeResponseOverhead;

export type SimulateTransactionOverheadResponse = SimulateTransactionOverhead[];

export type PreConfirmedStateUpdate = PRE_CONFIRMED_STATE_UPDATE;
export type StateUpdate = STATE_UPDATE;
export type StateUpdateResponse = StateUpdate | PreConfirmedStateUpdate;

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
