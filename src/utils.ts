import { gzip } from 'pako';
import Json from 'json-bigint';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { CompressedProgram, Program } from './types';
import { CONTRACT_ADDRESS_LOWER_BOUND, CONTRACT_ADDRESS_UPPER_BOUND } from './constants';

export const isBrowser = typeof window !== 'undefined';

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

const keccakHex = (value: string): string => buf2hex(keccak256(stringToUint8Array(value)));

/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as hex string
 */
export function starknetKeccak(value: string): string {
  return `0x${keccakHex(value).substr(2)}`;
}

/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
export function getSelectorFromName(funcName: string) {
  return starknetKeccak(funcName);
}
