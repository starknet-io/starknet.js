import fs from 'node:fs';
import path from 'node:path';

import { Account, Provider, ProviderInterface, RpcProvider, config, json } from '../../src';
import {
  CompiledSierra,
  CompiledSierraCasm,
  LegacyCompiledContract,
  RpcProviderOptions,
} from '../../src/types';
import { toHex } from '../../src/utils/num';
import { wait } from '../../src/utils/provider';
import { isString } from '../../src/utils/typed';
import './customMatchers'; // ensures TS traversal
import { SupportedRpcVersion, SupportedTransactionVersion } from '../../src/global/constants';

const readFile = (subpath: string) => fs.readFileSync(path.resolve(__dirname, subpath));

const readContract = <T = LegacyCompiledContract>(name: string, extension: string = 'json'): T =>
  json.parse(readFile(`../../__mocks__/${name}.${extension}`).toString('ascii'));

const readContractSierra = readContract<CompiledSierra>;
const readContractSierraCasm = (name: string) => readContract<CompiledSierraCasm>(name, 'casm');

const readContractSet = (name: string, pathPrefix: string = 'cairo') => ({
  sierra: readContractSierra(`${pathPrefix}/${name}.sierra`),
  casm: readContractSierraCasm(`${pathPrefix}/${name}`),
});

const mapContractSets = <T extends Record<string, any>>(
  contractRecord: T,
  pathPrefix?: string
): { [K in keyof T]: T[K] extends string ? ReturnType<typeof readContractSet> : T[K] } =>
  Object.fromEntries(
    Object.entries(contractRecord).map(([key, value]) => [
      key,
      isString(value) ? readContractSet(value, pathPrefix) : value,
    ])
  ) as any;

// cairo/ contracts are retrieved as a { sierra, casm } set
const compiledContracts = {
  OpenZeppelinAccount: readContract('Account'),
  Erc20: readContract('ERC20'),
  Erc20Echo: readContract('ERC20-echo'),
  L1L2: readContract('l1l2_compiled'),
  TypeTransformation: readContract('contract'),
  Multicall: readContract('multicall'),
  TestDapp: readContract('TestDapp'),
  ComplexSierra: readContractSierra('cairo/complexInput/complexInput'),
  // cairo/
  Erc20OZ: 'ERC20-241/ERC20OZ081',
  HashSierra: 'hash/hash',
  HelloSierra: 'helloSierra/hello',
  C1v2: 'helloCairo2/compiled',
  C210: 'cairo210/cairo210',
  C240: 'cairo240/string',
  Tuple: 'cairo253/tupleResponse',
  C260: 'cairo260/hello260',
  U512: 'cairo260/u512',
  NonZero: 'cairo263/zeroable',
  OnlyConstructor: 'onlyConstructor/onlyConstructor',
  C1Account: 'account/accountOZ080',
  ArgentX4Account: 'account/accountArgent040',
  EthAccount: 'ethSigner/openzeppelin_EthAccount090',
  Dummy1Eth: 'ethSigner/dummy1ForEth',
  Dummy2Eth: 'ethSigner/dummy2ForEth',
  EthPubk: 'ethSigner/testEthPubKey',
  TestReject: 'testReject/test_reject',
  starknetId: mapContractSets(
    {
      StarknetId: 'identity/identity',
      Naming: 'naming/naming',
      Pricing: 'pricing/pricing',
      SidMulticall: 'multicall/multicall',
    },
    'starknetId'
  ),
  U96: 'cairo282/u96',
  fixedArray: 'cairo292/fixed_array',
};
export const contracts = mapContractSets(compiledContracts);

config.set('logLevel', 'DEBUG');

export function getTestProvider(
  isProvider?: true,
  setProviderOptions?: RpcProviderOptions
): ProviderInterface;
export function getTestProvider(
  isProvider?: false,
  setProviderOptions?: RpcProviderOptions
): RpcProvider;
export function getTestProvider(
  isProvider: boolean = true,
  setProviderOptions?: RpcProviderOptions
): ProviderInterface | RpcProvider {
  const isDevnet = process.env.IS_DEVNET === 'true';

  const providerOptions: RpcProviderOptions = {
    ...setProviderOptions,
    nodeUrl: process.env.TEST_RPC_URL,
    specVersion: process.env.RPC_SPEC_VERSION as SupportedRpcVersion,
    // accelerate the tests when running locally
    ...(isDevnet && { transactionRetryIntervalFallback: 1000 }),
  };
  return isProvider ? new Provider(providerOptions) : new RpcProvider(providerOptions);
}

export async function createTestProvider(
  isProvider?: true,
  setProviderOptions?: RpcProviderOptions
): Promise<ProviderInterface>;
export async function createTestProvider(
  isProvider?: false,
  setProviderOptions?: RpcProviderOptions
): Promise<RpcProvider>;
export async function createTestProvider(
  isProvider: boolean = true,
  setProviderOptions?: RpcProviderOptions
): Promise<ProviderInterface | RpcProvider> {
  const isDevnet = process.env.IS_DEVNET === 'true';

  const providerOptions: RpcProviderOptions = {
    ...setProviderOptions,
    nodeUrl: process.env.TEST_RPC_URL,
    specVersion: process.env.RPC_SPEC_VERSION as SupportedRpcVersion,
    // accelerate the tests when running locally
    ...(isDevnet && { transactionRetryIntervalFallback: 1000 }),
  };
  return isProvider ? Provider.create(providerOptions) : RpcProvider.create(providerOptions);
}

export const TEST_TX_VERSION = process.env.TX_VERSION as SupportedTransactionVersion;
export const { TEST_WS_URL } = process.env;

export const getTestAccount = (
  provider: ProviderInterface,
  txVersion?: SupportedTransactionVersion
) => {
  return new Account(
    provider,
    toHex(process.env.TEST_ACCOUNT_ADDRESS || ''),
    process.env.TEST_ACCOUNT_PRIVATE_KEY || '',
    undefined,
    txVersion ?? TEST_TX_VERSION
  );
};

export const createBlockForDevnet = async (): Promise<void> => {
  if (!(process.env.IS_DEVNET === 'true')) return;
  const response = await fetch(new URL('/create_block', process.env.TEST_RPC_URL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DEVNET status ${response.status}: ${errorText}`);
  }
};

export async function waitNextBlock(provider: RpcProvider, delay: number) {
  const initBlock = await provider.getBlockNumber();
  await createBlockForDevnet();
  let isNewBlock: boolean = false;
  while (!isNewBlock) {
    // eslint-disable-next-line no-await-in-loop
    const currentBlock = await provider.getBlockNumber();
    if (currentBlock !== initBlock) {
      isNewBlock = true;
    } else {
      // eslint-disable-next-line no-await-in-loop
      await wait(delay);
    }
  }
}

const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
export const describeIfRpc = describeIf(process.env.IS_RPC === 'true');
export const describeIfNotDevnet = describeIf(process.env.IS_DEVNET === 'false');
export const describeIfDevnet = describeIf(process.env.IS_DEVNET === 'true');
export const describeIfTestnet = describeIf(process.env.IS_TESTNET === 'true');
export const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
export const ETHtokenAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const STRKtokenAddress =
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
export const devnetFeeTokenAddress = TEST_TX_VERSION === '0x3' ? STRKtokenAddress : ETHtokenAddress;
