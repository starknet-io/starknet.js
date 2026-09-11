# Function: formatSpaces()

> **formatSpaces**(`json`): `string`

Defined in: [src/utils/hash/classHash/util.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/util.ts#L22)

Format json-string without spaces to conform starknet json-string

## Parameters

### json

`string`

json-string without spaces

## Returns

`string`

json-string with additional spaces after `:` and `,`

## Example

```typescript
const result = hash.formatSpaces("{'onchain':true,'isStarknet':true}");
// result = "{'onchain': true, 'isStarknet': true}"
```
