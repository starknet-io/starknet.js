import { Abi } from './abi';
import { EntryPointsByType } from './sierra';

/** LEGACY CONTRACT */
// Cairo 0 specific: when Cairo 0 support is dropped, keep this type only if Starknet still
// returns Cairo 0 classes; otherwise remove it.
/**
 * format produced after compressing 'program' property
 */
export type LegacyContractClass = {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};

// Cairo 0 specific: when Cairo 0 support is dropped, remove this type.
/**
 * format produced after compiling .cairo to .json
 */
export type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
  program: Program;
};

/** SUBTYPES */
export type CompressedProgram = string;
// Cairo 0 specific: when Cairo 0 support is dropped, remove this type. Only Program uses it.
export type Hint = Record<string, unknown>;

// Cairo 0 specific: when Cairo 0 support is dropped, remove this type.
// It is the program of a Cairo 0 compiled contract.
export interface Program {
  builtins: string[];
  data: string[];
  hints: Record<string, Hint[]>;
  prime: string;
  attributes?: Array<{
    accessible_scopes?: string[];
    end_pc?: number;
    flow_tracking_data?: {
      ap_tracking?: {
        group?: number;
        offset?: number;
      };
      reference_ids?: Record<string, number>;
    };
    name?: string;
    start_pc?: number;
    value?: string | number;
  }>;
  compiler_version?: string;
  main_scope?: string;
  identifiers?: Record<
    string,
    | {
        destination: string;
        type: 'alias';
      }
    | {
        decorators: string[];
        pc: number;
        type: 'function';
        implicit_args?: {
          full_name: string;
          members: Record<
            string,
            {
              cairo_type: string;
              offset: number;
            }
          >;
          size: number;
          type: 'struct';
        };
        explicit_args?: {
          full_name: string;
          members: Record<
            string,
            {
              cairo_type: string;
              offset: number;
            }
          >;
          size: number;
          type: 'struct';
        };
        return_type?: {
          cairo_type: string;
          type: 'type_definition';
        };
      }
    | {
        full_name: string;
        members:
          | Record<
              string,
              {
                cairo_type: string;
                offset: number;
              }
            >
          | Record<string, never>;
        size: number;
        type: 'struct';
      }
    | {
        cairo_type: string;
        type: 'type_definition';
      }
    | {
        type: 'namespace';
      }
    | {
        type: 'const';
        value: string | number;
      }
    | {
        pc: number;
        type: 'label';
      }
    | {
        cairo_type: string;
        full_name: string;
        references: Array<{
          ap_tracking_data: {
            group: number;
            offset: number;
          };
          pc: number;
          value: string;
        }>;
        type: 'reference';
      }
  >;
  reference_manager?: Record<
    string,
    {
      references: unknown[];
    }
  >;
  debug_info?: Record<
    string,
    {
      file_contents?: Record<string, string>;
      instruction_locations?: Record<string, unknown[]>;
    }
  >;
}
