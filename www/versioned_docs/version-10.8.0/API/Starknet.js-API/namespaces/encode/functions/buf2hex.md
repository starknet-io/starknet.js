# Function: buf2hex()

> **buf2hex**(`buffer`): `string`

Defined in: [src/utils/encode.ts:114](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L114)

Convert array buffer to hex-string

## Parameters

### buffer

`Uint8Array`

The encoded Uint8Array.

## Returns

`string`

The hex-string

## Example

```typescript
const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
const result = encode.buf2hex(buffer);
// result = "48656c6c6f"
```
