import { RPC0102, RPC0103, RPC09 } from '../src';
import { SubscriptionChannel } from '../src/channel/ws/subscriptionChannel';
import { ReconnectingWsTransport, WsTransport } from '../src/channel/transport';
import { RpcError, WebSocketNotConnectedError } from '../src/utils/errors';
import { createMockWebSocket, withoutErrorLogs } from './config';

/**
 * A transport wired to a mock socket, already open, plus the handles a test needs to answer
 * for the node.
 */
const openChannel = () => {
  const mock = createMockWebSocket();
  const transport = new WsTransport({
    nodeUrl: 'ws://mock/rpc',
    websocket: mock.MockWebSocket as any,
    requestTimeout: 200,
  });
  mock.last.open();
  const channel = new SubscriptionChannel({ transport });
  return { mock, transport, channel };
};

/** Answers the request just sent with `result`, using the wire id the transport chose. */
const answerLast = (mock: ReturnType<typeof createMockWebSocket>, result: unknown) => {
  const sent = mock.last.sentBodies;
  const wireId = sent[sent.length - 1].id;
  mock.last.reply({ jsonrpc: '2.0', id: wireId, result });
};

describe('UNIT TEST: SubscriptionChannel core', () => {
  test('routes a notification to the subscription that owns it', async () => {
    const { mock, channel, transport } = openChannel();

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, '17529898712701846618');
    const subscription = await pending;

    const seen: any[] = [];
    subscription.on((data) => seen.push(data));

    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '17529898712701846618', result: { block_number: 7 } },
    });

    expect(seen).toEqual([{ block_number: 7 }]);
    channel.close();
    transport.close();
  });

  test('keeps a subscription id as a string, never as a number', async () => {
    // Node-issued subscription ids routinely exceed Number.MAX_SAFE_INTEGER, so any
    // numeric coercion silently corrupts them and the event never finds its subscription.
    const { mock, channel, transport } = openChannel();
    const hugeId = '17529898712701846618';

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, hugeId);
    const subscription = await pending;

    expect(subscription.id).toBe(hugeId);
    expect(typeof subscription.id).toBe('string');
    channel.close();
    transport.close();
  });

  test('delivers an event that arrives before its registration completed', async () => {
    // The reply carrying the id and the first event can be flushed in the same burst, so the
    // continuation that registers the subscription may not have run yet. One microtask of
    // grace is enough: that continuation was queued first.
    const { mock, channel, transport } = openChannel();
    const subId = '999';

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, subId);
    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: subId, result: { block_number: 1 } },
    });

    const subscription = await pending;
    const seen: any[] = [];
    subscription.on((data) => seen.push(data));
    await Promise.resolve();

    expect(seen).toEqual([{ block_number: 1 }]);
    channel.close();
    transport.close();
  });

  test('turns a protocol error into a typed RpcError', async () => {
    const { mock, channel, transport } = openChannel();

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    const sent = mock.last.sentBodies;
    mock.last.reply({
      jsonrpc: '2.0',
      id: sent[sent.length - 1].id,
      error: { code: 24, message: 'Block not found' },
    });

    await expect(pending).rejects.toBeInstanceOf(RpcError);
    channel.close();
    transport.close();
  });

  test('waitForUnsubscription resolves once the node confirms', async () => {
    const { mock, channel, transport } = openChannel();

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, '42');
    const subscription = await pending;

    const waiting = channel.waitForUnsubscription('42');
    const unsubscribing = subscription.unsubscribe();
    await Promise.resolve();
    answerLast(mock, true);

    await expect(unsubscribing).resolves.toBe(true);
    await expect(waiting).resolves.toBeUndefined();
    channel.close();
    transport.close();
  });

  test('rejects unsubscribe waiters when the connection dies', async () => {
    // This is why the subscription channel needs the transport's observable state.
    // Without it `waitForUnsubscription` hangs forever — the defect 10.6.8 fixed.
    const { mock, channel, transport } = openChannel();

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, '42');
    await pending;

    const waiting = channel.waitForUnsubscription('42');
    mock.last.closeRemote();

    await expect(waiting).rejects.toBeInstanceOf(WebSocketNotConnectedError);
    channel.close();
    transport.close();
  });

  test('close() stops listening without closing the socket it borrowed', async () => {
    const { mock, channel, transport } = openChannel();

    const pending = channel.subscribeNewHeads();
    await Promise.resolve();
    answerLast(mock, '42');
    const subscription = await pending;
    const seen: any[] = [];
    subscription.on((data) => seen.push(data));

    channel.close();
    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '42', result: { block_number: 1 } },
    });

    expect(seen).toEqual([]);
    // The channel borrows the socket; only its owner closes it.
    expect(transport.getState()).toBe('open');
    transport.close();
  });
});

