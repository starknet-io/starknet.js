import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { AbiEntryType, BigNumberish } from '../../../types';
import { CairoFelt252 } from '../../cairoDataTypes/felt';
import { felt } from '../cairo';
import { CairoUint256 } from '../../cairoDataTypes/uint256';
import { CairoUint512 } from '../../cairoDataTypes/uint512';
import { getNext } from '../../num';

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
  },
} as const;
