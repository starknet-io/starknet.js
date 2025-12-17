import path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  const isBrowser = options.platform === 'browser';

  return {
    entry: ['src/index.ts'],
    sourcemap: true,
    clean: true,
    format: ['cjs'],
    globalName: 'starknet',
    esbuildPlugins: isBrowser
      ? [
          {
            name: 'replace-node-modules',
            setup(build) {
              // Replace contractLoaderNode with contractLoaderBrowser in browser builds
              build.onResolve({ filter: /contractLoaderNode$/ }, (args) => {
                const dir = path.dirname(path.resolve(args.resolveDir, args.path));
                return {
                  path: path.join(dir, 'contractLoaderBrowser.ts'),
                };
              });
            },
          },
        ]
      : [],
  };
});
