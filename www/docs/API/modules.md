---
id: 'modules'
title: 'Starknet.js API - v5.1.0'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Contract](classes/Contract.md)
- [ContractInterface](classes/ContractInterface.md)
- [ContractFactory](classes/ContractFactory.md)
- [Provider](classes/Provider.md)
- [LibraryError](classes/LibraryError.md)
- [GatewayError](classes/GatewayError.md)
- [HttpError](classes/HttpError.md)
- [SequencerProvider](classes/SequencerProvider.md)
- [ProviderInterface](classes/ProviderInterface.md)
- [RpcProvider](classes/RpcProvider.md)
- [Account](classes/Account.md)
- [AccountInterface](classes/AccountInterface.md)
- [SignerInterface](classes/SignerInterface.md)
- [Signer](classes/Signer.md)

## Namespaces

- [constants](namespaces/constants.md)
- [encode](namespaces/encode.md)
- [hash](namespaces/hash.md)
- [json](namespaces/json.md)
- [num](namespaces/num.md)
- [transaction](namespaces/transaction.md)
- [stark](namespaces/stark.md)
- [merkle](namespaces/merkle.md)
- [uint256](namespaces/uint256.md)
- [shortString](namespaces/shortString.md)
- [typedData](namespaces/typedData.md)
- [ec](namespaces/ec.md)
- [Sequencer](namespaces/Sequencer.md)
- [RPC](namespaces/RPC.md)

## Enumerations

- [TransactionStatus](enums/TransactionStatus.md)
- [TransactionType](enums/TransactionType.md)

## Interfaces

- [ContractClass](interfaces/ContractClass.md)
- [Program](interfaces/Program.md)
- [InvocationsSignerDetails](interfaces/InvocationsSignerDetails.md)
- [DeclareSignerDetails](interfaces/DeclareSignerDetails.md)
- [EstimateFee](interfaces/EstimateFee.md)
- [EstimateFeeDetails](interfaces/EstimateFeeDetails.md)
- [DeployContractResponse](interfaces/DeployContractResponse.md)
- [TransactionSimulation](interfaces/TransactionSimulation.md)
- [GetBlockResponse](interfaces/GetBlockResponse.md)
- [GetCodeResponse](interfaces/GetCodeResponse.md)
- [CommonTransactionResponse](interfaces/CommonTransactionResponse.md)
- [InvokeTransactionResponse](interfaces/InvokeTransactionResponse.md)
- [ContractEntryPoint](interfaces/ContractEntryPoint.md)
- [DeclareTransactionResponse](interfaces/DeclareTransactionResponse.md)
- [CommonTransactionReceiptResponse](interfaces/CommonTransactionReceiptResponse.md)
- [MessageToL1](interfaces/MessageToL1.md)
- [Event](interfaces/Event.md)
- [MessageToL2](interfaces/MessageToL2.md)
- [InvokeTransactionReceiptResponse](interfaces/InvokeTransactionReceiptResponse.md)
- [EstimateFeeResponse](interfaces/EstimateFeeResponse.md)
- [InvokeFunctionResponse](interfaces/InvokeFunctionResponse.md)
- [DeclareContractResponse](interfaces/DeclareContractResponse.md)
- [TransactionSimulationResponse](interfaces/TransactionSimulationResponse.md)
- [StateUpdateResponse](interfaces/StateUpdateResponse.md)
- [ProviderOptions](interfaces/ProviderOptions.md)

## Type Aliases

### CallOptions

Ƭ **CallOptions**: `Object`

#### Type declaration

| Name               | Type               |
| :----------------- | :----------------- |
| `blockIdentifier?` | `BlockIdentifier`  |
| `parseRequest`     | `Boolean`          |
| `parseResponse`    | `Boolean`          |
| `formatResponse?`  | `Object` \| `null` |

#### Defined in

[src/contract/interface.ts:13](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L13)

---

### Calldata

Ƭ **Calldata**: `string`[]

#### Defined in

