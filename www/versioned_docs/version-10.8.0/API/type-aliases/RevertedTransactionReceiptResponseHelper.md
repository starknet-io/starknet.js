# Type Alias: RevertedTransactionReceiptResponseHelper

> **RevertedTransactionReceiptResponseHelper** = [`RevertedTransactionReceiptResponse`](RevertedTransactionReceiptResponse.md) & `object`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L42)

## Type Declaration

### statusReceipt

> `readonly` **statusReceipt**: `"REVERTED"`

### value

> `readonly` **value**: [`RevertedTransactionReceiptResponse`](RevertedTransactionReceiptResponse.md)

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
