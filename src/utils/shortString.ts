import { TEXT_TO_FELT_MAX_LEN } from '../constants';
import { addHexPrefix, removeHexPrefix } from './encode';
import { isHex, isStringWholeNumber } from './num';

/**
 * Test if string contains only ASCII characters (string can be ascii text)
 * @param str - The string to test.
 * @returns Returns true if the string contains only ASCII characters, otherwise false.
 * @example
 * ```typescript
 * const isAscii: boolean = isASCII("Hello, world!");
 * // isAscii = true
 * ```
 */
export function isASCII(str: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Test if string is a Cairo short string (string has less or equal 31 characters)
 * @param str - The string to test.
 * @returns Returns true if the string has less than or equal to 31 characters, otherwise false.
 * @example
 * ```typescript
 * const isShort: boolean = isShortString("Hello, world!");
 * // isShort = true
 * 
 * const isShortFalse: boolean = isShortString("Hello, world! this is some random long string to enable you test the isShortString function.");
 * // isShortFalse = false
 * ```
 */
export function isShortString(str: string) {
  return str.length <= TEXT_TO_FELT_MAX_LEN;
}

/**
 * Test if string contains only numbers (string can be converted to decimal number)
 * @param str - The string to test.
 * @returns Returns true if the string contains only numbers, otherwise false.
 * @example
 * ```typescript
 * const isDecimalTrue: boolean = isDecimalString("12345");
 * // isDecimalTrue = true
 * 
 * const isDecimalFalse: boolean = isDecimalString("12a45");
 * // isDecimalFalse = false
 * ```
 */
export function isDecimalString(str: string): boolean {
  return /^[0-9]*$/i.test(str);
}

/**
 * Checks if a given value is a string.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} - Returns true if the value is a string, false otherwise.
 * @example
 * ```typescript
 * const isStringTrue: boolean = isString("Hello, world!");
 * // isStringTrue = true
 * 
 * const isStringFalse: boolean = isString(123);
 * // isStringFalse = false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Test if value is a free-from string text, and not a hex string or number string
 * @param val - The value to test.
 * @returns Returns true if the value is a free-form string text, otherwise false.
 * @example
 * ```typescript
 * const isTextTrue: boolean = isText("Hello, world!");
 * // isTextTrue = true
 * 
 * const isTextFalse: boolean = isText("0x7572692f706963742f7433382e6a7067")
 * // isTextFalse = false
 * ```
 */
export function isText(val: any) {
  return isString(val) && !isHex(val) && !isStringWholeNumber(val);
}

/**
 * Test if value is short text
 * @param val - The value to test.
 * @returns Returns true if the value is a short text, otherwise false.
 * @example
 * ```typescript
 * const isShortTextTrue: boolean = isShortText("Hello, world!");
 * // isShortTextTrue = true
 * 
 * const isShortTextFalse: boolean = isShortText(Hello, world! this is some random long string to enable you test isShortText function.)
 * // isShortTextFalse = false
 * ```
 */
export const isShortText = (val: any) => isText(val) && isShortString(val);

/**
 * Test if value is long text
 * @param val - The value to test.
 * @returns Returns true if the value is a long text, otherwise false.
 * @example
 * ```typescript
 * const isLongTextTrue = isLongText("Hello, world! this is some random long string to enable you test isLongText function.")
 * // isLongTextTrue = true
 * 
 * const isLongTextFalse: boolean = isLongText("Hello, world!");
 * // isLongTextFalse = false
 * ```
 */
export const isLongText = (val: any) => isText(val) && !isShortString(val);

/**
 * Split long text into short strings
 * @param longStr - The long text to split.
 * @returns An array of short strings.
 * @example
 * ```typescript
 * const shortStrings: string[] = splitLongString("Hello, world! we just testing splitLongString function.")
 * // shortStrings = ["Hello, world!"," we just testing splitLongString function."]
 * ```
 */
export function splitLongString(longStr: string): string[] {
  const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, 'g');
  return longStr.match(regex) || [];
}

/**
 * Convert an ASCII string to a hexadecimal string.
 * @param str short string (ASCII string, 31 characters max)
 * @returns format: hex-string; 248 bits max
 * @example
 * ```typescript
 * const myEncodedString: string = encodeShortString("uri/pict/t38.jpg");
 * // return hex string (ex."0x7572692f706963742f7433382e6a7067")
 * ```
 */
export function encodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
}

/**
 * Convert a hexadecimal or decimal string to an ASCII string.
 * @param str representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423")
 * @returns format: short string; 31 characters max
 * @example
 * ```typescript
 * const myDecodedString: string = decodeShortString("0x7572692f706963742f7433382e6a7067");
 * // return string (ex."uri/pict/t38.jpg")
 * ```
 */
export function decodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (isHex(str)) {
    return removeHexPrefix(str).replace(/.{2}/g, (hex) => String.fromCharCode(parseInt(hex, 16)));
  }
  if (isDecimalString(str)) {
    return decodeShortString('0X'.concat(BigInt(str).toString(16)));
  }
  throw new Error(`${str} is not Hex or decimal`);
}
