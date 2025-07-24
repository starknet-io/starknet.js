---
id: 'paymaster'
title: 'Namespace: paymaster'
sidebar_label: 'paymaster'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### assertCallsAreStrictlyEqual

▸ **assertCallsAreStrictlyEqual**(`originalCalls`, `unsafeCalls`): `void`

Asserts that the given calls are strictly equal, otherwise throws an error.

#### Parameters

| Name            | Type                                                                                                                                         | Description         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `originalCalls` | [`Call`](types.md#call)[]                                                                                                                    | The original calls. |
| `unsafeCalls`   | ([`OutsideCallV1`](types.RPC.RPCSPEC08.WALLET_API.md#outsidecallv1) \| [`OutsideCallV2`](types.RPC.RPCSPEC08.WALLET_API.md#outsidecallv2))[] | The unsafe calls.   |

#### Returns

`void`

**`Throws`**

Throws an error if the calls are not strictly equal.

#### Defined in

[src/utils/paymaster.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/paymaster.ts#L67)

---

### getDefaultPaymasterNodeUrl

▸ **getDefaultPaymasterNodeUrl**(`networkName?`, `mute?`): `string`

Return randomly select available public paymaster node url

#### Parameters

| Name           | Type                          | Default value | Description              |
| :------------- | :---------------------------- | :------------ | :----------------------- |
| `networkName?` | `"SN_MAIN"` \| `"SN_SEPOLIA"` | `undefined`   | NetworkName              |
| `mute`         | `boolean`                     | `false`       | mute public node warning |

#### Returns

`string`

default node url

#### Defined in

[src/utils/paymaster.ts:17](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/paymaster.ts#L17)

---

### assertPaymasterTransactionSafety

▸ **assertPaymasterTransactionSafety**(`preparedTransaction`, `calls`, `paymasterDetails`, `maxFeeInGasToken?`): `void`

#### Parameters

| Name                  | Type                                                          |
| :-------------------- | :------------------------------------------------------------ |
| `preparedTransaction` | [`PreparedTransaction`](types.md#preparedtransaction)         |
| `calls`               | [`Call`](types.md#call)[]                                     |
| `paymasterDetails`    | [`PaymasterDetails`](../interfaces/types.PaymasterDetails.md) |
| `maxFeeInGasToken?`   | [`BigNumberish`](types.md#bignumberish)                       |

#### Returns

`void`

#### Defined in

[src/utils/paymaster.ts:133](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/paymaster.ts#L133)
