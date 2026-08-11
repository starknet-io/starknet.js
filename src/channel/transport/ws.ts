import { config } from '../../global/config';
import { logger } from '../../global/logger';
import type { JRPC } from '../../types/api';
import WebSocket from '../../utils/connect/ws';
import { TimeoutError, WebSocketNotConnectedError } from '../../utils/errors';
import { stringify } from '../../utils/json';
import { isObject, isString } from '../../utils/typed';
import type { WebSocketModule } from '../ws/ws_0_10';
import type { RpcTransport } from './types';

/**
 * Connection state, as observable by a UI.
 *
 * `'reconnecting'` is part of the union from the start even though this transport never enters
 * it: reconnection lands in a later lot, and a state added later would be a public type change.
 */
export type WsTransportState = 'connecting' | 'open' | 'reconnecting' | 'closed';

/**
 * A frame the node pushes without being asked: it carries a `method` and no `id`.
 *
 * The transport does not interpret it. It is the subscription channel, on the other side of
 * `on('notification', …)`, that knows what `params.subscription_id` refers to.
 */
export type RpcNotification = {
  jsonrpc: '2.0';
  method: string;
  params: Record<string, unknown>;
};

/**
 * What a caller can subscribe to on a transport.
 *
 * The four raw socket events are relayed from whichever socket is currently live, so a listener
 * survives a reconnection. Attaching to `transport.socket` directly does not: that object is
 * replaced.
 */
export type WsTransportEvents = {
  /** A connection state transition. */
  statechange: void;
  /** A frame the node pushed on its own. */
  notification: RpcNotification;
  open: Event;
  close: Event;
  error: Event;
  message: MessageEvent;
};

export type WsTransportOptions = {
  /** @example 'wss://starknet-sepolia.public.blastapi.io/rpc/v0_10' */
  nodeUrl: string;
  /** Custom WebSocket implementation. Falls back to `config.get('websocket')`, then the global. */
  websocket?: WebSocketModule;
  /** Milliseconds before an unanswered request rejects. Defaults to 60000. */
  requestTimeout?: number;
};

/**
 * Carries JSON-RPC envelopes over a single WebSocket.
 *
 * It owns the socket and nothing else: it does not know what `starknet_getBlockWithTxs` means,
 * and it does not know that subscriptions exist. That is what lets one socket serve several
 * versioned channels at once, and lets it survive the probe channel that `RpcProvider.create()`
 * builds and throws away.
 *
 * This transport connects once. When the connection goes away it settles everything waiting on
 * it and reports `'closed'`; it does not reconnect.
 *
 * **Batches depend on the node.** An array body is sent as a JSON-RPC batch, but not every node
 * accepts one over a WebSocket: starknet-devnet answers `-32700 Parse error` to an array on its
 * `/ws` endpoint, measured 2026-08-10. Batching and WebSocket are therefore not a combination to
 * rely on without checking the target node.
 */
export class WsTransport implements RpcTransport {
  /** The URL of the WebSocket RPC node. */
  public readonly nodeUrl: string;

  /**
   * The underlying socket. Owned by this transport — close it through `close()`.
   *
   * Not `readonly` because a subclass may replace it on a reconnection. This class never does:
   * one `WsTransport` is one socket, which is what its own tests rely on.
   */
  public socket: WebSocket;

  /** Kept so a subclass can build a replacement socket the same way this one was built. */
  protected readonly WsImplementation: WebSocketModule;

  private readonly requestTimeout: number;

  private state: WsTransportState = 'connecting';

  private listeners: { [K in keyof WsTransportEvents]: Set<(payload: any) => void> } = {
    statechange: new Set(),
    notification: new Set(),
    open: new Set(),
    close: new Set(),
    error: new Set(),
    message: new Set(),
  };

  /**
   * Resolves once the socket is open, rejects if the connection never comes up.
   *
   * Created on first use rather than in the constructor, so the constructor starts no
   * asynchronous work and a failed connection rejects inside a call the caller can wrap in
   * `try/catch` instead of becoming an unhandled rejection.
   */
  private ready?: Promise<void>;

