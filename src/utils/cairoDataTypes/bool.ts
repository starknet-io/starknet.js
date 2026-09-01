/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isBoolean } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';

/**
 * A Cairo `core::bool` : true or false, carried in one felt252 as 1 or 0.
 *
 * A boolean is the natural input, but the two numbers a bool occupies on the wire are accepted
 * too — `1`, `0n`, `'1'`, `'0x0'` — because that is how a bool comes back from a node, as a felt
 * rather than as a JS value. Any other number is refused : a bool is not a felt narrowed to a
 * range, it is exactly two values.
 *
 * On the request side the library is stricter still : `CallData.compile` runs `validateFields`
 * first, which requires a real boolean. So a `1` reaching a `core::bool` argument is refused there
 * before this class ever sees it.
 * @example
 * ```typescript
 * // the same value, reached three ways
 * new CairoBool(true).toBoolean(); //   true
 * new CairoBool(1).toBoolean(); //      true
 * new CairoBool('0x1').toBoolean(); //  true
 * ```
 */
export class CairoBool {
  /**
   * The value, always as a boolean.
   * @example
   * ```typescript
   * const result = new CairoBool('0x1').data;
   * // result = true
   * ```
   */
  data: boolean;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoBool.abiSelector;
   * // result = "core::bool"
   * ```
   */
  static abiSelector = 'core::bool';

  /**
   * Build from a boolean, or from the numbers 0 and 1.
   * @param {BigNumberish | boolean} data the value to carry : a boolean, 0 or 1
   * @throws {Error} when the value is text, is not a felt252 input, or is a number other than 0 or 1
   * @example
   * ```typescript
   * const result = new CairoBool(false).toApiRequest();
   * // result = ["0"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoBool.validate(data);
    this.data = CairoBool.__processData(data);
  }

  /**
   * Turn an accepted input into its boolean.
   *
   * Nothing here refuses a value : `validate` is what decides, and only a boolean, a 0 or a 1
   * reaches this point.
   * @param {BigNumberish | boolean} data the value to convert
   * @returns {boolean} the boolean the input spells
   * @example
   * ```typescript
   * const result = CairoBool.__processData('0x1');
   * // result = true
   * ```
   */
  static __processData(data: BigNumberish | boolean | unknown): boolean {
    if (isBoolean(data)) {
      return data;
    }
    return new CairoFelt252(data).toBigInt() === 1n;
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, `"1"` or `"0"`, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoBool(true).toApiRequest();
   * // result = ["1"]
   * const result2 = new CairoBool(false).toApiRequest();
   * // result2 = ["0"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([this.data ? '1' : '0']);
  }

  /**
   * The value as a boolean.
   * @returns {boolean} the boolean this bool holds
   * @example
   * ```typescript
   * const result = new CairoBool(1).toBoolean();
   * // result = true
   * ```
   */
  toBoolean(): boolean {
    return this.data;
  }

  /**
   * The value in hexadecimal, as the felt a bool occupies.
   * @returns {string} `"0x1"` for true, `"0x0"` for false
   * @example
   * ```typescript
   * const result = new CairoBool(true).toHexString();
   * // result = "0x1"
   * const result2 = new CairoBool(false).toHexString();
   * // result2 = "0x0"
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.data ? '1' : '0');
  }

  /**
   * Throw unless the value can be carried by a bool.
   *
   * Text is refused first, then the value is read as a felt252 — which is what refuses a null, an
   * object or an unsupported type — and finally checked to be one of the only two numbers a bool
   * can hold.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is text, is not a felt252 input, or is a number other than 0 or 1
   * @example
   * ```typescript
   * CairoBool.validate(true); // passes
   * CairoBool.validate(2);
   * // throws Error("Only values 0 or 1 are possible in a core::bool, received 2")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(!isText(data), 'Invalid input: a core::bool cannot be built from text');

    const value = new CairoFelt252(data).toBigInt();
    assert(
      value === 0n || value === 1n,
      `Only values 0 or 1 are possible in a core::bool, received ${value}`
    );
  }

  /**
   * Can this value be carried by a bool?
   *
   * The non-throwing form of {@link CairoBool.validate}, so it answers false for every input that
   * one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value is a boolean, a 0 or a 1
   * @example
   * ```typescript
   * const result = CairoBool.is(1);
   * // result = true
   * const result2 = CairoBool.is(2);
   * // result2 = false     (a bool is exactly two values)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoBool.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::bool`
   * @example
   * ```typescript
   * const result = CairoBool.isAbiType('core::bool');
   * // result = true
   * const result2 = CairoBool.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoBool.abiSelector;
  }

  /**
   * Read one bool off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this bool
   * @returns {CairoBool} the bool that was read
   * @example
   * ```typescript
   * const response = ['0x1'];
   * const result = CairoBool.factoryFromApiResponse(response.values()).toBoolean();
   * // result = true
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoBool {
    return new CairoBool(getNext(responseIterator));
  }
}
