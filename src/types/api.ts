import BN from 'bn.js';

import { StarknetChainId } from '../constants';
import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/number';
import {
  Abi,
  BlockNumber,
  CompressedCompiledContract,
  EntryPointType,
  RawCalldata,
  Signature,
  Status,
  TransactionStatus,
} from './lib';

export type Endpoints = {
  get_contract_addresses: {
    QUERY: never;
    REQUEST: never;
    RESPONSE: GetContractAddressesResponse;
  };
  add_transaction: {
    QUERY: never;
    REQUEST: Transaction;
    RESPONSE: AddTransactionResponse;
  };
  get_transaction: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: GetTransactionResponse;
  };
  get_transaction_status: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: GetTransactionStatusResponse;
  };
  get_transaction_trace: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: GetTransactionTraceResponse;
  };
  get_transaction_receipt: {
    QUERY: {
      transactionHash: string;
    };
    REQUEST: never;
    RESPONSE: TransactionReceiptResponse;
  };
  get_storage_at: {
    QUERY: {
      contractAddress: string;
      key: number;
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: object;
  };
  get_code: {
    QUERY: {
      contractAddress: string;
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: GetCodeResponse;
  };
  get_block: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: GetBlockResponse;
  };
  call_contract: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: CallContractTransaction;
    RESPONSE: CallContractResponse;
  };
  estimate_fee: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: CallContractTransaction;
    RESPONSE: EstimateFeeResponse;
  };
};

export type Methods = {
  starknet_getBlockByHash: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetBlockResponseRPC;
  };
  starknet_getBlockByNumber: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetBlockResponseRPC;
  };
  starknet_getStorageAt: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetStorageAtResponseRPC;
  };
  starknet_getTransactionByHash: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionResponseRPC;
  };
  starknet_getTransactionByBlockHashAndIndex: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionResponseRPC;
  };
  starknet_getTransactionByBlockNumberAndIndex: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionResponseRPC;
  };
  starknet_getTransactionReceipt: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionReceiptResponseRPC;
  };
  starknet_getBlockTransactionCountByHash: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionCountResponseRPC;
  };
  starknet_getBlockTransactionCountByNumber: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetTransactionCountResponseRPC;
  };
  starknet_getCode: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetCodeResponseRPC;
  };
  starknet_call: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: string[];
  };
  starknet_blockNumber: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetBlockNumberResponseRPC;
  };
  starknet_chainId: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: StarknetChainId;
  };
  starknet_syncing: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetSyncingStatsResponseRPC;
  };
  starknet_getEvents: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: GetEventsResponseRPC;
  };
  starknet_addInvokeTransaction: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: AddTransactionResponse;
  };
  starknet_addDeployTransaction: {
    QUERY: never;
    REQUEST: any[];
    RESPONSE: DeployContractRPCResponse;
  };
};

export type GetContractAddressesResponse = {
  Starknet: string;
  GpsStatementVerifier: string;
};

export type DeployTransaction = {
  type: 'DEPLOY';
  contract_definition: CompressedCompiledContract;
  contract_address_salt: BigNumberish;
  constructor_calldata: string[];
  nonce?: BigNumberish;
};

export type InvokeFunctionTransaction = {
  type: 'INVOKE_FUNCTION';
  contract_address: string;
  signature?: Signature;
  entry_point_type?: EntryPointType;
  entry_point_selector: string;
  calldata?: RawCalldata;
  nonce?: BigNumberish;
  max_fee?: BigNumberish;
  version?: BigNumberish;
};

export type InvokeFunctionTrace = {
  caller_address: string;
  contract_address: string;
  code_address: string;
  selector: string;
  calldata: RawCalldata;
  result: Array<any>;
  execution_resources: ExecutionResources;
  internal_call: Array<InvokeFunctionTrace>;
  events: Array<any>;
  messages: Array<any>;
};

export type ExecutionResources = {
  n_steps: number;
  builtin_instance_counter: {
    pedersen_builtin: number;
    range_check_builtin: number;
    bitwise_builtin: number;
    output_builtin: number;
    ecdsa_builtin: number;
    ec_op_builtin: number;
  };
  n_memory_holes: number;
};

