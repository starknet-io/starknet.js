/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_U96 } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

/**
 * A Cairo `core::integer::u96` : a whole number in [0, 79228162514264337593543950335], carried in one felt252.
 *
 * The value is kept as a bigint, so the shape of the input does not survive — `30138990049255557934854335340`,
 * `'30138990049255557934854335340'` and `'0x6162636465666768696a6b6c'` give the same u96. A string that reads as text rather than as a
 * number is taken for its UTF-8 bytes, which is why `'abcdefghijkl'` is 30138990049255557934854335340 and not a rejected input.
 *
 * An already built instance is **not** an accepted input : handed back to the constructor it is
 * seen as an object and refused. Inside the library it is `unwrapCairoScalar` that reduces an
 * instance to its number before an abi slot receives it.
 * @example
 * ```typescript
 * // the same value, reached four ways
 * new CairoUint96(30138990049255557934854335340).toBigInt(); //     30138990049255557934854335340n
 * new CairoUint96('30138990049255557934854335340').toBigInt(); //   30138990049255557934854335340n
 * new CairoUint96('0x6162636465666768696a6b6c').toBigInt(); // 30138990049255557934854335340n
 * new CairoUint96('abcdefghijkl').toBigInt(); //    30138990049255557934854335340n     the UTF-8 bytes of the text
 * ```
 */
export class CairoUint96 {
  /**
   * The value, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoUint96('0x6162636465666768696a6b6c').data;
   * // result = 30138990049255557934854335340n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoUint96.abiSelector;
   * // result = "core::integer::u96"
   * ```
   */
  static abiSelector = 'core::integer::u96';

  /**
   * The name a compiled abi actually gives this type.
   *
   * Cairo has no `u96` of its own : it is a bounded integer, and the compiler writes it out as its
   * bounds. So {@link CairoUint96.abiSelector} above is the name one would expect and never meets,
   * while this is the one a contract emits — both are recognized, here and in the parsing strategy.
   * @example
   * ```typescript
   * const result = CairoUint96.abiSelectorBoundedInt;
   * // result = "core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>"
   * ```
   */
  static abiSelectorBoundedInt =
    'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>';

  /**
   * Build from a number, a string or a boolean, refusing anything out of the u96 range.
   *
   * A string is read as a number when it spells one — decimal or hexadecimal — and as UTF-8 text
   * otherwise. Text therefore only fits here up to 12 ASCII characters : one more already
   * makes a number past 79228162514264337593543950335.
   * @param {BigNumberish | boolean} data the value to carry, within [0, 79228162514264337593543950335]
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * const result = new CairoUint96('abcdefghijkl').toApiRequest();
   * // result = ["30138990049255557934854335340"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoUint96.validate(data);
    this.data = CairoUint96.__processData(data);
  }

  /**
   * Turn an accepted input into its number, before the range is checked.
   *
   * Nothing here refuses a value : `validate` is what reads this number and decides. So an input
   * far outside the u96 range comes back untouched rather than raising.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {bigint} the number the input spells, of whatever size
   * @example
   * ```typescript
   * const result = CairoUint96.__processData('abcdefghijkl');
   * // result = 30138990049255557934854335340n
   * const result2 = CairoUint96.__processData('abcdefghijklm');
   * // result2 = 7715581452609422831322709847149n     (past the u96 range, and returned all the same)
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
   * const result = new CairoUint96(5000000000).toApiRequest();
   * // result = ["5000000000"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The value as a number.
   * @returns {bigint} the number this u96 holds
   * @example
   * ```typescript
   * const result = new CairoUint96(79228162514264337593543950335).toBigInt();
   * // result = 79228162514264337593543950335n
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
   * const result = new CairoUint96('abcdefghijkl').decodeUtf8();
   * // result = "abcdefghijkl"
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
   * const result = new CairoUint96(5000000000).toHexString();
   * // result = "0x12a05f200"
   * const result2 = new CairoUint96(0).toHexString();
   * // result2 = "0x0"     (one digit, not "0x00")
   * ```
   */
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a u96.
   *
   * Four things are refused, each with its own message : a null or undefined value, an object or
   * an array, a number with a decimal part, and a value outside [0, 79228162514264337593543950335]. A text string reaches
   * that last check as the number its bytes spell, so `'abcdefghijklm'` is refused for being out of range.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is null, undefined, an object, a decimal number, or out of range
   * @example
   * ```typescript
   * CairoUint96.validate(5000000000); // passes
   * CairoUint96.validate(79228162514264337593543950336);
   * // throws Error("Value is out of u96 range [0, 79228162514264337593543950335]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoUint96.__processData(data);
    assert(
      value >= RANGE_U96.min && value <= RANGE_U96.max,
      `Value is out of u96 range [${RANGE_U96.min}, ${RANGE_U96.max}]`
    );
  }

  /**
   * Can this value be carried by a u96?
   *
   * The non-throwing form of {@link CairoUint96.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a u96
   * @example
   * ```typescript
   * const result = CairoUint96.is('abcdefghijkl');
   * // result = true     (30138990049255557934854335340, the UTF-8 bytes of the text)
   * const result2 = CairoUint96.is('abcdefghijklm');
   * // result2 = false   (7715581452609422831322709847149, past the u96 range)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoUint96.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   *
   * Both names answer true : the one a reader would write, and the bounded-integer form a compiled
   * abi actually carries. Only the second is ever met in the wild.
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::integer::u96` and for its bounded-integer name
   * @example
   * ```typescript
   * const result = CairoUint96.isAbiType('core::integer::u96');
   * // result = true
   * const result2 = CairoUint96.isAbiType(
   *   'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>'
   * );
   * // result2 = true     the name a contract emits
   * const result3 = CairoUint96.isAbiType('core::felt252');
   * // result3 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint96.abiSelector || abiType === CairoUint96.abiSelectorBoundedInt;
  }

  /**
   * Read one u96 off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this u96
   * @returns {CairoUint96} the u96 that was read
   * @example
   * ```typescript
   * const response = ['0x12a05f200'];
   * const result = CairoUint96.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 5000000000n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint96 {
    return new CairoUint96(getNext(responseIterator));
  }
}
