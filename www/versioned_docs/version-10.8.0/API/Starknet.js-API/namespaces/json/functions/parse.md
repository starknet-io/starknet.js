# Function: parse()

> **parse**(`str`): `any`

Defined in: [src/utils/json.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/json.ts#L27)

Convert JSON string to JSON object

NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
which can accept simple data types but is not represented in the default typing

## Parameters

### str

`string`

JSON string

## Returns

`any`

Parsed json object

## Example

```typescript
const str = '[123, 12.3, 11223344556677889900]';
const result = parse(str);
// result = [123, 12.3, 11223344556677890048n]
```
