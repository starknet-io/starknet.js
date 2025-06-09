import type {
  EMITTED_EVENT,
  SUBSCRIPTION_ID,
  SubscriptionEventsResponse,
  SubscriptionNewHeadsResponse,
  SubscriptionPendingTransactionsResponse,
  SubscriptionReorgResponse,
  SubscriptionTransactionsStatusResponse,
} from '@starknet-io/starknet-types-08';

import { BigNumberish, SubscriptionBlockIdentifier } from '../types';
import { JRPC } from '../types/api';
import { WebSocketEvent } from '../types/api/jsonrpc';
import WebSocket from '../utils/connect/ws';
import { stringify } from '../utils/json';
import { bigNumberishArrayToHexadecimalStringArray, toHex } from '../utils/num';
import { Block } from '../utils/provider';
import { config } from '../global/config';
import { logger } from '../global/logger';

export const WSSubscriptions = {
  NEW_HEADS: 'newHeads',
  EVENTS: 'events',
  TRANSACTION_STATUS: 'transactionStatus',
  PENDING_TRANSACTION: 'pendingTransactions',
} as const;

export type WebSocketOptions = {
  /**
   * websocket node url address
   * @example 'ws://www.host.com/path'
   * @default public websocket enabled starknet node
   */
  nodeUrl?: string;
  /**
   * This parameter should be used when working in an environment without native WebSocket support by providing
   * an equivalent WebSocket object that conforms to the protocol, e.g. from the 'isows' and/or 'ws' modules
   * * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket#protocols .
   * * https://www.rfc-editor.org/rfc/rfc6455.html#section-1 .
   * @default WebSocket
   */
  websocket?: WebSocket;
  /**
   * Maximum number of events to store in the buffer if no handler is attached.
   * @default 1000
   */
  maxBufferSize?: number;
};

const DEFAULT_MAX_BUFFER_SIZE = 1000;

/**
 * WebSocket channel provides communication with Starknet node over long-lived socket connection
 */
export class WebSocketChannel {
  /**
   * WebSocket RPC Node URL
   * @example 'wss://starknet-node.io/rpc/v0_8'
   */
  public nodeUrl: string;

  // public headers: object;

  // readonly retries: number;

  // public requestId: number;

  // readonly blockIdentifier: BlockIdentifier;

  // private chainId?: StarknetChainId;

  // private specVersion?: string;

  // private transactionRetryIntervalFallback?: number;

  // readonly waitMode: Boolean; // behave like web2 rpc and return when tx is processed

  // private batchClient?: BatchClient;

  /**
   * ws library object
   */
  public websocket: WebSocket;

  // Generic buffer for all subscription events
  private genericEventBuffer: Array<{ type: string; data: any }> = [];

  private readonly maxBufferSize: number;

  // Generic map for actual event handlers
  private eventHandlers: Map<string, (result: any, subscriptionId: any) => any> = new Map();

  // Define known event method names for clarity and type-safety where applicable
  private static readonly EVENT_METHOD_REORG = 'starknet_subscriptionReorg';

  private static readonly EVENT_METHOD_NEW_HEADS = 'starknet_subscriptionNewHeads';

  private static readonly EVENT_METHOD_EVENTS = 'starknet_subscriptionEvents';

  private static readonly EVENT_METHOD_TRANSACTION_STATUS =
    'starknet_subscriptionTransactionStatus';

  private static readonly EVENT_METHOD_PENDING_TRANSACTION =
    'starknet_subscriptionPendingTransactions';

  private static readonly KNOWN_EVENT_METHODS = [
    WebSocketChannel.EVENT_METHOD_REORG,
    WebSocketChannel.EVENT_METHOD_NEW_HEADS,
    WebSocketChannel.EVENT_METHOD_EVENTS,
    WebSocketChannel.EVENT_METHOD_TRANSACTION_STATUS,
    WebSocketChannel.EVENT_METHOD_PENDING_TRANSACTION,
  ];

