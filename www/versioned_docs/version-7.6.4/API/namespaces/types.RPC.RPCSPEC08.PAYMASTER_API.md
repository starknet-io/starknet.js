---
id: 'types.RPC.RPCSPEC08.PAYMASTER_API'
title: 'Namespace: PAYMASTER_API'
sidebar_label: 'PAYMASTER_API'
custom_edit_url: null
---

[RPC](types.RPC.md).[RPCSPEC08](types.RPC.RPCSPEC08.md).PAYMASTER_API

## Interfaces

- [INVALID_ADDRESS](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_ADDRESS.md)
- [TOKEN_NOT_SUPPORTED](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.TOKEN_NOT_SUPPORTED.md)
- [INVALID_SIGNATURE](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_SIGNATURE.md)
- [MAX_AMOUNT_TOO_LOW](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.MAX_AMOUNT_TOO_LOW.md)
- [CLASS_HASH_NOT_SUPPORTED](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.CLASS_HASH_NOT_SUPPORTED.md)
- [TRANSACTION_EXECUTION_ERROR](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.TRANSACTION_EXECUTION_ERROR.md)
- [INVALID_TIME_BOUNDS](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_TIME_BOUNDS.md)
- [INVALID_DEPLOYMENT_DATA](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_DEPLOYMENT_DATA.md)
- [INVALID_CLASS_HASH](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_CLASS_HASH.md)
- [INVALID_ID](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_ID.md)
- [UNKNOWN_ERROR](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.UNKNOWN_ERROR.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/methods.d.ts:32

---

### u256

Ƭ **u256**: `string`

256 bit unsigned integers, represented by a hex string of length at most 64

**`Pattern`**

^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,63})$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:7

---

### CALL

Ƭ **CALL**: `Object`

The object that defines an invocation of a function in a contract

#### Type declaration

| Name       | Type                                            |
| :--------- | :---------------------------------------------- |
| `to`       | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `calldata` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:11

---

### TRACKING_ID

Ƭ **TRACKING_ID**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

A unique identifier corresponding to an `execute` request to the paymaster

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:19

---

### USER_DEPLOY_TRANSACTION

Ƭ **USER_DEPLOY_TRANSACTION**: `Object`

User transaction

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:23

---

### USER_INVOKE_TRANSACTION

Ƭ **USER_INVOKE_TRANSACTION**: `Object`

#### Type declaration

