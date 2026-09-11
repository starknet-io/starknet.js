# Type Alias: INVOKE_TXN_V3

> **INVOKE_TXN_V3** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:801

## Properties

### type

> **type**: [`TXN_TYPE_INVOKE`](TXN_TYPE_INVOKE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:802

---

### sender_address

> **sender_address**: [`ADDRESS`](ADDRESS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:803

---

### calldata

> **calldata**: [`FELT`](FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:804

---

### version

> **version**: _typeof_ [`V3`](../variables/ETransactionVersion.md#v3) \| _typeof_ [`F3`](../variables/ETransactionVersion.md#f3)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:805

---

### signature

> **signature**: [`SIGNATURE`](SIGNATURE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:806

---

### nonce

> **nonce**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:807

---

### resource_bounds

> **resource_bounds**: [`RESOURCE_BOUNDS_MAPPING`](RESOURCE_BOUNDS_MAPPING.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:808

---

### tip

> **tip**: [`u64`](u64.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:809

---

### paymaster_data

> **paymaster_data**: [`FELT`](FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:810

---

### account_deployment_data

> **account_deployment_data**: [`FELT`](FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:811

---

### nonce_data_availability_mode

> **nonce_data_availability_mode**: [`DA_MODE`](DA_MODE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:812

---

### fee_data_availability_mode

> **fee_data_availability_mode**: [`DA_MODE`](DA_MODE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:813

---

### proof_facts?

> `optional` **proof_facts?**: [`PROOF_FACTS`](PROOF_FACTS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:817

Proof facts for the transaction. An empty array is returned if no proof facts exist for the transaction
