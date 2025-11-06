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

▸ **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../modules.md#getblockresponse)

#### Parameters

| Name  | Type                                                   |
| :---- | :----------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../modules.md#blockwithtxhashes) |

#### Returns

[`GetBlockResponse`](../modules.md#getblockresponse)

#### Defined in

[src/utils/responseParser/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L14)

---

### parseGetTransactionResponse

▸ **parseGetTransactionResponse**(`res`): [`TransactionWithHash`](../modules.md#transactionwithhash)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`TransactionWithHash`](../modules.md#transactionwithhash)

#### Defined in

[src/utils/responseParser/interface.ts:16](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L16)

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

[src/utils/responseParser/interface.ts:18](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L18)

---

### parseCallContractResponse

▸ **parseCallContractResponse**(`res`): [`CallContractResponse`](../modules.md#callcontractresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`CallContractResponse`](../modules.md#callcontractresponse)

#### Defined in

[src/utils/responseParser/interface.ts:20](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L20)

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

[src/utils/responseParser/interface.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L22)

---

### parseDeployContractResponse

▸ **parseDeployContractResponse**(`res`): [`DeployContractResponse`](../interfaces/DeployContractResponse.md)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`DeployContractResponse`](../interfaces/DeployContractResponse.md)

#### Defined in

[src/utils/responseParser/interface.ts:24](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L24)

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

[src/utils/responseParser/interface.ts:26](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L26)

---

### parseSimulateTransactionResponse

▸ **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)

#### Defined in

[src/utils/responseParser/interface.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/interface.ts#L28)
