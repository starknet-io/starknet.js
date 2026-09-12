# Function: concatenateArrayBuffer()

> **concatenateArrayBuffer**(`uint8arrays`): `Uint8Array`

Defined in: [src/utils/encode.ts:319](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L319)

Combine multiple Uint8Arrays into one.
Useful for wallet path creation.

## Parameters

### uint8arrays

`Uint8Array`\<`ArrayBufferLike`\>[]

An array of Uint8Array.

## Returns

`Uint8Array`

all the Uint8Arrays joined.

## Example

```typescript
const path0buff = new Uint8Array([128, 0, 10, 85]);
const path1buff = new Uint8Array([71, 65, 233, 201]);
const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
// result = Uint8Array(8) [128, 0, 10, 85, 71, 65, 233, 201]
```
