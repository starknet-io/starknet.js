import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { addHexPrefix, removeHexPrefix } from './enc';

export type BigNumberish = string | number | BN;

export const isHex = (hex: string): boolean => {
  return hex.startsWith('0x');
};

export const toBN = (number: BigNumberish, base?: number | 'hex') => {
  if (typeof number === 'string' && isHex(number) && !base)
    return new BN(removeHexPrefix(number), 'hex');
  return new BN(number, base);
};

export const toHex = (number: BN): string => {
  return addHexPrefix(number.toString('hex'));
};

export const hexToDecimalString = (hex: string): string =>
  toBN(`0x${hex.replace(/^0x/, '')}`).toString();

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
