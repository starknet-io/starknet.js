/* eslint-disable no-underscore-dangle */
import type { SUBSCRIPTION_ID } from '@starknet-io/starknet-types-08';
import { logger } from '../../global/logger';
import type { WebSocketChannel } from './ws_0_8';

/**
 * Represents a single WebSocket subscription.
 * It allows attaching event handlers and unsubscribing.
 */
export class Subscription {
  public readonly id: SUBSCRIPTION_ID;

  private readonly channel: WebSocketChannel;

  private listeners: Array<(result: any) => void> = [];

  private buffer: any[] = [];

  private isUnsubscribed = false;

  private readonly maxBufferSize: number;

  constructor(channel: WebSocketChannel, id: SUBSCRIPTION_ID, maxBufferSize: number) {
    this.channel = channel;
    this.id = id;
    this.maxBufferSize = maxBufferSize;
  }

  /**
   * Internal method to handle an incoming event from the WebSocketChannel.
   * It either calls the listeners or buffers the event if no listeners are attached.
   * @param result The event data
   * @internal
   */
  public _handleEvent(result: any) {
    if (this.isUnsubscribed) return;

    if (this.listeners.length > 0) {
      this.listeners.forEach((listener) => listener(result));
    } else {
      if (this.buffer.length >= this.maxBufferSize) {
        const droppedEvent = this.buffer.shift(); // Drop the oldest event
        logger.warn(`Subscription ${this.id}: Buffer full. Dropping oldest event:`, droppedEvent);
      }
      this.buffer.push(result);
    }
  }

  /**
   * Attaches a handler to be called for each event from this subscription.
   * @param handler A function that will receive the event `result` object.
   * @returns The Subscription object, allowing for chaining.
   */
  public on(handler: (result: any) => void) {
    if (this.isUnsubscribed) {
      throw new Error('Subscription has been unsubscribed.');
    }
    this.listeners.push(handler);
    // When a handler is attached for the first time, process the buffer
    if (this.buffer.length > 0) {
      this.buffer.forEach((bufferedResult) => handler(bufferedResult));
      this.buffer = []; // Clear buffer
    }
    return this; // Allow chaining
  }

  /**
   * Unsubscribes from the node and cleans up local resources.
   * @returns A promise that resolves to `true` if the unsubscription was successful.
   */
  public async unsubscribe(): Promise<boolean> {
    if (this.isUnsubscribed) return true;
    const success = await this.channel.unsubscribe(this.id);
    if (success) {
      this.isUnsubscribed = true;
      this.listeners = []; // Clear listeners
      this.buffer = []; // Clear buffer
      this.channel.removeSubscription(this.id); // Notify channel to remove it
    }
    return success;
  }
}
