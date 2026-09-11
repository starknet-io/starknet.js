# Type Alias: EMITTED_EVENT

> **EMITTED_EVENT** = [`EVENT`](EVENT.md) & `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:260

## Type Declaration

### transaction_hash

> **transaction_hash**: [`TXN_HASH`](TXN_HASH.md)

The transaction that emitted the event

### transaction_index

> **transaction_index**: `number`

The index of the transaction in the block by which the event was emitted

#### Minimum

0

### event_index

> **event_index**: `number`

The index of the event in the transaction by which it was emitted

#### Minimum

0

### block_hash?

> `optional` **block_hash?**: [`BLOCK_HASH`](BLOCK_HASH.md)

The hash of the block in which the event was emitted

### block_number?

> `optional` **block_number?**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

The number of the block in which the event was emitted

#### Minimum

0
