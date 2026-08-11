/* eslint-disable no-underscore-dangle, max-classes-per-file */
import {
  Provider,
  Subscription,
  SubscriptionNewHeadsEvent,
  WebSocketChannel,
  config,
} from '../src';
import { logger } from '../src/global/logger';
import { getTestAccount, getTestProvider, STRKtokenAddress, TEST_WS_URL } from './config';

const describeIfWs = TEST_WS_URL ? describe : describe.skip;
const NODE_URL = TEST_WS_URL!;

/**
 * Simulate an abnormal network drop to exercise auto-reconnection.
 *
 * A real drop surfaces as a `close` event (RFC 6455 code 1006) without a closing handshake,
 * and the channel reacts to that event exactly as it does here. `socket.close()` cannot be
 * used instead: some gateways (Pathfinder) never complete the closing handshake while a
 * subscription is active, so the `close` event would never fire and reconnection would
 * never start.
 *
 * The socket the channel abandons is then released here, because nothing else will — the
 * channel has already moved on to its replacement, so no teardown can reach it. Closing it is
 * not enough on its own: a graceful close that the gateway will not answer while a subscription
 * is still bound leaves the connection open for the rest of the run, and a single one of those
 * keeps the Node event loop alive after the suite has passed. Note that `--detectOpenHandles`
 * does not attribute that handle to anything, so it is no help in tracking it down.
 */
const simulateConnectionDrop = (channel: WebSocketChannel) => {
  const socket = channel.websocket;
  // Subscription ids still bound to this socket, captured before the drop: restoring them on
  // the replacement socket clears the map.
  const subscriptionIds = Array.from(
    ((channel as any).activeSubscriptions as Map<string, unknown>).keys()
  );

  socket.dispatchEvent(new Event('close'));

  try {
    // Unsubscribe before closing, so the gateway has no reason to hold the connection. The
    // replies land on a socket whose listeners `onCloseProxy` has already detached, so they
    // are simply ignored.
    subscriptionIds.forEach((id, i) => {
      socket.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: 1_000_000 + i,
          method: 'starknet_unsubscribe',
          params: { subscription_id: id },
        })
      );
    });
    socket.close();
  } catch {
    // ignore: the socket may already be closing/closed
  }
};

/**
 * Open a WebSocket channel, retrying on connection errors.
 *
 * The shared gateways rate-limit new connections per IP, and a whole suite run opens around
 * twenty; once the limit trips it can take tens of seconds to replenish, and the rejected
 * connection surfaces through `waitForConnection()`. Hence five attempts with exponential
 * backoff, 1/2/4/8s — ~15s of waiting, while a connection that succeeds first try never sleeps.
 *
 * `autoReconnect` is forced off: this helper owns the retry loop, and letting the channel also
 * reconnect in the background on a failed attempt would spawn overlapping reconnection loops
 * (each retrying for tens of seconds) that pile up under rate-limiting.
 */
const openChannel = async (
  options: ConstructorParameters<typeof WebSocketChannel>[0]
): Promise<WebSocketChannel> => {
  const retries = 5;
  const backoffMs = 1000;
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    const channel = new WebSocketChannel({ ...options, autoReconnect: false });
    try {
      // eslint-disable-next-line no-await-in-loop
      await channel.waitForConnection();
      return channel;
    } catch (error) {
      lastError = error;
      channel.disconnect();
      // Last attempt: the loop is about to throw, so sleeping only delays the report.
      if (attempt === retries - 1) break;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, backoffMs * 2 ** attempt);
      });
    }
  }
  throw lastError;
};

/**
 * Resolve when `promise` settles or `ms` elapses, whichever comes first.
 *
 * The losing timer is always cleared: an un-cleared one keeps the Node event loop alive past
 * the end of the run, which is what makes Jest report that it "did not exit".
 */
const withTimeout = async (promise: Promise<unknown>, ms: number): Promise<void> => {
  let timer: NodeJS.Timeout | undefined;
  await Promise.race([
    promise,
    new Promise((resolve) => {
      timer = setTimeout(resolve, ms);
    }),
  ]).finally(() => clearTimeout(timer));
};

