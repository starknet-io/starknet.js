---
id: 'RPCResponseParser'
title: 'Class: RPCResponseParser'
sidebar_label: 'RPCResponseParser'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `Omit`<[`ResponseParser`](ResponseParser.md), `"parseDeclareContractResponse"` \| `"parseDeployContractResponse"` \| `"parseInvokeFunctionResponse"` \| `"parseGetTransactionReceiptResponse"` \| `"parseGetTransactionResponse"` \| `"parseCallContractResponse"`\>

## Constructors

### constructor

• **new RPCResponseParser**(`resourceBoundsOverhead?`): [`RPCResponseParser`](RPCResponseParser.md)

#### Parameters

| Name                      | Type                                                                        |
| :------------------------ | :-------------------------------------------------------------------------- |
| `resourceBoundsOverhead?` | `false` \| [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead) |

#### Returns

[`RPCResponseParser`](RPCResponseParser.md)

#### Defined in

[src/utils/responseParser/rpc.ts:40](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L40)

## Properties

### resourceBoundsOverhead

• `Private` **resourceBoundsOverhead**: `undefined` \| `false` \| [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead)

#### Defined in

[src/utils/responseParser/rpc.ts:38](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L38)

## Methods

### parseGetBlockResponse

▸ **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../modules.md#getblockresponse)

#### Parameters

| Name  | Type                                                   |
| :---- | :----------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../modules.md#blockwithtxhashes) |

#### Returns

[`GetBlockResponse`](../modules.md#getblockresponse)

#### Implementation of

Omit.parseGetBlockResponse

#### Defined in

[src/utils/responseParser/rpc.ts:44](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L44)

---

### parseTransactionReceipt

▸ **parseTransactionReceipt**(`res`): [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info)

#### Parameters

| Name  | Type                                                     |
| :---- | :------------------------------------------------------- |
| `res` | [`TransactionReceipt`](../modules.md#transactionreceipt) |

#### Returns

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info)

#### Defined in

[src/utils/responseParser/rpc.ts:48](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L48)

---

### parseFeeEstimateBulkResponse

▸ **parseFeeEstimateBulkResponse**(`res`): [`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)

#### Parameters

| Name  | Type                                                             |
| :---- | :--------------------------------------------------------------- |
| `res` | [`ApiEstimateFeeResponse`](../modules.md#apiestimatefeeresponse) |

#### Returns

[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)

#### Defined in

[src/utils/responseParser/rpc.ts:52](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L52)

---

### parseSimulateTransactionResponse

▸ **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)

#### Parameters

| Name  | Type                                                                       |
| :---- | :------------------------------------------------------------------------- |
| `res` | [`SimulateTransactionResponse`](../modules.md#simulatetransactionresponse) |

#### Returns

[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)

#### Implementation of

Omit.parseSimulateTransactionResponse

#### Defined in

[src/utils/responseParser/rpc.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L62)

---

### parseContractClassResponse

▸ **parseContractClassResponse**(`res`): [`ContractClassResponse`](../modules.md#contractclassresponse)

#### Parameters

| Name  | Type                                                         |
| :---- | :----------------------------------------------------------- |
| `res` | [`ContractClassPayload`](../modules.md#contractclasspayload) |

#### Returns

[`ContractClassResponse`](../modules.md#contractclassresponse)

#### Defined in

[src/utils/responseParser/rpc.ts:75](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L75)

---

### parseL1GasPriceResponse

▸ **parseL1GasPriceResponse**(`res`): `string`

#### Parameters

| Name  | Type                                                   |
| :---- | :----------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../modules.md#blockwithtxhashes) |

#### Returns

`string`

#### Defined in

[src/utils/responseParser/rpc.ts:82](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/responseParser/rpc.ts#L82)
