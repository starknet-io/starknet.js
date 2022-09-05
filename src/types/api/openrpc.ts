/**
 * Starknet RPC version 0.1.0
 * starknet_api_openrpc version 0.31.0
 *
 * TypeScript Representation of OpenRpc protocol types | results
 * errors are not implemented here only results
 */

/**
 * "type": "string",
 * "title": "Field element",
 * "$comment": "A field element, represented as a string of hex digits",
 * "description": "A field element. Represented as up to 63 hex digits and leading 4 bits zeroed.",
 * "pattern": "^0x0[a-fA-F0-9]{1,63}$"
 */
type FELT = string;
/**
 * "title": "An integer number in hex format (0x...)",
 * "pattern": "^0x[a-fA-F0-9]+$"
 */
type NUM_AS_HEX = string;
type SIGNATURE = Array<FELT>;
type ETH_ADDRESS = string;
type BLOCK_NUMBER = number;
type BLOCK_HASH = FELT;
type TXN_HASH = FELT;
type TXN_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
type TXN_TYPE = 'DECLARE' | 'DEPLOY' | 'INVOKE' | 'L1_HANDLER';
type BLOCK_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
type MSG_TO_L1 = {
  to_address: FELT;
  payload: Array<FELT>;
};
type EVENT = {
  from_address: FELT;
  keys: Array<FELT>;
  data: Array<FELT>;
};
type COMMON_RECEIPT_PROPERTIES = {
  transaction_hash: TXN_HASH;
  actual_fee: FELT;
  status: TXN_STATUS;
  status_data?: string;
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
};
type MSG_TO_L2 = {
  from_address: ETH_ADDRESS;
  payload: FELT;
};
type INVOKE_TXN_RECEIPT_PROPERTIES = {
  messages_sent: MSG_TO_L1;
  l1_origin_message?: MSG_TO_L2;
  events: EVENT;
};
type PENDING_COMMON_RECEIPT_PROPERTIES = {
  transaction_hash: TXN_HASH;
  actual_fee: FELT;
};
type INVOKE_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES & INVOKE_TXN_RECEIPT_PROPERTIES;
// type L1_HANDLER_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type DECLARE_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type DEPLOY_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type PENDING_INVOKE_TXN_RECEIPT = PENDING_COMMON_RECEIPT_PROPERTIES & INVOKE_TXN_RECEIPT_PROPERTIES;
type PENDING_TXN_RECEIPT = PENDING_INVOKE_TXN_RECEIPT | PENDING_COMMON_RECEIPT_PROPERTIES;
type TXN_RECEIPT =
  | INVOKE_TXN_RECEIPT
  | DECLARE_TXN_RECEIPT
  | DEPLOY_TXN_RECEIPT
  | PENDING_TXN_RECEIPT;
type BLOCK_HEADER = {
  block_hash: BLOCK_HASH;
  parent_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
  new_root: FELT;
  timestamp: number;
  sequencer_address: FELT;
};
type BLOCK_BODY_WITH_TX_HASHES = {
  transactions: Array<TXN_HASH>;
};
type BLOCK_WITH_TX_HASHES = {
  status: TXN_STATUS;
} & BLOCK_HEADER &
  BLOCK_BODY_WITH_TX_HASHES;
type PENDING_BLOCK_WITH_TX_HASHES = BLOCK_BODY_WITH_TX_HASHES & {
  timestamp: number;
  sequencer_address: FELT;
  parent_hash: BLOCK_HASH;
};
type COMMON_TXN_PROPERTIES = {
  transaction_hash: TXN_HASH;
  max_fee: FELT;
  version: NUM_AS_HEX;
  signature: SIGNATURE;
  nonce: FELT;
  type: TXN_TYPE;
};
type ADDRESS = FELT;
type FUNCTION_CALL = {
  contract_address: ADDRESS;
  entry_point_selector: FELT;
  calldata: Array<FELT>;
};
type INVOKE_TXN = COMMON_TXN_PROPERTIES & FUNCTION_CALL;
type DECLARE_TXN = COMMON_TXN_PROPERTIES & {
  class_hash: FELT;
  sender_address: ADDRESS;
};
type DEPLOY_TXN = {
  transaction_hash: TXN_HASH;
  class_hash: FELT;
  version: NUM_AS_HEX;
  type: TXN_TYPE;
  contract_address: FELT;
  contract_address_salt: FELT;
  constructor_calldata: Array<FELT>;
};
type TXN = INVOKE_TXN | DECLARE_TXN | DEPLOY_TXN;
type BLOCK_BODY_WITH_TXS = {
  transactions: Array<TXN>;
};
type BLOCK_WITH_TXS = {
  status: BLOCK_STATUS;
} & BLOCK_HEADER &
  BLOCK_BODY_WITH_TXS;
