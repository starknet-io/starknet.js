# Type Alias: SIMULATION_FLAG

> **SIMULATION_FLAG** = _typeof_ [`SKIP_VALIDATE`](../variables/ESimulationFlag.md#skip_validate) \| _typeof_ [`SKIP_FEE_CHARGE`](../variables/ESimulationFlag.md#skip_fee_charge) \| _typeof_ [`RETURN_INITIAL_READS`](../variables/ESimulationFlag.md#return_initial_reads)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/components.d.ts:105

Flags that indicate how to simulate a given transaction.
By default, the sequencer behavior is replicated locally (enough funds are expected to be in the account,
and fee will be deducted from the balance before the simulation of the next transaction).
To skip the fee charge, use the SKIP_FEE_CHARGE flag.
When RETURN_INITIAL_READS is present, the node returns the minimal set of concrete state values fetched from
the underlying state reader during execution for all transactions in the simulation.
