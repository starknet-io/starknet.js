/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import BN from 'bn.js';

import {
  AllowArray,
  Call,
  DeclareContractPayload,
  DeployAccountContractPayload,
  RawCalldata,
  Signature,
  Status,
} from './lib';

export interface GetBlockResponse {
  timestamp: number;
  block_hash: string;
  block_number: number;
  new_root: string;
  parent_hash: string;
  status: Status;
  transactions: Array<string>;
  gas_price?: string;
  sequencer_address?: string;
  starknet_version?: string;
  transaction_receipts?: any;
}

export interface GetCodeResponse {
  bytecode: string[];
  // abi: string; // is not consistent between rpc and sequencer (is it?), therefore not included in the provider interface
}

export type GetTransactionResponse = InvokeTransactionResponse & DeclareTransactionResponse;

export interface CommonTransactionResponse {
  transaction_hash?: string;
  version?: string;
  signature?: Signature;
  max_fee?: string;
  nonce?: string;
}

export interface InvokeTransactionResponse extends CommonTransactionResponse {
  contract_address?: string;
  entry_point_selector?: string;
  calldata: RawCalldata;
}

export interface ContractEntryPoint {
  offset: string;
  selector: string;
}

export interface DeclareTransactionResponse extends CommonTransactionResponse {
  contract_class?: any;
  sender_address?: string;
}

export type GetTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export interface CommonTransactionReceiptResponse {
  transaction_hash: string;
  status?: Status;
  actual_fee?: string;
  status_data?: string;
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

export interface InvokeTransactionReceiptResponse extends CommonTransactionReceiptResponse {
  /** @deprecated Use l2_to_l1_messages */
  messages_sent?: Array<MessageToL1>;
  events?: Array<Event>;
  l1_origin_message?: MessageToL2;
}

export type DeclareTransactionReceiptResponse = CommonTransactionReceiptResponse;

export interface EstimateFeeResponse {
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
}

export interface InvokeFunctionResponse {
  transaction_hash: string;
}

export interface DeployContractResponse {
  contract_address: string;
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
      type: 'INVOKE';
      payload: AllowArray<Call>;
    }
  | {
      type: 'DECLARE';
      payload: DeclareContractPayload;
    }
  | {
      type: 'DEPLOY_ACCOUNT';
      payload: DeployAccountContractPayload;
    };
