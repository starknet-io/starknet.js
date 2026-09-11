# Type Alias: BLOCK_HEADER

> **BLOCK_HEADER** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:470

## Properties

### block_hash

> **block_hash**: [`BLOCK_HASH`](BLOCK_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:474

The hash of the block

---

### parent_hash

> **parent_hash**: [`BLOCK_HASH`](BLOCK_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:478

The hash of the block's parent

---

### block_number

> **block_number**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:482

The block number

---

### new_root

> **new_root**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:486

The new global state root

---

### timestamp

> **timestamp**: `number`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:490

The time in which the block was created, in seconds since Unix epoch

---

### sequencer_address

> **sequencer_address**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:494

The address of the sequencer who created the block

---

### l1_gas_price

> **l1_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:498

The price of L1 gas in the block

---

### l2_gas_price

> **l2_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:502

The price of L2 gas in the block

---

### l1_data_gas_price

> **l1_data_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:506

The price of L1 data gas in the block

---

### l1_da_mode

> **l1_da_mode**: [`L1_DA_MODE`](L1_DA_MODE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:510

The mode of data availability for the block

---

### starknet_version

> **starknet_version**: `string`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:514

Semver of the current Starknet protocol

---

### event_commitment

> **event_commitment**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:519

The root of Merkle Patricia trie for events in the block.
For (old) blocks where this data is not available value is 0x0

---

### transaction_commitment

> **transaction_commitment**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:524

The root of Merkle Patricia trie for transactions in the block.
For (old) blocks where this data is not available value is 0x0

---

### receipt_commitment

> **receipt_commitment**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:529

The root of Merkle Patricia trie for receipts in the block.
For (old) blocks where this data is not available value is 0x0

---

### state_diff_commitment

> **state_diff_commitment**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:534

The state diff commitment hash in the block.
For (old) blocks where this data is not available value is 0x0

---

### event_count

> **event_count**: `number`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:539

The number of events in the block

#### Minimum

0

---

### transaction_count

> **transaction_count**: `number`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:544

The number of transactions in the block

#### Minimum

0

---

### state_diff_length

> **state_diff_length**: `number`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:550

The length of the state diff in the block.
For (old) blocks where this data is not available value is 0x0

#### Minimum

0