| Name     | Type                                                              |
| :------- | :---------------------------------------------------------------- |
| `type`   | `"invoke"`                                                        |
| `invoke` | [`USER_INVOKE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#user_invoke) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:27

---

### USER_INVOKE

Ƭ **USER_INVOKE**: `Object`

#### Type declaration

| Name           | Type                                                  |
| :------------- | :---------------------------------------------------- |
| `user_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)       |
| `calls`        | [`CALL`](types.RPC.RPCSPEC08.PAYMASTER_API.md#call)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:31

---

### USER_DEPLOY_AND_INVOKE_TRANSACTION

Ƭ **USER_DEPLOY_AND_INVOKE_TRANSACTION**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                     |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `invoke`     | [`USER_INVOKE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#user_invoke)                         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:35

---

### USER_TRANSACTION

Ƭ **USER_TRANSACTION**: [`USER_DEPLOY_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#user_deploy_transaction) \| [`USER_INVOKE_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#user_invoke_transaction) \| [`USER_DEPLOY_AND_INVOKE_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#user_deploy_and_invoke_transaction)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:40

---

### EXECUTABLE_USER_DEPLOY_TRANSACTION

Ƭ **EXECUTABLE_USER_DEPLOY_TRANSACTION**: `Object`

User transaction

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:44

---

### EXECUTABLE_USER_INVOKE_TRANSACTION

Ƭ **EXECUTABLE_USER_INVOKE_TRANSACTION**: `Object`

#### Type declaration

| Name     | Type                                                                                    |
| :------- | :-------------------------------------------------------------------------------------- |
| `type`   | `"invoke"`                                                                              |
| `invoke` | [`EXECUTABLE_USER_INVOKE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#executable_user_invoke) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:48

---

### EXECUTABLE_USER_INVOKE

Ƭ **EXECUTABLE_USER_INVOKE**: `Object`

#### Type declaration

| Name           | Type                                                                                       |
| :------------- | :----------------------------------------------------------------------------------------- |
| `user_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                            |
| `typed_data`   | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `signature`    | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:52

---

### EXECUTABLE_USER_DEPLOY_AND_INVOKE_TRANSACTION

Ƭ **EXECUTABLE_USER_DEPLOY_AND_INVOKE_TRANSACTION**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                     |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `invoke`     | [`EXECUTABLE_USER_INVOKE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#executable_user_invoke)   |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:57

---

### EXECUTABLE_USER_TRANSACTION

Ƭ **EXECUTABLE_USER_TRANSACTION**: [`EXECUTABLE_USER_DEPLOY_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#executable_user_deploy_transaction) \| [`EXECUTABLE_USER_INVOKE_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#executable_user_invoke_transaction) \| [`EXECUTABLE_USER_DEPLOY_AND_INVOKE_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#executable_user_deploy_and_invoke_transaction)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:62

---

### SPONSORED_TRANSACTION

Ƭ **SPONSORED_TRANSACTION**: `Object`

Execution parameters

#### Type declaration

| Name   | Type          |
| :----- | :------------ |
| `mode` | `"sponsored"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:66

---

### GASLESS_TRANSACTION

Ƭ **GASLESS_TRANSACTION**: `Object`

#### Type declaration

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `mode`      | `"default"`                               |
| `gas_token` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:69

---

### FEE_MODE

Ƭ **FEE_MODE**: [`SPONSORED_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#sponsored_transaction) \| [`GASLESS_TRANSACTION`](types.RPC.RPCSPEC08.PAYMASTER_API.md#gasless_transaction)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:73

---

### EXECUTION_PARAMETERS_V1

Ƭ **EXECUTION_PARAMETERS_V1**: `Object`

#### Type declaration

| Name           | Type                                                           |
| :------------- | :------------------------------------------------------------- |
| `version`      | `"0x1"`                                                        |
| `fee_mode`     | [`FEE_MODE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#fee_mode)    |
| `time_bounds?` | [`TIME_BOUNDS`](types.RPC.RPCSPEC08.WALLET_API.md#time_bounds) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:74

---

### EXECUTION_PARAMETERS

Ƭ **EXECUTION_PARAMETERS**: [`EXECUTION_PARAMETERS_V1`](types.RPC.RPCSPEC08.PAYMASTER_API.md#execution_parameters_v1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:79

---

### ACCOUNT_DEPLOYMENT_DATA

Ƭ **ACCOUNT_DEPLOYMENT_DATA**: `Object`

Data required to deploy an account at an address

#### Type declaration

| Name         | Type                                            |
| :----------- | :---------------------------------------------- |
| `address`    | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `class_hash` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `salt`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `calldata`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |
| `sigdata?`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |
| `version`    | `1`                                             |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:83

---

### TOKEN_DATA

Ƭ **TOKEN_DATA**: `Object`

Object containing data about the token: contract address, number of decimals and current price in STRK

#### Type declaration

| Name            | Type                                                |
| :-------------- | :-------------------------------------------------- |
| `token_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)     |
| `decimals`      | `number`                                            |
| `price_in_strk` | [`u256`](types.RPC.RPCSPEC08.PAYMASTER_API.md#u256) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:94

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: `Object`

#### Type declaration

| Name                             | Type                                      |
| :------------------------------- | :---------------------------------------- |
| `gas_token_price_in_strk`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `estimated_fee_in_strk`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `estimated_fee_in_gas_token`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `suggested_max_fee_in_strk`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `suggested_max_fee_in_gas_token` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/components.d.ts:99

---

### BuildDeployTransactionResponse

Ƭ **BuildDeployTransactionResponse**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `parameters` | [`EXECUTION_PARAMETERS`](types.RPC.RPCSPEC08.PAYMASTER_API.md#execution_parameters)       |
| `fee`        | [`FEE_ESTIMATE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#fee_estimate)                       |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:7

---

### BuildInvokeTransactionResponse

Ƭ **BuildInvokeTransactionResponse**: `Object`

#### Type declaration

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `type`       | `"invoke"`                                                                                 |
| `typed_data` | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `parameters` | [`EXECUTION_PARAMETERS`](types.RPC.RPCSPEC08.PAYMASTER_API.md#execution_parameters)        |
| `fee`        | [`FEE_ESTIMATE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#fee_estimate)                        |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:13

---

### BuildDeployAndInvokeTransactionResponse

Ƭ **BuildDeployAndInvokeTransactionResponse**: `Object`

#### Type declaration

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                      |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data)  |
| `typed_data` | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `parameters` | [`EXECUTION_PARAMETERS`](types.RPC.RPCSPEC08.PAYMASTER_API.md#execution_parameters)        |
| `fee`        | [`FEE_ESTIMATE`](types.RPC.RPCSPEC08.PAYMASTER_API.md#fee_estimate)                        |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:19

---

### BuildTransactionResponse

Ƭ **BuildTransactionResponse**: [`BuildDeployTransactionResponse`](types.RPC.RPCSPEC08.PAYMASTER_API.md#builddeploytransactionresponse) \| [`BuildInvokeTransactionResponse`](types.RPC.RPCSPEC08.PAYMASTER_API.md#buildinvoketransactionresponse) \| [`BuildDeployAndInvokeTransactionResponse`](types.RPC.RPCSPEC08.PAYMASTER_API.md#builddeployandinvoketransactionresponse)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:26

---

### ExecuteResponse

Ƭ **ExecuteResponse**: `Object`

#### Type declaration

| Name               | Type                                                              |
| :----------------- | :---------------------------------------------------------------- |
| `tracking_id`      | [`TRACKING_ID`](types.RPC.RPCSPEC08.PAYMASTER_API.md#tracking_id) |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash)                 |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:27

---

### AccountDeploymentData

Ƭ **AccountDeploymentData**: [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/snip-29/nonspec.d.ts:31
