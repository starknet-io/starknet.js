# Type Alias: FastWaitForTransactionOptions

> **FastWaitForTransactionOptions** = `object`

Defined in: [src/plugins/fast-execute/types.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L7)

Options for controlling fastWaitForTransaction polling behavior

## Properties

### retries?

> `optional` **retries?**: `number`

Defined in: [src/plugins/fast-execute/types.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L9)

Number of retry attempts (default: 50)

---

### retryInterval?

> `optional` **retryInterval?**: `number`

Defined in: [src/plugins/fast-execute/types.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L11)

Milliseconds to wait between retries (default: 500)
