import { getStarkKey, utils } from '@scure/starknet';
import { gzip, ungzip } from 'pako';

import { ZERO } from '../constants';
import {
  ArraySignatureType,
  BigNumberish,
  CompressedProgram,
  EstimateFeeDetails,
  EstimateFeeResponse,
  Program,
  Signature,
} from '../types';
import { EDAMode, EDataAvailabilityMode, ETransactionVersion, ResourceBounds } from '../types/api';
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

/**
 * Convert to ETransactionVersion or throw an error
 * @param defaultVersion ETransactionVersion
 * @param providedVersion BigNumberish | undefined
 * @returns ETransactionVersion
 */
export function toTransactionVersion(
  defaultVersion: ETransactionVersion,
  providedVersion?: BigNumberish
) {
  if (providedVersion && !Object.values(ETransactionVersion).includes(providedVersion as any)) {
    throw Error(`toTransactionVersion: ${providedVersion} is not supported`);
  }
  return (providedVersion ? toHex(providedVersion) : defaultVersion) as ETransactionVersion;
}

/**
 * Convert Transaction version to Fee version or throw an error
 * @param providedVersion BigNumberish | undefined
 */
export function toFeeVersion(providedVersion?: BigNumberish) {
  if (!providedVersion) return undefined;
  const version = toHex(providedVersion);

  if (version === ETransactionVersion.V0) return ETransactionVersion.F0;
  if (version === ETransactionVersion.V1) return ETransactionVersion.F1;
  if (version === ETransactionVersion.V2) return ETransactionVersion.F2;
  if (version === ETransactionVersion.V3) return ETransactionVersion.F3;

  throw Error(`toFeeVersion: ${version} is not supported`);
}

/**
 * Rerturn provided or default v3 tx details
 * @param details EstimateFeeDetails
 */
export function v3Details(details: EstimateFeeDetails) {
  return {
    tip: details.tip || 0,
    paymasterData: details.paymasterData || [],
    accountDeploymentData: details.accountDeploymentData || [],
    nonceDataAvailabilityMode: details.nonceDataAvailabilityMode || EDataAvailabilityMode.L1,
    feeDataAvailabilityMode: details.feeDataAvailabilityMode || EDataAvailabilityMode.L1,
    resourceBounds: estimateFeeToBounds(ZERO),
  };
}

/**
 * It will reduce V2 to V1, else (V3) stay the same
 * F2 -> F1
 * V2 -> V1
 * F3 -> F3
 * V3 -> V3
 */
export function reduceV2(providedVersion: ETransactionVersion) {
  if (providedVersion === ETransactionVersion.F2) return ETransactionVersion.F1;
  if (providedVersion === ETransactionVersion.V2) return ETransactionVersion.V1;
  return providedVersion;
}

export function toETransactionVersions(version: string) {
  if (!Object.values(ETransactionVersion).includes(version as any)) {
    throw Error(`Provided ${version} is not ETransactionVersion`);
  }

  return version as ETransactionVersion;
}
