import { WebSocket } from 'isows';

import { BigNumberish, BlockIdentifier } from '../types';
import { JRPC } from '../types/api';
import { stringify } from '../utils/json';
import { toHex } from '../utils/num';
import { Block } from '../utils/provider';
import { WebSocketChannelInterface, WebSocketOptions } from './ws/interface';

export type WsResponse = {
  id: number;
  jsonrpc: '2.0';
  result: any;
};

export type WsEvent = {
  jsonrpc: '2.0';
  method: string;
  params: {};
};

export type SUBSCRIPTION_ID = number;

export type SUBSCRIPTION_RESULT = { subscription_id: SUBSCRIPTION_ID };

// import { WebSocket } from 'ws';

/**
 * WebSocket channel provide communication with Starknet node over long-lived socket connection
 */
export class WebSocketChannel implements WebSocketChannelInterface {
  public nodeUrl: string;

  // public headers: object;

  // readonly retries: number;

  // public requestId: number;

  // readonly blockIdentifier: BlockIdentifier;

  // private chainId?: StarknetChainId;

  private specVersion?: string;

  // private transactionRetryIntervalFallback?: number;

  // readonly waitMode: Boolean; // behave like web2 rpc and return when tx is processed

  // private batchClient?: BatchClient;

  public websocket: WebSocket; // TODO: find and set type to standard definition of websocket protocol instead of any

  public onsNewHeads: Function = () => {};

  public onEvents: Function = () => {};

  public onTransactionStatus: Function = () => {};

  public onPendingTransactionStatus: Function = () => {};

  /**
   * Read all receiving messages using this method
   */
  public on: Function = () => {};

  /**
   * JSON RPC latest sent message id
   * expecting receiving message to contain same id
   */
  private sendId: number = 0;

  /**
   * Expecting responses id list
   * List is empty if there is no 'awaiting' responses
   */
  // private awaitingResponses: JRPC.RequestBody[] = [];

  public newHeadsSubscriptionId?: number;

  public transactionStatusSubscriptionId?: number;

  public pendingTransactionStatusSubscriptionId?: number;

  public eventsSubscriptionId?: number;

  public async onsTransactionStatus(callback: Function) {
    callback();
  }

  /**
   * Construct class and event listeners
   * @param options
   */
  constructor(options: WebSocketOptions = {}) {
    // provided existing websocket
    const nodeUrl = options.nodeUrl || 'http://localhost:3000 '; // TODO: implement getDefaultNodeUrl default node when defined by providers?

    // TODO: can we know what network it is ?
    this.nodeUrl = options.websocket ? options.websocket.url : nodeUrl;
    this.websocket = options.websocket ? options.websocket : new WebSocket(nodeUrl);
  }

  /**
   * Send request and receive response over ws line
   * This method abstract ws messages into request/response model
   * @param method rpc method name
   * @param params rpc method parameters
   * @returns Promise<result> (mostly subscription id but can also be boolean in unsubscribe case)
   */
  public sendReceive(method: string, params?: {}) {
    const sendId = this.send(method, params);

    return new Promise((resolve, reject) => {
      if (!this.websocket) return;
      this.websocket.onmessage = ({ data }) => {
        const message: WsResponse = JSON.parse(data);
        if (message.id === sendId) {
          if (message.result) {
            resolve(message.result);
          } else {
            reject(Error(`response on ${method} missing result`));
          }
        }
        console.log(`data from ${method} response`, data);
      };
      this.websocket.onerror = reject;
    });
  }

