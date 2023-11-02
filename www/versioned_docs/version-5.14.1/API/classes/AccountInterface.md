---
id: 'AccountInterface'
title: 'Class: AccountInterface'
sidebar_label: 'AccountInterface'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ProviderInterface`](ProviderInterface.md)

  ↳ **`AccountInterface`**

## Implemented by

- [`Account`](Account.md)

## Constructors

### constructor

• **new AccountInterface**()

#### Inherited from

[ProviderInterface](ProviderInterface.md).[constructor](ProviderInterface.md#constructor)

## Properties

### address

• `Abstract` **address**: `string`

#### Defined in

[src/account/interface.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L34)

---

### signer

• `Abstract` **signer**: [`SignerInterface`](SignerInterface.md)

#### Defined in

[src/account/interface.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L36)

---

### cairoVersion

• `Abstract` **cairoVersion**: [`CairoVersion`](../namespaces/types.md#cairoversion)

#### Defined in

[src/account/interface.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L38)

## Methods

### estimateInvokeFee

▸ `Abstract` **estimateInvokeFee**(`calls`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimate Fee for executing an INVOKE transaction on starknet

#### Parameters

| Name                  | Type                                                                                      | Description                                                                                                                                                                |
| :-------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../namespaces/types.md#allowarray)<[`Call`](../namespaces/types.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)                         | -                                                                                                                                                                          |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:50](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L50)

---

### estimateDeclareFee

▸ `Abstract` **estimateDeclareFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimate Fee for executing a DECLARE transaction on starknet

#### Parameters

| Name                  | Type                                                                      | Description                                                                                                                                                                         |
| :-------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload) | the payload object containing: - contract - the compiled contract to be declared - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)         | -                                                                                                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L64)

---

### estimateAccountDeployFee

▸ `Abstract` **estimateAccountDeployFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet

#### Parameters

| Name                  | Type                                                                                  | Description                                                                                                                                        |
| :-------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | contract - the compiled contract to be deployed - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)                     | optional blockIdentifier - constant nonce = 0                                                                                                      |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:80](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L80)

---

### estimateDeployFee

▸ `Abstract` **estimateDeployFee**(`deployContractPayload`, `transactionsDetail?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimate Fee for executing a UDC DEPLOY transaction on starknet
This is different from the normal DEPLOY transaction as it goes through the Universal Deployer Contract (UDC)

#### Parameters

| Name                    | Type                                                                                                                                                                                             | Description                                                                                                                                                      |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deployContractPayload` | [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload)[] | containing - classHash: computed class hash of compiled contract - salt: address salt - unique: bool if true ensure unique salt - calldata: constructor calldata |
| `transactionsDetail?`   | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                                                                                                                                | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

#### Defined in

[src/account/interface.ts:100](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L100)

---

### estimateFeeBulk

▸ `Abstract` **estimateFeeBulk**(`invocations`, `details?`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimate Fee for executing a list of transactions on starknet
Contract must be deployed for fee estimation to be possible

#### Parameters

| Name          | Type                                                              |
| :------------ | :---------------------------------------------------------------- |
| `invocations` | [`Invocations`](../namespaces/types.md#invocations)               |
| `details?`    | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md) |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:115](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L115)

---

### execute

▸ `Abstract` **execute**(`transactions`, `abis?`, `transactionsDetail?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invoke execute function in account contract

#### Parameters

| Name                  | Type                                                                                      | Description                                                                                                                                                                                                                                  |
| :-------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions`        | [`AllowArray`](../namespaces/types.md#allowarray)<[`Call`](../namespaces/types.md#call)\> | the invocation object or an array of them, containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `abis?`               | [`Abi`](../namespaces/types.md#abi)[]                                                     | -                                                                                                                                                                                                                                            |
| `transactionsDetail?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                         | -                                                                                                                                                                                                                                            |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

response from addTransaction

#### Defined in

[src/account/interface.ts:132](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L132)

---

### declare

