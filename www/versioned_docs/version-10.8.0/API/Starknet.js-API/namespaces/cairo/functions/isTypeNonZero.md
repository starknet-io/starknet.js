# Function: isTypeNonZero()

> **isTypeNonZero**(`type`): `boolean`

Defined in: [src/utils/calldata/cairo.ts:195](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/cairo.ts#L195)

Checks if the given type is a NonZero type.

## Parameters

### type

`string`

The type to check.

## Returns

`boolean`

`true` if the type is NonZero type, `false` otherwise.

## Example

```typescript
const result = cairo.isTypeNonZero('core::zeroable::NonZero::<u8>');
//result = true
```
