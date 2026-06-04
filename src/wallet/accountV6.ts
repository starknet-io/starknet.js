import type { WalletWithStarknetFeatures as WalletWithStarknetFeaturesV6 } from '@starknet-io/get-starknet-wallet-standard-v6/features';
import type {
  STRK20_ACTION,
  STRK20_CALL_AND_PROOF,
  STRK20_BALANCE_ENTRY,
  STRK20_PROOF,
  Address,
} from '@starknet-io/starknet-types-0103';
import type { AllowArray, CairoVersion, Call, ProviderOptions, PaymasterOptions } from '../types';
import type { ProviderInterface } from '../provider';
import type { PaymasterInterface } from '../paymaster';
import { WalletAccountV5 } from './accountV5';
import {
  addInvokeTransaction,
  requestAccounts,
  strk20Balances,
  strk20InvokeTransaction,
  strk20PrepareInvoke,
} from './connectV6';
import type { WalletAccountV6Options } from './types/index.type';

/**
 * WalletAccountV6 class.
 * Extends WalletAccountV5 with get-starknet v6 types and STRK20 privacy protocol methods.
 */
export class WalletAccountV6 extends WalletAccountV5 {
  constructor(options: WalletAccountV6Options) {
    super({ ...options, walletProvider: options.walletProvider as any });
    this.walletProvider = options.walletProvider as any;
  }

  private get v6Provider(): WalletWithStarknetFeaturesV6 {
    return this.walletProvider as unknown as WalletWithStarknetFeaturesV6;
  }

  override execute(calls: AllowArray<Call>, proof?: STRK20_PROOF) {
    const txCalls = [].concat(calls as any).map((it: any) => ({
      contract_address: it.contractAddress,
      entry_point: it.entrypoint,
      calldata: it.calldata,
    }));
    return addInvokeTransaction(this.v6Provider, { calls: txCalls, proof });
  }

  public strk20Balances(tokens: Address[]): Promise<STRK20_BALANCE_ENTRY[]> {
    return strk20Balances(this.v6Provider, tokens);
  }

  public strk20PrepareInvoke(
    actions: STRK20_ACTION[],
    simulate?: boolean
  ): Promise<STRK20_CALL_AND_PROOF> {
    return strk20PrepareInvoke(this.v6Provider, actions, simulate);
  }

  public strk20InvokeTransaction(actions: STRK20_ACTION[]): Promise<{ transaction_hash: string }> {
    return strk20InvokeTransaction(this.v6Provider, actions);
  }

  static async connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeaturesV6,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode: boolean = false
  ): Promise<WalletAccountV6> {
    const [accountAddress] = await requestAccounts(walletProvider, silentMode);
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
