import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils';
import { sha256 } from '@noble/hashes/sha256';

import { MASK_31 } from '../global/constants';
import { BigNumberish } from '../types';
import assert from './assert';
import { addHexPrefix, buf2hex, removeHexPrefix } from './encode';
import { isBigInt, isNumber, isString } from './typed';

/**
 * Test if string is hex-string
 *
 * @param hex hex-string
 * @returns {boolean} true if the input string is a hexadecimal string, false otherwise
 * @example
 * ```typescript
 * const hexString1 = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result1 = isHex(hexString1);
 * // result1 = true
 *
 * const hexString2 = "2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result2 = isHex(hexString2);
 * // result2 = false
 * ```
 */
export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}

/**
 * Convert BigNumberish to bigint
 *
 * @param {BigNumberish} value value to convert
 * @returns {BigInt} converted value
 * @example
 * ```typescript
 * const str = '123';
 * const result = toBigInt(str);
 * // result = 123n
 * ```
 */
export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value);
}

/**
 * try to convert BigNumberish to bigint
 * in case of undefined return undefined
 */
export function tryToBigInt(value: BigNumberish | undefined) {
  return value ? BigInt(value) : undefined;
}

/**
 * Convert BigNumberish to hex-string
 *
 * @param {BigNumberish} value value to convert
 * @returns {string} converted number in hex-string format
 * @example
 * ```typescript
 * toHex(100); // '0x64'
 * toHex('200'); // '0xc8'
 * ```
 */
export function toHex(value: BigNumberish): string {
  return addHexPrefix(toBigInt(value).toString(16));
}

/**
 * Alias of ToHex
 */
export const toHexString = toHex;

/**
 * Convert BigNumberish to storage-key-string
 *
 * Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.
 *
 * A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
 * `0x0 + [0-7] + 62 hex = 0x + 64 hex`
 * @returns format: storage-key-string
 * @example
 * ```typescript
 * toStorageKey(0x123); // '0x0000000000000000000000000000000000000000000000000000000000000123'
 * toStorageKey(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toStorageKey('test'); // 'Error'
 * ```
 */
export function toStorageKey(number: BigNumberish): string {
  // TODO: This is not completely correct as it will not enforce first 0 and second [0-7], 0x82bda... will pass as valid and should be false
  return addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
}

/**
 * Convert BigNumberish to hex format 0x + 64 hex chars
 *
 * Similar as toStorageKey but conforming to exactly 0x(64 hex chars).
 *
 * @returns format: hex-0x(64)-string
 * @example
 * ```typescript
 * toHex64(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64(123n); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64('test'); // 'Error'
 * ```
 */
export function toHex64(number: BigNumberish): string {
  const res = addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
  if (res.length !== 66) throw TypeError('number is too big for hex 0x(64) representation');
  return res;
}

/**
 * Convert hexadecimal string to decimal string
 *
 * @param {string} hex hex-string to convert
 * @returns {string} converted number in decimal string format
 * @example
 * ```typescript
 * hexToDecimalString('64'); // '100'
 * hexToDecimalString('c8'); // '200'
 * ```
 */
export function hexToDecimalString(hex: string): string {
  return BigInt(addHexPrefix(hex)).toString(10);
}

/**
 * Remove hex-string leading zeroes and lowercase it
 *
 * @param {string} hex hex-string
 * @returns {string} updated string in hex-string format
 * @example
 * ```typescript
 * cleanHex('0x00023AB'); // '0x23ab'
 * ```
 */
export function cleanHex(hex: string): string {
  return hex.toLowerCase().replace(/^(0x)0+/, '$1');
}

/**
 * Asserts input is equal to or greater then lowerBound and lower then upperBound.
 *
 * The `inputName` parameter is used in the assertion message.
 * @param input Value to check
 * @param lowerBound Lower bound value
 * @param upperBound Upper bound value
 * @param inputName Name of the input for error message
 * @throws Error if input is out of range
 * @example
 * ```typescript
 * const input1:BigNumberish = 10;
 * assertInRange(input1, 5, 20, 'value')
 *
 * const input2: BigNumberish = 25;
 * assertInRange(input2, 5, 20, 'value');
 * // throws Error: Message not signable, invalid value length.
 * ```
 */
export function assertInRange(
  input: BigNumberish,
  lowerBound: BigNumberish,
  upperBound: BigNumberish,
  inputName = ''
) {
  const messageSuffix = inputName === '' ? 'invalid length' : `invalid ${inputName} length`;
  const inputBigInt = BigInt(input);
  const lowerBoundBigInt = BigInt(lowerBound);
  const upperBoundBigInt = BigInt(upperBound);

  assert(
    inputBigInt >= lowerBoundBigInt && inputBigInt <= upperBoundBigInt,
    `Message not signable, ${messageSuffix}.`
  );
}

/**
 * Convert BigNumberish array to decimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns {string[]} array of decimal strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToDecimalStringArray(data);
 * // result = ['100', '200']
 * ```
 */
export function bigNumberishArrayToDecimalStringArray(data: BigNumberish[]): string[] {
  return data.map((x) => toBigInt(x).toString(10));
}

