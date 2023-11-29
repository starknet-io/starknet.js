import fs from 'node:fs';
import path from 'node:path';

import { Account, ProviderInterface, RpcProvider, SequencerProvider, json } from '../src';
import {
  CompiledSierra,
  CompiledSierraCasm,
  LegacyCompiledContract,
  waitForTransactionOptions,
} from '../src/types';
import { toHex } from '../src/utils/num';

const readContract = (name: string): LegacyCompiledContract =>
  json.parse(
    fs.readFileSync(path.resolve(__dirname, `../__mocks__/${name}.json`)).toString('ascii')
  );

const readContractSierraCasm = (name: string): CompiledSierraCasm =>
  json.parse(
    fs.readFileSync(path.resolve(__dirname, `../__mocks__/${name}.casm`)).toString('ascii')
  );

const readContractSierra = (name: string): CompiledSierra =>
  json.parse(
    fs.readFileSync(path.resolve(__dirname, `../__mocks__/${name}.json`)).toString('ascii')
  );

export const compiledOpenZeppelinAccount = readContract('Account');
export const compiledErc20 = readContract('ERC20');
export const compiledErc20Echo = readContract('ERC20-echo');
export const compiledL1L2 = readContract('l1l2_compiled');
export const compiledTypeTransformation = readContract('contract');
export const compiledMulticall = readContract('multicall');
export const compiledTestDapp = readContract('TestDapp');
export const compiledStarknetId = readContract('starknetId_compiled');
export const compiledNamingContract = readContract('naming_compiled');
export const compiledHashSierra = readContractSierra('cairo/hash/hash');
export const compiledHashSierraCasm = readContractSierraCasm('cairo/hash/hash');
export const compiledHelloSierra = readContractSierra('cairo/helloSierra/hello');
export const compiledHelloSierraCasm = readContractSierraCasm('cairo/helloSierra/hello');
export const compiledComplexSierra = readContractSierra('cairo/complexInput/complexInput');
export const compiledC1Account = readContractSierra('cairo/account/accountOZ080');
export const compiledC1AccountCasm = readContractSierraCasm('cairo/account/accountOZ080');
export const compiledC1v2 = readContractSierra('cairo/helloCairo2/compiled');
export const compiledC1v2Casm = readContractSierraCasm('cairo/helloCairo2/compiled');
export const compiledC210 = readContractSierra('cairo/cairo210/cairo210.sierra');
export const compiledC210Casm = readContractSierraCasm('cairo/cairo210/cairo210');

export const getTestProvider = (): ProviderInterface => {
  const provider = process.env.TEST_RPC_URL
    ? new RpcProvider({ nodeUrl: process.env.TEST_RPC_URL })
    : new SequencerProvider({ baseUrl: process.env.TEST_PROVIDER_BASE_URL || '' });

  if (process.env.IS_LOCALHOST_DEVNET === 'true') {
    // accelerate the tests when running locally
    const originalWaitForTransaction = provider.waitForTransaction.bind(provider);
    provider.waitForTransaction = (
      txHash: string,
      { retryInterval }: waitForTransactionOptions = {}
    ) => {
      return originalWaitForTransaction(txHash, { retryInterval: retryInterval || 1000 });
    };
  }

  return provider;
};

export const getTestAccount = (provider: ProviderInterface) => {
  return new Account(
    provider,
    toHex(process.env.TEST_ACCOUNT_ADDRESS || ''),
    process.env.TEST_ACCOUNT_PRIVATE_KEY || ''
  );
};

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfSequencer = describeIf(process.env.IS_SEQUENCER === 'true');
export const describeIfRpc = describeIf(process.env.IS_RPC === 'true');
export const describeIfNotDevnet = describeIf(process.env.IS_LOCALHOST_DEVNET === 'false');
export const describeIfDevnet = describeIf(process.env.IS_LOCALHOST_DEVNET === 'true');
export const describeIfDevnetRpc = describeIf(process.env.IS_RPC_DEVNET === 'true');
export const describeIfDevnetSequencer = describeIf(process.env.IS_SEQUENCER_DEVNET === 'true');
export const describeIfSequencerGoerli = describeIf(process.env.IS_SEQUENCER_GOERLI === 'true');

export const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
