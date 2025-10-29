/* eslint-disable no-bitwise */
/**
 * Singular class handling Cairo Secp256k1Point data type
 *
 * Represents an secp256k1 elliptic curve point as a 512-bit value
 * that is split into 4 128-bit limbs for Cairo representation:
 * - xLow, xHigh: x-coordinate (256 bits)
 * - yLow, yHigh: y-coordinate (256 bits)
 */

import { BigNumberish } from '../../types';
import { addHexPrefix, removeHexPrefix } from '../encode';
import { UINT_128_MAX } from './uint256';
import { isObject } from '../typed';
import { getNext, isBigNumberish } from '../num';
import assert from '../assert';
import { CairoType } from './cairoType.interface';
import { addCompiledFlag } from '../helpers';

export const SECP256K1_POINT_MAX = (1n << 512n) - 1n;
export const SECP256K1_POINT_MIN = 0n;

export interface Secp256k1PointStruct {
  xLow: BigNumberish;
  xHigh: BigNumberish;
  yLow: BigNumberish;
  yHigh: BigNumberish;
}

export class CairoSecp256k1Point extends CairoType {
  public xLow: bigint;

  public xHigh: bigint;

  public yLow: bigint;

  public yHigh: bigint;

  static abiSelector = 'core::starknet::secp256k1::Secp256k1Point' as const;

  /**
   * Default constructor (user input)
   */
  public constructor(input: BigNumberish | Secp256k1PointStruct | unknown);
  /**
   * Direct props initialization (API response)
   */
  public constructor(
    xLow: BigNumberish,
    xHigh: BigNumberish,
    yLow: BigNumberish,
    yHigh: BigNumberish
  );
  public constructor(...arr: any[]) {
    super();

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
      // BigNumberish input - this is typically a 512-bit hex string representing x||y coordinates
      const bigInt = CairoSecp256k1Point.validate(arr[0]);

      // For secp256k1 points, the 512-bit value represents: x_coordinate || y_coordinate
      // Each coordinate is 256 bits, split into low(128) and high(128) parts
      const hexStr = bigInt.toString(16).padStart(128, '0');

      // First 256 bits (64 hex chars) = x coordinate
      const xHex = hexStr.slice(0, 64);
      // Last 256 bits (64 hex chars) = y coordinate
      const yHex = hexStr.slice(64, 128);

      // Convert x coordinate to low/high
      const xBigInt = BigInt(`0x${xHex}`);
      this.xLow = xBigInt & UINT_128_MAX;
      this.xHigh = xBigInt >> 128n;

      // Convert y coordinate to low/high
      const yBigInt = BigInt(`0x${yHex}`);
      this.yLow = yBigInt & UINT_128_MAX;
      this.yHigh = yBigInt >> 128n;
    } else if (arr.length === 4) {
      // Direct limb initialization
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
   * Validate if BigNumberish can be represented as Secp256k1Point (512-bit value)
   */
  static validate(input: BigNumberish | unknown): bigint {
    assert(input !== null, 'null value is not allowed for Secp256k1Point');
    assert(input !== undefined, 'undefined value is not allowed for Secp256k1Point');
    assert(
      isBigNumberish(input),
      `Unsupported data type '${typeof input}' for Secp256k1Point. Expected string, number, bigint`
    );

    const bigInt = BigInt(input as BigNumberish);
    assert(bigInt >= SECP256K1_POINT_MIN, 'input is smaller than SECP256K1_POINT_MIN');
    assert(bigInt <= SECP256K1_POINT_MAX, 'input is bigger than SECP256K1_POINT_MAX');
    return bigInt;
  }

  /**
   * Validate if limbs can be represented as Secp256k1Point
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
   * Check if the provided data is a valid Secp256k1Point
   */
  static is(data: any, _type?: string): boolean {
    try {
      CairoSecp256k1Point.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is Secp256k1Point
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoSecp256k1Point.abiSelector;
  }

  /**
   * Factory method to create CairoSecp256k1Point from API response
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoSecp256k1Point {
    const xLow = getNext(responseIterator);
    const xHigh = getNext(responseIterator);
    const yLow = getNext(responseIterator);
    const yHigh = getNext(responseIterator);
    return new CairoSecp256k1Point(xLow, xHigh, yLow, yHigh);
  }

  /**
   * Return bigint representation (512-bit value)
   * Reconstructs the original x||y coordinate format
   */
  toBigInt(): bigint {
    // Reconstruct x coordinate (256 bits)
    const xCoordinate = (this.xHigh << 128n) + this.xLow;
    // Reconstruct y coordinate (256 bits)
    const yCoordinate = (this.yHigh << 128n) + this.yLow;
    // Combine as x||y (x in upper 256 bits, y in lower 256 bits)
    return (xCoordinate << 256n) + yCoordinate;
  }

  /**
   * Return Secp256k1Point structure with hex string props
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
   * Return hex string representation
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Return API request representation as felt252 array
   * Format: [xLow, xHigh, yLow, yHigh]
   */
  toApiRequest(): string[] {
    const result = [
      this.xLow.toString(10),
      this.xHigh.toString(10),
      this.yLow.toString(10),
      this.yHigh.toString(10),
    ];
    return addCompiledFlag(result);
  }

  /**
   * Create from 512-bit hex string (following current secp256k1Point test pattern)
   */
  static fromHex(hexString: string): CairoSecp256k1Point {
    const cleanHex = removeHexPrefix(hexString).padStart(128, '0');
    if (cleanHex.length !== 128) {
      throw new Error('Hex string must represent exactly 512 bits (128 hex characters)');
    }

    // Split into 4 32-byte (64 hex char) chunks
    // Following the test pattern: pubKeyETHx = first 64 chars, pubKeyETHy = last 64 chars
    const xHex = cleanHex.slice(0, 64); // First 256 bits (x coordinate)
    const yHex = cleanHex.slice(64, 128); // Last 256 bits (y coordinate)

    // Each coordinate is split into low (first 128 bits) and high (last 128 bits)
    const xLow = BigInt(addHexPrefix(xHex.slice(32, 64))); // Last 32 chars of x
    const xHigh = BigInt(addHexPrefix(xHex.slice(0, 32))); // First 32 chars of x
    const yLow = BigInt(addHexPrefix(yHex.slice(32, 64))); // Last 32 chars of y
    const yHigh = BigInt(addHexPrefix(yHex.slice(0, 32))); // First 32 chars of y

    return new CairoSecp256k1Point(xLow, xHigh, yLow, yHigh);
  }
}
