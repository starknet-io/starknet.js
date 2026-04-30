import { getPublicKey, getStarkKey, utils } from '@scure/starknet';
import { config } from '../../global/config';
import { EstimateFeeResponseOverhead, FeeEstimate } from '../../provider/types/index.type';
import {
  EDAMode,
  EDataAvailabilityMode,
  ETransactionVersion,
  ETransactionVersion3,
  ResourceBounds,
  ResourceBoundsBN,
  ResourceBoundsOverhead,
} from '../../provider/types/spec.type';
import {
  ArraySignatureType,
  BigNumberish,
  CompressedProgram,
  Program,
  Signature,
  UniversalDetails,
} from '../../types';
import { addHexPrefix, atobUniversal, btoaUniversal, buf2hex, removeHexPrefix } from '../encode';
import { parse, stringify } from '../json';
import {
  addPercent,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  toHex,
} from '../num';
import { isBigInt, isObject, isString } from '../typed';
import { starkCurve } from '../ec';

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
> &
  Partial<Pick<UniversalDetails, 'proofFacts' | 'proof'>>;

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
export async function compressProgram(jsonProgram: Program | string): Promise<CompressedProgram> {
  const stringified = isString(jsonProgram) ? jsonProgram : stringify(jsonProgram);

  // Use native CompressionStream API (Node 17+, modern browsers)
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(stringified));
  writer.close();

  const compressedProgram = await new Response(stream.readable).arrayBuffer();
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
export async function decompressProgram(
  base64: CompressedProgram | CompressedProgram[]
): Promise<Program | CompressedProgram[]> {
  if (Array.isArray(base64)) return base64;

  // Use native DecompressionStream API (Node 17+, modern browsers)
  const compressed = atobUniversal(base64);
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new Uint8Array(compressed));
  writer.close();

  const decompressed = await new Response(stream.readable).text();
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
 * Encode proof array to base64 string for RPC 0.10.1+
 * @param {number[]} proof Array of proof integers
 * @returns {string} Base64 encoded proof
 * @example
 * ```typescript
 * const proofArray = [1, 2, 3, 4, 5];
 * const result = stark.encodeProof(proofArray);
 * // result = "AQAAAAIAAAADAAAABAAAAAUAAAAv"
 * ```
 */
export function encodeProof(proof: number[]): string {
  return btoaUniversal(new Uint32Array(proof).buffer);
}

/**
 * Decode base64 proof string to proof array for RPC 0.10.1+
 * @param {string} proofBase64 Base64 encoded proof string
 * @returns {number[]} Array of proof integers
 * @example
 * ```typescript
 * const proofBase64 = "AQAAAAIAAAADAAAABAAAAAUAAAAv";
 * const result = stark.decodeProof(proofBase64);
 * // result = [1, 2, 3, 4, 5]
 * ```
 */
