# Type Alias: SimulateTransactionResponse

> **SimulateTransactionResponse** = [`SimulateTransaction`](SimulateTransaction.md)[] \| [`SimulateTransactionResponseWithInitialReads`](SimulateTransactionResponseWithInitialReads.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:14

Response for starknet_simulateTransactions.
When trace_flags includes RETURN_INITIAL_READS, the response includes initial_reads.
