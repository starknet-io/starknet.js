# Type Alias: SimulateTransactionResponseWithInitialReads

> **SimulateTransactionResponseWithInitialReads** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:28

The execution trace and consumed resources of the required transactions,
along with initial reads when RETURN_INITIAL_READS is present in simulation_flags.

## Properties

### simulated_transactions

> **simulated_transactions**: [`SimulateTransaction`](SimulateTransaction.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:29

---

### initial_reads

> **initial_reads**: [`INITIAL_READS`](INITIAL_READS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/nonspec.d.ts:34

The set of state values fetched from the underlying state reader during execution for all transactions in the simulation.
Required when RETURN_INITIAL_READS is present in simulation_flags.
