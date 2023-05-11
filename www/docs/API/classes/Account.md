---
id: 'Account'
title: 'Class: Account'
sidebar_label: 'Account'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Provider`](Provider.md)

  ↳ **`Account`**

## Implements

- [`AccountInterface`](AccountInterface.md)

## Constructors

### constructor

• **new Account**(`providerOrOptions`, `address`, `pkOrSigner`, `cairoVersion?`)

#### Parameters

| Name                | Type                                                                                                 | Default value |
| :------------------ | :--------------------------------------------------------------------------------------------------- | :------------ |
| `providerOrOptions` | [`ProviderInterface`](ProviderInterface.md) \| [`ProviderOptions`](../interfaces/ProviderOptions.md) | `undefined`   |
| `address`           | `string`                                                                                             | `undefined`   |
| `pkOrSigner`        | `string` \| `Uint8Array` \| [`SignerInterface`](SignerInterface.md)                                  | `undefined`   |
| `cairoVersion`      | [`CairoVersion`](../modules.md#cairoversion)                                                         | `'0'`         |

#### Overrides

[Provider](Provider.md).[constructor](Provider.md#constructor)

#### Defined in

[src/account/default.ts:61](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L61)

## Properties

### signer

• **signer**: [`SignerInterface`](SignerInterface.md)

#### Implementation of

[AccountInterface](AccountInterface.md).[signer](AccountInterface.md#signer)

#### Defined in

[src/account/default.ts:55](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L55)

---

### address

• **address**: `string`

#### Implementation of

[AccountInterface](AccountInterface.md).[address](AccountInterface.md#address)

#### Defined in

[src/account/default.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L57)

---

### cairoVersion

• **cairoVersion**: [`CairoVersion`](../modules.md#cairoversion)

#### Implementation of

[AccountInterface](AccountInterface.md).[cairoVersion](AccountInterface.md#cairoversion)

#### Defined in

[src/account/default.ts:59](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L59)

---

### deploySelf

• **deploySelf**: (`__namedParameters`: [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload), `transactionsDetail`: [`InvocationsDetails`](../modules.md#invocationsdetails)) => `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Type declaration

