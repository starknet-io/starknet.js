---
id: 'types.RPC.RPCSPEC06.SPEC'
title: 'Namespace: SPEC'
sidebar_label: 'SPEC'
custom_edit_url: null
---

[RPC](types.RPC.md).[RPCSPEC06](types.RPC.RPCSPEC06.md).SPEC

## Type Aliases

### FELT

Ƭ **FELT**: `string`

A field element. represented by at most 63 hex digits

**`Pattern`**

^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L9)

---

### ETH_ADDRESS

Ƭ **ETH_ADDRESS**: `string`

an ethereum address represented as 40 hex digits

**`Pattern`**

^0x[a-fA-F0-9]{40}$

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L14)

---

### STORAGE_KEY

Ƭ **STORAGE_KEY**: `string`

A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.

**`Pattern`**

^0x0[0-7]{1}[a-fA-F0-9]{0,62}$

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:19](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L19)

---

### ADDRESS

Ƭ **ADDRESS**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:20](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L20)

---

### NUM_AS_HEX

Ƭ **NUM_AS_HEX**: `string`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L21)

---

### u64

Ƭ **u64**: `string`

64 bit integers, represented by hex string of length at most 16
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$"

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L26)

---

### u128

Ƭ **u128**: `string`

64 bit integers, represented by hex string of length at most 32
"pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$"

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:31](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L31)

---

### SIGNATURE

Ƭ **SIGNATURE**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L32)

---

### BLOCK_NUMBER

Ƭ **BLOCK_NUMBER**: `number`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L33)

---

### BLOCK_HASH

Ƭ **BLOCK_HASH**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:34](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L34)

---

### TXN_HASH

Ƭ **TXN_HASH**: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:35](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L35)

---

### CHAIN_ID

Ƭ **CHAIN_ID**: [`NUM_AS_HEX`](types.RPC.RPCSPEC06.SPEC.md#num_as_hex)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:36](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L36)

---

### STRUCT_ABI_TYPE

Ƭ **STRUCT_ABI_TYPE**: `"struct"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:37](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L37)

---

### EVENT_ABI_TYPE

Ƭ **EVENT_ABI_TYPE**: `"event"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:38](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L38)

---

### FUNCTION_ABI_TYPE

Ƭ **FUNCTION_ABI_TYPE**: `"function"` \| `"l1_handler"` \| `"constructor"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:39](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L39)

---

### ENTRY_POINT_TYPE

Ƭ **ENTRY_POINT_TYPE**: `"EXTERNAL"` \| `"L1_HANDLER"` \| `"CONSTRUCTOR"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:41](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L41)

---

### CALL_TYPE

Ƭ **CALL_TYPE**: `"DELEGATE"` \| `"LIBRARY_CALL"` \| `"CALL"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:43](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L43)

---

### TXN_STATUS

Ƭ **TXN_STATUS**: `"RECEIVED"` \| `"REJECTED"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:45](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L45)

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: `"SKIP_VALIDATE"` \| `"SKIP_FEE_CHARGE"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L47)

---

### DA_MODE

Ƭ **DA_MODE**: `"L1"` \| `"L2"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L49)

---

### TXN_TYPE

Ƭ **TXN_TYPE**: `"DECLARE"` \| `"DEPLOY"` \| `"DEPLOY_ACCOUNT"` \| `"INVOKE"` \| `"L1_HANDLER"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L50)

---

### TXN_FINALITY_STATUS

Ƭ **TXN_FINALITY_STATUS**: `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:51](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L51)

---

### TXN_EXECUTION_STATUS

Ƭ **TXN_EXECUTION_STATUS**: `"SUCCEEDED"` \| `"REVERTED"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L52)

---

### BLOCK_STATUS

Ƭ **BLOCK_STATUS**: `"PENDING"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:53](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L53)

---

### BLOCK_TAG

Ƭ **BLOCK_TAG**: `"latest"` \| `"pending"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L54)

---

### EVENTS_CHUNK

Ƭ **EVENTS_CHUNK**: `Object`

READ API

#### Type declaration

| Name                  | Type                                                           |
| :-------------------- | :------------------------------------------------------------- |
| `events`              | [`EMITTED_EVENT`](types.RPC.RPCSPEC06.SPEC.md#emitted_event)[] |
| `continuation_token?` | `string`                                                       |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L60)

---

### RESULT_PAGE_REQUEST

Ƭ **RESULT_PAGE_REQUEST**: `Object`

#### Type declaration

| Name                  | Type     |
| :-------------------- | :------- |
| `continuation_token?` | `string` |
| `chunk_size`          | `number` |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:67](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L67)

---

### EMITTED_EVENT

Ƭ **EMITTED_EVENT**: [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event) & \{ `block_hash`: [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash) ; `block_number`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) ; `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) }

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:74](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L74)

---

### EVENT

