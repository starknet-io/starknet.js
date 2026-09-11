# Function: dynamicFelt()

> **dynamicFelt**(`hardcoded?`, `reference?`): [`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

Defined in: [src/utils/starknetId.ts:357](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L357)

Creates a new instance of CairoCustomEnum.

## Parameters

### hardcoded?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

The hardcoded value for the CairoCustomEnum.

### reference?

`number`[] = `undefined`

The reference array for the CairoCustomEnum.

## Returns

[`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

The new instance of CairoCustomEnum.

## Example

```typescript
const result: CairoCustomEnum = starknetId.dynamicFelt(undefined, [1, 2]);
// result = CairoCustomEnum {
//  variant: { Hardcoded: undefined, Reference: { '0': 1, '1': 2 } }
// }
```
