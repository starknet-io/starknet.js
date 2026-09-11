# Interface: TRANSACTION_EXECUTION_ERROR

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:64

## Properties

### code

> **code**: `41`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:65

---

### message

> **message**: `"Transaction execution error"`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:66

---

### data

> **data**: `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:67

#### transaction_index

> **transaction_index**: `number`

The index of the first transaction failing in a sequence of given transactions

##### Minimum

0

#### execution_error

> **execution_error**: [`CONTRACT_EXECUTION_ERROR_INNER`](../type-aliases/CONTRACT_EXECUTION_ERROR_INNER.md)

the execution trace up to the point of failure
