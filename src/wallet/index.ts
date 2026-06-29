export * from './account';
export * from './accountV5';
export * from './accountV6';

// STRK20 privacy protocol types (wallet-api spec, RPC 0.10.3+).
// Re-exported so DAPPs can import them directly from `starknet` when using WalletAccountV6.
export type {
  STRK20_ACTION,
  STRK20_DEPOSIT_ACTION,
  STRK20_WITHDRAW_ACTION,
  STRK20_TRANSFER_ACTION,
  STRK20_INVOKE_ACTION,
  STRK20_BALANCE_ENTRY,
  STRK20_CALL_AND_PROOF,
  STRK20_PROOF,
  STRK20_CALLDATA_ITEM,
  STRK20_CALLDATA_PLACEHOLDER,
} from '@starknet-io/starknet-types-0103';
