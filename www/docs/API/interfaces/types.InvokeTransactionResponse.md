---
id: 'types.InvokeTransactionResponse'
title: 'Interface: InvokeTransactionResponse'
sidebar_label: 'InvokeTransactionResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).InvokeTransactionResponse

## Hierarchy

- [`CommonTransactionResponse`](types.CommonTransactionResponse.md)

  ↳ **`InvokeTransactionResponse`**

## Properties

### contract_address

• `Optional` **contract_address**: `string`

#### Defined in

[src/types/provider/response.ts:51](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L51)

---

### sender_address

• `Optional` **sender_address**: `string`

#### Defined in

[src/types/provider/response.ts:52](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L52)

---

### entry_point_selector

• `Optional` **entry_point_selector**: `string`

#### Defined in

[src/types/provider/response.ts:53](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L53)

---

### calldata

• **calldata**: [`RawCalldata`](../namespaces/types.md#rawcalldata)

#### Defined in

[src/types/provider/response.ts:54](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L54)

---

### transaction_hash

• `Optional` **transaction_hash**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[transaction_hash](types.CommonTransactionResponse.md#transaction_hash)

#### Defined in

[src/types/provider/response.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L43)

---

### version

• `Optional` **version**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[version](types.CommonTransactionResponse.md#version)

#### Defined in

[src/types/provider/response.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L44)

---

### signature

• `Optional` **signature**: [`Signature`](../namespaces/types.md#signature)

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[signature](types.CommonTransactionResponse.md#signature)

#### Defined in

[src/types/provider/response.ts:45](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L45)

---

### max_fee

• `Optional` **max_fee**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[max_fee](types.CommonTransactionResponse.md#max_fee)

#### Defined in

[src/types/provider/response.ts:46](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L46)

---

### nonce

• `Optional` **nonce**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[nonce](types.CommonTransactionResponse.md#nonce)

#### Defined in

[src/types/provider/response.ts:47](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L47)
