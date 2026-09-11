# Function: calculateContractAddressFromHash()

> **calculateContractAddressFromHash**(`salt`, `classHash`, `constructorCalldata`, `deployerAddress`): `string`

Defined in: [src/utils/hash/classHash/pedersen.ts:38](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/pedersen.ts#L38)

Calculate contract address from class hash

## Parameters

### salt

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Salt to be used for hashing

### classHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Class hash of contract to generate address for

### constructorCalldata

[`RawArgs`](../../../../type-aliases/RawArgs.md)

Call data for contract constructor

### deployerAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Address of contract deployer

## Returns

`string`

hex-string

## Example

```typescript
const result = hash.calculateContractAddressFromHash(
  1234,
  0x1cf4fe5d37868d25524cdacb89518d88bf217a9240a1e6fde71cc22c429e0e3,
  [1234, true, false],
  0x052fb1a9ab0db3c4f81d70fea6a2f6e55f57c709a46089b25eeec0e959db3695
);
// result = 0x5fb03d3a88d8e474976932f927ff6a9e332e06ed36642ea3e8c7e38bf010f76
```
