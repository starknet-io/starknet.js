# Function: bigIntToUint8Array()

> **bigIntToUint8Array**(`value`): `Uint8Array`

Defined in: [src/utils/encode.ts:434](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L434)

Convert bigint to Uint8Array (big-endian)

## Parameters

### value

`bigint`

The bigint value to convert (must be non-negative)

## Returns

`Uint8Array`

The converted byte array in big-endian byte order

## Throws

If value is negative

## Example

```typescript
const value = 256n; // 0x0100
const result = encode.bigIntToUint8Array(value);
// result = Uint8Array([1, 0]) - big-endian, MSB first
```
