import { keccak } from '@scure/starknet';

import { MASK_250 } from '../../constants';
import { BigNumberish } from '../../types';
import { addHexPrefix, removeHexPrefix, utf8ToArray } from '../encode';
import { hexToBytes, isHex, isStringWholeNumber, toHex, toHexString } from '../num';

/**
 * Calculate the hex-string Keccak hash for a given BigNumberish
 *
 * @param value value to hash
 * @returns hex-string Keccak hash
 * @example
 * ```typescript
 * const result = keccakBn('0xabc');
 * // result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
 * ```
 */
export function keccakBn(value: BigNumberish): string {
  const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
  const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
  return addHexPrefix(keccak(hexToBytes(addHexPrefix(evenHex))).toString(16));
}

/**
 * [internal]
 * Calculate hex-string Keccak hash for a given string
 *
 * String -> hex-string Keccak hash
 * @returns format: hex-string
 */
function keccakHex(str: string): string {
  return addHexPrefix(keccak(utf8ToArray(str)).toString(16));
}

/**
 * Calculate the BigInt Starknet Keccak hash for a given string
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)
 *
 * @param str value to hash
 * @returns BigInt Keccak hash
 * @example
 * ```typescript
 * const result = starknetKeccak('test').toString();
 * // result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
 * ```
 */
export function starknetKeccak(str: string): bigint {
  const hash = BigInt(keccakHex(str));
  // eslint-disable-next-line no-bitwise
  return hash & MASK_250;
}

/**
 * Calculate the hex-string selector for a given abi function name
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)
 *
 * @param funcName abi function name
 * @returns hex-string selector
 * ```typescript
 * const result = getSelectorFromName('myFunction');
 * // result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which is not allowed in the starknet api
  return toHex(starknetKeccak(funcName));
}

/**
 * Calculate the hex-string selector from a given abi function name, decimal string or hex string
 *
 * @param value hex-string | dec-string | ascii-string
 * @returns hex-string selector
 * @example
 * ```typescript
 * const selector1: string = getSelector("myFunction");
 * // selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"
 *
 * const selector2: string = getSelector("0x123abc");
 * // selector2 = "0x123abc"
 *
 * const selector3: string = getSelector("123456");
 * // selector3 = "0x1e240"
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
