# Function: bigNumberishArrayToDecimalStringArray()

> **bigNumberishArrayToDecimalStringArray**(`data`): `string`[]

Defined in: [src/utils/num.ts:191](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L191)

Convert BigNumberish array to decimal string array

## Parameters

### data

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

array of big-numberish elements

## Returns

`string`[]

array of decimal strings

## Example

```typescript
const data = [100, 200n];
const result = bigNumberishArrayToDecimalStringArray(data);
// result = ['100', '200']
```
