import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils';

import { BigNumberish } from '../types';
import assert from './assert';
import { addHexPrefix, removeHexPrefix } from './encode';

/** @deprecated prefer importing from 'types' over 'num' */
export type { BigNumberish };

/**
 * Test if string is hex-string
 * @param hex string
 * @returns boolean
 */
export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}

/**
 * Convert BigNumberish to bigint
 * @param value BigNumberish
 * @returns bigint
 */
export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value);
}

/**
 * Test if value is bigint
 * @param value any
 * @returns boolean - with type
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Convert BigNumberish to hex-string
 * @param number BigNumberish
 * @returns hex-string
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
 * Same as toHex but conforming pattern STORAGE_KEY pattern ^0x0[0-7]{1}[a-fA-F0-9]{0,62}$
 * A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.
 * 0x0 + [0-7] + 62 hex = 0x + 64 hex
 * @param number BigNumberish
 * @returns storage-key-string
 */
export function toStorageKey(number: BigNumberish): string {
  const res = addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
  return res;
}

/**
 * Convert hexadecimal string to decimal string
 * @param hex hex-string
 * @returns dec-string
 */
export function hexToDecimalString(hex: string): string {
  return BigInt(addHexPrefix(hex)).toString(10);
}

/**
 * Remove hex string leading zero and lowercase it
 * @example '0x01A...' -> '0x1a..'
 * @param hex hex-string
 * @returns c-hex-string
 */
export const cleanHex = (hex: string) => hex.toLowerCase().replace(/^(0x)0+/, '$1');

/**
 * Asserts input is equal to or greater then lowerBound and lower then upperBound.
 *
 * Assert message specifies inputName.
 *
 * input, lowerBound, and upperBound should be of type BN.
 *
 * inputName should be a string.
 * @param input BigNumberish
 * @param lowerBound BigNumberish
 * @param upperBound BigNumberish
 * @param inputName string
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
 * @param rawCalldata BigNumberish[]
 * @returns dec-string[]
 */
export function bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toBigInt(x).toString(10));
}

/**
 * Convert BigNumberish array to hexadecimal string array
 * @param rawCalldata BigNumberish[]
 * @returns hex-string[]
 */
export function bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toHex(x));
}

/**
 * Test if string is whole number (0,1,2,3...)
 * @param value string
 * @returns boolean
 */
export const isStringWholeNumber = (value: string) => /^\d+$/.test(value);

/**
 * Convert string to decimal string
 * @param value string
 * @returns dec-string
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
 * @param value string
 * @returns hex-string
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
 * @param value string[]
 * @returns hex-string[]
 */
export function getHexStringArray(value: Array<string>) {
  return value.map((el) => getHexString(el));
}

/**
 * Convert boolean to bool-string
 * @param value boolean
 * @returns bool-string
 */
export const toCairoBool = (value: boolean): string => (+value).toString();

/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 * @param value hex-string
 * @returns Uint8Array
 */
export function hexToBytes(value: string): Uint8Array {
  if (!isHex(value)) throw new Error(`${value} need to be a hex-string`);

  let adaptedValue: string = removeHexPrefix(value);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return hexToBytesNoble(adaptedValue);
}
