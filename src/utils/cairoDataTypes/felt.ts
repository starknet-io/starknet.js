/* eslint-disable no-underscore-dangle */
// TODO Convert to CairoFelt base on CairoUint256 and implement it in the codebase in the backward compatible manner

import { BigNumberish } from '../../types';
import { PRIME } from '../../global/constants';
import { getNext, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';
import { isBoolean, isString, isBigInt } from '../typed';
import {
  stringToUint8Array,
  bigIntToUint8Array,
  uint8ArrayToBigInt,
  addHexPrefix,
} from '../encode';

/**
 * @deprecated use CairoFelt252 Class instead
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
export function CairoFelt(it: BigNumberish): string {
  // BN or number
  if (isBigInt(it) || Number.isInteger(it)) {
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

  static abiSelector = 'core::felt252';

  constructor(data: BigNumberish | boolean) {
    CairoFelt252.validate(data);
    this.data = CairoFelt252.__processData(data);
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
     * DecimalString representation of the felt252
     */
    return [uint8ArrayToBigInt(this.data).toString()];
  }

  static validate(data: BigNumberish | boolean): void {
    const value = CairoFelt252.__processData(data);
    const bn = uint8ArrayToBigInt(value);

    // Check if value is within the felt252 range (0 ≤ x < PRIME)
    if (bn < 0n || bn >= PRIME) {
      throw new Error(`Value ${value} is out of felt252 range [0, ${PRIME})`);
    }
  }

  static is(data: BigNumberish | boolean): boolean {
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
