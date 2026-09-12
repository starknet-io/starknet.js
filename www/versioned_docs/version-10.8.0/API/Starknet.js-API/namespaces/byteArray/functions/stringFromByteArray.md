# Function: stringFromByteArray()

> **stringFromByteArray**(`myByteArray`): `string`

Defined in: [src/utils/calldata/byteArray.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/byteArray.ts#L19)

convert a Cairo ByteArray to a JS string

## Parameters

### myByteArray

[`ByteArray`](../../../../type-aliases/ByteArray.md)

Cairo representation of a LongString

## Returns

`string`

a JS string

## Example

```typescript
const myByteArray = {
  data: [],
  pending_word: '0x414243444546474849',
  pending_word_len: 9,
};
const result: String = stringFromByteArray(myByteArray); // ABCDEFGHI
```
