# Function: utf8ToUint8Array()

> **utf8ToUint8Array**(`str`): `Uint8Array`

Defined in: [src/utils/encode.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L48)

Convert utf8-string to Uint8Array

_[internal usage]_

## Parameters

### str

`string`

The UTF-8 string to convert.

## Returns

`Uint8Array`

The encoded Uint8Array.

## Example

```typescript
const myString = 'Hi';
const result = encode.utf8ToArray(myString);
// result = Uint8Array(2) [ 72, 105 ]
```
