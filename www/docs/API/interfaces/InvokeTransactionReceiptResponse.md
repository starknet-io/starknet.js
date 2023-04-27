---
id: 'InvokeTransactionReceiptResponse'
title: 'Interface: InvokeTransactionReceiptResponse'
sidebar_label: 'InvokeTransactionReceiptResponse'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`CommonTransactionReceiptResponse`](CommonTransactionReceiptResponse.md)

  ↳ **`InvokeTransactionReceiptResponse`**

## Properties

### messages_sent

• `Optional` **messages_sent**: [`MessageToL1`](MessageToL1.md)[]

**`Deprecated`**

Use l2_to_l1_messages

#### Defined in

[src/types/provider.ts:98](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L98)

---

### events

• `Optional` **events**: [`Event`](Event.md)[]

#### Defined in

[src/types/provider.ts:99](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L99)

---

### l1_origin_message

• `Optional` **l1_origin_message**: [`MessageToL2`](MessageToL2.md)

#### Defined in

[src/types/provider.ts:100](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L100)

---

### transaction_hash

• **transaction_hash**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](CommonTransactionReceiptResponse.md).[transaction_hash](CommonTransactionReceiptResponse.md#transaction_hash)

#### Defined in

[src/types/provider.ts:74](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L74)

---

### status

• `Optional` **status**: [`Status`](../modules.md#status)

#### Inherited from

[CommonTransactionReceiptResponse](CommonTransactionReceiptResponse.md).[status](CommonTransactionReceiptResponse.md#status)

#### Defined in

[src/types/provider.ts:75](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L75)

---

### actual_fee

• `Optional` **actual_fee**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](CommonTransactionReceiptResponse.md).[actual_fee](CommonTransactionReceiptResponse.md#actual_fee)

#### Defined in

[src/types/provider.ts:76](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L76)

---

### status_data

• `Optional` **status_data**: `string`

#### Inherited from

[CommonTransactionReceiptResponse](CommonTransactionReceiptResponse.md).[status_data](CommonTransactionReceiptResponse.md#status_data)

#### Defined in

[src/types/provider.ts:77](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L77)
