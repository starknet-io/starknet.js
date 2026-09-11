# Function: execution()

> **execution**(`staticEx?`, `ifEqual?`, `ifNotEqual?`): [`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

Defined in: [src/utils/starknetId.ts:331](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L331)

Returns a CairoCustomEnum object.

Functions to build CairoCustomEnum for multiCall contracts

## Parameters

### staticEx?

An optional object defining the "Static" value of the CairoCustomEnum.

### ifEqual?

`number`[] = `undefined`

An optional array defining the "IfEqual" value of the CairoCustomEnum.

### ifNotEqual?

`number`[] = `undefined`

An optional array defining the "IfNotEqual" value of the CairoCustomEnum.

## Returns

[`CairoCustomEnum`](../../../../classes/CairoCustomEnum.md)

- The created CairoCustomEnum object.

## Example

```typescript
const result: CairoCustomEnum = starknetId.execution(undefined, [1, 2, 3], undefined);
// result = CairoCustomEnum {
//   variant: {
//     Static: undefined,
//     IfEqual: { '0': 1, '1': 2, '2': 3 },
//     IfNotEqual: undefined
//   }
// }
```
