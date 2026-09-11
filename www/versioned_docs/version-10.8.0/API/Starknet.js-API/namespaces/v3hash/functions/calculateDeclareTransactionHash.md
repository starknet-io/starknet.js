# Function: calculateDeclareTransactionHash()

> **calculateDeclareTransactionHash**(`classHash`, `compiledClassHash`, `senderAddress`, `version`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Defined in: [src/utils/hash/transactionHash/v3.ts:141](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v3.ts#L141)

Calculate v3 declare transaction hash

## Parameters

### classHash

`string`

### compiledClassHash

`string`

### senderAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### accountDeploymentData

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

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