  /** One entry per request on the wire, keyed by the id this transport put on it. */
  private pending = new Map<
    number,
    {
      /** Kept only so a failure can name the call the way the legacy channel did. */
      method: string;
      resolve: (reply: JRPC.ResponseBody) => void;
      reject: (error: Error) => void;
      timer: NodeJS.Timeout;
    }
  >();

  /**
   * Wire-level request counter.
   *
   * Owned here rather than by the channels: each channel starts numbering at 1, so two of them
   * sharing one socket would both emit `1` and get cross-matched replies — silently, and
   * non-deterministically.
   */
  private wireId = 0;

  constructor(options: WsTransportOptions) {
    this.nodeUrl = options.nodeUrl;
    this.requestTimeout = options.requestTimeout ?? 60000;

    this.WsImplementation = options.websocket || config.get('websocket') || WebSocket;
    this.socket = new this.WsImplementation(this.nodeUrl);
    if (this.socket.readyState === WebSocket.OPEN) this.state = 'open';

    this.attach(this.socket);
  }

  private attach(socket: WebSocket): void {
    socket.addEventListener('open', this.handleOpen);
    socket.addEventListener('message', this.handleMessage);
    socket.addEventListener('close', this.handleClose);
    socket.addEventListener('error', this.handleError);
  }

  private detach(socket: WebSocket): void {
    socket.removeEventListener('open', this.handleOpen);
    socket.removeEventListener('message', this.handleMessage);
    socket.removeEventListener('close', this.handleClose);
    socket.removeEventListener('error', this.handleError);
  }

  /**
   * Adopts a replacement socket.
   *
   * The readiness latch is discarded with the old socket: it records that *that* connection came
   * up, and reusing it would let a request be written to a socket still handshaking.
   *
   * Requests already on the wire are not settled here — `handleClose` has done that for the
   * socket that went away, since nothing on a dead socket can still be answered.
   */
  protected swapSocket(next: WebSocket): void {
    this.detach(this.socket);
    this.socket = next;
    this.ready = undefined;
    this.attach(next);
  }

  private handleOpen = (event: Event) => {
    this.onOpened();
    this.emit('open', event);
  };

  private handleClose = (event: Event) => {
    this.detach(this.socket);
    this.rejectPending('the connection was closed');
    this.onClosed(event);
    this.emit('close', event);
  };

  /**
   * What happens once a socket is open. Overridden by a reconnecting subclass, which also has a
   * retry counter to reset and a queue to flush.
   */
  protected onOpened(): void {
    this.setState('open');
  }

  /**
   * What happens once a socket is gone. This class stays closed; a reconnecting subclass starts
   * an attempt instead.
   */
  protected onClosed(_event: Event): void {
    this.setState('closed');
  }

  private handleMessage = (event: MessageEvent) => {
    if (!isString(event.data)) {
      logger.warn('WsTransport: received non-string message data:', event.data);
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(event.data);
    } catch (error) {
      // Skipped rather than thrown: the frame carries no usable id, so it cannot be
      // attributed to a pending request, and throwing here would escape the socket's event
      // dispatch rather than any promise chain — an uncaught exception that kills the
      // process. The request is still ended by its timeout.
      logger.error(`WsTransport: error parsing incoming message: ${event.data}, Error: ${error}`);
      return;
    }
    // A batch reply arrives as a single array frame; everything else arrives alone.
    const frames = Array.isArray(parsed) ? parsed : [parsed];
    frames.forEach((frame) => this.dispatch(frame));
    // Relayed last, as the legacy channel does: a subscriber to the raw stream sees a frame
    // only after whoever was waiting for it has been served.
    this.emit('message', event);
  };

  /** Routes one inbound frame: a reply to the request waiting for it, or a notification. */
  private dispatch(frame: any): void {
    if (isObject(frame) && 'id' in frame) {
      const waiter = this.pending.get((frame as any).id);
      if (!waiter) {
        // A node that could not even parse what it was sent answers `id: null`, so the failure
        // is attributable to no particular request and every one of them will run out its
        // timeout. Logged at error level so the cause is visible rather than showing up as an
        // unexplained wait. Not rejected wholesale: on a shared socket that would fail requests
        // the node never complained about, and a wrong answer is worse than a slow one.
        if ('error' in frame) {
          logger.error(
            `WsTransport: node rejected a frame outright: ${stringify((frame as any).error)}`
          );
          return;
        }
        logger.warn(`WsTransport: reply for unknown request id ${(frame as any).id}, dropped.`);
        return;
      }
      this.pending.delete((frame as any).id);
      clearTimeout(waiter.timer);
      waiter.resolve(frame as JRPC.ResponseBody);
      return;
    }
    if (isObject(frame) && 'method' in frame) {
      this.emit('notification', frame as RpcNotification);
      return;
    }
    logger.warn('WsTransport: frame is neither a reply nor a notification, dropped.');
  }

