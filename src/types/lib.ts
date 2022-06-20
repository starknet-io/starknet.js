import type { ec as EC } from 'elliptic';

import type { BigNumberish } from '../utils/number';

export type KeyPair = EC.KeyPair;
export type Signature = string[];
export type RawCalldata = BigNumberish[];

export type DeployContractPayload = {
  contract: CompiledContract | string;
  constructorCalldata?: RawCalldata;
  addressSalt?: BigNumberish;
};

export type DeclareContractPayload = {
  contract: CompiledContract | string;
};

export type Invocation = {
  contractAddress: string;
  entrypoint: string;
  calldata?: RawCalldata;
  signature?: Signature;
};

export type Call = Omit<Invocation, 'signature'>;

export type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
};

export type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';
export type TransactionStatus = 'TRANSACTION_RECEIVED';
export type Type = 'DECLARE' | 'DEPLOY' | 'INVOKE_FUNCTION';
export type EntryPointType = 'EXTERNAL';
export type CompressedProgram = string;

export type AbiEntry = { name: string; type: 'felt' | 'felt*' | string };

export type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  type: 'function' | 'constructor';
};

export type StructAbi = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type Abi = Array<FunctionAbi | StructAbi>;

export type EntryPointsByType = object;
export type Program = Record<any, any>;
export type BlockNumber = 'pending' | 'latest' | null | number;

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
