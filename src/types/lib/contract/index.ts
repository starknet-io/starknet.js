import { LegacyCompiledContract, LegacyContractClass } from './legacy';
import { CompiledSierra, SierraContractClass } from './sierra';

// Final types
export type ContractClass = LegacyContractClass | SierraContractClass;
export type CompiledContract = LegacyCompiledContract | CompiledSierra;
export type CairoContract = ContractClass | CompiledContract;

// Basic elements
export enum EntryPointType {
  EXTERNAL = 'EXTERNAL',
  L1_HANDLER = 'L1_HANDLER',
  CONSTRUCTOR = 'CONSTRUCTOR',
}

export * from './abi';
export * from './legacy';
export * from './sierra';
