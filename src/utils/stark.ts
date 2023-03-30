import { Signature, getStarkKey, utils } from 'micro-starknet';
import { gzip } from 'pako';

import {
  AnySignatureType,
  ArraySignatureType,
  Calldata,
  CompressedProgram,
  Program,
  RawArgs,
  WeierstrassSignatureType,
} from '../types';
import { addHexPrefix, btoaUniversal } from './encode';
import { stringify } from './json';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toBigInt,
  toHex,
} from './num';

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

export function formatSignature(sig?: AnySignatureType): ArraySignatureType {
  if (!sig) throw Error('formatSignature: provided signature is undefined');
  if (typeof sig === 'string' || typeof sig === 'number') {
    return [toHex(sig)];
  }
  if (Array.isArray(sig)) {
    return sig.map((it) => toHex(it));
  }
  try {
    const { r, s } = sig;
    return [toHex(r), toHex(s)];
  } catch (e) {
    throw new Error('Signature need to be WeierstrassSignatureType or an array');
  }
}

export function signatureToDecimalArray(sig?: AnySignatureType): ArraySignatureType {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}

export function signatureToHexArray(sig?: AnySignatureType): ArraySignatureType {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}

export function parseSignature(sig?: ArraySignatureType): WeierstrassSignatureType {
  if (!sig) throw Error('parseSignature: provided signature is undefined');

  const [r, s] = sig;
  return new Signature(toBigInt(r), toBigInt(s));
}

/**
 * @deprecated this function is deprecated use callData instead from calldata.ts
 */
export function compileCalldata(args: RawArgs): Calldata {
  const compiledData = Object.values(args).flatMap((value) => {
    if (Array.isArray(value))
      return [toBigInt(value.length).toString(), ...value.map((x) => toBigInt(x).toString())];
    if (typeof value === 'object' && 'type' in value)
      return Object.entries<BigNumberish>(value)
        .filter(([k]) => k !== 'type')
        .map(([, v]) => toBigInt(v).toString());
    return toBigInt(value).toString();
  });
  Object.defineProperty(compiledData, 'compiled', {
    enumerable: false,
    writable: false,
    value: true,
  });
  return compiledData;
}

export function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): bigint {
  // BN can only handle Integers, so we need to do all calulations with integers
  const overHeadPercent = Math.round((1 + overhead) * 100);
  return (toBigInt(estimatedFee) * toBigInt(overHeadPercent)) / 100n;
}
