import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true,
    },
    testMatch: ['**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ['./__tests__/config/jest.setup.ts'],
    globalSetup: './__tests__/config/jestGlobalSetup.ts',
    sandboxInjectedGlobals: ['Math'],

    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    // @noble/* and @scure/* are ESM-only since v2; they must be transpiled by @swc/jest
    // instead of being ignored like the rest of node_modules.
    transformIgnorePatterns: ['node_modules/(?!(@noble|@scure)/)'],
  };
};
