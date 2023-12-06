import {
  Abi,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ContractVersion,
  Litteral,
  Uint,
  Uint256,
} from '../../types';
import { isBigInt, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';
import { UINT_128_MAX, isUint256 } from '../uint256';

// Intended for internal usage, maybe should be exported somewhere else and not exported to utils
export const isLen = (name: string) => /_len$/.test(name);
export const isTypeFelt = (type: string) => type === 'felt' || type === 'core::felt252';
export const isTypeArray = (type: string) =>
  /\*/.test(type) ||
  type.startsWith('core::array::Array::') ||
  type.startsWith('core::array::Span::');
export const isTypeTuple = (type: string) => /^\(.*\)$/i.test(type);
export const isTypeNamedTuple = (type: string) => /\(.*\)/i.test(type) && type.includes(':');
export const isTypeStruct = (type: string, structs: AbiStructs) => type in structs;
export const isTypeEnum = (type: string, enums: AbiEnums) => type in enums;
export const isTypeOption = (type: string) => type.startsWith('core::option::Option::');
export const isTypeResult = (type: string) => type.startsWith('core::result::Result::');
export const isTypeUint = (type: string) => Object.values(Uint).includes(type as Uint);
export const isTypeLitteral = (type: string) => Object.values(Litteral).includes(type as Litteral);
export const isTypeUint256 = (type: string) => type === 'core::integer::u256';
export const isTypeBool = (type: string) => type === 'core::bool';
export const isTypeContractAddress = (type: string) =>
  type === 'core::starknet::contract_address::ContractAddress';
export const isTypeEthAddress = (type: string) =>
  type === 'core::starknet::eth_address::EthAddress';
export const isCairo1Type = (type: string) => type.includes('::');
export const getArrayType = (type: string) => {
  if (isCairo1Type(type)) {
    return type.substring(type.indexOf('<') + 1, type.lastIndexOf('>'));
  }
  return type.replace('*', '');
};

/**
 * Test if an ABI comes from a Cairo 1 contract
 * @param abi representing the interface of a Cairo contract
 * @returns TRUE if it is an ABI from a Cairo1 contract
 * @example
 * ```typescript
 * const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
 * ```
 */
export function isCairo1Abi(abi: Abi): boolean {
  const { cairo } = getAbiContractVersion(abi);
  if (cairo === undefined) {
    throw Error('Unable to determine Cairo version');
  }
  return cairo === '1';
}

/**
 * Return ContractVersion (Abi version) based on Abi
 * or undefined for unknown version
 * @param abi
 * @returns string
 */
export function getAbiContractVersion(abi: Abi): ContractVersion {
  // determine by interface for "Cairo 1.2"
  if (abi.find((it) => it.type === 'interface')) {
    return { cairo: '1', compiler: '2' };
  }

  // determine by function io types "Cairo 1.1" or "Cairo 0.0"
  // find first function with inputs or outputs
  const testFunction = abi.find(
    (it) => it.type === 'function' && (it.inputs.length || it.outputs.length)
  );
  if (!testFunction) {
    return { cairo: undefined, compiler: undefined };
  }
  const io = testFunction.inputs.length ? testFunction.inputs : testFunction.outputs;
  if (isCairo1Type(io[0].type)) {
    return { cairo: '1', compiler: '1' };
  }
  return { cairo: '0', compiler: '0' };
}

/**
 * named tuple cairo type is described as js object {}
 * struct cairo type are described as js object {}
 * array cairo type are described as js array []
 */

/**
 * Create Uint256 Cairo type (helper for common struct type)
 * @example
 * ```typescript
 * uint256('892349863487563453485768723498');
 * ```
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
 * Create unnamed tuple Cairo type (helper same as common struct type)
 * @example
 * ```typescript
 * tuple(1, '0x101', 16);
 * ```
 */
export const tuple = (
  ...args: (BigNumberish | object | boolean)[]
): Record<number, BigNumberish | object | boolean> => ({ ...args });

/**
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
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
