/**
 * Class Hash Exports
 */
import { CompiledContract, CompiledSierra, LegacyCompiledContract } from '../../../types';
import { parse } from '../../json';
import { isString } from '../../typed';
import { computeLegacyContractClassHash } from './pedersen';
import { computeSierraContractClassHash } from './poseidon';

export * from './pedersen';
export * from './poseidon';
export * from './blake';
export * from './util';

// TODO: Add check to use Blake2s hash for Cairo 1 contracts if starknet version is >= 0.14.1
/**
 * Compute ClassHash (sierra or legacy) based on provided contract
 * @param {CompiledContract | string} contract Cairo 1 contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
export function computeContractClassHash(contract: CompiledContract | string): string {
  const compiledContract = isString(contract) ? parse(contract) : contract;

  if ('sierra_program' in compiledContract) {
    return computeSierraContractClassHash(compiledContract as CompiledSierra);
  }

  return computeLegacyContractClassHash(compiledContract as LegacyCompiledContract);
}
