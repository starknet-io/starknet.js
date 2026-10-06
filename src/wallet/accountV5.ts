import type {
  AddStarknetChainParameters,
  Signature,
  WatchAssetParameters,
} from '@starknet-io/starknet-types-0101';

import type {
  WalletWithStarknetFeatures,
  StandardEventsChangeProperties,
} from '@starknet-io/get-starknet-wallet-standard/features';

import { Account } from '../account';
import { StarknetChainId } from '../global/constants';
import { ProviderInterface } from '../provider';
import {
  AllowArray,
  CairoVersion,
  Call,
  CompiledSierra,
  DeclareContractPayload,
  MultiDeployContractResponse,
  ProviderOptions,
  TypedData,
  UniversalDeployerContractPayload,
  type PaymasterOptions,
} from '../types';
import { extractContractHashes } from '../utils/contract';
import { stringify } from '../utils/json';
import {
  addDeclareTransaction,
  addInvokeTransaction,
  addStarknetChain,
  getPermissions,
  standardConnect,
  subscribeWalletEvent,
  requestAccounts,
  signMessage,
  switchStarknetChain,
  watchAsset,
} from './connectV5';
import type { WalletAccountV5Options } from './types/index.type';
import type { PaymasterInterface } from '../paymaster';
import { defaultDeployer } from '../deployer';

/**
 * Account that lets a browser wallet sign and send the transactions, using get-starknet v5.
 *
 * The private key stays in the wallet. Reads go to the RPC node of the provider, writes go to
 * the wallet. It works only in a DAPP, not in a Node.js script.
 * For a new DAPP, use {@link WalletAccountV6} (get-starknet v6) instead.
 *
 * Create it with {@link WalletAccountV5.connect}. The address and the chain ID follow the
 * wallet automatically when the user changes them.
 * @example
 * ```typescript
 * import { createStore } from '@starknet-io/get-starknet-discovery'; // v5.0.0 min
 * const [selectedWallet] = createStore().getWallets(); // let the user choose in your own UI
 * const myWalletAccount = await WalletAccountV5.connect(
 *   { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
 *   selectedWallet
 * );
 * const result = await myWalletAccount.execute(myCall);
 * // result = { transaction_hash: '0x...' }
 * ```
 */
export class WalletAccountV5 extends Account {
  public walletProvider: WalletWithStarknetFeatures;

  /**
   * The function to use to unsubscribe from the wallet events.
   * To call before the instance is deleted.
   */
  private unsubscribe: () => void;

  /**
   * Unsubscribe functions for the callbacks registered through {@link onChange}.
   * Released by {@link unsubscribeChange}.
   */
  private changeSubscriptions: Array<() => void> = [];

  /**
   * Prefer {@link WalletAccountV5.connect}: it also asks the wallet for the address.
   * @param {WalletAccountV5Options} options - The provider, the wallet, the account address, and
   * optionally the Cairo version and the paymaster.
   * @example
   * ```typescript
   * const myWalletAccount = new WalletAccountV5({
   *   provider: { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
   *   walletProvider: selectedWallet,
   *   address: '0x...', // an address that the user already allowed in the wallet
   * });
   * ```
   */
  constructor(options: WalletAccountV5Options) {
    super({ ...options, signer: '' }); // At this point unknown address
    this.walletProvider = options.walletProvider;

    // Update Address/network on change
    this.unsubscribe = this.walletProvider.features['standard:events'].on(
      'change',
      (change: StandardEventsChangeProperties) => {
        if (!change.accounts?.length) return;
        if (change.accounts[0].address) this.address = change.accounts[0].address;
        if (change.accounts[0].chains)
          this.provider.channel.setChainId(
            change.accounts[0].chains[0].slice(9) as StarknetChainId
          );
      }
    );
  }

  // WALLET EVENTS

  /**
   * Subscribe a callback to wallet account/network changes.
   * @param {(change: StandardEventsChangeProperties) => void} callback called on each change.
   * @returns {() => void} a function to unsubscribe this specific callback.
   * @example
   * ```typescript
   * const unsubscribe = myWalletAccount.onChange((change) => {
   *   console.log('new address =', change.accounts?.[0]?.address);
   * });
   * // Later, to stop this callback only:
   * unsubscribe();
   * ```
   */
  public onChange(callback: (change: StandardEventsChangeProperties) => void): () => void {
    const unsubscribe = subscribeWalletEvent(this.walletProvider, callback);
    this.changeSubscriptions.push(unsubscribe);
    return unsubscribe;
  }

