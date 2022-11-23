import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  outDir: 'dist',
  dts: {
    resolve: true,
  },
  clean: true,
  format: ['cjs', 'iife', 'esm'],
  globalName: 'starknet',
  legacyOutput: true,
});