export type CallContractTransaction = Omit<
  InvokeFunctionTransaction,
  'type' | 'entry_point_type' | 'nonce'
>;

export type Transaction = DeployTransaction | InvokeFunctionTransaction;

export type CallContractResponse = {
  result: string[];
};

export type GetBlockResponse = {
  block_number: number;
  state_root: string;
  block_hash: string;
  transactions: {
    [txHash: string]: Transaction;
  };
  timestamp: number;
  transaction_receipts: {
    [txHash: string]: {
      block_hash: string;
      transaction_hash: string;
      l2_to_l1_messages: {
        to_address: string;
        payload: string[];
        from_address: string;
      }[];
      block_number: BlockNumber;
      status: Status;
      transaction_index: number;
    };
  };
  previous_block_hash: string;
  status: Status;
};

export type GetCodeResponse = {
  bytecode: string[];
  abi: Abi;
};

export type GetTransactionStatusResponse = {
  tx_status: Status;
  block_hash: string;
  tx_failure_reason?: {
    tx_id: number;
    code: string;
    error_message: string;
  };
};

export type GetTransactionTraceResponse = {
  function_invocation: {
    caller_address: string;
    contract_address: string;
    code_address: string;
    selector: string;
    calldata: RawArgs;
    result: Array<any>;
    execution_resources: any;
    internal_call: Array<any>;
    events: Array<any>;
    messages: Array<any>;
  };
  signature: Signature;
};

export type GetTransactionResponse = {
  status: Status;
  transaction: Transaction;
  block_hash: string;
  block_number: BlockNumber;
  transaction_index: number;
  transaction_hash: string;
};

export type AddTransactionResponse = {
  code: TransactionStatus;
  transaction_hash: string;
  address?: string;
};

export type TransactionReceiptResponse = {
  status: Status;
  transaction_hash: string;
  transaction_index: number;
  block_hash: string;
  block_number: BlockNumber;
  l2_to_l1_messages: string[];
  events: string[];
};

export type EstimateFeeResponse = {
  amount: BN;
  unit: string;
};

export type RawArgs = {
  [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
};

export type Calldata = string[];

export type Overrides = {
  maxFee?: BigNumberish;
  nonce?: BigNumberish;
  signature?: Signature;
};

// RPC Responses
export type RPCResponse = {
  id: number;
  result: any;
  jsonrpc: string;
  error?: {
    code: string;
    message: string;
  };
};

export type GetBlockResponseRPC = {
  block_hash: string;
  parent_hash: string;
  block_number: number;
  status: Status;
  sequencer: string;
  new_root: string;
  old_root: string;
  accepted_time: number;
  gas_price: string;
  transactions: string[];
};

export type GetCodeResponseRPC = {
  bytecode: string[];
  abi: string;
};

export type GetStorageAtResponseRPC = string;

export type GetTransactionReceiptResponseRPC = {
  txn_hash: string;
  actual_fee: string;
  status: Status;
  status_data: string;
  messages_sent: MessageToL1;
  l1_origin_message: MessageToL2;
  events: StarknetEvent[];
};

export type GetTransactionResponseRPC = {
  txn_hash: string;
  max_fee: string;
  contract_address: string;
  entry_point_selector: string;
  calldata: string[];
};

export type GetTransactionCountResponseRPC = number;

export type GetBlockNumberResponseRPC = number;

export type GetSyncingStatsResponseRPC =
  | {
      starting_block_hash: string;
      starting_block_num: string;
      current_block_hash: string;
      current_block_num: string;
      highest_block_hash: string;
      highest_block_num: string;
    }
  | boolean;

export type EventFilterRPC = {
  fromBlock: string;
  toBlock: string;
  address: string;
  keys: string[];
  page_size: number;
  page_number: number;
};

export type GetEventsResponseRPC = {
  events: StarknetEmittedEvent[];
  page_number: number;
  is_last_page: number;
};

export type DeployContractRPCResponse = {
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
