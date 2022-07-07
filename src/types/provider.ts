import { BigNumberish } from '../utils/number';
import { Status } from './lib';

export interface GetBlockResponse {
  acceptedTime: number;
  blockHash: string;
  blockNumber: number;
  gasPrice: string;
  newRoot: string;
  oldRoot?: string;
  parentHash: string;
  sequencer: string;
  status: Status;
  transactions: Array<string>;
}

export type GetTransactionResponse = InvokeTransactionResponse & DeclareTransactionResponse;

export interface CommonTransactionResponse {
  transactionHash?: string;
  version?: string;
  signature?: Array<string>;
  maxFee?: string;
  nonce?: string;
}

export interface InvokeTransactionResponse extends CommonTransactionResponse {
  contractAddress?: string;
  entryPointSelector?: string;
  calldata: Array<string>;
}

export interface ContractEntryPoint {
  offset: string;
  selector: string;
}

export interface ContractClass {
  program: string;
  entryPointByType: {
    CONSTRUCTOR: Array<ContractEntryPoint>;
    EXTERNAL: Array<ContractEntryPoint>;
    L1_HANDLER: Array<ContractEntryPoint>;
  };
}

export interface DeclareTransactionResponse extends CommonTransactionResponse {
  contractClass?: any;
  senderAddress?: string;
}

export type GetTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export interface CommonTransactionReceiptResponse {
  transactionHash: string;
  status: Status;
  actualFee?: string;
  statusData?: string;
}

export interface MessageToL1 {
  toAddress: string;
  payload: Array<string>;
}

export interface Event {
  fromAddress: string;
  keys: Array<string>;
  data: Array<string>;
}

export interface MessageToL2 {
  fromAddress: string;
  payload: Array<string>;
}

export interface InvokeTransactionReceiptResponse extends CommonTransactionReceiptResponse {
  messagesSent: Array<MessageToL1>;
  events: Array<Event>;
  l1OriginMessage?: MessageToL2;
}

export type DeclareTransactionReceiptResponse = CommonTransactionReceiptResponse;

export interface EstimateFeeResponse {
  overallFee: BigNumberish;
}

export interface InvokeFunctionResponse {
  transactionHash: string;
}

export interface DeployContractResponse {
  contractAddress: string;
  transactionHash: string;
}

export interface DeclareContractResponse {
  transactionHash: string;
  classHash: string;
}

export type CallContractResponse = {
  result: Array<string>;
};
