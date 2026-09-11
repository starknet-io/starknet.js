# Type Alias: SimulateTransactionDetails

> **SimulateTransactionDetails** = `object` & `Partial`\<[`V3TransactionDetails`](V3TransactionDetails.md)\>

Defined in: [src/account/types/index.type.ts:103](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L103)

## Type Declaration

### nonce?

> `optional` **nonce?**: [`BigNumberish`](BigNumberish.md)

### blockIdentifier?

> `optional` **blockIdentifier?**: [`BlockIdentifier`](BlockIdentifier.md)

### skipValidate?

> `optional` **skipValidate?**: `boolean`

### skipExecute?

> `optional` **skipExecute?**: `boolean`

### returnInitialReads?

> `optional` **returnInitialReads?**: `boolean`

Include initial storage reads in the trace response (RPC 0.10.1+)
