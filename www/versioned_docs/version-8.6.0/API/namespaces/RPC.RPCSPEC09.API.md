---
id: 'RPC.RPCSPEC09.API'
title: 'Namespace: API'
sidebar_label: 'API'
custom_edit_url: null
---

[RPC](RPC.md).[RPCSPEC09](RPC.RPCSPEC09.md).API

## Namespaces

- [CONTRACT](RPC.RPCSPEC09.API.CONTRACT.md)

## Interfaces

- [FAILED_TO_RECEIVE_TXN](../interfaces/RPC.RPCSPEC09.API.FAILED_TO_RECEIVE_TXN.md)
- [NO_TRACE_AVAILABLE](../interfaces/RPC.RPCSPEC09.API.NO_TRACE_AVAILABLE.md)
- [CONTRACT_NOT_FOUND](../interfaces/RPC.RPCSPEC09.API.CONTRACT_NOT_FOUND.md)
- [ENTRYPOINT_NOT_FOUND](../interfaces/RPC.RPCSPEC09.API.ENTRYPOINT_NOT_FOUND.md)
- [BLOCK_NOT_FOUND](../interfaces/RPC.RPCSPEC09.API.BLOCK_NOT_FOUND.md)
- [INVALID_TXN_INDEX](../interfaces/RPC.RPCSPEC09.API.INVALID_TXN_INDEX.md)
- [CLASS_HASH_NOT_FOUND](../interfaces/RPC.RPCSPEC09.API.CLASS_HASH_NOT_FOUND.md)
- [TXN_HASH_NOT_FOUND](../interfaces/RPC.RPCSPEC09.API.TXN_HASH_NOT_FOUND.md)
- [PAGE_SIZE_TOO_BIG](../interfaces/RPC.RPCSPEC09.API.PAGE_SIZE_TOO_BIG.md)
- [NO_BLOCKS](../interfaces/RPC.RPCSPEC09.API.NO_BLOCKS.md)
- [INVALID_CONTINUATION_TOKEN](../interfaces/RPC.RPCSPEC09.API.INVALID_CONTINUATION_TOKEN.md)
- [TOO_MANY_KEYS_IN_FILTER](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_KEYS_IN_FILTER.md)
- [CONTRACT_ERROR](../interfaces/RPC.RPCSPEC09.API.CONTRACT_ERROR.md)
- [TRANSACTION_EXECUTION_ERROR](../interfaces/RPC.RPCSPEC09.API.TRANSACTION_EXECUTION_ERROR.md)
- [STORAGE_PROOF_NOT_SUPPORTED](../interfaces/RPC.RPCSPEC09.API.STORAGE_PROOF_NOT_SUPPORTED.md)
- [CLASS_ALREADY_DECLARED](../interfaces/RPC.RPCSPEC09.API.CLASS_ALREADY_DECLARED.md)
- [INVALID_TRANSACTION_NONCE](../interfaces/RPC.RPCSPEC09.API.INVALID_TRANSACTION_NONCE.md)
- [INSUFFICIENT_RESOURCES_FOR_VALIDATE](../interfaces/RPC.RPCSPEC09.API.INSUFFICIENT_RESOURCES_FOR_VALIDATE.md)
- [INSUFFICIENT_ACCOUNT_BALANCE](../interfaces/RPC.RPCSPEC09.API.INSUFFICIENT_ACCOUNT_BALANCE.md)
- [VALIDATION_FAILURE](../interfaces/RPC.RPCSPEC09.API.VALIDATION_FAILURE.md)
- [COMPILATION_FAILED](../interfaces/RPC.RPCSPEC09.API.COMPILATION_FAILED.md)
- [CONTRACT_CLASS_SIZE_IS_TOO_LARGE](../interfaces/RPC.RPCSPEC09.API.CONTRACT_CLASS_SIZE_IS_TOO_LARGE.md)
- [NON_ACCOUNT](../interfaces/RPC.RPCSPEC09.API.NON_ACCOUNT.md)
- [DUPLICATE_TX](../interfaces/RPC.RPCSPEC09.API.DUPLICATE_TX.md)
- [COMPILED_CLASS_HASH_MISMATCH](../interfaces/RPC.RPCSPEC09.API.COMPILED_CLASS_HASH_MISMATCH.md)
- [UNSUPPORTED_TX_VERSION](../interfaces/RPC.RPCSPEC09.API.UNSUPPORTED_TX_VERSION.md)
- [UNSUPPORTED_CONTRACT_CLASS_VERSION](../interfaces/RPC.RPCSPEC09.API.UNSUPPORTED_CONTRACT_CLASS_VERSION.md)
- [UNEXPECTED_ERROR](../interfaces/RPC.RPCSPEC09.API.UNEXPECTED_ERROR.md)
- [REPLACEMENT_TRANSACTION_UNDERPRICED](../interfaces/RPC.RPCSPEC09.API.REPLACEMENT_TRANSACTION_UNDERPRICED.md)
- [FEE_BELOW_MINIMUM](../interfaces/RPC.RPCSPEC09.API.FEE_BELOW_MINIMUM.md)
- [INVALID_SUBSCRIPTION_ID](../interfaces/RPC.RPCSPEC09.API.INVALID_SUBSCRIPTION_ID.md)
- [TOO_MANY_ADDRESSES_IN_FILTER](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_ADDRESSES_IN_FILTER.md)
- [TOO_MANY_BLOCKS_BACK](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_BLOCKS_BACK.md)
- [COMPILATION_ERROR](../interfaces/RPC.RPCSPEC09.API.COMPILATION_ERROR.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods` & `TraceMethods`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/methods.d.ts:6

---

### WebSocketMethods

Ƭ **WebSocketMethods**: `Object`

#### Type declaration

| Name                                                               | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Description                                                                                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `starknet_subscribeNewHeads`                                       | \{ `params`: \{ `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id) } ; `result`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) ; `errors`: [`TOO_MANY_BLOCKS_BACK`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/RPC.RPCSPEC09.API.BLOCK_NOT_FOUND.md) ; `events`: [[`NewHeadsEvent`](RPC.RPCSPEC09.API.md#newheadsevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)] }                                                                                                                                                                                                                                                                                                                                                                                                           | New block headers subscription. Creates a WebSocket stream which will fire events for new block headers.                                                                                                                                                                                                         |
| `starknet_subscribeNewHeads.params`                                | \{ `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.params.block_id?`                      | [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The block to get notifications from, default is latest, limited to 1024 blocks back                                                                                                                                                                                                                              |
| `starknet_subscribeNewHeads.result`                                | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.errors`                                | [`TOO_MANY_BLOCKS_BACK`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/RPC.RPCSPEC09.API.BLOCK_NOT_FOUND.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.events`                                | [[`NewHeadsEvent`](RPC.RPCSPEC09.API.md#newheadsevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | starknet_subscriptionNewHeads starknet_subscriptionReorg                                                                                                                                                                                                                                                         |
| `starknet_subscribeEvents`                                         | \{ `params`: \{ `from_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address) ; `keys?`: [`EVENT_KEYS`](RPC.RPCSPEC09.API.md#event_keys) ; `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id) ; `finality_status?`: `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\> } ; `result`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) ; `errors`: [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_KEYS_IN_FILTER.md) \| [`TOO_MANY_BLOCKS_BACK`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/RPC.RPCSPEC09.API.BLOCK_NOT_FOUND.md) ; `events`: [[`StarknetEventsEvent`](RPC.RPCSPEC09.API.md#starkneteventsevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)] } | New events subscription. Creates a WebSocket stream which will fire events for new Starknet events from the specified block_id, up to the latest block.                                                                                                                                                          |
| `starknet_subscribeEvents.params`                                  | \{ `from_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address) ; `keys?`: [`EVENT_KEYS`](RPC.RPCSPEC09.API.md#event_keys) ; `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id) ; `finality_status?`: `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\> }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeEvents.params.from_address?`                    | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Filter events by from_address which emitted the event                                                                                                                                                                                                                                                            |
| `starknet_subscribeEvents.params.keys?`                            | [`EVENT_KEYS`](RPC.RPCSPEC09.API.md#event_keys)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | The keys to filter events by. If not provided, all events will be returned.                                                                                                                                                                                                                                      |
| `starknet_subscribeEvents.params.block_id?`                        | [`SUBSCRIPTION_BLOCK_ID`](RPC.RPCSPEC09.API.md#subscription_block_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The block to get notifications from, default is latest, limited to 1024 blocks back                                                                                                                                                                                                                              |
| `starknet_subscribeEvents.params.finality_status?`                 | `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The finality status of the most recent events to include, default is ACCEPTED_ON_L2                                                                                                                                                                                                                              |
| `starknet_subscribeEvents.result`                                  | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeEvents.errors`                                  | [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_KEYS_IN_FILTER.md) \| [`TOO_MANY_BLOCKS_BACK`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/RPC.RPCSPEC09.API.BLOCK_NOT_FOUND.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeEvents.events`                                  | [[`StarknetEventsEvent`](RPC.RPCSPEC09.API.md#starkneteventsevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | starknet_subscriptionEvents starknet_subscriptionReorg                                                                                                                                                                                                                                                           |
| `starknet_subscribeTransactionStatus`                              | \{ `params`: \{ `transaction_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) } ; `result`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) ; `events`: [[`TransactionsStatusEvent`](RPC.RPCSPEC09.API.md#transactionsstatusevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | New transaction status subscription. Creates a WebSocket stream which at first fires an event with the current known transaction status, followed by events for every transaction status update                                                                                                                  |
| `starknet_subscribeTransactionStatus.params`                       | \{ `transaction_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.params.transaction_hash`      | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.result`                       | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.events`                       | [[`TransactionsStatusEvent`](RPC.RPCSPEC09.API.md#transactionsstatusevent), [`ReorgEvent`](RPC.RPCSPEC09.API.md#reorgevent)]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | starknet_subscriptionTransactionStatus starknet_subscriptionReorg                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactionReceipts`                         | \{ `params`: \{ `finality_status?`: `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\>[] ; `sender_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[] } ; `result`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) ; `errors`: [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_ADDRESSES_IN_FILTER.md) ; `events`: [[`NewTransactionReceiptsEvent`](RPC.RPCSPEC09.API.md#newtransactionreceiptsevent)] }                                                                                                                                                                                                                                                                                                                                  | Creates a WebSocket stream which will fire events when new transaction receipts are created. The endpoint receives a vector of finality statuses. An event is fired for each finality status update. It is possible for receipts for pre-confirmed transactions to be received multiple times, or not at all.    |
| `starknet_subscribeNewTransactionReceipts.params`                  | \{ `finality_status?`: `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\>[] ; `sender_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactionReceipts.params.finality_status?` | `Exclude`<[`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\>[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | A vector of finality statuses to receive updates for, default is [ACCEPTED_ON_L2]                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactionReceipts.params.sender_address?`  | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Filter transaction receipts to only include transactions sent by the specified addresses                                                                                                                                                                                                                         |
| `starknet_subscribeNewTransactionReceipts.result`                  | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactionReceipts.errors`                  | [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/RPC.RPCSPEC09.API.TOO_MANY_ADDRESSES_IN_FILTER.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactionReceipts.events`                  | [[`NewTransactionReceiptsEvent`](RPC.RPCSPEC09.API.md#newtransactionreceiptsevent)]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | starknet_subscriptionNewTransactionReceipts                                                                                                                                                                                                                                                                      |
| `starknet_subscribeNewTransactions`                                | \{ `params`: \{ `finality_status?`: [`TXN_STATUS_WITHOUT_L1`](RPC.RPCSPEC09.API.md#txn_status_without_l1)[] ; `sender_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[] } ; `result`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) ; `events`: [[`NewTransactionEvent`](RPC.RPCSPEC09.API.md#newtransactionevent)] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Creates a WebSocket stream which will fire events when new transaction are created. The endpoint receives a vector of finality statuses. An event is fired for each finality status update. It is possible for events for pre-confirmed and candidate transactions to be received multiple times, or not at all. |
| `starknet_subscribeNewTransactions.params`                         | \{ `finality_status?`: [`TXN_STATUS_WITHOUT_L1`](RPC.RPCSPEC09.API.md#txn_status_without_l1)[] ; `sender_address?`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactions.params.finality_status?`        | [`TXN_STATUS_WITHOUT_L1`](RPC.RPCSPEC09.API.md#txn_status_without_l1)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | A vector of finality statuses to receive updates for, default is [ACCEPTED_ON_L2]                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactions.params.sender_address?`         | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Filter to only include transactions sent by the specified addresses                                                                                                                                                                                                                                              |
| `starknet_subscribeNewTransactions.result`                         | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_subscribeNewTransactions.events`                         | [[`NewTransactionEvent`](RPC.RPCSPEC09.API.md#newtransactionevent)]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | starknet_subscriptionNewTransaction                                                                                                                                                                                                                                                                              |
| `starknet_unsubscribe`                                             | \{ `params`: \{ `subscription_id`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) } ; `result`: `Boolean` ; `errors`: [`INVALID_SUBSCRIPTION_ID`](../interfaces/RPC.RPCSPEC09.API.INVALID_SUBSCRIPTION_ID.md) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Close a previously opened ws stream, with the corresponding subscription id                                                                                                                                                                                                                                      |
| `starknet_unsubscribe.params`                                      | \{ `subscription_id`: [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | -                                                                                                                                                                                                                                                                                                                |
| `starknet_unsubscribe.params.subscription_id`                      | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_unsubscribe.result`                                      | `Boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                                                                                                                |
| `starknet_unsubscribe.errors`                                      | [`INVALID_SUBSCRIPTION_ID`](../interfaces/RPC.RPCSPEC09.API.INVALID_SUBSCRIPTION_ID.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                                                                                                                |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/methods.d.ts:281

---

### FELT

Ƭ **FELT**: `string`

A field element. represented by at most 63 hex digits

**`Pattern`**

^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:7

---

### ETH_ADDRESS

Ƭ **ETH_ADDRESS**: `string`

an ethereum address represented as 40 hex digits

**`Pattern`**

^0x[a-fA-F0-9]{40}$

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:12

---

### STORAGE_KEY

Ƭ **STORAGE_KEY**: `string`

A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.

**`Pattern`**

^0x(0|[0-7]{1}[a-fA-F0-9]{0,62}$)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:17

---

### ADDRESS

Ƭ **ADDRESS**: [`FELT`](RPC.RPCSPEC09.API.md#felt)

A contract address on Starknet

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:21

---

### NUM_AS_HEX

Ƭ **NUM_AS_HEX**: `string`

string representing an unsigned integer number in prefixed hexadecimal format

**`Example`**

```ts
'0x..';
```

**`Pattern`**

^0x[a-fA-F0-9]+$

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:27

---

### u64

Ƭ **u64**: `string`

64 bit unsigned integers, represented by hex string of length at most 16
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$"

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:32

---

### u128

Ƭ **u128**: `string`

128 bit unsigned integers, represented by hex string of length at most 32
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$"

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:37

---

### SIGNATURE

Ƭ **SIGNATURE**: [`FELT`](RPC.RPCSPEC09.API.md#felt)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:38

---

### BLOCK_NUMBER

Ƭ **BLOCK_NUMBER**: `number`

**`Minimum`**

0

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:42

---

### BLOCK_HASH

Ƭ **BLOCK_HASH**: [`FELT`](RPC.RPCSPEC09.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:43

---

### TXN_HASH

Ƭ **TXN_HASH**: [`FELT`](RPC.RPCSPEC09.API.md#felt)

The hash of an Starknet transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:47

---

### L1_TXN_HASH

Ƭ **L1_TXN_HASH**: [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex)

The hash of an Ethereum transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:51

---

### CHAIN_ID

Ƭ **CHAIN_ID**: [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:52

---

### STATE_MUTABILITY

Ƭ **STATE_MUTABILITY**: [`STATE_MUTABILITY_VIEW`](RPC.RPCSPEC09.API.md#state_mutability_view) \| [`STATE_MUTABILITY_EXTERNAL`](RPC.RPCSPEC09.API.md#state_mutability_external)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:53

---

### FUNCTION_ABI_TYPE

Ƭ **FUNCTION_ABI_TYPE**: [`ABI_TYPE_FUNCTION`](RPC.RPCSPEC09.API.md#abi_type_function) \| [`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler) \| [`ABI_TYPE_CONSTRUCTOR`](RPC.RPCSPEC09.API.md#abi_type_constructor)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:54

---

### ABI_NAME_AND_TYPE

Ƭ **ABI_NAME_AND_TYPE**: `Object`

common definition

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |
| `type` | `string` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:58

---

### ABI_TYPE

Ƭ **ABI_TYPE**: `Object`

common outputs

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:65

---

### ENTRY_POINT_TYPE

Ƭ **ENTRY_POINT_TYPE**: `Uppercase`<[`STATE_MUTABILITY_EXTERNAL`](RPC.RPCSPEC09.API.md#state_mutability_external)\> \| `Uppercase`<[`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler)\> \| `Uppercase`<[`ABI_TYPE_CONSTRUCTOR`](RPC.RPCSPEC09.API.md#abi_type_constructor)\>

Represents the type of an entry point.

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:71

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: typeof [`SKIP_VALIDATE`](RPC.RPCSPEC09.API.md#skip_validate) \| typeof [`SKIP_FEE_CHARGE`](RPC.RPCSPEC09.API.md#skip_fee_charge)

Flags that indicate how to simulate a given transaction. By default, the sequencer behavior is replicated locally (enough funds are expected to be in the account, and the fee will be deducted from the balance before the simulation of the next transaction). To skip the fee charge, use the SKIP_FEE_CHARGE flag.

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:75

---

### DA_MODE

Ƭ **DA_MODE**: [`EDataAvailabilityMode`](RPC.RPCSPEC09.API.md#edataavailabilitymode)

Data availability mode.
Specifies a storage domain in Starknet. Each domain has different guarantees regarding availability

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:80

---

### TXN_TYPE

Ƭ **TXN_TYPE**: [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare) \| [`TXN_TYPE_DEPLOY`](RPC.RPCSPEC09.API.md#txn_type_deploy) \| [`TXN_TYPE_DEPLOY_ACCOUNT`](RPC.RPCSPEC09.API.md#txn_type_deploy_account) \| [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke) \| `Uppercase`<[`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler)\>

The type of the transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:84

---

### TXN_STATUS

Ƭ **TXN_STATUS**: [`STATUS_RECEIVED`](RPC.RPCSPEC09.API.md#status_received) \| [`STATUS_CANDIDATE`](RPC.RPCSPEC09.API.md#status_candidate) \| [`STATUS_PRE_CONFIRMED`](RPC.RPCSPEC09.API.md#status_pre_confirmed) \| [`STATUS_ACCEPTED_ON_L2`](RPC.RPCSPEC09.API.md#status_accepted_on_l2) \| [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)

Represents the finality status of the transaction, including the case the txn is still in the mempool or failed validation during the block construction phase

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:88

---

### TXN_FINALITY_STATUS

Ƭ **TXN_FINALITY_STATUS**: [`STATUS_PRE_CONFIRMED`](RPC.RPCSPEC09.API.md#status_pre_confirmed) \| [`STATUS_ACCEPTED_ON_L2`](RPC.RPCSPEC09.API.md#status_accepted_on_l2) \| [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)

The finality status of the transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:92

---

### TXN_EXECUTION_STATUS

Ƭ **TXN_EXECUTION_STATUS**: [`STATUS_SUCCEEDED`](RPC.RPCSPEC09.API.md#status_succeeded) \| [`STATUS_REVERTED`](RPC.RPCSPEC09.API.md#status_reverted)

The execution status of the transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:96

---

### BLOCK_STATUS

Ƭ **BLOCK_STATUS**: [`EBlockStatus`](RPC.RPCSPEC09.API.md#eblockstatus)

The status of the block

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:100

---

### BLOCK_ID

Ƭ **BLOCK_ID**: [`BLOCK_SELECTOR`](RPC.RPCSPEC09.API.md#block_selector) \| [`BLOCK_TAG`](RPC.RPCSPEC09.API.md#block_tag)

A block identifier that can be either a block hash, block number, or a block tag

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:104

---

### BLOCK_SELECTOR

Ƭ **BLOCK_SELECTOR**: `SimpleOneOf`<\{ `block_hash`: [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash) }, \{ `block_number`: [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) }\>

A block selector that can be either a block hash or block number

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:108

---

### BLOCK_TAG

Ƭ **BLOCK_TAG**: [`EBlockTag`](RPC.RPCSPEC09.API.md#eblocktag)

A tag specifying a dynamic reference to a block.
Tag `l1_accepted` refers to the latest Starknet block which was included in a state update on L1 and finalized by the consensus on L1.
Tag `latest` refers to the latest Starknet block finalized by the consensus on L2.
Tag `pre_confirmed` refers to the block which is currently being built by the block proposer in height `latest` + 1.

**`See`**

EBlockTag

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:120

---

### TXN_STATUS_WITHOUT_L1

Ƭ **TXN_STATUS_WITHOUT_L1**: `Exclude`<[`TXN_STATUS`](RPC.RPCSPEC09.API.md#txn_status), [`STATUS_ACCEPTED_ON_L1`](RPC.RPCSPEC09.API.md#status_accepted_on_l1)\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:121

---

### SUBSCRIPTION_ID

Ƭ **SUBSCRIPTION_ID**: `string`

An identifier for this subscription stream used to associate events with this subscription.
Integer

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:126

---

### NEW_TXN_STATUS

Ƭ **NEW_TXN_STATUS**: `Object`

#### Type declaration

| Name               | Type                                                          |
| :----------------- | :------------------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash)                   |
| `status`           | [`TXN_STATUS_RESULT`](RPC.RPCSPEC09.API.md#txn_status_result) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:127

---

### REORG_DATA

Ƭ **REORG_DATA**: `Object`

Data about reorganized blocks, starting and ending block number and hash

#### Type declaration

| Name                    | Type                                                | Description                                           |
| :---------------------- | :-------------------------------------------------- | :---------------------------------------------------- |
| `starting_block_hash`   | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     | Hash of the first known block of the orphaned chain   |
| `starting_block_number` | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) | Number of the first known block of the orphaned chain |
| `ending_block_hash`     | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     | The last known block of the orphaned chain            |
| `ending_block_number`   | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) | Number of the last known block of the orphaned chain  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:134

---

### NewHeadsEvent

Ƭ **NewHeadsEvent**: `Object`

#### Type declaration

| Name              | Type                                                      |
| :---------------- | :-------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) |
| `result`          | [`BLOCK_HEADER`](RPC.RPCSPEC09.API.md#block_header)       |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:152

---

### StarknetEventsEvent

Ƭ **StarknetEventsEvent**: `Object`

Notification to the client of a new event. The event also includes the finality status of the transaction emitting the event

#### Type declaration

| Name              | Type                                                                                                                                              |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                         |
| `result`          | [`EMITTED_EVENT`](RPC.RPCSPEC09.API.md#emitted_event) & \{ `finality_status`: [`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status) } |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:159

---

### TransactionsStatusEvent

Ƭ **TransactionsStatusEvent**: `Object`

Notification to the client of a new transaction status update

#### Type declaration

| Name              | Type                                                      | Description                                                                        |
| :---------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) | -                                                                                  |
| `result`          | [`NEW_TXN_STATUS`](RPC.RPCSPEC09.API.md#new_txn_status)   | Transaction status result, including tx hash, finality status and execution status |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:168

---

### NewTransactionReceiptsEvent

Ƭ **NewTransactionReceiptsEvent**: `Object`

#### Type declaration

| Name              | Type                                                                              |
| :---------------- | :-------------------------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                         |
| `result`          | [`TXN_RECEIPT_WITH_BLOCK_INFO`](RPC.RPCSPEC09.API.md#txn_receipt_with_block_info) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:175

---

### NewTransactionEvent

Ƭ **NewTransactionEvent**: `Object`

Notification to the client of a new transaction, with its current finality status

#### Type declaration

| Name              | Type                                                                                                                                                  | Description                                   |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id)                                                                                             | -                                             |
| `result`          | [`TXN_WITH_HASH`](RPC.RPCSPEC09.API.md#txn_with_hash) & \{ `finality_status`: [`TXN_STATUS_WITHOUT_L1`](RPC.RPCSPEC09.API.md#txn_status_without_l1) } | A transaction and its current finality status |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:182

---

### ReorgEvent

Ƭ **ReorgEvent**: `Object`

#### Type declaration

| Name              | Type                                                      |
| :---------------- | :-------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](RPC.RPCSPEC09.API.md#subscription_id) |
| `result`          | [`REORG_DATA`](RPC.RPCSPEC09.API.md#reorg_data)           |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:191

---

### EVENTS_CHUNK

Ƭ **EVENTS_CHUNK**: `Object`

#### Type declaration

| Name                  | Type                                                    | Description                                                                                                 |
| :-------------------- | :------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `events`              | [`EMITTED_EVENT`](RPC.RPCSPEC09.API.md#emitted_event)[] | Returns matching events                                                                                     |
| `continuation_token?` | `string`                                                | Use this token in a subsequent query to obtain the next page. Should not appear if there are no more pages. |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:195

---

### RESULT_PAGE_REQUEST

Ƭ **RESULT_PAGE_REQUEST**: `Object`

#### Type declaration

| Name                  | Type     | Description                                                                                     |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `continuation_token?` | `string` | The token returned from the previous query. If no token is provided the first page is returned. |
| `chunk_size`          | `number` | Chunk size                                                                                      |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:205

---

### EMITTED_EVENT

Ƭ **EMITTED_EVENT**: [`EVENT`](RPC.RPCSPEC09.API.md#event) & \{ `block_hash`: [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash) ; `block_number`: [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) ; `transaction_hash`: [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:215

---

### EVENT

Ƭ **EVENT**: \{ `from_address`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address) } & [`EVENT_CONTENT`](RPC.RPCSPEC09.API.md#event_content)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:220

---

### EVENT_CONTENT

Ƭ **EVENT_CONTENT**: `Object`

#### Type declaration

| Name   | Type                                  |
| :----- | :------------------------------------ |
| `keys` | [`FELT`](RPC.RPCSPEC09.API.md#felt)[] |
| `data` | [`FELT`](RPC.RPCSPEC09.API.md#felt)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:223

---

### EVENT_KEYS

Ƭ **EVENT_KEYS**: [`FELT`](RPC.RPCSPEC09.API.md#felt)[][]

The keys to filter over.
Per key (by position), designate the possible values to be matched for events to be returned. Empty array designates 'any' value.

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:231

---

### EVENT_FILTER

Ƭ **EVENT_FILTER**: `Object`

#### Type declaration

| Name          | Type                                            |
| :------------ | :---------------------------------------------- |
| `from_block?` | [`BLOCK_ID`](RPC.RPCSPEC09.API.md#block_id)     |
| `to_block?`   | [`BLOCK_ID`](RPC.RPCSPEC09.API.md#block_id)     |
| `address?`    | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)       |
| `keys?`       | [`EVENT_KEYS`](RPC.RPCSPEC09.API.md#event_keys) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:232

---

### SUBSCRIPTION_BLOCK_ID

Ƭ **SUBSCRIPTION_BLOCK_ID**: `Exclude`<[`BLOCK_ID`](RPC.RPCSPEC09.API.md#block_id), `"pre_confirmed"` \| `"l1_accepted"`\>

same as BLOCK_ID, but without 'pre_confirmed' and 'l1_accepted'

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:241

---

### SYNC_STATUS

Ƭ **SYNC_STATUS**: `Object`

An object describing the node synchronization status

#### Type declaration

| Name                  | Type                                                |
| :-------------------- | :-------------------------------------------------- |
| `starting_block_hash` | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     |
| `starting_block_num`  | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) |
| `current_block_hash`  | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     |
| `current_block_num`   | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) |
| `highest_block_hash`  | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     |
| `highest_block_num`   | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:245

---

### NEW_CLASSES

Ƭ **NEW_CLASSES**: `Object`

The declared class hash and compiled class hash

#### Type declaration

| Name                  | Type                                |
| :-------------------- | :---------------------------------- |
| `class_hash`          | [`FELT`](RPC.RPCSPEC09.API.md#felt) |
| `compiled_class_hash` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:256

---

### REPLACED_CLASS

Ƭ **REPLACED_CLASS**: `Object`

The list of contracts whose class was replaced

#### Type declaration

| Name               | Type                                |
| :----------------- | :---------------------------------- |
| `class_hash`       | [`FELT`](RPC.RPCSPEC09.API.md#felt) |
| `contract_address` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:263

---

### NONCE_UPDATE

Ƭ **NONCE_UPDATE**: `Object`

The updated nonce per contract address

#### Type declaration

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `contract_address` | [`ADDRESS`](RPC.RPCSPEC09.API.md#address) |
| `nonce`            | [`FELT`](RPC.RPCSPEC09.API.md#felt)       |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:270

---

### STATE_DIFF

Ƭ **STATE_DIFF**: `Object`

The change in state applied in this block

#### Type declaration

| Name                          | Type                                                                              |
| :---------------------------- | :-------------------------------------------------------------------------------- |
| `storage_diffs`               | [`CONTRACT_STORAGE_DIFF_ITEM`](RPC.RPCSPEC09.API.md#contract_storage_diff_item)[] |
| `deprecated_declared_classes` | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                             |
| `declared_classes`            | [`NEW_CLASSES`](RPC.RPCSPEC09.API.md#new_classes)[]                               |
| `deployed_contracts`          | [`DEPLOYED_CONTRACT_ITEM`](RPC.RPCSPEC09.API.md#deployed_contract_item)[]         |
| `replaced_classes`            | [`REPLACED_CLASS`](RPC.RPCSPEC09.API.md#replaced_class)[]                         |
| `nonces`                      | [`NONCE_UPDATE`](RPC.RPCSPEC09.API.md#nonce_update)[]                             |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:277

---

### PRE_CONFIRMED_STATE_UPDATE

Ƭ **PRE_CONFIRMED_STATE_UPDATE**: `Object`

Pre-confirmed block state update

#### Type declaration

| Name         | Type                                            |
| :----------- | :---------------------------------------------- |
| `old_root`   | [`FELT`](RPC.RPCSPEC09.API.md#felt)             |
| `state_diff` | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff) |
| `block_hash` | `never`                                         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:288

---

### STATE_UPDATE

Ƭ **STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                            |
| :----------- | :---------------------------------------------- |
| `block_hash` | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash) |
| `old_root`   | [`FELT`](RPC.RPCSPEC09.API.md#felt)             |
| `new_root`   | [`FELT`](RPC.RPCSPEC09.API.md#felt)             |
| `state_diff` | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:293

---

### BLOCK_BODY_WITH_TX_HASHES

Ƭ **BLOCK_BODY_WITH_TX_HASHES**: `Object`

#### Type declaration

| Name           | Type                                          |
| :------------- | :-------------------------------------------- |
| `transactions` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:299

---

### BLOCK_BODY_WITH_TXS

Ƭ **BLOCK_BODY_WITH_TXS**: `Object`

#### Type declaration

| Name           | Type                                                    |
| :------------- | :------------------------------------------------------ |
| `transactions` | [`TXN_WITH_HASH`](RPC.RPCSPEC09.API.md#txn_with_hash)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:302

---

### BLOCK_BODY_WITH_RECEIPTS

Ƭ **BLOCK_BODY_WITH_RECEIPTS**: `Object`

#### Type declaration

| Name           | Type                                                                                                                   |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `transactions` | \{ `transaction`: [`TXN`](RPC.RPCSPEC09.API.md#txn) ; `receipt`: [`TXN_RECEIPT`](RPC.RPCSPEC09.API.md#txn_receipt) }[] |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:305

---

### BLOCK_HEADER

Ƭ **BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `block_hash`        | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)         |
| `parent_hash`       | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)         |
| `block_number`      | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number)     |
| `new_root`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                     |
| `timestamp`         | `number`                                                |
| `sequencer_address` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) |
| `l2_gas_price`      | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) |
| `l1_da_mode`        | [`L1_DA_MODE`](RPC.RPCSPEC09.API.md#l1_da_mode)         |
| `starknet_version`  | `string`                                                |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:311

---

### PRE_CONFIRMED_BLOCK_HEADER

Ƭ **PRE_CONFIRMED_BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                    | Description                                                                                                                                                               |
| :------------------ | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `block_number`      | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number)     | The block number of the block that the proposer is currently building. Note that this is a local view of the node, whose accuracy depends on its polling interval length. |
| `timestamp`         | `number`                                                | The time in which the block was created, encoded in Unix time                                                                                                             |
| `sequencer_address` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                     | The StarkNet identity of the sequencer submitting this block                                                                                                              |
| `l1_gas_price`      | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) | The price of l1 gas in the block                                                                                                                                          |
| `l2_gas_price`      | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) | The price of l2 gas in the block                                                                                                                                          |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](RPC.RPCSPEC09.API.md#resource_price) | The price of l1 data gas in the block                                                                                                                                     |
| `l1_da_mode`        | [`L1_DA_MODE`](RPC.RPCSPEC09.API.md#l1_da_mode)         | specifies whether the data of this block is published via blob data or calldata                                                                                           |
| `starknet_version`  | `string`                                                | Semver of the current Starknet protocol                                                                                                                                   |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:324

---

### BLOCK_WITH_TX_HASHES

Ƭ **BLOCK_WITH_TX_HASHES**: \{ `status`: [`BLOCK_STATUS`](RPC.RPCSPEC09.API.md#block_status) } & [`BLOCK_HEADER`](RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](RPC.RPCSPEC09.API.md#block_body_with_tx_hashes)

A block with transaction hashes

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:361

---

### BLOCK_WITH_TXS

Ƭ **BLOCK_WITH_TXS**: \{ `status`: [`BLOCK_STATUS`](RPC.RPCSPEC09.API.md#block_status) } & [`BLOCK_HEADER`](RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](RPC.RPCSPEC09.API.md#block_body_with_txs)

A block with full transactions

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:367

---

### BLOCK_WITH_RECEIPTS

Ƭ **BLOCK_WITH_RECEIPTS**: \{ `status`: [`BLOCK_STATUS`](RPC.RPCSPEC09.API.md#block_status) } & [`BLOCK_HEADER`](RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](RPC.RPCSPEC09.API.md#block_body_with_receipts)

A block with full transactions and receipts

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:373

---

### PRE_CONFIRMED_BLOCK_WITH_TX_HASHES

Ƭ **PRE_CONFIRMED_BLOCK_WITH_TX_HASHES**: [`BLOCK_BODY_WITH_TX_HASHES`](RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](RPC.RPCSPEC09.API.md#pre_confirmed_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:376

---

### PRE_CONFIRMED_BLOCK_WITH_TXS

Ƭ **PRE_CONFIRMED_BLOCK_WITH_TXS**: [`BLOCK_BODY_WITH_TXS`](RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](RPC.RPCSPEC09.API.md#pre_confirmed_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:377

---

### PRE_CONFIRMED_BLOCK_WITH_RECEIPTS

Ƭ **PRE_CONFIRMED_BLOCK_WITH_RECEIPTS**: [`BLOCK_BODY_WITH_RECEIPTS`](RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](RPC.RPCSPEC09.API.md#pre_confirmed_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:378

---

### DEPLOYED_CONTRACT_ITEM

Ƭ **DEPLOYED_CONTRACT_ITEM**: `Object`

A new contract deployed as part of the state update

#### Type declaration

| Name         | Type                                |
| :----------- | :---------------------------------- |
| `address`    | [`FELT`](RPC.RPCSPEC09.API.md#felt) |
| `class_hash` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:382

---

### CONTRACT_STORAGE_DIFF_ITEM

Ƭ **CONTRACT_STORAGE_DIFF_ITEM**: `Object`

#### Type declaration

| Name              | Type                                                        | Description                                        |
| :---------------- | :---------------------------------------------------------- | :------------------------------------------------- |
| `address`         | [`FELT`](RPC.RPCSPEC09.API.md#felt)                         | The contract address for which the storage changed |
| `storage_entries` | [`StorageDiffItem`](RPC.RPCSPEC09.API.md#storagediffitem)[] | The changes in the storage of the contract         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:386

---

### StorageDiffItem

Ƭ **StorageDiffItem**: `Object`

#### Type declaration

| Name    | Type                                | Description                                |
| :------ | :---------------------------------- | :----------------------------------------- |
| `key`   | [`FELT`](RPC.RPCSPEC09.API.md#felt) | The key of the changed value               |
| `value` | [`FELT`](RPC.RPCSPEC09.API.md#felt) | The new value applied to the given address |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:396

---

### TXN

Ƭ **TXN**: [`INVOKE_TXN`](RPC.RPCSPEC09.API.md#invoke_txn) \| [`L1_HANDLER_TXN`](RPC.RPCSPEC09.API.md#l1_handler_txn) \| [`DECLARE_TXN`](RPC.RPCSPEC09.API.md#declare_txn) \| [`DEPLOY_TXN`](RPC.RPCSPEC09.API.md#deploy_txn) \| [`DEPLOY_ACCOUNT_TXN`](RPC.RPCSPEC09.API.md#deploy_account_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:406

---

### TXN_WITH_HASH

Ƭ **TXN_WITH_HASH**: [`TXN`](RPC.RPCSPEC09.API.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) }

A transaction with its hash

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:410

---

### DECLARE_TXN

Ƭ **DECLARE_TXN**: [`DECLARE_TXN_V0`](RPC.RPCSPEC09.API.md#declare_txn_v0) \| [`DECLARE_TXN_V1`](RPC.RPCSPEC09.API.md#declare_txn_v1) \| [`DECLARE_TXN_V2`](RPC.RPCSPEC09.API.md#declare_txn_v2) \| [`DECLARE_TXN_V3`](RPC.RPCSPEC09.API.md#declare_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:413

---

### DECLARE_TXN_V0

Ƭ **DECLARE_TXN_V0**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                             |
| :--------------- | :------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)                      |
| `sender_address` | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `max_fee`        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`        | typeof [`V0`](RPC.RPCSPEC09.API.md#v0) \| typeof [`F0`](RPC.RPCSPEC09.API.md#f0) |
| `signature`      | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `class_hash`     | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:417

---

### DECLARE_TXN_V1

Ƭ **DECLARE_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                             |
| :--------------- | :------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)                      |
| `sender_address` | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `max_fee`        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`        | typeof [`V1`](RPC.RPCSPEC09.API.md#v1) \| typeof [`F1`](RPC.RPCSPEC09.API.md#f1) |
| `signature`      | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `class_hash`     | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:428

---

### DECLARE_TXN_V2

Ƭ **DECLARE_TXN_V2**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                  | Type                                                                             |
| :-------------------- | :------------------------------------------------------------------------------- |
| `type`                | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)                      |
| `sender_address`      | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `compiled_class_hash` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `max_fee`             | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`             | typeof [`V2`](RPC.RPCSPEC09.API.md#v2) \| typeof [`F2`](RPC.RPCSPEC09.API.md#f2) |
| `signature`           | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `class_hash`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:440

---

### DECLARE_TXN_V3

Ƭ **DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)                      |
| `sender_address`               | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `compiled_class_hash`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`                      | typeof [`V3`](RPC.RPCSPEC09.API.md#v3) \| typeof [`F3`](RPC.RPCSPEC09.API.md#f3) |
| `signature`                    | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`                        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `class_hash`                   | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](RPC.RPCSPEC09.API.md#resource_bounds_mapping)        |
| `tip`                          | [`u64`](RPC.RPCSPEC09.API.md#u64)                                                |
| `paymaster_data`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `account_deployment_data`      | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `nonce_data_availability_mode` | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |
| `fee_data_availability_mode`   | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:450

---

### BROADCASTED_TXN

Ƭ **BROADCASTED_TXN**: [`BROADCASTED_INVOKE_TXN`](RPC.RPCSPEC09.API.md#broadcasted_invoke_txn) \| [`BROADCASTED_DECLARE_TXN`](RPC.RPCSPEC09.API.md#broadcasted_declare_txn) \| [`BROADCASTED_DEPLOY_ACCOUNT_TXN`](RPC.RPCSPEC09.API.md#broadcasted_deploy_account_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:465

---

### BROADCASTED_INVOKE_TXN

Ƭ **BROADCASTED_INVOKE_TXN**: [`INVOKE_TXN_V3`](RPC.RPCSPEC09.API.md#invoke_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:466

---

### BROADCASTED_DEPLOY_ACCOUNT_TXN

Ƭ **BROADCASTED_DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V3`](RPC.RPCSPEC09.API.md#deploy_account_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:467

---

### BROADCASTED_DECLARE_TXN

Ƭ **BROADCASTED_DECLARE_TXN**: [`BROADCASTED_DECLARE_TXN_V3`](RPC.RPCSPEC09.API.md#broadcasted_declare_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:468

---

### BROADCASTED_DECLARE_TXN_V3

Ƭ **BROADCASTED_DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)                      |
| `sender_address`               | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `compiled_class_hash`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`                      | typeof [`V3`](RPC.RPCSPEC09.API.md#v3) \| typeof [`F3`](RPC.RPCSPEC09.API.md#f3) |
| `signature`                    | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`                        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `contract_class`               | [`CONTRACT_CLASS`](RPC.RPCSPEC09.API.md#contract_class)                          |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](RPC.RPCSPEC09.API.md#resource_bounds_mapping)        |
| `tip`                          | [`u64`](RPC.RPCSPEC09.API.md#u64)                                                |
| `paymaster_data`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `account_deployment_data`      | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `nonce_data_availability_mode` | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |
| `fee_data_availability_mode`   | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:469

---

### DEPLOY_ACCOUNT_TXN

Ƭ **DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V1`](RPC.RPCSPEC09.API.md#deploy_account_txn_v1) \| [`DEPLOY_ACCOUNT_TXN_V3`](RPC.RPCSPEC09.API.md#deploy_account_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:484

---

### DEPLOY_ACCOUNT_TXN_V1

Ƭ **DEPLOY_ACCOUNT_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                    | Type                                                                             |
| :---------------------- | :------------------------------------------------------------------------------- |
| `type`                  | [`TXN_TYPE_DEPLOY_ACCOUNT`](RPC.RPCSPEC09.API.md#txn_type_deploy_account)        |
| `max_fee`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`               | typeof [`V1`](RPC.RPCSPEC09.API.md#v1) \| typeof [`F1`](RPC.RPCSPEC09.API.md#f1) |
| `signature`             | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`                 | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `contract_address_salt` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `constructor_calldata`  | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `class_hash`            | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:488

---

### DEPLOY_ACCOUNT_TXN_V3

Ƭ **DEPLOY_ACCOUNT_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DEPLOY_ACCOUNT`](RPC.RPCSPEC09.API.md#txn_type_deploy_account)        |
| `version`                      | typeof [`V3`](RPC.RPCSPEC09.API.md#v3) \| typeof [`F3`](RPC.RPCSPEC09.API.md#f3) |
| `signature`                    | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`                        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `contract_address_salt`        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `constructor_calldata`         | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `class_hash`                   | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](RPC.RPCSPEC09.API.md#resource_bounds_mapping)        |
| `tip`                          | [`u64`](RPC.RPCSPEC09.API.md#u64)                                                |
| `paymaster_data`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `nonce_data_availability_mode` | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |
| `fee_data_availability_mode`   | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:498

---

### DEPLOY_TXN

Ƭ **DEPLOY_TXN**: `Object`

#### Type declaration

| Name                    | Type                                                      |
| :---------------------- | :-------------------------------------------------------- |
| `type`                  | [`TXN_TYPE_DEPLOY`](RPC.RPCSPEC09.API.md#txn_type_deploy) |
| `version`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)                       |
| `contract_address_salt` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                       |
| `constructor_calldata`  | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                     |
| `class_hash`            | [`FELT`](RPC.RPCSPEC09.API.md#felt)                       |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:512

---

### INVOKE_TXN

Ƭ **INVOKE_TXN**: [`INVOKE_TXN_V0`](RPC.RPCSPEC09.API.md#invoke_txn_v0) \| [`INVOKE_TXN_V1`](RPC.RPCSPEC09.API.md#invoke_txn_v1) \| [`INVOKE_TXN_V3`](RPC.RPCSPEC09.API.md#invoke_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:519

---

### INVOKE_TXN_V0

Ƭ **INVOKE_TXN_V0**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                   | Type                                                                             |
| :--------------------- | :------------------------------------------------------------------------------- |
| `type`                 | [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke)                        |
| `max_fee`              | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`              | typeof [`V0`](RPC.RPCSPEC09.API.md#v0) \| typeof [`F0`](RPC.RPCSPEC09.API.md#f0) |
| `signature`            | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `contract_address`     | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `entry_point_selector` | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `calldata`             | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:523

---

### INVOKE_TXN_V1

Ƭ **INVOKE_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                             |
| :--------------- | :------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke)                        |
| `sender_address` | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `calldata`       | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `max_fee`        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `version`        | typeof [`V1`](RPC.RPCSPEC09.API.md#v1) \| typeof [`F1`](RPC.RPCSPEC09.API.md#f1) |
| `signature`      | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`          | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:535

---

### INVOKE_TXN_V3

Ƭ **INVOKE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke)                        |
| `sender_address`               | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)                                        |
| `calldata`                     | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `version`                      | typeof [`V3`](RPC.RPCSPEC09.API.md#v3) \| typeof [`F3`](RPC.RPCSPEC09.API.md#f3) |
| `signature`                    | [`SIGNATURE`](RPC.RPCSPEC09.API.md#signature)                                    |
| `nonce`                        | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                              |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](RPC.RPCSPEC09.API.md#resource_bounds_mapping)        |
| `tip`                          | [`u64`](RPC.RPCSPEC09.API.md#u64)                                                |
| `paymaster_data`               | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `account_deployment_data`      | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                            |
| `nonce_data_availability_mode` | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |
| `fee_data_availability_mode`   | [`DA_MODE`](RPC.RPCSPEC09.API.md#da_mode)                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:544

---

### L1_HANDLER_TXN

Ƭ **L1_HANDLER_TXN**: \{ `version`: typeof [`V0`](RPC.RPCSPEC09.API.md#v0) ; `type`: `Uppercase`<[`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler)\> ; `nonce`: [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) } & [`FUNCTION_CALL`](RPC.RPCSPEC09.API.md#function_call)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:558

---

### COMMON_RECEIPT_PROPERTIES

Ƭ **COMMON_RECEIPT_PROPERTIES**: \{ `transaction_hash`: [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) ; `actual_fee`: [`FEE_PAYMENT`](RPC.RPCSPEC09.API.md#fee_payment) ; `finality_status`: [`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status) ; `messages_sent`: [`MSG_TO_L1`](RPC.RPCSPEC09.API.md#msg_to_l1)[] ; `events`: [`EVENT`](RPC.RPCSPEC09.API.md#event)[] ; `execution_resources`: [`EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#execution_resources) } & `SimpleOneOf`<`SUCCESSFUL_COMMON_RECEIPT_PROPERTIES`, `REVERTED_COMMON_RECEIPT_PROPERTIES`\>

Common properties shared by all transaction receipts

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:566

---

### INVOKE_TXN_RECEIPT

Ƭ **INVOKE_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke) } & [`COMMON_RECEIPT_PROPERTIES`](RPC.RPCSPEC09.API.md#common_receipt_properties)

A transaction receipt for an invoke transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:590

---

### DECLARE_TXN_RECEIPT

Ƭ **DECLARE_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare) } & [`COMMON_RECEIPT_PROPERTIES`](RPC.RPCSPEC09.API.md#common_receipt_properties)

A transaction receipt for a declare transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:596

---

### DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **DEPLOY_ACCOUNT_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DEPLOY_ACCOUNT`](RPC.RPCSPEC09.API.md#txn_type_deploy_account) ; `contract_address`: [`FELT`](RPC.RPCSPEC09.API.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](RPC.RPCSPEC09.API.md#common_receipt_properties)

A transaction receipt for a deploy account transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:602

---

### DEPLOY_TXN_RECEIPT

Ƭ **DEPLOY_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DEPLOY`](RPC.RPCSPEC09.API.md#txn_type_deploy) ; `contract_address`: [`FELT`](RPC.RPCSPEC09.API.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](RPC.RPCSPEC09.API.md#common_receipt_properties)

A transaction receipt for a deploy transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:609

---

### L1_HANDLER_TXN_RECEIPT

Ƭ **L1_HANDLER_TXN_RECEIPT**: \{ `type`: `Uppercase`<[`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler)\> ; `message_hash`: [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) } & [`COMMON_RECEIPT_PROPERTIES`](RPC.RPCSPEC09.API.md#common_receipt_properties)

A transaction receipt for an L1 handler transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:616

---

### TXN_RECEIPT

Ƭ **TXN_RECEIPT**: [`INVOKE_TXN_RECEIPT`](RPC.RPCSPEC09.API.md#invoke_txn_receipt) \| [`L1_HANDLER_TXN_RECEIPT`](RPC.RPCSPEC09.API.md#l1_handler_txn_receipt) \| [`DECLARE_TXN_RECEIPT`](RPC.RPCSPEC09.API.md#declare_txn_receipt) \| [`DEPLOY_TXN_RECEIPT`](RPC.RPCSPEC09.API.md#deploy_txn_receipt) \| [`DEPLOY_ACCOUNT_TXN_RECEIPT`](RPC.RPCSPEC09.API.md#deploy_account_txn_receipt)

All possible transaction receipt types

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:623

---

### TXN_RECEIPT_WITH_BLOCK_INFO

Ƭ **TXN_RECEIPT_WITH_BLOCK_INFO**: [`TXN_RECEIPT`](RPC.RPCSPEC09.API.md#txn_receipt) & \{ `block_number`: [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) } & \{ `block_hash`: [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash) } \| \{ `block_hash`: `never` }

A transaction receipt with block information

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:627

---

### MSG_TO_L1

Ƭ **MSG_TO_L1**: `Object`

A message sent from L2 to L1

#### Type declaration

| Name           | Type                                  |
| :------------- | :------------------------------------ |
| `from_address` | [`FELT`](RPC.RPCSPEC09.API.md#felt)   |
| `to_address`   | [`FELT`](RPC.RPCSPEC09.API.md#felt)   |
| `payload`      | [`FELT`](RPC.RPCSPEC09.API.md#felt)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:640

---

### MSG_FROM_L1

Ƭ **MSG_FROM_L1**: `Object`

A message sent from L1 to L2

#### Type declaration

| Name                   | Type                                              |
| :--------------------- | :------------------------------------------------ |
| `from_address`         | [`ETH_ADDRESS`](RPC.RPCSPEC09.API.md#eth_address) |
| `to_address`           | [`ADDRESS`](RPC.RPCSPEC09.API.md#address)         |
| `entry_point_selector` | [`FELT`](RPC.RPCSPEC09.API.md#felt)               |
| `payload`              | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]             |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:648

---

### FUNCTION_CALL

Ƭ **FUNCTION_CALL**: `Object`

Function call information

#### Type declaration

| Name                   | Type                                      |
| :--------------------- | :---------------------------------------- |
| `contract_address`     | [`ADDRESS`](RPC.RPCSPEC09.API.md#address) |
| `entry_point_selector` | [`FELT`](RPC.RPCSPEC09.API.md#felt)       |
| `calldata`             | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:657

---

### CONTRACT_CLASS

Ƭ **CONTRACT_CLASS**: `Object`

The definition of a StarkNet contract class

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                    |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sierra_program`                   | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                                                                                                                                                                                                   |
| `contract_class_version`           | `string`                                                                                                                                                                                                                                                |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[] ; `EXTERNAL`: [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[] ; `L1_HANDLER`: [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[]                                                                                                                                                                                       |
| `entry_points_by_type.EXTERNAL`    | [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[]                                                                                                                                                                                       |
| `entry_points_by_type.L1_HANDLER`  | [`SIERRA_ENTRY_POINT`](RPC.RPCSPEC09.API.md#sierra_entry_point)[]                                                                                                                                                                                       |
| `abi`                              | `string`                                                                                                                                                                                                                                                |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:665

---

### DEPRECATED_CONTRACT_CLASS

Ƭ **DEPRECATED_CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                                                                |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `program`                          | `string`                                                                                                                                                                                                                                                                                                            |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[] ; `EXTERNAL`: [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[] ; `L1_HANDLER`: [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                               |
| `entry_points_by_type.EXTERNAL`    | [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                               |
| `entry_points_by_type.L1_HANDLER`  | [`DEPRECATED_CAIRO_ENTRY_POINT`](RPC.RPCSPEC09.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                               |
| `abi`                              | [`CONTRACT_ABI`](RPC.RPCSPEC09.API.md#contract_abi)                                                                                                                                                                                                                                                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:675

---

### DEPRECATED_CAIRO_ENTRY_POINT

Ƭ **DEPRECATED_CAIRO_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                            | Description                                                      |
| :--------- | :---------------------------------------------- | :--------------------------------------------------------------- |
| `offset`   | [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) | "The offset of the entry point in the program"                   |
| `selector` | [`FELT`](RPC.RPCSPEC09.API.md#felt)             | A unique identifier of the entry point (function) in the program |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:684

---

### SIERRA_ENTRY_POINT

Ƭ **SIERRA_ENTRY_POINT**: `Object`

#### Type declaration

| Name           | Type                                | Description     |
| :------------- | :---------------------------------- | :-------------- |
| `selector`     | [`FELT`](RPC.RPCSPEC09.API.md#felt) | -               |
| `function_idx` | `number`                            | **`Minimum`** 0 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:694

---

### CONTRACT_ABI

Ƭ **CONTRACT_ABI**: readonly [`CONTRACT_ABI_ENTRY`](RPC.RPCSPEC09.API.md#contract_abi_entry)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:701

---

### CONTRACT_ABI_ENTRY

Ƭ **CONTRACT_ABI_ENTRY**: [`FUNCTION_ABI_ENTRY`](RPC.RPCSPEC09.API.md#function_abi_entry) \| [`EVENT_ABI_ENTRY`](RPC.RPCSPEC09.API.md#event_abi_entry) \| [`STRUCT_ABI_ENTRY`](RPC.RPCSPEC09.API.md#struct_abi_entry)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:702

---

### STRUCT_ABI_ENTRY

Ƭ **STRUCT_ABI_ENTRY**: `Object`

#### Type declaration

| Name      | Type                                                      | Description     |
| :-------- | :-------------------------------------------------------- | :-------------- |
| `type`    | [`STRUCT_ABI_TYPE`](RPC.RPCSPEC09.API.md#struct_abi_type) | Struct ABI type |
| `name`    | `string`                                                  | Struct name     |
| `size`    | `number`                                                  | -               |
| `members` | [`STRUCT_MEMBER`](RPC.RPCSPEC09.API.md#struct_member)[]   | -               |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:703

---

### STRUCT_MEMBER

Ƭ **STRUCT_MEMBER**: [`TYPED_PARAMETER`](RPC.RPCSPEC09.API.md#typed_parameter) & \{ `offset`: `number` }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:715

---

### EVENT_ABI_ENTRY

Ƭ **EVENT_ABI_ENTRY**: `Object`

#### Type declaration

| Name   | Type                                                        | Description    |
| :----- | :---------------------------------------------------------- | :------------- |
| `type` | [`EVENT_ABI_TYPE`](RPC.RPCSPEC09.API.md#event_abi_type)     | Event ABI type |
| `name` | `string`                                                    | Event name     |
| `keys` | [`TYPED_PARAMETER`](RPC.RPCSPEC09.API.md#typed_parameter)[] | -              |
| `data` | [`TYPED_PARAMETER`](RPC.RPCSPEC09.API.md#typed_parameter)[] | -              |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:722

---

### FUNCTION_STATE_MUTABILITY

Ƭ **FUNCTION_STATE_MUTABILITY**: [`STATE_MUTABILITY_VIEW`](RPC.RPCSPEC09.API.md#state_mutability_view)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:734

---

### FUNCTION_ABI_ENTRY

Ƭ **FUNCTION_ABI_ENTRY**: `Object`

#### Type declaration

| Name               | Type                                                                          | Description               |
| :----------------- | :---------------------------------------------------------------------------- | :------------------------ |
| `type`             | [`FUNCTION_ABI_TYPE`](RPC.RPCSPEC09.API.md#function_abi_type)                 | Function ABI type         |
| `name`             | `string`                                                                      | Function name             |
| `inputs`           | [`TYPED_PARAMETER`](RPC.RPCSPEC09.API.md#typed_parameter)[]                   | Typed parameter           |
| `outputs`          | [`TYPED_PARAMETER`](RPC.RPCSPEC09.API.md#typed_parameter)[]                   | Typed parameter           |
| `stateMutability?` | [`FUNCTION_STATE_MUTABILITY`](RPC.RPCSPEC09.API.md#function_state_mutability) | Function state mutability |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:735

---

### TYPED_PARAMETER

Ƭ **TYPED_PARAMETER**: `Object`

#### Type declaration

| Name   | Type     | Description    |
| :----- | :------- | :------------- |
| `name` | `string` | Parameter name |
| `type` | `string` | Parameter type |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:757

---

### SIMULATION_FLAG_FOR_ESTIMATE_FEE

Ƭ **SIMULATION_FLAG_FOR_ESTIMATE_FEE**: typeof [`SKIP_VALIDATE`](RPC.RPCSPEC09.API.md#skip_validate)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:767

---

### PRICE_UNIT

Ƭ **PRICE_UNIT**: [`PRICE_UNIT_WEI`](RPC.RPCSPEC09.API.md#price_unit_wei) \| [`PRICE_UNIT_FRI`](RPC.RPCSPEC09.API.md#price_unit_fri)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:768

---

### FEE_ESTIMATE_COMMON

Ƭ **FEE_ESTIMATE_COMMON**: `Object`

#### Type declaration

| Name                   | Type                                | Description                                                                                                                                                                                         |
| :--------------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `l1_gas_consumed`      | [`u64`](RPC.RPCSPEC09.API.md#u64)   | The Ethereum gas consumption of the transaction, charged for L1->L2 messages and, depending on the block's DA_MODE, state diffs. Prev. name gas_consumed                                            |
| `l1_gas_price`         | [`u128`](RPC.RPCSPEC09.API.md#u128) | The gas price (in wei or fri, depending on the tx version) that was used in the cost estimation. Prev. name gas_price                                                                               |
| `l2_gas_consumed`      | [`u64`](RPC.RPCSPEC09.API.md#u64)   | The L2 gas consumption of the transaction.                                                                                                                                                          |
| `l2_gas_price`         | [`u128`](RPC.RPCSPEC09.API.md#u128) | The L2 gas price (in wei or fri, depending on the tx version) that was used in the cost estimation.                                                                                                 |
| `l1_data_gas_consumed` | [`u64`](RPC.RPCSPEC09.API.md#u64)   | The Ethereum data gas consumption of the transaction. Prev. name data_gas_consumed                                                                                                                  |
| `l1_data_gas_price`    | [`u128`](RPC.RPCSPEC09.API.md#u128) | The data gas price (in wei or fri, depending on the tx version) that was used in the cost estimation. Prev. name data_gas_price                                                                     |
| `overall_fee`          | [`u128`](RPC.RPCSPEC09.API.md#u128) | The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed\*l2_gas_price |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:769

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: [`FEE_ESTIMATE_COMMON`](RPC.RPCSPEC09.API.md#fee_estimate_common) & \{ `unit`: [`PRICE_UNIT_FRI`](RPC.RPCSPEC09.API.md#price_unit_fri) }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:803

---

### MESSAGE_FEE_ESTIMATE

Ƭ **MESSAGE_FEE_ESTIMATE**: [`FEE_ESTIMATE_COMMON`](RPC.RPCSPEC09.API.md#fee_estimate_common) & \{ `unit`: [`PRICE_UNIT_WEI`](RPC.RPCSPEC09.API.md#price_unit_wei) }

Message fee estimate

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:812

---

### FEE_PAYMENT

Ƭ **FEE_PAYMENT**: `Object`

#### Type declaration

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `amount` | [`FELT`](RPC.RPCSPEC09.API.md#felt)             |
| `unit`   | [`PRICE_UNIT`](RPC.RPCSPEC09.API.md#price_unit) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:818

---

### RESOURCE_BOUNDS_MAPPING

Ƭ **RESOURCE_BOUNDS_MAPPING**: `Object`

#### Type declaration

| Name          | Type                                                      | Description                                                          |
| :------------ | :-------------------------------------------------------- | :------------------------------------------------------------------- |
| `l1_gas`      | [`RESOURCE_BOUNDS`](RPC.RPCSPEC09.API.md#resource_bounds) | The max amount and max price per unit of L1 gas used in this tx      |
| `l1_data_gas` | [`RESOURCE_BOUNDS`](RPC.RPCSPEC09.API.md#resource_bounds) | The max amount and max price per unit of L1 blob gas used in this tx |
| `l2_gas`      | [`RESOURCE_BOUNDS`](RPC.RPCSPEC09.API.md#resource_bounds) | The max amount and max price per unit of L2 gas used in this tx      |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:822

---

### RESOURCE_BOUNDS

Ƭ **RESOURCE_BOUNDS**: `Object`

#### Type declaration

| Name                 | Type                                |
| :------------------- | :---------------------------------- |
| `max_amount`         | [`u64`](RPC.RPCSPEC09.API.md#u64)   |
| `max_price_per_unit` | [`u128`](RPC.RPCSPEC09.API.md#u128) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:836

---

### RESOURCE_PRICE

Ƭ **RESOURCE_PRICE**: `Object`

#### Type declaration

| Name           | Type                                |
| :------------- | :---------------------------------- |
| `price_in_fri` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |
| `price_in_wei` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:840

---

### EXECUTION_RESOURCES

Ƭ **EXECUTION_RESOURCES**: `Object`

the resources consumed by the transaction

#### Type declaration

| Name          | Type     | Description                                                                                                                     |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `l1_gas`      | `number` | l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used. integer **`Minimum`** 0 |
| `l1_data_gas` | `number` | data gas consumed by this transaction, 0 if blobs are not used integer **`Minimum`** 0                                          |
| `l2_gas`      | `number` | l2 gas consumed by this transaction, used for computation and calldata Integer **`Minimum`** 0                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:847

---

### MERKLE_NODE

Ƭ **MERKLE_NODE**: `SimpleOneOf`<[`BINARY_NODE`](RPC.RPCSPEC09.API.md#binary_node), [`EDGE_NODE`](RPC.RPCSPEC09.API.md#edge_node)\>

a node in the Merkle-Patricia tree, can be a leaf, binary node, or an edge node

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:870

---

### BINARY_NODE

Ƭ **BINARY_NODE**: `Object`

an internal node whose both children are non-zero

#### Type declaration

| Name    | Type                                | Description                 |
| :------ | :---------------------------------- | :-------------------------- |
| `left`  | [`FELT`](RPC.RPCSPEC09.API.md#felt) | the hash of the left child  |
| `right` | [`FELT`](RPC.RPCSPEC09.API.md#felt) | the hash of the right child |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:874

---

### EDGE_NODE

Ƭ **EDGE_NODE**: `Object`

represents a path to the highest non-zero descendant node

#### Type declaration

| Name     | Type                                            | Description                                                                                                                                     |
| :------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`   | [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) | an unsigned integer whose binary representation represents the path from the current node to its highest non-zero descendant (bounded by 2^251) |
| `length` | `number`                                        | the length of the path (bounded by 251) **`Minimum`** 0                                                                                         |
| `child`  | [`FELT`](RPC.RPCSPEC09.API.md#felt)             | the hash of the unique non-zero maximal-height descendant node                                                                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:887

---

### NODE_HASH_TO_NODE_MAPPING

Ƭ **NODE_HASH_TO_NODE_MAPPING**: \{ `node_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `node`: [`MERKLE_NODE`](RPC.RPCSPEC09.API.md#merkle_node) }[]

a node_hash -> node mapping of all the nodes in the union of the paths between the requested leaves and the root

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:905

---

### CONTRACT_EXECUTION_ERROR

Ƭ **CONTRACT_EXECUTION_ERROR**: [`CONTRACT_EXECUTION_ERROR_INNER`](RPC.RPCSPEC09.API.md#contract_execution_error_inner)

structured error that can later be processed by wallets or sdks.
error frame or the error raised during execution

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:913

---

### CONTRACT_EXECUTION_ERROR_INNER

Ƭ **CONTRACT_EXECUTION_ERROR_INNER**: \{ `contract_address`: [`ADDRESS`](RPC.RPCSPEC09.API.md#address) ; `class_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `selector`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `error`: [`CONTRACT_EXECUTION_ERROR`](RPC.RPCSPEC09.API.md#contract_execution_error) } \| `string`

structured error that can later be processed by wallets or sdks.
error frame or the error raised during execution

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:918

---

### TRANSACTION_TRACE

Ƭ **TRANSACTION_TRACE**: [`INVOKE_TXN_TRACE`](RPC.RPCSPEC09.API.md#invoke_txn_trace) \| [`DECLARE_TXN_TRACE`](RPC.RPCSPEC09.API.md#declare_txn_trace) \| [`DEPLOY_ACCOUNT_TXN_TRACE`](RPC.RPCSPEC09.API.md#deploy_account_txn_trace) \| [`L1_HANDLER_TXN_TRACE`](RPC.RPCSPEC09.API.md#l1_handler_txn_trace)

A transaction trace including the execution details

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:927

---

### INVOKE_TXN_TRACE

Ƭ **INVOKE_TXN_TRACE**: `Object`

A transaction trace for an invoke transaction

#### Type declaration

| Name                       | Type                                                                                    | Description                       |
| :------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------- |
| `type`                     | [`TXN_TYPE_INVOKE`](RPC.RPCSPEC09.API.md#txn_type_invoke)                               | -                                 |
| `execute_invocation`       | [`REVERTIBLE_FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#revertible_function_invocation) | The trace of the **execute** call |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)                       | -                                 |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)                       | -                                 |
| `state_diff?`              | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff)                                         | -                                 |
| `execution_resources`      | [`EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#execution_resources)                       | -                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:931

---

### DECLARE_TXN_TRACE

Ƭ **DECLARE_TXN_TRACE**: `Object`

A transaction trace for a declare transaction

#### Type declaration

| Name                       | Type                                                              |
| :------------------------- | :---------------------------------------------------------------- |
| `type`                     | [`TXN_TYPE_DECLARE`](RPC.RPCSPEC09.API.md#txn_type_declare)       |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff)                   |
| `execution_resources`      | [`EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#execution_resources) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:945

---

### DEPLOY_ACCOUNT_TXN_TRACE

Ƭ **DEPLOY_ACCOUNT_TXN_TRACE**: `Object`

A transaction trace for a deploy account transaction

#### Type declaration

| Name                       | Type                                                                      | Description                       |
| :------------------------- | :------------------------------------------------------------------------ | :-------------------------------- |
| `type`                     | [`TXN_TYPE_DEPLOY_ACCOUNT`](RPC.RPCSPEC09.API.md#txn_type_deploy_account) | -                                 |
| `constructor_invocation`   | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)         | The trace of the constructor call |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)         | -                                 |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)         | -                                 |
| `state_diff?`              | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff)                           | -                                 |
| `execution_resources`      | [`EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#execution_resources)         | -                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:955

---

### L1_HANDLER_TXN_TRACE

Ƭ **L1_HANDLER_TXN_TRACE**: `Object`

A transaction trace for an L1 handler transaction

#### Type declaration

| Name                  | Type                                                                                    | Description                      |
| :-------------------- | :-------------------------------------------------------------------------------------- | :------------------------------- |
| `type`                | `Uppercase`<[`ABI_TYPE_L1_HANDLER`](RPC.RPCSPEC09.API.md#abi_type_l1_handler)\>         | -                                |
| `function_invocation` | [`REVERTIBLE_FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#revertible_function_invocation) | The trace of the L1 handler call |
| `state_diff?`         | [`STATE_DIFF`](RPC.RPCSPEC09.API.md#state_diff)                                         | -                                |
| `execution_resources` | [`EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#execution_resources)                       | -                                |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:969

---

### NESTED_CALL

Ƭ **NESTED_CALL**: [`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation)

Represents a nested function call.

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:981

---

### FUNCTION_INVOCATION

Ƭ **FUNCTION_INVOCATION**: [`FUNCTION_CALL`](RPC.RPCSPEC09.API.md#function_call) & \{ `caller_address`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `class_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `entry_point_type`: [`ENTRY_POINT_TYPE`](RPC.RPCSPEC09.API.md#entry_point_type) ; `call_type`: [`CALL_TYPE`](RPC.RPCSPEC09.API.md#call_type) ; `result`: [`FELT`](RPC.RPCSPEC09.API.md#felt)[] ; `calls`: [`NESTED_CALL`](RPC.RPCSPEC09.API.md#nested_call)[] ; `events`: [`ORDERED_EVENT`](RPC.RPCSPEC09.API.md#ordered_event)[] ; `messages`: [`ORDERED_MESSAGE`](RPC.RPCSPEC09.API.md#ordered_message)[] ; `execution_resources`: [`INNER_CALL_EXECUTION_RESOURCES`](RPC.RPCSPEC09.API.md#inner_call_execution_resources) ; `is_reverted`: `boolean` }

Represents a function invocation along with its execution details.

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:985

---

### INNER_CALL_EXECUTION_RESOURCES

Ƭ **INNER_CALL_EXECUTION_RESOURCES**: `Object`

the resources consumed by an inner call (does not account for state diffs since data is squashed across the transaction)

#### Type declaration

| Name     | Type     | Description                                                                                                            |
| :------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `l1_gas` | `number` | l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used **`Minimum`** 0 |
| `l2_gas` | `number` | l2 gas consumed by this transaction, used for computation and calldata **`Minimum`** 0                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1024

---

### REVERTIBLE_FUNCTION_INVOCATION

Ƭ **REVERTIBLE_FUNCTION_INVOCATION**: `SimpleOneOf`<[`FUNCTION_INVOCATION`](RPC.RPCSPEC09.API.md#function_invocation), \{ `revert_reason`: `string` }\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1036

---

### ORDERED_EVENT

Ƭ **ORDERED_EVENT**: `Object`

Represents an ordered event alongside its order within the transaction.

#### Type declaration

| Name    | Type                                  | Description     |
| :------ | :------------------------------------ | :-------------- |
| `order` | `number`                              | **`Minimum`** 0 |
| `event` | [`EVENT`](RPC.RPCSPEC09.API.md#event) | -               |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1042

---

### ORDERED_MESSAGE

Ƭ **ORDERED_MESSAGE**: `Object`

Represents an ordered message alongside its order within the transaction.

#### Type declaration

| Name      | Type                                          | Description     |
| :-------- | :-------------------------------------------- | :-------------- |
| `order`   | `number`                                      | **`Minimum`** 0 |
| `message` | [`MSG_TO_L1`](RPC.RPCSPEC09.API.md#msg_to_l1) | -               |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1052

---

### TXN_STATUS_RESULT

Ƭ **TXN_STATUS_RESULT**: `Object`

Transaction status result, including finality status and execution status

#### Type declaration

| Name                | Type                                                                | Description                                                      |
| :------------------ | :------------------------------------------------------------------ | :--------------------------------------------------------------- |
| `finality_status`   | [`TXN_STATUS`](RPC.RPCSPEC09.API.md#txn_status)                     | -                                                                |
| `execution_status?` | [`TXN_EXECUTION_STATUS`](RPC.RPCSPEC09.API.md#txn_execution_status) | -                                                                |
| `failure_reason?`   | `string`                                                            | The failure reason, only appears if execution_status is REVERTED |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1062

---

### CONTRACT_STORAGE_KEYS

Ƭ **CONTRACT_STORAGE_KEYS**: `Object`

(contract_address, storage_keys) pairs

#### Type declaration

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `contract_address` | [`ADDRESS`](RPC.RPCSPEC09.API.md#address) |
| `storage_keys`     | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:1073

---

### ContractClass

Ƭ **ContractClass**: `OneOf`<[[`CONTRACT_CLASS`](RPC.RPCSPEC09.API.md#contract_class), [`DEPRECATED_CONTRACT_CLASS`](RPC.RPCSPEC09.API.md#deprecated_contract_class)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:8

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Object`

#### Type declaration

| Name                | Type                                                          |
| :------------------ | :------------------------------------------------------------ |
| `transaction_trace` | [`TRANSACTION_TRACE`](RPC.RPCSPEC09.API.md#transaction_trace) |
| `fee_estimation`    | [`FEE_ESTIMATE`](RPC.RPCSPEC09.API.md#fee_estimate)           |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:9

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulateTransaction`](RPC.RPCSPEC09.API.md#simulatetransaction)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:13

---

### FeeEstimate

Ƭ **FeeEstimate**: [`FEE_ESTIMATE`](RPC.RPCSPEC09.API.md#fee_estimate)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:14

---

### MessageFeeEstimate

Ƭ **MessageFeeEstimate**: [`MESSAGE_FEE_ESTIMATE`](RPC.RPCSPEC09.API.md#message_fee_estimate)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:15

---

### TransactionWithHash

Ƭ **TransactionWithHash**: [`TXN_WITH_HASH`](RPC.RPCSPEC09.API.md#txn_with_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:16

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `Object`

#### Type declaration

| Name           | Type                                                |
| :------------- | :-------------------------------------------------- |
| `block_hash`   | [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)     |
| `block_number` | [`BLOCK_NUMBER`](RPC.RPCSPEC09.API.md#block_number) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:17

---

### BlockWithTxs

Ƭ **BlockWithTxs**: `OneOf`<[[`BLOCK_WITH_TXS`](RPC.RPCSPEC09.API.md#block_with_txs), [`PRE_CONFIRMED_BLOCK_WITH_TXS`](RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:21

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: `OneOf`<[[`BLOCK_WITH_TX_HASHES`](RPC.RPCSPEC09.API.md#block_with_tx_hashes), [`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:22

---

### BlockWithTxReceipts

Ƭ **BlockWithTxReceipts**: `OneOf`<[[`BLOCK_WITH_RECEIPTS`](RPC.RPCSPEC09.API.md#block_with_receipts), [`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:23

---

### StateUpdate

Ƭ **StateUpdate**: `OneOf`<[[`STATE_UPDATE`](RPC.RPCSPEC09.API.md#state_update), [`PRE_CONFIRMED_STATE_UPDATE`](RPC.RPCSPEC09.API.md#pre_confirmed_state_update)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:24

---

### BlockTransactionsTraces

Ƭ **BlockTransactionsTraces**: \{ `transaction_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `trace_root`: [`TRANSACTION_TRACE`](RPC.RPCSPEC09.API.md#transaction_trace) }[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:25

---

### Syncing

Ƭ **Syncing**: `false` \| [`SYNC_STATUS`](RPC.RPCSPEC09.API.md#sync_status)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:29

---

### Events

Ƭ **Events**: [`EVENTS_CHUNK`](RPC.RPCSPEC09.API.md#events_chunk)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:30

---

### EmittedEvent

Ƭ **EmittedEvent**: [`EMITTED_EVENT`](RPC.RPCSPEC09.API.md#emitted_event)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:31

---

### Event

Ƭ **Event**: [`EVENT`](RPC.RPCSPEC09.API.md#event)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:32

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Object`

#### Type declaration

| Name               | Type                                        |
| :----------------- | :------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:33

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Object`

#### Type declaration

| Name               | Type                                        |
| :----------------- | :------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) |
| `class_hash`       | [`FELT`](RPC.RPCSPEC09.API.md#felt)         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:36

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Object`

#### Type declaration

| Name               | Type                                        |
| :----------------- | :------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash) |
| `contract_address` | [`FELT`](RPC.RPCSPEC09.API.md#felt)         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:40

---

### L1L2MessagesStatus

Ƭ **L1L2MessagesStatus**: [`L1L2MessageStatus`](RPC.RPCSPEC09.API.md#l1l2messagestatus)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:44

---

### StorageProof

Ƭ **StorageProof**: `Object`

#### Type declaration

| Name                                   | Type                                                                                                                                                                                                                                                                                |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `classes_proof`                        | [`NODE_HASH_TO_NODE_MAPPING`](RPC.RPCSPEC09.API.md#node_hash_to_node_mapping)                                                                                                                                                                                                       |
| `contracts_proof`                      | \{ `nodes`: [`NODE_HASH_TO_NODE_MAPPING`](RPC.RPCSPEC09.API.md#node_hash_to_node_mapping) ; `contract_leaves_data`: \{ `nonce`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `class_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `storage_root`: [`FELT`](RPC.RPCSPEC09.API.md#felt) }[] } |
| `contracts_proof.nodes`                | [`NODE_HASH_TO_NODE_MAPPING`](RPC.RPCSPEC09.API.md#node_hash_to_node_mapping)                                                                                                                                                                                                       |
| `contracts_proof.contract_leaves_data` | \{ `nonce`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `class_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `storage_root`: [`FELT`](RPC.RPCSPEC09.API.md#felt) }[]                                                                                                                       |
| `contracts_storage_proofs`             | [`NODE_HASH_TO_NODE_MAPPING`](RPC.RPCSPEC09.API.md#node_hash_to_node_mapping)[]                                                                                                                                                                                                     |
| `global_roots`                         | \{ `contracts_tree_root`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `classes_tree_root`: [`FELT`](RPC.RPCSPEC09.API.md#felt) ; `block_hash`: [`FELT`](RPC.RPCSPEC09.API.md#felt) }                                                                                                      |
| `global_roots.contracts_tree_root`     | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                                                                                                                                                                                                                                 |
| `global_roots.classes_tree_root`       | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                                                                                                                                                                                                                                 |
| `global_roots.block_hash`              | [`FELT`](RPC.RPCSPEC09.API.md#felt)                                                                                                                                                                                                                                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:45

---

### CompiledCasm

Ƭ **CompiledCasm**: [`CASM_COMPILED_CONTRACT_CLASS`](RPC.RPCSPEC09.API.md#casm_compiled_contract_class)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:71

---

### ContractAddress

Ƭ **ContractAddress**: [`ADDRESS`](RPC.RPCSPEC09.API.md#address)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:72

---

### Felt

Ƭ **Felt**: [`FELT`](RPC.RPCSPEC09.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:73

---

### Nonce

Ƭ **Nonce**: [`FELT`](RPC.RPCSPEC09.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:74

---

### TransactionHash

Ƭ **TransactionHash**: [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:75

---

### TransactionTrace

Ƭ **TransactionTrace**: [`TRANSACTION_TRACE`](RPC.RPCSPEC09.API.md#transaction_trace)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:76

---

### BlockHash

Ƭ **BlockHash**: [`BLOCK_HASH`](RPC.RPCSPEC09.API.md#block_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:77

---

### TransactionReceipt

Ƭ **TransactionReceipt**: [`TXN_RECEIPT_WITH_BLOCK_INFO`](RPC.RPCSPEC09.API.md#txn_receipt_with_block_info)

All Type Transaction Receipt

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:81

---

### TransactionReceiptProductionBlock

Ƭ **TransactionReceiptProductionBlock**: [`IsInBlock`](RPC.RPCSPEC09.API.md#isinblock)<[`TransactionReceipt`](RPC.RPCSPEC09.API.md#transactionreceipt)\>

All Type Transaction Receipt from production block

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:85

---

### TransactionReceiptPreConfirmedBlock

Ƭ **TransactionReceiptPreConfirmedBlock**: [`IsPreConfirmed`](RPC.RPCSPEC09.API.md#ispreconfirmed)<[`TransactionReceipt`](RPC.RPCSPEC09.API.md#transactionreceipt)\>

All Type Transaction Receipt from pre confirmed block

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:89

---

### EventFilter

Ƭ **EventFilter**: [`EVENT_FILTER`](RPC.RPCSPEC09.API.md#event_filter) & [`RESULT_PAGE_REQUEST`](RPC.RPCSPEC09.API.md#result_page_request)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:90

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](RPC.RPCSPEC09.API.md#simulation_flag)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:91

---

### L1Message

Ƭ **L1Message**: [`MSG_FROM_L1`](RPC.RPCSPEC09.API.md#msg_from_l1)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:92

---

### BaseTransaction

Ƭ **BaseTransaction**: [`BROADCASTED_TXN`](RPC.RPCSPEC09.API.md#broadcasted_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:93

---

### ChainId

Ƭ **ChainId**: [`CHAIN_ID`](RPC.RPCSPEC09.API.md#chain_id)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:94

---

### Transaction

Ƭ **Transaction**: [`TXN`](RPC.RPCSPEC09.API.md#txn)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:95

---

### TransactionStatus

Ƭ **TransactionStatus**: [`TXN_STATUS_RESULT`](RPC.RPCSPEC09.API.md#txn_status_result)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:96

---

### ResourceBounds

Ƭ **ResourceBounds**: [`RESOURCE_BOUNDS_MAPPING`](RPC.RPCSPEC09.API.md#resource_bounds_mapping)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:97

---

### FeePayment

Ƭ **FeePayment**: [`FEE_PAYMENT`](RPC.RPCSPEC09.API.md#fee_payment)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:98

---

### PriceUnit

Ƭ **PriceUnit**: [`PRICE_UNIT`](RPC.RPCSPEC09.API.md#price_unit)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:99

---

### L1L2MessageStatus

Ƭ **L1L2MessageStatus**: `Object`

Ethereum l1_handler tx hash and status for L1 -> L2 messages sent by the l1 transaction

#### Type declaration

| Name               | Type                                                                | Description                                                         |
| :----------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](RPC.RPCSPEC09.API.md#txn_hash)                         | l1_handler tx hash                                                  |
| `finality_status`  | [`TXN_FINALITY_STATUS`](RPC.RPCSPEC09.API.md#txn_finality_status)   | finality status of the L1 -> L2 messages sent by the l1 transaction |
| `execution_status` | [`TXN_EXECUTION_STATUS`](RPC.RPCSPEC09.API.md#txn_execution_status) | the failure reason, only appears if finality_status is REJECTED     |
| `failure_reason?`  | `string`                                                            | The failure reason. Only appears if `execution_status` is REVERTED  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:103

---

### StorageDiffs

Ƭ **StorageDiffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](RPC.RPCSPEC09.API.md#contract_storage_diff_item)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:121

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: [`FELT`](RPC.RPCSPEC09.API.md#felt)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:122

---

### NonceUpdates

Ƭ **NonceUpdates**: [`NONCE_UPDATE`](RPC.RPCSPEC09.API.md#nonce_update)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:123

---

### ReplacedClasses

Ƭ **ReplacedClasses**: [`REPLACED_CLASS`](RPC.RPCSPEC09.API.md#replaced_class)[]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/nonspec.d.ts:124

---

### STATUS_ACCEPTED_ON_L2

Ƭ **STATUS_ACCEPTED_ON_L2**: `"ACCEPTED_ON_L2"`

The transaction/block was accepted on L2 and included

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:4

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:5

---

### STATUS_ACCEPTED_ON_L1

Ƭ **STATUS_ACCEPTED_ON_L1**: `"ACCEPTED_ON_L1"`

The transaction/block was accepted on Ethereum (L1)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:9

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:10

---

### STATUS_SUCCEEDED

Ƭ **STATUS_SUCCEEDED**: `"SUCCEEDED"`

The transaction was successfully executed

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:14

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:15

---

### STATUS_REVERTED

Ƭ **STATUS_REVERTED**: `"REVERTED"`

The transaction passed validation but failed during execution by the sequencer, and is included in a block as reverted

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:19

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:20

---

### STATUS_RECEIVED

Ƭ **STATUS_RECEIVED**: `"RECEIVED"`

The transaction was received by the sequencer

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:24

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:25

---

### STATUS_CANDIDATE

Ƭ **STATUS_CANDIDATE**: `"CANDIDATE"`

The transaction is a candidate for inclusion in the next block

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:29

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:30

---

### STATUS_PRE_CONFIRMED

Ƭ **STATUS_PRE_CONFIRMED**: `"PRE_CONFIRMED"`

The transaction/block was written to the feeder gateway's storage by a sequencer

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:34

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:35

---

### STATUS_PRE_CONFIRMED_LOWERCASE

Ƭ **STATUS_PRE_CONFIRMED_LOWERCASE**: `InferLowercaseString`<typeof [`STATUS_PRE_CONFIRMED`](RPC.RPCSPEC09.API.md#status_pre_confirmed-1)\>

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:36

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:37

---

### TXN_TYPE_DECLARE

Ƭ **TXN_TYPE_DECLARE**: `"DECLARE"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:38

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:39

---

### TXN_TYPE_DEPLOY

Ƭ **TXN_TYPE_DEPLOY**: `"DEPLOY"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:40

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:41

---

### TXN_TYPE_DEPLOY_ACCOUNT

Ƭ **TXN_TYPE_DEPLOY_ACCOUNT**: `"DEPLOY_ACCOUNT"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:42

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:43

---

### TXN_TYPE_INVOKE

Ƭ **TXN_TYPE_INVOKE**: `"INVOKE"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:44

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:45

---

### TXN_TYPE_L1_HANDLER

Ƭ **TXN_TYPE_L1_HANDLER**: `"L1_HANDLER"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:46

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:47

---

### STRUCT_ABI_TYPE

Ƭ **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:48

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:49

---

### EVENT_ABI_TYPE

Ƭ **EVENT_ABI_TYPE**: `"event"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:50

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:51

---

### ABI_TYPE_FUNCTION

Ƭ **ABI_TYPE_FUNCTION**: `"function"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:52

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:53

---

### ABI_TYPE_CONSTRUCTOR

Ƭ **ABI_TYPE_CONSTRUCTOR**: `"constructor"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:54

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:55

---

### ABI_TYPE_L1_HANDLER

Ƭ **ABI_TYPE_L1_HANDLER**: `"l1_handler"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:56

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:57

---

### ABI_TYPE_ENUM

Ƭ **ABI_TYPE_ENUM**: `"enum"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:58

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:59

---

### STATE_MUTABILITY_VIEW

Ƭ **STATE_MUTABILITY_VIEW**: `"view"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:60

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:61

---

### STATE_MUTABILITY_EXTERNAL

Ƭ **STATE_MUTABILITY_EXTERNAL**: `"external"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:62

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:63

---

### PRICE_UNIT_WEI

Ƭ **PRICE_UNIT_WEI**: `"WEI"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:64

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:65

---

### PRICE_UNIT_FRI

Ƭ **PRICE_UNIT_FRI**: `"FRI"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:66

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:67

---

### L1_DA_MODE

Ƭ **L1_DA_MODE**: typeof [`L1_DA_MODE`](RPC.RPCSPEC09.API.md#l1_da_mode-1)[keyof typeof [`L1_DA_MODE`](RPC.RPCSPEC09.API.md#l1_da_mode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:68

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:72

---

### CALL_TYPE

Ƭ **CALL_TYPE**: typeof [`CALL_TYPE`](RPC.RPCSPEC09.API.md#call_type-1)[keyof typeof [`CALL_TYPE`](RPC.RPCSPEC09.API.md#call_type-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:76

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:81

---

### ETransactionType

Ƭ **ETransactionType**: typeof [`ETransactionType`](RPC.RPCSPEC09.API.md#etransactiontype-1)[keyof typeof [`ETransactionType`](RPC.RPCSPEC09.API.md#etransactiontype-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:82

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:89

---

### ESimulationFlag

Ƭ **ESimulationFlag**: typeof [`ESimulationFlag`](RPC.RPCSPEC09.API.md#esimulationflag-1)[keyof typeof [`ESimulationFlag`](RPC.RPCSPEC09.API.md#esimulationflag-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:90

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:94

---

### ETransactionStatus

Ƭ **ETransactionStatus**: typeof [`ETransactionStatus`](RPC.RPCSPEC09.API.md#etransactionstatus-1)[keyof typeof [`ETransactionStatus`](RPC.RPCSPEC09.API.md#etransactionstatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:95

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:102

---

### ETransactionFinalityStatus

Ƭ **ETransactionFinalityStatus**: typeof [`ETransactionFinalityStatus`](RPC.RPCSPEC09.API.md#etransactionfinalitystatus-1)[keyof typeof [`ETransactionFinalityStatus`](RPC.RPCSPEC09.API.md#etransactionfinalitystatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:103

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:108

---

### ETransactionExecutionStatus

Ƭ **ETransactionExecutionStatus**: typeof [`ETransactionExecutionStatus`](RPC.RPCSPEC09.API.md#etransactionexecutionstatus-1)[keyof typeof [`ETransactionExecutionStatus`](RPC.RPCSPEC09.API.md#etransactionexecutionstatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:109

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:113

---

### EBlockTag

Ƭ **EBlockTag**: typeof [`EBlockTag`](RPC.RPCSPEC09.API.md#eblocktag-1)[keyof typeof [`EBlockTag`](RPC.RPCSPEC09.API.md#eblocktag-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:118

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:132

---

### EBlockStatus

Ƭ **EBlockStatus**: typeof [`EBlockStatus`](RPC.RPCSPEC09.API.md#eblockstatus-1)[keyof typeof [`EBlockStatus`](RPC.RPCSPEC09.API.md#eblockstatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:133

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:138

---

### EDataAvailabilityMode

Ƭ **EDataAvailabilityMode**: typeof [`EDataAvailabilityMode`](RPC.RPCSPEC09.API.md#edataavailabilitymode-1)[keyof typeof [`EDataAvailabilityMode`](RPC.RPCSPEC09.API.md#edataavailabilitymode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:139

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:143

---

### EDAMode

Ƭ **EDAMode**: typeof [`EDAMode`](RPC.RPCSPEC09.API.md#edamode-1)[keyof typeof [`EDAMode`](RPC.RPCSPEC09.API.md#edamode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:144

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:148

---

### ETransactionVersion

Ƭ **ETransactionVersion**: typeof [`ETransactionVersion`](RPC.RPCSPEC09.API.md#etransactionversion-1)[keyof typeof [`ETransactionVersion`](RPC.RPCSPEC09.API.md#etransactionversion-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:153

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:181

---

### ETransactionVersion2

Ƭ **ETransactionVersion2**: typeof [`ETransactionVersion2`](RPC.RPCSPEC09.API.md#etransactionversion2-1)[keyof typeof [`ETransactionVersion2`](RPC.RPCSPEC09.API.md#etransactionversion2-1)]

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:188

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:199

---

### ETransactionVersion3

Ƭ **ETransactionVersion3**: typeof [`ETransactionVersion3`](RPC.RPCSPEC09.API.md#etransactionversion3-1)[keyof typeof [`ETransactionVersion3`](RPC.RPCSPEC09.API.md#etransactionversion3-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:203

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:207

---

### CASM_COMPILED_CONTRACT_CLASS

Ƭ **CASM_COMPILED_CONTRACT_CLASS**: `Object`

Starknet get compiled CASM result

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                        | Description                                                                                                                |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[] ; `EXTERNAL`: [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[] ; `L1_HANDLER`: [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[] } | -                                                                                                                          |
| `entry_points_by_type.CONSTRUCTOR` | [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[]                                                                                                                                                                               | -                                                                                                                          |
| `entry_points_by_type.EXTERNAL`    | [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[]                                                                                                                                                                               | -                                                                                                                          |
| `entry_points_by_type.L1_HANDLER`  | [`CASM_ENTRY_POINT`](RPC.RPCSPEC09.API.md#casm_entry_point)[]                                                                                                                                                                               | -                                                                                                                          |
| `bytecode`                         | [`FELT`](RPC.RPCSPEC09.API.md#felt)[]                                                                                                                                                                                                       | -                                                                                                                          |
| `prime`                            | [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex)                                                                                                                                                                                             | -                                                                                                                          |
| `compiler_version`                 | `string`                                                                                                                                                                                                                                    | -                                                                                                                          |
| `hints`                            | [`number` \| [`HINT`](RPC.RPCSPEC09.API.md#hint)[], `number` \| [`HINT`](RPC.RPCSPEC09.API.md#hint)[]][]                                                                                                                                    | Array of 2-tuple of pc value and an array of hints to execute.                                                             |
| `bytecode_segment_lengths?`        | `number`                                                                                                                                                                                                                                    | a list of sizes of segments in the bytecode, each segment is hashed individually when computing the bytecode hash. Integer |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:5

---

### CASM_ENTRY_POINT

Ƭ **CASM_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                |
| :--------- | :---------------------------------- |
| `offset`   | `number`                            |
| `selector` | [`FELT`](RPC.RPCSPEC09.API.md#felt) |
| `builtins` | `string`[]                          |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:24

---

### CellRef

Ƭ **CellRef**: `Object`

#### Type declaration

| Name       | Type             |
| :--------- | :--------------- |
| `register` | `"AP"` \| `"FP"` |
| `offset`   | `number`         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:29

---

### Deref

Ƭ **Deref**: `Object`

#### Type declaration

| Name    | Type                                      |
| :------ | :---------------------------------------- |
| `Deref` | [`CellRef`](RPC.RPCSPEC09.API.md#cellref) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:33

---

### DoubleDeref

Ƭ **DoubleDeref**: `Object`

#### Type declaration

| Name          | Type                                                    | Description               |
| :------------ | :------------------------------------------------------ | :------------------------ |
| `DoubleDeref` | [[`CellRef`](RPC.RPCSPEC09.API.md#cellref) \| `number`] | A (CellRef, offset) tuple |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:36

---

### Immediate

Ƭ **Immediate**: `Object`

#### Type declaration

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `Immediate` | [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:42

---

### BinOp

Ƭ **BinOp**: `Object`

#### Type declaration

| Name       | Type                                                                                                                                                                         |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BinOp`    | \{ `op`: `"Add"` \| `"Mul"` ; `a`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `b`: [`Deref`](RPC.RPCSPEC09.API.md#deref) \| [`Immediate`](RPC.RPCSPEC09.API.md#immediate) } |
| `BinOp.op` | `"Add"` \| `"Mul"`                                                                                                                                                           |
| `BinOp.a`  | [`CellRef`](RPC.RPCSPEC09.API.md#cellref)                                                                                                                                    |
| `BinOp.b`  | [`Deref`](RPC.RPCSPEC09.API.md#deref) \| [`Immediate`](RPC.RPCSPEC09.API.md#immediate)                                                                                       |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:45

---

### ResOperand

Ƭ **ResOperand**: [`Deref`](RPC.RPCSPEC09.API.md#deref) \| [`DoubleDeref`](RPC.RPCSPEC09.API.md#doublederef) \| [`Immediate`](RPC.RPCSPEC09.API.md#immediate) \| [`BinOp`](RPC.RPCSPEC09.API.md#binop)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:52

---

### HINT

Ƭ **HINT**: [`DEPRECATED_HINT`](RPC.RPCSPEC09.API.md#deprecated_hint) \| [`CORE_HINT`](RPC.RPCSPEC09.API.md#core_hint) \| [`STARKNET_HINT`](RPC.RPCSPEC09.API.md#starknet_hint)

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:53

---

### DEPRECATED_HINT

Ƭ **DEPRECATED_HINT**: `"AssertCurrentAccessIndicesIsEmpty"` \| `"AssertAllKeysUsed"` \| `"AssertLeAssertThirdArcExcluded"` \| \{ `AssertAllAccessesUsed`: \{ `n_used_accesses`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `AssertLtAssertValidInput`: \{ `a`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `b`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `Felt252DictRead`: \{ `dict_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `key`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `value_dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `Felt252DictWrite`: \{ `dict_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `key`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `value`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:54

---

### CORE_HINT

Ƭ **CORE_HINT**: \{ `AllocSegment`: \{ `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `TestLessThan`: \{ `lhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `rhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `TestLessThanOrEqual`: \{ `lhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `rhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `TestLessThanOrEqualAddress`: \{ `lhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `rhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `WideMul128`: \{ `lhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `rhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `high`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `low`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `DivMod`: \{ `lhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `rhs`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `quotient`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `Uint256DivMod`: \{ `dividend0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dividend1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `divisor0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `divisor1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `quotient0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `quotient1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `Uint512DivModByUint256`: \{ `dividend0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dividend1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dividend2`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dividend3`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `divisor0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `divisor1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `quotient0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `quotient1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `quotient2`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `quotient3`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `SquareRoot`: \{ `value`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `Uint256SquareRoot`: \{ `value_low`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `value_high`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `sqrt0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `sqrt1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder_low`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `remainder_high`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `sqrt_mul_2_minus_remainder_ge_u128`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `LinearSplit`: \{ `value`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `scalar`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `max_x`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `x`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `y`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `AllocFelt252Dict`: \{ `segment_arena_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `Felt252DictEntryInit`: \{ `dict_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `key`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `Felt252DictEntryUpdate`: \{ `dict_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `value`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `GetSegmentArenaIndex`: \{ `dict_end_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dict_index`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `InitSquashData`: \{ `dict_accesses`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `ptr_diff`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `n_accesses`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `big_keys`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `first_key`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `GetCurrentAccessIndex`: \{ `range_check_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `ShouldSkipSquashLoop`: \{ `should_skip_loop`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `GetCurrentAccessDelta`: \{ `index_delta_minus1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `ShouldContinueSquashLoop`: \{ `should_continue`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `GetNextDictKey`: \{ `next_key`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `AssertLeFindSmallArcs`: \{ `range_check_ptr`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `a`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `b`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `AssertLeIsFirstArcExcluded`: \{ `skip_exclude_a_flag`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `AssertLeIsSecondArcExcluded`: \{ `skip_exclude_b_minus_a`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `RandomEcPoint`: \{ `x`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `y`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `FieldSqrt`: \{ `val`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `sqrt`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `DebugPrint`: \{ `start`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `end`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `AllocConstantSize`: \{ `size`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `dst`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `U256InvModN`: \{ `b0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `b1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `n0`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `n1`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `g0_or_no_inv`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `g1_option`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `s_or_r0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `s_or_r1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `t_or_k0`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `t_or_k1`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } } \| \{ `EvalCircuit`: \{ `n_add_mods`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `add_mod_builtin`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `n_mul_mods`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `mul_mod_builtin`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:76

---

### STARKNET_HINT

Ƭ **STARKNET_HINT**: \{ `SystemCall`: \{ `system`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) } } \| \{ `Cheatcode`: \{ `selector`: [`NUM_AS_HEX`](RPC.RPCSPEC09.API.md#num_as_hex) ; `input_start`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `input_end`: [`ResOperand`](RPC.RPCSPEC09.API.md#resoperand) ; `output_start`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) ; `output_end`: [`CellRef`](RPC.RPCSPEC09.API.md#cellref) } }

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/executable.d.ts:263

---

### IsPreConfirmed

Ƭ **IsPreConfirmed**<`T`\>: `Extract`<`T`, \{ `block_hash`: `never` }\>

Possible permutations of transaction.
BLOCK TYPE
TYPE OF TRANSACTION
EXECUTION (Reverted or not)
FINALITY (Rejected on not) Receipt do not have Rejected

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/expansions/transactionReceipt.d.ts:8

---

### IsInBlock

Ƭ **IsInBlock**<`T`\>: `T` extends \{ `block_hash`: `string` ; `block_number`: `number` } ? `T` extends \{ `block_hash`: `never` } ? `never` : `T` : `never`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/expansions/transactionReceipt.d.ts:11

---

### IsType

Ƭ **IsType**<`T`, `ETransactionType`\>: `Extract`<`T`, \{ `type`: `ETransactionType` }\>

#### Type parameters

| Name               |
| :----------------- |
| `T`                |
| `ETransactionType` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/expansions/transactionReceipt.d.ts:17

---

### IsSucceeded

Ƭ **IsSucceeded**<`T`\>: `Extract`<`T`, \{ `execution_status`: `"SUCCEEDED"` }\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/expansions/transactionReceipt.d.ts:20

---

### IsReverted

Ƭ **IsReverted**<`T`\>: `Extract`<`T`, \{ `execution_status`: `"REVERTED"` }\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/expansions/transactionReceipt.d.ts:23

## Variables

### STATUS_ACCEPTED_ON_L2

• **STATUS_ACCEPTED_ON_L2**: `"ACCEPTED_ON_L2"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:4

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:5

---

### STATUS_ACCEPTED_ON_L1

• **STATUS_ACCEPTED_ON_L1**: `"ACCEPTED_ON_L1"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:9

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:10

---

### STATUS_SUCCEEDED

• **STATUS_SUCCEEDED**: `"SUCCEEDED"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:14

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:15

---

### STATUS_REVERTED

• **STATUS_REVERTED**: `"REVERTED"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:19

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:20

---

### STATUS_RECEIVED

• **STATUS_RECEIVED**: `"RECEIVED"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:24

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:25

---

### STATUS_CANDIDATE

• **STATUS_CANDIDATE**: `"CANDIDATE"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:29

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:30

---

### STATUS_PRE_CONFIRMED

• **STATUS_PRE_CONFIRMED**: `"PRE_CONFIRMED"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:34

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:35

---

### STATUS_PRE_CONFIRMED_LOWERCASE

• **STATUS_PRE_CONFIRMED_LOWERCASE**: `"pre_confirmed"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:36

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:37

---

### TXN_TYPE_DECLARE

• **TXN_TYPE_DECLARE**: `"DECLARE"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:38

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:39

---

### TXN_TYPE_DEPLOY

• **TXN_TYPE_DEPLOY**: `"DEPLOY"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:40

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:41

---

### TXN_TYPE_DEPLOY_ACCOUNT

• **TXN_TYPE_DEPLOY_ACCOUNT**: `"DEPLOY_ACCOUNT"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:42

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:43

---

### TXN_TYPE_INVOKE

• **TXN_TYPE_INVOKE**: `"INVOKE"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:44

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:45

---

### TXN_TYPE_L1_HANDLER

• **TXN_TYPE_L1_HANDLER**: `"L1_HANDLER"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:46

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:47

---

### STRUCT_ABI_TYPE

• **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:48

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:49

---

### EVENT_ABI_TYPE

• **EVENT_ABI_TYPE**: `"event"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:50

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:51

---

### ABI_TYPE_FUNCTION

• **ABI_TYPE_FUNCTION**: `"function"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:52

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:53

---

### ABI_TYPE_CONSTRUCTOR

• **ABI_TYPE_CONSTRUCTOR**: `"constructor"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:54

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:55

---

### ABI_TYPE_L1_HANDLER

• **ABI_TYPE_L1_HANDLER**: `"l1_handler"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:56

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:57

---

### ABI_TYPE_ENUM

• **ABI_TYPE_ENUM**: `"enum"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:58

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:59

---

### STATE_MUTABILITY_VIEW

• **STATE_MUTABILITY_VIEW**: `"view"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:60

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:61

---

### STATE_MUTABILITY_EXTERNAL

• **STATE_MUTABILITY_EXTERNAL**: `"external"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:62

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:63

---

### PRICE_UNIT_WEI

• **PRICE_UNIT_WEI**: `"WEI"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:64

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:65

---

### PRICE_UNIT_FRI

• **PRICE_UNIT_FRI**: `"FRI"`

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:66

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:67

---

### L1_DA_MODE

• `Const` **L1_DA_MODE**: `Object`

#### Type declaration

| Name       | Type         |
| :--------- | :----------- |
| `BLOB`     | `"BLOB"`     |
| `CALLDATA` | `"CALLDATA"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:68

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:72

---

### CALL_TYPE

• `Const` **CALL_TYPE**: `Object`

Represents the type of a function call.

#### Type declaration

| Name           | Type             |
| :------------- | :--------------- |
| `DELEGATE`     | `"DELEGATE"`     |
| `LIBRARY_CALL` | `"LIBRARY_CALL"` |
| `CALL`         | `"CALL"`         |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:76

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:81

---

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

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:82

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:89

---

### ESimulationFlag

• `Const` **ESimulationFlag**: `Object`

#### Type declaration

| Name              | Type                |
| :---------------- | :------------------ |
| `SKIP_VALIDATE`   | `"SKIP_VALIDATE"`   |
| `SKIP_FEE_CHARGE` | `"SKIP_FEE_CHARGE"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:90

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:94

---

### ETransactionStatus

• `Const` **ETransactionStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `RECEIVED`       | `"RECEIVED"`       |
| `CANDIDATE`      | `"CANDIDATE"`      |
| `PRE_CONFIRMED`  | `"PRE_CONFIRMED"`  |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:95

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:102

---

### ETransactionFinalityStatus

• `Const` **ETransactionFinalityStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `PRE_CONFIRMED`  | `"PRE_CONFIRMED"`  |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:103

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:108

---

### ETransactionExecutionStatus

• `Const` **ETransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `SUCCEEDED` | `"SUCCEEDED"` |
| `REVERTED`  | `"REVERTED"`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:109

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:113

---

### EBlockTag

• `Const` **EBlockTag**: `Object`

A tag specifying a dynamic reference to a block.

#### Type declaration

| Name            | Type              | Description                                                                                                                            |
| :-------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `LATEST`        | `"latest"`        | Tag `latest` refers to the latest Starknet block finalized by the consensus on L2.                                                     |
| `PRE_CONFIRMED` | `"pre_confirmed"` | Tag `pre_confirmed` refers to the block which is currently being built by the block proposer in height `latest` + 1.                   |
| `L1_ACCEPTED`   | `"l1_accepted"`   | Tag `l1_accepted` refers to the latest Starknet block which was included in a state update on L1 and finalized by the consensus on L1. |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:118

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:132

---

### EBlockStatus

• `Const` **EBlockStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `PRE_CONFIRMED`  | `"PRE_CONFIRMED"`  |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:133

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:138

---

### EDataAvailabilityMode

• `Const` **EDataAvailabilityMode**: `Object`

#### Type declaration

| Name | Type   |
| :--- | :----- |
| `L1` | `"L1"` |
| `L2` | `"L2"` |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:139

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:143

---

### EDAMode

• `Const` **EDAMode**: `Object`

#### Type declaration

| Name | Type |
| :--- | :--- |
| `L1` | `0`  |
| `L2` | `1`  |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:144

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:148

---

### ETransactionVersion

• `Const` **ETransactionVersion**: `Object`

V* Transaction versions HexString
F* Fee Transaction Versions HexString (2 \*\* 128 + TRANSACTION_VERSION)

#### Type declaration

| Name | Type                                    | Description                                                      |
| :--- | :-------------------------------------- | :--------------------------------------------------------------- |
| `V0` | `"0x0"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V1` | `"0x1"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V2` | `"0x2"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V3` | `"0x3"`                                 | -                                                                |
| `F0` | `"0x100000000000000000000000000000000"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F1` | `"0x100000000000000000000000000000001"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F2` | `"0x100000000000000000000000000000002"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F3` | `"0x100000000000000000000000000000003"` | -                                                                |

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:153

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:181

---

### ETransactionVersion2

• `Const` **ETransactionVersion2**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

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

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:188

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:199

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

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:203

node_modules/@starknet-io/starknet-types-09/dist/types/api/constants.d.ts:207
