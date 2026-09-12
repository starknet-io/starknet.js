# Function: stringify()

> **stringify**(`value`, `replacer?`, `space?`, `numberStringifiers?`): `string`

Defined in: [src/utils/json.ts:62](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/json.ts#L62)

Convert JSON object to JSON string

NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
which can also return undefined but is not represented in the default typing

## Parameters

### value

`unknown`

JSON object

### replacer?

`any`

Function that alters the behavior of the stringification process

### space?

`string` \| `number`

Used to insert white space into the output JSON string

### numberStringifiers?

`NumberStringifier`[]

Function used to stringify numbers (returning undefined will delete the property from the object)

## Returns

`string`

JSON string

## Example

```typescript
const value = [123, 12.3, 1234567890];
const result = stringify(value);
// result = '[123,12.3,1234567890]'
```
