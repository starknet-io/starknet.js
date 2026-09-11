# Class: Subscription\<T\>

Defined in: [src/channel/ws/subscription.ts:52](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L52)

Represents an active WebSocket subscription.

This class should not be instantiated directly. It is returned by the
`subscribe` methods on the `WebSocketChannel`.

## Example

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

## Type Parameters

### T

`T` = `any`

The type of data expected from the subscription event.

## Constructors

### Constructor

> **new Subscription**\<`T`\>(`options`): `Subscription`\<`T`\>

Defined in: [src/channel/ws/subscription.ts:94](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L94)

**`Internal`**

#### Parameters

##### options

[`SubscriptionOptions`](../type-aliases/SubscriptionOptions.md)

Subscription configuration options

#### Returns

`Subscription`\<`T`\>

## Properties

### channel

> **channel**: [`WebSocketChannel`](WebSocketChannel.md)

Defined in: [src/channel/ws/subscription.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L57)

**`Internal`**

The containing `WebSocketChannel` instance.

---

### method

> **method**: `string`

Defined in: [src/channel/ws/subscription.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L63)

**`Internal`**

The JSON-RPC method used to create this subscription.

---

### params

> **params**: `any`

Defined in: [src/channel/ws/subscription.ts:69](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L69)

**`Internal`**

The parameters used to create this subscription.

---

### id

> **id**: `string`

Defined in: [src/channel/ws/subscription.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L75)

**`Internal`**

The unique identifier for this subscription.

## Accessors

### isClosed

#### Get Signature

> **get** **isClosed**(): `boolean`

Defined in: [src/channel/ws/subscription.ts:106](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L106)

Indicates if the subscription has been closed.

##### Returns

`boolean`

`true` if unsubscribed, `false` otherwise.

## Methods

### \_markClosed()

> **\_markClosed**(): `void`

Defined in: [src/channel/ws/subscription.ts:118](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L118)

**`Internal`**

Closes the subscription locally, without contacting the node.

Used when the channel knows the subscription is gone and cannot be recovered — a
re-subscribe refused after a reconnection, for instance. Without it the object would keep
reporting itself as open while no event could ever reach its handler again.

#### Returns

`void`

---

### \_handleEvent()

> **\_handleEvent**(`data`): `void`

Defined in: [src/channel/ws/subscription.ts:131](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L131)

**`Internal`**

Internal method to handle incoming events from the WebSocket channel.
If a handler is attached, it's invoked immediately. Otherwise, the event is buffered.

#### Parameters

##### data

`T`

The event data.

#### Returns

`void`

---

### on()

> **on**(`handler`): `void`

Defined in: [src/channel/ws/subscription.ts:152](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L152)

Attaches a handler function to be called for each event.

When a handler is attached, any buffered events will be passed to it sequentially.
Subsequent events will be passed directly as they arrive.

#### Parameters

##### handler

(`data`) => `void`

The function to call with event data.

#### Returns

`void`

#### Throws

If a handler is already attached to this subscription.

---

### unsubscribe()

> **unsubscribe**(): `Promise`\<`boolean`\>

Defined in: [src/channel/ws/subscription.ts:173](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L173)

Sends an unsubscribe request to the node and cleans up local resources.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to `true` if the unsubscription was successful.