describe('UNIT TEST: SubscriptionChannel restoration', () => {
  const wait = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const openReconnecting = () => {
    const mock = createMockWebSocket();
    const transport = new ReconnectingWsTransport({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
      requestTimeout: 500,
      reconnectOptions: {
        retries: 5,
        delay: 10,
        exponential: false,
        stableConnectionThreshold: 200,
      },
    });
    mock.last.open();
    const channel = new SubscriptionChannel({ transport });
    return { mock, transport, channel };
  };

  test('a manual reconnect re-establishes the subscription, like an automatic one', async () => {
    // `reconnect()` used to bring the socket back without its subscriptions.
    const { mock, transport, channel } = openReconnecting();

    const subscribing = channel.subscribeNewHeads();
    await wait(5);
    answerLast(mock, '11');
    const subscription = await subscribing;

    transport.close();
    transport.reconnect();
    mock.last.open();
    await wait(5);
    answerLast(mock, '22');
    await wait(5);

    expect(subscription.isClosed).toBe(false);
    expect(subscription.id).toBe('22');

    channel.close();
    transport.close();
  });

  test('re-issues a subscription under a fresh id and keeps its handler', async () => {
    const { mock, transport, channel } = openReconnecting();

    const subscribing = channel.subscribeNewHeads();
    await wait(5);
    answerLast(mock, '11');
    const subscription = await subscribing;

    const seen: any[] = [];
    subscription.on((data) => seen.push(data));

    mock.last.closeRemote();
    mock.last.open();
    await wait(5);

    expect(mock.last.sentBodies[0].method).toBe('starknet_subscribeNewHeads');
    answerLast(mock, '22');
    await wait(5);

    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '22', result: { block_number: 9 } },
    });
    await wait(5);

    expect(seen).toEqual([{ block_number: 9 }]);
    expect(subscription.isClosed).toBe(false);

    channel.close();
    transport.close();
  });

  test('closes the handle of a subscription the node refuses to re-establish', async () => {
    // Otherwise it keeps reporting itself as live while nothing can ever reach its handler.
    const { mock, transport, channel } = openReconnecting();

    const subscribing = channel.subscribeNewHeads();
    await wait(5);
    answerLast(mock, '11');
    const subscription = await subscribing;

    mock.last.closeRemote();
    mock.last.open();
    await wait(5);

    const resent = mock.last.sentBodies;
    // The refusal is logged on the way through; that is the behaviour under test, but it must
    // not print under a passing run.
    await withoutErrorLogs(async () => {
      mock.last.reply({
        jsonrpc: '2.0',
        id: resent[resent.length - 1].id,
        error: { code: 66, message: 'Too many subscriptions' },
      });
      await wait(5);
    });

    expect(subscription.isClosed).toBe(true);

    channel.close();
    transport.close();
  });

  test('rejects unsubscribe waiters on a drop, even when a reconnection follows', async () => {
    // 10.6.8 rejects them on every close. A reconnection restores the subscription under a new
    // id, so the id being waited on is never announced and the waiter would hang forever.
    const { mock, transport, channel } = openReconnecting();

    const subscribing = channel.subscribeNewHeads();
    await wait(5);
    answerLast(mock, '11');
    await subscribing;

    const waiting = channel.waitForUnsubscription('11');
    mock.last.closeRemote();

    await expect(waiting).rejects.toBeInstanceOf(WebSocketNotConnectedError);

    channel.close();
    transport.close();
  });
});

describe('UNIT TEST: one namespace per spec version', () => {
  test('each namespace exports its request channel and its subscription channel', () => {
    // One version axis. A namespace means "everything for this spec version", so
    // adding spec 0.11 is one namespace to add rather than two to remember.
    expect(typeof RPC09.RpcChannel).toBe('function');
    expect(typeof RPC09.SubscriptionChannel).toBe('function');
    expect(typeof RPC0102.RpcChannel).toBe('function');
    expect(typeof RPC0102.SubscriptionChannel).toBe('function');
    expect(typeof RPC0103.RpcChannel).toBe('function');
    expect(typeof RPC0103.SubscriptionChannel).toBe('function');
  });

  test('the subscription channels carry their own spec version', () => {
    const mock = createMockWebSocket();
    const transport = new WsTransport({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
    });

    expect(new RPC09.SubscriptionChannel({ transport }).channelSpecVersion).toBe('0.9.0');
    expect(new RPC0102.SubscriptionChannel({ transport }).channelSpecVersion).toBe('0.10.2');
    expect(new RPC0103.SubscriptionChannel({ transport }).channelSpecVersion).toBe('0.10.3');

    transport.close();
  });
});
