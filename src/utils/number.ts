import BN, { isBN } from 'bn.js';
import assert from 'minimalistic-assert';

import { addHexPrefix, removeHexPrefix } from './encode';

export type BigNumberish = string | number | BN;

export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}

export function toBN(number: BigNumberish, base?: number | 'hex') {
  if (typeof number === 'string') {
    // eslint-disable-next-line no-param-reassign
    number = number.toLowerCase();
  }
  if (typeof number === 'string' && isHex(number) && !base)
    return new BN(removeHexPrefix(number), 'hex');
  return new BN(number, base);
}

export function toHex(number: BN): string {
  return addHexPrefix(number.toString('hex'));
}

export function hexToDecimalString(hex: string): string {
  return toBN(`0x${hex.replace(/^0x/, '')}`).toString();
}

export function toFelt(num: BigNumberish): string {
  if (isBN(num)) {
    return num.toString();
  }
  return toBN(num).toString();
}

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
  const inputBn = toBN(input);
  assert(
    inputBn.gte(toBN(lowerBound)) && inputBn.lt(toBN(upperBound)),
    `Message not signable, ${messageSuffix}.`
  );
}

export function bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toBN(x).toString(10));
}

export function bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[] {
  return rawCalldata.map((x) => toHex(toBN(x)));
}

export const isStringWholeNumber = (value: string) => /^\d+$/.test(value);
export const toHexString = (value: string) => toHex(toBN(value));

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
