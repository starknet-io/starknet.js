# ~~Function: decodeShortString()~~

> **decodeShortString**(`str`): `string`

Defined in: [src/utils/shortString.ts:136](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L136)

## Parameters

### str

`string`

representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423")

## Returns

`string`

short string; 31 characters max

## Deprecated

use Utf8 instead
Convert a hexadecimal or decimal string to an ASCII string.

## Example

```typescript
const result = shortString.decodeShortString('0x7572692f706963742f7433382e6a7067');
// result = "uri/pict/t38.jpg"
```
