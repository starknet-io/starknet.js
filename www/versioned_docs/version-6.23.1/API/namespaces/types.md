---
id: 'types'
title: 'Namespace: types'
sidebar_label: 'types'
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [RPC](types.RPC.md)

## Enumerations

- [OutsideExecutionVersion](../enums/types.OutsideExecutionVersion.md)

## Interfaces

- [Uint256](../interfaces/types.Uint256.md)
- [Uint512](../interfaces/types.Uint512.md)
- [CallStruct](../interfaces/types.CallStruct.md)
- [Program](../interfaces/types.Program.md)
- [ProviderOptions](../interfaces/types.ProviderOptions.md)
- [MessageToL1](../interfaces/types.MessageToL1.md)
- [EstimateFeeResponse](../interfaces/types.EstimateFeeResponse.md)
- [EstimateFee](../interfaces/types.EstimateFee.md)
- [UniversalDetails](../interfaces/types.UniversalDetails.md)
- [EstimateFeeDetails](../interfaces/types.EstimateFeeDetails.md)
- [DeployContractResponse](../interfaces/types.DeployContractResponse.md)
- [OutsideExecutionOptions](../interfaces/types.OutsideExecutionOptions.md)
- [OutsideCall](../interfaces/types.OutsideCall.md)
- [OutsideExecution](../interfaces/types.OutsideExecution.md)
- [OutsideTransaction](../interfaces/types.OutsideTransaction.md)

## References

### TypedDataRevision

