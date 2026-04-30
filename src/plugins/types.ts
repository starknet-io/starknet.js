import type { ProviderInterface } from '../provider/interface';
import type { AccountInterface } from '../account/interface';
import type { AllowArray, Call, InvokeFunctionResponse, Signature, TypedData } from '../types';
import type { UniversalDetails } from '../account/types/index.type';

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

  /** Provider-level lifecycle hooks */
  hooks?: ProviderHooks;

  /** Account-level lifecycle hooks */
  accountHooks?: AccountHooks;
}

// --- Plugin configuration for constructors ---

export interface PluginConfig {
  /**
   * Plugins to install.
   * - `undefined` (default): install defaultPlugins (starknetId, brotherId)
   * - explicit array: install exactly these plugins
   * - `false`: no plugins
   */
  plugins?: StarknetPlugin<any, any>[] | false;
}
