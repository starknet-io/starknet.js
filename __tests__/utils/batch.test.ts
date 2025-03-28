import fetch from '../../src/utils/fetch';
import { BatchClient } from '../../src/utils/batch';
import { createBlockForDevnet, createTestProvider } from '../config/fixtures';
import { initializeMatcher } from '../config/schema';
import { ProviderInterface } from '../../src';

describe('Batch Client', () => {
  initializeMatcher(expect);
  let provider: ProviderInterface;
  let batchClient: BatchClient;

  beforeAll(async () => {
    provider = await createTestProvider(false);
    batchClient = new BatchClient({
      nodeUrl: provider.channel.nodeUrl,
      headers: provider.channel.headers,
      interval: 0,
      baseFetch: fetch,
    });
  });

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