Ƭ **EVENT**: \{ `from_address`: [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address) } & [`EVENT_CONTENT`](types.RPC.RPCSPEC06.SPEC.md#event_content)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:80](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L80)

---

### EVENT_CONTENT

Ƭ **EVENT_CONTENT**: `Object`

#### Type declaration

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `keys` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[] |
| `data` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L84)

---

### EVENT_FILTER

Ƭ **EVENT_FILTER**: `Object`

#### Type declaration

| Name          | Type                                               |
| :------------ | :------------------------------------------------- |
| `from_block?` | [`BLOCK_ID`](types.RPC.RPCSPEC06.SPEC.md#block_id) |
| `to_block?`   | [`BLOCK_ID`](types.RPC.RPCSPEC06.SPEC.md#block_id) |
| `address?`    | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)   |
| `keys?`       | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[][]     |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:89](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L89)

---

### BLOCK_ID

Ƭ **BLOCK_ID**: \{ `block_hash?`: [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash) ; `block_number?`: [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) } \| [`BLOCK_TAG`](types.RPC.RPCSPEC06.SPEC.md#block_tag)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:96](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L96)

---

### SYNC_STATUS

Ƭ **SYNC_STATUS**: `Object`

#### Type declaration

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `starting_block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)     |
| `starting_block_num`  | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) |
| `current_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)     |
| `current_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) |
| `highest_block_hash`  | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)     |
| `highest_block_num`   | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:103](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L103)

---

### NEW_CLASSES

Ƭ **NEW_CLASSES**: `Object`

#### Type declaration

| Name                  | Type                                       |
| :-------------------- | :----------------------------------------- |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:112](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L112)

---

### REPLACED_CLASS

Ƭ **REPLACED_CLASS**: `Object`

#### Type declaration

| Name               | Type                                       |
| :----------------- | :----------------------------------------- |
| `class_hash`       | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `contract_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:117](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L117)

---

### NONCE_UPDATE

Ƭ **NONCE_UPDATE**: `Object`

#### Type declaration

| Name               | Type                                             |
| :----------------- | :----------------------------------------------- |
| `contract_address` | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address) |
| `nonce`            | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)       |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:122](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L122)

---

### STATE_DIFF

Ƭ **STATE_DIFF**: `Object`

#### Type declaration

| Name                          | Type                                                                                     |
| :---------------------------- | :--------------------------------------------------------------------------------------- |
| `storage_diffs`               | [`CONTRACT_STORAGE_DIFF_ITEM`](types.RPC.RPCSPEC06.SPEC.md#contract_storage_diff_item)[] |
| `deprecated_declared_classes` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                             |
| `declared_classes`            | [`NEW_CLASSES`](types.RPC.RPCSPEC06.SPEC.md#new_classes)[]                               |
| `deployed_contracts`          | [`DEPLOYED_CONTRACT_ITEM`](types.RPC.RPCSPEC06.SPEC.md#deployed_contract_item)[]         |
| `replaced_classes`            | [`REPLACED_CLASS`](types.RPC.RPCSPEC06.SPEC.md#replaced_class)[]                         |
| `nonces`                      | [`NONCE_UPDATE`](types.RPC.RPCSPEC06.SPEC.md#nonce_update)[]                             |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:127](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L127)

---

### PENDING_STATE_UPDATE

Ƭ **PENDING_STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                   |
| :----------- | :----------------------------------------------------- |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff) |
| `block_hash` | `never`                                                |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:136](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L136)

---

### STATE_UPDATE

Ƭ **STATE_UPDATE**: `Object`

#### Type declaration

| Name         | Type                                                   |
| :----------- | :----------------------------------------------------- |
| `block_hash` | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash) |
| `old_root`   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `new_root`   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `state_diff` | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:142](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L142)

---

### BLOCK_BODY_WITH_TX_HASHES

Ƭ **BLOCK_BODY_WITH_TX_HASHES**: `Object`

#### Type declaration

| Name           | Type                                                 |
| :------------- | :--------------------------------------------------- |
| `transactions` | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash)[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:149](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L149)

---

### BLOCK_BODY_WITH_TXS

Ƭ **BLOCK_BODY_WITH_TXS**: `Object`

#### Type declaration

| Name           | Type                                                                                                                     |
| :------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `transactions` | [`TXN`](types.RPC.RPCSPEC06.SPEC.md#txn) & \{ `transaction_hash`: [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash) }[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:153](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L153)

---

### BLOCK_HEADER

Ƭ **BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                           |
| :------------------ | :------------------------------------------------------------- |
| `block_hash`        | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)         |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)         |
| `block_number`      | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number)     |
| `new_root`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `timestamp`         | `number`                                                       |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC06.SPEC.md#resource_price) |
| `starknet_version`  | `string`                                                       |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:159](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L159)

---

### PENDING_BLOCK_HEADER

Ƭ **PENDING_BLOCK_HEADER**: `Object`

#### Type declaration

