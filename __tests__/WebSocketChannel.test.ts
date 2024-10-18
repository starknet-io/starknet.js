import { WebSocketChannel } from '../src';

describe('wallet account test', () => {
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
    webSocketChannel.onsNewHeads = (data: any) => {
      i += 1;
      console.log(data);
      if (i === 3) {
        webSocketChannel.unsubscribeNewHeads();
        webSocketChannel.disconnect();
      }
    };

    await webSocketChannel.waitForDisconnection();
    console.log('test id done');
  });
});
