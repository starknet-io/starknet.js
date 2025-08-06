import { base64 } from '@scure/base';

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
 * const buffer = new ArrayBuffer(5);
 * const view = new Uint8Array(buffer);
 * [72, 101, 108, 108, 111].forEach((x, idx) => view[idx] = x);
 * const result = encode.arrayBufferToString(buffer);
 * // result = "Hello"
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
 * const result = encode.utf8ToArray(myString);
 * // result = Uint8Array(2) [ 72, 105 ]
 * ```
 */
export function utf8ToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * @deprecated use utf8ToUint8Array instead
 */
export const utf8ToArray = utf8ToUint8Array;

/**
 * Convert string to array buffer (browser and node compatible)
 *
 * @param {string} a The Base64 encoded string to convert.
 * @returns {Uint8Array} The decoded Uint8Array.
 *
 * @example
 * ```typescript
 * const base64String = 'SGVsbG8='; // 'Hello' in Base64
 * const result = encode.atobUniversal(base64String);
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 * ```
 */
export function atobUniversal(a: string): Uint8Array {
  return base64.decode(a);
}

/**
 * Convert array buffer to string (browser and node compatible)
 *
 * @param {ArrayBuffer} b The Array buffer.
 * @returns {string} The Base64 encoded string.
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.btoaUniversal(buffer);
 * // result = "SGVsbG8="
 * ```
 */
export function btoaUniversal(b: ArrayBuffer): string {
  return base64.encode(new Uint8Array(b));
}

/**
 * Convert array buffer to hex-string
 *
 * @param {Uint8Array} buffer The encoded Uint8Array.
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.buf2hex(buffer);
 * // result = "48656c6c6f"
 * ```
 */
export function buf2hex(buffer: Uint8Array): string {
  return buffer.reduce((r, x) => r + x.toString(16).padStart(2, '0'), '');
}

/**
 * Remove hex prefix '0x' from hex-string
 * @param hex hex-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const hexStringWithPrefix = '0x48656c6c6f';
 * const result = encode.removeHexPrefix(hexStringWithPrefix);
 * // result: "48656c6c6f"
 * ```
 */
export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/i, '');
}

/**
 * Add hex prefix '0x' to base16-string
 * @param hex base16-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const plainHexString = '48656c6c6f';
 * const result = encode.addHexPrefix(plainHexString);
 * // result: "0x48656c6c6f"
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
 * const result = padString(myString, 10, true);
 * // result = '00000hello'
 * ```
 */
