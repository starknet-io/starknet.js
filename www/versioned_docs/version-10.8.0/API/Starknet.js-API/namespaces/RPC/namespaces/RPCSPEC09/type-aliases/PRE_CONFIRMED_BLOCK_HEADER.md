# Type Alias: PRE_CONFIRMED_BLOCK_HEADER

> **PRE_CONFIRMED_BLOCK_HEADER** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:324

## Properties

### block_number

> **block_number**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:328

The block number of the block that the proposer is currently building. Note that this is a local view of the node, whose accuracy depends on its polling interval length.

---

### timestamp

> **timestamp**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:332

The time in which the block was created, encoded in Unix time

---

### sequencer_address

> **sequencer_address**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:336

The StarkNet identity of the sequencer submitting this block

---

### l1_gas_price

> **l1_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:340

The price of l1 gas in the block

---

### l2_gas_price

> **l2_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:344

The price of l2 gas in the block

---

### l1_data_gas_price

> **l1_data_gas_price**: [`RESOURCE_PRICE`](RESOURCE_PRICE.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:348

The price of l1 data gas in the block

---

### l1_da_mode

> **l1_da_mode**: [`L1_DA_MODE`](L1_DA_MODE.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:352

specifies whether the data of this block is published via blob data or calldata

---

### starknet_version

> **starknet_version**: `string`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:356

Semver of the current Starknet protocol
