import {
  CompiledContract,
  CompiledSierra,
  ContractClass,
  LegacyContractClass,
  SierraContractClass,
} from '../types';
import { isSierra } from './contract';
import { formatSpaces } from './hash';
import { parse, stringify } from './json';
import { compressProgram } from './stark';

/**
 * Helper - Async Sleep for 'delay' time
 */
export function wait(delay: number) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

/**
 * Create Sierra Contract Class from a given Compiled Sierra
 *
 * CompiledSierra -> SierraContractClass
 */
export function createSierraContractClass(contract: CompiledSierra): SierraContractClass {
  const result = { ...contract } as any;
  delete result.sierra_program_debug_info;
  result.abi = formatSpaces(stringify(contract.abi));
  result.sierra_program = formatSpaces(stringify(contract.sierra_program));
  result.sierra_program = compressProgram(result.sierra_program);
  return result;
}

/**
 * Create Contract Class from a given CompiledContract or string
 *
 * (CompiledContract or string) -> ContractClass
 */
export function parseContract(contract: CompiledContract | string): ContractClass {
  const parsedContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;

  if (!isSierra(contract)) {
    return {
      ...parsedContract,
      ...('program' in parsedContract && { program: compressProgram(parsedContract.program) }),
    } as LegacyContractClass;
  }

  return createSierraContractClass(parsedContract as CompiledSierra);
}
