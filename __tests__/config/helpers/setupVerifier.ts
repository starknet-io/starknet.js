/* eslint-disable no-console */
// import { getDefaultNodeUrl } from '../../../src/utils/provider';
import { BaseUrl } from '../../../src/constants';
import { setIfNullish } from './env';

class SetupVerifier {
  warnings: string[] = [];

  get hasWarnings() {
    return this.warnings.length > 0;
  }

  get isCairo1Testnet() {
    const url = process.env.TEST_PROVIDER_BASE_URL || process.env.TEST_RPC_URL;
    return url?.includes(BaseUrl.SN_GOERLI);
  }

  private logTable() {
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
  }

  private handleWarnings(final?: boolean) {
    if (!process.env.TEST_ACCOUNT_ADDRESS) {
      if (final) throw new Error('TEST_ACCOUNT_ADDRESS env is not provided');
      else this.warnings.push('TEST_ACCOUNT_ADDRESS env is not provided!');
    }
    if (!process.env.TEST_ACCOUNT_PRIVATE_KEY) {
      if (final) throw new Error('TEST_ACCOUNT_PRIVATE_KEY env is not provided');
      else this.warnings.push('TEST_ACCOUNT_PRIVATE_KEY env is not provided!');
    }

    if (this.hasWarnings) {
      console.log('\x1b[33m', this.warnings.join('\n'), '\x1b[0m');
      delete process.env.TEST_ACCOUNT_ADDRESS;
      delete process.env.TEST_ACCOUNT_PRIVATE_KEY;
    }
  }

  execute(final?: boolean): boolean {
    this.handleWarnings(final);

    if (this.hasWarnings) {
      this.warnings = [];
      return false;
    }

    // if (!process.env.TEST_RPC_URL) {
    //   const defaultNodeUrl = getDefaultNodeUrl();
    //   process.env.TEST_RPC_URL = defaultNodeUrl;
    //   console.warn(`TEST_RPC_URL env is not provided. Using default node URL: ${defaultNodeUrl}`);
    // }

    if (!final) {
      setIfNullish('IS_RPC_DEVNET', false);
      setIfNullish('IS_RPC', !!process.env.TEST_RPC_URL);
      setIfNullish('IS_CAIRO1_TESTNET', this.isCairo1Testnet);
    }

    this.logTable();

    console.log('Global Test Environment is Ready');
    return true;
  }
}

export default new SetupVerifier();
