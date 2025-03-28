---
id: 'v3hash'
title: 'Namespace: v3hash'
sidebar_label: 'v3hash'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### hashDAMode

▸ **hashDAMode**(`nonceDAMode`, `feeDAMode`): `bigint`

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `nonceDAMode` | [`BigNumberish`](types.md#bignumberish) |
| `feeDAMode`   | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L23)

---

### encodeResourceBoundsL1

▸ **encodeResourceBoundsL1**(`bounds`): `bigint`

Encode the L1&L2 gas limits of a V3 transaction

#### Parameters

| Name     | Type                                                                                 | Description                                 |
| :------- | :----------------------------------------------------------------------------------- | :------------------------------------------ |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) | object including the limits for L1 & L2 gas |

#### Returns

`bigint`

encoded data

#### Defined in

[src/utils/hash/transactionHash/v3.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L32)

---

### encodeResourceBoundsL2

▸ **encodeResourceBoundsL2**(`bounds`): `bigint`

Encode the L2 bound of a V3 transaction

#### Parameters

| Name     | Type                                                                                 | Description                                                                                                  |
| :------- | :----------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) | {l1_gas: {max_amount: u64, max_price_per_unit: u128}, l2_gas: {max_amount: u64, max_price_per_unit: u128}} } |

#### Returns

`bigint`

encoded data

#### Defined in

[src/utils/hash/transactionHash/v3.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L48)

---

### hashFeeField

▸ **hashFeeField**(`tip`, `bounds`): `bigint`

#### Parameters

| Name     | Type                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| `tip`    | [`BigNumberish`](types.md#bignumberish)                                              |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L56)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `senderAddress`, `chainId`, `nonce`, `tip`, `paymasterData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `additionalData?`): `string`

#### Parameters

| Name                        | Type                                                                                 | Default value |
| :-------------------------- | :----------------------------------------------------------------------------------- | :------------ |
| `txHashPrefix`              | [`TransactionHashPrefix`](../enums/constants.TransactionHashPrefix.md)               | `undefined`   |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                              | `undefined`   |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)                                              | `undefined`   |
| `chainId`                   | [`StarknetChainId`](../enums/constants.StarknetChainId.md)                           | `undefined`   |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                              | `undefined`   |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                              | `undefined`   |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                            | `undefined`   |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    | `undefined`   |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    | `undefined`   |
| `resourceBounds`            | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) | `undefined`   |
| `additionalData`            | [`BigNumberish`](types.md#bignumberish)[]                                            | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L62)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `compiledConstructorCalldata`, `salt`, `version`, `chainId`, `nonce`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 deploy_account transaction hash

#### Parameters

| Name                          | Type                                                                                 |
| :---------------------------- | :----------------------------------------------------------------------------------- |
| `contractAddress`             | [`BigNumberish`](types.md#bignumberish)                                              |
| `classHash`                   | [`BigNumberish`](types.md#bignumberish)                                              |
| `compiledConstructorCalldata` | [`Calldata`](types.md#calldata)                                                      |
| `salt`                        | [`BigNumberish`](types.md#bignumberish)                                              |
| `version`                     | [`BigNumberish`](types.md#bignumberish)                                              |
| `chainId`                     | [`StarknetChainId`](../enums/constants.StarknetChainId.md)                           |
| `nonce`                       | [`BigNumberish`](types.md#bignumberish)                                              |
| `nonceDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `feeDataAvailabilityMode`     | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `resourceBounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                         | [`BigNumberish`](types.md#bignumberish)                                              |
| `paymasterData`               | [`BigNumberish`](types.md#bignumberish)[]                                            |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:95](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L95)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `compiledClassHash`, `senderAddress`, `version`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 declare transaction hash

#### Parameters

| Name                        | Type                                                                                 |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| `classHash`                 | `string`                                                                             |
| `compiledClassHash`         | `string`                                                                             |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)                                              |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                              |
| `chainId`                   | [`StarknetChainId`](../enums/constants.StarknetChainId.md)                           |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                              |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]                                            |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `resourceBounds`            | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                              |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                            |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:128](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L128)

---

### calculateInvokeTransactionHash

▸ **calculateInvokeTransactionHash**(`senderAddress`, `version`, `compiledCalldata`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 invoke transaction hash

#### Parameters

| Name                        | Type                                                                                 |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)                                              |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                              |
| `compiledCalldata`          | [`Calldata`](types.md#calldata)                                                      |
| `chainId`                   | [`StarknetChainId`](../enums/constants.StarknetChainId.md)                           |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                              |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]                                            |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)                                    |
| `resourceBounds`            | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                              |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                            |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:161](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/hash/transactionHash/v3.ts#L161)