  /**
   * Assign implementation method to get 'on reorg event data'
   * @example
   * ```typescript
   * webSocketChannel.onReorg = async function (result, subscriptionId) {
   *  // ... do something when reorg happens
   * }
   * ```
   */
  public get onReorg(): (
    this: WebSocketChannel,
    result: SubscriptionReorgResponse['result'],
    subscriptionId: SUBSCRIPTION_ID
  ) => any {
    const handler = this.eventHandlers.get(WebSocketChannel.EVENT_METHOD_REORG);
    return (
      (handler as (
        this: WebSocketChannel,
        result: SubscriptionReorgResponse['result'],
        subscriptionId: SUBSCRIPTION_ID
      ) => any) || (() => {})
    );
  }

  public set onReorg(
    userHandler:
      | ((
          this: WebSocketChannel,
          result: SubscriptionReorgResponse['result'],
          subscriptionId: SUBSCRIPTION_ID
        ) => any)
      | null
  ) {
    const eventType = WebSocketChannel.EVENT_METHOD_REORG;
    if (userHandler) {
      const boundHandler = userHandler.bind(this);
      this.eventHandlers.set(eventType, boundHandler);

      const eventsToProcess = this.genericEventBuffer.filter((event) => event.type === eventType);
      this.genericEventBuffer = this.genericEventBuffer.filter((event) => event.type !== eventType);
      eventsToProcess.forEach((bufferedEvent) => {
        const eventData = bufferedEvent.data as SubscriptionReorgResponse;
        boundHandler(eventData.result, eventData.subscription_id);
      });
    } else {
      this.eventHandlers.delete(eventType);
    }
  }

  /**
   * Assign implementation method to get 'starknet block heads'
   * @example
   * ```typescript
   * webSocketChannel.onNewHeads = async function (result, subscriptionId) {
   *  // ... do something with head data
   * }
   * ```
   */
  public get onNewHeads(): (
    this: WebSocketChannel,
    result: SubscriptionNewHeadsResponse['result'],
    subscriptionId: SUBSCRIPTION_ID
  ) => any {
    const handler = this.eventHandlers.get(WebSocketChannel.EVENT_METHOD_NEW_HEADS);
    return (
      (handler as (
        this: WebSocketChannel,
        result: SubscriptionNewHeadsResponse['result'],
        subscriptionId: SUBSCRIPTION_ID
      ) => any) || (() => {})
    );
  }

  public set onNewHeads(
    userHandler:
      | ((
          this: WebSocketChannel,
          result: SubscriptionNewHeadsResponse['result'],
          subscriptionId: SUBSCRIPTION_ID
        ) => any)
      | null
  ) {
    const eventType = WebSocketChannel.EVENT_METHOD_NEW_HEADS;
    if (userHandler) {
      const boundHandler = userHandler.bind(this);
      this.eventHandlers.set(eventType, boundHandler);

      const eventsToProcess = this.genericEventBuffer.filter((event) => event.type === eventType);
      this.genericEventBuffer = this.genericEventBuffer.filter((event) => event.type !== eventType);
      eventsToProcess.forEach((bufferedEvent) => {
        const eventData = bufferedEvent.data as SubscriptionNewHeadsResponse;
        boundHandler(eventData.result, eventData.subscription_id);
      });
    } else {
      this.eventHandlers.delete(eventType);
    }
  }

  /**
   * Assign implementation method to get 'starknet events'
   * @example
   * ```typescript
   * webSocketChannel.onEvents = async function (result, subscriptionId) {
   *  // ... do something with event data
   * }
   * ```
   */
  public get onEvents(): (
    this: WebSocketChannel,
    result: EMITTED_EVENT,
    subscriptionId: SUBSCRIPTION_ID
  ) => any {
    const handler = this.eventHandlers.get(WebSocketChannel.EVENT_METHOD_EVENTS);
    return (
      (handler as (
        this: WebSocketChannel,
        result: EMITTED_EVENT,
        subscriptionId: SUBSCRIPTION_ID
      ) => any) || (() => {})
    );
  }