  /**
   * * await while websocket is connected
   * * add event listeners
   */
  public async waitForConnection(): Promise<typeof this.websocket.readyState> {
    // Wait websocket to connect
    if (this.websocket.readyState !== WebSocket.OPEN) {
      return new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onopen = () => resolve(this.websocket.readyState);
        this.websocket.onerror = reject;
      });
    }

    this.websocket.addEventListener('open', this.onOpen.bind(this));
    this.websocket.addEventListener('close', this.onClose.bind(this));
    this.websocket.addEventListener('message', this.onMessage.bind(this));
    this.websocket.addEventListener('error', this.onError.bind(this));

    return this.websocket.readyState;
  }

  /**
   * await while websocket is disconnected
   */
  public async waitForDisconnection(): Promise<typeof this.websocket.readyState> {
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

  public disconnect() {
    this.websocket.close();
  }

  /**
   * Helper to check connection is open
   */
  public isConnected() {
    return this.websocket.readyState === WebSocket.OPEN;
  }

  private reconnect() {
    // TODO: Test if connected if not connected reconnect
  }

  private reconnectAndUpdate() {
    this.reconnect();
    // TODO: replay data from last block received (including it) up to latest
  }

  public onOpen() {
    console.log('socket open');
  }

  public onError() {
    console.log('socket error');
  }

  public onClose() {
    this.websocket.removeEventListener('open', this.onOpen);
    this.websocket.removeEventListener('close', this.onClose);
    this.websocket.removeEventListener('message', this.onMessage);
    this.websocket.removeEventListener('error', this.onError);
  }

  private onMessage({ data }: any /* MessageEvent */) {
    // TODO: Add error case
    const message = JSON.parse(data);

    console.log('onMessage:', data);

    // Forward events (events contains method)
    switch (message.method) {
      case 'starknet_subscriptionReorg':
        throw Error('Reorg'); // todo: implement what to do
        break;
      case 'starknet_subscriptionNewHeads':
        this.onsNewHeads(message.params);
        break;
      case 'starknet_subscriptionEvents':
        this.onEvents(message.params);
        break;
      case 'starknet_subscriptionTransactionsStatus':
        this.onTransactionStatus(message.params);
        break;
      case 'starknet_subscriptionPendingTransactions':
        this.onPendingTransactionStatus(message.params);
        break;
      default:
        break;
    }

    // All messages
    this.on(message);
  }

  // TODO: Add ping service

  private idResolver(id?: number) {
    // unmanaged user set id
    if (id) return id;
    // managed id, intentional return old and than increment
    // eslint-disable-next-line no-plusplus
    return this.sendId++;
  }

  /**
   * Send data over open ws connection
   */
  public send(method: string, params?: object, id?: number) {
    if (!this.isConnected()) {
      throw Error('WebSocketChannel.send() fail due to socket not been connected');
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
    // this.awaitingResponses.push(rpcRequestBody);
    return usedId;
  }

  private unsubscribe(subscriptionId: number) {
    return this.sendReceive('starknet_unsubscribe', {
      subscription_id: subscriptionId,
    }) as Promise<boolean>;
  }

  /**
   * subscribe to new block heads
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeNewHeadsUnmanaged(blockIdentifier?: BlockIdentifier) {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;

    return this.sendReceive('starknet_subscribeNewHeads', {
      ...{ block: block_id },
    }) as Promise<SUBSCRIPTION_RESULT>;
  }

  public async subscribeNewHeads(blockIdentifier?: BlockIdentifier) {
    if (this.eventsSubscriptionId) throw Error('subscription to this event already exists');
    this.newHeadsSubscriptionId = (
      await this.subscribeNewHeadsUnmanaged(blockIdentifier)
    ).subscription_id;
    return this.newHeadsSubscriptionId;
  }

  public async unsubscribeNewHeads() {
    if (!this.newHeadsSubscriptionId) throw Error('There is no subscription on this event');
    const status = await this.unsubscribe(this.newHeadsSubscriptionId);
    if (status) this.newHeadsSubscriptionId = undefined;
    return status;
  }

  /**
   * subscribe to new block heads
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeEventsUnmanaged(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: BlockIdentifier
  ) {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    return this.sendReceive('starknet_subscribeEvents', {
      ...{ from_address: fromAddress && toHex(fromAddress) },
      ...{ keys },
      ...{ block: block_id },
    }) as Promise<SUBSCRIPTION_RESULT>;
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeEvents(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: BlockIdentifier
  ) {
    if (this.eventsSubscriptionId) throw Error('subscription to this event already exists');
    // eslint-disable-next-line prefer-rest-params
    this.eventsSubscriptionId = (
      await this.subscribeEventsUnmanaged(fromAddress, keys, blockIdentifier)
    ).subscription_id;

    return this.eventsSubscriptionId;
  }

  public unsubscribeEvents() {
    if (!this.eventsSubscriptionId) throw Error('There is no subscription ID for this event');
    return this.unsubscribe(this.eventsSubscriptionId);
  }

  // TODO: Test Generics

  private async genericSubscribe(idPointer: any, callback: Function) {
    if (idPointer) throw Error('subscription to this event already exists');
    // eslint-disable-next-line no-param-reassign
    idPointer = await callback();
    return idPointer;
  }

  private genericUnsubscribe(idPointer: any) {
    if (!idPointer) throw Error('There is no subscription ID for this event');
    return this.unsubscribe(idPointer);
  }

  /**
   * subscribe to new block heads
   * * you can subscribe to this event multiple times and you need to manage subscriptions manually
   */
  public subscribeTransactionStatusUnmanaged(
    transactionHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    const transaction_hash = toHex(transactionHash);
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    return this.sendReceive('starknet_subscribeTransactionStatus', {
      transaction_hash,
      ...{ block: block_id },
    }) as Promise<SUBSCRIPTION_RESULT>;
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeTransactionStatus(
    transactionHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    return this.genericSubscribe(this.transactionStatusSubscriptionId, () =>
      this.subscribeTransactionStatusUnmanaged(transactionHash, blockIdentifier)
    );
  }

  public unsubscribeTransactionStatus() {
    return this.genericUnsubscribe(this.transactionStatusSubscriptionId);
  }
}
