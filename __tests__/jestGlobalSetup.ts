/**
 * Asynchronous Global Test Setup
 * Run only once
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

/**
 * Global Setup Fixtures
 */

/* Default test config based on run `starknet-devnet --seed 0` */
const GS_DEFAULT_TEST_PROVIDER_URL = 'http://127.0.0.1:5050/';

/**
 * We need to detect intention of the test runner
 * Does test run on local devnet?
 * Does it run Sequencer or RPC tests ?
 */

const sequencerOrRpc = () => {
  if (process.env.TEST_PROVIDER_BASE_URL) {
    return { sequencer: true, rpc: false };
  }
  if (process.env.TEST_RPC_URL) {
    return { sequencer: false, rpc: true };
  }
  // nor sequencer nor rpc provided, try with local devnet detection
  return { sequencer: false, rpc: false };
};

const isAccountProvided = () => {
  if (process.env.TEST_ACCOUNT_ADDRESS && process.env.TEST_ACCOUNT_PRIVATE_KEY) {
    return true;
  }
  if (process.env.TEST_ACCOUNT_ADDRESS || process.env.TEST_ACCOUNT_PRIVATE_KEY) {
    throw new Error(
      'If you are providing test Account you need to provide both TEST_ACCOUNT_ADDRESS & TEST_ACCOUNT_PRIVATE_KEY'
    );
  }
  return false;

  // if not provided try to get it from BASE_URL
  // if unsecesfull throw an account error
};

const defineStrategy = async () => {
  // TODO: implement strategy detection
  // did user provide TEST_PROVIDER_BASE_URL or TEST_RPC_URL if so we know it is RPC or Sequencer test
  // if not we need to aute detect it
  // did user provide TEST_ACCOUNT_ADDRESS and TEST_ACCOUNT_PRIVATE_KEY
  // - if yes, use provided account
  // - if only one throw error
  // - if no run local devnet strategy
  // did user provide TEST_PROVIDER_BASE_URL or TEST_RPC_URL
  // - is local devnet running?
  // - if yes, use local devnet
  // get local devnet version and accounts
  sequencerOrRpc();
  isAccountProvided();
};

module.exports = async function (_globalConfig: any, _projectConfig: any) {
  const devnetAccs = await defineStrategy();
  console.log(devnetAccs);
  process.env.GS_DEFAULT_TEST_PROVIDER_URL = GS_DEFAULT_TEST_PROVIDER_URL;
};
