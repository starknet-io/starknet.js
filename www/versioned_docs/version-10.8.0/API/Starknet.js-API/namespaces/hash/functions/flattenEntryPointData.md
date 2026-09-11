# Function: flattenEntryPointData()

> **flattenEntryPointData**(`data`, `encodedBuiltinsArray`): `bigint`[]

Defined in: [src/utils/hash/classHash/util.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/util.ts#L68)

Extract entry point data for hashing
Returns flattened array of [selector, offset, ...builtins] for each entry point

## Parameters

### data

[`ContractEntryPointFields`](../../../../type-aliases/ContractEntryPointFields.md)[]

### encodedBuiltinsArray

`bigint`[][]

## Returns

`bigint`[]
