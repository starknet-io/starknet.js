# Class: WebSocketChannel

Defined in: [src/channel/ws/ws_0_10.ts:174](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L174)

Manages a WebSocket connection to a Starknet node for receiving real-time updates.
This class handles subscriptions, automatic reconnection, and request queueing.

## Example

```typescript
const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
await channel.waitForConnection();

const sub = await channel.subscribeNewHeads();
sub.on((data) => {
  console.log('New Block:', data);
});

// ... later
await sub.unsubscribe();
channel.disconnect();
```

## Constructors

### Constructor

> **new WebSocketChannel**(`options`): `WebSocketChannel`

Defined in: [src/channel/ws/ws_0_10.ts:260](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L260)

Creates an instance of WebSocketChannel.

#### Parameters

##### options

[`WebSocketOptions`](../type-aliases/WebSocketOptions.md)

The options for configuring the channel.

#### Returns

`WebSocketChannel`

## Properties

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/channel/ws/ws_0_10.ts:179](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L179)

The URL of the WebSocket RPC Node.

#### Example

```ts
'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8';
```

---

### websocket

> **websocket**: `WebSocket`

Defined in: [src/channel/ws/ws_0_10.ts:184](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L184)

The underlying WebSocket instance.

## Methods

### send()

> **send**(`method`, `params?`, `id?`): `number`

Defined in: [src/channel/ws/ws_0_10.ts:299](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L299)

Sends a JSON-RPC request over the WebSocket connection without waiting for a response.
This is a low-level method. Prefer `sendReceive` for most use cases.

#### Parameters

##### method

`string`

The RPC method name.

##### params?

`object`

The parameters for the RPC method.

##### id?

`number`

A specific request ID. If not provided, an auto-incrementing ID is used.

#### Returns

`number`

The ID of the sent request.

#### Throws

If the WebSocket is not connected.

---

### sendReceive()

> **sendReceive**\<`T`\>(`method`, `params?`): `Promise`\<`T`\>

Defined in: [src/channel/ws/ws_0_10.ts:328](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L328)

Sends a JSON-RPC request and returns a Promise that resolves with the result.
This method abstracts the request/response cycle over WebSockets.
If the connection is lost, it will queue the request and send it upon reconnection.

#### Type Parameters

##### T

`T` = `any`

The expected type of the result.

#### Parameters

##### method

`string`

The RPC method name.

##### params?

`object`

The parameters for the RPC method.

#### Returns

`Promise`\<`T`\>

A Promise that resolves with the RPC response result.

#### Throws

If the request does not receive a response within the configured `requestTimeout`.

#### Throws

If the WebSocket is not connected and auto-reconnect is disabled.

---

### isConnected()

> **isConnected**(): `boolean`

Defined in: [src/channel/ws/ws_0_10.ts:432](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L432)

Checks if the WebSocket connection is currently open.

#### Returns

`boolean`

`true` if the connection is open, `false` otherwise.

---

### waitForConnection()

> **waitForConnection**(): `Promise`\<`number`\>

Defined in: [src/channel/ws/ws_0_10.ts:447](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L447)

Returns a Promise that resolves when the WebSocket connection is open.
Can be used to block execution until the connection is established.

#### Returns

`Promise`\<`number`\>

A Promise that resolves with the WebSocket's `readyState` when connected.

#### Example

```typescript
const channel = new WebSocketChannel({ nodeUrl: '...' });
await channel.waitForConnection();
console.log('Connected!');
```

---

### disconnect()

> **disconnect**(`code?`, `reason?`): `void`

Defined in: [src/channel/ws/ws_0_10.ts:468](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L468)

Closes the WebSocket connection.
This method is user-initiated and will prevent automatic reconnection for this closure.

#### Parameters

##### code?

`number`

The WebSocket connection close code.

##### reason?

`string`

The WebSocket connection close reason.

#### Returns

`void`

---

### waitForDisconnection()

> **waitForDisconnection**(): `Promise`\<`number` \| `Event`\>

Defined in: [src/channel/ws/ws_0_10.ts:493](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L493)

Returns a Promise that resolves when the WebSocket connection is closed.

#### Returns

`Promise`\<`number` \| `Event`\>

A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.

---

### unsubscribe()

> **unsubscribe**(`subscriptionId`): `Promise`\<`boolean`\>

Defined in: [src/channel/ws/ws_0_10.ts:513](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L513)

**`Internal`**

Unsubscribes from a Starknet subscription.
It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.

#### Parameters

##### subscriptionId

`string`

The ID of the subscription to unsubscribe from.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves with `true` if the unsubscription was successful.

---

### waitForUnsubscription()

> **waitForUnsubscription**(`targetId`): `Promise`\<`void`\>

Defined in: [src/channel/ws/ws_0_10.ts:569](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L569)

Returns a Promise that resolves when a specific subscription is successfully unsubscribed.

#### Parameters

##### targetId

`string`

