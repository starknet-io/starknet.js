import { ValuesType } from '../../helpers/valuesType';
import { LegacyCompiledContract, LegacyContractClass } from './legacy';
import { CompiledSierra, SierraContractClass } from './sierra';

// Final types
/**
 * format produced after compressing compiled contract
 *
 * CompressedCompiledContract
 */
export type ContractClass = LegacyContractClass | SierraContractClass;

/**
 * format produced after compile .cairo to .json
 */
export type CompiledContract = LegacyCompiledContract | CompiledSierra;

/**
 * Compressed or decompressed Cairo0 or Cairo1 Contract
 */
export type CairoContract = ContractClass | CompiledContract;

// Basic elements
export const EntryPointType = {
  EXTERNAL: 'EXTERNAL',
  L1_HANDLER: 'L1_HANDLER',
  CONSTRUCTOR: 'CONSTRUCTOR',
} as const;

export type EntryPointType = ValuesType<typeof EntryPointType>;

export * from './abi';
export * from './legacy';
export * from './sierra';
