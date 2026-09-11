# Function: getSelector()

> **getSelector**(`value`): `string`

Defined in: [src/utils/hash/selector.ts:93](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L93)

Calculate the hex-string selector from a given abi function name or of any representation of number.

## Parameters

### value

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

ascii-string | hex-string | dec-string | number | BigInt

## Returns

`string`

hex-string selector

## Example

```typescript
const selector1: string = getSelector('myFunction');
// selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"

const selector2: string = getSelector('0x123abc');
// selector2 = "0x123abc"

const selector3: string = getSelector('123456');
// selector3 = "0x1e240"

const selector4: string = getSelector(123456n);
// selector4 = "0x1e240"
```
