import { base64 } from '@scure/base';

/* eslint-disable no-param-reassign */
export const IS_BROWSER = typeof window !== 'undefined';

const STRING_ZERO = '0';

/**
 * Some functions recreated from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
 * enc-utils is not a dependency to avoid using `Buffer` which only works in node and not browsers
 */

/**
 * Convert array buffer to string
 *
 * *[internal usage]*
 *
 * @param {ArrayBuffer} array The ArrayBuffer to convert to string.
 * @returns {string} The converted string.
 *
 * @example
 * ```typescript
 * const string = arrayBufferToString({0: 72, 1: 105});
 * console.log(string); // Outputs: 'Hi'
 * ```
 */
export function arrayBufferToString(array: ArrayBuffer): string {
  return new Uint8Array(array).reduce((data, byte) => data + String.fromCharCode(byte), '');
}

/**
 * Convert utf8-string to Uint8Array
 *
 * *[internal usage]*
 *
 * @param {string} str The UTF-8 string to convert.
 * @returns {Uint8Array} The encoded Uint8Array.
 *
 * @example
 * ```typescript
 * const myString = 'Hi';
 * const byteArray = utf8ToArray(myString);
 * console.log(byteArray); // Outputs: Uint8Array {0: 72, 1: 105}
 * ```
 */
export function utf8ToArray(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Convert utf8-string to Uint8Array
 *
 * @deprecated equivalent to 'utf8ToArray', alias will be removed
 */
export function stringToArrayBuffer(str: string): Uint8Array {
  return utf8ToArray(str);
}

/**
 * Convert string to array buffer (browser and node compatible)
 *
 * @param {string} a The Base64 encoded string to convert.
 * @returns {Uint8Array} The decoded Uint8Array.
 *
 * @example
 * ```typescript
 * const base64String = 'SGVsbG8='; // 'Hello' in Base64
 * const byteArray = atobUniversal(base64String);
 * console.log(byteArray); // Outputs: Uint8Array {0: 72, 1: 105, 2: 108, 3: 108, 4: 111}
 * ```
 */
export function atobUniversal(a: string): Uint8Array {
  return base64.decode(a);
}

/**
 * Convert array buffer to string (browser and node compatible)
 *
 * @param {Uint8Array} b The decoded Uint8Array.
 * @returns {string} The Base64 encoded string.
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const string = btoaUniversal(buffer);
 * console.log(string); // Outputs: SGVsbG8=
 * ```
 */
export function btoaUniversal(b: ArrayBuffer): string {
  return base64.encode(new Uint8Array(b));
}

/**
 * Convert array buffer to hex-string
 * @returns format: hex-string
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const hexString = buf2hex(buffer);
 * console.log(hexString); // Outputs: 48656c6c6f
 * ```
 */
export function buf2hex(buffer: Uint8Array) {
  return buffer.reduce((r, x) => r + x.toString(16).padStart(2, '0'), '');
}

/**
 * Remove hex prefix '0x' from hex-string
 * @param hex hex-string
 * @returns format: base16-string
 *
 * @example
 * ```typescript
 * const hexStringWithPrefix = '0x48656c6c6f';
 * const cleanedHexString = removeHexPrefix(hexStringWithPrefix);
 * console.log(cleanedHexString); // Outputs: 48656c6c6f
 * ```
 */
export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/i, '');
}

/**
 * Add hex prefix '0x' to base16-string
 * @param hex base16-string
 * @returns format: hex-string
 *
 * @example
 * ```typescript
 * const plainHexString = '48656c6c6f';
 * const hexStringWithPrefix = addHexPrefix(plainHexString);
 * console.log(hexStringWithPrefix); // Outputs: 0x48656c6c6f
 * ```
 */
export function addHexPrefix(hex: string): string {
  return `0x${removeHexPrefix(hex)}`;
}

/**
 * Prepend or append to string
 *
 * *[internal usage]*
 *
 * Pads a string to a certain length with a specific string.
 * The padding can be applied either to the left or the right of the input string.
 *
 * @param {string} str The string to pad.
 * @param {number} length The target length for the padded string.
 * @param {boolean} left Set to true to add padding to the left, false to add it to the right.
 * @param {string} [padding='0'] The string to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = 'hello';
 * const paddedLeft = padString(myString, 10, true);
 * console.log(paddedLeft); // Outputs: '00000hello'
 *
 * const paddedRight = padString(myString, 10, false);
 * console.log(paddedRight); // Outputs: 'hello00000'
 *
 * // Using a different padding character
 * const paddedCustom = padString(myString, 10, true, '1');
 * console.log(paddedCustom); // Outputs: '11111hello'
 * ```
 */
