import { addHexPrefix, removeHexPrefix } from './encode';
import { isHex, isStringWholeNumber } from './num';

const TEXT_TO_FELT_MAX_LEN = 31;

export function isASCII(str: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

// function to check if string has less or equal 31 characters
export function isShortString(str: string) {
  return str.length <= TEXT_TO_FELT_MAX_LEN;
}

// function to check if string is a decimal
export function isDecimalString(decim: string): boolean {
  return /^[0-9]*$/i.test(decim);
}

/**
 * check if value is string text, and not string-hex, string-number
 * @param val any
 * @returns boolean
 */
export function isText(val: any) {
  return typeof val === 'string' && !isHex(val) && !isStringWholeNumber(val);
}

export const isShortText = (val: any) => isText(val) && isShortString(val);
export const isLongText = (val: any) => isText(val) && !isShortString(val);

export function splitLongString(longStr: string): string[] {
  const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, 'g');
  return longStr.match(regex) || [];
}

/**
 * Convert an ASCII string to an hexadecimal string.
 * @param str - ASCII string -
 * 31 characters maxi. Ex : "uri/item23.jpg"
 * @returns a string representing an Hex number 248 bits max.
 * @Example
 * ```typescript
 * const myEncodedString: string = encodeShortString("uri/pict/t38.jpg");
 * ```
 * returns : string : "0x7572692f706963742f7433382e6a7067"
 */
export function encodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
}

/**
 * Convert an hexadecimal or decimal string to an ASCII string.
 * @param str - string - representing a 248 bits max number.
 *
 * Ex : hex : "0x1A4F64EA56" or decimal : "236942575435676423"
 * @returns a string with 31 characters max.
 * @Example
 * ```typescript
 * const myDecodedString: string = decodeShortString("0x7572692f706963742f7433382e6a7067");
 * ```
 * return : string : "uri/pict/t38.jpg"
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
