# Type Alias: INNER_CALL_EXECUTION_RESOURCES

> **INNER_CALL_EXECUTION_RESOURCES** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1024

the resources consumed by an inner call (does not account for state diffs since data is squashed across the transaction)

## Properties

### l1_gas

> **l1_gas**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1029

l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used

#### Minimum

0

---

### l2_gas

> **l2_gas**: `number`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1034

l2 gas consumed by this transaction, used for computation and calldata

#### Minimum

0
