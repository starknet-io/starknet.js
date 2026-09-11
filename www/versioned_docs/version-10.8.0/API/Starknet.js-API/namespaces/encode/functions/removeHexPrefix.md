# Function: removeHexPrefix()

> **removeHexPrefix**(`hex`): `string`

Defined in: [src/utils/encode.ts:130](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L130)

Remove hex prefix '0x' from hex-string

## Parameters

### hex

`string`

hex-string

## Returns

`string`

The hex-string

## Example

```typescript
const hexStringWithPrefix = '0x48656c6c6f';
const result = encode.removeHexPrefix(hexStringWithPrefix);
// result: "48656c6c6f"
```
