import BN from 'bn.js';
import { gzip } from 'pako';

import { Calldata, CompressedProgram, Program, RawArgs, Signature } from '../types';
import { genKeyPair, getStarkKey } from './ellipticCurve';
import { addHexPrefix, btoaUniversal } from './encode';
import { stringify } from './json';
import { BigNumberish, toBN } from './number';

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

export function randomAddress(): string {
  const randomKeyPair = genKeyPair();
  return getStarkKey(randomKeyPair);
}

export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}

export function formatSignature(sig?: Signature): string[] {
  if (!sig) return [];
  try {
    return sig.map((x) => toBN(x)).map((x) => x.toString());
  } catch (e) {
    return [];
  }
}

export function compileCalldata(args: RawArgs): Calldata {
  return Object.values(args).flatMap((value) => {
    if (Array.isArray(value))
      return [toBN(value.length).toString(), ...value.map((x) => toBN(x).toString())];
    if (typeof value === 'object' && 'type' in value)
      return Object.entries(value)
        .filter(([k]) => k !== 'type')
        .map(([, v]) => toBN(v).toString());
    return toBN(value).toString();
  });
}

export function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): BN {
  // BN can only handle Integers, so we need to do all calulations with integers
  const overHeadPercent = Math.round((1 + overhead) * 100);
  return toBN(estimatedFee).mul(toBN(overHeadPercent)).div(toBN(100));
}
