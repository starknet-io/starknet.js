# Type Alias: STORAGE_RESULT

> **STORAGE_RESULT** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1263

The storage value along with additional metadata about the storage slot

## Properties

### value

> **value**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1267

The value at the given key for the given contract. 0 if no value is found

---

### last_update_block

> **last_update_block**: [`BLOCK_NUMBER`](BLOCK_NUMBER.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1272

The block number of the most recent block that included a modification to this storage slot.
0 if the storage slot has never been modified (i.e. the value is 0)
