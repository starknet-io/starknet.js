import { getPublicKey, getStarkKey, utils } from '@scure/starknet';
import { gzip, ungzip } from 'pako';

import { PRICE_UNIT } from '@starknet-io/starknet-types-08';
import { config } from '../../global/config';
import { SupportedRpcVersion, ZERO } from '../../global/constants';
import { FeeEstimate } from '../../provider/types/index.type';
import {
  EDAMode,
  EDataAvailabilityMode,
  ETransactionVersion,
  isRPC08_FeeEstimate,
  ResourceBounds,
  ResourceBoundsOverhead,
  ResourceBoundsOverheadRPC07,
  ResourceBoundsOverheadRPC08,
} from '../../provider/types/spec.type';
import {
  ArraySignatureType,
  BigNumberish,
  CompressedProgram,
  Program,
  Signature,
  UniversalDetails,
} from '../../types';
import {
  addHexPrefix,
  arrayBufferToString,
  atobUniversal,
  btoaUniversal,
  buf2hex,
} from '../encode';
import { parse, stringify } from '../json';
import {
  addPercent,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toHex,
} from '../num';
import { isVersion } from '../resolve';
import { isBigInt, isString } from '../typed';
import { estimateFeeToBounds as estimateFeeToBoundsRPC07 } from './rpc07';
import { estimateFeeToBounds as estimateFeeToBoundsRPC08 } from './rpc08';

type V3Details = Required<
  Pick<
    UniversalDetails,
    | 'tip'
    | 'paymasterData'
    | 'accountDeploymentData'
    | 'nonceDataAvailabilityMode'
    | 'feeDataAvailabilityMode'
    | 'resourceBounds'
  >
>;

/**
 * Compress compiled Cairo 0 program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param {Program | string} jsonProgram Representing the compiled Cairo 0 program
 * @return {CompressedProgram} Compressed Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result = stark.compressProgram(contractCairo0);
 * // result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
 * ```
 */
export function compressProgram(jsonProgram: Program | string): CompressedProgram {
  const stringified = isString(jsonProgram) ? jsonProgram : stringify(jsonProgram);
  const compressedProgram = gzip(stringified);
  return btoaUniversal(compressedProgram);
}

/**
 * Decompress compressed compiled Cairo 0 program
 * @param {CompressedProgram | CompressedProgram[]} base64 Compressed Cairo 0 program
 * @returns Parsed decompressed compiled Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const compressedCairo0 = stark.compressProgram(contractCairo0);
 * const result = stark.decompressProgram(compressedCairo0);
 * // result = {
 * //   abi: [
 * //     {
 * //       inputs: [Array],
 * //       name: 'increase_balance',
 * //       outputs: [],
 * //       type: 'function'
 * //     }
 * //   ],
 * //   entry_points_by_type: { CONSTRUCTOR: [], EXTERNAL: [ [Object], [Object] ], L1_HANDLER: [] },
 * //   program: {
 * //     attributes: [],
 * //     builtins: [ 'pedersen', 'range_check' ],
 * //     compiler_version: '0.10.2',
 * //     data: [
 * //       '0x480680017fff8000',
 * // ...
 * ```
 */
export function decompressProgram(base64: CompressedProgram | CompressedProgram[]) {
  if (Array.isArray(base64)) return base64;
  const decompressed = arrayBufferToString(ungzip(atobUniversal(base64)));
  return parse(decompressed);
}

/**
 * Random Address based on random keyPair
 * @returns {string} an hex string of a random Starknet address
 * @example
 * ```typescript
 * const result = stark.randomAddress();
 * // result = "0x51fc8126a13cd5ddb29a71ca399cb1e814f086f5af1b502d7151c14929554f"
 * ```
 */
export function randomAddress(): string {
  const randomKeyPair = utils.randomPrivateKey();
  return getStarkKey(randomKeyPair);
}

/**
 * Format Signature to standard type (hex array)
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.formatSignature(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
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
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToDecimalArray(signature);
 * // result = ['329619989660444495690615805546674399714973829707166906185976654753023887767',
 * //  '2994745480203297689255012826403147585778741462125743754529207781488706428188']
 * ```
 */
