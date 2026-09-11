# Type Alias: FUNCTION_INVOCATION

> **FUNCTION_INVOCATION** = [`FUNCTION_CALL`](FUNCTION_CALL.md) & `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:985

Represents a function invocation along with its execution details.

## Type Declaration

### caller_address

> **caller_address**: [`FELT`](FELT.md)

The address of the invoking contract. 0 for the root invocation

### class_hash

> **class_hash**: [`FELT`](FELT.md)

The hash of the class being called

### entry_point_type

> **entry_point_type**: [`ENTRY_POINT_TYPE`](ENTRY_POINT_TYPE.md)

### call_type

> **call_type**: [`CALL_TYPE`](CALL_TYPE.md)

### result

> **result**: [`FELT`](FELT.md)[]

The value returned from the function invocation

### calls

> **calls**: [`NESTED_CALL`](NESTED_CALL.md)[]

The calls made by this invocation

### events

> **events**: [`ORDERED_EVENT`](ORDERED_EVENT.md)[]

The events emitted in this invocation

### messages

> **messages**: [`ORDERED_MESSAGE`](ORDERED_MESSAGE.md)[]

The messages sent by this invocation to L1

### execution_resources

> **execution_resources**: [`INNER_CALL_EXECUTION_RESOURCES`](INNER_CALL_EXECUTION_RESOURCES.md)

Resources consumed by the call tree rooted at this given call (including the root)

### is_reverted

> **is_reverted**: `boolean`

true if this inner call panicked
