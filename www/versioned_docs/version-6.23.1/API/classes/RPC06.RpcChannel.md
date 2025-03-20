---
id: 'RPC06.RpcChannel'
title: 'Class: RpcChannel'
sidebar_label: 'RpcChannel'
custom_edit_url: null
---

[RPC06](../namespaces/RPC06.md).RpcChannel

## Constructors

### constructor

• **new RpcChannel**(`optionsOrProvider?`): [`RpcChannel`](RPC06.RpcChannel.md)

#### Parameters

| Name                 | Type                                                              |
| :------------------- | :---------------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions) |

#### Returns

[`RpcChannel`](RPC06.RpcChannel.md)

#### Defined in

[src/channel/rpc_0_6.ts:64](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L64)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_6.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L42)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_6.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L44)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_6.ts:46](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L46)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_6.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L48)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_6.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L50)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_6.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L52)

---

### chainId

• `Private` `Optional` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/channel/rpc_0_6.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L54)

---

### specVersion

• `Private` `Optional` **specVersion**: `string`

#### Defined in

[src/channel/rpc_0_6.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L56)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_6.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L58)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)

#### Defined in

[src/channel/rpc_0_6.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L60)

---

### baseFetch

• `Private` **baseFetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`\<`Response`\>

#### Type declaration

▸ (`input`, `init?`): `Promise`\<`Response`\>

##### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit`          |

##### Returns

`Promise`\<`Response`\>

#### Defined in

[src/channel/rpc_0_6.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L62)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_6.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L105)

## Methods

### setChainId

▸ **setChainId**(`chainId`): `void`

#### Parameters

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Returns

`void`

#### Defined in

[src/channel/rpc_0_6.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L109)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`\<`Response`\>

#### Parameters

| Name      | Type                 | Default value |
| :-------- | :------------------- | :------------ |
| `method`  | `string`             | `undefined`   |
| `params?` | `object`             | `undefined`   |
| `id`      | `string` \| `number` | `0`           |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/channel/rpc_0_6.ts:113](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L113)

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

[src/channel/rpc_0_6.ts:127](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L127)

---

### fetchEndpoint

▸ **fetchEndpoint**\<`T`\>(`method`, `params?`): `Promise`\<[`Methods`](../namespaces/types.RPC.RPCSPEC06.md#methods)[`T`][``"result"``]\>

#### Type parameters

| Name | Type                                                                        |
| :--- | :-------------------------------------------------------------------------- |
| `T`  | extends keyof `ReadMethods` \| keyof `WriteMethods` \| keyof `TraceMethods` |

#### Parameters

| Name      | Type                                                                         |
| :-------- | :--------------------------------------------------------------------------- |
| `method`  | `T`                                                                          |
| `params?` | [`Methods`](../namespaces/types.RPC.RPCSPEC06.md#methods)[`T`][``"params"``] |

#### Returns

`Promise`\<[`Methods`](../namespaces/types.RPC.RPCSPEC06.md#methods)[`T`][``"result"``]\>

#### Defined in

[src/channel/rpc_0_6.ts:139](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L139)

---

### getChainId

▸ **getChainId**(): `Promise`\<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

#### Returns

`Promise`\<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

#### Defined in

[src/channel/rpc_0_6.ts:164](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L164)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/channel/rpc_0_6.ts:169](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L169)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/channel/rpc_0_6.ts:174](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L174)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`\<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC06.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`\<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC06.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_6.ts:189](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L189)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`\<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`\<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_6.ts:198](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L198)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC06.md#blockwithtxhashes)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC06.md#blockwithtxhashes)\>

#### Defined in

[src/channel/rpc_0_6.ts:202](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L202)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`\<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC06.md#blockwithtxs)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC06.md#blockwithtxs)\>

#### Defined in

[src/channel/rpc_0_6.ts:207](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L207)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`\<[`StateUpdate`](../namespaces/types.RPC.RPCSPEC06.md#stateupdate)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`StateUpdate`](../namespaces/types.RPC.RPCSPEC06.md#stateupdate)\>

#### Defined in

[src/channel/rpc_0_6.ts:212](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L212)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`\<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC06.md#blocktransactionstraces)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC06.md#blocktransactionstraces)\>

#### Defined in

[src/channel/rpc_0_6.ts:217](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L217)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<`number`\>

#### Defined in

[src/channel/rpc_0_6.ts:222](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L222)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`\<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC06.md#transactionwithhash)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`\<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC06.md#transactionwithhash)\>

#### Defined in

