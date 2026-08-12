/* eslint-disable no-underscore-dangle -- these tests drive `Subscription`'s internal hooks
   (`_handleEvent`, `_markClosed`) directly, which is the only way to exercise buffering and a
   refused restore without a node. */
import { Subscription, WebSocketChannel, config } from '../src';
import { logger } from '../src/global/logger';
import { OfflineWebSocket, ScriptedWebSocket, useOfflineSocket, withTimeout } from './config';

/**
 * `WebSocketChannel` behaviour that needs no node: every socket here is mocked, so these run in
 * every environment and are never gated on a URL. The live-node half is in
 * `WebSocketChannel.ws.test.ts`.
 */

describe('Unit Test: WebSocketChannel Buffering', () => {
  useOfflineSocket();

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
    webSocketChannel = new WebSocketChannel({
      nodeUrl: 'ws://dummy-url',
      autoReconnect: false,
    });
    // Mock unsubscribe to prevent network errors during cleanup in afterEach.
    jest.spyOn(webSocketChannel, 'unsubscribe').mockResolvedValue(true);

    // Manually create the subscription, bypassing the network.
    const subId = 'mock_sub_id_buffer';
    sub = new Subscription({
      channel: webSocketChannel,
      method: 'starknet_subscribeNewHeads',
      id: subId,
      maxBufferSize: 1000,
    });
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
    sub = new Subscription({
      channel: webSocketChannel,
      method: 'starknet_subscribeNewHeads',
      id: subId,
      maxBufferSize: 2,
    });
    (webSocketChannel as any).activeSubscriptions.set(subId, sub);

    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});

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

