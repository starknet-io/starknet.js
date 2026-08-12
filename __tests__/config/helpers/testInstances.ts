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
import { ReconnectingWsTransport, type RpcTransport } from '../../../src/channel/transport';
import { RpcProviderOptions, type BlockIdentifier } from '../../../src/types';
import { toHex } from '../../../src/utils/num';
import '../customMatchers'; // ensures TS traversal
import { SupportedRpcVersion, SupportedTransactionVersion } from '../../../src/global/constants';

/**
 * One transport per test file, not one per provider.
 *
 * Jest gives each test file a fresh module registry, so this is file-scoped by construction. A
 * socket per provider would open dozens against a rate-limited gateway for no gain: the point of
 * the design is precisely that one socket serves every channel built on it.
 *
 * `ReconnectingWsTransport` rather than a plain `WsTransport` because a shared gateway drops idle
 * connections mid-run, and a suite that died on the first drop would be testing the gateway.
 */
let sharedWsTransport: ReconnectingWsTransport | undefined;

const testTransport = (): RpcTransport | undefined => {
  if (process.env.TEST_TRANSPORT !== 'ws') return undefined;
  // `globalSetup` runs outside the test environment, in its own module registry, and it reaches
  // these factories through `InitDevnetHistory`. A transport built there is invisible to the
  // per-file teardown below, so its socket would stay open for the whole run — enough on its own
  // to stop Jest ever exiting. Preparing the chain is not what the transport is under test for,
  // so that phase stays on HTTP whatever category the run belongs to. The `jest` global is the
  // marker: it exists in the test environment and nowhere else.
  if (typeof jest === 'undefined') return undefined;
  if (!process.env.TEST_WS_URL) {
    throw new Error('TEST_TRANSPORT=ws requires TEST_WS_URL');
  }
  sharedWsTransport ??= new ReconnectingWsTransport({ nodeUrl: process.env.TEST_WS_URL });
  return sharedWsTransport;
};

/**
 * Releases the file's socket. An open one is a libuv handle that keeps Jest from exiting, and
 * nothing else can reach it — the providers that borrowed it are gone with the module registry.
 */
export const closeTestTransports = async (): Promise<void> => {
  const transport = sharedWsTransport;
  sharedWsTransport = undefined;
  if (!transport) return;
  if (!transport.isConnected()) {
    transport.close();
    return;
  }

  // Awaited, not fired and forgotten. `close()` only sends the closing frame; the TCP socket is
  // released when the `close` event comes back. Returning before that leaves Jest tearing down
  // the environment around a live handle, and the run never exits — measured against devnet, which
  // answers a client close by dropping the connection rather than completing the handshake.
  //
  // Bounded, because some gateways never answer at all while a subscription is bound: teardown
  // must not stall on a node that has stopped talking.
  await new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, 2000);
    const off = transport.on('close', () => {
      clearTimeout(timer);
      off();
      resolve();
    });
    transport.close();
  });
};

/**
 * Builds provider options with test environment configuration
 * @param setProviderOptions - Optional provider options to merge
 * @returns Provider options configured for test environment
 */
function buildTestProviderOptions(setProviderOptions?: RpcProviderOptions): RpcProviderOptions {
  const transport = testTransport();
  return {
    ...setProviderOptions,
    nodeUrl: process.env.TEST_RPC_URL,
    specVersion: process.env.RPC_SPEC_VERSION as SupportedRpcVersion,
    // Left out entirely off the WebSocket run, so the provider builds its usual HttpTransport.
    // Note what is *not* done here: no WebSocketProvider, no change of class. The same Provider
    // the HTTP run uses is handed a different transport — that is the claim under test.
    ...(transport ? { transport } : {}),
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