export function decodeProof(proofBase64: string): number[] {
  const decoded = atobUniversal(proofBase64);
  const uint32Array = new Uint32Array(decoded.buffer);
  return Array.from(uint32Array);
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
 * Calculate the shared secret using ECDH key agreement protocol with a given private key and a full public key.
 * @param {BigNumberish} privateKey - a Starknet 252 bits private key.
 * @param {BigNumberish} fullPublicKey - a 520 bit number, representing the full public key related to `privateKey`, which can be obtained by `getFullPublicKey` function. This number needs to start with '0x04' to indicate that it's a full public key, and the remaining 128 bytes represent the x and y coordinates of the public key point on the elliptic curve (64 bytes for x and 64 bytes for y).
 * @returns {string} an hex string of a 256 bit number, representing the shared secret calculated by ECDH key agreement protocol using `privateKey` and `fullPublicKey`.
 * @example
 * ```typescript
 * const myPrivateKey = "0x67d0bd238e266b6defbb1ad4de4cf1dde2dc55b3518596e0bae29e439165596";
 * const bobFullPublicKey = "0x0402d6b3ff569186d67a2ff0b8548328798d3500c16191f6c021f929134d48a15405f9fc5a11467b96a59b8fce3c0c919c337f11337c815bb9d0dc42bac7ac42a9";
 * const result = stark.getSharedSecret(myPrivateKey, bobFullPublicKey);
 * // result = "0x020619d1a277a5bc51aac6ab0c22d97e414d4bee9711a2d0aa421997f5efd68bab"
 * ```
 */
export function getSharedSecret(privateKey: BigNumberish, fullPublicKey: BigNumberish): string {
  const privK = toHex(privateKey);
  const fullPubKHex = removeHexPrefix(toHex(fullPublicKey)).padStart(130, '0');
  if (fullPubKHex.length !== 130 || !fullPubKHex.startsWith('04')) {
    throw new Error(
      'fullPublicKey must be an uncompressed public key (starting with 04, 65 bytes total)'
    );
  }
  const sharedSecret = buf2hex(starkCurve.getSharedSecret(privK, fullPubKHex));
  return addHexPrefix(sharedSecret);
}

/**
 * Returns a resource bounds with zero values and no overhead.
 * @returns {ResourceBoundsBN} A resource bounds with zero values and no overhead.
 */
export function zeroResourceBounds(): ResourceBoundsBN {
  return toOverheadResourceBounds(ZeroFeeEstimate(), false);
}

/**
 * Calculates the maximum resource bounds for fee estimation.
 *
 * @param {FeeEstimate} estimate The estimate for the fee.
 * @param {ResourceBoundsOverhead | false} [overhead] - The percentage overhead added to the max units and max price per unit. Pass `false` to disable overhead.
 * @returns {ResourceBoundsBN} The resource bounds with overhead represented as BigInt.
 * @throws {Error} If the estimate object is undefined or does not have the required properties.
 */
export function toOverheadResourceBounds(
  estimate: FeeEstimate,
  overhead: ResourceBoundsOverhead | false = config.get('resourceBoundsOverhead')
): ResourceBoundsBN {
  return {
    l2_gas: {
      max_amount: addPercent(
        estimate.l2_gas_consumed,
        overhead !== false ? overhead.l2_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l2_gas_price,
        overhead !== false ? overhead.l2_gas.max_price_per_unit : 0
      ),
    },
    l1_gas: {
      max_amount: addPercent(
        estimate.l1_gas_consumed,
        overhead !== false ? overhead.l1_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l1_gas_price,
        overhead !== false ? overhead.l1_gas.max_price_per_unit : 0
      ),
    },
    l1_data_gas: {
      max_amount: addPercent(
        estimate.l1_data_gas_consumed,
        overhead !== false ? overhead.l1_data_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l1_data_gas_price,
        overhead !== false ? overhead.l1_data_gas.max_price_per_unit : 0
      ),
    },
  };
}

/**
 * Converts a resource bounds to an estimate fee response. No overhead is applied.
 * @param {ResourceBoundsBN} resourceBounds - The resource bounds to convert.
 * @returns {EstimateFeeResponseOverhead} The estimate fee response.
 * @example
 * ```typescript
 * const resourceBounds = {
 *   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 *   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 *   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * };
 * const result = stark.resourceBoundsToEstimateFeeResponse(resourceBounds);
 * // result = {
 * //   resourceBounds: resourceBounds,
 * //   overall_fee: 129000n,
 * //   unit: 'FRI'
 * // }
 * ```
 */
export function resourceBoundsToEstimateFeeResponse(
  resourceBounds: ResourceBoundsBN
): EstimateFeeResponseOverhead {
  return {
    resourceBounds,
    /**
     * maximum overall fee for provided resource bounds
     */
    overall_fee:
      resourceBounds.l1_gas.max_amount * resourceBounds.l1_gas.max_price_per_unit +
      resourceBounds.l1_data_gas.max_amount * resourceBounds.l1_data_gas.max_price_per_unit +
      resourceBounds.l2_gas.max_amount * resourceBounds.l2_gas.max_price_per_unit,
    unit: 'FRI',
  };
}

/**
 * Calculates the overall fee for a transaction based on resource consumption and prices.
 *
 * The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to:
 * l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed*l2_gas_price
 *
 * @param {FeeEstimate} estimate - The fee estimate containing gas consumption and price data
 * @param {ResourceBoundsOverhead | false} overhead - The overhead percentage. Pass `false` to disable overhead.
 * @returns {bigint} The calculated overall fee in wei or fri
 * @example
 * ```typescript
 * const estimate = {
 *   l1_gas_consumed: 1000n,
 *   l1_gas_price: 100n,
 *   l1_data_gas_consumed: 500n,
 *   l1_data_gas_price: 50n,
 *   l2_gas_consumed: 200n,
 *   l2_gas_price: 20n
 * };
 * const result = stark.toOverheadOverallFee(estimate, overhead);
 * // result = 1000n * 100n + 500n * 50n + 200n * 20n = 129000n
 * ```
 */
export function toOverheadOverallFee(
  estimate: FeeEstimate,
  overhead: ResourceBoundsOverhead | false = config.get('resourceBoundsOverhead')
): bigint {
  return (
    addPercent(estimate.l1_gas_consumed, overhead !== false ? overhead.l1_gas.max_amount : 0) *
      addPercent(
        estimate.l1_gas_price,
        overhead !== false ? overhead.l1_gas.max_price_per_unit : 0
      ) +
    addPercent(
      estimate.l1_data_gas_consumed,
      overhead !== false ? overhead.l1_data_gas.max_amount : 0
    ) *
      addPercent(
        estimate.l1_data_gas_price,
        overhead !== false ? overhead.l1_data_gas.max_price_per_unit : 0
      ) +
    addPercent(estimate.l2_gas_consumed, overhead !== false ? overhead.l2_gas.max_amount : 0) *
      addPercent(estimate.l2_gas_price, overhead !== false ? overhead.l2_gas.max_price_per_unit : 0)
  );
}

/**
 * Mock zero fee API response
 */
export function ZeroFeeEstimate(): FeeEstimate {
  return {
    l1_gas_consumed: '0',
    l1_gas_price: '0',
    l1_data_gas_consumed: '0',
    l1_data_gas_price: '0',
    l2_gas_consumed: '0',
    l2_gas_price: '0',
    overall_fee: '0',
    unit: 'FRI',
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
 * Convert input versions to ETransactionVersion or throw an error.
 * Returns providedVersion if specified, otherwise returns defaultVersion.
 * @param {BigNumberish} defaultVersion - The default transaction version to use if providedVersion is not specified
 * @param {BigNumberish} [providedVersion] - Optional transaction version that takes precedence if provided
 * @returns {ETransactionVersion} The transaction version - either providedVersion if specified or defaultVersion
 * @throws {Error} If either version is not a valid ETransactionVersion
 * @example
 * ```typescript
 * const result = stark.toTransactionVersion("0x100000000000000000000000000000003", stark.toFeeVersion(2));
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
export function toTransactionVersion(defaultVersion: BigNumberish, providedVersion?: BigNumberish) {
  const version = providedVersion ? toHex(providedVersion) : toHex(defaultVersion);
  const validVersions = Object.values(ETransactionVersion3);

  if (!validVersions.includes(version as ETransactionVersion3)) {
    throw Error(
      `${providedVersion ? 'providedVersion' : 'defaultVersion'} ${version} is not ETransactionVersion`
    );
  }

  return version as ETransactionVersion3;
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

export function v3Details(details: UniversalDetails): V3Details {
  return {
    tip: details.tip || 0,
    paymasterData: details.paymasterData || [],
    accountDeploymentData: details.accountDeploymentData || [],
    nonceDataAvailabilityMode: details.nonceDataAvailabilityMode || EDataAvailabilityMode.L1,
    feeDataAvailabilityMode: details.feeDataAvailabilityMode || EDataAvailabilityMode.L1,
    resourceBounds: details.resourceBounds ?? zeroResourceBounds(),
    proofFacts: details.proofFacts,
    proof: details.proof,
  };
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

/**
 * Converts ResourceBoundsBN (with bigint values) to ResourceBounds (with string values)
 *
 * @param {ResourceBoundsBN} resourceBoundsBN The resource bounds with bigint values
 * @returns {ResourceBounds} The resource bounds with hex string values
 * @example
 * ```typescript
 * const resourceBoundsBN = {
 *   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 *   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 *   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * };
 * const result = stark.resourceBoundsToHexString(resourceBoundsBN);
 * // result = {
 * //   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
 * //   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
 * //   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
 * // }
 * ```
 */
export function resourceBoundsToHexString(resourceBoundsBN: ResourceBoundsBN): ResourceBounds {
  const convertBigIntToHex = (obj: any): any => {
    if (isBigInt(obj)) {
      return toHex(obj);
    }
    if (isObject(obj)) {
      const result: any = {};
      Object.keys(obj).forEach((key) => {
        result[key] = convertBigIntToHex(obj[key as keyof typeof obj]);
      });
      return result;
    }
    return obj;
  };

  return convertBigIntToHex(resourceBoundsBN) as ResourceBounds;
}

/**
 * Converts ResourceBounds (with string values) to ResourceBoundsBN (with BigInt values)
 *
 * @param {ResourceBounds} resourceBounds The resource bounds with string values
 * @returns {ResourceBoundsBN} The resource bounds with BigInt values
 * @example
 * ```typescript
 * const resourceBounds = {
 *   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
 *   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
 *   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
 * };
 * const result = stark.resourceBoundsToBigInt(resourceBounds);
 * // result = {
 * //   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 * //   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 * //   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * // }
 * ```
 */
export function resourceBoundsToBigInt(resourceBounds: ResourceBounds): ResourceBoundsBN {
  const convertStringToBigInt = (obj: any): any => {
    if (isString(obj)) {
      return BigInt(obj);
    }
    if (isObject(obj)) {
      const result: any = {};
      Object.keys(obj).forEach((key) => {
        result[key] = convertStringToBigInt(obj[key as keyof typeof obj]);
      });
      return result;
    }
    return obj;
  };

  return convertStringToBigInt(resourceBounds) as ResourceBoundsBN;
}
