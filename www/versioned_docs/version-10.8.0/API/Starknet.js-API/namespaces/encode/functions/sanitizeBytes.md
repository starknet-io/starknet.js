# Function: sanitizeBytes()

> **sanitizeBytes**(`str`, `byteSize?`, `padding?`): `string`

Defined in: [src/utils/encode.ts:254](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L254)

Prepend '0' to string bytes

_[no internal usage]_

- Prepends padding to the left of a string to ensure it matches a specific byte length.
  The function uses a specified padding character and rounds up the string length to the nearest multiple of `byteSize`.

## Parameters

### str

`string`

The string to be padded.

### byteSize?

`number` = `8`

The byte block size to which the string length should be rounded up. Defaults to 8.

### padding?

`string` = `STRING_ZERO`

The character to use for padding. Defaults to '0'.

## Returns

`string`

The padded string.

## Example

```typescript
const myString = '123';
const result = encode.sanitizeBytes(myString);
// result: '00000123' (padded to 8 characters)
```
