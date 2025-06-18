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
} from '@starknet-io/starknet-types-08';
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

export type GetTxReceiptResponseWithoutHelper = TransactionReceipt;

export type SuccessfulTransactionReceiptResponse = IsSucceeded<TransactionReceipt>;
export type RevertedTransactionReceiptResponse = IsReverted<TransactionReceipt>;
export type InvokeTransactionReceiptResponse = IsType<TransactionReceipt, 'INVOKE'>;
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
export type DeclareTransactionReceiptResponse = IsType<TransactionReceipt, 'DECLARE'>;
export type DeployAccountTransactionReceiptResponse = IsType<TransactionReceipt, 'DEPLOY_ACCOUNT'>;
export type L1HandlerTransactionReceiptResponse = IsType<TransactionReceipt, 'L1_HANDLER'>;

export type GetTransactionResponse = TransactionWithHash;

export type EstimateFeeResponse = {
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
};

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
