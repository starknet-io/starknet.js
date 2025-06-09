import { Provider, WSSubscriptions, WebSocketChannel } from '../src';
import { StarknetChainId } from '../src/global/constants';
import { getTestAccount, getTestProvider, STRKtokenAddress, TEST_WS_URL } from './config/fixtures';

const nodeUrl = 'wss://sepolia-pathfinder-rpc.spaceshard.io/rpc/v0_8';

describe('websocket specific endpoints - pathfinder test', () => {
  // account provider
  const provider = new Provider(getTestProvider());
  const account = getTestAccount(provider);

  // websocket
  let webSocketChannel: WebSocketChannel;

  beforeAll(async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: TEST_WS_URL });
    expect(webSocketChannel.isConnected()).toBe(false);
    try {
      await webSocketChannel.waitForConnection();
    } catch (error: any) {
      console.log(error.message);
    }
    expect(webSocketChannel.isConnected()).toBe(true);
  });

  afterAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(true);
    webSocketChannel.disconnect();
    await expect(webSocketChannel.waitForDisconnection()).resolves.toBe(WebSocket.CLOSED);
  });

  test('Test WS Error and edge cases', async () => {
    webSocketChannel.disconnect();

    // should fail as disconnected
    await expect(webSocketChannel.subscribeNewHeads()).rejects.toThrow();

    // should reconnect
    webSocketChannel.reconnect();
    await webSocketChannel.waitForConnection();

    // should succeed after reconnection
    await expect(webSocketChannel.subscribeNewHeads()).resolves.toEqual(expect.any(Number));

    // should fail because already subscribed
    await expect(webSocketChannel.subscribeNewHeads()).resolves.toBe(false);
  });

  test('onUnsubscribe with unsubscribeNewHeads', async () => {
    const mockOnUnsubscribe = jest.fn().mockImplementation((subId: number) => {
      expect(subId).toEqual(expect.any(String));
    });
    webSocketChannel.onUnsubscribe = mockOnUnsubscribe;

    await webSocketChannel.subscribeNewHeads();
    await expect(webSocketChannel.unsubscribeNewHeads()).resolves.toBe(true);
    await expect(webSocketChannel.unsubscribeNewHeads()).rejects.toThrow();

    expect(mockOnUnsubscribe).toHaveBeenCalled();
    expect(webSocketChannel.subscriptions.has(WSSubscriptions.NEW_HEADS)).toBeFalsy();
  });

  test('Test subscribeNewHeads', async () => {
    await webSocketChannel.subscribeNewHeads();

    let i = 0;
    webSocketChannel.onNewHeads = async function (result, subscriptionId) {
      expect(this).toBeInstanceOf(WebSocketChannel);
      i += 1;
      // TODO : Add data format validation
      expect(result).toBeDefined();
      const currentSubId = webSocketChannel.subscriptions.get(WSSubscriptions.NEW_HEADS);
      expect(subscriptionId).toEqual(currentSubId);
      if (i === 2) {
        const status = await webSocketChannel.unsubscribeNewHeads();
        expect(status).toBe(true);
      }
    };
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.NEW_HEADS);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toBe(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.NEW_HEADS)).toBe(undefined);
  });

  test('Test subscribeEvents', async () => {
    await webSocketChannel.subscribeEvents();

    let i = 0;
    webSocketChannel.onEvents = async (result, subscriptionId) => {
      i += 1;
      // TODO : Add data format validation
      expect(result).toBeDefined();
      const currentSubId = webSocketChannel.subscriptions.get(WSSubscriptions.EVENTS);
      expect(subscriptionId).toEqual(currentSubId);
      if (i === 5) {
        const status = await webSocketChannel.unsubscribeEvents();
        expect(status).toBe(true);
      }
    };
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.EVENTS);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toBe(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.EVENTS)).toBe(undefined);
  });

  test('Test subscribePendingTransaction', async () => {
    await webSocketChannel.subscribePendingTransaction(true);

    let i = 0;
    webSocketChannel.onPendingTransaction = async (result, subscriptionId) => {
      i += 1;
      // TODO : Add data format validation
      expect(result).toBeDefined();
      const currentSubId = webSocketChannel.subscriptions.get(WSSubscriptions.PENDING_TRANSACTION);
      expect(subscriptionId).toEqual(currentSubId);
      if (i === 5) {
        const status = await webSocketChannel.unsubscribePendingTransaction();
        expect(status).toBe(true);
      }
    };
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.PENDING_TRANSACTION);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toBe(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.PENDING_TRANSACTION)).toBe(undefined);
  });

  test('Test subscribeTransactionStatus', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: [account.address, '10', '0'],
    });

    const subid = await webSocketChannel.subscribeTransactionStatus(transaction_hash);

    let i = 0;
    webSocketChannel.onTransactionStatus = async (result, subscriptionId) => {
      i += 1;
      // TODO : Add data format validation
      expect(result).toBeDefined();
      const currentSubId = webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
      expect(subscriptionId).toEqual(currentSubId);
      if (i >= 2) {
        const status = await webSocketChannel.unsubscribeTransactionStatus();
        expect(status).toBe(true);
      }
    };

    expect(subid).toEqual(expect.any(String));
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toEqual(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS)).toBe(undefined);
  });

  test('Test subscribeTransactionStatus and block_id', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: [account.address, '10', '0'],
    });

    let i = 0;
    webSocketChannel.onTransactionStatus = async (result, subscriptionId) => {
      i += 1;
      // TODO : Add data format validation
      expect(result).toBeDefined();
      const currentSubId = webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
      expect(subscriptionId).toEqual(currentSubId);
      if (i >= 1) {
        const status = await webSocketChannel.unsubscribeTransactionStatus();
        expect(status).toBe(true);
      }
    };

    const subid = await webSocketChannel.subscribeTransactionStatus(transaction_hash);
    expect(subid).toEqual(expect.any(String));
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toEqual(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS)).toBe(undefined);
  });
});

