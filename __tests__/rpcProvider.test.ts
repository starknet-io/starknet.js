import { RpcProvider } from '../src';
import { describeIfRpc, getTestProvider } from './fixtures';

describeIfRpc('RPCProvider', () => {
  let rpcProvider: RpcProvider;

  beforeAll(async () => {
    rpcProvider = getTestProvider() as RpcProvider;
  });

  describe('RPC methods', () => {
    test('getChainId', async () => {
      const chainId = await rpcProvider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });
  });
});
