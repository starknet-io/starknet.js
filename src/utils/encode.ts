/* eslint-disable no-param-reassign */
export const IS_BROWSER = typeof window !== 'undefined';

const STRING_ZERO = '0';

export function arrayBufferToString(array: ArrayBuffer): string {
  return new Uint8Array(array).reduce((data, byte) => data + String.fromCharCode(byte), '');
}

export function btoaUniversal(b: ArrayBuffer): string {
  return IS_BROWSER ? btoa(arrayBufferToString(b)) : Buffer.from(b).toString('base64');
}

export function buf2hex(buffer: Uint8Array) {
  return [...buffer].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Some function imported from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
 * enc-utils is no dependency to avoid using `Buffer` which just works in node and no browsers
 */

export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/, '');
}

export function addHexPrefix(hex: string): string {
  return `0x${removeHexPrefix(hex)}`;
}

function padString(str: string, length: number, left: boolean, padding = STRING_ZERO): string {
  const diff = length - str.length;
  let result = str;
  if (diff > 0) {
    const pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }
  return result;
}

export function padLeft(str: string, length: number, padding = STRING_ZERO): string {
  return padString(str, length, true, padding);
}

export function calcByteLength(length: number, byteSize = 8): number {
  const remainder = length % byteSize;
  return remainder ? ((length - remainder) / byteSize) * byteSize + byteSize : length;
}

export function sanitizeBytes(str: string, byteSize = 8, padding = STRING_ZERO): string {
  return padLeft(str, calcByteLength(str.length, byteSize), padding);
}

export function sanitizeHex(hex: string): string {
  hex = removeHexPrefix(hex);
  hex = sanitizeBytes(hex, 2);
  if (hex) {
    hex = addHexPrefix(hex);
  }
  return hex;
}

// implemented using TextEncoder to make it isomorphic
export function utf8ToArray(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}
