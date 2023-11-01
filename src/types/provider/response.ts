/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import * as RPC from '../api/rpc';
import { BlockHash } from '../api/rpc';
import * as Sequencer from '../api/sequencer';
import {
  AllowArray,
  BlockNumber,
  BlockStatus,
  ByteCode,
  Call,
  CompiledSierra,
  DeclareContractPayload,
  DeployAccountContractPayload,
  LegacyContractClass,
  RawCalldata,
  Signature,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionStatus,
  TransactionType,
  UniversalDeployerContractPayload,
} from '../lib';

export interface GetBlockResponse {
  timestamp: number;
  block_hash: string;
  block_number: number;
  new_root: string;
  parent_hash: string;
  status: BlockStatus;
  transactions: Array<string>;
  gas_price?: string;
  sequencer_address?: string;
  starknet_version?: string;
  transaction_receipts?: any;
}

export interface GetCodeResponse {
  bytecode: ByteCode;
  // abi: string; // is not consistent between rpc and sequencer (is it?), therefore not included in the provider interface
}

export interface ContractEntryPoint {
  offset: string;
  selector: string;
}

export type GetTransactionResponse =
  | InvokeTransactionResponse
  | DeclareTransactionResponse
  | RejectedTransactionResponse;

export interface CommonTransactionResponse {
  transaction_hash?: string;
  version?: string;
  signature?: Signature;
  max_fee?: string;
  nonce?: string;
}

export interface InvokeTransactionResponse extends CommonTransactionResponse {
  contract_address?: string; // TODO: Added for RPC comp, remove when rpc update to sender_address
  sender_address?: string;
  entry_point_selector?: string;
  calldata: RawCalldata;
}

export interface DeclareTransactionResponse extends CommonTransactionResponse {
  contract_class?: any;
  sender_address?: string;
}

export interface MessageToL1 {
  to_address: string;
  payload: Array<string>;
}

export interface Event {
  from_address: string;
  keys: Array<string>;
  data: Array<string>;
}

export interface MessageToL2 {
  from_address: string;
  payload: Array<string>;
}

export type RejectedTransactionResponse = {
  status: `${TransactionStatus.REJECTED}`;
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
};

export type GetTransactionReceiptResponse =
  | SuccessfulTransactionReceiptResponse
  | RevertedTransactionReceiptResponse
  | RejectedTransactionReceiptResponse;

export type SuccessfulTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeployTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export interface InvokeTransactionReceiptResponse {
  type?: TransactionType; // RPC only
  execution_status: TransactionExecutionStatus;
  finality_status: TransactionFinalityStatus;
  status?: `${TransactionStatus}`; // SEQ only
  actual_fee: string;
  block_hash: BlockHash;
  block_number: BlockNumber;
  transaction_hash: string;
  transaction_index?: number; // SEQ only
  messages_sent: Array<MessageToL1>; // Casted SEQ l2_to_l1_messages
  events: any[];
  execution_resources?: any; // SEQ Only
}

export type DeclareTransactionReceiptResponse = {
  type?: TransactionType; // RPC only
  execution_status: TransactionExecutionStatus;
  finality_status: TransactionFinalityStatus;
  status?: `${TransactionStatus}`; // SEQ only
  actual_fee: string;
  block_hash: BlockHash;
  block_number: BlockNumber;
  transaction_hash: string;
  transaction_index?: number; // SEQ only
  messages_sent: Array<MessageToL1>; // Casted SEQ l2_to_l1_messages
  events: any[];
};

export type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;

// TODO: Missing RPC DEPLOY_ACCOUNT_TXN_RECEIPT

// TODO: Missing RPC PENDING_TXN_RECEIPT

// TODO: Missing RPC L1_HANDLER_TXN_RECEIPT

export type RejectedTransactionReceiptResponse = {
  status: `${TransactionStatus.REJECTED}`;
  transaction_failure_reason: {
    code: string;
    error_message: string;
  };
};

export type RevertedTransactionReceiptResponse = {
  type?: TransactionType | any; // RPC only // any due to RPC Spec issue
  execution_status: TransactionExecutionStatus.REVERTED | any; // any due to RPC Spec issue
  finality_status: TransactionFinalityStatus | any;
  status?: TransactionStatus; // SEQ only
  actual_fee: string;
  block_hash?: string; // ?~ optional due to RPC spec issue
  block_number?: BlockNumber; // ?~ optional due to RCP spec issue
  transaction_hash: string;
  transaction_index?: number; // SEQ only
  messages_sent: Array<MessageToL1>; // SEQ Casted l2_to_l1_messages
  events: any[];
  revert_reason?: string; // SEQ Casted revert_error // ?~ optional due to RCP spec issue
};

export interface EstimateFeeResponse {
  overall_fee: bigint;
  gas_consumed?: bigint;
  gas_price?: bigint;
  suggestedMaxFee?: bigint;
}

export interface InvokeFunctionResponse {
  transaction_hash: string;
}

export interface DeclareContractResponse {
  transaction_hash: string;
  class_hash: string;
}

export type CallContractResponse = {
  result: Array<string>;
};

export type EstimateFeeAction =
  | {
      type: TransactionType.INVOKE;
      payload: AllowArray<Call>;
    }
  | {
      type: TransactionType.DECLARE;
      payload: DeclareContractPayload;
    }
  | {
      type: TransactionType.DEPLOY_ACCOUNT;
      payload: DeployAccountContractPayload;
    }
  | {
      type: TransactionType.DEPLOY;
      payload: UniversalDeployerContractPayload;
    };

export type EstimateFeeResponseBulk = Array<EstimateFeeResponse>;

export type Storage = Sequencer.Storage;

export type Nonce = Sequencer.Nonce;

export type SimulationFlags = RPC.SimulationFlags;

export type SimulatedTransaction = {
  transaction_trace: RPC.TransactionTrace | Sequencer.TransactionTraceResponse;
  fee_estimation: RPC.FeeEstimate | Sequencer.EstimateFeeResponse;
  suggestedMaxFee?: string | bigint;
};

export type SimulateTransactionResponse = SimulatedTransaction[];

// As RPC and Sequencer response diverge, use RPC as common response
export interface StateUpdateResponse {
  block_hash?: string;
  new_root?: string;
  old_root: string;
  state_diff: {
    storage_diffs: RPC.StorageDiffs; // API DIFF
    deployed_contracts: Sequencer.DeployedContracts;
    nonces: RPC.NonceUpdates; // API DIFF
    old_declared_contracts?: Sequencer.OldDeclaredContracts; // Sequencer Only
    declared_classes?: Sequencer.DeclaredClasses;
    replaced_classes?: Sequencer.ReplacedClasses | RPC.ReplacedClasses;
    deprecated_declared_classes?: RPC.DeprecatedDeclaredClasses; // RPC Only
  };
}

/**
 * Standardized type
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 * abi Abi
 * CompiledSierra without '.sierra_program_debug_info'
 */
export type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>;
