import { WebSocketChannel } from '../src';

/* describe('ws local test', () => {
  const webSocketChannel = new WebSocketChannel();

  beforeAll(async () => {
    const x = await webSocketChannel.isConnected();
    const a = await webSocketChannel.waitForConnection();
    const b = await webSocketChannel.isConnected();

    console.log(a, x, b);
  });

  test('Test basic connection', async () => {
    webSocketChannel.send('stark_test', { testdata: 'test' });

    webSocketChannel.subscribeNewHeads();

    // unsubscribe and close connection after receiving 3 new messages
    let i = 0;
    webSocketChannel.onsNewHeads = async (data: any) => {
      i += 1;
      console.log(data);
      if (i === 3) {
        await webSocketChannel.unsubscribeNewHeads();
        webSocketChannel.disconnect();
      }
    };

    await webSocketChannel.waitForDisconnection();
    console.log('test id done');
  });
}); */

describe('ws pathfinder test', () => {
  const webSocketChannel = new WebSocketChannel({
    nodeUrl: 'wss://toni.spaceshard.io/rpc/v0_8',
  });

  beforeAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(false);
    await webSocketChannel.waitForConnection();
    expect(webSocketChannel.isConnected()).toBe(true);
  });

  test('Test basic connection', async () => {
    await webSocketChannel.subscribeNewHeads();

    // unsubscribe and close connection after receiving 3 new messages
    let i = 0;
    webSocketChannel.onsNewHeads = async (data: any) => {
      i += 1;
      expect(data).toBeDefined();
      if (i === 1) {
        const status = await webSocketChannel.unsubscribeNewHeads();
        expect(status).toBe(true);
        webSocketChannel.disconnect();
      }
    };

    await webSocketChannel.waitForDisconnection();
    expect(webSocketChannel.isConnected()).toBe(false);
  });
});
