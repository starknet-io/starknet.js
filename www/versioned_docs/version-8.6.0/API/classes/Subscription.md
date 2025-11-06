---
id: 'Subscription'
title: 'Class: Subscription<T>'
sidebar_label: 'Subscription'
sidebar_position: 0
custom_edit_url: null
---

Represents an active WebSocket subscription.

This class should not be instantiated directly. It is returned by the
`subscribe` methods on the `WebSocketChannel`.

**`Example`**

```typescript
const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
await channel.waitForConnection();

// The 'sub' object is an instance of the Subscription class.
const sub = await channel.subscribeNewHeads();

sub.on((data) => {
  console.log('Received new head:', data);
});

// ... later
await sub.unsubscribe();
```

## Type parameters

| Name | Type  | Description                                            |
| :--- | :---- | :----------------------------------------------------- |
| `T`  | `any` | The type of data expected from the subscription event. |

## Constructors

### constructor

• **new Subscription**<`T`\>(`options`): [`Subscription`](Subscription.md)<`T`\>

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |

#### Parameters

| Name      | Type                                                       | Description                        |
| :-------- | :--------------------------------------------------------- | :--------------------------------- |
| `options` | [`SubscriptionOptions`](../modules.md#subscriptionoptions) | Subscription configuration options |

#### Returns

[`Subscription`](Subscription.md)<`T`\>

#### Defined in

[src/channel/ws/subscription.ts:91](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L91)

## Properties

### channel

• **channel**: [`WebSocketChannel`](WebSocketChannel.md)

The containing `WebSocketChannel` instance.

#### Defined in

[src/channel/ws/subscription.ts:57](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L57)

---

### method

• **method**: `string`

The JSON-RPC method used to create this subscription.

#### Defined in

[src/channel/ws/subscription.ts:63](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L63)

---

### params

• **params**: `any`

The parameters used to create this subscription.

#### Defined in

[src/channel/ws/subscription.ts:69](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L69)

---

### id

• **id**: `string`

The unique identifier for this subscription.

#### Defined in

[src/channel/ws/subscription.ts:75](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L75)

---

### events

• `Private` **events**: `EventEmitter`<`SubscriptionEvents`<`T`\>\>

#### Defined in

[src/channel/ws/subscription.ts:77](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L77)

---

### buffer

• `Private` **buffer**: `T`[] = `[]`

#### Defined in

[src/channel/ws/subscription.ts:79](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L79)

---

### maxBufferSize

• `Private` **maxBufferSize**: `number`

#### Defined in

[src/channel/ws/subscription.ts:81](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L81)

---

### handler

• `Private` **handler**: `null` \| (`data`: `T`) => `void` = `null`

#### Defined in

[src/channel/ws/subscription.ts:83](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L83)

---

### \_isClosed

• `Private` **\_isClosed**: `boolean` = `false`

#### Defined in

[src/channel/ws/subscription.ts:85](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L85)

## Accessors

### isClosed

• `get` **isClosed**(): `boolean`

Indicates if the subscription has been closed.

#### Returns

`boolean`

`true` if unsubscribed, `false` otherwise.

#### Defined in

[src/channel/ws/subscription.ts:103](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L103)

## Methods

### \_handleEvent

▸ **\_handleEvent**(`data`): `void`

Internal method to handle incoming events from the WebSocket channel.
If a handler is attached, it's invoked immediately. Otherwise, the event is buffered.

#### Parameters

| Name   | Type | Description     |
| :----- | :--- | :-------------- |
| `data` | `T`  | The event data. |

#### Returns

`void`

#### Defined in

[src/channel/ws/subscription.ts:113](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L113)

---

### on

▸ **on**(`handler`): `void`

Attaches a handler function to be called for each event.

When a handler is attached, any buffered events will be passed to it sequentially.
Subsequent events will be passed directly as they arrive.

#### Parameters

| Name      | Type                    | Description                           |
| :-------- | :---------------------- | :------------------------------------ |
| `handler` | (`data`: `T`) => `void` | The function to call with event data. |

#### Returns

`void`

**`Throws`**

If a handler is already attached to this subscription.

#### Defined in

[src/channel/ws/subscription.ts:134](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L134)

---

### unsubscribe

▸ **unsubscribe**(): `Promise`<`boolean`\>

Sends an unsubscribe request to the node and cleans up local resources.

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to `true` if the unsubscription was successful.

#### Defined in

[src/channel/ws/subscription.ts:155](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/ws/subscription.ts#L155)
