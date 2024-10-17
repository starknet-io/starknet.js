// TODO Mock: get-starknet UI connect/disconnect wallet
// TODO Create Mock Wallet;

import { WebSocketChannel } from '../src';

describe('wallet account test', () => {
  const webSocketChannel = new WebSocketChannel();

  beforeAll(async () => {
    await webSocketChannel.isConnected();
  });

  test('Test basic connection', async () => {
    return true;
  });
});
