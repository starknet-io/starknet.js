# Type Alias: SuccessfulTransactionReceiptResponseHelper

> **SuccessfulTransactionReceiptResponseHelper** = [`SuccessfulTransactionReceiptResponse`](SuccessfulTransactionReceiptResponse.md) & `object`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:30](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L30)

## Type Declaration

### statusReceipt

> `readonly` **statusReceipt**: `"SUCCEEDED"`

### value

> `readonly` **value**: [`SuccessfulTransactionReceiptResponse`](SuccessfulTransactionReceiptResponse.md)

### match()

> **match**(`callbacks`): `void`

#### Parameters

##### callbacks

[`TransactionReceiptCallbacks`](TransactionReceiptCallbacks.md)

#### Returns

`void`

### isSuccess()

> **isSuccess**(): `this is SuccessfulTransactionReceiptResponseHelper`

#### Returns

`this is SuccessfulTransactionReceiptResponseHelper`

### isReverted()

> **isReverted**(): `this is RevertedTransactionReceiptResponseHelper`

#### Returns

`this is RevertedTransactionReceiptResponseHelper`

### isError()

> **isError**(): `this is ErrorReceiptResponseHelper`

#### Returns

`this is ErrorReceiptResponseHelper`
