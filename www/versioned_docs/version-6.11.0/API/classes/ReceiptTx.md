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
  rejected: (txR: RejectedTransactionReceiptResponse) => { },
  reverted: (txR: RevertedTransactionReceiptResponse) => { },
  error: (err: Error) => { },
});
responseTx.match({
  success: (txR: SuccessfulTransactionReceiptResponse) => { },
  _: () => { },
}
```

## Implements

- [`TransactionReceiptUtilityInterface`](../namespaces/types.md#transactionreceiptutilityinterface)

## Constructors

### constructor

• **new ReceiptTx**(`receipt`): [`ReceiptTx`](ReceiptTx.md)

#### Parameters

| Name      | Type                                                                                            |
| :-------- | :---------------------------------------------------------------------------------------------- |
| `receipt` | [`GetTxReceiptResponseWithoutHelper`](../namespaces/types.md#gettxreceiptresponsewithouthelper) |

#### Returns

[`ReceiptTx`](ReceiptTx.md)

#### Defined in

[src/utils/transactionReceipt.ts:39](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L39)

## Properties

### statusReceipt

• `Readonly` **statusReceipt**: keyof [`TransactionStatusReceiptSets`](../namespaces/types.md#transactionstatusreceiptsets)

#### Implementation of

TransactionReceiptUtilityInterface.statusReceipt

#### Defined in

[src/utils/transactionReceipt.ts:35](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L35)

---

### value

• `Readonly` **value**: [`TransactionReceiptValue`](../namespaces/types.md#transactionreceiptvalue)

#### Implementation of

TransactionReceiptUtilityInterface.value

#### Defined in

[src/utils/transactionReceipt.ts:37](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L37)

## Methods

### isSuccess

▸ **isSuccess**(`transactionReceipt`): transactionReceipt is SuccessfulTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                            |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`GetTxReceiptResponseWithoutHelper`](../namespaces/types.md#gettxreceiptresponsewithouthelper) |

#### Returns

transactionReceipt is SuccessfulTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt.ts:86](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L86)

---

### isReverted

▸ **isReverted**(`transactionReceipt`): transactionReceipt is RevertedTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                            |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`GetTxReceiptResponseWithoutHelper`](../namespaces/types.md#gettxreceiptresponsewithouthelper) |

#### Returns

transactionReceipt is RevertedTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt.ts:95](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L95)

---

### isRejected

▸ **isRejected**(`transactionReceipt`): transactionReceipt is RejectedTransactionReceiptResponse

#### Parameters

| Name                 | Type                                                                                            |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `transactionReceipt` | [`GetTxReceiptResponseWithoutHelper`](../namespaces/types.md#gettxreceiptresponsewithouthelper) |

#### Returns

transactionReceipt is RejectedTransactionReceiptResponse

#### Defined in

[src/utils/transactionReceipt.ts:104](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L104)

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

TransactionReceiptUtilityInterface.match

#### Defined in

[src/utils/transactionReceipt.ts:63](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L63)

---

### isSuccess

▸ **isSuccess**(): this is SuccessfulTransactionReceiptResponse

#### Returns

this is SuccessfulTransactionReceiptResponse

#### Implementation of

TransactionReceiptUtilityInterface.isSuccess

#### Defined in

[src/utils/transactionReceipt.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L70)

---

### isReverted

▸ **isReverted**(): this is RevertedTransactionReceiptResponse

#### Returns

this is RevertedTransactionReceiptResponse

#### Implementation of

TransactionReceiptUtilityInterface.isReverted

#### Defined in

[src/utils/transactionReceipt.ts:74](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L74)

---

### isRejected

▸ **isRejected**(): this is RejectedTransactionReceiptResponse

#### Returns

this is RejectedTransactionReceiptResponse

#### Implementation of

TransactionReceiptUtilityInterface.isRejected

#### Defined in

[src/utils/transactionReceipt.ts:78](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L78)

---

### isError

▸ **isError**(): `boolean`

#### Returns

`boolean`

#### Implementation of

TransactionReceiptUtilityInterface.isError

#### Defined in

[src/utils/transactionReceipt.ts:82](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transactionReceipt.ts#L82)