  /**
   * Unsubscribe from all wallet events, including the callbacks registered through {@link onChange}.
   * To call before the instance is deleted.
   * @example
   * ```typescript
   * // In the cleanup of a React effect, or before you stop using the instance:
   * myWalletAccount.unsubscribeChange();
   * ```
   */
  public unsubscribeChange(): void {
    this.unsubscribe();
    this.changeSubscriptions.forEach((unsubscribe) => unsubscribe());
    this.changeSubscriptions = [];
  }

  // WALLET SPECIFIC METHODS

  /**
   * Ask the wallet for the addresses that the user allowed for this DAPP.
   * @param {boolean} [silentMode=false] - false: the wallet can ask the user. true: no window;
   * only the addresses already allowed are returned.
   * @returns {Promise<Address[]>} The allowed addresses.
   * @example
   * ```typescript
   * const addresses = await myWalletAccount.requestAccounts();
   * // addresses = ['0x...']
   * ```
   */
  public requestAccounts(silentMode = false) {
    return requestAccounts(this.walletProvider, silentMode);
  }

  /**
   * Ask the wallet if this DAPP is allowed.
   * @returns {Promise<Permission[]>} `['accounts']` when the DAPP is allowed.
   * @example
   * ```typescript
   * const permissions = await myWalletAccount.getPermissions();
   * // permissions = ['accounts']
   * ```
   */
  public getPermissions() {
    return getPermissions(this.walletProvider);
  }

  /**
   * Ask the wallet to change its current network.
   * @param {StarknetChainId} chainId - The network to use.
   * @returns {Promise<boolean>} true if the wallet changed the network.
   * @example
   * ```typescript
   * const changed = await myWalletAccount.switchStarknetChain(constants.StarknetChainId.SN_SEPOLIA);
   * // changed = true
   * ```
   */
  public switchStarknetChain(chainId: StarknetChainId) {
    return switchStarknetChain(this.walletProvider, chainId);
  }

  /**
   * Ask the wallet to display a token in its list.
   * @param {WatchAssetParameters} asset - The token to display.
   * @returns {Promise<boolean>} true if the token was added.
   * @example
   * ```typescript
   * const added = await myWalletAccount.watchAsset({ type: 'ERC20', options: { address: tokenAddress } });
   * // added = true
   * ```
   */
  public watchAsset(asset: WatchAssetParameters) {
    return watchAsset(this.walletProvider, asset);
  }

  /**
   * Ask the wallet to add a custom Starknet network.
   * @param {AddStarknetChainParameters} chain - The network to add.
   * @returns {Promise<boolean>} true if the network was added.
   * @example
   * ```typescript
   * const added = await myWalletAccount.addStarknetChain({
   *   id: 'my-devnet',
   *   chain_id: '0x534e5f5345504f4c4941',
   *   chain_name: 'My devnet',
   *   rpc_urls: ['http://127.0.0.1:5050/rpc'],
   * });
   * // added = true
   * ```
   */
  public addStarknetChain(chain: AddStarknetChainParameters) {
    return addStarknetChain(this.walletProvider, chain);
  }

  // ACCOUNT METHODS

