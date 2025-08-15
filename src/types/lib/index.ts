import { StarknetChainId } from '../../global/constants';
import { weierstrass } from '../../utils/ec';
import { EDataAvailabilityMode, ETransactionType, SUBSCRIPTION_BLOCK_ID } from '../api';
import { CairoEnum } from '../cairoEnum';
import { Abi, AbiEntry, CompiledContract, CompiledSierraCasm, ContractClass } from './contract';
import {
  BlockTag,
  ResourceBoundsBN,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
} from '../../provider/types/spec.type';

export type WeierstrassSignatureType = weierstrass.SignatureType;
export type ArraySignatureType = string[];
export type Signature = ArraySignatureType | WeierstrassSignatureType;

export type BigNumberish = string | number | bigint;

export type ByteArray = {
  data: BigNumberish[];
  pending_word: BigNumberish;
  pending_word_len: BigNumberish;
};

/**
 * Compiled calldata ready to be sent
 *
 * decimal-string array
 */
export type Calldata = string[] & { readonly __compiled__?: true };

/**
 * "Abi Entry type"
 * @example
 * 'core::bytes_31::bytes31'
 * 'core::bool'
 * 'core::felt'
 * 'core::uint256'
 * 'core::uint512'
 */
export type AbiEntryType = AbiEntry['type'];

/**
 * Represents an integer in the range [0, 2^256)
 */
export interface Uint256 {
  // The low 128 bits of the value
  low: BigNumberish;
  // The high 128 bits of the value
  high: BigNumberish;
}

/**
 * Represents an integer in the range [0, 2^256)
 */
export interface Uint512 {
  // The lowest 128 bits of the value
  limb0: BigNumberish;
  limb1: BigNumberish;
  limb2: BigNumberish;
  // The higher 128 bits of the value
  limb3: BigNumberish;
}

/**
 * BigNumberish array
 *
 * use CallData.compile() to convert to Calldata
 */
export type RawCalldata = BigNumberish[];

/**
 * Hexadecimal-string array
 */
export type HexCalldata = string[];

export type AllowArray<T> = T | T[];

export type OptionalPayload<T> = { payload: T } | T;

export type RawArgs = RawArgsObject | RawArgsArray;

export type RawArgsObject = {
  [inputName: string]: MultiType | MultiType[] | RawArgs;
};

export type RawArgsArray = Array<MultiType | MultiType[] | RawArgs>;

export type MultiType = BigNumberish | Uint256 | object | boolean | CairoEnum;

export type UniversalDeployerContractPayload = {
  classHash: BigNumberish;
  salt?: string;
  unique?: boolean;
  constructorCalldata?: RawArgs;
  abi?: Abi; // TODO: check chain of usage in Account
};

export type DeployAccountContractPayload = {
  classHash: string;
  constructorCalldata?: RawArgs;
  addressSalt?: BigNumberish;
  contractAddress?: string;
};

export type DeployAccountContractTransaction = Omit<
  DeployAccountContractPayload,
  'contractAddress'
> & {
  signature?: Signature;
};

/**
 * Base payload for declaring a contract on Starknet
 */
type BaseDeclareContractPayload = {
  /** The compiled contract (JSON object) or path to compiled contract file */
  contract: CompiledContract | string; // TODO: check if description is ok
  /**
   * Class hash of the contract. Optional optimization - if not provided,
   * it will be computed from the contract
   */
  classHash?: string;
};

/**
 * Declare contract with CASM code
 */
type DeclareWithCasm = BaseDeclareContractPayload & {
  /** Compiled Sierra Assembly (CASM) code */
  casm: CompiledSierraCasm;
  /** Hash of the compiled CASM. Optional - will be computed from casm if not provided */
  compiledClassHash?: string;
};

/**
 * Declare contract with pre-computed compiled class hash (optimization)
 */
type DeclareWithCompiledClassHash = BaseDeclareContractPayload & {
  /** Hash of the compiled CASM */
  compiledClassHash: string;
  /** CASM is not needed when compiledClassHash is provided */
  casm?: never;
};

/**
 * Payload for declaring a contract on Starknet.
 * Either provide CASM code, or a pre-computed compiledClassHash for optimization.
 */
export type DeclareContractPayload = DeclareWithCasm | DeclareWithCompiledClassHash;

/**
 * DeclareContractPayload with classHash or contract defined
 */
export type ContractClassIdentifier = DeclareContractPayload | { classHash: string };

export type CompleteDeclareContractPayload = {
  contract: CompiledContract | string;
  classHash: string;
  casm?: CompiledSierraCasm;
  compiledClassHash: string;
};

export type DeclareAndDeployContractPayload = Omit<UniversalDeployerContractPayload, 'classHash'> &
  DeclareContractPayload;

export type DeclareContractTransaction = {
  contract: ContractClass;
  senderAddress: string;
  signature?: Signature;
  compiledClassHash?: string;
};

export type CallDetails = {
  contractAddress: string;
  calldata?: RawArgs | Calldata;
};

