# Function: parseAlwaysAsBig()

> **parseAlwaysAsBig**(`str`): `any`

Defined in: [src/utils/json.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/json.ts#L41)

Convert JSON string to JSON object with all numbers as bigint

## Parameters

### str

`string`

JSON string

## Returns

`any`

Parsed json object

## Example

```typescript
const str = '[123, 12.3, 1234567890]';
const result = parseAlwaysAsBig(str);
// result = [123n, 12.3, 1234567890n]
```
