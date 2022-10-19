/**
 * Starknet RPC version 0.1.0
 *
 * StarkNet Node API 0.31.0
 * StarkNet Node Write API 0.3.0
 * StarkNet Trace API 0.3.0
 *
 * TypeScript Representation of OpenRpc protocol types
 */

export type FELT = string;
export type ADDRESS = FELT;
type NUM_AS_HEX = string;
type SIGNATURE = Array<FELT>;
type ETH_ADDRESS = string;
type BLOCK_NUMBER = number;
type BLOCK_HASH = FELT;
type TXN_HASH = FELT;
type PROTOCOL_VERSION = string;
type TXN_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
type TXN_TYPE = 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER';
type BLOCK_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
enum BLOCK_TAG {
  'latest',
  'pending',
}
type BLOCK_ID = { block_hash: BLOCK_HASH } | { block_number: BLOCK_NUMBER } | BLOCK_TAG;
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
// transaction_hash, nonce, type optional because of pathfinder not implemented
type COMMON_TXN_PROPERTIES = {
  transaction_hash?: TXN_HASH;
  max_fee: FELT;
  version: NUM_AS_HEX;
  signature: SIGNATURE;
  nonce?: FELT;
  type?: TXN_TYPE;
};
type FUNCTION_CALL = {
  contract_address?: ADDRESS;
  entry_point_selector?: FELT;
  calldata?: Array<FELT>;
};
type INVOKE_TXN = COMMON_TXN_PROPERTIES & FUNCTION_CALL;
type DECLARE_TXN = COMMON_TXN_PROPERTIES & {
  class_hash: FELT;
  sender_address: ADDRESS;
};
type DEPLOY_ACCOUNT_TXN_REQUEST = COMMON_TXN_PROPERTIES & {
  class_hash: FELT;
  contract_address_salt: FELT;
  constructor_calldata: Array<FELT>;
};
type DECLARE_TXN_REQUEST = COMMON_TXN_PROPERTIES & {
  contract_class: CONTRACT_CLASS;
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
  abi?: any; // Pathfinder exception from rpc 0.1.0
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
type STORAGE_KEY = string;
type EVENT_FILTER = {
  from_block?: BLOCK_ID;
  to_block?: BLOCK_ID;
  address?: ADDRESS;
  keys?: Array<FELT>;
};
type RESULT_PAGE_REQUEST = {
  page_size: number;
  page_number: number;
};
type EMITTED_EVENT = EVENT & {
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
  transaction_hash: TXN_HASH;
};
type SYNC_STATUS = {
  starting_block_hash: BLOCK_HASH;
  starting_block_num: NUM_AS_HEX;
  current_block_hash: BLOCK_HASH;
  current_block_num: NUM_AS_HEX;
  highest_block_hash: BLOCK_HASH;
  highest_block_num: NUM_AS_HEX;
};
type FEE_ESTIMATE = {
  gas_consumed: NUM_AS_HEX;
  gas_price: NUM_AS_HEX;
  overall_fee: NUM_AS_HEX;
};

enum CALL_TYPE {
  'DELEGATE',
  'CALL',
}
enum ENTRY_POINT_TYPE {
  'EXTERNAL',
  'L1_HANDLER',
  'CONSTRUCTOR',
}
type FUNCTION_INVOCATION = FUNCTION_CALL & {
  caller_address: FELT;
  code_address: FELT;
  entry_point_type: ENTRY_POINT_TYPE;
  call_type: CALL_TYPE;
  result: FELT;
  calls: FUNCTION_INVOCATION;
  events: EVENT;
  messages: MSG_TO_L1;
};
type TRACE_ROOT = {
  nonce: FELT;
  signature: FELT;
  function_invocation: FUNCTION_INVOCATION;
};

export namespace OPENRPC {
  export type Nonce = FELT;
  export type BlockWithTxHashes = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
  export type BlockWithTxs = BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS;
  export type StateUpdate = STATE_UPDATE;
  export type Storage = FELT;
  export type Transaction = TXN;
  export type TransactionReceipt = TXN_RECEIPT;
  export type ContractClass = CONTRACT_CLASS;
  export type CallResponse = Array<FELT>;
  export type EstimatedFee = FEE_ESTIMATE;
  export type BlockNumber = BLOCK_NUMBER;
  export type BlockHashAndNumber = {
    block_hash: BLOCK_HASH;
    block_number: BLOCK_NUMBER;
  };
  export type CHAIN_ID = string;
  export type PendingTransactions = Array<TXN>;
  export type ProtocolVersion = PROTOCOL_VERSION;
  export type SyncingStatus = false | SYNC_STATUS;
  export type Events = {
    events: Array<EMITTED_EVENT>;
    page_number: number;
    is_last_page: boolean;
  };
  export type Trace = TRACE_ROOT;
  export type Traces = Array<{
    transaction_hash: FELT;
    trace_root: TRACE_ROOT;
  }>;
  export type TransactionHash = TXN_HASH;
  export type BlockHash = BLOCK_HASH;
  export type EventFilter = EVENT_FILTER & RESULT_PAGE_REQUEST;
  export type InvokedTransaction = { transaction_hash: TXN_HASH };
  export type DeclaredTransaction = { transaction_hash: TXN_HASH; class_hash: FELT };
  export type DeployedTransaction = { transaction_hash: TXN_HASH; contract_address: FELT };

  // Final Methods
  export type Methods = {
    // Read API
    starknet_getBlockWithTxHashes: {
      params: { block_id: BLOCK_ID };
      result: BlockWithTxHashes;
      errors: Errors.INVALID_BLOCK_ID;
    };
    starknet_getBlockWithTxs: {
      params: { block_id: BLOCK_ID };
      result: BlockWithTxs;
      errors: Errors.INVALID_BLOCK_ID;
    };
    starknet_getStateUpdate: {
      params: { block_id: BLOCK_ID };
      result: StateUpdate;
      errors: Errors.INVALID_BLOCK_ID;
    };
    starknet_getStorageAt: {
      params: { contract_address: ADDRESS; key: STORAGE_KEY; block_id: BLOCK_ID };
      result: Storage;
      errors: Errors.CONTRACT_NOT_FOUND | Errors.INVALID_BLOCK_ID;
    };
    starknet_getTransactionByHash: {
      params: { transaction_hash: TXN_HASH };
      result: Transaction;
      errors: Errors.INVALID_TXN_HASH;
    };
    starknet_getTransactionByBlockIdAndIndex: {
      params: { block_id: BLOCK_ID; index: number };
      result: Transaction;
      errors: Errors.INVALID_BLOCK_ID | Errors.INVALID_TXN_INDEX;
    };
    starknet_getTransactionReceipt: {
      params: { transaction_hash: TXN_HASH };
      result: TransactionReceipt;
      errors: Errors.INVALID_TXN_HASH;
    };
    starknet_getClass: {
      params: { class_hash: FELT };
      result: ContractClass;
      errors: Errors.INVALID_CONTRACT_CLASS_HASH;
    };
    starknet_getClassHashAt: {
      params: { block_id: BLOCK_ID; contract_address: ADDRESS };
      result: FELT;
      errors: Errors.INVALID_BLOCK_ID | Errors.CONTRACT_NOT_FOUND;
    };
    starknet_getClassAt: {
      params: { block_id: BLOCK_ID; contract_address: ADDRESS };
      result: ContractClass;
      errors: Errors.INVALID_BLOCK_ID | Errors.CONTRACT_NOT_FOUND;
    };
    starknet_getBlockTransactionCount: {
      params: { block_id: BLOCK_ID };
      result: number;
      errors: Errors.INVALID_BLOCK_ID;
    };
    starknet_call: {
      params: { request: FUNCTION_CALL; block_id: BLOCK_ID };
      result: Array<FELT>;
      errors:
        | Errors.CONTRACT_NOT_FOUND
        | Errors.INVALID_MESSAGE_SELECTOR
        | Errors.INVALID_CALL_DATA
        | Errors.CONTRACT_ERROR
        | Errors.INVALID_BLOCK_ID;
    };
    starknet_estimateFee: {
      params: {
        request: INVOKE_TXN | DECLARE_TXN_REQUEST | DEPLOY_ACCOUNT_TXN_REQUEST;
        block_id: BLOCK_ID;
      };
      result: FEE_ESTIMATE;
      errors:
        | Errors.CONTRACT_NOT_FOUND
        | Errors.INVALID_MESSAGE_SELECTOR
        | Errors.INVALID_CALL_DATA
        | Errors.CONTRACT_ERROR
        | Errors.INVALID_BLOCK_ID;
    };
    starknet_blockNumber: {
      params: {};
      result: BLOCK_NUMBER;
      errors: Errors.NO_BLOCKS;
    };
    starknet_blockHashAndNumber: {
      params: {};
      result: BLOCK_HASH & BLOCK_NUMBER;
      errors: Errors.NO_BLOCKS;
    };
    starknet_chainId: {
      params: {};
      result: CHAIN_ID;
    };
    starknet_pendingTransactions: {
      params: {};
      result: PendingTransactions;
    };
    starknet_syncing: {
      params: {};
      result: SyncingStatus;
    };
    starknet_getEvents: {
      params: { filter: EVENT_FILTER & RESULT_PAGE_REQUEST };
      result: Events;
      errors: Errors.PAGE_SIZE_TOO_BIG;
    };
    // FROM RPC 0.2.0 Pathfinder exception
    starknet_getNonce: {
      params: { contract_address: ADDRESS; block_id: BLOCK_ID };
      result: FELT;
      errors: Errors.CONTRACT_NOT_FOUND;
    };

    // Write API
    starknet_addInvokeTransaction: {
      params: {
        function_invocation: FUNCTION_CALL;
        signature: SIGNATURE;
        max_fee: NUM_AS_HEX;
        version: NUM_AS_HEX;
      };
      result: InvokedTransaction;
    };
    starknet_addDeclareTransaction: {
      params: {
        contract_class: CONTRACT_CLASS;
        sender_address: ADDRESS;
        signature: SIGNATURE;
        max_fee: NUM_AS_HEX;
        version: NUM_AS_HEX;
        nonce: FELT;
      };
      result: DeclaredTransaction;
      errors: Errors.INVALID_CONTRACT_CLASS;
    };
    starknet_addDeployTransaction: {
      params: {
        contract_address_salt: FELT;
        constructor_calldata: Array<FELT>;
        contract_definition: CONTRACT_CLASS;
      };
      result: DeployedTransaction;
      errors: Errors.INVALID_CONTRACT_CLASS;
    };

    starknet_addDeployAccountTransaction: {
      params: {
        contract_address_salt: FELT;
        constructor_calldata: Array<FELT>;
        class_hash: FELT;
      };
      result: DeployedTransaction;
      errors: Errors.INVALID_CONTRACT_CLASS;
    };

    // Trace API
    starknet_traceTransaction: {
      params: { transaction_hash: TXN_HASH };
      result: Trace;
      errors:
        | Errors.INVALID_TXN_HASH
        | Errors.NO_TRACE_AVAILABLE
        | Errors.INVALID_BLOCK_HASH
        | Errors.INVALID_TXN_HASH;
    };
    starknet_traceBlockTransactions: {
      params: { block_hash: BLOCK_HASH };
      result: Traces;
      errors: Errors.INVALID_BLOCK_HASH;
    };
  };
}

export namespace Errors {
  export interface FAILED_TO_RECEIVE_TXN {
    code: 1;
    message: 'Failed to write transaction';
  }

  export interface CONTRACT_NOT_FOUND {
    code: 20;
    message: 'Contract not found';
  }

  export interface INVALID_MESSAGE_SELECTOR {
    code: 21;
    message: 'Invalid message selector';
  }

  export interface INVALID_CALL_DATA {
    code: 22;
    message: 'Invalid call data';
  }

  export interface INVALID_BLOCK_ID {
    code: 24;
    message: 'Invalid block id';
  }

  export interface INVALID_TXN_INDEX {
    code: 27;
    message: 'Invalid transaction index in a block';
  }

  export interface INVALID_CONTRACT_CLASS_HASH {
    code: 28;
    message: 'The supplied contract class hash is invalid or unknown';
  }

  export interface PAGE_SIZE_TOO_BIG {
    code: 31;
    message: 'Requested page size is too big';
  }

  export interface NO_BLOCKS {
    code: 32;
    message: 'There are no blocks';
  }

  export interface CONTRACT_ERROR {
    code: 40;
    message: 'Contract error';
  }

  export interface INVALID_CONTRACT_CLASS {
    code: 50;
    message: 'Invalid contract class';
  }

  export interface NO_TRACE_AVAILABLE {
    code: 10;
    message: 'No trace available for transaction';
    data: {
      status: 'RECEIVED' | 'REJECTED';
    };
  }

  export interface INVALID_BLOCK_HASH {
    code: 24;
    message: 'Invalid block hash';
  }

  export interface INVALID_TXN_HASH {
    code: 25;
    message: 'Invalid transaction hash';
  }
}
