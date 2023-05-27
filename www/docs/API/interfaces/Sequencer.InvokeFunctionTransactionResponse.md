---
id: 'Sequencer.InvokeFunctionTransactionResponse'
title: 'Interface: InvokeFunctionTransactionResponse'
sidebar_label: 'InvokeFunctionTransactionResponse'
custom_edit_url: null
---

[Sequencer](../namespaces/Sequencer.md).InvokeFunctionTransactionResponse

## Hierarchy

- [`InvokeFunctionTransaction`](../namespaces/Sequencer.md#invokefunctiontransaction)

  ↳ **`InvokeFunctionTransactionResponse`**

## Properties

### transaction_hash

• **transaction_hash**: `string`

#### Defined in

[src/types/api/sequencer.ts:141](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L141)

---

### entry_point_selector

• **entry_point_selector**: `string`

#### Defined in

[src/types/api/sequencer.ts:142](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L142)

---

### type

• **type**: `"INVOKE_FUNCTION"`

#### Inherited from

InvokeFunctionTransaction.type

#### Defined in

[src/types/api/sequencer.ts:112](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L112)

---

### sender_address

• **sender_address**: `string`

#### Inherited from

InvokeFunctionTransaction.sender_address

#### Defined in

[src/types/api/sequencer.ts:113](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L113)

---

### signature

• `Optional` **signature**: `string`[]

#### Inherited from

InvokeFunctionTransaction.signature

#### Defined in

[src/types/api/sequencer.ts:114](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L114)

---

### entry_point_type

• `Optional` **entry_point_type**: [`EXTERNAL`](../enums/EntryPointType.md#external)

#### Inherited from

InvokeFunctionTransaction.entry_point_type

#### Defined in

[src/types/api/sequencer.ts:115](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L115)

---

### calldata

• `Optional` **calldata**: [`RawCalldata`](../modules.md#rawcalldata)

#### Inherited from

InvokeFunctionTransaction.calldata

#### Defined in

[src/types/api/sequencer.ts:116](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L116)

---

### nonce

• **nonce**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.nonce

#### Defined in

[src/types/api/sequencer.ts:117](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L117)

---

### max_fee

• `Optional` **max_fee**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.max_fee

#### Defined in

[src/types/api/sequencer.ts:118](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L118)

---

### version

• `Optional` **version**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.version

#### Defined in

[src/types/api/sequencer.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L119)
