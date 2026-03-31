// Core plugin framework
import './augmentations';

export type {
  StarknetPlugin,
  ProviderHooks,
  AccountHooks,
  PluginConfig,
  PluginOverrides,
} from './types';
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
export {
  paymaster as paymasterPlugin,
  PaymasterInterface,
  PaymasterRpc,
  type PaymasterAccountMethods,
  type PaymasterContractMethods,
} from './paymaster';
export * as paymasterUtils from './paymaster/utils';

// Default plugins and resolution
export { defaultPlugins, resolvePlugins } from './defaults';