[src/types/api/index.ts:4](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/index.ts#L4)

---

### Overrides

Ƭ **Overrides**: `Object`

#### Type declaration

| Name           | Type                                             |
| :------------- | :----------------------------------------------- |
| `maxFee?`      | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `nonce?`       | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `signature?`   | [`Signature`](modules.md#signature)              |
| `parseRequest` | `Boolean`                                        |

#### Defined in

[src/types/api/index.ts:6](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/index.ts#L6)

---

### Signature

Ƭ **Signature**: [`SignatureType`](interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

[src/types/lib.ts:8](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L8)

---

### RawCalldata

Ƭ **RawCalldata**: [`BigNumberish`](namespaces/num.md#bignumberish)[]

#### Defined in

[src/types/lib.ts:10](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L10)

---

### AllowArray

Ƭ **AllowArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib.ts:11](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L11)

---

### RawArgs

Ƭ **RawArgs**: { `[inputName: string]`: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`BigNumberish`](namespaces/num.md#bignumberish)[] \| { `[k: string]`: [`BigNumberish`](namespaces/num.md#bignumberish); `type`: `"struct"` }; } \| [`BigNumberish`](namespaces/num.md#bignumberish)[]

#### Defined in

[src/types/lib.ts:12](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L12)

---

### UniversalDeployerContractPayload

Ƭ **UniversalDeployerContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                             |
| :--------------------- | :----------------------------------------------- |
| `classHash`            | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `salt?`                | `string`                                         |
| `unique?`              | `boolean`                                        |
| `constructorCalldata?` | [`RawArgs`](modules.md#rawargs)                  |

#### Defined in

[src/types/lib.ts:27](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L27)

---

### DeployContractPayload

Ƭ **DeployContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                                          |
| :--------------------- | :------------------------------------------------------------ |
| `contract`             | [`CompiledContract`](modules.md#compiledcontract) \| `string` |
| `constructorCalldata?` | [`RawCalldata`](modules.md#rawcalldata)                       |
| `addressSalt?`         | `string`                                                      |

#### Defined in

[src/types/lib.ts:34](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L34)

---

### DeployAccountContractPayload

Ƭ **DeployAccountContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                             |
| :--------------------- | :----------------------------------------------- |
| `classHash`            | `string`                                         |
| `constructorCalldata?` | [`RawCalldata`](modules.md#rawcalldata)          |
| `addressSalt?`         | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `contractAddress?`     | `string`                                         |

#### Defined in

[src/types/lib.ts:40](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L40)

---

### DeployAccountContractTransaction

Ƭ **DeployAccountContractTransaction**: `Omit`<[`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload), `"contractAddress"`\> & { `signature?`: [`Signature`](modules.md#signature) }

#### Defined in

[src/types/lib.ts:47](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L47)

---

### DeclareContractPayload

Ƭ **DeclareContractPayload**: `Object`

#### Type declaration

| Name         | Type                                                          |
| :----------- | :------------------------------------------------------------ |
| `contract`   | [`CompiledContract`](modules.md#compiledcontract) \| `string` |
| `classHash?` | `string`                                                      |

#### Defined in

[src/types/lib.ts:54](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L54)

---

### DeclareAndDeployContractPayload

Ƭ **DeclareAndDeployContractPayload**: `Omit`<[`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload), `"classHash"`\> & [`DeclareContractPayload`](modules.md#declarecontractpayload)

#### Defined in

[src/types/lib.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L59)

---

### DeclareContractTransaction

Ƭ **DeclareContractTransaction**: `Object`

#### Type declaration

| Name                 | Type                                           |
| :------------------- | :--------------------------------------------- |
| `contractDefinition` | [`ContractClass`](interfaces/ContractClass.md) |
| `senderAddress`      | `string`                                       |
| `signature?`         | [`Signature`](modules.md#signature)            |

#### Defined in

[src/types/lib.ts:62](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L62)

---

### CallDetails

Ƭ **CallDetails**: `Object`

#### Type declaration

| Name              | Type                                    |
| :---------------- | :-------------------------------------- |
| `contractAddress` | `string`                                |
| `calldata?`       | [`RawCalldata`](modules.md#rawcalldata) |

#### Defined in

[src/types/lib.ts:68](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L68)

---

### Invocation

Ƭ **Invocation**: [`CallDetails`](modules.md#calldetails) & { `signature?`: [`Signature`](modules.md#signature) }

#### Defined in

[src/types/lib.ts:73](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L73)

---

### Call

Ƭ **Call**: [`CallDetails`](modules.md#calldetails) & { `entrypoint`: `string` }

#### Defined in

[src/types/lib.ts:75](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L75)

---

### InvocationsDetails

Ƭ **InvocationsDetails**: `Object`

#### Type declaration

| Name       | Type                                             |
| :--------- | :----------------------------------------------- |
| `nonce?`   | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `maxFee?`  | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `version?` | [`BigNumberish`](namespaces/num.md#bignumberish) |

#### Defined in

[src/types/lib.ts:77](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L77)

---

### InvocationsDetailsWithNonce

Ƭ **InvocationsDetailsWithNonce**: [`InvocationsDetails`](modules.md#invocationsdetails) & { `nonce`: [`BigNumberish`](namespaces/num.md#bignumberish) }

#### Defined in

[src/types/lib.ts:83](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L83)

---

### TransactionBulk

Ƭ **TransactionBulk**: ({ `type`: `"DECLARE"` } & { `payload`: [`DeclareContractPayload`](modules.md#declarecontractpayload) } \| { `type`: `"DEPLOY"` } & { `payload`: [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload)[] } \| { `type`: `"DEPLOY_ACCOUNT"` } & { `payload`: [`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload) } \| { `type`: `"INVOKE_FUNCTION"` } & { `payload`: [`AllowArray`](modules.md#allowarray)<[`Call`](modules.md#call)\> })[]

#### Defined in

[src/types/lib.ts:93](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L93)

---

### InvocationBulk

Ƭ **InvocationBulk**: { `type`: `"DECLARE"` } & [`DeclareContractTransaction`](modules.md#declarecontracttransaction) \| { `type`: `"DEPLOY_ACCOUNT"` } & [`DeployAccountContractTransaction`](modules.md#deployaccountcontracttransaction) \| { `type`: `"INVOKE_FUNCTION"` } & [`Invocation`](modules.md#invocation) & [`InvocationsDetailsWithNonce`](modules.md#invocationsdetailswithnonce) & { `blockIdentifier`: [`BlockNumber`](modules.md#blocknumber) \| [`BigNumberish`](namespaces/num.md#bignumberish) }[]

#### Defined in

[src/types/lib.ts:102](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L102)

---

### Status

Ƭ **Status**: `"NOT_RECEIVED"` \| `"RECEIVED"` \| `"PENDING"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

[src/types/lib.ts:111](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L111)

---

### EntryPointType

Ƭ **EntryPointType**: `"EXTERNAL"`

#### Defined in

[src/types/lib.ts:126](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L126)

---

### CompressedProgram

Ƭ **CompressedProgram**: `string`

#### Defined in

[src/types/lib.ts:127](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L127)

---

### AbiEntry

Ƭ **AbiEntry**: `Object`

#### Type declaration

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `string`                          |
| `type` | `"felt"` \| `"felt*"` \| `string` |

#### Defined in

[src/types/lib.ts:129](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L129)

---

### Tupled

Ƭ **Tupled**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `element` | `any`    |
| `type`    | `string` |

#### Defined in

[src/types/lib.ts:130](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L130)

---

### FunctionAbi

Ƭ **FunctionAbi**: `Object`

#### Type declaration

| Name               | Type                                |
| :----------------- | :---------------------------------- |
| `inputs`           | [`AbiEntry`](modules.md#abientry)[] |
| `name`             | `string`                            |
| `outputs`          | [`AbiEntry`](modules.md#abientry)[] |
| `stateMutability?` | `"view"`                            |
| `type`             | `FunctionAbiType`                   |

#### Defined in

[src/types/lib.ts:132](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L132)

---

### abiStructs

Ƭ **abiStructs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](modules.md#structabi)

#### Defined in

[src/types/lib.ts:146](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L146)

---

### StructAbi

Ƭ **StructAbi**: `Object`

#### Type declaration

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `members` | [`AbiEntry`](modules.md#abientry) & { `offset`: `number` }[] |
| `name`    | `string`                                                     |
| `size`    | `number`                                                     |
| `type`    | `"struct"`                                                   |

#### Defined in

[src/types/lib.ts:148](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L148)

---

### Abi

Ƭ **Abi**: ([`FunctionAbi`](modules.md#functionabi) \| `EventAbi` \| [`StructAbi`](modules.md#structabi))[]

#### Defined in

[src/types/lib.ts:155](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L155)

---

### ContractEntryPointFields

Ƭ **ContractEntryPointFields**: `Object`

#### Type declaration

| Name       | Type     |
| :--------- | :------- |
| `selector` | `string` |
| `offset`   | `string` |

#### Defined in

[src/types/lib.ts:159](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L159)

---

### EntryPointsByType

Ƭ **EntryPointsByType**: `Object`

#### Type declaration

| Name          | Type                                                                |
| :------------ | :------------------------------------------------------------------ |
| `CONSTRUCTOR` | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |
| `EXTERNAL`    | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |
| `L1_HANDLER`  | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |

#### Defined in

[src/types/lib.ts:164](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L164)

---

### BlockTag

Ƭ **BlockTag**: `"pending"` \| `"latest"`

#### Defined in

[src/types/lib.ts:174](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L174)

---

### BlockNumber

Ƭ **BlockNumber**: [`BlockTag`](modules.md#blocktag) \| `null` \| `number`

#### Defined in

[src/types/lib.ts:175](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L175)

---

### CompiledContract

Ƭ **CompiledContract**: `Object`

#### Type declaration

| Name                   | Type                                                |
| :--------------------- | :-------------------------------------------------- |
| `abi`                  | [`Abi`](modules.md#abi)                             |
| `entry_points_by_type` | [`EntryPointsByType`](modules.md#entrypointsbytype) |
| `program`              | [`Program`](interfaces/Program.md)                  |

#### Defined in

[src/types/lib.ts:177](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L177)

---

### CompressedCompiledContract

Ƭ **CompressedCompiledContract**: `Omit`<[`CompiledContract`](modules.md#compiledcontract), `"program"`\> & { `program`: [`CompressedProgram`](modules.md#compressedprogram) }

#### Defined in

[src/types/lib.ts:183](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L183)

---

### Struct

Ƭ **Struct**: `Object`

#### Index signature

▪ [k: `string`]: [`BigNumberish`](namespaces/num.md#bignumberish)

#### Type declaration

| Name   | Type       |
| :----- | :--------- |
| `type` | `"struct"` |

#### Defined in

[src/types/lib.ts:187](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L187)

---

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [inputName: `string`]: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`BigNumberish`](namespaces/num.md#bignumberish)[] \| [`ParsedStruct`](modules.md#parsedstruct) \| [`ParsedStruct`](modules.md#parsedstruct)[]

#### Defined in

[src/types/lib.ts:191](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L191)

---

### ParsedStruct

Ƭ **ParsedStruct**: `Object`

#### Index signature

▪ [key: `string`]: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`ParsedStruct`](modules.md#parsedstruct)

#### Defined in

[src/types/lib.ts:194](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L194)

---

### waitForTransactionOptions

Ƭ **waitForTransactionOptions**: `Object`

#### Type declaration

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `retryInterval?` | `number`                                            |
| `successStates?` | [`TransactionStatus`](enums/TransactionStatus.md)[] |

#### Defined in

[src/types/lib.ts:198](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/lib.ts#L198)

---

### DeployAccountSignerDetails

Ƭ **DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload)\> & `Required`<[`InvocationsDetails`](modules.md#invocationsdetails)\> & { `contractAddress`: [`BigNumberish`](namespaces/num.md#bignumberish) ; `chainId`: [`StarknetChainId`](enums/constants.StarknetChainId.md) }

#### Defined in

[src/types/signer.ts:19](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/signer.ts#L19)

---

### AsyncContractFunction

Ƭ **AsyncContractFunction**<`T`\>: (...`args`: `any`[]) => `Promise`<`T`\>

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |

#### Type declaration

▸ (`...args`): `Promise`<`T`\>

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`Promise`<`T`\>

#### Defined in

[src/types/contract.ts:1](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/contract.ts#L1)

---

### ContractFunction

Ƭ **ContractFunction**: (...`args`: `any`[]) => `any`

#### Type declaration

▸ (`...args`): `any`

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[src/types/contract.ts:2](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/contract.ts#L2)

---

### EstimateFeeBulk

Ƭ **EstimateFeeBulk**: [`EstimateFee`](interfaces/EstimateFee.md)[]

#### Defined in

[src/types/account.ts:13](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/account.ts#L13)

---

### MultiDeployContractResponse

Ƭ **MultiDeployContractResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`[] |
| `transaction_hash` | `string`   |

#### Defined in

[src/types/account.ts:25](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/account.ts#L25)

---

### DeployContractUDCResponse

Ƭ **DeployContractUDCResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`   |
| `transaction_hash` | `string`   |
| `address`          | `string`   |
| `deployer`         | `string`   |
| `unique`           | `string`   |
| `classHash`        | `string`   |
| `calldata_len`     | `string`   |
| `calldata`         | `string`[] |
| `salt`             | `string`   |

#### Defined in

[src/types/account.ts:30](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/account.ts#L30)

---

### DeclareDeployUDCResponse

Ƭ **DeclareDeployUDCResponse**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                     |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declare` | { `class_hash`: [`BigNumberish`](namespaces/num.md#bignumberish) } & [`DeclareTransactionReceiptResponse`](modules.md#declaretransactionreceiptresponse) |
| `deploy`  | [`DeployContractUDCResponse`](modules.md#deploycontractudcresponse)                                                                                      |

#### Defined in

[src/types/account.ts:42](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/account.ts#L42)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`InvokeTransactionResponse`](interfaces/InvokeTransactionResponse.md) & [`DeclareTransactionResponse`](interfaces/DeclareTransactionResponse.md)

#### Defined in

[src/types/provider.ts:43](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L43)

---

### GetTransactionReceiptResponse

Ƭ **GetTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](interfaces/InvokeTransactionReceiptResponse.md) \| [`DeclareTransactionReceiptResponse`](modules.md#declaretransactionreceiptresponse)

#### Defined in

[src/types/provider.ts:69](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L69)

---

### DeclareTransactionReceiptResponse

Ƭ **DeclareTransactionReceiptResponse**: [`CommonTransactionReceiptResponse`](interfaces/CommonTransactionReceiptResponse.md)

#### Defined in

[src/types/provider.ts:103](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L103)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/provider.ts:120](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L120)

---

### EstimateFeeAction

Ƭ **EstimateFeeAction**: { `type`: [`INVOKE`](enums/TransactionType.md#invoke) ; `payload`: [`AllowArray`](modules.md#allowarray)<[`Call`](modules.md#call)\> } \| { `type`: [`DECLARE`](enums/TransactionType.md#declare) ; `payload`: [`DeclareContractPayload`](modules.md#declarecontractpayload) } \| { `type`: [`DEPLOY_ACCOUNT`](enums/TransactionType.md#deploy_account) ; `payload`: [`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload) } \| { `type`: [`DEPLOY`](enums/TransactionType.md#deploy) ; `payload`: [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload) }

#### Defined in

[src/types/provider.ts:124](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L124)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`EstimateFeeResponse`](interfaces/EstimateFeeResponse.md)[]

#### Defined in

[src/types/provider.ts:142](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/provider.ts#L142)

---

### GetTransactionStatusResponse

Ƭ **GetTransactionStatusResponse**: `Object`

#### Type declaration

| Name                              | Type                                              |
| :-------------------------------- | :------------------------------------------------ |
| `tx_status`                       | [`TransactionStatus`](enums/TransactionStatus.md) |
| `block_hash?`                     | `string`                                          |
| `tx_failure_reason?`              | { `code`: `string` ; `error_message`: `string` }  |
| `tx_failure_reason.code`          | `string`                                          |
| `tx_failure_reason.error_message` | `string`                                          |

#### Defined in

[src/types/api/sequencer.ts:14](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L14)

---

### GetContractAddressesResponse

Ƭ **GetContractAddressesResponse**: `Object`

#### Type declaration

| Name                   | Type     |
| :--------------------- | :------- |
| `Starknet`             | `string` |
| `GpsStatementVerifier` | `string` |

#### Defined in

[src/types/api/sequencer.ts:23](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L23)

---

### FunctionInvocation

Ƭ **FunctionInvocation**: `Object`

#### Type declaration

| Name                  | Type                                                    |
| :-------------------- | :------------------------------------------------------ |
| `caller_address`      | `string`                                                |
| `contract_address`    | `string`                                                |
| `calldata`            | [`RawCalldata`](modules.md#rawcalldata)                 |
| `call_type?`          | `string`                                                |
| `class_hash?`         | `string`                                                |
| `selector?`           | `string`                                                |
| `entry_point_type?`   | [`EntryPointType`](modules.md#entrypointtype)           |
| `result`              | `any`[]                                                 |
| `execution_resources` | [`ExecutionResources`](modules.md#executionresources)   |
| `internal_calls`      | [`FunctionInvocation`](modules.md#functioninvocation)[] |
| `events`              | `any`[]                                                 |
| `messages`            | `any`[]                                                 |

#### Defined in

[src/types/api/sequencer.ts:28](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L28)

---

### ExecutionResources

Ƭ **ExecutionResources**: `Object`

#### Type declaration

| Name                                           | Type                                                                                                                                                                                   |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `n_steps`                                      | `number`                                                                                                                                                                               |
| `builtin_instance_counter`                     | { `pedersen_builtin`: `number` ; `range_check_builtin`: `number` ; `bitwise_builtin`: `number` ; `output_builtin`: `number` ; `ecdsa_builtin`: `number` ; `ec_op_builtin?`: `number` } |
| `builtin_instance_counter.pedersen_builtin`    | `number`                                                                                                                                                                               |
| `builtin_instance_counter.range_check_builtin` | `number`                                                                                                                                                                               |
| `builtin_instance_counter.bitwise_builtin`     | `number`                                                                                                                                                                               |
| `builtin_instance_counter.output_builtin`      | `number`                                                                                                                                                                               |
| `builtin_instance_counter.ecdsa_builtin`       | `number`                                                                                                                                                                               |
| `builtin_instance_counter.ec_op_builtin?`      | `number`                                                                                                                                                                               |
| `n_memory_holes`                               | `number`                                                                                                                                                                               |

#### Defined in

[src/types/api/sequencer.ts:43](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L43)

---

### TransactionTraceResponse

Ƭ **TransactionTraceResponse**: `Object`

#### Type declaration

| Name                       | Type                                                  |
| :------------------------- | :---------------------------------------------------- |
| `validate_invocation?`     | [`FunctionInvocation`](modules.md#functioninvocation) |
| `function_invocation?`     | [`FunctionInvocation`](modules.md#functioninvocation) |
| `fee_transfer_invocation?` | [`FunctionInvocation`](modules.md#functioninvocation) |
| `signature`                | `string`[]                                            |

#### Defined in

[src/types/api/sequencer.ts:56](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L56)

---

### CallL1Handler

Ƭ **CallL1Handler**: `Object`

#### Type declaration

| Name                   | Type       |
| :--------------------- | :--------- |
| `from_address`         | `string`   |
| `to_address`           | `string`   |
| `entry_point_selector` | `string`   |
| `payload`              | `string`[] |

#### Defined in

[src/types/api/sequencer.ts:63](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L63)

---

### StateDiffItem

Ƭ **StateDiffItem**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `string` |

#### Defined in

[src/types/api/sequencer.ts:70](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L70)

---

### StorageDiffItem

Ƭ **StorageDiffItem**: `Object`

#### Type declaration

| Name              | Type                         |
| :---------------- | :--------------------------- |
| `address`         | `string`                     |
| `storage_entries` | [key: string, value: string] |

#### Defined in

[src/types/api/sequencer.ts:75](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L75)

---

### DeployedContractItem

Ƭ **DeployedContractItem**: `Object`

#### Type declaration

| Name         | Type     |
| :----------- | :------- |
| `address`    | `string` |
| `class_hash` | `string` |

#### Defined in

[src/types/api/sequencer.ts:80](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L80)

---

### Nonces

Ƭ **Nonces**: `Object`

#### Type declaration

| Name               | Type     |
| :----------------- | :------- |
| `contract_address` | `string` |
| `nonce`            | `string` |

#### Defined in

[src/types/api/sequencer.ts:85](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L85)

---

### SequencerIdentifier

Ƭ **SequencerIdentifier**: { `blockHash`: `string` } \| { `blockNumber`: [`BlockNumber`](modules.md#blocknumber) }

#### Defined in

[src/types/api/sequencer.ts:90](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L90)

---

### SequencerHttpMethod

Ƭ **SequencerHttpMethod**: `"POST"` \| `"GET"`

#### Defined in

[src/provider/sequencer.ts:53](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L53)

---

### SequencerProviderOptions

Ƭ **SequencerProviderOptions**: { `headers?`: `Record`<`string`, `string`\> ; `blockIdentifier?`: `BlockIdentifier` } & { `network`: [`NetworkName`](enums/constants.NetworkName.md) \| [`StarknetChainId`](enums/constants.StarknetChainId.md) ; `chainId?`: [`StarknetChainId`](enums/constants.StarknetChainId.md) } \| { `baseUrl`: `string` ; `feederGatewayUrl?`: `string` ; `gatewayUrl?`: `string` ; `chainId?`: [`StarknetChainId`](enums/constants.StarknetChainId.md) }

#### Defined in

[src/provider/sequencer.ts:55](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/sequencer.ts#L55)

---

### RpcProviderOptions

Ƭ **RpcProviderOptions**: `Object`

#### Type declaration

| Name               | Type              |
| :----------------- | :---------------- |
| `nodeUrl`          | `string`          |
| `retries?`         | `number`          |
| `headers?`         | `object`          |
| `blockIdentifier?` | `BlockIdentifier` |

#### Defined in

[src/provider/rpc.ts:35](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/rpc.ts#L35)

## Variables

### number

• `Const` **number**: [`num`](namespaces/num.md) = `num`

**`Deprecated`**

prefer the 'num' naming

#### Defined in

[src/index.ts:35](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/index.ts#L35)

---

### defaultProvider

• `Const` **defaultProvider**: [`Provider`](classes/Provider.md)

#### Defined in

[src/provider/index.ts:9](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/provider/index.ts#L9)

## Functions

### addAddressPadding

▸ **addAddressPadding**(`address`): `string`

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `address` | [`BigNumberish`](namespaces/num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/address.ts:9](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/address.ts#L9)

---

### validateAndParseAddress

▸ **validateAndParseAddress**(`address`): `string`

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `address` | [`BigNumberish`](namespaces/num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/address.ts:13](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/address.ts#L13)

---

### getChecksumAddress

▸ **getChecksumAddress**(`address`): `string`

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `address` | [`BigNumberish`](namespaces/num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/address.ts:26](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/address.ts#L26)

---

### validateChecksumAddress

▸ **validateChecksumAddress**(`address`): `boolean`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/address.ts:42](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/address.ts#L42)

---

### isUrl

▸ **isUrl**(`s?`): `boolean`

Loosely validate a URL `string`.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `s?` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/url.ts:22](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/url.ts#L22)

---

### buildUrl

▸ **buildUrl**(`baseUrl`, `defaultPath`, `urlOrPath?`): `string`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `baseUrl`     | `string` |
| `defaultPath` | `string` |
| `urlOrPath?`  | `string` |

#### Returns

`string`

#### Defined in

[src/utils/url.ts:51](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/url.ts#L51)
