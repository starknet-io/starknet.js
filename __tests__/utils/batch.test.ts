import fetch from '../../src/utils/connect/fetch';
import { BatchClient } from '../../src/utils/batch';
import {
  createBlockForDevnet,
  describeIfRpc081,
  describeIfRpc09,
  getTestProvider,
} from '../config/fixtures';
import { initializeMatcher } from '../config/schema';
import { RPC } from '../../src/types';
import { createTestProvider } from '../config/fixturesInit';

describe('BatchClient', () => {
  initializeMatcher(expect);
  const provider = getTestProvider();

  let batchClient: BatchClient<RPC.Methods>;

  beforeEach(() => {
    batchClient = new BatchClient<RPC.Methods>({
      nodeUrl: provider.channel.nodeUrl,
      headers: provider.channel.headers,
      interval: 0,
      baseFetch: fetch,
      rpcMethods: {} as RPC.Methods, // Type information only, not used at runtime
    });
  });

  describeIfRpc081('should batch two requests RPC0.8.1', () => {
    test('should batch two requests', async () => {
      await createBlockForDevnet();

      const fetchSpy = jest.spyOn(batchClient as any, 'sendBatch');

      const [blockNumber, blockWithReceipts] = await Promise.all([
        batchClient.fetch('starknet_blockNumber'),
        batchClient.fetch('starknet_getBlockWithReceipts', { block_id: 'latest' }),
      ]);

      expect(typeof blockNumber.result).toBe('number');
      expect(blockWithReceipts.result).toMatchSchemaRef('BlockWithTxReceipts08');

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });
  });

  describeIfRpc09('should batch two requests RPC0.9.0', () => {
    test('should batch two requests', async () => {
      await createBlockForDevnet();

      const fetchSpy = jest.spyOn(batchClient as any, 'sendBatch');

      const [blockNumber, blockWithReceipts] = await Promise.all([
        batchClient.fetch('starknet_blockNumber'),
        batchClient.fetch('starknet_getBlockWithReceipts', { block_id: 'latest' }),
      ]);

      expect(typeof blockNumber.result).toBe('number');
      expect(blockWithReceipts.result).toMatchSchemaRef('BlockWithTxReceipts');

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      fetchSpy.mockRestore();
    });
  });

  test('batch request using Provider', async () => {
    const myBatchProvider = await createTestProvider(false, { batch: 0 });

    const sendBatchSpy = jest.spyOn((myBatchProvider.channel as any).batchClient, 'sendBatch');

    await Promise.all([
      myBatchProvider.getBlock(),
      myBatchProvider.getBlockLatestAccepted(),
      myBatchProvider.getBlockTransactionCount('latest'),
    ]);

    expect(sendBatchSpy).toHaveBeenCalledTimes(1);
  });
});
