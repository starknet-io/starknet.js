# Function: getDecimalString()

> **getDecimalString**(`str`): `string`

Defined in: [src/utils/num.ts:242](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L242)

Convert string to decimal string

## Parameters

### str

`string`

string to convert

## Returns

`string`

converted string in decimal format

## Throws

str needs to be a number string in hex or whole number format

## Example

```typescript
const result = getDecimalString('0x1a');
// result = "26"

const result2 = getDecimalString('Hello');
// throws Error: "Hello needs to be a hex-string or whole-number-string"
```
