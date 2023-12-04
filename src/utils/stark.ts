import { getStarkKey, utils } from '@scure/starknet';
import { gzip, ungzip } from 'pako';

import {
  ArraySignatureType,
  BigNumberish,
  CompressedProgram,
  EstimateFeeResponse,
  Program,
  Signature,
} from '../types';
import { EDAMode, EDataAvailabilityMode, ResourceBounds } from '../types/api/rpc';
import { addHexPrefix, arrayBufferToString, atobUniversal, btoaUniversal } from './encode';
import { parse, stringify } from './json';
import {
  addPercent,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toHex,
} from './num';

/**
 * Compress compiled Cairo program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param jsonProgram Representing the compiled cairo program
 */
export function compressProgram(jsonProgram: Program | string): CompressedProgram {
  const stringified = typeof jsonProgram === 'string' ? jsonProgram : stringify(jsonProgram);
  const compressedProgram = gzip(stringified);
  return btoaUniversal(compressedProgram);
}

/**
 * Decompress compressed compiled Cairo program
 * @param base64 Compressed program
 * @returns Parsed decompressed compiled Cairo program
 */
export function decompressProgram(base64: CompressedProgram) {
  if (Array.isArray(base64)) return base64;
  const decompressed = arrayBufferToString(ungzip(atobUniversal(base64)));
  return parse(decompressed);
}

/**
 * Random Address based on random keyPair
 */
export function randomAddress(): string {
  const randomKeyPair = utils.randomPrivateKey();
  return getStarkKey(randomKeyPair);
}

/**
 * Lowercase and hex prefix string
 *
 * @deprecated Not used internally, naming is confusing based on functionality
 */
export function makeAddress(input: string): string {
  return addHexPrefix(input).toLowerCase();
}

/**
 * Format Signature to standard type (hex array)
 * @returns Custom hex array or weierstrass.SignatureType hex array
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
 */
export function signatureToDecimalArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}

/**
 * Format Signature to hex string array
 */
export function signatureToHexArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}

/**
 * Convert estimated fee to max fee with overhead
 */
export function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): bigint {
  return addPercent(estimatedFee, overhead * 100);
}

export function estimateFeeToBounds(
  estimate: EstimateFeeResponse | 0n,
  amountOverhead: number = 10,
  priceOverhead = 50
): ResourceBounds {
  if (typeof estimate === 'bigint') {
    return {
      l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    };
  }

  if (typeof estimate.gas_consumed === 'undefined' || typeof estimate.gas_price === 'undefined') {
    throw Error('estimateFeeToBounds: estimate is undefined');
  }
  const maxUnits = toHex(addPercent(estimate.gas_consumed, amountOverhead));
  const maxUnitPrice = toHex(addPercent(estimate.gas_price, priceOverhead));
  return {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: maxUnits, max_price_per_unit: maxUnitPrice },
  };
}

export function intDAM(dam: EDataAvailabilityMode) {
  if (dam === EDataAvailabilityMode.L1) return EDAMode.L1;
  if (dam === EDataAvailabilityMode.L2) return EDAMode.L2;
  throw Error('EDAM conversion');
}