  public set onEvents(
    userHandler:
      | ((this: WebSocketChannel, result: EMITTED_EVENT, subscriptionId: SUBSCRIPTION_ID) => any)
      | null
  ) {
    const eventType = WebSocketChannel.EVENT_METHOD_EVENTS;
    if (userHandler) {
      const boundHandler = userHandler.bind(this);
      this.eventHandlers.set(eventType, boundHandler);

      const eventsToProcess = this.genericEventBuffer.filter((event) => event.type === eventType);
      this.genericEventBuffer = this.genericEventBuffer.filter((event) => event.type !== eventType);
      eventsToProcess.forEach((bufferedEvent) => {
        const eventData = bufferedEvent.data as SubscriptionEventsResponse;
        boundHandler(eventData.result, eventData.subscription_id);
      });
    } else {
      this.eventHandlers.delete(eventType);
    }
  }

  /**
   * Assign method to get 'starknet transactions status'
   * @example
   * ```typescript
   * webSocketChannel.onTransactionStatus = async function (result, subscriptionId) {
   *  // ... do something with tx status data
   * }
   * ```
   */
  public get onTransactionStatus(): (
    this: WebSocketChannel,
    result: SubscriptionTransactionsStatusResponse['result'],
    subscriptionId: SUBSCRIPTION_ID
  ) => any {
    const handler = this.eventHandlers.get(WebSocketChannel.EVENT_METHOD_TRANSACTION_STATUS);
    return (
      (handler as (
        this: WebSocketChannel,
        result: SubscriptionTransactionsStatusResponse['result'],
        subscriptionId: SUBSCRIPTION_ID
      ) => any) || (() => {})
    );
  }

  public set onTransactionStatus(
    userHandler:
      | ((
          this: WebSocketChannel,
          result: SubscriptionTransactionsStatusResponse['result'],
          subscriptionId: SUBSCRIPTION_ID
        ) => any)
      | null
  ) {
    const eventType = WebSocketChannel.EVENT_METHOD_TRANSACTION_STATUS;
    if (userHandler) {
      const boundHandler = userHandler.bind(this);
      this.eventHandlers.set(eventType, boundHandler);

      const eventsToProcess = this.genericEventBuffer.filter((event) => event.type === eventType);
      this.genericEventBuffer = this.genericEventBuffer.filter((event) => event.type !== eventType);
      eventsToProcess.forEach((bufferedEvent) => {
        const eventData = bufferedEvent.data as SubscriptionTransactionsStatusResponse;
        boundHandler(eventData.result, eventData.subscription_id);
      });
    } else {
      this.eventHandlers.delete(eventType);
    }
  }

  /**
   * Assign implementation method to get 'starknet pending transactions (mempool)'
   * @example
   * ```typescript
   * webSocketChannel.onPendingTransaction = async function (result, subscriptionId) {
   *  // ... do something with pending tx data
   * }
   * ```
   */
  public get onPendingTransaction(): (
    this: WebSocketChannel,
    result: SubscriptionPendingTransactionsResponse['result'],
    subscriptionId: SUBSCRIPTION_ID
  ) => any {
    const handler = this.eventHandlers.get(WebSocketChannel.EVENT_METHOD_PENDING_TRANSACTION);
    return (
      (handler as (
        this: WebSocketChannel,
        result: SubscriptionPendingTransactionsResponse['result'],
        subscriptionId: SUBSCRIPTION_ID
      ) => any) || (() => {})
    );
  }

