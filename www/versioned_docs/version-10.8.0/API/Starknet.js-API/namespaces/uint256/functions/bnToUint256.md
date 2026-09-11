# Function: bnToUint256()

> **bnToUint256**(`bn`): [`Uint256`](../../../../interfaces/Uint256.md)

Defined in: [src/utils/uint256.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/uint256.ts#L49)

Convert BigNumberish (string | number | bigint) to Uint256
Legacy support Export

## Parameters

### bn

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to convert to Uint256

## Returns

[`Uint256`](../../../../interfaces/Uint256.md)

Uint256 object representing the BigNumberish value

## Example

```typescript
const result = uint256.bnToUint256(1000000000n);
// result = {"low": "0x3b9aca00", "high": "0x0"}
```
