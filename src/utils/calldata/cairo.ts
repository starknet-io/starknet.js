import {
  Abi,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ContractVersion,
  Literal,
  Uint,
  Uint256,
  Uint512,
} from '../../types';
import { CairoFelt } from '../cairoDataTypes/felt';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';

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
// Legacy Export
export const isTypeUint256 = (type: string) => CairoUint256.isAbiType(type);
export const isTypeLiteral = (type: string) => Object.values(Literal).includes(type as Literal);
export const isTypeBool = (type: string) => type === 'core::bool';
export const isTypeContractAddress = (type: string) =>
  type === 'core::starknet::contract_address::ContractAddress';
export const isTypeEthAddress = (type: string) =>
  type === 'core::starknet::eth_address::EthAddress';
export const isTypeBytes31 = (type: string) => type === 'core::bytes_31::bytes31';
export const isTypeByteArray = (type: string) => type === 'core::byte_array::ByteArray';
export const isTypeSecp256k1Point = (type: string) =>
  type === 'core::starknet::secp256k1::Secp256k1Point';
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
  return new CairoUint256(it).toUint256DecimalString();
};

/**
 * Create Uint512 Cairo type (helper for common struct type)
 * @param it BigNumberish representation of a 512 bits unsigned number
 * @returns Uint512 struct
 * @example
 * ```typescript
 * uint512('345745685892349863487563453485768723498');
 * ```
 */
export const uint512 = (it: BigNumberish): Uint512 => {
  return new CairoUint512(it).toUint512DecimalString();
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
  return CairoFelt(it);
}
