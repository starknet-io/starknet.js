---
id: 'SequencerProvider'
title: 'Class: SequencerProvider'
sidebar_label: 'SequencerProvider'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`ProviderInterface`](ProviderInterface.md)

## Constructors

### constructor

• **new SequencerProvider**(`optionsOrProvider?`)

#### Parameters

| Name                | Type                                                                 | Default value    |
| :------------------ | :------------------------------------------------------------------- | :--------------- |
| `optionsOrProvider` | [`SequencerProviderOptions`](../modules.md#sequencerprovideroptions) | `defaultOptions` |

#### Defined in

[src/provider/sequencer.ts:100](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L100)

## Properties

### baseUrl

• **baseUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:86](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L86)

---

### feederGatewayUrl

• **feederGatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:88](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L88)

---

### gatewayUrl

• **gatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:90](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L90)

---

### headers

• `Optional` **headers**: `Record`<`string`, `string`\>

#### Defined in

[src/provider/sequencer.ts:92](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L92)

---

### blockIdentifier

• `Private` **blockIdentifier**: `BlockIdentifier`

#### Defined in

[src/provider/sequencer.ts:94](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L94)

---

### chainId

• `Private` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/sequencer.ts:96](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L96)

---

### responseParser

• `Private` **responseParser**: `SequencerAPIResponseParser`

#### Defined in

[src/provider/sequencer.ts:98](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L98)

## Methods

### getNetworkFromName

▸ `Static` `Protected` **getNetworkFromName**(`name`): `BaseUrl`

#### Parameters

| Name   | Type                                                                                                             |
| :----- | :--------------------------------------------------------------------------------------------------------------- |
| `name` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) \| [`NetworkName`](../enums/constants.NetworkName.md) |

#### Returns

`BaseUrl`

#### Defined in

[src/provider/sequencer.ts:120](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L120)

---

### getChainIdFromBaseUrl

▸ `Static` `Protected` **getChainIdFromBaseUrl**(`baseUrl`): [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `baseUrl` | `string` |

#### Returns

[`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/sequencer.ts:133](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L133)

---

### getFetchUrl

▸ `Private` **getFetchUrl**(`endpoint`): `string`

#### Parameters

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `endpoint` | keyof [`Endpoints`](../namespaces/Sequencer.md#endpoints) |

#### Returns

`string`

#### Defined in

[src/provider/sequencer.ts:150](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L150)

---

### getFetchMethod

▸ `Private` **getFetchMethod**(`endpoint`): `"POST"` \| `"GET"`

#### Parameters

| Name       | Type                                                      |
| :--------- | :-------------------------------------------------------- |
| `endpoint` | keyof [`Endpoints`](../namespaces/Sequencer.md#endpoints) |

#### Returns

`"POST"` \| `"GET"`

#### Defined in

[src/provider/sequencer.ts:155](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L155)

---

### getQueryString

▸ `Private` **getQueryString**(`query?`): `string`

#### Parameters

| Name     | Type                       |
| :------- | :------------------------- |
| `query?` | `Record`<`string`, `any`\> |

#### Returns

`string`

#### Defined in

[src/provider/sequencer.ts:168](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L168)

---

### getHeaders

▸ `Private` **getHeaders**(`method`): `undefined` \| `Record`<`string`, `string`\>

#### Parameters

| Name     | Type                                                       |
| :------- | :--------------------------------------------------------- |
| `method` | [`SequencerHttpMethod`](../modules.md#sequencerhttpmethod) |

#### Returns

`undefined` \| `Record`<`string`, `string`\>

#### Defined in

[src/provider/sequencer.ts:185](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L185)

---

### fetchEndpoint

▸ `Protected` **fetchEndpoint**<`T`\>(`endpoint`, `...«destructured»`): `Promise`<[`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"RESPONSE"``]\>

#### Type parameters

| Name | Type                                                              |
| :--- | :---------------------------------------------------------------- |
| `T`  | extends keyof [`Endpoints`](../namespaces/Sequencer.md#endpoints) |

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`          | `T`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `...«destructured»` | [`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"QUERY"``] extends `never` ? [`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"REQUEST"``] extends `never` ? [] : [`undefined`, [`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"REQUEST"``]] : [`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"REQUEST"``] extends `never` ? [[`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"QUERY"``]] : [[`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"QUERY"``], [`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"REQUEST"``]] |

#### Returns

