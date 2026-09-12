# Type Alias: ErrorReceiptResponseHelper

> **ErrorReceiptResponseHelper** = `object`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:54](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L54)

## Properties

### statusReceipt

> `readonly` **statusReceipt**: `"ERROR"`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L55)

---

### value

> `readonly` **value**: `Error`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:56](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L56)

## Methods

### match()

> **match**(`callbacks`): `void`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L57)

#### Parameters

##### callbacks

[`TransactionReceiptCallbacks`](TransactionReceiptCallbacks.md)

#### Returns

`void`

---

### isSuccess()

> **isSuccess**(): `this is SuccessfulTransactionReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L59)

#### Returns

`this is SuccessfulTransactionReceiptResponseHelper`

---

### isReverted()

> **isReverted**(): `this is RevertedTransactionReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:61](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L61)

#### Returns

`this is RevertedTransactionReceiptResponseHelper`

---

### isError()

> **isError**(): `this is ErrorReceiptResponseHelper`

Defined in: [src/utils/transactionReceipt/transactionReceipt.type.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/transactionReceipt/transactionReceipt.type.ts#L63)

#### Returns

`this is ErrorReceiptResponseHelper`
