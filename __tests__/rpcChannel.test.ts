import { LibraryError, RPC06, RPC07, RpcError } from '../src';
import { createBlockForDevnet, getTestProvider } from './config/fixtures';
import { initializeMatcher } from './config/schema';

describe('RpcChannel', () => {
  const { nodeUrl } = getTestProvider(false).channel;
  const channel07 = new RPC07.RpcChannel({ nodeUrl });
  initializeMatcher(expect);

  beforeAll(async () => {
    await createBlockForDevnet();
  });

  test('baseFetch override', async () => {
    const baseFetch = jest.fn();
    const fetchChannel06 = new RPC06.RpcChannel({ nodeUrl, baseFetch });
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
