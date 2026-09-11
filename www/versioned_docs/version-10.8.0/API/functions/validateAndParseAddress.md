# Function: validateAndParseAddress()

> **validateAndParseAddress**(`address`): `string`

Defined in: [src/utils/address.ts:52](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/address.ts#L52)

Check the validity of a Starknet address, and format it as a hex number: '0x' and 64 characters, adding leading zeros if necessary.

## Parameters

### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

## Returns

`string`

Hex string: 0x followed by 64 characters. No upper case characters in the response.

## Throws

address argument must be a valid address inside the address range bound

## Example

```typescript
const result = [
  31,
  0x1f,
  '31',
  '0x1f',
  '0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf',
].map(addAddressPadding);
// result = [
//   '0x000000000000000000000000000000000000000000000000000000000000001f',
//   '0x000000000000000000000000000000000000000000000000000000000000001f',
//   '0x0000000000000000000000000000000000000000000000000000000000000031',
//   '0x000000000000000000000000000000000000000000000000000000000000001f',
//   '0x0000090591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf'
// ]
```
