import fs from 'fs';
import path from 'path';

import { Account, ProviderInterface, RpcProvider, SequencerProvider, ec, json } from '../src';
import { CompiledContract } from '../src/types';

const readContract = (name: string): CompiledContract =>
  json.parse(
    fs.readFileSync(path.resolve(__dirname, `../__mocks__/${name}.json`)).toString('ascii')
  );

export const compiledOpenZeppelinAccount = readContract('Account');
export const compiledErc20 = readContract('ERC20');
export const compiledL1L2 = readContract('l1l2_compiled');
export const compiledTypeTransformation = readContract('contract');
export const compiledMulticall = readContract('multicall');
export const compiledTestDapp = readContract('TestDapp');
export const compiledStarknetId = readContract('starknetId_compiled');
export const compiledNamingContract = readContract('naming_compiled');

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
    provider.waitForTransaction = (txHash: string, retryInterval?: number) => {
      return originalWaitForTransaction(txHash, retryInterval || 1000);
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

  return new Account(provider, testAccountAddress, ec.getKeyPair(testAccountPrivateKey));
};

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfSequencer = describeIf(IS_SEQUENCER);
export const describeIfRpc = describeIf(IS_RPC);
export const describeIfNotDevnet = describeIf(!IS_LOCALHOST_DEVNET);
export const describeIfDevnet = describeIf(IS_LOCALHOST_DEVNET);

export const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';
