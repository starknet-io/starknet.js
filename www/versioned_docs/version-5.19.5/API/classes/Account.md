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

| Name                | Type                                                                                                       | Default value |
| :------------------ | :--------------------------------------------------------------------------------------------------------- | :------------ |
| `providerOrOptions` | [`ProviderOptions`](../interfaces/types.ProviderOptions.md) \| [`ProviderInterface`](ProviderInterface.md) | `undefined`   |
| `address`           | `string`                                                                                                   | `undefined`   |
| `pkOrSigner`        | `string` \| `Uint8Array` \| [`SignerInterface`](SignerInterface.md)                                        | `undefined`   |
| `cairoVersion`      | [`CairoVersion`](../namespaces/types.md#cairoversion)                                                      | `'0'`         |

#### Overrides

[Provider](Provider.md).[constructor](Provider.md#constructor)

#### Defined in

[src/account/default.ts:70](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L70)

## Properties

### signer

• **signer**: [`SignerInterface`](SignerInterface.md)

#### Implementation of

[AccountInterface](AccountInterface.md).[signer](AccountInterface.md#signer)

#### Defined in

[src/account/default.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L64)

---

### address

• **address**: `string`

#### Implementation of

[AccountInterface](AccountInterface.md).[address](AccountInterface.md#address)

#### Defined in

[src/account/default.ts:66](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L66)

---

### cairoVersion

• **cairoVersion**: [`CairoVersion`](../namespaces/types.md#cairoversion)

#### Implementation of

[AccountInterface](AccountInterface.md).[cairoVersion](AccountInterface.md#cairoversion)

#### Defined in

[src/account/default.ts:68](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L68)

---

### deploySelf

• **deploySelf**: (`__namedParameters`: [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload), `transactionsDetail`: [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)) => `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

#### Type declaration

▸ (`«destructured»`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

##### Parameters

| Name                 | Type                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------ |
| `«destructured»`     | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) |
| `transactionsDetail` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                     |

##### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

#### Defined in

[src/account/default.ts:423](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L423)

## Methods

### getNonce

▸ **getNonce**(`blockIdentifier?`): `Promise`<`string`\>

Gets the nonce of the account with respect to a specific block

#### Parameters

| Name               | Type                                                        | Description                                     |
| :----------------- | :---------------------------------------------------------- | :---------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | optional blockIdentifier. Defaults to 'pending' |

#### Returns

`Promise`<`string`\>

nonce of the account

#### Implementation of

[AccountInterface](AccountInterface.md).[getNonce](AccountInterface.md#getnonce)

#### Defined in

[src/account/default.ts:86](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L86)

---

### getNonceSafe

▸ `Private` **getNonceSafe**(`nonce?`): `Promise`<`bigint`\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `nonce?` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/account/default.ts:90](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L90)

---

### estimateFee

▸ **estimateFee**(`calls`, `estimateFeeDetails?`): `Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

#### Parameters

| Name                  | Type                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../namespaces/types.md#allowarray)<[`Call`](../namespaces/types.md#call)\> |
| `estimateFeeDetails?` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)                         |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

#### Defined in

[src/account/default.ts:99](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L99)

---

### estimateInvokeFee

▸ **estimateInvokeFee**(`calls`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

Estimate Fee for executing an INVOKE transaction on starknet

#### Parameters

| Name             | Type                                                                                      | Description                                                                                                                                                                |
| :--------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`          | [`AllowArray`](../namespaces/types.md#allowarray)<[`Call`](../namespaces/types.md#call)\> | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)                         | -                                                                                                                                                                          |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateInvokeFee](AccountInterface.md#estimateinvokefee)

#### Defined in

[src/account/default.ts:106](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L106)

---

### estimateDeclareFee

▸ **estimateDeclareFee**(`«destructured»`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

Estimate Fee for executing a DECLARE transaction on starknet

#### Parameters

| Name             | Type                                                                      | Description                                                                                                                                                                         |
| :--------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload) | the payload object containing: - contract - the compiled contract to be declared - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)         | -                                                                                                                                                                                   |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeclareFee](AccountInterface.md#estimatedeclarefee)

#### Defined in

[src/account/default.ts:140](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L140)

---

### estimateAccountDeployFee

▸ **estimateAccountDeployFee**(`«destructured»`, `«destructured»?`): `Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet

#### Parameters

| Name             | Type                                                                                  | Description                                                                                                                                        |
| :--------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | contract - the compiled contract to be deployed - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli. |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md)                     | optional blockIdentifier - constant nonce = 0                                                                                                      |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateAccountDeployFee](AccountInterface.md#estimateaccountdeployfee)

#### Defined in

[src/account/default.ts:174](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L174)

---

### estimateDeployFee

▸ **estimateDeployFee**(`payload`, `transactionsDetail?`): `Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

Estimate Fee for executing a UDC DEPLOY transaction on starknet
This is different from the normal DEPLOY transaction as it goes through the Universal Deployer Contract (UDC)

#### Parameters

| Name                  | Type                                                                                                                                                                                             | Description                                                                                                                                                      |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`             | [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload)[] | containing - classHash: computed class hash of compiled contract - salt: address salt - unique: bool if true ensure unique salt - calldata: constructor calldata |
| `transactionsDetail?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                                                                                                                                | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                             |

#### Returns

`Promise`<[`EstimateFee`](../interfaces/types.EstimateFee.md)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeployFee](AccountInterface.md#estimatedeployfee)

#### Defined in

[src/account/default.ts:213](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L213)

---

### estimateFeeBulk

▸ **estimateFeeBulk**(`invocations`, `«destructured»?`): `Promise`<[`EstimateFeeBulk`](../namespaces/types.md#estimatefeebulk)\>

Estimate Fee for executing a list of transactions on starknet
Contract must be deployed for fee estimation to be possible

#### Parameters

| Name             | Type                                                              |
| :--------------- | :---------------------------------------------------------------- |
| `invocations`    | [`Invocations`](../namespaces/types.md#invocations)               |
| `«destructured»` | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md) |

#### Returns

`Promise`<[`EstimateFeeBulk`](../namespaces/types.md#estimatefeebulk)\>

response from estimate_fee

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateFeeBulk](AccountInterface.md#estimatefeebulk)

#### Defined in

[src/account/default.ts:221](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L221)

---

### buildInvocation

▸ **buildInvocation**(`call`, `signerDetails`): `Promise`<[`Invocation`](../namespaces/types.md#invocation)\>

#### Parameters

| Name            | Type                                                                          |
| :-------------- | :---------------------------------------------------------------------------- |
| `call`          | [`Call`](../namespaces/types.md#call)[]                                       |
| `signerDetails` | [`InvocationsSignerDetails`](../interfaces/types.InvocationsSignerDetails.md) |

#### Returns

`Promise`<[`Invocation`](../namespaces/types.md#invocation)\>

#### Defined in

[src/account/default.ts:245](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L245)

---

### execute

▸ **execute**(`calls`, `abis?`, `transactionsDetail?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invoke execute function in account contract

#### Parameters

| Name                 | Type                                                                                      | Default value | Description                                                                                                                                                                                                                                  |
| :------------------- | :---------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`              | [`AllowArray`](../namespaces/types.md#allowarray)<[`Call`](../namespaces/types.md#call)\> | `undefined`   | the invocation object or an array of them, containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `abis`               | `undefined` \| [`Abi`](../namespaces/types.md#abi)[]                                      | `undefined`   | -                                                                                                                                                                                                                                            |
| `transactionsDetail` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                         | `{}`          | -                                                                                                                                                                                                                                            |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

response from addTransaction

#### Implementation of

[AccountInterface](AccountInterface.md).[execute](AccountInterface.md#execute)

#### Defined in

[src/account/default.ts:259](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L259)

---

### declareIfNot

▸ **declareIfNot**(`payload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

First check if contract is already declared, if not declare it
If contract already declared returned transaction_hash is ''.
Method will pass even if contract is already declared

#### Parameters

| Name                 | Type                                                                      | Description                        |
| :------------------- | :------------------------------------------------------------------------ | :--------------------------------- |
| `payload`            | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload) | DeclareContractPayload             |
| `transactionsDetail` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)         | (optional) InvocationsDetails = {} |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

DeclareContractResponse

#### Defined in

[src/account/default.ts:306](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L306)

---

### declare

▸ **declare**(`payload`, `transactionsDetail?`): `Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name                 | Type                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`            | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload) | transaction payload to be deployed containing: - contract: compiled contract code - (optional) classHash: computed class hash of compiled contract. Pre-compute it for faster execution. - (required for Cairo1 without compiledClassHash) casm: CompiledContract \| string; - (optional for Cairo1 with casm) compiledClassHash: compiled class hash from casm. Pre-compute it for faster execution. |
| `transactionsDetail` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)         | Invocation Details containing: - optional nonce - optional version - optional maxFee                                                                                                                                                                                                                                                                                                                  |

#### Returns

`Promise`<[`DeclareContractResponse`](../interfaces/types.DeclareContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[declare](AccountInterface.md#declare)

#### Defined in

[src/account/default.ts:322](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L322)

---

### deploy

▸ **deploy**(`payload`, `details?`): `Promise`<[`MultiDeployContractResponse`](../namespaces/types.md#multideploycontractresponse)\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[deploy](AccountInterface.md#deploy)

#### Defined in

[src/account/default.ts:351](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L351)

---

### deployContract

▸ **deployContract**(`payload`, `details?`): `Promise`<[`DeployContractUDCResponse`](../namespaces/types.md#deploycontractudcresponse)\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[deployContract](AccountInterface.md#deploycontract)

#### Defined in

[src/account/default.ts:397](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L397)

---

### declareAndDeploy

▸ **declareAndDeploy**(`payload`, `details?`): `Promise`<[`DeclareDeployUDCResponse`](../namespaces/types.md#declaredeployudcresponse)\>

Declares and Deploy a given compiled contract (json) to starknet using UDC
Internal wait for L2 transaction, do not support multicall
Method will pass even if contract is already declared (internal using DeclareIfNot)

#### Parameters

| Name       | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`DeclareAndDeployContractPayload`](../namespaces/types.md#declareanddeploycontractpayload) | contract: compiled contract code - [casm=cairo1]: CairoAssembly \| undefined; - [compiledClassHash]: string \| undefined; - [classHash]: computed class hash of compiled contract - [constructorCalldata] contract constructor calldata - [salt=pseudorandom] deploy address salt - [unique=true] ensure unique salt |
| `details?` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                           | [nonce=getNonce] - [version=transactionVersion] - [maxFee=getSuggestedMaxFee]                                                                                                                                                                                                                                        |

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

#### Implementation of

[AccountInterface](AccountInterface.md).[declareAndDeploy](AccountInterface.md#declareanddeploy)

#### Defined in

[src/account/default.ts:406](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L406)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `transactionsDetail?`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploy the account on Starknet

#### Parameters

| Name                 | Type                                                                                  | Description                                                                                                                                                                             |
| :------------------- | :------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»`     | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | transaction payload to be deployed containing: - classHash: computed class hash of compiled contract - optional constructor calldata - optional address salt - optional contractAddress |
| `transactionsDetail` | [`InvocationsDetails`](../namespaces/types.md#invocationsdetails)                     | Invocation Details containing: - constant nonce = 0 - optional version - optional maxFee                                                                                                |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[deployAccount](AccountInterface.md#deployaccount)

#### Defined in

[src/account/default.ts:425](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L425)

---

### signMessage

▸ **signMessage**(`typedData`): `Promise`<[`Signature`](../namespaces/types.md#signature)\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[signMessage](AccountInterface.md#signmessage)

#### Defined in

[src/account/default.ts:479](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L479)

---

### hashMessage

▸ **hashMessage**(`typedData`): `Promise`<`string`\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[hashMessage](AccountInterface.md#hashmessage)

#### Defined in

[src/account/default.ts:483](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L483)

---

### verifyMessageHash

▸ **verifyMessageHash**(`hash`, `signature`): `Promise`<`boolean`\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[verifyMessageHash](AccountInterface.md#verifymessagehash)

#### Defined in

[src/account/default.ts:487](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L487)

---

### verifyMessage

▸ **verifyMessage**(`typedData`, `signature`): `Promise`<`boolean`\>

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

#### Implementation of

[AccountInterface](AccountInterface.md).[verifyMessage](AccountInterface.md#verifymessage)

#### Defined in

[src/account/default.ts:503](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L503)

---

### getSuggestedMaxFee

▸ **getSuggestedMaxFee**(`«destructured»`, `details`): `Promise`<`bigint`\>

Gets Suggested Max Fee based on the transaction type

#### Parameters

| Name             | Type                                                              |
| :--------------- | :---------------------------------------------------------------- |
| `«destructured»` | [`EstimateFeeAction`](../namespaces/types.md#estimatefeeaction)   |
| `details`        | [`EstimateFeeDetails`](../interfaces/types.EstimateFeeDetails.md) |

#### Returns

`Promise`<`bigint`\>

suggestedMaxFee

#### Implementation of

[AccountInterface](AccountInterface.md).[getSuggestedMaxFee](AccountInterface.md#getsuggestedmaxfee)

#### Defined in

[src/account/default.ts:508](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L508)

---

### buildDeclarePayload

▸ **buildDeclarePayload**(`payload`, `«destructured»`): `Promise`<[`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)\>

will be renamed to buildDeclareContractTransaction

#### Parameters

| Name             | Type                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| `payload`        | [`DeclareContractPayload`](../namespaces/types.md#declarecontractpayload)     |
| `«destructured»` | [`InvocationsSignerDetails`](../interfaces/types.InvocationsSignerDetails.md) |

#### Returns

`Promise`<[`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)\>

#### Defined in

[src/account/default.ts:542](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L542)

---

### buildAccountDeployPayload

▸ **buildAccountDeployPayload**(`«destructured»`, `«destructured»`): `Promise`<[`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction)\>

#### Parameters

| Name             | Type                                                                                  |
| :--------------- | :------------------------------------------------------------------------------------ |
| `«destructured»` | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) |
| `«destructured»` | [`InvocationsSignerDetails`](../interfaces/types.InvocationsSignerDetails.md)         |

#### Returns

`Promise`<[`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction)\>

#### Defined in

[src/account/default.ts:566](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L566)

---

### buildUDCContractPayload

▸ **buildUDCContractPayload**(`payload`): [`Call`](../namespaces/types.md#call)[]

#### Parameters

| Name      | Type                                                                                                                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../namespaces/types.md#universaldeployercontractpayload)[] |

#### Returns

[`Call`](../namespaces/types.md#call)[]

#### Defined in

[src/account/default.ts:599](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L599)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `«destructured»?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

Simulates an array of transaction and returns an array of transaction trace and estimated fee.

#### Parameters

| Name             | Type                                                                              | Description                                                                                                       |
| :--------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `invocations`    | [`Invocations`](../namespaces/types.md#invocations)                               | Invocations containing: - type - transaction type: DECLARE, (multi)DEPLOY, DEPLOY_ACCOUNT, (multi)INVOKE_FUNCTION |
| `«destructured»` | [`SimulateTransactionDetails`](../namespaces/types.md#simulatetransactiondetails) | SimulateTransactionDetails                                                                                        |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

response from simulate_transaction

#### Implementation of

[AccountInterface](AccountInterface.md).[simulateTransaction](AccountInterface.md#simulatetransaction)

#### Defined in

[src/account/default.ts:626](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L626)

---

### accountInvocationsFactory

▸ **accountInvocationsFactory**(`invocations`, `«destructured»`): `Promise`<[`AccountInvocations`](../namespaces/types.md#accountinvocations)\>

#### Parameters

| Name             | Type                                                                                          |
| :--------------- | :-------------------------------------------------------------------------------------------- |
| `invocations`    | [`Invocations`](../namespaces/types.md#invocations)                                           |
| `«destructured»` | [`AccountInvocationsFactoryDetails`](../namespaces/types.md#accountinvocationsfactorydetails) |

#### Returns

`Promise`<[`AccountInvocations`](../namespaces/types.md#accountinvocations)\>

#### Defined in

[src/account/default.ts:643](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L643)

---

### getStarkName

▸ **getStarkName**(`address?`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `address`             | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?` | `string`                                              |

#### Returns

`Promise`<`string`\>

#### Overrides

[Provider](Provider.md).[getStarkName](Provider.md#getstarkname)

#### Defined in

[src/account/default.ts:711](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/account/default.ts#L711)

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

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

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

[AccountInterface](AccountInterface.md).[getClassAt](AccountInterface.md#getclassat)

#### Inherited from

[Provider](Provider.md).[getClassAt](Provider.md#getclassat)

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

[AccountInterface](AccountInterface.md).[getClassHashAt](AccountInterface.md#getclasshashat)

#### Inherited from

[Provider](Provider.md).[getClassHashAt](Provider.md#getclasshashat)

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

[AccountInterface](AccountInterface.md).[getClassByHash](AccountInterface.md#getclassbyhash)

#### Inherited from

[Provider](Provider.md).[getClassByHash](Provider.md#getclassbyhash)

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

[AccountInterface](AccountInterface.md).[getEstimateFee](AccountInterface.md#getestimatefee)

#### Inherited from

[Provider](Provider.md).[getEstimateFee](Provider.md#getestimatefee)

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

[AccountInterface](AccountInterface.md).[getInvokeEstimateFee](AccountInterface.md#getinvokeestimatefee)

#### Inherited from

[Provider](Provider.md).[getInvokeEstimateFee](Provider.md#getinvokeestimatefee)

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

[AccountInterface](AccountInterface.md).[getEstimateFeeBulk](AccountInterface.md#getestimatefeebulk)

#### Inherited from

[Provider](Provider.md).[getEstimateFeeBulk](Provider.md#getestimatefeebulk)

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

[AccountInterface](AccountInterface.md).[getNonceForAddress](AccountInterface.md#getnonceforaddress)

#### Inherited from

[Provider](Provider.md).[getNonceForAddress](Provider.md#getnonceforaddress)

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

[AccountInterface](AccountInterface.md).[getStorageAt](AccountInterface.md#getstorageat)

#### Inherited from

[Provider](Provider.md).[getStorageAt](Provider.md#getstorageat)

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

[AccountInterface](AccountInterface.md).[getTransaction](AccountInterface.md#gettransaction)

#### Inherited from

[Provider](Provider.md).[getTransaction](Provider.md#gettransaction)

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

[AccountInterface](AccountInterface.md).[getTransactionReceipt](AccountInterface.md#gettransactionreceipt)

#### Inherited from

[Provider](Provider.md).[getTransactionReceipt](Provider.md#gettransactionreceipt)

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

[AccountInterface](AccountInterface.md).[callContract](AccountInterface.md#callcontract)

#### Inherited from

[Provider](Provider.md).[callContract](Provider.md#callcontract)

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

[AccountInterface](AccountInterface.md).[invokeFunction](AccountInterface.md#invokefunction)

#### Inherited from

[Provider](Provider.md).[invokeFunction](Provider.md#invokefunction)

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

[AccountInterface](AccountInterface.md).[deployAccountContract](AccountInterface.md#deployaccountcontract)

#### Inherited from

[Provider](Provider.md).[deployAccountContract](Provider.md#deployaccountcontract)

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

[AccountInterface](AccountInterface.md).[declareContract](AccountInterface.md#declarecontract)

#### Inherited from

[Provider](Provider.md).[declareContract](Provider.md#declarecontract)

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

[AccountInterface](AccountInterface.md).[getDeclareEstimateFee](AccountInterface.md#getdeclareestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeclareEstimateFee](Provider.md#getdeclareestimatefee)

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

[AccountInterface](AccountInterface.md).[getDeployAccountEstimateFee](AccountInterface.md#getdeployaccountestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeployAccountEstimateFee](Provider.md#getdeployaccountestimatefee)

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

[AccountInterface](AccountInterface.md).[getCode](AccountInterface.md#getcode)

#### Inherited from

[Provider](Provider.md).[getCode](Provider.md#getcode)

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

[AccountInterface](AccountInterface.md).[waitForTransaction](AccountInterface.md#waitfortransaction)

#### Inherited from

[Provider](Provider.md).[waitForTransaction](Provider.md#waitfortransaction)

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

[AccountInterface](AccountInterface.md).[getSimulateTransaction](AccountInterface.md#getsimulatetransaction)

#### Inherited from

[Provider](Provider.md).[getSimulateTransaction](Provider.md#getsimulatetransaction)

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

[AccountInterface](AccountInterface.md).[getStateUpdate](AccountInterface.md#getstateupdate)

#### Inherited from

[Provider](Provider.md).[getStateUpdate](Provider.md#getstateupdate)

#### Defined in

[src/provider/default.ts:213](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L213)

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

[src/provider/default.ts:221](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/provider/default.ts#L221)