▸ `Abstract` **declare**(`contractPayload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name                  | Type                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload) | transaction payload to be deployed containing: - contract: compiled contract code - (optional) classHash: computed class hash of compiled contract. Pre-compute it for faster execution. - (required for Cairo1 without compiledClassHash) casm: CompiledContract \| string; - (optional for Cairo1 with casm) compiledClassHash: compiled class hash from casm. Pre-compute it for faster execution. |
| `transactionsDetail?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)         | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                                                                                                                                                                                                                                                                  |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/account/interface.ts:152](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L152)

---

### deploy

▸ `Abstract` **deploy**(`payload`, `details?`): `Promise`<[`MultiDeployContractResponse`](../namespaces/types.md#multideploycontractresponse)\>

Deploys a declared contract to starknet - using Universal Deployer Contract (UDC)
support multicall

#### Parameters

| Name       | Type                                                                                                                                                                                             | Description                                                                                                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload)[] | classHash: computed class hash of compiled contract - [constructorCalldata] contract constructor calldata - [salt=pseudorandom] deploy address salt - [unique=true] ensure unique salt |
| `details?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                                                                                                                                | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee]                                                                                                          |

#### Returns

`Promise`<[`MultiDeployContractResponse`](../namespaces/types.md#multideploycontractresponse)\>

- contract_address[]
- transaction_hash

#### Defined in

[src/account/interface.ts:174](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L174)

---

### deployContract

▸ `Abstract` **deployContract**(`payload`, `details?`): `Promise`<[`DeployContractUDCResponse`](../namespaces/types.md#deploycontractudcresponse)\>

Simplify deploy simulating old DeployContract with same response + UDC specific response
Internal wait for L2 transaction, support multicall

#### Parameters

| Name       | Type                                                                                                                                                                                             | Description                                                                                                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload)[] | classHash: computed class hash of compiled contract - [constructorCalldata] contract constructor calldata - [salt=pseudorandom] deploy address salt - [unique=true] ensure unique salt |
| `details?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                                                                                                                                | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee]                                                                                                          |

#### Returns

