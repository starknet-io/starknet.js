# Function: dynamicCallData()

> **dynamicCallData**(`hardcoded?`, `reference?`, `arrayReference?`): [`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

Defined in: [src/utils/starknetId.ts:385](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L385)

Creates a new instance of CairoCustomEnum with the given parameters.

## Parameters

### hardcoded?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

The hardcoded value.

### reference?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `undefined`

The reference value (optional).

### arrayReference?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `undefined`

The array reference value (optional).

## Returns

[`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

The new instance of CairoCustomEnum.

## Example

```typescript
const result: CairoCustomEnum = starknetId.dynamicCallData(undefined, [1, 2], undefined);
// result = CairoCustomEnum {
//   variant: {
//     Hardcoded: undefined,
//     Reference: { '0': 1, '1': 2 },
//     ArrayReference: undefined
//   }
// }
```
