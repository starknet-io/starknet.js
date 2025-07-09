import { EDataAvailabilityMode, ETransactionVersion3, PAYMASTER_API } from './api';
import { BigNumberish, BlockIdentifier, V3TransactionDetails } from './lib';
import {
  DeclareTransactionReceiptResponse,
  EstimateFeeResponseOverhead,
} from '../provider/types/index.type';
import { ResourceBoundsBN } from '../provider/types/spec.type';
import { FeeMode, PaymasterTimeBounds } from './paymaster';

export type EstimateFeeBulk = Array<EstimateFeeResponseOverhead>;

// TODO: This is too wide generic with optional params
export type AccountInvocationsFactoryDetails = {
  versions: Array<`${ETransactionVersion3}`>;
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
} & Partial<V3TransactionDetails>;

export interface UniversalDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  tip?: BigNumberish;
  paymasterData?: BigNumberish[];
  accountDeploymentData?: BigNumberish[];
  nonceDataAvailabilityMode?: EDataAvailabilityMode;
  feeDataAvailabilityMode?: EDataAvailabilityMode;
  version?: BigNumberish;
  resourceBounds?: ResourceBoundsBN; // ignored on estimate
  skipValidate?: boolean; // ignored on non-estimate
}

export interface PaymasterDetails {
  feeMode: FeeMode;
  deploymentData?: PAYMASTER_API.AccountDeploymentData;
  timeBounds?: PaymasterTimeBounds;
}

export interface EstimateFeeDetails extends UniversalDetails {}

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

export type StarkProfile = {
  name?: string;
  profilePicture?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  proofOfPersonhood?: boolean;
};
