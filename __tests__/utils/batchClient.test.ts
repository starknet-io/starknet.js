import { BatchClient } from '../../src/utils/batch';
import { RPC } from '../../src/types';
import { RpcChannel } from '../../src/channel';
import { RpcError } from '../../src/utils/errors';

const createBatchClient = (request: jest.Mock) =>
  new BatchClient<RPC.Methods>({
    nodeUrl: 'http://127.0.0.1:0',
    headers: {},
    interval: 0,
    baseFetch: jest.fn() as any,
    transport: { request } as any,
    rpcMethods: {} as RPC.Methods,
  });

describe('BatchClient without a node', () => {
  test('hands a batch-level error reply to every caller', async () => {
    // JSON-RPC 2.0: a batch the server rejects as a whole gets a single response object.
    const reply = { jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Batch too large' } };
    const client = createBatchClient(jest.fn(async () => reply));

    const [first, second] = await Promise.all([
      client.fetch('starknet_blockNumber'),
      client.fetch('starknet_chainId'),
    ]);

    expect(first.error).toEqual(reply.error);
    expect(second.error).toEqual(reply.error);
  });

  test('the channel turns a batch-level error reply into an RpcError', async () => {
    const channel = new RpcChannel({ nodeUrl: 'http://127.0.0.1:0', batch: 0 });
    jest.spyOn((channel as any).transport, 'request').mockResolvedValue({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32005, message: 'Rate limit exceeded' },
    });

    const failure = channel.getBlockNumber();
    await expect(failure).rejects.toThrow(RpcError);
    await expect(failure).rejects.toThrow('Rate limit exceeded');
  });

  test('forgets the batch once it has failed', async () => {
    const client = createBatchClient(jest.fn().mockRejectedValue(new Error('network down')));

    const results = await Promise.allSettled([
      client.fetch('starknet_blockNumber'),
      client.fetch('starknet_chainId'),
    ]);

    expect(results.map((r) => r.status)).toEqual(['rejected', 'rejected']);
    expect((client as any).batchPromises).toEqual({});
  });
});
