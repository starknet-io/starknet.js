---
id: 'types.RPC.RPCSPEC07.API.SPEC'
title: 'Namespace: SPEC'
sidebar_label: 'SPEC'
custom_edit_url: null
---

[RPCSPEC07](types.RPC.RPCSPEC07.md).[API](types.RPC.RPCSPEC07.API.md).SPEC

## Type Aliases

### FELT

Ƭ **FELT**: `string`

A field element. represented by at most 63 hex digits

**`Pattern`**

^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:8

---

### ETH_ADDRESS

Ƭ **ETH_ADDRESS**: `string`

an ethereum address represented as 40 hex digits

**`Pattern`**

^0x[a-fA-F0-9]{40}$

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:13

---

### STORAGE_KEY

Ƭ **STORAGE_KEY**: `string`

A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.

**`Pattern`**

^0x(0|[0-7]{1}[a-fA-F0-9]{0,62}$)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:18

---

### ADDRESS

Ƭ **ADDRESS**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:19

---

### NUM_AS_HEX

Ƭ **NUM_AS_HEX**: `string`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:20

---

### u64

Ƭ **u64**: `string`

64 bit integers, represented by hex string of length at most 16
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$"

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:25

---

### u128

Ƭ **u128**: `string`

64 bit integers, represented by hex string of length at most 32
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$"

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:30

---

### SIGNATURE

Ƭ **SIGNATURE**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:31

---

### BLOCK_NUMBER

Ƭ **BLOCK_NUMBER**: `number`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:32

---

### BLOCK_HASH

Ƭ **BLOCK_HASH**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:33

---

### TXN_HASH

Ƭ **TXN_HASH**: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:34

---

### CHAIN_ID

