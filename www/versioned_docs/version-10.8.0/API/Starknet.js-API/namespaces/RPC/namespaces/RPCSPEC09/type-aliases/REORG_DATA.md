# Type Alias: REORG_DATA

> **REORG_DATA** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:134

Data about reorganized blocks, starting and ending block number and hash

## Properties

### starting_block_hash

> **starting_block_hash**: [`BLOCK_HASH`](BLOCK_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:138

Hash of the first known block of the orphaned chain

---

### starting_block_number

> **starting_block_number**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:142

Number of the first known block of the orphaned chain

---

### ending_block_hash

> **ending_block_hash**: [`BLOCK_HASH`](BLOCK_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:146

The last known block of the orphaned chain

---

### ending_block_number

> **ending_block_number**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:150

Number of the last known block of the orphaned chain
