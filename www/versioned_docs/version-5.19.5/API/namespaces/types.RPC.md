---
id: 'types.RPC'
title: 'Namespace: RPC'
sidebar_label: 'RPC'
custom_edit_url: null
---

[types](types.md).RPC

## Type Aliases

### Response

Ƭ **Response**: `Object`

#### Type declaration

| Name            | Type                                       |
| :-------------- | :----------------------------------------- |
| `id`            | `number`                                   |
| `jsonrpc`       | `string`                                   |
| `result?`       | `any`                                      |
| `error?`        | { `code`: `string` ; `message`: `string` } |
| `error.code`    | `string`                                   |
| `error.message` | `string`                                   |

#### Defined in

[src/types/api/rpc.ts:12](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L12)

---

### ChainId

Ƭ **ChainId**: `OPENRPC.CHAIN_ID`

#### Defined in

[src/types/api/rpc.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L22)

---

### CallResponse

Ƭ **CallResponse**: `OPENRPC.CallResponse`

#### Defined in

[src/types/api/rpc.ts:23](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L23)

---

### ContractAddress

Ƭ **ContractAddress**: `ADDRESS`

#### Defined in

[src/types/api/rpc.ts:24](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L24)

---

### Felt

Ƭ **Felt**: `FELT`

#### Defined in

[src/types/api/rpc.ts:25](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L25)

---

### Nonce

Ƭ **Nonce**: `OPENRPC.Nonce`

#### Defined in

[src/types/api/rpc.ts:26](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L26)

---

### ContractClass

Ƭ **ContractClass**: `OPENRPC.ContractClass` \| `OPENRPC.DeprecatedContractClass`

#### Defined in

[src/types/api/rpc.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L27)

---

### StateUpdate

Ƭ **StateUpdate**: `OPENRPC.StateUpdate`

#### Defined in

[src/types/api/rpc.ts:28](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L28)

---

### Transaction

Ƭ **Transaction**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L29)

---

### PendingTransactions

Ƭ **PendingTransactions**: `OPENRPC.PendingTransactions`

#### Defined in

[src/types/api/rpc.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L30)

---

### TransactionHash

Ƭ **TransactionHash**: `OPENRPC.TransactionHash`

#### Defined in

[src/types/api/rpc.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L31)

---

### Trace

Ƭ **Trace**: `OPENRPC.Trace`

#### Defined in

[src/types/api/rpc.ts:32](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L32)

---

### Traces

Ƭ **Traces**: `OPENRPC.Traces`

#### Defined in

[src/types/api/rpc.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L33)

---

### BlockHash

Ƭ **BlockHash**: `OPENRPC.BlockHash`

#### Defined in

[src/types/api/rpc.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L34)

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `OPENRPC.BlockHashAndNumber`

#### Defined in

[src/types/api/rpc.ts:35](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L35)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: `OPENRPC.EstimatedFee`

#### Defined in

[src/types/api/rpc.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L36)

---

### GetBlockWithTxHashesResponse

Ƭ **GetBlockWithTxHashesResponse**: `OPENRPC.BlockWithTxHashes`

#### Defined in

[src/types/api/rpc.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L37)

---

### GetBlockWithTxs

Ƭ **GetBlockWithTxs**: `OPENRPC.BlockWithTxs`

#### Defined in

[src/types/api/rpc.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L38)

---

### GetStorageAtResponse

Ƭ **GetStorageAtResponse**: `OPENRPC.Storage`

#### Defined in

[src/types/api/rpc.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L39)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: `OPENRPC.TransactionReceipt`

#### Defined in

[src/types/api/rpc.ts:40](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L40)

---

### GetTransactionByHashResponse

Ƭ **GetTransactionByHashResponse**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:41](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L41)

---

### GetTransactionByBlockIdAndIndex

Ƭ **GetTransactionByBlockIdAndIndex**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:42](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L42)

---

### GetTransactionCountResponse

Ƭ **GetTransactionCountResponse**: `number`

#### Defined in

[src/types/api/rpc.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L43)

---

### GetBlockNumberResponse

Ƭ **GetBlockNumberResponse**: `OPENRPC.BlockNumber`

#### Defined in

[src/types/api/rpc.ts:44](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L44)

---

### GetSyncingStatsResponse

Ƭ **GetSyncingStatsResponse**: `OPENRPC.SyncingStatus`

#### Defined in

[src/types/api/rpc.ts:45](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L45)

---

### EventFilter

Ƭ **EventFilter**: `OPENRPC.EventFilter`

#### Defined in

[src/types/api/rpc.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L46)

---

### GetEventsResponse

Ƭ **GetEventsResponse**: `OPENRPC.Events`

#### Defined in

[src/types/api/rpc.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L47)

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `OPENRPC.InvokedTransaction`

#### Defined in

[src/types/api/rpc.ts:48](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L48)

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `OPENRPC.DeclaredTransaction`

#### Defined in

[src/types/api/rpc.ts:49](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L49)

---

### DeployedTransaction

Ƭ **DeployedTransaction**: `OPENRPC.DeployedTransaction`

#### Defined in

[src/types/api/rpc.ts:50](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L50)

---

### SimulationFlags

Ƭ **SimulationFlags**: `OPENRPC.SimulationFlags`

#### Defined in

[src/types/api/rpc.ts:51](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L51)

---

### EstimatedFee

Ƭ **EstimatedFee**: `OPENRPC.EstimatedFee`

#### Defined in

[src/types/api/rpc.ts:52](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L52)

---

### Methods

Ƭ **Methods**: `OPENRPC.Methods`

#### Defined in

[src/types/api/rpc.ts:53](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L53)

---

### Storage

Ƭ **Storage**: `OPENRPC.Storage`

#### Defined in

[src/types/api/rpc.ts:54](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L54)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: `OPENRPC.SimulatedTransactions`

#### Defined in

[src/types/api/rpc.ts:55](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L55)

---

### BaseTransaction

Ƭ **BaseTransaction**: `OPENRPC.BaseTransaction` & { `version`: `string` }

#### Defined in

[src/types/api/rpc.ts:60](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L60)

---

### StorageDiffs

Ƭ **StorageDiffs**: `CONTRACT_STORAGE_DIFF_ITEM`[]

#### Defined in

[src/types/api/rpc.ts:63](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L63)

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: `FELT`[]

#### Defined in

[src/types/api/rpc.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L64)

---

### Nonces

Ƭ **Nonces**: { `contract_address`: `ADDRESS` ; `nonce`: `FELT` }[]

#### Defined in

[src/types/api/rpc.ts:65](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L65)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: { `contract_address`: `ADDRESS` ; `class_hash`: `FELT` }[]

#### Defined in

[src/types/api/rpc.ts:69](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L69)

## Variables

### TransactionType

• `Const` **TransactionType**: typeof `TXN_TYPE` = `TXN_TYPE`

#### Defined in

[src/types/api/rpc.ts:56](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L56)

---

### SimulationFlag

• `Const` **SimulationFlag**: typeof `SIMULATION_FLAG` = `SIMULATION_FLAG`

#### Defined in

[src/types/api/rpc.ts:57](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L57)

---

### TransactionFinalityStatus

• `Const` **TransactionFinalityStatus**: typeof `TXN_FINALITY_STATUS` = `TXN_FINALITY_STATUS`

#### Defined in

[src/types/api/rpc.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L58)

---

### TransactionExecutionStatus

• `Const` **TransactionExecutionStatus**: typeof `TXN_EXECUTION_STATUS` = `TXN_EXECUTION_STATUS`

#### Defined in

[src/types/api/rpc.ts:59](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/types/api/rpc.ts#L59)
