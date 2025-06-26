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

[src/utils/hash/transactionHash/v3.ts:29](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L29)

---

### encodeResourceBoundsL1

▸ **encodeResourceBoundsL1**(`bounds`): `bigint`

Encode the L1&L2 gas limits of a V3 transaction

#### Parameters

| Name     | Type                                        | Description                                 |
| :------- | :------------------------------------------ | :------------------------------------------ |
| `bounds` | [`ResourceBounds`](types.md#resourcebounds) | object including the limits for L1 & L2 gas |

#### Returns

`bigint`

encoded data

#### Defined in

[src/utils/hash/transactionHash/v3.ts:38](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L38)

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

[src/utils/hash/transactionHash/v3.ts:54](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L54)

---

### encodeDataResourceBoundsL1

▸ **encodeDataResourceBoundsL1**(`bounds`): `bigint`

#### Parameters

| Name     | Type                                                                            |
| :------- | :------------------------------------------------------------------------------ |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:62](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L62)

---

### hashFeeField

▸ **hashFeeField**(`tip`, `bounds`): `bigint`

hash tip and resource bounds (2 bound parameters) V3 RPC 0.7

#### Parameters

| Name     | Type                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| `tip`    | [`BigNumberish`](types.md#bignumberish)                                              |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:73](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L73)

---

### hashFeeFieldV3B3

▸ **hashFeeFieldV3B3**(`tip`, `bounds`): `bigint`

hash tip and resource bounds (3 bounds params) V3 RPC 0.8

#### Parameters

| Name     | Type                                                                            |
| :------- | :------------------------------------------------------------------------------ |
| `tip`    | [`BigNumberish`](types.md#bignumberish)                                         |
| `bounds` | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:82](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L82)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `senderAddress`, `chainId`, `nonce`, `tip`, `paymasterData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `additionalData?`): `string`

#### Parameters

| Name                        | Type                                                                                                                                 | Default value |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `txHashPrefix`              | `"0x6465636c617265"` \| `"0x6465706c6f79"` \| `"0x6465706c6f795f6163636f756e74"` \| `"0x696e766f6b65"` \| `"0x6c315f68616e646c6572"` | `undefined`   |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                                                                              | `undefined`   |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)                                                                                              | `undefined`   |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`                                                                                   | `undefined`   |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                                                                              | `undefined`   |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                                                                              | `undefined`   |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                                                                            | `undefined`   |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)                                                                                    | `undefined`   |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)                                                                                    | `undefined`   |
| `resourceBounds`            | [`ResourceBounds`](types.md#resourcebounds)                                                                                          | `undefined`   |
| `additionalData`            | [`BigNumberish`](types.md#bignumberish)[]                                                                                            | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:89](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L89)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `compiledConstructorCalldata`, `salt`, `version`, `chainId`, `nonce`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 deploy_account transaction hash

#### Parameters

| Name                          | Type                                               |
| :---------------------------- | :------------------------------------------------- |
| `contractAddress`             | [`BigNumberish`](types.md#bignumberish)            |
| `classHash`                   | [`BigNumberish`](types.md#bignumberish)            |
| `compiledConstructorCalldata` | [`Calldata`](types.md#calldata)                    |
| `salt`                        | [`BigNumberish`](types.md#bignumberish)            |
| `version`                     | [`BigNumberish`](types.md#bignumberish)            |
| `chainId`                     | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |
| `nonce`                       | [`BigNumberish`](types.md#bignumberish)            |
| `nonceDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `feeDataAvailabilityMode`     | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `resourceBounds`              | [`ResourceBounds`](types.md#resourcebounds)        |
| `tip`                         | [`BigNumberish`](types.md#bignumberish)            |
| `paymasterData`               | [`BigNumberish`](types.md#bignumberish)[]          |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:124](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L124)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `compiledClassHash`, `senderAddress`, `version`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 declare transaction hash

#### Parameters

| Name                        | Type                                               |
| :-------------------------- | :------------------------------------------------- |
| `classHash`                 | `string`                                           |
| `compiledClassHash`         | `string`                                           |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)            |
| `version`                   | [`BigNumberish`](types.md#bignumberish)            |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)            |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]          |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `resourceBounds`            | [`ResourceBounds`](types.md#resourcebounds)        |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)            |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]          |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:157](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L157)

---

### calculateInvokeTransactionHash

▸ **calculateInvokeTransactionHash**(`senderAddress`, `version`, `compiledCalldata`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 invoke transaction hash

#### Parameters

| Name                        | Type                                               |
| :-------------------------- | :------------------------------------------------- |
| `senderAddress`             | [`BigNumberish`](types.md#bignumberish)            |
| `version`                   | [`BigNumberish`](types.md#bignumberish)            |
| `compiledCalldata`          | [`Calldata`](types.md#calldata)                    |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)            |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]          |
| `nonceDataAvailabilityMode` | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `feeDataAvailabilityMode`   | [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)  |
| `resourceBounds`            | [`ResourceBounds`](types.md#resourcebounds)        |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)            |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]          |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:190](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/hash/transactionHash/v3.ts#L190)
