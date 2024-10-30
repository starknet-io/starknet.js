import { WebSocket } from 'isows';

import { Provider, WSSubscriptions, WebSocketChannel } from '../src';
import { StarknetChainId } from '../src/constants';
import { getTestAccount, getTestProvider } from './config/fixtures';

describe('websocket specific endpoints - pathfinder test', () => {
  // account provider
  const provider = new Provider(getTestProvider());
  const account = getTestAccount(provider);

  // websocket
  const webSocketChannel = new WebSocketChannel({
    nodeUrl: 'wss://toni.spaceshard.io/rpc/v0_8',
  });

  beforeAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(false);
    await webSocketChannel.waitForConnection();
    expect(webSocketChannel.isConnected()).toBe(true);
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

    // should fails because already subscribed
    await expect(webSocketChannel.subscribeNewHeads()).resolves.toBe(false);
  });

  test('onUnsubscribe with unsubscribeNewHeads', async () => {
    const mockOnUnsubscribe = jest.fn().mockImplementation((subId: number) => {
      expect(subId).toEqual(expect.any(Number));
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
    webSocketChannel.onNewHeads = async function (data) {
      expect(this).toBeInstanceOf(WebSocketChannel);
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
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
    webSocketChannel.onEvents = async (data) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
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
    webSocketChannel.onPendingTransaction = async (data) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
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
      contractAddress: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
      entrypoint: 'transfer',
      calldata: [account.address, '10', '0'],
    });

    await webSocketChannel.subscribeTransactionStatus(transaction_hash);

    let i = 0;
    webSocketChannel.onTransactionStatus = async (data) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
      if (i === 1) {
        const status = await webSocketChannel.unsubscribeTransactionStatus();
        expect(status).toBe(true);
      }
    };
    const expectedId = webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
    const subscriptionId = await webSocketChannel.waitForUnsubscription(expectedId);
    expect(subscriptionId).toEqual(expectedId);
    expect(webSocketChannel.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS)).toBe(undefined);
  });

  afterAll(async () => {
    expect(webSocketChannel.isConnected()).toBe(true);
    webSocketChannel.disconnect();
    await expect(webSocketChannel.waitForDisconnection()).resolves.toBe(WebSocket.CLOSED);
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
    expect(webSocketChannel.isConnected()).toBe(true);
    webSocketChannel.disconnect();
  });
});
