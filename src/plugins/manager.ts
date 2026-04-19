import type { StarknetPlugin, ProviderHooks, AccountHooks } from './types';

/**
 * Manages plugin registration, method installation, and hook execution.
 *
 * Each Provider/Account instance owns its own PluginManager to ensure
 * plugins are scoped to the instance rather than shared globally.
 */
export class PluginManager {
  private registeredPlugins: Map<string, StarknetPlugin<any, any>> = new Map();

  private providerHooksList: ProviderHooks[] = [];

  private accountHooksList: AccountHooks[] = [];

  get plugins(): ReadonlyMap<string, StarknetPlugin<any, any>> {
    return this.registeredPlugins;
  }

  /**
   * Install a plugin on a Provider instance.
   * Calls `plugin.extend()` and assigns returned methods to the target.
   * Registers provider-level hooks.
   */
  installOnProvider(plugin: StarknetPlugin<any, any>, target: any): void {
    if (this.registeredPlugins.has(plugin.name)) {
      return; // deduplicate by name
    }
    this.registeredPlugins.set(plugin.name, plugin);

    if (plugin.extend) {
      const methods = plugin.extend(target);
      if (methods) {
        Object.assign(target, methods);
      }
    }

    if (plugin.hooks) {
      this.providerHooksList.push(plugin.hooks);
    }
  }

  /**
   * Install a plugin on an Account instance.
   * Calls `plugin.accountExtend()` if available, otherwise falls back to `plugin.extend()`.
   * Registers both provider-level and account-level hooks.
   */
  installOnAccount(plugin: StarknetPlugin<any, any>, target: any): void {
    if (this.registeredPlugins.has(plugin.name)) {
      return; // deduplicate by name
    }
    this.registeredPlugins.set(plugin.name, plugin);

    const extendFn = plugin.accountExtend ?? plugin.extend;
    if (extendFn) {
      const methods = extendFn(target);
      if (methods) {
        Object.assign(target, methods);
      }
    }

    if (plugin.hooks) {
      this.providerHooksList.push(plugin.hooks);
    }
    if (plugin.accountHooks) {
      this.accountHooksList.push(plugin.accountHooks);
    }
  }

  /**
   * Run a provider-level hook across all registered plugins.
   * Hooks are chained: each hook can modify the context for the next.
   */
  runProviderHook<K extends keyof ProviderHooks>(
    hookName: K,
    context: Parameters<NonNullable<ProviderHooks[K]>>[0]
  ): any {
    let current = context;
    this.providerHooksList.forEach((hooks) => {
      const hookFn = hooks[hookName];
      if (hookFn) {
        const result = (hookFn as Function)(current);
        if (result !== undefined && result !== null) {
          current = result;
        }
      }
    });
    return current;
  }

  /**
   * Run an account-level hook across all registered plugins.
   * "before" hooks are chained; "after" hooks are fire-and-forget.
   */
  runAccountHook<K extends keyof AccountHooks>(
    hookName: K,
    context: Parameters<NonNullable<AccountHooks[K]>>[0]
  ): any {
    let current = context;
    this.accountHooksList.forEach((hooks) => {
      const hookFn = hooks[hookName];
      if (hookFn) {
        const result = (hookFn as Function)(current);
        if (result !== undefined && result !== null) {
          current = result;
        }
      }
    });
    return current;
  }

  hasPlugin(name: string): boolean {
    return this.registeredPlugins.has(name);
  }
}
