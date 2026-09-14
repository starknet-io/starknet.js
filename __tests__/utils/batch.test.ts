import fetch from '../../src/utils/connect/fetch';
import { BatchClient } from '../../src/utils/batch';
import {
  createBlockForDevnet,
  createTestProvider,
  getTestProvider,
  initializeMatcher,
} from '../config';
import { RPC } from '../../src/types';

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

  describe('should batch two requests RPC', () => {
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
    const myBatchProvider = await createTestProvider({ batch: 0 });

    const sendBatchSpy = jest.spyOn((myBatchProvider.channel as any).batchClient, 'sendBatch');

    await Promise.all([
      myBatchProvider.getBlock(),
      myBatchProvider.getBlockLatestAccepted(),
      myBatchProvider.getBlockTransactionCount('latest'),
    ]);

    expect(sendBatchSpy).toHaveBeenCalledTimes(1);
  });

  test('sends the batch through an injected transport instead of baseFetch', async () => {
    const transportRequest = jest.fn(async (body: any) =>
      body.map((entry: any) => ({ jsonrpc: '2.0', id: entry.id, result: '0x1' }))
    );
    const baseFetch = jest.fn();

    const injected = new BatchClient<RPC.Methods>({
      nodeUrl: provider.channel.nodeUrl,
      headers: provider.channel.headers,
      interval: 0,
      baseFetch: baseFetch as any,
      transport: { request: transportRequest } as any,
      rpcMethods: {} as RPC.Methods,
    });

    const [first, second] = await Promise.all([
      injected.fetch('starknet_blockNumber'),
      injected.fetch('starknet_chainId'),
    ]);

    expect(baseFetch).not.toHaveBeenCalled();
    expect(transportRequest).toHaveBeenCalledTimes(1);
    expect(transportRequest.mock.calls[0][0]).toHaveLength(2);
    // Each caller gets its own reply back, matched on the id it was issued.
    expect(first.result).toBe('0x1');
    expect(second.result).toBe('0x1');
  });
});
