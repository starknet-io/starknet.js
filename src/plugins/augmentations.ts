import type { StarknetIdProviderMethods, StarknetIdAccountMethods } from './starknet-id';
import type { BrotherIdProviderMethods } from './brother-id';

// Module augmentation to ensure default plugin methods are visible on
// RpcProvider and Account types without requiring explicit `.use()` calls.

declare module '../provider/rpc' {
  interface RpcProvider extends StarknetIdProviderMethods, BrotherIdProviderMethods {}
}

declare module '../account/default' {
  interface Account extends StarknetIdAccountMethods, BrotherIdProviderMethods {}
}
