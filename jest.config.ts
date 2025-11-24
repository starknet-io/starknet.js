import type { Config } from 'jest';

/**
 * @description Jest configuration for unit and integration testing.
 * Uses SWC for high-performance TypeScript/JavaScript transpilation.
 */
export default async (): Promise<Config> => {
  return {
    // Defines the environment where tests will run (Node.js or browser-like JSDOM).
    // Set to 'node' for backend/utility libraries, 'jsdom' for frontend components.
    testEnvironment: 'node',

    // --- Module Handling ---
    
    // Uses SWC (Speedy Web Compiler) for transforming TypeScript/JSX files.
    // This is significantly faster than using ts-jest or babel-jest.
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    
    // --- File Matching & Setup ---

    // Specifies which files Jest should run as tests.
    testMatch: ['**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
    
    // Runs code (e.g., global mocks, custom matchers) once per environment setup.
    setupFilesAfterEnv: ['./__tests__/config/jest.setup.ts'],
    
    // Runs code once before all tests (e.g., database connection setup).
    globalSetup: './__tests__/config/jestGlobalSetup.ts',
    
    // --- Isolation & Format ---

    // Restricts the available global objects in the test environment (e.g., for better isolation/security).
    // Note: Only 'Math' is allowed, excluding standard Node globals like 'Buffer' or 'process'.
    sandboxInjectedGlobals: ['Math'],
    
    // Defines formatting rules for snapshot files.
    snapshotFormat: {
      // Ensures strings like newlines are explicitly escaped in snapshots.
      escapeString: true, 
      // Prints basic prototype methods (e.g., 'Array []') in snapshots for clarity.
      printBasicPrototype: true,
    },
  };
};
