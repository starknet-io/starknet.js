import { StarknetChainId } from './rpcMessage';

export declare type AccountChangeEventHandler = (accounts?: string[]) => void;
export declare type NetworkChangeEventHandler = (
  chainId?: StarknetChainId,
  accounts?: string[]
) => void;
export interface WalletEventHandlers {
  accountsChanged: AccountChangeEventHandler;
  networkChanged: NetworkChangeEventHandler;
}
export declare type WalletEvents = {
  [E in keyof WalletEventHandlers]: {
    type: E;
    handler: WalletEventHandlers[E];
  };
}[keyof WalletEventHandlers];
