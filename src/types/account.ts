import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/num';
import { CairoVersion } from './lib';
import {
  DeclareTransactionReceiptResponse,
  EstimateFeeResponse,
  TransactionSimulationResponse,
} from './provider';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: bigint;
}

export type EstimateFeeBulk = Array<EstimateFee>;

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
  cairoVersion?: CairoVersion;
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
  } & DeclareTransactionReceiptResponse;
  deploy: DeployContractUDCResponse;
};

export interface TransactionSimulation extends TransactionSimulationResponse {
  fee_estimation: EstimateFee;
}
