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
  acceptedTime: number; // "timestamp"
  blockHash: string;
  blockNumber: number;
  gasPrice: string;
  newRoot: string; // "state_root"
  oldRoot?: string; // missing
  parentHash: string; // "parent_block_hash"
  sequencer: string; // "sequencer_address"
  status: Status;
  transactions: Array<unknown>;
}

/**
 * getStateUpdate response object
 */

export interface GetStateUpdateResponse {
  blockHash: string;
  newRoot: string;
  oldRoot: string;
  acceptedTime?: number; // missing on the default provider
  stateDiff: {
    storageDiffs: Array<{
      address: string;
      key: string;
      value: string;
    }>;
    deployedContracts: Array<{
      address: string;
      contractHash: string;
    }>;
    nonces?: Array<{
      contractAddress: string;
      nonce: BigNumberish;
    }>; // missing on the default provider
  };
}

/**
 * getTransaction response object
 * Responses differ here from the default provider.
 * Default parser response should be parsed to fit the RPC response.
 */
export type GetTransactionResponse = InvokeTransactionResponse & DeclareTransactionResponse;

export interface CommonTransactionResponse {
  transactionHash: string;
  maxFee: string;
  version: string;
  signature: Array<string>;
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
  contractClass?: ContractClass;
  senderAddress?: string;
}

export type GetTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export interface CommonTransactionReceiptResponse {
  transactionHash: string;
  actualFee: string;
  status: Status;
  statusData: string;
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

  // Get the information about the result of executing the requested block
  abstract getStateUpdate(blockHash: BigNumberish): Promise<GetStateUpdateResponse>;

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

  // Get the contract class deployed under the given class hash.
  abstract getClass(classHash: BigNumberish): Promise<ContractClass>;

  // Get the contract class deployed under the given address.
  abstract getClassAt(contractAddress: BigNumberish): Promise<ContractClass>;

  // Get the class hash deployed under the given address.
  abstract getClassHash(contractAddress: BigNumberish): Promise<string>;

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
    contractClass: ContractClass,
    constructorCalldata: Array<BigNumberish>,
    salt?: BigNumberish
  ): Promise<DeployContractResponse>;

  abstract declareContract(
    contractClass: ContractClass,
    version?: BigNumberish
  ): Promise<DeclareContractResponse>;

  abstract waitForTransaction(txHash: BigNumberish, retryInterval: number): Promise<void>;
}
