# Type Alias: BlockTransactionsTracesWithInitialReads

> **BlockTransactionsTracesWithInitialReads** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:72

The traces of all transactions in the block, along with initial reads when RETURN_INITIAL_READS is present in trace_flags.

## Properties

### traces

> **traces**: [`BlockTransactionTrace`](BlockTransactionTrace.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:73

---

### initial_reads

> **initial_reads**: [`INITIAL_READS`](INITIAL_READS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:80

The set of state values fetched from the underlying state reader during execution for all transactions in the block.
Required when RETURN_INITIAL_READS is present in trace_flags.
Returns an empty object instead of INITIAL_READS when the execution trace for the referenced block is inconsistent
with the canonical block trace.
