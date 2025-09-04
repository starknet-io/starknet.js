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
  };
};
