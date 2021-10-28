import { addHexPrefix } from 'enc-utils';
import { gzip } from 'pako';

import { genKeyPair, getStarkKey } from '../ec';
import { CompressedProgram, Program } from '../types';
import { btoaUniversal } from './enc';
import { starknetKeccak } from './hash';
import { stringify } from './json';
import { toHex } from './number';

/**
 * Function to compress compiled cairo program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param jsonProgram - json file representing the compiled cairo program
 * @returns Compressed cairo program
 */
export function compressProgram(jsonProgram: Program | string): CompressedProgram {
  const stringified = typeof jsonProgram === 'string' ? jsonProgram : stringify(jsonProgram);
  const compressedProgram = gzip(stringified);
  return btoaUniversal(compressedProgram);
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
  return toHex(starknetKeccak(funcName));
}

export const randomAddress = (): string => {
  const randomKeyPair = genKeyPair();
  return getStarkKey(randomKeyPair);
};

export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}