/**
 * A WebSocket that never touches the network.
 *
 * The unit describes at the bottom of this file need no connection and pass
 * `nodeUrl: 'ws://dummy-url'`, but the channel constructor opens a socket regardless and that
 * host never resolves — each one then sits in CONNECTING on a DNS lookup that never completes,
 * keeping the Node event loop alive after the run. A socket stuck before DNS resolution cannot
 * finish closing either, so the only fix is to never open one.
 */
class OfflineWebSocket extends EventTarget {
  static CONNECTING = 0;

  static OPEN = 1;

  static CLOSING = 2;

  static CLOSED = 3;

  public readyState = OfflineWebSocket.CONNECTING;

  public onopen: ((ev: Event) => void) | null = null;

  public onclose: ((ev: Event) => void) | null = null;

  public onerror: ((ev: Event) => void) | null = null;

  public onmessage: ((ev: Event) => void) | null = null;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, no-useless-constructor
  constructor(_url: string) {
    super();
  }

  public send() {}

  public close() {
    if (this.readyState === OfflineWebSocket.CLOSED) return;
    this.readyState = OfflineWebSocket.CLOSED;
    const ev = new Event('close');
    this.onclose?.(ev);
    this.dispatchEvent(ev);
  }
}

/**
 * A WebSocket driven entirely by the test: it records what the channel sends and delivers
 * incoming frames on demand, several in one synchronous burst if asked.
 *
 * That burst is the point. A gateway flushing a batch dispatches its frames back to back
 * within a single read, so a frame can be processed *before* the continuation that the
 * previous frame woke has had a chance to run. No live node reproduces that window on demand.
 */
class ScriptedWebSocket extends EventTarget {
  static CONNECTING = 0;

  static OPEN = 1;

  static CLOSING = 2;

  static CLOSED = 3;

  static current: ScriptedWebSocket;

  public readyState = ScriptedWebSocket.OPEN;

  public onopen: ((ev: Event) => void) | null = null;

  public onclose: ((ev: Event) => void) | null = null;

  public onerror: ((ev: Event) => void) | null = null;

  public onmessage: ((ev: Event) => void) | null = null;

  /** Every frame the channel has sent, already parsed. */
  public sent: any[] = [];

  constructor(_url: string) {
    super();
    ScriptedWebSocket.current = this;
  }

  public send(data: string) {
    this.sent.push(JSON.parse(data));
  }

  public close() {
    if (this.readyState === ScriptedWebSocket.CLOSED) return;
    this.readyState = ScriptedWebSocket.CLOSED;
    const ev = new Event('close');
    this.onclose?.(ev);
    this.dispatchEvent(ev);
  }

  /** Delivers frames back to back, without yielding to the microtask queue in between. */
  public deliver(...frames: object[]) {
    frames.forEach((frame) => {
      this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(frame) }));
    });
  }
}

/** Routes every channel built inside the calling describe through `OfflineWebSocket`. */
const useOfflineSocket = () => {
  beforeAll(() => {
    config.set('websocket', OfflineWebSocket as any);
  });

  afterAll(() => {
    config.set('websocket', undefined as any);
  });
};

