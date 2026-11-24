/* eslint-disable no-bitwise */
import { BigNumberish, Literal } from '../../types';
import { addHexPrefix, removeHexPrefix } from '../encode';
import { getNext, isBigNumberish, isEmptyHex } from '../num';
import { isText } from '../shortString';
import { isNumber, isObject } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { UINT_128_MAX, UINT_256_MAX } from './uint256';

/**
 * The largest number the 512 bits of a Secp256k1Point can hold : both coordinates at their
 * maximum. It is only a bound : a point must also be on the curve, and this value is not, so
 * `new CairoSecp256k1Point(SECP256K1_POINT_MAX)` throws.
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

// p, the prime of the secp256k1 curve : each coordinate of a point is a number modulo p
const SECP256K1_PRIME = 2n ** 256n - 2n ** 32n - 977n;

/**
 * Throw unless (x, y) is a point that a contract accepts as a Secp256k1Point.
 *
 * A contract reads such a parameter with the `secp256k1_new` syscall. It accepts (0, 0), which
 * stands for the point at infinity. Otherwise it refuses a coordinate that is not smaller than p,
 * and a point that is not on the curve y^2 = x^3 + 7 modulo p.
 * @param {bigint} x the x coordinate
 * @param {bigint} y the y coordinate
 * @throws {Error} when a coordinate is not smaller than p, or when the point is not on the curve
 * @example
 * ```typescript
 * // G, the generator of the curve
 * assertOnSecp256k1Curve(
 *   0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,
 *   0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n
 * );
 * // no error
 * assertOnSecp256k1Curve(0n, 0n);
 * // no error : the point at infinity
 * assertOnSecp256k1Curve(1n, 1n);
 * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
 * ```
 */
function assertOnSecp256k1Curve(x: bigint, y: bigint): void {
  if (x === 0n && y === 0n) {
    return;
  }
  assert(
    x < SECP256K1_PRIME,
    'Secp256k1Point: x must be smaller than p, the prime of the secp256k1 curve'
  );
  assert(
    y < SECP256K1_PRIME,
    'Secp256k1Point: y must be smaller than p, the prime of the secp256k1 curve'
  );
  assert(
    (y * y) % SECP256K1_PRIME === (x * x * x + 7n) % SECP256K1_PRIME,
    'Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it'
  );
}

/**
 * Throw unless one limb of a point is a whole number that fits in 128 bits, and return it.
 * @param {BigNumberish} limb the limb to check
 * @param {string} name the name of the limb, used in the error message
 * @returns {bigint} the limb, once checked
 * @throws {Error} when the limb is null, undefined, text, `'0x'`, not a number, a decimal number, negative, or wider than 128 bits
 * @example
 * ```typescript
 * const result = validateLimb('0x12', 'xLow');
 * // result = 18n
 * validateLimb(2n ** 128n, 'yHigh');
 * // throws Error("yHigh must fit in 128 bits")
 * ```
 */
