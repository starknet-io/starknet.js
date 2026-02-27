---
id: 'RPC09.RpcChannel'
title: 'Class: RpcChannel'
sidebar_label: 'RpcChannel'
custom_edit_url: null
---

[RPC09](../namespaces/RPC09.md).RpcChannel

## Constructors

### constructor

• **new RpcChannel**(`optionsOrProvider?`): [`RpcChannel`](RPC09.RpcChannel.md)

#### Parameters

| Name                 | Type                                                     |
| :------------------- | :------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../modules.md#rpcprovideroptions) |

#### Returns

[`RpcChannel`](RPC09.RpcChannel.md)

#### Defined in

[src/channel/rpc_0_9_0.ts:89](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L89)

## Properties

### id

• `Readonly` **id**: `"RPC090"`

#### Defined in

[src/channel/rpc_0_9_0.ts:57](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L57)

---

### channelSpecVersion

• `Readonly` **channelSpecVersion**: `"0.9.0"` \| `"0.10.0"` = `SupportedRpcVersion.v0_9_0`

RPC specification version this Channel class implements

#### Defined in

[src/channel/rpc_0_9_0.ts:62](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L62)

---

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_9_0.ts:64](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L64)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_9_0.ts:66](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L66)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_9_0.ts:68](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L68)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../modules.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_9_0.ts:70](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L70)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_9_0.ts:72](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L72)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_9_0.ts:74](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L74)

---

### chainId

• `Private` `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Defined in

[src/channel/rpc_0_9_0.ts:76](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L76)

---

### specVersion

• `Private` `Optional` **specVersion**: `"0.9.0"` \| `"0.10.0"`

RPC specification version of the connected node

#### Defined in

[src/channel/rpc_0_9_0.ts:81](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L81)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_9_0.ts:83](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L83)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)<[`Methods`](../namespaces/RPC.RPCSPEC09.API.md#methods)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:85](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L85)

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

[src/channel/rpc_0_9_0.ts:87](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L87)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_9_0.ts:146](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L146)

## Methods

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.9.0"` \| `"0.10.0"`

#### Returns

`undefined` \| `"0.9.0"` \| `"0.10.0"`

#### Defined in

[src/channel/rpc_0_9_0.ts:142](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L142)

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

[src/channel/rpc_0_9_0.ts:150](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L150)

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

[src/channel/rpc_0_9_0.ts:154](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L154)

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

[src/channel/rpc_0_9_0.ts:168](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L168)

---

### fetchEndpoint