`Promise`<[`Endpoints`](../namespaces/Sequencer.md#endpoints)[`T`][``"RESPONSE"``]\>

#### Defined in

[src/provider/sequencer.ts:196](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L196)

---

### fetch

▸ **fetch**(`endpoint`, `options?`): `Promise`<`any`\>

#### Parameters

| Name                           | Type                                                       |
| :----------------------------- | :--------------------------------------------------------- |
| `endpoint`                     | `string`                                                   |
| `options?`                     | `Object`                                                   |
| `options.method?`              | [`SequencerHttpMethod`](../modules.md#sequencerhttpmethod) |
| `options.body?`                | `any`                                                      |
| `options.parseAlwaysAsBigInt?` | `boolean`                                                  |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/provider/sequencer.ts:218](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L218)

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

[src/provider/sequencer.ts:259](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L259)

---

### callContract

▸ **callContract**(`«destructured»`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name              | Type                         | Description              |
| :---------------- | :--------------------------- | :----------------------- |
| `«destructured»`  | [`Call`](../modules.md#call) | transaction to be called |
| `blockIdentifier` | `BlockIdentifier`            | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/sequencer.ts:263](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L263)

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

[src/provider/sequencer.ts:279](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L279)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `contractAddress` | `string`          | contract address |
| `blockIdentifier` | `BlockIdentifier` | -                |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

the hex nonce

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/sequencer.ts:287](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L287)

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

[src/provider/sequencer.ts:294](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L294)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/sequencer.ts:307](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L307)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

#### Defined in

[src/provider/sequencer.ts:316](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L316)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `contractAddress` | `string`          | contract address |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/sequencer.ts:323](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L323)

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

[src/provider/sequencer.ts:332](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L332)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/sequencer.ts:339](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L339)

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

[src/provider/sequencer.ts:343](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L343)

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

[src/provider/sequencer.ts:358](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L358)

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

[src/provider/sequencer.ts:374](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L374)

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

[src/provider/sequencer.ts:389](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L389)

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

[src/provider/sequencer.ts:397](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L397)

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

[src/provider/sequencer.ts:416](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L416)

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

[src/provider/sequencer.ts:435](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L435)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name              | Type                                             | Description                                                                                                                                                                                                                                                    |
| :---------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`     | [`InvocationBulk`](../modules.md#invocationbulk) | the array of invocation and invocation details object containing: - contractAddress - the address of the account - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature - nonce - optional nonce - version - optional version |
| `blockIdentifier` | `BlockIdentifier`                                | block identifier                                                                                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/sequencer.ts:455](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L455)

---

### getCode

▸ **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../namespaces/Sequencer.md#getcoderesponse)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `contractAddress` | `string`          |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<[`GetCodeResponse`](../namespaces/Sequencer.md#getcoderesponse)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/sequencer.ts:496](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L496)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description      |
| :--------- | :--------------------------------------------------------------------- | :--------------- |
| `txHash`   | [`BigNumberish`](../namespaces/num.md#bignumberish)                    | transaction hash |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | -                |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/sequencer.ts:503](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L503)

---

### getTransactionStatus

▸ **getTransactionStatus**(`txHash`): `Promise`<[`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse)\>

Gets the status of a transaction.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)

#### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse)\>

the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }

#### Defined in

[src/provider/sequencer.ts:543](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L543)

---

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<[`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse)\>

Gets the smart contract address on the goerli testnet.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)

#### Returns

`Promise`<[`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse)\>

starknet smart contract addresses

#### Defined in

[src/provider/sequencer.ts:554](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L554)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TransactionTraceResponse`](../modules.md#transactiontraceresponse)\>

Gets the transaction trace from a tx id.

#### Parameters

| Name     | Type                                                |
| :------- | :-------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`TransactionTraceResponse`](../modules.md#transactiontraceresponse)\>

the transaction trace

#### Defined in

[src/provider/sequencer.ts:564](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L564)

---

### estimateMessageFee

▸ **estimateMessageFee**(`«destructured»`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../namespaces/Sequencer.md#estimatefeeresponse)\>

#### Parameters

| Name              | Type                                           |
| :---------------- | :--------------------------------------------- |
| `«destructured»`  | [`CallL1Handler`](../modules.md#calll1handler) |
| `blockIdentifier` | `BlockIdentifier`                              |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/Sequencer.md#estimatefeeresponse)\>

#### Defined in

[src/provider/sequencer.ts:569](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L569)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | -                                                                                                                                                                                                                       |
| `blockIdentifier`   | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/sequencer.ts:583](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L583)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

StateUpdateResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/sequencer.ts:603](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L603)

---

### getBlockTraces

▸ **getBlockTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionTracesResponse`](../namespaces/Sequencer.md#blocktransactiontracesresponse)\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `BlockIdentifier` |

#### Returns

`Promise`<[`BlockTransactionTracesResponse`](../namespaces/Sequencer.md#blocktransactiontracesresponse)\>

#### Defined in

[src/provider/sequencer.ts:613](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L613)

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

[src/provider/sequencer.ts:620](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L620)

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

[src/provider/sequencer.ts:624](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L624)
