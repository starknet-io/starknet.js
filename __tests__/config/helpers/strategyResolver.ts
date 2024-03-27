/* eslint-disable no-console */
import accountResolver from './accountResolver';
import setupVerifier from './setupVerifier';

import { GS_DEFAULT_TEST_PROVIDER_URL } from '../constants';
import { setIfNullish } from './env';
import { BaseUrl } from '../../../src/constants';

const LOCAL_DEVNET_NOT_RUNNING_MESSAGE = `
Local devnet is not running. In order to properly run it you need to do the following: \n
  - Go to the: https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags
  - Find the latest tag and copy the "docker pull" command
  - Run Docker on your machine
  - Run the command: "docker pull shardlabs/starknet-devnet-rs:latest"
`;

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

  resolveRpc() {
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

  async execute() {
    // 1. Assume setup is provided and ready;
    console.log('Global Test Setup Started');
    if (setupVerifier.execute()) {
      console.log('Using Provided Test Setup');
      return;
    }

    // 2. Try to detect devnet setup
    console.log('Basic test parameters are missing, Auto Setup Started');

    await this.detectDevnet();
    this.resolveRpc();
    await accountResolver.execute(this.isRsDevnet);

    const isSet = setupVerifier.execute(true);
    if (!isSet) console.error('Test Setup Environment is NOT Ready');
  }
}

export default new StrategyResolver();
