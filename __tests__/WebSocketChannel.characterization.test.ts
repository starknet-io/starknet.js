import { Subscription, WebSocketChannel, config } from '../src';
import { createMockWebSocket } from './config';

/**
 * Pins the reconnection behaviours that `WebSocketChannel.test.ts` only covers end-to-end, on
 * mock sockets so they can be checked without a node.
 *
 * Written against the implementation as it shipped in 10.6.8 and required to pass before any
 * refactoring begins: a characterization test written after the change merely describes the
 * change. If one of these fails, the test is wrong — 10.6.8 is the reference.
 *
 * Timing note: the first reconnection attempt opens its replacement socket synchronously inside
 * the `close` handler. `reconnectOptions.delay` only spaces out attempts that failed, so these
 * tests never wait for it — they call `open()` on the socket that already exists.
 */
describe('CHARACTERIZATION: WebSocketChannel reconnection', () => {
  const RECONNECT = { retries: 5, delay: 20, exponential: false, stableConnectionThreshold: 200 };

  const wait = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  let originalLogLevel: unknown;

  beforeAll(() => {
    originalLogLevel = config.get('logLevel');
    config.set('logLevel', 'FATAL' as any);
  });

  afterAll(() => {
    config.set('logLevel', originalLogLevel as any);
  });

  const openedChannel = (mock: ReturnType<typeof createMockWebSocket>) => {
    const channel = new WebSocketChannel({
      nodeUrl: 'ws://mock',
      websocket: mock.MockWebSocket as any,
      reconnectOptions: RECONNECT,
    });
    mock.last.open();
    return channel;
  };

  /** Subscribes and answers the request, returning the live handle. */
  const subscribed = async (
    mock: ReturnType<typeof createMockWebSocket>,
    channel: WebSocketChannel,
    id: string
  ) => {
    const subscribing = channel.subscribeNewHeads();
    await wait(5);
    const sent = mock.last.sentBodies;
    mock.last.reply({ jsonrpc: '2.0', id: sent[sent.length - 1].id, result: id });
    return subscribing;
  };

  test('a request made during an outage is queued, then sent on the new socket', async () => {
    const mock = createMockWebSocket();
    const channel = openedChannel(mock);
    const droppedSocket = mock.last;

    droppedSocket.closeRemote();
    // The replacement socket exists already; it is still CONNECTING.
    expect(mock.sockets).toHaveLength(2);

    const pending = channel.sendReceive('starknet_chainId');
    await wait(5);

    // Never put on the wire of either socket — that is what makes sending it later safe.
    expect(droppedSocket.sentBodies).toHaveLength(0);
    expect(mock.last.sentBodies).toHaveLength(0);

    mock.last.open();
    await wait(5);

    const sent = mock.last.sentBodies;
    expect(sent).toHaveLength(1);
    expect(sent[0].method).toBe('starknet_chainId');

    mock.last.reply({ jsonrpc: '2.0', id: sent[0].id, result: '0xchain' });
    await expect(pending).resolves.toBe('0xchain');

    channel.disconnect();
  });

  test('a subscribe made during an outage is queued, then completed after reconnection', async () => {
    const mock = createMockWebSocket();
    const channel = openedChannel(mock);

    mock.last.closeRemote();
    const pending = channel.subscribeNewHeads();
    await wait(5);
    expect(mock.last.sentBodies).toHaveLength(0);

    mock.last.open();
    await wait(5);

    const sent = mock.last.sentBodies;
    expect(sent[0].method).toBe('starknet_subscribeNewHeads');
    mock.last.reply({ jsonrpc: '2.0', id: sent[0].id, result: '77' });

    await expect(pending).resolves.toBeInstanceOf(Subscription);
    expect(channel.isConnected()).toBe(true);

    channel.disconnect();
  });

  test('an active subscription is restored under a fresh id and keeps its handler', async () => {
    const mock = createMockWebSocket();
    const channel = openedChannel(mock);

    const subscription = await subscribed(mock, channel, '11');
    const seen: any[] = [];
    subscription.on((data) => seen.push(data));

    mock.last.closeRemote();
    mock.last.open();
    await wait(5);

    // The channel re-issues the same subscription on the new socket.
    const resent = mock.last.sentBodies;
    expect(resent[0].method).toBe('starknet_subscribeNewHeads');
    mock.last.reply({ jsonrpc: '2.0', id: resent[0].id, result: '22' });
    await wait(5);

    // The node now speaks about it under the new id, and the original handle still receives.
    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '22', result: { block_number: 5 } },
    });
    await wait(5);

    expect(seen).toEqual([{ block_number: 5 }]);
    expect(subscription.isClosed).toBe(false);

    channel.disconnect();
  });

  test('subscriptions are restored before the queue is flushed', async () => {
    // A queued request must not overtake the re-subscription it was queued behind: the reconnect
    // handler awaits restoration, and only then drains the queue.
    const mock = createMockWebSocket();
    const channel = openedChannel(mock);

    await subscribed(mock, channel, '11');

    mock.last.closeRemote();
    const queued = channel.sendReceive('starknet_chainId');
    mock.last.open();
    await wait(5);

    // Only the re-subscribe has gone out; the queue is still held.
    const afterRestoreSent = mock.last.sentBodies;
    expect(afterRestoreSent).toHaveLength(1);
    expect(afterRestoreSent[0].method).toBe('starknet_subscribeNewHeads');

    mock.last.reply({ jsonrpc: '2.0', id: afterRestoreSent[0].id, result: '22' });
    await wait(5);

    // Restoration done, queue flushed — in that order.
    const order = mock.last.sentBodies.map((body: any) => body.method);
    expect(order).toEqual(['starknet_subscribeNewHeads', 'starknet_chainId']);

    const chainCall = mock.last.sentBodies[1];
    mock.last.reply({ jsonrpc: '2.0', id: chainCall.id, result: '0xchain' });
    await expect(queued).resolves.toBe('0xchain');

    channel.disconnect();
  });
});