  private handleError = (event: Event) => {
    // An `error` on an already open socket does not necessarily close it, so the state is left
    // to `close`. Logged rather than thrown: nothing here is attributable to a caller.
    logger.warn(`WsTransport: socket error on ${this.nodeUrl}: ${event.type}`);
    this.onError(event);
    this.emit('error', event);
  };

  /**
   * What happens on a socket error. This class only logs; a reconnecting subclass treats it as a
   * failed attempt, because a refused connection may produce an `error` with no `close` behind it.
   */
  protected onError(_event: Event): void {}

  protected setState(next: WsTransportState): void {
    if (this.state === next) return;
    this.state = next;
    this.emit('statechange', undefined);
  }

  private emit<K extends keyof WsTransportEvents>(event: K, payload: WsTransportEvents[K]): void {
    this.listeners[event].forEach((listener) => listener(payload));
  }

  /** The current connection state. The `getSnapshot` half of the `useSyncExternalStore` pair. */
  public getState(): WsTransportState {
    return this.state;
  }

  /** Whether the socket is open right now. */
  public isConnected(): boolean {
    return this.socket.readyState === WebSocket.OPEN;
  }

  /**
   * Allocates the next wire id, starting at 0.
   *
   * Exposed because a caller may write to the socket itself rather than through `request` —
   * `WebSocketChannel.send()` is fire-and-forget and correlates nothing. Drawing from this same
   * sequence is what stops such a write from colliding with a request this transport is
   * tracking, which would hand one caller the other's reply.
   */
  public allocateRequestId(): number {
    const id = this.wireId;
    this.wireId += 1;
    return id;
  }

