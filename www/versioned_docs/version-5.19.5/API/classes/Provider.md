---
id: 'Provider'
title: 'Class: Provider'
sidebar_label: 'Provider'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`Provider`**

  ↳ [`Account`](Account.md)

## Implements

- [`ProviderInterface`](ProviderInterface.md)

## Constructors

### constructor

• **new Provider**(`providerOrOptions?`)

#### Parameters

| Name                 | Type                                                                                                       |
| :------------------- | :--------------------------------------------------------------------------------------------------------- |
| `providerOrOptions?` | [`ProviderOptions`](../interfaces/types.ProviderOptions.md) \| [`ProviderInterface`](ProviderInterface.md) |

#### Defined in

[src/provider/default.ts:41](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L41)

## Properties

### provider

• `Private` **provider**: [`ProviderInterface`](ProviderInterface.md)

#### Defined in

[src/provider/default.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L39)

## Methods

### getChainId

▸ **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

Gets the Starknet chain Id

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

the chain Id

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getChainId](ProviderInterface.md#getchainid)

#### Defined in

[src/provider/default.ts:63](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L63)

---

### getBlock

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../interfaces/types.GetBlockResponse.md)\>

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

[src/provider/default.ts:67](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L67)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/default.ts:71](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L71)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

#### Defined in

[src/provider/default.ts:78](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L78)

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

[src/provider/default.ts:85](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L85)

---

### getEstimateFee

▸ **getEstimateFee**(`invocationWithTxType`, `invocationDetails`, `blockIdentifier`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name                   | Type                                                                                | Description                                                                                                                                                                                                             |
| :--------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationWithTxType` | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails`    | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`      | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/default.ts:89](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L89)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocationWithTxType`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                   | Type                                                                                | Description                                                                                                                                                                                                             |
| :--------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationWithTxType` | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails`    | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier?`     | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`        | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/default.ts:97](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L97)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                            | Description                                                                                                                  |
| :------------ | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details                                                         |
| `options`     | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier - (optional) skipValidate - boolean (default false) |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/default.ts:111](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L111)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/default.ts:118](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L118)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name               | Type                                                        | Description                                                |
| :----------------- | :---------------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | `string`                                                    |                                                            |
| `key`              | [`BigNumberish`](../namespaces/types.md#bignumberish)       | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/default.ts:125](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L125)

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

[src/provider/default.ts:133](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L133)

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

[src/provider/default.ts:137](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L137)

---

### callContract

▸ **callContract**(`request`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                                        | Description              |
| :----------------- | :---------------------------------------------------------- | :----------------------- |
| `request`          | [`Call`](../namespaces/types.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/default.ts:141](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L141)

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

[src/provider/default.ts:148](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L148)

---

### deployAccountContract

▸ **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                                          | Description                                                                                       |
| :-------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

#### Defined in

[src/provider/default.ts:155](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L155)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                                | Description                                                                                          |
| :------------ | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

#### Defined in

[src/provider/default.ts:162](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L162)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                                | Description                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/default.ts:169](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L169)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                          | Description                                                                                                                                 |
| :----------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                                     | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/default.ts:178](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L178)

---

### getCode

▸ **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | `string`                                                    |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/default.ts:192](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L192)

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

[src/provider/default.ts:199](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L199)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                                    | Description                                                                                                                                                                                       |
| :------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

an array of transaction trace and estimated fee

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/default.ts:206](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L206)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

StateUpdateResponse

#### Implementation of

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/default.ts:213](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L213)

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

[src/provider/default.ts:217](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L217)

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

[src/provider/default.ts:221](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L221)
