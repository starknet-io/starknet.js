import { WalletAccountV5 } from '../src/wallet/accountV5';

/**
 * Faithful test double of `@starknet-io/get-starknet-wallet-standard`'s
 * `StarknetInjectedWallet`.
 *
 * Key reproduced behavior: the wrapper bridges the wallet's legacy
 * `accountsChanged` / `networkChanged` events to the wallet-standard `"change"`
 * event ONLY once it has been connected through the `standard:connect` feature
 * (its internal `#account` is populated). While `#account` is `null`, the
 * legacy-event handlers return early, so no `"change"` is ever emitted.
 */
function createFakeWalletStandard(initialAddress: string, chain = 'starknet:SN_SEPOLIA') {
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
          // Mirrors the wrapper's #connect: populate #account on first call.
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
    /**
     * Test helper: simulate the user switching account in the wallet UI.
     * Mirrors the wrapper's #onAccountsChanged barrier — a no-op while the
     * wallet has not been connected via standard:connect.
     */
    simulateAccountChange(newAddress: string) {
      if (!account) return; // the barrier
      account = { address: newAddress, chain: account.chain };
      emitChange();
    },
  };

  return fake;
}

describe('WalletAccountV5 wallet events', () => {
  test('onChange fires when the wallet account changes after connect', async () => {
    const fake = createFakeWalletStandard('0x111');

    const wallet = await WalletAccountV5.connect({ nodeUrl: 'http://127.0.0.1:5050' }, fake as any);

    const callback = jest.fn();
    wallet.onChange(callback);

    fake.simulateAccountChange('0x222');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({
      accounts: [{ address: '0x222', chains: ['starknet:SN_SEPOLIA'] }],
    });
    expect(wallet.address).toBe('0x222');
  });

  test('unsubscribeChange detaches the callback registered through onChange', async () => {
    const fake = createFakeWalletStandard('0x111');

    const wallet = await WalletAccountV5.connect({ nodeUrl: 'http://127.0.0.1:5050' }, fake as any);

    const callback = jest.fn();
    wallet.onChange(callback);
    wallet.unsubscribeChange();

    fake.simulateAccountChange('0x222');

    expect(callback).not.toHaveBeenCalled();
  });
});
