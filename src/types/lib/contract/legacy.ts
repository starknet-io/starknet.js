import { Abi } from './abi';

/** LEGACY CONTRACT */
/**
 * format produced after compressing 'program' property
 */
export type LegacyContractClass = {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};

/**
 * format produced after compiling .cairo to .json
 */
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
  offset: string | number;
  builtins?: Builtins;
};

export interface Program extends Record<string, any> {
  builtins: string[];
  data: string[];
  attributes?: Array<{
    accessible_scopes?: string[];
    end_pc?: number;
    flow_tracking_data?: {
      ap_tracking?: {
        group?: number;
        offset?: number;
      };
      reference_ids?: Record<string, any>;
    };
    name?: string;
    start_pc?: number;
    value?: string | number;
  }>;
  compiler_version?: string;
  main_scope?: string;
  identifiers?: Record<string, any>;
  reference_manager?: Record<string, any>;
  debug_info?: Record<string, any>;
}
