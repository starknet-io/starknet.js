---
id: 'types.RPC.RPCSPEC06'
title: 'Namespace: RPCSPEC06'
sidebar_label: 'RPCSPEC06'
custom_edit_url: null
---

[types](types.md).[RPC](types.RPC.md).RPCSPEC06

## Namespaces

- [Errors](types.RPC.RPCSPEC06.Errors.md)
- [SPEC](types.RPC.RPCSPEC06.SPEC.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods` & `TraceMethods`

#### Defined in

[src/types/api/rpcspec_0_6/methods.ts:330](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/methods.ts#L330)

---

### ABI

Ƭ **ABI**: (`FUNCTION` \| `CONSTRUCTOR` \| `L1_HANDLER` \| `EVENT` \| `STRUCT` \| `ENUM` \| `INTERFACE` \| `IMPL`)[]

TypeScript Representation of Cairo1 v2+ Starknet Contract ABI

starknet_metadata.json - tags/v0.5.0

'starknet-specs' (OpenRpc protocol types)
https://github.com/starkware-libs/starknet-specs

#### Defined in

[src/types/api/rpcspec_0_6/contract.ts:10](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/contract.ts#L10)

---

### ContractClass

Ƭ **ContractClass**: [`CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#contract_class) \| [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#deprecated_contract_class)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:46](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L46)

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Object`

#### Type declaration

| Name                | Type                                                                 |
| :------------------ | :------------------------------------------------------------------- |
| `transaction_trace` | [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace) |
| `fee_estimation`    | [`FEE_ESTIMATE`](types.RPC.RPCSPEC06.SPEC.md#fee_estimate)           |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L48)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulateTransaction`](types.RPC.RPCSPEC06.md#simulatetransaction)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L52)

---

### FeeEstimate

Ƭ **FeeEstimate**: [`FEE_ESTIMATE`](types.RPC.RPCSPEC06.SPEC.md#fee_estimate)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L54)

---

### TransactionWithHash

Ƭ **TransactionWithHash**: [`TXN`](types.RPC.RPCSPEC06.SPEC.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) }

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L56)

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `Object`

#### Type declaration

| Name           | Type                                                       |
| :------------- | :--------------------------------------------------------- |
| `block_hash`   | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)     |
| `block_number` | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L58)

---

### BlockWithTxs

Ƭ **BlockWithTxs**: [`BLOCK_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#block_with_txs) \| [`PENDING_BLOCK_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#pending_block_with_txs)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L60)

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: [`BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#block_with_tx_hashes) \| [`PENDING_BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#pending_block_with_tx_hashes)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L62)

---

### StateUpdate

Ƭ **StateUpdate**: [`STATE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#state_update) \| [`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#pending_state_update)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:64](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L64)

---

### BlockTransactionsTraces

Ƭ **BlockTransactionsTraces**: \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) ; `trace_root`: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace) }[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:66](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L66)

---

### Syncing

Ƭ **Syncing**: `false` \| [`SYNC_STATUS`](types.RPC.RPCSPEC06.SPEC.md#sync_status)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:68](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L68)

---

### Events

Ƭ **Events**: [`EVENTS_CHUNK`](types.RPC.RPCSPEC06.SPEC.md#events_chunk)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L70)

---

### EmittedEvent

Ƭ **EmittedEvent**: [`EMITTED_EVENT`](types.RPC.RPCSPEC06.SPEC.md#emitted_event)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:71](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L71)

---

### Event

Ƭ **Event**: [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:72](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L72)

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:74](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L74)

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)         |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:76](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L76)

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)         |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:78](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L78)

---

### ContractAddress

Ƭ **ContractAddress**: [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:81](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L81)

---

### Felt

Ƭ **Felt**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:82](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L82)

---

### Nonce

Ƭ **Nonce**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:83](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L83)

---

### TransactionHash

Ƭ **TransactionHash**: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L84)

---

### TransactionTrace

Ƭ **TransactionTrace**: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:85](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L85)

---

### BlockHash

Ƭ **BlockHash**: [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:86](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L86)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: [`TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`PENDING_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:87](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L87)

---

### Receipt