function padString(
  str: string,
  length: number,
  left: boolean,
  padding: string = STRING_ZERO
): string {
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
 * @example
 * ```typescript
 * const myString = '1A3F';
 * const result = encode.padLeft(myString, 10);
 * // result: '0000001A3F'
 * ```
 */
export function padLeft(str: string, length: number, padding: string = STRING_ZERO): string {
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
 * @param {number} [byteSize='8'] The size of the byte block to round up to. Defaults to 8.
 * @returns {number} The calculated byte length, rounded to the nearest multiple of byteSize.
 *
 * @example
 * ```typescript
 * const myString = 'Hello';
 * const result = encode.calcByteLength(myString, 4);
 * // result = 8 (rounded up to the nearest multiple of 4)
 *
 * ```
 */
export function calcByteLength(str: string, byteSize: number = 8): number {
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
 * @param {number} [byteSize='8'] The byte block size to which the string length should be rounded up. Defaults to 8.
 * @param {string} [padding='0'] The character to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = '123';
 * const result = encode.sanitizeBytes(myString);
 * // result: '00000123' (padded to 8 characters)
 * ```
 */
export function sanitizeBytes(
  str: string,
  byteSize: number = 8,
  padding: string = STRING_ZERO
): string {
  return padLeft(str, calcByteLength(str, byteSize), padding);
}

/**
 * Sanitizes a hex-string by removing any existing '0x' prefix, padding the string with '0' to ensure it has even length,
 * and then re-adding the '0x' prefix.
 *
 * *[no internal usage]*
 * @param {string} hex hex-string
 * @returns {string} format: hex-string
 *
 * @example
 * ```typescript
 * const unevenHex = '0x23abc';
 * const result = encode.sanitizeHex(unevenHex);
 * // result = '0x023abc' (padded to ensure even length)
 * ```
 */
export function sanitizeHex(hex: string): string {
  const hexWithoutPrefix = removeHexPrefix(hex);
  const sanitizedHex = sanitizeBytes(hexWithoutPrefix, 2);
  return sanitizedHex ? addHexPrefix(sanitizedHex) : sanitizedHex;
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
 * const result = encode.pascalToSnake(pascalString);
 * // result: 'PASCAL_CASE_EXAMPLE'
 * ```
 */
export const pascalToSnake = (text: string): string =>
  /[a-z]/.test(text)
    ? text
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase()
    : text;

/**
 * Combine multiple Uint8Arrays into one.
 * Useful for wallet path creation.
 * @param {Uint8Array[]} uint8arrays An array of Uint8Array.
 * @returns {Uint8Array} all the Uint8Arrays joined.
 * @example
 * ```typescript
 * const path0buff = new Uint8Array([128, 0, 10, 85]);
 * const path1buff = new Uint8Array([71, 65, 233, 201]);
 * const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
 * // result = Uint8Array(8) [128, 0, 10, 85, 71, 65, 233, 201]
 * ```
 */
export function concatenateArrayBuffer(uint8arrays: Uint8Array[]): Uint8Array {
  const totalLength = uint8arrays.reduce((total, uint8array) => total + uint8array.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  uint8arrays.forEach((uint8array) => {
    result.set(uint8array, offset);
    offset += uint8array.byteLength;
  });
  return result;
}

/**
 * Convert hex string to Uint8Array
 *
 * @param {string} hex The hex string to convert (with or without '0x' prefix)
 * @returns {Uint8Array} The converted byte array
 * @throws {Error} If the string contains non-hexadecimal characters
 *
 * @example
 * ```typescript
 * const hexString = '0x48656c6c6f';
 * const result = encode.hexStringToUint8Array(hexString);
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 * ```
 */
export function hexStringToUint8Array(hex: string): Uint8Array {
  // Remove 0x prefix if present
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;

  // Validate hex string (only 0-9, a-f, A-F allowed)
  if (cleanHex.length > 0 && !/^[0-9a-fA-F]+$/.test(cleanHex)) {
    throw new Error(`Invalid hex string: "${hex}" contains non-hexadecimal characters`);
  }

  // Pad to even length
  const paddedHex = cleanHex.length % 2 !== 0 ? `0${cleanHex}` : cleanHex;
  // Create Uint8Array directly
  const bytes = new Uint8Array(paddedHex.length / 2);
  for (let i = 0; i < paddedHex.length; i += 2) {
    bytes[i / 2] = parseInt(paddedHex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Check if string is a hex string (starts with 0x/0X followed by hex digits)
 * @param hex string to check
 * @returns true if hex string
 */
function isHexString(hex: string): boolean {
  return /^0[xX][0-9a-fA-F]*$/.test(hex);
}

/**
 * Check if string contains only decimal digits
 * @param str string to check
 * @returns true if decimal string
 */
function isDecimalString(str: string): boolean {
  return /^[0-9]+$/.test(str);
}

/**
 * Convert any string to Uint8Array
 *
 * Handles three types of strings:
 * - Hex strings (e.g., '0x123f') - converts hex bytes to Uint8Array
 * - Decimal strings (e.g., '124324332') - converts decimal number to bytes
 * - Text strings (e.g., 'I am cool ☥') - converts UTF-8 text to bytes
 *
 * @param {string} str The string to convert
 * @returns {Uint8Array} The converted byte array
 *
 * @example
 * ```typescript
 * // Hex string
 * const hex = stringToUint8Array('0x48656c6c6f');
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 *
 * // Decimal string
 * const decimal = stringToUint8Array('256');
 * // result = Uint8Array(2) [ 1, 0 ]
 *
 * // Text string
 * const text = stringToUint8Array('Hello ☥');
 * // result = UTF-8 encoded bytes
 * ```
 */
export function stringToUint8Array(str: string): Uint8Array {
  // Check if it's a hex string
  if (isHexString(str)) {
    return hexStringToUint8Array(str);
  }

  // Check if it's a decimal string
  if (isDecimalString(str)) {
    // Convert decimal string to bigint then to bytes
    const value = BigInt(str);
    return bigIntToUint8Array(value);
  }

  // Otherwise treat as UTF-8 text
  return utf8ToArray(str);
}

/**
 * Convert bigint to Uint8Array (big-endian)
 *
 * @param {bigint} value The bigint value to convert (must be non-negative)
 * @returns {Uint8Array} The converted byte array in big-endian byte order
 * @throws {Error} If value is negative
 *
 * @example
 * ```typescript
 * const value = 256n; // 0x0100
 * const result = encode.bigIntToUint8Array(value);
 * // result = Uint8Array([1, 0]) - big-endian, MSB first
 * ```
 */
export function bigIntToUint8Array(value: bigint): Uint8Array {
  // Validate non-negative
  if (value < 0n) {
    throw new Error(`Cannot convert negative bigint ${value} to Uint8Array`);
  }

  // Special case for 0
  if (value === 0n) {
    return new Uint8Array([0]);
  }

  // Convert to hex string without '0x' prefix
  let hex = value.toString(16);
  // Pad to even length
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  // Create Uint8Array from hex
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert Uint8Array to bigint (big-endian)
 *
 * @param {Uint8Array} data The Uint8Array to convert (interpreted as big-endian)
 * @returns {bigint} The converted bigint value
 *
 * @example
 * ```typescript
 * const data = new Uint8Array([1, 0]); // Big-endian representation
 * const result = encode.uint8ArrayToBigInt(data);
 * // result = 256n (0x0100)
 * ```
 */
export function uint8ArrayToBigInt(data: Uint8Array): bigint {
  if (!data || data.length === 0) {
    return 0n;
  }
  // Convert Uint8Array to hex string
  let hex = '0x';
  for (let i = 0; i < data.length; i += 1) {
    hex += data[i].toString(16).padStart(2, '0');
  }
  return BigInt(hex);
}
