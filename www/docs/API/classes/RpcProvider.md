---
id: 'RpcProvider'
title: 'Class: RpcProvider'
sidebar_label: 'RpcProvider'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`ProviderInterface`](ProviderInterface.md)

## Constructors

### constructor

• **new RpcProvider**(`optionsOrProvider`)

#### Parameters

| Name                | Type                                                     |
| :------------------ | :------------------------------------------------------- |
| `optionsOrProvider` | [`RpcProviderOptions`](../modules.md#rpcprovideroptions) |

#### Defined in

[src/provider/rpc.ts:65](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L65)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/provider/rpc.ts:53](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L53)

---

### headers

• **headers**: `object`

#### Defined in

[src/provider/rpc.ts:55](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L55)

---

### responseParser

• `Private` **responseParser**: `RPCResponseParser`

#### Defined in

[src/provider/rpc.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L57)

---

### retries

• `Private` **retries**: `number`

#### Defined in

[src/provider/rpc.ts:59](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L59)

---

### blockIdentifier

• `Private` **blockIdentifier**: `BlockIdentifier`

#### Defined in

[src/provider/rpc.ts:61](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L61)

---

### chainId

• `Private` `Optional` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/rpc.ts:63](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L63)

## Methods

### fetch

▸ **fetch**(`method`, `params`): `Promise`<`any`\>

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `method` | `any` |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/provider/rpc.ts:75](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L75)

---

### errorHandler

▸ `Protected` **errorHandler**(`error`): `void`

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `error` | `any` |

#### Returns

`void`

#### Defined in

[src/provider/rpc.ts:83](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L83)

---

### fetchEndpoint

▸ `Protected` **fetchEndpoint**<`T`\>(`method`, `params?`): `Promise`<`Methods`[`T`][``"result"``]\>

#### Type parameters

| Name | Type                    |
| :--- | :---------------------- |
| `T`  | extends keyof `Methods` |

#### Parameters

| Name      | Type                         |
| :-------- | :--------------------------- |
| `method`  | `T`                          |
| `params?` | `Methods`[`T`][``"params"``] |

#### Returns

`Promise`<`Methods`[`T`][``"result"``]\>

#### Defined in

[src/provider/rpc.ts:90](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L90)

---

### getChainId

▸ **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

Gets the Starknet chain Id

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

the chain Id

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getChainId](ProviderInterface.md#getchainid)

#### Defined in

[src/provider/rpc.ts:106](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L106)

---

### getBlock

▸ **getBlock**(`blockIdentifier?`): `Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

Gets the block information

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

the block object

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/rpc.ts:111](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L111)

---

### getBlockHashAndNumber

▸ **getBlockHashAndNumber**(): `Promise`<`BlockHashAndNumber`\>

#### Returns

`Promise`<`BlockHashAndNumber`\>

#### Defined in

[src/provider/rpc.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L119)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`BlockWithTxHashes`\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<`BlockWithTxHashes`\>

#### Defined in

[src/provider/rpc.ts:123](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L123)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`BlockWithTxs`\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<`BlockWithTxs`\>

#### Defined in

[src/provider/rpc.ts:130](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L130)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `contractAddress` | `string`          | contract address |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

#### Defined in

[src/provider/rpc.ts:137](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L137)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `contractAddress` | `string`          | contract address |
| `blockIdentifier` | `BlockIdentifier` | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/rpc.ts:148](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L148)

---

### getPendingTransactions

▸ **getPendingTransactions**(): `Promise`<`PendingTransactions`\>

#### Returns

`Promise`<`PendingTransactions`\>

#### Defined in

[src/provider/rpc.ts:159](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L159)

---

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`<`Error`\>

#### Returns

`Promise`<`Error`\>

#### Defined in

[src/provider/rpc.ts:163](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L163)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<`STATE_UPDATE`\>

Gets the state changes in a specific block

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<`STATE_UPDATE`\>

StateUpdateResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/rpc.ts:167](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L167)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name              | Type                                                | Description                                                |
| :---------------- | :-------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress` | `string`                                            |                                                            |
| `key`             | [`BigNumberish`](../namespaces/num.md#bignumberish) | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier` | `BlockIdentifier`                                   | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/rpc.ts:174](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L174)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/rpc.ts:189](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L189)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<`TXN`\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<`TXN`\>

#### Defined in

[src/provider/rpc.ts:193](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L193)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<`TXN`\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `BlockIdentifier` |
| `index`           | `number`          |

#### Returns

`Promise`<`TXN`\>

#### Defined in

[src/provider/rpc.ts:197](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L197)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<`TXN_RECEIPT`\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<`TXN_RECEIPT`\>

the transaction receipt object

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

#### Defined in

