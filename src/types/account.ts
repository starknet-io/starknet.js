import BN from 'bn.js';

import { BlockIdentifier } from '../provider/utils';
import { BigNumberish } from '../utils/number';
import {
  AllowArray,
  Call,
  DeclareContractPayload,
  DeployAccountContractPayload,
  TransactionType,
  UniversalDeployerContractPayload,
} from './lib';
import { DeclareTransactionReceiptResponse, EstimateFeeResponse } from './provider';

export interface EstimateFee extends EstimateFeeResponse {
  suggestedMaxFee: BN;
}

export interface EstimateFeeDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
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
