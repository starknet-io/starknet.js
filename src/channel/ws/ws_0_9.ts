/* eslint-disable no-underscore-dangle */
import {
  JRPC,
  StarknetEventsEvent,
  NewHeadsEvent,
  TransactionsStatusEvent,
  NewTransactionReceiptsEvent,
  TXN_STATUS_WITHOUT_L1,
  NewTransactionEvent,
  SUBSCRIPTION_ID,
  TXN_FINALITY_STATUS,
  STATUS_ACCEPTED_ON_L1,
} from '../../types/api'; // Default exported RPC 0.9 Types

import { BigNumberish, SubscriptionBlockIdentifier } from '../../types';
import { WebSocketEvent } from '../../types/api/jsonrpc';
import { EventEmitter } from '../../utils/eventEmitter';
import { TimeoutError, WebSocketNotConnectedError } from '../../utils/errors';
import WebSocket from '../../utils/connect/ws';
import { stringify } from '../../utils/json';
import { isString, isObject } from '../../utils/typed';
import { bigNumberishArrayToHexadecimalStringArray, toHex } from '../../utils/num';
import { Block } from '../../utils/provider';
import { config } from '../../global/config';
import { logger } from '../../global/logger';
import { Subscription } from './subscription';

// Subscription parameter interfaces for object-based API
export interface SubscribeNewHeadsParams {
  blockIdentifier?: SubscriptionBlockIdentifier;
}

export interface SubscribeEventsParams {
  fromAddress?: BigNumberish;
  keys?: string[][];
  blockIdentifier?: SubscriptionBlockIdentifier;
  finalityStatus?: Exclude<TXN_FINALITY_STATUS, STATUS_ACCEPTED_ON_L1>;
}

export interface SubscribeTransactionStatusParams {
  transactionHash: BigNumberish;
  blockIdentifier?: SubscriptionBlockIdentifier;
}

export interface SubscribeNewTransactionReceiptsParams {
  finalityStatus?: Exclude<TXN_FINALITY_STATUS, STATUS_ACCEPTED_ON_L1>[];
  senderAddress?: BigNumberish[];
}

export interface SubscribeNewTransactionsParams {
  finalityStatus?: TXN_STATUS_WITHOUT_L1[];
  senderAddress?: BigNumberish[];
}

/**
 * Options for configuring the automatic reconnection behavior of the WebSocketChannel.
 */
export type ReconnectOptions = {
  /**
   * The number of retries to attempt before giving up.
   * @default 5
   */
  retries?: number;
  /**
   * The initial delay in milliseconds before the first retry.
   * This delay will be doubled for each subsequent retry (exponential backoff).
   * @default 2000
   */
  delay?: number;
};

/**
 * The type of the WebSocket implementation.
 */
export type WebSocketModule = { new (nodeUrl: WebSocketOptions['nodeUrl']): WebSocket };

/**
 * Options for configuring the WebSocketChannel.
 */
export type WebSocketOptions = {
  /**
   * The URL of the WebSocket endpoint of the Starknet node.
   * @example 'ws://localhost:9545'
   */
  nodeUrl: string;
  /**
   * This parameter can be used to provide a custom WebSocket implementation.
   * This is useful in environments where the global WebSocket object is not available (e.g., Node.js).
   * @example
   * ```typescript
   * import WebSocket from 'ws';
   * const channel = new WebSocketChannel({ nodeUrl: '...', websocket: WebSocket });
   * ```
   */
  websocket?: WebSocketModule;
  /**
   * The maximum number of events to buffer per subscription when no handler is attached.
   * @default 1000
   */
  maxBufferSize?: number;
  /**
   * Whether to automatically reconnect when the connection is lost.
   * @default true
   */
  autoReconnect?: boolean;
  /**
   * Options for the automatic reconnection behavior.
   */
  reconnectOptions?: ReconnectOptions;
  /**
   * The timeout in milliseconds for a `sendReceive` call.
   * @default 60000
   */
  requestTimeout?: number;
};

type WebSocketChannelEvents = {
  open: Event;
  close: CloseEvent;
  message: MessageEvent<any>;
  error: Event;
  unsubscribe: SUBSCRIPTION_ID;
};

