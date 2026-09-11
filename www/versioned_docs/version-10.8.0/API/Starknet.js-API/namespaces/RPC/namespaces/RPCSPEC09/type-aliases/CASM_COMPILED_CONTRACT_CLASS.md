# Type Alias: CASM_COMPILED_CONTRACT_CLASS

> **CASM_COMPILED_CONTRACT_CLASS** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:5

Starknet get compiled CASM result

## Properties

### entry_points_by_type

> **entry_points_by_type**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:6

#### CONSTRUCTOR

> **CONSTRUCTOR**: [`CASM_ENTRY_POINT`](CASM_ENTRY_POINT.md)[]

#### EXTERNAL

> **EXTERNAL**: [`CASM_ENTRY_POINT`](CASM_ENTRY_POINT.md)[]

#### L1_HANDLER

> **L1_HANDLER**: [`CASM_ENTRY_POINT`](CASM_ENTRY_POINT.md)[]

---

### bytecode

> **bytecode**: [`FELT`](FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:11

---

### prime

> **prime**: [`NUM_AS_HEX`](NUM_AS_HEX.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:12

---

### compiler_version

> **compiler_version**: `string`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:13

---

### hints

> **hints**: \[`number` \| [`HINT`](HINT.md)[], `number` \| [`HINT`](HINT.md)[]\][]

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:17

Array of 2-tuple of pc value and an array of hints to execute.

---

### bytecode_segment_lengths?

> `optional` **bytecode_segment_lengths?**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:22

a list of sizes of segments in the bytecode, each segment is hashed individually when computing the bytecode hash.
Integer
