---
id: 'types.RPC.RPCSPEC07.API'
title: 'Namespace: API'
sidebar_label: 'API'
custom_edit_url: null
---

[RPC](types.RPC.md).[RPCSPEC07](types.RPC.RPCSPEC07.md).API

## Namespaces

- [Errors](types.RPC.RPCSPEC07.API.Errors.md)
- [SPEC](types.RPC.RPCSPEC07.API.SPEC.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods` & `TraceMethods`

#### Defined in

node_modules/starknet-types-07/dist/types/api/methods.d.ts:4

---

### ABI

Ƭ **ABI**: ([`FUNCTION`](types.RPC.RPCSPEC07.API.md#function) \| [`CONSTRUCTOR`](types.RPC.RPCSPEC07.API.md#constructor) \| [`L1_HANDLER`](types.RPC.RPCSPEC07.API.md#l1_handler) \| [`EVENT`](types.RPC.RPCSPEC07.API.md#event) \| [`STRUCT`](types.RPC.RPCSPEC07.API.md#struct) \| [`ENUM`](types.RPC.RPCSPEC07.API.md#enum) \| [`INTERFACE`](types.RPC.RPCSPEC07.API.md#interface) \| [`IMPL`](types.RPC.RPCSPEC07.API.md#impl))[]

TypeScript Representation of Cairo1 v2+ Starknet Contract ABI

starknet_metadata.json - tags/v0.5.0

'starknet-specs' (OpenRpc protocol types)
https://github.com/starkware-libs/starknet-specs

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:9

---

### FUNCTION

Ƭ **FUNCTION**: `Object`

#### Type declaration

| Name               | Type                                       |
| :----------------- | :----------------------------------------- |
| `type`             | `"function"`                               |
| `name`             | `string`                                   |
| `inputs`           | \{ `name`: `string` ; `type`: `string` }[] |
| `outputs?`         | \{ `type`: `string` }[]                    |
| `state_mutability` | `"view"` \| `"external"`                   |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:10

---

### CONSTRUCTOR

Ƭ **CONSTRUCTOR**: `Object`

#### Type declaration

| Name     | Type                                       |
| :------- | :----------------------------------------- |
| `type`   | `"constructor"`                            |
| `name`   | `"constructor"`                            |
| `inputs` | \{ `name`: `string` ; `type`: `string` }[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:22

---

### L1_HANDLER

Ƭ **L1_HANDLER**: `Object`

#### Type declaration

| Name               | Type                                       |
| :----------------- | :----------------------------------------- |
| `type`             | `"l1_handler"`                             |
| `name`             | `string`                                   |
| `inputs`           | \{ `name`: `string` ; `type`: `string` }[] |
| `outputs?`         | \{ `type`: `string` }[]                    |
| `state_mutability` | `"view"` \| `"external"`                   |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:30

---

### EVENT

Ƭ **EVENT**: \{ `type`: `"event"` ; `name`: `string` } & [`ENUM_EVENT`](types.RPC.RPCSPEC07.API.md#enum_event) \| [`STRUCT_EVENT`](types.RPC.RPCSPEC07.API.md#struct_event)

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:42

---

### STRUCT_EVENT

Ƭ **STRUCT_EVENT**: `Object`

#### Type declaration

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `kind`    | `"struct"`                                                |
| `members` | [`EVENT_FIELD`](types.RPC.RPCSPEC07.API.md#event_field)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:46

---

### ENUM_EVENT

Ƭ **ENUM_EVENT**: `Object`

#### Type declaration

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `kind`     | `"enum"`                                                  |
| `variants` | [`EVENT_FIELD`](types.RPC.RPCSPEC07.API.md#event_field)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:50

---

### STRUCT

Ƭ **STRUCT**: `Object`

#### Type declaration

| Name      | Type                                       |
| :-------- | :----------------------------------------- |
| `type`    | `"struct"`                                 |
| `name`    | `string`                                   |
| `members` | \{ `name`: `string` ; `type`: `string` }[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:54

---

### ENUM

Ƭ **ENUM**: `Object`

#### Type declaration

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `type`     | `"enum"`                                   |
| `name`     | `string`                                   |
| `variants` | \{ `name`: `string` ; `type`: `string` }[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:62

---

### INTERFACE

Ƭ **INTERFACE**: `Object`

#### Type declaration

| Name    | Type                                                |
| :------ | :-------------------------------------------------- |
| `type`  | `"interface"`                                       |
| `name`  | `string`                                            |
| `items` | [`FUNCTION`](types.RPC.RPCSPEC07.API.md#function)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:70

---

### IMPL

Ƭ **IMPL**: `Object`

#### Type declaration

| Name             | Type     |
| :--------------- | :------- |
| `type`           | `"impl"` |
| `name`           | `string` |
| `interface_name` | `string` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:75

---

### EVENT_KIND

Ƭ **EVENT_KIND**: `"struct"` \| `"enum"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:80

---

### EVENT_FIELD

Ƭ **EVENT_FIELD**: `Object`

#### Type declaration

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `string`                          |
| `type` | `string`                          |
| `kind` | `"key"` \| `"data"` \| `"nested"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/contract.d.ts:81

---

### ContractClass

Ƭ **ContractClass**: [`CONTRACT_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#contract_class) \| [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_contract_class)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:5

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Object`

#### Type declaration

| Name                | Type                                                                     |
| :------------------ | :----------------------------------------------------------------------- |
| `transaction_trace` | [`TRANSACTION_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace) |
| `fee_estimation`    | [`FEE_ESTIMATE`](types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:6

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulateTransaction`](types.RPC.RPCSPEC07.API.md#simulatetransaction)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:10

---

### FeeEstimate

Ƭ **FeeEstimate**: [`FEE_ESTIMATE`](types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:11

---

### TransactionWithHash

Ƭ **TransactionWithHash**: [`TXN`](types.RPC.RPCSPEC07.API.SPEC.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) }

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:12

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `Object`

#### Type declaration

| Name           | Type                                                           |
| :------------- | :------------------------------------------------------------- |
| `block_hash`   | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)     |
| `block_number` | [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:15

---

### BlockWithTxs

Ƭ **BlockWithTxs**: [`BLOCK_WITH_TXS`](types.RPC.RPCSPEC07.API.SPEC.md#block_with_txs) \| [`PENDING_BLOCK_WITH_TXS`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_with_txs)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:19

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: [`BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC07.API.SPEC.md#block_with_tx_hashes) \| [`PENDING_BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_with_tx_hashes)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:20

---

### BlockWithTxReceipts

Ƭ **BlockWithTxReceipts**: [`BLOCK_WITH_RECEIPTS`](types.RPC.RPCSPEC07.API.SPEC.md#block_with_receipts) \| [`PENDING_BLOCK_WITH_RECEIPTS`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_with_receipts)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:21

---

### StateUpdate

Ƭ **StateUpdate**: [`STATE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#state_update) \| [`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#pending_state_update)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:22

---

### BlockTransactionsTraces

Ƭ **BlockTransactionsTraces**: \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) ; `trace_root`: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace) }[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:23

---

### Syncing

Ƭ **Syncing**: `false` \| [`SYNC_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#sync_status)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:27

---

### Events

Ƭ **Events**: [`EVENTS_CHUNK`](types.RPC.RPCSPEC07.API.SPEC.md#events_chunk)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:28

---

### EmittedEvent

Ƭ **EmittedEvent**: [`EMITTED_EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#emitted_event)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:29

---

### Event

Ƭ **Event**: [`EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#event)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:30

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Object`

#### Type declaration

| Name               | Type                                                   |
| :----------------- | :----------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:31

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Object`

#### Type declaration

| Name               | Type                                                   |
| :----------------- | :----------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)         |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:34

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Object`

#### Type declaration

| Name               | Type                                                   |
| :----------------- | :----------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)         |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:38

---

### ContractAddress

Ƭ **ContractAddress**: [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:42

---

### Felt

Ƭ **Felt**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:43

---

### Nonce

Ƭ **Nonce**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:44

---

### TransactionHash

Ƭ **TransactionHash**: [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:45

---

### TransactionTrace

Ƭ **TransactionTrace**: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:46

---

### BlockHash

Ƭ **BlockHash**: [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:47

---

### TransactionReceipt

Ƭ **TransactionReceipt**: [`TXN_RECEIPT_WITH_BLOCK_INFO`](types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt_with_block_info)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:48

---

### Receipt

Ƭ **Receipt**: [`TXN_RECEIPT_WITH_BLOCK_INFO`](types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt_with_block_info) & [`BlockHashAndNumber`](types.RPC.RPCSPEC07.API.md#blockhashandnumber)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:49

---

### PendingReceipt

Ƭ **PendingReceipt**: [`TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:50

---

### EventFilter

Ƭ **EventFilter**: [`EVENT_FILTER`](types.RPC.RPCSPEC07.API.SPEC.md#event_filter) & [`RESULT_PAGE_REQUEST`](types.RPC.RPCSPEC07.API.SPEC.md#result_page_request)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:51

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.RPC.RPCSPEC07.API.SPEC.md#simulation_flag)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:52

---

### L1Message

Ƭ **L1Message**: [`MSG_FROM_L1`](types.RPC.RPCSPEC07.API.SPEC.md#msg_from_l1)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:53

---

### BaseTransaction

Ƭ **BaseTransaction**: [`BROADCASTED_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:54

---

### ChainId

Ƭ **ChainId**: [`CHAIN_ID`](types.RPC.RPCSPEC07.API.SPEC.md#chain_id)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:55

---

### Transaction

Ƭ **Transaction**: [`TXN`](types.RPC.RPCSPEC07.API.SPEC.md#txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:56

---

### TransactionStatus

Ƭ **TransactionStatus**: `Object`

#### Type declaration

| Name                | Type                                                                           |
| :------------------ | :----------------------------------------------------------------------------- |
| `finality_status`   | [`TXN_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#txn_status)                     |
| `execution_status?` | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#txn_execution_status) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:57

---

### ResourceBounds

Ƭ **ResourceBounds**: [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:61

---

### FeePayment

Ƭ **FeePayment**: [`FEE_PAYMENT`](types.RPC.RPCSPEC07.API.SPEC.md#fee_payment)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:62

---

### PriceUnit

Ƭ **PriceUnit**: [`PRICE_UNIT`](types.RPC.RPCSPEC07.API.SPEC.md#price_unit)

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:63

---

### StorageDiffs

Ƭ **StorageDiffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC07.API.SPEC.md#contract_storage_diff_item)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:64

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:65

---

### NonceUpdates

Ƭ **NonceUpdates**: [`NONCE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#nonce_update)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:66

---

### ReplacedClasses

Ƭ **ReplacedClasses**: [`REPLACED_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#replaced_class)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:67

---

### ETransactionType

Ƭ **ETransactionType**: typeof [`ETransactionType`](types.RPC.RPCSPEC07.API.md#etransactiontype-1)[keyof typeof [`ETransactionType`](types.RPC.RPCSPEC07.API.md#etransactiontype-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:68

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:75

---

### ESimulationFlag

Ƭ **ESimulationFlag**: typeof [`ESimulationFlag`](types.RPC.RPCSPEC07.API.md#esimulationflag-1)[keyof typeof [`ESimulationFlag`](types.RPC.RPCSPEC07.API.md#esimulationflag-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:76

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:80

---

### ETransactionStatus

Ƭ **ETransactionStatus**: typeof [`ETransactionStatus`](types.RPC.RPCSPEC07.API.md#etransactionstatus-1)[keyof typeof [`ETransactionStatus`](types.RPC.RPCSPEC07.API.md#etransactionstatus-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:81

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:87

---

### ETransactionFinalityStatus

Ƭ **ETransactionFinalityStatus**: typeof [`ETransactionFinalityStatus`](types.RPC.RPCSPEC07.API.md#etransactionfinalitystatus-1)[keyof typeof [`ETransactionFinalityStatus`](types.RPC.RPCSPEC07.API.md#etransactionfinalitystatus-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:88

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:92

---

### ETransactionExecutionStatus

Ƭ **ETransactionExecutionStatus**: typeof [`ETransactionExecutionStatus`](types.RPC.RPCSPEC07.API.md#etransactionexecutionstatus-1)[keyof typeof [`ETransactionExecutionStatus`](types.RPC.RPCSPEC07.API.md#etransactionexecutionstatus-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:93

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:97

---

### EBlockTag

Ƭ **EBlockTag**: typeof [`EBlockTag`](types.RPC.RPCSPEC07.API.md#eblocktag-1)[keyof typeof [`EBlockTag`](types.RPC.RPCSPEC07.API.md#eblocktag-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:98

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:102

---

### EDataAvailabilityMode

Ƭ **EDataAvailabilityMode**: typeof [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1)[keyof typeof [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:103

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:107

---

### EDAMode

Ƭ **EDAMode**: typeof [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)[keyof typeof [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:108

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:112

---

### ETransactionVersion

Ƭ **ETransactionVersion**: typeof [`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)[keyof typeof [`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:117

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:127

---

### ETransactionVersion2

Ƭ **ETransactionVersion2**: typeof [`ETransactionVersion2`](types.RPC.RPCSPEC07.API.md#etransactionversion2-1)[keyof typeof [`ETransactionVersion2`](types.RPC.RPCSPEC07.API.md#etransactionversion2-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:131

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:139

---

### ETransactionVersion3

Ƭ **ETransactionVersion3**: typeof [`ETransactionVersion3`](types.RPC.RPCSPEC07.API.md#etransactionversion3-1)[keyof typeof [`ETransactionVersion3`](types.RPC.RPCSPEC07.API.md#etransactionversion3-1)]

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:143

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:147

## Variables

### ETransactionType

• `Const` **ETransactionType**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `DECLARE`        | `"DECLARE"`        |
| `DEPLOY`         | `"DEPLOY"`         |
| `DEPLOY_ACCOUNT` | `"DEPLOY_ACCOUNT"` |
| `INVOKE`         | `"INVOKE"`         |
| `L1_HANDLER`     | `"L1_HANDLER"`     |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:68

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:75

---

### ESimulationFlag

• `Const` **ESimulationFlag**: `Object`

#### Type declaration

| Name              | Type                |
| :---------------- | :------------------ |
| `SKIP_VALIDATE`   | `"SKIP_VALIDATE"`   |
| `SKIP_FEE_CHARGE` | `"SKIP_FEE_CHARGE"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:76

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:80

---

### ETransactionStatus

• `Const` **ETransactionStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `RECEIVED`       | `"RECEIVED"`       |
| `REJECTED`       | `"REJECTED"`       |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:81

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:87

---

### ETransactionFinalityStatus

• `Const` **ETransactionFinalityStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:88

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:92

---

### ETransactionExecutionStatus

• `Const` **ETransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `SUCCEEDED` | `"SUCCEEDED"` |
| `REVERTED`  | `"REVERTED"`  |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:93

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:97

---

### EBlockTag

• `Const` **EBlockTag**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `LATEST`  | `"latest"`  |
| `PENDING` | `"pending"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:98

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:102

---

### EDataAvailabilityMode

• `Const` **EDataAvailabilityMode**: `Object`

#### Type declaration

| Name | Type   |
| :--- | :----- |
| `L1` | `"L1"` |
| `L2` | `"L2"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:103

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:107

---

### EDAMode

• `Const` **EDAMode**: `Object`

#### Type declaration

| Name | Type |
| :--- | :--- |
| `L1` | `0`  |
| `L2` | `1`  |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:108

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:112

---

### ETransactionVersion

• `Const` **ETransactionVersion**: `Object`

V* Transaction versions HexString
F* Fee Transaction Versions HexString (2 \*\* 128 + TRANSACTION_VERSION)

#### Type declaration

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `V0` | `"0x0"`                                 |
| `V1` | `"0x1"`                                 |
| `V2` | `"0x2"`                                 |
| `V3` | `"0x3"`                                 |
| `F0` | `"0x100000000000000000000000000000000"` |
| `F1` | `"0x100000000000000000000000000000001"` |
| `F2` | `"0x100000000000000000000000000000002"` |
| `F3` | `"0x100000000000000000000000000000003"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:117

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:127

---

### ETransactionVersion2

• `Const` **ETransactionVersion2**: `Object`

Old Transaction Versions

#### Type declaration

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `V0` | `"0x0"`                                 |
| `V1` | `"0x1"`                                 |
| `V2` | `"0x2"`                                 |
| `F0` | `"0x100000000000000000000000000000000"` |
| `F1` | `"0x100000000000000000000000000000001"` |
| `F2` | `"0x100000000000000000000000000000002"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:131

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:139

---

### ETransactionVersion3

• `Const` **ETransactionVersion3**: `Object`

V3 Transaction Versions

#### Type declaration

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `V3` | `"0x3"`                                 |
| `F3` | `"0x100000000000000000000000000000003"` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:143

node_modules/starknet-types-07/dist/types/api/nonspec.d.ts:147
