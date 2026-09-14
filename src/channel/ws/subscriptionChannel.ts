/* eslint-disable no-underscore-dangle */
import { SupportedRpcVersion } from '../../global/constants';
import { logger } from '../../global/logger';
import type { RPC_ERROR } from '../../types';
import type { JRPC, SUBSCRIPTION_ID } from '../../types/api';
import { RpcError, WebSocketNotConnectedError } from '../../utils/errors';
import { bigNumberishArrayToHexadecimalStringArray, toHex } from '../../utils/num';
import { Block } from '../../utils/provider';
import type { RpcNotification, WsTransport } from '../transport';
import { Subscription } from './subscription';
import type {
  SubscribeEventsParams,
  SubscribeNewHeadsParams,
  SubscribeNewTransactionReceiptsParams,
  SubscribeNewTransactionsParams,
  SubscribeTransactionStatusParams,
  SubscriptionNewHeadsEvent,
  SubscriptionNewTransactionEvent,
  SubscriptionNewTransactionReceiptsEvent,
  SubscriptionStarknetEventsEvent,
  SubscriptionTransactionStatusEvent,
} from './ws_0_10';

/** A transport that can come back after a drop and wants work done before it resumes. */
type ReconnectAware = {
  onReconnected(hook: () => Promise<void>): () => void;
};

const isReconnectAware = (transport: unknown): transport is ReconnectAware =>
  typeof (transport as ReconnectAware).onReconnected === 'function';

/** What a {@link SubscriptionChannel} needs: a socket to borrow, and how much to buffer. */
export type SubscriptionChannelOptions = {
  /** The transport to send on and listen to. Borrowed, never closed by this channel. */
  transport: WsTransport;
  /** Events held per subscription while no handler is attached. Defaults to 1000. */
  maxBufferSize?: number;
};

/**
 * The `starknet_subscribe*` surface of one spec version.
 *
 * Versioned because params and result types differ between specs even though the five method
 * names do not — so this class lives in the same namespace as its spec's `RpcChannel`, and a
 * namespace means "everything for this spec version".
 *
 * It borrows a `WsTransport`: it sends through it, listens to its notifications, and learns from
 * its state that the connection is gone. It never closes the socket — one object owns it.
 *
 * Reach for it directly only when you want subscriptions without a provider; otherwise use
 * `WebSocketProvider`, whose `subscriptions` property is an instance of this class already paired
 * with the request channel of the same spec version.
 * @example
 * ```typescript
 * const transport = new ReconnectingWsTransport({ nodeUrl: 'wss://…/rpc/v0_10' });
 * const channel = new RPC0103.SubscriptionChannel({ transport });
 *
 * const sub = await channel.subscribeNewHeads();
 * sub.on((header) => console.log(header.block_number));
 * ```
 */
export class SubscriptionChannel {
  readonly id: string = 'RPC0.10.2-subscriptions';

  readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_2;

  protected readonly transport: WsTransport;

  protected readonly maxBufferSize: number;

  /** Live subscriptions, keyed by the id the node issued. Always a string — see spec §6. */
  private activeSubscriptions = new Map<SUBSCRIPTION_ID, Subscription<any>>();

  /**
   * Callers blocked in `waitForUnsubscription`, keyed by subscription id.
   *
   * Held here rather than as event listeners because an `unsubscribe` event only ever announces
   * success: a waiter attached to it cannot learn that the node refused, or that the connection
   * went away, and would wait forever with no timeout of its own to fall back on.
   */
  private unsubscribeWaiters = new Map<
    SUBSCRIPTION_ID,
    Set<{ resolve: () => void; reject: (error: Error) => void }>
  >();

  /**
   * Events that arrived before their subscription finished registering.
   *
   * The node can push the first event in the same burst as the reply carrying the subscription
   * id, while the continuation that registers the handle has not run yet. Holding the event and
   * handing it over at registration is deterministic; the alternative — waiting a fixed number
   * of microtasks — only works for one particular call depth and breaks silently when a layer
   * is added.
   */
  private earlyEvents = new Map<SUBSCRIPTION_ID, unknown[]>();

