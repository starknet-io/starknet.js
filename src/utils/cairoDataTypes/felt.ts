/* eslint-disable no-underscore-dangle */

import { BigNumberish } from '../../types';
import { PRIME } from '../../global/constants';
import { getNext } from '../num';
import { isBoolean, isString, isBigInt, isNumber } from '../typed';
import {
  stringToUint8Array,
  bigIntToUint8Array,
  uint8ArrayToBigInt,
  addHexPrefix,
} from '../encode';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';

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
    const processedData = CairoFelt252.__processData(data as BigNumberish | boolean);
    // remove leading zeros, ensure data is an exact value/number
    this.data = processedData.subarray(processedData.findIndex((x) => x > 0));
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
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  static assertRange(val: bigint): void {
    assert(val >= 0n && val < PRIME, `Value ${val} is out of felt252 range [0, ${PRIME})`);
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
    CairoFelt252.assertRange(bn);
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
