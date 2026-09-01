/* eslint-disable no-bitwise */

import { BigNumberish, type Uint512 } from '../../types';
import { addHexPrefix } from '../encode';
import { UINT_128_MAX } from './uint256';
import { isObject } from '../typed';
import { getNext, isBigNumberish } from '../num';
import assert from '../assert';

/**
 * The largest u512, 2^512 - 1.
 * @example
 * ```typescript
 * const result = UINT_512_MAX === 2n ** 512n - 1n;
 * // result = true
 * ```
 */
export const UINT_512_MAX = (1n << 512n) - 1n;

/**
 * The smallest u512, zero : a u512 is never negative.
 * @example
 * ```typescript
 * const result = UINT_512_MIN;
 * // result = 0n
 * ```
 */
export const UINT_512_MIN = 0n;

/**
 * The smallest value a limb can hold, zero.
 * @example
 * ```typescript
 * const result = UINT_128_MIN;
 * // result = 0n
 * ```
 */
export const UINT_128_MIN = 0n;

/**
 * A Cairo `core::integer::u512` : a whole number from 0 to 2^512 - 1, carried in four felts.
 *
 * The number is cut into four u128 limbs, `limb0` holding the bottom 128 bits and `limb3` the top,
 * and a contract call carries all four, lowest limb first. The limbs can be given directly, which
 * is how a response from a node is read back.
 * @example
 * ```typescript
 * const small = new CairoUint512(255);
 * // small.limb0 = 255n, and limb1, limb2, limb3 are 0n
 * const big = new CairoUint512(2n ** 390n + 7n);
 * // big.limb0 = 7n, big.limb3 = 64n
 * ```
 */
export class CairoUint512 {
  /**
   * Bits 0 to 127 of the value.
   * @example
   * ```typescript
   * const result = new CairoUint512(2n ** 390n + 7n).limb0;
   * // result = 7n
   * ```
   */
  public limb0: bigint; // TODO should be u128

  /**
   * Bits 128 to 255 of the value.
   * @example
   * ```typescript
   * const result = new CairoUint512(2n ** 390n + 7n).limb1;
   * // result = 0n
   * ```
   */
  public limb1: bigint; // TODO should be u128

  /**
   * Bits 256 to 383 of the value.
   * @example
   * ```typescript
   * const result = new CairoUint512(2n ** 390n + 7n).limb2;
   * // result = 0n
   * ```
   */
  public limb2: bigint; // TODO should be u128

