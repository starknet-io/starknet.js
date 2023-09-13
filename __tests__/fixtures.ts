import fs from 'fs';
import path from 'path';

import { Account, ProviderInterface, RpcProvider, SequencerProvider, json } from '../src';
import {
  CairoVersion,
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
export const compiledC1Account = readContractSierra('cairo/account/account');
export const compiledC1AccountCasm = readContractSierraCasm('cairo/account/account');
export const compiledC1v2 = readContractSierra('cairo/helloCairo2/compiled');
export const compiledC1v2Casm = readContractSierraCasm('cairo/helloCairo2/compiled');
export const compiledC210 = readContractSierra('cairo/cairo210/cairo210.sierra');
export const compiledC210Casm = readContractSierraCasm('cairo/cairo210/cairo210');

/* Default test config based on run `starknet-devnet --seed 0` */
const DEFAULT_TEST_PROVIDER_SEQUENCER_URL = 'http://127.0.0.1:5050/';
const DEFAULT_TEST_ACCOUNT_ADDRESS =
  '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a';
const DEFAULT_TEST_ACCOUNT_PRIVATE_KEY = '0xe3e70682c2094cac629f6fbed82c07cd';

/* User defined config or default one */
const BASE_URL = process.env.TEST_PROVIDER_BASE_URL || DEFAULT_TEST_PROVIDER_SEQUENCER_URL;
const RPC_URL = process.env.TEST_RPC_URL;

/* Detect user defined node or sequencer, if none default to sequencer if both default to node */
const PROVIDER_URL = RPC_URL || BASE_URL;

/* Detect is localhost devnet */
export const IS_LOCALHOST_DEVNET =
  PROVIDER_URL.includes('localhost') || PROVIDER_URL.includes('127.0.0.1');

export const IS_DEVNET_RPC = IS_LOCALHOST_DEVNET && PROVIDER_URL.includes('rpc');
export const IS_DEVNET_SEQUENCER = IS_LOCALHOST_DEVNET && !PROVIDER_URL.includes('rpc');

/* Definitions */
export const IS_RPC = !!RPC_URL;
export const IS_SEQUENCER = !RPC_URL;

export const getTestProvider = (): ProviderInterface => {
  const provider = RPC_URL
    ? new RpcProvider({ nodeUrl: RPC_URL })
    : new SequencerProvider({ baseUrl: BASE_URL });

  if (IS_LOCALHOST_DEVNET) {
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

// test account with fee token balance
export const getTestAccount = (provider: ProviderInterface) => {
  let testAccountAddress = process.env.TEST_ACCOUNT_ADDRESS;
  let testAccountPrivateKey = process.env.TEST_ACCOUNT_PRIVATE_KEY;

  if (!IS_LOCALHOST_DEVNET) {
    if (!testAccountPrivateKey) {
      throw new Error('TEST_ACCOUNT_PRIVATE_KEY is not set');
    }
    if (!testAccountAddress) {
      throw new Error('TEST_ACCOUNT_ADDRESS is not set');
    }
  } else {
    testAccountAddress = DEFAULT_TEST_ACCOUNT_ADDRESS;
    testAccountPrivateKey = DEFAULT_TEST_ACCOUNT_PRIVATE_KEY;
  }
  const cairoVersion = (process.env.ACCOUNT_CAIRO_VERSION as CairoVersion) || '0';

  return new Account(provider, toHex(testAccountAddress), testAccountPrivateKey, cairoVersion);
};

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfSequencer = describeIf(IS_SEQUENCER);
export const describeIfRpc = describeIf(IS_RPC);
export const describeIfNotRpc = describeIf(!IS_RPC);
export const describeIfNotDevnet = describeIf(!IS_LOCALHOST_DEVNET);
export const describeIfDevnet = describeIf(IS_LOCALHOST_DEVNET);
export const describeIfDevnetRpc = describeIf(IS_DEVNET_RPC);
export const describeIfDevnetSequencer = describeIf(IS_DEVNET_SEQUENCER);

export const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
