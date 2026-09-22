/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext, isBigNumberish, isEmptyHex } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_I64, PRIME } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

/**
 * A Cairo `core::integer::i64` : a whole number in [-9223372036854775808, 9223372036854775807], carried in one felt252.
 *
 * The value is kept as a bigint, so the shape of the input does not survive — `7017280452245743464`,
 * `'7017280452245743464'` and `'0x6162636465666768'` give the same i64. A string that reads as text rather than as a
 * number is taken for its UTF-8 bytes, which is why `'abcdefgh'` is 7017280452245743464 and not a rejected input.
 *
 * A minus sign in front of a number is read as a sign, not as text : `'-5'` is -5, as `-5` and
 * `-5n` are. Only the signed integers read a string this way — for every other type, `'-5'` is
 * text, encoded or refused as such.
 *
 * An already built instance is **not** an accepted input : handed back to the constructor it is
 * seen as an object and refused. Inside the library it is `unwrapCairoScalar` that reduces an
 * instance to its number before an abi slot receives it.
 * @example
 * ```typescript
 * // the same value, reached four ways
 * new CairoInt64(7017280452245743464).toBigInt(); //     7017280452245743464n
 * new CairoInt64('7017280452245743464').toBigInt(); //   7017280452245743464n
 * new CairoInt64('0x6162636465666768').toBigInt(); // 7017280452245743464n
 * new CairoInt64('abcdefgh').toBigInt(); //    7017280452245743464n     the UTF-8 bytes of the text
 *
 * // a negative value, reached three ways
 * new CairoInt64(-5).toBigInt(); //     -5n
 * new CairoInt64('-5').toBigInt(); //   -5n
 * new CairoInt64('-0x5').toBigInt(); // -5n     a sign, not the text "-0x5"
 * ```
 */
export class CairoInt64 {
  /**
   * The value, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoInt64('0x6162636465666768').data;
   * // result = 7017280452245743464n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoInt64.abiSelector;
   * // result = "core::integer::i64"
   * ```
   */
  static abiSelector = 'core::integer::i64';

  /**
   * Build from a number, a string or a boolean, refusing anything out of the i64 range.
   *
   * A string is read as a number when it spells one — decimal or hexadecimal, with or without a
   * leading minus sign — and as UTF-8 text otherwise. Text therefore only fits here up to 8 ASCII
   * characters : one more already makes a number past 9223372036854775807.
   * @param {BigNumberish | boolean} data the value to carry, within [-9223372036854775808, 9223372036854775807]
   * @throws {Error} when the value is null, undefined, an object, a decimal number, `'0x'`, or out of range
   * @example
   * ```typescript
   * const result = new CairoInt64('abcdefgh').toApiRequest();
   * // result = ["7017280452245743464"]
   * const result2 = new CairoInt64('-5').toApiRequest();
   * // result2 = ["3618502788666131213697322783095070105623107215331596699973092056135872020476"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoInt64.validate(data);
    this.data = CairoInt64.__processData(data);
  }

  /**
   * Turn an accepted input into its number, before the range is checked.
   *
   * Nothing here refuses a value : `validate` is what reads this number and decides. So an input
   * far outside the i64 range comes back untouched rather than raising.
   *
   * A minus sign in front of a number makes it negative rather than text : `'-5'` and `'-0x5'` are
   * both -5. This holds for the signed integers only — for any other type, such a string is text.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {bigint} the number the input spells, of whatever size
   * @example
   * ```typescript
   * const result = CairoInt64.__processData('abcdefgh');
   * // result = 7017280452245743464n
   * const result2 = CairoInt64.__processData('abcdefghi');
   * // result2 = 1796423795774910326889n     (past the i64 range, and returned all the same)
   * const result3 = CairoInt64.__processData('-0x5');
   * // result3 = -5n     (a negative number, not the text "-0x5")
   * ```
   */
  static __processData(data: BigNumberish | boolean | unknown): bigint {
    // a sign in front of a number, and of a number only : '-' alone, '-abc' or '-0x' stay text.
    // The sign is applied after the conversion because BigInt reads '-5' but not '-0x5'
    if (isString(data) && data.startsWith('-') && isBigNumberish(data.slice(1))) {
      return -BigInt(data.slice(1));
    }
    if (isString(data) && isText(data)) {
      // a string that spells no number is text, taken for its UTF-8 bytes: 'a' is 97
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
   * const result = new CairoInt64(5000000000).toApiRequest();
   * // result = ["5000000000"]
   * const result2 = new CairoInt64(-5000000000).toApiRequest();
   * // result2 = ["3618502788666131213697322783095070105623107215331596699973092056130872020481"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The value as a number.
   * @returns {bigint} the number this i64 holds, negative included
   * @example
   * ```typescript
   * const result = new CairoInt64(-5000000000).toBigInt();
   * // result = -5000000000n
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
   * const result = new CairoInt64('abcdefgh').decodeUtf8();
   * // result = "abcdefgh"
   * ```
   */
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 2n ** 64n + this.data)
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
   * const result = new CairoInt64(5000000000).toHexString();
   * // result = "0x12a05f200"
   * const result2 = new CairoInt64(-5000000000).toHexString();
   * // result2 = "0x800000000000010fffffffffffffffffffffffffffffffffffffffed5fa0e01"
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
   * Throw unless the value can be carried by an i64.
   *
   * Five things are refused, each with its own message : a null or undefined value, an object or
   * an array, a number with a decimal part, `'0x'`, and a value outside [-9223372036854775808, 9223372036854775807]. A text string reaches
   * that last check as the number its bytes spell, so `'abcdefghi'` is refused for being out of range.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, an object, a decimal number, `'0x'`, or out of range
   * @example
   * ```typescript
   * CairoInt64.validate(5000000000); // passes
   * CairoInt64.validate(9223372036854775808);
   * // throws Error("Value is out of i64 range [-9223372036854775808, 9223372036854775807]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    assert(!isEmptyHex(data), "Invalid input: '0x' holds no hexadecimal digit");

    const value = CairoInt64.__processData(data);
    assert(
      value >= RANGE_I64.min && value <= RANGE_I64.max,
      `Value is out of i64 range [${RANGE_I64.min}, ${RANGE_I64.max}]`
    );
  }

  /**
   * Can this value be carried by an i64?
   *
   * The non-throwing form of {@link CairoInt64.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in an i64
   * @example
   * ```typescript
   * const result = CairoInt64.is('abcdefgh');
   * // result = true     (7017280452245743464, the UTF-8 bytes of the text)
   * const result2 = CairoInt64.is('abcdefghi');
   * // result2 = false   (1796423795774910326889, past the i64 range)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoInt64.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::i64`
   * @example
   * ```typescript
   * const result = CairoInt64.isAbiType('core::integer::i64');
   * // result = true
   * const result2 = CairoInt64.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoInt64.abiSelector;
  }

  /**
   * Read one i64 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values. A felt past half the prime is a negative number
   * written as its field element, and is brought back below zero here.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this i64
   * @returns {CairoInt64} the i64 that was read
   * @example
   * ```typescript
   * const response = ['0x12a05f200'];
   * const result = CairoInt64.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 5000000000n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt64 {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    // Convert from field element representation to signed value
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new CairoInt64(signedValue);
  }
}
