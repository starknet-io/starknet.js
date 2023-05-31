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

[src/provider/sequencer.ts:88](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L88)

## Properties

### baseUrl

• **baseUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:74](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L74)

---

### feederGatewayUrl

• **feederGatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:76](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L76)

---

### gatewayUrl

• **gatewayUrl**: `string`

#### Defined in

[src/provider/sequencer.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L78)

---

### headers

• `Optional` **headers**: `Record`<`string`, `string`\>

#### Defined in

[src/provider/sequencer.ts:80](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L80)

---

### blockIdentifier

• `Private` **blockIdentifier**: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)

#### Defined in

[src/provider/sequencer.ts:82](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L82)

---

### chainId

• `Private` **chainId**: [`StarknetChainId`](../enums/constants.StarknetChainId.md)

#### Defined in

[src/provider/sequencer.ts:84](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L84)

---

### responseParser

• `Private` **responseParser**: `SequencerAPIResponseParser`

#### Defined in

[src/provider/sequencer.ts:86](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L86)

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

[src/provider/sequencer.ts:108](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L108)

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

[src/provider/sequencer.ts:121](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L121)

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

[src/provider/sequencer.ts:138](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L138)

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

[src/provider/sequencer.ts:143](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L143)

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

[src/provider/sequencer.ts:156](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L156)

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

[src/provider/sequencer.ts:173](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L173)

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

[src/provider/sequencer.ts:184](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L184)

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

[src/provider/sequencer.ts:206](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L206)

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

[src/provider/sequencer.ts:247](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L247)

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

[src/provider/sequencer.ts:251](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L251)

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

[src/provider/sequencer.ts:269](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L269)

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

[src/provider/sequencer.ts:277](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L277)

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

[src/provider/sequencer.ts:284](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L284)

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

[src/provider/sequencer.ts:297](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L297)

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

[src/provider/sequencer.ts:306](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L306)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClass`](../namespaces/types.md#contractclass)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress` | `string`                                                    | contract address |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClass`](../namespaces/types.md#contractclass)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/sequencer.ts:313](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L313)

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

[src/provider/sequencer.ts:327](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L327)

---

### getClassByHash

▸ **getClassByHash**(`classHash`, `blockIdentifier?`): `Promise`<[`ContractClass`](../namespaces/types.md#contractclass)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name              | Type                                                        | Description |
| :---------------- | :---------------------------------------------------------- | :---------- |
| `classHash`       | `string`                                                    | class hash  |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -           |

#### Returns

`Promise`<[`ContractClass`](../namespaces/types.md#contractclass)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/sequencer.ts:334](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L334)

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

[src/provider/sequencer.ts:346](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L346)

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

[src/provider/sequencer.ts:353](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L353)

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

[src/provider/sequencer.ts:368](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L368)

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

[src/provider/sequencer.ts:384](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L384)

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

[src/provider/sequencer.ts:412](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L412)

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

[src/provider/sequencer.ts:421](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L421)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name              | Type                                                                                | Default value | Description                                                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | `undefined`   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | `undefined`   | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | `undefined`   | (optional) block identifier                                                                                                           |
| `skipValidate`    | `boolean`                                                                           | `false`       | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/sequencer.ts:441](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L441)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`«destructured»`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name              | Type                                                                                          | Default value | Description                                                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `«destructured»`  | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | `undefined`   | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | `undefined`   | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   | `undefined`   | (optional) block identifier                                                                                                                 |
| `skipValidate`    | `boolean`                                                                                     | `false`       | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/sequencer.ts:477](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L477)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name              | Type                                                        | Description                                                                                                                                                                                                                                                    |
| :---------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`     | [`InvocationBulk`](../namespaces/types.md#invocationbulk)   | the array of invocation and invocation details object containing: - contractAddress - the address of the account - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature - nonce - optional nonce - version - optional version |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier                                                                                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/sequencer.ts:498](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L498)

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

[src/provider/sequencer.ts:537](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L537)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                            | Description                                                                                                  |
| :--------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           | transaction hash                                                                                             |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) | (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/sequencer.ts:544](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L544)

---

### getTransactionStatus

▸ **getTransactionStatus**(`txHash`): `Promise`<[`GetTransactionStatusResponse`](../namespaces/types.md#gettransactionstatusresponse)\>

Gets the status of a transaction.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionStatusResponse`](../namespaces/types.md#gettransactionstatusresponse)\>

the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }

#### Defined in

[src/provider/sequencer.ts:584](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L584)

---

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<[`GetContractAddressesResponse`](../namespaces/types.md#getcontractaddressesresponse)\>

Gets the smart contract address on the goerli testnet.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)

#### Returns

`Promise`<[`GetContractAddressesResponse`](../namespaces/types.md#getcontractaddressesresponse)\>

starknet smart contract addresses

#### Defined in

[src/provider/sequencer.ts:595](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L595)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TransactionTraceResponse`](../namespaces/types.md#transactiontraceresponse)\>

Gets the transaction trace from a tx id.

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionTraceResponse`](../namespaces/types.md#transactiontraceresponse)\>

the transaction trace

#### Defined in

[src/provider/sequencer.ts:605](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L605)

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

[src/provider/sequencer.ts:610](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L610)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocation`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/types.TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                | Type                                                                                | Default value | Description                                                                                                                                                                                                             |
| :------------------ | :---------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   | `undefined`   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | `undefined`   | -                                                                                                                                                                                                                       |
| `blockIdentifier`   | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | `undefined`   | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate`      | `boolean`                                                                           | `false`       | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/types.TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/sequencer.ts:624](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L624)

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

[src/provider/sequencer.ts:645](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L645)

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

[src/provider/sequencer.ts:655](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L655)

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

[src/provider/sequencer.ts:662](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L662)

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

[src/provider/sequencer.ts:666](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L666)
