# Type Alias: Invocation

> **Invocation** = [`CallDetails`](CallDetails.md) & `object`

Defined in: [src/types/lib/index.ts:179](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L179)

## Type Declaration

### signature?

> `optional` **signature?**: [`Signature`](Signature.md)

### proofFacts?

> `optional` **proofFacts?**: [`BigNumberish`](BigNumberish.md)[]

Proof facts to include in the transaction (RPC 0.10.1+)

### proof?

> `optional` **proof?**: `string`

Proof for the transaction (RPC 0.10.1+) - base64 encoded string
