import { WalletProvider } from './discovery';
import { IStorageWrapper } from './localStorageStore';
import { RequestAccountsParameters } from './rpcMessage';
import { StarknetWindowObject } from './StarknetWindowObject';
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
  getAvailableWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>;
  getAuthorizedWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>;
  getDiscoveryWallets: (options?: GetWalletOptions) => Promise<WalletProvider[]>;
  getLastConnectedWallet: () => Promise<StarknetWindowObject | null | undefined>;
  enable: (
    wallet: StarknetWindowObject,
    options?: RequestAccountsParameters
  ) => Promise<StarknetWindowObject>;
  disconnect: (options?: DisconnectOptions) => Promise<void>;
}
