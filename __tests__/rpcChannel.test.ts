import { LibraryError, RPC07, RpcError } from '../src';
import { createBlockForDevnet, getTestProvider } from './config/fixtures';
import { initializeMatcher } from './config/schema';

describe('RPC 0.7.0', () => {
  const rpcProvider = getTestProvider(false);
  const channel = rpcProvider.channel as RPC07.RpcChannel;
  initializeMatcher(expect);

  beforeAll(async () => {
    await createBlockForDevnet();
  });

  test('getBlockWithReceipts', async () => {
    const response = await channel.getBlockWithReceipts('latest');
    expect(response).toMatchSchemaRef('BlockWithTxReceipts');
  });

  test('RPC error handling', async () => {
    const fetchSpy = jest.spyOn(channel, 'fetch');
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
      await channel.fetchEndpoint('starknet_chainId');
    } catch (error) {
      expect(error).toBeInstanceOf(LibraryError);
      expect(error).toBeInstanceOf(RpcError);
      expect((error as RpcError).isType('BLOCK_NOT_FOUND')).toBe(true);
    }
    fetchSpy.mockRestore();
  });
});