/**
 * Manages a WebSocket connection to a Starknet node for receiving real-time updates.
 * This class handles subscriptions, automatic reconnection, and request queueing.
 *
 * @example
 * ```typescript
 * const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
 * await channel.waitForConnection();
 *
 * const sub = await channel.subscribeNewHeads();
 * sub.on((data) => {
 *   console.log('New Block:', data);
 * });
 *
 * // ... later
 * await sub.unsubscribe();
 * channel.disconnect();
 * ```
 */
export class WebSocketChannel {
  /**
   * The URL of the WebSocket RPC Node.
   * @example 'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8'
   */
  public nodeUrl: string;

  /**
   * The underlying WebSocket instance.
   */
  public websocket: WebSocket;

  // Store the WebSocket implementation class to allow for custom implementations.
  private WsImplementation: WebSocketModule;

  // Map of active subscriptions, keyed by their ID.
  private activeSubscriptions: Map<SUBSCRIPTION_ID, Subscription<any>> = new Map();

  private readonly maxBufferSize: number;

  private readonly autoReconnect: boolean;

  private readonly reconnectOptions: Required<ReconnectOptions>;

  private readonly requestTimeout: number;

  private isReconnecting = false;

  private reconnectAttempts = 0;

  private userInitiatedClose = false;

  private reconnectTimeoutId: NodeJS.Timeout | null = null;

