# Type Alias: StorageProof

> **StorageProof** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:45

## Properties

### classes_proof

> **classes_proof**: [`NODE_HASH_TO_NODE_MAPPING`](NODE_HASH_TO_NODE_MAPPING.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:46

---

### contracts_proof

> **contracts_proof**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:47

#### nodes

> **nodes**: [`NODE_HASH_TO_NODE_MAPPING`](NODE_HASH_TO_NODE_MAPPING.md)

The nodes in the union of the paths from the contracts tree root to the requested leaves

#### contract_leaves_data

> **contract_leaves_data**: `object`[]

The nonce and class hash for each requested contract address, in the order in which they appear in the request. These values are needed to construct the associated leaf node

---

### contracts_storage_proofs

> **contracts_storage_proofs**: [`NODE_HASH_TO_NODE_MAPPING`](NODE_HASH_TO_NODE_MAPPING.md)[]

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:61

---

### global_roots

> **global_roots**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:62

#### contracts_tree_root

> **contracts_tree_root**: [`FELT`](FELT.md)

#### classes_tree_root

> **classes_tree_root**: [`FELT`](FELT.md)

#### block_hash

> **block_hash**: [`FELT`](FELT.md)

the associated block hash (needed in case the caller used a block tag for the block_id parameter)
