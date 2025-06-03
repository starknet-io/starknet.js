// this file aims to unify the RPC specification types used by the common Provider class

import * as RPCSPEC07 from '@starknet-io/starknet-types-07';
import * as RPCSPEC08 from '@starknet-io/starknet-types-08';

import { SimpleOneOf } from '../../types/helpers';

// taken from type-fest
export type Simplify<T> = { [K in keyof T]: T[K] } & {};

// taken from type-fest
export type RequiredKeysOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
  }[keyof T],
  undefined
>;

type ArrayElement<T> = T extends Array<infer U> ? U : never;

type MergeProperties<T1 extends Record<any, any>, T2 extends Record<any, any>> = {
  [K in RequiredKeysOf<T1> & RequiredKeysOf<T2>]: Merge<T1[K], T2[K]>;
} & {
  [K in keyof T1 & keyof T2]?: Merge<T1[K], T2[K]>;
} & {
  [K in Exclude<keyof T1, keyof T2>]?: T1[K];
} & {
  [K in Exclude<keyof T2, keyof T1>]?: T2[K];
};

/**
 *  type a = { w: bigint[]; x: bigint; y: string };
 type b = { w: number[]; x: number; z: string };
 type c = Merge<a, b>; // { w: (bigint | number)[] x: bigint | number; y?: string; z?: string; }

 NOTE: handling for ambiguous overlaps, such as a shared property being an array or object,
 is simplified to resolve to only one type since there shouldn't be such occurrences in the
 currently supported RPC specifications
 */
type Merge<T1, T2> = Simplify<
  T1 extends Array<any>
    ? T2 extends Array<any>
      ? Array<Merge<ArrayElement<T1>, ArrayElement<T2>>>
      : T1
    : T2 extends Array<any>
      ? T2
      : T1 extends object
        ? T2 extends object
          ? MergeProperties<T1, T2>
          : T1
        : T2 extends object
          ? T2
          : T1 | T2
>;

// Default exports for both RPCs
export type ETransactionVersion = RPCSPEC08.ETransactionVersion;
export const { ETransactionVersion } = RPCSPEC08;

export type ETransactionVersion2 = RPCSPEC08.ETransactionVersion2;
export const { ETransactionVersion2 } = RPCSPEC08;

export type ETransactionVersion3 = RPCSPEC08.ETransactionVersion3;
export const { ETransactionVersion3 } = RPCSPEC08;

// MERGES
export type BLOCK_HASH = Merge<RPCSPEC08.BLOCK_HASH, RPCSPEC07.SPEC.BLOCK_HASH>;
export type BLOCK_NUMBER = Merge<RPCSPEC08.BLOCK_NUMBER, RPCSPEC07.SPEC.BLOCK_NUMBER>;
export type FELT = Merge<RPCSPEC08.FELT, RPCSPEC07.SPEC.FELT>;
export type TXN_HASH = Merge<RPCSPEC08.TXN_HASH, RPCSPEC07.SPEC.TXN_HASH>;

export type PRICE_UNIT = Merge<RPCSPEC08.PRICE_UNIT, RPCSPEC07.SPEC.PRICE_UNIT>;
export type RESOURCE_PRICE = Merge<RPCSPEC08.RESOURCE_PRICE, RPCSPEC07.SPEC.RESOURCE_PRICE>;
export type SIMULATION_FLAG = Merge<RPCSPEC08.SIMULATION_FLAG, RPCSPEC07.SPEC.SIMULATION_FLAG>;

export type STATE_UPDATE = Merge<RPCSPEC08.STATE_UPDATE, RPCSPEC07.SPEC.STATE_UPDATE>;
export type PENDING_STATE_UPDATE = Merge<
  RPCSPEC08.PENDING_STATE_UPDATE,
  RPCSPEC07.SPEC.PENDING_STATE_UPDATE
>;

// TODO: Can we remove all of this ?
/* export type INVOKE_TXN_RECEIPT = IsInBlock<RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'INVOKE'>>;
export type DECLARE_TXN_RECEIPT = IsInBlock<RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'DECLARE'>>;
export type DEPLOY_ACCOUNT_TXN_RECEIPT = IsInBlock<
  RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'DEPLOY_ACCOUNT'>
>;
export type L1_HANDLER_TXN_RECEIPT = IsInBlock<RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'L1_HANDLER'>>; */

export type PENDING_INVOKE_TXN_RECEIPT = RPCSPEC08.IsPending<
  RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'INVOKE'>
>;
export type PENDING_DECLARE_TXN_RECEIPT = RPCSPEC08.IsPending<
  RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'DECLARE'>
>;
export type PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT = RPCSPEC08.IsPending<
  RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'DEPLOY_ACCOUNT'>
>;
export type PENDING_L1_HANDLER_TXN_RECEIPT = RPCSPEC08.IsPending<
  RPCSPEC08.IsType<RPCSPEC08.TransactionReceipt, 'L1_HANDLER'>
>;
//

