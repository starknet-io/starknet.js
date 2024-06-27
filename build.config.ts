import { defineBuildConfig } from 'unbuild';
import { name, version } from './package.json';

// https://github.com/unjs/unbuild
export default defineBuildConfig({
  declaration: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      minify: false,
    },
  },
  entries: [
    // mkdist builder transpiles file-to-file keeping original sources structure
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist',
      format: 'esm',
      pattern: ['**', '!**/*.test.ts'],
      esbuild: {
        define: {
          PACKAGE_VERSION: `"${version}"`,
          PACKAGE_NAME: `"${name}"`,
        },
      },
    },
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist',
      format: 'cjs',
      ext: 'cjs',
      // https://github.com/sindresorhus/globby
      pattern: ['**', '!**/*.test.ts'],
      // Declarations already created for esm build
      declaration: false,
      esbuild: {
        define: {
          PACKAGE_VERSION: `"${version}"`,
          PACKAGE_NAME: `"${name}"`,
        },
      },
    },
  ],
});
