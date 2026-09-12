# Function: uint8ArrayToBigInt()

> **uint8ArrayToBigInt**(`data`): `bigint`

Defined in: [src/utils/encode.ts:472](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L472)

Convert Uint8Array to bigint (big-endian)

## Parameters

### data

`Uint8Array`

The Uint8Array to convert (interpreted as big-endian)

## Returns

`bigint`

The converted bigint value

## Example

```typescript
const data = new Uint8Array([1, 0]); // Big-endian representation
const result = encode.uint8ArrayToBigInt(data);
// result = 256n (0x0100)
```
