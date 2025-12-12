---
id: 'RPC.RPCSPEC010.API.TRANSACTION_EXECUTION_ERROR'
title: 'Interface: TRANSACTION_EXECUTION_ERROR'
sidebar_label: 'TRANSACTION_EXECUTION_ERROR'
custom_edit_url: null
---

[RPCSPEC010](../namespaces/RPC.RPCSPEC010.md).[API](../namespaces/RPC.RPCSPEC010.API.md).TRANSACTION_EXECUTION_ERROR

## Properties

### code

• **code**: `41`

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/api/errors.d.ts:65

---

### message

• **message**: `"Transaction execution error"`

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/api/errors.d.ts:66

---

### data

• **data**: `Object`

#### Type declaration

| Name                | Type                                                                                                   | Description                                                                                    |
| :------------------ | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `transaction_index` | `number`                                                                                               | The index of the first transaction failing in a sequence of given transactions **`Minimum`** 0 |
| `execution_error`   | [`CONTRACT_EXECUTION_ERROR_INNER`](../namespaces/RPC.RPCSPEC010.API.md#contract_execution_error_inner) | the execution trace up to the point of failure                                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-010/dist/types/api/errors.d.ts:67
