/**
 * Test Instance Initialization
 *
 * This module provides factory functions for creating test providers and accounts:
 * - createTestProvider: Async provider factory (recommended, uses Provider.create)
 * - getTestProvider: Sync provider factory (legacy, uses direct constructor)
 * - getTestAccount: Account factory with devnet adaptations
 * - Token addresses and transaction version constants
 */
import {
  Account,
  Provider,
  ProviderInterface,
  RpcProvider,
  getTipStatsFromBlocks,
  type PaymasterInterface,
  type TipAnalysisOptions,
} from '../../../src';
import { RpcProviderOptions, type BlockIdentifier } from '../../../src/types';
import { toHex } from '../../../src/utils/num';
import '../customMatchers'; // ensures TS traversal
import { SupportedRpcVersion, SupportedTransactionVersion } from '../../../src/global/constants';

/**
 * Builds provider options with test environment configuration
 * @param setProviderOptions - Optional provider options to merge
 * @returns Provider options configured for test environment
 */
function buildTestProviderOptions(setProviderOptions?: RpcProviderOptions): RpcProviderOptions {
  return {
    ...setProviderOptions,
    nodeUrl: process.env.TEST_RPC_URL,
    specVersion: process.env.RPC_SPEC_VERSION as SupportedRpcVersion,
  };
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
  const providerOptions = buildTestProviderOptions(setProviderOptions);
  return isProvider ? Provider.create(providerOptions) : RpcProvider.create(providerOptions);
}

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
  const providerOptions = buildTestProviderOptions(setProviderOptions);
  return isProvider ? new Provider(providerOptions) : new RpcProvider(providerOptions);
}

export const TEST_TX_VERSION = process.env.TX_VERSION as SupportedTransactionVersion;
export function adaptAccountIfDevnet(account: Account): Account {
  const isDevnet = process.env.IS_DEVNET === 'true';
  if (isDevnet) {
    // eslint-disable-next-line no-param-reassign
    account.provider.getEstimateTip = function async(
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