`Promise`<[`DeployContractUDCResponse`](../namespaces/types.md#deploycontractudcresponse)\>

- contract_address
- transaction_hash
- address
- deployer
- unique
- classHash
- calldata_len
- calldata
- salt

#### Defined in

[src/account/interface.ts:203](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L203)

---

### declareAndDeploy

▸ `Abstract` **declareAndDeploy**(`payload`, `details?`): `Promise`<[`DeclareDeployUDCResponse`](../namespaces/types.md#declaredeployudcresponse)\>

Declares and Deploy a given compiled contract (json) to starknet using UDC
Internal wait for L2 transaction, do not support multicall
Method will pass even if contract is already declared (internal using DeclareIfNot)

#### Parameters

| Name       | Type                                                                                        | Description                                                                   |
| :--------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------- |
| `payload`  | [`DeclareAndDeployContractPayload`](../namespaces/types.md#declareanddeploycontractpayload) | -                                                                             |
| `details?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                           | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee] |

#### Returns

`Promise`<[`DeclareDeployUDCResponse`](../namespaces/types.md#declaredeployudcresponse)\>

- declare
  - transaction_hash
- deploy
  - contract_address
  - transaction_hash
  - address
  - deployer
  - unique
  - classHash
  - calldata_len
  - calldata
  - salt

#### Defined in

[src/account/interface.ts:237](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L237)

---

### deployAccount

▸ `Abstract` **deployAccount**(`contractPayload`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploy the account on Starknet

#### Parameters

| Name                  | Type                                                                                  | Description                                                                                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | transaction payload to be deployed containing: - classHash: computed class hash of compiled contract - optional constructor calldata - optional address salt - optional contractAddress |
| `transactionsDetail?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                     | Invocation Details containing: - constant nonce = 0 - optional version - optional maxFee                                                                                                |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/account/interface.ts:256](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L256)

---

### signMessage

▸ `Abstract` **signMessage**(`typedData`): `Promise`<[`Signature`](../namespaces/types.md#signature)\>

Sign an JSON object for off-chain usage with the starknet private key and return the signature
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/types.TypedData.md) |

#### Returns

`Promise`<[`Signature`](../namespaces/types.md#signature)\>

the signature of the JSON object

#### Defined in

[src/account/interface.ts:269](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L269)

---

### hashMessage

▸ `Abstract` **hashMessage**(`typedData`): `Promise`<`string`\>

Hash a JSON object with pederson hash and return the hash
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/types.TypedData.md) |

#### Returns

`Promise`<`string`\>

the hash of the JSON object

#### Defined in

[src/account/interface.ts:279](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L279)

---

### verifyMessage

▸ `Abstract` **verifyMessage**(`typedData`, `signature`): `Promise`<`boolean`\>

Verify a signature of a JSON object

**`Throws`**

if the JSON object is not a valid JSON or the signature is not a valid signature

#### Parameters

| Name        | Type                                            | Description                  |
| :---------- | :---------------------------------------------- | :--------------------------- |
| `typedData` | [`TypedData`](../interfaces/types.TypedData.md) | JSON object to be verified   |
| `signature` | [`Signature`](../namespaces/types.md#signature) | signature of the JSON object |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Defined in

[src/account/interface.ts:289](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L289)

---

### verifyMessageHash

▸ `Abstract` **verifyMessageHash**(`hash`, `signature`): `Promise`<`boolean`\>

Verify a signature of a given hash

**`Warning`**

This method is not recommended, use verifyMessage instead

**`Throws`**

if the signature is not a valid signature

#### Parameters

| Name        | Type                                                  | Description           |
| :---------- | :---------------------------------------------------- | :-------------------- |
| `hash`      | [`BigNumberish`](../namespaces/types.md#bignumberish) | hash to be verified   |
| `signature` | [`Signature`](../namespaces/types.md#signature)       | signature of the hash |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Defined in

[src/account/interface.ts:300](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L300)

---

### getNonce

▸ `Abstract` **getNonce**(`blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of the account with respect to a specific block

#### Parameters

| Name               | Type                                                        | Description                                     |
| :----------------- | :---------------------------------------------------------- | :---------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | optional blockIdentifier. Defaults to 'pending' |

#### Returns

`Promise`<`string`\>

nonce of the account

#### Defined in

[src/account/interface.ts:308](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L308)

---

### getSuggestedMaxFee

▸ `Abstract` **getSuggestedMaxFee**(`estimateFeeAction`, `details`): `Promise`<`bigint`\>

Gets Suggested Max Fee based on the transaction type

#### Parameters

| Name                | Type                                                              |
| :------------------ | :---------------------------------------------------------------- |
| `estimateFeeAction` | [`EstimateFeeAction`](../namespaces/types.md#estimatefeeaction)   |
| `details`           | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md) |

#### Returns

`Promise`<`bigint`\>

suggestedMaxFee

#### Defined in

[src/account/interface.ts:317](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L317)

---

### simulateTransaction

▸ `Abstract` **simulateTransaction**(`invocations`, `details?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulates an array of transaction and returns an array of transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                              | Description                                                                                                       |
| :------------ | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `invocations` | [`Invocations`](../namespaces/types.md#invocations)                               | Invocations containing: - type - transaction type: DECLARE, (multi)DEPLOY, DEPLOY_ACCOUNT, (multi)INVOKE_FUNCTION |
| `details?`    | [`SimulateTransactionDetails`](../namespaces/types.md#simulatetransactiondetails) | SimulateTransactionDetails                                                                                        |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

response from simulate_transaction

#### Defined in

[src/account/interface.ts:331](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/account/interface.ts#L331)

---

### getChainId

▸ `Abstract` **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

Gets the Starknet chain Id

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

the chain Id

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getChainId](ProviderInterface.md#getchainid)

#### Defined in

[src/provider/interface.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L38)

---

### callContract

▸ `Abstract` **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                                        | Description              |
| :----------------- | :---------------------------------------------------------- | :----------------------- |
| `call`             | [`Call`](../namespaces/types.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Inherited from

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/interface.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L47)

---

### getBlock

▸ `Abstract` **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../interfaces/types.GetBlockResponse.md)\>

Gets the block information

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`GetBlockResponse`](../interfaces/types.GetBlockResponse.md)\>

the block object

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/interface.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L58)

---

### getCode

▸ `Abstract` **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | `string`                                                    |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/types.GetCodeResponse.md)\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

#### Defined in

[src/provider/interface.ts:63](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L63)

---

### getClassAt

▸ `Abstract` **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/interface.ts:75](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L75)

---

### getClassHashAt

▸ `Abstract` **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

#### Defined in

[src/provider/interface.ts:87](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L87)

---

### getClassByHash

▸ `Abstract` **getClassByHash**(`classHash`): `Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<[`ContractClassResponse`](../namespaces/types.md#contractclassresponse)\>

Contract class of compiled contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/interface.ts:98](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L98)

---

### getNonceForAddress

▸ `Abstract` **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/interface.ts:106](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L106)

---

### getStorageAt

▸ `Abstract` **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/interface.ts:119](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L119)

---

### getTransaction

▸ `Abstract` **getTransaction**(`transactionHash`): `Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

Gets the transaction information from a tx id.

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionResponse`](../namespaces/types.md#gettransactionresponse)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/interface.ts:131](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L131)

---

### getTransactionReceipt

▸ `Abstract` **getTransactionReceipt**(`transactionHash`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

#### Defined in

[src/provider/interface.ts:139](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L139)

---

### deployAccountContract

▸ `Abstract` **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                                  | Description                                                                                       |
| :-------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)   | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

#### Defined in

[src/provider/interface.ts:152](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L152)

---

### invokeFunction

▸ `Abstract` **invokeFunction**(`invocation`, `details`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invokes a function on starknet

**`Deprecated`**

This method wont be supported as soon as fees are mandatory. Should not be used outside of Account class

#### Parameters

| Name         | Type                                                                                | Description                                                                                                                                                                                                             |
| :----------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation` | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`    | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                           |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

response from addTransaction

#### Inherited from

[ProviderInterface](ProviderInterface.md).[invokeFunction](ProviderInterface.md#invokefunction)

#### Defined in

[src/provider/interface.ts:172](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L172)

---

### declareContract

▸ `Abstract` **declareContract**(`transaction`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                                | Description                                                                                          |
| :------------ | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

#### Defined in

[src/provider/interface.ts:189](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L189)

---

### getEstimateFee

▸ `Abstract` **getEstimateFee**(`invocation`, `details`, `blockIdentifier`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name              | Type                                                                                | Description                                                                                                                                                                                                             |
| :---------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`      | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`         | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`   | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

#### Defined in

[src/provider/interface.ts:210](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L210)

---

### getInvokeEstimateFee

▸ `Abstract` **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                                | Description                                                                                                                                                                                                             |
| :----------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`    | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

the estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/interface.ts:232](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L232)

---

### getDeclareEstimateFee

▸ `Abstract` **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/interface.ts:254](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L254)

---

### getDeployAccountEstimateFee

▸ `Abstract` **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/interface.ts:277](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L277)

---

### getEstimateFeeBulk

▸ `Abstract` **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                            | Description                                                                                                                  |
| :------------ | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details                                                         |
| `options?`    | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier - (optional) skipValidate - boolean (default false) |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

the estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/interface.ts:293](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L293)

---

### waitForTransaction

▸ `Abstract` **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                            | Description                                                                                                                              |
| :--------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Inherited from

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/interface.ts:306](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L306)

---

### getSimulateTransaction

▸ `Abstract` **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                                    | Description                                                                                                                                                                                       |
| :------------ | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

an array of transaction trace and estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/interface.ts:321](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L321)

---

### getStateUpdate

▸ `Abstract` **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/types.StateUpdateResponse.md)\>

StateUpdateResponse

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/interface.ts:332](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/provider/interface.ts#L332)
