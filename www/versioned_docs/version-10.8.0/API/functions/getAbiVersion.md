# Function: getAbiVersion()

> **getAbiVersion**(`abi`): `0` \| `1` \| `2`

Defined in: [src/utils/calldata/parser/index.ts:56](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/index.ts#L56)

Retrieves ABI version

## Parameters

### abi

[`Abi`](../type-aliases/Abi.md)

## Returns

`0` \| `1` \| `2`

abi 1, 2 or 0 version

## Example

```ts
// Example 1: Return ABI version 2
const version = getAbiVersion([getInterfaceAbi()]);
// version === 2

// Example 2: Return ABI version 1
const version = getAbiVersion([getInterfaceAbi('core::bool')]);
// version === 1

// Example 3: Return ABI version 0
const version = getAbiVersion([getInterfaceAbi('felt')]);
// version === 0
```
