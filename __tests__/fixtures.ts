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

const DEFAULT_TEST_PROVIDER_BASE_URL = 'http://127.0.0.1:5050/';
const DEFAULT_TEST_ACCOUNT_ADDRESS = // run `starknet-devnet --seed 0` and this will be the first account
  '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a';
const DEFAULT_TEST_ACCOUNT_PRIVATE_KEY = '0xe3e70682c2094cac629f6fbed82c07cd';

const BASE_URL = process.env.TEST_PROVIDER_BASE_URL || DEFAULT_TEST_PROVIDER_BASE_URL;
export const IS_DEVNET = !BASE_URL.includes('starknet.io');

export const getTestProvider = () => {
  const provider = new Provider({ gateway: { baseUrl: BASE_URL } });

  if (IS_DEVNET) {
    // accelerate the tests when running locally
    const originalWaitForTransaction = provider.waitForTransaction.bind(provider);
    provider.waitForTransaction = (txHash, retryInterval) => {
      return originalWaitForTransaction(txHash, retryInterval || 1000);
    };
  }

  return provider;
};

// test account with fee token balance
export const getTestAccount = (provider = getTestProvider(), isDevnet = false) => {
  if (!isDevnet) {
    if (!process.env.TEST_ACCOUNT_PRIVATE_KEY) {
      throw new Error('TEST_ACCOUNT_PRIVATE_KEY is not set');
    }

    if (!process.env.TEST_ACCOUNT_ADDRESS) {
      throw new Error('TEST_ACCOUNT_ADDRESS is not set');
    }
  }

  const testAccountAddress = isDevnet
    ? DEFAULT_TEST_ACCOUNT_ADDRESS
    : (process.env.TEST_ACCOUNT_ADDRESS as string);
  const testAccountPrivateKey = isDevnet
    ? DEFAULT_TEST_ACCOUNT_PRIVATE_KEY
    : (process.env.TEST_ACCOUNT_PRIVATE_KEY as string);

  return new Account(provider, testAccountAddress, ec.getKeyPair(testAccountPrivateKey));
};

export const testIf = (condition: boolean) => (condition ? test : test.skip);
export const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const testIfDevnet = testIf(IS_DEVNET);
export const testIfNotDevnet = testIf(!IS_DEVNET);
export const describeIfDevnet = describeIf(IS_DEVNET);
export const describeIfNotDevnet = describeIf(!IS_DEVNET);
