# Function: validateChecksumAddress()

> **validateChecksumAddress**(`address`): `boolean`

Defined in: [src/utils/address.ts:107](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/address.ts#L107)

If the casing of an address is mixed, it is a Checksum Address, which uses a specific pattern of uppercase and lowercase letters within
a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.

## Parameters

### address

`string`

string

## Returns

`boolean`

true if the ChecksumAddress is valid

## Example

```typescript
const address = '0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF';
const result = validateChecksumAddress(address);
// result = true
```
