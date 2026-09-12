# Function: addHexPrefix()

> **addHexPrefix**(`hex`): `string`

Defined in: [src/utils/encode.ts:146](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L146)

Add hex prefix '0x' to base16-string

## Parameters

### hex

`string`

base16-string

## Returns

`string`

The hex-string

## Example

```typescript
const plainHexString = '48656c6c6f';
const result = encode.addHexPrefix(plainHexString);
// result: "0x48656c6c6f"
```
