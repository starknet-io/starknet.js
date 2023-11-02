---
id: 'types.InvokeTransactionReceiptResponse'
title: 'Interface: InvokeTransactionReceiptResponse'
sidebar_label: 'InvokeTransactionReceiptResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).InvokeTransactionReceiptResponse

## Hierarchy

- [`CommonTransactionReceiptResponse`](types.CommonTransactionReceiptResponse.md)

  ↳ **`InvokeTransactionReceiptResponse`**

## Properties

### messages_sent

• `Optional` **messages_sent**: [`MessageToL1`](types.MessageToL1.md)[]

**`Deprecated`**

Use l2_to_l1_messages

#### Defined in

[src/types/provider/response.ts:98](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L98)

---

### events

• `Optional` **events**: [`Event`](types.Event.md)[]

#### Defined in

[src/types/provider/response.ts:99](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L99)

---

### l1_origin_message

• `Optional` **l1_origin_message**: [`MessageToL2`](types.MessageToL2.md)

#### Defined in

[src/types/provider/response.ts:100](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L100)

---

### transaction_hash

• **transaction_hash**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](types.CommonTransactionReceiptResponse.md).[transaction_hash](types.CommonTransactionReceiptResponse.md#transaction_hash)

#### Defined in

[src/types/provider/response.ts:74](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L74)

---

### status

• `Optional` **status**: [`Status`](../namespaces/types.md#status)

#### Inherited from

[CommonTransactionReceiptResponse](types.CommonTransactionReceiptResponse.md).[status](types.CommonTransactionReceiptResponse.md#status)

#### Defined in

[src/types/provider/response.ts:75](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L75)

---

### actual_fee

• `Optional` **actual_fee**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](types.CommonTransactionReceiptResponse.md).[actual_fee](types.CommonTransactionReceiptResponse.md#actual_fee)

#### Defined in

[src/types/provider/response.ts:76](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L76)

---

### status_data

• `Optional` **status_data**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](types.CommonTransactionReceiptResponse.md).[status_data](types.CommonTransactionReceiptResponse.md#status_data)

#### Defined in

[src/types/provider/response.ts:77](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/provider/response.ts#L77)
