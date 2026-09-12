# Type Alias: DEPLOY_ACCOUNT_TXN_TRACE

> **DEPLOY_ACCOUNT_TXN_TRACE** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:955

A transaction trace for a deploy account transaction

## Properties

### type

> **type**: [`TXN_TYPE_DEPLOY_ACCOUNT`](TXN_TYPE_DEPLOY_ACCOUNT.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:956

---

### constructor_invocation

> **constructor_invocation**: [`FUNCTION_INVOCATION`](FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:960

The trace of the constructor call

---

### validate_invocation?

> `optional` **validate_invocation?**: [`FUNCTION_INVOCATION`](FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:961

---

### fee_transfer_invocation?

> `optional` **fee_transfer_invocation?**: [`FUNCTION_INVOCATION`](FUNCTION_INVOCATION.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:962

---

### state_diff?

> `optional` **state_diff?**: [`STATE_DIFF`](STATE_DIFF.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:963

---

### execution_resources

> **execution_resources**: [`EXECUTION_RESOURCES`](EXECUTION_RESOURCES.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:964
