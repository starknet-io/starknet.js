# Function: calculateDeclareTransactionHash()

> **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`, `compiledClassHash?`): `string`

Defined in: [src/utils/hash/transactionHash/v2.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v2.ts#L59)

Calculate declare transaction hash

## Parameters

### classHash

`string`

hex-string

### senderAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### maxFee

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### compiledClassHash?

`string`

hex-string

## Returns

`string`

format: hex-string