Ƭ **Receipt**: [`TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:88](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L88)

---

### PendingReceipt

Ƭ **PendingReceipt**: [`PENDING_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:89](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L89)

---

### EventFilter

Ƭ **EventFilter**: [`EVENT_FILTER`](types.RPC.RPCSPEC06.SPEC.md#event_filter) & [`RESULT_PAGE_REQUEST`](types.RPC.RPCSPEC06.SPEC.md#result_page_request)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:90](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L90)

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.RPC.RPCSPEC06.SPEC.md#simulation_flag)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:91](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L91)

---

### L1Message

Ƭ **L1Message**: [`MSG_FROM_L1`](types.RPC.RPCSPEC06.SPEC.md#msg_from_l1)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:92](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L92)

---

### BaseTransaction

Ƭ **BaseTransaction**: [`BROADCASTED_TXN`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_txn)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:93](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L93)

---

### ChainId

Ƭ **ChainId**: [`CHAIN_ID`](types.RPC.RPCSPEC06.SPEC.md#chain_id)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:94](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L94)

---

### Transaction

Ƭ **Transaction**: [`TXN`](types.RPC.RPCSPEC06.SPEC.md#txn)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:95](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L95)

---

### TransactionStatus

Ƭ **TransactionStatus**: `Object`

#### Type declaration

| Name                | Type                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `finality_status`   | [`TXN_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_status)                     |
| `execution_status?` | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_execution_status) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:96](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L96)

---

### ResourceBounds

Ƭ **ResourceBounds**: [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:100](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L100)

---

### FeePayment

Ƭ **FeePayment**: [`FEE_PAYMENT`](types.RPC.RPCSPEC06.SPEC.md#fee_payment)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:101](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L101)

---

### PriceUnit

Ƭ **PriceUnit**: [`PRICE_UNIT`](types.RPC.RPCSPEC06.SPEC.md#price_unit)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:102](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L102)

---

### StorageDiffs

Ƭ **StorageDiffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC06.SPEC.md#contract_storage_diff_item)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L105)

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:106](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L106)

---

### NonceUpdates

Ƭ **NonceUpdates**: [`NONCE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#nonce_update)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:107](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L107)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: [`REPLACED_CLASS`](types.RPC.RPCSPEC06.SPEC.md#replaced_class)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:108](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L108)

---

### ETransactionType

Ƭ **ETransactionType**: `ValuesType`<typeof [`ETransactionType`](types.RPC.RPCSPEC06.md#etransactiontype-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:111](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L111)

[src/types/api/rpcspec_0_6/nonspec.ts:119](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L119)

---

### ESimulationFlag

Ƭ **ESimulationFlag**: `ValuesType`<typeof [`ESimulationFlag`](types.RPC.RPCSPEC06.md#esimulationflag-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:121](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L121)

[src/types/api/rpcspec_0_6/nonspec.ts:126](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L126)

---

### ETransactionStatus

Ƭ **ETransactionStatus**: `ValuesType`<typeof [`ETransactionStatus`](types.RPC.RPCSPEC06.md#etransactionstatus-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:128](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L128)

[src/types/api/rpcspec_0_6/nonspec.ts:135](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L135)

---

### ETransactionFinalityStatus

Ƭ **ETransactionFinalityStatus**: `ValuesType`<typeof [`ETransactionFinalityStatus`](types.RPC.RPCSPEC06.md#etransactionfinalitystatus-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:137](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L137)

[src/types/api/rpcspec_0_6/nonspec.ts:142](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L142)

---

### ETransactionExecutionStatus

Ƭ **ETransactionExecutionStatus**: `ValuesType`<typeof [`ETransactionExecutionStatus`](types.RPC.RPCSPEC06.md#etransactionexecutionstatus-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:144](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L144)

[src/types/api/rpcspec_0_6/nonspec.ts:149](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L149)

---

### EBlockTag

Ƭ **EBlockTag**: `ValuesType`<typeof [`EBlockTag`](types.RPC.RPCSPEC06.md#eblocktag-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:151](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L151)

[src/types/api/rpcspec_0_6/nonspec.ts:156](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L156)

---

### EDataAvailabilityMode

Ƭ **EDataAvailabilityMode**: `ValuesType`<typeof [`EDataAvailabilityMode`](types.RPC.RPCSPEC06.md#edataavailabilitymode-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:159](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L159)

[src/types/api/rpcspec_0_6/nonspec.ts:164](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L164)

---

### EDAMode

Ƭ **EDAMode**: `ValuesType`<typeof [`EDAMode`](types.RPC.RPCSPEC06.md#edamode-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:167](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L167)

[src/types/api/rpcspec_0_6/nonspec.ts:172](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L172)

---

### ETransactionVersion

Ƭ **ETransactionVersion**: `ValuesType`<typeof [`ETransactionVersion`](types.RPC.RPCSPEC06.md#etransactionversion-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:178](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L178)

[src/types/api/rpcspec_0_6/nonspec.ts:189](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L189)

---

### ETransactionVersion2

Ƭ **ETransactionVersion2**: `ValuesType`<typeof [`ETransactionVersion2`](types.RPC.RPCSPEC06.md#etransactionversion2-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:194](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L194)

[src/types/api/rpcspec_0_6/nonspec.ts:203](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L203)

---

### ETransactionVersion3

Ƭ **ETransactionVersion3**: `ValuesType`<typeof [`ETransactionVersion3`](types.RPC.RPCSPEC06.md#etransactionversion3-1)\>

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:208](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L208)

[src/types/api/rpcspec_0_6/nonspec.ts:213](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L213)

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

[src/types/api/rpcspec_0_6/nonspec.ts:111](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L111)

[src/types/api/rpcspec_0_6/nonspec.ts:119](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L119)

---

### ESimulationFlag

• `Const` **ESimulationFlag**: `Object`

#### Type declaration

| Name              | Type                |
| :---------------- | :------------------ |
| `SKIP_VALIDATE`   | `"SKIP_VALIDATE"`   |
| `SKIP_FEE_CHARGE` | `"SKIP_FEE_CHARGE"` |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:121](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L121)

[src/types/api/rpcspec_0_6/nonspec.ts:126](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L126)

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

[src/types/api/rpcspec_0_6/nonspec.ts:128](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L128)

[src/types/api/rpcspec_0_6/nonspec.ts:135](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L135)

---

### ETransactionFinalityStatus

• `Const` **ETransactionFinalityStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:137](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L137)

[src/types/api/rpcspec_0_6/nonspec.ts:142](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L142)

---

### ETransactionExecutionStatus

• `Const` **ETransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `SUCCEEDED` | `"SUCCEEDED"` |
| `REVERTED`  | `"REVERTED"`  |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:144](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L144)

[src/types/api/rpcspec_0_6/nonspec.ts:149](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L149)

---

### EBlockTag

• `Const` **EBlockTag**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `PENDING` | `"pending"` |
| `LATEST`  | `"latest"`  |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:151](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L151)

[src/types/api/rpcspec_0_6/nonspec.ts:156](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L156)

---

### EDataAvailabilityMode

• `Const` **EDataAvailabilityMode**: `Object`

#### Type declaration

| Name | Type   |
| :--- | :----- |
| `L1` | `"L1"` |
| `L2` | `"L2"` |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:159](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L159)

[src/types/api/rpcspec_0_6/nonspec.ts:164](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L164)

---

### EDAMode

• `Const` **EDAMode**: `Object`

#### Type declaration

| Name | Type |
| :--- | :--- |
| `L1` | `0`  |
| `L2` | `1`  |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:167](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L167)

[src/types/api/rpcspec_0_6/nonspec.ts:172](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L172)

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

[src/types/api/rpcspec_0_6/nonspec.ts:178](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L178)

[src/types/api/rpcspec_0_6/nonspec.ts:189](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L189)

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

[src/types/api/rpcspec_0_6/nonspec.ts:194](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L194)

[src/types/api/rpcspec_0_6/nonspec.ts:203](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L203)

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

[src/types/api/rpcspec_0_6/nonspec.ts:208](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L208)

[src/types/api/rpcspec_0_6/nonspec.ts:213](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/api/rpcspec_0_6/nonspec.ts#L213)