describe('Unit Test: Subscription Class', () => {
  useOfflineSocket();

  let mockChannel: WebSocketChannel;
  let subscription: Subscription;

  beforeEach(() => {
    // Create a mock WebSocketChannel. We don't need a real one for these tests.
    mockChannel = new WebSocketChannel({
      nodeUrl: 'ws://dummy-url',
      autoReconnect: false,
    });
    // Mock the parts of the channel that the subscription interacts with.
    mockChannel.unsubscribe = jest.fn().mockResolvedValue(true);
    mockChannel.removeSubscription = jest.fn();

    subscription = new Subscription({
      channel: mockChannel,
      method: 'test_method',
      id: 'sub_123',
      maxBufferSize: 100,
    });
  });

  test('should throw an error if .on() is called more than once', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    subscription.on(handler1); // First call is fine.

    // Second call should throw.
    expect(() => {
      subscription.on(handler2);
    }).toThrow('A handler is already attached to this subscription.');
  });

  test('re-attaching the same handler is a no-op rather than a throw', () => {
    // React StrictMode invokes an effect twice with the same function. Throwing there fails a
    // correct component; only a *different* handler is a genuine mistake.
    const handler = jest.fn();

    subscription.on(handler);
    expect(() => subscription.on(handler)).not.toThrow();

    subscription._handleEvent({ block_number: 1 } as any);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('off() detaches, and events buffer again until the next on()', () => {
    const first = jest.fn();
    subscription.on(first);
    subscription.off();

    subscription._handleEvent({ block_number: 7 } as any);
    expect(first).not.toHaveBeenCalled();

    const second = jest.fn();
    subscription.on(second);
    expect(second).toHaveBeenCalledWith({ block_number: 7 });
  });

  test('on() on a closed subscription does nothing instead of throwing', () => {
    // A closed subscription can never deliver again, so refusing here would force a component to
    // build a new object for no benefit.
    subscription.on(jest.fn());
    subscription._markClosed();

    expect(() => subscription.on(jest.fn())).not.toThrow();
  });

  test('onClose fires when the node refuses to re-establish the subscription', () => {
    // The case the connection state cannot cover: the socket stays up, this one subscription dies.
    const closed = jest.fn();
    subscription.onClose(closed);

    subscription._markClosed();

    expect(closed).toHaveBeenCalledTimes(1);
    expect(subscription.isClosed).toBe(true);
  });

  test('onClose on an already closed subscription fires immediately', () => {
    // The closure can land between the subscribe call resolving and the consumer wiring its
    // listener; a listener attached one tick late must not wait forever.
    subscription._markClosed();

    const closed = jest.fn();
    subscription.onClose(closed);

    expect(closed).toHaveBeenCalledTimes(1);
  });

  test('the detach function returned by onClose prevents the call', () => {
    const closed = jest.fn();
    const detach = subscription.onClose(closed);

    detach();
    subscription._markClosed();

    expect(closed).not.toHaveBeenCalled();
  });

  test('unsubscribe should be idempotent and only call the channel once', async () => {
    // Call unsubscribe multiple times.
    const result1 = await subscription.unsubscribe();
    const result2 = await subscription.unsubscribe();
    const result3 = await subscription.unsubscribe();

    // All calls should report success.
    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(result3).toBe(true);

    // But the channel's unsubscribe method should only have been called once.
    expect(mockChannel.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mockChannel.unsubscribe).toHaveBeenCalledWith('sub_123');

    // And the subscription should be removed from the channel once.
    expect(mockChannel.removeSubscription).toHaveBeenCalledTimes(1);
    expect(mockChannel.removeSubscription).toHaveBeenCalledWith('sub_123');
  });

  test('unsubscribe stays idempotent when called again before the first reply', async () => {
    // The sequential test above never exercises the window that matters: `unsubscribe()`
    // closes the subscription only after the round-trip, so a second caller arriving while
    // the first request is still on the wire passes the guard too and sends a duplicate
    // `starknet_unsubscribe`. That happens for real whenever a node pushes two events in one
    // burst and the handler unsubscribes on each — the second request is then still in flight
    // when the channel is closed, and settles as an unhandled rejection.
    let reply: (value: boolean) => void;
    mockChannel.unsubscribe = jest.fn().mockReturnValue(
      new Promise<boolean>((resolve) => {
        reply = resolve;
      })
    );

    const first = subscription.unsubscribe();
    const second = subscription.unsubscribe();
    reply!(true);

    await expect(first).resolves.toBe(true);
    await expect(second).resolves.toBe(true);
    expect(mockChannel.unsubscribe).toHaveBeenCalledTimes(1);
    expect(mockChannel.removeSubscription).toHaveBeenCalledTimes(1);
  });
});

describe('Unit Test: WebSocketChannel subscription lifecycle', () => {
  let webSocketChannel: WebSocketChannel;

  beforeAll(() => {
    config.set('websocket', ScriptedWebSocket as any);
  });

  afterAll(() => {
    config.set('websocket', undefined as any);
  });

  afterEach(() => {
    webSocketChannel?.disconnect();
  });

  test('an event arriving in the same burst as the subscription reply is not lost', async () => {
    // The subscription id only exists once the reply arrives, and the continuation that
    // registers it runs a microtask later. An event flushed in the same burst is therefore
    // looked up before that registration and, without a fix, dropped with nothing but a
    // warning — a silent hole that no assertion in the E2E suite can see.
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'wss://mock', autoReconnect: false });
    const ws = ScriptedWebSocket.current;

    const pending = webSocketChannel.subscribeNewHeads();

    ws.deliver(
      { jsonrpc: '2.0', id: 0, result: 'SUB_1' },
      {
        jsonrpc: '2.0',
        method: 'starknet_subscriptionNewHeads',
        params: { subscription_id: 'SUB_1', result: { block_number: 42 } },
      }
    );

    const sub = await pending;
    const handler = jest.fn();
    sub.on(handler); // Attaching flushes whatever was buffered before the handler existed.

    expect(handler).toHaveBeenCalledWith({ block_number: 42 });
  });

  test('an event for a genuinely unknown subscription is still discarded', async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'wss://mock', autoReconnect: false });
    const ws = ScriptedWebSocket.current;
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(() => {});

    ws.deliver({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: 'NEVER_SUBSCRIBED', result: { block_number: 1 } },
    });

    // Deferred delivery must not turn "unknown id" into a leak: once the retry finds nothing,
    // the event is dropped and reported, exactly as before.
    await Promise.resolve();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('untracked subscription ID: NEVER_SUBSCRIBED')
    );

    warnSpy.mockRestore();
  });

  test('a subscription that cannot be restored stops reporting itself as live', async () => {
    // A reconnection re-subscribes every active subscription. One that fails was dropped from
    // the channel with nothing but a log line, while the `Subscription` the caller holds kept
    // saying it was open — with a handler attached that would never be called again.
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'wss://mock', autoReconnect: false });
    const ws = ScriptedWebSocket.current;
    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});

    const pending = webSocketChannel.subscribeNewHeads();
    ws.deliver({ jsonrpc: '2.0', id: 0, result: 'SUB_1' });
    const sub = await pending;
    expect(sub.isClosed).toBe(false);

    // Restoration lives on the subscription channel the façade delegates to.
    const restoring = (webSocketChannel as any).subscriptionChannel.restore();
    ws.deliver({ jsonrpc: '2.0', id: 1, error: { code: 1, message: 'subscription refused' } });
    await restoring;

    expect(sub.isClosed).toBe(true);
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});

