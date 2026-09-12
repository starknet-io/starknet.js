# Function: getSelectorFromName()

> **getSelectorFromName**(`funcName`): `string`

Defined in: [src/utils/hash/selector.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L68)

Calculate the hex-string selector for a given abi function name
[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)

## Parameters

### funcName

`string`

abi function name

## Returns

`string`

hex-string selector

## Example

```typescript
const result = getSelectorFromName('myFunction');
// result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
```
