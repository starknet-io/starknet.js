import { LibraryError, RPC08, RPC07, RpcError } from '../src';
import { createBlockForDevnet, createTestProvider } from './config/fixtures';
import { initializeMatcher } from './config/schema';

describe('RpcChannel', () => {
  let nodeUrl: string;
  let channel07: RPC07.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    nodeUrl = (await createTestProvider(false)).channel.nodeUrl;
    channel07 = new RPC07.RpcChannel({ nodeUrl });

    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel06 = new RPC08.RpcChannel({ nodeUrl, baseFetch });
    const fetchChannel07 = new RPC07.RpcChannel({ nodeUrl, baseFetch });
    (fetchChannel06.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
    baseFetch.mockClear();
    (fetchChannel07.fetch as any)();
    expect(baseFetch).toHaveBeenCalledTimes(1);
  });

  test('RPC error handling', async () => {
    const fetchSpy = jest.spyOn(channel07, 'fetch');
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
      await channel07.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    fetchSpy.mockRestore();
  });

  describe('RPC 0.7.0', () => {
    test('getBlockWithReceipts', async () => {
      const response = await channel07.getBlockWithReceipts('latest');
      expect(response).toMatchSchemaRef('BlockWithTxReceipts');
    });
  });
});
