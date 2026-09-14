/* eslint-disable no-bitwise */

import { BigNumberish, Uint256 } from '../../types';
import { addHexPrefix } from '../encode';
import { isObject } from '../typed';
import { getNext, isBigNumberish } from '../num';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';

/**
 * The largest u128, and the mask that cuts a u256 in two.
 * @example
 * ```typescript
 * const result = UINT_128_MAX;
 * // result = 340282366920938463463374607431768211455n
 * ```
 */
export const UINT_128_MAX = (1n << 128n) - 1n;

/**
 * The largest u256, 2^256 - 1.
 * @example
 * ```typescript
 * const result = UINT_256_MAX;
 * // result = 115792089237316195423570985008687907853269984665640564039457584007913129639935n
 * ```
 */
export const UINT_256_MAX = (1n << 256n) - 1n;

/**
 * The smallest u256, zero : a u256 is never negative.
 * @example
 * ```typescript
 * const result = UINT_256_MIN;
 * // result = 0n
 * ```
 */
export const UINT_256_MIN = 0n;

/**
 * The largest `low` half, which is the largest u128.
 * @example
 * ```typescript
 * const result = UINT_256_LOW_MAX === UINT_128_MAX;
 * // result = true
 * ```
 */
export const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n;

/**
 * The largest `high` half, the same u128 bound as {@link UINT_256_LOW_MAX}.
 * @example
 * ```typescript
 * const result = UINT_256_HIGH_MAX === UINT_256_LOW_MAX;
 * // result = true
 * ```
 */
export const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n;

/**
 * The smallest `low` half, zero.
 * @example
 * ```typescript
 * const result = UINT_256_LOW_MIN;
 * // result = 0n
 * ```
 */
export const UINT_256_LOW_MIN = 0n;

/**
 * The smallest `high` half, zero.
 * @example
 * ```typescript
 * const result = UINT_256_HIGH_MIN;
 * // result = 0n
 * ```
 */
export const UINT_256_HIGH_MIN = 0n;

/**
 * A Cairo `core::integer::u256` : a whole number from 0 to 2^256 - 1, carried in two felts.
 *
 * A felt252 is too narrow to hold a u256, so the number is cut into two u128 halves — `low` for the
 * bottom 128 bits, `high` for the top — and a contract call carries both, low first. Either half
 * can be given directly, which is how a response from a node is read back.
 * @example
 * ```typescript
 * const small = new CairoUint256(255);
 * // small.low = 255n, small.high = 0n
 * const big = new CairoUint256(2n ** 130n + 5n);
 * // big.low = 5n, big.high = 4n
 * ```
 */
export class CairoUint256 {
  /**
   * The bottom 128 bits of the value.
   * @example
   * ```typescript
   * const result = new CairoUint256(2n ** 130n + 5n).low;
   * // result = 5n
   * ```
   */
  public low: bigint; // TODO should be u128