export type BlockWithTxHashes = Merge<RPCSPEC08.BlockWithTxHashes, RPCSPEC07.BlockWithTxHashes>;
export type ContractClassPayload = Merge<RPCSPEC08.ContractClass, RPCSPEC07.ContractClass>;
export type DeclaredTransaction = Merge<
  RPCSPEC08.DeclaredTransaction,
  RPCSPEC07.DeclaredTransaction
>;
export type InvokedTransaction = Merge<RPCSPEC08.InvokedTransaction, RPCSPEC07.InvokedTransaction>;
export type DeployedAccountTransaction = Merge<
  RPCSPEC08.DeployedAccountTransaction,
  RPCSPEC07.DeployedAccountTransaction
>;

export type L1Message = Merge<RPCSPEC08.L1Message, RPCSPEC07.L1Message>;
export type EventFilter = RPCSPEC08.EventFilter;
export type L1_HANDLER_TXN = RPCSPEC08.L1_HANDLER_TXN;
export type EDataAvailabilityMode = RPCSPEC08.EDataAvailabilityMode;
export const { EDataAvailabilityMode } = RPCSPEC08;
export type EDAMode = RPCSPEC08.EDAMode;
export const { EDAMode } = RPCSPEC08;
export type EmittedEvent = Merge<RPCSPEC08.EmittedEvent, RPCSPEC07.EmittedEvent>;
export type Event = Merge<RPCSPEC08.Event, RPCSPEC07.Event>;

export type PendingReceipt = Merge<
  RPCSPEC08.TransactionReceiptPendingBlock,
  RPCSPEC07.PendingReceipt
>;
export type Receipt = Merge<RPCSPEC08.TransactionReceiptProductionBlock, RPCSPEC07.Receipt>;

// One of
export type FeeEstimate = SimpleOneOf<RPCSPEC08.FEE_ESTIMATE, RPCSPEC07.SPEC.FEE_ESTIMATE>;

export function isRPC08_FeeEstimate(entry: FeeEstimate): entry is RPCSPEC08.FEE_ESTIMATE {
  return 'l1_data_gas_consumed' in entry;
}

// One of
export type ResourceBounds = Simplify<
  SimpleOneOf<RPCSPEC08.ResourceBounds, RPCSPEC07.ResourceBounds>
>;

export function isRPC08_ResourceBounds(entry: ResourceBounds): entry is RPCSPEC08.ResourceBounds {
  return 'l1_data_gas' in entry;
}

/**
 * overhead percentage on estimate fee
 */
export type ResourceBoundsOverhead = ResourceBoundsOverheadRPC08 | ResourceBoundsOverheadRPC07;

/**
 * percentage overhead on estimated fee
 */
export type ResourceBoundsOverheadRPC08 = {
  l1_gas: {
    max_amount: number;
    max_price_per_unit: number;
  };
  l2_gas: {
    max_amount: number;
    max_price_per_unit: number;
  };
  l1_data_gas: {
    max_amount: number;
    max_price_per_unit: number;
  };
};

export type ResourceBoundsOverheadRPC07 = {
  l1_gas: {
    max_amount: number;
    max_price_per_unit: number;
  };
};

// TODO: ja mislin da types-js rpc 0.7 ima krivu definiciju za transaction trace
export type SimulateTransaction = RPCSPEC08.SimulateTransaction;

export type TransactionWithHash = Merge<
  RPCSPEC08.TransactionWithHash,
  RPCSPEC07.TransactionWithHash
>;

export type TransactionReceipt = Merge<RPCSPEC08.TransactionReceipt, RPCSPEC07.TransactionReceipt>;
export type Methods = RPCSPEC08.Methods;
export type TXN_STATUS = Merge<RPCSPEC08.TXN_STATUS, RPCSPEC07.SPEC.TXN_STATUS>;
export type TXN_EXECUTION_STATUS = Merge<
  RPCSPEC08.TXN_EXECUTION_STATUS,
  RPCSPEC07.SPEC.TXN_EXECUTION_STATUS
>;
export type TransactionStatus = Merge<RPCSPEC08.TransactionStatus, RPCSPEC07.TransactionStatus>;
export type ETransactionStatus = RPCSPEC08.ETransactionStatus;
export const { ETransactionStatus } = RPCSPEC08;
export type ETransactionExecutionStatus = RPCSPEC08.ETransactionExecutionStatus;
export const { ETransactionExecutionStatus } = RPCSPEC08;
export type TRANSACTION_TRACE = Merge<
  RPCSPEC08.TRANSACTION_TRACE,
  RPCSPEC07.SPEC.TRANSACTION_TRACE
>;
export type FEE_ESTIMATE = Merge<RPCSPEC08.FEE_ESTIMATE, RPCSPEC07.SPEC.FEE_ESTIMATE>;
export type EVENTS_CHUNK = Merge<RPCSPEC08.EVENTS_CHUNK, RPCSPEC07.SPEC.EVENTS_CHUNK>;
