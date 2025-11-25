/**
 * Class Hash Exports
 */
import {
  CompiledContract,
  CompiledSierra,
  CompiledSierraCasm,
  LegacyCompiledContract,
} from '../../../types';
import { parse } from '../../json';
import { isString } from '../../typed';
import { computeLegacyContractClassHash } from './pedersen';
import { computeCompiledClassHashPoseidon, computeSierraContractClassHash } from './poseidon';
import { computeCompiledClassHashBlake } from './blake';
import { compareVersions } from '../../resolve';
import { SN_VERSION_IMPLEMENTING_BLAKE } from '../../../global/constants';

export * from './pedersen';
export * from './poseidon';
export * from './blake';
export * from './util';
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

export function computeCompiledClassHash(
  casm: CompiledSierraCasm,
  /**
   * Used to determine which hashing algorithm to use
   */
  starknetVersion: string = SN_VERSION_IMPLEMENTING_BLAKE
): string {
  if (compareVersions(starknetVersion, SN_VERSION_IMPLEMENTING_BLAKE) >= 0) {
    return computeCompiledClassHashBlake(casm);
  }
  return computeCompiledClassHashPoseidon(casm);
}
