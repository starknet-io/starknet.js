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

  /**
   * Report how `promise` settled, or `'pending'` if it had not within `ms`. The losing timer
   * is cleared either way: an un-cleared one outlives the test and keeps Jest from exiting.
   */
  const outcomeWithin = (promise: Promise<unknown>, ms: number): Promise<string> => {
    let timer: NodeJS.Timeout | undefined;
    return Promise.race([
      promise.then(() => 'resolved').catch(() => 'rejected'),
      new Promise<string>((resolve) => {
        timer = setTimeout(() => resolve('pending'), ms);
      }),
    ]).finally(() => clearTimeout(timer));
  };

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

  /**
   * A mock WebSocket whose behaviour on connect is chosen per test:
   * - `stable` — connects and stays open.
   * - `flap` — connects, then drops 10ms later, as a rate-limiting gateway does.
   * - `error-after-first` — the first socket connects, every later one fails with `error`.
   * - `refuse-after-first` — same, but the refusal is a bare `close` with no `error` first.
   *
   * `created` counts the sockets opened, which is how a runaway reconnection loop is detected.
   */
  type SocketBehavior = 'stable' | 'flap' | 'error-after-first' | 'refuse-after-first';

  const makeMock = (behavior: SocketBehavior) => {
    let created = 0;
    let current: any = null;

    class MockWS extends EventTarget {
      static CONNECTING = 0;

      static OPEN = 1;

      static CLOSING = 2;

      static CLOSED = 3;

      public readyState = MockWS.CONNECTING;

      public onopen: ((ev: Event) => void) | null = null;

      public onclose: ((ev: Event) => void) | null = null;

      public onerror: ((ev: Event) => void) | null = null;

      public onmessage: ((ev: Event) => void) | null = null;

      private timers: NodeJS.Timeout[] = [];

      constructor(_url: string) {
        super();
        created += 1;
        current = this;
        const isFirst = created === 1;
        this.timers.push(
          setTimeout(() => {
            if (this.readyState === MockWS.CLOSED) return; // closed before it could open
            if (!isFirst && behavior === 'error-after-first') {
              this.readyState = MockWS.CLOSED;
              this.emit('error');
              return;
            }
            if (!isFirst && behavior === 'refuse-after-first') {
              this.emitClose();
              return;
            }
            this.readyState = MockWS.OPEN;
            this.emit('open');
            if (behavior === 'flap') {
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
        if (this.readyState === MockWS.CLOSED) return;
        this.readyState = MockWS.CLOSED;
        this.emit('close');
      }

      /** Fires both the `on*` property and the listeners, as a real WebSocket does. */
      private emit(type: 'open' | 'close' | 'error') {
        const ev = new Event(type);
        const handlers = { open: this.onopen, close: this.onclose, error: this.onerror };
        handlers[type]?.(ev);
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

    // 1 initial socket + at most `retries` reconnection attempts. A gateway that accepts then
    // immediately drops must not reset the retry counter on every cycle: that reconnects
    // forever, opening hundreds of sockets within a few seconds.
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

    // Five drops, more than `retries`, each followed by a stable period. Each must reconnect:
    // the counter resets after the connection stays open past the threshold.
    for (let k = 0; k < 5; k += 1) {
      mock.current.emitClose();
      // eslint-disable-next-line no-await-in-loop
      await wait(500);
      expect(channel.isConnected()).toBe(true);
    }

    channel.disconnect();
  });

  test('draining the request queue while still disconnected does not loop forever', () => {
    // The channel is held in the "reconnecting" state, so every `sendReceive` re-queues. A
    // `processRequestQueue` iterating its own array in place would therefore never empty it —
    // an unbounded synchronous loop allocating a Promise per turn until the process OOMs. The
    // push counter proves the loop stays bounded.
    const mock = makeMock('stable');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({ nodeUrl: 'wss://mock' });
    // The queue and the reconnection flag live on the transport the façade delegates to. Its
    // entries carry the JSON-RPC body rather than a method name: a batch has no single method.
    const internal = (channel as any).transport as {
      requestQueue: Array<{
        body: { id: number | string; jsonrpc: '2.0'; method: string; params?: object };
        resolve: (v: any) => void;
        reject: (r?: any) => void;
      }>;
      isReconnecting: boolean;
      processRequestQueue: () => void;
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
      body: { id: 0, jsonrpc: '2.0', method: 'starknet_chainId' },
      resolve: () => {},
      reject: () => {},
    });
    internal.requestQueue = queue;

    internal.processRequestQueue();

    // The seeded request is re-queued at most once, into the fresh detached queue, so the
    // instrumented array sees no re-push.
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
    // An unguarded `JSON.parse` on the frame throws from inside the WebSocket event dispatch
    // rather than the promise chain, so no caller-side try/catch can intercept it and the host
    // process dies on an uncaughtException.
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

    channel.disconnect();
  });

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

    channel.disconnect();
  });

  test('rejects queued requests once reconnection gives up', async () => {
    // A queued request carries no timeout of its own — `requestTimeout` is armed only once it
    // is actually sent. If the give-up path left the queue untouched, the promise would stay
    // pending forever and no caller-side timeout could rescue it: in CI a few seconds of
    // gateway unavailability became a test hanging for the full 5-minute Jest timeout.
    const mock = makeMock('error-after-first');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: { retries: 2, delay: 20, exponential: false },
    });
    await channel.waitForConnection();

    // Drop the connection: the channel enters a reconnection cycle that can never succeed.
    mock.current.emitClose();
    const pending = channel.sendReceive('starknet_chainId');

    await expect(pending).rejects.toThrow(WebSocketNotConnectedError);
    await expect(pending).rejects.toThrow(/never sent: reconnection gave up after 2 attempts/);

    channel.disconnect();
    // Explicit per-test timeout: the whole point is that the promise settles. Without it, a
    // regression would hang for the suite-wide 5 minutes instead of failing.
  }, 10000);

  test('rejects queued requests when the user disconnects mid-reconnection', async () => {
    const mock = makeMock('error-after-first');
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
    expect((channel as any).transport.isReconnecting).toBe(false);
    // See the note on the previous test.
  }, 10000);

  test('settles an in-flight request when the user disconnects', async () => {
    // A request already on the wire lives entirely inside the `sendReceive` closure — a timer
    // plus two socket listeners, unreachable from outside. A clean close emits `close`, not
    // `error`, so neither handler fires and the timer runs its full 60s default, holding the
    // Node event loop open and leaving the caller's promise pending all that time.
    const mock = makeMock('stable');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({ nodeUrl: 'wss://mock' });
    await channel.waitForConnection();

    // Goes on the wire rather than into the queue: the socket is open. The mock's `send()`
    // is a no-op, so no reply will ever come back.
    const pending = channel.sendReceive('starknet_chainId');

    channel.disconnect();

    await expect(outcomeWithin(pending, 1000)).resolves.toBe('rejected');
  });

  test('settles an in-flight request when the connection drops', async () => {
    // Same trapped request, but on a drop the channel did not own: `disconnect()` is never
    // called, so the close path itself has to settle it.
    const mock = makeMock('stable');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: { retries: 2, delay: 20, exponential: false },
    });
    await channel.waitForConnection();

    const pending = channel.sendReceive('starknet_chainId');
    mock.current.emitClose();

    await expect(outcomeWithin(pending, 1000)).resolves.toBe('rejected');
    await expect(pending).rejects.toThrow(WebSocketNotConnectedError);

    channel.disconnect();
  });

  test('settles a queued request when a reconnection attempt is refused without an error event', async () => {
    // A rate-limiting gateway refuses a new connection by closing the socket, without
    // necessarily emitting `error` first. A `tryReconnect` arming its retry only from `onerror`
    // never reschedules; the `close` that did arrive returns early from `_startReconnect`
    // because `isReconnecting` is still true. No further attempt is made, `reconnectAttempts`
    // never reaches `retries`, and the give-up branch that rejects the queue stays unreachable.
    const mock = makeMock('refuse-after-first');
    config.set('websocket', mock.MockWS as any);

    const channel = new WebSocketChannel({
      nodeUrl: 'wss://mock',
      reconnectOptions: {
        retries: 3,
        delay: 20,
        exponential: false,
        stableConnectionThreshold: 100,
      },
    });
    await channel.waitForConnection();

    // Drop the live connection. Every reconnection attempt from here on is refused.
    mock.current.emitClose();

    // Queued, because the channel is now in the reconnecting state.
    const pending = channel.sendReceive('starknet_chainId');

    // Three retries of 20ms plus the give-up rejection land well inside 2s.
    await expect(outcomeWithin(pending, 2000)).resolves.toBe('rejected');

    channel.disconnect();
  });
});
