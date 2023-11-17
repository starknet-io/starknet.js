import { WalletProvider } from './discovery';
import { IStorageWrapper } from './localStorageStore';
import type {
  ConnectedStarknetWindowObject,
  RequestAccountsParameters,
  StarknetWindowObject,
} from './StarknetWindowObject';
import { FilterList } from './wallet/filter';
import { Sort } from './wallet/sort';

export type {
  AccountChangeEventHandler,
  AddStarknetChainParameters,
  ConnectedStarknetWindowObject,
  NetworkChangeEventHandler,
  RpcMessage,
  StarknetWindowObject,
  SwitchStarknetChainParameters,
  WalletEvents,
  WatchAssetParameters,
  DisconnectedStarknetWindowObject,
  IStarknetWindowObject,
  RequestAccountsParameters,
  AddDeclareTransactionParameters,
  AddDeclareTransactionResult,
  AddDeployAccountTransactionParameters,
  AddDeployAccountTransactionResult,
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
  TypedData,
} from './StarknetWindowObject';
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
interface GetStarknetResult {
  getAvailableWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>;
  getPreAuthorizedWallets: (options?: GetWalletOptions) => Promise<StarknetWindowObject[]>;
  getDiscoveryWallets: (options?: GetWalletOptions) => Promise<WalletProvider[]>;
  getLastConnectedWallet: () => Promise<StarknetWindowObject | null | undefined>;
  enable: (
    wallet: StarknetWindowObject,
    options?: RequestAccountsParameters
  ) => Promise<ConnectedStarknetWindowObject>;
  disconnect: (options?: DisconnectOptions) => Promise<void>;
}
export declare function getStarknet(options?: Partial<GetStarknetOptions>): GetStarknetResult;
declare const _default: GetStarknetResult;
export default _default;
