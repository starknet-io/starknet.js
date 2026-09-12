# Type Alias: SubscriptionOptions

> **SubscriptionOptions** = `object`

Defined in: [src/channel/ws/subscription.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L16)

Options for creating a new Subscription instance

## Properties

### channel

> **channel**: [`WebSocketChannel`](../classes/WebSocketChannel.md)

Defined in: [src/channel/ws/subscription.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L18)

The containing WebSocketChannel instance

---

### method

> **method**: `string`

Defined in: [src/channel/ws/subscription.ts:20](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L20)

The JSON-RPC method used to create this subscription

---

### params?

> `optional` **params?**: `object`

Defined in: [src/channel/ws/subscription.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L22)

The parameters used to create this subscription (optional, defaults to empty object)

---

### id

> **id**: [`SUBSCRIPTION_ID`](../Starknet.js-API/namespaces/RPC/type-aliases/SUBSCRIPTION_ID.md)

Defined in: [src/channel/ws/subscription.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L24)

The unique identifier for this subscription

---

### maxBufferSize

> **maxBufferSize**: `number`

Defined in: [src/channel/ws/subscription.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/subscription.ts#L26)

The maximum number of events to buffer