[src/provider/rpc.ts:205](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L205)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<`CONTRACT_CLASS`\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<`CONTRACT_CLASS`\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/rpc.ts:209](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L209)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<`CONTRACT_CLASS`\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `classHash`       | `string`          |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<`CONTRACT_CLASS`\>

#### Defined in

[src/provider/rpc.ts:213](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L213)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`CONTRACT_CLASS`\>

Gets the contract class of the deployed contract.

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `contractAddress` | `string`          | contract address |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<`CONTRACT_CLASS`\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/rpc.ts:221](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L221)

---

### getCode

▸ **getCode**(`_contractAddress`, `_blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name                | Type              |
| :------------------ | :---------------- |
| `_contractAddress`  | `string`          |
| `_blockIdentifier?` | `BlockIdentifier` |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/rpc.ts:232](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L232)

---

### getEstimateFee

▸ **getEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/rpc.ts:239](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L239)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/rpc.ts:247](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L247)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name              | Type                                                                       | Description                                                                                                                           |
| :---------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier` | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                           |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/rpc.ts:267](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L267)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name              | Type                                                                                 | Description                                                                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier` | `BlockIdentifier`                                                                    | (optional) block identifier                                                                                                                 |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/rpc.ts:295](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L295)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`_invocations`, `_blockIdentifier?`): `Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name               | Type                                             | Description                                                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_invocations`     | [`InvocationBulk`](../modules.md#invocationbulk) | the array of invocation and invocation details object containing: - contractAddress - the address of the account - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature - nonce - optional nonce - version - optional version |
| `_blockIdentifier` | `BlockIdentifier`                                | block identifier                                                                                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/rpc.ts:316](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L316)

---

### declareContract

▸ **declareContract**(`«destructured»`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name             | Type                                                                       | Description                                                                                          |
| :--------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`        | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

#### Defined in

[src/provider/rpc.ts:324](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L324)

---

### deployAccountContract

▸ **deployAccountContract**(`«destructured»`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name             | Type                                                                                 | Description                                                                                       |
| :--------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `«destructured»` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details`        | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

#### Defined in

[src/provider/rpc.ts:349](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L349)

---

### invokeFunction

▸ **invokeFunction**(`functionInvocation`, `details`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a function on starknet

**`Deprecated`**

This method wont be supported as soon as fees are mandatory. Should not be used outside of Account class

#### Parameters

| Name                 | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                           |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

response from addTransaction

#### Implementation of

[ProviderInterface](ProviderInterface.md).[invokeFunction](ProviderInterface.md#invokefunction)

#### Defined in

[src/provider/rpc.ts:367](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L367)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name              | Type                         | Description              |
| :---------------- | :--------------------------- | :----------------------- |
| `call`            | [`Call`](../modules.md#call) | transaction to be called |
| `blockIdentifier` | `BlockIdentifier`            | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/rpc.ts:385](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L385)

---

### traceTransaction

▸ **traceTransaction**(`transactionHash`): `Promise`<`TRACE_ROOT`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `transactionHash` | `string` |

#### Returns

`Promise`<`TRACE_ROOT`\>

#### Defined in

[src/provider/rpc.ts:402](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L402)

---

### traceBlockTransactions

▸ **traceBlockTransactions**(`blockHash`): `Promise`<`Traces`\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `blockHash` | `string` |

#### Returns

`Promise`<`Traces`\>

#### Defined in

[src/provider/rpc.ts:406](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L406)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<`any`\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description                                                                                                  |
| :--------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `txHash`   | `string`                                                               | transaction hash                                                                                             |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<`any`\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/rpc.ts:410](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L410)

---

### getTransactionCount

▸ **getTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

Gets the transaction count from a block.

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<`number`\>

Number of transactions

#### Defined in

[src/provider/rpc.ts:467](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L467)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Gets the latest block number

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/provider/rpc.ts:480](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L480)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<`SyncingStatus`\>

Gets syncing status of the node

#### Returns

`Promise`<`SyncingStatus`\>

Object with the stats data

#### Defined in

[src/provider/rpc.ts:490](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L490)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<`Events`\>

Gets all the events filtered

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `eventFilter` | `EventFilter` |

#### Returns

`Promise`<`Events`\>

events and the pagination of the events

#### Defined in

[src/provider/rpc.ts:500](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L500)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`_invocation`, `_invocationDetails`, `_blockIdentifier?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                 | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `_invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | -                                                                                                                                                                                                                       |
| `_blockIdentifier?`  | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/rpc.ts:504](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L504)

---

### getStarkName

▸ **getStarkName**(`address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                |
| :-------------------- | :-------------------------------------------------- |
| `address`             | [`BigNumberish`](../namespaces/num.md#bignumberish) |
| `StarknetIdContract?` | `string`                                            |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/provider/rpc.ts:512](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L512)

---

### getAddressFromStarkName

▸ **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `name`                | `string` |
| `StarknetIdContract?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/provider/rpc.ts:516](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L516)
