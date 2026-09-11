# Function: computeHashOnElements()

> **computeHashOnElements**(`data`): `string`

Defined in: [src/utils/hash/pedersenCore.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/pedersenCore.ts#L23)

Compute Pedersen hash from data

## Parameters

### data

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

Array of data to compute Pedersen hash on

## Returns

`string`

hex-string of Pedersen hash

## Example

```typescript
const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123']);
// result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
```
