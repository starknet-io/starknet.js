import { Account } from '../account';
import { StarknetChainId } from '../global/constants';
import { ProviderInterface } from '../provider';
import type {
  AllowArray,
  CairoVersion,
  Call,
  CompiledSierra,
  DeclareContractPayload,
  MultiDeployContractResponse,
  ProviderOptions,
  TypedData,
  UniversalDeployerContractPayload,
} from '../types';
import { extractContractHashes } from '../utils/contract';
import { stringify } from '../utils/json';
import {
  addDeclareTransaction,
  addInvokeTransaction,
  addStarknetChain,
  getPermissions,
  onAccountChange,
  onNetworkChanged,
  requestAccounts,
  signMessage,
  switchStarknetChain,
  watchAsset,
} from './connect';
import type { StarknetWalletProvider, WalletAccountV4Options } from './types/index.type';
import type { PaymasterOptions } from '../paymaster/types/index.type';
import type { PaymasterInterface } from '../paymaster';
import {
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
  WatchAssetParameters,
  AddStarknetChainParameters,
  Signature,
} from '../types/api';

/**
 * @deprecated Use {@link WalletAccountV6} (get-starknet v6) instead. This class is kept only for
 * DAPPs that are still on get-starknet v4.
 *
 * @remarks
 * Account that lets a wallet sign and send the transactions, using get-starknet v4.
 * It represents the 'Selected Active' Account inside the Connected Wallet.
 *
 * The private key stays in the wallet. Reads go to the RPC node given at the instantiation,
 * writes go to the wallet. It works only in a DAPP, not in a Node.js script.
 *
 * The wallet is selected with the `get-starknet` v4 library. Its `connect()` function opens a
 * window with the list of wallets. It returns the `StarknetWindowObject` (SWO) of the wallet that
 * the user selected. With `get-starknet-core` v4 you can also build your own UI and logic. See
 * [this DAPP](https://github.com/PhilippeR26/Starknet-WalletAccount/blob/53514a5529c4aebe9e7c6331186e83b7a7310ce0/src/app/components/client/WalletHandle/SelectWallet.tsx)
 * for an example where only the wallets compatible with the Starknet Wallet API can be selected.
 *
 * The address and the chain ID follow the wallet automatically. This can lead to reads and
 * writes on different networks, so create a new instance each time the account or the network
 * changes.
 *
 * The wallet emits 2 events: `accountsChanged` and `networkChanged`.
 * A change of network emits both. A change of account emits only `accountsChanged`.
 * You can subscribe with the SWO (`on`) or with the `onAccountChange` and `onNetworkChanged`
 * methods of this class. To unsubscribe, call `off` on the SWO with the same function.
 *
 * Needs `@starknet-io/get-starknet` v4.0.3 min.
 *
 * @example
 * ```typescript
 * import { connect } from '@starknet-io/get-starknet';
 * import { WalletAccount, wallet } from 'starknet';
 * const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
 * const myWalletAccount = await WalletAccount.connect(
 *   { nodeUrl: 'https://api.zan.top/public/starknet-sepolia/rpc/v0_10' },
 *   selectedWalletSWO
 * );
 * // The wallet writes on this network:
 * const writeChainId = await wallet.requestChainId(myWalletAccount.walletProvider);
 * // writeChainId = '0x534e5f5345504f4c4941' (SN_SEPOLIA, if the wallet is on Sepolia)
 * // The provider reads on this network:
 * const readChainId = await myWalletAccount.provider.getChainId();
 * // readChainId = '0x534e5f5345504f4c4941'
 * ```
 * @example
 * ```typescript
 * // Subscribe with the wallet object (SWO). Unsubscribe with `.off` and the same function.
 * const handleAccount: AccountChangeEventHandler = (accounts: string[] | undefined) => {
 *   if (accounts?.length) console.log('new address =', accounts[0]);
 * };
 * const handleNetwork: NetworkChangeEventHandler = (chainId?: string) => {
 *   if (chainId) console.log('new chain =', chainId);
 * };
 * selectedWalletSWO.on('accountsChanged', handleAccount);
 * selectedWalletSWO.on('networkChanged', handleNetwork);
 * selectedWalletSWO.off('accountsChanged', handleAccount);
 * selectedWalletSWO.off('networkChanged', handleNetwork);
 * ```
 */
export class WalletAccount extends Account {
  public walletProvider: StarknetWalletProvider;

  constructor(options: WalletAccountV4Options) {
    super({ ...options, signer: '' }); // At this point unknown address
    this.walletProvider = options.walletProvider;

    // Update Address on change
    this.walletProvider.on('accountsChanged', (res) => {
      if (!res) return;
      this.address = res[0].toLowerCase();
    });

    // Update Channel chainId on Network change
    this.walletProvider.on('networkChanged', (res) => {
      if (!res) return;
      // Determine is it better to set chainId or replace channel with new one
      // At the moment channel is stateless but it could change
      this.provider.channel.setChainId(res as StarknetChainId);
    });
  }

  // WALLET EVENTS
  public onAccountChange(callback: AccountChangeEventHandler): void {
    onAccountChange(this.walletProvider, callback);
  }

  public onNetworkChanged(callback: NetworkChangeEventHandler): void {
    onNetworkChanged(this.walletProvider, callback);
  }

  // WALLET SPECIFIC METHODS
  public requestAccounts(silentMode = false) {
    return requestAccounts(this.walletProvider, silentMode);
  }

  public getPermissions() {
    return getPermissions(this.walletProvider);
  }

  public switchStarknetChain(chainId: StarknetChainId) {
    return switchStarknetChain(this.walletProvider, chainId);
  }

  public watchAsset(asset: WatchAssetParameters) {
    return watchAsset(this.walletProvider, asset);
  }

  public addStarknetChain(chain: AddStarknetChainParameters) {
    return addStarknetChain(this.walletProvider, chain);
  }

  // ACCOUNT METHODS
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

  override async declare(payload: DeclareContractPayload) {
    const declareContractPayload = extractContractHashes(
      payload,
      await this.provider.channel.getStarknetVersion()
    );

    // DISCUSS: HOTFIX: Adapt Abi format
    const pContract = payload.contract as CompiledSierra;
    const cairo1Contract = {
      ...pContract,
      abi: stringify(pContract.abi),
    };

    // Check FIx
    if (!declareContractPayload.compiledClassHash) {
      throw Error('compiledClassHash is required');
    }

    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };

    return addDeclareTransaction(this.walletProvider, params);
  }

  override async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = this.deployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls);

    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  override signMessage(typedData: TypedData): Promise<Signature> {
    return signMessage(this.walletProvider, typedData);
  }

  static async connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: StarknetWalletProvider,
    // Cairo 0 specific: when Cairo 0 support is dropped, keep this parameter, here and in
    // connectSilent, only if Starknet still holds Cairo 0 contracts; otherwise remove it.
    // Beware: it is positional, and `paymaster` comes after it.
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode: boolean = false
  ) {
    const [accountAddress] = await requestAccounts(walletProvider, silentMode);
    return new WalletAccount({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }

  static async connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: StarknetWalletProvider,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ) {
    return WalletAccount.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }

  // TODO: MISSING ESTIMATES
}
