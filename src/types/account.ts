import { EDataAvailabilityMode, ETransactionVersion, PAYMASTER_API } from './api';
import {
  AllowArray,
  BigNumberish,
  BlockIdentifier,
  Call,
  DeclareContractPayload,
  DeployAccountContractPayload,
  TransactionType,
  UniversalDeployerContractPayload,
  V3TransactionDetails,
} from './lib';
import {
  DeclareTransactionReceiptResponse,
  EstimateFeeResponse,
} from '../provider/types/index.type';
import { ResourceBounds } from '../provider/types/spec.type';
import { FeeMode, PaymasterTimeBounds } from './paymaster';

export interface EstimateFee extends EstimateFeeResponse {}

export type UniversalSuggestedFee = {
  maxFee: BigNumberish;
  resourceBounds: ResourceBounds;
};

export type EstimateFeeBulk = Array<EstimateFee>;

// TODO: This is too wide generic with optional params
export type AccountInvocationsFactoryDetails = {
  versions: Array<`${ETransactionVersion}`>;
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
} & Partial<V3TransactionDetails>;

export interface UniversalDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  /**
   * Max fee to pay for V2 transaction
   */
  maxFee?: BigNumberish; // ignored on estimate
  tip?: BigNumberish;
  paymasterData?: BigNumberish[];
  accountDeploymentData?: BigNumberish[];
  nonceDataAvailabilityMode?: EDataAvailabilityMode;
  feeDataAvailabilityMode?: EDataAvailabilityMode;
  version?: BigNumberish;
  resourceBounds?: ResourceBounds; // ignored on estimate
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

export type EstimateFeeAction =
  | {
      type: typeof TransactionType.INVOKE;
      payload: AllowArray<Call>;
    }
  | {
      type: typeof TransactionType.DECLARE;
      payload: DeclareContractPayload;
    }
  | {
      type: typeof TransactionType.DEPLOY_ACCOUNT;
      payload: DeployAccountContractPayload;
    }
  | {
      type: typeof TransactionType.DEPLOY;
      payload: UniversalDeployerContractPayload;
    };

export type StarkProfile = {
  name?: string;
  profilePicture?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  proofOfPersonhood?: boolean;
};
