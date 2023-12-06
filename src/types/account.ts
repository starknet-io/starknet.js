import { EDataAvailabilityMode, ETransactionVersion, ResourceBounds } from './api';
import { BigNumberish, BlockIdentifier, V3TransactionDetails } from './lib';
import { DeclareTransactionReceiptResponse, EstimateFeeResponse } from './provider';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: bigint;
  resourceBounds: ResourceBounds;
}

export type EstimateFeeBulk = Array<EstimateFee>;

// TODO: This is too wide generic with optional params
export type AccountInvocationsFactoryDetails = {
  versions: Array<`${ETransactionVersion}`>;
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
} & Partial<V3TransactionDetails>;

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  maxFee?: BigNumberish; // TODO: max_fee is added to match InvocationsDetails
  tip?: BigNumberish;
  paymasterData?: BigNumberish[];
  accountDeploymentData?: BigNumberish[];
  nonceDataAvailabilityMode?: EDataAvailabilityMode;
  feeDataAvailabilityMode?: EDataAvailabilityMode;
  version?: BigNumberish; // TODO: this is BigNumberish for interoperability with InvocationsDetails
}

export interface DeployContractResponse {
  contract_address: string;
  transaction_hash: string;
}

export type MultiDeployContractResponse = {
  contract_address: Array<string>;
  transaction_hash: string;
};

export type DeployContractUDCResponse = {
  contract_address: string;
  transaction_hash: string;
  address: string;
  deployer: string;
  unique: string;
  classHash: string;
  calldata_len: string;
  calldata: Array<string>;
  salt: string;
};

export type DeclareDeployUDCResponse = {
  declare: {
    class_hash: BigNumberish;
  } & Partial<DeclareTransactionReceiptResponse>;
  deploy: DeployContractUDCResponse;
};

export type SimulateTransactionDetails = {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
  skipExecute?: boolean;
} & Partial<V3TransactionDetails>;

export enum SIMULATION_FLAG {
  SKIP_VALIDATE = 'SKIP_VALIDATE',
  SKIP_EXECUTE = 'SKIP_EXECUTE',
}
