// this file aims to unify the RPC specification types used by the common Provider class

import { SimpleOneOf } from '../../types/helpers';
import { RPCSPEC09, RPCSPEC08 } from '../../types/api';

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
export type ETransactionVersion = RPCSPEC09.ETransactionVersion;
export const { ETransactionVersion } = RPCSPEC09;

export type ETransactionVersion2 = RPCSPEC09.ETransactionVersion2;
export const { ETransactionVersion2 } = RPCSPEC09;

export type ETransactionVersion3 = RPCSPEC09.ETransactionVersion3;
export const { ETransactionVersion3 } = RPCSPEC09;

// MERGES
export type BLOCK_HASH = Merge<RPCSPEC08.BLOCK_HASH, RPCSPEC09.BLOCK_HASH>;
export type BLOCK_NUMBER = Merge<RPCSPEC08.BLOCK_NUMBER, RPCSPEC09.BLOCK_NUMBER>;
export type FELT = Merge<RPCSPEC08.FELT, RPCSPEC09.FELT>;
export type TXN_HASH = Merge<RPCSPEC08.TXN_HASH, RPCSPEC09.TXN_HASH>;

export type PRICE_UNIT = Merge<RPCSPEC08.PRICE_UNIT, RPCSPEC09.PRICE_UNIT>;
export type RESOURCE_PRICE = Merge<RPCSPEC08.RESOURCE_PRICE, RPCSPEC09.RESOURCE_PRICE>;
export type SIMULATION_FLAG = Merge<RPCSPEC08.SIMULATION_FLAG, RPCSPEC09.SIMULATION_FLAG>;

export type STATE_UPDATE = Merge<RPCSPEC08.STATE_UPDATE, RPCSPEC09.STATE_UPDATE>;
export type PENDING_STATE_UPDATE = Merge<
  RPCSPEC08.PENDING_STATE_UPDATE,
  RPCSPEC09.PRE_CONFIRMED_STATE_UPDATE
>;
export type PRE_CONFIRMED_STATE_UPDATE = RPCSPEC09.PRE_CONFIRMED_STATE_UPDATE;

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

export type BlockWithTxHashes = Merge<RPCSPEC08.BlockWithTxHashes, RPCSPEC09.BlockWithTxHashes>;
export type ContractClassPayload = Merge<RPCSPEC08.ContractClass, RPCSPEC09.ContractClass>;
export type DeclaredTransaction = Merge<
  RPCSPEC08.DeclaredTransaction,
  RPCSPEC09.DeclaredTransaction
>;
export type InvokedTransaction = Merge<RPCSPEC08.InvokedTransaction, RPCSPEC09.InvokedTransaction>;
export type DeployedAccountTransaction = Merge<
  RPCSPEC08.DeployedAccountTransaction,
  RPCSPEC09.DeployedAccountTransaction
>;

export type L1_HANDLER_TXN = RPCSPEC08.L1_HANDLER_TXN;
export type EDataAvailabilityMode = RPCSPEC08.EDataAvailabilityMode;
export const { EDataAvailabilityMode } = RPCSPEC08;
export type EDAMode = RPCSPEC08.EDAMode;
export const { EDAMode } = RPCSPEC08;
export type EmittedEvent = Merge<RPCSPEC08.EmittedEvent, RPCSPEC09.EmittedEvent>;
export type Event = Merge<RPCSPEC08.Event, RPCSPEC09.Event>;

export type PendingReceipt = Merge<
  RPCSPEC08.TransactionReceiptPendingBlock,
  RPCSPEC09.TransactionReceiptPreConfirmedBlock
>;
export type Receipt = Merge<
  RPCSPEC08.TransactionReceiptProductionBlock,
  RPCSPEC09.TransactionReceiptProductionBlock
>;

/**
 * original response from estimate fee without parsing
 */
export type FeeEstimate = Merge<RPCSPEC08.FEE_ESTIMATE, RPCSPEC09.FEE_ESTIMATE>;
export type ApiEstimateFeeResponse = FeeEstimate[]; // 0.8 and 0.9

