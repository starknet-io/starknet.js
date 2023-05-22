import { hexToBytes as hexToBytesNoble } from '@noble/curves/abstract/utils';

import { BigNumberish } from '../types';
import assert from './assert';
import { addHexPrefix, removeHexPrefix } from './encode';

/** @deprecated prefer importing from 'types' over 'num' */
export type { BigNumberish };

export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}

export function toBigInt(value: BigNumberish): bigint {
  return BigInt(value);
}

export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint';
}

export function toHex(number: BigNumberish): string {
  return addHexPrefix(toBigInt(number).toString(16));
}

export function hexToDecimalString(hex: string): string {
  return BigInt(addHexPrefix(hex)).toString(10);
}

/**
 * Remove hex string leading zero and lower case '0x01A'.. -> '0x1a..'
 * @param hex string
 */
export const cleanHex = (hex: string) => hex.toLowerCase().replace(/^(0x)0+/, '$1');

/*
 Asserts input is equal to or greater then lowerBound and lower then upperBound.
 Assert message specifies inputName.
 input, lowerBound, and upperBound should be of type BN.
 inputName should be a string.
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

export function bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toBigInt(x).toString(10));
}

export function bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toHex(x));
}

export const isStringWholeNumber = (value: string) => /^\d+$/.test(value);
export const toHexString = (value: string) => toHex(value);

export function getDecimalString(value: string) {
  if (isHex(value)) {
    return hexToDecimalString(value);
  }
  if (isStringWholeNumber(value)) {
    return value;
  }
  throw new Error(`${value} need to be hex-string or whole-number-string`);
}

export function getHexString(value: string) {
  if (isHex(value)) {
    return value;
  }
  if (isStringWholeNumber(value)) {
    return toHexString(value);
  }
  throw new Error(`${value} need to be hex-string or whole-number-string`);
}

export function getHexStringArray(value: Array<string>) {
  return value.map((el) => getHexString(el));
}

export const toCairoBool = (value: boolean): string => (+value).toString();

/**
 * Convert a hex string to an array of Bytes (Uint8Array)
 * @param value hex string
 * @returns an array of Bytes
 */
export function hexToBytes(value: string): Uint8Array {
  if (!isHex(value)) throw new Error(`${value} need to be a hex-string`);

  let adaptedValue: string = removeHexPrefix(value);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return hexToBytesNoble(adaptedValue);
}
