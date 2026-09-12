export * from './account';
export * from './accountV5';
export * from './accountV6';

// STRK20 privacy protocol types (wallet-api spec, RPC 0.10.4+).
// Re-exported so DAPPs can import them directly from `starknet` when using WalletAccountV6.

// Starknet.js flavored types : same as the wallet-api spec ones, except that every embedded
// call is a Starknet.js `Call`. The raw spec types remain available in the `RPC` namespace.
export type {
  STRK20_ACTION,
  STRK20_CALL_AND_PROOF,
  STRK20_SHADOW_ACCOUNT_INVOKE_ACTION,
} from './types/strk20.type';

export type {
  STRK20_BALANCE_ENTRY,
  STRK20_CALLDATA_ITEM,
  STRK20_CALLDATA_PLACEHOLDER,
  STRK20_COLLECT_POLICY,
  STRK20_DAPP_NAME,
  STRK20_DEPOSIT_ACTION,
  STRK20_INVOKE_ACTION,
  STRK20_PROOF,
  STRK20_TRANSFER_ACTION,
  STRK20_WITHDRAW_ACTION,
} from '@starknet-io/starknet-types-0104';
