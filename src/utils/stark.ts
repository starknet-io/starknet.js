import { getStarkKey, utils } from '@scure/starknet';
import { gzip, ungzip } from 'pako';

import { ArraySignatureType, BigNumberish, CompressedProgram, Program, Signature } from '../types';
import { addHexPrefix, arrayBufferToString, atobUniversal, btoaUniversal } from './encode';
import { parse, stringify } from './json';
import {
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toBigInt,
  toHex,
} from './num';

/**
 * Compress compiled Cairo program
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param jsonProgram Program | string - representing the compiled cairo program
 * @returns CompressedProgram
 */
export function compressProgram(jsonProgram: Program | string): CompressedProgram {
  const stringified = typeof jsonProgram === 'string' ? jsonProgram : stringify(jsonProgram);
  const compressedProgram = gzip(stringified);
  return btoaUniversal(compressedProgram);
}

/**
 * Decompress compressed compiled Cairo program
 * @param base64 CompressedProgram
 * @returns any - parsed decompressed compiled Cairo program
 */
export function decompressProgram(base64: CompressedProgram) {
  if (Array.isArray(base64)) return base64;
  const decompressed = arrayBufferToString(ungzip(atobUniversal(base64)));
  return parse(decompressed);
}

/**
 * Random Address based on random keyPair
 * @returns string
 */
export function randomAddress(): string {
  const randomKeyPair = utils.randomPrivateKey();
  return getStarkKey(randomKeyPair);
}

/**
 * @deprecated not used internally, naming is confusing based on functionality
 * Lowercase and hex prefix string
 * @param input string
 * @returns string
 */
export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}

/**
 * Format Signature to standard type (hex array)
 * @param sig Signature
 * @returns ArraySignatureType (custom hex array or weierstrass.SignatureType hex array)
 */
export function formatSignature(sig?: Signature): ArraySignatureType {
  if (!sig) throw Error('formatSignature: provided signature is undefined');
  if (Array.isArray(sig)) {
    return sig.map((it) => toHex(it));
  }
  try {
    const { r, s } = sig;
    return [toHex(r), toHex(s)];
  } catch (e) {
    throw new Error('Signature need to be weierstrass.SignatureType or an array for custom');
  }
}

/**
 * Format Signature to decimal string array
 * @param sig Signature
 * @returns ArraySignatureType
 */
export function signatureToDecimalArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}

/**
 * Format Signature to Hex string array
 * @param sig Signature
 * @returns ArraySignatureType
 */
export function signatureToHexArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}

/**
 * Convert estimated fee to max fee with overhead
 * @param estimatedFee BigNumberish
 * @param overhead number
 * @returns bigint
 */
export function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): bigint {
  // BN can only handle Integers, so we need to do all calulations with integers
  const overHeadPercent = Math.round((1 + overhead) * 100);
  return (toBigInt(estimatedFee) * toBigInt(overHeadPercent)) / 100n;
}
