# Function: getHexStringArray()

> **getHexStringArray**(`array`): `string`[]

Defined in: [src/utils/num.ts:289](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L289)

Convert string array to hex-string array

## Parameters

### array

`string`[]

array of string elements

## Returns

`string`[]

array of converted elements in hex-string format

## Example

```typescript
const data = ['100', '200', '0xaa'];
const result = getHexStringArray(data);
// result = ['0x64', '0xc8', '0xaa']
```
