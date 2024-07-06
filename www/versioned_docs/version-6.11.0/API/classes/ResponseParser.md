---
id: 'ResponseParser'
title: 'Class: ResponseParser'
sidebar_label: 'ResponseParser'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ResponseParser**(): [`ResponseParser`](ResponseParser.md)

#### Returns

[`ResponseParser`](ResponseParser.md)

## Methods

### parseGetBlockResponse

▸ **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../namespaces/types.md#getblockresponse)

#### Parameters

| Name  | Type                                                            |
| :---- | :-------------------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../namespaces/types.md#blockwithtxhashes) |

#### Returns

[`GetBlockResponse`](../namespaces/types.md#getblockresponse)

#### Defined in

[src/utils/responseParser/interface.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L16)

---

### parseGetTransactionResponse

▸ **parseGetTransactionResponse**(`res`): `TransactionWithHash`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

`TransactionWithHash`

#### Defined in

[src/utils/responseParser/interface.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L18)

---

### parseGetTransactionReceiptResponse

▸ **parseGetTransactionReceiptResponse**(`res`): [`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)

#### Defined in

[src/utils/responseParser/interface.ts:20](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L20)

---

### parseFeeEstimateResponse

▸ **parseFeeEstimateResponse**(`res`): [`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)

#### Parameters

| Name  | Type                                                                                                                                                                                                      |
| :---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `res` | \{ `unit`: `"WEI"` \| `"FRI"` ; `gas_consumed`: `string` ; `gas_price`: `string` ; `overall_fee`: `string` ; `data_gas_consumed`: `undefined` \| `string` ; `data_gas_price`: `undefined` \| `string` }[] |

#### Returns

[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)

#### Defined in

[src/utils/responseParser/interface.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L22)

---

### parseCallContractResponse

▸ **parseCallContractResponse**(`res`): [`CallContractResponse`](../namespaces/types.md#callcontractresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`CallContractResponse`](../namespaces/types.md#callcontractresponse)

#### Defined in

[src/utils/responseParser/interface.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L24)

---

### parseInvokeFunctionResponse

▸ **parseInvokeFunctionResponse**(`res`): `Object`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

`Object`

| Name               | Type     |
| :----------------- | :------- |
| `transaction_hash` | `string` |

#### Defined in

[src/utils/responseParser/interface.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L26)

---

### parseDeployContractResponse

▸ **parseDeployContractResponse**(`res`): [`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)

#### Defined in

[src/utils/responseParser/interface.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L28)

---

### parseDeclareContractResponse

▸ **parseDeclareContractResponse**(`res`): `Object`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

`Object`

| Name               | Type     |
| :----------------- | :------- |
| `class_hash`       | `string` |
| `transaction_hash` | `string` |

#### Defined in

[src/utils/responseParser/interface.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L30)

---

### parseSimulateTransactionResponse

▸ **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)

#### Defined in

[src/utils/responseParser/interface.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/responseParser/interface.ts#L32)
