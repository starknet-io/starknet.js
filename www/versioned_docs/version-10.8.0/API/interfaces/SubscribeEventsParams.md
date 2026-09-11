# Interface: SubscribeEventsParams

Defined in: [src/channel/ws/ws_0_10.ts:34](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L34)

## Properties

### fromAddress?

> `optional` **fromAddress?**: [`BigNumberish`](../type-aliases/BigNumberish.md) \| [`BigNumberish`](../type-aliases/BigNumberish.md)[]

Defined in: [src/channel/ws/ws_0_10.ts:36](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L36)

Contract address(es) to filter events from. Accepts single or array of addresses (RPC 0.10.1+).

---

### keys?

> `optional` **keys?**: `string`[][]

Defined in: [src/channel/ws/ws_0_10.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L38)

Event key filters

---

### blockIdentifier?

> `optional` **blockIdentifier?**: [`SubscriptionBlockIdentifier`](../type-aliases/SubscriptionBlockIdentifier.md)

Defined in: [src/channel/ws/ws_0_10.ts:40](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L40)

Block to start subscribing from

---

### finalityStatus?

> `optional` **finalityStatus?**: `"ACCEPTED_ON_L2"` \| `"PRE_CONFIRMED"`

Defined in: [src/channel/ws/ws_0_10.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L42)

Finality status filter
