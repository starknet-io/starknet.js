---
id: 'v2hash'
title: 'Namespace: v2hash'
sidebar_label: 'v2hash'
sidebar_position: 0
custom_edit_url: null
---

## References

### calculateL2MessageTxHash

Re-exports [calculateL2MessageTxHash](hash.md#calculatel2messagetxhash)

## Functions

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

Compute pedersen hash from data

#### Parameters

| Name   | Type                                           |
| :----- | :--------------------------------------------- |
| `data` | [`BigNumberish`](../modules.md#bignumberish)[] |

#### Returns

`string`

format: hex-string - pedersen hash

#### Defined in

[src/utils/hash/transactionHash/v2.ts:17](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v2.ts#L17)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `contractAddress`, `entryPointSelector`, `calldata`, `maxFee`, `chainId`, `additionalData?`): `string`

Calculate transaction pedersen hash for common properties

Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)

#### Parameters

| Name                 | Type                                                                                                                                 | Default value |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `txHashPrefix`       | `"0x6465636c617265"` \| `"0x6465706c6f79"` \| `"0x6465706c6f795f6163636f756e74"` \| `"0x696e766f6b65"` \| `"0x6c315f68616e646c6572"` | `undefined`   |
| `version`            | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `contractAddress`    | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `entryPointSelector` | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `calldata`           | [`RawCalldata`](../modules.md#rawcalldata)                                                                                           | `undefined`   |
| `maxFee`             | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `chainId`            | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`                                                                                   | `undefined`   |
| `additionalData`     | [`BigNumberish`](../modules.md#bignumberish)[]                                                                                       | `[]`          |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:29](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v2.ts#L29)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`, `compiledClassHash?`): `string`

Calculate declare transaction hash

#### Parameters

| Name                 | Type                                               | Description |
| :------------------- | :------------------------------------------------- | :---------- |
| `classHash`          | `string`                                           | hex-string  |
| `senderAddress`      | [`BigNumberish`](../modules.md#bignumberish)       | -           |
| `version`            | [`BigNumberish`](../modules.md#bignumberish)       | -           |
| `maxFee`             | [`BigNumberish`](../modules.md#bignumberish)       | -           |
| `chainId`            | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` | -           |
| `nonce`              | [`BigNumberish`](../modules.md#bignumberish)       | -           |
| `compiledClassHash?` | `string`                                           | hex-string  |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:59](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v2.ts#L59)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

Calculate deploy_account transaction hash

#### Parameters

| Name                  | Type                                               |
| :-------------------- | :------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](../modules.md#bignumberish)       |
| `classHash`           | [`BigNumberish`](../modules.md#bignumberish)       |
| `constructorCalldata` | [`RawCalldata`](../modules.md#rawcalldata)         |
| `salt`                | [`BigNumberish`](../modules.md#bignumberish)       |
| `version`             | [`BigNumberish`](../modules.md#bignumberish)       |
| `maxFee`              | [`BigNumberish`](../modules.md#bignumberish)       |
| `chainId`             | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |
| `nonce`               | [`BigNumberish`](../modules.md#bignumberish)       |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:84](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v2.ts#L84)

---

### calculateTransactionHash

▸ **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

Calculate invoke transaction hash

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `version`         | [`BigNumberish`](../modules.md#bignumberish)       |
| `calldata`        | [`RawCalldata`](../modules.md#rawcalldata)         |
| `maxFee`          | [`BigNumberish`](../modules.md#bignumberish)       |
| `chainId`         | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |
| `nonce`           | [`BigNumberish`](../modules.md#bignumberish)       |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:112](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v2.ts#L112)
