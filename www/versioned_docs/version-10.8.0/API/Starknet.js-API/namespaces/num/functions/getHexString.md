# Function: getHexString()

> **getHexString**(`str`): `string`

Defined in: [src/utils/num.ts:267](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L267)

Convert string to hexadecimal string

## Parameters

### str

`string`

string to convert

## Returns

`string`

converted hex-string

## Throws

str needs to be a number string in hex or whole number format

## Example

```typescript
const result = getHexString('123');
// result = "0x7b"

const result2 = getHexString('Hello');
// throws Error: Hello needs to be a hex-string or whole-number-string
```
