/* eslint-disable @typescript-eslint/no-shadow */
import { type StarknetWindowObject } from './StarknetWindowObject';
import discovery, { type WalletProvider } from './discovery';
import { LocalStorageWrapper } from './localStorageStore';
import { Permission } from './rpcMessage';
import type { GetStarknetOptions, GetStarknetResult } from './types';
import { pipe } from './utils';
import { filterBy, filterByAuthorized } from './wallet/filter';
import { isWalletObj } from './wallet/isWalletObject';
import { scanObjectForWallets } from './wallet/scan';
import { sortBy } from './wallet/sort';

export type { StarknetWindowObject } from './StarknetWindowObject';

export type {
  AddDeclareTransactionParameters,
  AddDeclareTransactionResult,
  AddDeployAccountTransactionParameters,
  AddDeployAccountTransactionResult,
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
  AddStarknetChainParameters,
  RequestAccountsParameters,
  StarknetChainId,
  SwitchStarknetChainParameters,
  GetDeploymentDataResult,
  WatchAssetParameters,
  TypedData,
  RequestFn,
  RpcMessage,
  IsParamsOptional,
  RpcTypeToMessageMap,
  RequestFnCall,
} from './rpcMessage';

export type {
  WalletEvents,
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
  WalletEventHandlers,
} from './walletEvents';

export { Permission } from './rpcMessage';

export type {
  DisconnectOptions,
  GetStarknetOptions,
  GetStarknetResult,
  GetWalletOptions,
  WalletProvider,
} from './types';

const ssrSafeWindow = typeof window !== 'undefined' ? window : {};

const defaultOptions: GetStarknetOptions = {
  windowObject: ssrSafeWindow,
  isWalletObject: isWalletObj,
  storageFactoryImplementation: (name: string) => new LocalStorageWrapper(name),
};

export function getStarknet(options: Partial<GetStarknetOptions> = {}): GetStarknetResult {
  const { storageFactoryImplementation, windowObject, isWalletObject } = {
    ...defaultOptions,
    ...options,
  };
  const lastConnectedStore = storageFactoryImplementation('gsw-last');

  return {
    getAvailableWallets: async (options = {}) => {
      const availableWallets = scanObjectForWallets(windowObject, isWalletObject);
      return pipe<StarknetWindowObject[]>(
        (_) => filterBy(_, options),
        (_) => sortBy(_, options.sort)
      )(availableWallets);
    },
    getAuthorizedWallets: async (options = {}) => {
      const availableWallets = scanObjectForWallets(windowObject, isWalletObject);
      return pipe<StarknetWindowObject[]>(
        (_) => filterByAuthorized(_),
        (_) => filterBy(_, options),
        (_) => sortBy(_, options.sort)
      )(availableWallets);
    },
    getDiscoveryWallets: async (options = {}) => {
      return pipe<WalletProvider[]>(
        (_) => filterBy(_, options),
        (_) => sortBy(_, options.sort)
      )(discovery);
    },
    getLastConnectedWallet: async () => {
      const lastConnectedWalletId = lastConnectedStore.get();
      const allWallets = scanObjectForWallets(windowObject, isWalletObject);
      const lastConnectedWallet = allWallets.find((w) => w.id === lastConnectedWalletId);
      const [firstAuthorizedWallet] = await filterByAuthorized(
        lastConnectedWallet ? [lastConnectedWallet] : []
      );

      if (!firstAuthorizedWallet) {
        lastConnectedStore.delete();
        return null;
      }

      return firstAuthorizedWallet;
    },
    enable: async (wallet, options) => {
      await wallet.request({
        type: 'wallet_requestAccounts',
        params: {
          silentMode: options?.silentMode,
        },
      });

      // check for permissions
      const permissions = await wallet.request({
        type: 'wallet_getPermissions',
      });
      if (!permissions?.includes(Permission.Accounts)) {
        throw new Error('Failed to connect to wallet');
      }
      lastConnectedStore.set(wallet.id);
      return wallet;
    },
    disconnect: async ({ clearLastWallet } = {}) => {
      if (clearLastWallet) {
        lastConnectedStore.delete();
      }
    },
  };
}

export default getStarknet();
