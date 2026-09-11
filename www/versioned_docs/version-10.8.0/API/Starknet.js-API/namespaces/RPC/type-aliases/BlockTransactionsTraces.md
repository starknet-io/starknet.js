# Type Alias: BlockTransactionsTraces

> **BlockTransactionsTraces** = [`BlockTransactionTrace`](BlockTransactionTrace.md)[] \| [`BlockTransactionsTracesWithInitialReads`](BlockTransactionsTracesWithInitialReads.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:59

The execution traces of all transactions included in the given block
When trace_flags includes RETURN_INITIAL_READS, returns BlockTransactionsTracesWithInitialReads
