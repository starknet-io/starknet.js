import type { Config } from 'jest';

/**
 * Unit-test config — runs the pure unit tests under `__tests__/utils` WITHOUT a
 * running Starknet devnet or RPC node.
 *
 * It deliberately omits the `globalSetup` used by the default config
 * (`jest.config.ts`), which connects to a devnet/RPC node and throws when none
 * is reachable. The two network-dependent suites under `__tests__/utils`
 * (`ethSigner`, `batch`) are excluded.
 *
 * Use this for fast, infra-free verification while editing `src/utils/**`.
 * For the full integration suite (devnet/RPC required) use `npm test`.
 */
export default async (): Promise<Config> => {
  return {
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true,
    },
    roots: ['<rootDir>/__tests__/utils'],
    testMatch: ['**/(*.)+(spec|test).[jt]s?(x)'],
    testPathIgnorePatterns: [
      '/node_modules/',
      '__tests__/utils/ethSigner.test.ts',
      '__tests__/utils/batch.test.ts',
    ],
    setupFilesAfterEnv: ['./__tests__/config/jest.setup.ts'],
    sandboxInjectedGlobals: ['Math'],
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
  };
};
