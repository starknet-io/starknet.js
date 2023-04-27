---
id: 'ProviderInterface'
title: 'Class: ProviderInterface'
sidebar_label: 'ProviderInterface'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`ProviderInterface`**

  ↳ [`AccountInterface`](AccountInterface.md)

## Implemented by

- [`Provider`](Provider.md)
- [`RpcProvider`](RpcProvider.md)
- [`SequencerProvider`](SequencerProvider.md)

## Constructors

### constructor

• **new ProviderInterface**()

## Methods

### getChainId

▸ `Abstract` **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

Gets the Starknet chain Id

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

the chain Id

#### Defined in

[src/provider/interface.ts:34](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L34)

---

### callContract

▸ `Abstract` **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                         | Description              |
| :----------------- | :--------------------------- | :----------------------- |
| `call`             | [`Call`](../modules.md#call) | transaction to be called |
| `blockIdentifier?` | `BlockIdentifier`            | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Defined in

[src/provider/interface.ts:43](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L43)

---

### getBlock

▸ `Abstract` **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

Gets the block information

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

the block object

#### Defined in

[src/provider/interface.ts:54](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L54)

---

### getCode

▸ `Abstract` **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name               | Type              |
| :----------------- | :---------------- |
| `contractAddress`  | `string`          |
| `blockIdentifier?` | `BlockIdentifier` |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

#### Defined in

[src/provider/interface.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L59)

---

### getClassAt

▸ `Abstract` **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Contract class of compiled contract

#### Defined in

[src/provider/interface.ts:71](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L71)

---

### getClassHashAt

▸ `Abstract` **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Defined in

[src/provider/interface.ts:83](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L83)

---

### getClassByHash

▸ `Abstract` **getClassByHash**(`classHash`): `Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<[`ContractClass`](../interfaces/ContractClass.md)\>

Contract class of compiled contract

#### Defined in

[src/provider/interface.ts:94](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L94)

---

### getNonceForAddress

▸ `Abstract` **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | -                |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

the hex nonce

#### Defined in

[src/provider/interface.ts:102](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L102)

---

### getStorageAt

▸ `Abstract` **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name               | Type                                                | Description                                                |
| :----------------- | :-------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | `string`                                            |                                                            |
| `key`              | [`BigNumberish`](../namespaces/num.md#bignumberish) | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | `BlockIdentifier`                                   | block identifier                                           |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

the value of the storage variable

#### Defined in

[src/provider/interface.ts:115](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L115)

---

### getTransaction

▸ `Abstract` **getTransaction**(`transactionHash`): `Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name              | Type                                                |
| :---------------- | :-------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionResponse`](../modules.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Defined in

[src/provider/interface.ts:127](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L127)

---

### getTransactionReceipt

▸ `Abstract` **getTransactionReceipt**(`transactionHash`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name              | Type                                                |
| :---------------- | :-------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/num.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Defined in

[src/provider/interface.ts:135](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L135)

---

### deployAccountContract

▸ `Abstract` **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                         | Description                                                                                       |
| :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)   | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:148](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L148)

---

### invokeFunction

▸ `Abstract` **invokeFunction**(`invocation`, `details`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a function on starknet

**`Deprecated`**

This method wont be supported as soon as fees are mandatory. Should not be used outside of Account class

#### Parameters

| Name         | Type                                                                       | Description                                                                                                                                                                                                             |
| :----------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`    | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                           |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

response from addTransaction

#### Defined in

[src/provider/interface.ts:168](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L168)

---

### declareContract

▸ `Abstract` **declareContract**(`transaction`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                       | Description                                                                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:185](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L185)

---

### getEstimateFee

▸ `Abstract` **getEstimateFee**(`invocation`, `details`, `blockIdentifier`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name              | Type                                                                       | Description                                                                                                                                                                                                             |
| :---------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`      | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier` | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:205](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L205)

---

### getInvokeEstimateFee

▸ `Abstract` **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                                                                                                             |
| :----------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier?` | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:225](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L225)

---

### getDeclareEstimateFee

▸ `Abstract` **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | `BlockIdentifier`                                                          | block identifier                                                                                                                      |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:245](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L245)

---

### getDeployAccountEstimateFee

▸ `Abstract` **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                 | Description                                                                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | `BlockIdentifier`                                                                    | block identifier                                                                                                                            |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:266](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L266)

---

### getEstimateFeeBulk

▸ `Abstract` **getEstimateFeeBulk**(`invocations`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name               | Type                                             | Description                                                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`      | [`InvocationBulk`](../modules.md#invocationbulk) | the array of invocation and invocation details object containing: - contractAddress - the address of the account - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature - nonce - optional nonce - version - optional version |
| `blockIdentifier?` | `BlockIdentifier`                                | block identifier                                                                                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:284](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L284)

---

### waitForTransaction

▸ `Abstract` **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description      |
| :--------- | :--------------------------------------------------------------------- | :--------------- |
| `txHash`   | [`BigNumberish`](../namespaces/num.md#bignumberish)                    | transaction hash |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | -                |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Defined in

[src/provider/interface.ts:295](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L295)

---

### getSimulateTransaction

▸ `Abstract` **getSimulateTransaction**(`invocation`, `invocationDetails`, `blockIdentifier?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | -                                                                                                                                                                                                                       |
| `blockIdentifier?`  | `BlockIdentifier`                                                          | block identifier                                                                                                                                                                                                        |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Defined in

[src/provider/interface.ts:314](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L314)

---

### getStateUpdate

▸ `Abstract` **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

StateUpdateResponse

#### Defined in

[src/provider/interface.ts:326](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L326)
