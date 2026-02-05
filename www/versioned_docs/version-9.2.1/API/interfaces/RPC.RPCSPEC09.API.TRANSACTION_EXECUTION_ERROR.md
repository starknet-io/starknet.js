---
id: 'RPC.RPCSPEC09.API.TRANSACTION_EXECUTION_ERROR'
title: 'Interface: TRANSACTION_EXECUTION_ERROR'
sidebar_label: 'TRANSACTION_EXECUTION_ERROR'
custom_edit_url: null
---

[RPCSPEC09](../namespaces/RPC.RPCSPEC09.md).[API](../namespaces/RPC.RPCSPEC09.API.md).TRANSACTION_EXECUTION_ERROR

## Properties

### code

• **code**: `41`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:65

---

### message

• **message**: `"Transaction execution error"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:66

---

### data

• **data**: `Object`

#### Type declaration

| Name                | Type                                                                                                  | Description                                                                                    |
| :------------------ | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `transaction_index` | `number`                                                                                              | The index of the first transaction failing in a sequence of given transactions **`Minimum`** 0 |
| `execution_error`   | [`CONTRACT_EXECUTION_ERROR_INNER`](../namespaces/RPC.RPCSPEC09.API.md#contract_execution_error_inner) | the execution trace up to the point of failure                                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/errors.d.ts:67