type PENDING_BLOCK_WITH_TXS = BLOCK_BODY_WITH_TXS & {
  timestamp: number;
  sequencer_address: FELT;
  parent_hash: BLOCK_HASH;
};
type CONTRACT_CLASS = {
  program: string; // A base64 representation of the compressed program code
  entry_points_by_type: {
    CONSTRUCTOR: CONTRACT_ENTRY_POINT_LIST;
    EXTERNAL: CONTRACT_ENTRY_POINT_LIST;
    L1_HANDLER: CONTRACT_ENTRY_POINT_LIST;
  };
};
type CONTRACT_ENTRY_POINT_LIST = Array<CONTRACT_ENTRY_POINT>;
type CONTRACT_ENTRY_POINT = {
  offset: NUM_AS_HEX;
  selector: FELT;
};
type STORAGE_DIFF_ITEM = {
  address: FELT;
  key: FELT;
  value: FELT;
};
type DECLARED_CONTRACT_ITEM = {
  class_hash: FELT;
};
type DEPLOYED_CONTRACT_ITEM = {
  address: FELT;
  class_hash: FELT;
};
type STATE_UPDATE = {
  block_hash: BLOCK_HASH;
  new_root: FELT;
  old_root: FELT;
  state_diff: {
    storage_diffs: Array<STORAGE_DIFF_ITEM>;
    declared_contracts: Array<DECLARED_CONTRACT_ITEM>;
    deployed_contracts: Array<DEPLOYED_CONTRACT_ITEM>;
    nonces: Array<{
      contract_address: ADDRESS;
      nonce: FELT;
    }>;
  };
};
enum BLOCK_TAG {
  'latest',
  'pending',
}
type BLOCK_ID =
  | {
      block_hash: BLOCK_HASH;
    }
  | {
      block_number: BLOCK_NUMBER;
    }
  | BLOCK_TAG;
type STORAGE_KEY = string;

export namespace OPENRPC {
  export type BlockWithTxHashes = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
  export type BlockWithTxs = BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS;
  export type StateUpdate = STATE_UPDATE; // notimplemented
  export type Storage = FELT;
  export type Transaction = TXN;
  export type TransactionReceipt = TXN_RECEIPT;
  export type ContractClass = CONTRACT_CLASS;

  export type CallResponse = Array<FELT>; // new
  export type EstimateFeeResponse = FEE_ESTIMATE; // new
  export type BlockNumberResponse = BLOCK_NUMBER; // new
  export type BlockHashAndNumberResponse = {
    block_hash: BLOCK_HASH;
    block_number: BLOCK_NUMBER;
  }; // new
  export type ChainIdResponse = CHAIN_ID; // new
  export type PendingTransactionsResponse = Array<TXN>; // new
  export type ProtocolVersionResponse = PROTOCOL_VERSION; // new
  export type SyncingResponse = boolean | SYNC_STATUS; // new
  export type GetEventsResponse = {
    events: Array<EMITTED_EVENT>;
    page_number: number;
    is_last_page: boolean;
  }; // new
  export type getNonce = FELT; // new

