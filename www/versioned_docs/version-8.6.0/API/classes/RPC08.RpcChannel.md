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

| Name                 | Type                                                     |
| :------------------- | :------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../modules.md#rpcprovideroptions) |

#### Returns

[`RpcChannel`](RPC08.RpcChannel.md)

#### Defined in

[src/channel/rpc_0_8_1.ts:88](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L88)

## Properties

### id

• `Readonly` **id**: `"RPC081"`

#### Defined in

[src/channel/rpc_0_8_1.ts:56](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L56)

---

### channelSpecVersion

• `Readonly` **channelSpecVersion**: `"0.8.1"` \| `"0.9.0"` = `SupportedRpcVersion.v0_8_1`

RPC specification version this Channel class implements

#### Defined in

[src/channel/rpc_0_8_1.ts:61](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L61)

---

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_8_1.ts:63](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L63)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_8_1.ts:65](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L65)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:67](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L67)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_8_1.ts:69](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L69)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:71](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L71)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_8_1.ts:73](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L73)

---

### chainId

• `Private` `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Defined in

[src/channel/rpc_0_8_1.ts:75](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L75)

---

### specVersion

• `Private` `Optional` **specVersion**: `"0.8.1"` \| `"0.9.0"`

RPC specification version of the connected node

#### Defined in

[src/channel/rpc_0_8_1.ts:80](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L80)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_8_1.ts:82](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L82)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)<[`Methods`](../namespaces/RPC.RPCSPEC08.API.md#methods)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:84](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L84)

---

### baseFetch

• `Private` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`<`Response`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:86](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L86)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_8_1.ts:144](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L144)

## Methods

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.8.1"` \| `"0.9.0"`

#### Returns

`undefined` \| `"0.8.1"` \| `"0.9.0"`

#### Defined in

[src/channel/rpc_0_8_1.ts:140](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L140)

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

[src/channel/rpc_0_8_1.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L148)

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

[src/channel/rpc_0_8_1.ts:152](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L152)

---

### errorHandler

▸ **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

#### Parameters

| Name          | Type                                       |
| :------------ | :----------------------------------------- |
| `method`      | `string`                                   |
| `params`      | `any`                                      |
| `rpcError?`   | [`Error`](../namespaces/RPC.JRPC.md#error) |
| `otherError?` | `any`                                      |

#### Returns

`void`

#### Defined in

[src/channel/rpc_0_8_1.ts:166](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L166)

---

### fetchEndpoint

▸ **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<[`Methods`](../namespaces/RPC.RPCSPEC08.API.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends keyof ReadMethods \| keyof WriteMethods \| keyof TraceMethods |

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `method`  | `T`                                                                        |
| `params?` | [`Methods`](../namespaces/RPC.RPCSPEC08.API.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`<[`Methods`](../namespaces/RPC.RPCSPEC08.API.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:178](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L178)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:203](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L203)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

fetch rpc node specVersion

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
this.specVersion = '0.8.1';
```

#### Defined in

[src/channel/rpc_0_8_1.ts:212](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L212)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.8.1"` \| `"0.9.0"`\>

fetch if undefined else just return this.specVersion

#### Returns

`Promise`<`"0.8.1"` \| `"0.9.0"`\>

**`Example`**

```ts
this.specVersion = '0.8.1';
```

#### Defined in

[src/channel/rpc_0_8_1.ts:220](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L220)

---

### getMessagesStatus

▸ **getMessagesStatus**(`txHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:246](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L246)

---

### getStorageProof

▸ **getStorageProof**(`classHashes?`, `contractAddresses?`, `contractsStorageKeys?`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC08.API.md#storageproof)\>

#### Parameters

| Name                   | Type                                                                                  | Default value |
| :--------------------- | :------------------------------------------------------------------------------------ | :------------ |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                        | `[]`          |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                        | `[]`          |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC08.API.md#contract_storage_keys)[] | `[]`          |
| `blockIdentifier`      | [`BlockIdentifier`](../modules.md#blockidentifier)                                    | `undefined`   |

#### Returns

`Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC08.API.md#storageproof)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:254](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L254)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

#### Parameters

| Name        | Type                                         |
| :---------- | :------------------------------------------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:273](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L273)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:281](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L281)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:296](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L296)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_8_1.ts:305](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L305)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:309](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L309)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:314](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L314)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:319](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L319)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update)\> \| `OnlyFirst`<[`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update)\> \| `OnlyFirst`<[`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#state_update) & [`PENDING_STATE_UPDATE`](../namespaces/RPC.RPCSPEC08.API.md#pending_state_update)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:324](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L324)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:329](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L329)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:334](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L334)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:339](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L339)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |
| `index`           | `number`                                           |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:346](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L346)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt_with_block_info)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:351](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L351)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:356](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L356)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:364](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L364)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/RPC.RPCSPEC08.API.md#simulatetransactionresponse)\>

