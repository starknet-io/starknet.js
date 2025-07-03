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

[src/channel/ws/ws_0_8.ts:170](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L170)

## Properties

### nodeUrl

• **nodeUrl**: `string`

The URL of the WebSocket RPC Node.

**`Example`**

```ts
'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8';
```

#### Defined in

[src/channel/ws/ws_0_8.ts:114](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L114)

---

### websocket

• **websocket**: `WebSocket`

The underlying WebSocket instance.

#### Defined in

[src/channel/ws/ws_0_8.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L119)

---

### WsImplementation

• `Private` **WsImplementation**: `Object`

#### Call signature

• **new WsImplementation**(`url`, `protocols?`): `WebSocket`

##### Parameters

| Name         | Type                   |
| :----------- | :--------------------- |
| `url`        | `string` \| `URL`      |
| `protocols?` | `string` \| `string`[] |

##### Returns

`WebSocket`

#### Type declaration

| Name         | Type        |
| :----------- | :---------- |
| `prototype`  | `WebSocket` |
| `CONNECTING` | `0`         |
| `OPEN`       | `1`         |
| `CLOSING`    | `2`         |
| `CLOSED`     | `3`         |

#### Defined in

[src/channel/ws/ws_0_8.ts:122](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L122)

---

### activeSubscriptions

• `Private` **activeSubscriptions**: `Map`<`string`, [`Subscription`](Subscription.md)<`any`\>\>

#### Defined in

[src/channel/ws/ws_0_8.ts:125](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L125)

---

### maxBufferSize

• `Private` `Readonly` **maxBufferSize**: `number`

#### Defined in

[src/channel/ws/ws_0_8.ts:127](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L127)

---

### autoReconnect

• `Private` `Readonly` **autoReconnect**: `boolean`

#### Defined in

[src/channel/ws/ws_0_8.ts:129](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L129)

---

### reconnectOptions

• `Private` `Readonly` **reconnectOptions**: `Required`<`ReconnectOptions`\>

#### Defined in

[src/channel/ws/ws_0_8.ts:131](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L131)

---

### requestTimeout

• `Private` `Readonly` **requestTimeout**: `number`

#### Defined in

[src/channel/ws/ws_0_8.ts:133](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L133)

---

### isReconnecting

• `Private` **isReconnecting**: `boolean` = `false`

#### Defined in

[src/channel/ws/ws_0_8.ts:135](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L135)

---

### reconnectAttempts

• `Private` **reconnectAttempts**: `number` = `0`

#### Defined in

[src/channel/ws/ws_0_8.ts:137](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L137)

---

### userInitiatedClose

• `Private` **userInitiatedClose**: `boolean` = `false`

#### Defined in

[src/channel/ws/ws_0_8.ts:139](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L139)

---

### reconnectTimeoutId

• `Private` **reconnectTimeoutId**: `null` \| `Timeout` = `null`

#### Defined in

[src/channel/ws/ws_0_8.ts:141](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L141)

---

### requestQueue

• `Private` **requestQueue**: \{ `method`: `string` ; `params?`: `object` ; `resolve`: (`value`: `any`) => `void` ; `reject`: (`reason?`: `any`) => `void` }[] = `[]`

#### Defined in

[src/channel/ws/ws_0_8.ts:143](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L143)

---

### events

• `Private` **events**: `EventEmitter`<`WebSocketChannelEvents`\>

#### Defined in

[src/channel/ws/ws_0_8.ts:150](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L150)

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

[src/channel/ws/ws_0_8.ts:154](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L154)

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

[src/channel/ws/ws_0_8.ts:156](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L156)

---

### sendId

• `Private` **sendId**: `number` = `0`

JSON RPC latest sent message ID.
The receiving message is expected to contain the same ID.

#### Defined in

[src/channel/ws/ws_0_8.ts:164](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L164)

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

[src/channel/ws/ws_0_8.ts:152](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L152)

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

[src/channel/ws/ws_0_8.ts:158](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L158)

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

[src/channel/ws/ws_0_8.ts:189](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L189)

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

[src/channel/ws/ws_0_8.ts:206](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L206)

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

[src/channel/ws/ws_0_8.ts:235](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L235)

---

### isConnected

▸ **isConnected**(): `boolean`

Checks if the WebSocket connection is currently open.

#### Returns

`boolean`

`true` if the connection is open, `false` otherwise.

#### Defined in

[src/channel/ws/ws_0_8.ts:310](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L310)

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

[src/channel/ws/ws_0_8.ts:325](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L325)

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

[src/channel/ws/ws_0_8.ts:346](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L346)

---

### waitForDisconnection

▸ **waitForDisconnection**(): `Promise`<`number` \| `Event`\>

Returns a Promise that resolves when the WebSocket connection is closed.

#### Returns

`Promise`<`number` \| `Event`\>

A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.

#### Defined in

[src/channel/ws/ws_0_8.ts:359](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L359)

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

