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
  strk20ShadowAccountCommitment,
  switchStarknetChain,
} from './connectV6';
import { StarknetChainId } from '../global/constants';
import type { WalletAccountV6Options } from './types/index.type';
import type { STRK20_ACTION, STRK20_CALL_AND_PROOF } from './types/strk20.type';

/**
 * Account that lets a browser wallet sign and send the transactions, using get-starknet v6.
 * This is the recommended class for a new DAPP.
 *
 * It extends {@link WalletAccountV5}: same methods, plus the STRK20 privacy protocol
 * (`strk20Balances`, `strk20PrepareInvoke`, `strk20InvokeTransaction`,
 * `strk20ShadowAccountCommitment` and `executeWithProof`).
 * It needs `@starknet-io/get-starknet-discovery` and `@starknet-io/get-starknet-wallet-standard`
 * v6.0.6 min.
 *
 * The `walletProvider` property keeps the type of get-starknet v5. To call a `walletV6`
 * function, give it the wallet that you selected, not `walletProvider`.
 * @example
 * ```typescript
 * import { createStore } from '@starknet-io/get-starknet-discovery'; // v6.0.6 min
 * const [selectedWallet] = createStore().getWallets(); // let the user choose in your own UI
 * const myWalletAccount = await WalletAccountV6.connect(
 *   { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
 *   selectedWallet
 * );
 * const chainId = await walletV6.requestChainId(selectedWallet);
 * // chainId = '0x534e5f5345504f4c4941' (the wallet is on Sepolia)
 * ```
 */
// @ts-ignore — TS2417: static `connect` parameter type (WalletWithStarknetFeaturesV6 from types-js@0.10.x)
// is intentionally incompatible with WalletAccountV5's (types-js@0.7.x); runtime behavior is correct.
export class WalletAccountV6 extends WalletAccountV5 {
  /**
   * Prefer {@link WalletAccountV6.connect}: it also asks the wallet for the address.
   * @param {WalletAccountV6Options} options - The provider, the wallet, the account address, and
   * optionally the Cairo version and the paymaster.
   * @example
   * ```typescript
   * const myWalletAccount = new WalletAccountV6({
   *   provider: { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
   *   walletProvider: selectedWallet,
   *   address: '0x...', // an address that the user already allowed in the wallet
   * });
   * ```
   */
  constructor(options: WalletAccountV6Options) {
    super({ ...options, walletProvider: options.walletProvider as any });
    this.walletProvider = options.walletProvider as any;
  }

  private get v6Provider(): WalletWithStarknetFeaturesV6 {
    return this.walletProvider as unknown as WalletWithStarknetFeaturesV6;
  }

  /**
   * Ask the wallet to change its current network.
   * @param {StarknetChainId} chainId - The network to use.
   * @param {boolean} [silent_mode=false] - Sent to the wallet as `silent_mode`: true asks the
   * wallet not to show its window.
   * @returns {Promise<boolean>} true if the wallet changed the network.
   * @example
   * ```typescript
   * const changed = await myWalletAccount.switchStarknetChain(constants.StarknetChainId.SN_SEPOLIA);
   * // changed = true
   * ```
   */
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
   *
   * Reading a shielded balance requires the user approval, and this approval is time
   * limited: `validUntil` requests when it expires. When it is omitted, the wallet applies
   * its own default window.
   * @param {Address[]} tokens - The tokens to get the private balance of. An empty array returns every shielded token.
   * @param {number} [validUntil] - Requested expiry of the balance read authorization, as a Unix timestamp in seconds. Omit it to let the wallet apply its default window.
   * @returns {Promise<STRK20_BALANCE_ENTRY[]>} One entry per token.
   * @example
   * ```typescript
   * const balances = await myWalletAccount.strk20Balances([strkAddress]);
   * // balances = [{ token: '0x4718...', balance: '0x2386f26fc10000' }]
   *
   * // Asking for a 5-minute authorization window:
   * const expiry = Math.floor(Date.now() / 1000) + 300;
   * const fresh = await myWalletAccount.strk20Balances([strkAddress], expiry);
   * // fresh = [{ token: '0x4718...', balance: '0x2386f26fc10000' }]
   * ```
   */
  public strk20Balances(tokens: Address[], validUntil?: number): Promise<STRK20_BALANCE_ENTRY[]> {
    return strk20Balances(this.v6Provider, tokens, validUntil);
  }

