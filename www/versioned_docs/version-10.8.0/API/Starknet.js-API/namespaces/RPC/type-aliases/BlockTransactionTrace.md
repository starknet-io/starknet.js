# Type Alias: BlockTransactionTrace

> **BlockTransactionTrace** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:65

The traces of transaction in the block.
This format is returned when RETURN_INITIAL_READS is not present in trace_flags (or trace_flags is not provided),
maintaining compatibility with JSON-RPC 0.10.0.

## Properties

### transaction_hash

> **transaction_hash**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:66

---

### trace_root

> **trace_root**: [`TRANSACTION_TRACE`](TRANSACTION_TRACE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:67
