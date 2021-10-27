import { gzip } from 'pako';
import Json from 'json-bigint';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { BigNumber } from '@ethersproject/bignumber';
import { hexToBinary, binaryToNumber } from 'enc-utils';
import { CompressedProgram, Program } from './types';
import { CONTRACT_ADDRESS_LOWER_BOUND, CONTRACT_ADDRESS_UPPER_BOUND } from './constants';

export const isBrowser = typeof window !== 'undefined';
const MASK_250 = BigNumber.from(2).pow(250).sub(1); // 2 ** 250 - 1

export const ensureNo0x = (str: string) => str.replace(/^0x/, '');
export const ensure0x = (str: string) => `0x${ensureNo0x(str)}`;

export const hexToDecimalString = (hex: string): string =>
  BigNumber.from(`0x${hex.replace(/^0x/, '')}`).toString();

export const arrayBufferToString = (array: ArrayBuffer): string =>
  String.fromCharCode.apply(null, array as any);

export const stringToUint8Array = (str: string): Uint8Array => new TextEncoder().encode(str);

export const btoaUniversal = (b: ArrayBuffer): string =>
  isBrowser ? btoa(arrayBufferToString(b)) : Buffer.from(b).toString('base64');

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomAddress(): string {
  return `0x${randomIntFromInterval(
    CONTRACT_ADDRESS_LOWER_BOUND,
    CONTRACT_ADDRESS_UPPER_BOUND
  ).toString(16)}`;
}

export function makeAddress(input: string): string {
  return `0x${input.replace(/^0x/, '').toLowerCase()}`;
}

export const JsonParser = Json({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});

/**
 * Function to compress compiled cairo program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param jsonProgram - json file representing the compiled cairo program
 * @returns Compressed cairo program
 */
export function compressProgram(jsonProgram: Program | string): CompressedProgram {
  const stringified =
    typeof jsonProgram === 'string' ? jsonProgram : JsonParser.stringify(jsonProgram);
  const compressedProgram = gzip(stringified);
  const base64 = btoaUniversal(compressedProgram);
  return base64;
}

function buf2hex(buffer: Uint8Array) {
  return [...buffer].map((x) => x.toString(16).padStart(2, '0')).join('');
}

const keccakHex = (value: string): string => `0x${buf2hex(keccak256(stringToUint8Array(value)))}`;

/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as BigNumber
 */
export function starknetKeccak(value: string): BigNumber {
  return BigNumber.from(keccakHex(value)).and(MASK_250);
}

/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which isnt allowed in the starknet api
  return starknetKeccak(funcName).toHexString();
}

/*
 Returns an integer from a given section of bits out of a hex string.
 hex is the target hex string to slice.
 start represents the index of the first bit to cut from the hex string (binary) in LSB order.
 end represents the index of the last bit to cut from the hex string.
*/
export function getIntFromBits(hex: string, start: number, end?: number) {
  const bin = hexToBinary(hex);
  const bits = bin.slice(start, end);
  const i = binaryToNumber(bits);
  return i;
}
