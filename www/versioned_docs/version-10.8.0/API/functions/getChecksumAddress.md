# Function: getChecksumAddress()

> **getChecksumAddress**(`address`): `string`

Defined in: [src/utils/address.ts:77](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/address.ts#L77)

Convert an address to her checksum representation which uses a specific pattern of uppercase and lowercase letters within
a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.

## Parameters

### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

## Returns

`string`

Hex string : 0x followed by 64 characters. Mix of uppercase and lowercase

## Example

```typescript
const address = '0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf';
const result = getChecksumAddress(address);
// result = "0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF"
```
