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

• **new RPCResponseParser**(`margin?`): [`RPCResponseParser`](RPCResponseParser.md)

#### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `margin?` | [`FeeMarginPercentage`](../namespaces/types.md#feemarginpercentage) |

#### Returns

[`RPCResponseParser`](RPCResponseParser.md)

#### Defined in

[src/utils/responseParser/rpc.ts:38](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L38)

## Properties

### margin

• `Private` **margin**: `undefined` \| [`FeeMarginPercentage`](../namespaces/types.md#feemarginpercentage)

#### Defined in

[src/utils/responseParser/rpc.ts:36](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L36)

## Methods

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`): `bigint`

#### Parameters

| Name           | Type                                                  |
| :------------- | :---------------------------------------------------- |
| `estimatedFee` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`bigint`

#### Defined in

[src/utils/responseParser/rpc.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L42)

---

### estimateFeeToBounds

▸ **estimateFeeToBounds**(`estimate`): [`ResourceBounds`](../namespaces/types.md#resourcebounds)

#### Parameters

| Name       | Type                                                        |
| :--------- | :---------------------------------------------------------- |
| `estimate` | `0n` \| [`FeeEstimate`](../namespaces/types.md#feeestimate) |

#### Returns

[`ResourceBounds`](../namespaces/types.md#resourcebounds)

#### Defined in

[src/utils/responseParser/rpc.ts:46](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L46)

---

### parseGetBlockResponse

▸ **parseGetBlockResponse**(`res`): [`GetBlockResponse`](../namespaces/types.md#getblockresponse)

#### Parameters

| Name  | Type                                                            |
| :---- | :-------------------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../namespaces/types.md#blockwithtxhashes) |

#### Returns

[`GetBlockResponse`](../namespaces/types.md#getblockresponse)

#### Implementation of

Omit.parseGetBlockResponse

#### Defined in

[src/utils/responseParser/rpc.ts:50](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L50)

---

### parseTransactionReceipt

▸ **parseTransactionReceipt**(`res`): [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)

#### Parameters

| Name  | Type                                                              |
| :---- | :---------------------------------------------------------------- |
| `res` | [`TransactionReceipt`](../namespaces/types.md#transactionreceipt) |

#### Returns

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)

#### Defined in

[src/utils/responseParser/rpc.ts:54](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L54)

---

### parseFeeEstimateResponse

▸ **parseFeeEstimateResponse**(`res`): [`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)

#### Parameters

| Name  | Type                                                  |
| :---- | :---------------------------------------------------- |
| `res` | [`FeeEstimate`](../namespaces/types.md#feeestimate)[] |

#### Returns

[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)

#### Implementation of

Omit.parseFeeEstimateResponse

#### Defined in

[src/utils/responseParser/rpc.ts:58](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L58)

---

### parseFeeEstimateBulkResponse

▸ **parseFeeEstimateBulkResponse**(`res`): [`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)

#### Parameters

| Name  | Type                                                  |
| :---- | :---------------------------------------------------- |
| `res` | [`FeeEstimate`](../namespaces/types.md#feeestimate)[] |

#### Returns

[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)

#### Defined in

[src/utils/responseParser/rpc.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L77)

---

### parseSimulateTransactionResponse

▸ **parseSimulateTransactionResponse**(`res`): [`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `res` | `any` |

#### Returns

[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)

#### Implementation of

Omit.parseSimulateTransactionResponse

#### Defined in

[src/utils/responseParser/rpc.ts:95](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L95)

---

### parseContractClassResponse

▸ **parseContractClassResponse**(`res`): [`ContractClassResponse`](../namespaces/types.md#contractclassresponse)

#### Parameters

| Name  | Type                                                                  |
| :---- | :-------------------------------------------------------------------- |
| `res` | [`ContractClassPayload`](../namespaces/types.md#contractclasspayload) |

#### Returns

[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)

#### Defined in

[src/utils/responseParser/rpc.ts:112](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L112)

---

### parseL1GasPriceResponse

▸ **parseL1GasPriceResponse**(`res`): `string`

#### Parameters

| Name  | Type                                                            |
| :---- | :-------------------------------------------------------------- |
| `res` | [`BlockWithTxHashes`](../namespaces/types.md#blockwithtxhashes) |

#### Returns

`string`

#### Defined in

[src/utils/responseParser/rpc.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/responseParser/rpc.ts#L119)