describe('Unit Test: WebSocketChannel waitForUnsubscription', () => {
  let webSocketChannel: WebSocketChannel;

  beforeAll(() => {
    config.set('websocket', ScriptedWebSocket as any);
  });

  afterAll(() => {
    config.set('websocket', undefined as any);
  });

  afterEach(() => {
    webSocketChannel?.disconnect();
  });

  /** Opens a channel and completes one subscription, leaving the reply id counter at 1. */
  const subscribed = async () => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'wss://mock', autoReconnect: false });
    const ws = ScriptedWebSocket.current;
    const pending = webSocketChannel.subscribeNewHeads();
    ws.deliver({ jsonrpc: '2.0', id: 0, result: 'SUB_1' });
    return { ws, sub: await pending };
  };

  /** Records how a promise settled without ever leaving it unhandled. */
  const track = (promise: Promise<unknown>) => {
    const state = { settled: undefined as 'resolved' | 'rejected' | undefined };
    promise.then(
      () => {
        state.settled = 'resolved';
      },
      () => {
        state.settled = 'rejected';
      }
    );
    return state;
  };

  test('resolves once the subscription is unsubscribed', async () => {
    const { ws, sub } = await subscribed();

    const waiting = track(webSocketChannel.waitForUnsubscription(sub.id));
    const unsubscribing = sub.unsubscribe();
    ws.deliver({ jsonrpc: '2.0', id: 1, result: true });

    await expect(unsubscribing).resolves.toBe(true);
    await withTimeout(Promise.resolve(), 0);
    expect(waiting.settled).toBe('resolved');
  });

  test('rejects when the node refuses the unsubscribe', async () => {
    // `unsubscribe` only announces success, so a `false` reply left every waiter pending
    // forever — and a caller awaiting it had no timeout of its own to fall back on.
    const { ws, sub } = await subscribed();

    const waiting = track(webSocketChannel.waitForUnsubscription(sub.id));
    const unsubscribing = sub.unsubscribe();
    ws.deliver({ jsonrpc: '2.0', id: 1, result: false });

    await expect(unsubscribing).resolves.toBe(false);
    await withTimeout(Promise.resolve(), 0);
    expect(waiting.settled).toBe('rejected');
  });

  test('rejects when the connection closes while waiting', async () => {
    // After a close the unsubscribe can never be observed: a reconnection restores the
    // subscription under a new id, so this one will never be announced.
    const { sub } = await subscribed();

    const waiting = track(webSocketChannel.waitForUnsubscription(sub.id));
    webSocketChannel.disconnect();

    await withTimeout(Promise.resolve(), 0);
    expect(waiting.settled).toBe('rejected');
  });
});

describe('Unit Test: WebSocketChannel request id resolution', () => {
  useOfflineSocket();

  let webSocketChannel: WebSocketChannel;
  let sendSpy: jest.SpyInstance;

  beforeEach(() => {
    // No real connection needed: the socket is stubbed out entirely.
    webSocketChannel = new WebSocketChannel({
      nodeUrl: 'ws://dummy-url',
      autoReconnect: false,
    });
    jest.spyOn(webSocketChannel, 'isConnected').mockReturnValue(true);
    sendSpy = jest.spyOn(webSocketChannel.websocket, 'send').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    webSocketChannel.disconnect();
  });

  test('should honour an explicitly provided id of 0', () => {
    // Regression: `idResolver` tested the id for truthiness, so an explicit 0 — a valid
    // JSON-RPC id — was discarded in favour of an auto-generated one. Callers of the
    // low-level `send()` match responses to requests by id themselves, so the id on the
    // wire must be the one they asked for.
    //
    // The managed counter starts at 0, so its first value is 0 too: one unmanaged send
    // is issued first to advance it past 0, otherwise both the correct and the buggy
    // behaviour would produce the same id and the assertion would prove nothing.
    expect(webSocketChannel.send('starknet_chainId')).toBe(0);
    sendSpy.mockClear();

    const usedId = webSocketChannel.send('starknet_chainId', undefined, 0);

    expect(usedId).toBe(0);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    const payload = sendSpy.mock.calls[0][0] as string;
    expect(JSON.parse(payload).id).toBe(0);
    expect(payload).toContain('"id":0');
  });

  test('should honour other explicitly provided ids and leave the internal counter untouched', () => {
    expect(webSocketChannel.send('starknet_chainId', undefined, 7)).toBe(7);
    expect(JSON.parse(sendSpy.mock.calls[0][0] as string).id).toBe(7);

    // The managed counter is independent of user-set ids, and starts at 0.
    expect(webSocketChannel.send('starknet_chainId')).toBe(0);
    expect(webSocketChannel.send('starknet_chainId')).toBe(1);
  });
});

describe('Unit Test: WebSocketChannel waitForDisconnection', () => {
  useOfflineSocket();

  let webSocketChannel: WebSocketChannel;

  beforeEach(() => {
    webSocketChannel = new WebSocketChannel({ nodeUrl: 'ws://dummy-url', autoReconnect: false });
  });

  afterEach(() => {
    webSocketChannel.disconnect();
  });

  test('resolves when the peer closes uncleanly, error first', async () => {
    const socket = webSocketChannel.websocket as any;
    socket.readyState = OfflineWebSocket.OPEN;
    const waiting = webSocketChannel.waitForDisconnection();

    // What devnet produces: it answers a client `close()` by dropping the TCP connection, so the
    // socket is already leaving OPEN when the error lands and the close follows right after.
    socket.readyState = OfflineWebSocket.CLOSING;
    socket.dispatchEvent(new Event('error'));
    socket.close();

    await expect(waiting).resolves.toBe(OfflineWebSocket.CLOSED);
  });

  test('still rejects on an error that leaves the socket open', async () => {
    const socket = webSocketChannel.websocket as any;
    socket.readyState = OfflineWebSocket.OPEN;
    const waiting = webSocketChannel.waitForDisconnection();

    const failure = new Event('error');
    socket.dispatchEvent(failure);

    await expect(waiting).rejects.toBe(failure);
  });
});
