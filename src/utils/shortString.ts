import { TEXT_TO_FELT_MAX_LEN } from '../global/constants';
import { isHex, isStringWholeNumber } from './num';
import { isString } from './typed';

/**
 * Test if string contains only ASCII characters (string can be ascii text)
 * @param {string} str The string to test
 * @returns {boolean} Returns true if the string contains only ASCII characters, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isASCII("Hello, world!");
 * // result = true
 * const result = shortString.isASCII("Hello, 世界!");
 * // result = false
 * ```
 */
export function isASCII(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Test if a string is a Cairo short string (string with less or equal 31 characters)
 * @param {string} str the string to test
 * @returns {boolean} Returns true if the string has less than or equal to 31 characters, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isShortString("Hello, world!");
 * // result = true
 * ```
 */
export function isShortString(str: string): boolean {
  return str.length <= TEXT_TO_FELT_MAX_LEN;
}

/**
 * Test if string contains only numbers (string can be converted to decimal integer number)
 * @param {string} str the string to test.
 * @returns {boolean} Returns true if the string contains only numbers, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isDecimalString("12345");
 * // result = true
 * const result = shortString.isDecimalString("12a45");
 * // result = false
 * ```
 */
export function isDecimalString(str: string): boolean {
  return /^[0-9]*$/i.test(str);
}

/**
 * Test if value is a pure string text, and not a hex string or number string
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a free-form string text, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isText("Hello, world!");
 * // result = true
 * const result = shortString.isText("0x7aec92f706");
 * // result = false
 * ```
 */
export function isText(val: any): val is string {
  return isString(val) && !isHex(val) && !isStringWholeNumber(val);
}

/**
 * Test if value is short text
 * @param {any} val - The item to test
 * @returns {boolean} Returns true if the value is a short text (string has less or equal 31 characters), otherwise false
 * @example
 * ```typescript
 * const result = shortString.isShortText("Hello, world!");
 * // result = true
 * ```
 */
export const isShortText = (val: any): boolean => isText(val) && isShortString(val);

/**
 * Test if value is long text
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a long text(string has more than 31 characters), otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isLongText("Hello, world! this is some random long string to enable you test isLongText function.");
 * // result = true
 * ```
 */
export const isLongText = (val: any): boolean => isText(val) && !isShortString(val);

/**
 * Split long text (string greater than 31 characters) into short strings (string lesser or equal 31 characters)
 * @param {string} longStr the long text (string greater than 31 characters) to split
 * @returns {string[]} an array of short strings (string lesser or equal 31 characters).
 * @example
 * ```typescript
 * const result = shortString.splitLongString("Hello, world! we just testing splitLongString function.");
 * // result = [ 'Hello, world! we just testing s', 'plitLongString function.' ]
 * ```
 */
export function splitLongString(longStr: string): string[] {
  const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, 'g');
  return longStr.match(regex) || [];
}
