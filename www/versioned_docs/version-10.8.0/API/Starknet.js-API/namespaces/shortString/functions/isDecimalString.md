# Function: isDecimalString()

> **isDecimalString**(`str`): `boolean`

Defined in: [src/utils/shortString.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L49)

Test if string contains only numbers (string can be converted to decimal integer number)

## Parameters

### str

`string`

the string to test.

## Returns

`boolean`

Returns true if the string contains only numbers, otherwise false.

## Example

```typescript
const result = shortString.isDecimalString('12345');
// result = true
const result = shortString.isDecimalString('12a45');
// result = false
```
