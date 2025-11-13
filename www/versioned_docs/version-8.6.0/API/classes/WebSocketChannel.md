---
id: 'WebSocketChannel'
title: 'Class: WebSocketChannel'
sidebar_label: 'WebSocketChannel'
sidebar_position: 0
custom_edit_url: null
---

Manages a WebSocket connection to a Starknet node for receiving real-time updates.
This class handles subscriptions, automatic reconnection, and request queueing.

**`Example`**

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

### constructor

• **new WebSocketChannel**(`options`): [`WebSocketChannel`](WebSocketChannel.md)

Creates an instance of WebSocketChannel.

#### Parameters

| Name      | Type                                                 | Description                              |
| :-------- | :--------------------------------------------------- | :--------------------------------------- |
| `options` | [`WebSocketOptions`](../modules.md#websocketoptions) | The options for configuring the channel. |

#### Returns

[`WebSocketChannel`](WebSocketChannel.md)

#### Defined in

[src/channel/ws/ws_0_9.ts:218](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L218)

## Properties

### nodeUrl

• **nodeUrl**: `string`

The URL of the WebSocket RPC Node.

**`Example`**

```ts
'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8';
```

#### Defined in

[src/channel/ws/ws_0_9.ts:162](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L162)

---

### websocket

• **websocket**: `WebSocket`

The underlying WebSocket instance.

#### Defined in

[src/channel/ws/ws_0_9.ts:167](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L167)

---

### WsImplementation

• `Private` **WsImplementation**: [`WebSocketModule`](../modules.md#websocketmodule)

#### Defined in

[src/channel/ws/ws_0_9.ts:170](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L170)

---

### activeSubscriptions

• `Private` **activeSubscriptions**: `Map`<`string`, [`Subscription`](Subscription.md)<`any`\>\>

#### Defined in

[src/channel/ws/ws_0_9.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L173)

---

### maxBufferSize

• `Private` `Readonly` **maxBufferSize**: `number`

#### Defined in

[src/channel/ws/ws_0_9.ts:175](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L175)

---

### autoReconnect

• `Private` `Readonly` **autoReconnect**: `boolean`

#### Defined in

[src/channel/ws/ws_0_9.ts:177](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L177)

---

### reconnectOptions

• `Private` `Readonly` **reconnectOptions**: `Required`<[`ReconnectOptions`](../modules.md#reconnectoptions)\>

#### Defined in

[src/channel/ws/ws_0_9.ts:179](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L179)

---

### requestTimeout

• `Private` `Readonly` **requestTimeout**: `number`

#### Defined in

[src/channel/ws/ws_0_9.ts:181](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L181)

---

### isReconnecting

• `Private` **isReconnecting**: `boolean` = `false`

#### Defined in

[src/channel/ws/ws_0_9.ts:183](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L183)

---

### reconnectAttempts

• `Private` **reconnectAttempts**: `number` = `0`

#### Defined in

[src/channel/ws/ws_0_9.ts:185](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L185)

---

### userInitiatedClose

• `Private` **userInitiatedClose**: `boolean` = `false`

#### Defined in

[src/channel/ws/ws_0_9.ts:187](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L187)

---

### reconnectTimeoutId

• `Private` **reconnectTimeoutId**: `null` \| `Timeout` = `null`

#### Defined in

[src/channel/ws/ws_0_9.ts:189](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L189)

---

### requestQueue

• `Private` **requestQueue**: \{ `method`: `string` ; `params?`: `object` ; `resolve`: (`value`: `any`) => `void` ; `reject`: (`reason?`: `any`) => `void` }[] = `[]`

#### Defined in

[src/channel/ws/ws_0_9.ts:191](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L191)

---

### events

• `Private` **events**: `EventEmitter`<`WebSocketChannelEvents`\>

#### Defined in

[src/channel/ws/ws_0_9.ts:198](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L198)

---

### closeListener

• `Private` **closeListener**: (`ev`: `CloseEvent`) => `void`

#### Type declaration

▸ (`ev`): `void`

##### Parameters

| Name | Type         |
| :--- | :----------- |
| `ev` | `CloseEvent` |

##### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:202](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L202)

---

### messageListener

• `Private` **messageListener**: (`event`: `MessageEvent`<`any`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `event` | `MessageEvent`<`any`\> |

##### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:204](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L204)

---

### sendId

• `Private` **sendId**: `number` = `0`

JSON RPC latest sent message ID.
The receiving message is expected to contain the same ID.

#### Defined in

[src/channel/ws/ws_0_9.ts:212](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L212)

## Methods

### openListener

▸ **openListener**(`ev`): `void`

#### Parameters

| Name | Type    |
| :--- | :------ |
| `ev` | `Event` |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:200](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L200)

---

### errorListener

▸ **errorListener**(`ev`): `void`

#### Parameters

| Name | Type    |
| :--- | :------ |
| `ev` | `Event` |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:206](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L206)

---

### idResolver

▸ **idResolver**(`id?`): `number`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `id?` | `number` |

#### Returns

`number`

#### Defined in

[src/channel/ws/ws_0_9.ts:238](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L238)

---

### send

▸ **send**(`method`, `params?`, `id?`): `number`

Sends a JSON-RPC request over the WebSocket connection without waiting for a response.
This is a low-level method. Prefer `sendReceive` for most use cases.

#### Parameters

| Name      | Type     | Description                                                              |
| :-------- | :------- | :----------------------------------------------------------------------- |
| `method`  | `string` | The RPC method name.                                                     |
| `params?` | `object` | The parameters for the RPC method.                                       |
| `id?`     | `number` | A specific request ID. If not provided, an auto-incrementing ID is used. |

#### Returns

`number`

The ID of the sent request.

**`Throws`**

If the WebSocket is not connected.

#### Defined in

[src/channel/ws/ws_0_9.ts:255](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L255)

---

### sendReceive

▸ **sendReceive**<`T`\>(`method`, `params?`): `Promise`<`T`\>

Sends a JSON-RPC request and returns a Promise that resolves with the result.
This method abstracts the request/response cycle over WebSockets.
If the connection is lost, it will queue the request and send it upon reconnection.

#### Type parameters

| Name | Type  | Description                      |
| :--- | :---- | :------------------------------- |
| `T`  | `any` | The expected type of the result. |

#### Parameters

| Name      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `method`  | `string` | The RPC method name.               |
| `params?` | `object` | The parameters for the RPC method. |

#### Returns

`Promise`<`T`\>

A Promise that resolves with the RPC response result.

**`Throws`**

If the request does not receive a response within the configured `requestTimeout`.

**`Throws`**

If the WebSocket is not connected and auto-reconnect is disabled.

#### Defined in

[src/channel/ws/ws_0_9.ts:284](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L284)

---

### isConnected

▸ **isConnected**(): `boolean`

Checks if the WebSocket connection is currently open.

#### Returns

`boolean`

`true` if the connection is open, `false` otherwise.

#### Defined in

[src/channel/ws/ws_0_9.ts:359](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L359)

---

### waitForConnection

▸ **waitForConnection**(): `Promise`<`number`\>

Returns a Promise that resolves when the WebSocket connection is open.
Can be used to block execution until the connection is established.

#### Returns

`Promise`<`number`\>

A Promise that resolves with the WebSocket's `readyState` when connected.

**`Example`**

```typescript
const channel = new WebSocketChannel({ nodeUrl: '...' });
await channel.waitForConnection();
console.log('Connected!');
```

#### Defined in

[src/channel/ws/ws_0_9.ts:374](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L374)

---

### disconnect

▸ **disconnect**(`code?`, `reason?`): `void`

Closes the WebSocket connection.
This method is user-initiated and will prevent automatic reconnection for this closure.

#### Parameters

| Name      | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `code?`   | `number` | The WebSocket connection close code.   |
| `reason?` | `string` | The WebSocket connection close reason. |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:395](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L395)

---

### waitForDisconnection

▸ **waitForDisconnection**(): `Promise`<`number` \| `Event`\>

Returns a Promise that resolves when the WebSocket connection is closed.

#### Returns

`Promise`<`number` \| `Event`\>

A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.

#### Defined in

[src/channel/ws/ws_0_9.ts:408](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L408)

---

### unsubscribe

▸ **unsubscribe**(`subscriptionId`): `Promise`<`boolean`\>

Unsubscribes from a Starknet subscription.
It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.

#### Parameters

| Name             | Type     | Description                                     |
| :--------------- | :------- | :---------------------------------------------- |
| `subscriptionId` | `string` | The ID of the subscription to unsubscribe from. |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves with `true` if the unsubscription was successful.

#### Defined in

[src/channel/ws/ws_0_9.ts:428](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L428)

---

### waitForUnsubscription

▸ **waitForUnsubscription**(`targetId`): `Promise`<`void`\>

Returns a Promise that resolves when a specific subscription is successfully unsubscribed.

#### Parameters

| Name       | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `targetId` | `string` | The ID of the subscription to wait for. |

#### Returns

`Promise`<`void`\>

**`Example`**

```typescript
await channel.waitForUnsubscription(mySubscription.id);
console.log('Successfully unsubscribed.');
```

#### Defined in

[src/channel/ws/ws_0_9.ts:448](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L448)

---

### reconnect

▸ **reconnect**(): `void`

Manually initiates a reconnection attempt.
This creates a new WebSocket instance and re-establishes listeners.

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:464](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L464)

