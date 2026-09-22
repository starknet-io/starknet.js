import { hexToBytes as hexToBytesNoble } from '@noble/curves/utils.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { utf8ToBytes } from '@noble/hashes/utils.js';

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
  return /^0[xX][0-9a-fA-F]*$/.test(hex);
}

export const isHexString = isHex;

/**
 * Convert BigNumberish to bigint
 *
 * `'0x'`, which holds no digit, is refused with its own message rather than with `BigInt`'s.
 * @param {BigNumberish} value value to convert
 * @returns {BigInt} converted value
 * @throws {Error} when the value is `'0x'`, or anything else `BigInt` cannot read
 * @example
 * ```typescript
 * const str = '123';
 * const result = toBigInt(str);
 * // result = 123n
 * toBigInt('0x');
 * // throws Error("Invalid input: '0x' holds no hexadecimal digit")
 * ```
 */
export function toBigInt(value: BigNumberish): bigint {
  assert(!isEmptyHex(value), "Invalid input: '0x' holds no hexadecimal digit");
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
 * toHex('0x00023AB'); // '0x23ab'
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
 * Remove hex-string leading zeroes and lowercase it
 *
 * @example
 * ```typescript
 * cleanHex('0x00023AB'); // '0x23ab'
 * ```
 */
export function cleanHex(hex: string): string {
  return toHex(hex);
}

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
 * Asserts input is within [lowerBound, upperBound], both bounds included.
 *
 * The `inputName` parameter names the input in the assertion message.
 * @param input Value to check
 * @param lowerBound Lower bound value, included
 * @param upperBound Upper bound value, included
 * @param inputName Name of the input for error message
 * @throws Error if input is out of range
 * @example
 * ```typescript
 * const input1:BigNumberish = 10;
 * assertInRange(input1, 5, 20, 'amount')
 *
 * const input2: BigNumberish = 25;
 * assertInRange(input2, 5, 20, 'amount');
 * // throws Error: Value is out of amount range [5, 20]
 * ```
 */
export function assertInRange(
  input: BigNumberish,
  lowerBound: BigNumberish,
  upperBound: BigNumberish,
  inputName = ''
) {
  const inputBigInt = BigInt(input);
  const lowerBoundBigInt = BigInt(lowerBound);
  const upperBoundBigInt = BigInt(upperBound);
  const rangeName = inputName === '' ? 'range' : `${inputName} range`;

  assert(
    inputBigInt >= lowerBoundBigInt && inputBigInt <= upperBoundBigInt,
    `Value is out of ${rangeName} [${lowerBoundBigInt}, ${upperBoundBigInt}]`
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
  const result: number = int31(BigInt(addHexPrefix(buf2hex(sha256(utf8ToBytes(str))))));
  return hexToBytes(toHex(result));
}

/**
 * Test if a value is a `0x` prefix with no digit after it.
 *
 * `'0x'` is hexadecimal in form — it is how an EVM tool writes empty data — but it spells no
 * number : `BigInt('0x')` throws, `isBigNumberish` refuses it, and so does every Cairo type.
 * @param {unknown} value the value to test
 * @returns {boolean} true for `'0x'` and `'0X'`, false for anything else
 * @example
 * ```typescript
 * const result = num.isEmptyHex('0x');
 * // result = true
 * const result2 = num.isEmptyHex('0x0');
 * // result2 = false
 * ```
 */
export function isEmptyHex(value: unknown): boolean {
  return isString(value) && /^0x$/i.test(value);
}

/**
 * Checks if a given value is of BigNumberish type.
 * 234, 234n, "234" and "0xea" are valid ; a boolean is not, nor a string that spells no number —
 * `'0x'` included, which holds no digit.
 *
 * A number or a bigint passes whatever its sign, and a number whatever its decimal part : `-1`,
 * `-1n` and `1.5` are all accepted here, and it is the Cairo type receiving the value that refuses
 * what it cannot hold. A string is unsigned : it passes as decimal digits or as `0x` hexadecimal
 * only, so `'-1'` and `'1.5'` do not — to the library, such a string is text. The signed integer
 * classes, `CairoInt8` to `CairoInt128`, are the one place where a leading minus sign is read as a
 * sign.
 * @param {unknown} input a value
 * @returns {boolean} true if type of input is `BigNumberish`
 * @example
 * ```typescript
 * const res = num.isBigNumberish("ZERO");
 * // res = false
 * const res2 = num.isBigNumberish(-1);
 * // res2 = true
 * const res3 = num.isBigNumberish('-1');
 * // res3 = false     (a string is unsigned : this one is text)
 * const res4 = num.isBigNumberish(1.5);
 * // res4 = true      (a number is not checked for a decimal part)
 * const res5 = num.isBigNumberish('0x');
 * // res5 = false     (hexadecimal in form, but no digit)
 * ```
 */
export function isBigNumberish(input: unknown): input is BigNumberish {
  return (
    isNumber(input) ||
    isBigInt(input) ||
    (isString(input) && ((isHex(input) && !isEmptyHex(input)) || isStringWholeNumber(input)))
  );
}

/**
 * Expect the next value from an iterator
 *
 * @param iterator The iterator to get the next value from.
 * @returns The next value from the iterator.
 * @throws Error if the iterator is done.
 */
export function getNext(iterator: Iterator<string>): string {
  const it = iterator.next();
  if (it.done) throw new Error('Unexpected end of response');
  return it.value;
}
