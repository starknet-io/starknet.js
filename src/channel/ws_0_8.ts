import { WebSocket } from 'isows';

import { BigNumberish, BlockIdentifier } from '../types';
import { JRPC } from '../types/api';
import { stringify } from '../utils/json';
import { toHex } from '../utils/num';
import { Block } from '../utils/provider';
import { WebSocketChannelInterface, WebSocketOptions } from './ws/interface';

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

  public onTransactionStatus: Function = () => {};

  public onEvents: Function = () => {};

  /**
   * Read all receiving messages using this method
   */
  public on: Function = () => {};

  public newHeadsSubscriptionId?: Number;

  public transactionStatusSubscriptionId?: Number;

  public pendingTransactionStatusSubscriptionId?: Number;

  public eventsSubscriptionId?: Number;

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

  public async waitForConnection() {
    // TODO: test
    // Wait websocket to connect
    if (this.websocket.readyState === WebSocket.CONNECTING) {
      await new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onopen = resolve;
        this.websocket.onerror = reject;
      });
    }

    this.websocket.addEventListener('open', this.onOpen.bind(this));
    this.websocket.addEventListener('close', this.onClose.bind(this));
    this.websocket.addEventListener('message', this.onMessage.bind(this));
    this.websocket.addEventListener('error', this.onError.bind(this));
  }

  public async waitForDisconnection() {
    // Wait websocket to disconnect
    if (this.websocket.readyState !== WebSocket.CLOSED) {
      await new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onclose = resolve;
        this.websocket.onerror = reject;
      });
    }
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

  public onOpen() {}

  public onError() {}

  public onClose() {
    this.websocket.removeEventListener('open', this.onOpen);
    this.websocket.removeEventListener('close', this.onClose);
    this.websocket.removeEventListener('message', this.onMessage);
    this.websocket.removeEventListener('error', this.onError);
  }

  private onMessage({ data }: any /* MessageEvent */) {
    // TODO: Add error case
    const message = JSON.parse(data);

    console.log('RECEIVED:', data);

    // Received Subscription responses
    switch (message.method) {
      case 'starknet_subscribeNewHeads':
        this.newHeadsSubscriptionId = message.result;
        break;
      case 'starknet_subscribeEvents':
        this.eventsSubscriptionId = message.result;
        break;
      case 'starknet_subscribeTransactionStatus':
        this.transactionStatusSubscriptionId = message.result;
        break;
      case 'starknet_subscribePendingTransactions':
        this.pendingTransactionStatusSubscriptionId = message.result;
        break;
      default:
        break;
    }

    // Received events
    switch (message.method) {
      case 'starknet_subscriptionReorg':
        throw Error('Reorg'); // todo: implement what to do
        break;
      case 'starknet_subscriptionNewHeads':
        this.onsNewHeads(message.result);
        break;
      case 'starknet_subscriptionEvents':
        this.onTransactionStatus(message.result);
        break;
      case 'starknet_subscriptionTransactionsStatus':
        this.onEvents(message.result);
        break;
      default:
        break;
    }

    // All messages
    this.on(message);
  }

  // TODO: Add ping service

  /**
   * Send data over open ws connection
   */
  public async send(method: string, params?: object, id: string | number = 0) {
    if (!this.isConnected()) {
      throw Error('WebSocketChannel.send() fail due to socket not been connected');
    }
    const rpcRequestBody: JRPC.RequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    this.websocket.send(stringify(rpcRequestBody));
  }

  /**
   * subscribe to new block heads
   */
  public subscribeNewHeads(blockIdentifier?: BlockIdentifier) {
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    // TODO: Corelate request to response
    this.send('starknet_subscribeNewHeads', { ...spreadIfDefined('block', block_id) });
  }

  public unsubscribeNewHeads() {
    this.send('starknet_unsubscribe', { subscription_id: this.newHeadsSubscriptionId });
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeEvents(
    fromAddress?: BigNumberish,
    keys?: string[][],
    blockIdentifier?: BlockIdentifier
  ) {
    // TODO: Corelate request to response
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    this.send('starknet_subscribeEvents', {
      ...spreadIfDefined('from_address', fromAddress && toHex(fromAddress)),
      ...spreadIfDefined('keys', keys),
      ...spreadIfDefined('block', block_id),
    });
  }

  /**
   * subscribe to new block heads
   */
  public async subscribeTransactionStatus(
    transactionHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ) {
    // TODO: Corelate request to response
    const transaction_hash = toHex(transactionHash);
    const block_id = blockIdentifier ? new Block(blockIdentifier).identifier : undefined;
    this.send('starknet_subscribeTransactionStatus', {
      transaction_hash,
      ...spreadIfDefined('block', block_id),
    });
  }
}

/**
 * helper method will return object with property to be spread (added to another object) if value if not undefined
 * It will work with false, 0, null as value.
 *
 * Contrary to ...(v && {x:v} where this expresions will also eliminate any falsy* (0, null, false)
 */
function spreadIfDefined(key: string, value: any) {
  return value !== undefined && { [key]: value };
}

// Bolje bi bilo napravit remove undefined from object
