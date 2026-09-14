/* eslint-disable no-bitwise */
import { BigNumberish, Literal } from '../../types';
import { addHexPrefix, removeHexPrefix } from '../encode';
import { getNext, isBigNumberish } from '../num';
import { isObject } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { UINT_128_MAX } from './uint256';

/**
 * The largest value a Secp256k1Point can carry : both coordinates at their maximum, 512 bits.
 * @example
 * ```typescript
 * const result = SECP256K1_POINT_MAX === (1n << 512n) - 1n;
 * // result = true
 * ```
 */
export const SECP256K1_POINT_MAX = (1n << 512n) - 1n;

/**
 * The smallest value a Secp256k1Point can carry.
 * @example
 * ```typescript
 * const result = SECP256K1_POINT_MIN;
 * // result = 0n
 * ```
 */
export const SECP256K1_POINT_MIN = 0n;

/**
 * The four 128-bit limbs a Secp256k1Point occupies on the wire, in the order a call carries them.
 */
export interface Secp256k1PointStruct {
  xLow: BigNumberish;
  xHigh: BigNumberish;
  yLow: BigNumberish;
  yHigh: BigNumberish;
}

/**
 * A Cairo `core::starknet::secp256k1::Secp256k1Point` : a point on the secp256k1 curve, the one
 * Ethereum signs with.
 *
 * A point is two 256-bit coordinates, x and y, and Cairo carries each of them as two 128-bit
 * limbs — so four felts in all, in the order `xLow, xHigh, yLow, yHigh`. The single number this
 * class accepts is the 512-bit concatenation `x || y`, x in the upper half : that is the shape an
 * uncompressed public key already has once its `04` prefix is dropped.
 *
 * Both ways in are supported : one number, or the four limbs directly, which is how a response is
 * read back.
 * @example
 * ```typescript
 * // one number, x in the upper 256 bits
 * const point = new CairoSecp256k1Point(1n);
 * point.toApiRequest(); // ["0", "0", "1", "0"]     x = 0, y = 1
 *
 * // the four limbs, as a call carries them
 * const same = new CairoSecp256k1Point(0, 0, 1, 0);
 * same.toBigInt(); // 1n
 * ```
 */
export class CairoSecp256k1Point {
  /**
   * The low 128 bits of the x coordinate.
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).xLow;
   * // result = 1n
   * ```
   */
  public xLow: bigint;

  /**
   * The high 128 bits of the x coordinate.
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).xHigh;
   * // result = 2n
   * ```
   */
  public xHigh: bigint;

  /**
   * The low 128 bits of the y coordinate.
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).yLow;
   * // result = 3n
   * ```
   */
  public yLow: bigint;

  /**
   * The high 128 bits of the y coordinate.
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).yHigh;
   * // result = 4n
   * ```
   */
  public yHigh: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.abiSelector;
   * // result = "core::starknet::secp256k1::Secp256k1Point"
   * ```
   */
  static abiSelector = Literal.Secp256k1Point;

  /**
   * Build from the 512-bit number `x || y`, or from an object carrying the four limbs.
   */
  public constructor(input: BigNumberish | Secp256k1PointStruct | unknown);
  /**
   * Build from the four limbs, in the order a contract response returns them.
   */
  public constructor(
    xLow: BigNumberish,
    xHigh: BigNumberish,
    yLow: BigNumberish,
    yHigh: BigNumberish
  );
  /**
   * @param {any[]} arr either one value — a 512-bit number or a {@link Secp256k1PointStruct} — or
   * the four limbs
   * @throws {Error} when a value is out of range, or when the argument count is neither 1 nor 4
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point(1n).toApiRequest();
   * // result = ["0", "0", "1", "0"]
   * const result2 = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).toApiRequest();
   * // result2 = ["1", "2", "3", "4"]
   * ```
   */
  public constructor(...arr: any[]) {
    if (
      isObject(arr[0]) &&
      arr.length === 1 &&
      'xLow' in arr[0] &&
      'xHigh' in arr[0] &&
      'yLow' in arr[0] &&
      'yHigh' in arr[0]
    ) {
      // Secp256k1PointStruct input
      const props = CairoSecp256k1Point.validateProps(
        arr[0].xLow as BigNumberish,
        arr[0].xHigh as BigNumberish,
        arr[0].yLow as BigNumberish,
        arr[0].yHigh as BigNumberish
      );
      this.xLow = props.xLow;
      this.xHigh = props.xHigh;
      this.yLow = props.yLow;
      this.yHigh = props.yHigh;
    } else if (arr.length === 1) {
      // a 512-bit value, holding the x coordinate then the y coordinate
      const bigInt = CairoSecp256k1Point.validate(arr[0]);
      const hexStr = bigInt.toString(16).padStart(128, '0');

      // first 256 bits (64 hex chars) = x, last 256 bits = y
      const xBigInt = BigInt(addHexPrefix(hexStr.slice(0, 64)));
      const yBigInt = BigInt(addHexPrefix(hexStr.slice(64, 128)));

      this.xLow = xBigInt & UINT_128_MAX;
      this.xHigh = xBigInt >> 128n;
      this.yLow = yBigInt & UINT_128_MAX;
      this.yHigh = yBigInt >> 128n;
    } else if (arr.length === 4) {
      const props = CairoSecp256k1Point.validateProps(arr[0], arr[1], arr[2], arr[3]);
      this.xLow = props.xLow;
      this.xHigh = props.xHigh;
      this.yLow = props.yLow;
      this.yHigh = props.yHigh;
    } else {
      throw Error('Incorrect Secp256k1Point constructor parameters');
    }
  }

