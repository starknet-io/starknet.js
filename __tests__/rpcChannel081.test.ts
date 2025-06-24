import { LibraryError, RPC08, RpcError } from '../src';
import { createBlockForDevnet, createTestProvider, describeIfRpc081 } from './config/fixtures';
import { initializeMatcher } from './config/schema';

describeIfRpc081('RpcChannel', () => {
  let nodeUrl: string;
  let channel08: RPC08.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    nodeUrl = (await createTestProvider(false)).channel.nodeUrl;
    channel08 = new RPC08.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel08 = new RPC08.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel08.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
  });

  test('RPC error handling', async () => {
    const fetchSpy = jest.spyOn(channel08, 'fetch');
    fetchSpy.mockResolvedValue({
      json: async () => ({
        jsonrpc: '2.0',
        error: {
          code: 24,
          message: 'Block not found',
        },
        id: 0,
      }),
    } as any);

    expect.assertions(3);
    try {
      // @ts-expect-error
      await channel08.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    fetchSpy.mockRestore();
  });

  describe('RPC 0.8.1', () => {
    test('getBlockWithReceipts', async () => {
      const response = await channel08.getBlockWithReceipts('latest');
      expect(response).toMatchSchemaRef('BlockWithTxReceipts');
    });
  });
});
