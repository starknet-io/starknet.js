import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils';

import { BigNumberish } from '../types';
import assert from './assert';
import { addHexPrefix, removeHexPrefix } from './encode';

/** @deprecated prefer importing from 'types' over 'num' */
export type { BigNumberish };

/**
 * Test if string is hex-string
 * @param hex hex-string
 * @returns {boolean} True if the input string is a hexadecimal string, false otherwise
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
 * @param value BigNumberish value to convert to bigint
 * @returns {bigint} Converted bigint value
 * @example
 * ```typescript
 * const bigNumberishValue1: BigNumberish = 1234567890;
 * const result1 = toBigInt(bigNumberishValue1);
 * // result1 = 1234567890n
 * ```
 */
export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value);
}

/**
 * Test if value is bigint
 * @param value Value to test
 * @returns {boolean} True if the value is a bigint, false otherwise
 * @example
 * ```typescript
 * const bigIntValue1: bigint = 1234567890n;
 * const result1 = isBigint(bigIntValue1);
 * // result1 = true
 * ```
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Convert BigNumberish to hex-string
 * @param number BigNumberish value to convert to hex-string
 * @returns format: hex-string
 * @example
 * ```typescript
 * const bigNumberishValue1: BigNumberish = 1234567890;
 * const result1 = toHex(bigNumberishValue1);
 * // result = "0x499602d2"
 * ```
 */
export function toHex(number: BigNumberish): string {
  return addHexPrefix(toBigInt(number).toString(16));
}

/**
 * Alias of toHex
 * @returns format: hex-string
 * @example
 * ```typescript
 * const result = toHexString(123);
 * // result = "0x7b"
 * ```
 */
export const toHexString = toHex;

/**
 * Convert BigNumberish to storage-key-string
 *
 * Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.
 *
 * A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
 * `0x0 + [0-7] + 62 hex = 0x + 64 hex`
 * @param number BigNumberish value to convert to storage-key-string
 * @returns format: storage-key-string
 * @example
 * ```typescript
 * const bigNumberishValue1: BigNumberish = 1234567890;
 * const result = toStorageKey(bigNumberishValue1);
 * // result = "0x000000000000000000000000000000000000000000000000000000000499602d2"
 * ```
 */
export function toStorageKey(number: BigNumberish): string {
  const res = addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
  return res;
}

/**
 * Convert hexadecimal string to decimal string
 * @param hex hex-string
 * @returns format: decimal string
 * @example
 * ```typescript
 * const hexString = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result = hexToDecimalString(hexString);
 * // result = "32507161997631881240494522159444018041090212371621416251492750949915267618964";
 * ```
 */
export function hexToDecimalString(hex: string): string {
  return BigInt(addHexPrefix(hex)).toString(10);
}

/**
 * Remove hex string leading zero and lowercase it;
 * @param hex hex-string
 * @returns format: hex-string
 * @example
 * ```typescript
 * const hexString = '0x01A2F3'
 * const result = cleanHex(hexString);
 * // result = '0x1a2f3'
 * ```
 */
export const cleanHex = (hex: string) => hex.toLowerCase().replace(/^(0x)0+/, '$1');

/**
 * Asserts input is equal to or greater than lowerBound and lower than upperBound.
 *
 * The `inputName` parameter is used in the assertion message.
 * @param input Value to check
 * @param lowerBound Lower bound value
 * @param upperBound Upper bound value
 * @param inputName Name of the input for error message
 * @Throws Error if input is out of range
 * @example
 * ```typescript
 * const input1:BigNumberish = 10;
 * assertInRange(input1, 5, 20, 'value')
 *
 * const input2: BigNumberish = 25;
 * assertInRange(input2, 5, 20, 'value');
 * // Throws Error: Message not signable, invalid value length.
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
 * @param rawCalldata Array of BigNumberish values
 * @returns format: decimal string array
 * @example
 * ```typescript
 * const bigNumberishArray: BigNumberish[] = [123, "456", 789n];
 * const result = bigNumberishArrayToDecimalStringArray(bigNumberishArray);
 * // result = ["123", "456", "789"]
 * ```
 */