Ƭ **CHAIN_ID**: [`NUM_AS_HEX`](types.RPC.RPCSPEC07.API.SPEC.md#num_as_hex)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:35

---

### STRUCT_ABI_TYPE

Ƭ **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:36

---

### EVENT_ABI_TYPE

Ƭ **EVENT_ABI_TYPE**: `"event"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:37

---

### FUNCTION_ABI_TYPE

Ƭ **FUNCTION_ABI_TYPE**: `"function"` \| `"l1_handler"` \| `"constructor"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:38

---

### ENTRY_POINT_TYPE

Ƭ **ENTRY_POINT_TYPE**: `"EXTERNAL"` \| `"L1_HANDLER"` \| `"CONSTRUCTOR"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:39

---

### CALL_TYPE

Ƭ **CALL_TYPE**: `"DELEGATE"` \| `"LIBRARY_CALL"` \| `"CALL"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:40

---

### TXN_STATUS

Ƭ **TXN_STATUS**: `"RECEIVED"` \| `"REJECTED"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:41

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: `"SKIP_VALIDATE"` \| `"SKIP_FEE_CHARGE"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:42

---

### DA_MODE

Ƭ **DA_MODE**: `"L1"` \| `"L2"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:43

---

### TXN_TYPE

Ƭ **TXN_TYPE**: `"DECLARE"` \| `"DEPLOY"` \| `"DEPLOY_ACCOUNT"` \| `"INVOKE"` \| `"L1_HANDLER"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:44

---

### TXN_FINALITY_STATUS

Ƭ **TXN_FINALITY_STATUS**: `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:45

---

### TXN_EXECUTION_STATUS

Ƭ **TXN_EXECUTION_STATUS**: `"SUCCEEDED"` \| `"REVERTED"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:46

---

### BLOCK_STATUS

Ƭ **BLOCK_STATUS**: `"PENDING"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:47

---

### BLOCK_TAG

Ƭ **BLOCK_TAG**: `"latest"` \| `"pending"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:48

---

### EVENTS_CHUNK

Ƭ **EVENTS_CHUNK**: `Object`

READ API

#### Type declaration

| Name                  | Type                                                               |
| :-------------------- | :----------------------------------------------------------------- |
| `events`              | [`EMITTED_EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#emitted_event)[] |
| `continuation_token?` | `string`                                                           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:52

---

### RESULT_PAGE_REQUEST

Ƭ **RESULT_PAGE_REQUEST**: `Object`

#### Type declaration

| Name                  | Type     |
| :-------------------- | :------- |
| `continuation_token?` | `string` |
| `chunk_size`          | `number` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:56

---

### EMITTED_EVENT

Ƭ **EMITTED_EVENT**: [`EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#event) & \{ `block_hash`: [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash) ; `block_number`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) ; `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) }

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:60

---

### EVENT

Ƭ **EVENT**: \{ `from_address`: [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address) } & [`EVENT_CONTENT`](types.RPC.RPCSPEC07.API.SPEC.md#event_content)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:65

---

### EVENT_CONTENT

Ƭ **EVENT_CONTENT**: `Object`

#### Type declaration

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `keys` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[] |
| `data` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:68

---

### EVENT_FILTER

Ƭ **EVENT_FILTER**: `Object`

#### Type declaration

| Name          | Type                                                   |
| :------------ | :----------------------------------------------------- |
| `from_block?` | [`BLOCK_ID`](types.RPC.RPCSPEC07.API.SPEC.md#block_id) |
| `to_block?`   | [`BLOCK_ID`](types.RPC.RPCSPEC07.API.SPEC.md#block_id) |
| `address?`    | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)   |
| `keys?`       | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[][]     |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:72

---

### BLOCK_ID

Ƭ **BLOCK_ID**: \{ `block_hash?`: [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash) ; `block_number?`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) } \| [`BLOCK_TAG`](types.RPC.RPCSPEC07.API.SPEC.md#block_tag)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:78

---

### SYNC_STATUS

Ƭ **SYNC_STATUS**: `Object`

#### Type declaration

| Name                  | Type                                                           |
| :-------------------- | :------------------------------------------------------------- |
| `starting_block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)     |
| `starting_block_num`  | [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) |
| `current_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)     |
| `current_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) |
| `highest_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)     |
| `highest_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:82

---

### NEW_CLASSES

Ƭ **NEW_CLASSES**: `Object`

#### Type declaration

| Name                  | Type                                           |
| :-------------------- | :--------------------------------------------- |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:90

---

### REPLACED_CLASS

Ƭ **REPLACED_CLASS**: `Object`

#### Type declaration

| Name               | Type                                           |
| :----------------- | :--------------------------------------------- |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:94

---

### NONCE_UPDATE

Ƭ **NONCE_UPDATE**: `Object`

#### Type declaration

| Name               | Type                                                 |
| :----------------- | :--------------------------------------------------- |
| `contract_address` | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address) |
| `nonce`            | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)       |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:98

---

### STATE_DIFF

Ƭ **STATE_DIFF**: `Object`

#### Type declaration

| Name                          | Type                                                                                         |
| :---------------------------- | :------------------------------------------------------------------------------------------- |
| `storage_diffs`               | [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC07.API.SPEC.md#contract_storage_diff_item)[] |
| `deprecated_declared_classes` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                             |
| `declared_classes`            | [`NEW_CLASSES`](types.RPC.RPCSPEC07.API.SPEC.md#new_classes)[]                               |
| `deployed_contracts`          | [`DEPLOYED_CONTRACT_ITEM`](types.RPC.RPCSPEC07.API.SPEC.md#deployed_contract_item)[]         |
| `replaced_classes`            | [`REPLACED_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#replaced_class)[]                         |
| `nonces`                      | [`NONCE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#nonce_update)[]                             |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:102

---

### PENDING_STATE_UPDATE

Ƭ **PENDING_STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff) |
| `block_hash` | `never`                                                    |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:110

---

### STATE_UPDATE

Ƭ **STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                       |
| :----------- | :--------------------------------------------------------- |
| `block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash) |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `new_root`   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:115

---

### BLOCK_BODY_WITH_TX_HASHES

Ƭ **BLOCK_BODY_WITH_TX_HASHES**: `Object`

#### Type declaration

| Name           | Type                                                     |
| :------------- | :------------------------------------------------------- |
| `transactions` | [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:121

---

### BLOCK_BODY_WITH_TXS

Ƭ **BLOCK_BODY_WITH_TXS**: `Object`

#### Type declaration

| Name           | Type                                                                                                                             |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `transactions` | [`TXN`](types.RPC.RPCSPEC07.API.SPEC.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) }[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:124

---

### BLOCK_BODY_WITH_RECEIPTS

Ƭ **BLOCK_BODY_WITH_RECEIPTS**: `Object`

#### Type declaration

| Name           | Type                                                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions` | \{ `transaction`: [`TXN`](types.RPC.RPCSPEC07.API.SPEC.md#txn) ; `receipt`: [`TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) }[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:129

---

### BLOCK_HEADER

Ƭ **BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                               |
| :------------------ | :----------------------------------------------------------------- |
| `block_hash`        | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)         |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)         |
| `block_number`      | [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number)     |
| `new_root`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `timestamp`         | `number`                                                           |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC07.API.SPEC.md#resource_price) |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](types.RPC.RPCSPEC07.API.SPEC.md#resource_price) |
| `l1_da_mode`        | `"BLOB"` \| `"CALLDATA"`                                           |
| `starknet_version`  | `string`                                                           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:135

