import { GetBlockResponse, RpcProvider } from '../src';
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

  describe('divergence from Provider methods', () => {
    let exampleBlock: GetBlockResponse;

    beforeAll(async () => {
      exampleBlock = await rpcProvider.getBlock('latest');
    });

    test('getBlock(blockIdentifier=latest)', async () => {
      expect(exampleBlock).not.toBeNull();
      const { block_number, accepted_time } = exampleBlock;
      expect(typeof block_number).toEqual('number');
      return expect(typeof accepted_time).toEqual('number');
    });
  });
});