export function bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toBigInt(x).toString(10));
}

/**
 * Convert BigNumberish array to hexadecimal string array
 * @param rawCalldata Array of BigNumberish values
 * @returns format: hex-string array
 * @example
 * ```typescript
 * const bigNumberishArray: BigNumberish[] = [123, "456", 789n];
 * const result = bigNumberishArrayToHexadecimalStringArray(bigNumberishArray);
 * // result = ["0x7b", "0x1c8", "0x315"]
 * ```
 */
export function bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toHex(x));
}

/**
 * Test if string is whole number (0, 1, 2, 3...)
 * @param value The string to be tested.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = isStringWholeNumber("123");
 * // result = true
 * ```
 */
export const isStringWholeNumber = (value: string) => /^\d+$/.test(value);

/**
 * Convert string to decimal string
 * @param value The string to be converted.
 * @returns format: decimal string
 * @example
 * ```typescript
 * const result = getDecimalString("0x1a");
 * // result = "26"
 *
 * const result2 = getDecimalString("Hello");
 * // Throws Error: "Hello need to be hex-string or whole-number-string"
 * ```
 */
export function getDecimalString(value: string) {
  if (isHex(value)) {
    return hexToDecimalString(value);
  }
  if (isStringWholeNumber(value)) {
    return value;
  }
  throw new Error(`${value} need to be hex-string or whole-number-string`);
}

/**
 * Convert string to hexadecimal string
 * @param value The string to be converted.
 * @returns format: hex-string
 * @example
 * ```typescript
 * const result = getHexString("123");
 * // result = "0x7b"
 *
 * const result2 = getHexString("Hello");
 * // Throws Error: Hello need to be hex-string or whole-number-string
 * ```
 */
export function getHexString(value: string) {
  if (isHex(value)) {
    return value;
  }
  if (isStringWholeNumber(value)) {
    return toHexString(value);
  }
  throw new Error(`${value} need to be hex-string or whole-number-string`);
}

/**
 * Convert string array to hex-string array
 * @param value The string array to be converted.
 * @returns format: hex-string array
 * @example
 * ```typescript
 * const stringArray: string[] = ["123", "456", "789"];
 * const result = getHexStringArray(stringArray);
 * // result = ["0x7b", "0x1c8", "0x315"]
 * ```
 */
export function getHexStringArray(value: Array<string>) {
  return value.map((el) => getHexString(el));
}

/**
 * Convert boolean to "0" or "1"
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
export const toCairoBool = (value: boolean): string => (+value).toString();

/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 * @param value The hex-string to be converted.
 * @returns The array of bytes (Uint8Array) corresponding to the hex-string.
 * @example
 * ```typescript
 * const result = hexToBytes("0x123456");
 * // result = Uint8Array [ 18, 52, 86 ]
 * ```
 */
export function hexToBytes(value: string): Uint8Array {
  if (!isHex(value)) throw new Error(`${value} need to be a hex-string`);

  let adaptedValue: string = removeHexPrefix(value);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return hexToBytesNoble(adaptedValue);
}

/**
 * Increase a give number by specified percentage
 * @param number The value to be increased (BigInt or number).
 * @param percent integer as percent ex. 50 for 50%
 * @returns The increased value as a BigInt.
 * @example
 * ```typescript
 * const result = addPercent(100, 50);
 * // result = 150n
 * ```
 */
export function addPercent(number: BigNumberish, percent: number) {
  const bigIntNum = BigInt(number);
  return bigIntNum + (bigIntNum * BigInt(percent)) / 100n;
}

/**
 * Check if a value is a number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = isNumber(123);
 * // result = true
 *
 * const result2 = isNumber("123");
 * // result2 = false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Checks if a given value is of boolean type.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is of boolean type, false otherwise.
 * @example
 * ```typescript
 * const result = isBoolean(true);
 * // result = true
 *
 * const result2 = isBoolean(false);
 * // result2 = false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
