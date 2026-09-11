# Function: calculateDeployAccountTransactionHash()

> **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `compiledConstructorCalldata`, `salt`, `version`, `chainId`, `nonce`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Defined in: [src/utils/hash/transactionHash/v3.ts:108](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v3.ts#L108)

Calculate v3 deploy_account transaction hash

## Parameters

### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### classHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### compiledConstructorCalldata

[`Calldata`](../../../../type-aliases/Calldata.md)

### salt

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### nonceDataAvailabilityMode

[`EDAMode`](../../RPC/type-aliases/EDAMode.md)

### feeDataAvailabilityMode

[`EDAMode`](../../RPC/type-aliases/EDAMode.md)

### resourceBounds

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

### tip

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### paymasterData

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

## Returns

`string`

format: hex-string
