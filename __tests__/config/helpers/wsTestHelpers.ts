/* eslint-disable no-underscore-dangle, max-classes-per-file */
import { WebSocketChannel, config } from '../../../src';

/**
 * Fixtures shared by the WebSocket suites.
 *
 * They live here rather than in one test file because the suites split by what they demand of the
 * node — `WebSocketChannel.ws.test.ts` needs a live socket, `WebSocketChannel.test.ts` needs none —
 * while these fixtures serve both. Every comment below records why a fixture exists at all; none
 * of it is reconstructible from the code.
 */

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
export const simulateConnectionDrop = (channel: WebSocketChannel) => {
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
export const openChannel = async (
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
export const withTimeout = async (promise: Promise<unknown>, ms: number): Promise<void> => {
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
export class OfflineWebSocket extends EventTarget {
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
export class ScriptedWebSocket extends EventTarget {
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
export const useOfflineSocket = () => {
  beforeAll(() => {
    config.set('websocket', OfflineWebSocket as any);
  });

  afterAll(() => {
    config.set('websocket', undefined as any);
  });
};
