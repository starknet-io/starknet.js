# Function: splitLongString()

> **splitLongString**(`longStr`): `string`[]

Defined in: [src/utils/shortString.ts:103](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L103)

Split long text (string greater than 31 characters) into short strings (string lesser or equal 31 characters)

## Parameters

### longStr

`string`

the long text (string greater than 31 characters) to split

## Returns

`string`[]

an array of short strings (string lesser or equal 31 characters).

## Example

```typescript
const result = shortString.splitLongString(
  'Hello, world! we just testing splitLongString function.'
);
// result = [ 'Hello, world! we just testing s', 'plitLongString function.' ]
```
