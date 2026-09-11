# Type Alias: EDGE_NODE

> **EDGE_NODE** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:887

represents a path to the highest non-zero descendant node

## Properties

### path

> **path**: [`NUM_AS_HEX`](NUM_AS_HEX.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:891

an unsigned integer whose binary representation represents the path from the current node to its highest non-zero descendant (bounded by 2^251)

---

### length

> **length**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:896

the length of the path (bounded by 251)

#### Minimum

0

---

### child

> **child**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:900

the hash of the unique non-zero maximal-height descendant node
