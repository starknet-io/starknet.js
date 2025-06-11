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

  test('should throw an error when sending on a disconnected socket', async () => {
    // This test uses its own channel to disable auto-reconnect and isolate the error behavior
    const testChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL, autoReconnect: false });
    await testChannel.waitForConnection();

    testChannel.disconnect();
    await testChannel.waitForDisconnection();

    // With autoReconnect: false, this should immediately throw, not queue.
    await expect(testChannel.subscribeNewHeads()).rejects.toThrow(
      'WebSocketChannel.send() fail due to socket disconnected'
    );
  });

  test('should allow manual reconnection after a user-initiated disconnect', async () => {
    // This test uses the default channel from `beforeEach` which has autoReconnect: true
    webSocketChannel.disconnect();
    await webSocketChannel.waitForDisconnection();

    // It should not have auto-reconnected because the disconnect was user-initiated
    expect(webSocketChannel.isConnected()).toBe(false);

    // Now, manually reconnect
    webSocketChannel.reconnect();
    await webSocketChannel.waitForConnection();
    expect(webSocketChannel.isConnected()).toBe(true);

    // To prove the connection is working, make a simple RPC call.
    // This avoids the flakiness of creating and tearing down a real subscription.
    const chainId = await webSocketChannel.sendReceive('starknet_chainId');
    expect(chainId).toBe(StarknetChainId.SN_SEPOLIA);
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
    await webSocketChannel.waitForDisconnection();
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
    if (sub && !sub.isClosed) {
      await sub.unsubscribe();
    }
    if (webSocketChannel && webSocketChannel.isConnected()) {
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();
    }
  });

  test('should buffer events and process upon handler attachment', async () => {
    // This test is for client-side buffering, so we don't need a real connection.
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'ws://dummy-url', autoReconnect: false });
    // Mock unsubscribe to prevent network errors during cleanup in afterEach.
    jest.spyOn(webSocketChannel, 'unsubscribe').mockResolvedValue(true);

    // Manually create the subscription, bypassing the network.
    const subId = 'mock_sub_id_buffer';
    sub = new Subscription(webSocketChannel, 'starknet_subscribeNewHeads', {}, subId, 1000);
    (webSocketChannel as any).activeSubscriptions.set(subId, sub);

    const mockNewHeadsResult1 = { block_number: 1 };
    const mockNewHeadsResult2 = { block_number: 2 };

    // 1. Simulate receiving an event BEFORE a handler is attached.
    sub._handleEvent(mockNewHeadsResult1);

    const handler = jest.fn();

    // 2. Attach handler, which should immediately process the buffer.
    sub.on(handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(mockNewHeadsResult1);

    // 3. Simulate another event, which should be processed directly.
    sub._handleEvent(mockNewHeadsResult2);

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(mockNewHeadsResult2);
  });

  test('should drop oldest events when buffer limit is reached', async () => {
    // No real connection needed for this test.
    webSocketChannel = new WebSocketChannel({
      nodeUrl: 'ws://dummy-url',
      maxBufferSize: 2,
      autoReconnect: false,
    });
    jest.spyOn(webSocketChannel, 'unsubscribe').mockResolvedValue(true);

    // Manually create subscription with a buffer size of 2.
    const subId = 'mock_sub_id_drop';
    sub = new Subscription(webSocketChannel, 'starknet_subscribeNewHeads', {}, subId, 2);
    (webSocketChannel as any).activeSubscriptions.set(subId, sub);

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Simulate 3 events to overflow the buffer.
    sub._handleEvent({ block_number: 1 });
    sub._handleEvent({ block_number: 2 });
    sub._handleEvent({ block_number: 3 }); // This one should cause the oldest to be dropped.

    expect(warnSpy).toHaveBeenCalledTimes(1);

    const handler = jest.fn();
    sub.on(handler);

    // The handler should be called with the two most recent events.
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith({ block_number: 2 });
    expect(handler).toHaveBeenCalledWith({ block_number: 3 });
    expect(handler).not.toHaveBeenCalledWith({ block_number: 1 }); // The first event was dropped.

    warnSpy.mockRestore();
  });
});

describe('WebSocketChannel Auto-Reconnection', () => {
  let webSocketChannel: WebSocketChannel;

  afterEach(async () => {
    // Ensure the channel is always disconnected after each test to prevent open handles.
    if (webSocketChannel) {
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();
    }
  });

  test('should automatically reconnect on connection drop', (done) => {
    // Set a very short reconnection delay for faster tests
    webSocketChannel = new WebSocketChannel({
      nodeUrl: TEST_WS_URL,
      reconnectOptions: { retries: 3, delay: 100 },
    });

    let hasReconnected = false;
    webSocketChannel.on('open', () => {
      // This will be called once on initial connection, and a second time on reconnection.
      if (hasReconnected) {
        done(); // Test is successful if we get here
      } else {
        // This is the first connection, now we simulate the drop
        hasReconnected = true;
        webSocketChannel.websocket.close();
      }
    });
  });

  test('sendReceive should time out if no response is received', async () => {
    webSocketChannel = new WebSocketChannel({
      nodeUrl: TEST_WS_URL,
      requestTimeout: 100, // Set a short timeout for testing
    });
    await webSocketChannel.waitForConnection();

    // Spy on the 'send' method and prevent it from sending anything.
    // This guarantees that we will never get a response and the timeout will be triggered.
    const sendSpy = jest.spyOn(webSocketChannel.websocket, 'send').mockImplementation(() => {});

    // We expect this promise to reject with a timeout error.
    await expect(
      webSocketChannel.sendReceive('some_method_that_will_never_get_a_response')
    ).rejects.toThrow('timed out after 100ms');

    // Restore the original implementation for other tests
    sendSpy.mockRestore();
  });

  test('should queue sendReceive requests when reconnecting and process them after', (done) => {
    webSocketChannel = new WebSocketChannel({
      nodeUrl: TEST_WS_URL,
      reconnectOptions: { retries: 3, delay: 100 },
    });

    let hasReconnected = false;
    webSocketChannel.on('open', () => {
      if (hasReconnected) {
        // 4. Test is done when reconnection is complete
        done();
      } else {
        // 1. First connection, now simulate a drop
        hasReconnected = true;
        webSocketChannel.websocket.close();

        // 2. Immediately try to send a request. It should be queued.
        webSocketChannel.sendReceive('starknet_chainId').then((result) => {
          // 3. This assertion runs after reconnection and proves the queue was processed.
          expect(result).toBe(StarknetChainId.SN_SEPOLIA);
        });
      }
    });
  });
});
