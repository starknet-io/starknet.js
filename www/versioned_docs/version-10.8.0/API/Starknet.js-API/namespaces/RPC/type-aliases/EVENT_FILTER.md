# Type Alias: EVENT_FILTER

> **EVENT_FILTER** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:315

An event filter used to query events

## Properties

### from_block?

> `optional` **from_block?**: [`BLOCK_ID`](BLOCK_ID.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:319

The block to start filtering from

---

### to_block?

> `optional` **to_block?**: [`BLOCK_ID`](BLOCK_ID.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:323

The block to filter up to

---

### address?

> `optional` **address?**: [`ADDRESS`](ADDRESS.md) \| [`ADDRESS`](ADDRESS.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:327

The contract address(es) to filter events from. Can be a single address or an array of addresses.

---

### keys?

> `optional` **keys?**: [`EVENT_KEYS`](EVENT_KEYS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:331

The event keys to filter