export function isRPC08Plus_ResourceBounds(
  entry: ResourceBounds
): entry is RPCSPEC08.ResourceBounds {
  return 'l1_data_gas' in entry;
}

export function isRPC08Plus_ResourceBoundsBN(entry: ResourceBoundsBN): entry is ResourceBoundsBN {
  return 'l1_data_gas' in entry;
}

export type ResourceBounds = Merge<RPCSPEC08.ResourceBounds, RPCSPEC09.ResourceBounds>; // same sa rpc0.8

/**
 * Represents percentage overhead for each resource bound
 * numerical 50 means 50% overhead
 */
export type ResourceBoundsOverhead = {
  [K in keyof ResourceBounds]: ResourceBounds[K] extends object
    ? {
        [P in keyof ResourceBounds[K]]: number;
      }
    : number;
};

/**
 * Resource bounds in big number format
 */
export type ResourceBoundsBN = {
  [K in keyof ResourceBounds]: ResourceBounds[K] extends object
    ? {
        [P in keyof ResourceBounds[K]]: bigint;
      }
    : number;
};

export type SimulateTransaction = SimpleOneOf<
  RPCSPEC09.SimulateTransaction,
  RPCSPEC08.SimulateTransaction
>;
export type SimulateTransactionResponse = SimpleOneOf<
  RPCSPEC09.SimulateTransactionResponse,
  RPCSPEC08.SimulateTransactionResponse
>;

export type TransactionTrace = SimpleOneOf<
  RPCSPEC09.TRANSACTION_TRACE,
  RPCSPEC08.TRANSACTION_TRACE
>;

export type TransactionWithHash = Merge<
  RPCSPEC08.TransactionWithHash,
  RPCSPEC09.TransactionWithHash
>;

export type TransactionReceipt = Merge<RPCSPEC08.TransactionReceipt, RPCSPEC09.TransactionReceipt>;
export type Methods = RPCSPEC08.Methods;
export type TXN_STATUS = Merge<RPCSPEC08.TXN_STATUS, RPCSPEC09.TXN_STATUS>;
export type TXN_EXECUTION_STATUS = Merge<
  RPCSPEC08.TXN_EXECUTION_STATUS,
  RPCSPEC09.TXN_EXECUTION_STATUS
>;
export type TransactionStatus = Merge<RPCSPEC08.TransactionStatus, RPCSPEC09.TransactionStatus>;
export type ETransactionStatus = RPCSPEC08.ETransactionStatus;
export const { ETransactionStatus } = RPCSPEC08;
export type ETransactionExecutionStatus = RPCSPEC08.ETransactionExecutionStatus;
export const { ETransactionExecutionStatus } = RPCSPEC08;
// export type TRANSACTION_TRACE = Merge<RPCSPEC08.TRANSACTION_TRACE, RPCSPEC09.TRANSACTION_TRACE>;
export type FEE_ESTIMATE = Merge<RPCSPEC08.FEE_ESTIMATE, RPCSPEC09.FEE_ESTIMATE>;
export type EVENTS_CHUNK = Merge<RPCSPEC08.EVENTS_CHUNK, RPCSPEC09.EVENTS_CHUNK>;

export type TransactionType = RPCSPEC09.ETransactionType;
export const { ETransactionType: TransactionType } = RPCSPEC09;

export type BlockStatus = RPCSPEC09.EBlockStatus;
export const { EBlockStatus: BlockStatus } = RPCSPEC09;

export type TransactionFinalityStatus = RPCSPEC09.ETransactionFinalityStatus;
export const { ETransactionFinalityStatus: TransactionFinalityStatus } = RPCSPEC09;

export type TransactionExecutionStatus = RPCSPEC09.ETransactionExecutionStatus;
export const { ETransactionExecutionStatus: TransactionExecutionStatus } = RPCSPEC09;

export type BlockTag = RPCSPEC09.EBlockTag;
export const { EBlockTag: BlockTag } = RPCSPEC09;
