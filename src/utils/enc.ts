import { IS_BROWSER } from '../constants';
import { toBN } from './number';

export const hexToDecimalString = (hex: string): string =>
  toBN(`0x${hex.replace(/^0x/, '')}`).toString();

export const arrayBufferToString = (array: ArrayBuffer): string =>
  String.fromCharCode.apply(null, array as unknown as number[]);

export const btoaUniversal = (b: ArrayBuffer): string =>
  IS_BROWSER ? btoa(arrayBufferToString(b)) : Buffer.from(b).toString('base64');

export const buf2hex = (buffer: Uint8Array) =>
  [...buffer].map((x) => x.toString(16).padStart(2, '0')).join('');
