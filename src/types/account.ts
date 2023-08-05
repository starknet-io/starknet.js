import { BigNumberish, BlockIdentifier } from './lib';
import { DeclareTransactionReceiptResponse, EstimateFeeResponse } from './provider';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: bigint;
}

export type EstimateFeeBulk = Array<EstimateFee>;

export type AccountInvocationsFactoryDetails = {
  versions: bigint[];
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
};

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
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
};

export enum SIMULATION_FLAG {
  SKIP_VALIDATE = 'SKIP_VALIDATE',
  SKIP_EXECUTE = 'SKIP_EXECUTE',
}
