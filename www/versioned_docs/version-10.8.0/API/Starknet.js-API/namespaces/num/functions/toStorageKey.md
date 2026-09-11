# Function: toStorageKey()

> **toStorageKey**(`number`): `string`

Defined in: [src/utils/num.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L104)

Convert BigNumberish to storage-key-string

Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.

A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
`0x0 + [0-7] + 62 hex = 0x + 64 hex`

## Parameters

### number

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

## Returns

`string`

format: storage-key-string

## Example

```typescript
toStorageKey(0x123); // '0x0000000000000000000000000000000000000000000000000000000000000123'
toStorageKey(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toStorageKey('test'); // 'Error'
```
