# Function: toCairoBool()

> **toCairoBool**(`value`): `string`

Defined in: [src/utils/num.ts:307](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L307)

Convert boolean to "0" or "1"

## Parameters

### value

`boolean`

The boolean value to be converted.

## Returns

`string`

Returns true if the value is a number, otherwise returns false.

## Example

```typescript
const result = toCairoBool(true);
// result ="1"

const result2 = toCairoBool(false);
// result2 = "0"
```
