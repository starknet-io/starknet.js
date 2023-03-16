import { LegacyCompiledContract, LegacyContractClass } from './legacy';
import { CompiledSiera, SieraContractClass } from './siera';

// Final types
export type ContractClass = LegacyContractClass | SieraContractClass;
export type CompiledContract = LegacyCompiledContract | CompiledSiera;

// Basic elements
export enum EntryPointType {
  EXTERNAL = 'EXTERNAL',
  L1_HANDLER = 'L1_HANDLER',
  CONSTRUCTOR = 'CONSTRUCTOR',
}

export * from './abi';
export * from './legacy';
export * from './siera';
