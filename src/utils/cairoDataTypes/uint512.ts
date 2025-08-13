/* eslint-disable no-bitwise */
/**
 * Singular class handling cairo u512 data type
 */

import { BigNumberish, type Uint512 } from '../../types';
import { addHexPrefix } from '../encode';
import { CairoFelt } from './felt';
import { UINT_128_MAX } from './uint256';
import { isObject } from '../typed';
import { getNext } from '../num';
import assert from '../assert';

export const UINT_512_MAX = (1n << 512n) - 1n;
export const UINT_512_MIN = 0n;
export const UINT_128_MIN = 0n;

export class CairoUint512 {
  public limb0: bigint; // TODO should be u128

  public limb1: bigint; // TODO should be u128

  public limb2: bigint; // TODO should be u128

  public limb3: bigint; // TODO should be u128

  static abiSelector = 'core::integer::u512';

  /**
   * Default constructor (Lib usage)
   */
  public constructor(bigNumberish: BigNumberish | Uint512 | unknown);
  /**
   * Direct props initialization (Api response)
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
   * Validate if BigNumberish can be represented as Uint512
   */
  static validate(bigNumberish: BigNumberish | unknown): bigint {
    assert(bigNumberish != null, `${String(bigNumberish)} value is not allowed for u512`);
    assert(
      ['string', 'number', 'bigint', 'object'].includes(typeof bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u512. Expected string, number, bigint, or Uint512 object`
    );

    const bigInt = BigInt(bigNumberish as BigNumberish);
    assert(bigInt >= UINT_512_MIN, 'bigNumberish is smaller than UINT_512_MIN.');
    assert(bigInt <= UINT_512_MAX, 'bigNumberish is bigger than UINT_512_MAX.');
    return bigInt;
  }

  /**
   * Validate if limbs can be represented as Uint512
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
   * Check if BigNumberish can be represented as Uint512
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
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint512.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>) {
    const limb0 = getNext(responseIterator);
    const limb1 = getNext(responseIterator);
    const limb2 = getNext(responseIterator);
    const limb3 = getNext(responseIterator);
    return new CairoUint512(limb0, limb1, limb2, limb3);
  }

  /**
   * Return bigint representation
   */
  toBigInt(): bigint {
    return (this.limb3 << 384n) + (this.limb2 << 256n) + (this.limb1 << 128n) + this.limb0;
  }

  /**
   * Return Uint512 structure with HexString props
   * limbx: HexString
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
   * Return Uint512 structure with DecimalString props
   * limbx DecString
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
   * Return api requests representation witch is felt array
   */
  toApiRequest(): string[] {
    // lower limb first : https://github.com/starkware-libs/cairo/blob/07484c52791b76abcc18fd86265756904557d0d2/corelib/src/test/integer_test.cairo#L767
    return [
      CairoFelt(this.limb0),
      CairoFelt(this.limb1),
      CairoFelt(this.limb2),
      CairoFelt(this.limb3),
    ];
  }
}
