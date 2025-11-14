import fs from 'node:fs';
import path from 'node:path';
import { DevnetProvider } from 'starknet-devnet';
import { Provider, ProviderInterface, RpcProvider, config, hash, json } from '../../src';
import {
  CompiledSierra,
  CompiledSierraCasm,
  LegacyCompiledContract,
  RpcProviderOptions,
} from '../../src/types';
import { wait } from '../../src/utils/provider';
import { isString } from '../../src/utils/typed';
import './customMatchers'; // ensures TS traversal
import { SupportedRpcVersion } from '../../src/global/constants';

const readFile = (subpath: string) => fs.readFileSync(path.resolve(__dirname, subpath));

const readContract = <T = LegacyCompiledContract>(name: string, extension: string = 'json'): T =>
  json.parse(readFile(`../../__mocks__/${name}.${extension}`).toString('ascii'));

const readContractSierra = readContract<CompiledSierra>;
const readContractSierraCasm = (name: string) => readContract<CompiledSierraCasm>(name, 'casm');

const readContractSet = (name: string, pathPrefix: string = 'cairo') => ({
  sierra: readContractSierra(`${pathPrefix}/${name}.sierra`),
  casm: readContractSierraCasm(`${pathPrefix}/${name}`),
});

const readContractCasmOnly = (name: string, pathPrefix: string = 'cairo') => ({
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
  ComplexSierra: readContractSierra('cairo/complexInput/complexInput'),
  Erc20OZ: 'cairo294/erc20_oz100',
  HashSierra: 'hash/hash',
  C1v2: 'helloCairo2/compiled',
  C210: 'cairo210/cairo210',
  C240: 'cairo240/string',
  Tuple: 'cairo253/tupleResponse',
  C260: 'cairo260/hello260',
  U512: 'cairo260/u512',
  Minimalist: 'cairo2114/minimalist',
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
  TypeTransformation: 'cairo2114/contract',
  echo: 'cairo2114/echo',
  deployer: 'cairo2100/deployer',
  CairoByteArray: 'byteArray/target/dev/test_ByteArrayStorage',
  IntegerTypes: 'integerTypes/target/dev/test_IntegerTypesStorage',
  // CASM-only contracts (used for Blake2s hash verification against Rust implementation)
  Blake2sVerificationContract: readContractCasmOnly('test_contract_rust'),
};
export const contracts = mapContractSets(compiledContracts);

config.set('logLevel', 'ERROR');

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

export const { TEST_WS_URL } = process.env;

export const createBlockForDevnet = async (): Promise<void> => {
  if (!(process.env.IS_DEVNET === 'true')) return;
  const devnet = new DevnetProvider({ url: process.env.TEST_RPC_URL });
  await devnet.createBlock();
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
export const testIfRpc010 = describeIf(process.env.RPC_SPEC_VERSION === '0.10.0');
export const describeIfRpc09 = describeIf(process.env.RPC_SPEC_VERSION === '0.9.0');
export const erc20ClassHash: string = hash.computeContractClassHash(contracts.Erc20OZ.sierra); // Cairo 1
export const C1v2ClassHash: string = hash.computeContractClassHash(contracts.C1v2.sierra); // Cairo 1
export const wrongClassHash = '0x000000000000000000000000000000000000000000000000000000000000000';
