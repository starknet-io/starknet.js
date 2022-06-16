import fs from 'fs';

import { Account, Provider, ec, json } from '../src';
import { CompiledContract } from '../src/types';

const readContract = (name: string): CompiledContract =>
  json.parse(fs.readFileSync(`./__mocks__/${name}.json`).toString('ascii'));

export const compiledOpenZeppelinAccount = readContract('Account');
export const compiledErc20 = readContract('ERC20');
export const compiledTypeTransformation = readContract('contract');
export const compiledMulticall = readContract('multicall');
export const compiledTestDapp = readContract('TestDapp');

const DEFAULT_TEST_ACCOUNT_ADDRESS = // run `starknet-devnet --seed 0` and this will be the first account
  '0x65d53c8ec4178096167b35a08e16e548d8075cb08ad7bc63d07966ca13569dc';
const DEFAULT_TEST_ACCOUNT_PRIVATE_KEY = '0xe3e70682c2094cac629f6fbed82c07cd';

export const getTestProvider = () => {
  const baseUrl = process.env.TEST_PROVIDER_BASE_URL;

  if (!baseUrl) {
    throw new Error(`TEST_PROVIDER_BASE_URL is not provided

Please run \`starknet-devnet --seed 0\` in a seperate terminal and add \`TEST_PROVIDER_BASE_URL="http://127.0.0.1:5050/"\` to your environment variables.

You can install \`starknet-devnet\` by running \`pip install starknet-devnet\``);
  }

  const provider = new Provider({ baseUrl });

  if (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1')) {
    // accelerate the tests when running locally
    const originalWaitForTransaction = provider.waitForTransaction.bind(provider);
    provider.waitForTransaction = (txHash, retryInterval) => {
      return originalWaitForTransaction(txHash, retryInterval || 1000);
    };
  }

  return provider;
};

// test account with fee token balance
export const getTestAccount = () => {
  const provider = getTestProvider();

  const testAccountAddress = process.env.TEST_ACCOUNT_ADDRESS || DEFAULT_TEST_ACCOUNT_ADDRESS;
  const testAccountPrivateKey =
    process.env.TEST_ACCOUNT_PRIVATE_KEY || DEFAULT_TEST_ACCOUNT_PRIVATE_KEY;

  return new Account(provider, testAccountAddress, ec.getKeyPair(testAccountPrivateKey));
};