export function signatureToDecimalArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}

/**
 * Format Signature to hex string array
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToHexArray(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
 */
export function signatureToHexArray(sig?: Signature): ArraySignatureType {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}

/**
 * Convert estimated fee to max fee including a margin
 * @param {BigNumberish} estimatedFee - The estimated fee
 * @param {number} [overhead] - The overhead added to the gas
 * @returns {bigint} The maximum fee with the margin
 * @example
 * ```typescript
 * const result = stark.estimatedFeeToMaxFee("8982300000000", 50);
 * // result = "13473450000000n"
 * ```
 */
export function estimatedFeeToMaxFee(
  estimatedFee: BigNumberish,
  overhead: number = config.get('feeMarginPercentage').maxFee
): bigint {
  return addPercent(estimatedFee, overhead);
}

/**
 * Calculates the maximum resource bounds for fee estimation.
 *
 * @param {FeeEstimate | 0n} estimate The estimate for the fee. If a BigInt is provided, the returned bounds will be set to '0x0'.
 * @param {ResourceBoundsOverhead} [overhead] - The percentage overhead added to the max units and max price per unit.
 * @returns {ResourceBounds} The resource bounds with overhead.
 * @throws {Error} If the estimate object is undefined or does not have the required properties.
 */
export function estimateFeeToBounds(
  estimate: FeeEstimate | 0n,
  overhead: ResourceBoundsOverhead = config.get('feeMarginPercentage').bounds,
  specVersion?: SupportedRpcVersion
): ResourceBounds {
  if (isBigInt(estimate)) {
    return {
      l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      ...(specVersion &&
        isVersion('0.8', specVersion) && {
          l1_data_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        }),
    };
  }

  if (isRPC08_FeeEstimate(estimate)) {
    return estimateFeeToBoundsRPC08(estimate, overhead as ResourceBoundsOverheadRPC08); // TODO: remove as
  }
  return estimateFeeToBoundsRPC07(estimate, overhead as ResourceBoundsOverheadRPC07); // TODO: remove as
}

export type feeOverhead = ResourceBounds;

/**
 * Mock zero fee response
 */
export function ZEROFee(specVersion: SupportedRpcVersion) {
  return {
    l1_gas_consumed: 0n,
    l1_gas_price: 0n,
    l1_data_gas_consumed: 0n,
    l1_data_gas_price: 0n,
    l2_gas_consumed: 0n,
    l2_gas_price: 0n,
    overall_fee: ZERO,
    unit: 'FRI' as PRICE_UNIT,
    suggestedMaxFee: ZERO,
    resourceBounds: estimateFeeToBounds(ZERO, undefined, specVersion),
  };
}

/**
 * Converts the data availability mode from EDataAvailabilityMode to EDAMode.
 *
 * @param {EDataAvailabilityMode} dam The data availability mode to be converted.
 * @return {EDAMode} The converted data availability mode.
 * @throws {Error} If the data availability mode is not a valid value.
 * @example
 * ```typescript
 * const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
 * // result = 0
 * ```
 */
export function intDAM(dam: EDataAvailabilityMode): EDAMode {
  if (dam === EDataAvailabilityMode.L1) return EDAMode.L1;
  if (dam === EDataAvailabilityMode.L2) return EDAMode.L2;
  throw Error('EDAM conversion');
}