---

### PENDING_BLOCK_HEADER

Ƭ **PENDING_BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                               |
| :------------------ | :----------------------------------------------------------------- |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)         |
| `timestamp`         | `number`                                                           |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC07.API.SPEC.md#resource_price) |
| `l1_data_gas_price` | [`RESOURCE_PRICE`](types.RPC.RPCSPEC07.API.SPEC.md#resource_price) |
| `l1_da_mode`        | `"BLOB"` \| `"CALLDATA"`                                           |
| `starknet_version`  | `string`                                                           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:147

---

### BLOCK_WITH_TX_HASHES

Ƭ **BLOCK_WITH_TX_HASHES**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_tx_hashes)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:156

---

### BLOCK_WITH_TXS

Ƭ **BLOCK_WITH_TXS**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#block_header) & [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_txs)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:159

---

### BLOCK_WITH_RECEIPTS

Ƭ **BLOCK_WITH_RECEIPTS**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_receipts)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:162

---

### PENDING_BLOCK_WITH_TX_HASHES

Ƭ **PENDING_BLOCK_WITH_TX_HASHES**: [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_header)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:165

---

### PENDING_BLOCK_WITH_TXS

Ƭ **PENDING_BLOCK_WITH_TXS**: [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_header)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:166

---

### PENDING_BLOCK_WITH_RECEIPTS