/**
 * Convert BigNumberish array to hexadecimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns array of hex-strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToHexadecimalStringArray(data);
 * // result = ['0x64', '0xc8']
 * ```
 */
export function bigNumberishArrayToHexadecimalStringArray(data: BigNumberish[]): string[] {
  return data.map((x) => toHex(x));
}

/**
 * Test if string is a whole number (0, 1, 2, 3...)
 *
 * @param {string} str string to test
 * @returns {boolean}: true if string is a whole number, false otherwise
 * @example
 * ```typescript
 * isStringWholeNumber('100'); // true
 * isStringWholeNumber('10.0'); // false
 * isStringWholeNumber('test'); // false
 * ```
 */
export function isStringWholeNumber(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Convert string to decimal string
 *
 * @param {string} str string to convert
 * @returns converted string in decimal format
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getDecimalString("0x1a");
 * // result = "26"
 *
 * const result2 = getDecimalString("Hello");
 * // throws Error: "Hello needs to be a hex-string or whole-number-string"
 * ```
 */
export function getDecimalString(str: string) {
  if (isHex(str)) {
    return hexToDecimalString(str);
  }
  if (isStringWholeNumber(str)) {
    return str;
  }
  throw new Error(`${str} needs to be a hex-string or whole-number-string`);
}

/**
 * Convert string to hexadecimal string
 *
 * @param {string} str string to convert
 * @returns converted hex-string
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getHexString("123");
 * // result = "0x7b"
 *
 * const result2 = getHexString("Hello");
 * // throws Error: Hello needs to be a hex-string or whole-number-string
 * ```
 */
export function getHexString(str: string) {
  if (isHex(str)) {
    return str;
  }
  if (isStringWholeNumber(str)) {
    return toHexString(str);
  }
  throw new Error(`${str} needs to be a hex-string or whole-number-string`);
}

/**
 * Convert string array to hex-string array
 *
 * @param {Array<string>} array array of string elements
 * @returns array of converted elements in hex-string format
 * @example
 * ```typescript
 * const data = ['100', '200', '0xaa'];
 * const result = getHexStringArray(data);
 * // result = ['0x64', '0xc8', '0xaa']
 * ```
 */
export function getHexStringArray(array: Array<string>) {
  return array.map(getHexString);
}

/**
 * Convert boolean to "0" or "1"
 *
 * @param value The boolean value to be converted.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = toCairoBool(true);
 * // result ="1"
 *
 * const result2 = toCairoBool(false);
 * // result2 = "0"
 * ```
 */
export function toCairoBool(value: boolean): string {
  return (+value).toString();
}

/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 *
 * @param {string} str hex-string
 * @returns {Uint8Array} array containing the converted elements
 * @throws str must be a hex-string
 * @example
 * ```typescript
 * let result;
 *
 * result = hexToBytes('0x64');
 * // result = [100]
 *
 * result = hexToBytes('test');
 * // throws Error: test needs to be a hex-string
 * ```
 */
export function hexToBytes(str: string): Uint8Array {
  if (!isHex(str)) throw new Error(`${str} needs to be a hex-string`);

  let adaptedValue: string = removeHexPrefix(str);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return hexToBytesNoble(adaptedValue);
}

/**
 * Adds a percentage amount to the value
 *
 * @param number value to be modified
 * @param percent integer as percent ex. 50 for 50%
 * @returns {bigint} modified value
 * @example
 * ```typescript
 * addPercent(100, 50); // 150n
 * addPercent(100, 100); // 200n
 * addPercent(200, 50); // 300n
 * addPercent(200, -50); // 100n
 * addPercent(200, -100); // 0n
 * addPercent(200, -150); // -100n
 * ```
 */
export function addPercent(number: BigNumberish, percent: number): bigint {
  const bigIntNum = BigInt(number);
  return bigIntNum + (bigIntNum * BigInt(percent)) / 100n;
}

/**
 * Calculate the sha256 hash of an utf8 string, then encode the
 * result in an uint8Array of 4 elements.
 * Useful in wallet path calculation.
 * @param {string} str utf8 string (hex string not handled).
 * @returns a uint8Array of 4 bytes.
 * @example
 * ```typescript
 * const ledgerPathApplicationName = 'LedgerW';
 * const path2Buffer = num.stringToSha256ToArrayBuff4(ledgerPathApplicationName);
 * // path2Buffer = Uint8Array(4) [43, 206, 231, 219]
 * ```
 */
export function stringToSha256ToArrayBuff4(str: string): Uint8Array {
  // eslint-disable-next-line no-bitwise
  const int31 = (n: bigint) => Number(n & MASK_31);
  const result: number = int31(BigInt(addHexPrefix(buf2hex(sha256(str)))));
  return hexToBytes(toHex(result));
}

/**
 * Checks if a given value is of BigNumberish type.
 * 234, 234n, "234", "0xea" are valid
 * @param {unknown} input a value
 * @returns {boolean} true if type of input is `BigNumberish`
 * @example
 * ```typescript
 * const res = num.isBigNumberish("ZERO");
 * // res = false
 *  ```
 */
export function isBigNumberish(input: unknown): input is BigNumberish {
  return (
    isNumber(input) ||
    isBigInt(input) ||
    (isString(input) && (isHex(input) || isStringWholeNumber(input)))
  );
}
