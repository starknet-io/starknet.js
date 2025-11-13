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

| Name            | Type                                                                                                                             | Description         |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| `originalCalls` | [`Call`](../modules.md#call)[]                                                                                                   | The original calls. |
| `unsafeCalls`   | ([`OutsideCallV1`](RPC.RPCSPEC09.WALLET_API.md#outsidecallv1) \| [`OutsideCallV2`](RPC.RPCSPEC09.WALLET_API.md#outsidecallv2))[] | The unsafe calls.   |

#### Returns

`void`

**`Throws`**

Throws an error if the calls are not strictly equal.

#### Defined in

[src/utils/paymaster.ts:67](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/paymaster.ts#L67)

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

[src/utils/paymaster.ts:17](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/paymaster.ts#L17)

---

### assertPaymasterTransactionSafety

▸ **assertPaymasterTransactionSafety**(`preparedTransaction`, `calls`, `paymasterDetails`, `maxFeeInGasToken?`): `void`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `preparedTransaction` | [`PreparedTransaction`](../modules.md#preparedtransaction) |
| `calls`               | [`Call`](../modules.md#call)[]                             |
| `paymasterDetails`    | [`PaymasterDetails`](../interfaces/PaymasterDetails.md)    |
| `maxFeeInGasToken?`   | [`BigNumberish`](../modules.md#bignumberish)               |

#### Returns

`void`

#### Defined in

[src/utils/paymaster.ts:133](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/paymaster.ts#L133)
