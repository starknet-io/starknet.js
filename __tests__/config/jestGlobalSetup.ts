/* eslint-disable no-console */
/**
 * Asynchronous Global Test Setup
 * Run only once
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import { InitDevnetHistory } from './helpers/initDevnetHistory';
import strategyResolver from './helpers/strategyResolver';

/**
 * Global Setup Fixtures
 */

export default async (_globalConfig: any, _projectConfig: any) => {
  await strategyResolver.execute();
  if (process.env.IS_DEVNET === 'true') {
    await InitDevnetHistory();
  }
};