[src/channel/ws/ws_0_8.ts:379](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L379)

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

[src/channel/ws/ws_0_8.ts:399](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L399)

---

### reconnect

▸ **reconnect**(): `void`

Manually initiates a reconnection attempt.
This creates a new WebSocket instance and re-establishes listeners.

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_8.ts:415](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L415)

---

### \_processRequestQueue

▸ **\_processRequestQueue**(): `void`

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_8.ts:425](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L425)

---

### \_restoreSubscriptions

▸ **\_restoreSubscriptions**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/channel/ws/ws_0_8.ts:433](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L433)

---

### \_startReconnect

▸ **\_startReconnect**(): `void`

#### Returns

`void`

#### Defined in

[src/channel/ws/ws_0_8.ts:453](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L453)

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

[src/channel/ws/ws_0_8.ts:495](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L495)

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

[src/channel/ws/ws_0_8.ts:507](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L507)

---

### subscribeNewHeads

▸ **subscribeNewHeads**(`blockIdentifier?`): `Promise`<[`Subscription`](Subscription.md)<[`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header)\>\>

Subscribes to new block headers.

#### Parameters

| Name               | Type                                                                                | Description                                                            |
| :----------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `blockIdentifier?` | [`SubscriptionBlockIdentifier`](../namespaces/types.md#subscriptionblockidentifier) | The block to start receiving notifications from. Defaults to 'latest'. |

#### Returns

`Promise`<[`Subscription`](Subscription.md)<[`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header)\>\>

A Promise that resolves with a `Subscription` object for new block headers.

#### Defined in

[src/channel/ws/ws_0_8.ts:546](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L546)

---

### subscribeEvents

▸ **subscribeEvents**(`fromAddress?`, `keys?`, `blockIdentifier?`): `Promise`<[`Subscription`](Subscription.md)<[`EMITTED_EVENT`](../namespaces/types.RPC.RPCSPEC08.API.md#emitted_event)\>\>

Subscribes to events matching a given filter.

#### Parameters

| Name               | Type                                                                                | Description                                                            |
| :----------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `fromAddress?`     | [`BigNumberish`](../namespaces/types.md#bignumberish)                               | The contract address to filter by.                                     |
| `keys?`            | `string`[][]                                                                        | The event keys to filter by.                                           |
| `blockIdentifier?` | [`SubscriptionBlockIdentifier`](../namespaces/types.md#subscriptionblockidentifier) | The block to start receiving notifications from. Defaults to 'latest'. |

#### Returns

`Promise`<[`Subscription`](Subscription.md)<[`EMITTED_EVENT`](../namespaces/types.RPC.RPCSPEC08.API.md#emitted_event)\>\>

A Promise that resolves with a `Subscription` object for the specified events.

#### Defined in

[src/channel/ws/ws_0_8.ts:566](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L566)

---

### subscribeTransactionStatus

▸ **subscribeTransactionStatus**(`transactionHash`, `blockIdentifier?`): `Promise`<[`Subscription`](Subscription.md)<[`NEW_TXN_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#new_txn_status)\>\>

Subscribes to status updates for a specific transaction.

#### Parameters

| Name               | Type                                                                                | Description                                |
| :----------------- | :---------------------------------------------------------------------------------- | :----------------------------------------- |
| `transactionHash`  | [`BigNumberish`](../namespaces/types.md#bignumberish)                               | The hash of the transaction to monitor.    |
| `blockIdentifier?` | [`SubscriptionBlockIdentifier`](../namespaces/types.md#subscriptionblockidentifier) | The block context. Not typically required. |

#### Returns

`Promise`<[`Subscription`](Subscription.md)<[`NEW_TXN_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#new_txn_status)\>\>

A Promise that resolves with a `Subscription` object for the transaction's status.

#### Defined in

[src/channel/ws/ws_0_8.ts:589](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L589)

---

### subscribePendingTransaction

▸ **subscribePendingTransaction**(`transactionDetails?`, `senderAddress?`): `Promise`<[`Subscription`](Subscription.md)<`string` \| [`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>\>

Subscribes to pending transactions.

#### Parameters

| Name                  | Type                                                    | Description                                                                            |
| :-------------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------- |
| `transactionDetails?` | `boolean`                                               | If `true`, the full transaction details are included. Defaults to `false` (hash only). |
| `senderAddress?`      | [`BigNumberish`](../namespaces/types.md#bignumberish)[] | An array of sender addresses to filter by.                                             |

#### Returns

`Promise`<[`Subscription`](Subscription.md)<`string` \| [`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>\>

A Promise that resolves with a `Subscription` object for pending transactions.

#### Defined in

[src/channel/ws/ws_0_8.ts:610](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L610)

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

[src/channel/ws/ws_0_8.ts:629](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L629)

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

[src/channel/ws/ws_0_8.ts:638](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L638)

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

[src/channel/ws/ws_0_8.ts:650](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/ws/ws_0_8.ts#L650)
