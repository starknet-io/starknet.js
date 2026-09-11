# Function: isTypeStruct()

> **isTypeStruct**(`type`, `structs`): `boolean`

Defined in: [src/utils/calldata/cairo.ts:69](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/cairo.ts#L69)

Checks if a given type is a struct.

## Parameters

### type

`string`

The type to check for existence.

### structs

[`AbiStructs`](../../../../type-aliases/AbiStructs.md)

The collection of structs to search in.

## Returns

`boolean`

- True if the type exists in the structs, false otherwise.
