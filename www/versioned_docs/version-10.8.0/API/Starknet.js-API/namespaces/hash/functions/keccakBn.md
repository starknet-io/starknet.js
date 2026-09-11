# Function: keccakBn()

> **keccakBn**(`value`): `string`

Defined in: [src/utils/hash/selector.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L21)

Calculate the hex-string Starknet Keccak hash for a given BigNumberish

## Parameters

### value

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to hash

## Returns

`string`

hex-string Keccak hash

## Example

```typescript
const result = keccakBn('0xabc');
// result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
```
