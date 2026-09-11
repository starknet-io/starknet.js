# Interface: RpcTypeToMessageMap

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/methods.d.ts:5

## Properties

### starknet_specVersion

> **starknet_specVersion**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/methods.d.ts:6

#### params?

> `optional` **params?**: `undefined`

#### result

> **result**: `string`

---

### starknet_proveTransaction

> **starknet_proveTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/methods.d.ts:10

#### params

> **params**: `object`

##### params.block_id

> **block_id**: [`BLOCK_ID`](../../../type-aliases/BLOCK_ID.md)

##### params.transaction

> **transaction**: [`BROADCASTED_INVOKE_TXN`](../../../type-aliases/BROADCASTED_INVOKE_TXN.md)

#### result

> **result**: [`PROVE_TRANSACTION_RESULT`](../type-aliases/PROVE_TRANSACTION_RESULT.md)

#### errors

> **errors**: [`BLOCK_NOT_FOUND`](../../../interfaces/BLOCK_NOT_FOUND.md) \| [`ACCOUNT_VALIDATION_FAILED`](ACCOUNT_VALIDATION_FAILED.md) \| [`SERVICE_BUSY`](SERVICE_BUSY.md) \| [`INVALID_TRANSACTION_INPUT`](INVALID_TRANSACTION_INPUT.md) \| [`UNSUPPORTED_TX_TYPE`](UNSUPPORTED_TX_TYPE.md) \| [`TRANSACTION_BLOCKED`](TRANSACTION_BLOCKED.md)