describeIfWs('E2E WebSocket Tests', () => {
  /**
   * The chain the node under test actually serves.
   *
   * Asserting against a hardcoded `SN_SEPOLIA` pinned the whole suite to one network and made
   * every run on another one fail on the constant rather than on anything real. Reading it from
   * the RPC provider also makes the assertion stronger: it now checks that the WebSocket channel
   * and the HTTP channel agree on the chain, instead of checking a literal.
   */
  let expectedChainId: string;

  beforeAll(async () => {
    expectedChainId = await new Provider(getTestProvider()).getChainId();
  });

  describe('websocket specific endpoints', () => {
    // Updated for RPC 0.9: removed subscribePendingTransaction (not available in 0.9)
    // Added subscribeNewTransactionReceipts and subscribeNewTransactions (new in 0.9)
    // account provider
    const provider = new Provider(getTestProvider());
    const account = getTestAccount(provider);

    // websocket
    let webSocketChannel: WebSocketChannel;

    beforeEach(async () => {
      webSocketChannel = await openChannel({ nodeUrl: NODE_URL });
    });

    afterEach(async () => {
      if (webSocketChannel.isConnected()) {
        webSocketChannel.disconnect();
        await webSocketChannel.waitForDisconnection();
      }
    });

    test('should throw an error when sending on a disconnected socket', async () => {
      // This test uses its own channel to disable auto-reconnect and isolate the error behavior
      const testChannel = await openChannel({ nodeUrl: NODE_URL, autoReconnect: false });

      testChannel.disconnect();
      await testChannel.waitForDisconnection();

      // With autoReconnect: false, this should immediately throw, not queue.
      await expect(testChannel.subscribeNewHeads()).rejects.toThrow(
        'WebSocketChannel.send() failed due to socket being disconnected'
      );
    });

    test('should allow manual reconnection after a user-initiated disconnect', async () => {
      // The beforeEach channel is opened with autoReconnect disabled (see openChannel),
      // so a user-initiated disconnect leaves it closed until reconnect() is called.
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();

      expect(webSocketChannel.isConnected()).toBe(false);

      // Now, manually reconnect
      webSocketChannel.reconnect();
      await webSocketChannel.waitForConnection();
      expect(webSocketChannel.isConnected()).toBe(true);

      // To prove the connection is working, make a simple RPC call.
      // This avoids the flakiness of creating and tearing down a real subscription.
      const chainId = await webSocketChannel.sendReceive('starknet_chainId');
      expect(chainId).toBe(expectedChainId);
    });

    test('Test subscribeNewHeads', async () => {
      // type not required, here I just test type availability
      const sub: SubscriptionNewHeadsEvent = await webSocketChannel.subscribeNewHeads();
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
        expect(result).toHaveProperty('keys');
        if (i === 5) {
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });

      await webSocketChannel.waitForUnsubscription(sub.id);
    });

    test('Test subscribeEvents with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeEvents({
        finalityStatus: 'ACCEPTED_ON_L2',
      });
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('keys');
        if (i === 2) {
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });

      await webSocketChannel.waitForUnsubscription(sub.id);
    });

    test('Test subscribeNewTransactionReceipts', async () => {
      const sub = await webSocketChannel.subscribeNewTransactionReceipts();
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('execution_status');
        if (i === 2) {
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });

      await webSocketChannel.waitForUnsubscription(sub.id);
    });

    test('Test subscribeNewTransactionReceipts with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeNewTransactionReceipts({
        finalityStatus: ['ACCEPTED_ON_L2'],
      });
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('execution_status');
        if (i === 1) {
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });

      await webSocketChannel.waitForUnsubscription(sub.id);
    });

    test('Test subscribeNewTransactions', async () => {
      const sub = await webSocketChannel.subscribeNewTransactions();
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('nonce');
        if (i === 2) {
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });

      await webSocketChannel.waitForUnsubscription(sub.id);
    });

    test('Test subscribeNewTransactions with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeNewTransactions({
        finalityStatus: ['ACCEPTED_ON_L2'],
      });
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        expect(result).toHaveProperty('nonce');
        if (i === 1) {
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

      const sub = await webSocketChannel.subscribeTransactionStatus({
        transactionHash: transaction_hash,
      });
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        if (i >= 1) {
          // TODO: it should be 2 statuses received and ..., but juno do not report first one when sub., revisit after RPC 0.9
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });
      await webSocketChannel.waitForUnsubscription(sub.id);
    });
  });

  describe('websocket regular endpoints', () => {
    let webSocketChannel: WebSocketChannel;

    beforeAll(async () => {
      webSocketChannel = await openChannel({ nodeUrl: NODE_URL });
      expect(webSocketChannel.isConnected()).toBe(true);
    });

    afterAll(async () => {
      // `beforeAll` can fail to connect at all (per-IP rate limiting), leaving the channel
      // unassigned. Without this guard teardown throws a TypeError, which Jest reports as
      // "Test suite failed to run", hiding the connection error that actually caused it.
      if (!webSocketChannel) return;
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection().catch(() => undefined);
    });

    test('regular rpc endpoint', async () => {
      const response = await webSocketChannel.sendReceive('starknet_chainId');
      expect(response).toBe(expectedChainId);
    });
  });

  describe('WebSocketChannel Auto-Reconnection', () => {
    let webSocketChannel: WebSocketChannel;

    afterEach(async () => {
      // Ensure the channel is always disconnected after each test to prevent open handles.
      if (!webSocketChannel) return;

      // Unsubscribe first: a gateway that will not complete the closing handshake of a
      // still-subscribed socket leaves it in CLOSING for good, and that handle outlives the
      // whole run. Several tests here call `done()` from inside a subscription handler, so
      // nothing else drops them. Best-effort and bounded — teardown must not fail or stall
      // on a dead socket.
      const subs: Array<{ isClosed: boolean; unsubscribe: () => Promise<boolean> }> = Array.from(
        ((webSocketChannel as any).activeSubscriptions as Map<string, any>).values()
      );
      await withTimeout(
        Promise.all(subs.filter((s) => !s.isClosed).map((s) => s.unsubscribe().catch(() => false))),
        2000
      );

      webSocketChannel.disconnect();
      // Those same gateways can leave `waitForDisconnection()` hanging, so bound it: the next
      // test builds a fresh channel and the node reclaims the idle socket on its own. It also
      // rejects on the socket's `error` event, which some nodes (devnet among them) emit while
      // closing — a noisy shutdown must not fail the test that just ran.
      await withTimeout(
        webSocketChannel.waitForDisconnection().catch(() => undefined),
        3000
      );
    });

    test('should automatically reconnect on connection drop', (done) => {
      // Set a very short reconnection delay for faster tests
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let hasReconnected = false;
      webSocketChannel.on('open', () => {
        // This will be called once on initial connection, and a second time on reconnection.
        if (hasReconnected) {
          done(); // Test is successful if we get here
        } else {
          // This is the first connection, now we simulate the drop
          hasReconnected = true;
          simulateConnectionDrop(webSocketChannel);
        }
      });
    });

    test('sendReceive should time out if no response is received', async () => {
      webSocketChannel = await openChannel({
        nodeUrl: NODE_URL,
        requestTimeout: 100, // Set a short timeout for testing
      });

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
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let hasReconnected = false;
      webSocketChannel.on('open', () => {
        if (hasReconnected) {
          // Reconnected. The promise from the queued sendReceive will resolve now.
        } else {
          // 1. First connection, now simulate a drop
          hasReconnected = true;
          simulateConnectionDrop(webSocketChannel);

          // 2. Immediately try to send a request. It should be queued.
          webSocketChannel
            .sendReceive('starknet_chainId')
            .then((result) => {
              // 3. This assertion runs after reconnection, proving the queue was processed.
              expect(result).toBe(expectedChainId);
              done(); // 4. Test is done when the queued request has been successfully processed.
            })
            // Report the failure rather than leave `done()` uncalled: a queued request has no
            // timeout of its own, so the test would otherwise hang until Jest's global one
            // with no indication of what went wrong.
            .catch(done);
        }
      });
    });

    test('should queue subscribe requests when reconnecting and process them after', (done) => {
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let hasReconnected = false;
      webSocketChannel.on('open', () => {
        if (hasReconnected) {
          // Reconnected. The promise from the queued subscribeNewHeads will resolve now.
        } else {
          // 1. First connection, now simulate a drop
          hasReconnected = true;
          simulateConnectionDrop(webSocketChannel);

          // 2. Immediately try to subscribe. The request should be queued.
          webSocketChannel
            .subscribeNewHeads()
            .then((sub) => {
              // 3. This should only execute after reconnection.
              expect(sub).toBeInstanceOf(Subscription);
              expect(webSocketChannel.isConnected()).toBe(true);

              // 4. To prove it's a real subscription, wait for one event.
              sub.on((data) => {
                expect(data).toBeDefined();
                done();
              });
            })
            // See the note on the previous test.
            .catch(done);
        }
      });
    });

    test('should restore active subscriptions after an automatic reconnection', (done) => {
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let connectionCount = 0;

      const eventHandler = (data: any) => {
        // The handler is called. If this is after the reconnection (connectionCount > 1),
        // it proves the subscription was successfully restored.
        if (connectionCount > 1) {
          expect(data).toBeDefined();
          done();
        }
      };

      webSocketChannel.on('open', async () => {
        connectionCount += 1;
        if (connectionCount === 1) {
          try {
            // First connection: set up the subscription
            const sub = await webSocketChannel.subscribeNewHeads();
            sub.on(eventHandler);
            // Now, simulate a drop
            simulateConnectionDrop(webSocketChannel);
          } catch (error) {
            // This handler is `async`: an unobserved rejection would leave `done()` uncalled
            // and the test hanging until the global timeout instead of reporting the cause.
            done(error);
          }
        }
        // On the second 'open' event (connectionCount === 2), the test will implicitly
        // be waiting for the eventHandler to be called, which will resolve the test.
      });
    });
  });
});

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
