# Function: calculateTransactionHashCommon()

> **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `senderAddress`, `chainId`, `nonce`, `tip`, `paymasterData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `additionalData?`): `string`

Defined in: [src/utils/hash/transactionHash/v3.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v3.ts#L75)

## Parameters

### txHashPrefix

`"0x6465636c617265"` \| `"0x6465706c6f79"` \| `"0x6465706c6f795f6163636f756e74"` \| `"0x696e766f6b65"` \| `"0x6c315f68616e646c6572"`

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### senderAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### tip

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### paymasterData

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

### nonceDataAvailabilityMode

[`EDAMode`](../../RPC/type-aliases/EDAMode.md)

### feeDataAvailabilityMode

[`EDAMode`](../../RPC/type-aliases/EDAMode.md)

### resourceBounds

[`ResourceBoundsBN`](../../../../type-aliases/ResourceBoundsBN.md)

### additionalData?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `[]`

## Returns

`string`
