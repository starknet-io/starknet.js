# Function: isHex()

> **isHex**(`hex`): `boolean`

Defined in: [src/utils/num.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L26)

Test if string is hex-string

## Parameters

### hex

`string`

hex-string

## Returns

`boolean`

true if the input string is a hexadecimal string, false otherwise

## Example

```typescript
const hexString1 = '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';
const result1 = isHex(hexString1);
// result1 = true

const hexString2 = '2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';
const result2 = isHex(hexString2);
// result2 = false
```
