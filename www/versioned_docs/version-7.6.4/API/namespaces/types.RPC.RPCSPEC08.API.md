---
id: 'types.RPC.RPCSPEC08.API'
title: 'Namespace: API'
sidebar_label: 'API'
custom_edit_url: null
---

[RPC](types.RPC.md).[RPCSPEC08](types.RPC.RPCSPEC08.md).API

## Namespaces

- [CONTRACT](types.RPC.RPCSPEC08.API.CONTRACT.md)

## Interfaces

- [FAILED_TO_RECEIVE_TXN](../interfaces/types.RPC.RPCSPEC08.API.FAILED_TO_RECEIVE_TXN.md)
- [NO_TRACE_AVAILABLE](../interfaces/types.RPC.RPCSPEC08.API.NO_TRACE_AVAILABLE.md)
- [CONTRACT_NOT_FOUND](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_NOT_FOUND.md)
- [ENTRYPOINT_NOT_FOUND](../interfaces/types.RPC.RPCSPEC08.API.ENTRYPOINT_NOT_FOUND.md)
- [BLOCK_NOT_FOUND](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md)
- [INVALID_TXN_INDEX](../interfaces/types.RPC.RPCSPEC08.API.INVALID_TXN_INDEX.md)
- [CLASS_HASH_NOT_FOUND](../interfaces/types.RPC.RPCSPEC08.API.CLASS_HASH_NOT_FOUND.md)
- [TXN_HASH_NOT_FOUND](../interfaces/types.RPC.RPCSPEC08.API.TXN_HASH_NOT_FOUND.md)
- [PAGE_SIZE_TOO_BIG](../interfaces/types.RPC.RPCSPEC08.API.PAGE_SIZE_TOO_BIG.md)
- [NO_BLOCKS](../interfaces/types.RPC.RPCSPEC08.API.NO_BLOCKS.md)
- [INVALID_CONTINUATION_TOKEN](../interfaces/types.RPC.RPCSPEC08.API.INVALID_CONTINUATION_TOKEN.md)
- [TOO_MANY_KEYS_IN_FILTER](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_KEYS_IN_FILTER.md)
- [CONTRACT_ERROR](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_ERROR.md)
- [TRANSACTION_EXECUTION_ERROR](../interfaces/types.RPC.RPCSPEC08.API.TRANSACTION_EXECUTION_ERROR.md)
- [STORAGE_PROOF_NOT_SUPPORTED](../interfaces/types.RPC.RPCSPEC08.API.STORAGE_PROOF_NOT_SUPPORTED.md)
- [CLASS_ALREADY_DECLARED](../interfaces/types.RPC.RPCSPEC08.API.CLASS_ALREADY_DECLARED.md)
- [INVALID_TRANSACTION_NONCE](../interfaces/types.RPC.RPCSPEC08.API.INVALID_TRANSACTION_NONCE.md)
- [INSUFFICIENT_RESOURCES_FOR_VALIDATE](../interfaces/types.RPC.RPCSPEC08.API.INSUFFICIENT_RESOURCES_FOR_VALIDATE.md)
- [INSUFFICIENT_ACCOUNT_BALANCE](../interfaces/types.RPC.RPCSPEC08.API.INSUFFICIENT_ACCOUNT_BALANCE.md)
- [VALIDATION_FAILURE](../interfaces/types.RPC.RPCSPEC08.API.VALIDATION_FAILURE.md)
- [COMPILATION_FAILED](../interfaces/types.RPC.RPCSPEC08.API.COMPILATION_FAILED.md)
- [CONTRACT_CLASS_SIZE_IS_TOO_LARGE](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_CLASS_SIZE_IS_TOO_LARGE.md)
- [NON_ACCOUNT](../interfaces/types.RPC.RPCSPEC08.API.NON_ACCOUNT.md)
- [DUPLICATE_TX](../interfaces/types.RPC.RPCSPEC08.API.DUPLICATE_TX.md)
- [COMPILED_CLASS_HASH_MISMATCH](../interfaces/types.RPC.RPCSPEC08.API.COMPILED_CLASS_HASH_MISMATCH.md)
- [UNSUPPORTED_TX_VERSION](../interfaces/types.RPC.RPCSPEC08.API.UNSUPPORTED_TX_VERSION.md)
- [UNSUPPORTED_CONTRACT_CLASS_VERSION](../interfaces/types.RPC.RPCSPEC08.API.UNSUPPORTED_CONTRACT_CLASS_VERSION.md)
- [UNEXPECTED_ERROR](../interfaces/types.RPC.RPCSPEC08.API.UNEXPECTED_ERROR.md)
- [INVALID_SUBSCRIPTION_ID](../interfaces/types.RPC.RPCSPEC08.API.INVALID_SUBSCRIPTION_ID.md)
- [TOO_MANY_ADDRESSES_IN_FILTER](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_ADDRESSES_IN_FILTER.md)
- [TOO_MANY_BLOCKS_BACK](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md)
- [COMPILATION_ERROR](../interfaces/types.RPC.RPCSPEC08.API.COMPILATION_ERROR.md)

## Type Aliases

### Methods

Ƭ **Methods**: `ReadMethods` & `WriteMethods` & `TraceMethods`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/methods.d.ts:5

---

### WebSocketMethods

Ƭ **WebSocketMethods**: `Object`

#### Type declaration

