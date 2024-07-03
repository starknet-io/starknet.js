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

## Enumerations

- [ETransactionType](../enums/types.RPC.RPCSPEC06.ETransactionType.md)
- [ESimulationFlag](../enums/types.RPC.RPCSPEC06.ESimulationFlag.md)
- [ETransactionStatus](../enums/types.RPC.RPCSPEC06.ETransactionStatus.md)
- [ETransactionFinalityStatus](../enums/types.RPC.RPCSPEC06.ETransactionFinalityStatus.md)
- [ETransactionExecutionStatus](../enums/types.RPC.RPCSPEC06.ETransactionExecutionStatus.md)
- [EBlockTag](../enums/types.RPC.RPCSPEC06.EBlockTag.md)
- [EDataAvailabilityMode](../enums/types.RPC.RPCSPEC06.EDataAvailabilityMode.md)
- [EDAMode](../enums/types.RPC.RPCSPEC06.EDAMode.md)
- [ETransactionVersion](../enums/types.RPC.RPCSPEC06.ETransactionVersion.md)
- [ETransactionVersion2](../enums/types.RPC.RPCSPEC06.ETransactionVersion2.md)
- [ETransactionVersion3](../enums/types.RPC.RPCSPEC06.ETransactionVersion3.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods` & `TraceMethods`

#### Defined in

[src/types/api/rpcspec_0_6/methods.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/methods.ts#L42)

---

### ABI

Ƭ **ABI**: (`FUNCTION` \| `CONSTRUCTOR` \| `L1_HANDLER` \| `EVENT` \| `STRUCT` \| `ENUM` \| `INTERFACE` \| `IMPL`)[]

TypeScript Representation of Cairo1 v2+ Starknet Contract ABI

starknet_metadata.json - tags/v0.5.0

'starknet-specs' (OpenRpc protocol types)
https://github.com/starkware-libs/starknet-specs

#### Defined in

[src/types/api/rpcspec_0_6/contract.ts:10](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/contract.ts#L10)

---

### ContractClass

Ƭ **ContractClass**: [`CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#contract_class) \| [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#deprecated_contract_class)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:45](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L45)

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Object`

#### Type declaration

| Name                | Type                                                                 |
| :------------------ | :------------------------------------------------------------------- |
| `transaction_trace` | [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace) |
| `fee_estimation`    | [`FEE_ESTIMATE`](types.RPC.RPCSPEC06.SPEC.md#fee_estimate)           |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L47)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulateTransaction`](types.RPC.RPCSPEC06.md#simulatetransaction)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:51](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L51)

---

### FeeEstimate

Ƭ **FeeEstimate**: [`FEE_ESTIMATE`](types.RPC.RPCSPEC06.SPEC.md#fee_estimate)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:53](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L53)

---

### TransactionWithHash

Ƭ **TransactionWithHash**: [`TXN`](types.RPC.RPCSPEC06.SPEC.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) }

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:55](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L55)

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `Object`

#### Type declaration

| Name           | Type                                                       |
| :------------- | :--------------------------------------------------------- |
| `block_hash`   | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)     |
| `block_number` | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:57](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L57)

---

### BlockWithTxs

Ƭ **BlockWithTxs**: [`BLOCK_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#block_with_txs) \| [`PENDING_BLOCK_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#pending_block_with_txs)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:59](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L59)

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: [`BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#block_with_tx_hashes) \| [`PENDING_BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#pending_block_with_tx_hashes)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:61](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L61)

---

### StateUpdate

Ƭ **StateUpdate**: [`STATE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#state_update) \| [`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#pending_state_update)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:63](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L63)

---

### BlockTransactionsTraces

Ƭ **BlockTransactionsTraces**: \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) ; `trace_root`: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace) }[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:65](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L65)

---

### Syncing

Ƭ **Syncing**: `false` \| [`SYNC_STATUS`](types.RPC.RPCSPEC06.SPEC.md#sync_status)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:67](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L67)

---

### Events

Ƭ **Events**: [`EVENTS_CHUNK`](types.RPC.RPCSPEC06.SPEC.md#events_chunk)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:69](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L69)

---

### EmittedEvent

Ƭ **EmittedEvent**: [`EMITTED_EVENT`](types.RPC.RPCSPEC06.SPEC.md#emitted_event)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L70)

---

### Event

Ƭ **Event**: [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:71](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L71)

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:73](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L73)

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)         |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L75)

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Object`

#### Type declaration

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)         |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:77](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L77)

---

### ContractAddress

Ƭ **ContractAddress**: [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:80](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L80)

---

### Felt

Ƭ **Felt**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:81](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L81)

---

### Nonce

Ƭ **Nonce**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:82](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L82)

---

### TransactionHash

Ƭ **TransactionHash**: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:83](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L83)

---

### TransactionTrace

Ƭ **TransactionTrace**: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC06.SPEC.md#transaction_trace)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L84)

---

### BlockHash

Ƭ **BlockHash**: [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:85](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L85)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: [`TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`PENDING_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:86](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L86)

---

### Receipt

Ƭ **Receipt**: [`TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:87](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L87)

---

### PendingReceipt

Ƭ **PendingReceipt**: [`PENDING_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:88](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L88)

---

### EventFilter

Ƭ **EventFilter**: [`EVENT_FILTER`](types.RPC.RPCSPEC06.SPEC.md#event_filter) & [`RESULT_PAGE_REQUEST`](types.RPC.RPCSPEC06.SPEC.md#result_page_request)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:89](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L89)

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.RPC.RPCSPEC06.SPEC.md#simulation_flag)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:90](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L90)

---

### L1Message

Ƭ **L1Message**: [`MSG_FROM_L1`](types.RPC.RPCSPEC06.SPEC.md#msg_from_l1)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:91](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L91)

---

### BaseTransaction

Ƭ **BaseTransaction**: [`BROADCASTED_TXN`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_txn)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:92](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L92)

---

### ChainId

Ƭ **ChainId**: [`CHAIN_ID`](types.RPC.RPCSPEC06.SPEC.md#chain_id)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:93](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L93)

---

### Transaction

Ƭ **Transaction**: [`TXN`](types.RPC.RPCSPEC06.SPEC.md#txn)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:94](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L94)

---

### TransactionStatus

Ƭ **TransactionStatus**: `Object`

#### Type declaration

| Name                | Type                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `finality_status`   | [`TXN_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_status)                     |
| `execution_status?` | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_execution_status) |

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:95](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L95)

---

### ResourceBounds

Ƭ **ResourceBounds**: [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:99](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L99)

---

### FeePayment

Ƭ **FeePayment**: [`FEE_PAYMENT`](types.RPC.RPCSPEC06.SPEC.md#fee_payment)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:100](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L100)

---

### PriceUnit

Ƭ **PriceUnit**: [`PRICE_UNIT`](types.RPC.RPCSPEC06.SPEC.md#price_unit)

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:101](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L101)

---

### StorageDiffs

Ƭ **StorageDiffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC06.SPEC.md#contract_storage_diff_item)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:104](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L104)

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L105)

---

### NonceUpdates

Ƭ **NonceUpdates**: [`NONCE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#nonce_update)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:106](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L106)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: [`REPLACED_CLASS`](types.RPC.RPCSPEC06.SPEC.md#replaced_class)[]

#### Defined in

[src/types/api/rpcspec_0_6/nonspec.ts:107](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/nonspec.ts#L107)