Ƭ **PENDING_BLOCK_WITH_RECEIPTS**: [`BLOCK_BODY_WITH_RECEIPTS`](types.RPC.RPCSPEC07.API.SPEC.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC07.API.SPEC.md#pending_block_header)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:167

---

### DEPLOYED_CONTRACT_ITEM

Ƭ **DEPLOYED_CONTRACT_ITEM**: `Object`

#### Type declaration

| Name         | Type                                           |
| :----------- | :--------------------------------------------- |
| `address`    | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `class_hash` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:168

---

### CONTRACT_STORAGE_DIFF_ITEM

Ƭ **CONTRACT_STORAGE_DIFF_ITEM**: `Object`

#### Type declaration

| Name              | Type                                                                   |
| :---------------- | :--------------------------------------------------------------------- |
| `address`         | `string`                                                               |
| `storage_entries` | [`StorageDiffItem`](types.RPC.RPCSPEC07.API.SPEC.md#storagediffitem)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:172

---

### StorageDiffItem

Ƭ **StorageDiffItem**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `string` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:176

---

### TXN

Ƭ **TXN**: [`INVOKE_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn) \| [`L1_HANDLER_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#l1_handler_txn) \| [`DECLARE_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn) \| [`DEPLOY_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_txn) \| [`DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:180

---

### DECLARE_TXN

Ƭ **DECLARE_TXN**: [`DECLARE_TXN_V0`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_v0) \| [`DECLARE_TXN_V1`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_v1) \| [`DECLARE_TXN_V2`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_v2) \| [`DECLARE_TXN_V3`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_v3)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:181

---

### DECLARE_TXN_V0

Ƭ **DECLARE_TXN_V0**: `Object`

#### Type declaration

| Name             | Type                                                     |
| :--------------- | :------------------------------------------------------- |
| `type`           | `"DECLARE"`                                              |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`        | `"0x0"` \| `"0x100000000000000000000000000000000"`       |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:182

---

### DECLARE_TXN_V1

Ƭ **DECLARE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                     |
| :--------------- | :------------------------------------------------------- |
| `type`           | `"DECLARE"`                                              |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`       |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:190

---

### DECLARE_TXN_V2

Ƭ **DECLARE_TXN_V2**: `Object`

#### Type declaration

| Name                  | Type                                                     |
| :-------------------- | :------------------------------------------------------- |
| `type`                | `"DECLARE"`                                              |
| `sender_address`      | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)     |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `max_fee`             | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`             | `"0x2"` \| `"0x100000000000000000000000000000002"`       |
| `signature`           | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `nonce`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:199

---

### DECLARE_TXN_V3

Ƭ **DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                 |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| `type`                         | `"DECLARE"`                                                                          |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)                                 |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                                   |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC07.API.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:209

---

### BROADCASTED_TXN

Ƭ **BROADCASTED_TXN**: [`BROADCASTED_INVOKE_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_invoke_txn) \| [`BROADCASTED_DECLARE_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_declare_txn) \| [`BROADCASTED_DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_deploy_account_txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:224

---

### BROADCASTED_INVOKE_TXN

Ƭ **BROADCASTED_INVOKE_TXN**: [`INVOKE_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:225

---

### BROADCASTED_DEPLOY_ACCOUNT_TXN

Ƭ **BROADCASTED_DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:226

---

### BROADCASTED_DECLARE_TXN

Ƭ **BROADCASTED_DECLARE_TXN**: [`BROADCASTED_DECLARE_TXN_V1`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_declare_txn_v1) \| [`BROADCASTED_DECLARE_TXN_V2`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_declare_txn_v2) \| [`BROADCASTED_DECLARE_TXN_V3`](types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_declare_txn_v3)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:227

---

### BROADCASTED_DECLARE_TXN_V1

Ƭ **BROADCASTED_DECLARE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                                                     |
| :--------------- | :--------------------------------------------------------------------------------------- |
| `type`           | `"DECLARE"`                                                                              |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)                                     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`                                       |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)                                 |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                           |
| `contract_class` | [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_contract_class) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:228

---

### BROADCASTED_DECLARE_TXN_V2

Ƭ **BROADCASTED_DECLARE_TXN_V2**: `Object`

#### Type declaration

| Name                  | Type                                                               |
| :-------------------- | :----------------------------------------------------------------- |
| `type`                | `"DECLARE"`                                                        |
| `sender_address`      | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)               |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `max_fee`             | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `version`             | `"0x2"` \| `"0x100000000000000000000000000000002"`                 |
| `signature`           | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)           |
| `nonce`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                     |
| `contract_class`      | [`CONTRACT_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#contract_class) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:237

---

### BROADCASTED_DECLARE_TXN_V3

Ƭ **BROADCASTED_DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                 |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| `type`                         | `"DECLARE"`                                                                          |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)                                 |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                                   |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `contract_class`               | [`CONTRACT_CLASS`](types.RPC.RPCSPEC07.API.SPEC.md#contract_class)                   |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC07.API.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:247

---

### DEPLOY_ACCOUNT_TXN

Ƭ **DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V1`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn_v1) \| [`DEPLOY_ACCOUNT_TXN_V3`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn_v3)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:262

---

### DEPLOY_ACCOUNT_TXN_V1

Ƭ **DEPLOY_ACCOUNT_TXN_V1**: `Object`

#### Type declaration

| Name                    | Type                                                     |
| :---------------------- | :------------------------------------------------------- |
| `type`                  | `"DEPLOY_ACCOUNT"`                                       |
| `max_fee`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`               | `"0x1"` \| `"0x100000000000000000000000000000001"`       |
| `signature`             | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `nonce`                 | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]         |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:263

---

### DEPLOY_ACCOUNT_TXN_V3

Ƭ **DEPLOY_ACCOUNT_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                 |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| `type`                         | `"DEPLOY_ACCOUNT"`                                                                   |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                                   |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `contract_address_salt`        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `constructor_calldata`         | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC07.API.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:273

---

### DEPLOY_TXN

Ƭ **DEPLOY_TXN**: `Object`

#### Type declaration

| Name                    | Type                                             |
| :---------------------- | :----------------------------------------------- |
| `type`                  | `"DEPLOY"`                                       |
| `version`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)   |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)   |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[] |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)   |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:287

---

### INVOKE_TXN

Ƭ **INVOKE_TXN**: [`INVOKE_TXN_V0`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn_v0) \| [`INVOKE_TXN_V1`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn_v1) \| [`INVOKE_TXN_V3`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn_v3)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:294

---

### INVOKE_TXN_V0

Ƭ **INVOKE_TXN_V0**: `Object`

#### Type declaration

| Name                   | Type                                                     |
| :--------------------- | :------------------------------------------------------- |
| `type`                 | `"INVOKE"`                                               |
| `max_fee`              | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`              | `"0x0"` \| `"0x100000000000000000000000000000000"`       |
| `signature`            | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)     |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]         |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:295

