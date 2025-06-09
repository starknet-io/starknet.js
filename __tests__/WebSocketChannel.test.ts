/* eslint-disable no-underscore-dangle */
import { Provider, Subscription, WebSocketChannel } from '../src';
import { StarknetChainId } from '../src/global/constants';
import { getTestAccount, getTestProvider, STRKtokenAddress, TEST_WS_URL } from './config/fixtures';

describe('websocket specific endpoints - pathfinder test', () => {
  // account provider
  const provider = new Provider(getTestProvider());
  const account = getTestAccount(provider);

  // websocket
  let webSocketChannel: WebSocketChannel;

  beforeEach(async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL });
    await webSocketChannel.waitForConnection();
  });

  afterEach(async () => {
    if (webSocketChannel.isConnected()) {
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();
    }
  });

  test('Test WS Error and edge cases', async () => {
    webSocketChannel.disconnect();
    await webSocketChannel.waitForDisconnection();

    // should fail as disconnected
    await expect(webSocketChannel.subscribeNewHeads()).rejects.toThrow();

    // should reconnect
    webSocketChannel.reconnect();
    await webSocketChannel.waitForConnection();

    // should succeed after reconnection, returning a Subscription object
    const sub = await webSocketChannel.subscribeNewHeads();
    expect(sub).toBeInstanceOf(Subscription);
    await sub.unsubscribe();
  });

  test('Test subscribeNewHeads', async () => {
    const sub = await webSocketChannel.subscribeNewHeads();
    expect(sub).toBeInstanceOf(Subscription);

    let i = 0;
    sub.on(async (result) => {
      i += 1;
      expect(result).toBeDefined();
      if (i === 2) {
        const status = await sub.unsubscribe();
        expect(status).toBe(true);
      }
    });

    await webSocketChannel.waitForUnsubscription(sub.id);
  });

  test('Test subscribeEvents', async () => {
    const sub = await webSocketChannel.subscribeEvents();
    expect(sub).toBeInstanceOf(Subscription);

    let i = 0;
    sub.on(async (result) => {
      i += 1;
      expect(result).toBeDefined();
      if (i === 5) {
        const status = await sub.unsubscribe();
        expect(status).toBe(true);
      }
    });

    await webSocketChannel.waitForUnsubscription(sub.id);
  });

  test('Test subscribePendingTransaction', async () => {
    const sub = await webSocketChannel.subscribePendingTransaction(true);
    expect(sub).toBeInstanceOf(Subscription);

    let i = 0;
    sub.on(async (result) => {
      i += 1;
      expect(result).toBeDefined();
      if (i === 5) {
        const status = await sub.unsubscribe();
        expect(status).toBe(true);
      }
    });
    await webSocketChannel.waitForUnsubscription(sub.id);
  });

  test('Test subscribeTransactionStatus', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: [account.address, '10', '0'],
    });

    const sub = await webSocketChannel.subscribeTransactionStatus(transaction_hash);
    expect(sub).toBeInstanceOf(Subscription);

    let i = 0;
    sub.on(async (result) => {
      i += 1;
      expect(result).toBeDefined();
      if (i >= 2) {
        const status = await sub.unsubscribe();
        expect(status).toBe(true);
      }
    });
    await webSocketChannel.waitForUnsubscription(sub.id);
  });
});

describe('websocket regular endpoints - pathfinder test', () => {
  let webSocketChannel: WebSocketChannel;

  beforeAll(async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL });
    expect(webSocketChannel.isConnected()).toBe(false);
    const status = await webSocketChannel.waitForConnection();
    expect(status).toBe(WebSocket.OPEN);
  });

  afterAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(true);
    webSocketChannel.disconnect();
  });

  test('regular rpc endpoint', async () => {
    const response = await webSocketChannel.sendReceive('starknet_chainId');
    expect(response).toBe(StarknetChainId.SN_SEPOLIA);
  });
});

describe('WebSocketChannel Buffering with Subscription object', () => {
  let webSocketChannel: WebSocketChannel;
  let sub: Subscription;

  afterEach(async () => {
    if (sub && !(sub as any).isUnsubscribed) {
      await sub.unsubscribe();
    }
    if (webSocketChannel && webSocketChannel.isConnected()) {
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();
    }
  });

  test('should buffer events and process upon handler attachment', (done) => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL });
    webSocketChannel.waitForConnection().then(async () => {
      // Create a subscription but don't attach a handler yet
      sub = await webSocketChannel.subscribeNewHeads();

      const mockNewHeadsResult1 = { block_number: 1 };
      const mockNewHeadsResult2 = { block_number: 2 };

      // Simulate receiving events BEFORE handler is attached
      sub._handleEvent(mockNewHeadsResult1);

      const handler = jest.fn((result) => {
        if (handler.mock.calls.length === 1) {
          expect(result).toEqual(mockNewHeadsResult1); // From buffer
        } else if (handler.mock.calls.length === 2) {
          expect(result).toEqual(mockNewHeadsResult2); // Direct
          sub.unsubscribe().then(() => done());
        }
      });

      // Attach handler, which should process the buffer
      sub.on(handler);

      // Handler should have been called once with the buffered event
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(mockNewHeadsResult1);

      // Simulate another event, which should be processed directly
      sub._handleEvent(mockNewHeadsResult2);

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenCalledWith(mockNewHeadsResult2);
    });
  });

  test('should drop oldest events when buffer limit is reached', async () => {
    // Set a small buffer size for testing
    webSocketChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL, maxBufferSize: 2 });
    await webSocketChannel.waitForConnection();
    sub = await webSocketChannel.subscribeNewHeads();

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Simulate 3 events - one more than the buffer size
    sub._handleEvent({ block_number: 1 });
    sub._handleEvent({ block_number: 2 });
    sub._handleEvent({ block_number: 3 });

    // The warning should have been called once, for the third event overflowing the buffer
    expect(warnSpy).toHaveBeenCalledTimes(1);

    const handler = jest.fn();
    sub.on(handler);

    // The handler should be called with the two most recent events (2 and 3)
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith({ block_number: 2 });
    expect(handler).toHaveBeenCalledWith({ block_number: 3 });
    // It should NOT have been called with the first, dropped event
    expect(handler).not.toHaveBeenCalledWith({ block_number: 1 });

    warnSpy.mockRestore();
  });
});
