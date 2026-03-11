/* eslint-disable-next-line import/no-extraneous-dependencies */
import { Account, RpcProvider, BlockTag, Call, cairo } from '../../../index';
import { getTestAccount, getTestProvider, STRKtokenAddress } from '../../../../__tests__/config';

describe('fastExecute Plugin', () => {
  let rpcProvider: RpcProvider;

  beforeEach(async () => {
    rpcProvider = getTestProvider(false);
  });

  describe('fastWaitForTransaction()', () => {
    test('timeout due to low tip', async () => {
      const spyProvider = jest
        .spyOn(rpcProvider.channel, 'getTransactionStatus')
        .mockImplementation(async () => {
          return { finality_status: 'RECEIVED' };
        });
      const resp = await (rpcProvider as any).fastWaitForTransaction('0x123', '0x456', 10, {
        retries: 2,
        retryInterval: 100,
      });
      spyProvider.mockRestore();
      expect(resp).toBe(false);
    });

    test('timeout due to missing new nonce', async () => {
      const spyProvider = jest
        .spyOn(rpcProvider.channel, 'getTransactionStatus')
        .mockImplementation(async () => {
          return { finality_status: 'PRE_CONFIRMED', execution_status: 'SUCCEEDED' };
        });
      const spyChannel = jest
        .spyOn(rpcProvider.channel, 'getNonceForAddress')
        .mockImplementation(async () => {
          return '0x8';
        });
      const resp = await (rpcProvider as any).fastWaitForTransaction('0x123', '0x456', 8, {
        retries: 2,
        retryInterval: 100,
      });
      spyProvider.mockRestore();
      spyChannel.mockRestore();
      expect(resp).toBe(false);
    });

    test('transaction reverted', async () => {
      const spyProvider = jest
        .spyOn(rpcProvider.channel, 'getTransactionStatus')
        .mockImplementation(async () => {
          return { finality_status: 'PRE_CONFIRMED', execution_status: 'REVERTED' };
        });
      await expect(
        (rpcProvider as any).fastWaitForTransaction('0x123', '0x456', 10, {
          retries: 2,
          retryInterval: 100,
        })
      ).rejects.toThrow('REVERTED: PRE_CONFIRMED');
      spyProvider.mockRestore();
    });

    test('Normal behavior', async () => {
      const spyProvider = jest
        .spyOn(rpcProvider.channel, 'getTransactionStatus')
        .mockImplementation(async () => {
          return { finality_status: 'ACCEPTED_ON_L2', execution_status: 'SUCCEEDED' };
        });
      const spyChannel = jest
        .spyOn(rpcProvider.channel, 'getNonceForAddress')
        .mockImplementation(async () => {
          return '0x9';
        });
      const resp = await (rpcProvider as any).fastWaitForTransaction('0x123', '0x456', 8, {
        retries: 2,
        retryInterval: 100,
      });
      spyProvider.mockRestore();
      spyChannel.mockRestore();
      expect(resp).toBe(true);
    });
  });

  describe('fastExecute()', () => {
    test('Only provider with PRE_CONFIRMED blockIdentifier', async () => {
      const providerLatest = new RpcProvider({
        nodeUrl: 'dummy',
        blockIdentifier: BlockTag.LATEST,
        specVersion: '0.9.0',
      });
      const testAccount = new Account({
        provider: providerLatest,
        address: '0x123',
        signer: '0x456',
      });
      const myCall: Call = { contractAddress: '0x036', entrypoint: 'withdraw', calldata: [] };
      await expect((testAccount as any).fastExecute(myCall)).rejects.toThrow(
        'Provider needs to be initialized with `pre_confirmed` blockIdentifier option.'
      );
    });

    test('fast consecutive txs', async () => {
      const testProvider = getTestProvider(false, {
        blockIdentifier: BlockTag.PRE_CONFIRMED,
      });
      const testAccount = getTestAccount(testProvider);
      const myCall: Call = {
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [testAccount.address, cairo.uint256(100)],
      };
      const tx1 = await (testAccount as any).fastExecute(myCall);
      expect(tx1.isReady).toBe(true);
      expect(tx1.txResult.transaction_hash).toMatch(/^0x/);
      const tx2 = await (testAccount as any).fastExecute(myCall);
      // wait for the transaction so the next tests have the right nonce
      const provider = getTestProvider(false);
      await provider.waitForTransaction(tx2.txResult.transaction_hash);
      expect(tx2.isReady).toBe(true);
      expect(tx2.txResult.transaction_hash).toMatch(/^0x/);
    });
  });
});
