---
id: 'v2hash'
title: 'Namespace: v2hash'
sidebar_label: 'v2hash'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

Compute pedersen hash from data

#### Parameters

| Name   | Type                                      |
| :----- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`

format: hex-string - pedersen hash

#### Defined in

[src/utils/hash/transactionHash/v2.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/v2.ts#L16)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `contractAddress`, `entryPointSelector`, `calldata`, `maxFee`, `chainId`, `additionalData?`): `string`

Calculate transaction pedersen hash for common properties

Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)

#### Parameters

| Name                 | Type                                                                   | Default value |
| :------------------- | :--------------------------------------------------------------------- | :------------ |
| `txHashPrefix`       | [`TransactionHashPrefix`](../enums/constants.TransactionHashPrefix.md) | `undefined`   |
| `version`            | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `contractAddress`    | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `entryPointSelector` | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `calldata`           | [`RawCalldata`](types.md#rawcalldata)                                  | `undefined`   |
| `maxFee`             | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md)             | `undefined`   |
| `additionalData`     | [`BigNumberish`](types.md#bignumberish)[]                              | `[]`          |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/v2.ts#L28)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`, `compiledClassHash?`): `string`

Calculate declare transaction hash

#### Parameters

| Name                 | Type                                                       | Description |
| :------------------- | :--------------------------------------------------------- | :---------- |
| `classHash`          | `string`                                                   | hex-string  |
| `senderAddress`      | [`BigNumberish`](types.md#bignumberish)                    | -           |
| `version`            | [`BigNumberish`](types.md#bignumberish)                    | -           |
| `maxFee`             | [`BigNumberish`](types.md#bignumberish)                    | -           |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | -           |
| `nonce`              | [`BigNumberish`](types.md#bignumberish)                    | -           |
| `compiledClassHash?` | `string`                                                   | hex-string  |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/v2.ts#L58)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

Calculate deploy_account transaction hash

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](types.md#bignumberish)                    |
| `classHash`           | [`BigNumberish`](types.md#bignumberish)                    |
| `constructorCalldata` | [`RawCalldata`](types.md#rawcalldata)                      |
| `salt`                | [`BigNumberish`](types.md#bignumberish)                    |
| `version`             | [`BigNumberish`](types.md#bignumberish)                    |
| `maxFee`              | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`               | [`BigNumberish`](types.md#bignumberish)                    |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:83](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/v2.ts#L83)

---

### calculateTransactionHash

▸ **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

Calculate invoke transaction hash

#### Parameters

| Name              | Type                                                       |
| :---------------- | :--------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](types.md#bignumberish)                    |
| `version`         | [`BigNumberish`](types.md#bignumberish)                    |
| `calldata`        | [`RawCalldata`](types.md#rawcalldata)                      |
| `maxFee`          | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`         | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`           | [`BigNumberish`](types.md#bignumberish)                    |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v2.ts:111](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/v2.ts#L111)
