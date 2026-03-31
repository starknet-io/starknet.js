import type { ProviderInterface } from '../provider/interface';
import type { AccountInterface } from '../account/interface';
import type { ContractInterface } from '../contract/interface';
import type { AllowArray, Call, InvokeFunctionResponse, Signature, TypedData } from '../types';
import type { UniversalDetails } from '../account/types/index.type';

// --- Plugin overrides for default plugins ---

import type { PaymasterOptions } from './paymaster/types/configuration.type';
import type { PaymasterInterface } from './paymaster/interface';

// --- Provider-level lifecycle hooks ---

export interface ProviderHooks {
  /**
   * Called before every RPC request through the channel.
   * Return modified context to transform the request, or void to pass through.
   */
  beforeRequest?(ctx: { method: string; params: any }): { method: string; params: any } | void;

  /**
   * Called after every RPC request through the channel.
   * Return a value to replace the result, or void to pass through.
   */
  afterRequest?(ctx: { method: string; params: any; result: any }): any | void;
}

// --- Account-level lifecycle hooks ---

export interface AccountHooks extends ProviderHooks {
  /**
   * Called before Account.execute().
   * Return modified context to transform calls/details, or void to pass through.
   */
  beforeExecute?(ctx: {
    calls: AllowArray<Call>;
    details: UniversalDetails;
  }): { calls: AllowArray<Call>; details: UniversalDetails } | void;

  /**
   * Called after Account.execute() with the result.
   */
  afterExecute?(ctx: { calls: AllowArray<Call>; result: InvokeFunctionResponse }): void;

  /**
   * Called before Account.signMessage().
   * Return modified context to transform typedData, or void to pass through.
   */
  beforeSign?(ctx: { typedData: TypedData }): { typedData: TypedData } | void;

  /**
   * Called after Account.signMessage() with the result.
   */
  afterSign?(ctx: { typedData: TypedData; signature: Signature }): void;
}

// --- Plugin definition ---

/**
 * A Starknet plugin that can extend Provider and Account with methods and lifecycle hooks.
 *
 * @template TProviderMethods - Methods added to Provider instances
 * @template TAccountMethods - Methods added to Account instances (defaults to TProviderMethods)
 *
 * @example
 * ```typescript
 * const myPlugin = (): StarknetPlugin<{ greet(): string }> => ({
 *   name: 'my-plugin',
 *   extend: () => ({ greet: () => 'hello' }),
 * });
 * ```
 */
export interface StarknetPlugin<
  TProviderMethods extends Record<string, any> = Record<string, never>,
  TAccountMethods extends Record<string, any> = TProviderMethods,
  TContractMethods extends Record<string, any> = Record<string, never>,
> {
  /** Unique plugin name, used for deduplication */
  readonly name: string;

  /**
   * Called when the plugin is installed on a Provider.
   * Returns an object of methods to add to the provider instance.
   */
  extend?(provider: ProviderInterface): TProviderMethods;

  /**
   * Called when the plugin is installed on an Account.
   * Returns methods specific to the account context.
   * If not provided, `extend` is used instead.
   */
  accountExtend?(account: AccountInterface): TAccountMethods;

  /**
   * Called when the plugin is installed on a Contract connected to an Account.
   * Returns methods to add to the contract instance.
   * Receives both the Contract and the Account so the plugin can call account-level methods.
   */
  contractExtend?(contract: ContractInterface, account: AccountInterface): TContractMethods;

  /** Provider-level lifecycle hooks */
  hooks?: ProviderHooks;

  /** Account-level lifecycle hooks */
  accountHooks?: AccountHooks;
}

export interface PluginOverrides {
  paymaster?: PaymasterOptions | PaymasterInterface | false;
  // future configurable defaults can be added here
}

// --- Plugin configuration for constructors ---

export interface PluginConfig {
  /**
   * Plugins to install.
   * - `undefined` (default): install defaultPlugins (starknetId, brotherId, fastExecute, paymaster)
   * - explicit array: install exactly these plugins
   * - `false`: no plugins
   * - object (PluginOverrides): start with defaultPlugins, then override specific plugins
   */
  plugins?: StarknetPlugin<any, any, any>[] | false | PluginOverrides;
}
