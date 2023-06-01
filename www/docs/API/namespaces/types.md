---
id: 'types'
title: 'Namespace: types'
sidebar_label: 'types'
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [Sequencer](types.Sequencer.md)
- [RPC](types.RPC.md)

## Enumerations

- [TransactionStatus](../enums/types.TransactionStatus.md)
- [TransactionType](../enums/types.TransactionType.md)
- [EntryPointType](../enums/types.EntryPointType.md)

## Interfaces

- [EstimateFee](../interfaces/types.EstimateFee.md)
- [EstimateFeeDetails](../interfaces/types.EstimateFeeDetails.md)
- [DeployContractResponse](../interfaces/types.DeployContractResponse.md)
- [TransactionSimulation](../interfaces/types.TransactionSimulation.md)
- [Uint256](../interfaces/types.Uint256.md)
- [CallStruct](../interfaces/types.CallStruct.md)
- [Program](../interfaces/types.Program.md)
- [ProviderOptions](../interfaces/types.ProviderOptions.md)
- [GetBlockResponse](../interfaces/types.GetBlockResponse.md)
- [GetCodeResponse](../interfaces/types.GetCodeResponse.md)
- [CommonTransactionResponse](../interfaces/types.CommonTransactionResponse.md)
- [InvokeTransactionResponse](../interfaces/types.InvokeTransactionResponse.md)
- [ContractEntryPoint](../interfaces/types.ContractEntryPoint.md)
- [DeclareTransactionResponse](../interfaces/types.DeclareTransactionResponse.md)
- [CommonTransactionReceiptResponse](../interfaces/types.CommonTransactionReceiptResponse.md)
- [MessageToL1](../interfaces/types.MessageToL1.md)
- [Event](../interfaces/types.Event.md)
- [MessageToL2](../interfaces/types.MessageToL2.md)
- [InvokeTransactionReceiptResponse](../interfaces/types.InvokeTransactionReceiptResponse.md)
- [EstimateFeeResponse](../interfaces/types.EstimateFeeResponse.md)
- [InvokeFunctionResponse](../interfaces/types.InvokeFunctionResponse.md)
- [DeclareContractResponse](../interfaces/types.DeclareContractResponse.md)
- [TransactionSimulationResponse](../interfaces/types.TransactionSimulationResponse.md)
- [StateUpdateResponse](../interfaces/types.StateUpdateResponse.md)
- [InvocationsSignerDetails](../interfaces/types.InvocationsSignerDetails.md)
- [DeclareSignerDetails](../interfaces/types.DeclareSignerDetails.md)
- [StarkNetDomain](../interfaces/types.StarkNetDomain.md)
- [TypedData](../interfaces/types.TypedData.md)

## Type Aliases

### EstimateFeeBulk

Ƭ **EstimateFeeBulk**: [`EstimateFee`](../interfaces/types.EstimateFee.md)[]

#### Defined in

[src/types/account.ts:12](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L12)

---

### MultiDeployContractResponse

