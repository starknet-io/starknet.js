import { WebSocket } from 'isows';

import { WebSocketChannel } from '../src';
import { StarknetChainId } from '../src/constants';

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

describe('websocket specific endpoints - pathfinder test', () => {
  const webSocketChannel = new WebSocketChannel({
    nodeUrl: 'wss://toni.spaceshard.io/rpc/v0_8',
  });

  beforeAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(false);
    await webSocketChannel.waitForConnection();
    expect(webSocketChannel.isConnected()).toBe(true);
  });

  test('Test subscribeNewHeads', async () => {
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

describe('websocket regular endpoints - pathfinder test', () => {
  const webSocketChannel = new WebSocketChannel({
    nodeUrl: 'wss://toni.spaceshard.io/rpc/v0_8',
  });

  beforeAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(false);
    const status = await webSocketChannel.waitForConnection();
    expect(status).toBe(WebSocket.OPEN);
  });

  test('regular rpc endpoint', async () => {
    const response = await webSocketChannel.sendReceive('starknet_chainId');
    expect(response).toBe(StarknetChainId.SN_SEPOLIA);
  });

  afterAll(async () => {
    webSocketChannel.disconnect();
    const status = await webSocketChannel.waitForDisconnection();
    expect(status).toBe(WebSocket.CLOSED);
  });
});