export type Invocation = CallDetails & { signature?: Signature };

export type Call = CallDetails & { entrypoint: string };

export type CairoVersion = '0' | '1' | undefined;
export type CompilerVersion = '0' | '1' | '2' | undefined;

export type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
} & Partial<V3TransactionDetails>;

export type V3TransactionDetails = {
  nonce: BigNumberish;
  version: BigNumberish;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDataAvailabilityMode;
  feeDataAvailabilityMode: EDataAvailabilityMode;
};

/**
 * Contain all additional details params
 */
export type Details = {
  nonce: BigNumberish;
  maxFee: BigNumberish;
  version: BigNumberish;
  chainId: StarknetChainId;
};

export type InvocationsDetailsWithNonce =
  | (InvocationsDetails & { nonce: BigNumberish })
  | V3TransactionDetails;

/**
 * new statuses are defined by props: finality_status and execution_status
 * to be #deprecated
 */
/* export const TransactionStatus = {
  NOT_RECEIVED: 'NOT_RECEIVED',
  RECEIVED: 'RECEIVED',
  ACCEPTED_ON_L2: 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1: 'ACCEPTED_ON_L1',
  REJECTED: 'REJECTED',
  REVERTED: 'REVERTED',
} as const;

export type TransactionStatus = ValuesType<typeof TransactionStatus>; */

/* export const TransactionFinalityStatus = {
  NOT_RECEIVED: 'NOT_RECEIVED',
  RECEIVED: 'RECEIVED',
  ACCEPTED_ON_L2: 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1: 'ACCEPTED_ON_L1',
} as const;

export type TransactionFinalityStatus = ValuesType<typeof TransactionFinalityStatus>;

export const TransactionExecutionStatus = {
  REJECTED: 'REJECTED',
  REVERTED: 'REVERTED',
  SUCCEEDED: 'SUCCEEDED',
} as const;

export type TransactionExecutionStatus = ValuesType<typeof TransactionExecutionStatus>; */

/* export const BlockStatus = {
  PENDING: 'PENDING',
  ACCEPTED_ON_L1: 'ACCEPTED_ON_L1',
  ACCEPTED_ON_L2: 'ACCEPTED_ON_L2',
  REJECTED: 'REJECTED',
} as const;

export type BlockStatus = ValuesType<typeof BlockStatus>; */

/* export const BlockTag = RPCSPEC09.EBlockTag;

export type BlockTag = ValuesType<typeof BlockTag>; */

export type BlockNumber = BlockTag | null | number;

/**
 * hex string and BigInt are detected as block hashes
 *
 * decimal string and number are detected as block numbers
 *
 * text string are detected as block tag
 *
 * null return 'pending' block tag
 */
export type BlockIdentifier = BlockNumber | BigNumberish;
type SubscriptionBlockTag = Extract<SUBSCRIPTION_BLOCK_ID, string>;
export type SubscriptionBlockIdentifier = SubscriptionBlockTag | (string & {}) | number | bigint;

/**
 * items used by AccountInvocations
 */
export type AccountInvocationItem = (
  | ({ type: typeof ETransactionType.DECLARE } & DeclareContractTransaction)
  | ({ type: typeof ETransactionType.DEPLOY_ACCOUNT } & DeployAccountContractTransaction)
  | ({ type: typeof ETransactionType.INVOKE } & Invocation)
) &
  InvocationsDetailsWithNonce;

/**
 * Complete invocations array with account details (internal type from account -> provider)
 */
export type AccountInvocations = AccountInvocationItem[];

/**
 * Invocations array user provide to bulk method (simulate)
 */
export type Invocations = Array<
  | ({ type: typeof ETransactionType.DECLARE } & OptionalPayload<DeclareContractPayload>)
  | ({ type: typeof ETransactionType.DEPLOY } & OptionalPayload<
      AllowArray<UniversalDeployerContractPayload>
    >)
  | ({
      type: typeof ETransactionType.DEPLOY_ACCOUNT;
    } & OptionalPayload<DeployAccountContractPayload>)
  | ({ type: typeof ETransactionType.INVOKE } & OptionalPayload<AllowArray<Call>>)
>;

export type Tupled = { element: any; type: string };

export type Args = {
  [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};
export type ParsedStruct = {
  [key: string]: BigNumberish | BigNumberish[] | ParsedStruct | Uint256;
};

export type waitForTransactionOptions = {
  retryInterval?: number;
  successStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
  errorStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
};

export type getSimulateTransactionOptions = {
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
  skipExecute?: boolean;
  skipFeeCharge?: boolean;
};

export type getContractVersionOptions = {
  blockIdentifier?: BlockIdentifier;
  compiler?: boolean;
};

export type getEstimateFeeBulkOptions = {
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
};

/**
 * Represent Contract version
 */
export type ContractVersion = {
  /** version of the cairo language */
  cairo: CairoVersion;
  /** version of the cairo compiler used to compile the contract */
  compiler: CompilerVersion;
};

export * from './contract';
