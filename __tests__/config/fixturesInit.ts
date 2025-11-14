import {
  Account,
  Provider,
  ProviderInterface,
  RpcProvider,
  config,
  getTipStatsFromBlocks,
  type PaymasterInterface,
  type TipAnalysisOptions,
} from '../../src';
import { RpcProviderOptions, type BlockIdentifier } from '../../src/types';
import { toHex } from '../../src/utils/num';
import './customMatchers'; // ensures TS traversal
import { SupportedRpcVersion, SupportedTransactionVersion } from '../../src/global/constants';

config.set('logLevel', 'ERROR');

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
export function adaptAccountIfDevnet(account: Account): Account {
  const isDevnet = process.env.IS_DEVNET === 'true';
  if (isDevnet) {
    // eslint-disable-next-line no-param-reassign
    account.getEstimateTip = function async(
      blockIdentifier?: BlockIdentifier,
      options: TipAnalysisOptions = {}
    ) {
      return getTipStatsFromBlocks(this, blockIdentifier, {
        ...options,
        minTxsNecessary: options.minTxsNecessary ?? 3,
        maxBlocks: options.maxBlocks ?? 10,
      });
    };
  }
  return account;
}

export const getTestAccount = (
  provider: ProviderInterface,
  txVersion?: SupportedTransactionVersion,
  paymasterSnip29?: PaymasterInterface
) => {
  return adaptAccountIfDevnet(
    new Account({
      provider,
      address: toHex(process.env.TEST_ACCOUNT_ADDRESS || ''),
      signer: process.env.TEST_ACCOUNT_PRIVATE_KEY || '',
      transactionVersion: txVersion ?? TEST_TX_VERSION,
      paymaster: paymasterSnip29,
    })
  );
};

export const ETHtokenAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const STRKtokenAddress =
  '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
export const devnetFeeTokenAddress = TEST_TX_VERSION === '0x3' ? STRKtokenAddress : ETHtokenAddress;
