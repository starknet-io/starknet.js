# Function: calculateDeployAccountTransactionHash()

> **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

Defined in: [src/utils/hash/transactionHash/v2.ts:84](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v2.ts#L84)

Calculate deploy_account transaction hash

## Parameters

### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### classHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### constructorCalldata

[`RawCalldata`](../../../../type-aliases/RawCalldata.md)

### salt

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### maxFee

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

## Returns

`string`

format: hex-string
