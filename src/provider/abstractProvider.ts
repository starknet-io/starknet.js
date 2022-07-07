import { CompiledContract } from '../types';
import { BigNumberish } from '../utils/number';
import { BlockIdentifier } from './utils';

type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';

/**
 * getBlock response object
 *
 * RPC provider has a "request_scope" param which can be either sequencer_address TXN_HASH,
 * FULL_TXNS, FULL_TXN_AND_RECEIPTS.
 * We can either defualt to to FULL_TXN_AND_RECEIPTS or use the "request_scope" param
 * to specify the scope and parse the default provider response accordingly.
 *
 * "old_root" property is missing from the default provider response.
 */

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

/**
 * getTransaction response object
 * Responses differ here from the default provider.
 * Default parser response should be parsed to fit the RPC response.
 */
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
  calldata?: Array<string>;
}

/**
 * getTransactionReceipt response object
 */

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

/**
 * estimateFee response object
 *
 * There is a large difference between the default provider and the RPC provider.
 */

export interface FeeEstimateResponse {
  // gasConsumed: BigNumberish; // missing from the default provider
  // gasPrice: BigNumberish; // missing from the default provider
  overallFee: BigNumberish; // in wei
}

export interface FunctionCall {
  contractAddress: string;
  entryPointSelector: string;
  calldata: Array<BigNumberish>;
}

export interface InvokeContractResponse {
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
  result: Array<BigNumberish>;
};

export abstract class Provider {
  // Get block information given the block hash or number
  abstract getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;

  // Get the value of the storage at the given address and key
  abstract getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier
  ): Promise<BigNumberish>;

  // Get the details of a submitted transaction
  abstract getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse>;

  // Get the transaction receipt by the transaction hash
  abstract getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse>;

  // Estimates the resources required by a transaction relative to a given state
  abstract estimateFee(
    request: FunctionCall,
    blockIdentifier: BlockIdentifier
  ): Promise<FeeEstimateResponse>;

  abstract callContract(
    request: FunctionCall,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;

  abstract invokeContract(
    functionInvocation: FunctionCall,
    signature?: Array<BigNumberish>,
    maxFee?: BigNumberish,
    version?: BigNumberish
  ): Promise<InvokeContractResponse>;

  abstract deployContract(
    compiledContract: CompiledContract | string,
    constructorCalldata: Array<BigNumberish>,
    salt?: BigNumberish
  ): Promise<DeployContractResponse>;

  abstract declareContract(
    compiledContract: CompiledContract | string,
    version?: BigNumberish
  ): Promise<DeclareContractResponse>;

  abstract waitForTransaction(txHash: BigNumberish, retryInterval: number): Promise<void>;
}
