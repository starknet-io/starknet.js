import { RPC07 } from '../src';
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
});
