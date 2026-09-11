# Variable: toHexString

> `const` **toHexString**: (`value`) => `string` = `toHex`

Defined in: [src/utils/num.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L75)

Alias of ToHex

Convert BigNumberish to hex-string

## Parameters

### value

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to convert

## Returns

`string`

converted number in hex-string format

## Example

```typescript
toHex(100); // '0x64'
toHex('200'); // '0xc8'
toHex('0x00023AB'); // '0x23ab'
```
