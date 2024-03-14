/* eslint-disable no-console */
import { GS_DEFAULT_TEST_PROVIDER_URL } from '../constants';
import { setIfNullish } from './env';

export type DevnetStrategy = Record<'isDevnet' | 'isRS', boolean>;

const LOCAL_DEVNET_NOT_RUNNING_MESSAGE = `
Local devnet is not running. In order to properly run it you need to do the following: \n
  - Go to the: https://hub.docker.com/r/shardlabs/starknet-devnet-rs/tags
  - Find the latest tag and copy the "docker pull" command
  - Run the docker on your machine
  - Run the: "docker pull shardlabs/starknet-devnet-rs:latest"
`;

class LocalDevnetDetector {
  private strategy: DevnetStrategy = { isDevnet: false, isRS: false };

  get isDevnet() {
    return this.strategy.isDevnet;
  }

  get isRS() {
    return this.strategy.isRS;
  }

  private setup() {
    setIfNullish('IS_LOCALHOST_DEVNET', this.isDevnet);
    setIfNullish('IS_RPC_DEVNET', this.isDevnet && (this.isRS || !!process.env.TEST_RPC_URL));
    setIfNullish('IS_SEQUENCER_DEVNET', this.isDevnet && process.env.IS_RPC_DEVNET === 'false');
    return this.strategy;
  }

  private async isLocalDevnet(): Promise<boolean> {
    // if is_alive work it is local devnet
    const devnetResult = await fetch(`${GS_DEFAULT_TEST_PROVIDER_URL}is_alive`)
      .then((res) => res.text())
      .catch(() => null);

    return devnetResult === 'Alive!!!';
  }

  private async isRsDevnet(): Promise<boolean> {
    const response = await fetch(GS_DEFAULT_TEST_PROVIDER_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'starknet_syncing' }),
    });
    const { jsonrpc } = await response.json();
    return jsonrpc === '2.0';
  }

  async execute() {
    this.strategy.isDevnet = await this.isLocalDevnet();

    if (!this.strategy.isDevnet) {
      console.log('\x1b[36m%s\x1b[0m', LOCAL_DEVNET_NOT_RUNNING_MESSAGE);
      return this.setup();
    }

    // if on base url RPC endpoint work it is devnet-rs else it devnet-py
    try {
      this.strategy.isRS = await this.isRsDevnet();
    } catch (error) {
      return this.setup();
    }

    return this.setup();
  }
}

export default new LocalDevnetDetector();
