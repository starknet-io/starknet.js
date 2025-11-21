/**
 * Shared utilities for class hash computation
 */
import { Builtins, ContractEntryPointFields } from '../../../types';
import { encodeShortString } from '../../shortString';

/**
 * Compiled class version constant used in Cairo 1 compiled class hashing
 */
export const COMPILED_CLASS_VERSION = 'COMPILED_CLASS_V1';

/**
 * Format json-string without spaces to conform starknet json-string
 * @param {string} json json-string without spaces
 * @returns {string} json-string with additional spaces after `:` and `,`
 * @example
 * ```typescript
 * const result = hash.formatSpaces("{'onchain':true,'isStarknet':true}");
 * // result = "{'onchain': true, 'isStarknet': true}"
 * ```
 */
export function formatSpaces(json: string): string {
  let insideQuotes = false;
  const newString = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const char of json) {
    if (char === '"' && (newString.length > 0 && newString.slice(-1)[0] === '\\') === false) {
      insideQuotes = !insideQuotes;
    }
    if (insideQuotes) {
      newString.push(char);
    } else {
      // eslint-disable-next-line no-nested-ternary
      newString.push(char === ':' ? ': ' : char === ',' ? ', ' : char);
    }
  }
  return newString.join('');
}

/**
 * JSON replacer function that skips null values and empty arrays for specific keys
 * Used in legacy contract class serialization
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
 * Convert builtins array to encoded BigInt array
 * Common pattern used in both Poseidon and Blake2s hashing
 */
export function encodeBuiltins(builtins: Builtins): bigint[] {
  return builtins.map((it: any) => BigInt(encodeShortString(it)));
}

/**
 * Extract entry point data for hashing
 * Returns flattened array of [selector, offset, ...builtins] for each entry point
 */
export function flattenEntryPointData(
  data: ContractEntryPointFields[],
  encodedBuiltinsArray: bigint[][]
): bigint[] {
  return data.flatMap((it: any, index: number) => [
    BigInt(it.selector),
    BigInt(it.offset),
    ...encodedBuiltinsArray[index],
  ]);
}
