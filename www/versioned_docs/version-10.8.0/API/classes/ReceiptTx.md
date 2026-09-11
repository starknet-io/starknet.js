# ~~Class: ReceiptTx~~

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:46](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L46)

## Deprecated

Use `createTransactionReceipt` instead
Utility that analyses transaction receipt response and provides helpers to process it

## Example

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

### Constructor

> **new ReceiptTx**(`receipt`): `ReceiptTx`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:51](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L51)

#### Parameters

##### receipt

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)

#### Returns

`ReceiptTx`

## Properties

### ~~statusReceipt~~

> `readonly` **statusReceipt**: keyof [`TransactionStatusReceiptSets`](../type-aliases/TransactionStatusReceiptSets.md)

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L47)

---

### ~~value~~

> `readonly` **value**: [`TransactionReceiptValue`](../type-aliases/TransactionReceiptValue.md)

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L49)

---

### ~~match~~

> **match**: (`callbacks`) => `void`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:107](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L107)

#### Parameters

##### callbacks

[`TransactionReceiptCallbacks`](../type-aliases/TransactionReceiptCallbacks.md)

#### Returns

`void`

---

### ~~isSuccess~~

> **isSuccess**: () => `this is SuccessfulTransactionReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:109](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L109)

#### Returns

`this is SuccessfulTransactionReceiptResponseHelper`

---

### ~~isReverted~~

> **isReverted**: () => `this is RevertedTransactionReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:111](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L111)

#### Returns

`this is RevertedTransactionReceiptResponseHelper`

---

### ~~isError~~

> **isError**: () => `this is ErrorReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:113](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L113)

#### Returns

`this is ErrorReceiptResponseHelper`

## Methods

### ~~isSuccess()~~

> `static` **isSuccess**(`transactionReceipt`): `transactionReceipt is SuccessfulTransactionReceiptResponse`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:115](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L115)

#### Parameters

##### transactionReceipt

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)

#### Returns

`transactionReceipt is SuccessfulTransactionReceiptResponse`

---

### ~~isReverted()~~

> `static` **isReverted**(`transactionReceipt`): `transactionReceipt is RevertedTransactionReceiptResponse`

Defined in: [src/utils/transactionReceipt/transactionReceipt.ts:121](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.ts#L121)

#### Parameters

##### transactionReceipt

[`TXN_RECEIPT_WITH_BLOCK_INFO`](../Starknet.js-API/namespaces/RPC/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)

#### Returns

`transactionReceipt is RevertedTransactionReceiptResponse`
