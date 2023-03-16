import { Abi } from './abi';
import { EntryPointsByType } from './legacy';

/** SYSTEM TYPES */
export type CairoAssembly = {
  prime: string;
  compiler_version: string;
  bytecode: ByteCode;
  hints: Hints;
  entry_points_by_type: EntryPointsByType;
};

export type SieraContractClass = {
  sierra_program: ByteCode;
  sierra_program_debug_info: SieraProgramDebugInfo;
  contract_class_version: string;
  entry_points_by_type: SieraEntryPointsByType;
  abi: Abi;
};

/** COMPILED CONTRACT */
export type CompiledSiera = SieraContractClass;
export type CompiledSieraCasm = CairoAssembly;

/** SUBTYPES */
export type ByteCode = string[];
export type Hints = [number, string[]][];

export type SieraProgramDebugInfo = {
  type_names: [number, string][];
  libfunc_names: [number, string][];
  user_func_names: [number, string][];
};

export type SieraEntryPointsByType = {
  CONSTRUCTOR: SieraContractEntryPointFields[];
  EXTERNAL: SieraContractEntryPointFields[];
  L1_HANDLER: SieraContractEntryPointFields[];
};

export type SieraContractEntryPointFields = {
  selector: string;
  function_idx: number;
};
