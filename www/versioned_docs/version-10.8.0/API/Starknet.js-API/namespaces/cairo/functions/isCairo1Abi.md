# Function: isCairo1Abi()

> **isCairo1Abi**(`abi`): `boolean`

Defined in: [src/utils/calldata/cairo.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/cairo.ts#L176)

Test if an ABI comes from a Cairo 1 contract

## Parameters

### abi

[`Abi`](../../../../type-aliases/Abi.md)

representing the interface of a Cairo contract

## Returns

`boolean`

TRUE if it is an ABI from a Cairo1 contract

## Example

```typescript
const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
```
