import { gzip } from 'pako';

import { CompressedProgram, Program } from '../types';
import { genKeyPair, getStarkKey } from './ellipticCurve';
import { addHexPrefix, btoaUniversal } from './encode';
import { pedersen, starknetKeccak } from './hash';
import { stringify } from './json';
import { BigNumberish, toBN, toHex } from './number';

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

export function randomAddress(): string {
  const randomKeyPair = genKeyPair();
  return getStarkKey(randomKeyPair);
}

export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}

export function formatSignature(sig?: [BigNumberish, BigNumberish]): [string, string] | [] {
  if (!sig) return [];
  try {
    return sig.map((x) => toBN(x)).map((x) => x.toString()) as [string, string];
  } catch (e) {
    return [];
  }
}

export function computeHashOnElements(data: BigNumberish[]) {
  return [...data, data.length].reduce((x, y) => pedersen([x, y]), 0);
}
