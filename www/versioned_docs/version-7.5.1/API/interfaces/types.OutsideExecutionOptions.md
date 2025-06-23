---
id: 'types.OutsideExecutionOptions'
title: 'Interface: OutsideExecutionOptions'
sidebar_label: 'OutsideExecutionOptions'
custom_edit_url: null
---

[types](../namespaces/types.md).OutsideExecutionOptions

## Properties

### caller

• **caller**: `string`

authorized executer of the transaction(s): Hex address or "ANY_CALLER" or shortString.encodeShortString(constants.OutsideExecutionCallerAny)

#### Defined in

[src/types/outsideExecution.ts:6](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L6)

---

### execute_after

• **execute_after**: [`BigNumberish`](../namespaces/types.md#bignumberish)

Unix timestamp of the beginning of the timeframe

#### Defined in

[src/types/outsideExecution.ts:8](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L8)

---

### execute_before

• **execute_before**: [`BigNumberish`](../namespaces/types.md#bignumberish)

Unix timestamp of the end of the timeframe

#### Defined in

[src/types/outsideExecution.ts:10](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L10)
