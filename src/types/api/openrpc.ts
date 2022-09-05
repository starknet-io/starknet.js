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
type BLOCK_NUMBER = number;
type BLOCK_HASH = FELT;
type TXN_HASH = FELT;
type TXN_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
type TXN_TYPE = 'DECLARE' | 'DEPLOY' | 'INVOKE' | 'L1_HANDLER';
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
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
  type?: TXN_TYPE;
};
type INVOKE_TXN_RECEIPT_PROPERTIES = {
  messages_sent: MSG_TO_L1;
  events: EVENT;
};
type PENDING_COMMON_RECEIPT_PROPERTIES = {
  transaction_hash: TXN_HASH;
  actual_fee: FELT;
  type?: TXN_TYPE;
};
type INVOKE_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES & INVOKE_TXN_RECEIPT_PROPERTIES;
type L1_HANDLER_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type DECLARE_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type DEPLOY_TXN_RECEIPT = COMMON_RECEIPT_PROPERTIES;
type PENDING_INVOKE_TXN_RECEIPT = PENDING_COMMON_RECEIPT_PROPERTIES & INVOKE_TXN_RECEIPT_PROPERTIES;
type PENDING_TXN_RECEIPT = PENDING_INVOKE_TXN_RECEIPT | PENDING_COMMON_RECEIPT_PROPERTIES;
type TXN_RECEIPT =
  | INVOKE_TXN_RECEIPT
  | L1_HANDLER_TXN_RECEIPT
  | DECLARE_TXN_RECEIPT
  | DEPLOY_TXN_RECEIPT
  | PENDING_TXN_RECEIPT;

export namespace RPC_1 {
  export type GetTransactionReceiptResponse = TXN_RECEIPT;

  export type Methods = {
    starknet_getTransactionReceipt: {
      QUERY: never;
      REQUEST: any[];
      RESPONSE: GetTransactionReceiptResponse;
    };
  };
}

// starknet_getBlockWithTxHashes
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

// starknet_getBlockWithTx
type BLOCK_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
/**
 * "title": "An integer number in hex format (0x...)",
 * "pattern": "^0x[a-fA-F0-9]+$"
 */
type NUM_AS_HEX = string;
type SIGNATURE = Array<FELT>;
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

export namespace OPENRPC {
  export type GetBlockWithTxHashesResponse = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
  export type GetBlockWithTxs = BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS;
  export type GetStorageAtResponse = FELT;
  export type GetTransactionByHashResponse = TXN;
  export type GetTransactionByBlockIdAndIndex = TXN;
  export type GetClassResponse = CONTRACT_CLASS;
}