Re-exports [TypedDataRevision](types.RPC.RPCSPEC07.WALLET_API.md#typeddatarevision-1)

---

### StarknetEnumType

Re-exports [StarknetEnumType](types.RPC.RPCSPEC07.WALLET_API.md#starknetenumtype)

---

### StarknetMerkleType

Re-exports [StarknetMerkleType](types.RPC.RPCSPEC07.WALLET_API.md#starknetmerkletype)

---

### StarknetType

Re-exports [StarknetType](types.RPC.RPCSPEC07.WALLET_API.md#starknettype)

---

### StarknetDomain

Re-exports [StarknetDomain](../interfaces/types.RPC.RPCSPEC07.WALLET_API.StarknetDomain.md)

---

### TypedData

Re-exports [TypedData](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md)

## Type Aliases

### WeierstrassSignatureType

Ƭ **WeierstrassSignatureType**: [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

[src/types/lib/index.ts:8](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L8)

---

### ArraySignatureType

Ƭ **ArraySignatureType**: `string`[]

#### Defined in

[src/types/lib/index.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L9)

---

### Signature

Ƭ **Signature**: [`ArraySignatureType`](types.md#arraysignaturetype) \| [`WeierstrassSignatureType`](types.md#weierstrasssignaturetype)

#### Defined in

[src/types/lib/index.ts:10](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L10)

---

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[src/types/lib/index.ts:12](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L12)

---

### ByteArray

Ƭ **ByteArray**: `Object`

#### Type declaration

| Name               | Type                                      |
| :----------------- | :---------------------------------------- |
| `data`             | [`BigNumberish`](types.md#bignumberish)[] |
| `pending_word`     | [`BigNumberish`](types.md#bignumberish)   |
| `pending_word_len` | [`BigNumberish`](types.md#bignumberish)   |

#### Defined in

[src/types/lib/index.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L14)

---

### Calldata

Ƭ **Calldata**: `string`[] & \{ `__compiled__?`: `true` }

Compiled calldata ready to be sent

decimal-string array

#### Defined in

[src/types/lib/index.ts:25](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L25)

---

### RawCalldata

Ƭ **RawCalldata**: [`BigNumberish`](types.md#bignumberish)[]

BigNumberish array

use CallData.compile() to convert to Calldata

#### Defined in

[src/types/lib/index.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L54)

---

### HexCalldata

Ƭ **HexCalldata**: `string`[]

Hexadecimal-string array

#### Defined in

[src/types/lib/index.ts:59](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L59)

---

### AllowArray

Ƭ **AllowArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:61](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L61)

---

### OptionalPayload

Ƭ **OptionalPayload**<`T`\>: \{ `payload`: `T` } \| `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:63](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L63)

---

### RawArgs

Ƭ **RawArgs**: [`RawArgsObject`](types.md#rawargsobject) \| [`RawArgsArray`](types.md#rawargsarray)

#### Defined in

[src/types/lib/index.ts:65](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L65)

---

### RawArgsObject

Ƭ **RawArgsObject**: `Object`

#### Index signature

▪ [inputName: `string`]: [`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs)

#### Defined in

[src/types/lib/index.ts:67](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L67)

---

### RawArgsArray

Ƭ **RawArgsArray**: ([`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs))[]

#### Defined in

[src/types/lib/index.ts:71](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L71)

---

### MultiType

Ƭ **MultiType**: [`BigNumberish`](types.md#bignumberish) \| [`Uint256`](../interfaces/types.Uint256.md) \| `object` \| `boolean` \| [`CairoEnum`](types.md#cairoenum)

#### Defined in

[src/types/lib/index.ts:73](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L73)

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

[src/types/lib/index.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L75)

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

[src/types/lib/index.ts:82](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L82)

---

### DeployAccountContractTransaction

Ƭ **DeployAccountContractTransaction**: `Omit`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload), `"contractAddress"`\> & \{ `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:89](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L89)

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

[src/types/lib/index.ts:96](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L96)

---

### ContractClassIdentifier

Ƭ **ContractClassIdentifier**: [`DeclareContractPayload`](types.md#declarecontractpayload) \| \{ `classHash`: `string` }

DeclareContractPayload with classHash or contract defined

#### Defined in

[src/types/lib/index.ts:106](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L106)

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

[src/types/lib/index.ts:108](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L108)

---

### DeclareAndDeployContractPayload

Ƭ **DeclareAndDeployContractPayload**: `Omit`<[`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload), `"classHash"`\> & [`DeclareContractPayload`](types.md#declarecontractpayload)

#### Defined in

[src/types/lib/index.ts:115](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L115)

---

### DeclareContractTransaction

Ƭ **DeclareContractTransaction**: `Object`

#### Type declaration

| Name                 | Type                                      |
| :------------------- | :---------------------------------------- |
| `contract`           | [`ContractClass`](types.md#contractclass) |
| `senderAddress`      | `string`                                  |
| `signature?`         | [`Signature`](types.md#signature)         |
| `compiledClassHash?` | `string`                                  |

#### Defined in

[src/types/lib/index.ts:118](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L118)

---

### CallDetails

Ƭ **CallDetails**: `Object`

#### Type declaration

| Name              | Type                                                             |
| :---------------- | :--------------------------------------------------------------- |
| `contractAddress` | `string`                                                         |
| `calldata?`       | [`RawArgs`](types.md#rawargs) \| [`Calldata`](types.md#calldata) |
| `entrypoint?`     | `string`                                                         |

#### Defined in

[src/types/lib/index.ts:125](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L125)

---

### Invocation

Ƭ **Invocation**: [`CallDetails`](types.md#calldetails) & \{ `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:131](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L131)

---

### Call

Ƭ **Call**: [`CallDetails`](types.md#calldetails) & \{ `entrypoint`: `string` }

#### Defined in

[src/types/lib/index.ts:133](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L133)

---

### CairoVersion

Ƭ **CairoVersion**: `"0"` \| `"1"` \| `undefined`

#### Defined in

[src/types/lib/index.ts:135](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L135)

---

### CompilerVersion

Ƭ **CompilerVersion**: `"0"` \| `"1"` \| `"2"` \| `undefined`

#### Defined in

[src/types/lib/index.ts:136](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L136)

---

### InvocationsDetails

Ƭ **InvocationsDetails**: \{ `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `maxFee?`: [`BigNumberish`](types.md#bignumberish) ; `version?`: [`BigNumberish`](types.md#bignumberish) } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/lib/index.ts:138](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L138)

---

### V3TransactionDetails

Ƭ **V3TransactionDetails**: `Object`

#### Type declaration

| Name                        | Type                                                                          |
| :-------------------------- | :---------------------------------------------------------------------------- |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                       |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                       |
| `resourceBounds`            | [`ResourceBounds`](types.RPC.RPCSPEC07.API.md#resourcebounds)                 |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                       |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                     |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]                                     |
| `nonceDataAvailabilityMode` | [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1) |
| `feeDataAvailabilityMode`   | [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1) |

#### Defined in

[src/types/lib/index.ts:144](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L144)

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

[src/types/lib/index.ts:158](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L158)

---

### InvocationsDetailsWithNonce

Ƭ **InvocationsDetailsWithNonce**: [`InvocationsDetails`](types.md#invocationsdetails) & \{ `nonce`: [`BigNumberish`](types.md#bignumberish) } \| [`V3TransactionDetails`](types.md#v3transactiondetails)

#### Defined in

[src/types/lib/index.ts:165](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L165)

---

### TransactionType

Ƭ **TransactionType**: `ValuesType`<typeof [`TransactionType`](types.md#transactiontype-1)\>

#### Defined in

[src/types/lib/index.ts:169](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L169)

[src/types/lib/index.ts:176](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L176)

---

### TransactionStatus

Ƭ **TransactionStatus**: `ValuesType`<typeof [`TransactionStatus`](types.md#transactionstatus-1)\>

#### Defined in

[src/types/lib/index.ts:182](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L182)

[src/types/lib/index.ts:191](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L191)

---

### TransactionFinalityStatus

Ƭ **TransactionFinalityStatus**: `ValuesType`<typeof [`TransactionFinalityStatus`](types.md#transactionfinalitystatus-1)\>

#### Defined in

[src/types/lib/index.ts:193](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L193)

[src/types/lib/index.ts:200](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L200)

---

### TransactionExecutionStatus

Ƭ **TransactionExecutionStatus**: `ValuesType`<typeof [`TransactionExecutionStatus`](types.md#transactionexecutionstatus-1)\>

#### Defined in

[src/types/lib/index.ts:202](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L202)

[src/types/lib/index.ts:208](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L208)

---

### BlockStatus

Ƭ **BlockStatus**: `ValuesType`<typeof [`BlockStatus`](types.md#blockstatus-1)\>

#### Defined in

[src/types/lib/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L210)

[src/types/lib/index.ts:217](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L217)

---

### BlockTag

Ƭ **BlockTag**: `ValuesType`<typeof [`BlockTag`](types.md#blocktag-1)\>

#### Defined in

[src/types/lib/index.ts:219](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L219)

[src/types/lib/index.ts:224](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L224)

---

### BlockNumber

Ƭ **BlockNumber**: [`BlockTag`](types.md#blocktag-1) \| `null` \| `number`

#### Defined in

[src/types/lib/index.ts:226](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L226)

---

### BlockIdentifier

Ƭ **BlockIdentifier**: [`BlockNumber`](types.md#blocknumber) \| [`BigNumberish`](types.md#bignumberish)

hex string and BigInt are detected as block hashes

decimal string and number are detected as block numbers

text string are detected as block tag

null return 'pending' block tag

#### Defined in

[src/types/lib/index.ts:237](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L237)

---

### AccountInvocationItem

Ƭ **AccountInvocationItem**: \{ `type`: typeof [`DECLARE`](types.md#declare) } & [`DeclareContractTransaction`](types.md#declarecontracttransaction) \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) } & [`DeployAccountContractTransaction`](types.md#deployaccountcontracttransaction) \| \{ `type`: typeof [`INVOKE`](types.md#invoke) } & [`Invocation`](types.md#invocation) & [`InvocationsDetailsWithNonce`](types.md#invocationsdetailswithnonce)

items used by AccountInvocations

#### Defined in

[src/types/lib/index.ts:242](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L242)

---

### AccountInvocations

Ƭ **AccountInvocations**: [`AccountInvocationItem`](types.md#accountinvocationitem)[]

Complete invocations array with account details (internal type from account -> provider)

#### Defined in

[src/types/lib/index.ts:252](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L252)

---

### Invocations

Ƭ **Invocations**: (\{ `type`: typeof [`DECLARE`](types.md#declare) } & [`OptionalPayload`](types.md#optionalpayload)<[`DeclareContractPayload`](types.md#declarecontractpayload)\> \| \{ `type`: typeof [`DEPLOY`](types.md#deploy) } & [`OptionalPayload`](types.md#optionalpayload)<[`AllowArray`](types.md#allowarray)<[`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload)\>\> \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) } & [`OptionalPayload`](types.md#optionalpayload)<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> \| \{ `type`: typeof [`INVOKE`](types.md#invoke) } & [`OptionalPayload`](types.md#optionalpayload)<[`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\>\>)[]

Invocations array user provide to bulk method (simulate)

#### Defined in

[src/types/lib/index.ts:257](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L257)

---

### Tupled

Ƭ **Tupled**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `element` | `any`    |
| `type`    | `string` |

#### Defined in

[src/types/lib/index.ts:268](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L268)

---

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [inputName: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`BigNumberish`](types.md#bignumberish)[] \| [`ParsedStruct`](types.md#parsedstruct) \| [`ParsedStruct`](types.md#parsedstruct)[]

#### Defined in

[src/types/lib/index.ts:270](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L270)

---

### ParsedStruct

Ƭ **ParsedStruct**: `Object`

#### Index signature

▪ [key: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`BigNumberish`](types.md#bignumberish)[] \| [`ParsedStruct`](types.md#parsedstruct) \| [`Uint256`](../interfaces/types.Uint256.md)

#### Defined in

[src/types/lib/index.ts:273](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L273)

---

### waitForTransactionOptions

Ƭ **waitForTransactionOptions**: `Object`

#### Type declaration

| Name             | Type                                                                                                                                             |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `retryInterval?` | `number`                                                                                                                                         |
| `successStates?` | ([`TransactionFinalityStatus`](types.md#transactionfinalitystatus-1) \| [`TransactionExecutionStatus`](types.md#transactionexecutionstatus-1))[] |
| `errorStates?`   | ([`TransactionFinalityStatus`](types.md#transactionfinalitystatus-1) \| [`TransactionExecutionStatus`](types.md#transactionexecutionstatus-1))[] |

#### Defined in

[src/types/lib/index.ts:277](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L277)

---

### getSimulateTransactionOptions

Ƭ **getSimulateTransactionOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `skipValidate?`    | `boolean`                                     |
| `skipExecute?`     | `boolean`                                     |
| `skipFeeCharge?`   | `boolean`                                     |

#### Defined in

[src/types/lib/index.ts:283](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L283)

---

### getContractVersionOptions

Ƭ **getContractVersionOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `compiler?`        | `boolean`                                     |

#### Defined in

[src/types/lib/index.ts:290](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L290)

---

### getEstimateFeeBulkOptions

Ƭ **getEstimateFeeBulkOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `skipValidate?`    | `boolean`                                     |

#### Defined in

[src/types/lib/index.ts:295](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L295)

---

### ContractVersion

Ƭ **ContractVersion**: `Object`

Represent Contract version

#### Type declaration

| Name       | Type                                          | Description                                                |
| :--------- | :-------------------------------------------- | :--------------------------------------------------------- |
| `cairo`    | [`CairoVersion`](types.md#cairoversion)       | version of the cairo language                              |
| `compiler` | [`CompilerVersion`](types.md#compilerversion) | version of the cairo compiler used to compile the contract |

#### Defined in

[src/types/lib/index.ts:309](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L309)

---

### ContractClass

Ƭ **ContractClass**: [`LegacyContractClass`](types.md#legacycontractclass) \| [`SierraContractClass`](types.md#sierracontractclass)

format produced after compressing compiled contract

CompressedCompiledContract

#### Defined in

[src/types/lib/contract/index.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L11)

---

### CompiledContract

Ƭ **CompiledContract**: [`LegacyCompiledContract`](types.md#legacycompiledcontract) \| [`CompiledSierra`](types.md#compiledsierra)

format produced after compile .cairo to .json

#### Defined in

[src/types/lib/contract/index.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L16)

---

### CairoContract

Ƭ **CairoContract**: [`ContractClass`](types.md#contractclass) \| [`CompiledContract`](types.md#compiledcontract)

Compressed or decompressed Cairo0 or Cairo1 Contract

#### Defined in

[src/types/lib/contract/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L21)

---

### EntryPointType

Ƭ **EntryPointType**: `ValuesType`<typeof [`EntryPointType`](types.md#entrypointtype-1)\>

#### Defined in

[src/types/lib/contract/index.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L24)

[src/types/lib/contract/index.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L30)

---

### Abi

Ƭ **Abi**: `ReadonlyArray`<[`FunctionAbi`](types.md#functionabi) \| [`AbiEvent`](types.md#abievent) \| [`AbiStruct`](types.md#abistruct) \| [`InterfaceAbi`](types.md#interfaceabi) \| `any`\>

ABI

#### Defined in

[src/types/lib/contract/abi.ts:4](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L4)

---

### AbiEntry

Ƭ **AbiEntry**: `Object`

#### Type declaration

| Name   | Type                                           |
| :----- | :--------------------------------------------- |
| `name` | `string`                                       |
| `type` | `"felt"` \| `"felt*"` \| `"event"` \| `string` |

#### Defined in

[src/types/lib/contract/abi.ts:7](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L7)

---

### EventEntry

Ƭ **EventEntry**: `Object`

#### Type declaration

| Name   | Type                              |
| :----- | :-------------------------------- |
| `name` | `string`                          |
| `type` | `"felt"` \| `"felt*"` \| `string` |
| `kind` | `"key"` \| `"data"`               |

#### Defined in

[src/types/lib/contract/abi.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L9)

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

[src/types/lib/contract/abi.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L14)

---

### AbiStructs

Ƭ **AbiStructs**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiStruct`](types.md#abistruct)

#### Defined in

[src/types/lib/contract/abi.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L23)

---

### AbiStruct

Ƭ **AbiStruct**: `Object`

#### Type declaration

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `members` | [`AbiEntry`](types.md#abientry) & \{ `offset`: `number` }[] |
| `name`    | `string`                                                    |
| `size`    | `number`                                                    |
| `type`    | `"struct"`                                                  |

#### Defined in

[src/types/lib/contract/abi.ts:25](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L25)

---

### AbiInterfaces

Ƭ **AbiInterfaces**: `Object`

#### Index signature

▪ [name: `string`]: [`InterfaceAbi`](types.md#interfaceabi)

#### Defined in

[src/types/lib/contract/abi.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L32)

---

### InterfaceAbi

Ƭ **InterfaceAbi**: `Object`

#### Type declaration

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `items` | [`FunctionAbi`](types.md#functionabi)[] |
| `name`  | `string`                                |
| `type`  | `"interface"`                           |

#### Defined in

[src/types/lib/contract/abi.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L33)

---

### AbiEnums

Ƭ **AbiEnums**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiEnum`](types.md#abienum)

#### Defined in

[src/types/lib/contract/abi.ts:39](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L39)

---

### AbiEnum

Ƭ **AbiEnum**: `Object`

#### Type declaration

| Name       | Type                                                        |
| :--------- | :---------------------------------------------------------- |
| `variants` | [`AbiEntry`](types.md#abientry) & \{ `offset`: `number` }[] |
| `name`     | `string`                                                    |
| `size`     | `number`                                                    |
| `type`     | `"enum"`                                                    |

#### Defined in

[src/types/lib/contract/abi.ts:40](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L40)

---

### AbiEvents

Ƭ **AbiEvents**: `Object`

#### Index signature

▪ [hash: `string`]: [`AbiEvent`](types.md#abievent)

#### Defined in

[src/types/lib/contract/abi.ts:53](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L53)

---

### AbiEvent

Ƭ **AbiEvent**: [`CairoEvent`](types.md#cairoevent) \| [`LegacyEvent`](types.md#legacyevent)

#### Defined in

[src/types/lib/contract/abi.ts:57](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L57)

---

### CairoEvent

Ƭ **CairoEvent**: [`CairoEventDefinition`](types.md#cairoeventdefinition) \| [`AbiEvents`](types.md#abievents)

#### Defined in

[src/types/lib/contract/abi.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L60)

---

### CairoEventDefinition

Ƭ **CairoEventDefinition**: [`STRUCT_EVENT`](types.RPC.RPCSPEC07.API.md#struct_event) & \{ `name`: `string` ; `type`: `"event"` }

#### Defined in

[src/types/lib/contract/abi.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L62)

---

### CairoEventVariant

Ƭ **CairoEventVariant**: [`ENUM_EVENT`](types.RPC.RPCSPEC07.API.md#enum_event) & \{ `name`: `string` ; `type`: `string` }

#### Defined in

[src/types/lib/contract/abi.ts:67](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L67)

---

### LegacyEvent

Ƭ **LegacyEvent**: `Object`

#### Type declaration

| Name   | Type                                                      |
| :----- | :-------------------------------------------------------- |
| `name` | `string`                                                  |
| `type` | `"event"`                                                 |
| `data` | [`EVENT_FIELD`](types.RPC.RPCSPEC07.API.md#event_field)[] |
| `keys` | [`EVENT_FIELD`](types.RPC.RPCSPEC07.API.md#event_field)[] |

#### Defined in

[src/types/lib/contract/abi.ts:72](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/abi.ts#L72)

---

### LegacyContractClass

Ƭ **LegacyContractClass**: `Object`

format produced after compressing 'program' property

#### Type declaration

| Name                   | Type                                              |
| :--------------------- | :------------------------------------------------ |
| `program`              | [`CompressedProgram`](types.md#compressedprogram) |
| `entry_points_by_type` | [`EntryPointsByType`](types.md#entrypointsbytype) |
| `abi`                  | [`Abi`](types.md#abi)                             |

#### Defined in

[src/types/lib/contract/legacy.ts:7](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L7)

---

### LegacyCompiledContract

Ƭ **LegacyCompiledContract**: `Omit`<[`LegacyContractClass`](types.md#legacycontractclass), `"program"`\> & \{ `program`: [`Program`](../interfaces/types.Program.md) }

format produced after compiling .cairo to .json

#### Defined in

[src/types/lib/contract/legacy.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L16)

---

### Builtins

Ƭ **Builtins**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/legacy.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L21)

---

### CompressedProgram

Ƭ **CompressedProgram**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L22)

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

[src/types/lib/contract/legacy.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L24)

---

### ContractEntryPointFields

Ƭ **ContractEntryPointFields**: `Object`

#### Type declaration

| Name        | Type                            |
| :---------- | :------------------------------ |
| `selector`  | `string`                        |
| `offset`    | `string` \| `number`            |
| `builtins?` | [`Builtins`](types.md#builtins) |

#### Defined in

[src/types/lib/contract/legacy.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/legacy.ts#L30)

---

### CairoAssembly

Ƭ **CairoAssembly**: `Object`

SYSTEM TYPES

#### Type declaration

| Name                        | Type                                              |
| :-------------------------- | :------------------------------------------------ |
| `prime`                     | `string`                                          |
| `compiler_version`          | `string`                                          |
| `bytecode`                  | [`ByteCode`](types.md#bytecode)                   |
| `hints`                     | `any`[]                                           |
| `pythonic_hints?`           | [`PythonicHints`](types.md#pythonichints)         |
| `bytecode_segment_lengths?` | `number`[]                                        |
| `entry_points_by_type`      | [`EntryPointsByType`](types.md#entrypointsbytype) |

#### Defined in

[src/types/lib/contract/sierra.ts:5](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L5)

---

### CompiledSierra

Ƭ **CompiledSierra**: `Object`

format produced after starknet-compile .cairo to .json

sierra_program is hex array

#### Type declaration

| Name                         | Type                                                          |
| :--------------------------- | :------------------------------------------------------------ |
| `sierra_program`             | [`ByteCode`](types.md#bytecode)                               |
| `sierra_program_debug_info?` | [`SierraProgramDebugInfo`](types.md#sierraprogramdebuginfo)   |
| `contract_class_version`     | `string`                                                      |
| `entry_points_by_type`       | [`SierraEntryPointsByType`](types.md#sierraentrypointsbytype) |
| `abi`                        | [`Abi`](types.md#abi)                                         |

#### Defined in

[src/types/lib/contract/sierra.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L21)

---

### SierraContractClass

Ƭ **SierraContractClass**: `Omit`<[`CompiledSierra`](types.md#compiledsierra), `"abi"` \| `"sierra_program_debug_info"`\> & \{ `sierra_program`: `string` ; `abi`: `string` }

format produced after compressing 'sierra_program', stringifies 'abi' property and omit sierra_program_debug_info

CompressedCompiledSierra

#### Defined in

[src/types/lib/contract/sierra.ts:34](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L34)

---

### CompiledSierraCasm

Ƭ **CompiledSierraCasm**: [`CairoAssembly`](types.md#cairoassembly)

#### Defined in

[src/types/lib/contract/sierra.ts:38](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L38)

---

### ByteCode

Ƭ **ByteCode**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/sierra.ts:41](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L41)

---

### PythonicHints

Ƭ **PythonicHints**: [`number`, `string`[]][]

#### Defined in

[src/types/lib/contract/sierra.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L42)

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

[src/types/lib/contract/sierra.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L44)

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

[src/types/lib/contract/sierra.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L50)

---

### SierraContractEntryPointFields

Ƭ **SierraContractEntryPointFields**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `selector`     | `string` |
| `function_idx` | `number` |

#### Defined in

[src/types/lib/contract/sierra.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/sierra.ts#L56)

---

### RpcProviderOptions

Ƭ **RpcProviderOptions**: `Object`

#### Type declaration

| Name                                         | Type                                                                                        |
| :------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `nodeUrl?`                                   | `string` \| [`NetworkName`](../enums/constants.NetworkName.md)                              |
| `retries?`                                   | `number`                                                                                    |
| `transactionRetryIntervalFallback?`          | `number`                                                                                    |
| `headers?`                                   | `object`                                                                                    |
| `blockIdentifier?`                           | [`BlockIdentifier`](types.md#blockidentifier)                                               |
| `chainId?`                                   | [`StarknetChainId`](../enums/constants.StarknetChainId.md)                                  |
| `specVersion?`                               | `string`                                                                                    |
| `default?`                                   | `boolean`                                                                                   |
| `waitMode?`                                  | `boolean`                                                                                   |
| `baseFetch?`                                 | `WindowOrWorkerGlobalScope`[``"fetch"``]                                                    |
| `feeMarginPercentage?`                       | \{ `l1BoundMaxAmount`: `number` ; `l1BoundMaxPricePerUnit`: `number` ; `maxFee`: `number` } |
| `feeMarginPercentage.l1BoundMaxAmount`       | `number`                                                                                    |
| `feeMarginPercentage.l1BoundMaxPricePerUnit` | `number`                                                                                    |
| `feeMarginPercentage.maxFee`                 | `number`                                                                                    |
| `batch?`                                     | `false` \| `number`                                                                         |

#### Defined in

[src/types/provider/configuration.ts:6](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/configuration.ts#L6)

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: `Merge`<[`BlockWithTxHashes`](types.RPC.RPCSPEC06.md#blockwithtxhashes), [`BlockWithTxHashes`](types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Defined in

[src/types/provider/spec.ts:101](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/spec.ts#L101)

---

### ContractClassPayload

Ƭ **ContractClassPayload**: `Merge`<[`ContractClass`](types.RPC.RPCSPEC06.md#contractclass), [`ContractClass`](types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Defined in

[src/types/provider/spec.ts:102](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/spec.ts#L102)

---

### FeeEstimate

Ƭ **FeeEstimate**: `Merge`<[`FEE_ESTIMATE`](types.RPC.RPCSPEC06.SPEC.md#fee_estimate), [`FEE_ESTIMATE`](types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)\>

#### Defined in

[src/types/provider/spec.ts:104](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/spec.ts#L104)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: `Merge`<[`TransactionReceipt`](types.RPC.RPCSPEC06.md#transactionreceipt), [`TransactionReceipt`](types.RPC.RPCSPEC07.API.md#transactionreceipt)\>

#### Defined in

[src/types/provider/spec.ts:110](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/spec.ts#L110)

---

### GetBlockResponse

Ƭ **GetBlockResponse**: [`PendingBlock`](types.md#pendingblock) \| [`Block`](types.md#block)

#### Defined in

[src/types/provider/response.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L42)

---

### PendingBlock

Ƭ **PendingBlock**: `Object`

#### Type declaration

| Name                | Type             |
| :------------------ | :--------------- |
| `status`            | `"PENDING"`      |
| `parent_hash`       | `BLOCK_HASH`     |
| `timestamp`         | `number`         |
| `sequencer_address` | `FELT`           |
| `l1_gas_price`      | `RESOURCE_PRICE` |
| `starknet_version`  | `string`         |
| `transactions`      | `TXN_HASH`[]     |

#### Defined in

[src/types/provider/response.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L44)

---

### Block

Ƭ **Block**: `Object`

#### Type declaration

| Name                | Type                                                     |
| :------------------ | :------------------------------------------------------- |
| `status`            | `"ACCEPTED_ON_L2"` \| `"ACCEPTED_ON_L1"` \| `"REJECTED"` |
| `block_hash`        | `BLOCK_HASH`                                             |
| `parent_hash`       | `BLOCK_HASH`                                             |
| `block_number`      | `BLOCK_NUMBER`                                           |
| `new_root`          | `FELT`                                                   |
| `timestamp`         | `number`                                                 |
| `sequencer_address` | `FELT`                                                   |
| `l1_gas_price`      | `RESOURCE_PRICE`                                         |
| `starknet_version`  | `string`                                                 |
| `transactions`      | `TXN_HASH`[]                                             |

#### Defined in

[src/types/provider/response.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L54)

---

### RevertedTransactionReceiptResponse

Ƭ **RevertedTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                 | Type                                                                         |
| :------------------- | :--------------------------------------------------------------------------- |
| `type?`              | [`TransactionType`](types.md#transactiontype-1) \| `any`                     |
| `execution_status`   | typeof [`REVERTED`](types.md#reverted) \| `any`                              |
| `finality_status`    | [`TransactionFinalityStatus`](types.md#transactionfinalitystatus-1) \| `any` |
| `status?`            | [`TransactionStatus`](types.md#transactionstatus-1)                          |
| `actual_fee`         | `string`                                                                     |
| `block_hash?`        | `string`                                                                     |
| `block_number?`      | [`BlockNumber`](types.md#blocknumber)                                        |
| `transaction_hash`   | `string`                                                                     |
| `transaction_index?` | `number`                                                                     |
| `messages_sent`      | [`MessageToL1`](../interfaces/types.MessageToL1.md)[]                        |
| `events`             | `any`[]                                                                      |
| `revert_reason?`     | `string`                                                                     |

#### Defined in

[src/types/provider/response.ts:72](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L72)

---

### RejectedTransactionReceiptResponse

Ƭ **RejectedTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                                       | Type                                              |
| :----------------------------------------- | :------------------------------------------------ |
| `status`                                   | typeof [`REJECTED`](types.md#rejected)            |
| `transaction_failure_reason`               | \{ `code`: `string` ; `error_message`: `string` } |
| `transaction_failure_reason.code`          | `string`                                          |
| `transaction_failure_reason.error_message` | `string`                                          |

#### Defined in

[src/types/provider/response.ts:87](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L87)

---

### GetTxReceiptResponseWithoutHelper

Ƭ **GetTxReceiptResponseWithoutHelper**: [`SuccessfulTransactionReceiptResponse`](types.md#successfultransactionreceiptresponse) \| [`RevertedTransactionReceiptResponse`](types.md#revertedtransactionreceiptresponse) \| [`RejectedTransactionReceiptResponse`](types.md#rejectedtransactionreceiptresponse)

#### Defined in

[src/types/provider/response.ts:95](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L95)

---

### SuccessfulTransactionReceiptResponse

Ƭ **SuccessfulTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](types.md#invoketransactionreceiptresponse) \| [`DeployTransactionReceiptResponse`](types.md#deploytransactionreceiptresponse) \| [`DeclareTransactionReceiptResponse`](types.md#declaretransactionreceiptresponse)

#### Defined in

[src/types/provider/response.ts:100](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L100)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: `TransactionWithHash`

#### Defined in

[src/types/provider/response.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L105)

---

### InvokeTransactionReceiptResponse

Ƭ **InvokeTransactionReceiptResponse**: `INVOKE_TXN_RECEIPT` \| `PENDING_INVOKE_TXN_RECEIPT`

#### Defined in

[src/types/provider/response.ts:107](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L107)

---

### DeclareTransactionReceiptResponse

Ƭ **DeclareTransactionReceiptResponse**: `DECLARE_TXN_RECEIPT` \| `PENDING_DECLARE_TXN_RECEIPT`

#### Defined in

[src/types/provider/response.ts:108](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L108)

---

### DeployTransactionReceiptResponse

Ƭ **DeployTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](types.md#invoketransactionreceiptresponse)

#### Defined in

[src/types/provider/response.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L109)

---

### DeployAccountTransactionReceiptResponse

Ƭ **DeployAccountTransactionReceiptResponse**: `DEPLOY_ACCOUNT_TXN_RECEIPT` \| `PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT`

#### Defined in

[src/types/provider/response.ts:110](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L110)

---

### L1HandlerTransactionReceiptResponse

Ƭ **L1HandlerTransactionReceiptResponse**: `L1_HANDLER_TXN_RECEIPT` \| `PENDING_L1_HANDLER_TXN_RECEIPT`

#### Defined in

[src/types/provider/response.ts:113](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L113)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)[]

#### Defined in

[src/types/provider/response.ts:128](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L128)

---

### InvokeFunctionResponse

Ƭ **InvokeFunctionResponse**: `InvokedTransaction`

#### Defined in

[src/types/provider/response.ts:130](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L130)

---

### DeclareContractResponse

Ƭ **DeclareContractResponse**: `DeclaredTransaction`

#### Defined in

[src/types/provider/response.ts:132](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L132)

---

### CallContractResponse

Ƭ **CallContractResponse**: `string`[]

#### Defined in

[src/types/provider/response.ts:134](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L134)

---

### Storage

Ƭ **Storage**: `FELT`

#### Defined in

[src/types/provider/response.ts:136](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L136)

---

### Nonce

Ƭ **Nonce**: `string`

#### Defined in

[src/types/provider/response.ts:138](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L138)

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: `Merge`<[`SIMULATION_FLAG`](types.RPC.RPCSPEC06.SPEC.md#simulation_flag), [`SIMULATION_FLAG`](types.RPC.RPCSPEC07.API.SPEC.md#simulation_flag)\>

#### Defined in

[src/types/provider/spec.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/spec.ts#L60)

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.md#simulation_flag)[]

#### Defined in

[src/types/provider/response.ts:141](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L141)

---

### SimulatedTransaction

Ƭ **SimulatedTransaction**: `SimulateTransaction` & \{ `suggestedMaxFee`: `bigint` ; `resourceBounds`: `ResourceBounds` }

#### Defined in

[src/types/provider/response.ts:143](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L143)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulatedTransaction`](types.md#simulatedtransaction)[]

#### Defined in

[src/types/provider/response.ts:148](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L148)

---

### StateUpdateResponse

Ƭ **StateUpdateResponse**: [`StateUpdate`](types.md#stateupdate) \| [`PendingStateUpdate`](types.md#pendingstateupdate)

#### Defined in

[src/types/provider/response.ts:150](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L150)

---

### StateUpdate

Ƭ **StateUpdate**: `STATE_UPDATE`

#### Defined in

[src/types/provider/response.ts:151](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L151)

---

### PendingStateUpdate

Ƭ **PendingStateUpdate**: `PENDING_STATE_UPDATE`

#### Defined in

[src/types/provider/response.ts:152](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L152)

---

### ContractClassResponse

Ƭ **ContractClassResponse**: [`LegacyContractClass`](types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](types.md#compiledsierra), `"sierra_program_debug_info"`\>

Standardized type

Cairo0 program compressed and Cairo1 sierra_program decompressed

abi Abi

CompiledSierra without '.sierra_program_debug_info'

#### Defined in

[src/types/provider/response.ts:163](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/provider/response.ts#L163)

---

### UniversalSuggestedFee

Ƭ **UniversalSuggestedFee**: `Object`

#### Type declaration

| Name             | Type                                                          |
| :--------------- | :------------------------------------------------------------ |
| `maxFee`         | [`BigNumberish`](types.md#bignumberish)                       |
| `resourceBounds` | [`ResourceBounds`](types.RPC.RPCSPEC07.API.md#resourcebounds) |

#### Defined in

[src/types/account.ts:17](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L17)

---

### EstimateFeeBulk

Ƭ **EstimateFeeBulk**: [`EstimateFee`](../interfaces/types.EstimateFee.md)[]

#### Defined in

[src/types/account.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L22)

---

### AccountInvocationsFactoryDetails

Ƭ **AccountInvocationsFactoryDetails**: \{ `versions`: \`$\{ETransactionVersion}\`[] ; `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate?`: `boolean` } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/account.ts:25](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L25)

---

### MultiDeployContractResponse

Ƭ **MultiDeployContractResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`[] |
| `transaction_hash` | `string`   |

#### Defined in

[src/types/account.ts:53](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L53)

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

[src/types/account.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L58)

---

### DeclareDeployUDCResponse

Ƭ **DeclareDeployUDCResponse**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                       |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declare` | \{ `class_hash`: [`BigNumberish`](types.md#bignumberish) } & `Partial`<[`DeclareTransactionReceiptResponse`](types.md#declaretransactionreceiptresponse)\> |
| `deploy`  | [`DeployContractUDCResponse`](types.md#deploycontractudcresponse)                                                                                          |

#### Defined in

[src/types/account.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L70)

---

### SimulateTransactionDetails

Ƭ **SimulateTransactionDetails**: \{ `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate?`: `boolean` ; `skipExecute?`: `boolean` } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/account.ts:77](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L77)

---

### EstimateFeeAction

Ƭ **EstimateFeeAction**: \{ `type`: typeof [`INVOKE`](types.md#invoke) ; `payload`: [`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\> } \| \{ `type`: typeof [`DECLARE`](types.md#declare) ; `payload`: [`DeclareContractPayload`](types.md#declarecontractpayload) } \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) ; `payload`: [`DeployAccountContractPayload`](types.md#deployaccountcontractpayload) } \| \{ `type`: typeof [`DEPLOY`](types.md#deploy) ; `payload`: [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload) }

#### Defined in

[src/types/account.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L84)

---

### StarkProfile

Ƭ **StarkProfile**: `Object`

#### Type declaration

| Name                 | Type      |
| :------------------- | :-------- |
| `name?`              | `string`  |
| `profilePicture?`    | `string`  |
| `discord?`           | `string`  |
| `twitter?`           | `string`  |
| `github?`            | `string`  |
| `proofOfPersonhood?` | `boolean` |

#### Defined in

[src/types/account.ts:102](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/account.ts#L102)

---

### CairoEnum

Ƭ **CairoEnum**: [`CairoCustomEnum`](../classes/CairoCustomEnum.md) \| [`CairoOption`](../classes/CairoOption.md)<`any`\> \| [`CairoResult`](../classes/CairoResult.md)<`any`, `any`\>

#### Defined in

[src/types/cairoEnum.ts:3](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/cairoEnum.ts#L3)

---

### ValidateType

Ƭ **ValidateType**: `ValuesType`<typeof [`ValidateType`](types.md#validatetype-1)\>

#### Defined in

[src/types/calldata.ts:3](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L3)

[src/types/calldata.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L9)

---

### Uint

Ƭ **Uint**: `ValuesType`<typeof [`Uint`](types.md#uint-1)\>

#### Defined in

[src/types/calldata.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L11)

[src/types/calldata.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L21)

---

### Literal

Ƭ **Literal**: `ValuesType`<typeof [`Literal`](types.md#literal-1)\>

#### Defined in

[src/types/calldata.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L23)

[src/types/calldata.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L30)

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

[src/types/contract.ts:13](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L13)

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

[src/types/contract.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L14)

---

### Result

Ƭ **Result**: \{ `[key: string]`: `any`; } \| [`Result`](types.md#result)[] \| `bigint` \| `string` \| `boolean` \| [`CairoEnum`](types.md#cairoenum)

#### Defined in

[src/types/contract.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L16)

---

### ArgsOrCalldata

Ƭ **ArgsOrCalldata**: [`RawArgsArray`](types.md#rawargsarray) \| [[`Calldata`](types.md#calldata)] \| [`Calldata`](types.md#calldata)

#### Defined in

[src/types/contract.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L26)

---

### ArgsOrCalldataWithOptions

Ƭ **ArgsOrCalldataWithOptions**: [`ArgsOrCalldata`](types.md#argsorcalldata) & [`ContractOptions`](types.md#contractoptions)

#### Defined in

[src/types/contract.ts:27](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L27)

---

### ContractOptions

Ƭ **ContractOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `parseRequest?`    | `boolean`                                     |
| `parseResponse?`   | `boolean`                                     |
| `formatResponse?`  | \{ `[key: string]`: `any`; }                  |
| `maxFee?`          | [`BigNumberish`](types.md#bignumberish)       |
| `nonce?`           | [`BigNumberish`](types.md#bignumberish)       |
| `signature?`       | [`Signature`](types.md#signature)             |
| `addressSalt?`     | `string`                                      |

#### Defined in

[src/types/contract.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L28)

---

### CallOptions

Ƭ **CallOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"blockIdentifier"` \| `"parseRequest"` \| `"parseResponse"` \| `"formatResponse"`\>

#### Defined in

[src/types/contract.ts:39](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L39)

---

### InvokeOptions

Ƭ **InvokeOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"maxFee"` \| `"nonce"` \| `"signature"` \| `"parseRequest"`\>

#### Defined in

[src/types/contract.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L44)

---

### ParsedEvent

Ƭ **ParsedEvent**: \{ `[name: string]`: [`ParsedStruct`](types.md#parsedstruct); } & \{ `block_hash?`: [`BlockHash`](types.RPC.RPCSPEC07.API.md#blockhash) ; `block_number?`: [`BlockNumber`](types.md#blocknumber) ; `transaction_hash?`: [`TransactionHash`](types.RPC.RPCSPEC07.API.md#transactionhash) }

#### Defined in

[src/types/contract.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L49)

---

### ParsedEvents

Ƭ **ParsedEvents**: [`ParsedEvent`](types.md#parsedevent)[]

#### Defined in

[src/types/contract.ts:55](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/contract.ts#L55)

---

### RPC_ERROR_SET

Ƭ **RPC_ERROR_SET**: `Object`

#### Type declaration

| Name                                 | Type                                                                                                                       |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `FAILED_TO_RECEIVE_TXN`              | [`FAILED_TO_RECEIVE_TXN`](../interfaces/types.RPC.RPCSPEC07.API.Errors.FAILED_TO_RECEIVE_TXN.md)                           |
| `NO_TRACE_AVAILABLE`                 | [`NO_TRACE_AVAILABLE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.NO_TRACE_AVAILABLE.md)                                 |
| `CONTRACT_NOT_FOUND`                 | [`CONTRACT_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC07.API.Errors.CONTRACT_NOT_FOUND.md)                                 |
| `BLOCK_NOT_FOUND`                    | [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC07.API.Errors.BLOCK_NOT_FOUND.md)                                       |
| `INVALID_TXN_INDEX`                  | [`INVALID_TXN_INDEX`](../interfaces/types.RPC.RPCSPEC07.API.Errors.INVALID_TXN_INDEX.md)                                   |
| `CLASS_HASH_NOT_FOUND`               | [`CLASS_HASH_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC07.API.Errors.CLASS_HASH_NOT_FOUND.md)                             |
| `TXN_HASH_NOT_FOUND`                 | [`TXN_HASH_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC07.API.Errors.TXN_HASH_NOT_FOUND.md)                                 |
| `PAGE_SIZE_TOO_BIG`                  | [`PAGE_SIZE_TOO_BIG`](../interfaces/types.RPC.RPCSPEC07.API.Errors.PAGE_SIZE_TOO_BIG.md)                                   |
| `NO_BLOCKS`                          | [`NO_BLOCKS`](../interfaces/types.RPC.RPCSPEC07.API.Errors.NO_BLOCKS.md)                                                   |
| `INVALID_CONTINUATION_TOKEN`         | [`INVALID_CONTINUATION_TOKEN`](../interfaces/types.RPC.RPCSPEC07.API.Errors.INVALID_CONTINUATION_TOKEN.md)                 |
| `TOO_MANY_KEYS_IN_FILTER`            | [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/types.RPC.RPCSPEC07.API.Errors.TOO_MANY_KEYS_IN_FILTER.md)                       |
| `CONTRACT_ERROR`                     | [`CONTRACT_ERROR`](../interfaces/types.RPC.RPCSPEC07.API.Errors.CONTRACT_ERROR.md)                                         |
| `TRANSACTION_EXECUTION_ERROR`        | [`TRANSACTION_EXECUTION_ERROR`](../interfaces/types.RPC.RPCSPEC07.API.Errors.TRANSACTION_EXECUTION_ERROR.md)               |
| `CLASS_ALREADY_DECLARED`             | [`CLASS_ALREADY_DECLARED`](../interfaces/types.RPC.RPCSPEC07.API.Errors.CLASS_ALREADY_DECLARED.md)                         |
| `INVALID_TRANSACTION_NONCE`          | [`INVALID_TRANSACTION_NONCE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.INVALID_TRANSACTION_NONCE.md)                   |
| `INSUFFICIENT_MAX_FEE`               | [`INSUFFICIENT_MAX_FEE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.INSUFFICIENT_MAX_FEE.md)                             |
| `INSUFFICIENT_ACCOUNT_BALANCE`       | [`INSUFFICIENT_ACCOUNT_BALANCE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.INSUFFICIENT_ACCOUNT_BALANCE.md)             |
| `VALIDATION_FAILURE`                 | [`VALIDATION_FAILURE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.VALIDATION_FAILURE.md)                                 |
| `COMPILATION_FAILED`                 | [`COMPILATION_FAILED`](../interfaces/types.RPC.RPCSPEC07.API.Errors.COMPILATION_FAILED.md)                                 |
| `CONTRACT_CLASS_SIZE_IS_TOO_LARGE`   | [`CONTRACT_CLASS_SIZE_IS_TOO_LARGE`](../interfaces/types.RPC.RPCSPEC07.API.Errors.CONTRACT_CLASS_SIZE_IS_TOO_LARGE.md)     |
| `NON_ACCOUNT`                        | [`NON_ACCOUNT`](../interfaces/types.RPC.RPCSPEC07.API.Errors.NON_ACCOUNT.md)                                               |
| `DUPLICATE_TX`                       | [`DUPLICATE_TX`](../interfaces/types.RPC.RPCSPEC07.API.Errors.DUPLICATE_TX.md)                                             |
| `COMPILED_CLASS_HASH_MISMATCH`       | [`COMPILED_CLASS_HASH_MISMATCH`](../interfaces/types.RPC.RPCSPEC07.API.Errors.COMPILED_CLASS_HASH_MISMATCH.md)             |
| `UNSUPPORTED_TX_VERSION`             | [`UNSUPPORTED_TX_VERSION`](../interfaces/types.RPC.RPCSPEC07.API.Errors.UNSUPPORTED_TX_VERSION.md)                         |
| `UNSUPPORTED_CONTRACT_CLASS_VERSION` | [`UNSUPPORTED_CONTRACT_CLASS_VERSION`](../interfaces/types.RPC.RPCSPEC07.API.Errors.UNSUPPORTED_CONTRACT_CLASS_VERSION.md) |
| `UNEXPECTED_ERROR`                   | [`UNEXPECTED_ERROR`](../interfaces/types.RPC.RPCSPEC07.API.Errors.UNEXPECTED_ERROR.md)                                     |

#### Defined in

[src/types/errors.ts:4](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/errors.ts#L4)

---

### RPC_ERROR

Ƭ **RPC_ERROR**: [`RPC_ERROR_SET`](types.md#rpc_error_set)[keyof [`RPC_ERROR_SET`](types.md#rpc_error_set)]

#### Defined in

[src/types/errors.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/errors.ts#L33)

---

### InvocationsSignerDetails

Ƭ **InvocationsSignerDetails**: [`V2InvocationsSignerDetails`](types.md#v2invocationssignerdetails) \| [`V3InvocationsSignerDetails`](types.md#v3invocationssignerdetails) & \{ `version`: \`$\{ETransactionVersion}\` ; `skipValidate?`: `boolean` }

#### Defined in

[src/types/signer.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L11)

---

### V2InvocationsSignerDetails

Ƭ **V2InvocationsSignerDetails**: `Object`

#### Type declaration

| Name            | Type                                                       |
| :-------------- | :--------------------------------------------------------- |
| `walletAddress` | `string`                                                   |
| `cairoVersion`  | [`CairoVersion`](types.md#cairoversion)                    |
| `chainId`       | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`         | [`BigNumberish`](types.md#bignumberish)                    |
| `maxFee`        | [`BigNumberish`](types.md#bignumberish)                    |
| `version`       | \`$\{ETransactionVersion2}\`                               |

#### Defined in

[src/types/signer.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L16)

---

### V3InvocationsSignerDetails

Ƭ **V3InvocationsSignerDetails**: [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `walletAddress`: `string` ; `cairoVersion`: [`CairoVersion`](types.md#cairoversion) ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:25](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L25)

---

### DeclareSignerDetails

Ƭ **DeclareSignerDetails**: [`V3DeclareSignerDetails`](types.md#v3declaresignerdetails) \| [`V2DeclareSignerDetails`](types.md#v2declaresignerdetails) & \{ `version`: \`$\{ETransactionVersion}\` }

#### Defined in

[src/types/signer.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L32)

---

### V2DeclareSignerDetails

Ƭ **V2DeclareSignerDetails**: `Required`<[`InvocationsDetails`](types.md#invocationsdetails)\> & \{ `classHash`: `string` ; `compiledClassHash?`: `string` ; `senderAddress`: `string` ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) ; `version`: \`$\{ETransactionVersion2}\` }

#### Defined in

[src/types/signer.ts:36](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L36)

---

### V3DeclareSignerDetails

Ƭ **V3DeclareSignerDetails**: [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `classHash`: `string` ; `compiledClassHash`: `string` ; `senderAddress`: `string` ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:44](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L44)

---

### DeployAccountSignerDetails

Ƭ **DeployAccountSignerDetails**: [`V2DeployAccountSignerDetails`](types.md#v2deployaccountsignerdetails) \| [`V3DeployAccountSignerDetails`](types.md#v3deployaccountsignerdetails)

#### Defined in

[src/types/signer.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L52)

---

### V2DeployAccountSignerDetails

Ƭ **V2DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> & `Required`<[`InvocationsDetails`](types.md#invocationsdetails)\> & \{ `contractAddress`: [`BigNumberish`](types.md#bignumberish) ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) ; `version`: \`$\{ETransactionVersion2}\` }

#### Defined in

[src/types/signer.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L56)

---

### V3DeployAccountSignerDetails

Ƭ **V3DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> & [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `contractAddress`: [`BigNumberish`](types.md#bignumberish) ; `chainId`: [`StarknetChainId`](../enums/constants.StarknetChainId.md) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:63](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L63)

---

### LedgerPathCalculation

Ƭ **LedgerPathCalculation**: (`accountId`: `number`, `applicationName`: `string`) => `Uint8Array`

#### Type declaration

▸ (`accountId`, `applicationName`): `Uint8Array`

##### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `accountId`       | `number` |
| `applicationName` | `string` |

##### Returns

`Uint8Array`

#### Defined in

[src/types/signer.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/signer.ts#L70)

---

### TransactionStatusReceiptSets

Ƭ **TransactionStatusReceiptSets**: `Object`

#### Type declaration

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `success`  | [`SuccessfulTransactionReceiptResponse`](types.md#successfultransactionreceiptresponse) |
| `reverted` | [`RevertedTransactionReceiptResponse`](types.md#revertedtransactionreceiptresponse)     |
| `rejected` | [`RejectedTransactionReceiptResponse`](types.md#rejectedtransactionreceiptresponse)     |
| `error`    | `Error`                                                                                 |

#### Defined in

[src/types/transactionReceipt.ts:7](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L7)

---

### TransactionReceiptStatus

Ƭ **TransactionReceiptStatus**: keyof [`TransactionStatusReceiptSets`](types.md#transactionstatusreceiptsets)

#### Defined in

[src/types/transactionReceipt.ts:13](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L13)

---

### TransactionReceiptValue

Ƭ **TransactionReceiptValue**: [`TransactionStatusReceiptSets`](types.md#transactionstatusreceiptsets)[[`TransactionReceiptStatus`](types.md#transactionreceiptstatus)]

#### Defined in

[src/types/transactionReceipt.ts:14](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L14)

---

### TransactionReceiptCallbacksDefined

Ƭ **TransactionReceiptCallbacksDefined**: \{ [key in TransactionReceiptStatus]: Function }

#### Defined in

[src/types/transactionReceipt.ts:16](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L16)

---

### TransactionReceiptCallbacksDefault

Ƭ **TransactionReceiptCallbacksDefault**: `Partial`<[`TransactionReceiptCallbacksDefined`](types.md#transactionreceiptcallbacksdefined)\> & \{ `_`: () => `void` }

#### Defined in

[src/types/transactionReceipt.ts:19](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L19)

---

### TransactionReceiptCallbacks

Ƭ **TransactionReceiptCallbacks**: [`TransactionReceiptCallbacksDefined`](types.md#transactionreceiptcallbacksdefined) \| [`TransactionReceiptCallbacksDefault`](types.md#transactionreceiptcallbacksdefault)

#### Defined in

[src/types/transactionReceipt.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L22)

---

### TransactionReceiptUtilityInterface

Ƭ **TransactionReceiptUtilityInterface**: \{ `statusReceipt`: [`TransactionReceiptStatus`](types.md#transactionreceiptstatus) ; `value`: [`TransactionReceiptValue`](types.md#transactionreceiptvalue) ; `match`: (`callbacks`: [`TransactionReceiptCallbacks`](types.md#transactionreceiptcallbacks)) => `void` } & \{ [key in \`is$\{Capitalize<TransactionReceiptStatus\>}\`]: Function }

#### Defined in

[src/types/transactionReceipt.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/transactionReceipt.ts#L26)

## Variables

### TransactionType

• `Const` **TransactionType**: `Object`

#### Type declaration

| Name             | Type                |
| :--------------- | :------------------ |
| `DECLARE`        | `"DECLARE"`         |
| `DEPLOY`         | `"DEPLOY"`          |
| `DEPLOY_ACCOUNT` | `"DEPLOY_ACCOUNT"`  |
| `INVOKE`         | `"INVOKE_FUNCTION"` |

#### Defined in

[src/types/lib/index.ts:169](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L169)

[src/types/lib/index.ts:176](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L176)

---

### TransactionStatus

• `Const` **TransactionStatus**: `Object`

new statuses are defined by props: finality_status and execution_status
to be #deprecated

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `NOT_RECEIVED`   | `"NOT_RECEIVED"`   |
| `RECEIVED`       | `"RECEIVED"`       |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |
| `REJECTED`       | `"REJECTED"`       |
| `REVERTED`       | `"REVERTED"`       |

#### Defined in

[src/types/lib/index.ts:182](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L182)

[src/types/lib/index.ts:191](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L191)

---

### TransactionFinalityStatus

• `Const` **TransactionFinalityStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `NOT_RECEIVED`   | `"NOT_RECEIVED"`   |
| `RECEIVED`       | `"RECEIVED"`       |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

[src/types/lib/index.ts:193](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L193)

[src/types/lib/index.ts:200](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L200)

---

### TransactionExecutionStatus

• `Const` **TransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `REJECTED`  | `"REJECTED"`  |
| `REVERTED`  | `"REVERTED"`  |
| `SUCCEEDED` | `"SUCCEEDED"` |

#### Defined in

[src/types/lib/index.ts:202](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L202)

[src/types/lib/index.ts:208](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L208)

---

### BlockStatus

• `Const` **BlockStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `PENDING`        | `"PENDING"`        |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `REJECTED`       | `"REJECTED"`       |

#### Defined in

[src/types/lib/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L210)

[src/types/lib/index.ts:217](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L217)

---

### BlockTag

• `Const` **BlockTag**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `PENDING` | `"pending"` |
| `LATEST`  | `"latest"`  |

#### Defined in

[src/types/lib/index.ts:219](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L219)

[src/types/lib/index.ts:224](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/index.ts#L224)

---

### EntryPointType

• `Const` **EntryPointType**: `Object`

#### Type declaration

| Name          | Type            |
| :------------ | :-------------- |
| `EXTERNAL`    | `"EXTERNAL"`    |
| `L1_HANDLER`  | `"L1_HANDLER"`  |
| `CONSTRUCTOR` | `"CONSTRUCTOR"` |

#### Defined in

[src/types/lib/contract/index.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L24)

[src/types/lib/contract/index.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/lib/contract/index.ts#L30)

---

### ValidateType

• `Const` **ValidateType**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `DEPLOY` | `"DEPLOY"` |
| `CALL`   | `"CALL"`   |
| `INVOKE` | `"INVOKE"` |

#### Defined in

[src/types/calldata.ts:3](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L3)

[src/types/calldata.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L9)

---

### Uint

• `Const` **Uint**: `Object`

#### Type declaration

| Name   | Type                    |
| :----- | :---------------------- |
| `u8`   | `"core::integer::u8"`   |
| `u16`  | `"core::integer::u16"`  |
| `u32`  | `"core::integer::u32"`  |
| `u64`  | `"core::integer::u64"`  |
| `u128` | `"core::integer::u128"` |
| `u256` | `"core::integer::u256"` |
| `u512` | `"core::integer::u512"` |

#### Defined in

[src/types/calldata.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L11)

[src/types/calldata.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L21)

---

### Literal

• `Const` **Literal**: `Object`

#### Type declaration

| Name              | Type                                                                            |
| :---------------- | :------------------------------------------------------------------------------ |
| `ClassHash`       | `"core::starknet::class_hash::ClassHash"`                                       |
| `ContractAddress` | `"core::starknet::contract_address::ContractAddress"`                           |
| `Secp256k1Point`  | `"core::starknet::secp256k1::Secp256k1Point"`                                   |
| `U96`             | `"core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>"` |

#### Defined in

[src/types/calldata.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L23)

[src/types/calldata.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L30)

---

### ETH_ADDRESS

• `Const` **ETH_ADDRESS**: `"core::starknet::eth_address::EthAddress"`

#### Defined in

[src/types/calldata.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L32)

---

### NON_ZERO_PREFIX

• `Const` **NON_ZERO_PREFIX**: `"core::zeroable::NonZero::"`

#### Defined in

[src/types/calldata.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/calldata.ts#L33)

---

### OutsideExecutionTypesV1

• `Const` **OutsideExecutionTypesV1**: `Object`

#### Type declaration

| Name               | Type                                                          |
| :----------------- | :------------------------------------------------------------ |
| `StarkNetDomain`   | \{ `name`: `string` = 'name'; `type`: `string` = 'felt' }[]   |
| `OutsideExecution` | \{ `name`: `string` = 'caller'; `type`: `string` = 'felt' }[] |
| `OutsideCall`      | \{ `name`: `string` = 'to'; `type`: `string` = 'felt' }[]     |

#### Defined in

[src/types/outsideExecution.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/outsideExecution.ts#L33)

---

### OutsideExecutionTypesV2

• `Const` **OutsideExecutionTypesV2**: `Object`

#### Type declaration

| Name               | Type                                                                     |
| :----------------- | :----------------------------------------------------------------------- |
| `StarknetDomain`   | \{ `name`: `string` = 'name'; `type`: `string` = 'shortstring' }[]       |
| `OutsideExecution` | \{ `name`: `string` = 'Caller'; `type`: `string` = 'ContractAddress' }[] |
| `Call`             | \{ `name`: `string` = 'To'; `type`: `string` = 'ContractAddress' }[]     |

#### Defined in

[src/types/outsideExecution.ts:55](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/types/outsideExecution.ts#L55)
