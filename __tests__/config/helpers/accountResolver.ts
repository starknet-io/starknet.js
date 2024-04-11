/* eslint-disable no-console */
import { GS_DEFAULT_TEST_PROVIDER_URL } from '../constants';

class AccountResolver {
  get providedUrl() {
    return process.env.TEST_RPC_URL;
  }

  get hasAllAccountEnvs() {
    return process.env.TEST_ACCOUNT_ADDRESS && process.env.TEST_ACCOUNT_PRIVATE_KEY;
  }

  get hasPartialAccountEnvs() {
    return process.env.TEST_ACCOUNT_ADDRESS || process.env.TEST_ACCOUNT_PRIVATE_KEY;
  }

  private async fetchAccount(url: string) {
    const response = await fetch(`${url}predeployed_accounts`);
    const [account] = await response.json();
    const { address, private_key, initial_balance } = account;
    process.env.TEST_ACCOUNT_ADDRESS = address;
    process.env.TEST_ACCOUNT_PRIVATE_KEY = private_key;
    process.env.INITIAL_BALANCE = initial_balance;
  }

  private async isAccountSet(isDevnet: boolean): Promise<boolean> {
    if (this.hasAllAccountEnvs) {
      return true;
    }
    if (this.hasPartialAccountEnvs) {
      throw new Error(
        'If you are providing one of you need to provide both: TEST_ACCOUNT_ADDRESS & TEST_ACCOUNT_PRIVATE_KEY'
      );
    }
    if (isDevnet) {
      // get account from devnet
      try {
        await this.fetchAccount(GS_DEFAULT_TEST_PROVIDER_URL);
        return true;
      } catch (error) {
        console.error('Fetching account from devnet failed');
      }
    } else if (this.providedUrl) {
      // try to get it from remote devnet
      try {
        await this.fetchAccount(this.providedUrl);
        return true;
      } catch (error) {
        console.error(`Fetching account from provided url ${this.providedUrl} failed`);
      }
    }

    throw new Error(
      'Setting Account using all known strategies failed, provide basic test parameters'
    );
  }

  async execute(isDevnet: boolean): Promise<void> {
    const isAccountSet = await this.isAccountSet(isDevnet);
    if (isAccountSet) console.log('Detected Account');
  }
}

export default new AccountResolver();
