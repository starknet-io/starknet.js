# Function: uint256ToBN()

> **uint256ToBN**(`uint256`): `bigint`

Defined in: [src/utils/uint256.ts:17](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/uint256.ts#L17)

Convert Uint256 to bigint
Legacy support Export

## Parameters

### uint256

[`Uint256`](../../../../interfaces/Uint256.md)

Uint256 value to convert to bigint

## Returns

`bigint`

BigInt representation of the input Uint256

## Example

```typescript
const uint256Value: Uint256 = { low: 1234567890, high: 1 };
const result = uint256.uint256ToBN(uint256Value);
// result = 340282366920938463463374607433002779346n
```
