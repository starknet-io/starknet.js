# Type Alias: STATE_UPDATE

> **STATE_UPDATE** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:422

The state update applied in a block

## Properties

### block_hash

> **block_hash**: [`BLOCK_HASH`](BLOCK_HASH.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:426

The hash of the block

---

### old_root

> **old_root**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:430

The previous global state root

---

### new_root

> **new_root**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:434

The new global state root

---

### state_diff

> **state_diff**: [`STATE_DIFF`](STATE_DIFF.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:438

The state diff of the block