function validateLimb(limb: BigNumberish, name: string): bigint {
  assert(limb !== null, `${name} cannot be null`);
  assert(limb !== undefined, `${name} cannot be undefined`);
  assert(!isText(limb), `${name} cannot be built from text`);
  assert(!isEmptyHex(limb), `${name} cannot be '0x', which holds no hexadecimal digit`);
  assert(isBigNumberish(limb), `${name} must be a BigNumberish`);
  assert(!isNumber(limb) || Number.isInteger(limb), `${name} must be an integer`);
  const bigInt = BigInt(limb);
  assert(bigInt >= 0n, `${name} must be non-negative`);
  assert(bigInt <= UINT_128_MAX, `${name} must fit in 128 bits`);
  return bigInt;
}

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
 * Both ways in are supported : one number, or the four limbs directly, in the order a call carries
 * them.
 *
 * What the caller passes in is checked as soon as the point is built : it must be on the curve, or
 * be (0, 0), which stands for the point at infinity, since a contract refuses anything else. A
 * point read from a contract response is taken as it comes, without this check.
 * @example
 * ```typescript
 * // G, the generator of the curve, as one number : x in the upper 256 bits, y in the lower ones
 * const G =
 *   0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n;
 * const point = new CairoSecp256k1Point(G);
 * point.toStruct();
 * // { xLow: "0x29bfcdb2dce28d959f2815b16f81798", xHigh: "0x79be667ef9dcbbac55a06295ce870b07",
 * //   yLow: "0xfd17b448a68554199c47d08ffb10d4b8", yHigh: "0x483ada7726a3c4655da4fbfc0e1108a8" }
 *
 * // the same point from its four limbs, as a call carries them
 * const same = new CairoSecp256k1Point(
 *   '0x29bfcdb2dce28d959f2815b16f81798',
 *   '0x79be667ef9dcbbac55a06295ce870b07',
 *   '0xfd17b448a68554199c47d08ffb10d4b8',
 *   '0x483ada7726a3c4655da4fbfc0e1108a8'
 * );
 * same.toBigInt() === G; // true
 *
 * new CairoSecp256k1Point(1n); // x = 0, y = 1
 * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
 * ```
 */
export class CairoSecp256k1Point {
  /**
   * The low 128 bits of the x coordinate.
   * @example
   * ```typescript
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).xLow;
   * // result = 0x29bfcdb2dce28d959f2815b16f81798n
   * ```
   */
  public xLow: bigint;

  /**
   * The high 128 bits of the x coordinate.
   * @example
   * ```typescript
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).xHigh;
   * // result = 0x79be667ef9dcbbac55a06295ce870b07n
   * ```
   */
  public xHigh: bigint;

  /**
   * The low 128 bits of the y coordinate.
   * @example
   * ```typescript
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).yLow;
   * // result = 0xfd17b448a68554199c47d08ffb10d4b8n
   * ```
   */
  public yLow: bigint;

