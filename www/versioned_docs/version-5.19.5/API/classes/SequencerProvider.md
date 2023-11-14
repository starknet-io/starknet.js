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

| Name                | Type                                                                          | Default value    |
| :------------------ | :---------------------------------------------------------------------------- | :--------------- |
| `optionsOrProvider` | [`SequencerProviderOptions`](../namespaces/types.md#sequencerprovideroptions) | `defaultOptions` |

#### Defined in

[src/provider/sequencer.ts:91](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L91)

## Properties

### baseUrl

• **baseUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:77](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L77)

---

### feederGatewayUrl

• **feederGatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:79](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L79)

---

### gatewayUrl

• **gatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:81](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L81)

---

### headers

• `Optional` **headers**: `Record`<`string`, `string`\>

#### Defined in

[src/provider/sequencer.ts:83](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L83)

---

### blockIdentifier

• `Private` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/provider/sequencer.ts:85](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L85)

---

### chainId

• `Private` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/sequencer.ts:87](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L87)

---

### responseParser

• `Private` **responseParser**: `SequencerAPIResponseParser`

#### Defined in

[src/provider/sequencer.ts:89](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L89)

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

[src/provider/sequencer.ts:111](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L111)

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

[src/provider/sequencer.ts:127](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L127)

---

### getFetchUrl

▸ `Private` **getFetchUrl**(`endpoint`): `string`

#### Parameters

