import fs from 'fs';

import { Account, defaultProvider, ec, json } from '../src';
import { CompiledContract } from '../src/types';

const readContract = (name: string): CompiledContract =>
  json.parse(fs.readFileSync(`./__mocks__/${name}.json`).toString('ascii'));

export const compiledOpenZeppelinAccount = readContract('Account');
export const compiledArgentAccount = readContract('ArgentAccount');
export const compiledErc20 = readContract('ERC20');
export const compiledTypeTransformation = readContract('contract');
export const compiledMulticall = readContract('multicall');
export const compiledTestDapp = readContract('TestDapp');

const DEFAULT_TEST_ACCOUNT_ADDRESS =
  '0x6c0a3ca4f79e978f3b7005898aaa49bef4a24aeaa5f10c6a97887516400197e';

export const getTestAccount = () => {
  const testAccountAddress = process.env.TEST_ACCOUNT_ADDRESS || DEFAULT_TEST_ACCOUNT_ADDRESS;
  const testAccountPrivateKey = process.env.TEST_ACCOUNT_PRIVATE_KEY;

  if (!testAccountPrivateKey) {
    throw new Error('TEST_ACCOUNT_PRIVATE_KEY is not set');
  }

  return new Account(defaultProvider, testAccountAddress, ec.getKeyPair(testAccountPrivateKey));
};

export const getTestProvider = () => {
  // Will support both local and remote providers in the future
  return defaultProvider;
};
