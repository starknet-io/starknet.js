/* eslint-disable no-console */
/**
 * Asynchronous Global Test Setup
 * Run only once
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import { InitDevnetHistory } from './helpers/initDevnetHistory';
import strategyResolver from './helpers/strategyResolver';

// Node >= 25 exposes Web Storage (localStorage/sessionStorage) on the global by
// default. jest-environment-node snapshots the global property descriptors and reads
// the localStorage getter at teardown, emitting a `--localstorage-file` warning.
// Remove them here (main realm, before any test environment is built) so the test
// output stays clean (the SDK does not use Web Storage in Node).
// Guarded: a no-op when Web Storage is absent (older Node, or behind a flag), and
// only deletes configurable properties so it never throws in strict mode.
['localStorage', 'sessionStorage'].forEach((key) => {
  if (Object.getOwnPropertyDescriptor(globalThis, key)?.configurable) {
    delete (globalThis as any)[key];
  }
});

/**
 * Global Setup Fixtures
 */

export default async (_globalConfig: any, _projectConfig: any) => {
  await strategyResolver.execute();
  if (process.env.IS_DEVNET === 'true') {
    await InitDevnetHistory();
  }
};
