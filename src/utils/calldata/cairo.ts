import BN from 'bn.js';

import { BigNumberish, isHex, isStringWholeNumber, toBN } from '../number';
import { encodeShortString, isShortString, isText } from '../shortString';
import { Uint256, isUint256 } from '../uint256';

export const isLen = (name: string) => /_len$/.test(name);
export const isTypeFelt = (type: string) => type === 'felt';
export const isTypeFeltArray = (type: string) => type === 'felt*';
export const isTypeArray = (type: string) => /\*/.test(type);
export const isTypeTuple = (type: string) => /\(.*\)/i.test(type);
export const isTypeNamedTuple = (type: string) => /\(.*\)/i.test(type) && type.includes(':');

/**
 * named tuple are described as js object {}
 * struct types are described as js object {}
 * array types are described as js array []
 */

/**
 * Uint256 cairo type (helper for common struct type)
 */
export const uint256 = (it: BigNumberish): Uint256 => {
  const bn = toBN(it);
  if (!isUint256(bn)) throw new Error('Number is too large');
  return {
    low: bn.maskn(128).toString(10),
    high: bn.shrn(128).toString(10),
  };
};

/**
 * unnamed tuple cairo type (helper same as common struct type)
 */
export const tuple = (...args: (BigNumberish | object)[]) => ({ ...args });

/**
 * felt cairo type
 */
export function felt(it: BigNumberish): string {
  // BN or number
  if (BN.isBN(it) || (typeof it === 'number' && Number.isInteger(it))) {
    return it.toString();
  }
  // string text
  if (isText(it)) {
    if (!isShortString(it as string))
      throw new Error(
        `${it} is a long string > 31 chars, felt can store short strings, split it to array of short strings`
      );
    const encoded = encodeShortString(it as string);
    return toBN(encoded).toString();
  }
  // hex string
  if (typeof it === 'string' && isHex(it)) {
    // toBN().toString
    return toBN(it).toString();
  }
  // string number (already converted), or unhandled type
  if (typeof it === 'string' && isStringWholeNumber(it)) {
    return it;
  }

  throw new Error(`${it} can't be computed by felt()`);
}
