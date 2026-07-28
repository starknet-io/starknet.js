import type { WalletWithStarknetFeatures as WalletWithStarknetFeaturesV6 } from '@starknet-io/get-starknet-wallet-standard-v6/features';
import type {
  STRK20_BALANCE_ENTRY,
  STRK20_DAPP_NAME,
  STRK20_PROOF,
  Address,
  FELT,
} from '@starknet-io/starknet-types-0104';
import type { AllowArray, CairoVersion, Call, ProviderOptions, PaymasterOptions } from '../types';
import type { ProviderInterface } from '../provider';
import type { PaymasterInterface } from '../paymaster';
import { WalletAccountV5 } from './accountV5';
import { fromWalletApiCall, toWalletApiActions, toWalletApiCall } from './adapterV6';
import {
  addInvokeTransaction,
  standardConnect,
  strk20Balances,
  strk20InvokeTransaction,
  strk20PrepareInvoke,
  strk20SubaccountCommitment,
  switchStarknetChain,
} from './connectV6';
import { StarknetChainId } from '../global/constants';
import type { WalletAccountV6Options } from './types/index.type';
import type { STRK20_ACTION, STRK20_CALL_AND_PROOF } from './types/strk20.type';

/**
 * WalletAccountV6 class.
 * Extends WalletAccountV5 with get-starknet v6 types and STRK20 privacy protocol methods.
 */
// @ts-ignore — TS2417: static `connect` parameter type (WalletWithStarknetFeaturesV6 from types-js@0.10.x)
// is intentionally incompatible with WalletAccountV5's (types-js@0.7.x); runtime behavior is correct.
export class WalletAccountV6 extends WalletAccountV5 {
  constructor(options: WalletAccountV6Options) {
    super({ ...options, walletProvider: options.walletProvider as any });
    this.walletProvider = options.walletProvider as any;
  }

  private get v6Provider(): WalletWithStarknetFeaturesV6 {
    return this.walletProvider as unknown as WalletWithStarknetFeaturesV6;
  }

  override switchStarknetChain(chainId: StarknetChainId, silent_mode: boolean = false) {
    return switchStarknetChain(this.v6Provider, chainId, silent_mode);
  }

  /**
   * Execute call(s) with an optional STRK20 privacy proof attached. Same signature as
   * `execute()`, with an extra parameter for the proof provided by `strk20PrepareInvoke()`.
   * @param {AllowArray<Call>} calls - The call(s) to invoke.
   * @param {STRK20_PROOF} [proof] - The SNIP-36 zero-knowledge proof to attach.
   * @returns {Promise<AddInvokeTransactionResult>} The hash of the submitted transaction.
   * @example
   * ```typescript
   * const { proof } = await myWalletAccount.strk20PrepareInvoke(actions);
   * const result = await myWalletAccount.executeWithProof(myContract.populate('claim'), proof);
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  public executeWithProof(calls: AllowArray<Call>, proof?: STRK20_PROOF) {
    const txCalls = ([] as Call[]).concat(calls).map(toWalletApiCall);
    return addInvokeTransaction(this.v6Provider, { calls: txCalls, proof });
  }

  /**
   * Get the private balances held by the user inside the STRK20 privacy pool.
   * @param {Address[]} tokens - The tokens to get the private balance of. An empty array returns every shielded token.
   * @returns {Promise<STRK20_BALANCE_ENTRY[]>} One entry per token.
   * @example
   * ```typescript
   * const balances = await myWalletAccount.strk20Balances([strkAddress]);
   * // balances = [{ token: '0x4718...', amount: '0x2386f26fc10000' }]
   * ```
   */
  public strk20Balances(tokens: Address[]): Promise<STRK20_BALANCE_ENTRY[]> {
    return strk20Balances(this.v6Provider, tokens);
  }

