// Core plugin framework
import './augmentations';

export type { StarknetPlugin, ProviderHooks, AccountHooks, PluginConfig } from './types';
export { PluginManager } from './manager';

// Plugin implementations
export {
  starknetId,
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
