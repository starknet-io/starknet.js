# Function: sanitizeHex()

> **sanitizeHex**(`hex`): `string`

Defined in: [src/utils/encode.ts:277](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L277)

Sanitizes a hex-string by removing any existing '0x' prefix, padding the string with '0' to ensure it has even length,
and then re-adding the '0x' prefix.

_[no internal usage]_

## Parameters

### hex

`string`

hex-string

## Returns

`string`

format: hex-string

## Example

```typescript
const unevenHex = '0x23abc';
const result = encode.sanitizeHex(unevenHex);
// result = '0x023abc' (padded to ensure even length)
```
