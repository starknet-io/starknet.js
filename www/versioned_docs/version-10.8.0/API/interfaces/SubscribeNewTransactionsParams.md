# Interface: SubscribeNewTransactionsParams

Defined in: [src/channel/ws/ws_0_10.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L55)

## Properties

### finalityStatus?

> `optional` **finalityStatus?**: [`TXN_STATUS_WITHOUT_L1`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_STATUS_WITHOUT_L1.md)[]

Defined in: [src/channel/ws/ws_0_10.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L57)

Finality status filter

---

### senderAddress?

> `optional` **senderAddress?**: [`BigNumberish`](../type-aliases/BigNumberish.md)[]

Defined in: [src/channel/ws/ws_0_10.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L59)

Filter by sender addresses

---

### tags?

> `optional` **tags?**: `"INCLUDE_PROOF_FACTS"`[]

Defined in: [src/channel/ws/ws_0_10.ts:61](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L61)

Subscription tags for additional data (RPC 0.10.1+)
