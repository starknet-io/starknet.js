# Function: validateTypedData()

> **validateTypedData**(`data`): `data is TypedData`

Defined in: [src/utils/typedData.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L104)

Validates that `data` matches the EIP-712 JSON schema, and that it does not redefine any
of the active revision's preset type names (SNIP-12 reserves those names and requires such
a request to be rejected).

## Parameters

### data

`unknown`

## Returns

`data is TypedData`
