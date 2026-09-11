# Function: isUint256()

> **isUint256**(`bn`): `boolean`

Defined in: [src/utils/uint256.ts:34](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/uint256.ts#L34)

Test BigNumberish is in the range[0, 2**256-1]
Legacy support Export

## Parameters

### bn

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to test

## Returns

`boolean`

True if the input value is in the range[0, 2**256-1], false otherwise

## Example

```typescript
const result = uint256.isUint256(12345n);
// result = true
const result1 = uint256.isUint256(-1);
// result1 = false
```
