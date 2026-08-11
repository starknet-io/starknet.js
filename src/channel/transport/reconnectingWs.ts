import { logger } from '../../global/logger';
import type { JRPC } from '../../types/api';
import { WebSocketNotConnectedError } from '../../utils/errors';
import type { ReconnectOptions } from '../ws/ws_0_10';
import { WsTransport, type WsTransportOptions } from './ws';

export type ReconnectingWsTransportOptions = WsTransportOptions & {
  /** Reconnect automatically when the connection drops. Defaults to `true`. */
  autoReconnect?: boolean;
  reconnectOptions?: ReconnectOptions;
};

/**
 * A `WsTransport` that replaces its socket instead of dying with it.
 *
 * The policy here is the one `WebSocketChannel` has shipped since 10.6.8, relocated rather than
 * redesigned. In particular the split that makes reconnection safe is preserved exactly:
 *
 * - a request that was **never put on the wire** is queued and sent once the connection is back,
 *   which cannot duplicate anything because the node never saw it;
 * - a request that **was** on the wire is rejected by the base class when the socket closes, and
 *   never replayed — only the caller knows whether resending it is safe.
 *
 * Subscription restoration is not done here: the transport does not know what a subscription is.
 * It exposes `onReconnected`, awaited after the new connection opens and **before** the queue is
 * flushed, so a queued request cannot overtake the re-subscription it was queued behind.
 */
export class ReconnectingWsTransport extends WsTransport {
  private readonly autoReconnect: boolean;

  private readonly reconnectOptions: Required<ReconnectOptions>;

  private isReconnecting = false;

  private reconnectAttempts = 0;

  private userInitiatedClose = false;

  private reconnectTimeoutId: NodeJS.Timeout | null = null;

  /**
   * Fires once a connection has stayed open long enough to be considered stable, resetting the
   * attempt counter. A gateway that accepts then immediately drops never reaches it, so its
   * attempts keep accumulating toward the cap instead of resetting every cycle.
   */
  private reconnectStabilityTimeoutId: NodeJS.Timeout | null = null;