  // Final Methods
  export type Methods = {
    starknet_getBlockWithTxHashes: {
      params: { block_id: BLOCK_ID };
      result: BlockWithTxHashes;
      errors: errors.INVALIDBLOCKID;
    };
    starknet_getBlockWithTxs: {
      params: { block_id: BLOCK_ID };
      result: BlockWithTxs;
      errors: errors.INVALIDBLOCKID;
    };
    starknet_getStateUpdate: {
      params: { block_id: BLOCK_ID };
      result: StateUpdate;
      errors: errors.INVALIDBLOCKID;
    };
    starknet_getStorageAt: {
      params: { contract_address: ADDRESS; key: STORAGE_KEY; block_id: BLOCK_ID };
      result: Storage;
      errors: errors.CONTRACTNOTFOUND | errors.INVALIDBLOCKID;
    };
    starknet_getTransactionByHash: {
      params: { transaction_hash: TXN_HASH };
      result: Transaction;
      errors: errors.INVALIDTXNHASH;
    };
    starknet_getTransactionByBlockIdAndIndex: {
      params: { block_id: BLOCK_ID; index: number };
      result: Transaction;
      errors: errors.INVALIDBLOCKID | errors.INVALIDTXNINDEX;
    };
    starknet_getTransactionReceipt: {
      params: { transaction_hash: TXN_HASH };
      result: TransactionReceipt;
      errors: errors.INVALIDTXNHASH;
    };
    starknet_getClass: {
      params: { class_hash: FELT };
      result: ContractClass;
      errors: errors.INVALIDCONTRACTCLASSHASH;
    };
    starknet_getClassHashAt: {
      params: { block_id: BLOCK_ID; contract_address: ADDRESS };
      result: FELT;
      errors: errors.INVALIDBLOCKID | errors.CONTRACTNOTFOUND;
    };
    starknet_getClassAt: {
      params: { block_id: BLOCK_ID; contract_address: ADDRESS };
      result: ContractClass;
      errors: errors.INVALIDBLOCKID | errors.CONTRACTNOTFOUND;
    };
    starknet_getBlockTransactionCount: {
      params: { block_id: BLOCK_ID };
      result: number;
      errors: errors.INVALIDBLOCKID;
    };
    starknet_call: {
      params: { request: FUNCTION_CALL; block_id: BLOCK_ID };
      result: Array<FELT>;
      errors:
        | errors.CONTRACTNOTFOUND
        | errors.INVALIDMESSAGESELECTOR
        | errors.INVALIDCALLDATA
        | errors.CONTRACTERROR
        | errors.INVALIDBLOCKID;
    };
  };
}

namespace errors {
  export interface FAILEDTORECEIVETXN {
    code: number;
    message: string;
  }

  export interface CONTRACTNOTFOUND {
    code: number;
    message: string;
  }

  export interface INVALIDMESSAGESELECTOR {
    code: number;
    message: string;
  }

  export interface INVALIDCALLDATA {
    code: number;
    message: string;
  }

  export interface INVALIDBLOCKID {
    code: number;
    message: string;
  }

  export interface INVALIDTXNHASH {
    code: number;
    message: string;
  }

  export interface INVALIDTXNINDEX {
    code: number;
    message: string;
  }

  export interface INVALIDCONTRACTCLASSHASH {
    code: number;
    message: string;
  }

  export interface PAGESIZETOOBIG {
    code: number;
    message: string;
  }

  export interface NOBLOCKS {
    code: number;
    message: string;
  }

  export interface CONTRACTERROR {
    code: number;
    message: string;
  }

  export interface Errors {
    FAILED_TO_RECEIVE_TXN: FAILEDTORECEIVETXN;
    CONTRACT_NOT_FOUND: CONTRACTNOTFOUND;
    INVALID_MESSAGE_SELECTOR: INVALIDMESSAGESELECTOR;
    INVALID_CALL_DATA: INVALIDCALLDATA;
    INVALID_BLOCK_ID: INVALIDBLOCKID;
    INVALID_TXN_HASH: INVALIDTXNHASH;
    INVALID_TXN_INDEX: INVALIDTXNINDEX;
    INVALID_CONTRACT_CLASS_HASH: INVALIDCONTRACTCLASSHASH;
    PAGE_SIZE_TOO_BIG: PAGESIZETOOBIG;
    NO_BLOCKS: NOBLOCKS;
    CONTRACT_ERROR: CONTRACTERROR;
  }

  export interface RootObject {
    errors: Errors;
  }
}
