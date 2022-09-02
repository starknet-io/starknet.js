import { RpcProvider } from '../src';
import { describeIfRpc, getTestProvider } from './fixtures';

describeIfRpc('RPCProvider', () => {
  let rpcProvider: RpcProvider;

  beforeAll(async () => {
    rpcProvider = getTestProvider() as RpcProvider;
  });

  describe('RPC methods', async () => {
    const latestBlock = await rpcProvider.getBlock('latest');

    test('getChainId', async () => {
      const chainId = await rpcProvider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });

    test('getBlockWithTxHashes', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxHashes(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });

    test('getBlockWithTxs', async () => {
      const blockResponse = await rpcProvider.getBlockWithTxs(latestBlock.block_number);
      expect(blockResponse).toHaveProperty('transactions');
    });
  });
});
