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

[src/types/api/sequencer.ts:142](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L142)

---

### entry_point_selector

• **entry_point_selector**: `string`

#### Defined in

[src/types/api/sequencer.ts:143](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L143)

---

### type

• **type**: `"INVOKE_FUNCTION"`

#### Inherited from

InvokeFunctionTransaction.type

#### Defined in

[src/types/api/sequencer.ts:113](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L113)

---

### sender_address

• **sender_address**: `string`

#### Inherited from

InvokeFunctionTransaction.sender_address

#### Defined in

[src/types/api/sequencer.ts:114](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L114)

---

### signature

• `Optional` **signature**: `string`[]

#### Inherited from

InvokeFunctionTransaction.signature

#### Defined in

[src/types/api/sequencer.ts:115](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L115)

---

### entry_point_type

• `Optional` **entry_point_type**: [`EXTERNAL`](../enums/types.EntryPointType.md#external)

#### Inherited from

InvokeFunctionTransaction.entry_point_type

#### Defined in

[src/types/api/sequencer.ts:116](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L116)

---

### calldata

• `Optional` **calldata**: [`RawCalldata`](../namespaces/types.md#rawcalldata)

#### Inherited from

InvokeFunctionTransaction.calldata

#### Defined in

[src/types/api/sequencer.ts:117](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L117)

---

### nonce

• **nonce**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.nonce

#### Defined in

[src/types/api/sequencer.ts:118](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L118)

---

### max_fee

• `Optional` **max_fee**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.max_fee

#### Defined in

[src/types/api/sequencer.ts:119](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L119)

---

### version

• `Optional` **version**: [`BigNumberish`](../namespaces/types.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.version

#### Defined in

[src/types/api/sequencer.ts:120](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/sequencer.ts#L120)
