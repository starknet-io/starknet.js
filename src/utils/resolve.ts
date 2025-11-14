import { SupportedRpcVersion } from '../global/constants';
import {
  ETransactionVersion,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  InvocationsDetailsWithNonce,
  PreConfirmedBlock,
  PreConfirmedStateUpdate,
  StateUpdateResponse,
  V3TransactionDetails,
} from '../types';
import { EBlockStatus } from '../types/api/rpc';
import { toHex } from './num';

/**
 * Check if the given transaction details is a V3 transaction.
 *
 * @param {InvocationsDetailsWithNonce} details The transaction details to be checked.
 * @return {boolean} Returns true if the transaction is a V3 transaction, otherwise false.
 * @example
 * ```typescript
 * const invocation: InvocationsDetailsWithNonce = {
 *   nonce: 1,
 *   version: 3,
 *   maxFee: 10 ** 15,
 *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
 *   tip: 10 ** 13,
 *   paymasterData: [],
 *   resourceBounds: {
 *       l1_gas: { max_amount: num.toHex(10 ** 14), max_price_per_unit: num.toHex(50) },
 *       l2_gas: { max_amount: num.toHex(0), max_price_per_unit: num.toHex(0) }}};
 * const result = provider.isV3Tx(invocation);
 * // result = true
 * ```
 */
export function isV3Tx(details: InvocationsDetailsWithNonce): details is V3TransactionDetails {
  const version = details.version ? toHex(details.version) : ETransactionVersion.V3;
  return version === ETransactionVersion.V3 || version === ETransactionVersion.F3;
}

/**
 * Determines if the provided version matches the specified version.
 * Version must be formatted "major.minor.patch" using dot delimiters.
 * Use wildcard * or unspecified to match 'any' value on the position.
 * ex. 7.3.* == 7.3.15, * == 1.1.1, 0.8 == 0.8.5. '' != 0.8.5
 *
 *
 * @param {string} expected version.
 * @param {string} provided to check against the expected version.
 * @returns {boolean} True if the response matches the version, false otherwise.
 * @example
 * ``` typescript
 * const result = provider.isVersion("0.9","0.9.0");
 * // result = true
 * ```
 */
export function isVersion(expected: string, provided: string): boolean {
  const expectedParts = expected.split('.');
  const providedParts = provided.split('.');

  return expectedParts.every((part, index) => part === '*' || part === providedParts[index]);
}

/**
 * Define if provided version is SDK supported rpc specification version
 */
export function isSupportedSpecVersion(
  version: string,
  options: { allowAnyPatchVersion: boolean } = { allowAnyPatchVersion: false }
): version is SupportedRpcVersion {
  return Object.values(SupportedRpcVersion).some((v) =>
    isVersion(options.allowAnyPatchVersion ? toAnyPatchVersion(v) : v, version)
  );
}

/**
 * Convert fixed version to any patch version.
 * ex. 0.8.1 -> 0.8.*
 */
export function toAnyPatchVersion(version: string) {
  const parts = version.split('.');
  if (parts.length < 3) {
    return version;
  }
  return `${parts[0]}.${parts[1]}.*`;
}

/**
 * Convert version to API format.
 * ex. '0.8.1' -> 'v0_8', '0.8' -> 'v0_8'
 * @param {string} version
 * @returns {string}
 */
export function toApiVersion(version: string): string {
  const [major, minor] = version.replace(/^v/, '').split('.');
  return `v${major}_${minor}`;
}

/**
 * Compare two semantic version strings segment by segment.
 * This function safely compares versions without collision risk between
 * versions like '0.0.1000' and '0.1.0'.
 *
 * @param {string} a First version string (e.g., '0.0.9')
 * @param {string} b Second version string (e.g., '0.0.10')
 * @returns {number} -1 if a < b, 0 if a === b, 1 if a > b
 * @example
 * ```typescript
 * const result1 = compareVersions('0.0.9', '0.0.10');
 * // result1 = -1 (0.0.9 < 0.0.10)
 *
 * const result2 = compareVersions('0.1.0', '0.0.1000');
 * // result2 = 1 (0.1.0 > 0.0.1000, correctly different!)
 *
 * const result3 = compareVersions('1.2.3', '1.2.3');
 * // result3 = 0 (equal versions)
 *
 * // Usage for version checks:
 * if (compareVersions(specVersion, '0.14.1') >= 0) {
 *   // Use Blake2s hash for version >= 0.14.1
 * }
 * ```
 */
export function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  const maxLen = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLen; i += 1) {
    const aNum = aParts[i] || 0;
    const bNum = bParts[i] || 0;

    if (aNum > bNum) return 1;
    if (aNum < bNum) return -1;
  }

  return 0;
}

/**
 * Guard Pre Confirmed Block
 * @param {GetBlockResponse} response answer of myProvider.getBlock()
 * @return {boolean} true if block is the pre confirmed block
 * @example
 * ```typescript
 * const block = await myProvider.getBlock("pre_confirmed");
 * const result = provider.isPreConfirmedBlock(block);
 * // result = true
 * ```
 */
export function isPreConfirmedBlock(response: GetBlockResponse): response is PreConfirmedBlock {
  return response.status === EBlockStatus.PRE_CONFIRMED;
}

/**
 * Guard Pre Confirmed Transaction
 * @param {GetTransactionReceiptResponse} response transaction Receipt
 * @return {boolean} true if the transaction is part of the pre confirmed block
 * @example
 * ```typescript
 * const block = await myProvider.getBlockWithTxs("pre_confirmed");
 * const txR = await myProvider.getTransactionReceipt(block.transactions[0].transaction_hash);
 * const result = provider.isPreConfirmedTransaction(txR);
 * // result = true
 * ```
 */
export function isPreConfirmedTransaction(response: GetTransactionReceiptResponse): boolean {
  return !('block_hash' in response);
}

/**
 * Guard Pre Confirmed State Update
 * @param {StateUpdateResponse} response State of a block
 * @return {boolean} true if the block is pre confirmed
 * @example
 * ```typescript
 * const state: StateUpdateResponse = await myProvider.getStateUpdate("pre_confirmed");
 * const result = provider.isPreConfirmedStateUpdate(state);
 * // result = true
 * ```
 */
export function isPreConfirmedStateUpdate(
  response: StateUpdateResponse
): response is PreConfirmedStateUpdate {
  return !('block_hash' in response);
}
