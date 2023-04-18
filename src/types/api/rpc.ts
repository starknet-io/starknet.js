import { ADDRESS, CONTRACT_STORAGE_DIFF_ITEM, FELT, OPENRPC } from './openrpc';

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

  export type ChainId = OPENRPC.CHAIN_ID;
  export type CallResponse = OPENRPC.CallResponse;
  export type ContractAddress = ADDRESS;
  export type Felt = FELT;
  export type Nonce = OPENRPC.Nonce;
  export type ContractClass = OPENRPC.ContractClass | OPENRPC.DeprecatedContractClass;
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
  export type Methods = OPENRPC.Methods;
  export type Storage = OPENRPC.Storage;

  export enum TransactionType {
    DECLARE = 'DECLARE',
    DEPLOY = 'DEPLOY',
    DEPLOY_ACCOUNT = 'DEPLOY_ACCOUNT',
    INVOKE = 'INVOKE',
    L1_HANDLER = 'L1_HANDLER',
  }

  // Exported Diff on Sequencer (can be removed when diff resolved by new RPC v)
  export type StorageDiffs = Array<CONTRACT_STORAGE_DIFF_ITEM>;
  export type DeclaredContractHashes = Array<FELT>;
  export type Nonces = Array<{
    contract_address: ADDRESS;
    nonce: FELT;
  }>;
}
