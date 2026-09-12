# Function: btoaUniversal()

> **btoaUniversal**(`b`): `string`

Defined in: [src/utils/encode.ts:97](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L97)

Convert array buffer to string (browser and node compatible)

## Parameters

### b

`ArrayBuffer`

The Array buffer.

## Returns

`string`

The Base64 encoded string.

## Example

```typescript
const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
const result = encode.btoaUniversal(buffer);
// result = "SGVsbG8="
```
