---
id: 'types.InvokeTransactionReceiptResponse'
title: 'Interface: InvokeTransactionReceiptResponse'
sidebar_label: 'InvokeTransactionReceiptResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).InvokeTransactionReceiptResponse

## Properties

### type

• `Optional` **type**: [`TransactionType`](../enums/types.TransactionType.md)

#### Defined in

[src/types/provider/response.ts:112](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L112)

---

### execution_status

• **execution_status**: [`TransactionExecutionStatus`](../enums/types.TransactionExecutionStatus.md)

#### Defined in

[src/types/provider/response.ts:113](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L113)

---

### finality_status

• **finality_status**: [`TransactionFinalityStatus`](../enums/types.TransactionFinalityStatus.md)

#### Defined in

[src/types/provider/response.ts:114](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L114)

---

### status

• `Optional` **status**: `"NOT_RECEIVED"` \| `"RECEIVED"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"` \| `"REVERTED"`

#### Defined in

[src/types/provider/response.ts:115](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L115)

---

### actual_fee

• **actual_fee**: `string`

#### Defined in

[src/types/provider/response.ts:116](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L116)

---

### block_hash

• **block_hash**: `string`

#### Defined in

[src/types/provider/response.ts:117](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L117)

---

### block_number

• **block_number**: [`BlockNumber`](../namespaces/types.md#blocknumber)

#### Defined in

[src/types/provider/response.ts:118](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L118)

---

### transaction_hash

• **transaction_hash**: `string`

#### Defined in

[src/types/provider/response.ts:119](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L119)

---

### transaction_index

• `Optional` **transaction_index**: `number`

#### Defined in

[src/types/provider/response.ts:120](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L120)

---

### messages_sent

• **messages_sent**: [`MessageToL1`](types.MessageToL1.md)[]

#### Defined in

[src/types/provider/response.ts:121](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L121)

---

### events

• **events**: `any`[]

#### Defined in

[src/types/provider/response.ts:122](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L122)

---

### execution_resources

• `Optional` **execution_resources**: `any`

#### Defined in

[src/types/provider/response.ts:123](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/provider/response.ts#L123)
