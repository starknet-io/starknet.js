import { weierstrass } from '../utils/ec';
import type { BigNumberish } from '../utils/num';

// Common Signature Type which needs to be imported from weierstrass
// and imported at many places
// This is because stark.ts doesn't export SignatureType
export type Signature = weierstrass.SignatureType;

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

// Cairo Contract Class
export type ContractClass = LegacyContractClass | SieraContractClass;

// TODO: Clean this mess with types

export type SieraContractClass = {
  sierra_program: ByteCode;
  sierra_program_debug_info: SieraProgramDebugInfo;
  contract_class_version: string;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};

export type SieraProgramDebugInfo = {
  type_names: [number, string][];
  libfunc_names: [number, string][];
  user_func_names: [number, string][];
};

export type LegacyContractClass = {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};

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
};

export type DeclareAndDeployContractPayload = Omit<UniversalDeployerContractPayload, 'classHash'> &
  DeclareContractPayload;

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

export type InvocationsDetailsWithNonce = InvocationsDetails & {
  nonce: BigNumberish;
  compiledClassHash?: string;
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

export type EntryPointType = 'EXTERNAL';
export type CompressedProgram = string;

export type AbiEntry = { name: string; type: 'felt' | 'felt*' | string };
export type Tupled = { element: any; type: string };

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

export type abiStructs = { [name: string]: StructAbi };

export type StructAbi = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type Abi = Array<FunctionAbi | EventAbi | StructAbi>;

type EventAbi = any;

export type Builtins = string[];

export type SieraContractEntryPointFields = {
  selector: string;
  function_idx: number;
};

export type ContractEntryPointFields = {
  selector: string;
  offset: string;
  builtins?: Builtins;
};

export type EntryPointsByType = {
  CONSTRUCTOR: ContractEntryPointFields[];
  EXTERNAL: ContractEntryPointFields[];
  L1_HANDLER: ContractEntryPointFields[];
};

export type SieraEntryPointsByType = {
  CONSTRUCTOR: SieraContractEntryPointFields[];
  EXTERNAL: SieraContractEntryPointFields[];
  L1_HANDLER: SieraContractEntryPointFields[];
};

export interface Program extends Record<string, any> {
  builtins: string[];
  data: string[];
  // TODO: Add missing properties
}
export type BlockTag = 'pending' | 'latest';
export type BlockNumber = BlockTag | null | number;

export type CompiledContract = LegacyCompiledContract | SieraContractClass;

export type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
  program: Program;
};

export type Hints = [number, string[]][];

export type CompiledSieraCasm = {
  prime: string;
  compiler_version: string;
  bytecode: string[];
  hints: Hints;
  entry_points_by_type: EntryPointsByType;
};

export type CompiledSiera = {
  sierra_program: string[];
  sierra_program_debug_info: any;
  contract_class_version: string;
  entry_points_by_type: SieraEntryPointsByType;
  abi: Abi;
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

export type waitForTransactionOptions = {
  retryInterval?: number;
  successStates?: Array<TransactionStatus>;
};

export type CairoAssembly = {
  prime: string;
  compiler_version: string;
  bytecode: ByteCode;
  hints: any[];
  entry_points_by_type: EntryPointsByType;
};

export type ByteCode = string[];