#### Parameters

| Name                         | Type                                                                           | Description                                                                                                                                                     |
| :--------------------------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`                | [`AccountInvocations`](../modules.md#accountinvocations)                       | AccountInvocations                                                                                                                                              |
| `simulateTransactionOptions` | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default false)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/RPC.RPCSPEC08.API.md#simulatetransactionresponse)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:376](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L376)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt)\>

#### Parameters

| Name       | Type                                                                   |
| :--------- | :--------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:397](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L397)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `key`             | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:491](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L491)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_8_1.ts:506](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L506)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:518](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L518)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC08.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_8_1.ts:530](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L530)

---

### getEstimateFee

▸ **getEstimateFee**(`invocations`, `«destructured»?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate)[]\>

#### Parameters

| Name             | Type                                                                   |
| :--------------- | :--------------------------------------------------------------------- |
| `invocations`    | [`AccountInvocations`](../modules.md#accountinvocations)               |
| `«destructured»` | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate)[]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:542](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L542)

---

### invoke

▸ **invoke**(`functionInvocation`, `details`): `Promise`<[`InvokedTransaction`](../namespaces/RPC.RPCSPEC08.API.md#invokedtransaction)\>

#### Parameters

| Name                 | Type                                                                       |
| :------------------- | :------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../modules.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`InvokedTransaction`](../namespaces/RPC.RPCSPEC08.API.md#invokedtransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:560](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L560)

---

### declare

▸ **declare**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/RPC.RPCSPEC08.API.md#declaredtransaction)\>

#### Parameters

| Name             | Type                                                                       |
| :--------------- | :------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   |
| `details`        | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/RPC.RPCSPEC08.API.md#declaredtransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:587](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L587)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/RPC.RPCSPEC08.API.md#deployedaccounttransaction)\>

#### Parameters

| Name             | Type                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) |
| `details`        | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC08.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/RPC.RPCSPEC08.API.md#deployedaccounttransaction)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:623](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L623)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<`string`[]\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `call`            | [`Call`](../modules.md#call)                       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[src/channel/rpc_0_8_1.ts:653](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L653)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate)\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name              | Type                                                            | Description     |
| :---------------- | :-------------------------------------------------------------- | :-------------- |
| `message`         | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC08.API.md#msg_from_l1) | Message From L1 |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier)              | -               |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate)\>

#### Defined in

[src/channel/rpc_0_8_1.ts:669](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L669)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_8_1.ts:692](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L692)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk)\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                            |
| :------------ | :-------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC08.API.md#eventfilter) |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk)\>

events and the pagination of the events

#### Defined in

[src/channel/rpc_0_8_1.ts:700](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L700)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): [`BROADCASTED_TXN`](../namespaces/RPC.RPCSPEC08.API.md#broadcasted_txn)

#### Parameters

| Name           | Type                                                           |
| :------------- | :------------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../modules.md#accountinvocationitem) |
| `versionType?` | `"fee"` \| `"transaction"`                                     |

#### Returns

[`BROADCASTED_TXN`](../namespaces/RPC.RPCSPEC08.API.md#broadcasted_txn)

#### Defined in

[src/channel/rpc_0_8_1.ts:704](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/channel/rpc_0_8_1.ts#L704)
