# Function: atobUniversal()

> **atobUniversal**(`a`): `Uint8Array`

Defined in: [src/utils/encode.ts:80](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L80)

Convert string to array buffer (browser and node compatible)

## Parameters

### a

`string`

The Base64 encoded string to convert.

## Returns

`Uint8Array`

The decoded Uint8Array.

## Example

```typescript
const base64String = 'SGVsbG8='; // 'Hello' in Base64
const result = encode.atobUniversal(base64String);
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```