  public set onPendingTransaction(
    userHandler:
      | ((
          this: WebSocketChannel,
          result: SubscriptionPendingTransactionsResponse['result'],
          subscriptionId: SUBSCRIPTION_ID
        ) => any)
      | null
  ) {
    const eventType = WebSocketChannel.EVENT_METHOD_PENDING_TRANSACTION;
    if (userHandler) {
      const boundHandler = userHandler.bind(this);
      this.eventHandlers.set(eventType, boundHandler);

      const eventsToProcess = this.genericEventBuffer.filter((event) => event.type === eventType);
      this.genericEventBuffer = this.genericEventBuffer.filter((event) => event.type !== eventType);
      eventsToProcess.forEach((bufferedEvent) => {
        const eventData = bufferedEvent.data as SubscriptionPendingTransactionsResponse;
        boundHandler(eventData.result, eventData.subscription_id);
      });
    } else {
      this.eventHandlers.delete(eventType);
    }
  }

  /**
   * Assign implementation to this method to listen open Event
   */
  public onOpen: (this: WebSocketChannel, ev: Event) => any = () => {};

  /**
   * Assign implementation to this method to listen close CloseEvent
   */
  public onClose: (this: WebSocketChannel, ev: CloseEvent) => any = () => {};

  /**
   * Assign implementation to this method to listen message MessageEvent
   */
  public onMessage: (this: WebSocketChannel, ev: MessageEvent<any>) => any = () => {};

  /**
   * Assign implementation to this method to listen error Event
   */
  public onError: (this: WebSocketChannel, ev: Event) => any = () => {};

  /**
   * Assign implementation to this method to listen unsubscription
   */
  public onUnsubscribe: (this: WebSocketChannel, _subscriptionId: SUBSCRIPTION_ID) => any =
    () => {};

  private onUnsubscribeLocal: (this: WebSocketChannel, _subscriptionId: SUBSCRIPTION_ID) => any =
    () => {};

  /**
   * JSON RPC latest sent message id
   * expecting receiving message to contain same id
   */
  private sendId: number = 0;

  /**
   * subscriptions ids
   * mapped by keys WSSubscriptions
   */
  readonly subscriptions: Map<string, SUBSCRIPTION_ID> = new Map();

  /**
   * Construct class and event listeners
   * @param options WebSocketOptions
   */
  constructor(options: WebSocketOptions = {}) {
    // provided existing websocket
    const nodeUrl = options.nodeUrl || 'http://localhost:3000 '; // TODO: implement getDefaultNodeUrl default node when defined by providers?
    this.nodeUrl = options.websocket ? options.websocket.url : nodeUrl;
    this.websocket = options.websocket || config.get('websocket') || new WebSocket(nodeUrl);
    this.maxBufferSize = options.maxBufferSize ?? DEFAULT_MAX_BUFFER_SIZE;

    this.websocket.addEventListener('open', this.onOpen.bind(this));
    this.websocket.addEventListener('close', this.onCloseProxy.bind(this));
    this.websocket.addEventListener('message', this.onMessageProxy.bind(this));
    this.websocket.addEventListener('error', this.onError.bind(this));
  }

  private idResolver(id?: number) {
    // unmanaged user set id
    if (id) return id;
    // managed id, intentional return old and than increment
    // eslint-disable-next-line no-plusplus
    return this.sendId++;
  }

