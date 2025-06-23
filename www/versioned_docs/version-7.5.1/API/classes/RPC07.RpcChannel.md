---
id: 'RPC07.RpcChannel'
title: 'Class: RpcChannel'
sidebar_label: 'RpcChannel'
custom_edit_url: null
---

[RPC07](../namespaces/RPC07.md).RpcChannel

## Constructors

### constructor

• **new RpcChannel**(`optionsOrProvider?`): [`RpcChannel`](RPC07.RpcChannel.md)

#### Parameters

| Name                 | Type                                                              |
| :------------------- | :---------------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions) |

#### Returns

[`RpcChannel`](RPC07.RpcChannel.md)

#### Defined in

[src/channel/rpc_0_7_1.ts:82](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L82)

## Properties

### id

• `Readonly` **id**: `"RPC071"`

#### Defined in

[src/channel/rpc_0_7_1.ts:50](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L50)

---

### channelSpecVersion

• `Readonly` **channelSpecVersion**: `"0.7.1"` \| `"0.8.1"` = `SupportedRpcVersion.v0_7_1`

RPC specification version this Channel class implements

#### Defined in

[src/channel/rpc_0_7_1.ts:55](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L55)

---

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_7_1.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L57)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_7_1.ts:59](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L59)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_7_1.ts:61](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L61)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_7_1.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L63)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_7_1.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L65)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_7_1.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L67)

---

### chainId

• `Private` `Optional` **chainId**: `"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Defined in

[src/channel/rpc_0_7_1.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L69)

---

### specVersion

• `Private` `Optional` **specVersion**: `"0.7.1"` \| `"0.8.1"`

RPC specification version of the connected node

#### Defined in

[src/channel/rpc_0_7_1.ts:74](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L74)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_7_1.ts:76](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L76)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)

#### Defined in

[src/channel/rpc_0_7_1.ts:78](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L78)

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

[src/channel/rpc_0_7_1.ts:80](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L80)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_7_1.ts:136](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L136)

## Methods

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.7.1"` \| `"0.8.1"`

#### Returns

`undefined` \| `"0.7.1"` \| `"0.8.1"`

#### Defined in

[src/channel/rpc_0_7_1.ts:132](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L132)

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

[src/channel/rpc_0_7_1.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L140)

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

[src/channel/rpc_0_7_1.ts:144](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L144)

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

[src/channel/rpc_0_7_1.ts:158](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L158)

---

### fetchEndpoint

▸ **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC07.API.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                                        |
| :--- | :-------------------------------------------------------------------------- |
| `T`  | extends keyof `ReadMethods` \| keyof `WriteMethods` \| keyof `TraceMethods` |

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `method`  | `T`                                                                              |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC07.API.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`<[`Methods`](../namespaces/types.RPC.RPCSPEC07.API.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/channel/rpc_0_7_1.ts:170](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L170)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Defined in

[src/channel/rpc_0_7_1.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L195)

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

[src/channel/rpc_0_7_1.ts:204](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L204)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.7.1"` \| `"0.8.1"`\>

fetch if undefined test and set specVersion, else just return this.specVersion

#### Returns

`Promise`<`"0.7.1"` \| `"0.8.1"`\>

**`Example`**

```ts
this.specVersion = '0.7.1';
```

#### Defined in

[src/channel/rpc_0_7_1.ts:212](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L212)

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

[src/channel/rpc_0_7_1.ts:234](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L234)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:249](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L249)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_7_1.ts:258](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L258)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:262](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L262)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxs)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxs)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:267](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L267)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<[`BlockWithTxReceipts`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxreceipts)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockWithTxReceipts`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxreceipts)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:272](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L272)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdate`](../namespaces/types.RPC.RPCSPEC07.API.md#stateupdate)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`StateUpdate`](../namespaces/types.RPC.RPCSPEC07.API.md#stateupdate)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:277](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L277)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC07.API.md#blocktransactionstraces)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC07.API.md#blocktransactionstraces)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:282](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L282)

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

[src/channel/rpc_0_7_1.ts:287](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L287)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:292](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L292)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |
| `index`           | `number`                                                    |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:299](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L299)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt_with_block_info)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt_with_block_info)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:304](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L304)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:309](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L309)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionstatus)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionstatus)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:317](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L317)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC07.API.md#simulatetransactionresponse)\>

#### Parameters

| Name                         | Type                                                                                    | Description                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`                | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations                                                                                                                                              |
| `simulateTransactionOptions` | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default false)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC07.API.md#simulatetransactionresponse)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:329](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L329)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt)\>

#### Parameters

| Name       | Type                                                                            |
| :--------- | :------------------------------------------------------------------------------ |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:350](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L350)

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

[src/channel/rpc_0_7_1.ts:432](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L432)

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

[src/channel/rpc_0_7_1.ts:447](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L447)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`ContractClass`](../namespaces/types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `classHash`       | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`ContractClass`](../namespaces/types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:459](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L459)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClass`](../namespaces/types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`ContractClass`](../namespaces/types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:471](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L471)

---

### getEstimateFee

▸ **getEstimateFee**(`invocations`, `«destructured»`): `Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)[]\>

#### Parameters

| Name             | Type                                                                            |
| :--------------- | :------------------------------------------------------------------------------ |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               |
| `«destructured»` | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)[]\>

#### Defined in

[src/channel/rpc_0_7_1.ts:483](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L483)

---

### invoke

▸ **invoke**(`functionInvocation`, `details`): `Promise`<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#invokedtransaction)\>

#### Parameters

| Name                 | Type                                                                                |
| :------------------- | :---------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../namespaces/types.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#invokedtransaction)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:501](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L501)

---

### declare

▸ **declare**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#declaredtransaction)\>

#### Parameters

| Name             | Type                                                                                |
| :--------------- | :---------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#declaredtransaction)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:550](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L550)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `details`): `Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#deployedaccounttransaction)\>

#### Parameters

| Name             | Type                                                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC07.API.md#deployedaccounttransaction)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:638](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L638)

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

[src/channel/rpc_0_7_1.ts:691](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L691)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name              | Type                                                                       | Description     |
| :---------------- | :------------------------------------------------------------------------- | :-------------- |
| `message`         | [`MSG_FROM_L1`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#msg_from_l1) | Message From L1 |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                | -               |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)\>

#### Defined in

[src/channel/rpc_0_7_1.ts:707](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L707)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_7_1.ts:730](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L730)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#events_chunk)\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/types.RPC.RPCSPEC07.API.md#eventfilter) |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#events_chunk)\>

events and the pagination of the events

#### Defined in

[src/channel/rpc_0_7_1.ts:738](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L738)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): [`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_txn)

#### Parameters

| Name           | Type                                                                    |
| :------------- | :---------------------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../namespaces/types.md#accountinvocationitem) |
| `versionType?` | `"fee"` \| `"transaction"`                                              |

#### Returns

[`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC07.API.SPEC.md#broadcasted_txn)

#### Defined in

[src/channel/rpc_0_7_1.ts:742](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/channel/rpc_0_7_1.ts#L742)
