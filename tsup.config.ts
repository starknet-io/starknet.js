import { defineConfig, Options } from 'tsup';
import type { Plugin } from 'esbuild';

/**
 * Plugin to shim Node.js built-in modules (fs, path) for browser builds.
 * Returns undefined for these modules, allowing runtime checks to handle the fallback.
 */
const browserNodeShimPlugin: Plugin = {
  name: 'browser-node-shim',
  setup(build) {
    build.onResolve({ filter: /^(fs|path)$/ }, (args) => ({
      path: args.path,
      namespace: 'browser-node-shim',
    }));
    build.onLoad({ filter: /.*/, namespace: 'browser-node-shim' }, () => ({
      contents: 'module.exports = undefined;',
      loader: 'js',
    }));
  },
};

export default defineConfig((overrideOptions) => {
  const baseConfig: Options = {
    entry: ['src/index.ts'],
    sourcemap: true,
    clean: true,
    format: ['cjs'],
    globalName: 'starknet',
  };

  // For IIFE browser builds, add the shim plugin to handle Node.js modules
  if (overrideOptions.format?.includes('iife')) {
    return {
      ...baseConfig,
      esbuildPlugins: [browserNodeShimPlugin],
    };
  }

  return baseConfig;
});
