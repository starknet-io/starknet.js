import BN from 'bn.js';

import { BlockIdentifier } from '../../provider/utils';
import { BigNumberish } from '../../utils/number';
import {
  Abi,
  BlockNumber,
  ContractClass,
  EntryPointType,
  RawCalldata,
  Signature,
  Status,
  TransactionStatus,
} from '../lib';

export type GetTransactionStatusResponse = {
  tx_status: Status;
  block_hash?: string;
  tx_failure_reason?: {
    code: string;
    error_message: string;
  };
};

export type GetContractAddressesResponse = {
  Starknet: string;
  GpsStatementVerifier: string;
};

export type FunctionInvocation = {
  caller_address: string;
  contract_address: string;
  calldata: RawCalldata;
  call_type?: string;
  class_hash?: string;
  selector?: string;
  entry_point_type?: EntryPointType;
  result: Array<any>;
  execution_resources: ExecutionResources;
  internal_calls: Array<FunctionInvocation>;
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
    ec_op_builtin?: number;
  };
  n_memory_holes: number;
};

export type GetTransactionTraceResponse = {
  validate_invocation?: FunctionInvocation;
  function_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  signature: Signature;
};

export type CallL1Handler = {
  from_address: string;
  to_address: string;
  entry_point_selector: string;
  payload: Array<string>;
};

export namespace Sequencer {
  export type DeclareTransaction = {
    type: 'DECLARE';
    sender_address: string;
    contract_class: ContractClass;
    signature?: Signature;
    nonce: BigNumberish;
    max_fee?: BigNumberish;
    version?: BigNumberish;
  };

  export type DeployTransaction = {
    type: 'DEPLOY';
    contract_definition: ContractClass;
    contract_address_salt: BigNumberish;
    constructor_calldata: string[];
    nonce?: BigNumberish;
  };

  export type DeployAccountTransaction = {
    type: 'DEPLOY_ACCOUNT';
    class_hash: string;
    contract_address_salt: BigNumberish;
    constructor_calldata: string[];
    signature?: Signature;
    max_fee?: BigNumberish;
    version?: BigNumberish;
    nonce?: BigNumberish;
  };

  export type InvokeFunctionTransaction = {
    type: 'INVOKE_FUNCTION';
    contract_address: string;
    signature?: Signature;
    entry_point_type?: EntryPointType;
    calldata?: RawCalldata;
    nonce: BigNumberish;
    max_fee?: BigNumberish;
    version?: BigNumberish;
  };

  export type Transaction =
    | DeclareTransaction
    | DeployTransaction
    | InvokeFunctionTransaction
    | DeployAccountTransaction;

  export type AddTransactionResponse = {
    transaction_hash: string;
    code?: TransactionStatus;
    address?: string;
    class_hash?: string;
  };

  export type GetCodeResponse = {
    bytecode: string[];
    abi: Abi;
  };

  export interface InvokeFunctionTransactionResponse extends InvokeFunctionTransaction {
    transaction_hash: string;
    entry_point_selector: string;
  }

  export type TransactionResponse =
    | DeclareTransaction
    | DeployTransaction
    | InvokeFunctionTransactionResponse;

  export type SuccessfulTransactionResponse = {
    status: Status;
    transaction: TransactionResponse;
    block_hash: string;
    block_number: BlockNumber;
    transaction_index: number;
  };

  export type FailedTransactionResponse = {
    status: 'REJECTED';
    transaction_failure_reason: {
      code: string;
      error_message: string;
    };
    transaction: TransactionResponse;
  };

  export type GetTransactionResponse = SuccessfulTransactionResponse | FailedTransactionResponse;

  export type TransactionReceiptResponse =
    | SuccessfulTransactionReceiptResponse
    | FailedTransactionReceiptResponse;

  export type SuccessfulTransactionReceiptResponse = {
    status: Status;
    transaction_hash: string;
    transaction_index: number;
    block_hash: string;
    block_number: BlockNumber;
    l2_to_l1_messages: string[];
    events: string[];
    actual_fee: string;
    execution_resources: ExecutionResources;
  };

  export type FailedTransactionReceiptResponse = {
    status: 'REJECTED';
    transaction_failure_reason: {
      code: string;
      error_message: string;
    };
    transaction_hash: string;
    l2_to_l1_messages: string[];
    events: string[];
  };

  export type GetBlockResponse = {
    block_number: number;
    state_root: string;
    block_hash: string;
    transactions: {
      [txHash: string]: TransactionResponse;
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
    parent_block_hash: string;
    status: Status;
    gas_price: string;
    sequencer_address: string;
    starknet_version: string;
  };

  export type CallContractTransaction = Omit<
    InvokeFunctionTransaction,
    'type' | 'entry_point_type' | 'nonce'
  > & { entry_point_selector: string };

  export type CallContractResponse = {
    result: string[];
  };

  export type InvokeEstimateFee = Omit<InvokeFunctionTransaction, 'max_fee' | 'entry_point_type'>;
  export type DeclareEstimateFee = Omit<DeclareTransaction, 'max_fee'>;
  export type DeployAccountEstimateFee = Omit<DeployAccountTransaction, 'max_fee'>;
  export type DeployEstimateFee = DeployTransaction;

  export type EstimateFeeRequest =
    | InvokeEstimateFee
    | DeclareEstimateFee
    | DeployEstimateFee
    | DeployAccountEstimateFee;

  // Support 0.9.1 changes in a backward-compatible way
  export type EstimateFeeResponse =
    | {
        overall_fee: number;
        gas_price: number;
        gas_usage: number;
      }
    | {
        amount: BN;
        unit: string;
      };

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
    get_nonce: {
      QUERY: {
        contractAddress: string;
        blockIdentifier: BlockIdentifier;
      };
      REQUEST: never;
      RESPONSE: BigNumberish;
    };
    get_storage_at: {
      QUERY: {
        contractAddress: string;
        key: BigNumberish;
        blockIdentifier: BlockIdentifier;
      };
      REQUEST: never;
      RESPONSE: string;
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
      REQUEST: EstimateFeeRequest;
      RESPONSE: EstimateFeeResponse;
    };
    get_class_by_hash: {
      QUERY: {
        classHash: string;
      };
      REQUEST: never;
      RESPONSE: any;
    };
    get_class_hash_at: {
      QUERY: {
        contractAddress: string;
        blockIdentifier?: BlockIdentifier;
      };
      REQUEST: never;
      RESPONSE: string;
    };
    get_state_update: {
      QUERY: {
        blockHash: string;
      };
      REQUEST: never;
      RESPONSE: any;
    };
    get_full_contract: {
      QUERY: {
        contractAddress: string;
        blockIdentifier?: BlockIdentifier;
      };
      REQUEST: never;
      RESPONSE: any;
    };
    estimate_message_fee: {
      QUERY: any;
      REQUEST: any;
      RESPONSE: EstimateFeeResponse;
    };
  };
}
