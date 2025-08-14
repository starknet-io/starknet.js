/* eslint-disable no-bitwise */
/**
 * Singular class handling cairo u256 data type
 */

import { BigNumberish, Uint256 } from '../../types';
import { addHexPrefix } from '../encode';
import { CairoFelt } from './felt';
import { isObject } from '../typed';
import { getNext, isBigNumberish } from '../num';
import assert from '../assert';

export const UINT_128_MAX = (1n << 128n) - 1n;
export const UINT_256_MAX = (1n << 256n) - 1n;
export const UINT_256_MIN = 0n;
export const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n;
export const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n;
export const UINT_256_LOW_MIN = 0n;
export const UINT_256_HIGH_MIN = 0n;

export class CairoUint256 {
  public low: bigint; // TODO should be u128

  public high: bigint; // TODO should be u128

  static abiSelector = 'core::integer::u256' as const;

  /**
   * Default constructor (Lib usage)
   */
  public constructor(data: BigNumberish | Uint256 | unknown);
  /**
   * Direct props initialization (Api response)
   */
  public constructor(low: BigNumberish, high: BigNumberish);
  public constructor(...arr: any[]) {
    if (isObject(arr[0]) && arr.length === 1 && 'low' in arr[0] && 'high' in arr[0]) {
      const props = CairoUint256.validateProps(
        arr[0].low as BigNumberish,
        arr[0].high as BigNumberish
      );
      this.low = props.low;
      this.high = props.high;
    } else if (arr.length === 1) {
      const bigInt = CairoUint256.validate(arr[0]);
      this.low = bigInt & UINT_128_MAX;
      this.high = bigInt >> 128n;
    } else if (arr.length === 2) {
      const props = CairoUint256.validateProps(arr[0], arr[1]);
      this.low = props.low;
      this.high = props.high;
    } else {
      throw Error('Incorrect constructor parameters');
    }
  }

  /**
   * Validate if BigNumberish can be represented as Unit256
   */
  static validate(bigNumberish: BigNumberish | unknown) {
    assert(bigNumberish !== null, 'null value is not allowed for u256');
    assert(bigNumberish !== undefined, 'undefined value is not allowed for u256');
    assert(
      isBigNumberish(bigNumberish) || isObject(bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u256. Expected string, number, bigint, or Uint256 object`
    );

    const bigInt = BigInt(bigNumberish as BigNumberish);
    assert(bigInt >= UINT_256_MIN, 'bigNumberish is smaller than UINT_256_MIN');
    assert(bigInt <= UINT_256_MAX, 'bigNumberish is bigger than UINT_256_MAX');
    return bigInt;
  }

  /**
   * Validate if low and high can be represented as Unit256
   */
  static validateProps(low: BigNumberish, high: BigNumberish) {
    const bigIntLow = BigInt(low);
    const bigIntHigh = BigInt(high);
    assert(
      bigIntLow >= UINT_256_LOW_MIN && bigIntLow <= UINT_256_LOW_MAX,
      'low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX'
    );
    assert(
      bigIntHigh >= UINT_256_HIGH_MIN && bigIntHigh <= UINT_256_HIGH_MAX,
      'high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX'
    );
    return { low: bigIntLow, high: bigIntHigh };
  }

  /**
   * Check if BigNumberish can be represented as Unit256
   */
  static is(bigNumberish: BigNumberish | unknown) {
    try {
      CairoUint256.validate(bigNumberish);
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string) {
    return abiType === CairoUint256.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>) {
    const low = getNext(responseIterator);
    const high = getNext(responseIterator);
    return new CairoUint256(low, high);
  }

  /**
   * Return bigint representation
   */
  toBigInt() {
    return (this.high << 128n) + this.low;
  }

  /**
   * Return Uint256 structure with HexString props
   * {low: HexString, high: HexString}
   */
  toUint256HexString() {
    return {
      low: addHexPrefix(this.low.toString(16)),
      high: addHexPrefix(this.high.toString(16)),
    };
  }

  /**
   * Return Uint256 structure with DecimalString props
   * {low: DecString, high: DecString}
   */
  toUint256DecimalString() {
    return {
      low: this.low.toString(10),
      high: this.high.toString(10),
    };
  }

  /**
   * Return api requests representation witch is felt array
   */
  toApiRequest() {
    return [CairoFelt(this.low), CairoFelt(this.high)];
  }
}
