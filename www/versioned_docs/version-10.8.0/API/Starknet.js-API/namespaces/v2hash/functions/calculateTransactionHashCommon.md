# Function: calculateTransactionHashCommon()

> **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `contractAddress`, `entryPointSelector`, `calldata`, `maxFee`, `chainId`, `additionalData?`): `string`

Defined in: [src/utils/hash/transactionHash/v2.ts:29](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/transactionHash/v2.ts#L29)

Calculate transaction pedersen hash for common properties

Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)

## Parameters

### txHashPrefix

`"0x6465636c617265"` \| `"0x6465706c6f79"` \| `"0x6465706c6f795f6163636f756e74"` \| `"0x696e766f6b65"` \| `"0x6c315f68616e646c6572"`

### version

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### entryPointSelector

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### calldata

[`RawCalldata`](../../../../type-aliases/RawCalldata.md)

### maxFee

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

### additionalData?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `[]`

## Returns

`string`

format: hex-string