function padString(str: string, length: number, left: boolean, padding = STRING_ZERO): string {
  const diff = length - str.length;
  let result = str;
  if (diff > 0) {
    const pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }
  return result;
}

/**
 * Prepend string (default with '0')
 *
 * Pads a string to a certain length with a specific string.
 * The padding can be applied only to the left of the input string.
 *
 * @param {string} str The string to pad.
 * @param {number} length The target length for the padded string.
 * @param {string} [padding='0'] The string to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = 'hello';
 * const paddedLeft = padString(myString, 10);
 * console.log(paddedLeft); // Outputs: '00000hello'
 * ```
 */
export function padLeft(str: string, length: number, padding = STRING_ZERO): string {
  return padString(str, length, true, padding);
}

/**
 * Calculate byte length of string
 *
 * *[no internal usage]*
 *
 * Calculates the byte length of a string based on a specified byte size.
 * The function rounds up the byte count to the nearest multiple of the specified byte size.
 *
 * @param {string} str The string whose byte length is to be calculated.
 * @param {number} byteSize The size of the byte block to round up to. Defaults to 8.
 * @returns {number} The calculated byte length, rounded to the nearest multiple of byteSize.
 *
 * @example
 * ```typescript
 * const myString = 'Hello';
 * const byteLengthDefault = calcByteLength(myString);
 * console.log(byteLengthDefault); // Outputs: 8 (rounded up to the nearest multiple of 8)
 *
 * const byteLength4 = calcByteLength(myString, 4);
 * console.log(byteLength4); // Outputs: 8 (rounded up to the nearest multiple of 4)
 *
 * const byteLength10 = calcByteLength(myString, 10);
 * console.log(byteLength10); // Outputs: 10 (rounded up to the nearest multiple of 10)
 * ```
 */
export function calcByteLength(str: string, byteSize = 8): number {
  const { length } = str;
  const remainder = length % byteSize;
  return remainder ? ((length - remainder) / byteSize) * byteSize + byteSize : length;
}

/**
 * Prepend '0' to string bytes
 *
 * *[no internal usage]*
 *
 *
 * * Prepends padding to the left of a string to ensure it matches a specific byte length.
 * The function uses a specified padding character and rounds up the string length to the nearest multiple of `byteSize`.
 *
 * @param {string} str The string to be padded.
 * @param {number} byteSize The byte block size to which the string length should be rounded up. Defaults to 8.
 * @param {string} padding The character to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = '123';
 * const sanitizedString = sanitizeBytes(myString);
 * console.log(sanitizedString); // Outputs: '00000123' (padded to 8 characters)
 * ```
 */
export function sanitizeBytes(str: string, byteSize = 8, padding = STRING_ZERO): string {
  return padLeft(str, calcByteLength(str, byteSize), padding);
}

/**
 * Prepend '0' to hex-string bytes
 *
 * *[no internal usage]*
 * @param hex hex-string
 * @returns format: hex-string
 *
 * @example
 * ```typescript
 * const unevenHex = '0x23abc';
 * const formattedHex = sanitizeHex(unevenHex);
 * console.log(formattedHex); // Outputs: '0x023abc' (padded to ensure even length)
 * ```
 */
export function sanitizeHex(hex: string): string {
  hex = removeHexPrefix(hex);
  hex = sanitizeBytes(hex, 2);
  if (hex) {
    hex = addHexPrefix(hex);
  }
  return hex;
}

/**
 * String transformation util
 *
 * Pascal case to screaming snake case
 *
 * @param {string} text The PascalCase string to convert.
 * @returns {string} The converted snake_case string in uppercase.
 *
 * @example
 * ```typescript
 * const pascalString = 'PascalCaseExample';
 * const snakeString = pascalToSnake(pascalString);
 * console.log(snakeString); // Outputs: 'PASCAL_CASE_EXAMPLE'
 *
 * const nonPascalString = 'Already_snake_or_lowercase';
 * const unchangedString = pascalToSnake(nonPascalString);
 * console.log(unchangedString); // Outputs: 'ALREADY_SNAKE_OR_LOWERCASE'
 * ```
 */
export const pascalToSnake = (text: string) =>
  /[a-z]/.test(text)
    ? text
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase()
    : text;
