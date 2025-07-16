import type { EDataAvailabilityMode, ETransactionVersion3, PAYMASTER_API } from '../../types/api';
import type {
  BigNumberish,
  BlockIdentifier,
  CairoVersion,
  V3TransactionDetails,
} from '../../types/lib';
import type {
  DeclareTransactionReceiptResponse,
  EstimateFeeResponseOverhead,
  ProviderOptions,
} from '../../provider/types/index.type';
import type { ResourceBoundsBN } from '../../provider/types/spec.type';
import type {
  FeeMode,
  PaymasterOptions,
  PaymasterTimeBounds,
} from '../../paymaster/types/index.type';
import type { SignerInterface } from '../../signer';
import type { SupportedTransactionVersion } from '../../global/constants';
import type { PaymasterInterface } from '../../paymaster';
import type { ProviderInterface } from '../../provider/interface';

export type DeployerDefinition = {
  /** Address of a custom account deployer contract */
  address: BigNumberish;
  /** Deployer function name to deploy a contract */
  entryPoint: string;
};

/**
 * Configuration options for creating an Account instance
 */
export type AccountOptions = {
  /** Provider instance or configuration for blockchain interaction */
  provider: ProviderOptions | ProviderInterface;
  /** Account address on the Starknet network */
  address: string;
  /** Private key or Signer Class instance for signing transactions */
  signer: Uint8Array | string | SignerInterface;
  /** Cairo version to use for this account (optional, auto-detected if not provided) */
  cairoVersion?: CairoVersion;
  /** Transaction version to use for sending transactions (optional) */
  transactionVersion?: SupportedTransactionVersion;
  /** Paymaster configuration for sponsored transactions (optional) */
  paymaster?: PaymasterOptions | PaymasterInterface;
  /** Use of a custom account deployer contract  (optional) */
  customDeployer?: DeployerDefinition;
};

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

export type DeployContractDCResponse = {
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

export type DeclareDeployDCResponse = {
  declare: {
    class_hash: BigNumberish;
  } & Partial<DeclareTransactionReceiptResponse>;
  deploy: DeployContractDCResponse;
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