---

### INVOKE_TXN_V1

Ƭ **INVOKE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                     |
| :--------------- | :------------------------------------------------------- |
| `type`           | `"INVOKE"`                                               |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)     |
| `calldata`       | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]         |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`       |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature) |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)           |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:304

---

### INVOKE_TXN_V3

Ƭ **INVOKE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                                 |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| `type`                         | `"INVOKE"`                                                                           |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)                                 |
| `calldata`                     | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                                   |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC07.API.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC07.API.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC07.API.SPEC.md#da_mode)                                 |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:313

---

### L1_HANDLER_TXN

Ƭ **L1_HANDLER_TXN**: \{ `version`: `"0x0"` ; `type`: `"L1_HANDLER"` ; `nonce`: [`NUM_AS_HEX`](types.RPC.RPCSPEC07.API.SPEC.md#num_as_hex) } & [`FUNCTION_CALL`](types.RPC.RPCSPEC07.API.SPEC.md#function_call)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:327

---

### COMMON_RECEIPT_PROPERTIES

Ƭ **COMMON_RECEIPT_PROPERTIES**: \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash) ; `actual_fee`: [`FEE_PAYMENT`](types.RPC.RPCSPEC07.API.SPEC.md#fee_payment) ; `finality_status`: [`TXN_FINALITY_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#txn_finality_status) ; `messages_sent`: [`MSG_TO_L1`](types.RPC.RPCSPEC07.API.SPEC.md#msg_to_l1)[] ; `events`: [`EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#event)[] ; `execution_resources`: [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#execution_resources) } & `SUCCESSFUL_COMMON_RECEIPT_PROPERTIES` \| `REVERTED_COMMON_RECEIPT_PROPERTIES`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:332

---

### INVOKE_TXN_RECEIPT

Ƭ **INVOKE_TXN_RECEIPT**: \{ `type`: `"INVOKE"` } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC07.API.SPEC.md#common_receipt_properties)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:347

---

### DECLARE_TXN_RECEIPT

Ƭ **DECLARE_TXN_RECEIPT**: \{ `type`: `"DECLARE"` } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC07.API.SPEC.md#common_receipt_properties)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:350

---

### DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **DEPLOY_ACCOUNT_TXN_RECEIPT**: \{ `type`: `"DEPLOY_ACCOUNT"` ; `contract_address`: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC07.API.SPEC.md#common_receipt_properties)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:353

---

### DEPLOY_TXN_RECEIPT

