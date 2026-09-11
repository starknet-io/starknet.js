# Function: toHex64()

> **toHex64**(`number`): `string`

Defined in: [src/utils/num.ts:122](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L122)

Convert BigNumberish to hex format 0x + 64 hex chars

Similar as toStorageKey but conforming to exactly 0x(64 hex chars).

## Parameters

### number

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

## Returns

`string`

format: hex-0x(64)-string

## Example

```typescript
toHex64(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toHex64(123n); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toHex64('test'); // 'Error'
```
