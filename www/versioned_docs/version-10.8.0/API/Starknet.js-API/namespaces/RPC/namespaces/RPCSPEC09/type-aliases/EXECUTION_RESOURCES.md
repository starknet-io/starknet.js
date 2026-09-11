# Type Alias: EXECUTION_RESOURCES

> **EXECUTION_RESOURCES** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:847

the resources consumed by the transaction

## Properties

### l1_gas

> **l1_gas**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:853

l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used.
integer

#### Minimum

0

---

### l1_data_gas

> **l1_data_gas**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:859

data gas consumed by this transaction, 0 if blobs are not used
integer

#### Minimum

0

---

### l2_gas

> **l2_gas**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:865

l2 gas consumed by this transaction, used for computation and calldata
Integer

#### Minimum

0
