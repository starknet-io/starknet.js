import { StarknetChainId } from '../../constants';
import { weierstrass } from '../../utils/ec';
import type { BigNumberish } from '../../utils/num';
import { CompiledContract, CompiledSierraCasm, ContractClass } from './contract';

export type WeierstrassSignatureType = weierstrass.SignatureType;
export type ArraySignatureType = string[];
export type Signature = ArraySignatureType | WeierstrassSignatureType;

export type RawCalldata = BigNumberish[];
export type AllowArray<T> = T | T[];
export type RawArgs =
  | {
      [inputName: string]:
        | BigNumberish
        | BigNumberish[]
        | { type: 'struct'; [k: string]: BigNumberish };
    }
  | BigNumberish[];

export type UniversalDeployerContractPayload = {
  classHash: BigNumberish;
  salt?: string;
  unique?: boolean;
  constructorCalldata?: RawArgs;
};

export type DeployContractPayload = {
  contract: CompiledContract | string;
  constructorCalldata?: RawCalldata;
  addressSalt?: string;
};

export type DeployAccountContractPayload = {
  classHash: string;
  constructorCalldata?: RawCalldata;
  addressSalt?: BigNumberish;
  contractAddress?: string;
};

export type DeployAccountContractTransaction = Omit<
  DeployAccountContractPayload,
  'contractAddress'
> & {
  signature?: Signature;
};

export type DeclareContractPayload = {
  contract: CompiledContract | string;
  classHash?: string;
  casm?: CompiledSierraCasm;
  compiledClassHash?: string;
};

export type CompleteDeclareContractPayload = {
  contract: CompiledContract | string;
  classHash: string;
  casm?: CompiledSierraCasm;
  compiledClassHash?: string;
};

export type DeclareAndDeployContractPayload = Omit<UniversalDeployerContractPayload, 'classHash'> &
  DeclareContractPayload;

export type DeclareContractTransaction = {
  contractDefinition: ContractClass;
  senderAddress: string;
  signature?: Signature;
  compiledClassHash?: string;
};

export type CallDetails = {
  contractAddress: string;
  calldata?: RawCalldata;
};

export type Invocation = CallDetails & { signature?: Signature };

export type Call = CallDetails & { entrypoint: string };

export type CairoVersion = '0' | '1';

export type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
  cairoVersion?: CairoVersion;
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

export type InvocationsDetailsWithNonce = InvocationsDetails & {
  nonce: BigNumberish;
};

export enum TransactionStatus {
  NOT_RECEIVED = 'NOT_RECEIVED',
  RECEIVED = 'RECEIVED',
  PENDING = 'PENDING',
  ACCEPTED_ON_L2 = 'ACCEPTED_ON_L2',
  ACCEPTED_ON_L1 = 'ACCEPTED_ON_L1',
  REJECTED = 'REJECTED',
}
export type TransactionBulk = Array<
  | ({ type: 'DECLARE' } & { payload: DeclareContractPayload })
  | ({ type: 'DEPLOY' } & {
      payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[];
    })
  | ({ type: 'DEPLOY_ACCOUNT' } & { payload: DeployAccountContractPayload })
  | ({ type: 'INVOKE_FUNCTION' } & { payload: AllowArray<Call> })
>;

export type InvocationBulk = Array<
  (
    | ({ type: 'DECLARE' } & DeclareContractTransaction)
    | ({ type: 'DEPLOY_ACCOUNT' } & DeployAccountContractTransaction)
    | ({ type: 'INVOKE_FUNCTION' } & Invocation)
  ) &
    InvocationsDetailsWithNonce & { blockIdentifier: BlockNumber | BigNumberish }
>;

export type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';

export enum TransactionType {
  INVOKE = 'INVOKE_FUNCTION',
  DECLARE = 'DECLARE',
  DEPLOY = 'DEPLOY',
  DEPLOY_ACCOUNT = 'DEPLOY_ACCOUNT',
}

export type Tupled = { element: any; type: string };
export type BlockTag = 'pending' | 'latest';
export type BlockNumber = BlockTag | null | number;

export type Struct = {
  type: 'struct';
  [k: string]: BigNumberish;
};
export type Args = {
  [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};
export type ParsedStruct = {
  [key: string]: BigNumberish | ParsedStruct;
};

export type waitForTransactionOptions = {
  retryInterval?: number;
  successStates?: Array<TransactionStatus>;
};

export interface CallStruct {
  to: string;
  selector: string;
  calldata: string[];
}

export * from './contract';
