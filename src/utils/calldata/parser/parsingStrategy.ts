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
import { CairoUint32 } from '../../cairoDataTypes/uint32';
import { CairoFixedArray } from '../../cairoDataTypes/fixedArray';
import assert from '../../assert';

/**
 * Parsing map for parser, request and response parsers are separated
 * Configure parsing strategy for each abi type
 */
export type ParsingStrategy = {
  request: Record<AbiEntryType, (val: unknown, type?: string) => any>;
  response: Record<AbiEntryType, (responseIterator: Iterator<string>, type?: string) => any>;
  dynamicSelectors: Record<string, (type: string) => boolean>;
};

/**
 * More robust parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const hdParsingStrategy: ParsingStrategy = {
  dynamicSelectors: {
    CairoFixedArray: (type: string) => {
      return CairoFixedArray.isAbiType(type);
    },
    // TODO: add more dynamic selectors here
  },
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
    [CairoUint32.abiSelector]: (val: unknown) => {
      return new CairoUint32(val).toApiRequest();
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
      return new CairoInt8(val).toApiRequest();
    },
    [CairoInt16.abiSelector]: (val: unknown) => {
      return new CairoInt16(val).toApiRequest();
    },
    [CairoInt32.abiSelector]: (val: unknown) => {
      return new CairoInt32(val).toApiRequest();
    },
    [CairoInt64.abiSelector]: (val: unknown) => {
      return new CairoInt64(val).toApiRequest();
    },
    [CairoInt128.abiSelector]: (val: unknown) => {
      return new CairoInt128(val).toApiRequest();
    },
    CairoFixedArray: (val: unknown, type?: string) => {
      assert(!!type, 'CairoFixedArray parser requires type parameter');
      return new CairoFixedArray(val, type, hdParsingStrategy).toApiRequest();
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
    [CairoUint32.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoUint32.factoryFromApiResponse(responseIterator).toBigInt();
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
    CairoFixedArray: (responseIterator: Iterator<string>, type?: string) => {
      assert(!!type, 'CairoFixedArray parser requires type parameter');
      return CairoFixedArray.factoryFromApiResponse(
        responseIterator,
        type,
        hdParsingStrategy
      ).decompose();
    },
  },
} as const;

/**
 * Faster parsing strategy
 * Inherits from hdParsingStrategy but overrides specific parsers for performance
 * Uses direct felt() and BigInt() conversions instead of creating Cairo type instances
 */
export const fastParsingStrategy: ParsingStrategy = {
  dynamicSelectors: hdParsingStrategy.dynamicSelectors,
  request: {
    // Inherit most parsers from hdParsingStrategy
    ...hdParsingStrategy.request,
    // Override for performance: use felt() directly instead of creating Cairo types
    [CairoFelt252.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint8.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint16.abiSelector]: (val: unknown) => {
      return felt(val as BigNumberish);
    },
    [CairoUint32.abiSelector]: (val: unknown) => {
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
  },
  response: {
    // Inherit all parsers from hdParsingStrategy first
    ...hdParsingStrategy.response,
    // Override simple types for performance: use BigInt() directly instead of factory methods
    [CairoFelt252.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint8.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint16.abiSelector]: (responseIterator: Iterator<string>) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint32.abiSelector]: (responseIterator: Iterator<string>) => {
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
