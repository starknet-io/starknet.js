import { gzip } from 'pako';
import Json from 'json-bigint';
import { CompressedProgram, Program } from './types';
import { CONTRACT_ADDRESS_LOWER_BOUND, CONTRACT_ADDRESS_UPPER_BOUND } from './constants';

export const isBrowser = typeof window !== 'undefined';

export const btoaUniversal = (b: ArrayBuffer): string =>
  isBrowser ? btoa(String.fromCharCode.apply(null, b as any)) : Buffer.from(b).toString('base64');

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
