import { RequestFn } from './rpcMessage';
import { WalletEventHandlers } from './walletEvents';

declare type WalletEventListener = <E extends keyof WalletEventHandlers>(
  event: E,
  handleEvent: WalletEventHandlers[E]
) => void;
export interface StarknetWindowObject {
  id: string;
  name: string;
  version: string;
  icon:
    | string
    | {
        dark: string;
        light: string;
      };
  request: RequestFn;
  on: WalletEventListener;
  off: WalletEventListener;
}
declare global {
  interface Window {
    [key: `starknet_${string}`]: StarknetWindowObject | undefined;
  }
}
export {};
