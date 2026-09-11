# Function: calculateInvokeTransactionHash()

> **calculateInvokeTransactionHash**(`senderAddress`, `version`, `compiledCalldata`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`, `proofFacts?`): `string`

Defined in: [src/utils/hash/transactionHash/v3.ts:174](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v3.ts#L174)

Calculate v3 invoke transaction hash

## Parameters

### senderAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### compiledCalldata

[`Calldata`](../../../../type-aliases/Calldata.md)

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

### proofFacts?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

## Returns

`string`

format: hex-string
