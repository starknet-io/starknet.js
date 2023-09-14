import { ContractClassResponse } from '../types';
import {
  CairoContract,
  CompiledSierra,
  LegacyCompiledContract,
  LegacyContractClass,
  SierraContractClass,
} from '../types/lib/contract/index';
import { CompleteDeclareContractPayload, DeclareContractPayload } from '../types/lib/index';
import { computeCompiledClassHash, computeContractClassHash } from './hash';
import { parse } from './json';
import { decompressProgram } from './stark';

export function isSierra(
  contract: CairoContract | string
): contract is SierraContractClass | CompiledSierra {
  const compiledContract = typeof contract === 'string' ? parse(contract) : contract;
  return 'sierra_program' in compiledContract;
}

export function extractContractHashes(
  payload: DeclareContractPayload
): CompleteDeclareContractPayload {
  const response = { ...payload } as CompleteDeclareContractPayload;

  if (isSierra(payload.contract)) {
    if (!payload.compiledClassHash && payload.casm) {
      response.compiledClassHash = computeCompiledClassHash(payload.casm);
    }
    if (!response.compiledClassHash)
      throw new Error(
        'Extract compiledClassHash failed, provide (CairoAssembly).casm file or compiledClassHash'
      );
  }

  response.classHash = payload.classHash ?? computeContractClassHash(payload.contract);
  if (!response.classHash)
    throw new Error('Extract classHash failed, provide (CompiledContract).json file or classHash');

  return response;
}

/**
 * Helper to redeclare response Cairo0 contract
 */
export function contractClassResponseToLegacyCompiledContract(ccr: ContractClassResponse) {
  if (isSierra(ccr)) {
    throw Error('ContractClassResponse need to be LegacyContractClass (cairo0 response class)');
  }
  const contract = ccr as LegacyContractClass;
  return { ...contract, program: decompressProgram(contract.program) } as LegacyCompiledContract;
}
