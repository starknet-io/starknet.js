import { Signature, getStarkKey, utils } from '@noble/curves/stark';
import { gzip } from 'pako';

import {
  Calldata,
  CompressedProgram,
  Program,
  RawArgs,
  Signature as SignatureType,
} from '../types';
import { addHexPrefix, btoaUniversal } from './encode';
import { stringify } from './json';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toBigInt,
  toHex,
} from './number';

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
  const randomKeyPair = utils.randomPrivateKey();
  return getStarkKey(randomKeyPair);
}

export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}

export function formatSignature(sig?: SignatureType): string[] {
  if (!sig) return [];
  try {
    const { r, s } = sig;
    return [toHex(r), toHex(s)];
  } catch (e) {
    return [];
  }
}

export function signatureToDecimalArray(sig?: SignatureType): string[] {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}

export function signatureToHexArray(sig?: SignatureType): string[] {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}

export function parseSignature(sig?: string[]) {
  if (!sig) return undefined;

  const [r, s] = sig;
  return new Signature(toBigInt(r), toBigInt(s));
}

export function compileCalldata(args: RawArgs): Calldata {
  return Object.values(args).flatMap((value) => {
    if (Array.isArray(value))
      return [toBigInt(value.length).toString(), ...value.map((x) => toBigInt(x).toString())];
    if (typeof value === 'object' && 'type' in value)
      return Object.entries(value)
        .filter(([k]) => k !== 'type')
        .map(([, v]) => toBigInt(v).toString());
    return toBigInt(value).toString();
  });
}

export function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): bigint {
  // BN can only handle Integers, so we need to do all calulations with integers
  const overHeadPercent = Math.round((1 + overhead) * 100);
  return (toBigInt(estimatedFee) * toBigInt(overHeadPercent)) / 100n;
}
