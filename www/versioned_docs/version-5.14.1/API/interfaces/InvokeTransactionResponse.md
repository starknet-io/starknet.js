---
id: 'InvokeTransactionResponse'
title: 'Interface: InvokeTransactionResponse'
sidebar_label: 'InvokeTransactionResponse'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`CommonTransactionResponse`](CommonTransactionResponse.md)

  ↳ **`InvokeTransactionResponse`**

## Properties

### contract_address

• `Optional` **contract_address**: `string`

#### Defined in

[src/types/provider.ts:51](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L51)

---

### sender_address

• `Optional` **sender_address**: `string`

#### Defined in

[src/types/provider.ts:52](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L52)

---

### entry_point_selector

• `Optional` **entry_point_selector**: `string`

#### Defined in

[src/types/provider.ts:53](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L53)

---

### calldata

• **calldata**: [`RawCalldata`](../modules.md#rawcalldata)

#### Defined in

[src/types/provider.ts:54](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L54)

---

### transaction_hash

• `Optional` **transaction_hash**: `string`

#### Inherited from

[CommonTransactionResponse](CommonTransactionResponse.md).[transaction_hash](CommonTransactionResponse.md#transaction_hash)

#### Defined in

[src/types/provider.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L43)

---

### version

• `Optional` **version**: `string`

#### Inherited from

[CommonTransactionResponse](CommonTransactionResponse.md).[version](CommonTransactionResponse.md#version)

#### Defined in

[src/types/provider.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L44)

---

### signature

• `Optional` **signature**: [`Signature`](../modules.md#signature)

#### Inherited from

[CommonTransactionResponse](CommonTransactionResponse.md).[signature](CommonTransactionResponse.md#signature)

#### Defined in

[src/types/provider.ts:45](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L45)

---

### max_fee

• `Optional` **max_fee**: `string`

#### Inherited from

[CommonTransactionResponse](CommonTransactionResponse.md).[max_fee](CommonTransactionResponse.md#max_fee)

#### Defined in

[src/types/provider.ts:46](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L46)

---

### nonce

• `Optional` **nonce**: `string`

#### Inherited from

[CommonTransactionResponse](CommonTransactionResponse.md).[nonce](CommonTransactionResponse.md#nonce)

#### Defined in

[src/types/provider.ts:47](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L47)
