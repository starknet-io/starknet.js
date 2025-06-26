---
id: 'ReceiptTx'
title: 'Class: ReceiptTx'
sidebar_label: 'ReceiptTx'
sidebar_position: 0
custom_edit_url: null
---

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

## Implements

- [`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)

## Constructors

### constructor

• **new ReceiptTx**(`receipt`): [`ReceiptTx`](ReceiptTx.md)

#### Parameters

| Name      | Type                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------- |
| `receipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info) |

#### Returns

[`ReceiptTx`](ReceiptTx.md)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:37](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L37)

## Properties

### statusReceipt

• `Readonly` **statusReceipt**: keyof [`TransactionStatusReceiptSets`](../namespaces/types.md#transactionstatusreceiptsets)

#### Implementation of

GetTransactionReceiptResponse.statusReceipt

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L33)

---

### value

• `Readonly` **value**: [`TransactionReceiptValue`](../namespaces/types.md#transactionreceiptvalue)

#### Implementation of

GetTransactionReceiptResponse.value

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:35](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L35)

## Methods

### isSuccess

▸ **isSuccess**(`transactionReceipt`): transactionReceipt is SuccessfulTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info) |

#### Returns

transactionReceipt is SuccessfulTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:85](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L85)

---

### isReverted

▸ **isReverted**(`transactionReceipt`): transactionReceipt is RevertedTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info) |

#### Returns

transactionReceipt is RevertedTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:91](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L91)

---

### match

▸ **match**(`callbacks`): `void`

#### Parameters

| Name        | Type                                                                                |
| :---------- | :---------------------------------------------------------------------------------- |
| `callbacks` | [`TransactionReceiptCallbacks`](../namespaces/types.md#transactionreceiptcallbacks) |

#### Returns

`void`

#### Implementation of

GetTransactionReceiptResponse.match

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:59](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L59)

---

### isSuccess

▸ **isSuccess**(): this is GetTransactionReceiptResponse<"success"\>

#### Returns

this is GetTransactionReceiptResponse<"success"\>

#### Implementation of

GetTransactionReceiptResponse.isSuccess

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:66](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L66)

---

### isReverted

▸ **isReverted**(): this is GetTransactionReceiptResponse<"reverted"\>

#### Returns

this is GetTransactionReceiptResponse<"reverted"\>

#### Implementation of

GetTransactionReceiptResponse.isReverted

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L70)

---

### isError

▸ **isError**(): this is GetTransactionReceiptResponse<"error"\>

#### Returns

this is GetTransactionReceiptResponse<"error"\>

#### Implementation of

GetTransactionReceiptResponse.isError

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.ts:81](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/transactionReceipt/transactionReceipt.ts#L81)
