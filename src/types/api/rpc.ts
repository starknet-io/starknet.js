import { ADDRESS, FELT, OPENRPC } from './openrpc';

export namespace RPC {
  export type Response = {
    id: number;
    jsonrpc: string;
    result?: any;
    error?: {
      code: string;
      message: string;
    };
  };

  export type ChainId = OPENRPC.ChainId;
  export type ContractAddress = ADDRESS;
  export type Felt = FELT;
  export type ContractClass = OPENRPC.ContractClass;
  export type StateUpdate = OPENRPC.StateUpdate;
  export type Transaction = OPENRPC.Transaction;
  export type PendingTransactions = OPENRPC.PendingTransactions;
  export type TransactionHash = OPENRPC.TransactionHash;
  export type Trace = OPENRPC.Trace;
  export type Traces = OPENRPC.Traces;
  export type BlockHash = OPENRPC.BlockHash;
  export type BlockHashAndNumber = OPENRPC.BlockHashAndNumber;
  export type GetClassResponse = OPENRPC.ContractClass;
  export type EstimateFeeResponse = OPENRPC.EstimatedFee;
  export type GetBlockWithTxHashesResponse = OPENRPC.BlockWithTxHashes;
  export type GetBlockWithTxs = OPENRPC.BlockWithTxs;
  export type GetStorageAtResponse = OPENRPC.Storage;
  export type TransactionReceipt = OPENRPC.TransactionReceipt;
  export type GetTransactionByHashResponse = OPENRPC.Transaction;
  export type GetTransactionByBlockIdAndIndex = OPENRPC.Transaction;
  export type GetTransactionCountResponse = number;
  export type GetBlockNumberResponse = OPENRPC.BlockNumber;
  export type GetSyncingStatsResponse = OPENRPC.SyncingStatus;
  export type EventFilter = OPENRPC.EventFilter;
  export type GetEventsResponse = OPENRPC.Events;
  export type InvokedTransaction = OPENRPC.InvokedTransaction;
  export type DeclaredTransaction = OPENRPC.DeclaredTransaction;
  export type DeployedTransaction = OPENRPC.DeployedTransaction;

  export type Methods = {
    starknet_pendingTransactions: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: PendingTransactions;
    };
    starknet_blockHashAndNumber: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: BlockHashAndNumber;
    };
    starknet_getClassHashAt: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: Felt;
    };
    starknet_getStateUpdate: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.StateUpdate;
    };
    starknet_getClass: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.ContractClass;
    };
    starknet_getBlockWithTxHashes: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetBlockWithTxHashesResponse;
    };
    starknet_getBlockWithTxs: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetBlockWithTxs;
    };
    starknet_getNonce: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.Nonce;
    };
    starknet_getStorageAt: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetStorageAtResponse;
    };
    starknet_getTransactionByHash: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetTransactionByHashResponse;
    };
    starknet_getTransactionByBlockIdAndIndex: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetTransactionByBlockIdAndIndex;
    };
    starknet_getTransactionReceipt: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: TransactionReceipt;
    };
    starknet_getBlockTransactionCount: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetTransactionCountResponse;
    };
    starknet_call: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: string[];
    };
    starknet_estimateFee: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.EstimatedFee;
    };
    starknet_blockNumber: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetBlockNumberResponse;
    };
    starknet_chainId: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.ChainId;
    };
    starknet_syncing: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetSyncingStatsResponse;
    };
    starknet_getEvents: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetEventsResponse;
    };
    starknet_addInvokeTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.InvokedTransaction;
    };
    starknet_addDeployTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.DeployedTransaction;
    };
    starknet_addDeclareTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: OPENRPC.DeclaredTransaction;
    };
    starknet_getClassAt: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: any;
    };
    starknet_traceTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: any;
    };
    starknet_traceBlockTransactions: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: any;
    };
  };
}
