/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_I8, PRIME } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

/**
 * A Cairo `core::integer::i8` : a whole number in [-128, 127], carried in one felt252.
 *
 * The value is kept as a bigint, so the shape of the input does not survive — `97`,
 * `'97'` and `'0x61'` give the same i8. A string that reads as text rather than as a
 * number is taken for its UTF-8 bytes, which is why `'a'` is 97 and not a rejected input.
 *
 * An already built instance is **not** an accepted input : handed back to the constructor it is
 * seen as an object and refused. Inside the library it is `unwrapCairoScalar` that reduces an
 * instance to its number before an abi slot receives it.
 * @example
 * ```typescript
 * // the same value, reached four ways
 * new CairoInt8(97).toBigInt(); //     97n
 * new CairoInt8('97').toBigInt(); //   97n
 * new CairoInt8('0x61').toBigInt(); // 97n
 * new CairoInt8('a').toBigInt(); //    97n     the UTF-8 bytes of the text
 * ```
 */
export class CairoInt8 {
  /**
   * The value, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoInt8('0x61').data;
   * // result = 97n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoInt8.abiSelector;
   * // result = "core::integer::i8"
   * ```
   */
  static abiSelector = 'core::integer::i8';

  /**
   * Build from a number, a string or a boolean, refusing anything out of the i8 range.
   *
   * A string is read as a number when it spells one — decimal or hexadecimal — and as UTF-8 text
   * otherwise. Text therefore only fits here up to a single ASCII character : one more already
   * makes a number past 127.
   * @param {BigNumberish | boolean} data the value to carry, within [-128, 127]
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * const result = new CairoInt8('a').toApiRequest();
   * // result = ["97"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoInt8.validate(data);
    this.data = CairoInt8.__processData(data);
  }

  /**
   * Turn an accepted input into its number, before the range is checked.
   *
   * Nothing here refuses a value : `validate` is what reads this number and decides. So an input
   * far outside the i8 range comes back untouched rather than raising.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {bigint} the number the input spells, of whatever size
   * @example
   * ```typescript
   * const result = CairoInt8.__processData('a');
   * // result = 97n
   * const result2 = CairoInt8.__processData('ab');
   * // result2 = 24930n     (past the i8 range, and returned all the same)
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
   *
   * A negative value goes out as its field element, `PRIME + value`, which is what Cairo reads
   * back as the negative number.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoInt8(5).toApiRequest();
   * // result = ["5"]
   * const result2 = new CairoInt8(-5).toApiRequest();
   * // result2 = ["3618502788666131213697322783095070105623107215331596699973092056135872020476"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The value as a number.
   * @returns {bigint} the number this i8 holds, negative included
   * @example
   * ```typescript
   * const result = new CairoInt8(-5).toBigInt();
   * // result = -5n
   * ```
   */
  toBigInt() {
    return this.data;
  }

  /**
   * Read the value back as the UTF-8 text its bytes spell.
   *
   * Only a value that was text to begin with comes back as readable text. Any other number is
   * decoded all the same, and what it gives is whatever its bytes happen to mean — a
   * negative value is first wrapped to its two's complement, which rarely spells valid UTF-8 and
   * so comes back as replacement characters.
   * @returns {string} the bytes decoded as UTF-8
   * @example
   * ```typescript
   * const result = new CairoInt8('a').decodeUtf8();
   * // result = "a"
   * ```
   */
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 256n + this.data)
    );
  }

  /**
   * The value in hexadecimal, without padding.
   *
   * A negative value has no hexadecimal form of its own here : it is written as its field element,
   * `PRIME + value`, the positive number Cairo actually carries.
   * @returns {string} the number as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoInt8(5).toHexString();
   * // result = "0x5"
   * const result2 = new CairoInt8(-5).toHexString();
   * // result2 = "0x800000000000010fffffffffffffffffffffffffffffffffffffffffffffffc"
   * ```
   */
  toHexString() {
    const value = this.toBigInt();
    // For negative values, convert to field element representation
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }

  /**
   * Throw unless the value can be carried by an i8.
   *
   * Four things are refused, each with its own message : a null or undefined value, an object or
   * an array, a number with a decimal part, and a value outside [-128, 127]. A text string reaches
   * that last check as the number its bytes spell, so `'ab'` is refused for being out of range.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * CairoInt8.validate(5); // passes
   * CairoInt8.validate(128);
   * // throws Error("Value is out of i8 range [-128, 127]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoInt8.__processData(data);
    assert(
      value >= RANGE_I8.min && value <= RANGE_I8.max,
      `Value is out of i8 range [${RANGE_I8.min}, ${RANGE_I8.max}]`
    );
  }

  /**
   * Can this value be carried by an i8?
   *
   * The non-throwing form of {@link CairoInt8.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in an i8
   * @example
   * ```typescript
   * const result = CairoInt8.is('a');
   * // result = true     (97, the UTF-8 bytes of the text)
   * const result2 = CairoInt8.is('ab');
   * // result2 = false   (24930, past the i8 range)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoInt8.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::i8`
   * @example
   * ```typescript
   * const result = CairoInt8.isAbiType('core::integer::i8');
   * // result = true
   * const result2 = CairoInt8.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoInt8.abiSelector;
  }

  /**
   * Read one i8 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values. A felt past half the prime is a negative number
   * written as its field element, and is brought back below zero here.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this i8
   * @returns {CairoInt8} the i8 that was read
   * @example
   * ```typescript
   * const response = ['0x5'];
   * const result = CairoInt8.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 5n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt8 {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    // Convert from field element representation to signed value
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new CairoInt8(signedValue);
  }
}
