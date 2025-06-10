/* eslint-disable no-underscore-dangle */
import type { SUBSCRIPTION_ID } from '@starknet-io/starknet-types-08';

import { BigNumberish, SubscriptionBlockIdentifier } from '../../types';
import { JRPC } from '../../types/api';
import { WebSocketEvent } from '../../types/api/jsonrpc';
import WebSocket from '../../utils/connect/ws';
import { stringify } from '../../utils/json';
import { bigNumberishArrayToHexadecimalStringArray, toHex } from '../../utils/num';
import { Block } from '../../utils/provider';
import { config } from '../../global/config';
import { logger } from '../../global/logger';
import { Subscription } from './subscription';

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
   * The maximum number of events to buffer per subscription when no handler is attached.
   * @default 1000
   */
  maxBufferSize?: number;
};

/**
 * WebSocket channel provides communication with Starknet node over long-lived socket connection
 */
export class WebSocketChannel {
  /**
   * WebSocket RPC Node URL
   * @example 'wss://starknet-node.io/rpc/v0_8'
   */
  public nodeUrl: string;

  /**
   * ws library object
   */
  public websocket: WebSocket;

  // Map of active subscriptions, keyed by their ID.
  private activeSubscriptions: Map<SUBSCRIPTION_ID, Subscription> = new Map();

  private readonly maxBufferSize: number;

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
   * Construct class and event listeners
   * @param options WebSocketOptions
   */
  constructor(options: WebSocketOptions = {}) {
    // provided existing websocket
    const nodeUrl = options.nodeUrl || 'http://localhost:3000 ';
    this.nodeUrl = options.websocket ? options.websocket.url : nodeUrl;
    this.websocket = options.websocket || config.get('websocket') || new WebSocket(nodeUrl);
    this.maxBufferSize = options.maxBufferSize ?? 1000;

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
   */
  public async unsubscribe(subscriptionId: SUBSCRIPTION_ID) {
    const status = await this.sendReceive<boolean>('starknet_unsubscribe', {
      subscription_id: subscriptionId,
    });
    if (status) {
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
        if (this.onUnsubscribeLocal === localOnUnsubscribe) {
          this.websocket.removeEventListener('error', localOnError);

          if (forSubscriptionId === undefined) {
            resolve(subscriptionId);
          } else if (subscriptionId === forSubscriptionId) {
            resolve(subscriptionId);
          }
        }
      };

      localOnError = (event: Event) => {
        if (this.onUnsubscribeLocal === localOnUnsubscribe) {
          this.websocket.removeEventListener('error', localOnError);
          reject(
            new Error(
              `WebSocket error while waiting for unsubscription of ${forSubscriptionId || 'any subscription'}: ${event.type || 'Unknown error'}`
            )
          );
        }
      };

      this.onUnsubscribeLocal = localOnUnsubscribe;
      this.websocket.addEventListener('error', localOnError);
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

  private onCloseProxy(ev: CloseEvent) {
    this.websocket.removeEventListener('open', this.onOpen);
    this.websocket.removeEventListener('close', this.onCloseProxy);
    this.websocket.removeEventListener('message', this.onMessageProxy);
    this.websocket.removeEventListener('error', this.onError);
    this.onClose(ev);
  }

  private onMessageProxy(event: MessageEvent<any>) {
    const message: WebSocketEvent = JSON.parse(event.data);

    // Check if it's a subscription event
    if (
      message.method &&
      'params' in message &&
      message.params &&
      typeof message.params === 'object' &&
      'subscription_id' in message.params
    ) {
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

    // Call the general onMessage handler if provided by the user, for all messages.
    this.onMessage(event);
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeNewHeads(
    blockIdentifier?: SubscriptionBlockIdentifier
  ): Promise<Subscription> {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    const subId = await this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeNewHeads', {
      ...{ block_id },
    });
    const subscription = new Subscription(this, subId, this.maxBufferSize);
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * subscribe to 'starknet events'
   */
  public async subscribeEvents(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: SubscriptionBlockIdentifier
  ): Promise<Subscription> {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    const subId = await this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeEvents', {
      ...{ from_address: fromAddress !== undefined ? toHex(fromAddress) : undefined },
      ...{ keys },
      ...{ block_id },
    });
    const subscription = new Subscription(this, subId, this.maxBufferSize);
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * subscribe to transaction status
   */
  public async subscribeTransactionStatus(
    transactionHash: BigNumberish,
    blockIdentifier?: SubscriptionBlockIdentifier
  ): Promise<Subscription> {
    const transaction_hash = toHex(transactionHash);
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    const subId = await this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribeTransactionStatus', {
      transaction_hash,
      ...{ block_id },
    });
    const subscription = new Subscription(this, subId, this.maxBufferSize);
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * subscribe to pending transactions (mempool)
   */
  public async subscribePendingTransaction(
    transactionDetails?: boolean,
    senderAddress?: BigNumberish[]
  ): Promise<Subscription> {
    const subId = await this.sendReceive<SUBSCRIPTION_ID>('starknet_subscribePendingTransactions', {
      ...{ transaction_details: transactionDetails },
      ...{
        sender_address: senderAddress && bigNumberishArrayToHexadecimalStringArray(senderAddress),
      },
    });
    const subscription = new Subscription(this, subId, this.maxBufferSize);
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }

  /**
   * internal method to remove subscription from active map
   * @internal
   */
  public removeSubscription(id: SUBSCRIPTION_ID) {
    this.activeSubscriptions.delete(id);
  }
}
