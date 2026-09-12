# Function: toBigInt()

> **toBigInt**(`value`): `bigint`

Defined in: [src/utils/num.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L44)

Convert BigNumberish to bigint

## Parameters

### value

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to convert

## Returns

`bigint`

converted value

## Example

```typescript
const str = '123';
const result = toBigInt(str);
// result = 123n
```
