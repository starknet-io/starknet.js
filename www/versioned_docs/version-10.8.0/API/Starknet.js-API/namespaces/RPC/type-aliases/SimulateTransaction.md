# Type Alias: SimulateTransaction

> **SimulateTransaction** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:20

The execution trace and consumed resources of the required transactions.
This format is returned when RETURN_INITIAL_READS is not present in simulation_flags,
maintaining compatibility with JSON-RPC 0.10.0.

## Properties

### transaction_trace

> **transaction_trace**: [`TRANSACTION_TRACE`](TRANSACTION_TRACE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:21

---

### fee_estimation

> **fee_estimation**: [`FEE_ESTIMATE`](FEE_ESTIMATE.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:22