  /**
   * Build the Starknet call and the SNIP-36 zero-knowledge proof of a STRK20 transaction,
   * without submitting it: the DAPP submits the returned call itself, and therefore pays
   * the fee (the wallet adds no fee action in this mode).
   *
   * With `simulate` set to true, the wallet skips the expensive proof generation and
   * returns an empty proof: the call is then NOT submittable on-chain, and is only useful
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
   * Compute the commitment of a DAPP STRK20 shadow account. The commitment is computed
   * locally by the wallet from the user private state; no transaction is sent.
   *
   * When `nonce` is given, the full commitment of this single shadow account is returned.
   * When `nonce` is omitted, the partial (nonce independent) commitment is returned
   * instead: it is shared by every shadow account the user derives for this DAPP, so it
   * can be published once to let a DAPP recognize all the shadow accounts of a user
   * without learning any individual nonce.
   * @param {STRK20_DAPP_NAME} dappName - The DAPP that scopes the shadow account(s).
   * @param {FELT} [nonce] - The shadow account nonce; each nonce selects a distinct shadow account for this user + DAPP. Omit it to get the partial commitment.
   * @returns {Promise<FELT>} The shadow account commitment.
   * @example
   * ```typescript
   * const commitment = await myWalletAccount.strk20ShadowAccountCommitment('myDapp', '0x0');
   * // commitment = '0x5f2e...'
   * ```
   */
  public strk20ShadowAccountCommitment(dappName: STRK20_DAPP_NAME, nonce?: FELT): Promise<FELT> {
    return strk20ShadowAccountCommitment(this.v6Provider, dappName, nonce);
  }

  /**
   * Connect to a wallet, and create the account of the address that the user selected in it.
   *
   * The wallet asks the user to allow this DAPP. If the user refuses, there is no error: the
   * account is created with an `undefined` address.
   * @param {ProviderOptions | ProviderInterface} provider - The provider used to read Starknet,
   * or its options (e.g. `{ nodeUrl }`).
   * @param {WalletWithStarknetFeaturesV6} walletProvider - The wallet selected by the user
   * (get-starknet v6).
   * @param {CairoVersion} [cairoVersion] - Cairo version of the account. Optional: detected if
   * not provided.
   * @param {PaymasterOptions | PaymasterInterface} [paymaster] - The paymaster to use with this
   * account.
   * @param {boolean} [silentMode=false] - true: no window; it works only if the user already
   * allowed this DAPP.
   * @returns {Promise<WalletAccountV6>} The account.
   * @example
   * ```typescript
   * const myWalletAccount = await WalletAccountV6.connect(
   *   { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
   *   selectedWallet
   * );
   * // With a paymaster. The parameters are positional, so cairoVersion must be given:
   * const myPaymasterAccount = await WalletAccountV6.connect(
   *   myProvider,
   *   selectedWallet,
   *   undefined, // cairoVersion: detected
   *   myPaymasterRpc
   * );
   * ```
   */
  static async connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeaturesV6,
    // Cairo 0 specific: when Cairo 0 support is dropped, keep this parameter, here and in
    // connectSilent, only if Starknet still holds Cairo 0 contracts; otherwise remove it.
    // Beware: it is positional, and `paymaster` comes after it.
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

  /**
   * Same as {@link WalletAccountV6.connect} with `silentMode` true: no window is shown, so it
   * works only if the user already allowed this DAPP (for example, to connect again after a
   * page reload). Otherwise, the account is created with an `undefined` address.
   * @param {ProviderOptions | ProviderInterface} provider - The provider used to read Starknet,
   * or its options.
   * @param {WalletWithStarknetFeaturesV6} walletProvider - The wallet selected by the user.
   * @param {CairoVersion} [cairoVersion] - Cairo version of the account. Optional: detected if
   * not provided.
   * @param {PaymasterOptions | PaymasterInterface} [paymaster] - The paymaster to use with this
   * account.
   * @returns {Promise<WalletAccountV6>} The account.
   * @example
   * ```typescript
   * const myWalletAccount = await WalletAccountV6.connectSilent(myProvider, selectedWallet);
   * // myWalletAccount.address is undefined if this DAPP is not allowed yet
   * ```
   */
  static async connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeaturesV6,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ): Promise<WalletAccountV6> {
    return WalletAccountV6.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }
}