Ƭ **MultiDeployContractResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`[] |
| `transaction_hash` | `string`   |

#### Defined in

[src/types/account.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L25)

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

[src/types/account.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L30)

---

### DeclareDeployUDCResponse

Ƭ **DeclareDeployUDCResponse**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                      |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declare` | { `class_hash`: [`BigNumberish`](types.md#bignumberish) } & `Partial`<[`DeclareTransactionReceiptResponse`](types.md#declaretransactionreceiptresponse)\> |
| `deploy`  | [`DeployContractUDCResponse`](types.md#deploycontractudcresponse)                                                                                         |

#### Defined in

[src/types/account.ts:42](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L42)

---

### AsyncContractFunction

Ƭ **AsyncContractFunction**<`T`\>: (...`args`: [`ArgsOrCalldataWithOptions`](types.md#argsorcalldatawithoptions)) => `Promise`<`T`\>

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |

#### Type declaration

▸ (`...args`): `Promise`<`T`\>

##### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `...args` | [`ArgsOrCalldataWithOptions`](types.md#argsorcalldatawithoptions) |

##### Returns

`Promise`<`T`\>

#### Defined in

[src/types/contract.ts:3](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L3)

---

### ContractFunction

Ƭ **ContractFunction**: (...`args`: [`ArgsOrCalldataWithOptions`](types.md#argsorcalldatawithoptions)) => `any`

#### Type declaration

▸ (`...args`): `any`

##### Parameters

| Name      | Type                                                              |
| :-------- | :---------------------------------------------------------------- |
| `...args` | [`ArgsOrCalldataWithOptions`](types.md#argsorcalldatawithoptions) |

##### Returns

`any`

#### Defined in

[src/types/contract.ts:4](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L4)

---

### Result

Ƭ **Result**: { `[key: string]`: `any`; } \| [`Result`](types.md#result)[] \| `bigint` \| `string` \| `boolean`

#### Defined in

[src/types/contract.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L5)

---

### Calldata

Ƭ **Calldata**: `string`[] & { `__compiled__?`: `boolean` }

Compiled calldata ready to be sent
decimal-string array

#### Defined in

[src/types/contract.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L18)

---

### ArgsOrCalldata

Ƭ **ArgsOrCalldata**: [`RawArgsArray`](types.md#rawargsarray) \| [[`Calldata`](types.md#calldata)] \| [`Calldata`](types.md#calldata)

#### Defined in

[src/types/contract.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L20)

---

### ArgsOrCalldataWithOptions

Ƭ **ArgsOrCalldataWithOptions**: [`ArgsOrCalldata`](types.md#argsorcalldata) & [`ContractOptions`](types.md#contractoptions)

#### Defined in

[src/types/contract.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L21)

---

### ContractOptions

Ƭ **ContractOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `parseRequest?`    | `boolean`                                     |
| `parseResponse?`   | `boolean`                                     |
| `formatResponse?`  | { `[key: string]`: `any`; }                   |
| `maxFee?`          | [`BigNumberish`](types.md#bignumberish)       |
| `nonce?`           | [`BigNumberish`](types.md#bignumberish)       |
| `signature?`       | [`Signature`](types.md#signature)             |
| `addressSalt?`     | `string`                                      |

#### Defined in

[src/types/contract.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L22)

---

### CallOptions

Ƭ **CallOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"blockIdentifier"` \| `"parseRequest"` \| `"parseResponse"` \| `"formatResponse"`\>

#### Defined in

[src/types/contract.ts:33](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L33)

---

### InvokeOptions

Ƭ **InvokeOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"maxFee"` \| `"nonce"` \| `"signature"` \| `"parseRequest"`\>

#### Defined in

[src/types/contract.ts:38](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L38)

---

### WeierstrassSignatureType

Ƭ **WeierstrassSignatureType**: [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

[src/types/lib/index.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L5)

---

### ArraySignatureType

Ƭ **ArraySignatureType**: `string`[]

#### Defined in

[src/types/lib/index.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L6)

---

### Signature

Ƭ **Signature**: [`ArraySignatureType`](types.md#arraysignaturetype) \| [`WeierstrassSignatureType`](types.md#weierstrasssignaturetype)

#### Defined in

[src/types/lib/index.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L7)

---

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[src/types/lib/index.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L9)

---

### RawCalldata

Ƭ **RawCalldata**: [`BigNumberish`](types.md#bignumberish)[]

BigNumberish array
use CallData.compile() to convert to Calldata

#### Defined in

[src/types/lib/index.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L25)

---

### HexCalldata

Ƭ **HexCalldata**: `string`[]

Hexadecimal-string array

#### Defined in

[src/types/lib/index.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L30)

---

### AllowArray

Ƭ **AllowArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L32)

---

### RawArgs

Ƭ **RawArgs**: [`RawArgsObject`](types.md#rawargsobject) \| [`RawArgsArray`](types.md#rawargsarray)

#### Defined in

[src/types/lib/index.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L34)

---

### RawArgsObject

Ƭ **RawArgsObject**: `Object`

#### Index signature

▪ [inputName: `string`]: [`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs)

#### Defined in

[src/types/lib/index.ts:36](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L36)

---

### RawArgsArray

Ƭ **RawArgsArray**: ([`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs))[]

#### Defined in

[src/types/lib/index.ts:40](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L40)

---

### MultiType

Ƭ **MultiType**: [`BigNumberish`](types.md#bignumberish) \| [`Uint256`](../interfaces/types.Uint256.md) \| `object` \| `boolean`

#### Defined in

[src/types/lib/index.ts:42](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L42)

---

### UniversalDeployerContractPayload

Ƭ **UniversalDeployerContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                    |
| :--------------------- | :-------------------------------------- |
| `classHash`            | [`BigNumberish`](types.md#bignumberish) |
| `salt?`                | `string`                                |
| `unique?`              | `boolean`                               |
| `constructorCalldata?` | [`RawArgs`](types.md#rawargs)           |

#### Defined in

[src/types/lib/index.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L44)

---

### DeployContractPayload

Ƭ **DeployContractPayload**: `Object`

**`Deprecated`**

deprecated due to no direct deploy, unused - can be removed

#### Type declaration

| Name                   | Type                                                        |
| :--------------------- | :---------------------------------------------------------- |
| `contract`             | [`CompiledContract`](types.md#compiledcontract) \| `string` |
| `constructorCalldata?` | [`RawCalldata`](types.md#rawcalldata)                       |
| `addressSalt?`         | `string`                                                    |

#### Defined in

[src/types/lib/index.ts:54](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L54)

---

### DeployAccountContractPayload

Ƭ **DeployAccountContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                    |
| :--------------------- | :-------------------------------------- |
| `classHash`            | `string`                                |
| `constructorCalldata?` | [`RawArgs`](types.md#rawargs)           |
| `addressSalt?`         | [`BigNumberish`](types.md#bignumberish) |
| `contractAddress?`     | `string`                                |

#### Defined in

[src/types/lib/index.ts:60](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L60)

---

### DeployAccountContractTransaction

Ƭ **DeployAccountContractTransaction**: `Omit`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload), `"contractAddress"`\> & { `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:67](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L67)

---

### DeclareContractPayload

Ƭ **DeclareContractPayload**: `Object`

#### Type declaration

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `contract`           | [`CompiledContract`](types.md#compiledcontract) \| `string` |
| `classHash?`         | `string`                                                    |
| `casm?`              | [`CompiledSierraCasm`](types.md#compiledsierracasm)         |
| `compiledClassHash?` | `string`                                                    |

#### Defined in

[src/types/lib/index.ts:74](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L74)

---

### CompleteDeclareContractPayload

Ƭ **CompleteDeclareContractPayload**: `Object`

#### Type declaration

| Name                 | Type                                                        |
| :------------------- | :---------------------------------------------------------- |
| `contract`           | [`CompiledContract`](types.md#compiledcontract) \| `string` |
| `classHash`          | `string`                                                    |
| `casm?`              | [`CompiledSierraCasm`](types.md#compiledsierracasm)         |
| `compiledClassHash?` | `string`                                                    |

#### Defined in

[src/types/lib/index.ts:81](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L81)

---

### DeclareAndDeployContractPayload

Ƭ **DeclareAndDeployContractPayload**: `Omit`<[`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload), `"classHash"`\> & [`DeclareContractPayload`](types.md#declarecontractpayload)

#### Defined in

[src/types/lib/index.ts:88](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L88)

---

### DeclareContractTransaction

Ƭ **DeclareContractTransaction**: `Object`

#### Type declaration

| Name                 | Type                                      |
| :------------------- | :---------------------------------------- |
| `contractDefinition` | [`ContractClass`](types.md#contractclass) |
| `senderAddress`      | `string`                                  |
| `signature?`         | [`Signature`](types.md#signature)         |
| `compiledClassHash?` | `string`                                  |

#### Defined in

[src/types/lib/index.ts:91](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L91)

---

### CallDetails

Ƭ **CallDetails**: `Object`

#### Type declaration

| Name              | Type                          |
| :---------------- | :---------------------------- |
| `contractAddress` | `string`                      |
| `calldata?`       | [`RawArgs`](types.md#rawargs) |

#### Defined in

[src/types/lib/index.ts:98](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L98)

---

### Invocation

Ƭ **Invocation**: [`CallDetails`](types.md#calldetails) & { `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:103](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L103)

---

### Call

Ƭ **Call**: [`CallDetails`](types.md#calldetails) & { `entrypoint`: `string` }

#### Defined in

[src/types/lib/index.ts:105](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L105)

---

### CairoVersion

Ƭ **CairoVersion**: `"0"` \| `"1"`

#### Defined in

[src/types/lib/index.ts:107](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L107)

---

### InvocationsDetails

Ƭ **InvocationsDetails**: `Object`

#### Type declaration

| Name       | Type                                    |
| :--------- | :-------------------------------------- |
| `nonce?`   | [`BigNumberish`](types.md#bignumberish) |
| `maxFee?`  | [`BigNumberish`](types.md#bignumberish) |
| `version?` | [`BigNumberish`](types.md#bignumberish) |

#### Defined in

[src/types/lib/index.ts:109](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L109)

---

### Details

Ƭ **Details**: `Object`

Contain all additional details params

#### Type declaration

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `nonce`   | [`BigNumberish`](types.md#bignumberish)                    |
| `maxFee`  | [`BigNumberish`](types.md#bignumberish)                    |
| `version` | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Defined in

[src/types/lib/index.ts:118](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L118)

---

### InvocationsDetailsWithNonce

Ƭ **InvocationsDetailsWithNonce**: [`InvocationsDetails`](types.md#invocationsdetails) & { `nonce`: [`BigNumberish`](types.md#bignumberish) }

#### Defined in

[src/types/lib/index.ts:125](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L125)

---

### TransactionBulk

Ƭ **TransactionBulk**: ({ `type`: `"DECLARE"` } & { `payload`: [`DeclareContractPayload`](types.md#declarecontractpayload) } \| { `type`: `"DEPLOY"` } & { `payload`: [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload)[] } \| { `type`: `"DEPLOY_ACCOUNT"` } & { `payload`: [`DeployAccountContractPayload`](types.md#deployaccountcontractpayload) } \| { `type`: `"INVOKE_FUNCTION"` } & { `payload`: [`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\> })[]

#### Defined in

[src/types/lib/index.ts:137](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L137)

---

### InvocationBulk

Ƭ **InvocationBulk**: { `type`: `"DECLARE"` } & [`DeclareContractTransaction`](types.md#declarecontracttransaction) \| { `type`: `"DEPLOY_ACCOUNT"` } & [`DeployAccountContractTransaction`](types.md#deployaccountcontracttransaction) \| { `type`: `"INVOKE_FUNCTION"` } & [`Invocation`](types.md#invocation) & [`InvocationsDetailsWithNonce`](types.md#invocationsdetailswithnonce) & { `blockIdentifier`: [`BlockNumber`](types.md#blocknumber) \| [`BigNumberish`](types.md#bignumberish) }[]

#### Defined in

[src/types/lib/index.ts:146](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L146)

---

### Status

Ƭ **Status**: `"NOT_RECEIVED"` \| `"RECEIVED"` \| `"PENDING"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

[src/types/lib/index.ts:155](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L155)

---

### Tupled

Ƭ **Tupled**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `element` | `any`    |
| `type`    | `string` |

#### Defined in

[src/types/lib/index.ts:170](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L170)

---

### BlockTag

Ƭ **BlockTag**: `"pending"` \| `"latest"`

#### Defined in

[src/types/lib/index.ts:172](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L172)

---

### BlockNumber

Ƭ **BlockNumber**: [`BlockTag`](types.md#blocktag) \| `null` \| `number`

#### Defined in

[src/types/lib/index.ts:173](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L173)

---

### BlockIdentifier

Ƭ **BlockIdentifier**: [`BlockNumber`](types.md#blocknumber) \| [`BigNumberish`](types.md#bignumberish)

#### Defined in

[src/types/lib/index.ts:177](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L177)

---

### Struct

Ƭ **Struct**: `Object`

#### Index signature

▪ [k: `string`]: [`BigNumberish`](types.md#bignumberish)

#### Type declaration

| Name   | Type       |
| :----- | :--------- |
| `type` | `"struct"` |

#### Defined in

[src/types/lib/index.ts:179](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L179)

---

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [inputName: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`BigNumberish`](types.md#bignumberish)[] \| [`ParsedStruct`](types.md#parsedstruct) \| [`ParsedStruct`](types.md#parsedstruct)[]

#### Defined in

[src/types/lib/index.ts:183](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L183)

---

### ParsedStruct

Ƭ **ParsedStruct**: `Object`

#### Index signature

▪ [key: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`ParsedStruct`](types.md#parsedstruct)

#### Defined in

[src/types/lib/index.ts:186](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L186)

---

### waitForTransactionOptions

Ƭ **waitForTransactionOptions**: `Object`

#### Type declaration

| Name             | Type                                                         |
| :--------------- | :----------------------------------------------------------- |
| `retryInterval?` | `number`                                                     |
| `successStates?` | [`TransactionStatus`](../enums/types.TransactionStatus.md)[] |

#### Defined in

[src/types/lib/index.ts:190](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L190)

---

### ContractClass

Ƭ **ContractClass**: [`LegacyContractClass`](types.md#legacycontractclass) \| [`SierraContractClass`](types.md#sierracontractclass)

#### Defined in

[src/types/lib/contract/index.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L5)

---

### CompiledContract

Ƭ **CompiledContract**: [`LegacyCompiledContract`](types.md#legacycompiledcontract) \| [`CompiledSierra`](types.md#compiledsierra)

#### Defined in

[src/types/lib/contract/index.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L6)

---

### CairoContract

Ƭ **CairoContract**: [`ContractClass`](types.md#contractclass) \| [`CompiledContract`](types.md#compiledcontract)

#### Defined in

[src/types/lib/contract/index.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L7)

---

### Abi

Ƭ **Abi**: ([`FunctionAbi`](types.md#functionabi) \| `EventAbi` \| [`StructAbi`](types.md#structabi))[]

ABI

#### Defined in

[src/types/lib/contract/abi.ts:2](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L2)

---

### AbiEntry

Ƭ **AbiEntry**: `Object`

#### Type declaration

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `string`                          |
| `type` | `"felt"` \| `"felt*"` \| `string` |

#### Defined in

[src/types/lib/contract/abi.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L5)

---

### FunctionAbi

Ƭ **FunctionAbi**: `Object`

#### Type declaration

| Name                | Type                              |
| :------------------ | :-------------------------------- |
| `inputs`            | [`AbiEntry`](types.md#abientry)[] |
| `name`              | `string`                          |
| `outputs`           | [`AbiEntry`](types.md#abientry)[] |
| `stateMutability?`  | `"view"`                          |
| `state_mutability?` | `string`                          |
| `type`              | `FunctionAbiType`                 |

#### Defined in

[src/types/lib/contract/abi.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L14)

---

### AbiStructs

Ƭ **AbiStructs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](types.md#structabi)

#### Defined in

[src/types/lib/contract/abi.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L23)

---

### StructAbi

Ƭ **StructAbi**: `Object`

#### Type declaration

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `members` | [`AbiEntry`](types.md#abientry) & { `offset`: `number` }[] |
| `name`    | `string`                                                   |
| `size`    | `number`                                                   |
| `type`    | `"struct"`                                                 |

#### Defined in

[src/types/lib/contract/abi.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L25)

---

### LegacyContractClass

Ƭ **LegacyContractClass**: `Object`

LEGACY CONTRACT

#### Type declaration

| Name                   | Type                                              |
| :--------------------- | :------------------------------------------------ |
| `program`              | [`CompressedProgram`](types.md#compressedprogram) |
| `entry_points_by_type` | [`EntryPointsByType`](types.md#entrypointsbytype) |
| `abi`                  | [`Abi`](types.md#abi)                             |

#### Defined in

[src/types/lib/contract/legacy.ts:4](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L4)

---

### LegacyCompiledContract

Ƭ **LegacyCompiledContract**: `Omit`<[`LegacyContractClass`](types.md#legacycontractclass), `"program"`\> & { `program`: [`Program`](../interfaces/types.Program.md) }

#### Defined in

[src/types/lib/contract/legacy.ts:10](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L10)

---

### Builtins

Ƭ **Builtins**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/legacy.ts:15](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L15)

---

### CompressedProgram

Ƭ **CompressedProgram**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L16)

---

### EntryPointsByType

Ƭ **EntryPointsByType**: `Object`

#### Type declaration

| Name          | Type                                                              |
| :------------ | :---------------------------------------------------------------- |
| `CONSTRUCTOR` | [`ContractEntryPointFields`](types.md#contractentrypointfields)[] |
| `EXTERNAL`    | [`ContractEntryPointFields`](types.md#contractentrypointfields)[] |
| `L1_HANDLER`  | [`ContractEntryPointFields`](types.md#contractentrypointfields)[] |

#### Defined in

[src/types/lib/contract/legacy.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L18)

---

### ContractEntryPointFields

Ƭ **ContractEntryPointFields**: `Object`

#### Type declaration

| Name        | Type                            |
| :---------- | :------------------------------ |
| `selector`  | `string`                        |
| `offset`    | `string`                        |
| `builtins?` | [`Builtins`](types.md#builtins) |

#### Defined in

[src/types/lib/contract/legacy.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L24)

---

### CairoAssembly

Ƭ **CairoAssembly**: `Object`

SYSTEM TYPES

#### Type declaration

| Name                   | Type                                              |
| :--------------------- | :------------------------------------------------ |
| `prime`                | `string`                                          |
| `compiler_version`     | `string`                                          |
| `bytecode`             | [`ByteCode`](types.md#bytecode)                   |
| `hints`                | `any`[]                                           |
| `pythonic_hints`       | [`PythonicHints`](types.md#pythonichints)         |
| `entry_points_by_type` | [`EntryPointsByType`](types.md#entrypointsbytype) |

#### Defined in

[src/types/lib/contract/sierra.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L5)

---

### SierraContractClass

Ƭ **SierraContractClass**: `Object`

#### Type declaration

| Name                        | Type                                                          |
| :-------------------------- | :------------------------------------------------------------ |
| `sierra_program`            | [`ByteCode`](types.md#bytecode)                               |
| `sierra_program_debug_info` | [`SierraProgramDebugInfo`](types.md#sierraprogramdebuginfo)   |
| `contract_class_version`    | `string`                                                      |
| `entry_points_by_type`      | [`SierraEntryPointsByType`](types.md#sierraentrypointsbytype) |
| `abi`                       | [`Abi`](types.md#abi)                                         |

#### Defined in

[src/types/lib/contract/sierra.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L14)

---

### CompiledSierra

Ƭ **CompiledSierra**: [`SierraContractClass`](types.md#sierracontractclass)

COMPILED CONTRACT

#### Defined in

[src/types/lib/contract/sierra.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L23)

---

### CompiledSierraCasm

Ƭ **CompiledSierraCasm**: [`CairoAssembly`](types.md#cairoassembly)

#### Defined in

[src/types/lib/contract/sierra.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L24)

---

### ByteCode

Ƭ **ByteCode**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/sierra.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L27)

---

### PythonicHints

Ƭ **PythonicHints**: [`number`, `string`[]][]

#### Defined in

[src/types/lib/contract/sierra.ts:28](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L28)

---

### SierraProgramDebugInfo

Ƭ **SierraProgramDebugInfo**: `Object`

#### Type declaration

| Name              | Type                   |
| :---------------- | :--------------------- |
| `type_names`      | [`number`, `string`][] |
| `libfunc_names`   | [`number`, `string`][] |
| `user_func_names` | [`number`, `string`][] |

#### Defined in

[src/types/lib/contract/sierra.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L30)

---

### SierraEntryPointsByType

Ƭ **SierraEntryPointsByType**: `Object`

#### Type declaration

| Name          | Type                                                                          |
| :------------ | :---------------------------------------------------------------------------- |
| `CONSTRUCTOR` | [`SierraContractEntryPointFields`](types.md#sierracontractentrypointfields)[] |
| `EXTERNAL`    | [`SierraContractEntryPointFields`](types.md#sierracontractentrypointfields)[] |
| `L1_HANDLER`  | [`SierraContractEntryPointFields`](types.md#sierracontractentrypointfields)[] |

#### Defined in

[src/types/lib/contract/sierra.ts:36](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L36)

---

### SierraContractEntryPointFields

Ƭ **SierraContractEntryPointFields**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `selector`     | `string` |
| `function_idx` | `number` |

#### Defined in

[src/types/lib/contract/sierra.ts:42](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L42)

---

### RpcProviderOptions

Ƭ **RpcProviderOptions**: `Object`

#### Type declaration

| Name               | Type                                                       |
| :----------------- | :--------------------------------------------------------- |
| `nodeUrl`          | `string`                                                   |
| `retries?`         | `number`                                                   |
| `headers?`         | `object`                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier)              |
| `chainId?`         | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Defined in

[src/types/provider/configuration.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/configuration.ts#L9)

---

### SequencerHttpMethod

Ƭ **SequencerHttpMethod**: `"POST"` \| `"GET"`

#### Defined in

[src/types/provider/configuration.ts:17](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/configuration.ts#L17)

---

### SequencerProviderOptions

Ƭ **SequencerProviderOptions**: { `headers?`: `Record`<`string`, `string`\> ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) ; `chainId?`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) } & { `network`: [`NetworkName`](../enums/constants.NetworkName.md) \| [`StarknetChainId`](../enums/constants.StarknetChainId.md) } \| { `baseUrl`: `string` ; `feederGatewayUrl?`: `string` ; `gatewayUrl?`: `string` }

#### Defined in

[src/types/provider/configuration.ts:19](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/configuration.ts#L19)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`InvokeTransactionResponse`](../interfaces/types.InvokeTransactionResponse.md) & [`DeclareTransactionResponse`](../interfaces/types.DeclareTransactionResponse.md)

#### Defined in

[src/types/provider/response.ts:40](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L40)

---

### GetTransactionReceiptResponse

Ƭ **GetTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](../interfaces/types.InvokeTransactionReceiptResponse.md) \| [`DeclareTransactionReceiptResponse`](types.md#declaretransactionreceiptresponse)

#### Defined in

[src/types/provider/response.ts:67](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L67)

---

### DeclareTransactionReceiptResponse

Ƭ **DeclareTransactionReceiptResponse**: [`CommonTransactionReceiptResponse`](../interfaces/types.CommonTransactionReceiptResponse.md)

#### Defined in

[src/types/provider/response.ts:101](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L101)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/provider/response.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L119)

---

### EstimateFeeAction

Ƭ **EstimateFeeAction**: { `type`: [`INVOKE`](../enums/types.TransactionType.md#invoke) ; `payload`: [`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\> } \| { `type`: [`DECLARE`](../enums/types.TransactionType.md#declare) ; `payload`: [`DeclareContractPayload`](types.md#declarecontractpayload) } \| { `type`: [`DEPLOY_ACCOUNT`](../enums/types.TransactionType.md#deploy_account) ; `payload`: [`DeployAccountContractPayload`](types.md#deployaccountcontractpayload) } \| { `type`: [`DEPLOY`](../enums/types.TransactionType.md#deploy) ; `payload`: [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload) }

#### Defined in

[src/types/provider/response.ts:123](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L123)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)[]

#### Defined in

[src/types/provider/response.ts:141](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L141)

---

### Storage

Ƭ **Storage**: [`Storage`](types.Sequencer.md#storage)

#### Defined in

[src/types/provider/response.ts:143](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L143)

---

### Nonce

Ƭ **Nonce**: [`Nonce`](types.Sequencer.md#nonce)

#### Defined in

[src/types/provider/response.ts:145](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider/response.ts#L145)

---

### DeployAccountSignerDetails

Ƭ **DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> & `Required`<[`InvocationsDetails`](types.md#invocationsdetails)\> & { `contractAddress`: [`BigNumberish`](types.md#bignumberish) ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) }

#### Defined in

[src/types/signer.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/types/signer.ts#L25)

---

### StarkNetMerkleType

Ƭ **StarkNetMerkleType**: `Object`

#### Type declaration

| Name       | Type           |
| :--------- | :------------- |
| `name`     | `string`       |
| `type`     | `"merkletree"` |
| `contains` | `string`       |

#### Defined in

[src/types/typedData.ts:1](https://github.com/0xs34n/starknet.js/blob/develop/src/types/typedData.ts#L1)

---

### StarkNetType

Ƭ **StarkNetType**: { `name`: `string` ; `type`: `string` } \| [`StarkNetMerkleType`](types.md#starknetmerkletype)

A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.

Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
standard.

#### Defined in

[src/types/typedData.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/types/typedData.ts#L13)

---

### GetTransactionStatusResponse

Ƭ **GetTransactionStatusResponse**: `Object`

#### Type declaration

| Name                              | Type                                                       |
| :-------------------------------- | :--------------------------------------------------------- |
| `tx_status`                       | [`TransactionStatus`](../enums/types.TransactionStatus.md) |
| `block_hash?`                     | `string`                                                   |
| `tx_failure_reason?`              | { `code`: `string` ; `error_message`: `string` }           |
| `tx_failure_reason.code`          | `string`                                                   |
| `tx_failure_reason.error_message` | `string`                                                   |

#### Defined in

[src/types/api/sequencer.ts:17](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L17)

---

### GetContractAddressesResponse

Ƭ **GetContractAddressesResponse**: `Object`

#### Type declaration

| Name                   | Type     |
| :--------------------- | :------- |
| `Starknet`             | `string` |
| `GpsStatementVerifier` | `string` |

#### Defined in

[src/types/api/sequencer.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L26)

---

### FunctionInvocation

Ƭ **FunctionInvocation**: `Object`

#### Type declaration

| Name                  | Type                                                    |
| :-------------------- | :------------------------------------------------------ |
| `caller_address`      | `string`                                                |
| `contract_address`    | `string`                                                |
| `calldata`            | [`RawCalldata`](types.md#rawcalldata)                   |
| `call_type?`          | `string`                                                |
| `class_hash?`         | `string`                                                |
| `selector?`           | `string`                                                |
| `entry_point_type?`   | [`EXTERNAL`](../enums/types.EntryPointType.md#external) |
| `result`              | `any`[]                                                 |
| `execution_resources` | [`ExecutionResources`](types.md#executionresources)     |
| `internal_calls`      | [`FunctionInvocation`](types.md#functioninvocation)[]   |
| `events`              | `any`[]                                                 |
| `messages`            | `any`[]                                                 |

#### Defined in

[src/types/api/sequencer.ts:31](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L31)

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

[src/types/api/sequencer.ts:46](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L46)

---

### TransactionTraceResponse

Ƭ **TransactionTraceResponse**: `Object`

#### Type declaration

| Name                       | Type                                                |
| :------------------------- | :-------------------------------------------------- |
| `validate_invocation?`     | [`FunctionInvocation`](types.md#functioninvocation) |
| `function_invocation?`     | [`FunctionInvocation`](types.md#functioninvocation) |
| `fee_transfer_invocation?` | [`FunctionInvocation`](types.md#functioninvocation) |
| `signature`                | `string`[]                                          |

#### Defined in

[src/types/api/sequencer.ts:59](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L59)

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

[src/types/api/sequencer.ts:66](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L66)

---

### DeployedContractItem

Ƭ **DeployedContractItem**: `Object`

#### Type declaration

| Name         | Type     |
| :----------- | :------- |
| `address`    | `string` |
| `class_hash` | `string` |

#### Defined in

[src/types/api/sequencer.ts:73](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L73)

---

### SequencerIdentifier

Ƭ **SequencerIdentifier**: { `blockHash`: `string` } \| { `blockNumber`: [`BlockNumber`](types.md#blocknumber) }

#### Defined in

[src/types/api/sequencer.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L78)
