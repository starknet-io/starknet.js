# Type Alias: INVOKE_TXN_TRACE

> **INVOKE_TXN_TRACE** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:931

A transaction trace for an invoke transaction

## Properties

### type

> **type**: [`TXN_TYPE_INVOKE`](TXN_TYPE_INVOKE.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:932

---

### execute_invocation

> **execute_invocation**: [`REVERTIBLE_FUNCTION_INVOCATION`](REVERTIBLE_FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:936

The trace of the **execute** call

---

### validate_invocation?

> `optional` **validate_invocation?**: [`FUNCTION_INVOCATION`](FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:937

---

### fee_transfer_invocation?

> `optional` **fee_transfer_invocation?**: [`FUNCTION_INVOCATION`](FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:938

---

### state_diff?

> `optional` **state_diff?**: [`STATE_DIFF`](STATE_DIFF.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:939

---

### execution_resources

> **execution_resources**: [`EXECUTION_RESOURCES`](EXECUTION_RESOURCES.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:940
