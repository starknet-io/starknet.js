import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils';

import { BigNumberish } from '../types';
import assert from './assert';
import { addHexPrefix, removeHexPrefix } from './encode';

/** @deprecated prefer importing from 'types' over 'num' */
export type { BigNumberish };

/**
 * Test if string is hex-string
 * @param hex hex-string
 */
export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}

/**
 * Convert BigNumberish to bigint
 */
export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value);
}

/**
 * Test if value is bigint
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Convert BigNumberish to hex-string
 * @returns format: hex-string
 */
export function toHex(number: BigNumberish): string {
  return addHexPrefix(toBigInt(number).toString(16));
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
 */
export function toStorageKey(number: BigNumberish): string {
  const res = addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
  return res;
}

/**
 * Convert hexadecimal string to decimal string
 * @param hex hex-string
 * @returns format: decimal string
 */
export function hexToDecimalString(hex: string): string {
  return BigInt(addHexPrefix(hex)).toString(10);
}

/**
 * Remove hex string leading zero and lowercase it
 * @example '0x01A...' -> '0x1a..'
 * @param hex hex-string
 * @returns format: hex-string
 */
export const cleanHex = (hex: string) => hex.toLowerCase().replace(/^(0x)0+/, '$1');

/**
 * Asserts input is equal to or greater then lowerBound and lower then upperBound.
 *
 * The `inputName` parameter is used in the assertion message.
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
 * @returns format: decimal string array
 */
export function bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toBigInt(x).toString(10));
}

/**
 * Convert BigNumberish array to hexadecimal string array
 * @returns format: hex-string array
 */
export function bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toHex(x));
}

/**
 * Test if string is whole number (0, 1, 2, 3...)
 */
export const isStringWholeNumber = (value: string) => /^\d+$/.test(value);

/**
 * Convert string to decimal string
 * @returns format: decimal string
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
 * @returns format: hex-string
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
 * @returns format: hex-string array
 */
export function getHexStringArray(value: Array<string>) {
  return value.map((el) => getHexString(el));
}

/**
 * Convert boolean to "0" or "1"
 */
export const toCairoBool = (value: boolean): string => (+value).toString();

/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 * @param value hex-string
 */
export function hexToBytes(value: string): Uint8Array {
  if (!isHex(value)) throw new Error(`${value} need to be a hex-string`);

  let adaptedValue: string = removeHexPrefix(value);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return hexToBytesNoble(adaptedValue);
}
