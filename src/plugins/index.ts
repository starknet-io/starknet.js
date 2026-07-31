// Core plugin framework
import './augmentations';

export type { StarknetPlugin, ProviderHooks, AccountHooks, PluginConfig } from './types';
export { PluginManager } from './manager';

// Plugin implementations
//
// The StarknetId factory is exported as `starknetIdPlugin` and NOT as `starknetId`:
// the bare name is already taken at the package root by the `starknetId` utility
// namespace (`export * as starknetId from './utils/starknetId'` in `src/index.ts`).
// An explicit export always wins over a wildcard re-export, so a factory exported
// here as `starknetId` would be silently dropped from the built bundle.
export {
  starknetId as starknetIdPlugin,
  StarknetIdImpl,
  type StarknetIdProviderMethods,
  type StarknetIdAccountMethods,
} from './starknet-id';
export {
  brotherId,
  BrotherIdImpl,
  type BrotherIdProviderMethods,
  type BrotherProfile,
} from './brother-id';
export {
  fastExecute,
  type FastWaitForTransactionOptions,
  type FastExecuteResponse,
  type FastExecuteProviderMethods,
  type FastExecuteAccountMethods,
} from './fast-execute';

// Default plugins and augmentations
export { defaultPlugins } from './defaults';
