import { Abi } from './abi';

/** LEGACY CONTRACT */
export type LegacyContractClass = {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};

export type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
  program: Program;
};

/** SUBTYPES */
export type Builtins = string[];
export type CompressedProgram = string;

export type EntryPointsByType = {
  CONSTRUCTOR: ContractEntryPointFields[];
  EXTERNAL: ContractEntryPointFields[];
  L1_HANDLER: ContractEntryPointFields[];
};

export type ContractEntryPointFields = {
  selector: string;
  offset: string;
  builtins?: Builtins;
};

export interface Program extends Record<string, any> {
  builtins: string[];
  data: string[];
  // TODO: Add missing properties
}
