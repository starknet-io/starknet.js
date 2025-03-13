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

[src/channel/rpc_0_7.ts:64](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L64)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/channel/rpc_0_7.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L42)

---

### headers

• **headers**: `object`

#### Defined in

[src/channel/rpc_0_7.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L44)

---

### requestId

• **requestId**: `number`

#### Defined in

[src/channel/rpc_0_7.ts:46](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L46)

---

### blockIdentifier

• `Readonly` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/channel/rpc_0_7.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L48)

---

### retries

• `Readonly` **retries**: `number`

#### Defined in

[src/channel/rpc_0_7.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L50)

---

### waitMode

• `Readonly` **waitMode**: `boolean`

#### Defined in

[src/channel/rpc_0_7.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L52)

---

### chainId

• `Private` `Optional` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/channel/rpc_0_7.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L54)

---

### specVersion

• `Private` `Optional` **specVersion**: `string`

#### Defined in

[src/channel/rpc_0_7.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L56)

---

### transactionRetryIntervalFallback

• `Private` `Optional` **transactionRetryIntervalFallback**: `number`

#### Defined in

[src/channel/rpc_0_7.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L58)

---

### batchClient

• `Private` `Optional` **batchClient**: [`BatchClient`](BatchClient.md)

#### Defined in

[src/channel/rpc_0_7.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L60)

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

[src/channel/rpc_0_7.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L62)

## Accessors

### transactionRetryIntervalDefault

• `get` **transactionRetryIntervalDefault**(): `number`

#### Returns

`number`

#### Defined in

[src/channel/rpc_0_7.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L105)

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

[src/channel/rpc_0_7.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L109)

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

[src/channel/rpc_0_7.ts:113](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L113)

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

[src/channel/rpc_0_7.ts:127](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L127)

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

[src/channel/rpc_0_7.ts:139](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L139)

---

### getChainId

▸ **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

#### Defined in

[src/channel/rpc_0_7.ts:164](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L164)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/rpc_0_7.ts:169](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L169)

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

[src/channel/rpc_0_7.ts:174](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L174)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

#### Defined in

[src/channel/rpc_0_7.ts:189](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L189)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/channel/rpc_0_7.ts:198](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L198)

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

[src/channel/rpc_0_7.ts:202](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L202)

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

[src/channel/rpc_0_7.ts:207](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L207)

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

[src/channel/rpc_0_7.ts:212](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L212)

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

[src/channel/rpc_0_7.ts:217](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L217)

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

[src/channel/rpc_0_7.ts:222](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L222)

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

[src/channel/rpc_0_7.ts:227](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L227)

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

[src/channel/rpc_0_7.ts:232](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L232)

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

[src/channel/rpc_0_7.ts:239](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L239)

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

[src/channel/rpc_0_7.ts:244](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L244)

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

[src/channel/rpc_0_7.ts:249](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L249)

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

[src/channel/rpc_0_7.ts:257](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L257)

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

[src/channel/rpc_0_7.ts:269](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L269)

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

[src/channel/rpc_0_7.ts:290](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L290)

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

[src/channel/rpc_0_7.ts:372](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L372)

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

[src/channel/rpc_0_7.ts:387](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L387)

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

[src/channel/rpc_0_7.ts:399](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L399)

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

[src/channel/rpc_0_7.ts:411](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L411)

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

[src/channel/rpc_0_7.ts:423](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L423)

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

[src/channel/rpc_0_7.ts:442](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L442)

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

[src/channel/rpc_0_7.ts:485](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L485)

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

[src/channel/rpc_0_7.ts:567](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L567)

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

[src/channel/rpc_0_7.ts:614](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L614)

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

[src/channel/rpc_0_7.ts:630](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L630)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Object with the stats data

#### Defined in

[src/channel/rpc_0_7.ts:653](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L653)

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

[src/channel/rpc_0_7.ts:661](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L661)

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

[src/channel/rpc_0_7.ts:665](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/channel/rpc_0_7.ts#L665)
