---
id: 'types.RPC'
title: 'Namespace: RPC'
sidebar_label: 'RPC'
custom_edit_url: null
---

[types](types.md).RPC

## Enumerations

- [TransactionType](../enums/types.RPC.TransactionType.md)

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

[src/types/api/rpc.ts:4](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L4)

---

### ChainId

Ƭ **ChainId**: `OPENRPC.CHAIN_ID`

#### Defined in

[src/types/api/rpc.ts:14](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L14)

---

### CallResponse

Ƭ **CallResponse**: `OPENRPC.CallResponse`

#### Defined in

[src/types/api/rpc.ts:15](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L15)

---

### ContractAddress

Ƭ **ContractAddress**: `ADDRESS`

#### Defined in

[src/types/api/rpc.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L16)

---

### Felt

Ƭ **Felt**: `FELT`

#### Defined in

[src/types/api/rpc.ts:17](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L17)

---

### Nonce

Ƭ **Nonce**: `OPENRPC.Nonce`

#### Defined in

[src/types/api/rpc.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L18)

---

### ContractClass

Ƭ **ContractClass**: `OPENRPC.ContractClass` \| `OPENRPC.DeprecatedContractClass`

#### Defined in

[src/types/api/rpc.ts:19](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L19)

---

### StateUpdate

Ƭ **StateUpdate**: `OPENRPC.StateUpdate`

#### Defined in

[src/types/api/rpc.ts:20](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L20)

---

### Transaction

Ƭ **Transaction**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L21)

---

### PendingTransactions

Ƭ **PendingTransactions**: `OPENRPC.PendingTransactions`

#### Defined in

[src/types/api/rpc.ts:22](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L22)

---

### TransactionHash

Ƭ **TransactionHash**: `OPENRPC.TransactionHash`

#### Defined in

[src/types/api/rpc.ts:23](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L23)

---

### Trace

Ƭ **Trace**: `OPENRPC.Trace`

#### Defined in

[src/types/api/rpc.ts:24](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L24)

---

### Traces

Ƭ **Traces**: `OPENRPC.Traces`

#### Defined in

[src/types/api/rpc.ts:25](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L25)

---

### BlockHash

Ƭ **BlockHash**: `OPENRPC.BlockHash`

#### Defined in

[src/types/api/rpc.ts:26](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L26)

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `OPENRPC.BlockHashAndNumber`

#### Defined in

[src/types/api/rpc.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L27)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: `OPENRPC.EstimatedFee`

#### Defined in

[src/types/api/rpc.ts:28](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L28)

---

### GetBlockWithTxHashesResponse

Ƭ **GetBlockWithTxHashesResponse**: `OPENRPC.BlockWithTxHashes`

#### Defined in

[src/types/api/rpc.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L29)

---

### GetBlockWithTxs

Ƭ **GetBlockWithTxs**: `OPENRPC.BlockWithTxs`

#### Defined in

[src/types/api/rpc.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L30)

---

### GetStorageAtResponse

Ƭ **GetStorageAtResponse**: `OPENRPC.Storage`

#### Defined in

[src/types/api/rpc.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L31)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: `OPENRPC.TransactionReceipt`

#### Defined in

[src/types/api/rpc.ts:32](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L32)

---

### GetTransactionByHashResponse

Ƭ **GetTransactionByHashResponse**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L33)

---

### GetTransactionByBlockIdAndIndex

Ƭ **GetTransactionByBlockIdAndIndex**: `OPENRPC.Transaction`

#### Defined in

[src/types/api/rpc.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L34)

---

### GetTransactionCountResponse

Ƭ **GetTransactionCountResponse**: `number`

#### Defined in

[src/types/api/rpc.ts:35](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L35)

---

### GetBlockNumberResponse

Ƭ **GetBlockNumberResponse**: `OPENRPC.BlockNumber`

#### Defined in

[src/types/api/rpc.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L36)

---

### GetSyncingStatsResponse

Ƭ **GetSyncingStatsResponse**: `OPENRPC.SyncingStatus`

#### Defined in

[src/types/api/rpc.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L37)

---

### EventFilter

Ƭ **EventFilter**: `OPENRPC.EventFilter`

#### Defined in

[src/types/api/rpc.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L38)

---

### GetEventsResponse

Ƭ **GetEventsResponse**: `OPENRPC.Events`

#### Defined in

[src/types/api/rpc.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L39)

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `OPENRPC.InvokedTransaction`

#### Defined in

[src/types/api/rpc.ts:40](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L40)

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `OPENRPC.DeclaredTransaction`

#### Defined in

[src/types/api/rpc.ts:41](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L41)

---

### DeployedTransaction

Ƭ **DeployedTransaction**: `OPENRPC.DeployedTransaction`

#### Defined in

[src/types/api/rpc.ts:42](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L42)

---

### SimulationFlags

Ƭ **SimulationFlags**: `OPENRPC.SimulationFlags`

#### Defined in

[src/types/api/rpc.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L43)

---

### BroadcastedTransaction

Ƭ **BroadcastedTransaction**: `OPENRPC.BroadcastedTransaction`

#### Defined in

[src/types/api/rpc.ts:44](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L44)

---

### EstimatedFee

Ƭ **EstimatedFee**: `OPENRPC.EstimatedFee`

#### Defined in

[src/types/api/rpc.ts:45](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L45)

---

### Methods

Ƭ **Methods**: `OPENRPC.Methods`

#### Defined in

[src/types/api/rpc.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L46)

---

### Storage

Ƭ **Storage**: `OPENRPC.Storage`

#### Defined in

[src/types/api/rpc.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L47)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: `OPENRPC.SimulatedTransactions`

#### Defined in

[src/types/api/rpc.ts:48](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L48)

---

### StorageDiffs

Ƭ **StorageDiffs**: `CONTRACT_STORAGE_DIFF_ITEM`[]

#### Defined in

[src/types/api/rpc.ts:59](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L59)

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: `FELT`[]

#### Defined in

[src/types/api/rpc.ts:60](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L60)

---

### Nonces

Ƭ **Nonces**: { `contract_address`: `ADDRESS` ; `nonce`: `FELT` }[]

#### Defined in

[src/types/api/rpc.ts:61](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L61)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: { `contract_address`: `ADDRESS` ; `class_hash`: `FELT` }[]

#### Defined in

[src/types/api/rpc.ts:65](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/types/api/rpc.ts#L65)
