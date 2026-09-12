# Interface: OutsideExecutionOptions

Defined in: [src/types/outsideExecution.ts:4](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/outsideExecution.ts#L4)

## Properties

### caller

> **caller**: `string`

Defined in: [src/types/outsideExecution.ts:6](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/outsideExecution.ts#L6)

authorized executer of the transaction(s): Hex address or "ANY_CALLER" or shortString.encodeShortString(constants.OutsideExecutionCallerAny)

---

### execute_after

> **execute_after**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/types/outsideExecution.ts:8](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/outsideExecution.ts#L8)

Unix timestamp of the beginning of the timeframe

---

### execute_before

> **execute_before**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/types/outsideExecution.ts:10](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/outsideExecution.ts#L10)

Unix timestamp of the end of the timeframe