  /**
   * Subscribe requests currently on the wire.
   *
   * An unknown subscription id is only worth holding while one of these is outstanding.
   * Otherwise it belongs to a subscription that is already gone — the node pushing one last
   * event after an unsubscribe — and holding it would leak.
   */
  private pendingSubscribes = 0;

  /** Its own request numbering, renumbered by the transport before it reaches the wire. */
  private requestId = 0;

  private detachNotifications: () => void;

  private detachState: () => void;

  private detachReconnected: () => void = () => {};

  constructor(options: SubscriptionChannelOptions) {
    this.transport = options.transport;
    this.maxBufferSize = options.maxBufferSize ?? 1000;
    this.detachNotifications = this.transport.on('notification', this.handleNotification);
    this.detachState = this.transport.on('statechange', this.handleStateChange);
    // Recognised structurally rather than by class, so this file does not need to know that a
    // reconnecting transport exists — only that some transports come back.
    if (isReconnectAware(this.transport)) {
      this.detachReconnected = this.transport.onReconnected(() => this.restore());
    }
  }

  /**
   * Sends one JSON-RPC call and returns its result, applying the same error contract as
   * `RpcChannel`: a protocol error becomes a typed `RpcError`.
   */
  protected async send<T>(method: string, params?: object): Promise<T> {
    this.requestId += 1;
    const response = (await this.transport.request({
      id: this.requestId,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    })) as JRPC.ResponseBody & { error?: JRPC.Error; result?: T };

    if (response.error) {
      throw new RpcError(response.error as RPC_ERROR, method, params);
    }
    return response.result as T;
  }

  /** Registers a new subscription and returns the handle the caller keeps. */
  protected async openSubscription<T>(method: string, rpcParams: object): Promise<Subscription<T>> {
    this.pendingSubscribes += 1;
    try {
      const subId = await this.send<SUBSCRIPTION_ID>(method, rpcParams);
      const subscription = new Subscription<T>({
        channel: this,
        method,
        params: rpcParams,
        id: subId,
        maxBufferSize: this.maxBufferSize,
      });
      this.activeSubscriptions.set(subId, subscription);

      // Anything the node pushed for this id while the round trip was still in flight, in the
      // order it arrived.
      const early = this.earlyEvents.get(subId);
      if (early) {
        this.earlyEvents.delete(subId);
        early.forEach((event) => subscription._handleEvent(event as T));
      }
      return subscription;
    } finally {
      this.pendingSubscribes -= 1;
      if (this.pendingSubscribes === 0 && this.earlyEvents.size > 0) {
        // Nothing else can claim these now.
        this.earlyEvents.forEach((_events, id) =>
          logger.warn(`SubscriptionChannel: Received event for untracked subscription ID: ${id}.`)
        );
        this.earlyEvents.clear();
      }
    }
  }

  /**
   * Subscribes to new block headers.
   * @param params - Where to start from. Defaults to the latest block; a block number or hash
   * replays from there, up to 1024 blocks back.
   * @returns A `Subscription` delivering one block header per new block.
   * @example
   * ```typescript
   * const sub = await channel.subscribeNewHeads();
   * sub.on((header) => console.log(header.block_number, header.block_hash));
   * ```
   */
  public async subscribeNewHeads(
    params: SubscribeNewHeadsParams = {}
  ): Promise<SubscriptionNewHeadsEvent> {
    const method = 'starknet_subscribeNewHeads';
    const rpcParams = {
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
    };
    return this.openSubscription(method, rpcParams);
  }

  /**
   * Subscribes to events matching a given filter.
   * @param params - Filters on the emitting address, the event keys, the starting block and the
   * finality status. All are optional: without any, every event of the network is delivered.
   * @returns A `Subscription` delivering one emitted event at a time.
   * @example
   * ```typescript
   * const sub = await channel.subscribeEvents({
   *   fromAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
   *   finalityStatus: 'ACCEPTED_ON_L2',
   * });
   * sub.on((event) => console.log(event.from_address, event.keys, event.data));
   * ```
   */
  public async subscribeEvents(
    params: SubscribeEventsParams = {}
  ): Promise<SubscriptionStarknetEventsEvent> {
    const method = 'starknet_subscribeEvents';
    let from_address: string | string[] | undefined;
    if (params.fromAddress !== undefined) {
      from_address = Array.isArray(params.fromAddress)
        ? bigNumberishArrayToHexadecimalStringArray(params.fromAddress)
        : toHex(params.fromAddress);
    }
    const rpcParams = {
      from_address,
      keys: params.keys,
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
      finality_status: params.finalityStatus,
    };
    return this.openSubscription(method, rpcParams);
  }

