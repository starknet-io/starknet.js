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

[src/account/interface.ts:31](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L31)

---

### signer

• `Abstract` **signer**: [`SignerInterface`](SignerInterface.md)

#### Defined in

[src/account/interface.ts:33](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L33)

## Methods

### estimateInvokeFee

▸ `Abstract` **estimateInvokeFee**(`calls`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimate Fee for executing an INVOKE transaction on starknet

#### Parameters

| Name                  | Type                                                                    | Description                                                                                                                                                                |
| :-------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)             | -                                                                                                                                                                          |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:45](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L45)

---

### estimateDeclareFee

▸ `Abstract` **estimateDeclareFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimate Fee for executing a DECLARE transaction on starknet

#### Parameters

| Name                  | Type                                                             | Description                                                                                                                                                                         |
| :-------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | the payload object containing: - contract - the compiled contract to be declared - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)      | -                                                                                                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L59)

---

### estimateAccountDeployFee

▸ `Abstract` **estimateAccountDeployFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet

#### Parameters

| Name                  | Type                                                                         | Description                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | contract - the compiled contract to be deployed - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)                  | optional blockIdentifier - constant nonce = 0                                                                                                      |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:75](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L75)

---

### estimateDeployFee

▸ `Abstract` **estimateDeployFee**(`deployContractPayload`, `transactionsDetail?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimate Fee for executing a UDC DEPLOY transaction on starknet
This is different from the normal DEPLOY transaction as it goes through the Universal Deployer Contract (UDC)

#### Parameters

| Name                    | Type                                                                                                                                                                           | Description                                                                                                                                                      |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deployContractPayload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | containing - classHash: computed class hash of compiled contract - salt: address salt - unique: bool if true ensure unique salt - calldata: constructor calldata |
| `transactionsDetail?`   | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

#### Defined in

[src/account/interface.ts:95](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L95)

---

### estimateFeeBulk

▸ `Abstract` **estimateFeeBulk**(`transactions`, `estimateFeeDetails?`): `Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

Estimate Fee for executing a list of transactions on starknet
Contract must be deployed for fee estimation to be possible

#### Parameters

| Name                  | Type                                                        | Description                                                                                                                                                                           |
| :-------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `transactions`        | [`TransactionBulk`](../modules.md#transactionbulk)          | array of transaction object containing : - type - the type of transaction : 'DECLARE' \| 'DEPLOY' \| 'INVOKE_FUNCTION' \| 'DEPLOY_ACCOUNT' - payload - the payload of the transaction |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md) | -                                                                                                                                                                                     |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:110](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L110)

---

### execute

▸ `Abstract` **execute**(`transactions`, `abis?`, `transactionsDetail?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invoke execute function in account contract

#### Parameters

| Name                  | Type                                                                    | Description                                                                                                                                                                                                                                  |
| :-------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions`        | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | the invocation object or an array of them, containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `abis?`               | [`Abi`](../modules.md#abi)[]                                            | -                                                                                                                                                                                                                                            |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                | -                                                                                                                                                                                                                                            |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

response from addTransaction

#### Defined in

[src/account/interface.ts:127](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L127)

---

### declare

▸ `Abstract` **declare**(`contractPayload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name                  | Type                                                             | Description                                                                                                                             |
| :-------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | transaction payload to be deployed containing: - contract: compiled contract code - classHash: computed class hash of compiled contract |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)         | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                    |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/account/interface.ts:145](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L145)

---

### deploy

▸ `Abstract` **deploy**(`payload`, `details?`): `Promise`<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

Deploys a declared contract to starknet - using Universal Deployer Contract (UDC)
support multicall

#### Parameters

| Name       | Type                                                                                                                                                                           | Description                                                                                                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | classHash: computed class hash of compiled contract - [constructorCalldata] contract constructor calldata - [salt=pseudorandom] deploy address salt - [unique=true] ensure unique salt |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee]                                                                                                          |

#### Returns

`Promise`<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

- contract_address[]
- transaction_hash

#### Defined in

[src/account/interface.ts:167](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L167)

---

### deployContract

▸ `Abstract` **deployContract**(`payload`, `details?`): `Promise`<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

Simplify deploy simulating old DeployContract with same response + UDC specific response
Internal wait for L2 transaction, support multicall

#### Parameters

| Name       | Type                                                                                                                                                                           | Description                                                                                                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | classHash: computed class hash of compiled contract - [constructorCalldata] contract constructor calldata - [salt=pseudorandom] deploy address salt - [unique=true] ensure unique salt |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee]                                                                                                          |

#### Returns

`Promise`<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

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

[src/account/interface.ts:196](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L196)

---

### declareAndDeploy

▸ `Abstract` **declareAndDeploy**(`payload`, `details?`): `Promise`<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

Declares and Deploy a given compiled contract (json) to starknet using UDC
Internal wait for L2 transaction, do not support multicall

#### Parameters

| Name       | Type                                                                               | Description                                                                   |
| :--------- | :--------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `payload`  | [`DeclareAndDeployContractPayload`](../modules.md#declareanddeploycontractpayload) | -                                                                             |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                           | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee] |

#### Returns

`Promise`<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

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

[src/account/interface.ts:229](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L229)

---

### deployAccount

▸ `Abstract` **deployAccount**(`contractPayload`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploy the account on Starknet

#### Parameters

| Name                  | Type                                                                         | Description                                                                                                                                                                             |
| :-------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | transaction payload to be deployed containing: - classHash: computed class hash of compiled contract - optional constructor calldata - optional address salt - optional contractAddress |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                     | Invocation Details containing: - constant nonce = 0 - optional version - optional maxFee                                                                                                |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/account/interface.ts:248](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L248)

---

### signMessage

▸ `Abstract` **signMessage**(`typedData`): `Promise`<[`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)\>

Sign an JSON object for off-chain usage with the starknet private key and return the signature
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name        | Type                                                |
| :---------- | :-------------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md) |

#### Returns

`Promise`<[`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)\>

the signature of the JSON object

#### Defined in

[src/account/interface.ts:261](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L261)

---

### hashMessage

▸ `Abstract` **hashMessage**(`typedData`): `Promise`<`string`\>

Hash a JSON object with pederson hash and return the hash
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name        | Type                                                |
| :---------- | :-------------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md) |

#### Returns

`Promise`<`string`\>

the hash of the JSON object

#### Defined in

[src/account/interface.ts:271](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L271)

---

### verifyMessage

▸ `Abstract` **verifyMessage**(`typedData`, `signature`): `Promise`<`boolean`\>

Verify a signature of a JSON object

**`Throws`**

if the JSON object is not a valid JSON or the signature is not a valid signature

#### Parameters

| Name        | Type                                                             | Description                  |
| :---------- | :--------------------------------------------------------------- | :--------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md)              | JSON object to be verified   |
| `signature` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) | signature of the JSON object |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Defined in

[src/account/interface.ts:281](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L281)

---

### verifyMessageHash

▸ `Abstract` **verifyMessageHash**(`hash`, `signature`): `Promise`<`boolean`\>

Verify a signature of a given hash

**`Warning`**

This method is not recommended, use verifyMessage instead

**`Throws`**

if the signature is not a valid signature

#### Parameters

| Name        | Type                                                             | Description           |
| :---------- | :--------------------------------------------------------------- | :-------------------- |
| `hash`      | [`BigNumberish`](../namespaces/num.md#bignumberish)              | hash to be verified   |
| `signature` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) | signature of the hash |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Defined in

[src/account/interface.ts:292](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L292)

---

### getNonce

▸ `Abstract` **getNonce**(`blockIdentifier?`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets the nonce of the account with respect to a specific block

#### Parameters

| Name               | Type              | Description                                     |
| :----------------- | :---------------- | :---------------------------------------------- |
| `blockIdentifier?` | `BlockIdentifier` | optional blockIdentifier. Defaults to 'pending' |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

nonce of the account

#### Defined in

[src/account/interface.ts:300](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L300)

---

### getSuggestedMaxFee

▸ `Abstract` **getSuggestedMaxFee**(`estimateFeeAction`, `details`): `Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

Gets Suggested Max Fee based on the transaction type

#### Parameters

| Name                | Type                                                        |
| :------------------ | :---------------------------------------------------------- |
| `estimateFeeAction` | [`EstimateFeeAction`](../modules.md#estimatefeeaction)      |
| `details`           | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md) |

#### Returns

`Promise`<[`BigNumberish`](../namespaces/num.md#bignumberish)\>

suggestedMaxFee

#### Defined in

[src/account/interface.ts:309](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L309)

---

### simulateTransaction

▸ `Abstract` **simulateTransaction**(`calls`, `estimateFeeDetails?`): `Promise`<[`TransactionSimulation`](../interfaces/TransactionSimulation.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                  | Type                                                                    | Description                                                                                                                                                                |
| :-------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)             | -                                                                                                                                                                          |

#### Returns

`Promise`<[`TransactionSimulation`](../interfaces/TransactionSimulation.md)\>

response from estimate_fee

#### Defined in

[src/account/interface.ts:324](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/account/interface.ts#L324)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getCode](ProviderInterface.md#getcode)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[invokeFunction](ProviderInterface.md#invokefunction)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateFee](ProviderInterface.md#getestimatefee)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/interface.ts:326](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/interface.ts#L326)