[src/channel/rpc_0_6.ts:227](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L227)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`\<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC06.md#transactionwithhash)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |
| `index`           | `number`                                                    |

#### Returns

`Promise`\<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC06.md#transactionwithhash)\>

#### Defined in

[src/channel/rpc_0_6.ts:234](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L234)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`\<[`TransactionReceipt`](../namespaces/types.RPC.RPCSPEC06.md#transactionreceipt)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`\<[`TransactionReceipt`](../namespaces/types.RPC.RPCSPEC06.md#transactionreceipt)\>

#### Defined in

[src/channel/rpc_0_6.ts:239](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L239)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`\<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#transaction_trace)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`\<[`TRANSACTION_TRACE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#transaction_trace)\>

#### Defined in

[src/channel/rpc_0_6.ts:244](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L244)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`\<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC06.md#transactionstatus)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`\<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC06.md#transactionstatus)\>

#### Defined in

[src/channel/rpc_0_6.ts:252](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L252)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`\<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC06.md#simulatetransactionresponse)\>

#### Parameters

| Name                         | Type                                                                                    | Description                                                                                                                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`                | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations                                                                                                                                              |
| `simulateTransactionOptions` | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default false)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`\<[`SimulateTransactionResponse`](../namespaces/types.RPC.RPCSPEC06.md#simulatetransactionresponse)\>

#### Defined in

[src/channel/rpc_0_6.ts:264](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L264)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt)\>

#### Parameters

| Name       | Type                                                                            |
| :--------- | :------------------------------------------------------------------------------ |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) |

#### Returns

`Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt)\>

#### Defined in

[src/channel/rpc_0_6.ts:285](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L285)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`\<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `key`             | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/channel/rpc_0_6.ts:367](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L367)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/channel/rpc_0_6.ts:382](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L382)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<[`ContractClass`](../namespaces/types.RPC.RPCSPEC06.md#contractclass)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `classHash`       | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`ContractClass`](../namespaces/types.RPC.RPCSPEC06.md#contractclass)\>

#### Defined in

[src/channel/rpc_0_6.ts:394](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L394)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<[`ContractClass`](../namespaces/types.RPC.RPCSPEC06.md#contractclass)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<[`ContractClass`](../namespaces/types.RPC.RPCSPEC06.md#contractclass)\>

#### Defined in

[src/channel/rpc_0_6.ts:406](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L406)

---

### getEstimateFee

▸ **getEstimateFee**(`invocations`, `«destructured»`): `Promise`\<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#fee_estimate)[]\>

#### Parameters

| Name             | Type                                                                            |
| :--------------- | :------------------------------------------------------------------------------ |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               |
| `«destructured»` | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) |

#### Returns

`Promise`\<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#fee_estimate)[]\>

#### Defined in

[src/channel/rpc_0_6.ts:418](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L418)

---

### invoke

▸ **invoke**(`functionInvocation`, `details`): `Promise`\<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC06.md#invokedtransaction)\>

#### Parameters

| Name                 | Type                                                                                |
| :------------------- | :---------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../namespaces/types.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`\<[`InvokedTransaction`](../namespaces/types.RPC.RPCSPEC06.md#invokedtransaction)\>

#### Defined in

[src/channel/rpc_0_6.ts:437](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L437)

---

### declare

▸ **declare**(`«destructured»`, `details`): `Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC06.md#declaredtransaction)\>

#### Parameters

| Name             | Type                                                                                |
| :--------------- | :---------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`DeclaredTransaction`](../namespaces/types.RPC.RPCSPEC06.md#declaredtransaction)\>

#### Defined in

[src/channel/rpc_0_6.ts:480](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L480)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `details`): `Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC06.md#deployedaccounttransaction)\>

#### Parameters

| Name             | Type                                                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`\<[`TXN_RECEIPT`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#txn_receipt) \| [`DeployedAccountTransaction`](../namespaces/types.RPC.RPCSPEC06.md#deployedaccounttransaction)\>

#### Defined in

[src/channel/rpc_0_6.ts:562](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L562)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`\<`string`[]\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `call`            | [`Call`](../namespaces/types.md#call)                       |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[src/channel/rpc_0_6.ts:609](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L609)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#fee_estimate)\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name              | Type                                                                   | Description     |
| :---------------- | :--------------------------------------------------------------------- | :-------------- |
| `message`         | [`MSG_FROM_L1`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#msg_from_l1) | Message From L1 |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)            | -               |

#### Returns

`Promise`\<[`FEE_ESTIMATE`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#fee_estimate)\>

#### Defined in

[src/channel/rpc_0_6.ts:625](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L625)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`\<[`Syncing`](../namespaces/types.RPC.RPCSPEC06.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`\<[`Syncing`](../namespaces/types.RPC.RPCSPEC06.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_6.ts:648](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L648)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`\<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#events_chunk)\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                              |
| :------------ | :---------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/types.RPC.RPCSPEC06.md#eventfilter) |

#### Returns

`Promise`\<[`EVENTS_CHUNK`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#events_chunk)\>

events and the pagination of the events

#### Defined in

[src/channel/rpc_0_6.ts:656](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L656)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): [`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#broadcasted_txn)

#### Parameters

| Name           | Type                                                                    |
| :------------- | :---------------------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../namespaces/types.md#accountinvocationitem) |
| `versionType?` | `"fee"` \| `"transaction"`                                              |

#### Returns

[`BROADCASTED_TXN`](../namespaces/types.RPC.RPCSPEC06.SPEC.md#broadcasted_txn)

#### Defined in

[src/channel/rpc_0_6.ts:660](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_6.ts#L660)