| Name                | Type                                                           |
| :------------------ | :------------------------------------------------------------- |
| `parent_hash`       | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)         |
| `timestamp`         | `number`                                                       |
| `sequencer_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `l1_gas_price`      | [`RESOURCE_PRICE`](types.RPC.RPCSPEC06.SPEC.md#resource_price) |
| `starknet_version`  | `string`                                                       |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:170](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L170)

---

### BLOCK_WITH_TX_HASHES

Ƭ **BLOCK_WITH_TX_HASHES**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC06.SPEC.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC06.SPEC.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#block_body_with_tx_hashes)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:178](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L178)

---

### BLOCK_WITH_TXS

Ƭ **BLOCK_WITH_TXS**: \{ `status`: [`BLOCK_STATUS`](types.RPC.RPCSPEC06.SPEC.md#block_status) } & [`BLOCK_HEADER`](types.RPC.RPCSPEC06.SPEC.md#block_header) & [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#block_body_with_txs)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:181](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L181)

---

### PENDING_BLOCK_WITH_TX_HASHES

Ƭ **PENDING_BLOCK_WITH_TX_HASHES**: [`BLOCK_BODY_WITH_TX_HASHES`](types.RPC.RPCSPEC06.SPEC.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC06.SPEC.md#pending_block_header)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:183](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L183)

---

### PENDING_BLOCK_WITH_TXS

Ƭ **PENDING_BLOCK_WITH_TXS**: [`BLOCK_BODY_WITH_TXS`](types.RPC.RPCSPEC06.SPEC.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](types.RPC.RPCSPEC06.SPEC.md#pending_block_header)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:185](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L185)

---

### DEPLOYED_CONTRACT_ITEM

Ƭ **DEPLOYED_CONTRACT_ITEM**: `Object`

#### Type declaration

| Name         | Type                                       |
| :----------- | :----------------------------------------- |
| `address`    | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `class_hash` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:187](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L187)

---

### CONTRACT_STORAGE_DIFF_ITEM

Ƭ **CONTRACT_STORAGE_DIFF_ITEM**: `Object`

#### Type declaration

| Name              | Type                                                               |
| :---------------- | :----------------------------------------------------------------- |
| `address`         | `string`                                                           |
| `storage_entries` | [`StorageDiffItem`](types.RPC.RPCSPEC06.SPEC.md#storagediffitem)[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:192](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L192)

---

### StorageDiffItem

Ƭ **StorageDiffItem**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `string` |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:199](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L199)

---

### TXN

Ƭ **TXN**: [`INVOKE_TXN`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn) \| [`L1_HANDLER_TXN`](types.RPC.RPCSPEC06.SPEC.md#l1_handler_txn) \| [`DECLARE_TXN`](types.RPC.RPCSPEC06.SPEC.md#declare_txn) \| [`DEPLOY_TXN`](types.RPC.RPCSPEC06.SPEC.md#deploy_txn) \| [`DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:206](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L206)

---

### DECLARE_TXN

Ƭ **DECLARE_TXN**: [`DECLARE_TXN_V0`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_v0) \| [`DECLARE_TXN_V1`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_v1) \| [`DECLARE_TXN_V2`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_v2) \| [`DECLARE_TXN_V3`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_v3)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:208](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L208)

---

### DECLARE_TXN_V0

Ƭ **DECLARE_TXN_V0**: `Object`

#### Type declaration

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `type`           | `"DECLARE"`                                          |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`        | `"0x0"` \| `"0x100000000000000000000000000000000"`   |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:210](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L210)

---

### DECLARE_TXN_V1

Ƭ **DECLARE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `type`           | `"DECLARE"`                                          |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`   |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `class_hash`     | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:219](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L219)

---

### DECLARE_TXN_V2

Ƭ **DECLARE_TXN_V2**: `Object`

#### Type declaration

| Name                  | Type                                                 |
| :-------------------- | :--------------------------------------------------- |
| `type`                | `"DECLARE"`                                          |
| `sender_address`      | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)     |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `max_fee`             | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`             | `"0x2"` \| `"0x100000000000000000000000000000002"`   |
| `signature`           | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `nonce`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `class_hash`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:229](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L229)

---

### DECLARE_TXN_V3

Ƭ **DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | `"DECLARE"`                                                                      |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)                                 |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                               |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC06.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:240](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L240)

---

### BROADCASTED_TXN

Ƭ **BROADCASTED_TXN**: [`BROADCASTED_INVOKE_TXN`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_invoke_txn) \| [`BROADCASTED_DECLARE_TXN`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_declare_txn) \| [`BROADCASTED_DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_deploy_account_txn)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:257](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L257)

---

### BROADCASTED_INVOKE_TXN

Ƭ **BROADCASTED_INVOKE_TXN**: [`INVOKE_TXN`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:262](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L262)

---

### BROADCASTED_DEPLOY_ACCOUNT_TXN

Ƭ **BROADCASTED_DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:264](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L264)

---

### BROADCASTED_DECLARE_TXN

