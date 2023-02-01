import { BigNumberish, toBN, toFelt } from '../number';
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
export const felt = (it: BigNumberish) => toFelt(it);
