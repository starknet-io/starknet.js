import BN from 'bn.js';

import { Abi, CompressedProgram, EntryPointsByType, RawCalldata, Signature, Status } from './lib';

export interface GetBlockResponse {
  accepted_time: number;
  block_hash: string;
  block_number: number;
  gas_price: string;
  new_root: string;
  old_root?: string;
  parent_hash: string;
  sequencer: string;
  status: Status;
  transactions: Array<string>;
  starknet_version?: string;
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

export interface ContractClass {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi?: Abi;
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
  status: Status;
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
  messages_sent: Array<MessageToL1>;
  events: Array<Event>;
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
