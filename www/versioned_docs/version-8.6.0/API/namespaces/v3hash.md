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

| Name          | Type                                         |
| :------------ | :------------------------------------------- |
| `nonceDAMode` | [`BigNumberish`](../modules.md#bignumberish) |
| `feeDAMode`   | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:24](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L24)

---

### encodeResourceBoundsL1

▸ **encodeResourceBoundsL1**(`bounds`): `bigint`

Encode the L1&L2 gas limits of a V3 transaction

#### Parameters

| Name     | Type                                                 | Description                                 |
| :------- | :--------------------------------------------------- | :------------------------------------------ |
| `bounds` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) | object including the limits for L1 & L2 gas |

#### Returns

`bigint`

encoded data

#### Defined in

[src/utils/hash/transactionHash/v3.ts:33](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L33)

---

### encodeResourceBoundsL2

▸ **encodeResourceBoundsL2**(`bounds`): `bigint`

Encode the L2 bound of a V3 transaction

#### Parameters

| Name     | Type                                                 | Description                                                                                                  |
| :------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `bounds` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) | {l1_gas: {max_amount: u64, max_price_per_unit: u128}, l2_gas: {max_amount: u64, max_price_per_unit: u128}} } |

#### Returns

`bigint`

encoded data

#### Defined in

[src/utils/hash/transactionHash/v3.ts:49](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L49)

---

### encodeDataResourceBoundsL1

▸ **encodeDataResourceBoundsL1**(`bounds`): `bigint`

#### Parameters

| Name     | Type                                                 |
| :------- | :--------------------------------------------------- |
| `bounds` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:57](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L57)

---

### hashFeeFieldV3B3

▸ **hashFeeFieldV3B3**(`tip`, `bounds`): `bigint`

hash tip and resource bounds (3 bounds params) V3 RPC 0.8

#### Parameters

| Name     | Type                                                 |
| :------- | :--------------------------------------------------- |
| `tip`    | [`BigNumberish`](../modules.md#bignumberish)         |
| `bounds` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) |

#### Returns

`bigint`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:68](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L68)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `senderAddress`, `chainId`, `nonce`, `tip`, `paymasterData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `additionalData?`): `string`

#### Parameters

| Name                        | Type                                                                                                                                 | Default value |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `txHashPrefix`              | `"0x6465636c617265"` \| `"0x6465706c6f79"` \| `"0x6465706c6f795f6163636f756e74"` \| `"0x696e766f6b65"` \| `"0x6c315f68616e646c6572"` | `undefined`   |
| `version`                   | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `senderAddress`             | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`                                                                                   | `undefined`   |
| `nonce`                     | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `tip`                       | [`BigNumberish`](../modules.md#bignumberish)                                                                                         | `undefined`   |
| `paymasterData`             | [`BigNumberish`](../modules.md#bignumberish)[]                                                                                       | `undefined`   |
| `nonceDataAvailabilityMode` | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)                                                                                            | `undefined`   |
| `feeDataAvailabilityMode`   | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)                                                                                            | `undefined`   |
| `resourceBounds`            | [`ResourceBoundsBN`](../modules.md#resourceboundsbn)                                                                                 | `undefined`   |
| `additionalData`            | [`BigNumberish`](../modules.md#bignumberish)[]                                                                                       | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/v3.ts:75](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L75)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `compiledConstructorCalldata`, `salt`, `version`, `chainId`, `nonce`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 deploy_account transaction hash

#### Parameters

| Name                          | Type                                                 |
| :---------------------------- | :--------------------------------------------------- |
| `contractAddress`             | [`BigNumberish`](../modules.md#bignumberish)         |
| `classHash`                   | [`BigNumberish`](../modules.md#bignumberish)         |
| `compiledConstructorCalldata` | [`Calldata`](../modules.md#calldata)                 |
| `salt`                        | [`BigNumberish`](../modules.md#bignumberish)         |
| `version`                     | [`BigNumberish`](../modules.md#bignumberish)         |
| `chainId`                     | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`   |
| `nonce`                       | [`BigNumberish`](../modules.md#bignumberish)         |
| `nonceDataAvailabilityMode`   | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `feeDataAvailabilityMode`     | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `resourceBounds`              | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) |
| `tip`                         | [`BigNumberish`](../modules.md#bignumberish)         |
| `paymasterData`               | [`BigNumberish`](../modules.md#bignumberish)[]       |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:108](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L108)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `compiledClassHash`, `senderAddress`, `version`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 declare transaction hash

#### Parameters

| Name                        | Type                                                 |
| :-------------------------- | :--------------------------------------------------- |
| `classHash`                 | `string`                                             |
| `compiledClassHash`         | `string`                                             |
| `senderAddress`             | [`BigNumberish`](../modules.md#bignumberish)         |
| `version`                   | [`BigNumberish`](../modules.md#bignumberish)         |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`   |
| `nonce`                     | [`BigNumberish`](../modules.md#bignumberish)         |
| `accountDeploymentData`     | [`BigNumberish`](../modules.md#bignumberish)[]       |
| `nonceDataAvailabilityMode` | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `feeDataAvailabilityMode`   | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `resourceBounds`            | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) |
| `tip`                       | [`BigNumberish`](../modules.md#bignumberish)         |
| `paymasterData`             | [`BigNumberish`](../modules.md#bignumberish)[]       |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:141](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L141)

---

### calculateInvokeTransactionHash

▸ **calculateInvokeTransactionHash**(`senderAddress`, `version`, `compiledCalldata`, `chainId`, `nonce`, `accountDeploymentData`, `nonceDataAvailabilityMode`, `feeDataAvailabilityMode`, `resourceBounds`, `tip`, `paymasterData`): `string`

Calculate v3 invoke transaction hash

#### Parameters

| Name                        | Type                                                 |
| :-------------------------- | :--------------------------------------------------- |
| `senderAddress`             | [`BigNumberish`](../modules.md#bignumberish)         |
| `version`                   | [`BigNumberish`](../modules.md#bignumberish)         |
| `compiledCalldata`          | [`Calldata`](../modules.md#calldata)                 |
| `chainId`                   | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`   |
| `nonce`                     | [`BigNumberish`](../modules.md#bignumberish)         |
| `accountDeploymentData`     | [`BigNumberish`](../modules.md#bignumberish)[]       |
| `nonceDataAvailabilityMode` | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `feeDataAvailabilityMode`   | [`EDAMode`](RPC.RPCSPEC08.API.md#edamode)            |
| `resourceBounds`            | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) |
| `tip`                       | [`BigNumberish`](../modules.md#bignumberish)         |
| `paymasterData`             | [`BigNumberish`](../modules.md#bignumberish)[]       |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/hash/transactionHash/v3.ts:174](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/hash/transactionHash/v3.ts#L174)
