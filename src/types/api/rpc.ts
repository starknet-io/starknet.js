import { StarknetChainId } from '../../constants';
import { BlockIdentifier } from '../../provider/utils';
import { Status } from '../lib';
import { OPENRPC } from './openrpc';

export namespace RPC {
  export type Response = {
    id: number;
    result: any;
    jsonrpc: string;
    error?: {
      code: string;
      message: string;
    };
  };

  export type AddTransactionResponse = {
    transaction_hash: string;
  };

  export type GetClassResponse = {
    program: string;
    entry_point_by_type: any;
  };

  export type DeclareResponse = {
    transaction_hash: string;
    class_hash: string;
  };

  export type EstimateFeeResponse = {
    overall_fee: number;
    gas_consumed: number;
    gas_price: number;
  };

  export type GetBlockWithTxHashesResponse = OPENRPC.GetBlockWithTxHashesResponse;
  export type GetBlockWithTxs = OPENRPC.GetBlockWithTxs;
  export type GetStorageAtResponse = OPENRPC.GetStorageAtResponse;

  export type GetTransactionReceiptResponse = {
    txn_hash: string;
    actual_fee: string;
    status: Status;
    status_data: string;
    messages_sent: Array<MessageToL1>;
    l1_origin_message: MessageToL2;
    events: Array<StarknetEvent>;
  };

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

  export type GetTransactionByHashResponse = OPENRPC.GetTransactionByHashResponse;
  export type GetTransactionByBlockIdAndIndex = OPENRPC.GetTransactionByBlockIdAndIndex;

  export type GetTransactionCountResponse = number;

  export type GetBlockNumberResponse = number;

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

  export type GetEventsResponse = {
    events: StarknetEmittedEvent[];
    page_number: number;
    is_last_page: number;
  };

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

  export type StarknetEmittedEvent = {
    event: StarknetEvent;
    block_hash: string;
    block_number: number;
    transaction_hash: string;
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
      RESPONSE: string;
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
  };
}
