import { keccak } from '@scure/starknet';

import { MASK_250 } from '../constants';
import { BigNumberish } from '../types';
import { addHexPrefix, removeHexPrefix, utf8ToArray } from './encode';
import { hexToBytes, isHex, isStringWholeNumber, toHex, toHexString } from './num';

/**
 * Calculate hex-string keccak hash for a given BigNumberish
 * @param value The value you want to get the keccak hash from.
 * @returns format: hex-string keccak hash
 * @example
 * ```typescript
 * const hash: string = keccakBn(123456789);
 * // hash = "0x6c1eebcad9e5b7e0f13855f5e4b56e85ad24544b"
 * ```
 */
export function keccakBn(value: BigNumberish): string {
  const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
  const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
  return addHexPrefix(keccak(hexToBytes(addHexPrefix(evenHex))).toString(16));
}

/**
 * Calculate hex-string keccak hash for a given string
 * @param str The value you want to get the keccak hash from.
 * String -> hex-string keccak hash
 * @returns format: hex-string
 * @example
 * ```typescript
 * const hash: string = keccakHex("Hello, world!");
 * // hash = "0x3ad6fcbda8fc87e9fb42f7f0cd36d27da079ffafc6f0dcf36b6a6140e0f67c84"
 * ```
 */
function keccakHex(str: string): string {
  return addHexPrefix(keccak(utf8ToArray(str)).toString(16));
}

/**
 * Calculate bigint keccak hash for a given string
 *
 * String -> bigint keccak hash
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param str the value you want to get the keccak hash from
 * @returns starknet keccak hash as BigInt
 * @example
 * ```typescript
 * const hash: bigint = starknetKeccak("Hello, world!");
 * // hash = "38418923196344919485056939258679159916n"
 */
export function starknetKeccak(str: string): bigint {
  const hash = BigInt(keccakHex(str));
  // eslint-disable-next-line no-bitwise
  return hash & MASK_250;
}

/**
 * Calculate hex-string selector for a given abi-function-name
 *
 * Abi-function-name -> hex-string selector
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName ascii-string of 'abi function name'.
 * @returns format: hex-string; selector for 'abi function name'.
 * @example
 * ```typescript
 * const selector: string = getSelectorFromName("myFunction");
 * // selector = "0x7e44baf0"
 * ```
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which is not allowed in the starknet api
  return toHex(starknetKeccak(funcName));
}

/**
 * Calculate hex-string selector from abi-function-name, decimal string or hex string
 *
 * ('abi-function-name' or dec-string or hex-string) -> hex-string selector
 *
 * @param value hex-string | dec-string | ascii-string
 * @returns format: hex-string
 * @example
 * ```typescript
 * const selector: string = getSelector("myFunction");
 * // selector = "0x7e44bafo"
 *
 * const selector1: string = getSelector("0x123abc");
 * // selector1 = "0x123abc"
 *
 * const selector2: string = getSelector("123456");
 * // selector2 = "0x1e240"
 * ```
 */
export function getSelector(value: string) {
  if (isHex(value)) {
    return value;
  }
  if (isStringWholeNumber(value)) {
    return toHexString(value);
  }
  return getSelectorFromName(value);
}
