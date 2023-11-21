---
id: 'types.Sequencer.InvokeFunctionTransactionResponse'
title: 'Interface: InvokeFunctionTransactionResponse'
sidebar_label: 'InvokeFunctionTransactionResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).[Sequencer](../namespaces/types.Sequencer.md).InvokeFunctionTransactionResponse

## Hierarchy

- [`InvokeFunctionTransaction`](../namespaces/types.Sequencer.md#invokefunctiontransaction)

  ↳ **`InvokeFunctionTransactionResponse`**

## Properties

### transaction_hash

• **transaction_hash**: `string`

#### Defined in

[src/types/api/sequencer.ts:149](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L149)

---

### entry_point_selector

• **entry_point_selector**: `string`

#### Defined in

[src/types/api/sequencer.ts:150](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L150)

---

### type

• **type**: [`INVOKE`](../enums/types.TransactionType.md#invoke)

#### Inherited from

InvokeFunctionTransaction.type

#### Defined in

[src/types/api/sequencer.ts:120](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L120)

---

### sender_address

• **sender_address**: `string`

#### Inherited from

InvokeFunctionTransaction.sender_address

#### Defined in

[src/types/api/sequencer.ts:121](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L121)

---

### signature

• `Optional` **signature**: `string`[]

#### Inherited from

InvokeFunctionTransaction.signature

#### Defined in

[src/types/api/sequencer.ts:122](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L122)

---

### entry_point_type

• `Optional` **entry_point_type**: [`EXTERNAL`](../enums/types.EntryPointType.md#external)

#### Inherited from

InvokeFunctionTransaction.entry_point_type

#### Defined in

[src/types/api/sequencer.ts:123](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L123)

---

### calldata

• `Optional` **calldata**: [`RawCalldata`](../namespaces/types.md#rawcalldata)

#### Inherited from

InvokeFunctionTransaction.calldata

#### Defined in

[src/types/api/sequencer.ts:124](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L124)

---

### nonce

• **nonce**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.nonce

#### Defined in

[src/types/api/sequencer.ts:125](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L125)

---

### max_fee

• `Optional` **max_fee**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.max_fee

#### Defined in

[src/types/api/sequencer.ts:126](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L126)

---

### version

• `Optional` **version**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.version

#### Defined in

[src/types/api/sequencer.ts:127](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/types/api/sequencer.ts#L127)
