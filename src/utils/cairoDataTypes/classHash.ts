import { BigNumberish, Literal } from '../../types';
import { RANGE_CLASS_HASH } from '../../global/constants';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isBigInt, isNumber } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';

/**
 * A Cairo `core::starknet::class_hash::ClassHash` : the hash identifying a declared class.
 *
 * On the wire it is a field element like any other, so what this class adds over
 * {@link CairoFelt252} is the bound of the Cairo `ClassHash` type : [0, 2^251), the same range as
 * the Cairo type of an address, and narrower than the field. The 252-bit bound the RPC spec states
 * is looser, and never the one that binds.
 *
 * A number, a bigint, a decimal string and a hexadecimal string are all read as the same number.
 * Text is **not** an accepted input : a class hash spelled as words is a mistake, not a value.
 * @example
 * ```typescript
 * // the same hash, reached three ways
 * new CairoClassHash('0x1234').toBigInt(); // 4660n
 * new CairoClassHash(4660).toBigInt(); //    4660n
 * new CairoClassHash('4660').toBigInt(); //  4660n
 * ```
 */
export class CairoClassHash {
  /**
   * The hash, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoClassHash('0x1234').data;
   * // result = 4660n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoClassHash.abiSelector;
   * // result = "core::starknet::class_hash::ClassHash"
   * ```
   */
  static abiSelector = Literal.ClassHash;

  /**
   * Build from a number or a numeric string, refusing text and anything outside the ClassHash range.
   * @param {BigNumberish | boolean} data the hash to carry, within [0, 2^251 - 1]
   * @throws {Error} when the value is text, a decimal number, not a felt252 input, or out of the ClassHash range
   * @example
   * ```typescript
   * const result = new CairoClassHash('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoClassHash.validate(data);
    this.data = new CairoFelt252(data).toBigInt();
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoClassHash('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([this.toBigInt().toString()]);
  }

  /**
   * The hash as a number.
   * @returns {bigint} the number this hash holds
   * @example
   * ```typescript
   * const result = new CairoClassHash('0x1234').toBigInt();
   * // result = 4660n
   * ```
   */
  toBigInt(): bigint {
    return this.data;
  }

  /**
   * The hash in hexadecimal, without padding.
   *
   * The 64 hex digits a class hash is usually written with are not restored here : leading zeros
   * are dropped, as they are everywhere else in the library.
   * @returns {string} the hash as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoClassHash(4660).toHexString();
   * // result = "0x1234"
   * const result2 = new CairoClassHash('0x0034').toHexString();
   * // result2 = "0x34"     (four digits in, two out)
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a ClassHash.
   *
   * Text is refused first, then a number with a decimal part. A number or a bigint is read as it
   * is, so that a negative one reaches the range check. Anything else is read as a felt252 — which
   * is what refuses a null, an object or an unsupported type. The value is finally checked against
   * the range of the Cairo `ClassHash` type, [0, 2^251), which is narrower than the field.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is text, a decimal number, not a felt252 input, or out of the ClassHash range
   * @example
   * ```typescript
   * CairoClassHash.validate('0x1234'); // passes
   * CairoClassHash.validate('abc');
   * // throws Error("Invalid input: a ClassHash cannot be built from text")
   * CairoClassHash.validate(2n ** 251n);
   * // throws Error("Value is out of ClassHash range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]")
   * CairoClassHash.validate(-1);
   * // throws Error("Value is out of ClassHash range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(!isText(data), 'Invalid input: a ClassHash cannot be built from text');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    // a number is read here rather than by CairoFelt252, which would refuse a negative one before
    // the range below is checked, and in the words of its encoding rather than of a class hash
    const value =
      isNumber(data) || isBigInt(data) ? BigInt(data) : new CairoFelt252(data).toBigInt();
    assert(
      value >= RANGE_CLASS_HASH.min && value <= RANGE_CLASS_HASH.max,
      `Value is out of ClassHash range [${RANGE_CLASS_HASH.min}, ${RANGE_CLASS_HASH.max}]`
    );
  }

  /**
   * Can this value be carried by a ClassHash?
   *
   * The non-throwing form of {@link CairoClassHash.validate}, so it answers false for every input
   * that one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a ClassHash
   * @example
   * ```typescript
   * const result = CairoClassHash.is('0x1234');
   * // result = true
   * const result2 = CairoClassHash.is('abc');
   * // result2 = false     (text, not a number)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoClassHash.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::starknet::class_hash::ClassHash`
   * @example
   * ```typescript
   * const result = CairoClassHash.isAbiType('core::starknet::class_hash::ClassHash');
   * // result = true
   * const result2 = CairoClassHash.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoClassHash.abiSelector;
  }

  /**
   * Read one ClassHash off a contract response, advancing the iterator past it.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this hash
   * @returns {CairoClassHash} the hash that was read
   * @example
   * ```typescript
   * const response = ['0x1234'];
   * const result = CairoClassHash.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 4660n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoClassHash {
    return new CairoClassHash(getNext(responseIterator));
  }
}