  /**
   * Requests made while no usable connection existed. They carry no timeout of their own — the
   * base class only arms one when a request reaches the wire — so the only ways out are being
   * sent after a reconnection, or being rejected here.
   */
  private requestQueue: Array<{
    body: JRPC.RequestBody | JRPC.RequestBody[];
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  /** Guards against one failed attempt arming two retries when both `error` and `close` arrive. */
  private attemptSettled = false;

  private reconnectedHooks = new Set<() => Promise<void>>();

  constructor(options: ReconnectingWsTransportOptions) {
    super(options);
    this.autoReconnect = options.autoReconnect ?? true;
    this.reconnectOptions = {
      retries: options.reconnectOptions?.retries ?? 5,
      delay: options.reconnectOptions?.delay ?? 2000,
      exponential: options.reconnectOptions?.exponential ?? true,
      stableConnectionThreshold: options.reconnectOptions?.stableConnectionThreshold ?? 5000,
    };
  }

  /**
   * Whether a request made right now would be held for a reconnection rather than sent.
   *
   * Exposed so the `WebSocketChannel` façade can reproduce the refusal its `send()` used to
   * raise: it refused only when nothing was going to pick the request up later.
   */
  public get queuesRequests(): boolean {
    return (
      this.isReconnecting || (!this.isConnected() && this.autoReconnect && !this.userInitiatedClose)
    );
  }

  /**
   * Registers work to run after a reconnection opens, before the request queue is flushed.
   * @returns the unregister function.
   */
  public onReconnected(hook: () => Promise<void>): () => void {
    this.reconnectedHooks.add(hook);
    return () => {
      this.reconnectedHooks.delete(hook);
    };
  }

  protected override onOpened(): void {
    // This socket won, so its eventual close is a fresh drop rather than this attempt failing.
    this.attemptSettled = true;
    const wasReconnecting = this.isReconnecting;
    this.isReconnecting = false;
    this.scheduleReconnectAttemptsReset();
    super.onOpened();
    if (wasReconnecting) {
      logger.info('WebSocket: Reconnection successful.');
      // Deliberately not awaited: this runs from a socket event handler, which has nowhere to
      // return a promise to. Failures inside are handled by `completeReconnection` itself.
      this.completeReconnection();
      return;
    }
    // A *first* open still has a queue to drain. `request` holds anything issued while the socket
    // was not yet usable, and that is the normal path for a caller who does not wait for the
    // connection — `WebSocketProvider.create()` probes the spec version as soon as the transport
    // exists. Restoration hooks are skipped here on purpose: nothing was subscribed yet.
    this.processRequestQueue();
  }

  protected override onClosed(): void {
    if (this.userInitiatedClose || !this.autoReconnect) {
      this.setState('closed');
      return;
    }
    if (this.isReconnecting) {
      // An attempt failed rather than a live connection dropping.
      this.scheduleRetry();
      return;
    }
    this.startReconnect();
  }

  protected override onError(): void {
    // A refused connection surfaces as `error`, as `close`, or as both: a browser emits `error`
    // then `close`, while a gateway turning the connection away may only close it. Arming from
    // whichever arrives first is what keeps the last case from deadlocking — the defect fixed in
    // 10.6.7. `attemptSettled` makes sure the two paths cannot start parallel loops.
    if (this.isConnected()) return;
    if (this.isReconnecting) this.scheduleRetry();
  }

  private startReconnect(): void {
    if (this.isReconnecting || !this.autoReconnect) return;
    // The connection that just dropped did not prove stable, so cancel any pending counter reset
    // and keep the accumulated attempts (bounds a flapping reconnect).
    this.clearStabilityTimer();
    this.isReconnecting = true;
    this.setState('reconnecting');
    this.tryReconnect();
  }

  private tryReconnect = (): void => {
    if (this.reconnectAttempts >= this.reconnectOptions.retries) {
      logger.error('WebSocket: Maximum reconnection retries reached. Giving up.');
      this.isReconnecting = false;
      this.setState('closed');
      this.rejectRequestQueue(
        `reconnection gave up after ${this.reconnectOptions.retries} attempts`
      );
      return;
    }

    this.reconnectAttempts += 1;
    logger.info(
      `WebSocket: Connection lost. Attempting to reconnect... (${this.reconnectAttempts}/${this.reconnectOptions.retries})`
    );
    this.attemptSettled = false;
    this.swapSocket(new this.WsImplementation(this.nodeUrl));
  };

  private scheduleRetry(): void {
    // `isReconnecting` is cleared both by `close()` and by the give-up branch; the close that
    // follows either must not arm a further attempt, or a timer outlives the transport.
    if (this.attemptSettled || !this.isReconnecting) return;
    this.attemptSettled = true;
    const delay = this.reconnectOptions.exponential
      ? this.reconnectOptions.delay * 2 ** (this.reconnectAttempts - 1)
      : this.reconnectOptions.delay;
    logger.info(`WebSocket: Reconnect attempt failed. Retrying in ${delay}ms.`);
    this.reconnectTimeoutId = setTimeout(this.tryReconnect, delay);
  }

  private scheduleReconnectAttemptsReset(): void {
    this.clearStabilityTimer();
    this.reconnectStabilityTimeoutId = setTimeout(() => {
      this.reconnectAttempts = 0;
      this.reconnectStabilityTimeoutId = null;
    }, this.reconnectOptions.stableConnectionThreshold);
  }

  private clearStabilityTimer(): void {
    if (!this.reconnectStabilityTimeoutId) return;
    clearTimeout(this.reconnectStabilityTimeoutId);
    this.reconnectStabilityTimeoutId = null;
  }

  private completeReconnection(): void {
    // Restoration first, queue second. A queued request must not overtake the re-subscription it
    // was queued behind.
    //
    // A hook that throws must not strand the queue: the requests waiting in it have nothing to
    // do with whatever failed to restore, and leaving them would hang every caller.
    Promise.all(Array.from(this.reconnectedHooks).map((hook) => hook()))
      .catch((error) => {
        logger.error(`WebSocket: a reconnection hook failed: ${error}`);
      })
      .then(() => this.processRequestQueue());
  }

  public request(body: JRPC.RequestBody): Promise<JRPC.ResponseBody>;
  public request(body: JRPC.RequestBody[]): Promise<JRPC.ResponseBody[]>;
  public async request(
    body: JRPC.RequestBody | JRPC.RequestBody[]
  ): Promise<JRPC.ResponseBody | JRPC.ResponseBody[]> {
    if (
      this.isReconnecting ||
      (!this.isConnected() && this.autoReconnect && !this.userInitiatedClose)
    ) {
      logger.info('WebSocket: Connection unavailable, queueing request.');
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ body, resolve, reject });
      });
    }
    return super.request(body as JRPC.RequestBody);
  }

  private processRequestQueue(): void {
    // Drain a detached snapshot. `request` re-queues synchronously when the connection is not
    // open (the socket dropped again mid-reconnect), so iterating in place would re-process
    // those items in the same pass — an unbounded synchronous loop allocating a Promise per
    // turn. Re-queued requests land in the fresh array instead and wait for the next cycle.
    const pending = this.requestQueue;
    this.requestQueue = [];
    logger.info(`WebSocket: Processing ${pending.length} queued requests.`);
    pending.forEach(({ body, resolve, reject }) => {
      this.request(body as JRPC.RequestBody)
        .then(resolve)
        .catch(reject);
    });
  }

  private rejectRequestQueue(reason: string): void {
    if (this.requestQueue.length === 0) return;
    // Detach before iterating, for the same reason as processRequestQueue.
    const pending = this.requestQueue;
    this.requestQueue = [];
    logger.info(`WebSocket: Rejecting ${pending.length} queued request(s). Reason: ${reason}.`);
    pending.forEach(({ body, reject }) => {
      const method = Array.isArray(body) ? 'batch' : body.method;
      reject(new WebSocketNotConnectedError(`Request ${method} was never sent: ${reason}`));
    });
  }

  /**
   * Manually opens a fresh connection, cancelling the effect of an earlier `close()`.
   *
   * Flagged as a reconnection so `onOpened` runs `completeReconnection()`: a manual reconnect owes
   * the caller exactly what an automatic one delivers — subscriptions restored first, then the
   * request queue flushed behind them. Without the flag the socket came back empty, which is the
   * React StrictMode path: mount, cleanup `close()`, remount `reconnect()`, subscriptions
   * silently lost.
   *
   * Reporting `'reconnecting'` rather than `'connecting'` is the honest label, and it keeps
   * `queuesRequests` true for the gap, so a request issued before the socket opens is queued
   * instead of refused.
   */
  public reconnect(): void {
    this.userInitiatedClose = false;
    this.attemptSettled = false;
    this.isReconnecting = true;
    this.setState('reconnecting');
    this.swapSocket(new this.WsImplementation(this.nodeUrl));
  }

  public override close(code?: number, reason?: string): void {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
    this.clearStabilityTimer();
    // Set before closing so the resulting `close` event does not arm a reconnection, and clear
    // the reconnection state too: left set, it would make every later request queue for a
    // reconnection that is no longer coming.
    this.userInitiatedClose = true;
    this.isReconnecting = false;
    this.rejectRequestQueue('the connection was closed by the user');
    super.close(code, reason);
  }
}
