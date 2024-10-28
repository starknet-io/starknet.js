import { WebSocket } from 'isows';

import { Provider, WebSocketChannel } from '../src';
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

  test('Test subscribeNewHeads', async () => {
    await webSocketChannel.subscribeNewHeads();

    let i = 0;
    webSocketChannel.onsNewHeads = async (data: any) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
      if (i === 1) {
        const status = await webSocketChannel.unsubscribeNewHeads();
        expect(status).toBe(true);
      }
    };

    const status = await webSocketChannel.waitForUnsubscription(
      webSocketChannel.newHeadsSubscriptionId
    );
    expect(status).toBe(true);
    expect(webSocketChannel.newHeadsSubscriptionId).toBe(undefined);
  });

  test('Test subscribeEvents', async () => {
    await webSocketChannel.subscribeEvents();

    let i = 0;
    webSocketChannel.onEvents = async (data: any) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
      if (i === 2) {
        const status = await webSocketChannel.unsubscribeEvents();
        expect(status).toBe(true);
      }
    };

    const status = await webSocketChannel.waitForUnsubscription(
      webSocketChannel.eventsSubscriptionId
    );
    expect(status).toBe(true);
    expect(webSocketChannel.eventsSubscriptionId).toBe(undefined);
  });

  test('Test subscribePendingTransaction', async () => {
    await webSocketChannel.subscribePendingTransaction(true);

    let i = 0;
    webSocketChannel.onPendingTransaction = async (data: any) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
      if (i === 5) {
        const status = await webSocketChannel.unsubscribePendingTransaction();
        expect(status).toBe(true);
      }
    };

    const status = await webSocketChannel.waitForUnsubscription(
      webSocketChannel.pendingTransactionSubscriptionId
    );
    expect(status).toBe(true);
    expect(webSocketChannel.pendingTransactionSubscriptionId).toBe(undefined);
  });

  test('Test subscribeTransactionStatus', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
      entrypoint: 'transfer',
      calldata: [account.address, '10', '0'],
    });

    await webSocketChannel.subscribeTransactionStatus(transaction_hash);

    let i = 0;
    webSocketChannel.onTransactionStatus = async (data: any) => {
      i += 1;
      // TODO : Add data format validation
      expect(data.result).toBeDefined();
      if (i === 2) {
        const status = await webSocketChannel.unsubscribeTransactionStatus();
        expect(status).toBe(true);
      }
    };

    const status = await webSocketChannel.waitForUnsubscription(
      webSocketChannel.transactionStatusSubscriptionId
    );
    expect(status).toBe(true);
    expect(webSocketChannel.transactionStatusSubscriptionId).toBe(undefined);
  });

  test('disconnect', async () => {
    expect(webSocketChannel.isConnected()).toBe(true);
    webSocketChannel.disconnect();
    expect(webSocketChannel.waitForDisconnection()).resolves.toBe(WebSocket.CLOSED);
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