  /**
   * Throw unless the value can be carried by a Secp256k1Point, and return it as a number.
   *
   * Unlike the other classes here this one gives the number back rather than returning nothing :
   * the constructor needs it, and computing it twice would mean splitting a 512-bit value twice.
   * @param {BigNumberish} input the 512-bit value to check
   * @returns {bigint} the value, once checked
   * @throws {Error} when the value is null, undefined, of an unread type, or outside [0, 2^512 - 1]
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.validate('0x1234');
   * // result = 4660n
   * CairoSecp256k1Point.validate(SECP256K1_POINT_MAX + 1n);
   * // throws Error("input is bigger than SECP256K1_POINT_MAX")
   * ```
   */
  static validate(input: BigNumberish | unknown): bigint {
    assert(input !== null, 'null value is not allowed for Secp256k1Point');
    assert(input !== undefined, 'undefined value is not allowed for Secp256k1Point');
    assert(
      isBigNumberish(input),
      `Unsupported input for Secp256k1Point. Expected a number, a bigint, or a string spelling one, received '${typeof input}'`
    );

    const bigInt = BigInt(input as BigNumberish);
    assert(bigInt >= SECP256K1_POINT_MIN, 'input is smaller than SECP256K1_POINT_MIN');
    assert(bigInt <= SECP256K1_POINT_MAX, 'input is bigger than SECP256K1_POINT_MAX');
    return bigInt;
  }

  /**
   * Throw unless the four limbs can each be carried by 128 bits, and return them as numbers.
   * @param {BigNumberish} xLow the low 128 bits of x
   * @param {BigNumberish} xHigh the high 128 bits of x
   * @param {BigNumberish} yLow the low 128 bits of y
   * @param {BigNumberish} yHigh the high 128 bits of y
   * @returns {{xLow: bigint, xHigh: bigint, yLow: bigint, yHigh: bigint}} the four limbs, checked
   * @throws {Error} when a limb is null, undefined, not a number, negative, or wider than 128 bits
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.validateProps(1, 2, 3, 4);
   * // result = { xLow: 1n, xHigh: 2n, yLow: 3n, yHigh: 4n }
   * CairoSecp256k1Point.validateProps(1, 2, 3, 2n ** 128n);
   * // throws Error("yHigh must fit in 128 bits")
   * ```
   */
  static validateProps(
    xLow: BigNumberish,
    xHigh: BigNumberish,
    yLow: BigNumberish,
    yHigh: BigNumberish
  ): { xLow: bigint; xHigh: bigint; yLow: bigint; yHigh: bigint } {
    const validateLimb = (limb: BigNumberish, name: string): bigint => {
      assert(limb !== null, `${name} cannot be null`);
      assert(limb !== undefined, `${name} cannot be undefined`);
      assert(isBigNumberish(limb), `${name} must be a BigNumberish`);
      const bigInt = BigInt(limb);
      assert(bigInt >= 0n, `${name} must be non-negative`);
      assert(bigInt <= UINT_128_MAX, `${name} must fit in 128 bits`);
      return bigInt;
    };

    return {
      xLow: validateLimb(xLow, 'xLow'),
      xHigh: validateLimb(xHigh, 'xHigh'),
      yLow: validateLimb(yLow, 'yLow'),
      yHigh: validateLimb(yHigh, 'yHigh'),
    };
  }

