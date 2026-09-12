# Type Alias: STATE_DIFF

> **STATE_DIFF** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:372

The change in state applied in this block

## Properties

### storage_diffs

> **storage_diffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](CONTRACT_STORAGE_DIFF_ITEM.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:376

The changes in storage per contract address

---

### deprecated_declared_classes

> **deprecated_declared_classes**: [`FELT`](FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:380

Deprecated classes declared in this block

---

### declared_classes

> **declared_classes**: [`NEW_CLASSES`](NEW_CLASSES.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:384

New classes declared in this block, with their declared class hash and compiled class hash

---

### deployed_contracts

> **deployed_contracts**: [`DEPLOYED_CONTRACT_ITEM`](DEPLOYED_CONTRACT_ITEM.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:388

A new contract deployed as part of the state update

---

### replaced_classes

> **replaced_classes**: [`REPLACED_CLASS`](REPLACED_CLASS.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:392

The list of contracts whose class was replaced

---

### nonces

> **nonces**: [`NONCE_UPDATE`](NONCE_UPDATE.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:396

The updated nonce per contract address

---

### migrated_compiled_classes?

> `optional` **migrated_compiled_classes?**: `object`[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:400

The list of class hash and the new Blake-migrated compiled class hash pair

#### class_hash

> **class_hash**: [`FELT`](FELT.md)

#### compiled_class_hash

> **compiled_class_hash**: [`FELT`](FELT.md)
