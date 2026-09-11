# Function: getDependencies()

> **getDependencies**(`types`, `type`, `dependencies?`, `contains?`, `revision?`): `string`[]

Defined in: [src/utils/typedData.ts:171](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L171)

Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
in the resulting array.

## Parameters

### types

`Record`\<`string`, [`StarknetType`](../../RPC/type-aliases/StarknetType.md)[]\>

The types object containing all defined types.

### type

`string`

The name of the type to get dependencies for.

### dependencies?

`string`[] = `[]`

The array to store dependencies.

### contains?

`string` = `''`

The type contained within the struct.

### revision?

[`TypedDataRevision`](../../RPC/type-aliases/TypedDataRevision.md) = `Revision.LEGACY`

The revision of the TypedData.

## Returns

`string`[]

The array of dependencies.
