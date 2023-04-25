import { AbiStructs } from '../../types';
import { BigNumberish, isBigInt, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';
import { UINT_128_MAX, Uint256, isUint256 } from '../uint256';

export enum Uint {
  u8 = 'core::integer::u8',
  u16 = 'core::integer::u16',
  u32 = 'core::integer::u32',
  u64 = 'core::integer::u64',
  u128 = 'core::integer::u128',
  u256 = 'core::integer::u256', // This one is struct
}

export const isLen = (name: string) => /_len$/.test(name);
export const isTypeFelt = (type: string) => type === 'felt' || type === 'core::felt252';
export const isTypeArray = (type: string) =>
  /\*/.test(type) || type.includes('core::array::Array::');
export const isTypeTuple = (type: string) => /^\(.*\)$/i.test(type);
export const isTypeNamedTuple = (type: string) => /\(.*\)/i.test(type) && type.includes(':');
export const isTypeStruct = (type: string, structs: AbiStructs) => type in structs;
export const isTypeUint = (type: string) => Object.values(Uint).includes(type as Uint);
export const isTypeUint256 = (type: string) => type === 'core::integer::u256';
export const isTypeBool = (type: string) => type === 'core::bool';
export const isTypeContractAddress = (type: string) =>
  type === 'core::starknet::contract_address::ContractAddress';
export const isCairo1Type = (type: string) => type.includes('core::');

export const getArrayType = (type: string) => {
  if (isCairo1Type(type)) {
    return type.substring(type.indexOf('<') + 1, type.indexOf('>'));
  }
  return type.replace('*', '');
};

/**
 * named tuple are described as js object {}
 * struct types are described as js object {}
 * array types are described as js array []
 */

/**
 * Uint256 cairo type (helper for common struct type)
 */
export const uint256 = (it: BigNumberish): Uint256 => {
  const bn = BigInt(it);
  if (!isUint256(bn)) throw new Error('Number is too large');
  return {
    // eslint-disable-next-line no-bitwise
    low: (bn & UINT_128_MAX).toString(10),
    // eslint-disable-next-line no-bitwise
    high: (bn >> 128n).toString(10),
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
  if (isBigInt(it) || (typeof it === 'number' && Number.isInteger(it))) {
    return it.toString();
  }
  // string text
  if (isText(it)) {
    if (!isShortString(it as string))
      throw new Error(
        `${it} is a long string > 31 chars, felt can store short strings, split it to array of short strings`
      );
    const encoded = encodeShortString(it as string);
    return BigInt(encoded).toString();
  }
  // hex string
  if (typeof it === 'string' && isHex(it)) {
    // toBN().toString
    return BigInt(it).toString();
  }
  // string number (already converted), or unhandled type
  if (typeof it === 'string' && isStringWholeNumber(it)) {
    return it;
  }
  // bool to felt
  if (typeof it === 'boolean') {
    return `${+it}`;
  }

  throw new Error(`${it} can't be computed by felt()`);
}