The ID of the subscription to wait for.

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await channel.waitForUnsubscription(mySubscription.id);
console.log('Successfully unsubscribed.');
```

---

### reconnect()

> **reconnect**(): `void`

Defined in: [src/channel/ws/ws_0_10.ts:581](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L581)

Manually initiates a reconnection attempt.
This creates a new WebSocket instance and re-establishes listeners.

#### Returns

`void`

---

### subscribeNewHeads()

> **subscribeNewHeads**(`params?`): `Promise`\<[`SubscriptionNewHeadsEvent`](../type-aliases/SubscriptionNewHeadsEvent.md)\>

Defined in: [src/channel/ws/ws_0_10.ts:823](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L823)

Subscribes to new block headers.

#### Parameters

##### params?

[`SubscribeNewHeadsParams`](../interfaces/SubscribeNewHeadsParams.md) = `{}`

The parameters for the subscription.

#### Returns

`Promise`\<[`SubscriptionNewHeadsEvent`](../type-aliases/SubscriptionNewHeadsEvent.md)\>

A Promise that resolves with a `Subscription` object for new block headers.

---

### subscribeEvents()

> **subscribeEvents**(`params?`): `Promise`\<[`SubscriptionStarknetEventsEvent`](../type-aliases/SubscriptionStarknetEventsEvent.md)\>

Defined in: [src/channel/ws/ws_0_10.ts:847](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L847)

Subscribes to events matching a given filter.

#### Parameters

##### params?

[`SubscribeEventsParams`](../interfaces/SubscribeEventsParams.md) = `{}`

The parameters for the subscription.

#### Returns

`Promise`\<[`SubscriptionStarknetEventsEvent`](../type-aliases/SubscriptionStarknetEventsEvent.md)\>

A Promise that resolves with a `Subscription` object for the specified events.

---

### subscribeTransactionStatus()

> **subscribeTransactionStatus**(`params`): `Promise`\<[`SubscriptionTransactionStatusEvent`](../type-aliases/SubscriptionTransactionStatusEvent.md)\>

Defined in: [src/channel/ws/ws_0_10.ts:880](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L880)

Subscribes to status updates for a specific transaction.

#### Parameters

##### params

[`SubscribeTransactionStatusParams`](../interfaces/SubscribeTransactionStatusParams.md)

The parameters for the subscription.

#### Returns

`Promise`\<[`SubscriptionTransactionStatusEvent`](../type-aliases/SubscriptionTransactionStatusEvent.md)\>

A Promise that resolves with a `Subscription` object for the transaction's status.

---

### subscribeNewTransactionReceipts()

> **subscribeNewTransactionReceipts**(`params?`): `Promise`\<[`SubscriptionNewTransactionReceiptsEvent`](../type-aliases/SubscriptionNewTransactionReceiptsEvent.md)\>

Defined in: [src/channel/ws/ws_0_10.ts:905](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L905)

Subscribes to new transaction receipts.

#### Parameters

##### params?

[`SubscribeNewTransactionReceiptsParams`](../interfaces/SubscribeNewTransactionReceiptsParams.md) = `{}`

The parameters for the subscription.

#### Returns

`Promise`\<[`SubscriptionNewTransactionReceiptsEvent`](../type-aliases/SubscriptionNewTransactionReceiptsEvent.md)\>

A Promise that resolves with a `Subscription` object for new transaction receipts.

---

### subscribeNewTransactions()

> **subscribeNewTransactions**(`params?`): `Promise`\<[`SubscriptionNewTransactionEvent`](../type-aliases/SubscriptionNewTransactionEvent.md)\>

Defined in: [src/channel/ws/ws_0_10.ts:931](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L931)

Subscribes to new transactions.

#### Parameters

##### params?

[`SubscribeNewTransactionsParams`](../interfaces/SubscribeNewTransactionsParams.md) = `{}`

The parameters for the subscription.

#### Returns

`Promise`\<[`SubscriptionNewTransactionEvent`](../type-aliases/SubscriptionNewTransactionEvent.md)\>

A Promise that resolves with a `Subscription` object for new transactions.

---

### removeSubscription()

> **removeSubscription**(`id`): `void`

Defined in: [src/channel/ws/ws_0_10.ts:957](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L957)

**`Internal`**

Internal method to remove subscription from active map.

#### Parameters

##### id

`string`

#### Returns

`void`

---

### on()

> **on**\<`K`\>(`event`, `listener`): `void`

Defined in: [src/channel/ws/ws_0_10.ts:966](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L966)

Adds a listener for a given event.

#### Type Parameters

##### K

`K` _extends_ keyof `WebSocketChannelEvents`

#### Parameters

##### event

`K`

The event name.

##### listener

(`data`) => `void`

The listener function to add.

#### Returns

`void`

---

### off()

> **off**\<`K`\>(`event`, `listener`): `void`

Defined in: [src/channel/ws/ws_0_10.ts:978](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L978)

Removes a listener for a given event.

#### Type Parameters

##### K

`K` _extends_ keyof `WebSocketChannelEvents`

#### Parameters

##### event

`K`

The event name.

##### listener

(`data`) => `void`

The listener function to remove.

#### Returns

`void`
