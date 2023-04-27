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

[src/types/api/sequencer.ts:152](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L152)

---

### entry_point_selector

• **entry_point_selector**: `string`

#### Defined in

[src/types/api/sequencer.ts:153](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L153)

---

### type

• **type**: `"INVOKE_FUNCTION"`

#### Inherited from

InvokeFunctionTransaction.type

#### Defined in

[src/types/api/sequencer.ts:123](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L123)

---

### contract_address

• **contract_address**: `string`

#### Inherited from

InvokeFunctionTransaction.contract_address

#### Defined in

[src/types/api/sequencer.ts:124](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L124)

---

### signature

• `Optional` **signature**: `string`[]

#### Inherited from

InvokeFunctionTransaction.signature

#### Defined in

[src/types/api/sequencer.ts:125](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L125)

---

### entry_point_type

• `Optional` **entry_point_type**: `"EXTERNAL"`

#### Inherited from

InvokeFunctionTransaction.entry_point_type

#### Defined in

[src/types/api/sequencer.ts:126](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L126)

---

### calldata

• `Optional` **calldata**: [`RawCalldata`](../modules.md#rawcalldata)

#### Inherited from

InvokeFunctionTransaction.calldata

#### Defined in

[src/types/api/sequencer.ts:127](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L127)

---

### nonce

• **nonce**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.nonce

#### Defined in

[src/types/api/sequencer.ts:128](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L128)

---

### max_fee

• `Optional` **max_fee**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.max_fee

#### Defined in

[src/types/api/sequencer.ts:129](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L129)

---

### version

• `Optional` **version**: [`BigNumberish`](../namespaces/num.md#bignumberish)

#### Inherited from

InvokeFunctionTransaction.version

#### Defined in

[src/types/api/sequencer.ts:130](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L130)
