import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { AbiEntryType, BigNumberish } from '../../../types';
import { CairoFelt252 } from '../../cairoDataTypes/felt';
import { felt } from '../cairo';
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
import { getNext } from '../../num';

// Cairo field prime for signed integer representation
const FIELD_PRIME = 3618502788666131213697322783095070105623107215331596699973092056135872020481n;

/**
 * Parsing map for parser, request and response parsers are separated
 * Configure parsing strategy for each abi type
 */
export type ParsingStrategy = {
  request: Record<AbiEntryType, (val: unknown) => any>;
  response: Record<AbiEntryType, (responseIterator: Iterator<string>) => any>;
};

// TODO: extend for complex types like structs, tuples, enums, arrays, etc.

/**
 * More robust parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const hdParsingStrategy = {
  // TODO: provjeri svi request parseri stvaraju array, dali je to ok sa requstParserom
  request: {
    [CairoBytes31.abiSelector]: (val: unknown) => {
      return new CairoBytes31(val).toApiRequest();
    },
    [CairoByteArray.abiSelector]: (val: unknown) => {
      return new CairoByteArray(val).toApiRequest();
    },
    [CairoFelt252.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toApiRequest();
    },
    [CairoUint256.abiSelector]: (val: unknown) => {
      return new CairoUint256(val).toApiRequest();
    },
    [CairoUint512.abiSelector]: (val: unknown) => {
      return new CairoUint512(val).toApiRequest();
    },
    [CairoUint8.abiSelector]: (val: unknown) => {
      return new CairoUint8(val).toApiRequest();
    },
    [CairoUint16.abiSelector]: (val: unknown) => {
      return new CairoUint16(val).toApiRequest();
    },
    [CairoUint64.abiSelector]: (val: unknown) => {
      return new CairoUint64(val).toApiRequest();
    },
    [CairoUint96.abiSelector]: (val: unknown) => {
      return new CairoUint96(val).toApiRequest();
    },
    [CairoUint128.abiSelector]: (val: unknown) => {
      return new CairoUint128(val).toApiRequest();
    },
    [CairoInt8.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt8(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt16.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt16(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt32.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt32(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt64.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt64(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt128.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt128(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
  },
  response: {
    [CairoBytes31.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoFelt252.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoFelt252.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint256.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint256.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint512.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint512.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint8.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint8.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint16.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint16.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint64.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint64.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint96.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint96.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint128.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint128.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt8.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoInt8.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt16.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoInt16.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt32.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoInt32.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt64.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoInt64.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt128.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoInt128.factoryFromApiResponse(responseIterator).toBigInt();
    },
  },
} as const;

/**
 * Faster parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const fastParsingStrategy: ParsingStrategy = {
  request: {
    [CairoBytes31.abiSelector]: (val: unknown) => {
      return new CairoBytes31(val).toApiRequest();
    },
    [CairoByteArray.abiSelector]: (val: unknown) => {
      return new CairoByteArray(val).toApiRequest();
    },
    [CairoFelt252.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint256.abiSelector]: (val: unknown) => {
      return new CairoUint256(val).toApiRequest();
    },
    [CairoUint512.abiSelector]: (val: unknown) => {
      return new CairoUint512(val).toApiRequest();
    },
    [CairoUint8.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint16.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint64.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint96.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint128.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoInt8.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt8(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt16.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt16(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt32.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt32(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt64.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt64(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
    [CairoInt128.abiSelector]: (val: unknown) => {
      const signedInt = new CairoInt128(val);
      const value = signedInt.toBigInt();
      // For negative values, convert to field element representation
      if (value < 0n) {
        // In Cairo's field, negative values are represented as FIELD_PRIME + value
        return (FIELD_PRIME + value).toString();
      }
      return value.toString();
    },
  },
  response: {
    [CairoBytes31.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoFelt252.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint256.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint256.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint512.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint512.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint8.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint16.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint64.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint96.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint128.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt8.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt16.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt32.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt64.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt128.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
  },
} as const;
