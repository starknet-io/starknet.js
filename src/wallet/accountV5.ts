import type {
  AddStarknetChainParameters,
  Signature,
  WatchAssetParameters,
} from 'starknet-types-08';

import type { WalletWithStarknetFeatures } from '@starknet-io/get-starknet/wallet-standard/features';
import type { StandardEventsChangeProperties } from '@wallet-standard/features';

import { Account, AccountInterface } from '../account';
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
} from '../types';
import { extractContractHashes } from '../utils/contract';
import { stringify } from '../utils/json';
import { buildUDCCall } from '../utils/transaction';
import {
  addDeclareTransaction,
  addInvokeTransaction,
  addStarknetChain,
  getPermissions,
  subscribeWalletEvent,
  requestAccounts,
  signMessage,
  switchStarknetChain,
  watchAsset,
} from './connectV5';

/**
 * WalletAccountV5 class.
 * This class is used to create a wallet account that can be used to interact with a Starknet wallet browser extension, using get-starknet v5.
 */
export class WalletAccountV5 extends Account implements AccountInterface {
  public walletProvider: WalletWithStarknetFeatures;

  /**
   * The function to use to unsubscribe from the wallet events.
   * To call before the instance is deleted.
   */
  private unsubscribe: () => void;

  constructor(
    /* Node that will be used to READ Starknet */
    providerOrOptions: ProviderOptions | ProviderInterface,
    /* the get-starknet v5 wallet that will WRITE Starknet */
    walletProvider: WalletWithStarknetFeatures,
    /* Optional. To use when address is known */
    address: string,
    /* Optional cairo version of the account ("0" | "1") */
    cairoVersion?: CairoVersion
  ) {
    super(providerOrOptions, address, '', cairoVersion); // At this point unknown address
    this.walletProvider = walletProvider;

    // Update Address/network on change
    this.unsubscribe = this.walletProvider.features['standard:events'].on(
      'change',
      (change: StandardEventsChangeProperties) => {
        if (!change.accounts?.length) return;
        if (change.accounts[0].address) this.address = change.accounts[0].address;
        if (change.accounts[0].chains)
          this.channel.setChainId(change.accounts[0].chains[0].slice(9) as StarknetChainId);
      }
    );
  }

  /**
   * WALLET EVENTS
   */
  public onChange(callback: (change: StandardEventsChangeProperties) => void): void {
    subscribeWalletEvent(this.walletProvider, callback);
  }

  public unsubscribeChange(): void {
    this.unsubscribe();
  }

  /**
   * WALLET SPECIFIC METHODS
   */
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

  /**
   * ACCOUNT METHODS
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

  override async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = buildUDCCall(payload, this.address);
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
    provider: ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    silentMode: boolean = false
  ) {
    const [accountAddress] = await requestAccounts(walletProvider, silentMode);
    return new WalletAccountV5(provider, walletProvider, accountAddress, cairoVersion);
  }

  static async connectSilent(
    provider: ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion
  ) {
    return WalletAccountV5.connect(provider, walletProvider, cairoVersion, true);
  }

  // TODO: MISSING ESTIMATES
}
