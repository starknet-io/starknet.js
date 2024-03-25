import { StarknetChainId } from './rpcMessage';

export type AccountChangeEventHandler = (accounts?: string[]) => void;

export type NetworkChangeEventHandler = (chainId?: StarknetChainId, accounts?: string[]) => void;

export interface WalletEventHandlers {
  accountsChanged: AccountChangeEventHandler;
  networkChanged: NetworkChangeEventHandler;
}

export type WalletEvents = {
  [E in keyof WalletEventHandlers]: { type: E; handler: WalletEventHandlers[E] };
}[keyof WalletEventHandlers];
