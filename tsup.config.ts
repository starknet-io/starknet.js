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
    // `src/ledger/index.ts` is the `starknet/ledger` entry point, built to `dist/ledger/index.*`
    // (see `exports` in package.json).
    entry: ['src/index.ts', 'src/ledger/index.ts'],
    // `src/ledger` imports the package by its name. Keeping that import makes `dist/ledger/*`
    // load `dist/index.*`, instead of holding a second copy of the whole library.
    external: ['starknet'],
    // No shared chunk between the two entry points: `dist/index.mjs` stays one self-contained file.
    splitting: false,
    sourcemap: true,
    clean: true,
    format: ['cjs'],
    globalName: 'starknet',
  };

  // For IIFE browser builds, add the shim plugin to handle Node.js modules.
  // Main entry only: a second IIFE file would also declare `var starknet`.
  if (overrideOptions.format?.includes('iife')) {
    return {
      ...baseConfig,
      entry: ['src/index.ts'],
      esbuildPlugins: [browserNodeShimPlugin],
    };
  }

  return baseConfig;
});
