---
id: 'RPC08.RpcChannel'
title: 'Class: RpcChannel'
sidebar_label: 'RpcChannel'
custom_edit_url: null
---

[RPC08](../namespaces/RPC08.md).RpcChannel

## Constructors

### constructor

• **new RpcChannel**(`optionsOrProvider?`): [`RpcChannel`](RPC08.RpcChannel.md)

#### Parameters

| Name                 | Type                                                              |
| :------------------- | :---------------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions) |

#### Returns

[`RpcChannel`](RPC08.RpcChannel.md)

#### Defined in

[src/channel/rpc_0_8_1.ts:88](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L88)

## Properties

### id

• `Readonly` **id**: `"RPC081"`

#### Defined in

[src/channel/rpc_0_8_1.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L56)

---

### channelSpecVersion

• `Readonly` **channelSpecVersion**: `"0.7.1"` \| `"0.8.1"` = `SupportedRpcVersion.v0_8_1`

RPC specification version this Channel class implements

#### Defined in

[src/channel/rpc_0_8_1.ts:61](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L61)

---

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_8_1.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L63)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_8_1.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L65)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L67)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_8_1.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L69)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:71](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L71)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_8_1.ts:73](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L73)

---

### chainId

• `Private` `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Defined in

[src/channel/rpc_0_8_1.ts:75](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L75)

---

### specVersion

• `Private` `Optional` **specVersion**: `"0.7.1"` \| `"0.8.1"`

RPC specification version of the connected node

#### Defined in

[src/channel/rpc_0_8_1.ts:80](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L80)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:82](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L82)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)

#### Defined in

[src/channel/rpc_0_8_1.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L84)

---

### baseFetch

• `Private` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:86](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L86)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_8_1.ts:143](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L143)

## Methods

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.7.1"` \| `"0.8.1"`

#### Returns

`undefined` \| `"0.7.1"` \| `"0.8.1"`

#### Defined in

[src/channel/rpc_0_8_1.ts:139](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L139)

---

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `chainId` | `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"` |

#### Returns

`void`

#### Defined in

[src/channel/rpc_0_8_1.ts:147](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L147)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type                 | Default value |
| :-------- | :------------------- | :------------ |
| `method`  | `string`             | `undefined`   |
| `params?` | `object`             | `undefined`   |
| `id`      | `string` \| `number` | `0`           |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:151](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L151)

---

### errorHandler

▸ **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

#### Parameters

| Name          | Type                                             |
| :------------ | :----------------------------------------------- |
| `method`      | `string`                                         |
| `params`      | `any`                                            |
| `rpcError?`   | [`Error`](../namespaces/types.RPC.JRPC.md#error) |
| `otherError?` | `any`                                            |

#### Returns

`void`

#### Defined in

[src/channel/rpc_0_8_1.ts:165](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L165)

---

### fetchEndpoint

▸ **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC08.API.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                                        |
| :--- | :-------------------------------------------------------------------------- |
| `T`  | extends keyof `ReadMethods` \| keyof `WriteMethods` \| keyof `TraceMethods` |

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `method`  | `T`                                                                              |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC08.API.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC08.API.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:177](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L177)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:202](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L202)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

fetch rpc node specVersion

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
this.specVersion = '0.7.1';
```

#### Defined in

[src/channel/rpc_0_8_1.ts:211](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L211)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.7.1"` \| `"0.8.1"`\>

fetch if undefined else just return this.specVersion

#### Returns

`Promise`<`"0.7.1"` \| `"0.8.1"`\>

**`Example`**

```ts
this.specVersion = '0.8.1';
```

#### Defined in

[src/channel/rpc_0_8_1.ts:219](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L219)

---

### getMessagesStatus

