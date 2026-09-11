# ~~Function: encodeShortString()~~

> **encodeShortString**(`str`): `string`

Defined in: [src/utils/shortString.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L119)

## Parameters

### str

`string`

short string (ASCII string, 31 characters max)

## Returns

`string`

hex-string with 248 bits max

## Deprecated

use Utf8 instead
Convert an ASCII short string to a hexadecimal string.

## Example

```typescript
const result = shortString.encodeShortString('uri/pict/t38.jpg');
// result = "0x7572692f706963742f7433382e6a7067"
```