Ƭ **BROADCASTED_DECLARE_TXN**: [`BROADCASTED_DECLARE_TXN_V1`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_declare_txn_v1) \| [`BROADCASTED_DECLARE_TXN_V2`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_declare_txn_v2) \| [`BROADCASTED_DECLARE_TXN_V3`](types.RPC.RPCSPEC06.SPEC.md#broadcasted_declare_txn_v3)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:266](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L266)

---

### BROADCASTED_DECLARE_TXN_V1

Ƭ **BROADCASTED_DECLARE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------- |
| `type`           | `"DECLARE"`                                                                          |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)                                     |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`                                   |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)                                 |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                           |
| `contract_class` | [`DEPRECATED_CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#deprecated_contract_class) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:271](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L271)

---

### BROADCASTED_DECLARE_TXN_V2

Ƭ **BROADCASTED_DECLARE_TXN_V2**: `Object`

#### Type declaration

| Name                  | Type                                                           |
| :-------------------- | :------------------------------------------------------------- |
| `type`                | `"DECLARE"`                                                    |
| `sender_address`      | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)               |
| `compiled_class_hash` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `max_fee`             | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `version`             | `"0x2"` \| `"0x100000000000000000000000000000002"`             |
| `signature`           | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)           |
| `nonce`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                     |
| `contract_class`      | [`CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#contract_class) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:282](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L282)

---

### BROADCASTED_DECLARE_TXN_V3

Ƭ **BROADCASTED_DECLARE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | `"DECLARE"`                                                                      |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)                                 |
| `compiled_class_hash`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                               |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `contract_class`               | [`CONTRACT_CLASS`](types.RPC.RPCSPEC06.SPEC.md#contract_class)                   |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC06.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:293](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L293)

---

### DEPLOY_ACCOUNT_TXN

Ƭ **DEPLOY_ACCOUNT_TXN**: [`DEPLOY_ACCOUNT_TXN_V1`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn_v1) \| [`DEPLOY_ACCOUNT_TXN_V3`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn_v3)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:310](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L310)

---

### DEPLOY_ACCOUNT_TXN_V1

Ƭ **DEPLOY_ACCOUNT_TXN_V1**: `Object`

#### Type declaration

| Name                    | Type                                                 |
| :---------------------- | :--------------------------------------------------- |
| `type`                  | `"DEPLOY_ACCOUNT"`                                   |
| `max_fee`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`               | `"0x1"` \| `"0x100000000000000000000000000000001"`   |
| `signature`             | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `nonce`                 | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]         |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:312](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L312)

---

### DEPLOY_ACCOUNT_TXN_V3

Ƭ **DEPLOY_ACCOUNT_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | `"DEPLOY_ACCOUNT"`                                                               |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                               |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `contract_address_salt`        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `constructor_calldata`         | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `class_hash`                   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC06.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:323](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L323)

---

### DEPLOY_TXN

Ƭ **DEPLOY_TXN**: `Object`

#### Type declaration

| Name                    | Type                                         |
| :---------------------- | :------------------------------------------- |
| `type`                  | `"DEPLOY"`                                   |
| `version`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)   |
| `contract_address_salt` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)   |
| `constructor_calldata`  | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[] |
| `class_hash`            | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:338](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L338)

---

### INVOKE_TXN

Ƭ **INVOKE_TXN**: [`INVOKE_TXN_V0`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn_v0) \| [`INVOKE_TXN_V1`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn_v1) \| [`INVOKE_TXN_V3`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn_v3)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:346](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L346)

---

### INVOKE_TXN_V0

Ƭ **INVOKE_TXN_V0**: `Object`

#### Type declaration

