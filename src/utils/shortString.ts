import { TEXT_TO_FELT_MAX_LEN } from '../constants';
import { addHexPrefix, removeHexPrefix } from './encode';
import { isHex, isStringWholeNumber } from './num';

/**
 * Test is string containing ASCII characters only (string can be ascii text)
 * @param str string
 * @returns boolean
 */
export function isASCII(str: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Test is string Cairo short string (string has less or equal 31 characters)
 * @param str string
 * @returns boolean
 */
export function isShortString(str: string) {
  return str.length <= TEXT_TO_FELT_MAX_LEN;
}

/**
 * Test is string containing decimal numbers only (string can be converted to decimal number)
 * @param str string
 * @returns boolean
 */
export function isDecimalString(str: string): boolean {
  return /^[0-9]*$/i.test(str);
}

/**
 * Test is value string text, and not string-hex, string-number
 * @param val any
 * @returns boolean
 */
export function isText(val: any) {
  return typeof val === 'string' && !isHex(val) && !isStringWholeNumber(val);
}

/**
 * Test is value short text
 * @param val any
 * @returns boolean
 */
export const isShortText = (val: any) => isText(val) && isShortString(val);

/**
 * Test is value long text
 * @param val any
 * @returns boolean
 */
export const isLongText = (val: any) => isText(val) && !isShortString(val);

/**
 * Split long text into short strings
 * @param longStr string
 * @returns string[]
 */
export function splitLongString(longStr: string): string[] {
  const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, 'g');
  return longStr.match(regex) || [];
}

/**
 * Convert an ASCII string to an hexadecimal string.
 * @param str string - short string (ASCII string 31 characters max)
 * @returns a string representing an Hex number 248 bits max.
 * @Example
 * ```typescript
 * const myEncodedString: string = encodeShortString("uri/pict/t38.jpg");
 * ```
 * return hex string (ex."0x7572692f706963742f7433382e6a7067")
 */
export function encodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
}

/**
 * Convert an hexadecimal or decimal string to an ASCII string.
 * @param str string - representing a 248 bits max number. (ex."0x1A4F64EA56" or "236942575435676423")
 * @returns string - short string (a string with 31 characters max.)
 * @Example
 * ```typescript
 * const myDecodedString: string = decodeShortString("0x7572692f706963742f7433382e6a7067");
 * ```
 * return string (ex."uri/pict/t38.jpg")
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
