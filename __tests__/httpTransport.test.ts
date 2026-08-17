import { HttpTransport } from '../src/channel/transport';
import type { JRPC } from '../src/types/api';

describe('UNIT TEST: HttpTransport', () => {
  const NODE_URL = 'http://node.test/rpc';

  /** A `baseFetch` stand-in that answers every POST with `payload`. */
  const respondWith = (payload: unknown) =>
    jest.fn(async () => ({ json: async () => payload })) as unknown as jest.Mock;

  const transportFor = (baseFetch: jest.Mock, headers: object = {}) =>
    new HttpTransport({ nodeUrl: NODE_URL, headers, baseFetch: baseFetch as any });

  test('posts a single envelope to the node URL and resolves with the parsed reply', async () => {
    const baseFetch = respondWith({ jsonrpc: '2.0', id: 1, result: '0x534e5f5345504f4c4941' });
    const transport = transportFor(baseFetch, { 'X-Test': 'yes' });

    const response = await transport.request({
      id: 1,
      jsonrpc: '2.0',
      method: 'starknet_chainId',
    });

    expect(baseFetch).toHaveBeenCalledTimes(1);
    const [url, init] = baseFetch.mock.calls[0];
    expect(url).toBe(NODE_URL);
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({ 'X-Test': 'yes' });
    expect(JSON.parse(init.body)).toEqual({
      id: 1,
      jsonrpc: '2.0',
      method: 'starknet_chainId',
    });
    expect(response).toEqual({ jsonrpc: '2.0', id: 1, result: '0x534e5f5345504f4c4941' });
  });

  test('resolves an error envelope instead of rejecting', async () => {
    // A protocol error is a completed round trip as far as the transport is
    // concerned. Turning it into a typed RpcError is the channel's job, not the transport's.
    const errorEnvelope = {
      jsonrpc: '2.0',
      id: 1,
      error: { code: 24, message: 'Block not found' },
    };
    const transport = transportFor(respondWith(errorEnvelope));

    await expect(
      transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_getBlockWithTxHashes' })
    ).resolves.toEqual(errorEnvelope);
  });

  test('rejects when the node cannot be reached', async () => {
    const baseFetch = jest.fn(async () => {
      throw new Error('ECONNREFUSED');
    });
    const transport = transportFor(baseFetch as unknown as jest.Mock);

    await expect(
      transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' })
    ).rejects.toThrow('ECONNREFUSED');
  });

  test('posts an array for a batch and returns the replies with their ids untouched', async () => {
    // BatchClient correlates on the id, so the transport must not rewrite it —
    // and must not assume the node answers in request order.
    const replies = [
      { jsonrpc: '2.0', id: 'batched_2', result: '0xb' },
      { jsonrpc: '2.0', id: 'batched_1', result: '0xa' },
    ];
    const baseFetch = respondWith(replies);
    const transport = transportFor(baseFetch);

    const response = await transport.request([
      { id: 'batched_1', jsonrpc: '2.0', method: 'starknet_blockNumber' },
      { id: 'batched_2', jsonrpc: '2.0', method: 'starknet_chainId' },
    ]);

    expect(JSON.parse(baseFetch.mock.calls[0][1].body)).toHaveLength(2);
    expect(response.map((reply: JRPC.ResponseBody) => reply.id)).toEqual([
      'batched_2',
      'batched_1',
    ]);
  });

  test('omits an absent params field rather than sending undefined', async () => {
    const baseFetch = respondWith({ jsonrpc: '2.0', id: 1, result: 0 });
    await transportFor(baseFetch).request({
      id: 1,
      jsonrpc: '2.0',
      method: 'starknet_blockNumber',
    });

    expect(JSON.parse(baseFetch.mock.calls[0][1].body)).not.toHaveProperty('params');
  });
});
