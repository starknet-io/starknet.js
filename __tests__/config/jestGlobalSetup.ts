/* eslint-disable no-console */
/**
 * Asynchronous Global Test Setup
 * Run only once
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import { BaseUrl } from '../../src/constants';
import { getDefaultNodeUrl } from '../../src/utils/provider';

type DevnetStrategy = {
  isDevnet: boolean;
  isRS: boolean;
};
type ProviderType = {
  sequencer: boolean;
  rpc: boolean;
};

/**
 * Global Setup Fixtures
 */

/* Default test config based on run `starknet-devnet --seed 0` */
const GS_DEFAULT_TEST_PROVIDER_URL = 'http://127.0.0.1:5050/';

const setIfNullish = (envName: string, setValue?: string | boolean) => {
  process.env[envName] ??= setValue?.toString();
};

const localDevnetDetectionStrategy = async () => {
  const setup = (strategy: DevnetStrategy) => {
    setIfNullish('IS_LOCALHOST_DEVNET', strategy.isDevnet ? 'true' : 'false');
    setIfNullish(
      'IS_RPC_DEVNET',
      strategy.isDevnet && (strategy.isRS || process.env.TEST_RPC_URL) ? 'true' : 'false'
    );
    setIfNullish(
      'IS_SEQUENCER_DEVNET',
      strategy.isDevnet && process.env.IS_RPC_DEVNET === 'false' ? 'true' : 'false'
    );
    return strategy;
  };

  const strategy: DevnetStrategy = {
    isDevnet: false,
    isRS: false,
  };

  // if is_alive work it is local devnet
  const devnetResult = await fetch(`${GS_DEFAULT_TEST_PROVIDER_URL}is_alive`)
    .then((res) => res.text())
    .catch(() => '');
  if (devnetResult !== 'Alive!!!') {
    return setup(strategy);
  }
  strategy.isDevnet = true;

  // if on base url RPC endpoint work it is devnet-rs else it devnet-py
  try {
    const response = await fetch(`${GS_DEFAULT_TEST_PROVIDER_URL}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'starknet_syncing' }),
    });
    const json = await response.json();
    strategy.isRS = json.jsonrpc === '2.0';
  } catch (error) {
    return setup(strategy);
  }

  return setup(strategy);
};

const sequencerOrRpc = async (devnetStrategy?: DevnetStrategy) => {
  const setup = (providerType: ProviderType) => {
    setIfNullish('IS_SEQUENCER', providerType.sequencer ? 'true' : 'false');
    setIfNullish('IS_RPC', providerType.rpc ? 'true' : 'false');
    setIfNullish(
      'IS_SEQUENCER_GOERLI',
      (process.env.TEST_PROVIDER_BASE_URL || process.env.TEST_RPC_URL || '').includes(
        BaseUrl.SN_GOERLI
      )
        ? 'true'
        : 'false'
    );
    return providerType;
  };
  let result: ProviderType = { sequencer: false, rpc: false };
  if (process.env.TEST_PROVIDER_BASE_URL) {
    return setup({ ...result, sequencer: true });
  }
  if (process.env.TEST_RPC_URL) {
    return setup({ ...result, rpc: true });
  }
  // nor sequencer nor rpc provided, try with local devnet strategy
  if (devnetStrategy && devnetStrategy.isDevnet) {
    result = { sequencer: !devnetStrategy.isRS, rpc: devnetStrategy.isRS };
    if (result.sequencer) {
      process.env.TEST_PROVIDER_BASE_URL = GS_DEFAULT_TEST_PROVIDER_URL;
    } else if (result.rpc) {
      process.env.TEST_RPC_URL = GS_DEFAULT_TEST_PROVIDER_URL;
    }
  }
  return setup(result);
};

const setAccount = async (devnetStrategy: DevnetStrategy) => {
  const fetchAccount = async (URL: string) => {
    const response = await fetch(`${URL}predeployed_accounts`);
    const accounts = await response.json();
    process.env.TEST_ACCOUNT_ADDRESS = accounts[0].address;
    process.env.TEST_ACCOUNT_PRIVATE_KEY = accounts[0].private_key;
    process.env.INITIAL_BALANCE = accounts[0].initial_balance;
  };

  if (process.env.TEST_ACCOUNT_ADDRESS && process.env.TEST_ACCOUNT_PRIVATE_KEY) {
    return true;
  }
  if (process.env.TEST_ACCOUNT_ADDRESS || process.env.TEST_ACCOUNT_PRIVATE_KEY) {
    throw new Error(
      'If you are providing one of you need to provide both: TEST_ACCOUNT_ADDRESS & TEST_ACCOUNT_PRIVATE_KEY'
    );
  }
  const providedURL = process.env.TEST_PROVIDER_BASE_URL || process.env.TEST_RPC_URL;
  if (devnetStrategy.isDevnet) {
    // get account from devnet
    try {
      await fetchAccount(GS_DEFAULT_TEST_PROVIDER_URL);
      return true;
    } catch (error) {
      console.error('Fetching account from devnet failed');
    }
  } else if (providedURL) {
    // try to get it from remote devnet
    try {
      await fetchAccount(providedURL);
      return true;
    } catch (error) {
      console.error(`Fetching account from provided url ${providedURL} failed`);
    }
  }

  throw new Error(
    'Setting Account using all known strategies failed, provide basic test parameters'
  );
};

const verifySetup = (final?: boolean) => {
  const warnings: string[] = [];
  if (!process.env.TEST_ACCOUNT_ADDRESS) {
    if (final) throw new Error('TEST_ACCOUNT_ADDRESS env is not provided');
    else warnings.push('TEST_ACCOUNT_ADDRESS env is not provided!');
  }
  if (!process.env.TEST_ACCOUNT_PRIVATE_KEY) {
    if (final) throw new Error('TEST_ACCOUNT_PRIVATE_KEY env is not provided');
    else warnings.push('TEST_ACCOUNT_PRIVATE_KEY env is not provided!');
  }
  if (!process.env.TEST_RPC_URL) {
    process.env.TEST_RPC_URL = getDefaultNodeUrl();
    console.warn('TEST_RPC_URL env is not provided');
  }

  if (warnings.length > 0) {
    console.log('\x1b[33m', warnings.join('\n'), '\x1b[0m');
    delete process.env.TEST_ACCOUNT_ADDRESS;
    delete process.env.TEST_ACCOUNT_PRIVATE_KEY;
    return false;
  }

  if (!final) {
    setIfNullish('IS_LOCALHOST_DEVNET', 'false');
    setIfNullish('IS_RPC_DEVNET', 'false');
    setIfNullish('IS_SEQUENCER_DEVNET', 'false');
    setIfNullish('IS_RPC', process.env.TEST_RPC_URL ? 'true' : 'false');
    setIfNullish('IS_SEQUENCER', process.env.TEST_PROVIDER_BASE_URL ? 'true' : 'false');
    setIfNullish(
      'IS_SEQUENCER_GOERLI',
      (process.env.TEST_PROVIDER_BASE_URL || process.env.TEST_RPC_URL || '').includes(
        BaseUrl.SN_GOERLI
      )
        ? 'true'
        : 'false'
    );
  }

  console.table({
    TEST_ACCOUNT_ADDRESS: process.env.TEST_ACCOUNT_ADDRESS,
    TEST_ACCOUNT_PRIVATE_KEY: '****',
    INITIAL_BALANCE: process.env.INITIAL_BALANCE,
    TEST_PROVIDER_BASE_URL: process.env.TEST_PROVIDER_BASE_URL,
    TEST_RPC_URL: process.env.TEST_RPC_URL,
  });

  console.table({
    IS_LOCALHOST_DEVNET: process.env.IS_LOCALHOST_DEVNET,
    IS_RPC_DEVNET: process.env.IS_RPC_DEVNET,
    IS_SEQUENCER_DEVNET: process.env.IS_SEQUENCER_DEVNET,
    IS_RPC: process.env.IS_RPC,
    IS_SEQUENCER: process.env.IS_SEQUENCER,
    IS_SEQUENCER_GOERLI: process.env.IS_SEQUENCER_GOERLI,
  });

  console.log('Global Test Environment is Ready');
  return true;
};

const executeStrategy = async () => {
  // 1. Assume setup is provided and ready;
  console.log('Global Test Setup Started');
  if (verifySetup()) {
    console.log('Using Provided Test Setup');
    return true;
  }

  // 2. Try to detect devnet setup
  console.log('Basic test parameters are missing, Auto Setup Started');
  const devnetStrategy = await localDevnetDetectionStrategy();
  if (devnetStrategy.isDevnet) {
    if (devnetStrategy.isRS) {
      console.log('Detected Devnet-RS');
    } else {
      console.log('Detected Devnet-PY');
    }
  }

  const providerType = await sequencerOrRpc(devnetStrategy);
  if (providerType.sequencer) {
    console.log('Detected Sequencer');
  } else if (providerType.rpc) {
    console.log('Detected RPC');
  }

  const isAccountSet = await setAccount(devnetStrategy);
  if (isAccountSet) {
    console.log('Detected Account');
  }

  return verifySetup(true);
};

export default async (_globalConfig: any, _projectConfig: any) => {
  const isSet = await executeStrategy();
  if (!isSet) console.error('Test Setup Environment is NOT Ready');
};
