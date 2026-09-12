# Function: calculateTransactionHash()

> **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

Defined in: [src/utils/hash/transactionHash/v2.ts:112](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v2.ts#L112)

Calculate invoke transaction hash

## Parameters

### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### calldata

[`RawCalldata`](../../../../type-aliases/RawCalldata.md)

### maxFee

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

## Returns

`string`

format: hex-string
