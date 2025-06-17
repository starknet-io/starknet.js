module.exports = {
  verbose: true,
  modulePathIgnorePatterns: ['dist'],
  setupFilesAfterEnv: ['./__tests__/config/jest.setup.ts'],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  testMatch: ['**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
  globalSetup: './__tests__/config/jestGlobalSetup.ts',
  sandboxInjectedGlobals: ['Math'],
};
