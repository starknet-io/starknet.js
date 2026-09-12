# Function: prepareSelector()

> **prepareSelector**(`selector`): `string`

Defined in: [src/utils/typedData.ts:133](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L133)

Prepares the selector for later use, if it's not already in correct format.
The selector in correct format is the starknet_keccak hash of the function name, encoded in ASCII.

## Parameters

### selector

`string`

The selector to be prepared.

## Returns

`string`

The prepared selector.

## Example

```typescript
const result1 = prepareSelector('0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8');
// result1 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'

const result2 = prepareSelector('myFunction');
// result2 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
```
