# Function: arrayBufferToString()

> **arrayBufferToString**(`array`): `string`

Defined in: [src/utils/encode.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L29)

Convert array buffer to string

_[internal usage]_

## Parameters

### array

`ArrayBuffer`

The ArrayBuffer to convert to string.

## Returns

`string`

The converted string.

## Example

```typescript
const buffer = new ArrayBuffer(5);
const view = new Uint8Array(buffer);
[72, 101, 108, 108, 111].forEach((x, idx) => (view[idx] = x));
const result = encode.arrayBufferToString(buffer);
// result = "Hello"
```
