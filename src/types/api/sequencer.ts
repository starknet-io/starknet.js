import {
  Abi,
  AllowArray,
  BigNumberish,
  BlockIdentifier,
  BlockNumber,
  BlockStatus,
  ByteCode,
  CairoAssembly,
  CompiledContract,
  ContractClass,
  EntryPointType,
  RawCalldata,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionStatus,
  TransactionType,
} from '../lib';

// #region | originally not included in the namespace
export type GetTransactionStatusResponse = {
  tx_status: TransactionStatus;
  execution_status: TransactionExecutionStatus;
  finality_status: TransactionFinalityStatus;
  block_hash?: string;
  tx_failure_reason?: {
    code: string;
    error_message: string;
  };
  tx_revert_reason?: string;
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
  entry_point_type?: EntryPointType.EXTERNAL; // TODO: check this
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

export type CallL1Handler = {
  from_address: string;
  to_address: string;
  entry_point_selector: string;
  payload: Array<string>;
};

export type DeployedContractItem = {
  address: string;
  class_hash: string;
};

export type SequencerIdentifier = { blockHash: string } | { blockNumber: BlockNumber };
// #endregion

export type TransactionTraceResponse = {
  validate_invocation?: FunctionInvocation;
  function_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  constructor_invocation?: FunctionInvocation;
  signature: string[];
};

export type DeclareTransaction = {
  type: TransactionType.DECLARE;
  sender_address: string;
  contract_class: ContractClass;
  signature?: string[];
  nonce: BigNumberish;
  max_fee?: BigNumberish;
  version?: BigNumberish;
  compiled_class_hash?: string; // v2 declare
};

export type DeployTransaction = {
  type: TransactionType.DEPLOY;
  contract_definition: ContractClass;
  contract_address_salt: BigNumberish;
  constructor_calldata: string[];
  nonce?: BigNumberish;
};

export type DeployAccountTransaction = {
  type: TransactionType.DEPLOY_ACCOUNT;
  class_hash: string;
  contract_address_salt: BigNumberish;
  constructor_calldata: string[];
  signature?: string[];
  max_fee?: BigNumberish;
  version?: BigNumberish;
  nonce?: BigNumberish;
};

export type InvokeFunctionTransaction = {
  type: TransactionType.INVOKE;
  sender_address: string;
  signature?: string[];
  entry_point_type?: EntryPointType.EXTERNAL; // TODO: check this
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
  code?: 'TRANSACTION_RECEIVED';
  address?: string;
  class_hash?: string;
};

export type GetCodeResponse = {
  bytecode: ByteCode;
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
  execution_status: TransactionExecutionStatus.SUCCEEDED;
  finality_status: TransactionFinalityStatus;
  status: TransactionStatus;
  block_hash: string;
  block_number: BlockNumber;
  transaction_index: number;
  transaction: TransactionResponse;
};

export type RevertedTransactionResponse = {
  execution_status: TransactionExecutionStatus.REVERTED;
  finality_status: TransactionFinalityStatus;
  status: TransactionStatus;
  block_hash: string;
  block_number: BlockNumber;
  transaction_index: number;
  transaction: TransactionResponse;
  revert_error: string;
};

export type FailedTransactionResponse = {
  status: TransactionStatus.REJECTED;
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
  transaction: TransactionResponse;
};

export type GetTransactionResponse =
  | SuccessfulTransactionResponse
  | RevertedTransactionResponse
  | FailedTransactionResponse;

export type TransactionReceiptResponse =
  | SuccessfulTransactionReceiptResponse
  | RevertedTransactionReceiptResponse
  | RejectedTransactionReceiptResponse;

export type SuccessfulTransactionReceiptResponse = {
  execution_status: TransactionExecutionStatus.SUCCEEDED;
  finality_status: TransactionFinalityStatus;
  status: TransactionStatus;
  actual_fee: string;
  block_hash: string;
  block_number: BlockNumber;
  transaction_hash: string;
  transaction_index: number;
  l2_to_l1_messages: string[];
  events: string[];
  execution_resources?: ExecutionResources; // INVOKE ONLY
};

export type RevertedTransactionReceiptResponse = {
  execution_status: TransactionExecutionStatus.REVERTED;
  finality_status: TransactionFinalityStatus;
  status: TransactionStatus.REVERTED;
  actual_fee: string;
  block_hash: string;
  block_number: BlockNumber;
  transaction_hash: string;
  transaction_index: number;
  l2_to_l1_messages: string[];
  events: string[];
  revert_error: string;
};

export type RejectedTransactionReceiptResponse = {
  execution_status: TransactionExecutionStatus.REJECTED;
  finality_status: TransactionFinalityStatus;
  status: TransactionStatus.REJECTED;
  transaction_hash: string;
  l2_to_l1_messages: string[];
  events: string[];
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
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
      status: TransactionStatus;
      transaction_index: number;
    };
  };
  parent_block_hash: string;
  status: BlockStatus;
  gas_price: string;
  sequencer_address: string;
  starknet_version: string;
};

