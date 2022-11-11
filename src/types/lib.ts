import type { ec as EC } from 'elliptic';

import type { BigNumberish } from '../utils/number';
import { RPC } from './api/rpc';

export type KeyPair = EC.KeyPair;
export type Signature = string[];
export type RawCalldata = BigNumberish[];
export type AllowArray<T> = T | T[];
export type RawArgs =
  | {
      [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
    }
  | string[];

export interface ContractClass {
  program: CompressedProgram;
  entry_points_by_type: RPC.ContractClass['entry_points_by_type'];
  abi?: Abi;
}

export type UniversalDeployerContractPayload = {
  classHash: BigNumberish;
  salt: string;
  unique: boolean;
  constructorCalldata?: RawArgs;
  isDevnet?: boolean;
};

export type DeployContractPayload = {
  contract: CompiledContract | string;
  constructorCalldata?: RawCalldata;
  addressSalt?: string;
};

export type DeployAccountContractPayload = {
  classHash: BigNumberish;
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
  classHash: BigNumberish; // Once the classHash is included in CompiledContract, this can be removed
};

export type DeclareContractTransaction = {
  contractDefinition: ContractClass;
  senderAddress: string;
  signature?: Signature;
};

export type CallDetails = {
  contractAddress: string;
  calldata?: RawCalldata;
};

export type Invocation = CallDetails & { signature?: Signature };

export type Call = CallDetails & { entrypoint: string };

export type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
};

export type InvocationsDetailsWithNonce = InvocationsDetails & { nonce: BigNumberish };

export type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';
export type TransactionStatus = 'TRANSACTION_RECEIVED';
export type TransactionType = 'DECLARE' | 'DEPLOY' | 'INVOKE_FUNCTION' | 'DEPLOY_ACCOUNT';
export type EntryPointType = 'EXTERNAL';
export type CompressedProgram = string;

export type AbiEntry = { name: string; type: 'felt' | 'felt*' | string };

export type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  type: FunctionAbiType;
};

enum FunctionAbiType {
  'function',
  'l1_handler',
  'constructor',
}

export type StructAbi = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type Abi = Array<FunctionAbi | EventAbi | StructAbi>;

type EventAbi = any;

export type EntryPointsByType = object;
export type Program = Record<any, any>;
export type BlockTag = 'pending' | 'latest';
export type BlockNumber = BlockTag | null | number;

export type CompiledContract = {
  abi: Abi;
  entry_points_by_type: EntryPointsByType;
  program: Program;
};

export type CompressedCompiledContract = Omit<CompiledContract, 'program'> & {
  program: CompressedProgram;
};

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
