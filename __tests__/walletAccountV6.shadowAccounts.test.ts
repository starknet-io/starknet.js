import { WalletAccountV6 } from '../src/wallet/accountV6';
import type { STRK20_ACTION } from '../src/wallet/types/strk20.type';

/**
 * Test double of `@starknet-io/get-starknet-wallet-standard-v6`'s `StarknetInjectedWallet`,
 * recording every RPC message it receives so that the STRK20 shadow account payloads built
 * by `WalletAccountV6` can be asserted. Only the features needed to connect are implemented.
 */
function createRecordingWallet(results: Record<string, unknown> = {}) {
  const request = jest.fn(async ({ type }: { type: string }) => {
    if (type === 'wallet_requestAccounts') return ['0x111'];
    if (type === 'wallet_requestChainId') return 'SN_SEPOLIA';
    if (type in results) return results[type];
    throw new Error(`unexpected wallet request: ${type}`);
  });

  return {
    request,
    features: {
      'starknet:walletApi': { request },
      'standard:connect': {
        connect: jest.fn(async () => ({
          accounts: [{ address: '0x111', chains: ['starknet:SN_SEPOLIA'] }],
        })),
      },
      'standard:disconnect': { disconnect: jest.fn() },
      'standard:events': { on: jest.fn(() => () => {}) },
    },
  };
}

const connect = async (results: Record<string, unknown> = {}) => {
  const fake = createRecordingWallet(results);
  const wallet = await WalletAccountV6.connect({ nodeUrl: 'http://127.0.0.1:5050' }, fake as any);
  return { fake, wallet };
};

/** The RPC message sent for the given method, as received by the wallet. */
const messageOf = (fake: { request: jest.Mock }, type: string) =>
  fake.request.mock.calls.map(([message]) => message).find((message) => message.type === type);

describe('WalletAccountV6 STRK20 shadow accounts', () => {
  test('strk20ShadowAccountCommitment forwards dapp_name and nonce, and returns the commitment', async () => {
    const { fake, wallet } = await connect({ wallet_strk20ShadowAccountCommitment: '0x5f2e' });

    const commitment = await wallet.strk20ShadowAccountCommitment('myDapp', '0x2');

    expect(messageOf(fake, 'wallet_strk20ShadowAccountCommitment')).toEqual({
      type: 'wallet_strk20ShadowAccountCommitment',
      params: { dapp_name: 'myDapp', nonce: '0x2' },
    });
    expect(commitment).toBe('0x5f2e');
  });

  test('strk20ShadowAccountCommitment keeps the nonce undefined when omitted', async () => {
    // A defaulted nonce would silently return the full commitment of shadow account 0
    // instead of the partial (nonce independent) commitment of the DAPP.
    const { fake, wallet } = await connect({ wallet_strk20ShadowAccountCommitment: '0xpartial' });

    await wallet.strk20ShadowAccountCommitment('myDapp');

    const message = messageOf(fake, 'wallet_strk20ShadowAccountCommitment');
    expect(message.params.nonce).toBeUndefined();
    expect(message.params.dapp_name).toBe('myDapp');
  });

  test('strk20InvokeTransaction converts the shadow account calls to the wallet-api format', async () => {
    const { fake, wallet } = await connect({
      wallet_strk20InvokeTransaction: { transaction_hash: '0x6f7d' },
    });

    const actions: STRK20_ACTION[] = [
      { type: 'transfer', token: '0x4718', amount: 'OPEN', recipient: '0x111' },
      {
        type: 'shadow_account_invoke',
        dapp_name: 'myDapp',
        nonce: '0x1',
        // Starknet.js call, camelCase, with uncompiled calldata
        calls: [{ contractAddress: '0x123', entrypoint: 'stake', calldata: [1000, 0] }],
        collect_policy: { type: 'exact', amount: '0x64' },
      },
    ];

    const result = await wallet.strk20InvokeTransaction(actions);

    expect(messageOf(fake, 'wallet_strk20InvokeTransaction')).toEqual({
      type: 'wallet_strk20InvokeTransaction',
      params: {
        actions: [
          // non-invoke actions are passed through untouched
          { type: 'transfer', token: '0x4718', amount: 'OPEN', recipient: '0x111' },
          {
            type: 'shadow_account_invoke',
            dapp_name: 'myDapp',
            nonce: '0x1',
            // converted: snake_case fields, calldata compiled to hex felts
            calls: [
              { contract_address: '0x123', entry_point: 'stake', calldata: ['0x3e8', '0x0'] },
            ],
            collect_policy: { type: 'exact', amount: '0x64' },
          },
        ],
      },
    });
    expect(result).toEqual({ transaction_hash: '0x6f7d' });
  });

  test('strk20PrepareInvoke returns a Starknet.js call, ready to be submitted', async () => {
    const proof = { data: 'AAA=', output: ['0x1'], proof_facts: ['0x2'] };
    const { wallet } = await connect({
      wallet_strk20PrepareInvoke: {
        // the wallet answers in the wallet-api format
        call: { contract_address: '0xabc', entry_point: 'apply_actions', calldata: ['0x1'] },
        proof,
      },
    });

    const prepared = await wallet.strk20PrepareInvoke([
      { type: 'transfer', token: '0x4718', amount: '0x64', recipient: '0x222' },
    ]);

    expect(prepared).toEqual({
      call: { contractAddress: '0xabc', entrypoint: 'apply_actions', calldata: ['0x1'] },
      proof,
    });
  });
});

describe('WalletAccountV6 STRK20 shadow accounts types', () => {
  // Type level guards, verified by `npm run ts:check`.
  test('the action type rejects malformed shadow account actions', () => {
    const missingNonce = {
      type: 'shadow_account_invoke',
      dapp_name: 'myDapp',
      calls: [],
      collect_policy: { type: 'all' },
      // @ts-expect-error nonce is required in the action
    } satisfies STRK20_ACTION;

    const unknownPolicy = {
      type: 'shadow_account_invoke',
      dapp_name: 'myDapp',
      nonce: '0x0',
      calls: [],
      // @ts-expect-error 'half' is not a valid collect policy
      collect_policy: { type: 'half' },
    } satisfies STRK20_ACTION;

    const walletApiCall = {
      type: 'shadow_account_invoke',
      dapp_name: 'myDapp',
      nonce: '0x0',
      // @ts-expect-error a DAPP passes Starknet.js calls, not wallet-api ones
      calls: [{ contract_address: '0x123', entry_point: 'stake', calldata: [] }],
      collect_policy: { type: 'all' },
    } satisfies STRK20_ACTION;

    expect([missingNonce, unknownPolicy, walletApiCall]).toHaveLength(3);
  });
});
