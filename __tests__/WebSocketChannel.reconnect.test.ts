/* eslint-disable max-classes-per-file */
import { WebSocketChannel, WebSocketNotConnectedError, config } from '../src';

/**
 * Unit tests for the auto-reconnection state machine, using a mock WebSocket
 * implementation injected through `config.set('websocket', ...)`. No live node
 * is required.
 */
describe('Unit Test: WebSocketChannel auto-reconnection', () => {
  const wait = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  let originalLogLevel: ReturnType<typeof config.get>;

  beforeAll(() => {
    originalLogLevel = config.get('logLevel');
    config.set('logLevel', 'OFF');
  });

  afterEach(() => {
    config.set('websocket', undefined as any);
  });

  afterAll(() => {
    config.set('logLevel', originalLogLevel as any);
  });

  /** Counts how many sockets get created, to detect a runaway reconnection loop. */
  const makeMock = (behavior: 'flap' | 'stable') => {
    let created = 0;
    let current: any = null;
    class MockWS extends EventTarget {
      static CONNECTING = 0;

      static OPEN = 1;

      static CLOSING = 2;

      static CLOSED = 3;

      public readyState = 0;

      public onopen: ((ev: Event) => void) | null = null;

      public onclose: ((ev: Event) => void) | null = null;

      public onerror: ((ev: Event) => void) | null = null;

      public onmessage: ((ev: Event) => void) | null = null;

      private timers: NodeJS.Timeout[] = [];

      constructor(_url: string) {
        super();
        created += 1;
        current = this;
        this.timers.push(
          setTimeout(() => {
            if (this.readyState === 3) return; // closed before it could open
            this.readyState = 1;
            const ev = new Event('open');
            this.onopen?.(ev);
            this.dispatchEvent(ev);
            if (behavior === 'flap') {
              // Accept the connection then immediately drop it, as a rate-limiting
              // gateway does. This used to reset the retry counter every cycle and
              // reconnect forever.
              this.timers.push(setTimeout(() => this.emitClose(), 10));
            }
          }, 5)
        );
      }

      public send() {}

      public close() {
        this.emitClose();
      }

      public emitClose() {
        this.timers.forEach(clearTimeout);
        this.timers = [];
        if (this.readyState === 3) return;
        this.readyState = 3;
        const ev = new Event('close');
        this.onclose?.(ev);
        this.dispatchEvent(ev);
      }
    }
    return {
      MockWS,
      get created() {
        return created;
      },
      get current() {
        return current as InstanceType<typeof MockWS>;
      },
    };
  };

  test('bounds a flapping connection instead of reconnecting forever', async () => {
    const mock = makeMock('flap');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: {
        retries: 5,
        delay: 50,
        exponential: false,
        stableConnectionThreshold: 2000,
      },
    });
    await channel.waitForConnection().catch(() => undefined);

    await wait(3000);

    // 1 initial + at most `retries` reconnection attempts. Without the fix this
    // grows without bound (hundreds within a few seconds).
    expect(mock.created).toBeLessThanOrEqual(6);

    channel.disconnect();
  });

  test('reconnects across repeated drops once each connection proves stable', async () => {
    const mock = makeMock('stable');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: {
        retries: 3,
        delay: 30,
        exponential: false,
        stableConnectionThreshold: 300,
      },
    });
    await channel.waitForConnection();
    expect(channel.isConnected()).toBe(true);

    // Five drops, more than `retries`, each followed by a stable period. Each must
    // reconnect: the counter resets after the connection stays open past the threshold.
    for (let k = 0; k < 5; k += 1) {
      mock.current.emitClose();
      // eslint-disable-next-line no-await-in-loop
      await wait(500);
      expect(channel.isConnected()).toBe(true);
    }

    channel.disconnect();
  });

  test('draining the request queue while still disconnected does not loop forever', () => {
    // Regression: `_processRequestQueue` used to iterate `this.requestQueue` directly.
    // When the socket dropped again mid-reconnect, `sendReceive` re-queued each request
    // synchronously into that same array, so the loop never emptied it — an unbounded
    // synchronous loop that allocated until the process OOM-crashed. Here the channel is
    // held in the "reconnecting" state so every `sendReceive` re-queues, and a push
    // counter proves the loop stays bounded instead of running away.
    const mock = makeMock('stable');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({ nodeUrl: 'wss://mock' });
    const internal = channel as unknown as {
      requestQueue: Array<{
        method: string;
        params?: object;
        resolve: (v: any) => void;
        reject: (r?: any) => void;
      }>;
      isReconnecting: boolean;
      _processRequestQueue: () => void;
    };

    // Force the re-queue branch of sendReceive for the whole call.
    internal.isReconnecting = true;

    // Instrument the queue to count re-queues, and stop growing past a cap so a
    // non-terminating loop fails fast (via the assertion) instead of hanging the test.
    const queue: any[] = [];
    let requeueCount = 0;
    const CAP = 1000;
    queue.push = function push(...items: any[]) {
      requeueCount += 1;
      if (requeueCount > CAP) return queue.length; // stop feeding a runaway loop
      return Array.prototype.push.apply(this, items);
    };
    // Seed a single pending request without tripping the counter.
    Array.prototype.push.call(queue, {
      method: 'starknet_chainId',
      params: undefined,
      resolve: () => {},
      reject: () => {},
    });
    internal.requestQueue = queue;

    // eslint-disable-next-line no-underscore-dangle
    internal._processRequestQueue();

    // With the fix the seeded request is re-queued at most once (into the fresh, detached
    // queue), so the instrumented array sees no re-push. Without it, `requeueCount` blows
    // past the cap.
    expect(requeueCount).toBeLessThanOrEqual(1);
    // The request is deferred to the next reconnection cycle, not dropped.
    expect(internal.requestQueue.length).toBe(1);

    channel.disconnect();
  });

  /**
   * Mock that keeps its own listener registry and invokes listeners directly, so an
   * exception escaping a listener propagates out of `emitMessage()` and can be asserted
   * on synchronously. (A real WebSocket dispatches through `EventTarget`, which turns the
   * same escape into a process-level `uncaughtException` — unobservable from the caller,
   * which is exactly what made the original crash impossible to intercept.)
   */
  const makeMessageMock = () => {
    let current: any = null;
    class MockWS {
      static OPEN = 1;

      public readyState = 1;

      public onopen: ((ev: Event) => void) | null = null;

      public onclose: ((ev: Event) => void) | null = null;

      public onerror: ((ev: Event) => void) | null = null;

      private listeners: Record<string, ((ev: any) => void)[]> = {};

      constructor(_url: string) {
        current = this;
      }

      public addEventListener(type: string, listener: (ev: any) => void) {
        (this.listeners[type] ??= []).push(listener);
      }

      public removeEventListener(type: string, listener: (ev: any) => void) {
        this.listeners[type] = (this.listeners[type] ?? []).filter((l) => l !== listener);
      }

      public send() {}

      public close() {
        this.readyState = 3;
      }

      /** Invokes every registered message listener directly, in registration order. */
      public emitMessage(data: unknown) {
        [...(this.listeners.message ?? [])].forEach((l) => l({ data } as MessageEvent));
      }
    }
    return {
      MockWS,
      get current() {
        return current as InstanceType<typeof MockWS>;
      },
    };
  };

  test('a non-JSON frame does not escape the message listener; the request still times out', async () => {
    // Regression: `sendReceive`'s message listener parsed the frame with an unguarded
    // `JSON.parse`. A gateway pushing a plain-text body over the open socket made it throw
    // from inside the WebSocket event dispatch — not the promise chain — so no caller-side
    // try/catch could intercept it and the host process died on an uncaughtException.
    const mock = makeMessageMock();
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      autoReconnect: false,
      requestTimeout: 200,
    });

    const pending = channel.sendReceive('starknet_chainId');
    // Swallow the expected rejection now so the timeout below is never an unhandled one.
    const settled = pending.catch((e) => e);

    // The exact body an Alchemy gateway sends when its upstream node is unreachable.
    expect(() =>
      mock.current.emitMessage(
        'upstream connect error or disconnect/reset before headers. retried and the latest reset reason: connection timeout'
      )
    ).not.toThrow();

    // The malformed frame carries no request id, so it cannot settle the promise:
    // `requestTimeout` does.
    const error = await settled;
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('timed out after 200ms');
  });

  /**
   * Mock whose first socket connects, and whose every later socket fails to establish.
   * Reproduces a node that stops accepting connections: the channel reconnects, exhausts
   * its retries, and gives up.
   */
  const makeUnreachableAfterFirstMock = () => {
    let created = 0;
    let current: any = null;
    class MockWS extends EventTarget {
      static OPEN = 1;

      public readyState = 0;

      public onopen: ((ev: Event) => void) | null = null;

      public onclose: ((ev: Event) => void) | null = null;

      public onerror: ((ev: Event) => void) | null = null;

      constructor(_url: string) {
        super();
        created += 1;
        current = this;
        const isFirst = created === 1;
        setTimeout(() => {
          if (this.readyState === 3) return;
          if (isFirst) {
            this.readyState = 1;
            const ev = new Event('open');
            this.onopen?.(ev);
            this.dispatchEvent(ev);
          } else {
            // Every reconnection attempt is refused.
            this.readyState = 3;
            const ev = new Event('error');
            this.onerror?.(ev);
            this.dispatchEvent(ev);
          }
        }, 5);
      }

      public send() {}

      public close() {
        this.emitClose();
      }

      public emitClose() {
        if (this.readyState === 3) return;
        this.readyState = 3;
        const ev = new Event('close');
        this.onclose?.(ev);
        this.dispatchEvent(ev);
      }
    }
    return {
      MockWS,
      get current() {
        return current as InstanceType<typeof MockWS>;
      },
    };
  };

  test('rejects queued requests once reconnection gives up', async () => {
    // Regression: a request queued during a reconnection carries no timeout of its own —
    // `requestTimeout` is only armed once the request is actually sent. When reconnection
    // gave up, the queue was left untouched, so the promise stayed pending forever and no
    // caller-side timeout could rescue it. In CI this turned a few seconds of gateway
    // unavailability into a test hanging for the full 5-minute Jest timeout.
    const mock = makeUnreachableAfterFirstMock();
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: { retries: 2, delay: 20, exponential: false },
    });
    await channel.waitForConnection();

    // Drop the connection: the channel enters its reconnection cycle, which can never succeed.
    mock.current.emitClose();
    const pending = channel.sendReceive('starknet_chainId');

    await expect(pending).rejects.toThrow(WebSocketNotConnectedError);
    await expect(pending).rejects.toThrow(/never sent: reconnection gave up after 2 attempts/);

    channel.disconnect();
    // Explicit per-test timeout: the whole point of this test is that the promise settles.
    // Without it, a regression would hang for the suite-wide 5 minutes instead of failing.
  }, 10000);

  test('rejects queued requests when the user disconnects mid-reconnection', async () => {
    const mock = makeUnreachableAfterFirstMock();
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      // Long enough that the retries are still pending when disconnect() is called.
      reconnectOptions: { retries: 10, delay: 5000, exponential: false },
    });
    await channel.waitForConnection();

    mock.current.emitClose();
    const pending = channel.sendReceive('starknet_chainId');

    channel.disconnect();

    await expect(pending).rejects.toThrow(WebSocketNotConnectedError);
    await expect(pending).rejects.toThrow(/never sent: the connection was closed by the user/);

    // The reconnection flag must be cleared too, otherwise every later request would queue
    // for a reconnection that is no longer coming.
    expect((channel as unknown as { isReconnecting: boolean }).isReconnecting).toBe(false);
    // See the note on the previous test.
  }, 10000);

  test('a valid response arriving after a malformed frame still resolves the request', async () => {
    const mock = makeMessageMock();
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      autoReconnect: false,
      requestTimeout: 2000,
    });

    const pending = channel.sendReceive('starknet_chainId');

    mock.current.emitMessage('not json at all');
    mock.current.emitMessage(
      JSON.stringify({ jsonrpc: '2.0', id: 0, result: '0x534e5f5345504f4c4941' })
    );

    await expect(pending).resolves.toBe('0x534e5f5345504f4c4941');
  });
});
