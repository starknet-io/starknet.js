---
id: 'modules'
title: 'Starknet.js API - v5.10.0'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Contract](classes/Contract.md)
- [ContractInterface](classes/ContractInterface.md)
- [ContractFactory](classes/ContractFactory.md)
- [Provider](classes/Provider.md)
- [CustomError](classes/CustomError.md)
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
- [CallData](classes/CallData.md)

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
- [starknetId](namespaces/starknetId.md)
- [Sequencer](namespaces/Sequencer.md)
- [RPC](namespaces/RPC.md)
- [cairo](namespaces/cairo.md)

## Enumerations

- [TransactionStatus](enums/TransactionStatus.md)
- [TransactionType](enums/TransactionType.md)
- [EntryPointType](enums/EntryPointType.md)

## Interfaces

- [CallStruct](interfaces/CallStruct.md)
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

### WeierstrassSignatureType

Ƭ **WeierstrassSignatureType**: [`SignatureType`](interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

[src/types/lib/index.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L7)

---

### ArraySignatureType

Ƭ **ArraySignatureType**: `string`[]

#### Defined in

[src/types/lib/index.ts:8](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L8)

---

### Signature

Ƭ **Signature**: [`ArraySignatureType`](modules.md#arraysignaturetype) \| [`WeierstrassSignatureType`](modules.md#weierstrasssignaturetype)

#### Defined in

[src/types/lib/index.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L9)

---

### RawCalldata

Ƭ **RawCalldata**: [`BigNumberish`](namespaces/num.md#bignumberish)[]

BigNumberish array
use CallData.compile() to convert to Calldata

#### Defined in

[src/types/lib/index.ts:15](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L15)

---

### HexCalldata

Ƭ **HexCalldata**: `string`[]

Hexadecimal-string array

#### Defined in

[src/types/lib/index.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L20)

---

### AllowArray

Ƭ **AllowArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L22)

---

### RawArgs

Ƭ **RawArgs**: [`RawArgsObject`](modules.md#rawargsobject) \| [`RawArgsArray`](modules.md#rawargsarray)

#### Defined in

[src/types/lib/index.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L24)

---

### RawArgsObject

Ƭ **RawArgsObject**: `Object`

#### Index signature

▪ [inputName: `string`]: [`MultiType`](modules.md#multitype) \| [`MultiType`](modules.md#multitype)[] \| [`RawArgs`](modules.md#rawargs)

#### Defined in

[src/types/lib/index.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L26)

---

### RawArgsArray

Ƭ **RawArgsArray**: ([`MultiType`](modules.md#multitype) \| [`MultiType`](modules.md#multitype)[] \| [`RawArgs`](modules.md#rawargs))[]

#### Defined in

[src/types/lib/index.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L30)

---

### MultiType

Ƭ **MultiType**: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`Uint256`](interfaces/uint256.Uint256.md) \| `object` \| `boolean`

#### Defined in

[src/types/lib/index.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L32)

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

[src/types/lib/index.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L34)

---

### DeployContractPayload

Ƭ **DeployContractPayload**: `Object`

**`Deprecated`**

deprecated due to no direct deploy, unused - can be removed

#### Type declaration

| Name                   | Type                                                          |
| :--------------------- | :------------------------------------------------------------ |
| `contract`             | [`CompiledContract`](modules.md#compiledcontract) \| `string` |
| `constructorCalldata?` | [`RawCalldata`](modules.md#rawcalldata)                       |
| `addressSalt?`         | `string`                                                      |

#### Defined in

[src/types/lib/index.ts:44](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L44)

---

### DeployAccountContractPayload

Ƭ **DeployAccountContractPayload**: `Object`

#### Type declaration

| Name                   | Type                                             |
| :--------------------- | :----------------------------------------------- |
| `classHash`            | `string`                                         |
| `constructorCalldata?` | [`RawArgs`](modules.md#rawargs)                  |
| `addressSalt?`         | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `contractAddress?`     | `string`                                         |

#### Defined in

[src/types/lib/index.ts:50](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L50)

---

### DeployAccountContractTransaction

Ƭ **DeployAccountContractTransaction**: `Omit`<[`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload), `"contractAddress"`\> & { `signature?`: [`Signature`](modules.md#signature) }

#### Defined in

[src/types/lib/index.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L57)

---

### DeclareContractPayload

Ƭ **DeclareContractPayload**: `Object`

#### Type declaration

| Name                 | Type                                                          |
| :------------------- | :------------------------------------------------------------ |
| `contract`           | [`CompiledContract`](modules.md#compiledcontract) \| `string` |
| `classHash?`         | `string`                                                      |
| `casm?`              | [`CompiledSierraCasm`](modules.md#compiledsierracasm)         |
| `compiledClassHash?` | `string`                                                      |

#### Defined in

[src/types/lib/index.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L64)

---

### CompleteDeclareContractPayload

Ƭ **CompleteDeclareContractPayload**: `Object`

#### Type declaration

| Name                 | Type                                                          |
| :------------------- | :------------------------------------------------------------ |
| `contract`           | [`CompiledContract`](modules.md#compiledcontract) \| `string` |
| `classHash`          | `string`                                                      |
| `casm?`              | [`CompiledSierraCasm`](modules.md#compiledsierracasm)         |
| `compiledClassHash?` | `string`                                                      |

#### Defined in

[src/types/lib/index.ts:71](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L71)

---

### DeclareAndDeployContractPayload

Ƭ **DeclareAndDeployContractPayload**: `Omit`<[`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload), `"classHash"`\> & [`DeclareContractPayload`](modules.md#declarecontractpayload)

#### Defined in

[src/types/lib/index.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L78)

---

### DeclareContractTransaction

Ƭ **DeclareContractTransaction**: `Object`

#### Type declaration

| Name                 | Type                                        |
| :------------------- | :------------------------------------------ |
| `contractDefinition` | [`ContractClass`](modules.md#contractclass) |
| `senderAddress`      | `string`                                    |
| `signature?`         | [`Signature`](modules.md#signature)         |
| `compiledClassHash?` | `string`                                    |

#### Defined in

[src/types/lib/index.ts:81](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L81)

---

### CallDetails

Ƭ **CallDetails**: `Object`

#### Type declaration

| Name              | Type                            |
| :---------------- | :------------------------------ |
| `contractAddress` | `string`                        |
| `calldata?`       | [`RawArgs`](modules.md#rawargs) |

#### Defined in

[src/types/lib/index.ts:88](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L88)

---

### Invocation

Ƭ **Invocation**: [`CallDetails`](modules.md#calldetails) & { `signature?`: [`Signature`](modules.md#signature) }

#### Defined in

[src/types/lib/index.ts:93](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L93)

---

### Call

Ƭ **Call**: [`CallDetails`](modules.md#calldetails) & { `entrypoint`: `string` }

#### Defined in

[src/types/lib/index.ts:95](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L95)

---

### CairoVersion

Ƭ **CairoVersion**: `"0"` \| `"1"`

#### Defined in

[src/types/lib/index.ts:97](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L97)

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

[src/types/lib/index.ts:99](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L99)

---

### Details

Ƭ **Details**: `Object`

Contain all additional details params

#### Type declaration

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `nonce`   | [`BigNumberish`](namespaces/num.md#bignumberish)        |
| `maxFee`  | [`BigNumberish`](namespaces/num.md#bignumberish)        |
| `version` | [`BigNumberish`](namespaces/num.md#bignumberish)        |
| `chainId` | [`StarknetChainId`](enums/constants.StarknetChainId.md) |

#### Defined in

[src/types/lib/index.ts:108](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L108)

---

### InvocationsDetailsWithNonce

Ƭ **InvocationsDetailsWithNonce**: [`InvocationsDetails`](modules.md#invocationsdetails) & { `nonce`: [`BigNumberish`](namespaces/num.md#bignumberish) }

#### Defined in

[src/types/lib/index.ts:115](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L115)

---

### TransactionBulk

Ƭ **TransactionBulk**: ({ `type`: `"DECLARE"` } & { `payload`: [`DeclareContractPayload`](modules.md#declarecontractpayload) } \| { `type`: `"DEPLOY"` } & { `payload`: [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload)[] } \| { `type`: `"DEPLOY_ACCOUNT"` } & { `payload`: [`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload) } \| { `type`: `"INVOKE_FUNCTION"` } & { `payload`: [`AllowArray`](modules.md#allowarray)<[`Call`](modules.md#call)\> })[]

#### Defined in

[src/types/lib/index.ts:127](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L127)

---

### InvocationBulk

Ƭ **InvocationBulk**: { `type`: `"DECLARE"` } & [`DeclareContractTransaction`](modules.md#declarecontracttransaction) \| { `type`: `"DEPLOY_ACCOUNT"` } & [`DeployAccountContractTransaction`](modules.md#deployaccountcontracttransaction) \| { `type`: `"INVOKE_FUNCTION"` } & [`Invocation`](modules.md#invocation) & [`InvocationsDetailsWithNonce`](modules.md#invocationsdetailswithnonce) & { `blockIdentifier`: [`BlockNumber`](modules.md#blocknumber) \| [`BigNumberish`](namespaces/num.md#bignumberish) }[]

#### Defined in

[src/types/lib/index.ts:136](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L136)

---

### Status

Ƭ **Status**: `"NOT_RECEIVED"` \| `"RECEIVED"` \| `"PENDING"` \| `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"`

#### Defined in

[src/types/lib/index.ts:145](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L145)

---

### Tupled

Ƭ **Tupled**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `element` | `any`    |
| `type`    | `string` |

#### Defined in

[src/types/lib/index.ts:160](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L160)

---

### BlockTag

Ƭ **BlockTag**: `"pending"` \| `"latest"`

#### Defined in

[src/types/lib/index.ts:161](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L161)

---

### BlockNumber

Ƭ **BlockNumber**: [`BlockTag`](modules.md#blocktag) \| `null` \| `number`

#### Defined in

[src/types/lib/index.ts:162](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L162)

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

[src/types/lib/index.ts:164](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L164)

---

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [inputName: `string`]: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`BigNumberish`](namespaces/num.md#bignumberish)[] \| [`ParsedStruct`](modules.md#parsedstruct) \| [`ParsedStruct`](modules.md#parsedstruct)[]

#### Defined in

[src/types/lib/index.ts:168](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L168)

---

### ParsedStruct

Ƭ **ParsedStruct**: `Object`

#### Index signature

▪ [key: `string`]: [`BigNumberish`](namespaces/num.md#bignumberish) \| [`ParsedStruct`](modules.md#parsedstruct)

#### Defined in

[src/types/lib/index.ts:171](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L171)

---

### waitForTransactionOptions

Ƭ **waitForTransactionOptions**: `Object`

#### Type declaration

| Name             | Type                                                |
| :--------------- | :-------------------------------------------------- |
| `retryInterval?` | `number`                                            |
| `successStates?` | [`TransactionStatus`](enums/TransactionStatus.md)[] |

#### Defined in

[src/types/lib/index.ts:175](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/index.ts#L175)

---

### ContractClass

Ƭ **ContractClass**: [`LegacyContractClass`](modules.md#legacycontractclass) \| [`SierraContractClass`](modules.md#sierracontractclass)

#### Defined in

[src/types/lib/contract/index.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L5)

---

### CompiledContract

Ƭ **CompiledContract**: [`LegacyCompiledContract`](modules.md#legacycompiledcontract) \| [`CompiledSierra`](modules.md#compiledsierra)

#### Defined in

[src/types/lib/contract/index.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L6)

---

### CairoContract

Ƭ **CairoContract**: [`ContractClass`](modules.md#contractclass) \| [`CompiledContract`](modules.md#compiledcontract)

#### Defined in

[src/types/lib/contract/index.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/index.ts#L7)

---

### Abi

Ƭ **Abi**: ([`FunctionAbi`](modules.md#functionabi) \| `EventAbi` \| [`StructAbi`](modules.md#structabi))[]

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

| Name                | Type                                |
| :------------------ | :---------------------------------- |
| `inputs`            | [`AbiEntry`](modules.md#abientry)[] |
| `name`              | `string`                            |
| `outputs`           | [`AbiEntry`](modules.md#abientry)[] |
| `stateMutability?`  | `"view"`                            |
| `state_mutability?` | `string`                            |
| `type`              | `FunctionAbiType`                   |

#### Defined in

[src/types/lib/contract/abi.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L14)

---

### AbiStructs

Ƭ **AbiStructs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](modules.md#structabi)

#### Defined in

[src/types/lib/contract/abi.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L23)

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

[src/types/lib/contract/abi.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/abi.ts#L25)

---

### LegacyContractClass

Ƭ **LegacyContractClass**: `Object`

LEGACY CONTRACT

#### Type declaration

| Name                   | Type                                                |
| :--------------------- | :-------------------------------------------------- |
| `program`              | [`CompressedProgram`](modules.md#compressedprogram) |
| `entry_points_by_type` | [`EntryPointsByType`](modules.md#entrypointsbytype) |
| `abi`                  | [`Abi`](modules.md#abi)                             |

#### Defined in

[src/types/lib/contract/legacy.ts:4](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L4)

---

### LegacyCompiledContract

Ƭ **LegacyCompiledContract**: `Omit`<[`LegacyContractClass`](modules.md#legacycontractclass), `"program"`\> & { `program`: [`Program`](interfaces/Program.md) }

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

| Name          | Type                                                                |
| :------------ | :------------------------------------------------------------------ |
| `CONSTRUCTOR` | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |
| `EXTERNAL`    | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |
| `L1_HANDLER`  | [`ContractEntryPointFields`](modules.md#contractentrypointfields)[] |

#### Defined in

[src/types/lib/contract/legacy.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L18)

---

### ContractEntryPointFields

Ƭ **ContractEntryPointFields**: `Object`

#### Type declaration

| Name        | Type                              |
| :---------- | :-------------------------------- |
| `selector`  | `string`                          |
| `offset`    | `string`                          |
| `builtins?` | [`Builtins`](modules.md#builtins) |

#### Defined in

[src/types/lib/contract/legacy.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/legacy.ts#L24)

---

### CairoAssembly

Ƭ **CairoAssembly**: `Object`

SYSTEM TYPES

#### Type declaration

| Name                   | Type                                                |
| :--------------------- | :-------------------------------------------------- |
| `prime`                | `string`                                            |
| `compiler_version`     | `string`                                            |
| `bytecode`             | [`ByteCode`](modules.md#bytecode)                   |
| `hints`                | `any`[]                                             |
| `pythonic_hints`       | [`PythonicHints`](modules.md#pythonichints)         |
| `entry_points_by_type` | [`EntryPointsByType`](modules.md#entrypointsbytype) |

#### Defined in

[src/types/lib/contract/sierra.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L5)

---

### SierraContractClass

Ƭ **SierraContractClass**: `Object`

#### Type declaration

| Name                        | Type                                                            |
| :-------------------------- | :-------------------------------------------------------------- |
| `sierra_program`            | [`ByteCode`](modules.md#bytecode)                               |
| `sierra_program_debug_info` | [`SierraProgramDebugInfo`](modules.md#sierraprogramdebuginfo)   |
| `contract_class_version`    | `string`                                                        |
| `entry_points_by_type`      | [`SierraEntryPointsByType`](modules.md#sierraentrypointsbytype) |
| `abi`                       | [`Abi`](modules.md#abi)                                         |

#### Defined in

[src/types/lib/contract/sierra.ts:14](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L14)

---

### CompiledSierra

Ƭ **CompiledSierra**: [`SierraContractClass`](modules.md#sierracontractclass)

COMPILED CONTRACT

#### Defined in

[src/types/lib/contract/sierra.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/types/lib/contract/sierra.ts#L23)

---

### CompiledSierraCasm

Ƭ **CompiledSierraCasm**: [`CairoAssembly`](modules.md#cairoassembly)

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

| Name          | Type                                                                            |
| :------------ | :------------------------------------------------------------------------------ |
| `CONSTRUCTOR` | [`SierraContractEntryPointFields`](modules.md#sierracontractentrypointfields)[] |
| `EXTERNAL`    | [`SierraContractEntryPointFields`](modules.md#sierracontractentrypointfields)[] |
| `L1_HANDLER`  | [`SierraContractEntryPointFields`](modules.md#sierracontractentrypointfields)[] |

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

### DeployAccountSignerDetails

Ƭ **DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload)\> & `Required`<[`InvocationsDetails`](modules.md#invocationsdetails)\> & { `contractAddress`: [`BigNumberish`](namespaces/num.md#bignumberish) ; `chainId`: [`StarknetChainId`](enums/constants.StarknetChainId.md) }

#### Defined in

[src/types/signer.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/types/signer.ts#L21)

---

### AsyncContractFunction

Ƭ **AsyncContractFunction**<`T`\>: (...`args`: [`ArgsOrCalldataWithOptions`](modules.md#argsorcalldatawithoptions)) => `Promise`<`T`\>

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |

#### Type declaration

▸ (`...args`): `Promise`<`T`\>

##### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `...args` | [`ArgsOrCalldataWithOptions`](modules.md#argsorcalldatawithoptions) |

##### Returns

`Promise`<`T`\>

#### Defined in

[src/types/contract.ts:5](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L5)

---

### ContractFunction

Ƭ **ContractFunction**: (...`args`: [`ArgsOrCalldataWithOptions`](modules.md#argsorcalldatawithoptions)) => `any`

#### Type declaration

▸ (`...args`): `any`

##### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `...args` | [`ArgsOrCalldataWithOptions`](modules.md#argsorcalldatawithoptions) |

##### Returns

`any`

#### Defined in

[src/types/contract.ts:6](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L6)

---

### Result

Ƭ **Result**: { `[key: string]`: `any`; } \| [`Result`](modules.md#result)[] \| `bigint` \| `string` \| `boolean`

#### Defined in

[src/types/contract.ts:7](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L7)

---

### Calldata

Ƭ **Calldata**: `string`[] & { `__compiled__?`: `boolean` }

Compiled calldata ready to be sent
decimal-string array

#### Defined in

[src/types/contract.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L20)

---

### ArgsOrCalldata

Ƭ **ArgsOrCalldata**: [`RawArgsArray`](modules.md#rawargsarray) \| [[`Calldata`](modules.md#calldata)] \| [`Calldata`](modules.md#calldata)

#### Defined in

[src/types/contract.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L22)

---

### ArgsOrCalldataWithOptions

Ƭ **ArgsOrCalldataWithOptions**: [`ArgsOrCalldata`](modules.md#argsorcalldata) & [`ContractOptions`](modules.md#contractoptions)

#### Defined in

[src/types/contract.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L23)

---

### ContractOptions

Ƭ **ContractOptions**: `Object`

#### Type declaration

| Name               | Type                                             |
| :----------------- | :----------------------------------------------- |
| `blockIdentifier?` | `BlockIdentifier`                                |
| `parseRequest?`    | `boolean`                                        |
| `parseResponse?`   | `boolean`                                        |
| `formatResponse?`  | { `[key: string]`: `any`; }                      |
| `maxFee?`          | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `nonce?`           | [`BigNumberish`](namespaces/num.md#bignumberish) |
| `signature?`       | [`Signature`](modules.md#signature)              |
| `addressSalt?`     | `string`                                         |

#### Defined in

[src/types/contract.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L24)

---

### CallOptions

Ƭ **CallOptions**: `Pick`<[`ContractOptions`](modules.md#contractoptions), `"blockIdentifier"` \| `"parseRequest"` \| `"parseResponse"` \| `"formatResponse"`\>

#### Defined in

[src/types/contract.ts:35](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L35)

---

### InvokeOptions

Ƭ **InvokeOptions**: `Pick`<[`ContractOptions`](modules.md#contractoptions), `"maxFee"` \| `"nonce"` \| `"signature"` \| `"parseRequest"`\>

#### Defined in

[src/types/contract.ts:40](https://github.com/0xs34n/starknet.js/blob/develop/src/types/contract.ts#L40)

---

### EstimateFeeBulk

Ƭ **EstimateFeeBulk**: [`EstimateFee`](interfaces/EstimateFee.md)[]

#### Defined in

[src/types/account.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L13)

---

### MultiDeployContractResponse

Ƭ **MultiDeployContractResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`[] |
| `transaction_hash` | `string`   |

#### Defined in

[src/types/account.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L26)

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

[src/types/account.ts:31](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L31)

---

### DeclareDeployUDCResponse

Ƭ **DeclareDeployUDCResponse**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declare` | { `class_hash`: [`BigNumberish`](namespaces/num.md#bignumberish) } & `Partial`<[`DeclareTransactionReceiptResponse`](modules.md#declaretransactionreceiptresponse)\> |
| `deploy`  | [`DeployContractUDCResponse`](modules.md#deploycontractudcresponse)                                                                                                  |

#### Defined in

[src/types/account.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/types/account.ts#L43)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`InvokeTransactionResponse`](interfaces/InvokeTransactionResponse.md) & [`DeclareTransactionResponse`](interfaces/DeclareTransactionResponse.md)

#### Defined in

[src/types/provider.ts:40](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L40)

---

### GetTransactionReceiptResponse

Ƭ **GetTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](interfaces/InvokeTransactionReceiptResponse.md) \| [`DeclareTransactionReceiptResponse`](modules.md#declaretransactionreceiptresponse)

#### Defined in

[src/types/provider.ts:67](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L67)

---

### DeclareTransactionReceiptResponse

Ƭ **DeclareTransactionReceiptResponse**: [`CommonTransactionReceiptResponse`](interfaces/CommonTransactionReceiptResponse.md)

#### Defined in

[src/types/provider.ts:101](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L101)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/provider.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L119)

---

### EstimateFeeAction

Ƭ **EstimateFeeAction**: { `type`: [`INVOKE`](enums/TransactionType.md#invoke) ; `payload`: [`AllowArray`](modules.md#allowarray)<[`Call`](modules.md#call)\> } \| { `type`: [`DECLARE`](enums/TransactionType.md#declare) ; `payload`: [`DeclareContractPayload`](modules.md#declarecontractpayload) } \| { `type`: [`DEPLOY_ACCOUNT`](enums/TransactionType.md#deploy_account) ; `payload`: [`DeployAccountContractPayload`](modules.md#deployaccountcontractpayload) } \| { `type`: [`DEPLOY`](enums/TransactionType.md#deploy) ; `payload`: [`UniversalDeployerContractPayload`](modules.md#universaldeployercontractpayload) }

#### Defined in

[src/types/provider.ts:123](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L123)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`EstimateFeeResponse`](interfaces/EstimateFeeResponse.md)[]

#### Defined in

[src/types/provider.ts:141](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L141)

---

### Storage

Ƭ **Storage**: [`Storage`](namespaces/Sequencer.md#storage)

#### Defined in

[src/types/provider.ts:143](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L143)

---

### Nonce

Ƭ **Nonce**: [`Nonce`](namespaces/Sequencer.md#nonce)

#### Defined in

[src/types/provider.ts:145](https://github.com/0xs34n/starknet.js/blob/develop/src/types/provider.ts#L145)

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
| `calldata`            | [`RawCalldata`](modules.md#rawcalldata)                 |
| `call_type?`          | `string`                                                |
| `class_hash?`         | `string`                                                |
| `selector?`           | `string`                                                |
| `entry_point_type?`   | [`EXTERNAL`](enums/EntryPointType.md#external)          |
| `result`              | `any`[]                                                 |
| `execution_resources` | [`ExecutionResources`](modules.md#executionresources)   |
| `internal_calls`      | [`FunctionInvocation`](modules.md#functioninvocation)[] |
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

| Name                       | Type                                                  |
| :------------------------- | :---------------------------------------------------- |
| `validate_invocation?`     | [`FunctionInvocation`](modules.md#functioninvocation) |
| `function_invocation?`     | [`FunctionInvocation`](modules.md#functioninvocation) |
| `fee_transfer_invocation?` | [`FunctionInvocation`](modules.md#functioninvocation) |
| `signature`                | `string`[]                                            |

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

Ƭ **SequencerIdentifier**: { `blockHash`: `string` } \| { `blockNumber`: [`BlockNumber`](modules.md#blocknumber) }

#### Defined in

[src/types/api/sequencer.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L78)

---

### SequencerHttpMethod

Ƭ **SequencerHttpMethod**: `"POST"` \| `"GET"`

#### Defined in

[src/provider/sequencer.ts:56](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L56)

---

### SequencerProviderOptions

Ƭ **SequencerProviderOptions**: { `headers?`: `Record`<`string`, `string`\> ; `blockIdentifier?`: `BlockIdentifier` } & { `network`: [`NetworkName`](enums/constants.NetworkName.md) \| [`StarknetChainId`](enums/constants.StarknetChainId.md) ; `chainId?`: [`StarknetChainId`](enums/constants.StarknetChainId.md) } \| { `baseUrl`: `string` ; `feederGatewayUrl?`: `string` ; `gatewayUrl?`: `string` ; `chainId?`: [`StarknetChainId`](enums/constants.StarknetChainId.md) }

#### Defined in

[src/provider/sequencer.ts:58](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/sequencer.ts#L58)

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

[src/provider/rpc.ts:36](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/rpc.ts#L36)

## Variables

### number

• `Const` **number**: [`num`](namespaces/num.md) = `num`

**`Deprecated`**

prefer the 'num' naming

#### Defined in

[src/index.ts:37](https://github.com/0xs34n/starknet.js/blob/develop/src/index.ts#L37)

---

### defaultProvider

• `Const` **defaultProvider**: [`Provider`](classes/Provider.md)

#### Defined in

[src/provider/index.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/index.ts#L9)

## Functions

### getCalldata

▸ **getCalldata**(`args`, `callback`): [`Calldata`](modules.md#calldata)

#### Parameters

| Name       | Type                                          |
| :--------- | :-------------------------------------------- |
| `args`     | [`ArgsOrCalldata`](modules.md#argsorcalldata) |
| `callback` | `Function`                                    |

#### Returns

[`Calldata`](modules.md#calldata)

#### Defined in

[src/contract/default.ts:97](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L97)

---

### splitArgsAndOptions

▸ **splitArgsAndOptions**(`args`): { `args`: [`ArgsOrCalldata`](modules.md#argsorcalldata) ; `options`: [`ContractOptions`](modules.md#contractoptions) } \| { `args`: [`ArgsOrCalldata`](modules.md#argsorcalldata) ; `options`: `undefined` }

#### Parameters

| Name   | Type                                                                |
| :----- | :------------------------------------------------------------------ |
| `args` | [`ArgsOrCalldataWithOptions`](modules.md#argsorcalldatawithoptions) |

#### Returns

{ `args`: [`ArgsOrCalldata`](modules.md#argsorcalldata) ; `options`: [`ContractOptions`](modules.md#contractoptions) } \| { `args`: [`ArgsOrCalldata`](modules.md#argsorcalldata) ; `options`: `undefined` }

#### Defined in

[src/contract/default.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L24)

---

### fixStack

▸ **fixStack**(`target`, `fn?`): `void`

#### Parameters

| Name     | Type       | Default value        |
| :------- | :--------- | :------------------- |
| `target` | `Error`    | `undefined`          |
| `fn`     | `Function` | `target.constructor` |

#### Returns

`void`

#### Defined in

[src/provider/errors.ts:2](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/errors.ts#L2)

---

### fixProto

▸ **fixProto**(`target`, `prototype`): `void`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `target`    | `Error`  |
| `prototype` | `Object` |

#### Returns

`void`

#### Defined in

[src/provider/errors.ts:8](https://github.com/0xs34n/starknet.js/blob/develop/src/provider/errors.ts#L8)

---

### addAddressPadding

▸ **addAddressPadding**(`address`): `string`

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `address` | [`BigNumberish`](namespaces/num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/address.ts:9](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/address.ts#L9)

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

[src/utils/address.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/address.ts#L13)

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

[src/utils/address.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/address.ts#L26)

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

[src/utils/address.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/address.ts#L43)

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

[src/utils/url.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/url.ts#L22)

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

[src/utils/url.ts:51](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/url.ts#L51)