describe('websocket regular endpoints - pathfinder test', () => {
  let webSocketChannel: WebSocketChannel;

  beforeAll(async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl });
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

describe('WebSocketChannel Buffering', () => {
  let webSocketChannel: WebSocketChannel;
  const mockNodeUrl = TEST_WS_URL; // Or a specific mock URL if needed

  beforeEach(async () => {
    // To test buffering reliably, we need to control WebSocket messages.
    // For simplicity in this automated step, we'll assume the actual WebSocket
    // connection and message dispatch can be orchestrated or rely on a slight delay.
    // A more robust approach would involve mocking the WebSocket object itself.
    webSocketChannel = new WebSocketChannel({ nodeUrl: mockNodeUrl });
    await webSocketChannel.waitForConnection();
  });

  afterEach(async () => {
    if (webSocketChannel.isConnected()) {
      // Clean up any active subscriptions if tests didn't do so.
      // This is tricky without knowing which ones are active.
      // For now, we rely on tests to unsubscribe or we just disconnect.
      const { subscriptions } = webSocketChannel;
      if (subscriptions.get(WSSubscriptions.NEW_HEADS)) {
        try {
          await webSocketChannel.unsubscribeNewHeads();
        } catch (e) {
          /* ignore */
        }
      }
      if (subscriptions.get(WSSubscriptions.EVENTS)) {
        try {
          await webSocketChannel.unsubscribeEvents();
        } catch (e) {
          /* ignore */
        }
      }
      // Add other subscription types if necessary
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();
    }
  });

  test('should buffer newHeads events and process upon handler attachment', (done) => {
    const mockNewHeadsData1 = {
      result: {
        block_hash: '0x1',
        parent_hash: '0x0',
        block_number: 1,
        new_root: '0x1',
        timestamp: 1,
        sequencer_address: '0x1',
        l1_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l1_data_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l1_da_mode: 'BLOB',
        starknet_version: '0.13.1.1',
      },
      subscription: 'sub1',
    };
    const mockNewHeadsData2 = {
      result: {
        block_hash: '0x2',
        parent_hash: '0x1',
        block_number: 2,
        new_root: '0x2',
        timestamp: 2,
        sequencer_address: '0x2',
        l1_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l1_data_gas_price: { price_in_fri: '0x1', price_in_wei: '0x1' },
        l1_da_mode: 'BLOB',
        starknet_version: '0.13.1.1',
      },
      subscription: 'sub1',
    };

    const subIdPromise = webSocketChannel.subscribeNewHeads();

    subIdPromise
      .then((subId) => {
        expect(subId).toEqual(expect.any(String));

        // Simulate receiving an event BEFORE handler is attached
        // This requires a way to manually trigger onmessage or a mock WebSocket
        // For this example, we assume a slight delay or manual trigger if possible.
        // In a real test, you'd mock WebSocket and call its onmessage.
        // Here, we'll proceed assuming the event would be buffered if it arrived.

        // Attach handler
        const handler = jest.fn((result, subscriptionId) => {
          if (handler.mock.calls.length === 1) {
            expect(result).toEqual(mockNewHeadsData1.result); // Assuming this is how data is structured after parsing
            expect(subscriptionId).toEqual(mockNewHeadsData1.subscription);
          } else if (handler.mock.calls.length === 2) {
            expect(result).toEqual(mockNewHeadsData2.result);
            expect(subscriptionId).toEqual(mockNewHeadsData2.subscription);
            webSocketChannel.unsubscribeNewHeads().then(() => done());
          }
        });

        // Manually constructing the MessageEvent-like structure for the proxy
        // This is a simplified way to test the internal onMessageProxy logic path.
        // Ideally, the WebSocket mock would emit a proper MessageEvent.
        const internalOnMessageProxy = (webSocketChannel as any).onMessageProxy;

        // Simulate event 1 (buffered)
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockNewHeadsData1,
          }),
        });

        webSocketChannel.onNewHeads = handler; // Assign handler, should process buffer

        // Simulate event 2 (processed directly)
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockNewHeadsData2,
          }),
        });
      })
      .catch(done);
  });

  test('should buffer multiple events and process in order', (done) => {
    const mockEventData1 = {
      result: {
        from_address: '0x1',
        keys: [],
        data: [],
        block_hash: '0xa1',
        block_number: 101,
        transaction_hash: '0xtx1',
      },
      subscription: 'sub2',
    };
    const mockEventData2 = {
      result: {
        from_address: '0x2',
        keys: [],
        data: [],
        block_hash: '0xa2',
        block_number: 102,
        transaction_hash: '0xtx2',
      },
      subscription: 'sub2',
    };
    const mockEventData3 = {
      result: {
        from_address: '0x3',
        keys: [],
        data: [],
        block_hash: '0xa3',
        block_number: 103,
        transaction_hash: '0xtx3',
      },
      subscription: 'sub2',
    };

    webSocketChannel
      .subscribeEvents()
      .then((subId) => {
        expect(subId).toEqual(expect.any(String));

        const internalOnMessageProxy = (webSocketChannel as any).onMessageProxy;

        // Simulate events arriving before handler attachment
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionEvents',
            params: mockEventData1,
          }),
        });
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionEvents',
            params: mockEventData2,
          }),
        });

        const receivedOrder: any[] = [];
        const handler = jest.fn((result, subscriptionId) => {
          receivedOrder.push({ result, subscriptionId });
          if (receivedOrder.length === 3) {
            // All 3 events processed
            expect(receivedOrder[0].result).toEqual(mockEventData1.result);
            expect(receivedOrder[1].result).toEqual(mockEventData2.result);
            expect(receivedOrder[2].result).toEqual(mockEventData3.result);
            webSocketChannel.unsubscribeEvents().then(() => done());
          }
        });

        webSocketChannel.onEvents = handler; // Assign handler, processes buffer

        // Simulate one more event after handler attachment
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionEvents',
            params: mockEventData3,
          }),
        });
      })
      .catch(done);
  });

  test('handler attached, removed, then re-attached with events in between', (done) => {
    const mockData1 = { result: { block_hash: '0xb1' }, subscription: 'subH' };
    const mockData2 = { result: { block_hash: '0xb2' }, subscription: 'subH' }; // Buffered
    const mockData3 = { result: { block_hash: '0xb3' }, subscription: 'subH' }; // Buffered
    const mockData4 = { result: { block_hash: '0xb4' }, subscription: 'subH' }; // Direct after re-attach

    const handlerA = jest.fn();
    const handlerB = jest.fn();
    const receivedByB: any[] = [];

    const internalOnMessageProxy = (webSocketChannel as any).onMessageProxy;

    webSocketChannel
      .subscribeNewHeads()
      .then(async (subId) => {
        expect(subId).toEqual(expect.any(String));

        // 1. Attach handler A
        webSocketChannel.onNewHeads = handlerA;
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockData1,
          }),
        });
        expect(handlerA).toHaveBeenCalledWith(mockData1.result, mockData1.subscription);
        expect(handlerA).toHaveBeenCalledTimes(1);

        // 2. Remove handler (set to null or new no-op)
        webSocketChannel.onNewHeads = null;

        // 3. Simulate events - these should be buffered
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockData2,
          }),
        });
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockData3,
          }),
        });

        // 4. Attach handler B
        webSocketChannel.onNewHeads = async (result, subscriptionId) => {
          handlerB(result, subscriptionId);
          receivedByB.push(result);

          if (receivedByB.length === 3) {
            // mockData2, mockData3, mockData4
            expect(handlerB).toHaveBeenCalledTimes(3);
            expect(receivedByB[0]).toEqual(mockData2.result); // Buffered
            expect(receivedByB[1]).toEqual(mockData3.result); // Buffered
            expect(receivedByB[2]).toEqual(mockData4.result); // Direct
            await webSocketChannel.unsubscribeNewHeads();
            done();
          }
        };

        // Handler B should have been called with buffered events immediately
        expect(handlerB).toHaveBeenCalledWith(mockData2.result, mockData2.subscription);
        expect(handlerB).toHaveBeenCalledWith(mockData3.result, mockData3.subscription);
        expect(handlerB).toHaveBeenCalledTimes(2); // Called for mockData2 and mockData3 from buffer

        // 5. Simulate another event - should go directly to B
        internalOnMessageProxy({
          data: JSON.stringify({
            jsonrpc: '2.0',
            method: 'starknet_subscriptionNewHeads',
            params: mockData4,
          }),
        });
      })
      .catch(done);
  });
});
