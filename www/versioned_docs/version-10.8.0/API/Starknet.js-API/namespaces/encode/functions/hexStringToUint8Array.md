# Function: hexStringToUint8Array()

> **hexStringToUint8Array**(`hex`): `Uint8Array`

Defined in: [src/utils/encode.ts:344](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L344)

Convert hex string to Uint8Array

## Parameters

### hex

`string`

The hex string to convert (with or without '0x' prefix)

## Returns

`Uint8Array`

The converted byte array

## Throws

If the string contains non-hexadecimal characters

## Example

```typescript
const hexString = '0x48656c6c6f';
const result = encode.hexStringToUint8Array(hexString);
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```
