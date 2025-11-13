---
id: 'RPC.RPCSPEC08.API.CONTRACT_ERROR'
title: 'Interface: CONTRACT_ERROR'
sidebar_label: 'CONTRACT_ERROR'
custom_edit_url: null
---

[RPCSPEC08](../namespaces/RPC.RPCSPEC08.md).[API](../namespaces/RPC.RPCSPEC08.API.md).CONTRACT_ERROR

## Properties

### code

• **code**: `40`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/errors.d.ts:55

---

### message

• **message**: `"Contract error"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/errors.d.ts:56

---

### data

• **data**: `Object`

#### Type declaration

| Name           | Type                                                                                                  | Description                                    |
| :------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| `revert_error` | [`CONTRACT_EXECUTION_ERROR_INNER`](../namespaces/RPC.RPCSPEC08.API.md#contract_execution_error_inner) | the execution trace up to the point of failure |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/errors.d.ts:57
