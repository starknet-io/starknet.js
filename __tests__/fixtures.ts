import fs from 'fs';

import { Account, ProviderInterface, RpcProvider, SequencerProvider, ec, json } from '../src';
import { CompiledContract, DeployContractPayload } from '../src/types';
import { encodeShortString } from '../src/utils/shortString';

const readContract = (name: string): CompiledContract =>
  json.parse(fs.readFileSync(`./__mocks__/${name}.json`).toString('ascii'));

export const compiledOpenZeppelinAccount = readContract('Account');
export const compiledErc20 = readContract('ERC20');
export const compiledL1L2 = readContract('l1l2_compiled');
export const compiledTypeTransformation = readContract('contract');
export const compiledMulticall = readContract('multicall');
export const compiledTestDapp = readContract('TestDapp');

const DEFAULT_TEST_PROVIDER_BASE_URL = 'http://127.0.0.1:5050/';
const DEFAULT_TEST_ACCOUNT_ADDRESS = // run `starknet-devnet --seed 0` and this will be the first account
  '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a';
const DEFAULT_TEST_ACCOUNT_PRIVATE_KEY = '0xe3e70682c2094cac629f6fbed82c07cd';

const BASE_URL = process.env.TEST_PROVIDER_BASE_URL || DEFAULT_TEST_PROVIDER_BASE_URL;
const RPC_URL = process.env.TEST_RPC_URL;

const IS_RPC = !!RPC_URL;
const IS_RPC_DEVNET = Boolean(
  RPC_URL && (RPC_URL.includes('localhost') || RPC_URL.includes('127.0.0.1'))
);
const IS_SEQUENCER = !IS_RPC;
const IS_SEQUENCER_DEVNET = !BASE_URL.includes('starknet.io');
export const IS_SEQUENCER_GOERLI = BASE_URL === 'https://alpha4-2.starknet.io';
export const IS_DEVNET = IS_SEQUENCER ? IS_SEQUENCER_DEVNET : IS_RPC_DEVNET;

export const getTestProvider = (): ProviderInterface => {
  const provider = RPC_URL
    ? new RpcProvider({ nodeUrl: RPC_URL })
    : new SequencerProvider({ baseUrl: BASE_URL });

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
export const getTestAccount = (provider: ProviderInterface) => {
  let testAccountAddress = process.env.TEST_ACCOUNT_ADDRESS;
  let testAccountPrivateKey = process.env.TEST_ACCOUNT_PRIVATE_KEY;

  if (!IS_DEVNET) {
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
export const describeIfSequencer = describeIf(IS_DEVNET);
export const describeIfRpc = describeIf(IS_RPC);
export const describeIfNotDevnet = describeIf(!IS_DEVNET);

export const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';

export const getERC20DeployPayload = (recipient: string): DeployContractPayload => {
  return {
    contract: compiledErc20,
    constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), recipient],
  };
};
