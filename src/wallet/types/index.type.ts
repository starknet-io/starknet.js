import type { WalletWithStarknetFeatures } from '@starknet-io/get-starknet-wallet-standard/features';
import type { PaymasterInterface } from '../../paymaster';
import type { ProviderInterface } from '../../provider';
import type { CairoVersion, PaymasterOptions, ProviderOptions } from '../../types';
import type { RpcMessage, StarknetWindowObject } from '../../types/api';

// ---- TT Request Handler
export type RpcCall = Omit<RpcMessage, 'result'>;

// This is provider object expected by WalletAccount to communicate with wallet
export interface StarknetWalletProvider extends StarknetWindowObject {}

export type WalletAccountV4Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: StarknetWalletProvider;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};

export type WalletAccountV5Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: WalletWithStarknetFeatures;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};
