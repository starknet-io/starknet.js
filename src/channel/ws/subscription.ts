/* eslint-disable no-underscore-dangle */
import type { SUBSCRIPTION_ID } from '../../types/api';
import { logger } from '../../global/logger';
import type { WebSocketChannel } from './ws_0_10';
import { EventEmitter } from '../../utils/eventEmitter';

type SubscriptionEvents<T> = {
  event: T;
  error: Error;
  unsubscribe: void;
};

/**
 * Options for creating a new Subscription instance
 */
export type SubscriptionOptions = {
  /** The containing WebSocketChannel instance */
  channel: WebSocketChannel;
  /** The JSON-RPC method used to create this subscription */
  method: string;
  /** The parameters used to create this subscription (optional, defaults to empty object) */
  params?: object;
  /** The unique identifier for this subscription */
  id: SUBSCRIPTION_ID;
  /** The maximum number of events to buffer */
  maxBufferSize: number;
};

/**
 * Represents an active WebSocket subscription.
 *
 * This class should not be instantiated directly. It is returned by the
 * `subscribe` methods on the `WebSocketChannel`.
 *
 * @template T - The type of data expected from the subscription event.
 * @example
 * ```typescript
 * const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
 * await channel.waitForConnection();
 *
 * // The 'sub' object is an instance of the Subscription class.
 * const sub = await channel.subscribeNewHeads();
 *
 * sub.on((data) => {
 *   console.log('Received new head:', data);
 * });
 *
 * // ... later
 * await sub.unsubscribe();
 * ```
 */
export class Subscription<T = any> {
  /**
   * The containing `WebSocketChannel` instance.
   * @internal
   */
  public channel: WebSocketChannel;

  /**
   * The JSON-RPC method used to create this subscription.
   * @internal
   */
  public method: string;

  /**
   * The parameters used to create this subscription.
   * @internal
   */
  public params: any;

  /**
   * The unique identifier for this subscription.
   * @internal
   */
  public id: SUBSCRIPTION_ID;

  private events = new EventEmitter<SubscriptionEvents<T>>();

  private buffer: T[] = [];

  private maxBufferSize: number;

  private handler: ((data: T) => void) | null = null;

  private _isClosed = false;

  // The unsubscribe request currently on the wire, shared by concurrent callers.
  private pendingUnsubscribe: Promise<boolean> | null = null;

  /**
   * @internal
   * @param options - Subscription configuration options
   */
  constructor(options: SubscriptionOptions) {
    this.channel = options.channel;
    this.method = options.method;
    this.params = options.params ?? {};
    this.id = options.id;
    this.maxBufferSize = options.maxBufferSize;
  }

  /**
   * Indicates if the subscription has been closed.
   * @returns {boolean} `true` if unsubscribed, `false` otherwise.
   */
  public get isClosed(): boolean {
    return this._isClosed;
  }

  /**
   * Closes the subscription locally, without contacting the node.
   *
   * Used when the channel knows the subscription is gone and cannot be recovered — a
   * re-subscribe refused after a reconnection, for instance. Without it the object would keep
   * reporting itself as open while no event could ever reach its handler again.
   * @internal
   */
  public _markClosed(): void {
    if (this._isClosed) return;
    this._isClosed = true;
    this.events.emit('unsubscribe', undefined);
    this.events.clear();
  }

  /**
   * Internal method to handle incoming events from the WebSocket channel.
   * If a handler is attached, it's invoked immediately. Otherwise, the event is buffered.
   * @internal
   * @param {T} data - The event data.
   */
  public _handleEvent(data: T): void {
    if (this.handler) {
      this.handler(data);
    } else {
      if (this.buffer.length >= this.maxBufferSize) {
        const droppedEvent = this.buffer.shift(); // Drop the oldest event.
        logger.warn(`Subscription ${this.id}: Buffer full. Dropping oldest event:`, droppedEvent);
      }
      this.buffer.push(data);
    }
  }

  /**
   * Attaches a handler function to be called for each event.
   *
   * When a handler is attached, any buffered events will be passed to it sequentially.
   * Subsequent events will be passed directly as they arrive.
   *
   * @param {(data: T) => void} handler - The function to call with event data.
   * @throws {Error} If a handler is already attached to this subscription.
   */
  public on(handler: (data: T) => void): void {
    if (this.handler) {
      // To avoid complexity, we only allow one handler at a time.
      // Users can implement their own multi-handler logic if needed.
      throw new Error('A handler is already attached to this subscription.');
    }
    this.handler = handler;

    // Process the buffer.
    while (this.buffer.length > 0) {
      const event = this.buffer.shift();
      if (event) {
        this.handler(event);
      }
    }
  }

  /**
   * Sends an unsubscribe request to the node and cleans up local resources.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the unsubscription was successful.
   */
  public async unsubscribe(): Promise<boolean> {
    if (this._isClosed) {
      return true; // Already unsubscribed, treat as success.
    }
    // Concurrent callers share the request already on the wire. The `_isClosed` guard above
    // only closes once the round-trip completes, so without this a caller arriving before the
    // reply passes it too and sends a second `starknet_unsubscribe`. That happens for real
    // whenever a node pushes several events in one burst and the handler unsubscribes on each:
    // the node answers the first request and ignores the rest, leaving them on the wire until
    // the connection closes — at which point they settle as unhandled rejections.
    if (this.pendingUnsubscribe) {
      return this.pendingUnsubscribe;
    }

    this.pendingUnsubscribe = (async () => {
      try {
        const success = await this.channel.unsubscribe(this.id);
        if (success) {
          this._isClosed = true;
          this.channel.removeSubscription(this.id);
          this.events.emit('unsubscribe', undefined);
          this.events.clear(); // Clean up all listeners.
        }
        return success;
      } finally {
        // Released so a failed attempt can be retried; after a successful one the `_isClosed`
        // guard short-circuits before ever reaching here again.
        this.pendingUnsubscribe = null;
      }
    })();

    return this.pendingUnsubscribe;
  }
}
