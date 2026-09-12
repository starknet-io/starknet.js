# Type Alias: waitForTransactionOptions

> **waitForTransactionOptions** = `object`

Defined in: [src/types/lib/index.ts:325](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L325)

## Properties

### lifeCycleRetries?

> `optional` **lifeCycleRetries?**: `number`

Defined in: [src/types/lib/index.ts:330](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L330)

Define the number of retries before throwing an error for the transaction life cycle when the transaction is not found after it had a valid status.
This is useful for nodes that are not fully synced yet when connecting to service that rotate nodes.

---

### retries?

> `optional` **retries?**: `number`

Defined in: [src/types/lib/index.ts:334](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L334)

Define the number of retries before throwing an error

---

### retryInterval?

> `optional` **retryInterval?**: `number`

Defined in: [src/types/lib/index.ts:338](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L338)

Define the time interval between retries in milliseconds

---

### successStates?

> `optional` **successStates?**: ([`TransactionFinalityStatus`](TransactionFinalityStatus.md) \| [`TransactionExecutionStatus`](TransactionExecutionStatus.md))[]

Defined in: [src/types/lib/index.ts:342](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L342)

Define which states are considered as successful

---

### errorStates?

> `optional` **errorStates?**: ([`TransactionFinalityStatus`](TransactionFinalityStatus.md) \| [`TransactionExecutionStatus`](TransactionExecutionStatus.md))[]

Defined in: [src/types/lib/index.ts:346](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L346)

Define which states are considered as errors