  /**
   * Subscribes to one of the transport's two streams.
   *
   * `'statechange'` fires on every connection state transition; `'notification'` fires for
   * every frame the node pushes on its own.
   *
   * @returns the unsubscribe function, which is what `useSyncExternalStore` requires of its
   * `subscribe` argument.
   */
  public on<K extends keyof WsTransportEvents>(
    event: K,
    listener: (payload: WsTransportEvents[K]) => void
  ): () => void {
    const listeners = this.listeners[event];
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  /**
   * Waits for the socket to be usable.
   *
   * A refused connection surfaces as `error`, as `close`, or as both: a browser emits `error`
   * then `close`, while a gateway turning the connection away may only close it. Settling on
   * whichever arrives first is what keeps that last case from hanging until `requestTimeout`.
   *
   * Registered as listeners rather than assigned to `onopen` / `onerror`, so nothing the
   * socket's owner installed gets clobbered.
   */
  private ensureReady(): Promise<void> {
    this.ready ??= new Promise<void>((resolve, reject) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }
      // Already gone: no `open`, `error` or `close` will ever fire on this socket again, so
      // waiting for one would hang forever rather than surface an error.
      if (
        this.socket.readyState === WebSocket.CLOSING ||
        this.socket.readyState === WebSocket.CLOSED
      ) {
        reject(
          new WebSocketNotConnectedError(
            `WebSocket connection to ${this.nodeUrl} is already closed`
          )
        );
        return;
      }
      /* eslint-disable @typescript-eslint/no-use-before-define --
         `detach` and the handlers it removes are mutually recursive; every name it reads is
         defined by the time it can run. */
      const detach = () => {
        this.socket.removeEventListener('open', onOpen);
        this.socket.removeEventListener('error', onFailure);
        this.socket.removeEventListener('close', onFailure);
      };
      /* eslint-enable @typescript-eslint/no-use-before-define */
      const onOpen = () => {
        detach();
        resolve();
      };
      const onFailure = () => {
        detach();
        reject(
          new WebSocketNotConnectedError(
            `WebSocket connection to ${this.nodeUrl} was not established`
          )
        );
      };
      this.socket.addEventListener('open', onOpen);
      this.socket.addEventListener('error', onFailure);
      this.socket.addEventListener('close', onFailure);
    });
    return this.ready;
  }

  public request(body: JRPC.RequestBody): Promise<JRPC.ResponseBody>;
  public request(body: JRPC.RequestBody[]): Promise<JRPC.ResponseBody[]>;
  public async request(
    body: JRPC.RequestBody | JRPC.RequestBody[]
  ): Promise<JRPC.ResponseBody | JRPC.ResponseBody[]> {
    // Awaited only when the socket is not usable yet. When it already is, the frame must go out
    // in this same tick: a reply dispatched synchronously right after the call — which a socket
    // stand-in in the test suite does — would otherwise arrive before the request was
    // registered, and be dropped as belonging to no one.
    if (!this.isConnected()) await this.ensureReady();
    if (!this.isConnected()) {
      throw new WebSocketNotConnectedError(`WebSocket to ${this.nodeUrl} is not open`);
    }

    const isBatch = Array.isArray(body);
    const entries = isBatch ? body : [body];

    // The caller's id goes back on the reply — `BatchClient` correlates on it — while the wire
    // carries this transport's own numbering.
    const callerIds = new Map<number, JRPC.RequestBody['id']>();
    const wireEntries = entries.map((entry) => {
      const wireId = this.allocateRequestId();
      callerIds.set(wireId, entry.id);
      return { ...entry, id: wireId };
    });

    const replies = wireEntries.map((entry) => this.expect(entry.id, entry.method));

    try {
      this.socket.send(stringify(isBatch ? wireEntries : wireEntries[0]));
    } catch (error) {
      // Rejected rather than rethrown: `Promise.all` below is already watching these, so
      // surfacing the failure through them settles every entry and leaves none unhandled.
      wireEntries.forEach((entry) =>
        this.settle(
          entry.id,
          new WebSocketNotConnectedError(`Request ${entry.method} could not be sent: ${error}`)
        )
      );
    }

    const settled = await Promise.all(replies);
    const restored = settled.map(
      (reply) => ({ ...reply, id: callerIds.get(reply.id as number) }) as JRPC.ResponseBody
    );
    return isBatch ? restored : restored[0];
  }

  /** Registers a slot for one wire id and hands back the promise that settles when answered. */
  private expect(id: number, method: string): Promise<JRPC.ResponseBody> {
    return new Promise<JRPC.ResponseBody>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(
          new TimeoutError(`Request ${method} (id: ${id}) timed out after ${this.requestTimeout}ms`)
        );
      }, this.requestTimeout);
      this.pending.set(id, { method, resolve, reject, timer });
    });
  }

  /** Fails one pending request by wire id. */
  private settle(id: number, error: Error): void {
    const waiter = this.pending.get(id);
    if (!waiter) return;
    this.pending.delete(id);
    clearTimeout(waiter.timer);
    waiter.reject(error);
  }

  /**
   * Fails every request still on the wire.
   *
   * Their only other exit is the `requestTimeout` timer, so without this the caller waits the
   * whole timeout — 60s by default — for a reply that can no longer arrive, and that pending
   * timer keeps the Node event loop alive for just as long.
   */
  protected rejectPending(reason: string): void {
    if (this.pending.size === 0) return;
    const waiting = Array.from(this.pending.entries());
    this.pending.clear();
    logger.info(
      `WsTransport: rejecting ${waiting.length} in-flight request(s). Reason: ${reason}.`
    );
    waiting.forEach(([id, { method, reject, timer }]) => {
      clearTimeout(timer);
      reject(
        new WebSocketNotConnectedError(`Request ${method} (id: ${id}) went unanswered: ${reason}`)
      );
    });
  }

  /**
   * Closes the socket.
   *
   * One object owns the socket and one object closes it. Dropping every reference to this
   * transport does not close anything: an open socket is a libuv handle the Node event loop
   * holds onto, so it must be closed explicitly.
   */
  public close(code?: number, reason?: string): void {
    this.rejectPending('the connection was closed by the user');
    this.setState('closed');
    this.socket.close(code, reason);
  }
}