Ƭ **DEPLOY_TXN_RECEIPT**: \{ `type`: `"DEPLOY"` ; `contract_address`: [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC07.API.SPEC.md#common_receipt_properties)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:357

---

### L1_HANDLER_TXN_RECEIPT

Ƭ **L1_HANDLER_TXN_RECEIPT**: \{ `type`: `"L1_HANDLER"` ; `message_hash`: [`NUM_AS_HEX`](types.RPC.RPCSPEC07.API.SPEC.md#num_as_hex) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC07.API.SPEC.md#common_receipt_properties)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:361

---

### TXN_RECEIPT

Ƭ **TXN_RECEIPT**: [`INVOKE_TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn_receipt) \| [`L1_HANDLER_TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#l1_handler_txn_receipt) \| [`DECLARE_TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_receipt) \| [`DEPLOY_TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_txn_receipt) \| [`DEPLOY_ACCOUNT_TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn_receipt)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:365

---

### TXN_RECEIPT_WITH_BLOCK_INFO

Ƭ **TXN_RECEIPT_WITH_BLOCK_INFO**: [`TXN_RECEIPT`](types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) & \{ `block_hash?`: [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash) ; `block_number?`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number) }

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:366

---

### MSG_TO_L1

Ƭ **MSG_TO_L1**: `Object`

#### Type declaration

| Name           | Type                                             |
| :------------- | :----------------------------------------------- |
| `from_address` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)   |
| `to_address`   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)   |
| `payload`      | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:370

---

### MSG_FROM_L1

Ƭ **MSG_FROM_L1**: `Object`

#### Type declaration

| Name                   | Type                                                         |
| :--------------------- | :----------------------------------------------------------- |
| `from_address`         | [`ETH_ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#eth_address) |
| `to_address`           | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address)         |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)               |
| `payload`              | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]             |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:375

---

### FUNCTION_CALL

Ƭ **FUNCTION_CALL**: `Object`

#### Type declaration

| Name                   | Type                                                 |
| :--------------------- | :--------------------------------------------------- |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC07.API.SPEC.md#address) |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)       |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]     |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:381

---

### CONTRACT_CLASS

Ƭ **CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                                     |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sierra_program`                   | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)[]                                                                                                                                                                                                                                         |
| `contract_class_version`           | `string`                                                                                                                                                                                                                                                                                 |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[] ; `EXTERNAL`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[] ; `L1_HANDLER`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                             |
| `entry_points_by_type.EXTERNAL`    | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                             |
| `entry_points_by_type.L1_HANDLER`  | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                             |
| `abi`                              | `string`                                                                                                                                                                                                                                                                                 |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:386

---

### DEPRECATED_CONTRACT_CLASS

Ƭ **DEPRECATED_CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                                                                                                 |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `program`                          | `string`                                                                                                                                                                                                                                                                                                                                             |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[] ; `EXTERNAL`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[] ; `L1_HANDLER`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                                     |
| `entry_points_by_type.EXTERNAL`    | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                                     |
| `entry_points_by_type.L1_HANDLER`  | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC07.API.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                                     |
| `abi`                              | [`CONTRACT_ABI`](types.RPC.RPCSPEC07.API.SPEC.md#contract_abi)                                                                                                                                                                                                                                                                                       |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:396

---

### DEPRECATED_CAIRO_ENTRY_POINT

Ƭ **DEPRECATED_CAIRO_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                                                   |
| :--------- | :--------------------------------------------------------------------- |
| `offset`   | [`NUM_AS_HEX`](types.RPC.RPCSPEC07.API.SPEC.md#num_as_hex) \| `number` |
| `selector` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)                         |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:405

---

### SIERRA_ENTRY_POINT

Ƭ **SIERRA_ENTRY_POINT**: `Object`

#### Type declaration

| Name           | Type                                           |
| :------------- | :--------------------------------------------- |
| `selector`     | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `function_idx` | `number`                                       |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:409

---

### CONTRACT_ABI

Ƭ **CONTRACT_ABI**: readonly [`CONTRACT_ABI_ENTRY`](types.RPC.RPCSPEC07.API.SPEC.md#contract_abi_entry)[]

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:413

---

### CONTRACT_ABI_ENTRY

Ƭ **CONTRACT_ABI_ENTRY**: `Object`

#### Type declaration

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `selector` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `input`    | `string`                                       |
| `output`   | `string`                                       |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:414

---

### STRUCT_ABI_ENTRY

Ƭ **STRUCT_ABI_ENTRY**: `Object`

#### Type declaration

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `type`    | [`STRUCT_ABI_TYPE`](types.RPC.RPCSPEC07.API.SPEC.md#struct_abi_type) |
| `name`    | `string`                                                             |
| `size`    | `number`                                                             |
| `members` | [`STRUCT_MEMBER`](types.RPC.RPCSPEC07.API.SPEC.md#struct_member)[]   |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:419

---

### STRUCT_MEMBER

Ƭ **STRUCT_MEMBER**: [`TYPED_PARAMETER`](types.RPC.RPCSPEC07.API.SPEC.md#typed_parameter) & \{ `offset`: `number` }

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:425

---

### EVENT_ABI_ENTRY

Ƭ **EVENT_ABI_ENTRY**: `Object`

#### Type declaration

| Name   | Type                                                                   |
| :----- | :--------------------------------------------------------------------- |
| `type` | [`EVENT_ABI_TYPE`](types.RPC.RPCSPEC07.API.SPEC.md#event_abi_type)     |
| `name` | `string`                                                               |
| `keys` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC07.API.SPEC.md#typed_parameter)[] |
| `data` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC07.API.SPEC.md#typed_parameter)[] |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:428

---

### FUNCTION_STATE_MUTABILITY

Ƭ **FUNCTION_STATE_MUTABILITY**: `"view"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:434

---

### FUNCTION_ABI_ENTRY

Ƭ **FUNCTION_ABI_ENTRY**: `Object`

#### Type declaration

| Name              | Type                                                                                     |
| :---------------- | :--------------------------------------------------------------------------------------- |
| `type`            | [`FUNCTION_ABI_TYPE`](types.RPC.RPCSPEC07.API.SPEC.md#function_abi_type)                 |
| `name`            | `string`                                                                                 |
| `inputs`          | [`TYPED_PARAMETER`](types.RPC.RPCSPEC07.API.SPEC.md#typed_parameter)[]                   |
| `outputs`         | [`TYPED_PARAMETER`](types.RPC.RPCSPEC07.API.SPEC.md#typed_parameter)[]                   |
| `stateMutability` | [`FUNCTION_STATE_MUTABILITY`](types.RPC.RPCSPEC07.API.SPEC.md#function_state_mutability) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:435

---

### TYPED_PARAMETER

Ƭ **TYPED_PARAMETER**: `Object`

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |
| `type` | `string` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:442

---

### SIMULATION_FLAG_FOR_ESTIMATE_FEE

Ƭ **SIMULATION_FLAG_FOR_ESTIMATE_FEE**: `"SKIP_VALIDATE"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:446

---

### PRICE_UNIT

Ƭ **PRICE_UNIT**: `"WEI"` \| `"FRI"`

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:447

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: `Object`

#### Type declaration

| Name                | Type                                                       |
| :------------------ | :--------------------------------------------------------- |
| `gas_consumed`      | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `gas_price`         | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `data_gas_consumed` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `data_gas_price`    | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `overall_fee`       | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `unit`              | [`PRICE_UNIT`](types.RPC.RPCSPEC07.API.SPEC.md#price_unit) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:448

---

### FEE_PAYMENT

Ƭ **FEE_PAYMENT**: `Object`

#### Type declaration

| Name     | Type                                                       |
| :------- | :--------------------------------------------------------- |
| `amount` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)             |
| `unit`   | [`PRICE_UNIT`](types.RPC.RPCSPEC07.API.SPEC.md#price_unit) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:456

---

### RESOURCE_BOUNDS_MAPPING

Ƭ **RESOURCE_BOUNDS_MAPPING**: `Object`

#### Type declaration

| Name     | Type                                                                 |
| :------- | :------------------------------------------------------------------- |
| `l1_gas` | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds) |
| `l2_gas` | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:460

---

### RESOURCE_BOUNDS

Ƭ **RESOURCE_BOUNDS**: `Object`

#### Type declaration

| Name                 | Type                                           |
| :------------------- | :--------------------------------------------- |
| `max_amount`         | [`u64`](types.RPC.RPCSPEC07.API.SPEC.md#u64)   |
| `max_price_per_unit` | [`u128`](types.RPC.RPCSPEC07.API.SPEC.md#u128) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:464

---

### RESOURCE_PRICE

Ƭ **RESOURCE_PRICE**: `Object`

#### Type declaration

| Name           | Type                                           |
| :------------- | :--------------------------------------------- |
| `price_in_fri` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |
| `price_in_wei` | [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:468

---

### COMPUTATION_RESOURCES

Ƭ **COMPUTATION_RESOURCES**: `Object`

#### Type declaration

| Name                                | Type     |
| :---------------------------------- | :------- |
| `steps`                             | `number` |
| `memory_holes?`                     | `number` |
| `range_check_builtin_applications?` | `number` |
| `pedersen_builtin_applications?`    | `number` |
| `poseidon_builtin_applications?`    | `number` |
| `ec_op_builtin_applications?`       | `number` |
| `ecdsa_builtin_applications?`       | `number` |
| `bitwise_builtin_applications?`     | `number` |
| `keccak_builtin_applications?`      | `number` |
| `segment_arena_builtin?`            | `number` |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:472

---

### EXECUTION_RESOURCES

Ƭ **EXECUTION_RESOURCES**: [`COMPUTATION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#computation_resources) & \{ `data_availability`: \{ `l1_gas`: `number` ; `l1_data_gas`: `number` } }

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:484

---

### TRANSACTION_TRACE

Ƭ **TRANSACTION_TRACE**: `Object`

TRACE API

#### Type declaration

| Name                       | Type                                                                                   |
| :------------------------- | :------------------------------------------------------------------------------------- |
| `invoke_tx_trace?`         | [`INVOKE_TXN_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#invoke_txn_trace)                 |
| `declare_tx_trace?`        | [`DECLARE_TXN_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#declare_txn_trace)               |
| `deploy_account_tx_trace?` | [`DEPLOY_ACCOUNT_TXN_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#deploy_account_txn_trace) |
| `l1_handler_tx_trace?`     | [`L1_HANDLER_TXN_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#l1_handler_txn_trace)         |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:493

---

### INVOKE_TXN_TRACE

Ƭ **INVOKE_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                                                           |
| :------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `type`                     | `"INVOKE"`                                                                                                     |
| `execute_invocation`       | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) \| \{ `revert_reason`: `string` } |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation)                                   |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation)                                   |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff)                                                     |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#execution_resources)                                   |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:499

---

### DECLARE_TXN_TRACE

Ƭ **DECLARE_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                         |
| :------------------------- | :--------------------------------------------------------------------------- |
| `type`                     | `"DECLARE"`                                                                  |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff)                   |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#execution_resources) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:509

---

### DEPLOY_ACCOUNT_TXN_TRACE

Ƭ **DEPLOY_ACCOUNT_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                         |
| :------------------------- | :--------------------------------------------------------------------------- |
| `type`                     | `"DEPLOY_ACCOUNT"`                                                           |
| `constructor_invocation`   | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff)                   |
| `execution_resources`      | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#execution_resources) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:516

---

### L1_HANDLER_TXN_TRACE

Ƭ **L1_HANDLER_TXN_TRACE**: `Object`

#### Type declaration

| Name                  | Type                                                                         |
| :-------------------- | :--------------------------------------------------------------------------- |
| `type`                | `"L1_HANDLER"`                                                               |
| `function_invocation` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation) |
| `state_diff?`         | [`STATE_DIFF`](types.RPC.RPCSPEC07.API.SPEC.md#state_diff)                   |
| `execution_resources` | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#execution_resources) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:524

---

### NESTED_CALL

Ƭ **NESTED_CALL**: [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC07.API.SPEC.md#function_invocation)

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:530

---

### FUNCTION_INVOCATION

Ƭ **FUNCTION_INVOCATION**: [`FUNCTION_CALL`](types.RPC.RPCSPEC07.API.SPEC.md#function_call) & \{ `caller_address`: `string` ; `class_hash`: `string` ; `entry_point_type`: [`ENTRY_POINT_TYPE`](types.RPC.RPCSPEC07.API.SPEC.md#entry_point_type) ; `call_type`: [`CALL_TYPE`](types.RPC.RPCSPEC07.API.SPEC.md#call_type) ; `result`: `string`[] ; `calls`: [`NESTED_CALL`](types.RPC.RPCSPEC07.API.SPEC.md#nested_call)[] ; `events`: [`ORDERED_EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#ordered_event)[] ; `messages`: [`ORDERED_MESSAGE`](types.RPC.RPCSPEC07.API.SPEC.md#ordered_message)[] ; `execution_resources`: [`COMPUTATION_RESOURCES`](types.RPC.RPCSPEC07.API.SPEC.md#computation_resources) }

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:531

---

### ORDERED_EVENT

Ƭ **ORDERED_EVENT**: `Object`

#### Type declaration

| Name    | Type                                             |
| :------ | :----------------------------------------------- |
| `order` | `number`                                         |
| `event` | [`EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#event) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:542

---

### ORDERED_MESSAGE

Ƭ **ORDERED_MESSAGE**: `Object`

#### Type declaration

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `order`   | `number`                                                 |
| `message` | [`MSG_TO_L1`](types.RPC.RPCSPEC07.API.SPEC.md#msg_to_l1) |

#### Defined in

node_modules/starknet-types-07/dist/types/api/components.d.ts:546