  /**
   * The high 128 bits of the y coordinate.
   * @example
   * ```typescript
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).yHigh;
   * // result = 0x483ada7726a3c4655da4fbfc0e1108a8n
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
   * @throws {Error} when a value is null, undefined, of an unread type, text, a decimal number, or out
   * of range, or when the point is not on the curve — see {@link CairoSecp256k1Point.validate} and
   * {@link CairoSecp256k1Point.validateProps} — or when the argument count is neither 1 nor 4
   * @example
   * ```typescript
   * const result = new CairoSecp256k1Point(0n).toApiRequest();
   * // result = ["0", "0", "0", "0"]     (0, 0), the point at infinity
   * new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 });
   * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
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
   * Throw unless the value is a point that a contract accepts, and return it as a number.
   *
   * The value must fit in 512 bits, and the point it stands for must be on the curve, or be (0, 0),
   * the point at infinity.
   *
   * Unlike the other classes here this one gives the number back rather than returning nothing :
   * the constructor needs it, and computing it twice would mean splitting a 512-bit value twice.
   * @param {BigNumberish} input the 512-bit value to check
   * @returns {bigint} the value, once checked
   * @throws {Error} when the value is null, undefined, text, `'0x'`, of an unread type, a decimal number, or outside [0, 2^512 - 1], or when the point is not on the curve
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.validate(0n);
   * // result = 0n     (0, 0), the point at infinity
   * CairoSecp256k1Point.validate('0x1234');
   * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
   * CairoSecp256k1Point.validate(SECP256K1_POINT_MAX + 1n);
   * // throws Error("input is bigger than SECP256K1_POINT_MAX")
   * CairoSecp256k1Point.validate('abc');
   * // throws Error("Invalid input: a Secp256k1Point cannot be built from text")
   * CairoSecp256k1Point.validate(1.5);
   * // throws Error("Invalid input: decimal numbers are not supported, only integers")
   * ```
   */
  static validate(input: BigNumberish | unknown): bigint {
    assert(input !== null, 'null value is not allowed for Secp256k1Point');
    assert(input !== undefined, 'undefined value is not allowed for Secp256k1Point');
    assert(!isText(input), 'Invalid input: a Secp256k1Point cannot be built from text');
    assert(!isEmptyHex(input), "Invalid input: '0x' holds no hexadecimal digit");
    assert(
      isBigNumberish(input),
      `Unsupported input for Secp256k1Point. Expected a number, a bigint, or a string spelling one, received '${typeof input}'`
    );
    // isBigNumberish lets any number through, a decimal one included, which BigInt then refuses
    assert(
      !isNumber(input) || Number.isInteger(input),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const bigInt = BigInt(input as BigNumberish);
    assert(bigInt >= SECP256K1_POINT_MIN, 'input is smaller than SECP256K1_POINT_MIN');
    assert(bigInt <= SECP256K1_POINT_MAX, 'input is bigger than SECP256K1_POINT_MAX');
    // x is the upper 256 bits, y the lower 256 bits
    assertOnSecp256k1Curve(bigInt >> 256n, bigInt & UINT_256_MAX);
    return bigInt;
  }

  /**
   * Throw unless the four limbs each fit in 128 bits and together make a point that a contract
   * accepts, and return them as numbers.
   * @param {BigNumberish} xLow the low 128 bits of x
   * @param {BigNumberish} xHigh the high 128 bits of x
   * @param {BigNumberish} yLow the low 128 bits of y
   * @param {BigNumberish} yHigh the high 128 bits of y
   * @returns {{xLow: bigint, xHigh: bigint, yLow: bigint, yHigh: bigint}} the four limbs, checked
   * @throws {Error} when a limb is null, undefined, text, `'0x'`, not a number, a decimal number, negative, or wider than 128 bits, or when the point is not on the curve
   * @example
   * ```typescript
   * // G, the generator of the curve
   * const result = CairoSecp256k1Point.validateProps(
   *   '0x29bfcdb2dce28d959f2815b16f81798',
   *   '0x79be667ef9dcbbac55a06295ce870b07',
   *   '0xfd17b448a68554199c47d08ffb10d4b8',
   *   '0x483ada7726a3c4655da4fbfc0e1108a8'
   * );
   * // result = { xLow: 0x29bfcdb2dce28d959f2815b16f81798n, xHigh: 0x79be667ef9dcbbac55a06295ce870b07n,
   * //   yLow: 0xfd17b448a68554199c47d08ffb10d4b8n, yHigh: 0x483ada7726a3c4655da4fbfc0e1108a8n }
   * CairoSecp256k1Point.validateProps(1, 2, 3, 4);
   * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
   * CairoSecp256k1Point.validateProps(1, 2, 3, 2n ** 128n);
   * // throws Error("yHigh must fit in 128 bits")
   * CairoSecp256k1Point.validateProps(1.5, 2, 3, 4);
   * // throws Error("xLow must be an integer")
   * CairoSecp256k1Point.validateProps('abc', 2, 3, 4);
   * // throws Error("xLow cannot be built from text")
   * ```
   */
  static validateProps(
    xLow: BigNumberish,
    xHigh: BigNumberish,
    yLow: BigNumberish,
    yHigh: BigNumberish
  ): { xLow: bigint; xHigh: bigint; yLow: bigint; yHigh: bigint } {
    const limbs = {
      xLow: validateLimb(xLow, 'xLow'),
      xHigh: validateLimb(xHigh, 'xHigh'),
      yLow: validateLimb(yLow, 'yLow'),
      yHigh: validateLimb(yHigh, 'yHigh'),
    };
    // each coordinate is its high 128 bits followed by its low 128 bits
    assertOnSecp256k1Curve((limbs.xHigh << 128n) + limbs.xLow, (limbs.yHigh << 128n) + limbs.yLow);
    return limbs;
  }

  /**
   * Is this value a point that a contract accepts as a Secp256k1Point?
   *
   * The non-throwing form of {@link CairoSecp256k1Point.validate}, so it answers false for every
   * input that one refuses, whatever the reason.
   * @param {any} data the value to test
   * @returns {boolean} true when the value fits in 512 bits and stands for a point on the curve, or for (0, 0)
   * @example
   * ```typescript
   * const result = CairoSecp256k1Point.is(0n);
   * // result = true     (0, 0), the point at infinity
   * const result2 = CairoSecp256k1Point.is(SECP256K1_POINT_MAX);
   * // result2 = false   x is not smaller than p
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
   *
   * A response is read as it comes : each felt must fit in 128 bits, but the point is not checked
   * against the curve. What a node answers is taken as correct, and a contract can only return a
   * point on the curve, or (0, 0).
   * @param {Iterator<string>} responseIterator the response felts, positioned on this point
   * @returns {CairoSecp256k1Point} the point that was read
   * @throws {Error} when the response ends before four felts, or when a felt does not fit in 128 bits
   * @example
   * ```typescript
   * const response = ['0x0', '0x0', '0x1', '0x0'];
   * const result = CairoSecp256k1Point.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 1n     not on the curve, and read all the same
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoSecp256k1Point {
    const xLow = validateLimb(getNext(responseIterator), 'xLow');
    const xHigh = validateLimb(getNext(responseIterator), 'xHigh');
    const yLow = validateLimb(getNext(responseIterator), 'yLow');
    const yHigh = validateLimb(getNext(responseIterator), 'yHigh');
    // Built without the constructor, which would check the curve : only what the caller passes in
    // is checked, and what a node answers is read as it comes.
    const point = Object.create(CairoSecp256k1Point.prototype) as CairoSecp256k1Point;
    point.xLow = xLow;
    point.xHigh = xHigh;
    point.yLow = yLow;
    point.yHigh = yHigh;
    return point;
  }

  /**
   * The point as the single 512-bit number `x || y`.
   *
   * The inverse of what the constructor does with one number, so a point built that way comes back
   * unchanged.
   * @returns {bigint} the two coordinates concatenated, x in the upper 256 bits
   * @example
   * ```typescript
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).toBigInt() === G;
   * // result = true
   * const result2 = new CairoSecp256k1Point(0, 0, 0, 0).toBigInt();
   * // result2 = 0n     (0, 0), the point at infinity
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
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).toStruct();
   * // result = { xLow: "0x29bfcdb2dce28d959f2815b16f81798", xHigh: "0x79be667ef9dcbbac55a06295ce870b07",
   * //   yLow: "0xfd17b448a68554199c47d08ffb10d4b8", yHigh: "0x483ada7726a3c4655da4fbfc0e1108a8" }
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
   * const result = new CairoSecp256k1Point(0n).toHexString();
   * // result = "0x0"     (0, 0), the point at infinity
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
   * // G, the generator of the curve, as in the example of the class
   * const result = new CairoSecp256k1Point(G).toApiRequest();
   * // result = ["3468390537006497937951914270391801752", "161825202758953104525843685720298294023",
   * //   "336417762351022071123394393598455764152", "96009999919712310848645357523629574312"]
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
   * @throws {Error} when the string holds more than 128 hex digits, or when the point is not on the
   * curve
   * @example
   * ```typescript
   * // G, the generator of the curve
   * const result = CairoSecp256k1Point.fromHex(
   *   '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'
   * ).xHigh;
   * // result = 0x79be667ef9dcbbac55a06295ce870b07n
   * const result2 = CairoSecp256k1Point.fromHex('0x0').toApiRequest();
   * // result2 = ["0", "0", "0", "0"]     left-padded to 128 hex digits : (0, 0), the point at infinity
   * CairoSecp256k1Point.fromHex('0x1'); // x = 0, y = 1
   * // throws Error("Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it")
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