  /**
   * Ask the wallet to sign and send an invoke transaction. The wallet shows the calls to the
   * user and chooses the fee itself.
   * @param {AllowArray<Call>} calls - The call(s) to execute.
   * @returns {Promise<AddInvokeTransactionResult>} The hash of the transaction.
   * @example
   * ```typescript
   * const result = await myWalletAccount.execute(myContract.populate('increase', [10]));
   * // result = { transaction_hash: '0x...' }
   * ```
   */
  override execute(calls: AllowArray<Call>) {
    const txCalls = [].concat(calls as any).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata,
      };
    });

    const params = {
      calls: txCalls,
    };

    return addInvokeTransaction(this.walletProvider, params);
  }

  /**
   * Ask the wallet to sign and send a declare transaction (Cairo 1 contract).
   * The compiled class hash is required: give `casm`, or `compiledClassHash`.
   * @param {DeclareContractPayload} payload - The contract to declare.
   * @returns {Promise<AddDeclareTransactionResult>} The hash of the transaction and the class hash.
   * @example
   * ```typescript
   * const result = await myWalletAccount.declare({ contract: compiledSierra, casm: compiledCasm });
   * // result = { transaction_hash: '0x...', class_hash: '0x...' }
   * ```
   */
  override declare(payload: DeclareContractPayload) {
    const declareContractPayload = extractContractHashes(payload);
    // DISCUSS: HOTFIX: Adapt Abi format
    const pContract = payload.contract as CompiledSierra;
    const cairo1Contract = {
      ...pContract,
      abi: stringify(pContract.abi),
    };
    if (!declareContractPayload.compiledClassHash) {
      throw Error('compiledClassHash is required');
    }
    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };
    return addDeclareTransaction(this.walletProvider, params);
  }

  /**
   * Deploy contract(s) with the Universal Deployer Contract (UDC). The wallet signs and sends
   * one invoke transaction.
   * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload - The
   * contract(s) to deploy.
   * @returns {Promise<MultiDeployContractResponse>} The hash of the transaction, and the addresses
   * of the new contracts.
   * @example
   * ```typescript
   * const result = await myWalletAccount.deploy({ classHash, constructorCalldata: [] });
   * // result = { transaction_hash: '0x...', contract_address: ['0x...'] }
   * ```
   */
  override async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = defaultDeployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls);
    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  /**
   * Ask the wallet to sign a SNIP-12 typed message.
   * @param {TypedData} typedData - The message to sign.
   * @returns {Promise<Signature>} The signature, as an array of strings.
   * @example
   * ```typescript
   * const signature = await myWalletAccount.signMessage(myTypedData);
   * // signature = ['0x...', '0x...']
   * ```
   */
  override signMessage(typedData: TypedData): Promise<Signature> {
    return signMessage(this.walletProvider, typedData);
  }

  /**
   * Connect to a wallet, and create the account of the address that the user selected in it.
   *
   * The wallet asks the user to allow this DAPP. If the user refuses, there is no error: the
   * account is created with an `undefined` address.
   * @param {ProviderOptions | ProviderInterface} provider - The provider used to read Starknet,
   * or its options (e.g. `{ nodeUrl }`).
   * @param {WalletWithStarknetFeatures} walletProvider - The wallet selected by the user
   * (get-starknet v5).
   * @param {CairoVersion} [cairoVersion] - Cairo version of the account. Optional: detected if
   * not provided.
   * @param {PaymasterOptions | PaymasterInterface} [paymaster] - The paymaster to use with this
   * account.
   * @param {boolean} [silentMode=false] - true: no window; it works only if the user already
   * allowed this DAPP.
   * @returns {Promise<WalletAccountV5>} The account.
   * @example
   * ```typescript
   * const myWalletAccount = await WalletAccountV5.connect(
   *   { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
   *   selectedWallet
   * );
   * // With a paymaster. The parameters are positional, so cairoVersion must be given:
   * const myPaymasterAccount = await WalletAccountV5.connect(
   *   myProvider,
   *   selectedWallet,
   *   undefined, // cairoVersion: detected
   *   myPaymasterRpc
   * );
   * ```
   */
  static async connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    // Cairo 0 specific: when Cairo 0 support is dropped, keep this parameter, here and in
    // connectSilent, only if Starknet still holds Cairo 0 contracts; otherwise remove it.
    // Beware: it is positional, and `paymaster` comes after it.
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode: boolean = false
  ) {
    // Use the wallet-standard `standard:connect` feature to authorize accounts AND prime
    // the wrapper internal state, so that subsequent wallet events propagate (see onChange).
    // Empty `accounts` (user refusal / silent without session) leaves the address undefined,
    // matching the previous behavior — no crash.
    const { accounts } = await standardConnect(walletProvider, silentMode);
    const accountAddress = accounts[0]?.address;
    return new WalletAccountV5({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }

  /**
   * Same as {@link WalletAccountV5.connect} with `silentMode` true: no window is shown, so it
   * works only if the user already allowed this DAPP (for example, to connect again after a
   * page reload). Otherwise, the account is created with an `undefined` address.
   * @param {ProviderOptions | ProviderInterface} provider - The provider used to read Starknet,
   * or its options.
   * @param {WalletWithStarknetFeatures} walletProvider - The wallet selected by the user.
   * @param {CairoVersion} [cairoVersion] - Cairo version of the account. Optional: detected if
   * not provided.
   * @param {PaymasterOptions | PaymasterInterface} [paymaster] - The paymaster to use with this
   * account.
   * @returns {Promise<WalletAccountV5>} The account.
   * @example
   * ```typescript
   * const myWalletAccount = await WalletAccountV5.connectSilent(myProvider, selectedWallet);
   * // myWalletAccount.address is undefined if this DAPP is not allowed yet
   * ```
   */
  static async connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ) {
    return WalletAccountV5.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }

  // TODO: MISSING ESTIMATES
}
