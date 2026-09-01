/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_U8 } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

/**
 * A Cairo `core::integer::u8` : a whole number from 0 to 255, carried in one felt252.
 *
 * The value is kept as a bigint, so the shape of the input does not survive — `97`, `'97'` and
 * `'0x61'` give the same u8. A string that reads as text rather than as a number is taken for its
 * UTF-8 bytes, which is why `'a'` is 97 and not a rejected input.
 *
 * An already built instance is **not** an accepted input : handed back to the constructor it is
 * seen as an object and refused. Inside the library it is `unwrapCairoScalar` that reduces an
 * instance to its number before an abi slot receives it.
 * @example
 * ```typescript
 * // the same value, reached four ways
 * new CairoUint8(97).toBigInt(); //     97n
 * new CairoUint8('97').toBigInt(); //   97n
 * new CairoUint8('0x61').toBigInt(); // 97n
 * new CairoUint8('a').toBigInt(); //    97n     the UTF-8 code of the character
 * ```
 */
export class CairoUint8 {
  /**
   * The value, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoUint8('0x61').data;
   * // result = 97n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoUint8.abiSelector;
   * // result = "core::integer::u8"
   * ```
   */
  static abiSelector = 'core::integer::u8';

  /**
   * Build from a number, a string or a boolean, refusing anything out of the u8 range.
   *
   * A string is read as a number when it spells one — decimal or hexadecimal — and as UTF-8 text
   * otherwise. Text therefore only fits here while it is a single ASCII character : two characters
   * already make a number past 255.
   * @param {BigNumberish | boolean} data the value to carry, within [0, 255]
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * const result = new CairoUint8('a').toApiRequest();
   * // result = ["97"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoUint8.validate(data);
    this.data = CairoUint8.__processData(data);
  }

  /**
   * Turn an accepted input into its number, before the range is checked.
   *
   * Nothing here refuses a value : `validate` is what reads this number and decides. So an input
   * far outside the u8 range comes back untouched rather than raising.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {bigint} the number the input spells, of whatever size
   * @example
   * ```typescript
   * const result = CairoUint8.__processData('a');
   * // result = 97n
   * const result2 = CairoUint8.__processData('ab');
   * // result2 = 24930n     (past the u8 range, and returned all the same)
   * ```
   */
  static __processData(data: BigNumberish | boolean | unknown): bigint {
    if (isString(data) && isText(data)) {
      // Only allow text strings that represent valid UTF-8 byte sequences for specific use cases
      // For general numeric input validation, reject pure text strings
      // This maintains compatibility while being more restrictive for validation
      return utf8ToBigInt(data);
    }
    return BigInt(data as BigNumberish);
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoUint8(44).toApiRequest();
   * // result = ["44"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The value as a number.
   * @returns {bigint} the number this u8 holds
   * @example
   * ```typescript
   * const result = new CairoUint8(255).toBigInt();
   * // result = 255n
   * ```
   */
  toBigInt() {
    return this.data;
  }

  /**
   * Read the value back as the one UTF-8 byte it spells.
   *
   * Every u8 is a byte, so this always returns a character — including for values that were never
   * meant as text, and a NUL for 0.
   * @returns {string} the byte decoded as UTF-8
   * @example
   * ```typescript
   * const result = new CairoUint8('a').decodeUtf8();
   * // result = "a"
   * const result2 = new CairoUint8(44).decodeUtf8();
   * // result2 = ","     (44 is the code of a comma)
   * ```
   */
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }

  /**
   * The value in hexadecimal, without padding.
   * @returns {string} the number as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoUint8(44).toHexString();
   * // result = "0x2c"
   * const result2 = new CairoUint8(0).toHexString();
   * // result2 = "0x0"     (one digit, not "0x00")
   * ```
   */
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a u8.
   *
   * Four things are refused, each with its own message : a null or undefined value, an object or
   * an array, a number with a decimal part, and a value outside [0, 255]. A text string reaches
   * that last check as the number its bytes spell, so `'ab'` is refused for being out of range.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * CairoUint8.validate(44); // passes
   * CairoUint8.validate(256);
   * // throws Error("Value is out of u8 range [0, 255]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoUint8.__processData(data);
    assert(
      value >= RANGE_U8.min && value <= RANGE_U8.max,
      `Value is out of u8 range [${RANGE_U8.min}, ${RANGE_U8.max}]`
    );
  }

  /**
   * Can this value be carried by a u8?
   *
   * The non-throwing form of {@link CairoUint8.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a u8
   * @example
   * ```typescript
   * const result = CairoUint8.is('a');
   * // result = true     (97, the UTF-8 code of the character)
   * const result2 = CairoUint8.is('ab');
   * // result2 = false   (24930, past the u8 range)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoUint8.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::u8`
   * @example
   * ```typescript
   * const result = CairoUint8.isAbiType('core::integer::u8');
   * // result = true
   * const result2 = CairoUint8.isAbiType('core::integer::u16');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint8.abiSelector;
  }

  /**
   * Read one u8 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this u8
   * @returns {CairoUint8} the u8 that was read
   * @example
   * ```typescript
   * const response = ['0x2c'];
   * const result = CairoUint8.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 44n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint8 {
    return new CairoUint8(getNext(responseIterator));
  }
}
