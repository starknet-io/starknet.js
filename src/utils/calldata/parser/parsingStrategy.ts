import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { type AllowArray } from '../../../types';
import { CairoFelt252 } from '../../cairoDataTypes/felt';
import { CairoUint256 } from '../../cairoDataTypes/uint256';
import { CairoUint512 } from '../../cairoDataTypes/uint512';
import { CairoUint8 } from '../../cairoDataTypes/uint8';
import { CairoUint16 } from '../../cairoDataTypes/uint16';
import { CairoUint64 } from '../../cairoDataTypes/uint64';
import { CairoUint96 } from '../../cairoDataTypes/uint96';
import { CairoUint128 } from '../../cairoDataTypes/uint128';
import { CairoInt8 } from '../../cairoDataTypes/int8';
import { CairoInt16 } from '../../cairoDataTypes/int16';
import { CairoInt32 } from '../../cairoDataTypes/int32';
import { CairoInt64 } from '../../cairoDataTypes/int64';
import { CairoInt128 } from '../../cairoDataTypes/int128';
import { CairoUint32 } from '../../cairoDataTypes/uint32';
import { CairoFixedArray } from '../../cairoDataTypes/fixedArray';
import { CairoArray } from '../../cairoDataTypes/array';
import { CairoTuple } from '../../cairoDataTypes/tuple';
import { CairoSecp256k1Point } from '../../cairoDataTypes/secp256k1Point';
import { CairoType } from '../../cairoDataTypes/cairoType.interface';
import assert from '../../assert';
import { isTypeArray, isTypeNonZero, isTypeOption, isTypeResult, isTypeTuple } from '../cairo';
import { CairoTypeOption } from '../../cairoDataTypes/cairoTypeOption';
import { isUndefined } from '../../typed';
import { CairoTypeResult } from '../../cairoDataTypes/cairoTypeResult';
import type { ParsingStrategy, VariantType } from './parsingStrategy.type';
import { CairoBool } from '../../cairoDataTypes';
import { CairoEthAddress } from '../../cairoDataTypes/ethAddress';
import { CairoNonZero } from '../../cairoDataTypes/nonZero';

