# Function: byteArrayFromString()

> **byteArrayFromString**(`targetString`): [`ByteArray`](../../../../type-aliases/ByteArray.md)

Defined in: [src/utils/calldata/byteArray.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/byteArray.ts#L48)

convert a JS string to a Cairo ByteArray

## Parameters

### targetString

`string`

a JS string

## Returns

[`ByteArray`](../../../../type-aliases/ByteArray.md)

Cairo representation of a LongString

## Example

```typescript
const myByteArray: ByteArray = byteArrayFromString('ABCDEFGHI');
```

Result is :
{
data: [],
pending_word: '0x414243444546474849',
pending_word_len: 9
}
