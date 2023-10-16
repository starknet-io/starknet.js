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

| Name                | Type                                                              |
| :------------------ | :---------------------------------------------------------------- |
| `optionsOrProvider` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions) |

#### Defined in

[src/provider/rpc.ts:74](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L74)

## Properties

### nodeUrl

• **nodeUrl**: `string`

#### Defined in

[src/provider/rpc.ts:62](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L62)

---

### headers

• **headers**: `object`

#### Defined in

[src/provider/rpc.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L64)

---

### responseParser

• `Private` **responseParser**: `RPCResponseParser`

#### Defined in

[src/provider/rpc.ts:66](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L66)

---

### retries

• `Private` **retries**: `number`

#### Defined in

[src/provider/rpc.ts:68](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L68)

---

### blockIdentifier

• `Private` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/provider/rpc.ts:70](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L70)

---

### chainId

• `Private` `Optional` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/rpc.ts:72](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L72)

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

[src/provider/rpc.ts:84](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L84)

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

[src/provider/rpc.ts:93](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L93)

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

[src/provider/rpc.ts:100](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L100)

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

[src/provider/rpc.ts:116](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L116)

---

### getBlock

▸ **getBlock**(`blockIdentifier?`): `Promise`<[`GetBlockResponse`](../interfaces/types.GetBlockResponse.md)\>

Gets the block information

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`GetBlockResponse`](../interfaces/types.GetBlockResponse.md)\>

the block object

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/rpc.ts:121](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L121)

---

### getBlockHashAndNumber

▸ **getBlockHashAndNumber**(): `Promise`<`BlockHashAndNumber`\>

#### Returns

`Promise`<`BlockHashAndNumber`\>

#### Defined in

[src/provider/rpc.ts:129](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L129)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`BlockWithTxHashes`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`BlockWithTxHashes`\>

#### Defined in

[src/provider/rpc.ts:133](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L133)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`BlockWithTxs`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`BlockWithTxs`\>

#### Defined in

[src/provider/rpc.ts:140](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L140)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress` | `string`                                                    | contract address |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

#### Defined in

[src/provider/rpc.ts:147](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L147)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress` | `string`                                                    | contract address |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/rpc.ts:158](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L158)

---

### getPendingTransactions

▸ **getPendingTransactions**(): `Promise`<`PendingTransactions`\>

#### Returns

`Promise`<`PendingTransactions`\>

#### Defined in

[src/provider/rpc.ts:169](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L169)

---

### getProtocolVersion

▸ **getProtocolVersion**(): `Promise`<`Error`\>

#### Returns

`Promise`<`Error`\>

#### Defined in

[src/provider/rpc.ts:173](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L173)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<`StateUpdate`\>

Gets the state changes in a specific block

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`StateUpdate`\>

StateUpdateResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/rpc.ts:177](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L177)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name              | Type                                                        | Description                                                |
| :---------------- | :---------------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress` | `string`                                                    |                                                            |
| `key`             | [`BigNumberish`](../namespaces/types.md#bignumberish)       | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/rpc.ts:184](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L184)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/rpc.ts:199](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L199)

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

[src/provider/rpc.ts:203](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L203)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<`TXN`\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |
| `index`           | `number`                                                    |

#### Returns

`Promise`<`TXN`\>

#### Defined in

[src/provider/rpc.ts:207](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L207)

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

[src/provider/rpc.ts:215](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L215)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/rpc.ts:219](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L219)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `classHash`       | `string`                                                    |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

#### Defined in

[src/provider/rpc.ts:223](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L223)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress` | `string`                                                    | contract address |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/rpc.ts:234](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L234)

---

### getCode

▸ **getCode**(`_contractAddress`, `_blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `_contractAddress`  | `string`                                                    |
| `_blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/rpc.ts:245](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L245)

---

### getEstimateFee

▸ **getEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name                | Type                                                                                | Description                                                                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/rpc.ts:252](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L252)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                | Type                                                                                | Description                                                                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/rpc.ts:260](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L260)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name              | Type                                                                                | Description                                                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`      | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                           |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/rpc.ts:280](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L280)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name              | Type                                                                                          | Description                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`      | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/rpc.ts:300](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L300)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `«destructured»`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name             | Type                                                                            | Description                                                                                                                  |
| :--------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details                                                         |
| `«destructured»` | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier - (optional) skipValidate - boolean (default false) |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/rpc.ts:320](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L320)

---

### declareContract

▸ **declareContract**(`«destructured»`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name             | Type                                                                                | Description                                                                                          |
| :--------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

#### Defined in

[src/provider/rpc.ts:335](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L335)

---

### deployAccountContract

▸ **deployAccountContract**(`«destructured»`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name             | Type                                                                                          | Description                                                                                       |
| :--------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `«destructured»` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details`        | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

#### Defined in

[src/provider/rpc.ts:375](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L375)

---

### invokeFunction

▸ **invokeFunction**(`functionInvocation`, `details`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invokes a function on starknet

**`Deprecated`**

This method wont be supported as soon as fees are mandatory. Should not be used outside of Account class

#### Parameters

| Name                 | Type                                                                                | Description                                                                                                                                                                                                             |
| :------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`            | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                           |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

response from addTransaction

#### Implementation of

[ProviderInterface](ProviderInterface.md).[invokeFunction](ProviderInterface.md#invokefunction)

#### Defined in

[src/provider/rpc.ts:393](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L393)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name              | Type                                                        | Description              |
| :---------------- | :---------------------------------------------------------- | :----------------------- |
| `call`            | [`Call`](../namespaces/types.md#call)                       | transaction to be called |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/rpc.ts:411](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L411)

---

### traceTransaction

▸ **traceTransaction**(`transactionHash`): `Promise`<`TRANSACTION_TRACE`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `transactionHash` | `string` |

#### Returns

`Promise`<`TRANSACTION_TRACE`\>

#### Defined in

[src/provider/rpc.ts:428](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L428)

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

[src/provider/rpc.ts:432](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L432)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<`any`\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                            | Description                                                                                                                              |
| :--------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | `string`                                                                        | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<`any`\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/rpc.ts:436](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L436)

---

### getTransactionCount

▸ **getTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

Gets the transaction count from a block.

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`number`\>

Number of transactions

#### Defined in

[src/provider/rpc.ts:493](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L493)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Gets the latest block number

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/provider/rpc.ts:506](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L506)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<`SyncingStatus`\>

Gets syncing status of the node

#### Returns

`Promise`<`SyncingStatus`\>

Object with the stats data

#### Defined in

[src/provider/rpc.ts:516](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L516)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<`EVENTS_CHUNK`\>

Gets all the events filtered

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `eventFilter` | `EventFilter` |

#### Returns

`Promise`<`EVENTS_CHUNK`\>

events and the pagination of the events

#### Defined in

[src/provider/rpc.ts:526](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L526)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `«destructured»`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name             | Type                                                                                    | Description                                                                                                                                                                                       |
| :--------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `«destructured»` | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

an array of transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/rpc.ts:530](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L530)

---

### getStarkName

▸ **getStarkName**(`address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `address`             | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?` | `string`                                              |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/provider/rpc.ts:551](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L551)

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

[src/provider/rpc.ts:555](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L555)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): `BROADCASTED_TXN`

#### Parameters

| Name           | Type                                                                    |
| :------------- | :---------------------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../namespaces/types.md#accountinvocationitem) |
| `versionType?` | `"fee"` \| `"transaction"`                                              |

#### Returns

`BROADCASTED_TXN`

#### Defined in

[src/provider/rpc.ts:559](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/rpc.ts#L559)
