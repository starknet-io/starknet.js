import { Abi } from './abi';
import { EntryPointsByType } from './legacy';

/** SYSTEM TYPES */
export type CairoAssembly = {
  prime: string;
  compiler_version: string;
  bytecode: ByteCode;
  hints: any[];
  pythonic_hints: PythonicHints;
  entry_points_by_type: EntryPointsByType;
};

export type SierraContractClass = {
  sierra_program: ByteCode;
  sierra_program_debug_info: SierraProgramDebugInfo;
  contract_class_version: string;
  entry_points_by_type: SierraEntryPointsByType;
  abi: Abi;
};

/** COMPILED CONTRACT */
export type CompiledSierra = SierraContractClass;
export type CompiledSierraCasm = CairoAssembly;

/** SUBTYPES */
export type ByteCode = string[];
export type PythonicHints = [number, string[]][];

export type SierraProgramDebugInfo = {
  type_names: [number, string][];
  libfunc_names: [number, string][];
  user_func_names: [number, string][];
};

export type SierraEntryPointsByType = {
  CONSTRUCTOR: SierraContractEntryPointFields[];
  EXTERNAL: SierraContractEntryPointFields[];
  L1_HANDLER: SierraContractEntryPointFields[];
};

export type SierraContractEntryPointFields = {
  selector: string;
  function_idx: number;
};
