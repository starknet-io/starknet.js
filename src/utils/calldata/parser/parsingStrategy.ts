import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { AbiEntryType, ETH_ADDRESS } from '../../../types';
import { RANGE_ETH_ADDRESS } from '../../../global/constants';
import assert from '../../assert';
import { addCompiledFlag } from '../../helpers';
import { CairoFelt252 } from '../../cairoDataTypes/felt';
import { CairoUint256 } from '../../cairoDataTypes/uint256';
import { CairoUint512 } from '../../cairoDataTypes/uint512';
import { CairoUint8 } from '../../cairoDataTypes/uint8';
import { CairoUint16 } from '../../cairoDataTypes/uint16';
import { CairoUint32 } from '../../cairoDataTypes/uint32';
import { CairoUint64 } from '../../cairoDataTypes/uint64';
import { CairoUint96 } from '../../cairoDataTypes/uint96';
import { CairoUint128 } from '../../cairoDataTypes/uint128';
import { CairoInt8 } from '../../cairoDataTypes/int8';
import { CairoInt16 } from '../../cairoDataTypes/int16';
import { CairoInt32 } from '../../cairoDataTypes/int32';
import { CairoInt64 } from '../../cairoDataTypes/int64';
import { CairoInt128 } from '../../cairoDataTypes/int128';
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
 * The default parsing strategy.
 *
 * A request is validated, a response is only decoded. What the caller passes in is the caller's
 * mistake to catch, so an argument goes through the class of its declared type and is refused
 * when it does not fit. What a node answers is not, so a response is read as it comes — the
 * declared type is used there only where reading needs it: a negative i8..i128, which is a field
 * element on the wire and only its own class turns back into a negative number, a u256 or u512
 * spread over several felts, a bytes31 or a ByteArray carrying bytes.
 *
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
    // The one entry whose bound is spelled out here rather than delegated: an EthAddress is a felt
    // on the wire, narrowed to the 160 bits an Ethereum address occupies, and has no class of its
    // own to hold that range.
    [ETH_ADDRESS]: (val: unknown) => {
      const value = new CairoFelt252(val).toBigInt();
      assert(
        value >= RANGE_ETH_ADDRESS.min && value <= RANGE_ETH_ADDRESS.max,
        `Value is out of EthAddress range [${RANGE_ETH_ADDRESS.min}, ${RANGE_ETH_ADDRESS.max}]`
      );
      return addCompiledFlag([value.toString()]);
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
    // These five read the felt as it comes, without their own class. What that class would add
    // here is a range assert, and refusing a node's answer turns a remote anomaly into an
    // exception the caller can do nothing about — where the same assert on a request catches the
    // caller's own mistake before any calldata leaves. The signed ones below keep their class
    // because it does not check there, it decodes: a field element back into a negative number.
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
 * A faster strategy, opt-in through the second argument of `new CallData(abi, strategy)`.
 *
 * It buys that speed by not going through the class of the declared type, which costs two things
 * the caller should weigh: an out-of-range u8/u16/u64/u96/u128 is serialized rather than refused,
 * and a negative i8..i128 comes back from a call as its raw field element rather than as a
 * negative number.
 *
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
      return new CairoFelt252(val).toApiRequest();
    },
    // no 160-bit check here, for the same reason as the integers below
    [ETH_ADDRESS]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint256.abiSelector]: (val: unknown) => {
      return new CairoUint256(val).toApiRequest();
    },
    [CairoUint512.abiSelector]: (val: unknown) => {
      return new CairoUint512(val).toApiRequest();
    },
    // These six skip their own CairoUintNN class, which is what makes this strategy the fast one:
    // no range check, just the conversion to a felt. CairoFelt252 accepts the same inputs as the
    // classes it stands in for, text included.
    [CairoUint8.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint16.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint32.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint64.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint96.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
    },
    [CairoUint128.abiSelector]: (val: unknown) => {
      return new CairoFelt252(val).toBigInt().toString();
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