▸ **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<[`Methods`](../namespaces/RPC.RPCSPEC09.API.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends keyof ReadMethods \| keyof WriteMethods \| keyof TraceMethods |

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `method`  | `T`                                                                        |
| `params?` | [`Methods`](../namespaces/RPC.RPCSPEC09.API.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`<[`Methods`](../namespaces/RPC.RPCSPEC09.API.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/channel/rpc_0_9_0.ts:180](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L180)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Defined in

[src/channel/rpc_0_9_0.ts:205](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L205)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

fetch rpc node specVersion

#### Returns

`Promise`<`string`\>

**`Example`**

```ts
this.specVersion = '0.9.0';
```

#### Defined in

[src/channel/rpc_0_9_0.ts:214](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L214)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.9.0"` \| `"0.10.0"`\>

fetch if undefined else just return this.specVersion

#### Returns

`Promise`<`"0.9.0"` \| `"0.10.0"`\>

**`Example`**

```ts
this.specVersion = '0.9.0';
```

#### Defined in

[src/channel/rpc_0_9_0.ts:222](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L222)

---

### getMessagesStatus

▸ **getMessagesStatus**(`txHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:248](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L248)

---

### getStorageProof

▸ **getStorageProof**(`classHashes?`, `contractAddresses?`, `contractsStorageKeys?`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

#### Parameters

| Name                   | Type                                                                                  | Default value |
| :--------------------- | :------------------------------------------------------------------------------------ | :------------ |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                        | `[]`          |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                        | `[]`          |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC09.API.md#contract_storage_keys)[] | `[]`          |
| `blockIdentifier`      | [`BlockIdentifier`](../modules.md#blockidentifier)                                    | `undefined`   |

#### Returns

`Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:256](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L256)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

#### Parameters

| Name        | Type                                         |
| :---------- | :------------------------------------------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:275](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L275)

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

[src/channel/rpc_0_9_0.ts:283](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L283)

---

### getStarknetVersion

▸ **getStarknetVersion**(`blockIdentifier?`): `Promise`<`string`\>

Helper method to get the starknet version from the block, default latest block

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

Starknet version

#### Defined in

[src/channel/rpc_0_9_0.ts:299](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L299)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC09.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC09.API.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:307](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L307)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_9_0.ts:316](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L316)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:320](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L320)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:325](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L325)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:330](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L330)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update) & [`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\> \| `OnlyFirst`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update) & [`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update) & [`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\> \| `OnlyFirst`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update), [`STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#state_update) & [`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:335](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L335)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:340](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L340)

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

[src/channel/rpc_0_9_0.ts:345](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L345)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC09.API.md#txn_with_hash)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC09.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:350](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L350)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC09.API.md#txn_with_hash)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |
| `index`           | `number`                                           |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC09.API.md#txn_with_hash)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:357](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L357)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt_with_block_info)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:362](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L362)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:367](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L367)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:375](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L375)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/RPC.RPCSPEC09.API.md#simulatetransactionresponse)\>

#### Parameters

| Name                         | Type                                                                           | Description                                                                                                                                                    |
| :--------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`                | [`AccountInvocations`](../modules.md#accountinvocations)                       | AccountInvocations                                                                                                                                             |
| `simulateTransactionOptions` | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default true)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/RPC.RPCSPEC09.API.md#simulatetransactionresponse)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:387](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L387)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt)\>

#### Parameters

| Name       | Type                                                                   |
| :--------- | :--------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:410](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L410)

---

### fastWaitForTransaction

▸ **fastWaitForTransaction**(`txHash`, `address`, `initNonceBN`, `options?`): `Promise`<`boolean`\>

#### Parameters

| Name          | Type                                                                           |
| :------------ | :----------------------------------------------------------------------------- |
| `txHash`      | [`BigNumberish`](../modules.md#bignumberish)                                   |
| `address`     | `string`                                                                       |
| `initNonceBN` | [`BigNumberish`](../modules.md#bignumberish)                                   |
| `options?`    | [`fastWaitForTransactionOptions`](../modules.md#fastwaitfortransactionoptions) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/channel/rpc_0_9_0.ts:504](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L504)

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

[src/channel/rpc_0_9_0.ts:558](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L558)

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

[src/channel/rpc_0_9_0.ts:573](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L573)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:585](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L585)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\>\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\> \| `OnlyFirst`<[`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class), [`CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#contract_class) & [`DEPRECATED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#deprecated_contract_class)\>\>

#### Defined in

[src/channel/rpc_0_9_0.ts:597](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L597)

---

### getEstimateFee

▸ **getEstimateFee**(`invocations`, `options?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#fee_estimate)[]\>

#### Parameters

| Name          | Type                                                                   |
| :------------ | :--------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)               |
| `options`     | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#fee_estimate)[]\>

#### Defined in

[src/channel/rpc_0_9_0.ts:609](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L609)

---

### invoke

▸ **invoke**(`functionInvocation`, `details`): `Promise`<[`InvokedTransaction`](../namespaces/RPC.RPCSPEC09.API.md#invokedtransaction)\>

#### Parameters

| Name                 | Type                                                                       |
| :------------------- | :------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../modules.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`InvokedTransaction`](../namespaces/RPC.RPCSPEC09.API.md#invokedtransaction)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:631](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L631)

---

### declare

▸ **declare**(`declareTransaction`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/RPC.RPCSPEC09.API.md#declaredtransaction)\>

#### Parameters

| Name                 | Type                                                                       |
| :------------------- | :------------------------------------------------------------------------- |
| `declareTransaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/RPC.RPCSPEC09.API.md#declaredtransaction)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:648](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L648)

---

### deployAccount

▸ **deployAccount**(`deployAccountTransaction`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/RPC.RPCSPEC09.API.md#deployedaccounttransaction)\>

#### Parameters

| Name                       | Type                                                                                 |
| :------------------------- | :----------------------------------------------------------------------------------- |
| `deployAccountTransaction` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) |
| `details`                  | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/RPC.RPCSPEC09.API.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/RPC.RPCSPEC09.API.md#deployedaccounttransaction)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:668](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L668)

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

[src/channel/rpc_0_9_0.ts:688](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L688)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name              | Type                                                            | Description     |
| :---------------- | :-------------------------------------------------------------- | :-------------- |
| `message`         | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC09.API.md#msg_from_l1) | Message From L1 |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier)              | -               |

#### Returns

`Promise`<[`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

#### Defined in

[src/channel/rpc_0_9_0.ts:704](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L704)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC09.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC09.API.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_9_0.ts:727](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L727)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                            |
| :------------ | :-------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC09.API.md#eventfilter) |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

events and the pagination of the events

#### Defined in

[src/channel/rpc_0_9_0.ts:735](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L735)

---

### buildTransaction

▸ **buildTransaction**<`T`\>(`invocation`, `versionType?`): `T` extends \{ `type`: `"INVOKE"` } ? [`INVOKE_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#invoke_txn_v3) : `T` extends \{ `type`: `"DECLARE"` } ? [`BROADCASTED_DECLARE_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#broadcasted_declare_txn_v3) : `T` extends \{ `type`: `"DEPLOY_ACCOUNT"` } ? [`DEPLOY_ACCOUNT_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#deploy_account_txn_v3) : `never`

#### Type parameters

| Name | Type                                                                   |
| :--- | :--------------------------------------------------------------------- |
| `T`  | extends [`AccountInvocationItem`](../modules.md#accountinvocationitem) |

#### Parameters

| Name           | Type                       |
| :------------- | :------------------------- |
| `invocation`   | `T`                        |
| `versionType?` | `"fee"` \| `"transaction"` |

#### Returns

`T` extends \{ `type`: `"INVOKE"` } ? [`INVOKE_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#invoke_txn_v3) : `T` extends \{ `type`: `"DECLARE"` } ? [`BROADCASTED_DECLARE_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#broadcasted_declare_txn_v3) : `T` extends \{ `type`: `"DEPLOY_ACCOUNT"` } ? [`DEPLOY_ACCOUNT_TXN_V3`](../namespaces/RPC.RPCSPEC09.API.md#deploy_account_txn_v3) : `never`

#### Defined in

[src/channel/rpc_0_9_0.ts:740](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/channel/rpc_0_9_0.ts#L740)
