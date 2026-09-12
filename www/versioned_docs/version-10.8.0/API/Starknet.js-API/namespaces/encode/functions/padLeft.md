# Function: padLeft()

> **padLeft**(`str`, `length`, `padding?`): `string`

Defined in: [src/utils/encode.ts:203](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/encode.ts#L203)

Prepend string (default with '0')

Pads a string to a certain length with a specific string.
The padding can be applied only to the left of the input string.

## Parameters

### str

`string`

The string to pad.

### length

`number`

The target length for the padded string.

### padding?

`string` = `STRING_ZERO`

The string to use for padding. Defaults to '0'.

## Returns

`string`

The padded string.

## Example

```typescript
const myString = '1A3F';
const result = encode.padLeft(myString, 10);
// result: '0000001A3F'
```
