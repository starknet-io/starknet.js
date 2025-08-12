import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { AbiEntryType } from '../../../types';

/**
 * Parsing map for parser, request and response parsers are separated
 * Configure parsing strategy for each abi type
 */
export type ParsingStrategy = {
  request: Record<AbiEntryType, () => any>;
  response: Record<AbiEntryType, (responseIterator: Iterator<string>) => any>;
};

/**
 * More robust parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const hdParsingStrategy = {
  request: {},
  response: {
    [CairoBytes31.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
      return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
  },
} as const;

/**
 * Fastest parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
export const fastParsingStrategy: ParsingStrategy = {
  request: {},
  response: {},
} as const;
