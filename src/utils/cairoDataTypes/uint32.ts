/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { RANGE_U32 } from '../../global/constants';

/**
 * A Cairo `core::integer::u32` : a whole number in [0, 4294967295], carried in one felt252.
 *
 * The value is kept as a bigint, so the shape of the input does not survive — `1633837924`,
 * `'1633837924'` and `'0x61626364'` give the same u32. A string that reads as text rather than as a
 * number is taken for its UTF-8 bytes, which is why `'abcd'` is 1633837924 and not a rejected input.
 *
 * An already built instance is **not** an accepted input : handed back to the constructor it is
 * seen as an object and refused. Inside the library it is `unwrapCairoScalar` that reduces an
 * instance to its number before an abi slot receives it.
 * @example
 * ```typescript
 * // the same value, reached four ways
 * new CairoUint32(1633837924).toBigInt(); //     1633837924n
 * new CairoUint32('1633837924').toBigInt(); //   1633837924n
 * new CairoUint32('0x61626364').toBigInt(); // 1633837924n
 * new CairoUint32('abcd').toBigInt(); //    1633837924n     the UTF-8 bytes of the text
 * ```
 */
export class CairoUint32 {
  /**
   * The value, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoUint32('0x61626364').data;
   * // result = 1633837924n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoUint32.abiSelector;
   * // result = "core::integer::u32"
   * ```
   */
  static abiSelector = 'core::integer::u32';

  /**
   * Build from a number, a string or a boolean, refusing anything out of the u32 range.
   *
   * A string is read as a number when it spells one — decimal or hexadecimal — and as UTF-8 text
   * otherwise. Text therefore only fits here up to 4 ASCII characters : one more already
   * makes a number past 4294967295.
   * @param {BigNumberish | boolean} data the value to carry, within [0, 4294967295]
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * const result = new CairoUint32('abcd').toApiRequest();
   * // result = ["1633837924"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoUint32.validate(data);
    this.data = CairoUint32.__processData(data);
  }

  /**
   * Turn an accepted input into its number, before the range is checked.
   *
   * Nothing here refuses a value : `validate` is what reads this number and decides. So an input
   * far outside the u32 range comes back untouched rather than raising.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {bigint} the number the input spells, of whatever size
   * @example
   * ```typescript
   * const result = CairoUint32.__processData('abcd');
   * // result = 1633837924n
   * const result2 = CairoUint32.__processData('abcde');
   * // result2 = 418262508645n     (past the u32 range, and returned all the same)
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
   * const result = new CairoUint32(70000).toApiRequest();
   * // result = ["70000"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The value as a number.
   * @returns {bigint} the number this u32 holds
   * @example
   * ```typescript
   * const result = new CairoUint32(4294967295).toBigInt();
   * // result = 4294967295n
   * ```
   */
  toBigInt() {
    return this.data;
  }

  /**
   * Read the value back as the UTF-8 text its bytes spell.
   *
   * Only a value that was text to begin with comes back as readable text. Any other number is
   * decoded all the same, and what it gives is whatever its bytes happen to mean.
   * @returns {string} the bytes decoded as UTF-8
   * @example
   * ```typescript
   * const result = new CairoUint32('abcd').decodeUtf8();
   * // result = "abcd"
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
   * const result = new CairoUint32(70000).toHexString();
   * // result = "0x11170"
   * const result2 = new CairoUint32(0).toHexString();
   * // result2 = "0x0"     (one digit, not "0x00")
   * ```
   */
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a u32.
   *
   * Four things are refused, each with its own message : a null or undefined value, an object or
   * an array, a number with a decimal part, and a value outside [0, 4294967295]. A text string reaches
   * that last check as the number its bytes spell, so `'abcde'` is refused for being out of range.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * CairoUint32.validate(70000); // passes
   * CairoUint32.validate(4294967296);
   * // throws Error("Value is out of u32 range [0, 2^32)")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoUint32.__processData(data);
    assert(value >= RANGE_U32.min && value <= RANGE_U32.max, 'Value is out of u32 range [0, 2^32)');
  }

  /**
   * Can this value be carried by a u32?
   *
   * The non-throwing form of {@link CairoUint32.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a u32
   * @example
   * ```typescript
   * const result = CairoUint32.is('abcd');
   * // result = true     (1633837924, the UTF-8 bytes of the text)
   * const result2 = CairoUint32.is('abcde');
   * // result2 = false   (418262508645, past the u32 range)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoUint32.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::u32`
   * @example
   * ```typescript
   * const result = CairoUint32.isAbiType('core::integer::u32');
   * // result = true
   * const result2 = CairoUint32.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint32.abiSelector;
  }

  /**
   * Read one u32 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this u32
   * @returns {CairoUint32} the u32 that was read
   * @example
   * ```typescript
   * const response = ['0x11170'];
   * const result = CairoUint32.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 70000n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint32 {
    return new CairoUint32(getNext(responseIterator));
  }
}
