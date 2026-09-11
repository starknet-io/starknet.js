# Function: calcByteLength()

> **calcByteLength**(`str`, `byteSize?`): `number`

Defined in: [src/utils/encode.ts:227](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L227)

Calculate byte length of string

_[no internal usage]_

Calculates the byte length of a string based on a specified byte size.
The function rounds up the byte count to the nearest multiple of the specified byte size.

## Parameters

### str

`string`

The string whose byte length is to be calculated.

### byteSize?

`number` = `8`

The size of the byte block to round up to. Defaults to 8.

## Returns

`number`

The calculated byte length, rounded to the nearest multiple of byteSize.

## Example

```typescript
const myString = 'Hello';
const result = encode.calcByteLength(myString, 4);
// result = 8 (rounded up to the nearest multiple of 4)
```
