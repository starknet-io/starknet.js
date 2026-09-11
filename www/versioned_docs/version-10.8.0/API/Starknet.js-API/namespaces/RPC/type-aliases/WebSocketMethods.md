# Type Alias: WebSocketMethods

> **WebSocketMethods** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:361

## Properties

### starknet_subscribeNewHeads

> **starknet_subscribeNewHeads**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:366

New block headers subscription.
Creates a WebSocket stream which will fire events for new block headers.

#### params

> **params**: `object`

##### params.block_id?

> `optional` **block_id?**: [`SUBSCRIPTION_BLOCK_ID`](SUBSCRIPTION_BLOCK_ID.md)

The block to get notifications from, default is latest, limited to 1024 blocks back

#### result

> **result**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### errors

> **errors**: [`TOO_MANY_BLOCKS_BACK`](../interfaces/TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/BLOCK_NOT_FOUND.md)

#### events

> **events**: \[[`NewHeadsEvent`](NewHeadsEvent.md), [`ReorgEvent`](ReorgEvent.md)\]

starknet_subscriptionNewHeads
starknet_subscriptionReorg

---

### starknet_subscribeEvents

> **starknet_subscribeEvents**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:385

New events subscription.
Creates a WebSocket stream which will fire events for new Starknet events from the specified block_id, up to the latest block.

#### params

> **params**: `object`

##### params.from_address?

> `optional` **from_address?**: [`ADDRESS`](ADDRESS.md) \| [`ADDRESS`](ADDRESS.md)[]

Filter events by from_address which emitted the event. Can be a single address or an array of addresses.

##### params.keys?

> `optional` **keys?**: [`EVENT_KEYS`](EVENT_KEYS.md)

The keys to filter events by. If not provided, all events will be returned.

##### params.block_id?

> `optional` **block_id?**: [`SUBSCRIPTION_BLOCK_ID`](SUBSCRIPTION_BLOCK_ID.md)

The block to get notifications from, default is latest, limited to 1024 blocks back

##### params.finality_status?

> `optional` **finality_status?**: `Exclude`\<[`TXN_FINALITY_STATUS`](TXN_FINALITY_STATUS.md), [`STATUS_ACCEPTED_ON_L1`](STATUS_ACCEPTED_ON_L1.md)\>

The finality status of the most recent events to include, default is ACCEPTED_ON_L2

#### result

> **result**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### errors

> **errors**: [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/TOO_MANY_KEYS_IN_FILTER.md) \| [`TOO_MANY_BLOCKS_BACK`](../interfaces/TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/BLOCK_NOT_FOUND.md)

#### events

> **events**: \[[`StarknetEventsEvent`](StarknetEventsEvent.md), [`ReorgEvent`](ReorgEvent.md)\]

starknet_subscriptionEvents
starknet_subscriptionReorg

---

### starknet_subscribeTransactionStatus

> **starknet_subscribeTransactionStatus**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:416

New transaction status subscription.
Creates a WebSocket stream which at first fires an event with the current known transaction status, followed by events for every transaction status update

#### params

> **params**: `object`

##### params.transaction_hash

> **transaction_hash**: [`FELT`](FELT.md)

#### result

> **result**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### events

> **events**: \[[`TransactionsStatusEvent`](TransactionsStatusEvent.md), [`ReorgEvent`](ReorgEvent.md)\]

starknet_subscriptionTransactionStatus
starknet_subscriptionReorg

---

### starknet_subscribeNewTransactionReceipts

> **starknet_subscribeNewTransactionReceipts**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:432

Creates a WebSocket stream which will fire events when new transaction receipts are created.
The endpoint receives a vector of finality statuses. An event is fired for each finality status update.
It is possible for receipts for pre-confirmed transactions to be received multiple times, or not at all.

#### params

> **params**: `object`

##### params.finality_status?

> `optional` **finality_status?**: `Exclude`\<[`TXN_FINALITY_STATUS`](TXN_FINALITY_STATUS.md), [`STATUS_ACCEPTED_ON_L1`](STATUS_ACCEPTED_ON_L1.md)\>[]

A vector of finality statuses to receive updates for, default is [ACCEPTED_ON_L2]

##### params.sender_address?

> `optional` **sender_address?**: [`ADDRESS`](ADDRESS.md)[]

Filter transaction receipts to only include transactions sent by the specified addresses

#### result

> **result**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### errors

> **errors**: [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/TOO_MANY_ADDRESSES_IN_FILTER.md)

#### events

> **events**: \[[`NewTransactionReceiptsEvent`](NewTransactionReceiptsEvent.md), [`ReorgEvent`](ReorgEvent.md)\]

starknet_subscriptionNewTransactionReceipts

---

### starknet_subscribeNewTransactions

> **starknet_subscribeNewTransactions**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:455

Creates a WebSocket stream which will fire events when new transaction are created.
The endpoint receives a vector of finality statuses. An event is fired for each finality status update.
It is possible for events for pre-confirmed and candidate transactions to be received multiple times, or not at all.

#### params

> **params**: `object`

##### params.finality_status?

> `optional` **finality_status?**: [`TXN_STATUS_WITHOUT_L1`](TXN_STATUS_WITHOUT_L1.md)[]

A vector of finality statuses to receive updates for, default is [ACCEPTED_ON_L2]

##### params.sender_address?

> `optional` **sender_address?**: [`ADDRESS`](ADDRESS.md)[]

Filter to only include transactions sent by the specified addresses

##### params.tags?

> `optional` **tags?**: [`SUBSCRIPTION_TAG`](SUBSCRIPTION_TAG.md)[]

Optional tags to include additional fields in the transaction events (e.g., INCLUDE_PROOF_FACTS)

#### result

> **result**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### events

> **events**: \[[`NewTransactionEvent`](NewTransactionEvent.md), [`ReorgEvent`](ReorgEvent.md)\]

starknet_subscriptionNewTransaction

---

### starknet_unsubscribe

> **starknet_unsubscribe**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/methods.d.ts:479

Close a previously opened ws stream, with the corresponding subscription id

#### params

> **params**: `object`

##### params.subscription_id

> **subscription_id**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

#### result

> **result**: `Boolean`

#### errors

> **errors**: [`INVALID_SUBSCRIPTION_ID`](../interfaces/INVALID_SUBSCRIPTION_ID.md)
