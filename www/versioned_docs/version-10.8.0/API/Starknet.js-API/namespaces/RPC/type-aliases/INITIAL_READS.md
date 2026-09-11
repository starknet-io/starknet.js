# Type Alias: INITIAL_READS

> **INITIAL_READS** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1312

The set of state values fetched from the underlying state reader during execution.
This is a complete witness sufficient to reconstruct the cached state needed for re-execution.

## Properties

### storage

> **storage**: [`STORAGE_READ`](STORAGE_READ.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1316

Storage entries read during execution simulation

---

### nonces

> **nonces**: [`NONCE_READ`](NONCE_READ.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1320

Nonces read during execution simulation

---

### class_hashes

> **class_hashes**: [`CLASS_HASH_READ`](CLASS_HASH_READ.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1324

Class hashes read during execution simulation

---

### declared_contracts

> **declared_contracts**: [`DECLARED_CONTRACT_READ`](DECLARED_CONTRACT_READ.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:1328

Declared contracts checked during execution simulation