▸ **getMessagesStatus**(`txHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/types.RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/types.RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:245](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L245)

---

### getStorageProof

▸ **getStorageProof**(`classHashes?`, `contractAddresses?`, `contractsStorageKeys?`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/types.RPC.RPCSPEC08.API.md#storageproof)\>

#### Parameters

| Name                   | Type                                                                                        | Default value |
| :--------------------- | :------------------------------------------------------------------------------------------ | :------------ |
| `classHashes`          | [`BigNumberish`](../namespaces/types.md#bignumberish)[]                                     | `[]`          |
| `contractAddresses`    | [`BigNumberish`](../namespaces/types.md#bignumberish)[]                                     | `[]`          |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_storage_keys)[] | `[]`          |
| `blockIdentifier`      | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                 | `undefined`   |

#### Returns

`Promise`<[`StorageProof`](../namespaces/types.RPC.RPCSPEC08.API.md#storageproof)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:253](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L253)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

#### Parameters

| Name        | Type                                                  |
| :---------- | :---------------------------------------------------- |
| `classHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:272](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L272)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:280](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L280)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC08.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC08.API.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:295](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L295)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_8_1.ts:304](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L304)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:308](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L308)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:313](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L313)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:318](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L318)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update), [`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update)\> \| `OnlyFirst`<[`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update), [`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update), [`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update)\> \| `OnlyFirst`<[`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update), [`STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_state_update)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:323](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L323)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC08.API.md#blocktransactionstraces)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC08.API.md#blocktransactionstraces)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:328](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L328)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:333](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L333)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:338](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L338)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |
| `index`           | `number`                                                    |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:345](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L345)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:350](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L350)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC08.API.md#transaction_trace)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC08.API.md#transaction_trace)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:355](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L355)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TXN_STATUS_RESULT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_status_result)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TXN_STATUS_RESULT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_status_result)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:363](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L363)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC08.API.md#simulatetransactionresponse)\>

#### Parameters

| Name                         | Type                                                                                    | Description                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`                | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations                                                                                                                                              |
| `simulateTransactionOptions` | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default false)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC08.API.md#simulatetransactionresponse)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:375](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L375)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt)\>

#### Parameters

| Name       | Type                                                                            |
| :--------- | :------------------------------------------------------------------------------ |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:396](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L396)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `key`             | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:478](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L478)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:493](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L493)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `classHash`       | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:505](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L505)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:517](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L517)

---

### getEstimateFee

▸ **getEstimateFee**(`invocations`, `«destructured»`): `Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC08.API.md#fee_estimate)[]\>

#### Parameters

| Name             | Type                                                                            |
| :--------------- | :------------------------------------------------------------------------------ |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               |
| `«destructured»` | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC08.API.md#fee_estimate)[]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:529](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L529)

---

### invoke

▸ **invoke**(`functionInvocation`, `details`): `Promise`<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#invokedtransaction)\>

#### Parameters

| Name                 | Type                                                                                |
| :------------------- | :---------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../namespaces/types.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#invokedtransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:547](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L547)

---

### declare

▸ **declare**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#declaredtransaction)\>

#### Parameters

| Name             | Type                                                                                |
| :--------------- | :---------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#declaredtransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:574](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L574)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#deployedaccounttransaction)\>

#### Parameters

| Name             | Type                                                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC08.API.md#deployedaccounttransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:610](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L610)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<`string`[]\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `call`            | [`Call`](../namespaces/types.md#call)                       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:640](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L640)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC08.API.md#fee_estimate)\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name              | Type                                                                  | Description     |
| :---------------- | :-------------------------------------------------------------------- | :-------------- |
| `message`         | [`MSG_FROM_L1`](../namespaces/types.RPC.RPCSPEC08.API.md#msg_from_l1) | Message From L1 |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)           | -               |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC08.API.md#fee_estimate)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:656](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L656)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC08.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC08.API.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_8_1.ts:679](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L679)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC08.API.md#events_chunk)\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/types.RPC.RPCSPEC08.API.md#eventfilter) |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC08.API.md#events_chunk)\>

events and the pagination of the events

#### Defined in

[src/channel/rpc_0_8_1.ts:687](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L687)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): [`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC08.API.md#broadcasted_txn)

#### Parameters

| Name           | Type                                                                    |
| :------------- | :---------------------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../namespaces/types.md#accountinvocationitem) |
| `versionType?` | `"fee"` \| `"transaction"`                                              |

#### Returns

[`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC08.API.md#broadcasted_txn)

#### Defined in

[src/channel/rpc_0_8_1.ts:691](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/channel/rpc_0_8_1.ts#L691)
