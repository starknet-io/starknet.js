import { SupportedRpcVersion } from '../global/constants';
import {
  ETransactionVersion,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  InvocationsDetailsWithNonce,
  PendingBlock,
  PendingStateUpdate,
  StateUpdateResponse,
  V3TransactionDetails,
} from '../types';
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
 * const result = provider.isVersion("0.7","0.7.1");
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
 * Guard Pending Block
 * @param {GetBlockResponse} response answer of myProvider.getBlock()
 * @return {boolean} true if block is the pending block
 * @example
 * ```typescript
 * const block = await myProvider.getBlock("pending");
 * const result = provider.isPendingBlock(block);
 * // result = true
 * ```
 */
export function isPendingBlock(response: GetBlockResponse): response is PendingBlock {
  return response.status === 'PENDING';
}

/**
 * Guard Pending Transaction
 * @param {GetTransactionReceiptResponse} response transaction Receipt
 * @return {boolean} true if the transaction is part of the pending block
 * @example
 * ```typescript
 * const block = await myProvider.getBlockWithTxs("pending");
 * const txR = await myProvider.getTransactionReceipt(block.transactions[0].transaction_hash);
 * const result = provider.isPendingTransaction(txR);
 * // result = true
 * ```
 */
export function isPendingTransaction(response: GetTransactionReceiptResponse): boolean {
  return !('block_hash' in response);
}

/**
 * Guard Pending State Update
 * @param {StateUpdateResponse} response State of a block
 * @return {boolean} true if the block is pending
 * @example
 * ```typescript
 * const state: StateUpdateResponse = await myProvider.getStateUpdate("pending");
 * const result = provider.isPendingStateUpdate(state);
 * // result = true
 * ```
 */
export function isPendingStateUpdate(
  response: StateUpdateResponse
): response is PendingStateUpdate {
  return !('block_hash' in response);
}
