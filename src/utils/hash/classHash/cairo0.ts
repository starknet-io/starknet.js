// Cairo 0 specific: when Cairo 0 support is dropped, remove this file.
/**
 * Cairo 0 class hash computation, using the Pedersen hash
 */

import { API_VERSION } from '../../../global/constants';
import { LegacyCompiledContract } from '../../../types';
import { starkCurve } from '../../ec';
import { addHexPrefix, utf8ToBigInt, utf8ToUint8Array } from '../../encode';
import { parse, stringify } from '../../json';
import { toHex } from '../../num';
import { isString } from '../../typed';
import { computeHashOnElements } from '../pedersenCore';
import { formatSpaces } from './util';

/**
 * JSON replacer function that skips null values and empty arrays for specific keys
 * Used in legacy contract class serialization
 * @example
 * ```typescript
 * const input = { a: null, attributes: [], debug_info: { x: 1 }, b: 2 };
 * const result = JSON.stringify(input, hash.nullSkipReplacer);
 * // result = '{"debug_info":null,"b":2}'
 * ```
 */
export function nullSkipReplacer(key: string, value: any) {
  if (key === 'attributes' || key === 'accessible_scopes') {
    return Array.isArray(value) && value.length === 0 ? undefined : value;
  }

  if (key === 'debug_info') {
    return null;
  }

  return value === null ? undefined : value;
}

/**
 * Compute hinted class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract} compiledContract
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeHintedClassHash(compiledCairo0);
 * // result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
 * ``` */
export function computeHintedClassHash(compiledContract: LegacyCompiledContract): string {
  const { abi, program } = compiledContract;
  const contractClass = { abi, program };
  const serializedJson = formatSpaces(stringify(contractClass, nullSkipReplacer));
  return addHexPrefix(starkCurve.keccak(utf8ToUint8Array(serializedJson)).toString(16));
}

/**
 * Computes the class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract | string} contract legacy compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeLegacyContractClassHash(compiledCairo0);
 * // result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
 * ```
 */
export function computeLegacyContractClassHash(contract: LegacyCompiledContract | string): string {
  const compiledContract = isString(contract)
    ? (parse(contract) as LegacyCompiledContract)
    : contract;

  const apiVersion = toHex(API_VERSION);

  const externalEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.EXTERNAL.flatMap((e) => [e.selector, e.offset])
  );

  const l1HandlerEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.L1_HANDLER.flatMap((e) => [e.selector, e.offset])
  );

  const constructorEntryPointHash = computeHashOnElements(
    compiledContract.entry_points_by_type.CONSTRUCTOR.flatMap((e) => [e.selector, e.offset])
  );

  const builtinsHash = computeHashOnElements(
    compiledContract.program.builtins.map((s) => utf8ToBigInt(s))
  );

  const hintedClassHash = computeHintedClassHash(compiledContract);

  const dataHash = computeHashOnElements(compiledContract.program.data);

  return computeHashOnElements([
    apiVersion,
    externalEntryPointsHash,
    l1HandlerEntryPointsHash,
    constructorEntryPointHash,
    builtinsHash,
    hintedClassHash,
    dataHash,
  ]);
}