/**
 * More robust parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const hdParsingStrategy: ParsingStrategy = {
  constructors: {
    [CairoBytes31.abiSelector]: (input: Iterator<string> | unknown) => {
      // Check if input is an Iterator (API response) or user input
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoBytes31.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoBytes31(input);
    },
    [CairoByteArray.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoByteArray.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoByteArray(input);
    },
    [CairoFelt252.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoFelt252.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoFelt252(input);
    },
    'core::starknet::class_hash::ClassHash': (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoFelt252.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoFelt252(input);
    },
    'core::starknet::contract_address::ContractAddress': (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoFelt252.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoFelt252(input);
    },

    felt: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoFelt252.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoFelt252(input);
    },
    [CairoUint256.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint256.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint256(input);
    },
    Uint256: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint256.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint256(input);
    },
    [CairoUint512.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint512.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint512(input);
    },
    [CairoBool.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoBool.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoBool(input);
    },
    [CairoEthAddress.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoEthAddress.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoEthAddress(input);
    },

    [CairoUint8.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint8.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint8(input);
    },
    [CairoUint16.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint16.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint16(input);
    },
    [CairoUint32.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint32.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint32(input);
    },
    [CairoUint64.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint64.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint64(input);
    },
    [CairoUint96.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint96.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint96(input);
    },
    [CairoUint128.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoUint128.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoUint128(input);
    },
    [CairoInt8.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoInt8.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoInt8(input);
    },
    [CairoInt16.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoInt16.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoInt16(input);
    },
    [CairoInt32.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoInt32.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoInt32(input);
    },
    [CairoInt64.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoInt64.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoInt64(input);
    },
    [CairoInt128.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoInt128.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoInt128(input);
    },
    [CairoSecp256k1Point.abiSelector]: (input: Iterator<string> | unknown) => {
      if (input && typeof input === 'object' && 'next' in input) {
        return CairoSecp256k1Point.factoryFromApiResponse(input as Iterator<string>);
      }
      return new CairoSecp256k1Point(input);
    },
    [CairoFixedArray.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string
    ) => {
      assert(!!type, 'CairoFixedArray constructor requires type parameter');
      // Always use constructor - it handles both iterator and user input internally
      return new CairoFixedArray(input, type, strategy);
    },
    [CairoArray.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string
    ) => {
      assert(!!type, 'CairoArray constructor requires type parameter');
      // Always use constructor - it handles both iterator and user input internally
      return new CairoArray(input, type, strategy);
    },
    [CairoTuple.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string
    ) => {
      assert(!!type, 'CairoTuple constructor requires type parameter');
      // Always use constructor - it handles both iterator and user input internally
      return new CairoTuple(input, type, strategy);
    },
    [CairoTypeOption.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string,
      variant?: VariantType
    ) => {
      assert(!!type, 'CairoTypeOption constructor requires "type" parameter.');
      const variantNumber = isUndefined(variant) ? undefined : Number(variant);
      return new CairoTypeOption(input, type, strategy, variantNumber);
    },
    [CairoTypeResult.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string,
      variant?: VariantType
    ) => {
      assert(!!type, 'CairoTypeResult constructor requires "type" parameter.');
      const variantNumber = isUndefined(variant) ? undefined : Number(variant);
      return new CairoTypeResult(input, type, strategy, variantNumber);
    },
    [CairoNonZero.dynamicSelector]: (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string
    ) => {
      assert(!!type, 'CairoNonZero constructor requires "type" parameter.');
      return new CairoNonZero(input, type, strategy);
    },
  },
  dynamicSelectors: {
    [CairoFixedArray.dynamicSelector]: (type: string) => {
      return CairoFixedArray.isAbiType(type);
    },
    [CairoArray.dynamicSelector]: (type: string) => {
      return isTypeArray(type);
    },
    [CairoTuple.dynamicSelector]: (type: string) => {
      return isTypeTuple(type);
    },
    [CairoTypeOption.dynamicSelector]: (type: string) => {
      return isTypeOption(type);
    },
    [CairoTypeResult.dynamicSelector]: (type: string) => {
      return isTypeResult(type);
    },
    [CairoNonZero.dynamicSelector]: (type: string) => {
      return isTypeNonZero(type);
    },
    // TODO: add more dynamic selectors here
  },
  response: {
    [CairoBytes31.abiSelector]: (instance: CairoType) => (instance as CairoBytes31).decodeUtf8(),
    [CairoByteArray.abiSelector]: (instance: CairoType) =>
      (instance as CairoByteArray).decodeUtf8(),
    [CairoFelt252.abiSelector]: (instance: CairoType) => (instance as CairoFelt252).toBigInt(),
    'core::starknet::class_hash::ClassHash': (instance: CairoType) =>
      (instance as CairoFelt252).toBigInt(),
    'core::starknet::contract_address::ContractAddress': (instance: CairoType) =>
      (instance as CairoFelt252).toBigInt(),
    felt: (instance: CairoType) => (instance as CairoFelt252).toBigInt(),
    [CairoUint256.abiSelector]: (instance: CairoType) => (instance as CairoUint256).toBigInt(),
    Uint256: (instance: CairoType) => (instance as CairoUint256).toBigInt(),
    [CairoUint512.abiSelector]: (instance: CairoType) => (instance as CairoUint512).toBigInt(),
    [CairoBool.abiSelector]: (instance: CairoType) => (instance as CairoBool).toBoolean(),
    [CairoEthAddress.abiSelector]: (instance: CairoType) =>
      (instance as CairoEthAddress).toBigInt(),
    [CairoUint8.abiSelector]: (instance: CairoType) => (instance as CairoUint8).toBigInt(),
    [CairoUint16.abiSelector]: (instance: CairoType) => (instance as CairoUint16).toBigInt(),
    [CairoUint32.abiSelector]: (instance: CairoType) => (instance as CairoUint32).toBigInt(),
    [CairoUint64.abiSelector]: (instance: CairoType) => (instance as CairoUint64).toBigInt(),
    [CairoUint96.abiSelector]: (instance: CairoType) => (instance as CairoUint96).toBigInt(),
    [CairoUint128.abiSelector]: (instance: CairoType) => (instance as CairoUint128).toBigInt(),
    [CairoInt8.abiSelector]: (instance: CairoType) => (instance as CairoInt8).toBigInt(),
    [CairoInt16.abiSelector]: (instance: CairoType) => (instance as CairoInt16).toBigInt(),
    [CairoInt32.abiSelector]: (instance: CairoType) => (instance as CairoInt32).toBigInt(),
    [CairoInt64.abiSelector]: (instance: CairoType) => (instance as CairoInt64).toBigInt(),
    [CairoInt128.abiSelector]: (instance: CairoType) => (instance as CairoInt128).toBigInt(),
    [CairoSecp256k1Point.abiSelector]: (instance: CairoType) =>
      (instance as CairoSecp256k1Point).toBigInt(),
    [CairoFixedArray.dynamicSelector]: (
      instance: CairoType,
      strategy: AllowArray<ParsingStrategy>
    ) => (instance as CairoFixedArray).decompose(strategy),
    [CairoArray.dynamicSelector]: (instance: CairoType, strategy: AllowArray<ParsingStrategy>) =>
      (instance as CairoArray).decompose(strategy),
    [CairoTuple.dynamicSelector]: (instance: CairoType, strategy: AllowArray<ParsingStrategy>) =>
      (instance as CairoTuple).decompose(strategy),
    [CairoTypeOption.dynamicSelector]: (
      instance: CairoType,
      strategy: AllowArray<ParsingStrategy>
    ) => (instance as CairoTypeOption).decompose(strategy),
    [CairoTypeResult.dynamicSelector]: (
      instance: CairoType,
      strategy: AllowArray<ParsingStrategy>
    ) => (instance as CairoTypeResult).decompose(strategy),
    [CairoNonZero.dynamicSelector]: (instance: CairoType, strategy: AllowArray<ParsingStrategy>) =>
      (instance as CairoNonZero).decompose(strategy),
  },
} as const;
