import { addHexPrefix, removeHexPrefix } from './encode';
import { isHex } from './number';

export function isASCII(str: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

// function to check if string has less or equal 31 characters
export function isShortString(str: string) {
  return str.length <= 31;
}

// function to check if string is a decimal
export function isDecimalString(decim: string): boolean {
  return /^[0-9]*$/i.test(decim);
}

export function encodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
}

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
