import { parse } from 'json-bigint';

import { CairoContract } from '../types/lib/contract/index';
import { CompleteDeclareContractPayload, DeclareContractPayload } from '../types/lib/index';
import { computeCompiledClassHash, computeContractClassHash } from './hash';

export function isSierra(contract: CairoContract | string) {
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
