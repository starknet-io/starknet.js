---
id: 'types.CommonTransactionReceiptResponse'
title: 'Interface: CommonTransactionReceiptResponse'
sidebar_label: 'CommonTransactionReceiptResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).CommonTransactionReceiptResponse

## Hierarchy

- **`CommonTransactionReceiptResponse`**

  ↳ [`InvokeTransactionReceiptResponse`](types.InvokeTransactionReceiptResponse.md)

## Properties

### transaction_hash

• **transaction_hash**: `string`

#### Defined in

[src/types/provider/response.ts:75](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L75)

---

### status

• `Optional` **status**: `"NOT_RECEIVED"` \| `"RECEIVED"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

[src/types/provider/response.ts:76](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L76)

---

### actual_fee

• `Optional` **actual_fee**: `string`

#### Defined in

[src/types/provider/response.ts:77](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L77)

---

### status_data

• `Optional` **status_data**: `string`

#### Defined in

[src/types/provider/response.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L78)