| Name       | Type                                                            |
| :--------- | :-------------------------------------------------------------- |
| `endpoint` | keyof [`Endpoints`](../namespaces/types.Sequencer.md#endpoints) |

#### Returns

`string`

#### Defined in

[src/provider/sequencer.ts:144](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L144)

---

### getFetchMethod

▸ `Private` **getFetchMethod**(`endpoint`): `"POST"` \| `"GET"`

#### Parameters

| Name       | Type                                                            |
| :--------- | :-------------------------------------------------------------- |
| `endpoint` | keyof [`Endpoints`](../namespaces/types.Sequencer.md#endpoints) |

#### Returns

`"POST"` \| `"GET"`

#### Defined in

[src/provider/sequencer.ts:149](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L149)

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

[src/provider/sequencer.ts:162](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L162)

---

### getHeaders

▸ `Private` **getHeaders**(`method`): `undefined` \| `Record`<`string`, `string`\>

#### Parameters

| Name     | Type                                                                |
| :------- | :------------------------------------------------------------------ |
| `method` | [`SequencerHttpMethod`](../namespaces/types.md#sequencerhttpmethod) |

#### Returns

`undefined` \| `Record`<`string`, `string`\>

#### Defined in

[src/provider/sequencer.ts:179](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L179)

---

### fetchEndpoint

▸ `Protected` **fetchEndpoint**<`T`\>(`endpoint`, `...«destructured»`): `Promise`<[`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"RESPONSE"``]\>

#### Type parameters

| Name | Type                                                                    |
| :--- | :---------------------------------------------------------------------- |
| `T`  | extends keyof [`Endpoints`](../namespaces/types.Sequencer.md#endpoints) |

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpoint`          | `T`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `...«destructured»` | [`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"QUERY"``] extends `never` ? [`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"REQUEST"``] extends `never` ? [] : [`undefined`, [`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"REQUEST"``]] : [`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"REQUEST"``] extends `never` ? [[`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"QUERY"``]] : [[`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"QUERY"``], [`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"REQUEST"``]] |

#### Returns

`Promise`<[`Endpoints`](../namespaces/types.Sequencer.md#endpoints)[`T`][``"RESPONSE"``]\>

#### Defined in

[src/provider/sequencer.ts:190](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L190)

---

### fetch

▸ **fetch**(`endpoint`, `options?`): `Promise`<`any`\>

#### Parameters

| Name                           | Type                                                                |
| :----------------------------- | :------------------------------------------------------------------ |
| `endpoint`                     | `string`                                                            |
| `options?`                     | `Object`                                                            |
| `options.method?`              | [`SequencerHttpMethod`](../namespaces/types.md#sequencerhttpmethod) |
| `options.body?`                | `any`                                                               |
| `options.parseAlwaysAsBigInt?` | `boolean`                                                           |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/provider/sequencer.ts:212](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L212)

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

[src/provider/sequencer.ts:253](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L253)

---

### callContract

▸ **callContract**(`«destructured»`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name              | Type                                                        | Description              |
| :---------------- | :---------------------------------------------------------- | :----------------------- |
| `«destructured»`  | [`Call`](../namespaces/types.md#call)                       | transaction to be called |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/sequencer.ts:257](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L257)

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

[src/provider/sequencer.ts:275](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L275)

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

[src/provider/sequencer.ts:283](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L283)

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

[src/provider/sequencer.ts:290](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L290)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/sequencer.ts:303](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L303)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

#### Defined in

[src/provider/sequencer.ts:312](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L312)

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

[src/provider/sequencer.ts:319](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L319)

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

[src/provider/sequencer.ts:328](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L328)

---

### getClassByHash

▸ **getClassByHash**(`classHash`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name              | Type                                                        | Description |
| :---------------- | :---------------------------------------------------------- | :---------- |
| `classHash`       | `string`                                                    | class hash  |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -           |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/sequencer.ts:335](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L335)

---

### getCompiledClassByClassHash

▸ **getCompiledClassByClassHash**(`classHash`, `blockIdentifier?`): `Promise`<[`CairoAssembly`](../namespaces/types.md#cairoassembly)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `classHash`       | `string`                                                    |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`CairoAssembly`](../namespaces/types.md#cairoassembly)\>

#### Defined in

[src/provider/sequencer.ts:344](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L344)

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

[src/provider/sequencer.ts:351](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L351)

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

[src/provider/sequencer.ts:366](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L366)

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

[src/provider/sequencer.ts:382](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L382)

---

### getEstimateFee

▸ **getEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name                | Type                                                                                | Default value | Description                                                                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   | `undefined`   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | `undefined`   | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | `undefined`   | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate`      | `boolean`                                                                           | `false`       | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/sequencer.ts:410](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L410)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                | Type                                                                                | Default value | Description                                                                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   | `undefined`   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | `undefined`   | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`   | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | `undefined`   | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate`      | `boolean`                                                                           | `false`       | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/sequencer.ts:419](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L419)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name              | Type                                                                                | Default value | Description                                                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`      | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | `undefined`   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | `undefined`   | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | `undefined`   | (optional) block identifier                                                                                                           |
| `skipValidate`    | `boolean`                                                                           | `false`       | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/sequencer.ts:438](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L438)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name              | Type                                                                                          | Default value | Description                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`      | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | `undefined`   | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | `undefined`   | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   | `undefined`   | (optional) block identifier                                                                                                                 |
| `skipValidate`    | `boolean`                                                                                     | `false`       | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/sequencer.ts:457](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L457)

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

[src/provider/sequencer.ts:476](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L476)

---

### getCode

▸ **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../namespaces/types.Sequencer.md#getcoderesponse)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `contractAddress` | `string`                                                    |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetCodeResponse`](../namespaces/types.Sequencer.md#getcoderesponse)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/sequencer.ts:488](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L488)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                            | Description                                                                                                                              |
| :--------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/sequencer.ts:495](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L495)

---

### getTransactionStatus

▸ **getTransactionStatus**(`txHash`): `Promise`<[`GetTransactionStatusResponse`](../namespaces/types.md#gettransactionstatusresponse)\>

Gets the status of a transaction.

#### Parameters

| Name     | Type                                                  | Description  |
| :------- | :---------------------------------------------------- | :----------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) | BigNumberish |

#### Returns

`Promise`<[`GetTransactionStatusResponse`](../namespaces/types.md#gettransactionstatusresponse)\>

GetTransactionStatusResponse - the transaction status object

#### Defined in

[src/provider/sequencer.ts:550](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L550)

---

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<[`GetContractAddressesResponse`](../namespaces/types.md#getcontractaddressesresponse)\>

Gets the smart contract address on the goerli testnet.

#### Returns

`Promise`<[`GetContractAddressesResponse`](../namespaces/types.md#getcontractaddressesresponse)\>

GetContractAddressesResponse - starknet smart contract addresses

#### Defined in

[src/provider/sequencer.ts:559](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L559)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TransactionTraceResponse`](../namespaces/types.Sequencer.md#transactiontraceresponse)\>

Gets the transaction trace from a tx id.

#### Parameters

| Name     | Type                                                  | Description  |
| :------- | :---------------------------------------------------- | :----------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) | BigNumberish |

#### Returns

`Promise`<[`TransactionTraceResponse`](../namespaces/types.Sequencer.md#transactiontraceresponse)\>

TransactionTraceResponse - the transaction trace

#### Defined in

[src/provider/sequencer.ts:568](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L568)

---

### estimateMessageFee

▸ **estimateMessageFee**(`«destructured»`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.Sequencer.md#estimatefeeresponse)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `«destructured»`  | [`CallL1Handler`](../namespaces/types.md#calll1handler)     |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.Sequencer.md#estimatefeeresponse)\>

#### Defined in

[src/provider/sequencer.ts:575](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L575)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `«destructured»`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulate transaction using Sequencer provider
WARNING!: Sequencer will process only first element from invocations array

#### Parameters

| Name             | Type                                                                                    | Description                                                       |
| :--------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `invocations`    | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | Array of invocations, but only first invocation will be processed |
| `«destructured»` | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | -                                                                 |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/sequencer.ts:598](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L598)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

StateUpdateResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/sequencer.ts:625](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L625)

---

### getBlockTraces

▸ **getBlockTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionTracesResponse`](../namespaces/types.Sequencer.md#blocktransactiontracesresponse)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionTracesResponse`](../namespaces/types.Sequencer.md#blocktransactiontracesresponse)\>

#### Defined in

[src/provider/sequencer.ts:635](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L635)

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

[src/provider/sequencer.ts:642](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L642)

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

[src/provider/sequencer.ts:646](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L646)

---

### buildTransaction

▸ **buildTransaction**(`invocation`, `versionType?`): [`AccountTransactionItem`](../namespaces/types.Sequencer.md#accounttransactionitem)

Build Single AccountTransaction from Single AccountInvocation

#### Parameters

| Name           | Type                                                                    | Description                                                 |
| :------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------- |
| `invocation`   | [`AccountInvocationItem`](../namespaces/types.md#accountinvocationitem) | AccountInvocationItem                                       |
| `versionType?` | `"fee"` \| `"transaction"`                                              | 'fee' \| 'transaction' - used to determine default versions |

#### Returns

[`AccountTransactionItem`](../namespaces/types.Sequencer.md#accounttransactionitem)

AccountTransactionItem

#### Defined in

[src/provider/sequencer.ts:656](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/sequencer.ts#L656)