  /**
   * The top 128 bits of the value.
   * @example
   * ```typescript
   * const result = new CairoUint256(2n ** 130n + 5n).high;
   * // result = 4n
   * ```
   */
  public high: bigint; // TODO should be u128

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoUint256.abiSelector;
   * // result = "core::integer::u256"
   * ```
   */
  static abiSelector = 'core::integer::u256' as const;

  /**
   * Build from one number, cutting it into its two halves (Lib usage).
   *
   * A `Uint256` object is accepted here too : it already carries `low` and `high`, and both are
   * checked as u128 rather than the whole being cut again.
   * @param {BigNumberish | Uint256} data the value to carry, within [0, 2^256 - 1]
   * @throws {Error} when the value is null, undefined, of an unread type, or out of range
   * @example
   * ```typescript
   * const result = new CairoUint256(2n ** 130n + 5n).toApiRequest();
   * // result = ["5", "4"]
   * ```
   */
  public constructor(data: BigNumberish | Uint256 | unknown);
  /**
   * Build from the two halves as they arrive, already cut (Api response).
   * @param {BigNumberish} low the bottom 128 bits
   * @param {BigNumberish} high the top 128 bits
   * @throws {Error} when either half is out of the u128 range
   * @example
   * ```typescript
   * const result = new CairoUint256(5, 4).toBigInt();
   * // result = 1361129467683753853853498429727072845829n
   * ```
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
   * Throw unless a whole value can be represented as a u256, and give back its number.
   *
   * A string is only accepted while it spells a number, in base 10 or 16 : one that does not is
   * refused for its type.
   * @param {BigNumberish} bigNumberish the value to check
   * @returns {bigint} the value as a number, once accepted
   * @throws {Error} when the value is null, undefined, of an unread type, or out of range
   * @example
   * ```typescript
   * const result = CairoUint256.validate(255);
   * // result = 255n
   * CairoUint256.validate(-1);
   * // throws Error("bigNumberish is smaller than UINT_256_MIN")
   * ```
   */
  static validate(bigNumberish: BigNumberish | unknown) {
    assert(bigNumberish !== null, 'null value is not allowed for u256');
    assert(bigNumberish !== undefined, 'undefined value is not allowed for u256');
    assert(
      isBigNumberish(bigNumberish) || isObject(bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u256. Expected a numeric string (decimal or hexadecimal), number, bigint, or Uint256 object`
    );

    const bigInt = BigInt(bigNumberish as BigNumberish);
    assert(bigInt >= UINT_256_MIN, 'bigNumberish is smaller than UINT_256_MIN');
    assert(bigInt <= UINT_256_MAX, 'bigNumberish is bigger than UINT_256_MAX');
    return bigInt;
  }

  /**
   * Throw unless both halves are u128, and give them back as numbers.
   *
   * This is the check for a value that arrives already cut. Each half is bounded on its own : it
   * is the pair that makes a u256, so neither can overflow into the other.
   * @param {BigNumberish} low the bottom 128 bits
   * @param {BigNumberish} high the top 128 bits
   * @returns {{low: bigint, high: bigint}} the two halves as numbers
   * @throws {Error} when either half is outside the u128 range
   * @example
   * ```typescript
   * const result = CairoUint256.validateProps(5, 4);
   * // result = { low: 5n, high: 4n }
   * CairoUint256.validateProps(-1, 4);
   * // throws Error("low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX")
   * ```
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
   * Can this value be represented as a u256?
   *
   * The non-throwing form of {@link CairoUint256.validate}, so it answers false for every input
   * that one refuses, whatever the reason.
   * @param {BigNumberish} bigNumberish the value to test
   * @returns {boolean} true when the value fits in a u256
   * @example
   * ```typescript
   * const result = CairoUint256.is(255);
   * // result = true
   * const result2 = CairoUint256.is(-1);
   * // result2 = false
   * ```
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
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::u256`
   * @example
   * ```typescript
   * const result = CairoUint256.isAbiType('core::integer::u256');
   * // result = true
   * const result2 = CairoUint256.isAbiType('core::integer::u512');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string) {
    return abiType === CairoUint256.abiSelector;
  }

  /**
   * Read one u256 off a contract response, advancing the iterator past it.
   *
   * **Two** felts are consumed, low first, since that is how a u256 travels.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this u256
   * @returns {CairoUint256} the u256 that was read
   * @example
   * ```typescript
   * const response = ['0x5', '0x4'];
   * const result = CairoUint256.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 1361129467683753853853498429727072845829n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>) {
    const low = getNext(responseIterator);
    const high = getNext(responseIterator);
    return new CairoUint256(low, high);
  }

  /**
   * The two halves put back together as one number.
   * @returns {bigint} the value this u256 holds
   * @example
   * ```typescript
   * const result = new CairoUint256(5, 4).toBigInt();
   * // result = 1361129467683753853853498429727072845829n
   * ```
   */
  toBigInt() {
    return (this.high << 128n) + this.low;
  }

  /**
   * The two halves as a `Uint256` of hexadecimal strings.
   * @returns {{low: string, high: string}} both halves, 0x-prefixed and unpadded
   * @example
   * ```typescript
   * const result = new CairoUint256(255).toUint256HexString();
   * // result = { low: "0xff", high: "0x0" }
   * ```
   */
  toUint256HexString() {
    return {
      low: addHexPrefix(this.low.toString(16)),
      high: addHexPrefix(this.high.toString(16)),
    };
  }

  /**
   * The two halves as a `Uint256` of decimal strings.
   * @returns {{low: string, high: string}} both halves, in base 10
   * @example
   * ```typescript
   * const result = new CairoUint256(255).toUint256DecimalString();
   * // result = { low: "255", high: "0" }
   * ```
   */
  toUint256DecimalString() {
    return {
      low: this.low.toString(10),
      high: this.high.toString(10),
    };
  }

  /**
   * Serialize to the two felts a contract call carries.
   * @returns {string[]} the two halves as decimal strings, low first, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoUint256(255).toApiRequest();
   * // result = ["255", "0"]
   * ```
   */
  toApiRequest() {
    return addCompiledFlag([this.low.toString(), this.high.toString()]);
  }
}
