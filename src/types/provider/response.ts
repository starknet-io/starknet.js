/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import * as RPC from '../api';
import { CompiledSierra, LegacyContractClass } from '../lib';

export type GetBlockResponse = PendingBlock | Block;

export type PendingBlock = {
  status: 'PENDING';
  parent_hash: RPC.SPEC.BLOCK_HASH;
  timestamp: number;
  sequencer_address: RPC.Felt;
  l1_gas_price: RPC.SPEC.RESOURCE_PRICE;
  starknet_version: string;
  transactions: RPC.SPEC.TXN_HASH[];
};

export type Block = {
  status: 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
  block_hash: RPC.SPEC.BLOCK_HASH;
  parent_hash: RPC.SPEC.BLOCK_HASH;
  block_number: RPC.SPEC.BLOCK_NUMBER;
  new_root: RPC.SPEC.FELT;
  timestamp: number;
  sequencer_address: RPC.SPEC.FELT;
  l1_gas_price: RPC.SPEC.RESOURCE_PRICE;
  starknet_version: string;
  transactions: RPC.SPEC.TXN_HASH[];
};

export type GetTransactionResponse = RPC.TransactionWithHash;

// TODO: solve this one
export interface Event {
  from_address: string;
  keys: Array<string>;
  data: Array<string>;
}

// TODO Check if can be pending discriminated
export type GetTransactionReceiptResponse = RPC.Receipt | RPC.PendingReceipt;
// Spread individual types for usage convenience
export type InvokeTransactionReceiptResponse =
  | RPC.SPEC.INVOKE_TXN_RECEIPT
  | RPC.SPEC.PENDING_INVOKE_TXN_RECEIPT;
export type DeclareTransactionReceiptResponse =
  | RPC.SPEC.DECLARE_TXN_RECEIPT
  | RPC.SPEC.PENDING_DECLARE_TXN_RECEIPT;
export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
export type DeployAccountTransactionReceiptResponse =
  | RPC.SPEC.DEPLOY_ACCOUNT_TXN_RECEIPT
  | RPC.SPEC.PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT;
export type L1HandlerTransactionReceiptResponse =
  | RPC.SPEC.L1_HANDLER_TXN_RECEIPT
  | RPC.SPEC.PENDING_L1_HANDLER_TXN_RECEIPT;

export interface EstimateFeeResponse {
  gas_consumed: bigint;
  overall_fee: bigint;
  gas_price: bigint;
  unit: RPC.PriceUnit;
  suggestedMaxFee: bigint;
  resourceBounds: RPC.ResourceBounds;
}

export type EstimateFeeResponseBulk = Array<EstimateFeeResponse>;

export type InvokeFunctionResponse = RPC.InvokedTransaction;

export type DeclareContractResponse = RPC.DeclaredTransaction;

export type CallContractResponse = string[];

export type Storage = RPC.Felt;

export type Nonce = string;

export type SimulationFlags = RPC.SimulationFlags;

export type SimulatedTransaction = RPC.SimulateTransaction & {
  suggestedMaxFee: bigint;
  resourceBounds: RPC.ResourceBounds;
};

export type SimulateTransactionResponse = SimulatedTransaction[];

// TODO: Make discriminator key
export type StateUpdateResponse = StateUpdate | PendingStateUpdate;
export type StateUpdate = RPC.SPEC.STATE_UPDATE;
export type PendingStateUpdate = RPC.SPEC.PENDING_STATE_UPDATE;

/**
 * Standardized type
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 * abi Abi
 * CompiledSierra without '.sierra_program_debug_info'
 */
export type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>;
