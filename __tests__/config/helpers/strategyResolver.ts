/* eslint-disable no-console */
import accountResolver from './accountResolver';
import { GS_DEFAULT_TEST_PROVIDER_URL, LOCAL_DEVNET_NOT_RUNNING_MESSAGE } from '../constants';
import { setIfNullish } from './env';
import { BaseUrl } from '../../../src/constants';

class StrategyResolver {
  private isRsDevnet = false;

  private isRpc = false;

  get isRpcDevnet() {
    return this.isRsDevnet || !!process.env.TEST_RPC_URL;
  }

  get isCairo1Testnet() {
    const url = process.env.TEST_PROVIDER_BASE_URL || process.env.TEST_RPC_URL;
    return url?.includes(BaseUrl.SN_GOERLI);
  }

  get hasAllAccountEnvs() {
    const { TEST_ACCOUNT_ADDRESS, TEST_ACCOUNT_PRIVATE_KEY } = process.env;
    return !!(TEST_ACCOUNT_PRIVATE_KEY && TEST_ACCOUNT_ADDRESS);
  }

  private async isRS(): Promise<boolean> {
    const response = await fetch(GS_DEFAULT_TEST_PROVIDER_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'starknet_syncing' }),
    });
    const { jsonrpc } = await response.json();
    return jsonrpc === '2.0';
  }

  async detectDevnet(): Promise<void> {
    // if on base url RPC endpoint work it is devnet-rs else it devnet-py
    try {
      this.isRsDevnet = await this.isRS();
      if (this.isRsDevnet) console.log('Detected Devnet-RS');
    } catch (error) {
      console.log('\x1b[36m%s\x1b[0m', LOCAL_DEVNET_NOT_RUNNING_MESSAGE);
      throw new Error(
        'Local RS devnet is not Running. Please follow the devnet setup instructions.'
      );
    }

    setIfNullish('IS_RPC_DEVNET', this.isRpcDevnet);
  }

  resolveRpc(): void {
    const hasRpcUrl = !!process.env.TEST_RPC_URL;

    this.isRpc = hasRpcUrl || this.isRsDevnet;
    setIfNullish('IS_RPC', this.isRpc);
    setIfNullish('IS_CAIRO1_TESTNET', this.isCairo1Testnet);

    if (hasRpcUrl) {
      console.log('Detected RPC');

      return;
    }

    if (this.isRsDevnet) {
      process.env.TEST_RPC_URL = GS_DEFAULT_TEST_PROVIDER_URL;
    } else {
      process.env.TEST_PROVIDER_BASE_URL = GS_DEFAULT_TEST_PROVIDER_URL;
    }

    console.log('Detected RPC');
  }

  private logConfigInfo(): void {
    console.table({
      TEST_ACCOUNT_ADDRESS: process.env.TEST_ACCOUNT_ADDRESS,
      TEST_ACCOUNT_PRIVATE_KEY: '****',
      INITIAL_BALANCE: process.env.INITIAL_BALANCE,
      TEST_PROVIDER_BASE_URL: process.env.TEST_PROVIDER_BASE_URL,
      TEST_RPC_URL: process.env.TEST_RPC_URL,
      TX_VERSION: process.env.TX_VERSION === 'v3' ? 'v3' : 'v2',
    });

    console.table({
      IS_RPC_DEVNET: process.env.IS_RPC_DEVNET,
      IS_RPC: process.env.IS_RPC,
      IS_CAIRO1_TESTNET: process.env.IS_CAIRO1_TESTNET,
    });

    console.log('Global Test Environment is Ready');
  }

  private verifyAccountData(shouldThrow?: boolean): void {
    const { TEST_ACCOUNT_ADDRESS, TEST_ACCOUNT_PRIVATE_KEY } = process.env;
    if (!TEST_ACCOUNT_ADDRESS) {
      if (shouldThrow) throw new Error('TEST_ACCOUNT_ADDRESS env is not provided');
      console.log('\x1b[33m', 'TEST_ACCOUNT_ADDRESS env is not provided!');
      delete process.env.TEST_ACCOUNT_ADDRESS;
    }
    if (!TEST_ACCOUNT_PRIVATE_KEY) {
      if (shouldThrow) throw new Error('TEST_ACCOUNT_PRIVATE_KEY env is not provided');
      console.log('\x1b[33m', 'TEST_ACCOUNT_PRIVATE_KEY env is not provided!', '\x1b[0m');
      delete process.env.TEST_ACCOUNT_PRIVATE_KEY;
    }
  }

  private useProvidedSetup(): void {
    setIfNullish('IS_RPC_DEVNET', false);
    setIfNullish('IS_RPC', !!process.env.TEST_RPC_URL);
    setIfNullish('IS_CAIRO1_TESTNET', this.isCairo1Testnet);

    this.logConfigInfo();

    console.log('Using Provided Test Setup');
  }

  async execute(): Promise<void> {
    // 1. Assume setup is provided and ready;
    console.log('Global Test Setup Started');
    this.verifyAccountData();

    if (this.hasAllAccountEnvs) {
      this.useProvidedSetup();
      return;
    }

    // 2. Try to detect devnet setup
    console.log('Basic test parameters are missing, Auto Setup Started');

    await this.detectDevnet();
    this.resolveRpc();
    await accountResolver.execute(this.isRsDevnet);

    this.verifyAccountData(true);
    if (!this.hasAllAccountEnvs) console.error('Test Setup Environment is NOT Ready');

    this.logConfigInfo();
  }
}

export default new StrategyResolver();