export type CallContractTransaction = {
  calldata?: RawCalldata;
  max_fee?: BigNumberish;
  version?: BigNumberish;
  entry_point_selector: string;
} & (
  | {
      sender_address: string;
      signature: string[];
    }
  | {
      contract_address: string;
      signature?: never;
    }
);

export type CallContractResponse = {
  result: string[];
};

export type InvokeEstimateFee = Omit<InvokeFunctionTransaction, 'max_fee' | 'entry_point_type'>;
export type DeclareEstimateFee = Omit<DeclareTransaction, 'max_fee'>;
export type DeployAccountEstimateFee = Omit<DeployAccountTransaction, 'max_fee'>;
export type DeployEstimateFee = DeployTransaction;

export type SimulateTransactionResponse = {
  trace: TransactionTraceResponse; // diff with OPENRPC "transaction_trace"
  fee_estimation: EstimateFeeResponse;
};

export type AccountTransactionItem =
  | InvokeEstimateFee
  | DeclareEstimateFee
  | DeployEstimateFee
  | DeployAccountEstimateFee;

/**
 * Transaction filled with account data
 */
export type AccountTransaction = AllowArray<AccountTransactionItem>;

// Support 0.9.1 changes in a backward-compatible way
export type EstimateFeeResponse =
  | {
      overall_fee: number;
      gas_price: number;
      gas_usage: number;
      uint: string;
    }
  | {
      amount: bigint;
      unit: string;
    };

export type EstimateFeeResponseBulk = AllowArray<EstimateFeeResponse>;

export type BlockTransactionTracesResponse = {
  traces: Array<TransactionTraceResponse & { transaction_hash: string }>;
};

export type Storage = string;

export type StateUpdateResponse = {
  block_hash: string;
  new_root: string;
  old_root: string;
  state_diff: {
    storage_diffs: StorageDiffs;
    nonces: Nonces;
    deployed_contracts: Array<DeployedContractItem>;
    old_declared_contracts: OldDeclaredContracts;
    declared_classes: DeclaredClasses;
    replaced_classes: ReplacedClasses; // no definition is it array of string
  };
};

export type StorageDiffs = { [address: string]: Array<StateDiffItem> };

export type StateDiffItem = { key: string; value: string };

export type Nonces = { [address: string]: Nonce };

export type Nonce = string;

export type DeployedContracts = DeployedContractItem[];

export type OldDeclaredContracts = string[];

export type DeclaredClasses = DeclaredClass[];

export type DeclaredClass = { class_hash: string; compiled_class_hash: string };

export type ReplacedClasses = string[]; // no definition is it array of string ?

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
    RESPONSE: TransactionTraceResponse;
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
    RESPONSE: Nonce;
  };
  get_storage_at: {
    QUERY: {
      contractAddress: string;
      key: BigNumberish;
      blockIdentifier: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: Storage;
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
      skipValidate: boolean;
    };
    REQUEST: AccountTransactionItem;
    RESPONSE: EstimateFeeResponse;
  };
  get_class_by_hash: {
    QUERY: {
      classHash: string;
      blockIdentifier?: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: CompiledContract;
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
      blockHash?: string;
      blockNumber?: BlockNumber;
    };
    REQUEST: never;
    RESPONSE: StateUpdateResponse;
  };
  get_full_contract: {
    QUERY: {
      contractAddress: string;
      blockIdentifier?: BlockIdentifier;
    };
    REQUEST: never;
    RESPONSE: CompiledContract;
  };
  estimate_message_fee: {
    QUERY: any;
    REQUEST: any;
    RESPONSE: EstimateFeeResponse;
  };
  simulate_transaction: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
      skipValidate: boolean;
    };
    REQUEST: AccountTransaction;
    RESPONSE: SimulateTransactionResponse;
  };
  estimate_fee_bulk: {
    QUERY: {
      blockIdentifier: BlockIdentifier;
      skipValidate: boolean;
    };
    REQUEST: AccountTransaction;
    RESPONSE: EstimateFeeResponseBulk;
  };
  get_block_traces: {
    QUERY: {
      blockHash?: string;
      blockNumber?: BlockNumber;
    };
    REQUEST: never;
    RESPONSE: BlockTransactionTracesResponse;
  };
  get_compiled_class_by_class_hash: {
    QUERY: {
      classHash: string;
      blockIdentifier?: BlockIdentifier;
    };
    REQUEST: any;
    RESPONSE: CairoAssembly;
  };
};
