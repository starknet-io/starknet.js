import type {
  STRK20_CALL_AND_PROOF as STRK20_CALL_AND_PROOF_SPEC,
  STRK20_DEPOSIT_ACTION,
  STRK20_INVOKE_ACTION,
  STRK20_SUBACCOUNT_INVOKE_ACTION as STRK20_SUBACCOUNT_INVOKE_ACTION_SPEC,
  STRK20_TRANSFER_ACTION,
  STRK20_WITHDRAW_ACTION,
} from '@starknet-io/starknet-types-0104';
import type { Call } from '../../types';

/**
 * STRK20 types as exposed to a DAPP by `WalletAccountV6`.
 *
 * They mirror the wallet-api spec types, except that every embedded call is a Starknet.js
 * `Call` instead of a wallet-api `INVOKE_CALL`. A DAPP therefore never handles the
 * snake_case spec shape: `WalletAccountV6` converts in both directions (see `adapterV6.ts`).
 * The raw spec types remain available through the `RPC` namespace.
 */

/**
 * Invokes one or more contract calls through the user's STRK20 sub-account for a DAPP,
 * routed via the sub-account anonymizer. The sub-account is selected by (`dapp_name`,
 * `nonce`); each nonce maps to a distinct, deterministic sub-account.
 *
 * The proceeds of the calls are settled into the open notes created by `transfer` actions
 * with `amount: "OPEN"` in the same transaction, so the number of open notes filled by
 * this action must match the number of open notes created in the transaction.
 * @example
 * ```typescript
 * const action: STRK20_SUBACCOUNT_INVOKE_ACTION = {
 *   type: 'subaccount_invoke',
 *   dapp_name: 'myDapp',
 *   nonce: '0x0',
 *   calls: [myContract.populate('stake', { amount: 1000n })],
 *   collect_policy: { type: 'diff' },
 * };
 * ```
 */
export type STRK20_SUBACCOUNT_INVOKE_ACTION = Omit<
  STRK20_SUBACCOUNT_INVOKE_ACTION_SPEC,
  'calls'
> & {
  /** The contract calls to execute through the sub-account, in order (min 1). */
  calls: Call[];
};

/**
 * A single action to perform via the STRK20 privacy protocol. The `type` field
 * discriminates the variant.
 * @example
 * ```typescript
 * const actions: STRK20_ACTION[] = [
 *   { type: 'withdraw', token: strkAddress, amount: '0x2386f26fc10000', recipient: subAccountAddr },
 *   { type: 'transfer', token: strkAddress, amount: 'OPEN', recipient: myAddress },
 *   {
 *     type: 'subaccount_invoke',
 *     dapp_name: 'myDapp',
 *     nonce: '0x0',
 *     calls: [myContract.populate('stake', { amount: 1000n })],
 *     collect_policy: { type: 'all' },
 *   },
 * ];
 * ```
 */
export type STRK20_ACTION =
  | STRK20_DEPOSIT_ACTION
  | STRK20_WITHDRAW_ACTION
  | STRK20_TRANSFER_ACTION
  | STRK20_INVOKE_ACTION
  | STRK20_SUBACCOUNT_INVOKE_ACTION;

/**
 * A Starknet call built by the wallet, together with the SNIP-36 zero-knowledge proof
 * needed to submit it. In simulate mode the proof fields are present but empty, in which
 * case the call is not submittable on-chain and is only useful for fee estimation or UI
 * previews.
 * @example
 * ```typescript
 * const { call, proof }: STRK20_CALL_AND_PROOF = await myWalletAccount.strk20PrepareInvoke(actions);
 * // `call` is a Starknet.js Call, ready to be submitted by the DAPP:
 * const { transaction_hash } = await mySponsorAccount.execute(call, {
 *   proof: proof.data,
 *   proofFacts: proof.proof_facts,
 * });
 * ```
 */
export type STRK20_CALL_AND_PROOF = Omit<STRK20_CALL_AND_PROOF_SPEC, 'call'> & {
  /** The Starknet call to submit. */
  call: Call;
};
