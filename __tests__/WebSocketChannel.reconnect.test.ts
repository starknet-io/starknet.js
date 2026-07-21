import { WebSocketChannel, config } from '../src';

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

      constructor(_url: string) {
        super();
        created += 1;
        current = this;
        setTimeout(() => {
          this.readyState = 1;
          const ev = new Event('open');
          this.onopen?.(ev);
          this.dispatchEvent(ev);
          if (behavior === 'flap') {
            // Accept the connection then immediately drop it, as a rate-limiting
            // gateway does. This used to reset the retry counter every cycle and
            // reconnect forever.
            setTimeout(() => this.emitClose(), 10);
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
});