  /**
   * Can this value be carried by a Secp256k1Point?
   *
   * The non-throwing form of {@link CairoSecp256k1Point.validate}, so it answers false for every
   * input that one refuses, whatever the reason.
   * @param {any} data the value to test
   * @returns {boolean} true when the value fits in 512 bits
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.is(SECP256K1_POINT_MAX);
   * // result = true
   * const result2 = CairoSecp256k1Point.is(SECP256K1_POINT_MAX + 1n);
   * // result2 = false
   * ```
   */
  static is(data: any): boolean {
    try {
      CairoSecp256k1Point.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::starknet::secp256k1::Secp256k1Point`
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.isAbiType('core::starknet::secp256k1::Secp256k1Point');
   * // result = true
   * const result2 = CairoSecp256k1Point.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoSecp256k1Point.abiSelector;
  }

  /**
   * Read one point off a contract response, advancing the iterator past its four felts.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this point
   * @returns {CairoSecp256k1Point} the point that was read
   * @example
   * ```typescript
   * const response = ['0x0', '0x0', '0x1', '0x0'];
   * const result = CairoSecp256k1Point.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 1n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoSecp256k1Point {
    const xLow = getNext(responseIterator);
    const xHigh = getNext(responseIterator);
    const yLow = getNext(responseIterator);
    const yHigh = getNext(responseIterator);
    return new CairoSecp256k1Point(xLow, xHigh, yLow, yHigh);
  }

  /**
   * The point as the single 512-bit number `x || y`.
   *
   * The inverse of what the constructor does with one number, so a point built that way comes back
   * unchanged.
   * @returns {bigint} the two coordinates concatenated, x in the upper 256 bits
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point(1n).toBigInt();
   * // result = 1n
   * const result2 = new CairoSecp256k1Point(0, 0, 3, 0).toBigInt();
   * // result2 = 3n
   * ```
   */
  toBigInt(): bigint {
    const xCoordinate = (this.xHigh << 128n) + this.xLow;
    const yCoordinate = (this.yHigh << 128n) + this.yLow;
    return (xCoordinate << 256n) + yCoordinate;
  }

  /**
   * The four limbs as hexadecimal strings.
   * @returns {Secp256k1PointStruct} the limbs, each 0x-prefixed and unpadded
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).toStruct();
   * // result = { xLow: "0x1", xHigh: "0x2", yLow: "0x3", yHigh: "0x4" }
   * ```
   */
  toStruct(): Secp256k1PointStruct {
    return {
      xLow: addHexPrefix(this.xLow.toString(16)),
      xHigh: addHexPrefix(this.xHigh.toString(16)),
      yLow: addHexPrefix(this.yLow.toString(16)),
      yHigh: addHexPrefix(this.yHigh.toString(16)),
    };
  }

  /**
   * The point in hexadecimal, without padding.
   * @returns {string} the 512-bit value as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point(4660n).toHexString();
   * // result = "0x1234"
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Serialize to the four felts a contract call carries.
   * @returns {string[]} the limbs as decimal strings, `[xLow, xHigh, yLow, yHigh]`, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).toApiRequest();
   * // result = ["1", "2", "3", "4"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([
      this.xLow.toString(10),
      this.xHigh.toString(10),
      this.yLow.toString(10),
      this.yHigh.toString(10),
    ]);
  }

  /**
   * Build from a hexadecimal string spelling the 512-bit value.
   *
   * A shorter string is left-padded to the 128 hex digits a point occupies, so a small value is
   * read as a point whose upper limbs are zero. A longer one is refused rather than truncated.
   * @param {string} hexString the value, 0x-prefixed or not, at most 128 hex digits
   * @returns {CairoSecp256k1Point} the point the string spells
   * @throws {Error} when the string holds more than 128 hex digits
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.fromHex('0x1').toApiRequest();
   * // result = ["0", "0", "1", "0"]
   * ```
   */
  static fromHex(hexString: string): CairoSecp256k1Point {
    const cleanHex = removeHexPrefix(hexString).padStart(128, '0');
    if (cleanHex.length !== 128) {
      throw new Error('Hex string must represent exactly 512 bits (128 hex characters)');
    }

    const xHex = cleanHex.slice(0, 64);
    const yHex = cleanHex.slice(64, 128);

    // each coordinate splits into its high 128 bits then its low 128 bits
    const xHigh = BigInt(addHexPrefix(xHex.slice(0, 32)));
    const xLow = BigInt(addHexPrefix(xHex.slice(32, 64)));
    const yHigh = BigInt(addHexPrefix(yHex.slice(0, 32)));
    const yLow = BigInt(addHexPrefix(yHex.slice(32, 64)));

    return new CairoSecp256k1Point(xLow, xHigh, yLow, yHigh);
  }
}
