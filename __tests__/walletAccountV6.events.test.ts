import { WalletAccountV6 } from '../src/wallet/accountV6';

/**
 * Faithful test double of `@starknet-io/get-starknet-wallet-standard-v6`'s
 * `StarknetInjectedWallet`. Same `#account` barrier as the v5 wrapper: legacy
 * wallet events are bridged to the wallet-standard `"change"` event only once
 * the wallet has been connected through the `standard:connect` feature.
 */
function createFakeWalletStandardV6(initialAddress: string, chain = 'starknet:SN_SEPOLIA') {
  let account: { address: string; chain: string } | null = null;
  const changeListeners: Array<(change: unknown) => void> = [];

  const emitChange = () => {
    const accounts = account ? [{ address: account.address, chains: [account.chain] }] : [];
    changeListeners.forEach((listener) => listener({ accounts }));
  };

  const request = jest.fn(async ({ type }: { type: string }) => {
    if (type === 'wallet_requestAccounts') return [initialAddress];
    if (type === 'wallet_requestChainId') return chain.slice(9);
    throw new Error(`unexpected wallet request: ${type}`);
  });

  const fake = {
    features: {
      'starknet:walletApi': { request },
      'standard:connect': {
        connect: jest.fn(async ({ silent }: { silent?: boolean } = {}) => {
          if (!account) {
            const accounts = await request({
              type: 'wallet_requestAccounts',
              params: { silent_mode: silent },
            } as { type: string });
            if (accounts.length === 0) return { accounts: [] };
            account = { address: accounts[0], chain };
          }
          return { accounts: [{ address: account.address, chains: [account.chain] }] };
        }),
      },
      'standard:events': {
        on: jest.fn((event: string, listener: (change: unknown) => void) => {
          if (event !== 'change') return () => {};
          changeListeners.push(listener);
          return () => {
            const index = changeListeners.indexOf(listener);
            if (index >= 0) changeListeners.splice(index, 1);
          };
        }),
      },
    },
    simulateAccountChange(newAddress: string) {
      if (!account) return; // the barrier
      account = { address: newAddress, chain: account.chain };
      emitChange();
    },
  };

  return fake;
}

describe('WalletAccountV6 wallet events', () => {
  test('onChange fires when the wallet account changes after connect', async () => {
    const fake = createFakeWalletStandardV6('0x111');

    const wallet = await WalletAccountV6.connect({ nodeUrl: 'http://127.0.0.1:5050' }, fake as any);

    const callback = jest.fn();
    wallet.onChange(callback);

    fake.simulateAccountChange('0x222');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({
      accounts: [{ address: '0x222', chains: ['starknet:SN_SEPOLIA'] }],
    });
    expect(wallet.address).toBe('0x222');
  });
});
