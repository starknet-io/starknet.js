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

[src/types/provider/response.ts:66](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L66)

---

### sender_address

• `Optional` **sender_address**: `string`

#### Defined in

[src/types/provider/response.ts:67](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L67)

---

### entry_point_selector

• `Optional` **entry_point_selector**: `string`

#### Defined in

[src/types/provider/response.ts:68](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L68)

---

### calldata

• **calldata**: [`RawCalldata`](../namespaces/types.md#rawcalldata)

#### Defined in

[src/types/provider/response.ts:69](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L69)

---

### transaction_hash

• `Optional` **transaction_hash**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[transaction_hash](types.CommonTransactionResponse.md#transaction_hash)

#### Defined in

[src/types/provider/response.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L58)

---

### version

• `Optional` **version**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[version](types.CommonTransactionResponse.md#version)

#### Defined in

[src/types/provider/response.ts:59](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L59)

---

### signature

• `Optional` **signature**: [`Signature`](../namespaces/types.md#signature)

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[signature](types.CommonTransactionResponse.md#signature)

#### Defined in

[src/types/provider/response.ts:60](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L60)

---

### max_fee

• `Optional` **max_fee**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[max_fee](types.CommonTransactionResponse.md#max_fee)

#### Defined in

[src/types/provider/response.ts:61](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L61)

---

### nonce

• `Optional` **nonce**: `string`

#### Inherited from

[CommonTransactionResponse](types.CommonTransactionResponse.md).[nonce](types.CommonTransactionResponse.md#nonce)

#### Defined in

[src/types/provider/response.ts:62](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/provider/response.ts#L62)
