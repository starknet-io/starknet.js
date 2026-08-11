/* eslint-disable no-underscore-dangle */
import {
  JRPC,
  RPCSPEC0103,
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
import { EventEmitter } from '../../utils/eventEmitter';
import { WebSocketNotConnectedError } from '../../utils/errors';
import WebSocket from '../../utils/connect/ws';
import { stringify } from '../../utils/json';
import { ReconnectingWsTransport } from '../transport/reconnectingWs';
import { Subscription } from './subscription';
import { SubscriptionChannel } from './subscriptionChannel';

// Subscription parameter interfaces for object-based API
export interface SubscribeNewHeadsParams {
  blockIdentifier?: SubscriptionBlockIdentifier;
}

export interface SubscribeEventsParams {
  /** Contract address(es) to filter events from. Accepts single or array of addresses (RPC 0.10.1+). */
  fromAddress?: BigNumberish | BigNumberish[];
  /** Event key filters */
  keys?: string[][];
  /** Block to start subscribing from */
  blockIdentifier?: SubscriptionBlockIdentifier;
  /** Finality status filter */
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
  /** Finality status filter */
  finalityStatus?: TXN_STATUS_WITHOUT_L1[];
  /** Filter by sender addresses */
  senderAddress?: BigNumberish[];
  /** Subscription tags for additional data (RPC 0.10.1+) */
  tags?: RPCSPEC0103.SUBSCRIPTION_TAG[];
}

// Subscription Result types
export type SubscriptionNewHeadsEvent = Subscription<NewHeadsEvent['result']>;
export type SubscriptionStarknetEventsEvent = Subscription<StarknetEventsEvent['result']>;
export type SubscriptionTransactionStatusEvent = Subscription<TransactionsStatusEvent['result']>;
export type SubscriptionNewTransactionReceiptsEvent = Subscription<
  NewTransactionReceiptsEvent['result']
>;
export type SubscriptionNewTransactionEvent = Subscription<NewTransactionEvent['result']>;

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
   * @default 2000
   */
  delay?: number;
  /**
   * Whether to use the exponential backoff (delay being doubled for each subsequent retry).
   * @default true
   */
  exponential?: number | boolean;
  /**
   * The minimum time in milliseconds a reconnected connection must stay open before
   * it is considered stable and the retry counter is reset. This prevents a gateway
   * that accepts the connection then immediately drops it (a "flapping" connection)
   * from resetting the counter on every cycle and reconnecting forever.
   * @default 5000
   */
  stableConnectionThreshold?: number;
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
 * Since the transport split, this is a façade: the socket and its reconnection policy live in
 * `ReconnectingWsTransport`, and the `starknet_subscribe*` surface lives in `SubscriptionChannel`.
 * Every member below behaves exactly as it did before — `WebSocketChannel.test.ts` and
 * `WebSocketChannel.reconnect.test.ts` are the specification of that, and they pass unmodified.
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

  /** Carries the frames and owns the socket lifecycle. */
  private readonly transport: ReconnectingWsTransport;

  /** Owns `activeSubscriptions`, the unsubscribe waiters and the five subscribe methods. */
  private readonly subscriptionChannel: SubscriptionChannel;

  private events = new EventEmitter<WebSocketChannelEvents>();

  /**
   * The underlying WebSocket instance.
   *
   * A getter rather than a field: a reconnection replaces the socket, and callers — including
   * the test suite, which spies on `channel.websocket.send` — must see the live one.
   */
  public get websocket(): WebSocket {
    return this.transport.socket;
  }

  /**
   * Map of active subscriptions, keyed by their ID.
   * @internal
   */
  private get activeSubscriptions(): ReadonlyMap<SUBSCRIPTION_ID, Subscription<any>> {
    return this.subscriptionChannel.subscriptions;
  }

  /**
   * Creates an instance of WebSocketChannel.
   * @param {WebSocketOptions} options - The options for configuring the channel.
   */
  constructor(options: WebSocketOptions) {
    this.nodeUrl = options.nodeUrl;
    this.transport = new ReconnectingWsTransport({
      nodeUrl: options.nodeUrl,
      websocket: options.websocket,
      requestTimeout: options.requestTimeout,
      autoReconnect: options.autoReconnect,
      reconnectOptions: options.reconnectOptions,
    });
    this.subscriptionChannel = new SubscriptionChannel({
      transport: this.transport,
      maxBufferSize: options.maxBufferSize,
    });

    // Relayed from the transport rather than from a socket, so a listener survives a
    // reconnection replacing the socket underneath it.
    this.transport.on('open', (event) => this.events.emit('open', event));
    this.transport.on('close', (event) => this.events.emit('close', event as CloseEvent));
    this.transport.on('error', (event) => this.events.emit('error', event));
    this.transport.on('message', (event) => this.events.emit('message', event));
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
    // An unmanaged, user-set ID. Tested against `undefined` rather than for truthiness: 0 is a
    // valid JSON-RPC id and must be honoured as passed. The managed id comes from the
    // transport's own sequence, so a write made here cannot collide with one it is tracking.
    const usedId = id !== undefined ? id : this.transport.allocateRequestId();
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
   * Refuses a call that has nowhere to go, the way `send()` used to.
   *
   * Every method below used to reach the socket through `send()`, which threw this exact error
   * when the connection was down and nothing was going to pick the request up later. The refusal
   * now originates in the transport, which is generic and rightly words it differently — so the
   * decision is reproduced here instead, at the boundary where the legacy contract applies.
   *
   * The condition is the transport's own: it refuses only when the request would not be queued.
   */
  private assertSendable(): void {
    if (this.isConnected() || this.transport.queuesRequests) return;
    throw new WebSocketNotConnectedError(
      'WebSocketChannel.send() failed due to socket being disconnected'
    );
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
  public async sendReceive<T = any>(method: string, params?: object): Promise<T> {
    this.assertSendable();
    // The id is the transport's business: it renumbers on the wire and restores this one on the
    // reply, which nothing here reads.
    const response = (await this.transport.request({
      id: 0,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    })) as JRPC.ResponseBody & { error?: JRPC.Error; result?: T };

    if (response.error) {
      throw new Error(`Error on ${method}: ${JSON.stringify(response.error)}`);
    }
    return response.result as T;
  }

  /**
   * Checks if the WebSocket connection is currently open.
   * @returns {boolean} `true` if the connection is open, `false` otherwise.
   */
  public isConnected() {
    return this.transport.isConnected();
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
    if (this.isConnected()) return this.websocket.readyState;

    return new Promise((resolve, reject) => {
      /* eslint-disable @typescript-eslint/no-use-before-define --
         the two detach handles are mutually recursive; both are assigned by the time either
         callback can run. */
      const settle = () => {
        offOpen();
        offError();
      };
      const offOpen = this.transport.on('open', () => {
        settle();
        resolve(this.websocket.readyState);
      });
      const offError = this.transport.on('error', (event) => {
        settle();
        reject(event);
      });
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });
  }

  /**
   * Closes the WebSocket connection.
   * This method is user-initiated and will prevent automatic reconnection for this closure.
   * @param {number} [code] - The WebSocket connection close code.
   * @param {string} [reason] - The WebSocket connection close reason.
   */
  public disconnect(code?: number, reason?: string) {
    this.transport.close(code, reason);
  }

  /**
   * Returns a Promise that resolves when the WebSocket connection is closed.
   * @returns {Promise<number | Event>} A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.
   */
  public async waitForDisconnection(): Promise<WebSocket['readyState'] | Event> {
    if (this.websocket.readyState === WebSocket.CLOSED) return this.websocket.readyState;

    return new Promise((resolve, reject) => {
      /* eslint-disable @typescript-eslint/no-use-before-define -- see waitForConnection */
      const settle = () => {
        offClose();
        offError();
      };
      const offClose = this.transport.on('close', () => {
        settle();
        resolve(this.websocket.readyState);
      });
      const offError = this.transport.on('error', (event) => {
        // An `error` the socket does not survive belongs to the disconnection, not to a failure
        // of it. starknet-devnet answers a client `close()` by dropping the TCP connection, so
        // Node reports `error` then `close` 1006; rejecting there would fail on the peer's
        // rudeness while the socket does exactly what was awaited. The `close` is still coming,
        // so the waiter stays armed. An error on a socket that is still OPEN is a different
        // matter and keeps rejecting, unchanged.
        if (this.websocket.readyState !== WebSocket.OPEN) return;
        settle();
        reject(event);
      });
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });
  }

  /**
   * Unsubscribes from a Starknet subscription.
   * It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.
   * @internal
   * @param {SUBSCRIPTION_ID} subscriptionId - The ID of the subscription to unsubscribe from.
   * @returns {Promise<boolean>} A Promise that resolves with `true` if the unsubscription was successful.
   */
  public async unsubscribe(subscriptionId: SUBSCRIPTION_ID) {
    this.assertSendable();
    const status = await this.subscriptionChannel.unsubscribe(subscriptionId);
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
    return this.subscriptionChannel.waitForUnsubscription(targetId);
  }

  /**
   * Manually initiates a reconnection attempt.
   * This creates a new WebSocket instance and re-establishes listeners.
   */
  public reconnect() {
    this.transport.reconnect();
  }

  /**
   * Subscribes to new block headers.
   * @param {SubscribeNewHeadsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<BLOCK_HEADER>>} A Promise that resolves with a `Subscription` object for new block headers.
   */
  public async subscribeNewHeads(
    params: SubscribeNewHeadsParams = {}
  ): Promise<SubscriptionNewHeadsEvent> {
    this.assertSendable();
    return this.subscriptionChannel.subscribeNewHeads(params);
  }

  /**
   * Subscribes to events matching a given filter.
   * @param {SubscribeEventsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<EMITTED_EVENT>>} A Promise that resolves with a `Subscription` object for the specified events.
   */
  public async subscribeEvents(
    params: SubscribeEventsParams = {}
  ): Promise<SubscriptionStarknetEventsEvent> {
    this.assertSendable();
    return this.subscriptionChannel.subscribeEvents(params);
  }

  /**
   * Subscribes to status updates for a specific transaction.
   * @param {SubscribeTransactionStatusParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NEW_TXN_STATUS>>} A Promise that resolves with a `Subscription` object for the transaction's status.
   */
  public async subscribeTransactionStatus(
    params: SubscribeTransactionStatusParams
  ): Promise<SubscriptionTransactionStatusEvent> {
    this.assertSendable();
    return this.subscriptionChannel.subscribeTransactionStatus(params);
  }

  /**
   * Subscribes to new transaction receipts.
   * @param {SubscribeNewTransactionReceiptsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionReceiptsEvent['result']>>} A Promise that resolves with a `Subscription` object for new transaction receipts.
   */
  public async subscribeNewTransactionReceipts(
    params: SubscribeNewTransactionReceiptsParams = {}
  ): Promise<SubscriptionNewTransactionReceiptsEvent> {
    this.assertSendable();
    return this.subscriptionChannel.subscribeNewTransactionReceipts(params);
  }

  /**
   * Subscribes to new transactions.
   * @param {SubscribeNewTransactionsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionEvent['result']>>} A Promise that resolves with a `Subscription` object for new transactions.
   */
  public async subscribeNewTransactions(
    params: SubscribeNewTransactionsParams = {}
  ): Promise<SubscriptionNewTransactionEvent> {
    this.assertSendable();
    return this.subscriptionChannel.subscribeNewTransactions(params);
  }

  /**
   * Internal method to remove subscription from active map.
   * @internal
   */
  public removeSubscription(id: SUBSCRIPTION_ID) {
    this.subscriptionChannel.removeSubscription(id);
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