  private requestQueue: Array<{
    method: string;
    params?: object;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  private events = new EventEmitter<WebSocketChannelEvents>();

  private openListener = (ev: Event) => this.events.emit('open', ev);

  private closeListener = this.onCloseProxy.bind(this);

  private messageListener = this.onMessageProxy.bind(this);

  private errorListener = (ev: Event) => this.events.emit('error', ev);

  /**
   * JSON RPC latest sent message ID.
   * The receiving message is expected to contain the same ID.
   */
  private sendId: number = 0;

  /**
   * Creates an instance of WebSocketChannel.
   * @param {WebSocketOptions} options - The options for configuring the channel.
   */
  constructor(options: WebSocketOptions) {
    this.nodeUrl = options.nodeUrl;
    this.maxBufferSize = options.maxBufferSize ?? 1000;
    this.autoReconnect = options.autoReconnect ?? true;
    this.reconnectOptions = {
      retries: options.reconnectOptions?.retries ?? 5,
      delay: options.reconnectOptions?.delay ?? 2000,
    };
    this.requestTimeout = options.requestTimeout ?? 60000;

    this.WsImplementation = options.websocket || config.get('websocket') || WebSocket;
    this.websocket = new this.WsImplementation(this.nodeUrl);

    this.websocket.addEventListener('open', this.openListener);
    this.websocket.addEventListener('close', this.closeListener);
    this.websocket.addEventListener('message', this.messageListener);
    this.websocket.addEventListener('error', this.errorListener);
  }

  private idResolver(id?: number) {
    // An unmanaged, user-set ID.
    if (id) return id;
    // Managed ID, intentionally returned old and then incremented.
    // eslint-disable-next-line no-plusplus
    return this.sendId++;
  }

  /**
   * Sends a JSON-RPC request over the WebSocket connection without waiting for a response.
   * This is a low-level method. Prefer `sendReceive` for most use cases.
   * @param {string} method - The RPC method name.
   * @param {object} [params] - The parameters for the RPC method.
   * @param {number} [id] - A specific request ID. If not provided, an auto-incrementing ID is used.
   * @returns {number} The ID of the sent request.
   * @throws {WebSocketNotConnectedError} If the WebSocket is not connected.
   */
  public send(method: string, params?: object, id?: number) {
    if (!this.isConnected()) {
      throw new WebSocketNotConnectedError(
        'WebSocketChannel.send() failed due to socket being disconnected'
      );
    }
    const usedId = this.idResolver(id);
    const rpcRequestBody: JRPC.RequestBody = {
      id: usedId,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    // Stringify should remove undefined params
    this.websocket.send(stringify(rpcRequestBody));
    return usedId;
  }

  /**
   * Sends a JSON-RPC request and returns a Promise that resolves with the result.
   * This method abstracts the request/response cycle over WebSockets.
   * If the connection is lost, it will queue the request and send it upon reconnection.
   * @template T - The expected type of the result.
   * @param {string} method - The RPC method name.
   * @param {object} [params] - The parameters for the RPC method.
   * @returns {Promise<T>} A Promise that resolves with the RPC response result.
   * @throws {TimeoutError} If the request does not receive a response within the configured `requestTimeout`.
   * @throws {WebSocketNotConnectedError} If the WebSocket is not connected and auto-reconnect is disabled.
   */
  public sendReceive<T = any>(method: string, params?: object): Promise<T> {
    // If we are in the process of reconnecting, or if we are disconnected but expect to reconnect, queue the request.
    if (
      this.isReconnecting ||
      (!this.isConnected() && this.autoReconnect && !this.userInitiatedClose)
    ) {
      logger.info(`WebSocket: Connection unavailable, queueing request: ${method}`);
      return new Promise<T>((resolve, reject) => {
        this.requestQueue.push({ method, params, resolve, reject });
      });
    }

    const sendId = this.send(method, params);

    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout;

      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
        reject(new WebSocketNotConnectedError('WebSocket not available or not connected.'));
        return;
      }

      const messageHandler = (event: MessageEvent) => {
        if (!isString(event.data)) {
          logger.warn('WebSocket received non-string message data:', event.data);
          return;
        }
        const message: JRPC.ResponseBody = JSON.parse(event.data);
        if (message.id === sendId) {
          clearTimeout(timeoutId);
          this.websocket.removeEventListener('message', messageHandler);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          this.websocket.removeEventListener('error', errorHandler);

          if ('result' in message) {
            resolve(message.result as T);
          } else {
            reject(
              new Error(`Error on ${method} (id: ${sendId}): ${JSON.stringify(message.error)}`)
            );
          }
        }
      };

      const errorHandler = (event: Event) => {
        clearTimeout(timeoutId);
        this.websocket.removeEventListener('message', messageHandler);
        this.websocket.removeEventListener('error', errorHandler);
        reject(
          new Error(
            `WebSocket error during ${method} (id: ${sendId}): ${event.type || 'Unknown error'}`
          )
        );
      };

      this.websocket.addEventListener('message', messageHandler);
      this.websocket.addEventListener('error', errorHandler);

      timeoutId = setTimeout(() => {
        // Clean up listeners
        this.websocket.removeEventListener('message', messageHandler);
        this.websocket.removeEventListener('error', errorHandler);
        reject(
          new TimeoutError(
            `Request ${method} (id: ${sendId}) timed out after ${this.requestTimeout}ms`
          )
        );
      }, this.requestTimeout);
    });
  }

  /**
   * Checks if the WebSocket connection is currently open.
   * @returns {boolean} `true` if the connection is open, `false` otherwise.
   */
  public isConnected() {
    return this.websocket.readyState === WebSocket.OPEN;
  }

  /**
   * Returns a Promise that resolves when the WebSocket connection is open.
   * Can be used to block execution until the connection is established.
   * @returns {Promise<number>} A Promise that resolves with the WebSocket's `readyState` when connected.
   * @example
   * ```typescript
   * const channel = new WebSocketChannel({ nodeUrl: '...' });
   * await channel.waitForConnection();
   * console.log('Connected!');
   * ```
   */
  public async waitForConnection(): Promise<WebSocket['readyState']> {
    // Wait for the websocket to connect
    if (this.websocket.readyState !== WebSocket.OPEN) {
      return new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onopen = () => resolve(this.websocket.readyState);
        this.websocket.onerror = (error) => {
          return reject(error);
        };
      });
    }

    return this.websocket.readyState;
  }

  /**
   * Closes the WebSocket connection.
   * This method is user-initiated and will prevent automatic reconnection for this closure.
   * @param {number} [code] - The WebSocket connection close code.
   * @param {string} [reason] - The WebSocket connection close reason.
   */
  public disconnect(code?: number, reason?: string) {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
    this.websocket.close(code, reason);
    this.userInitiatedClose = true;
  }

  /**
   * Returns a Promise that resolves when the WebSocket connection is closed.
   * @returns {Promise<number | Event>} A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.
   */
  public async waitForDisconnection(): Promise<WebSocket['readyState'] | Event> {
    // Wait for the websocket to disconnect
    if (this.websocket.readyState !== WebSocket.CLOSED) {
      return new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onclose = () => resolve(this.websocket.readyState);
        this.websocket.onerror = reject;
      });
    }

    return this.websocket.readyState;
  }

  /**
   * Unsubscribes from a Starknet subscription.
   * It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.
   * @internal
   * @param {SUBSCRIPTION_ID} subscriptionId - The ID of the subscription to unsubscribe from.
   * @returns {Promise<boolean>} A Promise that resolves with `true` if the unsubscription was successful.
   */
  public async unsubscribe(subscriptionId: SUBSCRIPTION_ID) {
    const status = await this.sendReceive<boolean>('starknet_unsubscribe', {
      subscription_id: subscriptionId,
    });
    if (status) {
      this.events.emit('unsubscribe', subscriptionId);
    }
    return status;
  }

  /**
   * Returns a Promise that resolves when a specific subscription is successfully unsubscribed.
   * @param {SUBSCRIPTION_ID} targetId - The ID of the subscription to wait for.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * await channel.waitForUnsubscription(mySubscription.id);
   * console.log('Successfully unsubscribed.');
   * ```
   */
  public waitForUnsubscription(targetId: SUBSCRIPTION_ID): Promise<void> {
    return new Promise((resolve) => {
      const listener = (unsubId: SUBSCRIPTION_ID) => {
        if (unsubId === targetId) {
          this.events.off('unsubscribe', listener);
          resolve();
        }
      };
      this.events.on('unsubscribe', listener);
    });
  }

  /**
   * Manually initiates a reconnection attempt.
   * This creates a new WebSocket instance and re-establishes listeners.
   */
  public reconnect() {
    this.userInitiatedClose = false;
    this.websocket = new this.WsImplementation(this.nodeUrl);

    this.websocket.addEventListener('open', this.openListener);
    this.websocket.addEventListener('close', this.closeListener);
    this.websocket.addEventListener('message', this.messageListener);
    this.websocket.addEventListener('error', this.errorListener);
  }

  private _processRequestQueue(): void {
    logger.info(`WebSocket: Processing ${this.requestQueue.length} queued requests.`);
    while (this.requestQueue.length > 0) {
      const { method, params, resolve, reject } = this.requestQueue.shift()!;
      this.sendReceive(method, params).then(resolve).catch(reject);
    }
  }

  private async _restoreSubscriptions(): Promise<void> {
    const oldSubscriptions = Array.from(this.activeSubscriptions.values());
    this.activeSubscriptions.clear();

    const restorePromises = oldSubscriptions.map(async (sub) => {
      try {
        const newSubId = await this.sendReceive<SUBSCRIPTION_ID>(sub.method, sub.params);
        // eslint-disable-next-line no-param-reassign
        sub.id = newSubId; // Update the subscription with the new ID
        this.activeSubscriptions.set(newSubId, sub);
        logger.info(`Subscription ${sub.method} restored with new ID: ${newSubId}`);
      } catch (error) {
        logger.error(`Failed to restore subscription ${sub.method}:`, error);
        // The subscription is not added back to activeSubscriptions if it fails
      }
    });

    await Promise.all(restorePromises);
  }

  private _startReconnect() {
    if (this.isReconnecting || !this.autoReconnect) {
      return;
    }

    this.isReconnecting = true;
    this.reconnectAttempts = 0;

    const tryReconnect = () => {
      if (this.reconnectAttempts >= this.reconnectOptions.retries) {
        logger.error('WebSocket: Maximum reconnection retries reached. Giving up.');
        this.isReconnecting = false;
        return;
      }

      this.reconnectAttempts += 1;
      logger.info(
        `WebSocket: Connection lost. Attempting to reconnect... (${this.reconnectAttempts}/${this.reconnectOptions.retries})`
      );

      this.reconnect(); // Attempt to reconnect

      this.websocket.onopen = async () => {
        logger.info('WebSocket: Reconnection successful.');
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        await this._restoreSubscriptions();
        this._processRequestQueue();
        // Manually trigger the onOpen listeners as the original 'open' event was consumed.
        this.events.emit('open', new Event('open'));
      };

      this.websocket.onerror = () => {
        const delay = this.reconnectOptions.delay * 2 ** (this.reconnectAttempts - 1);
        logger.info(`WebSocket: Reconnect attempt failed. Retrying in ${delay}ms.`);
        this.reconnectTimeoutId = setTimeout(tryReconnect, delay);
      };
    };

    tryReconnect();
  }

  private onCloseProxy(ev: CloseEvent) {
    this.websocket.removeEventListener('open', this.openListener);
    this.websocket.removeEventListener('close', this.closeListener);
    this.websocket.removeEventListener('message', this.messageListener);
    this.websocket.removeEventListener('error', this.errorListener);
    this.events.emit('close', ev);

    if (!this.userInitiatedClose) {
      this._startReconnect();
    }
  }

  private onMessageProxy(event: MessageEvent<any>) {
    let message: WebSocketEvent;
    try {
      message = JSON.parse(event.data);
    } catch (error) {
      logger.error(
        `WebSocketChannel: Error parsing incoming message: ${event.data}, Error: ${error}`
      );
      return; // Stop processing this malformed message.
    }

    // Check if it's a subscription event.
    if (message.method && isObject(message.params) && 'subscription_id' in message.params) {
      const { result, subscription_id } = message.params as {
        result: any;
        subscription_id: SUBSCRIPTION_ID;
      };
      const subscription = this.activeSubscriptions.get(subscription_id);

      if (subscription) {
        subscription._handleEvent(result);
      } else {
        logger.warn(
          `WebSocketChannel: Received event for untracked subscription ID: ${subscription_id}.`
        );
      }
    }

    logger.debug('onMessageProxy:', event.data);

    // Call the general onMessage handler if provided by the user for all messages.
    this.events.emit('message', event);
  }

  /**
   * Subscribes to new block headers.
   * @param {SubscribeNewHeadsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<BLOCK_HEADER>>} A Promise that resolves with a `Subscription` object for new block headers.
   */
  public async subscribeNewHeads(
    params: SubscribeNewHeadsParams = {}
  ): Promise<Subscription<NewHeadsEvent['result']>> {
    const method = 'starknet_subscribeNewHeads';
    const rpcParams = {
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
    };
    const subId = await this.sendReceive<SUBSCRIPTION_ID>(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * Subscribes to events matching a given filter.
   * @param {SubscribeEventsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<EMITTED_EVENT>>} A Promise that resolves with a `Subscription` object for the specified events.
   */
  public async subscribeEvents(
    params: SubscribeEventsParams = {}
  ): Promise<Subscription<StarknetEventsEvent['result']>> {
    const method = 'starknet_subscribeEvents';
    const rpcParams = {
      from_address: params.fromAddress !== undefined ? toHex(params.fromAddress) : undefined,
      keys: params.keys,
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
      finality_status: params.finalityStatus,
    };
    const subId = await this.sendReceive<SUBSCRIPTION_ID>(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * Subscribes to status updates for a specific transaction.
   * @param {SubscribeTransactionStatusParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NEW_TXN_STATUS>>} A Promise that resolves with a `Subscription` object for the transaction's status.
   */
  public async subscribeTransactionStatus(
    params: SubscribeTransactionStatusParams
  ): Promise<Subscription<TransactionsStatusEvent['result']>> {
    const method = 'starknet_subscribeTransactionStatus';
    const rpcParams = {
      transaction_hash: toHex(params.transactionHash),
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
    };
    const subId = await this.sendReceive<SUBSCRIPTION_ID>(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * Subscribes to new transaction receipts.
   * @param {SubscribeNewTransactionReceiptsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionReceiptsEvent['result']>>} A Promise that resolves with a `Subscription` object for new transaction receipts.
   */
  public async subscribeNewTransactionReceipts(
    params: SubscribeNewTransactionReceiptsParams = {}
  ): Promise<Subscription<NewTransactionReceiptsEvent['result']>> {
    const method = 'starknet_subscribeNewTransactionReceipts';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
    };
    const subId = await this.sendReceive<SUBSCRIPTION_ID>(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * Subscribes to new transactions.
   * @param {SubscribeNewTransactionsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionEvent['result']>>} A Promise that resolves with a `Subscription` object for new transactions.
   */
  public async subscribeNewTransactions(
    params: SubscribeNewTransactionsParams = {}
  ): Promise<Subscription<NewTransactionEvent['result']>> {
    const method = 'starknet_subscribeNewTransactions';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
    };
    const subId = await this.sendReceive<SUBSCRIPTION_ID>(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * Internal method to remove subscription from active map.
   * @internal
   */
  public removeSubscription(id: SUBSCRIPTION_ID) {
    this.activeSubscriptions.delete(id);
  }

  /**
   * Adds a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to add.
   */
  public on<K extends keyof WebSocketChannelEvents>(
    event: K,
    listener: (data: WebSocketChannelEvents[K]) => void
  ): void {
    this.events.on(event, listener);
  }

  /**
   * Removes a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to remove.
   */
  public off<K extends keyof WebSocketChannelEvents>(
    event: K,
    listener: (data: WebSocketChannelEvents[K]) => void
  ): void {
    this.events.off(event, listener);
  }
}