---

### \_processRequestQueue

▸ **\_processRequestQueue**(): `void`

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:474](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L474)

---

### \_restoreSubscriptions

▸ **\_restoreSubscriptions**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/channel/ws/ws_0_9.ts:482](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L482)

---

### \_startReconnect

▸ **\_startReconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:502](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L502)

---

### onCloseProxy

▸ **onCloseProxy**(`ev`): `void`

#### Parameters

| Name | Type         |
| :--- | :----------- |
| `ev` | `CloseEvent` |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:546](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L546)

---

### onMessageProxy

▸ **onMessageProxy**(`event`): `void`

#### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `event` | `MessageEvent`<`any`\> |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:558](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L558)

---

### subscribeNewHeads

▸ **subscribeNewHeads**(`params?`): `Promise`<[`SubscriptionNewHeadsEvent`](../modules.md#subscriptionnewheadsevent)\>

Subscribes to new block headers.

#### Parameters

| Name     | Type                                                                  | Description                          |
| :------- | :-------------------------------------------------------------------- | :----------------------------------- |
| `params` | [`SubscribeNewHeadsParams`](../interfaces/SubscribeNewHeadsParams.md) | The parameters for the subscription. |

#### Returns

`Promise`<[`SubscriptionNewHeadsEvent`](../modules.md#subscriptionnewheadsevent)\>

A Promise that resolves with a `Subscription` object for new block headers.

#### Defined in

[src/channel/ws/ws_0_9.ts:597](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L597)

---

### subscribeEvents

▸ **subscribeEvents**(`params?`): `Promise`<[`SubscriptionStarknetEventsEvent`](../modules.md#subscriptionstarkneteventsevent)\>

Subscribes to events matching a given filter.

#### Parameters

| Name     | Type                                                              | Description                          |
| :------- | :---------------------------------------------------------------- | :----------------------------------- |
| `params` | [`SubscribeEventsParams`](../interfaces/SubscribeEventsParams.md) | The parameters for the subscription. |

#### Returns

`Promise`<[`SubscriptionStarknetEventsEvent`](../modules.md#subscriptionstarkneteventsevent)\>

A Promise that resolves with a `Subscription` object for the specified events.

#### Defined in

[src/channel/ws/ws_0_9.ts:621](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L621)

---

### subscribeTransactionStatus

▸ **subscribeTransactionStatus**(`params`): `Promise`<[`SubscriptionTransactionStatusEvent`](../modules.md#subscriptiontransactionstatusevent)\>

Subscribes to status updates for a specific transaction.

#### Parameters

| Name     | Type                                                                                    | Description                          |
| :------- | :-------------------------------------------------------------------------------------- | :----------------------------------- |
| `params` | [`SubscribeTransactionStatusParams`](../interfaces/SubscribeTransactionStatusParams.md) | The parameters for the subscription. |

#### Returns

`Promise`<[`SubscriptionTransactionStatusEvent`](../modules.md#subscriptiontransactionstatusevent)\>

A Promise that resolves with a `Subscription` object for the transaction's status.

#### Defined in

[src/channel/ws/ws_0_9.ts:648](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L648)

---

### subscribeNewTransactionReceipts

▸ **subscribeNewTransactionReceipts**(`params?`): `Promise`<[`SubscriptionNewTransactionReceiptsEvent`](../modules.md#subscriptionnewtransactionreceiptsevent)\>

Subscribes to new transaction receipts.

#### Parameters

| Name     | Type                                                                                              | Description                          |
| :------- | :------------------------------------------------------------------------------------------------ | :----------------------------------- |
| `params` | [`SubscribeNewTransactionReceiptsParams`](../interfaces/SubscribeNewTransactionReceiptsParams.md) | The parameters for the subscription. |

#### Returns

`Promise`<[`SubscriptionNewTransactionReceiptsEvent`](../modules.md#subscriptionnewtransactionreceiptsevent)\>

A Promise that resolves with a `Subscription` object for new transaction receipts.

#### Defined in

[src/channel/ws/ws_0_9.ts:673](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L673)

---

### subscribeNewTransactions

▸ **subscribeNewTransactions**(`params?`): `Promise`<[`SubscriptionNewTransactionEvent`](../modules.md#subscriptionnewtransactionevent)\>

Subscribes to new transactions.

#### Parameters

| Name     | Type                                                                                | Description                          |
| :------- | :---------------------------------------------------------------------------------- | :----------------------------------- |
| `params` | [`SubscribeNewTransactionsParams`](../interfaces/SubscribeNewTransactionsParams.md) | The parameters for the subscription. |

#### Returns

`Promise`<[`SubscriptionNewTransactionEvent`](../modules.md#subscriptionnewtransactionevent)\>

A Promise that resolves with a `Subscription` object for new transactions.

#### Defined in

[src/channel/ws/ws_0_9.ts:699](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L699)

---

### removeSubscription

▸ **removeSubscription**(`id`): `void`

Internal method to remove subscription from active map.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:724](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L724)

---

### on

▸ **on**<`K`\>(`event`, `listener`): `void`

Adds a listener for a given event.

#### Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `K`  | extends keyof `WebSocketChannelEvents` |

#### Parameters

| Name       | Type                                              | Description                   |
| :--------- | :------------------------------------------------ | :---------------------------- |
| `event`    | `K`                                               | The event name.               |
| `listener` | (`data`: `WebSocketChannelEvents`[`K`]) => `void` | The listener function to add. |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:733](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L733)

---

### off

▸ **off**<`K`\>(`event`, `listener`): `void`

Removes a listener for a given event.

#### Type parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `K`  | extends keyof `WebSocketChannelEvents` |

#### Parameters

| Name       | Type                                              | Description                      |
| :--------- | :------------------------------------------------ | :------------------------------- |
| `event`    | `K`                                               | The event name.                  |
| `listener` | (`data`: `WebSocketChannelEvents`[`K`]) => `void` | The listener function to remove. |

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_9.ts:745](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/ws_0_9.ts#L745)
