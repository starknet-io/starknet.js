import type { StarknetPlugin, PluginOverrides } from './types';
import { starknetId } from './starknet-id';
import { brotherId } from './brother-id';
import { fastExecute } from './fast-execute';
import { paymaster } from './paymaster';

/** Default plugins shipped with the SDK */
export const defaultPlugins: StarknetPlugin<any, any, any>[] = [
  starknetId(),
  brotherId(),
  fastExecute(),
  paymaster(),
];

/**
 * Resolve the final plugin list from user-provided config.
 *
 * - `undefined` → install all defaultPlugins
 * - `false` → no plugins
 * - `StarknetPlugin[]` → install exactly these
 * - `PluginOverrides` (object, not array) → start with defaultPlugins, then for each key:
 *   - If value is `false` → remove that plugin
 *   - If value is config object / instance → replace the default plugin with configured one
 */
export function resolvePlugins(
  config: StarknetPlugin<any, any, any>[] | false | PluginOverrides | undefined
): StarknetPlugin<any, any, any>[] {
  if (config === false) return [];
  if (config === undefined) return [...defaultPlugins];
  if (Array.isArray(config)) return config;

  // Object overrides mode
  const plugins = [...defaultPlugins];

  if ('paymaster' in config && config.paymaster !== undefined) {
    const idx = plugins.findIndex((p) => p.name === 'paymaster');
    if (config.paymaster === false) {
      if (idx !== -1) plugins.splice(idx, 1);
    } else if (idx !== -1) {
      plugins[idx] = paymaster(config.paymaster);
    } else {
      plugins.push(paymaster(config.paymaster));
    }
  }

  return plugins;
}
