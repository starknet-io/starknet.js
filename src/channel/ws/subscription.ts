/* eslint-disable no-underscore-dangle */
import type { SUBSCRIPTION_ID } from '@starknet-io/starknet-types-08';
import { logger } from '../../global/logger';
import type { WebSocketChannel } from './ws_0_8';
import { EventEmitter } from '../../utils/eventEmitter';

type SubscriptionEvents<T> = {
  event: T;
  error: Error;
  unsubscribe: void;
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
   */
  public id: SUBSCRIPTION_ID;

  private events = new EventEmitter<SubscriptionEvents<T>>();

  private buffer: T[] = [];

  private maxBufferSize: number;

  private handler: ((data: T) => void) | null = null;

  private _isClosed = false;

  /**
   * @internal
   * @param {WebSocketChannel} channel - The WebSocketChannel instance.
   * @param {string} method - The RPC method used for the subscription.
   * @param {any} params - The parameters for the subscription.
   * @param {SUBSCRIPTION_ID} id - The subscription ID.
   * @param {number} maxBufferSize - The maximum number of events to buffer.
   */
  constructor(
    channel: WebSocketChannel,
    method: string,
    params: object,
    id: SUBSCRIPTION_ID,
    maxBufferSize: number
  ) {
    this.channel = channel;
    this.method = method;
    this.params = params;
    this.id = id;
    this.maxBufferSize = maxBufferSize;
  }

  /**
   * Indicates if the subscription has been closed.
   * @returns {boolean} `true` if unsubscribed, `false` otherwise.
   */
  public get isClosed(): boolean {
    return this._isClosed;
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
        const droppedEvent = this.buffer.shift(); // Drop the oldest event
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
   */
  public on(handler: (data: T) => void): void {
    if (this.handler) {
      // To avoid complexity, we only allow one handler at a time.
      // Users can implement their own multi-handler logic if needed.
      throw new Error('A handler is already attached to this subscription.');
    }
    this.handler = handler;

    // Process buffer
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
    const success = await this.channel.unsubscribe(this.id);
    if (success) {
      this._isClosed = true;
      this.channel.removeSubscription(this.id);
      this.events.emit('unsubscribe', undefined);
      this.events.clear(); // Clean up all listeners
    }
    return success;
  }
}