| Name                                                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Description                                                                                                                                                                                                      |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `starknet_subscribeNewHeads`                                        | \{ `params`: \{ `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id) } ; `result`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) ; `errors`: [`TOO_MANY_BLOCKS_BACK`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md) ; `events`: [``"starknet_subscriptionNewHeads"``, ``"starknet_subscriptionReorg"``] }                                                                                                                                                                                                                                    | New block headers subscription. Creates a WebSocket stream which will fire events for new block headers.                                                                                                         |
| `starknet_subscribeNewHeads.params`                                 | \{ `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.params.block_id?`                       | [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | The block to get notifications from, default is latest, limited to 1024 blocks back                                                                                                                              |
| `starknet_subscribeNewHeads.result`                                 | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.errors`                                 | [`TOO_MANY_BLOCKS_BACK`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | -                                                                                                                                                                                                                |
| `starknet_subscribeNewHeads.events`                                 | [``"starknet_subscriptionNewHeads"``, ``"starknet_subscriptionReorg"``]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                |
| `starknet_subscribeEvents`                                          | \{ `params`: \{ `from_address?`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) ; `keys?`: [`EVENT_KEYS`](types.RPC.RPCSPEC08.API.md#event_keys) ; `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id) } ; `result`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) ; `errors`: [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_KEYS_IN_FILTER.md) \| [`TOO_MANY_BLOCKS_BACK`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md) ; `events`: [``"starknet_subscriptionEvents"``, ``"starknet_subscriptionReorg"``] } | New events subscription. Creates a WebSocket stream which will fire events for new Starknet events with applied filters.                                                                                         |
| `starknet_subscribeEvents.params`                                   | \{ `from_address?`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) ; `keys?`: [`EVENT_KEYS`](types.RPC.RPCSPEC08.API.md#event_keys) ; `block_id?`: [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | -                                                                                                                                                                                                                |
| `starknet_subscribeEvents.params.from_address?`                     | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Filter events by from_address which emitted the event                                                                                                                                                            |
| `starknet_subscribeEvents.params.keys?`                             | [`EVENT_KEYS`](types.RPC.RPCSPEC08.API.md#event_keys)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -                                                                                                                                                                                                                |
| `starknet_subscribeEvents.params.block_id?`                         | [`SUBSCRIPTION_BLOCK_ID`](types.RPC.RPCSPEC08.API.md#subscription_block_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | The block to get notifications from, default is latest, limited to 1024 blocks back                                                                                                                              |
| `starknet_subscribeEvents.result`                                   | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                                                                                                |
| `starknet_subscribeEvents.errors`                                   | [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_KEYS_IN_FILTER.md) \| [`TOO_MANY_BLOCKS_BACK`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md) \| [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md)                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                |
| `starknet_subscribeEvents.events`                                   | [``"starknet_subscriptionEvents"``, ``"starknet_subscriptionReorg"``]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus`                               | \{ `params`: \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) } ; `result`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) ; `events`: [``"starknet_subscriptionTransactionStatus"``, ``"starknet_subscriptionReorg"``] }                                                                                                                                                                                                                                                                                                                                                                                                                                           | New transaction status subscription. Creates a WebSocket stream which at first fires an event with the current known transaction status, followed by events for every transaction status update                  |
| `starknet_subscribeTransactionStatus.params`                        | \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | -                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.params.transaction_hash`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.result`                        | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                                                                                                |
| `starknet_subscribeTransactionStatus.events`                        | [``"starknet_subscriptionTransactionStatus"``, ``"starknet_subscriptionReorg"``]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | -                                                                                                                                                                                                                |
| `starknet_subscribePendingTransactions`                             | \{ `params`: \{ `transaction_details?`: `Boolean` ; `sender_address?`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)[] } ; `result`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) ; `errors`: [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_ADDRESSES_IN_FILTER.md) ; `events`: [``"starknet_subscriptionPendingTransactions"``] }                                                                                                                                                                                                                                                                                                            | New Pending Transactions subscription. Creates a WebSocket stream which will fire events when a new pending transaction is added. While there is no mempool, this notifies of transactions in the pending block. |
| `starknet_subscribePendingTransactions.params`                      | \{ `transaction_details?`: `Boolean` ; `sender_address?`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)[] }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                                |
| `starknet_subscribePendingTransactions.params.transaction_details?` | `Boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | "Get all transaction details, and not only the hash. If not provided, only hash is returned. Default is false"                                                                                                   |
| `starknet_subscribePendingTransactions.params.sender_address?`      | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Filter transactions to only receive notification from address list                                                                                                                                               |
| `starknet_subscribePendingTransactions.result`                      | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                                                                                                |
| `starknet_subscribePendingTransactions.errors`                      | [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_ADDRESSES_IN_FILTER.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                |
| `starknet_subscribePendingTransactions.events`                      | [``"starknet_subscriptionPendingTransactions"``]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | -                                                                                                                                                                                                                |
| `starknet_unsubscribe`                                              | \{ `params`: \{ `subscription_id`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) } ; `result`: `Boolean` ; `errors`: [`INVALID_SUBSCRIPTION_ID`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_SUBSCRIPTION_ID.md) }                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Close a previously opened ws stream, with the corresponding subscription id                                                                                                                                      |
| `starknet_unsubscribe.params`                                       | \{ `subscription_id`: [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                                |
| `starknet_unsubscribe.params.subscription_id`                       | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -                                                                                                                                                                                                                |
| `starknet_unsubscribe.result`                                       | `Boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | -                                                                                                                                                                                                                |
| `starknet_unsubscribe.errors`                                       | [`INVALID_SUBSCRIPTION_ID`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_SUBSCRIPTION_ID.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                                |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/methods.d.ts:280

---

### WebSocketEvents

Ƭ **WebSocketEvents**: `Object`

Server -> Client events over WebSockets

#### Type declaration

| Name                                       | Type                                                                                                            |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `starknet_subscriptionReorg`               | [`SubscriptionReorgResponse`](types.RPC.RPCSPEC08.API.md#subscriptionreorgresponse)                             |
| `starknet_subscriptionNewHeads`            | [`SubscriptionNewHeadsResponse`](types.RPC.RPCSPEC08.API.md#subscriptionnewheadsresponse)                       |
| `starknet_subscriptionEvents`              | [`SubscriptionEventsResponse`](types.RPC.RPCSPEC08.API.md#subscriptioneventsresponse)                           |
| `starknet_subscriptionTransactionStatus`   | [`SubscriptionTransactionsStatusResponse`](types.RPC.RPCSPEC08.API.md#subscriptiontransactionsstatusresponse)   |
| `starknet_subscriptionPendingTransactions` | [`SubscriptionPendingTransactionsResponse`](types.RPC.RPCSPEC08.API.md#subscriptionpendingtransactionsresponse) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/methods.d.ts:360

---

### FELT

Ƭ **FELT**: `string`

A field element. represented by at most 63 hex digits

**`Pattern`**

^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:7

---

### ETH_ADDRESS

Ƭ **ETH_ADDRESS**: `string`

an ethereum address represented as 40 hex digits

**`Pattern`**

^0x[a-fA-F0-9]{40}$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:12

---

### STORAGE_KEY

Ƭ **STORAGE_KEY**: `string`

A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.

**`Pattern`**

^0x(0|[0-7]{1}[a-fA-F0-9]{0,62}$)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:17

---

### ADDRESS

Ƭ **ADDRESS**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

A contract address on Starknet

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:21

---

### NUM_AS_HEX

Ƭ **NUM_AS_HEX**: `string`

string representing an integer number in prefixed hexadecimal format

**`Example`**

```ts
'0x..';
```

**`Pattern`**

^0x[a-fA-F0-9]+$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:27

---

### u64

Ƭ **u64**: `string`

64 bit integers, represented by hex string of length at most 16
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$"

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:32

---

### u128

Ƭ **u128**: `string`

128 bit integers, represented by hex string of length at most 32
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$"

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:37

---

### SIGNATURE

Ƭ **SIGNATURE**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:38

---

### BLOCK_NUMBER

Ƭ **BLOCK_NUMBER**: `number`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:39

---

### BLOCK_HASH

Ƭ **BLOCK_HASH**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:40

---

### TXN_HASH

Ƭ **TXN_HASH**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

The hash of an Starknet transaction

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:44

---

### L1_TXN_HASH

Ƭ **L1_TXN_HASH**: [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex)

The hash of an Ethereum transaction

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:48

---

### CHAIN_ID

Ƭ **CHAIN_ID**: [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:49

---

### STATE_MUTABILITY

Ƭ **STATE_MUTABILITY**: [`STATE_MUTABILITY_VIEW`](types.RPC.RPCSPEC08.API.md#state_mutability_view-1) \| [`STATE_MUTABILITY_EXTERNAL`](types.RPC.RPCSPEC08.API.md#state_mutability_external-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:50

---

### FUNCTION_ABI_TYPE

Ƭ **FUNCTION_ABI_TYPE**: [`ABI_TYPE_FUNCTION`](types.RPC.RPCSPEC08.API.md#abi_type_function-1) \| [`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1) \| [`ABI_TYPE_CONSTRUCTOR`](types.RPC.RPCSPEC08.API.md#abi_type_constructor-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:51

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:55

---

### ABI_TYPE

Ƭ **ABI_TYPE**: `Object`

common outputs

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:62

---

### ENTRY_POINT_TYPE

Ƭ **ENTRY_POINT_TYPE**: `Uppercase`<[`STATE_MUTABILITY_EXTERNAL`](types.RPC.RPCSPEC08.API.md#state_mutability_external-1)\> \| `Uppercase`<[`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1)\> \| `Uppercase`<[`ABI_TYPE_CONSTRUCTOR`](types.RPC.RPCSPEC08.API.md#abi_type_constructor-1)\>

Represents the type of an entry point.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:68

---

### TXN_STATUS

Ƭ **TXN_STATUS**: [`STATUS_RECEIVED`](types.RPC.RPCSPEC08.API.md#status_received-1) \| [`STATUS_REJECTED`](types.RPC.RPCSPEC08.API.md#status_rejected-1) \| [`STATUS_ACCEPTED_ON_L2`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l2-1) \| [`STATUS_ACCEPTED_ON_L1`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l1-1)

Represents the finality status of the transaction, including the case the txn is still in the mempool or failed validation during the block construction phase

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:72

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: typeof [`SKIP_VALIDATE`](types.RPC.RPCSPEC08.API.md#skip_validate) \| typeof [`SKIP_FEE_CHARGE`](types.RPC.RPCSPEC08.API.md#skip_fee_charge)

Flags that indicate how to simulate a given transaction. By default, the sequencer behavior is replicated locally (enough funds are expected to be in the account, and the fee will be deducted from the balance before the simulation of the next transaction). To skip the fee charge, use the SKIP_FEE_CHARGE flag.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:76

---

### DA_MODE

Ƭ **DA_MODE**: [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1)

Data availability mode.
Specifies a storage domain in Starknet. Each domain has different guarantees regarding availability

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:81

---

### TXN_TYPE

Ƭ **TXN_TYPE**: [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1) \| [`TXN_TYPE_DEPLOY`](types.RPC.RPCSPEC08.API.md#txn_type_deploy-1) \| [`TXN_TYPE_DEPLOY_ACCOUNT`](types.RPC.RPCSPEC08.API.md#txn_type_deploy_account-1) \| [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1) \| `Uppercase`<[`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1)\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:82

---

### TXN_FINALITY_STATUS

Ƭ **TXN_FINALITY_STATUS**: [`STATUS_ACCEPTED_ON_L2`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l2-1) \| [`STATUS_ACCEPTED_ON_L1`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l1-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:83

---

### TXN_EXECUTION_STATUS

Ƭ **TXN_EXECUTION_STATUS**: [`STATUS_SUCCEEDED`](types.RPC.RPCSPEC08.API.md#status_succeeded-1) \| [`STATUS_REVERTED`](types.RPC.RPCSPEC08.API.md#status_reverted-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:84

---

### BLOCK_STATUS

Ƭ **BLOCK_STATUS**: [`STATUS_PENDING`](types.RPC.RPCSPEC08.API.md#status_pending-1) \| [`STATUS_ACCEPTED_ON_L2`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l2-1) \| [`STATUS_ACCEPTED_ON_L1`](types.RPC.RPCSPEC08.API.md#status_accepted_on_l1-1) \| [`STATUS_REJECTED`](types.RPC.RPCSPEC08.API.md#status_rejected-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:85

---

### BLOCK_SELECTOR

Ƭ **BLOCK_SELECTOR**: `SimpleOneOf`<\{ `block_hash`: [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash) }, \{ `block_number`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) }\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:86

---

### BLOCK_TAG

Ƭ **BLOCK_TAG**: [`EBlockTag`](types.RPC.RPCSPEC08.API.md#eblocktag-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:91

---

### SUBSCRIPTION_BLOCK_TAG

Ƭ **SUBSCRIPTION_BLOCK_TAG**: `"latest"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:92

---

### SUBSCRIPTION_ID

Ƭ **SUBSCRIPTION_ID**: `string`

An identifier for this subscription stream used to associate events with this subscription.
Integer

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:97

---

### NEW_TXN_STATUS

Ƭ **NEW_TXN_STATUS**: `Object`

#### Type declaration

| Name               | Type                                                                |
| :----------------- | :------------------------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash)                   |
| `status`           | [`TXN_STATUS_RESULT`](types.RPC.RPCSPEC08.API.md#txn_status_result) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:98

---

### REORG_DATA

Ƭ **REORG_DATA**: `Object`

Data about reorganized blocks, starting and ending block number and hash

#### Type declaration

| Name                    | Type                                                      | Description                                           |
| :---------------------- | :-------------------------------------------------------- | :---------------------------------------------------- |
| `starting_block_hash`   | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     | Hash of the first known block of the orphaned chain   |
| `starting_block_number` | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) | Number of the first known block of the orphaned chain |
| `ending_block_hash`     | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     | The last known block of the orphaned chain            |
| `ending_block_number`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) | Number of the last known block of the orphaned chain  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:105

---

### SubscriptionNewHeadsResponse

Ƭ **SubscriptionNewHeadsResponse**: `Object`

#### Type declaration

| Name              | Type                                                            |
| :---------------- | :-------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) |
| `result`          | [`BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#block_header)       |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:123

---

### SubscriptionEventsResponse

Ƭ **SubscriptionEventsResponse**: `Object`

#### Type declaration

| Name              | Type                                                            |
| :---------------- | :-------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) |
| `result`          | [`EMITTED_EVENT`](types.RPC.RPCSPEC08.API.md#emitted_event)     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:127

---

### SubscriptionTransactionsStatusResponse

Ƭ **SubscriptionTransactionsStatusResponse**: `Object`

#### Type declaration

| Name              | Type                                                            |
| :---------------- | :-------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) |
| `result`          | [`NEW_TXN_STATUS`](types.RPC.RPCSPEC08.API.md#new_txn_status)   |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:131

---

### SubscriptionPendingTransactionsResponse

Ƭ **SubscriptionPendingTransactionsResponse**: `Object`

#### Type declaration

| Name              | Type                                                                                                             |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id)                                                  |
| `result`          | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) \| [`TXN_WITH_HASH`](types.RPC.RPCSPEC08.API.md#txn_with_hash) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:135

---

### SubscriptionReorgResponse

Ƭ **SubscriptionReorgResponse**: `Object`

#### Type declaration

| Name              | Type                                                            |
| :---------------- | :-------------------------------------------------------------- |
| `subscription_id` | [`SUBSCRIPTION_ID`](types.RPC.RPCSPEC08.API.md#subscription_id) |
| `result`          | [`REORG_DATA`](types.RPC.RPCSPEC08.API.md#reorg_data)           |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:139

---

### EVENTS_CHUNK

Ƭ **EVENTS_CHUNK**: `Object`

#### Type declaration

| Name                  | Type                                                          | Description                                                                                                 |
| :-------------------- | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `events`              | [`EMITTED_EVENT`](types.RPC.RPCSPEC08.API.md#emitted_event)[] | Returns matching events                                                                                     |
| `continuation_token?` | `string`                                                      | Use this token in a subsequent query to obtain the next page. Should not appear if there are no more pages. |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:143

---

### RESULT_PAGE_REQUEST

Ƭ **RESULT_PAGE_REQUEST**: `Object`

#### Type declaration

| Name                  | Type     | Description                                                                                     |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------- |
| `continuation_token?` | `string` | The token returned from the previous query. If no token is provided the first page is returned. |
| `chunk_size`          | `number` | Chunk size                                                                                      |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:153

---

### EMITTED_EVENT

Ƭ **EMITTED_EVENT**: [`EVENT`](types.RPC.RPCSPEC08.API.md#event) & \{ `block_hash`: [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash) ; `block_number`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) ; `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:163

---

### EVENT

Ƭ **EVENT**: \{ `from_address`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) } & [`EVENT_CONTENT`](types.RPC.RPCSPEC08.API.md#event_content)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:168

---

### EVENT_CONTENT

Ƭ **EVENT_CONTENT**: `Object`

#### Type declaration

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `keys` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[] |
| `data` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:171

---

### EVENT_KEYS

Ƭ **EVENT_KEYS**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[][]

The keys to filter over.
Per key (by position), designate the possible values to be matched for events to be returned. Empty array designates 'any' value.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:179

---

### EVENT_FILTER

Ƭ **EVENT_FILTER**: `Object`

#### Type declaration

| Name          | Type                                                  |
| :------------ | :---------------------------------------------------- |
| `from_block?` | [`BLOCK_ID`](types.RPC.RPCSPEC08.API.md#block_id)     |
| `to_block?`   | [`BLOCK_ID`](types.RPC.RPCSPEC08.API.md#block_id)     |
| `address?`    | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)       |
| `keys?`       | [`EVENT_KEYS`](types.RPC.RPCSPEC08.API.md#event_keys) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:180

---

### BLOCK_ID

Ƭ **BLOCK_ID**: [`BLOCK_SELECTOR`](types.RPC.RPCSPEC08.API.md#block_selector) \| [`BLOCK_TAG`](types.RPC.RPCSPEC08.API.md#block_tag)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:186

---

### SUBSCRIPTION_BLOCK_ID

Ƭ **SUBSCRIPTION_BLOCK_ID**: [`BLOCK_SELECTOR`](types.RPC.RPCSPEC08.API.md#block_selector) \| [`SUBSCRIPTION_BLOCK_TAG`](types.RPC.RPCSPEC08.API.md#subscription_block_tag)

same as BLOCK_ID, but without 'pending'

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:190

---

### SYNC_STATUS

Ƭ **SYNC_STATUS**: `Object`

#### Type declaration

| Name                  | Type                                                      |
| :-------------------- | :-------------------------------------------------------- |
| `starting_block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     |
| `starting_block_num`  | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) |
| `current_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     |
| `current_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) |
| `highest_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     |
| `highest_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:191

---

### NEW_CLASSES

Ƭ **NEW_CLASSES**: `Object`

#### Type declaration

| Name                  | Type                                      |
| :-------------------- | :---------------------------------------- |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:199

---

### REPLACED_CLASS

Ƭ **REPLACED_CLASS**: `Object`

#### Type declaration

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:203

---

### NONCE_UPDATE

Ƭ **NONCE_UPDATE**: `Object`

#### Type declaration

| Name               | Type                                            |
| :----------------- | :---------------------------------------------- |
| `contract_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `nonce`            | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:207

---

### STATE_DIFF

Ƭ **STATE_DIFF**: `Object`

#### Type declaration

| Name                          | Type                                                                                    |
| :---------------------------- | :-------------------------------------------------------------------------------------- |
| `storage_diffs`               | [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC08.API.md#contract_storage_diff_item)[] |
| `deprecated_declared_classes` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                             |
| `declared_classes`            | [`NEW_CLASSES`](types.RPC.RPCSPEC08.API.md#new_classes)[]                               |
| `deployed_contracts`          | [`DEPLOYED_CONTRACT_ITEM`](types.RPC.RPCSPEC08.API.md#deployed_contract_item)[]         |
| `replaced_classes`            | [`REPLACED_CLASS`](types.RPC.RPCSPEC08.API.md#replaced_class)[]                         |
| `nonces`                      | [`NONCE_UPDATE`](types.RPC.RPCSPEC08.API.md#nonce_update)[]                             |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:211

---

### PENDING_STATE_UPDATE

Ƭ **PENDING_STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                  |
| :----------- | :---------------------------------------------------- |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff) |
| `block_hash` | `never`                                               |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:219

---

### STATE_UPDATE

Ƭ **STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                  |
| :----------- | :---------------------------------------------------- |
| `block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash) |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             |
| `new_root`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:224

---

### BLOCK_BODY_WITH_TX_HASHES

Ƭ **BLOCK_BODY_WITH_TX_HASHES**: `Object`

#### Type declaration

| Name           | Type                                                |
| :------------- | :-------------------------------------------------- |
| `transactions` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:230

---

### BLOCK_BODY_WITH_TXS

Ƭ **BLOCK_BODY_WITH_TXS**: `Object`

#### Type declaration

| Name           | Type                                                          |
| :------------- | :------------------------------------------------------------ |
| `transactions` | [`TXN_WITH_HASH`](types.RPC.RPCSPEC08.API.md#txn_with_hash)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:233

---

### BLOCK_BODY_WITH_RECEIPTS

Ƭ **BLOCK_BODY_WITH_RECEIPTS**: `Object`

#### Type declaration

| Name           | Type                                                                                                                               |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `transactions` | \{ `transaction`: [`TXN`](types.RPC.RPCSPEC08.API.md#txn) ; `receipt`: [`TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#txn_receipt) }[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:236

---

### BLOCK_HEADER

Ƭ **BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                          |
| :------------------ | :------------------------------------------------------------ |
| `block_hash`        | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)         |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)         |
| `block_number`      | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number)     |
| `new_root`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                     |
| `timestamp`         | `number`                                                      |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l2_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l1_da_mode`        | [`L1_DA_MODE`](types.RPC.RPCSPEC08.API.md#l1_da_mode-1)       |
| `starknet_version`  | `string`                                                      |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:242

---

### PENDING_BLOCK_HEADER

Ƭ **PENDING_BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                          |
| :------------------ | :------------------------------------------------------------ |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)         |
| `timestamp`         | `number`                                                      |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l2_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price) |
| `l1_da_mode`        | [`L1_DA_MODE`](types.RPC.RPCSPEC08.API.md#l1_da_mode-1)       |
| `starknet_version`  | `string`                                                      |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:255

---

### BLOCK_WITH_TX_HASHES

Ƭ **BLOCK_WITH_TX_HASHES**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:265

---

### BLOCK_WITH_TXS

Ƭ **BLOCK_WITH_TXS**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC08.API.md#block_body_with_txs)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:268

---

### BLOCK_WITH_RECEIPTS

Ƭ **BLOCK_WITH_RECEIPTS**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](types.RPC.RPCSPEC08.API.md#block_body_with_receipts)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:271

---

### PENDING_BLOCK_WITH_TX_HASHES

Ƭ **PENDING_BLOCK_WITH_TX_HASHES**: [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#pending_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:274

---

### PENDING_BLOCK_WITH_TXS

Ƭ **PENDING_BLOCK_WITH_TXS**: [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#pending_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:275

---

### PENDING_BLOCK_WITH_RECEIPTS

Ƭ **PENDING_BLOCK_WITH_RECEIPTS**: [`BLOCK_BODY_WITH_RECEIPTS`](types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC08.API.md#pending_block_header)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:276

---

### DEPLOYED_CONTRACT_ITEM

Ƭ **DEPLOYED_CONTRACT_ITEM**: `Object`

#### Type declaration

| Name         | Type                                      |
| :----------- | :---------------------------------------- |
| `address`    | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `class_hash` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:277

---

### CONTRACT_STORAGE_DIFF_ITEM

Ƭ **CONTRACT_STORAGE_DIFF_ITEM**: `Object`

#### Type declaration

| Name              | Type                                                              | Description                                        |
| :---------------- | :---------------------------------------------------------------- | :------------------------------------------------- |
| `address`         | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                         | The contract address for which the storage changed |
| `storage_entries` | [`StorageDiffItem`](types.RPC.RPCSPEC08.API.md#storagediffitem)[] | The changes in the storage of the contract         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:281

---

### StorageDiffItem

Ƭ **StorageDiffItem**: `Object`

#### Type declaration

| Name    | Type                                      | Description                                |
| :------ | :---------------------------------------- | :----------------------------------------- |
| `key`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) | The key of the changed value               |
| `value` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) | The new value applied to the given address |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:291

---

### TXN

Ƭ **TXN**: [`INVOKE_TXN`](types.RPC.RPCSPEC08.API.md#invoke_txn) \| [`L1_HANDLER_TXN`](types.RPC.RPCSPEC08.API.md#l1_handler_txn) \| [`DECLARE_TXN`](types.RPC.RPCSPEC08.API.md#declare_txn) \| [`DEPLOY_TXN`](types.RPC.RPCSPEC08.API.md#deploy_txn) \| [`DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC08.API.md#deploy_account_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:301

---

### TXN_WITH_HASH

Ƭ **TXN_WITH_HASH**: [`TXN`](types.RPC.RPCSPEC08.API.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:302

---

### DECLARE_TXN

Ƭ **DECLARE_TXN**: [`DECLARE_TXN_V0`](types.RPC.RPCSPEC08.API.md#declare_txn_v0) \| [`DECLARE_TXN_V1`](types.RPC.RPCSPEC08.API.md#declare_txn_v1) \| [`DECLARE_TXN_V2`](types.RPC.RPCSPEC08.API.md#declare_txn_v2) \| [`DECLARE_TXN_V3`](types.RPC.RPCSPEC08.API.md#declare_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:305

---

### DECLARE_TXN_V0

Ƭ **DECLARE_TXN_V0**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)                          |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`        | typeof [`V0`](types.RPC.RPCSPEC08.API.md#v0) \| typeof [`F0`](types.RPC.RPCSPEC08.API.md#f0) |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:309

---

### DECLARE_TXN_V1

Ƭ **DECLARE_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)                          |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`        | typeof [`V1`](types.RPC.RPCSPEC08.API.md#v1) \| typeof [`F1`](types.RPC.RPCSPEC08.API.md#f1) |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:320

---

### DECLARE_TXN_V2

Ƭ **DECLARE_TXN_V2**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                  | Type                                                                                         |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| `type`                | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)                          |
| `sender_address`      | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `max_fee`             | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`             | typeof [`V2`](types.RPC.RPCSPEC08.API.md#v2) \| typeof [`F2`](types.RPC.RPCSPEC08.API.md#f2) |
| `signature`           | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:332

---

### DECLARE_TXN_V3

Ƭ **DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                         |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)                          |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`                      | typeof [`V3`](types.RPC.RPCSPEC08.API.md#v3) \| typeof [`F3`](types.RPC.RPCSPEC08.API.md#f3) |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping)              |
| `tip`                          | [`u64`](types.RPC.RPCSPEC08.API.md#u64)                                                      |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:342

---

### BROADCASTED_TXN

Ƭ **BROADCASTED_TXN**: [`BROADCASTED_INVOKE_TXN`](types.RPC.RPCSPEC08.API.md#broadcasted_invoke_txn) \| [`BROADCASTED_DECLARE_TXN`](types.RPC.RPCSPEC08.API.md#broadcasted_declare_txn) \| [`BROADCASTED_DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC08.API.md#broadcasted_deploy_account_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:357

---

### BROADCASTED_INVOKE_TXN

Ƭ **BROADCASTED_INVOKE_TXN**: [`INVOKE_TXN_V3`](types.RPC.RPCSPEC08.API.md#invoke_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:358

---

### BROADCASTED_DEPLOY_ACCOUNT_TXN

Ƭ **BROADCASTED_DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V3`](types.RPC.RPCSPEC08.API.md#deploy_account_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:359

---

### BROADCASTED_DECLARE_TXN

Ƭ **BROADCASTED_DECLARE_TXN**: [`BROADCASTED_DECLARE_TXN_V3`](types.RPC.RPCSPEC08.API.md#broadcasted_declare_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:360

---

### BROADCASTED_DECLARE_TXN_V3

Ƭ **BROADCASTED_DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                         |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)                          |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`                      | typeof [`V3`](types.RPC.RPCSPEC08.API.md#v3) \| typeof [`F3`](types.RPC.RPCSPEC08.API.md#f3) |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `contract_class`               | [`CONTRACT_CLASS`](types.RPC.RPCSPEC08.API.md#contract_class)                                |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping)              |
| `tip`                          | [`u64`](types.RPC.RPCSPEC08.API.md#u64)                                                      |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:361

---

### DEPLOY_ACCOUNT_TXN

Ƭ **DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V1`](types.RPC.RPCSPEC08.API.md#deploy_account_txn_v1) \| [`DEPLOY_ACCOUNT_TXN_V3`](types.RPC.RPCSPEC08.API.md#deploy_account_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:376

---

### DEPLOY_ACCOUNT_TXN_V1

Ƭ **DEPLOY_ACCOUNT_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                    | Type                                                                                         |
| :---------------------- | :------------------------------------------------------------------------------------------- |
| `type`                  | [`TXN_TYPE_DEPLOY_ACCOUNT`](types.RPC.RPCSPEC08.API.md#txn_type_deploy_account-1)            |
| `max_fee`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`               | typeof [`V1`](types.RPC.RPCSPEC08.API.md#v1) \| typeof [`F1`](types.RPC.RPCSPEC08.API.md#f1) |
| `signature`             | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`                 | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:380

---

### DEPLOY_ACCOUNT_TXN_V3

Ƭ **DEPLOY_ACCOUNT_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                         |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_DEPLOY_ACCOUNT`](types.RPC.RPCSPEC08.API.md#txn_type_deploy_account-1)            |
| `version`                      | typeof [`V3`](types.RPC.RPCSPEC08.API.md#v3) \| typeof [`F3`](types.RPC.RPCSPEC08.API.md#f3) |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `contract_address_salt`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `constructor_calldata`         | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping)              |
| `tip`                          | [`u64`](types.RPC.RPCSPEC08.API.md#u64)                                                      |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:390

---

### DEPLOY_TXN

Ƭ **DEPLOY_TXN**: `Object`

#### Type declaration

| Name                    | Type                                                              |
| :---------------------- | :---------------------------------------------------------------- |
| `type`                  | [`TXN_TYPE_DEPLOY`](types.RPC.RPCSPEC08.API.md#txn_type_deploy-1) |
| `version`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                         |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                         |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                       |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:404

---

### INVOKE_TXN

Ƭ **INVOKE_TXN**: [`INVOKE_TXN_V0`](types.RPC.RPCSPEC08.API.md#invoke_txn_v0) \| [`INVOKE_TXN_V1`](types.RPC.RPCSPEC08.API.md#invoke_txn_v1) \| [`INVOKE_TXN_V3`](types.RPC.RPCSPEC08.API.md#invoke_txn_v3)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:411

---

### INVOKE_TXN_V0

Ƭ **INVOKE_TXN_V0**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name                   | Type                                                                                         |
| :--------------------- | :------------------------------------------------------------------------------------------- |
| `type`                 | [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1)                            |
| `max_fee`              | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`              | typeof [`V0`](types.RPC.RPCSPEC08.API.md#v0) \| typeof [`F0`](types.RPC.RPCSPEC08.API.md#f0) |
| `signature`            | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:415

---

### INVOKE_TXN_V1

Ƭ **INVOKE_TXN_V1**: `Object`

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Type declaration

| Name             | Type                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `type`           | [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1)                            |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `calldata`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `version`        | typeof [`V1`](types.RPC.RPCSPEC08.API.md#v1) \| typeof [`F1`](types.RPC.RPCSPEC08.API.md#f1) |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:427

---

### INVOKE_TXN_V3

Ƭ **INVOKE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                         |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| `type`                         | [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1)                            |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)                                              |
| `calldata`                     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `version`                      | typeof [`V3`](types.RPC.RPCSPEC08.API.md#v3) \| typeof [`F3`](types.RPC.RPCSPEC08.API.md#f3) |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)                                          |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                    |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping)              |
| `tip`                          | [`u64`](types.RPC.RPCSPEC08.API.md#u64)                                                      |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                  |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC08.API.md#da_mode)                                              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:436

---

### L1_HANDLER_TXN

Ƭ **L1_HANDLER_TXN**: \{ `version`: typeof [`V0`](types.RPC.RPCSPEC08.API.md#v0) ; `type`: `Uppercase`<[`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1)\> ; `nonce`: [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) } & [`FUNCTION_CALL`](types.RPC.RPCSPEC08.API.md#function_call)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:450

---

### COMMON_RECEIPT_PROPERTIES

Ƭ **COMMON_RECEIPT_PROPERTIES**: \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) ; `actual_fee`: [`FEE_PAYMENT`](types.RPC.RPCSPEC08.API.md#fee_payment) ; `finality_status`: [`TXN_FINALITY_STATUS`](types.RPC.RPCSPEC08.API.md#txn_finality_status) ; `messages_sent`: [`MSG_TO_L1`](types.RPC.RPCSPEC08.API.md#msg_to_l1)[] ; `events`: [`EVENT`](types.RPC.RPCSPEC08.API.md#event)[] ; `execution_resources`: [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#execution_resources) } & `SimpleOneOf`<`SUCCESSFUL_COMMON_RECEIPT_PROPERTIES`, `REVERTED_COMMON_RECEIPT_PROPERTIES`\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:455

---

### INVOKE_TXN_RECEIPT

Ƭ **INVOKE_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC08.API.md#common_receipt_properties)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:470

---

### DECLARE_TXN_RECEIPT

Ƭ **DECLARE_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC08.API.md#common_receipt_properties)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:473

---

### DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **DEPLOY_ACCOUNT_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DEPLOY_ACCOUNT`](types.RPC.RPCSPEC08.API.md#txn_type_deploy_account-1) ; `contract_address`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC08.API.md#common_receipt_properties)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:476

---

### DEPLOY_TXN_RECEIPT

Ƭ **DEPLOY_TXN_RECEIPT**: \{ `type`: [`TXN_TYPE_DEPLOY`](types.RPC.RPCSPEC08.API.md#txn_type_deploy-1) ; `contract_address`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC08.API.md#common_receipt_properties)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:480

---

### L1_HANDLER_TXN_RECEIPT

Ƭ **L1_HANDLER_TXN_RECEIPT**: \{ `type`: `Uppercase`<[`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1)\> ; `message_hash`: [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC08.API.md#common_receipt_properties)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:484

---

### TXN_RECEIPT

Ƭ **TXN_RECEIPT**: [`INVOKE_TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#invoke_txn_receipt) \| [`L1_HANDLER_TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#l1_handler_txn_receipt) \| [`DECLARE_TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#declare_txn_receipt) \| [`DEPLOY_TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#deploy_txn_receipt) \| [`DEPLOY_ACCOUNT_TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#deploy_account_txn_receipt)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:488

---

### TXN_RECEIPT_WITH_BLOCK_INFO

Ƭ **TXN_RECEIPT_WITH_BLOCK_INFO**: [`TXN_RECEIPT`](types.RPC.RPCSPEC08.API.md#txn_receipt) & \{ `block_hash`: [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash) ; `block_number`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) } \| \{ `block_hash`: `never` ; `block_number`: `never` }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:489

---

### MSG_TO_L1

Ƭ **MSG_TO_L1**: `Object`

#### Type declaration

| Name           | Type                                        |
| :------------- | :------------------------------------------ |
| `from_address` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)   |
| `to_address`   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)   |
| `payload`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:508

---

### MSG_FROM_L1

Ƭ **MSG_FROM_L1**: `Object`

#### Type declaration

| Name                   | Type                                                    |
| :--------------------- | :------------------------------------------------------ |
| `from_address`         | [`ETH_ADDRESS`](types.RPC.RPCSPEC08.API.md#eth_address) |
| `to_address`           | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)         |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)               |
| `payload`              | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]             |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:513

---

### FUNCTION_CALL

Ƭ **FUNCTION_CALL**: `Object`

#### Type declaration

| Name                   | Type                                            |
| :--------------------- | :---------------------------------------------- |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:519

---

### CONTRACT_CLASS

Ƭ **CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                      |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sierra_program`                   | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                                                                                                                                                                                               |
| `contract_class_version`           | `string`                                                                                                                                                                                                                                                                  |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[] ; `EXTERNAL`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[] ; `L1_HANDLER`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[]                                                                                                                                                                                                   |
| `entry_points_by_type.EXTERNAL`    | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[]                                                                                                                                                                                                   |
| `entry_points_by_type.L1_HANDLER`  | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#sierra_entry_point)[]                                                                                                                                                                                                   |
| `abi`                              | `string`                                                                                                                                                                                                                                                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:524

---

### DEPRECATED_CONTRACT_CLASS

Ƭ **DEPRECATED_CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                                                                                  |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `program`                          | `string`                                                                                                                                                                                                                                                                                                                              |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[] ; `EXTERNAL`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[] ; `L1_HANDLER`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                           |
| `entry_points_by_type.EXTERNAL`    | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                           |
| `entry_points_by_type.L1_HANDLER`  | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                           |
| `abi`                              | [`CONTRACT_ABI`](types.RPC.RPCSPEC08.API.md#contract_abi)                                                                                                                                                                                                                                                                             |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:534

---

### DEPRECATED_CAIRO_ENTRY_POINT

Ƭ **DEPRECATED_CAIRO_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                                  | Description                                                      |
| :--------- | :---------------------------------------------------- | :--------------------------------------------------------------- |
| `offset`   | [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) | "The offset of the entry point in the program"                   |
| `selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             | A unique identifier of the entry point (function) in the program |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:543

---

### SIERRA_ENTRY_POINT

Ƭ **SIERRA_ENTRY_POINT**: `Object`

#### Type declaration

| Name           | Type                                      |
| :------------- | :---------------------------------------- |
| `selector`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `function_idx` | `number`                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:553

---

### CONTRACT_ABI

Ƭ **CONTRACT_ABI**: readonly [`CONTRACT_ABI_ENTRY`](types.RPC.RPCSPEC08.API.md#contract_abi_entry)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:557

---

### CONTRACT_ABI_ENTRY

Ƭ **CONTRACT_ABI_ENTRY**: [`FUNCTION_ABI_ENTRY`](types.RPC.RPCSPEC08.API.md#function_abi_entry) \| [`EVENT_ABI_ENTRY`](types.RPC.RPCSPEC08.API.md#event_abi_entry) \| [`STRUCT_ABI_ENTRY`](types.RPC.RPCSPEC08.API.md#struct_abi_entry)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:558

---

### STRUCT_ABI_ENTRY

Ƭ **STRUCT_ABI_ENTRY**: `Object`

#### Type declaration

| Name      | Type                                                              | Description     |
| :-------- | :---------------------------------------------------------------- | :-------------- |
| `type`    | [`STRUCT_ABI_TYPE`](types.RPC.RPCSPEC08.API.md#struct_abi_type-1) | Struct ABI type |
| `name`    | `string`                                                          | Struct name     |
| `size`    | `number`                                                          | -               |
| `members` | [`STRUCT_MEMBER`](types.RPC.RPCSPEC08.API.md#struct_member)[]     | -               |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:559

---

### STRUCT_MEMBER

Ƭ **STRUCT_MEMBER**: [`TYPED_PARAMETER`](types.RPC.RPCSPEC08.API.md#typed_parameter) & \{ `offset`: `number` }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:571

---

### EVENT_ABI_ENTRY

Ƭ **EVENT_ABI_ENTRY**: `Object`

#### Type declaration

| Name   | Type                                                              | Description    |
| :----- | :---------------------------------------------------------------- | :------------- |
| `type` | [`EVENT_ABI_TYPE`](types.RPC.RPCSPEC08.API.md#event_abi_type-1)   | Event ABI type |
| `name` | `string`                                                          | Event name     |
| `keys` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC08.API.md#typed_parameter)[] | -              |
| `data` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC08.API.md#typed_parameter)[] | -              |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:577

---

### FUNCTION_STATE_MUTABILITY

Ƭ **FUNCTION_STATE_MUTABILITY**: [`STATE_MUTABILITY_VIEW`](types.RPC.RPCSPEC08.API.md#state_mutability_view-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:589

---

### FUNCTION_ABI_ENTRY

Ƭ **FUNCTION_ABI_ENTRY**: `Object`

#### Type declaration

| Name               | Type                                                                                | Description               |
| :----------------- | :---------------------------------------------------------------------------------- | :------------------------ |
| `type`             | [`FUNCTION_ABI_TYPE`](types.RPC.RPCSPEC08.API.md#function_abi_type)                 | Function ABI type         |
| `name`             | `string`                                                                            | Function name             |
| `inputs`           | [`TYPED_PARAMETER`](types.RPC.RPCSPEC08.API.md#typed_parameter)[]                   | Typed parameter           |
| `outputs`          | [`TYPED_PARAMETER`](types.RPC.RPCSPEC08.API.md#typed_parameter)[]                   | Typed parameter           |
| `stateMutability?` | [`FUNCTION_STATE_MUTABILITY`](types.RPC.RPCSPEC08.API.md#function_state_mutability) | Function state mutability |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:590

---

### TYPED_PARAMETER

Ƭ **TYPED_PARAMETER**: `Object`

#### Type declaration

| Name   | Type     | Description    |
| :----- | :------- | :------------- |
| `name` | `string` | Parameter name |
| `type` | `string` | Parameter type |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:612

---

### SIMULATION_FLAG_FOR_ESTIMATE_FEE

Ƭ **SIMULATION_FLAG_FOR_ESTIMATE_FEE**: typeof [`SKIP_VALIDATE`](types.RPC.RPCSPEC08.API.md#skip_validate)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:622

---

### PRICE_UNIT

Ƭ **PRICE_UNIT**: [`PRICE_UNIT_WEI`](types.RPC.RPCSPEC08.API.md#price_unit_wei-1) \| [`PRICE_UNIT_FRI`](types.RPC.RPCSPEC08.API.md#price_unit_fri-1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:623

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: `Object`

#### Type declaration

| Name                   | Type                                                  | Description                                                                                                                                              |
| :--------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `l1_gas_consumed`      | `number`                                              | The Ethereum gas consumption of the transaction, charged for L1->L2 messages and, depending on the block's DA_MODE, state diffs. Prev. name gas_consumed |
| `l1_gas_price`         | `number`                                              | The gas price (in wei or fri, depending on the tx version) that was used in the cost estimation. Prev. name gas_price                                    |
| `l2_gas_consumed`      | `number`                                              | The L2 gas consumption of the transaction.                                                                                                               |
| `l2_gas_price`         | `number`                                              | The L2 gas price (in wei or fri, depending on the tx version) that was used in the cost estimation.                                                      |
| `l1_data_gas_consumed` | `number`                                              | The Ethereum data gas consumption of the transaction. Prev. name data_gas_consumed                                                                       |
| `l1_data_gas_price`    | `number`                                              | The data gas price (in wei or fri, depending on the tx version) that was used in the cost estimation. Prev. name data_gas_price                          |
| `overall_fee`          | `number`                                              | -                                                                                                                                                        |
| `unit`                 | [`PRICE_UNIT`](types.RPC.RPCSPEC08.API.md#price_unit) | -                                                                                                                                                        |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:624

---

### FEE_PAYMENT

Ƭ **FEE_PAYMENT**: `Object`

#### Type declaration

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `amount` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             |
| `unit`   | [`PRICE_UNIT`](types.RPC.RPCSPEC08.API.md#price_unit) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:656

---

### RESOURCE_BOUNDS_MAPPING

Ƭ **RESOURCE_BOUNDS_MAPPING**: `Object`

#### Type declaration

| Name          | Type                                                            | Description                                                          |
| :------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------- |
| `l1_gas`      | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC08.API.md#resource_bounds) | The max amount and max price per unit of L1 gas used in this tx      |
| `l1_data_gas` | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC08.API.md#resource_bounds) | The max amount and max price per unit of L1 blob gas used in this tx |
| `l2_gas`      | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC08.API.md#resource_bounds) | The max amount and max price per unit of L2 gas used in this tx      |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:660

---

### RESOURCE_BOUNDS

Ƭ **RESOURCE_BOUNDS**: `Object`

#### Type declaration

| Name                 | Type                                      |
| :------------------- | :---------------------------------------- |
| `max_amount`         | [`u64`](types.RPC.RPCSPEC08.API.md#u64)   |
| `max_price_per_unit` | [`u128`](types.RPC.RPCSPEC08.API.md#u128) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:674

---

### RESOURCE_PRICE

Ƭ **RESOURCE_PRICE**: `Object`

#### Type declaration

| Name           | Type                                      |
| :------------- | :---------------------------------------- |
| `price_in_fri` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `price_in_wei` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:678

---

### EXECUTION_RESOURCES

Ƭ **EXECUTION_RESOURCES**: `Object`

the resources consumed by the transaction

#### Type declaration

| Name          | Type     | Description                                                                                                     |
| :------------ | :------- | :-------------------------------------------------------------------------------------------------------------- |
| `l1_gas`      | `number` | l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used. integer |
| `l1_data_gas` | `number` | data gas consumed by this transaction, 0 if blobs are not used integer                                          |
| `l2_gas`      | `number` | l2 gas consumed by this transaction, used for computation and calldata Integer                                  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:685

---

### MERKLE_NODE

Ƭ **MERKLE_NODE**: `SimpleOneOf`<[`BINARY_NODE`](types.RPC.RPCSPEC08.API.md#binary_node), [`EDGE_NODE`](types.RPC.RPCSPEC08.API.md#edge_node)\>

a node in the Merkle-Patricia tree, can be a leaf, binary node, or an edge node

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:705

---

### BINARY_NODE

Ƭ **BINARY_NODE**: `Object`

an internal node whose both children are non-zero

#### Type declaration

| Name    | Type                                      | Description                 |
| :------ | :---------------------------------------- | :-------------------------- |
| `left`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) | the hash of the left child  |
| `right` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) | the hash of the right child |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:709

---

### EDGE_NODE

Ƭ **EDGE_NODE**: `Object`

represents a path to the highest non-zero descendant node

#### Type declaration

| Name     | Type                                                  | Description                                                                                                                            |
| :------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `path`   | [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) | an integer whose binary representation represents the path from the current node to its highest non-zero descendant (bounded by 2^251) |
| `length` | `number`                                              | the length of the path (bounded by 251)                                                                                                |
| `child`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)             | the hash of the unique non-zero maximal-height descendant node                                                                         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:722

---

### NODE_HASH_TO_NODE_MAPPING

Ƭ **NODE_HASH_TO_NODE_MAPPING**: \{ `node_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `node`: [`MERKLE_NODE`](types.RPC.RPCSPEC08.API.md#merkle_node) }[]

a node_hash -> node mapping of all the nodes in the union of the paths between the requested leaves and the root

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:739

---

### CONTRACT_EXECUTION_ERROR

Ƭ **CONTRACT_EXECUTION_ERROR**: [`CONTRACT_EXECUTION_ERROR_INNER`](types.RPC.RPCSPEC08.API.md#contract_execution_error_inner)

structured error that can later be processed by wallets or sdks.
error frame or the error raised during execution

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:747

---

### CONTRACT_EXECUTION_ERROR_INNER

Ƭ **CONTRACT_EXECUTION_ERROR_INNER**: \{ `contract_address`: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) ; `class_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `selector`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `error`: [`CONTRACT_EXECUTION_ERROR`](types.RPC.RPCSPEC08.API.md#contract_execution_error) } \| `string`

structured error that can later be processed by wallets or sdks.
error frame or the error raised during execution

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:752

---

### TRANSACTION_TRACE

Ƭ **TRANSACTION_TRACE**: [`INVOKE_TXN_TRACE`](types.RPC.RPCSPEC08.API.md#invoke_txn_trace) \| [`DECLARE_TXN_TRACE`](types.RPC.RPCSPEC08.API.md#declare_txn_trace) \| [`DEPLOY_ACCOUNT_TXN_TRACE`](types.RPC.RPCSPEC08.API.md#deploy_account_txn_trace) \| [`L1_HANDLER_TXN_TRACE`](types.RPC.RPCSPEC08.API.md#l1_handler_txn_trace)

Represents a transaction trace including the execution details.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:761

---

### INVOKE_TXN_TRACE

Ƭ **INVOKE_TXN_TRACE**: `Object`

Represents a transaction trace for an invoke transaction.

#### Type declaration

| Name                       | Type                                                                                                                    |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `type`                     | [`TXN_TYPE_INVOKE`](types.RPC.RPCSPEC08.API.md#txn_type_invoke-1)                                                       |
| `execute_invocation`       | `SimpleOneOf`<[`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation), \{ `revert_reason`: `string` }\> |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)                                                 |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)                                                 |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff)                                                                   |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#execution_resources)                                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:765

---

### DECLARE_TXN_TRACE

Ƭ **DECLARE_TXN_TRACE**: `Object`

Represents a transaction trace for a declare transaction.

#### Type declaration

| Name                       | Type                                                                    |
| :------------------------- | :---------------------------------------------------------------------- |
| `type`                     | [`TXN_TYPE_DECLARE`](types.RPC.RPCSPEC08.API.md#txn_type_declare-1)     |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff)                   |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#execution_resources) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:778

---

### DEPLOY_ACCOUNT_TXN_TRACE

Ƭ **DEPLOY_ACCOUNT_TXN_TRACE**: `Object`

Represents a transaction trace for a deploy account transaction.

#### Type declaration

| Name                       | Type                                                                              |
| :------------------------- | :-------------------------------------------------------------------------------- |
| `type`                     | [`TXN_TYPE_DEPLOY_ACCOUNT`](types.RPC.RPCSPEC08.API.md#txn_type_deploy_account-1) |
| `constructor_invocation`   | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)           |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)           |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)           |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff)                             |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#execution_resources)           |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:788

---

### L1_HANDLER_TXN_TRACE

Ƭ **L1_HANDLER_TXN_TRACE**: `Object`

Represents a transaction trace for an L1 handler transaction.

#### Type declaration

| Name                  | Type                                                                                    |
| :-------------------- | :-------------------------------------------------------------------------------------- |
| `type`                | `Uppercase`<[`ABI_TYPE_L1_HANDLER`](types.RPC.RPCSPEC08.API.md#abi_type_l1_handler-1)\> |
| `function_invocation` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)                 |
| `state_diff?`         | [`STATE_DIFF`](types.RPC.RPCSPEC08.API.md#state_diff)                                   |
| `execution_resources` | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#execution_resources)                 |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:799

---

### NESTED_CALL

Ƭ **NESTED_CALL**: [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC08.API.md#function_invocation)

Represents a nested function call.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:808

---

### FUNCTION_INVOCATION

Ƭ **FUNCTION_INVOCATION**: [`FUNCTION_CALL`](types.RPC.RPCSPEC08.API.md#function_call) & \{ `caller_address`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `class_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `entry_point_type`: [`ENTRY_POINT_TYPE`](types.RPC.RPCSPEC08.API.md#entry_point_type) ; `call_type`: [`CALL_TYPE`](types.RPC.RPCSPEC08.API.md#call_type-1) ; `result`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[] ; `calls`: [`NESTED_CALL`](types.RPC.RPCSPEC08.API.md#nested_call)[] ; `events`: [`ORDERED_EVENT`](types.RPC.RPCSPEC08.API.md#ordered_event)[] ; `messages`: [`ORDERED_MESSAGE`](types.RPC.RPCSPEC08.API.md#ordered_message)[] ; `execution_resources`: [`INNER_CALL_EXECUTION_RESOURCES`](types.RPC.RPCSPEC08.API.md#inner_call_execution_resources) ; `is_reverted`: `boolean` }

Represents a function invocation along with its execution details.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:812

---

### INNER_CALL_EXECUTION_RESOURCES

Ƭ **INNER_CALL_EXECUTION_RESOURCES**: `Object`

the resources consumed by an inner call (does not account for state diffs since data is squashed across the transaction)

#### Type declaration

| Name     | Type     | Description                                                                                            |
| :------- | :------- | :----------------------------------------------------------------------------------------------------- |
| `l1_gas` | `number` | l1 gas consumed by this transaction, used for l2-->l1 messages and state updates if blobs are not used |
| `l2_gas` | `number` | l2 gas consumed by this transaction, used for computation and calldata                                 |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:851

---

### ORDERED_EVENT

Ƭ **ORDERED_EVENT**: `Object`

Represents an ordered event alongside its order within the transaction.

#### Type declaration

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `order` | `number`                                    |
| `event` | [`EVENT`](types.RPC.RPCSPEC08.API.md#event) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:864

---

### ORDERED_MESSAGE

Ƭ **ORDERED_MESSAGE**: `Object`

Represents an ordered message alongside its order within the transaction.

#### Type declaration

| Name      | Type                                                |
| :-------- | :-------------------------------------------------- |
| `order`   | `number`                                            |
| `message` | [`MSG_TO_L1`](types.RPC.RPCSPEC08.API.md#msg_to_l1) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:871

---

### TXN_STATUS_RESULT

Ƭ **TXN_STATUS_RESULT**: `Object`

Transaction status result, including finality status and execution status

#### Type declaration

| Name                | Type                                                                      | Description                                                                                     |
| :------------------ | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- |
| `finality_status`   | [`TXN_STATUS`](types.RPC.RPCSPEC08.API.md#txn_status)                     | -                                                                                               |
| `execution_status?` | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC08.API.md#txn_execution_status) | -                                                                                               |
| `failure_reason?`   | `string`                                                                  | the failure reason, only appears if finality_status is REJECTED or execution_status is REVERTED |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:878

---

### CONTRACT_STORAGE_KEYS

Ƭ **CONTRACT_STORAGE_KEYS**: `Object`

(contract_address, storage_keys) pairs

#### Type declaration

| Name               | Type                                            |
| :----------------- | :---------------------------------------------- |
| `contract_address` | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `storage_keys`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/components.d.ts:889

---

### ContractClass

Ƭ **ContractClass**: `OneOf`<[[`CONTRACT_CLASS`](types.RPC.RPCSPEC08.API.md#contract_class), [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC08.API.md#deprecated_contract_class)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:8

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Object`

#### Type declaration

| Name                | Type                                                                |
| :------------------ | :------------------------------------------------------------------ |
| `transaction_trace` | [`TRANSACTION_TRACE`](types.RPC.RPCSPEC08.API.md#transaction_trace) |
| `fee_estimation`    | [`FEE_ESTIMATE`](types.RPC.RPCSPEC08.API.md#fee_estimate)           |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:9

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulateTransaction`](types.RPC.RPCSPEC08.API.md#simulatetransaction)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:13

---

### FeeEstimate

Ƭ **FeeEstimate**: [`FEE_ESTIMATE`](types.RPC.RPCSPEC08.API.md#fee_estimate)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:14

---

### TransactionWithHash

Ƭ **TransactionWithHash**: [`TXN_WITH_HASH`](types.RPC.RPCSPEC08.API.md#txn_with_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:15

---

### BlockHashAndNumber

Ƭ **BlockHashAndNumber**: `Object`

#### Type declaration

| Name           | Type                                                      |
| :------------- | :-------------------------------------------------------- |
| `block_hash`   | [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)     |
| `block_number` | [`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:16

---

### BlockWithTxs

Ƭ **BlockWithTxs**: `OneOf`<[[`BLOCK_WITH_TXS`](types.RPC.RPCSPEC08.API.md#block_with_txs), [`PENDING_BLOCK_WITH_TXS`](types.RPC.RPCSPEC08.API.md#pending_block_with_txs)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:20

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: `OneOf`<[[`BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#block_with_tx_hashes), [`PENDING_BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:21

---

### BlockWithTxReceipts

Ƭ **BlockWithTxReceipts**: `OneOf`<[[`BLOCK_WITH_RECEIPTS`](types.RPC.RPCSPEC08.API.md#block_with_receipts), [`PENDING_BLOCK_WITH_RECEIPTS`](types.RPC.RPCSPEC08.API.md#pending_block_with_receipts)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:22

---

### StateUpdate

Ƭ **StateUpdate**: `OneOf`<[[`STATE_UPDATE`](types.RPC.RPCSPEC08.API.md#state_update), [`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC08.API.md#pending_state_update)]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:23

---

### BlockTransactionsTraces

Ƭ **BlockTransactionsTraces**: \{ `transaction_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `trace_root`: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC08.API.md#transaction_trace) }[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:24

---

### Syncing

Ƭ **Syncing**: `false` \| [`SYNC_STATUS`](types.RPC.RPCSPEC08.API.md#sync_status)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:28

---

### Events

Ƭ **Events**: [`EVENTS_CHUNK`](types.RPC.RPCSPEC08.API.md#events_chunk)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:29

---

### EmittedEvent

Ƭ **EmittedEvent**: [`EMITTED_EVENT`](types.RPC.RPCSPEC08.API.md#emitted_event)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:30

---

### Event

Ƭ **Event**: [`EVENT`](types.RPC.RPCSPEC08.API.md#event)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:31

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Object`

#### Type declaration

| Name               | Type                                              |
| :----------------- | :------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:32

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Object`

#### Type declaration

| Name               | Type                                              |
| :----------------- | :------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:35

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Object`

#### Type declaration

| Name               | Type                                              |
| :----------------- | :------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:39

---

### L1L2MessagesStatus

Ƭ **L1L2MessagesStatus**: [`L1L2MessageStatus`](types.RPC.RPCSPEC08.API.md#l1l2messagestatus)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:43

---

### StorageProof

Ƭ **StorageProof**: `Object`

#### Type declaration

| Name                                   | Type                                                                                                                                                                                                                                                                                                        |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `classes_proof`                        | [`NODE_HASH_TO_NODE_MAPPING`](types.RPC.RPCSPEC08.API.md#node_hash_to_node_mapping)                                                                                                                                                                                                                         |
| `contracts_proof`                      | \{ `nodes`: [`NODE_HASH_TO_NODE_MAPPING`](types.RPC.RPCSPEC08.API.md#node_hash_to_node_mapping) ; `contract_leaves_data`: \{ `nonce`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `class_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `storage_root`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) }[] } |
| `contracts_proof.nodes`                | [`NODE_HASH_TO_NODE_MAPPING`](types.RPC.RPCSPEC08.API.md#node_hash_to_node_mapping)                                                                                                                                                                                                                         |
| `contracts_proof.contract_leaves_data` | \{ `nonce`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `class_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `storage_root`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) }[]                                                                                                                             |
| `contracts_storage_proofs`             | [`NODE_HASH_TO_NODE_MAPPING`](types.RPC.RPCSPEC08.API.md#node_hash_to_node_mapping)[]                                                                                                                                                                                                                       |
| `global_roots`                         | \{ `contracts_tree_root`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `classes_tree_root`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) ; `block_hash`: [`FELT`](types.RPC.RPCSPEC08.API.md#felt) }                                                                                                            |
| `global_roots.contracts_tree_root`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                                                                                                                                                                                                                                   |
| `global_roots.classes_tree_root`       | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                                                                                                                                                                                                                                   |
| `global_roots.block_hash`              | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                                                                                                                                                                                                                                                                   |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:44

---

### CompiledCasm

Ƭ **CompiledCasm**: [`CASM_COMPILED_CONTRACT_CLASS`](types.RPC.RPCSPEC08.API.md#casm_compiled_contract_class)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:70

---

### ContractAddress

Ƭ **ContractAddress**: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:71

---

### Felt

Ƭ **Felt**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:72

---

### Nonce

Ƭ **Nonce**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:73

---

### TransactionHash

Ƭ **TransactionHash**: [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:74

---

### TransactionTrace

Ƭ **TransactionTrace**: [`TRANSACTION_TRACE`](types.RPC.RPCSPEC08.API.md#transaction_trace)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:75

---

### BlockHash

Ƭ **BlockHash**: [`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:76

---

### TransactionReceipt

Ƭ **TransactionReceipt**: [`TXN_RECEIPT_WITH_BLOCK_INFO`](types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)

All Type Transaction Receipt

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:80

---

### TransactionReceiptProductionBlock

Ƭ **TransactionReceiptProductionBlock**: [`IsInBlock`](types.RPC.RPCSPEC08.API.md#isinblock)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt)\>

All Type Transaction Receipt from production block

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:84

---

### TransactionReceiptPendingBlock

Ƭ **TransactionReceiptPendingBlock**: [`IsPending`](types.RPC.RPCSPEC08.API.md#ispending)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt)\>

All Type Transaction Receipt from pending block

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:88

---

### EventFilter

Ƭ **EventFilter**: [`EVENT_FILTER`](types.RPC.RPCSPEC08.API.md#event_filter) & [`RESULT_PAGE_REQUEST`](types.RPC.RPCSPEC08.API.md#result_page_request)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:89

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.RPC.RPCSPEC08.API.md#simulation_flag)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:90

---

### L1Message

Ƭ **L1Message**: [`MSG_FROM_L1`](types.RPC.RPCSPEC08.API.md#msg_from_l1)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:91

---

### BaseTransaction

Ƭ **BaseTransaction**: [`BROADCASTED_TXN`](types.RPC.RPCSPEC08.API.md#broadcasted_txn)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:92

---

### ChainId

Ƭ **ChainId**: [`CHAIN_ID`](types.RPC.RPCSPEC08.API.md#chain_id)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:93

---

### Transaction

Ƭ **Transaction**: [`TXN`](types.RPC.RPCSPEC08.API.md#txn)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:94

---

### TransactionStatus

Ƭ **TransactionStatus**: [`TXN_STATUS_RESULT`](types.RPC.RPCSPEC08.API.md#txn_status_result)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:95

---

### ResourceBounds

Ƭ **ResourceBounds**: [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC08.API.md#resource_bounds_mapping)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:96

---

### FeePayment

Ƭ **FeePayment**: [`FEE_PAYMENT`](types.RPC.RPCSPEC08.API.md#fee_payment)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:97

---

### PriceUnit

Ƭ **PriceUnit**: [`PRICE_UNIT`](types.RPC.RPCSPEC08.API.md#price_unit)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:98

---

### L1L2MessageStatus

Ƭ **L1L2MessageStatus**: `Object`

Ethereum l1_handler tx hash and status for L1 -> L2 messages sent by the l1 transaction

#### Type declaration

| Name               | Type                                                  | Description                                                         |
| :----------------- | :---------------------------------------------------- | :------------------------------------------------------------------ |
| `transaction_hash` | [`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash)     | l1_handler tx hash                                                  |
| `finality_status`  | [`TXN_STATUS`](types.RPC.RPCSPEC08.API.md#txn_status) | finality status of the L1 -> L2 messages sent by the l1 transaction |
| `failure_reason?`  | `string`                                              | the failure reason, only appears if finality_status is REJECTED     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:102

---

### StorageDiffs

Ƭ **StorageDiffs**: [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC08.API.md#contract_storage_diff_item)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:116

---

### DeprecatedDeclaredClasses

Ƭ **DeprecatedDeclaredClasses**: [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:117

---

### NonceUpdates

Ƭ **NonceUpdates**: [`NONCE_UPDATE`](types.RPC.RPCSPEC08.API.md#nonce_update)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:118

---

### ReplacedClasses

Ƭ **ReplacedClasses**: [`REPLACED_CLASS`](types.RPC.RPCSPEC08.API.md#replaced_class)[]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/nonspec.d.ts:119

---

### STATUS_ACCEPTED_ON_L2

Ƭ **STATUS_ACCEPTED_ON_L2**: `"ACCEPTED_ON_L2"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:1

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:2

---

### STATUS_ACCEPTED_ON_L1

Ƭ **STATUS_ACCEPTED_ON_L1**: `"ACCEPTED_ON_L1"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:3

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:4

---

### STATUS_SUCCEEDED

Ƭ **STATUS_SUCCEEDED**: `"SUCCEEDED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:5

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:6

---

### STATUS_REVERTED

Ƭ **STATUS_REVERTED**: `"REVERTED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:7

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:8

---

### STATUS_PENDING

Ƭ **STATUS_PENDING**: `"PENDING"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:9

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:10

---

### STATUS_REJECTED

Ƭ **STATUS_REJECTED**: `"REJECTED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:11

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:12

---

### STATUS_RECEIVED

Ƭ **STATUS_RECEIVED**: `"RECEIVED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:13

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:14

---

### TXN_TYPE_DECLARE

Ƭ **TXN_TYPE_DECLARE**: `"DECLARE"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:15

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:16

---

### TXN_TYPE_DEPLOY

Ƭ **TXN_TYPE_DEPLOY**: `"DEPLOY"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:17

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:18

---

### TXN_TYPE_DEPLOY_ACCOUNT

Ƭ **TXN_TYPE_DEPLOY_ACCOUNT**: `"DEPLOY_ACCOUNT"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:19

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:20

---

### TXN_TYPE_INVOKE

Ƭ **TXN_TYPE_INVOKE**: `"INVOKE"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:21

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:22

---

### TXN_TYPE_L1_HANDLER

Ƭ **TXN_TYPE_L1_HANDLER**: `"L1_HANDLER"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:23

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:24

---

### STRUCT_ABI_TYPE

Ƭ **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:25

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:26

---

### EVENT_ABI_TYPE

Ƭ **EVENT_ABI_TYPE**: `"event"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:27

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:28

---

### ABI_TYPE_FUNCTION

Ƭ **ABI_TYPE_FUNCTION**: `"function"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:29

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:30

---

### ABI_TYPE_CONSTRUCTOR

Ƭ **ABI_TYPE_CONSTRUCTOR**: `"constructor"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:31

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:32

---

### ABI_TYPE_L1_HANDLER

Ƭ **ABI_TYPE_L1_HANDLER**: `"l1_handler"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:33

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:34

---

### ABI_TYPE_ENUM

Ƭ **ABI_TYPE_ENUM**: `"enum"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:35

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:36

---

### STATE_MUTABILITY_VIEW

Ƭ **STATE_MUTABILITY_VIEW**: `"view"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:37

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:38

---

### STATE_MUTABILITY_EXTERNAL

Ƭ **STATE_MUTABILITY_EXTERNAL**: `"external"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:39

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:40

---

### PRICE_UNIT_WEI

Ƭ **PRICE_UNIT_WEI**: `"WEI"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:41

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:42

---

### PRICE_UNIT_FRI

Ƭ **PRICE_UNIT_FRI**: `"FRI"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:43

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:44

---

### L1_DA_MODE

Ƭ **L1_DA_MODE**: typeof [`L1_DA_MODE`](types.RPC.RPCSPEC08.API.md#l1_da_mode-1)[keyof typeof [`L1_DA_MODE`](types.RPC.RPCSPEC08.API.md#l1_da_mode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:45

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:49

---

### CALL_TYPE

Ƭ **CALL_TYPE**: typeof [`CALL_TYPE`](types.RPC.RPCSPEC08.API.md#call_type-1)[keyof typeof [`CALL_TYPE`](types.RPC.RPCSPEC08.API.md#call_type-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:53

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:58

---

### ETransactionType

Ƭ **ETransactionType**: typeof [`ETransactionType`](types.RPC.RPCSPEC08.API.md#etransactiontype-1)[keyof typeof [`ETransactionType`](types.RPC.RPCSPEC08.API.md#etransactiontype-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:59

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:66

---

### ESimulationFlag

Ƭ **ESimulationFlag**: typeof [`ESimulationFlag`](types.RPC.RPCSPEC08.API.md#esimulationflag-1)[keyof typeof [`ESimulationFlag`](types.RPC.RPCSPEC08.API.md#esimulationflag-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:67

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:71

---

### ETransactionStatus

Ƭ **ETransactionStatus**: typeof [`ETransactionStatus`](types.RPC.RPCSPEC08.API.md#etransactionstatus-1)[keyof typeof [`ETransactionStatus`](types.RPC.RPCSPEC08.API.md#etransactionstatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:72

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:78

---

### ETransactionFinalityStatus

Ƭ **ETransactionFinalityStatus**: typeof [`ETransactionFinalityStatus`](types.RPC.RPCSPEC08.API.md#etransactionfinalitystatus-1)[keyof typeof [`ETransactionFinalityStatus`](types.RPC.RPCSPEC08.API.md#etransactionfinalitystatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:79

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:83

---

### ETransactionExecutionStatus

Ƭ **ETransactionExecutionStatus**: typeof [`ETransactionExecutionStatus`](types.RPC.RPCSPEC08.API.md#etransactionexecutionstatus-1)[keyof typeof [`ETransactionExecutionStatus`](types.RPC.RPCSPEC08.API.md#etransactionexecutionstatus-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:84

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:88

---

### EBlockTag

Ƭ **EBlockTag**: typeof [`EBlockTag`](types.RPC.RPCSPEC08.API.md#eblocktag-1)[keyof typeof [`EBlockTag`](types.RPC.RPCSPEC08.API.md#eblocktag-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:89

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:93

---

### EDataAvailabilityMode

Ƭ **EDataAvailabilityMode**: typeof [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1)[keyof typeof [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:94

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:98

---

### EDAMode

Ƭ **EDAMode**: typeof [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)[keyof typeof [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:99

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:103

---

### ETransactionVersion

Ƭ **ETransactionVersion**: typeof [`ETransactionVersion`](types.RPC.RPCSPEC08.API.md#etransactionversion-1)[keyof typeof [`ETransactionVersion`](types.RPC.RPCSPEC08.API.md#etransactionversion-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:108

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:136

---

### ETransactionVersion2

Ƭ **ETransactionVersion2**: typeof [`ETransactionVersion2`](types.RPC.RPCSPEC08.API.md#etransactionversion2-1)[keyof typeof [`ETransactionVersion2`](types.RPC.RPCSPEC08.API.md#etransactionversion2-1)]

**`Deprecated`**

Starknet 0.14 will not support this transaction

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:143

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:154

---

### ETransactionVersion3

Ƭ **ETransactionVersion3**: typeof [`ETransactionVersion3`](types.RPC.RPCSPEC08.API.md#etransactionversion3-1)[keyof typeof [`ETransactionVersion3`](types.RPC.RPCSPEC08.API.md#etransactionversion3-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:158

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:162

---

### CASM_COMPILED_CONTRACT_CLASS

Ƭ **CASM_COMPILED_CONTRACT_CLASS**: `Object`

Starknet get compiled CASM result

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                          | Description                                                                                                                |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[] ; `EXTERNAL`: [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[] ; `L1_HANDLER`: [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[] } | -                                                                                                                          |
| `entry_points_by_type.CONSTRUCTOR` | [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[]                                                                                                                                                                                           | -                                                                                                                          |
| `entry_points_by_type.EXTERNAL`    | [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[]                                                                                                                                                                                           | -                                                                                                                          |
| `entry_points_by_type.L1_HANDLER`  | [`CASM_ENTRY_POINT`](types.RPC.RPCSPEC08.API.md#casm_entry_point)[]                                                                                                                                                                                           | -                                                                                                                          |
| `bytecode`                         | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]                                                                                                                                                                                                                   | -                                                                                                                          |
| `prime`                            | [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex)                                                                                                                                                                                                         | -                                                                                                                          |
| `compiler_version`                 | `string`                                                                                                                                                                                                                                                      | -                                                                                                                          |
| `hints`                            | [`number` \| [`HINT`](types.RPC.RPCSPEC08.API.md#hint)[], `number` \| [`HINT`](types.RPC.RPCSPEC08.API.md#hint)[]][]                                                                                                                                          | Array of 2-tuple of pc value and an array of hints to execute.                                                             |
| `bytecode_segment_lengths?`        | `number`                                                                                                                                                                                                                                                      | a list of sizes of segments in the bytecode, each segment is hashed individually when computing the bytecode hash. Integer |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:5

---

### CASM_ENTRY_POINT

Ƭ **CASM_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                      |
| :--------- | :---------------------------------------- |
| `offset`   | `number`                                  |
| `selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt) |
| `builtins` | `string`[]                                |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:24

---

### CellRef

Ƭ **CellRef**: `Object`

#### Type declaration

| Name       | Type             |
| :--------- | :--------------- |
| `register` | `"AP"` \| `"FP"` |
| `offset`   | `number`         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:29

---

### Deref

Ƭ **Deref**: `Object`

#### Type declaration

| Name    | Type                                            |
| :------ | :---------------------------------------------- |
| `Deref` | [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:33

---

### DoubleDeref

Ƭ **DoubleDeref**: `Object`

#### Type declaration

| Name          | Type                                                          | Description               |
| :------------ | :------------------------------------------------------------ | :------------------------ |
| `DoubleDeref` | [[`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) \| `number`] | A (CellRef, offset) tuple |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:36

---

### Immediate

Ƭ **Immediate**: `Object`

#### Type declaration

| Name        | Type                                                  |
| :---------- | :---------------------------------------------------- |
| `Immediate` | [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:42

---

### BinOp

Ƭ **BinOp**: `Object`

#### Type declaration

| Name       | Type                                                                                                                                                                                           |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BinOp`    | \{ `op`: `"Add"` \| `"Mul"` ; `a`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `b`: [`Deref`](types.RPC.RPCSPEC08.API.md#deref) \| [`Immediate`](types.RPC.RPCSPEC08.API.md#immediate) } |
| `BinOp.op` | `"Add"` \| `"Mul"`                                                                                                                                                                             |
| `BinOp.a`  | [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref)                                                                                                                                                |
| `BinOp.b`  | [`Deref`](types.RPC.RPCSPEC08.API.md#deref) \| [`Immediate`](types.RPC.RPCSPEC08.API.md#immediate)                                                                                             |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:45

---

### ResOperand

Ƭ **ResOperand**: [`Deref`](types.RPC.RPCSPEC08.API.md#deref) \| [`DoubleDeref`](types.RPC.RPCSPEC08.API.md#doublederef) \| [`Immediate`](types.RPC.RPCSPEC08.API.md#immediate) \| [`BinOp`](types.RPC.RPCSPEC08.API.md#binop)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:52

---

### HINT

Ƭ **HINT**: [`DEPRECATED_HINT`](types.RPC.RPCSPEC08.API.md#deprecated_hint) \| [`CORE_HINT`](types.RPC.RPCSPEC08.API.md#core_hint) \| [`STARKNET_HINT`](types.RPC.RPCSPEC08.API.md#starknet_hint)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:53

---

### DEPRECATED_HINT

Ƭ **DEPRECATED_HINT**: `"AssertCurrentAccessIndicesIsEmpty"` \| `"AssertAllKeysUsed"` \| `"AssertLeAssertThirdArcExcluded"` \| \{ `AssertAllAccessesUsed`: \{ `n_used_accesses`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `AssertLtAssertValidInput`: \{ `a`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `b`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `Felt252DictRead`: \{ `dict_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `key`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `value_dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `Felt252DictWrite`: \{ `dict_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `key`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `value`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:54

---

### CORE_HINT

Ƭ **CORE_HINT**: \{ `AllocSegment`: \{ `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `TestLessThan`: \{ `lhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `rhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `TestLessThanOrEqual`: \{ `lhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `rhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `TestLessThanOrEqualAddress`: \{ `lhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `rhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `WideMul128`: \{ `lhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `rhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `high`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `low`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `DivMod`: \{ `lhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `rhs`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `quotient`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `Uint256DivMod`: \{ `dividend0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dividend1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `divisor0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `divisor1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `quotient0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `quotient1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `Uint512DivModByUint256`: \{ `dividend0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dividend1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dividend2`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dividend3`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `divisor0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `divisor1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `quotient0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `quotient1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `quotient2`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `quotient3`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `SquareRoot`: \{ `value`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `Uint256SquareRoot`: \{ `value_low`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `value_high`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `sqrt0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `sqrt1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder_low`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `remainder_high`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `sqrt_mul_2_minus_remainder_ge_u128`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `LinearSplit`: \{ `value`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `scalar`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `max_x`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `x`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `y`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `AllocFelt252Dict`: \{ `segment_arena_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `Felt252DictEntryInit`: \{ `dict_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `key`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `Felt252DictEntryUpdate`: \{ `dict_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `value`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `GetSegmentArenaIndex`: \{ `dict_end_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dict_index`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `InitSquashData`: \{ `dict_accesses`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `ptr_diff`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `n_accesses`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `big_keys`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `first_key`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `GetCurrentAccessIndex`: \{ `range_check_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `ShouldSkipSquashLoop`: \{ `should_skip_loop`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `GetCurrentAccessDelta`: \{ `index_delta_minus1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `ShouldContinueSquashLoop`: \{ `should_continue`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `GetNextDictKey`: \{ `next_key`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `AssertLeFindSmallArcs`: \{ `range_check_ptr`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `a`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `b`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `AssertLeIsFirstArcExcluded`: \{ `skip_exclude_a_flag`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `AssertLeIsSecondArcExcluded`: \{ `skip_exclude_b_minus_a`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `RandomEcPoint`: \{ `x`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `y`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `FieldSqrt`: \{ `val`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `sqrt`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `DebugPrint`: \{ `start`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `end`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `AllocConstantSize`: \{ `size`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `dst`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `U256InvModN`: \{ `b0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `b1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `n0`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `n1`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `g0_or_no_inv`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `g1_option`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `s_or_r0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `s_or_r1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `t_or_k0`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `t_or_k1`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } } \| \{ `EvalCircuit`: \{ `n_add_mods`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `add_mod_builtin`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `n_mul_mods`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `mul_mod_builtin`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:76

---

### STARKNET_HINT

Ƭ **STARKNET_HINT**: \{ `SystemCall`: \{ `system`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) } } \| \{ `Cheatcode`: \{ `selector`: [`NUM_AS_HEX`](types.RPC.RPCSPEC08.API.md#num_as_hex) ; `input_start`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `input_end`: [`ResOperand`](types.RPC.RPCSPEC08.API.md#resoperand) ; `output_start`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) ; `output_end`: [`CellRef`](types.RPC.RPCSPEC08.API.md#cellref) } }

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/executable.d.ts:263

---

### IsPending

Ƭ **IsPending**<`T`\>: `Extract`<`T`, \{ `block_hash`: `never` ; `block_number`: `never` }\>

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/expansions/transactionReceipt.d.ts:8

---

### IsInBlock

Ƭ **IsInBlock**<`T`\>: `T` extends \{ `block_hash`: `string` ; `block_number`: `number` } ? `T` extends \{ `block_hash`: `never` } ? `never` : `T` : `never`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/expansions/transactionReceipt.d.ts:12

---

### IsType

Ƭ **IsType**<`T`, `ETransactionType`\>: `Extract`<`T`, \{ `type`: `ETransactionType` }\>

#### Type parameters

| Name               |
| :----------------- |
| `T`                |
| `ETransactionType` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/expansions/transactionReceipt.d.ts:18

---

### IsSucceeded

Ƭ **IsSucceeded**<`T`\>: `Extract`<`T`, \{ `execution_status`: `"SUCCEEDED"` }\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/expansions/transactionReceipt.d.ts:21

---

### IsReverted

Ƭ **IsReverted**<`T`\>: `Extract`<`T`, \{ `execution_status`: `"REVERTED"` }\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/expansions/transactionReceipt.d.ts:24

## Variables

### STATUS_ACCEPTED_ON_L2

• **STATUS_ACCEPTED_ON_L2**: `"ACCEPTED_ON_L2"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:1

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:2

---

### STATUS_ACCEPTED_ON_L1

• **STATUS_ACCEPTED_ON_L1**: `"ACCEPTED_ON_L1"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:3

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:4

---

### STATUS_SUCCEEDED

• **STATUS_SUCCEEDED**: `"SUCCEEDED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:5

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:6

---

### STATUS_REVERTED

• **STATUS_REVERTED**: `"REVERTED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:7

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:8

---

### STATUS_PENDING

• **STATUS_PENDING**: `"PENDING"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:9

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:10

---

### STATUS_REJECTED

• **STATUS_REJECTED**: `"REJECTED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:11

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:12

---

### STATUS_RECEIVED

• **STATUS_RECEIVED**: `"RECEIVED"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:13

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:14

---

### TXN_TYPE_DECLARE

• **TXN_TYPE_DECLARE**: `"DECLARE"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:15

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:16

---

### TXN_TYPE_DEPLOY

• **TXN_TYPE_DEPLOY**: `"DEPLOY"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:17

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:18

---

### TXN_TYPE_DEPLOY_ACCOUNT

• **TXN_TYPE_DEPLOY_ACCOUNT**: `"DEPLOY_ACCOUNT"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:19

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:20

---

### TXN_TYPE_INVOKE

• **TXN_TYPE_INVOKE**: `"INVOKE"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:21

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:22

---

### TXN_TYPE_L1_HANDLER

• **TXN_TYPE_L1_HANDLER**: `"L1_HANDLER"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:23

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:24

---

### STRUCT_ABI_TYPE

• **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:25

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:26

---

### EVENT_ABI_TYPE

• **EVENT_ABI_TYPE**: `"event"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:27

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:28

---

### ABI_TYPE_FUNCTION

• **ABI_TYPE_FUNCTION**: `"function"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:29

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:30

---

### ABI_TYPE_CONSTRUCTOR

• **ABI_TYPE_CONSTRUCTOR**: `"constructor"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:31

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:32

---

### ABI_TYPE_L1_HANDLER

• **ABI_TYPE_L1_HANDLER**: `"l1_handler"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:33

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:34

---

### ABI_TYPE_ENUM

• **ABI_TYPE_ENUM**: `"enum"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:35

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:36

---

### STATE_MUTABILITY_VIEW

• **STATE_MUTABILITY_VIEW**: `"view"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:37

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:38

---

### STATE_MUTABILITY_EXTERNAL

• **STATE_MUTABILITY_EXTERNAL**: `"external"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:39

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:40

---

### PRICE_UNIT_WEI

• **PRICE_UNIT_WEI**: `"WEI"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:41

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:42

---

### PRICE_UNIT_FRI

• **PRICE_UNIT_FRI**: `"FRI"`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:43

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:44

---

### L1_DA_MODE

• `Const` **L1_DA_MODE**: `Object`

#### Type declaration

| Name       | Type         |
| :--------- | :----------- |
| `BLOB`     | `"BLOB"`     |
| `CALLDATA` | `"CALLDATA"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:45

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:49

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:53

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:58

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:59

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:66

---

### ESimulationFlag

• `Const` **ESimulationFlag**: `Object`

#### Type declaration

| Name              | Type                |
| :---------------- | :------------------ |
| `SKIP_VALIDATE`   | `"SKIP_VALIDATE"`   |
| `SKIP_FEE_CHARGE` | `"SKIP_FEE_CHARGE"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:67

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:71

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:72

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:78

---

### ETransactionFinalityStatus

• `Const` **ETransactionFinalityStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:79

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:83

---

### ETransactionExecutionStatus

• `Const` **ETransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `SUCCEEDED` | `"SUCCEEDED"` |
| `REVERTED`  | `"REVERTED"`  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:84

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:88

---

### EBlockTag

• `Const` **EBlockTag**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `LATEST`  | `"latest"`  |
| `PENDING` | `"pending"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:89

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:93

---

### EDataAvailabilityMode

• `Const` **EDataAvailabilityMode**: `Object`

#### Type declaration

| Name | Type   |
| :--- | :----- |
| `L1` | `"L1"` |
| `L2` | `"L2"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:94

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:98

---

### EDAMode

• `Const` **EDAMode**: `Object`

#### Type declaration

| Name | Type |
| :--- | :--- |
| `L1` | `0`  |
| `L2` | `1`  |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:99

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:103

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:108

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:136

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:143

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:154

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

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:158

node_modules/@starknet-io/starknet-types-08/dist/types/api/constants.d.ts:162
