/* eslint-disable no-underscore-dangle */
// TODO Convert to CairoFelt base on CairoUint256 and implement it in the codebase in the backward compatible manner

import { BigNumberish } from '../../types';
import { PRIME } from '../../global/constants';
import { getNext, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';
import { isBoolean, isString, isBigInt, isNumber } from '../typed';
import {
  stringToUint8Array,
  bigIntToUint8Array,
  uint8ArrayToBigInt,
  addHexPrefix,
} from '../encode';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';

export const MAX_FELT = 0x800000000000011000000000000000000000000000000000000000000000001n;

/**
 * @deprecated use the CairoFelt252 class instead, this one is limited to ASCII strings
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
export function CairoFelt(it: BigNumberish): string {
  // BN or number
  if (isBigInt(it) || Number.isInteger(it)) {
    const value = BigInt(it);
    if (value < 0) {
      return (MAX_FELT + value).toString();
    }
    return it.toString();
  }

  // Handling strings
  if (isString(it)) {
    // Hex strings
    if (isHex(it)) {
      return BigInt(it).toString();
    }
    // Text strings that must be short
    if (isText(it)) {
      if (!isShortString(it)) {
        throw new Error(
          `${it} is a long string > 31 chars. Please split it into an array of short strings.`
        );
      }
      // Assuming encodeShortString returns a hex representation of the string
      return BigInt(encodeShortString(it)).toString();
    }
    // Whole numeric strings
    if (isStringWholeNumber(it)) {
      return it;
    }
  }
  // bool to felt
  if (isBoolean(it)) {
    return `${+it}`;
  }

  throw new Error(`${it} can't be computed by felt()`);
}

/**
 * felt252 is the basic field element used in Cairo.
 * It corresponds to an integer in the range 0 ≤ x < P where P is a very large prime number currently equal to 2^251 + 17⋅2^192 + 1.
 * Any operation that uses felt252 will be computed modulo P.
 * 63 hex symbols (31 bytes + 4 bits), 252 bits
 */
export class CairoFelt252 {
  /**
   * byte representation of the felt252
   */
  data: Uint8Array;

  static abiSelector = 'core::felt252' as const;

  constructor(data: BigNumberish | boolean | unknown) {
    CairoFelt252.validate(data);
    this.data = CairoFelt252.__processData(data as BigNumberish | boolean);
  }

  static __processData(data: BigNumberish | boolean): Uint8Array {
    if (isString(data)) {
      return stringToUint8Array(data);
    }
    if (isBigInt(data)) {
      return bigIntToUint8Array(data);
    }
    if (Number.isInteger(data)) {
      return bigIntToUint8Array(BigInt(data));
    }
    if (isBoolean(data)) {
      return bigIntToUint8Array(BigInt(data ? 1 : 0));
    }
    throw new Error(`${data} can't be computed by felt()`);
  }

  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  decodeUtf8() {
    return new TextDecoder().decode(this.data);
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  toApiRequest(): string[] {
    /**
     * HexString representation of the felt252
     */
    return addCompiledFlag([this.toHexString()]);
  }

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null, 'null value is not allowed for felt252');
    assert(data !== undefined, 'undefined value is not allowed for felt252');
    assert(
      isString(data) || isNumber(data) || isBigInt(data) || isBoolean(data),
      `Unsupported data type '${typeof data}' for felt252. Expected string, number, bigint, or boolean`
    );

    const value = CairoFelt252.__processData(data as BigNumberish | boolean);
    const bn = uint8ArrayToBigInt(value);
    assert(bn >= 0n && bn < PRIME, `Value ${value} is out of felt252 range [0, ${PRIME})`);
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoFelt252.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  static isAbiType(abiType: string): boolean {
    return abiType === CairoFelt252.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoFelt252 {
    /**
     * The API response is HexString
     */
    return new CairoFelt252(getNext(responseIterator));
  }
}