/**
 * Convert to ETransactionVersion or throw an error.
 * Return providedVersion is specified else return defaultVersion
 * @param {BigNumberish} defaultVersion default estimate transaction version
 * @param {BigNumberish} [providedVersion] estimate transaction version
 * @returns {ETransactionVersion} if providedVersion is not provided, returns the default estimate version, else return the provided version
 * @throws {Error} if estimate transaction version or default estimate transaction version is unknown
 * @example
 * ```typescript
 * const result = stark.toTransactionVersion("0x100000000000000000000000000000003", stark.toFeeVersion(2));
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
export function toTransactionVersion(
  defaultVersion: BigNumberish,
  providedVersion?: BigNumberish
): ETransactionVersion {
  const providedVersion0xs = providedVersion ? toHex(providedVersion) : undefined;
  const defaultVersion0xs = toHex(defaultVersion);

  if (providedVersion && !Object.values(ETransactionVersion).includes(providedVersion0xs as any)) {
    throw Error(`providedVersion ${providedVersion} is not ETransactionVersion`);
  }
  if (!Object.values(ETransactionVersion).includes(defaultVersion0xs as any)) {
    throw Error(`defaultVersion ${defaultVersion} is not ETransactionVersion`);
  }

  return (providedVersion ? providedVersion0xs : defaultVersion0xs) as ETransactionVersion;
}

/**
 * Convert Transaction version to Fee version or throw an error
 * @param {BigNumberish} [providedVersion] 0..3 number representing the transaction version
 * @returns {ETransactionVersion | undefined} the fee estimation version corresponding to the transaction version provided
 * @throws {Error} if the transaction version is unknown
 * @example
 * ```typescript
 * const result = stark.toFeeVersion(2);
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
export function toFeeVersion(providedVersion?: BigNumberish): ETransactionVersion | undefined {
  if (!providedVersion) return undefined;
  const version = toHex(providedVersion);

  if (version === ETransactionVersion.V0) return ETransactionVersion.F0;
  if (version === ETransactionVersion.V1) return ETransactionVersion.F1;
  if (version === ETransactionVersion.V2) return ETransactionVersion.F2;
  if (version === ETransactionVersion.V3) return ETransactionVersion.F3;

  throw Error(`toFeeVersion: ${version} is not supported`);
}

/**
 * Return provided or default v3 tx details
 * @param {UniversalDetails} details details of the transaction
 * @return {V3Details} an object including the V3 transaction details.
 * @example
 * ```typescript
 * const detail: UniversalDetails = { tip: 3456n };
 * const result = stark.v3Details(detail);
 * // result = {
 * //   tip: 3456n,
 * //   paymasterData: [],
 * //   accountDeploymentData: [],
 * //   nonceDataAvailabilityMode: 'L1',
 * //   feeDataAvailabilityMode: 'L1',
 * //   resourceBounds: {
 * //     l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
 * //     l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
 * //   }
 * // }
 * ```
 */

export function v3Details(details: UniversalDetails, specVersion?: SupportedRpcVersion): V3Details {
  return {
    tip: details.tip || 0,
    paymasterData: details.paymasterData || [],
    accountDeploymentData: details.accountDeploymentData || [],
    nonceDataAvailabilityMode: details.nonceDataAvailabilityMode || EDataAvailabilityMode.L1,
    feeDataAvailabilityMode: details.feeDataAvailabilityMode || EDataAvailabilityMode.L1,
    resourceBounds: details.resourceBounds ?? estimateFeeToBounds(ZERO, undefined, specVersion),
  };
}

/**
 * It will reduce V2 to V1, else (V3) stay the same
 * F2 -> F1
 * V2 -> V1
 * F3 -> F3
 * V3 -> V3
 * @param {ETransactionVersion} providedVersion
 * @returns {ETransactionVersion} if v2 then returns v1. if v3 then return v3
 * @example
 * ```typescript
 * const result = stark.reduceV2(constants.TRANSACTION_VERSION.V2);
 * // result = "0x1"
 * ```
 */
export function reduceV2(providedVersion: ETransactionVersion): ETransactionVersion {
  if (providedVersion === ETransactionVersion.F2) return ETransactionVersion.F1;
  if (providedVersion === ETransactionVersion.V2) return ETransactionVersion.V1;
  return providedVersion;
}

/**
 * get the hex string of the full public key related to a Starknet private key.
 * @param {BigNumberish} privateKey a 252 bits private key.
 * @returns {string} an hex string of a 520 bit number, representing the full public key related to `privateKey`.
 * @example
 * ```typescript
 * const result = ec.getFullPublicKey("0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535");
 * // result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
 * ```
 */
export function getFullPublicKey(privateKey: BigNumberish): string {
  const privKey = toHex(privateKey);
  const fullPrivKey = addHexPrefix(buf2hex(getPublicKey(privKey, false)));
  return fullPrivKey;
}