| Name                   | Type                                                 |
| :--------------------- | :--------------------------------------------------- |
| `type`                 | `"INVOKE"`                                           |
| `max_fee`              | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`              | `"0x0"` \| `"0x100000000000000000000000000000000"`   |
| `signature`            | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)     |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]         |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:348](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L348)

---

### INVOKE_TXN_V1

Ƭ **INVOKE_TXN_V1**: `Object`

#### Type declaration

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `type`           | `"INVOKE"`                                           |
| `sender_address` | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)     |
| `calldata`       | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]         |
| `max_fee`        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |
| `version`        | `"0x1"` \| `"0x100000000000000000000000000000001"`   |
| `signature`      | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature) |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)           |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:358](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L358)

---

### INVOKE_TXN_V3

Ƭ **INVOKE_TXN_V3**: `Object`

#### Type declaration

| Name                           | Type                                                                             |
| :----------------------------- | :------------------------------------------------------------------------------- |
| `type`                         | `"INVOKE"`                                                                       |
| `sender_address`               | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)                                 |
| `calldata`                     | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `version`                      | `"0x3"` \| `"0x100000000000000000000000000000003"`                               |
| `signature`                    | [`SIGNATURE`](types.RPC.RPCSPEC06.SPEC.md#signature)                             |
| `nonce`                        | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                                       |
| `resource_bounds`              | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds_mapping) |
| `tip`                          | [`u64`](types.RPC.RPCSPEC06.SPEC.md#u64)                                         |
| `paymaster_data`               | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `account_deployment_data`      | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                     |
| `nonce_data_availability_mode` | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |
| `fee_data_availability_mode`   | [`DA_MODE`](types.RPC.RPCSPEC06.SPEC.md#da_mode)                                 |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:368](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L368)

---

### L1_HANDLER_TXN

Ƭ **L1_HANDLER_TXN**: \{ `version`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) ; `type`: `"L1_HANDLER"` ; `nonce`: [`NUM_AS_HEX`](types.RPC.RPCSPEC06.SPEC.md#num_as_hex) } & [`FUNCTION_CALL`](types.RPC.RPCSPEC06.SPEC.md#function_call)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:383](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L383)

---

### COMMON_RECEIPT_PROPERTIES

Ƭ **COMMON_RECEIPT_PROPERTIES**: `Object`

#### Type declaration

| Name                  | Type                                                                       |
| :-------------------- | :------------------------------------------------------------------------- |
| `transaction_hash`    | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash)                         |
| `actual_fee`          | [`FEE_PAYMENT`](types.RPC.RPCSPEC06.SPEC.md#fee_payment)                   |
| `execution_status`    | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_execution_status) |
| `finality_status`     | [`TXN_FINALITY_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_finality_status)   |
| `block_hash`          | [`BLOCK_HASH`](types.RPC.RPCSPEC06.SPEC.md#block_hash)                     |
| `block_number`        | [`BLOCK_NUMBER`](types.RPC.RPCSPEC06.SPEC.md#block_number)                 |
| `messages_sent`       | [`MSG_TO_L1`](types.RPC.RPCSPEC06.SPEC.md#msg_to_l1)[]                     |
| `revert_reason?`      | `string`                                                                   |
| `events`              | [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event)[]                             |
| `execution_resources` | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC06.SPEC.md#execution_resources)   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:389](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L389)

---

### PENDING_COMMON_RECEIPT_PROPERTIES

Ƭ **PENDING_COMMON_RECEIPT_PROPERTIES**: `Object`

#### Type declaration

| Name                  | Type                                                                       |
| :-------------------- | :------------------------------------------------------------------------- |
| `transaction_hash`    | [`TXN_HASH`](types.RPC.RPCSPEC06.SPEC.md#txn_hash)                         |
| `actual_fee`          | [`FEE_PAYMENT`](types.RPC.RPCSPEC06.SPEC.md#fee_payment)                   |
| `messages_sent`       | [`MSG_TO_L1`](types.RPC.RPCSPEC06.SPEC.md#msg_to_l1)[]                     |
| `events`              | [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event)[]                             |
| `revert_reason?`      | `string`                                                                   |
| `finality_status`     | `"ACCEPTED_ON_L2"`                                                         |
| `execution_status`    | [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC06.SPEC.md#txn_execution_status) |
| `execution_resources` | [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC06.SPEC.md#execution_resources)   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:402](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L402)

---

### INVOKE_TXN_RECEIPT

Ƭ **INVOKE_TXN_RECEIPT**: \{ `type`: `"INVOKE"` } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:413](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L413)

---

### PENDING_INVOKE_TXN_RECEIPT

Ƭ **PENDING_INVOKE_TXN_RECEIPT**: \{ `type`: `"INVOKE"` } & [`PENDING_COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#pending_common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:417](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L417)

---

### DECLARE_TXN_RECEIPT

Ƭ **DECLARE_TXN_RECEIPT**: \{ `type`: `"DECLARE"` } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:421](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L421)

---

### PENDING_DECLARE_TXN_RECEIPT

Ƭ **PENDING_DECLARE_TXN_RECEIPT**: \{ `type`: `"DECLARE"` } & [`PENDING_COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#pending_common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:425](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L425)

---

### DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **DEPLOY_ACCOUNT_TXN_RECEIPT**: \{ `type`: `"DEPLOY_ACCOUNT"` ; `contract_address`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:429](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L429)

---

### PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT**: \{ `type`: `"DEPLOY_ACCOUNT"` ; `contract_address`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) } & [`PENDING_COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#pending_common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:434](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L434)

---

### DEPLOY_TXN_RECEIPT

Ƭ **DEPLOY_TXN_RECEIPT**: \{ `type`: `"DEPLOY"` ; `contract_address`: [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:439](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L439)

---

### L1_HANDLER_TXN_RECEIPT

Ƭ **L1_HANDLER_TXN_RECEIPT**: \{ `type`: `"L1_HANDLER"` ; `message_hash`: [`NUM_AS_HEX`](types.RPC.RPCSPEC06.SPEC.md#num_as_hex) } & [`COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:444](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L444)

---

### PENDING_L1_HANDLER_TXN_RECEIPT

Ƭ **PENDING_L1_HANDLER_TXN_RECEIPT**: \{ `type`: `"L1_HANDLER"` ; `message_hash`: [`NUM_AS_HEX`](types.RPC.RPCSPEC06.SPEC.md#num_as_hex) } & [`PENDING_COMMON_RECEIPT_PROPERTIES`](types.RPC.RPCSPEC06.SPEC.md#pending_common_receipt_properties)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:449](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L449)

---

### TXN_RECEIPT

Ƭ **TXN_RECEIPT**: [`INVOKE_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn_receipt) \| [`L1_HANDLER_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#l1_handler_txn_receipt) \| [`DECLARE_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_receipt) \| [`DEPLOY_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#deploy_txn_receipt) \| [`DEPLOY_ACCOUNT_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:454](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L454)

---

### PENDING_TXN_RECEIPT

Ƭ **PENDING_TXN_RECEIPT**: [`PENDING_INVOKE_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_invoke_txn_receipt) \| [`PENDING_L1_HANDLER_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_l1_handler_txn_receipt) \| [`PENDING_DECLARE_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_declare_txn_receipt) \| [`PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT`](types.RPC.RPCSPEC06.SPEC.md#pending_deploy_account_txn_receipt)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:461](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L461)

---

### MSG_TO_L1

Ƭ **MSG_TO_L1**: `Object`

#### Type declaration

| Name           | Type                                         |
| :------------- | :------------------------------------------- |
| `from_address` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)   |
| `to_address`   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)   |
| `payload`      | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:467](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L467)

---

### MSG_FROM_L1

Ƭ **MSG_FROM_L1**: `Object`

#### Type declaration

| Name                   | Type                                                     |
| :--------------------- | :------------------------------------------------------- |
| `from_address`         | [`ETH_ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#eth_address) |
| `to_address`           | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address)         |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)               |
| `payload`              | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]             |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:473](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L473)

---

### FUNCTION_CALL

Ƭ **FUNCTION_CALL**: `Object`

#### Type declaration

| Name                   | Type                                             |
| :--------------------- | :----------------------------------------------- |
| `contract_address`     | [`ADDRESS`](types.RPC.RPCSPEC06.SPEC.md#address) |
| `entry_point_selector` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)       |
| `calldata`             | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]     |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:480](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L480)

---

### CONTRACT_CLASS

Ƭ **CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                         |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sierra_program`                   | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)[]                                                                                                                                                                                                                                 |
| `contract_class_version`           | `string`                                                                                                                                                                                                                                                                     |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[] ; `EXTERNAL`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[] ; `L1_HANDLER`: [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                     |
| `entry_points_by_type.EXTERNAL`    | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                     |
| `entry_points_by_type.L1_HANDLER`  | [`SIERRA_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#sierra_entry_point)[]                                                                                                                                                                                                     |
| `abi`                              | `string`                                                                                                                                                                                                                                                                     |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:486](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L486)

---

### DEPRECATED_CONTRACT_CLASS

Ƭ **DEPRECATED_CONTRACT_CLASS**: `Object`

#### Type declaration

| Name                               | Type                                                                                                                                                                                                                                                                                                                                     |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `program`                          | `string`                                                                                                                                                                                                                                                                                                                                 |
| `entry_points_by_type`             | \{ `CONSTRUCTOR`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[] ; `EXTERNAL`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[] ; `L1_HANDLER`: [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[] } |
| `entry_points_by_type.CONSTRUCTOR` | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                             |
| `entry_points_by_type.EXTERNAL`    | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                             |
| `entry_points_by_type.L1_HANDLER`  | [`DEPRECATED_CAIRO_ENTRY_POINT`](types.RPC.RPCSPEC06.SPEC.md#deprecated_cairo_entry_point)[]                                                                                                                                                                                                                                             |
| `abi`                              | [`CONTRACT_ABI`](types.RPC.RPCSPEC06.SPEC.md#contract_abi)                                                                                                                                                                                                                                                                               |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:497](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L497)

---

### DEPRECATED_CAIRO_ENTRY_POINT

Ƭ **DEPRECATED_CAIRO_ENTRY_POINT**: `Object`

#### Type declaration

| Name       | Type                                                               |
| :--------- | :----------------------------------------------------------------- |
| `offset`   | [`NUM_AS_HEX`](types.RPC.RPCSPEC06.SPEC.md#num_as_hex) \| `number` |
| `selector` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)                         |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:507](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L507)

---

### SIERRA_ENTRY_POINT

Ƭ **SIERRA_ENTRY_POINT**: `Object`

#### Type declaration

| Name           | Type                                       |
| :------------- | :----------------------------------------- |
| `selector`     | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `function_idx` | `number`                                   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:512](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L512)

---

### CONTRACT_ABI

Ƭ **CONTRACT_ABI**: readonly [`CONTRACT_ABI_ENTRY`](types.RPC.RPCSPEC06.SPEC.md#contract_abi_entry)[]

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:517](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L517)

---

### CONTRACT_ABI_ENTRY

Ƭ **CONTRACT_ABI_ENTRY**: `Object`

#### Type declaration

| Name       | Type                                       |
| :--------- | :----------------------------------------- |
| `selector` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `input`    | `string`                                   |
| `output`   | `string`                                   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:519](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L519)

---

### STRUCT_ABI_ENTRY

Ƭ **STRUCT_ABI_ENTRY**: `Object`

#### Type declaration

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `type`    | [`STRUCT_ABI_TYPE`](types.RPC.RPCSPEC06.SPEC.md#struct_abi_type) |
| `name`    | `string`                                                         |
| `size`    | `number`                                                         |
| `members` | [`STRUCT_MEMBER`](types.RPC.RPCSPEC06.SPEC.md#struct_member)[]   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:525](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L525)

---

### STRUCT_MEMBER

Ƭ **STRUCT_MEMBER**: [`TYPED_PARAMETER`](types.RPC.RPCSPEC06.SPEC.md#typed_parameter) & \{ `offset`: `number` }

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:532](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L532)

---

### EVENT_ABI_ENTRY

Ƭ **EVENT_ABI_ENTRY**: `Object`

#### Type declaration

| Name   | Type                                                               |
| :----- | :----------------------------------------------------------------- |
| `type` | [`EVENT_ABI_TYPE`](types.RPC.RPCSPEC06.SPEC.md#event_abi_type)     |
| `name` | `string`                                                           |
| `keys` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC06.SPEC.md#typed_parameter)[] |
| `data` | [`TYPED_PARAMETER`](types.RPC.RPCSPEC06.SPEC.md#typed_parameter)[] |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:536](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L536)

---

### FUNCTION_STATE_MUTABILITY

Ƭ **FUNCTION_STATE_MUTABILITY**: `"view"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:543](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L543)

---

### FUNCTION_ABI_ENTRY

Ƭ **FUNCTION_ABI_ENTRY**: `Object`

#### Type declaration

| Name              | Type                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- |
| `type`            | [`FUNCTION_ABI_TYPE`](types.RPC.RPCSPEC06.SPEC.md#function_abi_type)                 |
| `name`            | `string`                                                                             |
| `inputs`          | [`TYPED_PARAMETER`](types.RPC.RPCSPEC06.SPEC.md#typed_parameter)[]                   |
| `outputs`         | [`TYPED_PARAMETER`](types.RPC.RPCSPEC06.SPEC.md#typed_parameter)[]                   |
| `stateMutability` | [`FUNCTION_STATE_MUTABILITY`](types.RPC.RPCSPEC06.SPEC.md#function_state_mutability) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:545](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L545)

---

### TYPED_PARAMETER

Ƭ **TYPED_PARAMETER**: `Object`

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |
| `type` | `string` |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:553](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L553)

---

### SIMULATION_FLAG_FOR_ESTIMATE_FEE

Ƭ **SIMULATION_FLAG_FOR_ESTIMATE_FEE**: `"SKIP_VALIDATE"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:558](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L558)

---

### PRICE_UNIT

Ƭ **PRICE_UNIT**: `"WEI"` \| `"FRI"`

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:559](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L559)

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: `Object`

#### Type declaration

| Name           | Type                                                   |
| :------------- | :----------------------------------------------------- |
| `gas_consumed` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `gas_price`    | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `overall_fee`  | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `unit`         | [`PRICE_UNIT`](types.RPC.RPCSPEC06.SPEC.md#price_unit) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:561](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L561)

---

### FEE_PAYMENT

Ƭ **FEE_PAYMENT**: `Object`

#### Type declaration

| Name     | Type                                                   |
| :------- | :----------------------------------------------------- |
| `amount` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt)             |
| `unit`   | [`PRICE_UNIT`](types.RPC.RPCSPEC06.SPEC.md#price_unit) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:568](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L568)

---

### RESOURCE_BOUNDS_MAPPING

Ƭ **RESOURCE_BOUNDS_MAPPING**: `Object`

#### Type declaration

| Name     | Type                                                             |
| :------- | :--------------------------------------------------------------- |
| `l1_gas` | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds) |
| `l2_gas` | [`RESOURCE_BOUNDS`](types.RPC.RPCSPEC06.SPEC.md#resource_bounds) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:573](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L573)

---

### RESOURCE_BOUNDS

Ƭ **RESOURCE_BOUNDS**: `Object`

#### Type declaration

| Name                 | Type                                       |
| :------------------- | :----------------------------------------- |
| `max_amount`         | [`u64`](types.RPC.RPCSPEC06.SPEC.md#u64)   |
| `max_price_per_unit` | [`u128`](types.RPC.RPCSPEC06.SPEC.md#u128) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:578](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L578)

---

### RESOURCE_PRICE

Ƭ **RESOURCE_PRICE**: `Object`

#### Type declaration

| Name           | Type                                       |
| :------------- | :----------------------------------------- |
| `price_in_fri` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |
| `price_in_wei` | [`FELT`](types.RPC.RPCSPEC06.SPEC.md#felt) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:583](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L583)

---

### EXECUTION_RESOURCES

Ƭ **EXECUTION_RESOURCES**: `Object`

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

[src/types/api/rpcspec_0_6/components.ts:588](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L588)

---

### TRANSACTION_TRACE

Ƭ **TRANSACTION_TRACE**: `Object`

TRACE API

#### Type declaration

| Name                       | Type                                                                               |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `invoke_tx_trace?`         | [`INVOKE_TXN_TRACE`](types.RPC.RPCSPEC06.SPEC.md#invoke_txn_trace)                 |
| `declare_tx_trace?`        | [`DECLARE_TXN_TRACE`](types.RPC.RPCSPEC06.SPEC.md#declare_txn_trace)               |
| `deploy_account_tx_trace?` | [`DEPLOY_ACCOUNT_TXN_TRACE`](types.RPC.RPCSPEC06.SPEC.md#deploy_account_txn_trace) |
| `l1_handler_tx_trace?`     | [`L1_HANDLER_TXN_TRACE`](types.RPC.RPCSPEC06.SPEC.md#l1_handler_txn_trace)         |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:606](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L606)

---

### INVOKE_TXN_TRACE

Ƭ **INVOKE_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                                                       |
| :------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `type`                     | `"INVOKE"`                                                                                                 |
| `execute_invocation`       | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) \| \{ `revert_reason`: `string` } |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation)                                   |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation)                                   |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff)                                                     |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:614](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L614)

---

### DECLARE_TXN_TRACE

Ƭ **DECLARE_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                     |
| :------------------------- | :----------------------------------------------------------------------- |
| `type`                     | `"DECLARE"`                                                              |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff)                   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:623](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L623)

---

### DEPLOY_ACCOUNT_TXN_TRACE

Ƭ **DEPLOY_ACCOUNT_TXN_TRACE**: `Object`

#### Type declaration

| Name                       | Type                                                                     |
| :------------------------- | :----------------------------------------------------------------------- |
| `type`                     | `"DEPLOY_ACCOUNT"`                                                       |
| `constructor_invocation`   | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `validate_invocation?`     | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `fee_transfer_invocation?` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `state_diff?`              | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff)                   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:631](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L631)

---

### L1_HANDLER_TXN_TRACE

Ƭ **L1_HANDLER_TXN_TRACE**: `Object`

#### Type declaration

| Name                  | Type                                                                     |
| :-------------------- | :----------------------------------------------------------------------- |
| `type`                | `"L1_HANDLER"`                                                           |
| `function_invocation` | [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation) |
| `state_diff?`         | [`STATE_DIFF`](types.RPC.RPCSPEC06.SPEC.md#state_diff)                   |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:640](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L640)

---

### NESTED_CALL

Ƭ **NESTED_CALL**: [`FUNCTION_INVOCATION`](types.RPC.RPCSPEC06.SPEC.md#function_invocation)

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:647](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L647)

---

### FUNCTION_INVOCATION

Ƭ **FUNCTION_INVOCATION**: [`FUNCTION_CALL`](types.RPC.RPCSPEC06.SPEC.md#function_call) & \{ `caller_address`: `string` ; `class_hash`: `string` ; `entry_point_type`: [`ENTRY_POINT_TYPE`](types.RPC.RPCSPEC06.SPEC.md#entry_point_type) ; `call_type`: [`CALL_TYPE`](types.RPC.RPCSPEC06.SPEC.md#call_type) ; `result`: `string`[] ; `calls`: [`NESTED_CALL`](types.RPC.RPCSPEC06.SPEC.md#nested_call)[] ; `events`: [`ORDERED_EVENT`](types.RPC.RPCSPEC06.SPEC.md#ordered_event)[] ; `messages`: [`ORDERED_MESSAGE`](types.RPC.RPCSPEC06.SPEC.md#ordered_message)[] ; `execution_resources`: [`EXECUTION_RESOURCES`](types.RPC.RPCSPEC06.SPEC.md#execution_resources) }

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:650](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L650)

---

### ORDERED_EVENT

Ƭ **ORDERED_EVENT**: `Object`

#### Type declaration

| Name    | Type                                         |
| :------ | :------------------------------------------- |
| `order` | `number`                                     |
| `event` | [`EVENT`](types.RPC.RPCSPEC06.SPEC.md#event) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:663](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L663)

---

### ORDERED_MESSAGE

Ƭ **ORDERED_MESSAGE**: `Object`

#### Type declaration

| Name      | Type                                                 |
| :-------- | :--------------------------------------------------- |
| `order`   | `number`                                             |
| `message` | [`MSG_TO_L1`](types.RPC.RPCSPEC06.SPEC.md#msg_to_l1) |

#### Defined in

[src/types/api/rpcspec_0_6/components.ts:669](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/api/rpcspec_0_6/components.ts#L669)