  /**
   * Send data over open ws connection
   * * this would only send data on the line without awaiting 'response message'
   * @example
   * ```typescript
   * const sentId = await this.send('starknet_method', params);
   * ```
   */
  public send(method: string, params?: object, id?: number) {
    if (!this.isConnected()) {
      throw Error('WebSocketChannel.send() fail due to socket disconnected');
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
   * Send request and receive response over ws line
   * This method abstract ws messages into request/response model
   * @param method rpc method name
   * @param params rpc method parameters
   * @example
   * ```typescript
   * const response = await this.sendReceive('starknet_method', params);
   * ```
   */
  public sendReceive<T = any>(method: string, params?: object): Promise<T> {
    const sendId = this.send(method, params);

    return new Promise((resolve, reject) => {
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not available or not connected.'));
        return; // Exit after rejecting
      }

      // Declare errorHandler first so it can be referenced by messageHandler for cleanup
      let errorHandler: (event: Event) => void;
      const messageHandler = (event: MessageEvent) => {
        if (typeof event.data !== 'string') {
          console.warn('WebSocket received non-string message data:', event.data);
          return; // Ignore non-string data
        }
        const message: JRPC.ResponseBody = JSON.parse(event.data);
        if (message.id === sendId) {
          this.websocket.removeEventListener('message', messageHandler);
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

      errorHandler = (event: Event) => {
        this.websocket.removeEventListener('message', messageHandler);
        this.websocket.removeEventListener('error', errorHandler); // It removes itself here
        reject(
          new Error(
            `WebSocket error during ${method} (id: ${sendId}): ${event.type || 'Unknown error'}`
          )
        );
      };

      this.websocket.addEventListener('message', messageHandler);
      this.websocket.addEventListener('error', errorHandler);

      // Optional: Consider adding a timeout for sendReceive operations
      // const timeout = 30000; // 30 seconds
      // const timeoutId = setTimeout(() => {
      //   this.websocket.removeEventListener('message', messageHandler);
      //   this.websocket.removeEventListener('error', errorHandler);
      //   reject(new Error(`Timeout waiting for response to ${method} (id: ${sendId}) after ${timeout / 1000}s`));
      // }, timeout);
      // Be sure to clearTimeout(timeoutId) in both messageHandler (after processing) and errorHandler.
    });
  }

  /**
   * Helper to check connection is open
   */
  public isConnected() {
    return this.websocket.readyState === WebSocket.OPEN;
  }

  /**
   * await while websocket is connected
   * * could be used to block the flow until websocket is open
   * @example
   * ```typescript
   * const readyState = await webSocketChannel.waitForConnection();
   * ```
   */
  public async waitForConnection(): Promise<typeof this.websocket.readyState> {
    // Wait websocket to connect
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
   * Disconnect the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason.
   */
  public disconnect(code?: number, reason?: string) {
    this.websocket.close(code, reason);
  }

  /**
   * await while websocket is disconnected
   * @example
   * ```typescript
   * const readyState = await webSocketChannel.waitForDisconnection();
   * ```
   */
  public async waitForDisconnection(): Promise<typeof this.websocket.readyState | Event> {
    // Wait websocket to disconnect
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
   * Unsubscribe from starknet subscription
   * @param subscriptionId
   * @param ref internal usage, only for managed subscriptions
   */
  public async unsubscribe(subscriptionId: SUBSCRIPTION_ID, ref?: string) {
    const status = await this.sendReceive<boolean>('starknet_unsubscribe', {
      subscription_id: subscriptionId,
    });
    if (status) {
      if (ref) {
        this.subscriptions.delete(ref);
      }
      this.onUnsubscribeLocal(subscriptionId);
      this.onUnsubscribe(subscriptionId);
    }
    return status;
  }

  /**
   * await while subscription is unsubscribed
   * @param forSubscriptionId if defined trigger on subscriptionId else trigger on any
   * @returns subscriptionId | onerror(Event)
   * @example
   * ```typescript
   * const subscriptionId = await webSocketChannel.waitForUnsubscription();
   * ```
   */
  public async waitForUnsubscription(forSubscriptionId?: SUBSCRIPTION_ID) {
    // Wait for unsubscription event
    return new Promise((resolve, reject) => {
      if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not available or not open. Cannot wait for unsubscription.'));
        return;
      }

      let localOnError: (event: Event) => void;

      const localOnUnsubscribe = (subscriptionId: SUBSCRIPTION_ID) => {
        // Check if this specific handler instance is still the one assigned to onUnsubscribeLocal.
        // This helps prevent race conditions if waitForUnsubscription is called multiple times in quick succession,
        // though direct reassignment of onUnsubscribeLocal is the primary concern there.
        if (this.onUnsubscribeLocal === localOnUnsubscribe) {
          this.websocket.removeEventListener('error', localOnError);
          // No need to reset this.onUnsubscribeLocal here, as a new call to waitForUnsubscription
          // or a direct assignment would overwrite it anyway. The main thing is that this promise is resolved.

          if (forSubscriptionId === undefined) {
            resolve(subscriptionId);
          } else if (subscriptionId === forSubscriptionId) {
            resolve(subscriptionId);
          }
          // If neither of the above, this specific waiter wasn't for this unsubscriptionId, or it was a general wait and got an ID.
          // If forSubscriptionId was provided and doesn't match, this specific promise instance should not resolve.
          // However, the current logic resolves if forSubscriptionId is undefined OR if it matches.
        }
      };

      localOnError = (event: Event) => {
        // Ensure this error handler is still relevant to this specific waiter
        if (this.onUnsubscribeLocal === localOnUnsubscribe) {
          this.websocket.removeEventListener('error', localOnError);
          reject(
            new Error(
              `WebSocket error while waiting for unsubscription of ${forSubscriptionId || 'any subscription'}: ${event.type || 'Unknown error'}`
            )
          );
        }
      };

      this.onUnsubscribeLocal = localOnUnsubscribe; // Assign the new unsubscription handler
      this.websocket.addEventListener('error', localOnError); // Add specific error listener
    });
  }

  /**
   * Reconnect re-create this.websocket instance
   */
  public reconnect() {
    this.websocket = new WebSocket(this.nodeUrl);

    this.websocket.addEventListener('open', this.onOpen.bind(this));
    this.websocket.addEventListener('close', this.onCloseProxy.bind(this));
    this.websocket.addEventListener('message', this.onMessageProxy.bind(this));
    this.websocket.addEventListener('error', this.onError.bind(this));
  }

  // TODO: Add/Test ping service. It seems this work out of the box from pathfinder. If net disc. it will auto replay.
  private reconnectAndUpdate() {
    this.reconnect();
    // TODO: attempt n reconnection times
    // TODO: replay data from last block received (including it) up to latest
  }

  private onCloseProxy(ev: CloseEvent) {
    this.websocket.removeEventListener('open', this.onOpen);
    this.websocket.removeEventListener('close', this.onCloseProxy);
    this.websocket.removeEventListener('message', this.onMessageProxy);
    this.websocket.removeEventListener('error', this.onError);
    this.onClose(ev);
  }

  private onMessageProxy(event: MessageEvent<any>) {
    const message: WebSocketEvent = JSON.parse(event.data);
    const eventName = message.method; // This is a string, like 'starknet_subscriptionNewHeads'
    const eventData = message.params as { result: any; subscription_id: SUBSCRIPTION_ID }; // This is the data payload

    const handler = this.eventHandlers.get(eventName);

    if (handler) {
      handler(eventData.result, eventData.subscription_id); // Call the stored (bound) handler
    } else if (WebSocketChannel.KNOWN_EVENT_METHODS.includes(eventName)) {
      // If no handler is currently attached, but it's a known event type, buffer it.
      if (this.genericEventBuffer.length >= this.maxBufferSize) {
        const droppedEvent = this.genericEventBuffer.shift(); // Remove the oldest
        logger.warn(
          `WebSocketChannel: Buffer full (max size: ${this.maxBufferSize}). Dropped oldest event of type: ${droppedEvent?.type}`
        );
      }
      this.genericEventBuffer.push({ type: eventName, data: eventData });
    }

    // Call the general onMessage handler if provided by the user, for all messages.
    this.onMessage(event);
  }

  /**
   * subscribe to new block heads
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeNewHeadsUnmanaged(blockIdentifier?: SubscriptionBlockIdentifier) {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;

    return this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeNewHeads', {
      ...{ block_id },
    });
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeNewHeads(blockIdentifier?: SubscriptionBlockIdentifier) {
    if (this.subscriptions.get(WSSubscriptions.NEW_HEADS)) return false;
    const subId = await this.subscribeNewHeadsUnmanaged(blockIdentifier);
    this.subscriptions.set(WSSubscriptions.NEW_HEADS, subId);
    return subId;
  }

  /**
   * Unsubscribe newHeads subscription
   */
  public async unsubscribeNewHeads() {
    const subId = this.subscriptions.get(WSSubscriptions.NEW_HEADS);
    if (!subId) throw Error('There is no subscription on this event');
    return this.unsubscribe(subId, WSSubscriptions.NEW_HEADS);
  }

  /**
   * subscribe to 'starknet events'
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeEventsUnmanaged(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: SubscriptionBlockIdentifier
  ) {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    return this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeEvents', {
      ...{ from_address: fromAddress !== undefined ? toHex(fromAddress) : undefined },
      ...{ keys },
      ...{ block_id },
    });
  }

  /**
   * subscribe to 'starknet events'
   */
  public async subscribeEvents(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: SubscriptionBlockIdentifier
  ) {
    if (this.subscriptions.get(WSSubscriptions.EVENTS)) return false;
    // eslint-disable-next-line prefer-rest-params
    const subId = await this.subscribeEventsUnmanaged(fromAddress, keys, blockIdentifier);
    this.subscriptions.set(WSSubscriptions.EVENTS, subId);
    return subId;
  }

  /**
   * Unsubscribe 'starknet events' subscription
   */
  public unsubscribeEvents() {
    const subId = this.subscriptions.get(WSSubscriptions.EVENTS);
    if (!subId) throw Error('There is no subscription ID for this event');
    return this.unsubscribe(subId, WSSubscriptions.EVENTS);
  }

  /**
   * subscribe to transaction status
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeTransactionStatusUnmanaged(
    transactionHash: BigNumberish,
    blockIdentifier?: SubscriptionBlockIdentifier
  ) {
    const transaction_hash = toHex(transactionHash);
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    return this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeTransactionStatus', {
      transaction_hash,
      ...{ block_id },
    });
  }

  /**
   * subscribe to transaction status
   */
  public async subscribeTransactionStatus(transactionHash: BigNumberish) {
    if (this.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS)) return false;
    const subId = await this.subscribeTransactionStatusUnmanaged(transactionHash);
    this.subscriptions.set(WSSubscriptions.TRANSACTION_STATUS, subId);
    return subId;
  }

  /**
   * unsubscribe 'transaction status' subscription
   */
  public async unsubscribeTransactionStatus() {
    const subId = this.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS);
    if (!subId) throw Error('There is no subscription ID for this event');
    return this.unsubscribe(subId, WSSubscriptions.TRANSACTION_STATUS);
  }

  /**
   * subscribe to pending transactions (mempool)
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribePendingTransactionUnmanaged(
    transactionDetails?: boolean,
    senderAddress?: BigNumberish[]
  ) {
    return this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribePendingTransactions', {
      ...{ transaction_details: transactionDetails },
      ...{
        sender_address: senderAddress && bigNumberishArrayToHexadecimalStringArray(senderAddress),
      },
    });
  }

  /**
   * subscribe to pending transactions (mempool)
   */
  public async subscribePendingTransaction(
    transactionDetails?: boolean,
    senderAddress?: BigNumberish[]
  ) {
    if (this.subscriptions.get(WSSubscriptions.TRANSACTION_STATUS)) return false;
    // eslint-disable-next-line no-param-reassign
    const subId = await this.subscribePendingTransactionUnmanaged(
      transactionDetails,
      senderAddress
    );
    this.subscriptions.set(WSSubscriptions.PENDING_TRANSACTION, subId);
    return subId;
  }

  /**
   * unsubscribe 'pending transaction' subscription
   */
  public async unsubscribePendingTransaction() {
    const subId = this.subscriptions.get(WSSubscriptions.PENDING_TRANSACTION);
    if (!subId) throw Error('There is no subscription ID for this event');
    return this.unsubscribe(subId, WSSubscriptions.PENDING_TRANSACTION);
  }
}
