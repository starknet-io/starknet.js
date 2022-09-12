import { StarknetChainId } from '../../constants';
import { BlockIdentifier } from '../../provider/utils';
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

  export type ContractAddress = ADDRESS;
  export type Felt = FELT;
  export type ContractClass = OPENRPC.ContractClass;
  export type StateUpdate = OPENRPC.StateUpdate;
  export type Transaction = OPENRPC.Transaction;
  export type TransactionHash = OPENRPC.TransactionHash;
  export type Trace = OPENRPC.Trace;
  export type Traces = OPENRPC.Traces;
  export type BlockHash = OPENRPC.BlockHash;
  export type BlockHashAndNumber = OPENRPC.BlockHashAndNumber;

  export type AddTransactionResponse = {
    transaction_hash: string;
  };

  export type GetClassResponse = OPENRPC.ContractClass;

  export type DeclareResponse = {
    transaction_hash: string;
    class_hash: string;
  };

  export type EstimateFeeResponse = OPENRPC.EstimateFee;

  export type GetBlockWithTxHashesResponse = OPENRPC.BlockWithTxHashes;
  export type GetBlockWithTxs = OPENRPC.BlockWithTxs;
  export type GetStorageAtResponse = OPENRPC.Storage;
  export type GetTransactionReceiptResponse = OPENRPC.TransactionReceipt;

  interface CommonTransactionProperties {
    txn_hash: string;
    max_fee: string;
    version: string;
    nonce: string;
    signature: Array<string>;
  }

  export interface InvokeTransactionResponse extends CommonTransactionProperties {
    contract_address?: string;
    entry_point_selector?: string;
    calldata?: Array<string>;
  }

  export interface DeclareTransactionResponse extends CommonTransactionProperties {
    contract_class?: GetClassResponse;
    sender_address?: string;
  }

  export type GetTransactionByHashResponse = OPENRPC.Transaction;
  export type GetTransactionByBlockIdAndIndex = OPENRPC.Transaction;

  export type GetTransactionCountResponse = number;

  export type GetBlockNumberResponse = OPENRPC.BlockNumber;

  export type GetSyncingStatsResponse =
    | {
        starting_block_hash: string;
        starting_block_num: string;
        current_block_hash: string;
        current_block_num: string;
        highest_block_hash: string;
        highest_block_num: string;
      }
    | boolean;

  export type EventFilter = {
    fromBlock: BlockIdentifier;
    toBlock: BlockIdentifier;
    address: string;
    keys: string[];
    page_size: number;
    page_number: number;
  };

  export type GetEventsResponse = OPENRPC.Events;

  export type DeployContractResponse = {
    transaction_hash: string;
    contract_address: string;
  };
  // Other

  export type StarknetEvent = {
    from_address: string;
    keys: string[];
    data: string[];
  };

  export type MessageToL1 = {
    to_address: string;
    payload: string[];
  };

  export type MessageToL2 = {
    from_address: string;
    payload: string[];
  };

  export type Methods = {
    starknet_pendingTransactions: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: Transaction;
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
      RESPONSE: GetTransactionReceiptResponse;
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
      RESPONSE: EstimateFeeResponse;
    };
    starknet_blockNumber: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetBlockNumberResponse;
    };
    starknet_chainId: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: StarknetChainId;
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
      RESPONSE: AddTransactionResponse;
    };
    starknet_addDeployTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: DeployContractResponse;
    };
    starknet_addDeclareTransaction: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: DeclareResponse;
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