  /**
   * Subscribes to status updates for a specific transaction.
   * @param params - The `transactionHash` to follow, and optionally the block to start from.
   * @returns A `Subscription` delivering the transaction's current status, then every change.
   * @example
   * ```typescript
   * const sub = await channel.subscribeTransactionStatus({ transactionHash: '0x0123...' });
   * sub.on((update) => console.log(update.status.finality_status));
   * ```
   */
  public async subscribeTransactionStatus(
    params: SubscribeTransactionStatusParams
  ): Promise<SubscriptionTransactionStatusEvent> {
    const method = 'starknet_subscribeTransactionStatus';
    const rpcParams = {
      transaction_hash: toHex(params.transactionHash),
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : undefined,
    };
    return this.openSubscription(method, rpcParams);
  }

  /**
   * Subscribes to new transaction receipts.
   *
   * Same filters as {@link subscribeNewTransactions}, but the full receipt is delivered instead of
   * the transaction.
   * @param params - Optional filters on the finality status and on the sender addresses.
   * @returns A `Subscription` delivering one receipt per matching transaction.
   * @example
   * ```typescript
   * const sub = await channel.subscribeNewTransactionReceipts({
   *   finalityStatus: ['ACCEPTED_ON_L2'],
   * });
   * sub.on((receipt) => console.log(receipt.transaction_hash, receipt.execution_status));
   * ```
   */
  public async subscribeNewTransactionReceipts(
    params: SubscribeNewTransactionReceiptsParams = {}
  ): Promise<SubscriptionNewTransactionReceiptsEvent> {
    const method = 'starknet_subscribeNewTransactionReceipts';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
    };
    return this.openSubscription(method, rpcParams);
  }

  /**
   * Subscribes to new transactions and to their finality status changes.
   *
   * One event is fired per status update, so the same transaction can be delivered several times.
   * @param params - Optional filters on the finality status (defaults to `['ACCEPTED_ON_L2']`) and
   * on the sender addresses.
   * @returns A `Subscription` delivering one transaction per matching status update.
   * @example
   * ```typescript
   * const sub = await channel.subscribeNewTransactions({
   *   finalityStatus: ['RECEIVED', 'ACCEPTED_ON_L2'],
   * });
   * sub.on((tx) => console.log(tx.transaction_hash, tx.finality_status));
   * ```
   */
  public async subscribeNewTransactions(
    params: SubscribeNewTransactionsParams = {}
  ): Promise<SubscriptionNewTransactionEvent> {
    const method = 'starknet_subscribeNewTransactions';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
      tags: params.tags,
    };
    return this.openSubscription(method, rpcParams);
  }

  private handleNotification = (notification: RpcNotification) => {
    const { subscription_id: subscriptionId, result } = notification.params as {
      subscription_id: SUBSCRIPTION_ID;
      result: unknown;
    };
    if (subscriptionId === undefined) return;

    const subscription = this.activeSubscriptions.get(subscriptionId);
    if (subscription) {
      subscription._handleEvent(result);
      return;
    }
    if (this.pendingSubscribes === 0) {
      // No subscribe is in flight, so no registration can be about to claim this — it belongs
      // to a subscription that is already gone.
      logger.warn(
        `SubscriptionChannel: Received event for untracked subscription ID: ${subscriptionId}.`
      );
      return;
    }
    // Held until `openSubscription` registers the id, which then delivers these first and in
    // arrival order, so an event is never reordered behind one that came later.
    const buffered = this.earlyEvents.get(subscriptionId) ?? [];
    buffered.push(result);
    this.earlyEvents.set(subscriptionId, buffered);
  };

  private handleStateChange = () => {
    const state = this.transport.getState();
    if (state === 'open' || state === 'connecting') return;
    // Rejected on every loss of the connection, reconnecting or not — as 10.6.8 does. Once the
    // connection is gone no unsubscribe can be observed on it: a reconnection restores each
    // subscription under a fresh id, so the id being waited on will never be announced. This is
    // why the subscription channel needs the transport's observable state.
    this.rejectUnsubscribeWaiters('the connection was closed');
  };

  /**
   * Re-issues every live subscription on a freshly reconnected socket.
   *
   * A subscription that cannot be re-established is **not** put back in the map, and its handle
   * is closed: otherwise it would keep reporting itself as live while nothing could ever reach
   * its handler again.
   */
  public async restore(): Promise<void> {
    const previous = Array.from(this.activeSubscriptions.values());
    this.activeSubscriptions.clear();

    await Promise.all(
      previous.map(async (subscription) => {
        try {
          const newId = await this.send<SUBSCRIPTION_ID>(subscription.method, subscription.params);
          // eslint-disable-next-line no-param-reassign
          subscription.id = newId;
          this.activeSubscriptions.set(newId, subscription);
          logger.info(`Subscription ${subscription.method} restored with new ID: ${newId}`);
        } catch (error) {
          logger.error(`Failed to restore subscription ${subscription.method}:`, error);
          subscription._markClosed();
        }
      })
    );
  }

  /**
   * Unsubscribes from a Starknet subscription.
   *
   * Prefer `subscription.unsubscribe()`.
   * @internal
   */
  public async unsubscribe(subscriptionId: SUBSCRIPTION_ID): Promise<boolean> {
    let status: boolean;
    try {
      status = await this.send<boolean>('starknet_unsubscribe', {
        subscription_id: subscriptionId,
      });
    } catch (error) {
      this.settleUnsubscribeWaiters(subscriptionId, error as Error);
      throw error;
    }
    if (status) {
      this.settleUnsubscribeWaiters(subscriptionId);
    } else {
      this.settleUnsubscribeWaiters(
        subscriptionId,
        new Error(`Node refused to unsubscribe subscription ${subscriptionId}`)
      );
    }
    return status;
  }

  /**
   * Removes a subscription from the active map.
   * @internal
   */
  public removeSubscription(subscriptionId: SUBSCRIPTION_ID): void {
    this.activeSubscriptions.delete(subscriptionId);
  }

  /**
   * The live subscriptions, keyed by the id the node issued.
   * @internal Exposed for the `WebSocketChannel` compatibility façade.
   */
  public get subscriptions(): ReadonlyMap<SUBSCRIPTION_ID, Subscription<any>> {
    return this.activeSubscriptions;
  }

  /** Resolves when a specific subscription is successfully unsubscribed. */
  public waitForUnsubscription(targetId: SUBSCRIPTION_ID): Promise<void> {
    return new Promise((resolve, reject) => {
      const waiters = this.unsubscribeWaiters.get(targetId) ?? new Set();
      waiters.add({ resolve, reject });
      this.unsubscribeWaiters.set(targetId, waiters);
    });
  }

  private settleUnsubscribeWaiters(subscriptionId: SUBSCRIPTION_ID, error?: Error): void {
    const waiters = this.unsubscribeWaiters.get(subscriptionId);
    if (!waiters) return;
    this.unsubscribeWaiters.delete(subscriptionId);
    waiters.forEach((waiter) => (error ? waiter.reject(error) : waiter.resolve()));
  }

  private rejectUnsubscribeWaiters(reason: string): void {
    if (this.unsubscribeWaiters.size === 0) return;
    Array.from(this.unsubscribeWaiters.keys()).forEach((id) =>
      this.settleUnsubscribeWaiters(
        id,
        new WebSocketNotConnectedError(`Subscription ${id} was never unsubscribed: ${reason}`)
      )
    );
  }

  /**
   * Stops listening to the transport and settles anything still waiting.
   *
   * Does **not** close the socket: this channel borrowed it.
   */
  public close(): void {
    this.detachNotifications();
    this.detachState();
    this.detachReconnected();
    this.rejectUnsubscribeWaiters('the subscription channel was closed');
    this.activeSubscriptions.forEach((subscription) => subscription._markClosed());
    this.activeSubscriptions.clear();
    this.earlyEvents.clear();
  }
}
