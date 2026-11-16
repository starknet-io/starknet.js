// this file aims to unify the RPC specification types used by the common Provider class

import { SimpleOneOf } from '../../types/helpers';
import { RPCSPEC09, RPCSPEC0105 } from '../../types/api';

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

export type ETransactionVersion3 = RPCSPEC09.ETransactionVersion3;
export const { ETransactionVersion3 } = RPCSPEC09;

// MERGES
export type BLOCK_HASH = Merge<RPCSPEC0105.BLOCK_HASH, RPCSPEC09.BLOCK_HASH>;
export type BLOCK_NUMBER = Merge<RPCSPEC0105.BLOCK_NUMBER, RPCSPEC09.BLOCK_NUMBER>;
export type FELT = Merge<RPCSPEC0105.FELT, RPCSPEC09.FELT>;
export type TXN_HASH = Merge<RPCSPEC0105.TXN_HASH, RPCSPEC09.TXN_HASH>;

export type PRICE_UNIT = Merge<RPCSPEC0105.PRICE_UNIT, RPCSPEC09.PRICE_UNIT>;
export type RESOURCE_PRICE = Merge<RPCSPEC0105.RESOURCE_PRICE, RPCSPEC09.RESOURCE_PRICE>;
export type SIMULATION_FLAG = Merge<RPCSPEC0105.SIMULATION_FLAG, RPCSPEC09.SIMULATION_FLAG>;

export type STATE_UPDATE = Merge<RPCSPEC0105.STATE_UPDATE, RPCSPEC09.STATE_UPDATE>;
/* export type PENDING_STATE_UPDATE = Merge<
  RPCSPEC0105.PENDING_STATE_UPDATE,
  RPCSPEC09.PRE_CONFIRMED_STATE_UPDATE
>; */
export type PRE_CONFIRMED_STATE_UPDATE = Merge<
  RPCSPEC0105.PRE_CONFIRMED_STATE_UPDATE,
  RPCSPEC09.PRE_CONFIRMED_STATE_UPDATE
>;

export type BlockWithTxHashes = Merge<RPCSPEC0105.BlockWithTxHashes, RPCSPEC09.BlockWithTxHashes>;
export type ContractClassPayload = Merge<RPCSPEC0105.ContractClass, RPCSPEC09.ContractClass>;
export type DeclaredTransaction = Merge<
  RPCSPEC0105.DeclaredTransaction,
  RPCSPEC09.DeclaredTransaction
>;
export type InvokedTransaction = Merge<
  RPCSPEC0105.InvokedTransaction,
  RPCSPEC09.InvokedTransaction
>;
export type DeployedAccountTransaction = Merge<
  RPCSPEC0105.DeployedAccountTransaction,
  RPCSPEC09.DeployedAccountTransaction
>;

export type L1_HANDLER_TXN = RPCSPEC0105.L1_HANDLER_TXN;
export type EDataAvailabilityMode = RPCSPEC0105.EDataAvailabilityMode;
export const { EDataAvailabilityMode } = RPCSPEC0105;
export type EDAMode = RPCSPEC0105.EDAMode;
export const { EDAMode } = RPCSPEC0105;
export type EmittedEvent = Merge<RPCSPEC0105.EmittedEvent, RPCSPEC09.EmittedEvent>;
export type Event = Merge<RPCSPEC0105.Event, RPCSPEC09.Event>;

/* export type PendingReceipt = Merge<
  RPCSPEC0105.TransactionReceiptPendingBlock,
  RPCSPEC09.TransactionReceiptPreConfirmedBlock
>; */
export type Receipt = Merge<
  RPCSPEC0105.TransactionReceiptProductionBlock,
  RPCSPEC09.TransactionReceiptProductionBlock
>;

/**
 * original response from estimate fee without parsing
 */
export type FeeEstimate = Merge<RPCSPEC0105.FEE_ESTIMATE, RPCSPEC09.FEE_ESTIMATE>;
export type ApiEstimateFeeResponse = FeeEstimate[]; // 0.8 and 0.9

export function isRPC08Plus_ResourceBounds(
  entry: ResourceBounds
): entry is RPCSPEC0105.ResourceBounds {
  return 'l1_data_gas' in entry;
}

export function isRPC08Plus_ResourceBoundsBN(entry: ResourceBoundsBN): entry is ResourceBoundsBN {
  return 'l1_data_gas' in entry;
}

export type ResourceBounds = Merge<RPCSPEC0105.ResourceBounds, RPCSPEC09.ResourceBounds>; // same sa rpc0.8

export type EventFilter = RPCSPEC09.EventFilter;

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
  RPCSPEC0105.SimulateTransaction
>;
export type SimulateTransactionResponse =
  RPCSPEC09.SimulateTransactionResponse | RPCSPEC0105.SimulateTransactionResponse;

export type INITIAL_READS = RPCSPEC0105.INITIAL_READS;

/** Flags to request additional fields in transaction responses (RPC 0.10.1+) */
export type ETxnResponseFlag = RPCSPEC0105.ETxnResponseFlag;
export const { ETxnResponseFlag } = RPCSPEC0105;

/** Flags to request additional fields in trace responses (RPC 0.10.1+) */
export type ETraceFlag = RPCSPEC0105.ETraceFlag;
export const { ETraceFlag } = RPCSPEC0105;

/** Tags for WebSocket transaction subscriptions (RPC 0.10.1+) */
export type ESubscriptionTag = RPCSPEC0105.ESubscriptionTag;
export const { ESubscriptionTag } = RPCSPEC0105;

/** A single transaction trace within a block */
export type BlockTransactionTrace = RPCSPEC0105.BlockTransactionTrace;
/** Block transaction traces with optional initial storage reads (RPC 0.10.1+) */
export type BlockTransactionsTracesWithInitialReads =
  RPCSPEC0105.BlockTransactionsTracesWithInitialReads;

export type TransactionTrace = SimpleOneOf<
  RPCSPEC09.TRANSACTION_TRACE,
  RPCSPEC0105.TRANSACTION_TRACE
>;

export type TransactionWithHash = Merge<
  RPCSPEC0105.TransactionWithHash,
  RPCSPEC09.TransactionWithHash
>;

export type TransactionReceipt = Merge<
  RPCSPEC0105.TransactionReceipt,
  RPCSPEC09.TransactionReceipt
>;
export type Methods = RPCSPEC0105.Methods;
export type TXN_STATUS = Merge<RPCSPEC0105.TXN_STATUS, RPCSPEC09.TXN_STATUS>;
export type TXN_EXECUTION_STATUS = Merge<
  RPCSPEC0105.TXN_EXECUTION_STATUS,
  RPCSPEC09.TXN_EXECUTION_STATUS
>;
export type TransactionStatus = Merge<RPCSPEC0105.TransactionStatus, RPCSPEC09.TransactionStatus>;
export type ETransactionStatus = RPCSPEC0105.ETransactionStatus;
export const { ETransactionStatus } = RPCSPEC0105;
export type ETransactionExecutionStatus = RPCSPEC0105.ETransactionExecutionStatus;
export const { ETransactionExecutionStatus } = RPCSPEC0105;
// export type TRANSACTION_TRACE = Merge<RPCSPEC08.TRANSACTION_TRACE, RPCSPEC09.TRANSACTION_TRACE>;
export type FEE_ESTIMATE = Merge<RPCSPEC0105.FEE_ESTIMATE, RPCSPEC09.FEE_ESTIMATE>;
export type EVENTS_CHUNK = Merge<RPCSPEC0105.EVENTS_CHUNK, RPCSPEC09.EVENTS_CHUNK>;

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