▸ (`«destructured»`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

##### Parameters

| Name                 | Type                                                                         |
| :------------------- | :--------------------------------------------------------------------------- |
| `«destructured»`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) |
| `transactionsDetail` | [`InvocationsDetails`](../modules.md#invocationsdetails)                     |

##### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Defined in

[src/account/default.ts:463](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L463)

## Methods

### getNonce

▸ **getNonce**(`blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of the account with respect to a specific block

#### Parameters

| Name               | Type              | Description                                     |
| :----------------- | :---------------- | :---------------------------------------------- |
| `blockIdentifier?` | `BlockIdentifier` | optional blockIdentifier. Defaults to 'pending' |

#### Returns

`Promise`<`string`\>

nonce of the account

#### Implementation of

[AccountInterface](AccountInterface.md).[getNonce](AccountInterface.md#getnonce)

#### Defined in

[src/account/default.ts:77](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L77)

---

### estimateFee

▸ **estimateFee**(`calls`, `estimateFeeDetails?`): `Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

#### Parameters

| Name                  | Type                                                                    |
| :-------------------- | :---------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)             |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

#### Defined in

[src/account/default.ts:81](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L81)

---

### estimateInvokeFee

▸ **estimateInvokeFee**(`calls`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

Estimate Fee for executing an INVOKE transaction on starknet

#### Parameters

| Name             | Type                                                                    | Description                                                                                                                                                                |
| :--------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`          | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)             | -                                                                                                                                                                          |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateInvokeFee](AccountInterface.md#estimateinvokefee)

#### Defined in

[src/account/default.ts:88](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L88)

---

### estimateDeclareFee

▸ **estimateDeclareFee**(`«destructured»`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

Estimate Fee for executing a DECLARE transaction on starknet

#### Parameters

| Name             | Type                                                             | Description                                                                                                                                                                         |
| :--------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | the payload object containing: - contract - the compiled contract to be declared - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)      | -                                                                                                                                                                                   |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeclareFee](AccountInterface.md#estimatedeclarefee)

#### Defined in

[src/account/default.ts:122](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L122)

---

### estimateAccountDeployFee

▸ **estimateAccountDeployFee**(`«destructured»`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet

#### Parameters

| Name             | Type                                                                         | Description                                                                                                                                        |
| :--------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | contract - the compiled contract to be deployed - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)                  | optional blockIdentifier - constant nonce = 0                                                                                                      |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateAccountDeployFee](AccountInterface.md#estimateaccountdeployfee)

#### Defined in

[src/account/default.ts:156](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L156)

---

### estimateDeployFee

▸ **estimateDeployFee**(`payload`, `transactionsDetail?`): `Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

Estimate Fee for executing a UDC DEPLOY transaction on starknet
This is different from the normal DEPLOY transaction as it goes through the Universal Deployer Contract (UDC)

#### Parameters

| Name                  | Type                                                                                                                                                                           | Description                                                                                                                                                      |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`             | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | containing - classHash: computed class hash of compiled contract - salt: address salt - unique: bool if true ensure unique salt - calldata: constructor calldata |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                             |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/EstimateFee.md)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeployFee](AccountInterface.md#estimatedeployfee)

#### Defined in

[src/account/default.ts:195](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L195)

---

### estimateFeeBulk

▸ **estimateFeeBulk**(`transactions`, `«destructured»?`): `Promise`<[`EstimateFeeBulk`](../modules.md#estimatefeebulk)\>

Estimate Fee for executing a list of transactions on starknet
Contract must be deployed for fee estimation to be possible

#### Parameters

| Name             | Type                                                        | Description                                                                                                                                                                           |
| :--------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `transactions`   | [`TransactionBulk`](../modules.md#transactionbulk)          | array of transaction object containing : - type - the type of transaction : 'DECLARE' \| 'DEPLOY' \| 'INVOKE_FUNCTION' \| 'DEPLOY_ACCOUNT' - payload - the payload of the transaction |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md) | -                                                                                                                                                                                     |

#### Returns

`Promise`<[`EstimateFeeBulk`](../modules.md#estimatefeebulk)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateFeeBulk](AccountInterface.md#estimatefeebulk)

#### Defined in

[src/account/default.ts:203](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L203)

---

### buildInvocation

▸ **buildInvocation**(`call`, `signerDetails`): `Promise`<[`Invocation`](../modules.md#invocation)\>

#### Parameters

| Name            | Type                                                                    |
| :-------------- | :---------------------------------------------------------------------- |
| `call`          | [`Call`](../modules.md#call)[]                                          |
| `signerDetails` | [`InvocationsSignerDetails`](../interfaces/InvocationsSignerDetails.md) |

#### Returns

`Promise`<[`Invocation`](../modules.md#invocation)\>

#### Defined in

[src/account/default.ts:281](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L281)

---

### execute

▸ **execute**(`calls`, `abis?`, `transactionsDetail?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invoke execute function in account contract

#### Parameters

| Name                 | Type                                                                    | Default value | Description                                                                                                                                                                                                                                  |
| :------------------- | :---------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`              | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | `undefined`   | the invocation object or an array of them, containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `abis`               | `undefined` \| [`Abi`](../modules.md#abi)[]                             | `undefined`   | -                                                                                                                                                                                                                                            |
| `transactionsDetail` | [`InvocationsDetails`](../modules.md#invocationsdetails)                | `{}`          | -                                                                                                                                                                                                                                            |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

response from addTransaction

#### Implementation of

[AccountInterface](AccountInterface.md).[execute](AccountInterface.md#execute)

#### Defined in

[src/account/default.ts:295](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L295)

---

### declareIfNot

▸ **declareIfNot**(`payload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

First check if contract is already declared, if not declare it
If contract already declared returned transaction_hash is ''.
Method will pass even if contract is already declared

#### Parameters

| Name                 | Type                                                             | Description                        |
| :------------------- | :--------------------------------------------------------------- | :--------------------------------- |
| `payload`            | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | DeclareContractPayload             |
| `transactionsDetail` | [`InvocationsDetails`](../modules.md#invocationsdetails)         | (optional) InvocationsDetails = {} |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

DeclareContractResponse

#### Defined in

[src/account/default.ts:342](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L342)

---

### declare

▸ **declare**(`payload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name                 | Type                                                             | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`            | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | transaction payload to be deployed containing: - contract: compiled contract code - (optional) classHash: computed class hash of compiled contract. Pre-compute it for faster execution. - (required for Cairo1 without compiledClassHash) casm: CompiledContract \| string; - (optional for Cairo1 with casm) compiledClassHash: compiled class hash from casm. Pre-compute it for faster execution. |
| `transactionsDetail` | [`InvocationsDetails`](../modules.md#invocationsdetails)         | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                                                                                                                                                                                                                                                                  |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[declare](AccountInterface.md#declare)

#### Defined in

[src/account/default.ts:358](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L358)

---

### deploy

▸ **deploy**(`payload`, `details?`): `Promise`<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[deploy](AccountInterface.md#deploy)

#### Defined in

[src/account/default.ts:387](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L387)

---

### deployContract

▸ **deployContract**(`payload`, `details?`): `Promise`<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[deployContract](AccountInterface.md#deploycontract)

#### Defined in

[src/account/default.ts:433](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L433)

---

### declareAndDeploy

▸ **declareAndDeploy**(`payload`, `details?`): `Promise`<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

Declares and Deploy a given compiled contract (json) to starknet using UDC
Internal wait for L2 transaction, do not support multicall
Method will pass even if contract is already declared (internal using DeclareIfNot)

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

#### Implementation of

[AccountInterface](AccountInterface.md).[declareAndDeploy](AccountInterface.md#declareanddeploy)

#### Defined in

[src/account/default.ts:444](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L444)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploy the account on Starknet

#### Parameters

| Name                 | Type                                                                         | Description                                                                                                                                                                             |
| :------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | transaction payload to be deployed containing: - classHash: computed class hash of compiled contract - optional constructor calldata - optional address salt - optional contractAddress |
| `transactionsDetail` | [`InvocationsDetails`](../modules.md#invocationsdetails)                     | Invocation Details containing: - constant nonce = 0 - optional version - optional maxFee                                                                                                |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[deployAccount](AccountInterface.md#deployaccount)

#### Defined in

[src/account/default.ts:465](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L465)

---

### signMessage

▸ **signMessage**(`typedData`): `Promise`<[`Signature`](../modules.md#signature)\>

Sign an JSON object for off-chain usage with the starknet private key and return the signature
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name        | Type                                                |
| :---------- | :-------------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md) |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the JSON object

#### Implementation of

[AccountInterface](AccountInterface.md).[signMessage](AccountInterface.md#signmessage)

#### Defined in

[src/account/default.ts:519](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L519)

---

### hashMessage

▸ **hashMessage**(`typedData`): `Promise`<`string`\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[hashMessage](AccountInterface.md#hashmessage)

#### Defined in

[src/account/default.ts:523](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L523)

---

### verifyMessageHash

▸ **verifyMessageHash**(`hash`, `signature`): `Promise`<`boolean`\>

Verify a signature of a given hash

**`Warning`**

This method is not recommended, use verifyMessage instead

**`Throws`**

if the signature is not a valid signature

#### Parameters

| Name        | Type                                                | Description           |
| :---------- | :-------------------------------------------------- | :-------------------- |
| `hash`      | [`BigNumberish`](../namespaces/num.md#bignumberish) | hash to be verified   |
| `signature` | [`Signature`](../modules.md#signature)              | signature of the hash |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Implementation of

[AccountInterface](AccountInterface.md).[verifyMessageHash](AccountInterface.md#verifymessagehash)

#### Defined in

[src/account/default.ts:527](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L527)

---

### verifyMessage

▸ **verifyMessage**(`typedData`, `signature`): `Promise`<`boolean`\>

Verify a signature of a JSON object

**`Throws`**

if the JSON object is not a valid JSON or the signature is not a valid signature

#### Parameters

| Name        | Type                                                | Description                  |
| :---------- | :-------------------------------------------------- | :--------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md) | JSON object to be verified   |
| `signature` | [`Signature`](../modules.md#signature)              | signature of the JSON object |

#### Returns

`Promise`<`boolean`\>

true if the signature is valid, false otherwise

#### Implementation of

[AccountInterface](AccountInterface.md).[verifyMessage](AccountInterface.md#verifymessage)

#### Defined in

[src/account/default.ts:543](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L543)

---

### getSuggestedMaxFee

▸ **getSuggestedMaxFee**(`«destructured»`, `details`): `Promise`<`bigint`\>

Gets Suggested Max Fee based on the transaction type

#### Parameters

| Name             | Type                                                        |
| :--------------- | :---------------------------------------------------------- |
| `«destructured»` | [`EstimateFeeAction`](../modules.md#estimatefeeaction)      |
| `details`        | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md) |

#### Returns

`Promise`<`bigint`\>

suggestedMaxFee

#### Implementation of

[AccountInterface](AccountInterface.md).[getSuggestedMaxFee](AccountInterface.md#getsuggestedmaxfee)

#### Defined in

[src/account/default.ts:548](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L548)

---

### buildDeclarePayload

▸ **buildDeclarePayload**(`payload`, `«destructured»`): `Promise`<[`DeclareContractTransaction`](../modules.md#declarecontracttransaction)\>

will be renamed to buildDeclareContractTransaction

#### Parameters

| Name             | Type                                                                    |
| :--------------- | :---------------------------------------------------------------------- |
| `payload`        | [`DeclareContractPayload`](../modules.md#declarecontractpayload)        |
| `«destructured»` | [`InvocationsSignerDetails`](../interfaces/InvocationsSignerDetails.md) |

#### Returns

`Promise`<[`DeclareContractTransaction`](../modules.md#declarecontracttransaction)\>

#### Defined in

[src/account/default.ts:582](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L582)

---

### buildAccountDeployPayload

▸ **buildAccountDeployPayload**(`«destructured»`, `«destructured»`): `Promise`<[`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction)\>

#### Parameters

| Name             | Type                                                                         |
| :--------------- | :--------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) |
| `«destructured»` | [`InvocationsSignerDetails`](../interfaces/InvocationsSignerDetails.md)      |

#### Returns

`Promise`<[`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction)\>

#### Defined in

[src/account/default.ts:606](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L606)

---

### buildUDCContractPayload

▸ **buildUDCContractPayload**(`payload`): [`Call`](../modules.md#call)[]

#### Parameters

| Name      | Type                                                                                                                                                                           |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] |

#### Returns

[`Call`](../modules.md#call)[]

#### Defined in

[src/account/default.ts:639](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L639)

---

### simulateTransaction

▸ **simulateTransaction**(`calls`, `«destructured»?`): `Promise`<[`TransactionSimulation`](../interfaces/TransactionSimulation.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name             | Type                                                                    | Description                                                                                                                                                                |
| :--------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`          | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/EstimateFeeDetails.md)             | -                                                                                                                                                                          |

#### Returns

`Promise`<[`TransactionSimulation`](../interfaces/TransactionSimulation.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[simulateTransaction](AccountInterface.md#simulatetransaction)

#### Defined in

[src/account/default.ts:666](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L666)

---

### getStarkName

▸ **getStarkName**(`address?`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                |
| :-------------------- | :-------------------------------------------------- |
| `address`             | [`BigNumberish`](../namespaces/num.md#bignumberish) |
| `StarknetIdContract?` | `string`                                            |

#### Returns

`Promise`<`string`\>

#### Overrides

[Provider](Provider.md).[getStarkName](Provider.md#getstarkname)

#### Defined in

[src/account/default.ts:703](https://github.com/0xs34n/starknet.js/blob/develop/src/account/default.ts#L703)

---

### getChainId

▸ **getChainId**(): `Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

Gets the Starknet chain Id

#### Returns

`Promise`<[`StarknetChainId`](../enums/constants.StarknetChainId.md)\>

the chain Id

#### Implementation of

[AccountInterface](AccountInterface.md).[getChainId](AccountInterface.md#getchainid)

#### Inherited from

[Provider](Provider.md).[getChainId](Provider.md#getchainid)

#### Defined in

[src/provider/default.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L64)

---

### getBlock

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

Gets the block information

#### Parameters

| Name              | Type              | Description      |
| :---------------- | :---------------- | :--------------- |
| `blockIdentifier` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`GetBlockResponse`](../interfaces/GetBlockResponse.md)\>

the block object

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

#### Defined in

[src/provider/default.ts:68](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L68)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClass`](../modules.md#contractclass) \| `CONTRACT_CLASS`\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`ContractClass`](../modules.md#contractclass) \| `CONTRACT_CLASS`\>

Contract class of compiled contract

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassAt](AccountInterface.md#getclassat)

#### Inherited from

[Provider](Provider.md).[getClassAt](Provider.md#getclassat)

#### Defined in

[src/provider/default.ts:72](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L72)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the class hash deployed under the given address.

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassHashAt](AccountInterface.md#getclasshashat)

#### Inherited from

[Provider](Provider.md).[getClassHashAt](Provider.md#getclasshashat)

#### Defined in

[src/provider/default.ts:79](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L79)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`ContractClass`](../modules.md#contractclass) \| `CONTRACT_CLASS`\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `classHash` | `string` | class hash  |

#### Returns

`Promise`<[`ContractClass`](../modules.md#contractclass) \| `CONTRACT_CLASS`\>

Contract class of compiled contract

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassByHash](AccountInterface.md#getclassbyhash)

#### Inherited from

[Provider](Provider.md).[getClassByHash](Provider.md#getclassbyhash)

#### Defined in

[src/provider/default.ts:86](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L86)

---

### getEstimateFee

▸ **getEstimateFee**(`invocationWithTxType`, `invocationDetails`, `blockIdentifier`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

**`Deprecated`**

Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class

#### Parameters

| Name                   | Type                                                                       | Description                                                                                                                                                                                                             |
| :--------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationWithTxType` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails`    | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier`      | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getEstimateFee](AccountInterface.md#getestimatefee)

#### Inherited from

[Provider](Provider.md).[getEstimateFee](Provider.md#getestimatefee)

#### Defined in

[src/provider/default.ts:90](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L90)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocationWithTxType`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name                   | Type                                                                       | Description                                                                                                                                                                                                             |
| :--------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationWithTxType` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails`    | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier?`     | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`        | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getInvokeEstimateFee](AccountInterface.md#getinvokeestimatefee)

#### Inherited from

[Provider](Provider.md).[getInvokeEstimateFee](Provider.md#getinvokeestimatefee)

#### Defined in

[src/provider/default.ts:98](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L98)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `blockIdentifier?`): `Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name               | Type                                             | Description                                                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations`      | [`InvocationBulk`](../modules.md#invocationbulk) | the array of invocation and invocation details object containing: - contractAddress - the address of the account - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature - nonce - optional nonce - version - optional version |
| `blockIdentifier?` | `BlockIdentifier`                                | block identifier                                                                                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../modules.md#estimatefeeresponsebulk)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getEstimateFeeBulk](AccountInterface.md#getestimatefeebulk)

#### Inherited from

[Provider](Provider.md).[getEstimateFeeBulk](Provider.md#getestimatefeebulk)

#### Defined in

[src/provider/default.ts:112](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L112)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of a contract with respect to a specific block

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `contractAddress`  | `string`          | contract address |
| `blockIdentifier?` | `BlockIdentifier` | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Implementation of

[AccountInterface](AccountInterface.md).[getNonceForAddress](AccountInterface.md#getnonceforaddress)

#### Inherited from

[Provider](Provider.md).[getNonceForAddress](Provider.md#getnonceforaddress)

#### Defined in

[src/provider/default.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L119)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Gets the contract's storage variable at a specific key.

#### Parameters

| Name               | Type                                                | Description                                                |
| :----------------- | :-------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | `string`                                            |                                                            |
| `key`              | [`BigNumberish`](../namespaces/num.md#bignumberish) | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | `BlockIdentifier`                                   | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Implementation of

[AccountInterface](AccountInterface.md).[getStorageAt](AccountInterface.md#getstorageat)

#### Inherited from

[Provider](Provider.md).[getStorageAt](Provider.md#getstorageat)

#### Defined in

[src/provider/default.ts:126](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L126)

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

[AccountInterface](AccountInterface.md).[getTransaction](AccountInterface.md#gettransaction)

#### Inherited from

[Provider](Provider.md).[getTransaction](Provider.md#gettransaction)

#### Defined in

[src/provider/default.ts:134](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L134)

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

[AccountInterface](AccountInterface.md).[getTransactionReceipt](AccountInterface.md#gettransactionreceipt)

#### Inherited from

[Provider](Provider.md).[getTransactionReceipt](Provider.md#gettransactionreceipt)

#### Defined in

[src/provider/default.ts:138](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L138)

---

### callContract

▸ **callContract**(`request`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                         | Description              |
| :----------------- | :--------------------------- | :----------------------- |
| `request`          | [`Call`](../modules.md#call) | transaction to be called |
| `blockIdentifier?` | `BlockIdentifier`            | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Implementation of

[AccountInterface](AccountInterface.md).[callContract](AccountInterface.md#callcontract)

#### Inherited from

[Provider](Provider.md).[callContract](Provider.md#callcontract)

#### Defined in

[src/provider/default.ts:142](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L142)

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

[AccountInterface](AccountInterface.md).[invokeFunction](AccountInterface.md#invokefunction)

#### Inherited from

[Provider](Provider.md).[invokeFunction](Provider.md#invokefunction)

#### Defined in

[src/provider/default.ts:149](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L149)

---

### deployAccountContract

▸ **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                                 | Description                                                                                       |
| :-------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[deployAccountContract](AccountInterface.md#deployaccountcontract)

#### Inherited from

[Provider](Provider.md).[deployAccountContract](Provider.md#deployaccountcontract)

#### Defined in

[src/provider/default.ts:156](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L156)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                       | Description                                                                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[declareContract](AccountInterface.md#declarecontract)

#### Inherited from

[Provider](Provider.md).[declareContract](Provider.md#declarecontract)

#### Defined in

[src/provider/default.ts:163](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L163)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getDeclareEstimateFee](AccountInterface.md#getdeclareestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeclareEstimateFee](Provider.md#getdeclareestimatefee)

#### Defined in

[src/provider/default.ts:170](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L170)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                 | Description                                                                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | `BlockIdentifier`                                                                    | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                            | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getDeployAccountEstimateFee](AccountInterface.md#getdeployaccountestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeployAccountEstimateFee](Provider.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/default.ts:179](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L179)

---

### getCode

▸ **getCode**(`contractAddress`, `blockIdentifier?`): `Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

**`Deprecated`**

The method should not be used

#### Parameters

| Name               | Type              |
| :----------------- | :---------------- |
| `contractAddress`  | `string`          |
| `blockIdentifier?` | `BlockIdentifier` |

#### Returns

`Promise`<[`GetCodeResponse`](../interfaces/GetCodeResponse.md)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getCode](AccountInterface.md#getcode)

#### Inherited from

[Provider](Provider.md).[getCode](Provider.md#getcode)

#### Defined in

[src/provider/default.ts:193](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L193)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description                                                                                                  |
| :--------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../namespaces/num.md#bignumberish)                    | transaction hash                                                                                             |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Implementation of

[AccountInterface](AccountInterface.md).[waitForTransaction](AccountInterface.md#waitfortransaction)

#### Inherited from

[Provider](Provider.md).[waitForTransaction](Provider.md#waitfortransaction)

#### Defined in

[src/provider/default.ts:200](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L200)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocation`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name                | Type                                                                       | Description                                                                                                                                                                                                             |
| :------------------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | -                                                                                                                                                                                                                       |
| `blockIdentifier?`  | `BlockIdentifier`                                                          | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`     | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`TransactionSimulationResponse`](../interfaces/TransactionSimulationResponse.md)\>

the transaction trace and estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getSimulateTransaction](AccountInterface.md#getsimulatetransaction)

#### Inherited from

[Provider](Provider.md).[getSimulateTransaction](Provider.md#getsimulatetransaction)

#### Defined in

[src/provider/default.ts:207](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L207)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

Gets the state changes in a specific block

#### Parameters

| Name               | Type              | Description      |
| :----------------- | :---------------- | :--------------- |
| `blockIdentifier?` | `BlockIdentifier` | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../interfaces/StateUpdateResponse.md)\>

StateUpdateResponse

#### Implementation of

[AccountInterface](AccountInterface.md).[getStateUpdate](AccountInterface.md#getstateupdate)

#### Inherited from

[Provider](Provider.md).[getStateUpdate](Provider.md#getstateupdate)

#### Defined in

[src/provider/default.ts:221](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L221)

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

#### Inherited from

[Provider](Provider.md).[getAddressFromStarkName](Provider.md#getaddressfromstarkname)

#### Defined in

[src/provider/default.ts:229](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/default.ts#L229)