  /**
   * Bits 384 to 511 of the value.
   * @example
   * ```typescript
   * const result = new CairoUint512(2n ** 390n + 7n).limb3;
   * // result = 64n
   * ```
   */
  public limb3: bigint; // TODO should be u128

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoUint512.abiSelector;
   * // result = "core::integer::u512"
   * ```
   */
  static abiSelector = 'core::integer::u512';

  /**
   * Build from one number, cutting it into its four limbs (Lib usage).
   *
   * A `Uint512` object is accepted here too : it already carries the four limbs, and each is
   * checked as a u128 rather than the whole being cut again.
   * @param {BigNumberish | Uint512} bigNumberish the value to carry, within [0, 2^512 - 1]
   * @throws {Error} when the value is null, undefined, of an unread type, or out of range
   * @example
   * ```typescript
   * const result = new CairoUint512(255).toApiRequest();
   * // result = ["255", "0", "0", "0"]
   * ```
   */
  public constructor(bigNumberish: BigNumberish | Uint512 | unknown);
  /**
   * Build from the four limbs as they arrive, already cut (Api response).
   * @param {BigNumberish} limb0 bits 0 to 127
   * @param {BigNumberish} limb1 bits 128 to 255
   * @param {BigNumberish} limb2 bits 256 to 383
   * @param {BigNumberish} limb3 bits 384 to 511
   * @throws {Error} when any limb is out of the u128 range
   * @example
   * ```typescript
   * const result = new CairoUint512(7, 0, 0, 64).toBigInt() === 2n ** 390n + 7n;
   * // result = true
   * ```
   */
  public constructor(
    limb0: BigNumberish,
    limb1: BigNumberish,
    limb2: BigNumberish,
    limb3: BigNumberish
  );
  public constructor(...arr: any[]) {
    if (
      isObject(arr[0]) &&
      arr.length === 1 &&
      'limb0' in arr[0] &&
      'limb1' in arr[0] &&
      'limb2' in arr[0] &&
      'limb3' in arr[0]
    ) {
      const props = CairoUint512.validateProps(
        arr[0].limb0 as BigNumberish,
        arr[0].limb1 as BigNumberish,
        arr[0].limb2 as BigNumberish,
        arr[0].limb3 as BigNumberish
      );
      this.limb0 = props.limb0;
      this.limb1 = props.limb1;
      this.limb2 = props.limb2;
      this.limb3 = props.limb3;
    } else if (arr.length === 1) {
      const bigInt = CairoUint512.validate(arr[0]);
      this.limb0 = bigInt & UINT_128_MAX;
      this.limb1 = (bigInt & (UINT_128_MAX << 128n)) >> 128n;
      this.limb2 = (bigInt & (UINT_128_MAX << 256n)) >> 256n;
      this.limb3 = bigInt >> 384n;
    } else if (arr.length === 4) {
      const props = CairoUint512.validateProps(arr[0], arr[1], arr[2], arr[3]);
      this.limb0 = props.limb0;
      this.limb1 = props.limb1;
      this.limb2 = props.limb2;
      this.limb3 = props.limb3;
    } else {
      throw Error('Incorrect Uint512 constructor parameters');
    }
  }

  /**
   * Throw unless a whole value can be represented as a u512, and give back its number.
   *
   * A string is only accepted while it spells a number : one that does not is refused for its
   * type, whatever the message says about strings.
   * @param {BigNumberish} bigNumberish the value to check
   * @returns {bigint} the value as a number, once accepted
   * @throws {Error} when the value is null, undefined, of an unread type, or out of range
   * @example
   * ```typescript
   * const result = CairoUint512.validate(255);
   * // result = 255n
   * CairoUint512.validate(-1);
   * // throws Error("bigNumberish is smaller than UINT_512_MIN.")
   * ```
   */
  static validate(bigNumberish: BigNumberish | unknown): bigint {
    assert(bigNumberish !== null, 'null value is not allowed for u512');
    assert(bigNumberish !== undefined, 'undefined value is not allowed for u512');
    assert(
      isBigNumberish(bigNumberish) || isObject(bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u512. Expected string, number, bigint, or Uint512 object`
    );

    const bigInt = BigInt(bigNumberish as BigNumberish);
    assert(bigInt >= UINT_512_MIN, 'bigNumberish is smaller than UINT_512_MIN.');
    assert(bigInt <= UINT_512_MAX, 'bigNumberish is bigger than UINT_512_MAX.');
    return bigInt;
  }

  /**
   * Throw unless all four limbs are u128, and give them back as numbers.
   *
   * This is the check for a value that arrives already cut. Each limb is bounded on its own, and
   * the message names the one at fault by its index.
   * @param {BigNumberish} limb0 bits 0 to 127
   * @param {BigNumberish} limb1 bits 128 to 255
   * @param {BigNumberish} limb2 bits 256 to 383
   * @param {BigNumberish} limb3 bits 384 to 511
   * @returns {{limb0: bigint, limb1: bigint, limb2: bigint, limb3: bigint}} the four limbs as numbers
   * @throws {Error} when any limb is outside the u128 range
   * @example
   * ```typescript
   * const result = CairoUint512.validateProps(7, 0, 0, 64);
   * // result = { limb0: 7n, limb1: 0n, limb2: 0n, limb3: 64n }
   * CairoUint512.validateProps(-1, 0, 0, 0);
   * // throws Error("limb0 is not in the range of a u128 number")
   * ```
   */
  static validateProps(
    limb0: BigNumberish,
    limb1: BigNumberish,
    limb2: BigNumberish,
    limb3: BigNumberish
  ): { limb0: bigint; limb1: bigint; limb2: bigint; limb3: bigint } {
    const l0 = BigInt(limb0);
    const l1 = BigInt(limb1);
    const l2 = BigInt(limb2);
    const l3 = BigInt(limb3);
    [l0, l1, l2, l3].forEach((value: bigint, index) => {
      assert(
        value >= UINT_128_MIN && value <= UINT_128_MAX,
        `limb${index} is not in the range of a u128 number`
      );
    });
    return { limb0: l0, limb1: l1, limb2: l2, limb3: l3 };
  }

  /**
   * Can this value be represented as a u512?
   *
   * The non-throwing form of {@link CairoUint512.validate}, so it answers false for every input
   * that one refuses, whatever the reason.
   * @param {BigNumberish} bigNumberish the value to test
   * @returns {boolean} true when the value fits in a u512
   * @example
   * ```typescript
   * const result = CairoUint512.is(255);
   * // result = true
   * const result2 = CairoUint512.is(-1);
   * // result2 = false
   * ```
   */
  static is(bigNumberish: BigNumberish | unknown): boolean {
    try {
      CairoUint512.validate(bigNumberish);
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::u512`
   * @example
   * ```typescript
   * const result = CairoUint512.isAbiType('core::integer::u512');
   * // result = true
   * const result2 = CairoUint512.isAbiType('core::integer::u256');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint512.abiSelector;
  }

  /**
   * Read one u512 off a contract response, advancing the iterator past it.
   *
   * **Four** felts are consumed, lowest limb first, since that is how a u512 travels.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this u512
   * @returns {CairoUint512} the u512 that was read
   * @example
   * ```typescript
   * const response = ['0xff', '0x0', '0x0', '0x0'];
   * const result = CairoUint512.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 255n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>) {
    const limb0 = getNext(responseIterator);
    const limb1 = getNext(responseIterator);
    const limb2 = getNext(responseIterator);
    const limb3 = getNext(responseIterator);
    return new CairoUint512(limb0, limb1, limb2, limb3);
  }

  /**
   * The four limbs put back together as one number.
   * @returns {bigint} the value this u512 holds
   * @example
   * ```typescript
   * const result = new CairoUint512(255).toBigInt();
   * // result = 255n
   * ```
   */
  toBigInt(): bigint {
    return (this.limb3 << 384n) + (this.limb2 << 256n) + (this.limb1 << 128n) + this.limb0;
  }

  /**
   * The four limbs as a `Uint512` of hexadecimal strings.
   * @returns {{limb0: string, limb1: string, limb2: string, limb3: string}} the limbs, 0x-prefixed and unpadded
   * @example
   * ```typescript
   * const result = new CairoUint512(255).toUint512HexString();
   * // result = { limb0: "0xff", limb1: "0x0", limb2: "0x0", limb3: "0x0" }
   * ```
   */
  toUint512HexString() {
    return {
      limb0: addHexPrefix(this.limb0.toString(16)),
      limb1: addHexPrefix(this.limb1.toString(16)),
      limb2: addHexPrefix(this.limb2.toString(16)),
      limb3: addHexPrefix(this.limb3.toString(16)),
    };
  }

  /**
   * The four limbs as a `Uint512` of decimal strings.
   * @returns {{limb0: string, limb1: string, limb2: string, limb3: string}} the limbs, in base 10
   * @example
   * ```typescript
   * const result = new CairoUint512(255).toUint512DecimalString();
   * // result = { limb0: "255", limb1: "0", limb2: "0", limb3: "0" }
   * ```
   */
  toUint512DecimalString() {
    return {
      limb0: this.limb0.toString(10),
      limb1: this.limb1.toString(10),
      limb2: this.limb2.toString(10),
      limb3: this.limb3.toString(10),
    };
  }

  /**
   * Serialize to the four felts a contract call carries.
   * @returns {string[]} the four limbs as decimal strings, lowest first
   * @example
   * ```typescript
   * const result = new CairoUint512(255).toApiRequest();
   * // result = ["255", "0", "0", "0"]
   * ```
   */
  toApiRequest(): string[] {
    // lower limb first : https://github.com/starkware-libs/cairo/blob/07484c52791b76abcc18fd86265756904557d0d2/corelib/src/test/integer_test.cairo#L767
    return [
      this.limb0.toString(),
      this.limb1.toString(),
      this.limb2.toString(),
      this.limb3.toString(),
    ];
  }
}
