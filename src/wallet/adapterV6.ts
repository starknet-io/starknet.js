import type {
  Call as WalletApiCall,
  STRK20_ACTION as STRK20_ACTION_SPEC,
} from '@starknet-io/starknet-types-0104';
import type { Call } from '../types';
import { CallData } from '../utils/calldata';
import type { STRK20_ACTION } from './types/strk20.type';

/**
 * Adapters between the Starknet.js `Call` and the wallet-api `INVOKE_CALL`.
 *
 * The wallet-api spec names its call fields in snake_case and expects the calldata as an
 * array of hex felts, while Starknet.js uses camelCase and accepts uncompiled arguments.
 * A DAPP only ever manipulates the Starknet.js `Call` — the one returned by
 * `myContract.populate()` — so the conversion happens here, at the wallet boundary, in
 * both directions.
 */

/**
 * Convert a Starknet.js call to the wallet-api format.
 * @param {Call} call - The Starknet.js call, as produced by `myContract.populate()`.
 * @returns {WalletApiCall} The same call, in the wallet-api format.
 * @example
 * ```typescript
 * const result = toWalletApiCall({
 *   contractAddress: '0x123',
 *   entrypoint: 'transfer',
 *   calldata: [10, 0],
 * });
 * // result = { contract_address: '0x123', entry_point: 'transfer', calldata: ['0xa', '0x0'] }
 * ```
 */
export function toWalletApiCall(call: Call): WalletApiCall {
  return {
    contract_address: call.contractAddress,
    entry_point: call.entrypoint,
    calldata: CallData.toHex(call.calldata),
  };
}

/**
 * Convert a wallet-api call to the Starknet.js format, so that a call returned by the
 * wallet can be handed straight to `execute()`, `executeWithProof()` or `estimateInvokeFee()`.
 * @param {WalletApiCall} call - The call as returned by the wallet.
 * @returns {Call} The same call, in the Starknet.js format.
 * @example
 * ```typescript
 * const result = fromWalletApiCall({
 *   contract_address: '0x123',
 *   entry_point: 'transfer',
 *   calldata: ['0xa', '0x0'],
 * });
 * // result = { contractAddress: '0x123', entrypoint: 'transfer', calldata: ['0xa', '0x0'] }
 * ```
 */
export function fromWalletApiCall(call: WalletApiCall): Call {
  return {
    contractAddress: call.contract_address,
    entrypoint: call.entry_point,
    calldata: call.calldata ?? [],
  };
}

/**
 * Convert a list of STRK20 actions to the wallet-api format. Only the `shadow_account_invoke`
 * action embeds calls; every other action is already spec-shaped and is passed through
 * untouched.
 * @param {STRK20_ACTION[]} actions - The STRK20 actions, holding Starknet.js calls.
 * @returns {STRK20_ACTION_SPEC[]} The same actions, holding wallet-api calls.
 * @example
 * ```typescript
 * const result = toWalletApiActions([
 *   {
 *     type: 'shadow_account_invoke',
 *     dapp_name: 'myDapp',
 *     nonce: '0x0',
 *     calls: [{ contractAddress: '0x123', entrypoint: 'stake', calldata: [] }],
 *     collect_policy: { type: 'all' },
 *   },
 * ]);
 * // result = [{
 * //   type: 'shadow_account_invoke',
 * //   dapp_name: 'myDapp',
 * //   nonce: '0x0',
 * //   calls: [{ contract_address: '0x123', entry_point: 'stake', calldata: [] }],
 * //   collect_policy: { type: 'all' },
 * // }]
 * ```
 */
export function toWalletApiActions(actions: STRK20_ACTION[]): STRK20_ACTION_SPEC[] {
  return actions.map((action) =>
    action.type === 'shadow_account_invoke'
      ? { ...action, calls: action.calls.map(toWalletApiCall) }
      : action
  );
}
