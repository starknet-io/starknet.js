# Function: solidityUint256PackedKeccak256()

> **solidityUint256PackedKeccak256**(`params`): `string`

Defined in: [src/utils/hash/selector.ts:110](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L110)

Solidity hash of an array of uint256

## Parameters

### params

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

an array of uint256 numbers

## Returns

`string`

the hash of the array of Solidity uint256

## Example

```typescript
const result = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
// result = '0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97'
```
