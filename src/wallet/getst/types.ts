import { StarknetWindowObject } from './StarknetWindowObject';
import { WalletProvider } from './discovery';
import { IStorageWrapper } from './localStorageStore';
import { RequestAccountsParameters } from './rpcMessage';
import { FilterList } from './wallet/filter';
import { Sort } from './wallet/sort';

export type { WalletProvider } from './discovery';

export interface GetStarknetOptions {
  windowObject: Record<string, any>;
  isWalletObject: (wallet: any) => boolean;
  storageFactoryImplementation: (name: string) => IStorageWrapper;
}

export interface GetWalletOptions {
  sort?: Sort;
  include?: FilterList;
  exclude?: FilterList;
}

export interface DisconnectOptions {
  clearLastWallet?: boolean;
}

export interface GetStarknetResult {
  getAvailableWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>; // Returns all wallets available in the window object
  getAuthorizedWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>; // Returns only preauthorized wallets available in the window object
  getDiscoveryWallets: (options?: GetWalletOptions) => Promise<WalletProvider[]>; // Returns all wallets in existence (from discovery file)
  getLastConnectedWallet: () => Promise<StarknetWindowObject | null | undefined>; // Returns the last wallet connected when it's still connected
  enable: (
    wallet: StarknetWindowObject,
    options?: RequestAccountsParameters
  ) => Promise<StarknetWindowObject>; // Connects to a wallet
  disconnect: (options?: DisconnectOptions) => Promise<void>; // Disconnects from a wallet
}
