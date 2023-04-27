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

[src/provider/rpc.ts:63](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L63)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/provider/rpc.ts:51](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L51)

---

### headers

• **headers**: `object`

#### Defined in

[src/provider/rpc.ts:53](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L53)

---

### chainId

• `Private` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/rpc.ts:55](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L55)

---

### responseParser

• `Private` **responseParser**: `RPCResponseParser`

#### Defined in

[src/provider/rpc.ts:57](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L57)

---

### retries

• `Private` **retries**: `number`

#### Defined in

[src/provider/rpc.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L59)

---

### blockIdentifier

• `Private` **blockIdentifier**: `BlockIdentifier`

#### Defined in

[src/provider/rpc.ts:61](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L61)

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

[src/provider/rpc.ts:73](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L73)

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

[src/provider/rpc.ts:81](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L81)

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

[src/provider/rpc.ts:88](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L88)

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

[src/provider/rpc.ts:104](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L104)

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

[src/provider/rpc.ts:109](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L109)

---

### getBlockHashAndNumber

▸ **getBlockHashAndNumber**(): `Promise`<`BlockHashAndNumber`\>

#### Returns

`Promise`<`BlockHashAndNumber`\>

#### Defined in

[src/provider/rpc.ts:117](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L117)

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

[src/provider/rpc.ts:121](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L121)

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

[src/provider/rpc.ts:128](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L128)

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

[src/provider/rpc.ts:135](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L135)

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

[src/provider/rpc.ts:146](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L146)

---

### getPendingTransactions

▸ **getPendingTransactions**(): `Promise`<`PendingTransactions`\>

#### Returns

`Promise`<`PendingTransactions`\>

#### Defined in

[src/provider/rpc.ts:157](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L157)

---

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`<`Error`\>

#### Returns

`Promise`<`Error`\>

#### Defined in

[src/provider/rpc.ts:161](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L161)

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

[src/provider/rpc.ts:165](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L165)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name              | Type                                                | Description                                                |
| :---------------- | :-------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress` | `string`                                            |                                                            |
| `key`             | [`BigNumberish`](../namespaces/num.md#bignumberish) | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier` | `BlockIdentifier`                                   | block identifier                                           |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

the value of the storage variable

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/rpc.ts:172](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L172)

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

[src/provider/rpc.ts:187](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L187)

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

[src/provider/rpc.ts:191](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L191)

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

[src/provider/rpc.ts:195](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L195)

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

[src/provider/rpc.ts:203](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L203)

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

[src/provider/rpc.ts:207](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L207)

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

[src/provider/rpc.ts:211](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L211)

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

[src/provider/rpc.ts:219](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L219)

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

[src/provider/rpc.ts:230](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L230)

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
| `blockIdentifier`   | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/rpc.ts:237](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L237)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/rpc.ts:245](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L245)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name              | Type                                                                       | Description                                                                                                                           |
| :---------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier` | `BlockIdentifier`                                                          | block identifier                                                                                                                      |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/rpc.ts:265](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L265)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name              | Type                                                                                 | Description                                                                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier` | `BlockIdentifier`                                                                    | block identifier                                                                                                                            |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/rpc.ts:289](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L289)

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

[src/provider/rpc.ts:310](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L310)

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

[src/provider/rpc.ts:318](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L318)

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

[src/provider/rpc.ts:339](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L339)

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

[src/provider/rpc.ts:357](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L357)

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

[src/provider/rpc.ts:375](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L375)

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

[src/provider/rpc.ts:392](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L392)

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

[src/provider/rpc.ts:396](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L396)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<`any`\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description      |
| :--------- | :--------------------------------------------------------------------- | :--------------- |
| `txHash`   | `string`                                                               | transaction hash |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | -                |

#### Returns

`Promise`<`any`\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/rpc.ts:400](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L400)

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

[src/provider/rpc.ts:457](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L457)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Gets the latest block number

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/provider/rpc.ts:470](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L470)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<`SyncingStatus`\>

Gets syncing status of the node

#### Returns

`Promise`<`SyncingStatus`\>

Object with the stats data

#### Defined in

[src/provider/rpc.ts:480](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L480)

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

[src/provider/rpc.ts:490](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L490)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`_invocation`, `_invocationDetails`, `_blockIdentifier?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                 | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `_invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | -                                                                                                                                                                                                                       |
| `_blockIdentifier?`  | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/rpc.ts:494](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L494)

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

[src/provider/rpc.ts:502](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L502)

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

[src/provider/rpc.ts:506](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L506)
