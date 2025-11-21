---
id: 'ReceiptTx'
title: 'Class: ReceiptTx'
sidebar_label: 'ReceiptTx'
sidebar_position: 0
custom_edit_url: null
---

**`Deprecated`**

Use `createTransactionReceipt` instead
Utility that analyses transaction receipt response and provides helpers to process it

**`Example`**

```typescript
const responseTx = new ReceiptTx(receipt);
responseTx.match({
  success: (txR: SuccessfulTransactionReceiptResponse) => { },
  reverted: (txR: RevertedTransactionReceiptResponse) => { },
  error: (err: Error) => { },
});
responseTx.match({
  success: (txR: SuccessfulTransactionReceiptResponse) => { },
  _: () => { },
}
```

## Constructors

### constructor

• **new ReceiptTx**(`receipt`): [`ReceiptTx`](ReceiptTx.md)

#### Parameters

| Name      | Type                                                                                            |
| :-------- | :---------------------------------------------------------------------------------------------- |
| `receipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info) |

#### Returns

[`ReceiptTx`](ReceiptTx.md)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:51](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L51)

## Properties

### statusReceipt

• `Readonly` **statusReceipt**: keyof [`TransactionStatusReceiptSets`](../modules.md#transactionstatusreceiptsets)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:47](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L47)

---

### value

• `Readonly` **value**: [`TransactionReceiptValue`](../modules.md#transactionreceiptvalue)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:49](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L49)

---

### match

• **match**: (`callbacks`: [`TransactionReceiptCallbacks`](../modules.md#transactionreceiptcallbacks)) => `void`

#### Type declaration

▸ (`callbacks`): `void`

##### Parameters

| Name        | Type                                                                       |
| :---------- | :------------------------------------------------------------------------- |
| `callbacks` | [`TransactionReceiptCallbacks`](../modules.md#transactionreceiptcallbacks) |

##### Returns

`void`

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:107](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L107)

---

### isSuccess

• **isSuccess**: () => this is SuccessfulTransactionReceiptResponseHelper

#### Type declaration

▸ (): this is SuccessfulTransactionReceiptResponseHelper

##### Returns

this is SuccessfulTransactionReceiptResponseHelper

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:109](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L109)

---

### isReverted

• **isReverted**: () => this is RevertedTransactionReceiptResponseHelper

#### Type declaration

▸ (): this is RevertedTransactionReceiptResponseHelper

##### Returns

this is RevertedTransactionReceiptResponseHelper

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:111](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L111)

---

### isError

• **isError**: () => this is ErrorReceiptResponseHelper

#### Type declaration

▸ (): this is ErrorReceiptResponseHelper

##### Returns

this is ErrorReceiptResponseHelper

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:113](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L113)

## Methods

### isSuccess

▸ **isSuccess**(`transactionReceipt`): transactionReceipt is SuccessfulTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                            |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info) |

#### Returns

transactionReceipt is SuccessfulTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:115](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L115)

---

### isReverted

▸ **isReverted**(`transactionReceipt`): transactionReceipt is RevertedTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                            |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info) |

#### Returns

transactionReceipt is RevertedTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:121](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transactionReceipt/transactionReceipt.ts#L121)
