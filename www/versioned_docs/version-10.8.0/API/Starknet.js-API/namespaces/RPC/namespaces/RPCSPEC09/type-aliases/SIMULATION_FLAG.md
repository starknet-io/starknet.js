# Type Alias: SIMULATION_FLAG

> **SIMULATION_FLAG** = _typeof_ [`SKIP_VALIDATE`](../variables/ESimulationFlag.md#skip_validate) \| _typeof_ [`SKIP_FEE_CHARGE`](../variables/ESimulationFlag.md#skip_fee_charge)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:75

Flags that indicate how to simulate a given transaction. By default, the sequencer behavior is replicated locally (enough funds are expected to be in the account, and the fee will be deducted from the balance before the simulation of the next transaction). To skip the fee charge, use the SKIP_FEE_CHARGE flag.
