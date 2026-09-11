# Function: bigNumberishArrayToHexadecimalStringArray()

> **bigNumberishArrayToHexadecimalStringArray**(`data`): `string`[]

Defined in: [src/utils/num.ts:207](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L207)

Convert BigNumberish array to hexadecimal string array

## Parameters

### data

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

array of big-numberish elements

## Returns

`string`[]

array of hex-strings

## Example

```typescript
const data = [100, 200n];
const result = bigNumberishArrayToHexadecimalStringArray(data);
// result = ['0x64', '0xc8']
```