  /**
   * Build the Starknet call and the SNIP-36 zero-knowledge proof of a STRK20 transaction,
   * without submitting it : the DAPP submits the returned call itself, and therefore pays
   * the fee (the wallet adds no fee action in this mode).
   *
   * With `simulate` set to true, the wallet skips the expensive proof generation and
   * returns an empty proof : the call is then NOT submittable on-chain, and is only useful
   * for fee estimation or UI previews.
   * @param {STRK20_ACTION[]} actions - The STRK20 actions to perform atomically (min 1).
   * @param {boolean} [simulate] - True to skip the proof generation.
   * @returns {Promise<STRK20_CALL_AND_PROOF>} The Starknet.js call to submit, and its proof.
   * @example
   * ```typescript
   * const { call, proof } = await myWalletAccount.strk20PrepareInvoke(actions);
   * const result = await mySponsorAccount.execute(call, {
   *   proof: proof.data,
   *   proofFacts: proof.proof_facts,
   * });
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  public async strk20PrepareInvoke(
    actions: STRK20_ACTION[],
    simulate?: boolean
  ): Promise<STRK20_CALL_AND_PROOF> {
    const { call, proof } = await strk20PrepareInvoke(
      this.v6Provider,
      toWalletApiActions(actions),
      simulate
    );
    return { call: fromWalletApiCall(call), proof };
  }

  /**
   * Submit STRK20 actions as a single atomic transaction. The wallet displays an approval
   * UI, generates the SNIP-36 proof, adds the fee action, and submits — so this call may
   * take significantly longer than a standard invoke.
   * @param {STRK20_ACTION[]} actions - The STRK20 actions to perform atomically (min 1).
   * @returns {Promise<{transaction_hash: string}>} The hash of the submitted transaction.
   * @example
   * ```typescript
   * const result = await myWalletAccount.strk20InvokeTransaction(actions);
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  public strk20InvokeTransaction(actions: STRK20_ACTION[]): Promise<{ transaction_hash: string }> {
    return strk20InvokeTransaction(this.v6Provider, toWalletApiActions(actions));
  }

  /**
   * Compute the commitment of a DAPP STRK20 sub-account. The commitment is computed
   * locally by the wallet from the user private state ; no transaction is sent.
   *
   * When `nonce` is given, the full commitment of this single sub-account is returned.
   * When `nonce` is omitted, the partial (nonce independent) commitment is returned
   * instead : it is shared by every sub-account the user derives for this DAPP, so it can
   * be published once to let a DAPP recognize all the sub-accounts of a user without
   * learning any individual nonce.
   * @param {STRK20_DAPP_NAME} dappName - The DAPP that scopes the sub-account(s).
   * @param {FELT} [nonce] - The sub-account nonce ; each nonce selects a distinct sub-account for this user + DAPP. Omit it to get the partial commitment.
   * @returns {Promise<FELT>} The sub-account commitment.
   * @example
   * ```typescript
   * const commitment = await myWalletAccount.strk20SubaccountCommitment('myDapp', '0x0');
   * // commitment = '0x5f2e...'
   * ```
   */
  public strk20SubaccountCommitment(dappName: STRK20_DAPP_NAME, nonce?: FELT): Promise<FELT> {
    return strk20SubaccountCommitment(this.v6Provider, dappName, nonce);
  }

  static async connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeaturesV6,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode: boolean = false
  ): Promise<WalletAccountV6> {
    // Use the wallet-standard `standard:connect` feature to authorize accounts AND prime
    // the wrapper internal state, so that subsequent wallet events propagate (see onChange).
    // Empty `accounts` (user refusal / silent without session) leaves the address undefined,
    // matching the previous behavior — no crash.
    const { accounts } = await standardConnect(walletProvider, silentMode);
    const accountAddress = accounts[0]?.address;
    return new WalletAccountV6({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }

  static async connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeaturesV6,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ): Promise<WalletAccountV6> {
    return WalletAccountV6.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }
}
