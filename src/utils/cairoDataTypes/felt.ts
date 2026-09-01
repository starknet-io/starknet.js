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
 * A Cairo `core::felt252` : the basic field element, an integer in [0, P).
 *
 * P is the prime 2^251 + 17⋅2^192 + 1, so a felt252 is 252 bits — 63 hex symbols, or 31 bytes plus
 * 4 bits. Every operation Cairo performs on a felt252 is computed modulo P.
 *
 * A string is read the way calldata reads it : `'0x3039'` as a hexadecimal number, `'12345'` as a
 * decimal one, anything else as UTF-8 text. Unlike `CairoBytes31` and `CairoByteArray` this class
 * has no door reserved for text, so a string that spells a number is always read as that number.
 * @example
 * ```typescript
 * // the same five characters, read two ways
 * new CairoFelt252('12345').toBigInt(); // 12345n         the number 12345
 * new CairoFelt252('Hello').toBigInt(); // 310939249775n  the text, as UTF-8 bytes
 * ```
 */
export class CairoFelt252 {
  /**
   * The bytes of the value, big-endian and without leading zeros.
   *
   * The length is that of the value, not a fixed width : a felt252 holding 0 is one byte, and one
   * holding `'Hello'` is five. Nothing here records how wide the input was written.
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').data.length;
   * // result = 5
   * const result2 = new CairoFelt252(0).data.length;
   * // result2 = 1     (the single byte 0x00)
   * ```
   */
  data: Uint8Array;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoFelt252.abiSelector;
   * // result = "core::felt252"
   * ```
   */
  static abiSelector = 'core::felt252' as const;

  /**
   * Build from a number, a string or a boolean, refusing anything outside [0, P).
   *
   * The bytes are stored without their leading zeros, so `'0x0041'` and `'0x41'` give the same
   * felt252. A boolean is carried as 1 or 0.
   * @param {BigNumberish | boolean} data the value to carry, within [0, P)
   * @throws {Error} when the value is null, undefined, of an unread type, or outside [0, P)
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').toApiRequest();
   * // result = ["310939249775"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoFelt252.validate(data);
    const processedData = CairoFelt252.__processData(data as BigNumberish | boolean);
    // remove leading zeros, ensure data is an exact value/number
    this.data = processedData.subarray(processedData.findIndex((x) => x > 0));
  }

  /**
   * Turn an accepted input into its bytes, before the constructor strips their leading zeros.
   *
   * The range is not checked here : `validate` is what reads these bytes and decides. Only the
   * type is, and an input this class does not read raises rather than coming back.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {Uint8Array} the bytes of the value, of whatever length it implies
   * @throws {Error} when the input is neither a string, an integer, a bigint nor a boolean
   * @example
   * ```typescript
   * const result = CairoFelt252.__processData('Hello').length;
   * // result = 5
   * CairoFelt252.__processData(1.5);
   * // throws Error("1.5 can't be computed by felt()")
   * ```
   */
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

  /**
   * The bytes read as one big-endian number.
   * @returns {bigint} the value this felt252 holds
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').toBigInt();
   * // result = 310939249775n
   * ```
   */
  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  /**
   * Read the bytes back as UTF-8 text.
   *
   * Only a value that was text to begin with comes back as readable text : the bytes of a number
   * are decoded all the same, and what they spell is rarely what was meant.
   * @returns {string} the bytes decoded as UTF-8
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').decodeUtf8();
   * // result = "Hello"
   * const result2 = new CairoFelt252('12345').decodeUtf8();
   * // result2 = "09"    (the number 12345 is the two bytes 0x30 0x39)
   * ```
   */
  decodeUtf8() {
    return new TextDecoder().decode(this.data);
  }

  /**
   * The value in hexadecimal, without padding.
   * @returns {string} the value as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').toHexString();
   * // result = "0x48656c6c6f"
   * const result2 = new CairoFelt252(0).toHexString();
   * // result2 = "0x0"     (one digit, not "0x00")
   * ```
   */
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoFelt252('Hello').toApiRequest();
   * // result = ["310939249775"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * Throw unless a number falls in the felt252 range [0, P).
   *
   * This takes the number itself, where {@link CairoFelt252.validate} takes whatever a caller
   * hands over. P is excluded : the largest felt252 is P - 1.
   * @param {bigint} val the number to check
   * @throws {Error} when the number is negative or greater than or equal to P
   * @example
   * ```typescript
   * CairoFelt252.assertRange(0n); // passes
   * CairoFelt252.assertRange(-1n);
   * // throws Error("Value -1 is out of felt252 range [0, 3618502788666131213697322783095070105623107215331596699973092056135872020481)")
   * ```
   */
  static assertRange(val: bigint): void {
    assert(val >= 0n && val < PRIME, `Value ${val} is out of felt252 range [0, ${PRIME})`);
  }

  /**
   * Throw unless the value can be carried by a felt252.
   *
   * Null, undefined and any type this class does not read are refused first, each with its own
   * message, then the value is converted and its range checked. A negative number does not reach
   * that range check : converting it fails earlier, and the message comes from the conversion.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, of an unread type, or outside [0, P)
   * @example
   * ```typescript
   * CairoFelt252.validate('Hello'); // passes
   * CairoFelt252.validate({});
   * // throws Error("Unsupported data type 'object' for felt252. Expected string, number, bigint, or boolean")
   * CairoFelt252.validate(-1);
   * // throws Error("Cannot convert negative bigint -1 to Uint8Array")
   * ```
   */
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

  /**
   * Can this value be carried by a felt252?
   *
   * The non-throwing form of {@link CairoFelt252.validate}, so it answers false for every input
   * that one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a felt252
   * @example
   * ```typescript
   * const result = CairoFelt252.is('Hello');
   * // result = true
   * const result2 = CairoFelt252.is(-1);
   * // result2 = false
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoFelt252.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::felt252`
   * @example
   * ```typescript
   * const result = CairoFelt252.isAbiType('core::felt252');
   * // result = true
   * const result2 = CairoFelt252.isAbiType('core::integer::u8');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoFelt252.abiSelector;
  }

  /**
   * Read one felt252 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this felt252
   * @returns {CairoFelt252} the felt252 that was read
   * @example
   * ```typescript
   * const response = ['0x48656c6c6f'];
   * const result = CairoFelt252.factoryFromApiResponse(response.values()).decodeUtf8();
   * // result = "Hello"
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoFelt252 {
    return new CairoFelt252(getNext(responseIterator));
  }
}
