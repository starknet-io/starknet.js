---
id: 'types'
title: 'Namespace: types'
sidebar_label: 'types'
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [RPC](types.RPC.md)

## Interfaces

- [Uint256](../interfaces/types.Uint256.md)
- [Uint512](../interfaces/types.Uint512.md)
- [Program](../interfaces/types.Program.md)
- [ProviderOptions](../interfaces/types.ProviderOptions.md)
- [EstimateFee](../interfaces/types.EstimateFee.md)
- [UniversalDetails](../interfaces/types.UniversalDetails.md)
- [PaymasterDetails](../interfaces/types.PaymasterDetails.md)
- [EstimateFeeDetails](../interfaces/types.EstimateFeeDetails.md)
- [DeployContractResponse](../interfaces/types.DeployContractResponse.md)
- [OutsideExecutionOptions](../interfaces/types.OutsideExecutionOptions.md)
- [OutsideCall](../interfaces/types.OutsideCall.md)
- [OutsideExecution](../interfaces/types.OutsideExecution.md)
- [OutsideTransaction](../interfaces/types.OutsideTransaction.md)
- [PaymasterOptions](../interfaces/types.PaymasterOptions.md)
- [TokenData](../interfaces/types.TokenData.md)
- [PaymasterTimeBounds](../interfaces/types.PaymasterTimeBounds.md)

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

[src/types/lib/index.ts:10](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L10)

---

### ArraySignatureType

Ƭ **ArraySignatureType**: `string`[]

#### Defined in

[src/types/lib/index.ts:11](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L11)

---

### Signature

Ƭ **Signature**: [`ArraySignatureType`](types.md#arraysignaturetype) \| [`WeierstrassSignatureType`](types.md#weierstrasssignaturetype)

#### Defined in

[src/types/lib/index.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L12)

---

### BigNumberish

Ƭ **BigNumberish**: `string` \| `number` \| `bigint`

#### Defined in

[src/types/lib/index.ts:14](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L14)

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

[src/types/lib/index.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L16)

---

### Calldata

Ƭ **Calldata**: `string`[] & \{ `__compiled__?`: `true` }

Compiled calldata ready to be sent

decimal-string array

#### Defined in

[src/types/lib/index.ts:27](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L27)

---

### RawCalldata

Ƭ **RawCalldata**: [`BigNumberish`](types.md#bignumberish)[]

BigNumberish array

use CallData.compile() to convert to Calldata

#### Defined in

[src/types/lib/index.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L56)

---

### HexCalldata

Ƭ **HexCalldata**: `string`[]

Hexadecimal-string array

#### Defined in

[src/types/lib/index.ts:61](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L61)

---

### AllowArray

Ƭ **AllowArray**<`T`\>: `T` \| `T`[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L63)

---

### OptionalPayload

Ƭ **OptionalPayload**<`T`\>: \{ `payload`: `T` } \| `T`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/lib/index.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L65)

---

### RawArgs

Ƭ **RawArgs**: [`RawArgsObject`](types.md#rawargsobject) \| [`RawArgsArray`](types.md#rawargsarray)

#### Defined in

[src/types/lib/index.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L67)

---

### RawArgsObject

Ƭ **RawArgsObject**: `Object`

#### Index signature

▪ [inputName: `string`]: [`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs)

#### Defined in

[src/types/lib/index.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L69)

---

### RawArgsArray

Ƭ **RawArgsArray**: ([`MultiType`](types.md#multitype) \| [`MultiType`](types.md#multitype)[] \| [`RawArgs`](types.md#rawargs))[]

#### Defined in

[src/types/lib/index.ts:73](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L73)

---

### MultiType

Ƭ **MultiType**: [`BigNumberish`](types.md#bignumberish) \| [`Uint256`](../interfaces/types.Uint256.md) \| `object` \| `boolean` \| [`CairoEnum`](types.md#cairoenum)

#### Defined in

[src/types/lib/index.ts:75](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L75)

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

[src/types/lib/index.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L77)

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

[src/types/lib/index.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L84)

---

### DeployAccountContractTransaction

Ƭ **DeployAccountContractTransaction**: `Omit`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload), `"contractAddress"`\> & \{ `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:91](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L91)

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

[src/types/lib/index.ts:98](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L98)

---

### ContractClassIdentifier

Ƭ **ContractClassIdentifier**: [`DeclareContractPayload`](types.md#declarecontractpayload) \| \{ `classHash`: `string` }

DeclareContractPayload with classHash or contract defined

#### Defined in

[src/types/lib/index.ts:108](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L108)

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

[src/types/lib/index.ts:110](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L110)

---

### DeclareAndDeployContractPayload

Ƭ **DeclareAndDeployContractPayload**: `Omit`<[`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload), `"classHash"`\> & [`DeclareContractPayload`](types.md#declarecontractpayload)

#### Defined in

[src/types/lib/index.ts:117](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L117)

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

[src/types/lib/index.ts:120](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L120)

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

[src/types/lib/index.ts:127](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L127)

---

### Invocation

Ƭ **Invocation**: [`CallDetails`](types.md#calldetails) & \{ `signature?`: [`Signature`](types.md#signature) }

#### Defined in

[src/types/lib/index.ts:133](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L133)

---

### Call

Ƭ **Call**: [`CallDetails`](types.md#calldetails) & \{ `entrypoint`: `string` }

#### Defined in

[src/types/lib/index.ts:135](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L135)

---

### CairoVersion

Ƭ **CairoVersion**: `"0"` \| `"1"` \| `undefined`

#### Defined in

[src/types/lib/index.ts:137](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L137)

---

### CompilerVersion

Ƭ **CompilerVersion**: `"0"` \| `"1"` \| `"2"` \| `undefined`

#### Defined in

[src/types/lib/index.ts:138](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L138)

---

### InvocationsDetails

Ƭ **InvocationsDetails**: \{ `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `maxFee?`: [`BigNumberish`](types.md#bignumberish) ; `version?`: [`BigNumberish`](types.md#bignumberish) } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/lib/index.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L140)

---

### V3TransactionDetails

Ƭ **V3TransactionDetails**: `Object`

#### Type declaration

| Name                        | Type                                                                          |
| :-------------------------- | :---------------------------------------------------------------------------- |
| `nonce`                     | [`BigNumberish`](types.md#bignumberish)                                       |
| `version`                   | [`BigNumberish`](types.md#bignumberish)                                       |
| `resourceBounds`            | [`ResourceBounds`](types.md#resourcebounds)                                   |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                       |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                     |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]                                     |
| `nonceDataAvailabilityMode` | [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1) |
| `feeDataAvailabilityMode`   | [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1) |

#### Defined in

[src/types/lib/index.ts:146](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L146)

---

### Details

Ƭ **Details**: `Object`

Contain all additional details params

#### Type declaration

| Name      | Type                                                |
| :-------- | :-------------------------------------------------- |
| `nonce`   | [`BigNumberish`](types.md#bignumberish)             |
| `maxFee`  | [`BigNumberish`](types.md#bignumberish)             |
| `version` | [`BigNumberish`](types.md#bignumberish)             |
| `chainId` | [`StarknetChainId`](constants.md#starknetchainid-1) |

#### Defined in

[src/types/lib/index.ts:160](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L160)

---

### InvocationsDetailsWithNonce

Ƭ **InvocationsDetailsWithNonce**: [`InvocationsDetails`](types.md#invocationsdetails) & \{ `nonce`: [`BigNumberish`](types.md#bignumberish) } \| [`V3TransactionDetails`](types.md#v3transactiondetails)

#### Defined in

[src/types/lib/index.ts:167](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L167)

---

### TransactionType

Ƭ **TransactionType**: `ValuesType`<typeof [`TransactionType`](types.md#transactiontype-1)\>

#### Defined in

[src/types/lib/index.ts:171](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L171)

[src/types/lib/index.ts:178](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L178)

---

### TransactionFinalityStatus

Ƭ **TransactionFinalityStatus**: `ValuesType`<typeof [`TransactionFinalityStatus`](types.md#transactionfinalitystatus-1)\>

#### Defined in

[src/types/lib/index.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L195)

[src/types/lib/index.ts:202](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L202)

---

### TransactionExecutionStatus

Ƭ **TransactionExecutionStatus**: `ValuesType`<typeof [`TransactionExecutionStatus`](types.md#transactionexecutionstatus-1)\>

#### Defined in

[src/types/lib/index.ts:204](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L204)

[src/types/lib/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L210)

---

### BlockStatus

Ƭ **BlockStatus**: `ValuesType`<typeof [`BlockStatus`](types.md#blockstatus-1)\>

#### Defined in

[src/types/lib/index.ts:212](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L212)

[src/types/lib/index.ts:219](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L219)

---

### BlockTag

Ƭ **BlockTag**: `ValuesType`<typeof [`BlockTag`](types.md#blocktag-1)\>

#### Defined in

[src/types/lib/index.ts:221](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L221)

[src/types/lib/index.ts:226](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L226)

---

### BlockNumber

Ƭ **BlockNumber**: [`BlockTag`](types.md#blocktag-1) \| `null` \| `number`

#### Defined in

[src/types/lib/index.ts:228](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L228)

---

### BlockIdentifier

Ƭ **BlockIdentifier**: [`BlockNumber`](types.md#blocknumber) \| [`BigNumberish`](types.md#bignumberish)

hex string and BigInt are detected as block hashes

decimal string and number are detected as block numbers

text string are detected as block tag

null return 'pending' block tag

#### Defined in

[src/types/lib/index.ts:239](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L239)

---

### SubscriptionBlockIdentifier

Ƭ **SubscriptionBlockIdentifier**: [`SUBSCRIPTION_BLOCK_TAG`](types.RPC.RPCSPEC08.API.md#subscription_block_tag) \| `string` & {} \| `number` \| `bigint`

#### Defined in

[src/types/lib/index.ts:241](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L241)

---

### AccountInvocationItem

Ƭ **AccountInvocationItem**: \{ `type`: typeof [`DECLARE`](types.md#declare) } & [`DeclareContractTransaction`](types.md#declarecontracttransaction) \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) } & [`DeployAccountContractTransaction`](types.md#deployaccountcontracttransaction) \| \{ `type`: typeof [`INVOKE`](types.md#invoke) } & [`Invocation`](types.md#invocation) & [`InvocationsDetailsWithNonce`](types.md#invocationsdetailswithnonce)

items used by AccountInvocations

#### Defined in

[src/types/lib/index.ts:246](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L246)

---

### AccountInvocations

Ƭ **AccountInvocations**: [`AccountInvocationItem`](types.md#accountinvocationitem)[]

Complete invocations array with account details (internal type from account -> provider)

#### Defined in

[src/types/lib/index.ts:256](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L256)

---

### Invocations

Ƭ **Invocations**: (\{ `type`: typeof [`DECLARE`](types.md#declare) } & [`OptionalPayload`](types.md#optionalpayload)<[`DeclareContractPayload`](types.md#declarecontractpayload)\> \| \{ `type`: typeof [`DEPLOY`](types.md#deploy) } & [`OptionalPayload`](types.md#optionalpayload)<[`AllowArray`](types.md#allowarray)<[`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload)\>\> \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) } & [`OptionalPayload`](types.md#optionalpayload)<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> \| \{ `type`: typeof [`INVOKE`](types.md#invoke) } & [`OptionalPayload`](types.md#optionalpayload)<[`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\>\>)[]

Invocations array user provide to bulk method (simulate)

#### Defined in

[src/types/lib/index.ts:261](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L261)

---

### Tupled

Ƭ **Tupled**: `Object`

#### Type declaration

| Name      | Type     |
| :-------- | :------- |
| `element` | `any`    |
| `type`    | `string` |

#### Defined in

[src/types/lib/index.ts:272](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L272)

---

### Args

Ƭ **Args**: `Object`

#### Index signature

▪ [inputName: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`BigNumberish`](types.md#bignumberish)[] \| [`ParsedStruct`](types.md#parsedstruct) \| [`ParsedStruct`](types.md#parsedstruct)[]

#### Defined in

[src/types/lib/index.ts:274](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L274)

---

### ParsedStruct

Ƭ **ParsedStruct**: `Object`

#### Index signature

▪ [key: `string`]: [`BigNumberish`](types.md#bignumberish) \| [`BigNumberish`](types.md#bignumberish)[] \| [`ParsedStruct`](types.md#parsedstruct) \| [`Uint256`](../interfaces/types.Uint256.md)

#### Defined in

[src/types/lib/index.ts:277](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L277)

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

[src/types/lib/index.ts:281](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L281)

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

[src/types/lib/index.ts:287](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L287)

---

### getContractVersionOptions

Ƭ **getContractVersionOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `compiler?`        | `boolean`                                     |

#### Defined in

[src/types/lib/index.ts:294](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L294)

---

### getEstimateFeeBulkOptions

Ƭ **getEstimateFeeBulkOptions**: `Object`

#### Type declaration

| Name               | Type                                          |
| :----------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) |
| `skipValidate?`    | `boolean`                                     |

#### Defined in

[src/types/lib/index.ts:299](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L299)

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

[src/types/lib/index.ts:307](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L307)

---

### ContractClass

Ƭ **ContractClass**: [`LegacyContractClass`](types.md#legacycontractclass) \| [`SierraContractClass`](types.md#sierracontractclass)

format produced after compressing compiled contract

CompressedCompiledContract

#### Defined in

[src/types/lib/contract/index.ts:11](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L11)

---

### CompiledContract

Ƭ **CompiledContract**: [`LegacyCompiledContract`](types.md#legacycompiledcontract) \| [`CompiledSierra`](types.md#compiledsierra)

format produced after compile .cairo to .json

#### Defined in

[src/types/lib/contract/index.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L16)

---

### CairoContract

Ƭ **CairoContract**: [`ContractClass`](types.md#contractclass) \| [`CompiledContract`](types.md#compiledcontract)

Compressed or decompressed Cairo0 or Cairo1 Contract

#### Defined in

[src/types/lib/contract/index.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L21)

---

### EntryPointType

Ƭ **EntryPointType**: `ValuesType`<typeof [`EntryPointType`](types.md#entrypointtype-1)\>

#### Defined in

[src/types/lib/contract/index.ts:24](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L24)

[src/types/lib/contract/index.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L30)

---

### Abi

Ƭ **Abi**: `ReadonlyArray`<[`FunctionAbi`](types.md#functionabi) \| [`AbiEvent`](types.md#abievent) \| [`AbiStruct`](types.md#abistruct) \| [`InterfaceAbi`](types.md#interfaceabi) \| `any`\>

ABI

#### Defined in

[src/types/lib/contract/abi.ts:4](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L4)

---

### AbiEntry

Ƭ **AbiEntry**: `Object`

#### Type declaration

| Name   | Type                                           |
| :----- | :--------------------------------------------- |
| `name` | `string`                                       |
| `type` | `"felt"` \| `"felt*"` \| `"event"` \| `string` |

#### Defined in

[src/types/lib/contract/abi.ts:7](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L7)

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

[src/types/lib/contract/abi.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L9)

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

[src/types/lib/contract/abi.ts:14](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L14)

---

### AbiStructs

Ƭ **AbiStructs**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiStruct`](types.md#abistruct)

#### Defined in

[src/types/lib/contract/abi.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L23)

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

[src/types/lib/contract/abi.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L25)

---

### AbiInterfaces

Ƭ **AbiInterfaces**: `Object`

#### Index signature

▪ [name: `string`]: [`InterfaceAbi`](types.md#interfaceabi)

#### Defined in

[src/types/lib/contract/abi.ts:32](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L32)

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

[src/types/lib/contract/abi.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L33)

---

### AbiEnums

Ƭ **AbiEnums**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiEnum`](types.md#abienum)

#### Defined in

[src/types/lib/contract/abi.ts:39](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L39)

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

[src/types/lib/contract/abi.ts:40](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L40)

---

### AbiEvents

Ƭ **AbiEvents**: `Object`

#### Index signature

▪ [hash: `string`]: [`AbiEvent`](types.md#abievent)

#### Defined in

[src/types/lib/contract/abi.ts:53](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L53)

---

### AbiEvent

Ƭ **AbiEvent**: [`CairoEvent`](types.md#cairoevent) \| [`LegacyEvent`](types.md#legacyevent)

#### Defined in

[src/types/lib/contract/abi.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L57)

---

### CairoEvent

Ƭ **CairoEvent**: [`CairoEventDefinition`](types.md#cairoeventdefinition) \| [`AbiEvents`](types.md#abievents)

#### Defined in

[src/types/lib/contract/abi.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L60)

---

### CairoEventDefinition

Ƭ **CairoEventDefinition**: [`STRUCT_EVENT`](types.RPC.RPCSPEC07.API.md#struct_event) & \{ `name`: `string` ; `type`: `"event"` }

#### Defined in

[src/types/lib/contract/abi.ts:62](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L62)

---

### CairoEventVariant

Ƭ **CairoEventVariant**: [`ENUM_EVENT`](types.RPC.RPCSPEC07.API.md#enum_event) & \{ `name`: `string` ; `type`: `string` }

#### Defined in

[src/types/lib/contract/abi.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L67)

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

[src/types/lib/contract/abi.ts:72](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/abi.ts#L72)

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

[src/types/lib/contract/legacy.ts:7](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L7)

---

### LegacyCompiledContract

Ƭ **LegacyCompiledContract**: `Omit`<[`LegacyContractClass`](types.md#legacycontractclass), `"program"`\> & \{ `program`: [`Program`](../interfaces/types.Program.md) }

format produced after compiling .cairo to .json

#### Defined in

[src/types/lib/contract/legacy.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L16)

---

### Builtins

Ƭ **Builtins**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/legacy.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L21)

---

### CompressedProgram

Ƭ **CompressedProgram**: `string`

#### Defined in

[src/types/lib/contract/legacy.ts:22](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L22)

---

### Hint

Ƭ **Hint**: `Record`<`string`, `unknown`\>

#### Defined in

[src/types/lib/contract/legacy.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L23)

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

[src/types/lib/contract/legacy.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L25)

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

[src/types/lib/contract/legacy.ts:31](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/legacy.ts#L31)

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

[src/types/lib/contract/sierra.ts:5](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L5)

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

[src/types/lib/contract/sierra.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L21)

---

### SierraContractClass

Ƭ **SierraContractClass**: `Omit`<[`CompiledSierra`](types.md#compiledsierra), `"abi"` \| `"sierra_program_debug_info"`\> & \{ `sierra_program`: `string` ; `abi`: `string` }

format produced after compressing 'sierra_program', stringifies 'abi' property and omit sierra_program_debug_info

CompressedCompiledSierra

#### Defined in

[src/types/lib/contract/sierra.ts:34](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L34)

---

### CompiledSierraCasm

Ƭ **CompiledSierraCasm**: [`CairoAssembly`](types.md#cairoassembly)

#### Defined in

[src/types/lib/contract/sierra.ts:38](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L38)

---

### ByteCode

Ƭ **ByteCode**: `string`[]

SUBTYPES

#### Defined in

[src/types/lib/contract/sierra.ts:41](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L41)

---

### PythonicHints

Ƭ **PythonicHints**: [`number`, `string`[]][]

#### Defined in

[src/types/lib/contract/sierra.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L42)

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

[src/types/lib/contract/sierra.ts:44](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L44)

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

[src/types/lib/contract/sierra.ts:50](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L50)

---

### SierraContractEntryPointFields

Ƭ **SierraContractEntryPointFields**: `Object`

#### Type declaration

| Name           | Type     |
| :------------- | :------- |
| `selector`     | `string` |
| `function_idx` | `number` |

#### Defined in

[src/types/lib/contract/sierra.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/sierra.ts#L56)

---

### FeeMarginPercentage

Ƭ **FeeMarginPercentage**: `Object`

#### Type declaration

| Name     | Type                                                        |
| :------- | :---------------------------------------------------------- |
| `bounds` | [`ResourceBoundsOverhead`](types.md#resourceboundsoverhead) |
| `maxFee` | `number`                                                    |

#### Defined in

[src/provider/types/configuration.type.ts:7](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L7)

---

### RpcProviderOptions

Ƭ **RpcProviderOptions**: `Object`

#### Type declaration

| Name                                | Type                                                        |
| :---------------------------------- | :---------------------------------------------------------- |
| `nodeUrl?`                          | `string` \| [`NetworkName`](constants.md#networkname-1)     |
| `retries?`                          | `number`                                                    |
| `transactionRetryIntervalFallback?` | `number`                                                    |
| `headers?`                          | `object`                                                    |
| `blockIdentifier?`                  | [`BlockIdentifier`](types.md#blockidentifier)               |
| `chainId?`                          | [`StarknetChainId`](constants.md#starknetchainid-1)         |
| `specVersion?`                      | [`SupportedRpcVersion`](constants.md#supportedrpcversion-1) |
| `default?`                          | `boolean`                                                   |
| `waitMode?`                         | `boolean`                                                   |
| `baseFetch?`                        | `WindowOrWorkerGlobalScope`[``"fetch"``]                    |
| `feeMarginPercentage?`              | [`FeeMarginPercentage`](types.md#feemarginpercentage)       |
| `batch?`                            | `false` \| `number`                                         |

#### Defined in

[src/provider/types/configuration.type.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/configuration.type.ts#L12)

---

### Block

Ƭ **Block**: [`Simplify`](types.md#simplify)<[`BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#block_with_tx_hashes)\>

#### Defined in

[src/provider/types/response.type.ts:31](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L31)

---

### PendingBlock

Ƭ **PendingBlock**: [`Simplify`](types.md#simplify)<[`PENDING_BLOCK_WITH_TX_HASHES`](types.RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes)\>

#### Defined in

[src/provider/types/response.type.ts:32](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L32)

---

### GetBlockResponse

Ƭ **GetBlockResponse**: [`Simplify`](types.md#simplify)<[`BlockWithTxHashes`](types.RPC.RPCSPEC08.API.md#blockwithtxhashes)\>

#### Defined in

[src/provider/types/response.type.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L33)

---

### GetTxReceiptResponseWithoutHelper

Ƭ **GetTxReceiptResponseWithoutHelper**: [`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt)

#### Defined in

[src/provider/types/response.type.ts:35](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L35)

---

### SuccessfulTransactionReceiptResponse

Ƭ **SuccessfulTransactionReceiptResponse**: [`IsSucceeded`](types.RPC.RPCSPEC08.API.md#issucceeded)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt)\>

#### Defined in

[src/provider/types/response.type.ts:37](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L37)

---

### RevertedTransactionReceiptResponse

Ƭ **RevertedTransactionReceiptResponse**: [`IsReverted`](types.RPC.RPCSPEC08.API.md#isreverted)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt)\>

#### Defined in

[src/provider/types/response.type.ts:38](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L38)

---

### InvokeTransactionReceiptResponse

Ƭ **InvokeTransactionReceiptResponse**: [`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"INVOKE"`\>

#### Defined in

[src/provider/types/response.type.ts:39](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L39)

---

### DeployTransactionReceiptResponse

Ƭ **DeployTransactionReceiptResponse**: [`InvokeTransactionReceiptResponse`](types.md#invoketransactionreceiptresponse)

#### Defined in

[src/provider/types/response.type.ts:40](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L40)

---

### DeclareTransactionReceiptResponse

Ƭ **DeclareTransactionReceiptResponse**: [`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"DECLARE"`\>

#### Defined in

[src/provider/types/response.type.ts:41](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L41)

---

### DeployAccountTransactionReceiptResponse

Ƭ **DeployAccountTransactionReceiptResponse**: [`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"DEPLOY_ACCOUNT"`\>

#### Defined in

[src/provider/types/response.type.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L42)

---

### L1HandlerTransactionReceiptResponse

Ƭ **L1HandlerTransactionReceiptResponse**: [`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"L1_HANDLER"`\>

#### Defined in

[src/provider/types/response.type.ts:43](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L43)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`TransactionWithHash`](types.md#transactionwithhash)

#### Defined in

[src/provider/types/response.type.ts:45](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L45)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: `Object`

#### Type declaration

| Name                   | Type                                        |
| :--------------------- | :------------------------------------------ |
| `overall_fee`          | `bigint`                                    |
| `unit`                 | [`PRICE_UNIT`](types.md#price_unit)         |
| `l1_gas_consumed`      | `bigint`                                    |
| `l1_gas_price`         | `bigint`                                    |
| `l2_gas_consumed`      | `bigint` \| `undefined`                     |
| `l2_gas_price`         | `bigint` \| `undefined`                     |
| `l1_data_gas_consumed` | `bigint`                                    |
| `l1_data_gas_price`    | `bigint`                                    |
| `suggestedMaxFee`      | `bigint`                                    |
| `resourceBounds`       | [`ResourceBounds`](types.md#resourcebounds) |

#### Defined in

[src/provider/types/response.type.ts:47](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L47)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`EstimateFeeResponse`](types.md#estimatefeeresponse)[]

#### Defined in

[src/provider/types/response.type.ts:62](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L62)

---

### InvokeFunctionResponse

Ƭ **InvokeFunctionResponse**: [`InvokedTransaction`](types.md#invokedtransaction)

#### Defined in

[src/provider/types/response.type.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L64)

---

### DeclareContractResponse

Ƭ **DeclareContractResponse**: [`DeclaredTransaction`](types.md#declaredtransaction)

#### Defined in

[src/provider/types/response.type.ts:66](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L66)

---

### CallContractResponse

Ƭ **CallContractResponse**: `string`[]

#### Defined in

[src/provider/types/response.type.ts:68](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L68)

---

### Storage

Ƭ **Storage**: [`FELT`](types.md#felt)

#### Defined in

[src/provider/types/response.type.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L70)

---

### Nonce

Ƭ **Nonce**: `string`

#### Defined in

[src/provider/types/response.type.ts:72](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L72)

---

### SimulationFlags

Ƭ **SimulationFlags**: [`SIMULATION_FLAG`](types.md#simulation_flag)[]

#### Defined in

[src/provider/types/response.type.ts:75](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L75)

---

### SimulatedTransaction

Ƭ **SimulatedTransaction**: [`SimulateTransaction`](types.md#simulatetransaction) & \{ `suggestedMaxFee`: `bigint` ; `resourceBounds`: [`ResourceBounds`](types.md#resourcebounds) }

#### Defined in

[src/provider/types/response.type.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L77)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: [`SimulatedTransaction`](types.md#simulatedtransaction)[]

#### Defined in

[src/provider/types/response.type.ts:82](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L82)

---

### StateUpdateResponse

Ƭ **StateUpdateResponse**: [`StateUpdate`](types.md#stateupdate) \| [`PendingStateUpdate`](types.md#pendingstateupdate)

#### Defined in

[src/provider/types/response.type.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L84)

---

### StateUpdate

Ƭ **StateUpdate**: [`STATE_UPDATE`](types.md#state_update)

#### Defined in

[src/provider/types/response.type.ts:85](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L85)

---

### PendingStateUpdate

Ƭ **PendingStateUpdate**: [`PENDING_STATE_UPDATE`](types.md#pending_state_update)

#### Defined in

[src/provider/types/response.type.ts:86](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L86)

---

### ContractClassResponse

Ƭ **ContractClassResponse**: [`LegacyContractClass`](types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](types.md#compiledsierra), `"sierra_program_debug_info"`\>

Standardized type

Cairo0 program compressed and Cairo1 sierra_program decompressed

abi Abi

CompiledSierra without '.sierra_program_debug_info'

#### Defined in

[src/provider/types/response.type.ts:97](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/response.type.ts#L97)

---

### Simplify

Ƭ **Simplify**<`T`\>: \{ [K in keyof T]: T[K] } & {}

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/provider/types/spec.type.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L9)

---

### RequiredKeysOf

Ƭ **RequiredKeysOf**<`T`\>: `Exclude`<\{ [K in keyof T]: T extends Record<K, T[K]\> ? K : never }[keyof `T`], `undefined`\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Defined in

[src/provider/types/spec.type.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L12)

---

### ETransactionVersion

Ƭ **ETransactionVersion**: [`ETransactionVersion`](types.RPC.RPCSPEC08.API.md#etransactionversion-1)

#### Defined in

[src/provider/types/spec.type.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L57)

[src/provider/types/spec.type.ts:58](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L58)

---

### ETransactionVersion2

Ƭ **ETransactionVersion2**: [`ETransactionVersion2`](types.RPC.RPCSPEC08.API.md#etransactionversion2-1)

#### Defined in

[src/provider/types/spec.type.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L60)

[src/provider/types/spec.type.ts:61](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L61)

---

### ETransactionVersion3

Ƭ **ETransactionVersion3**: [`ETransactionVersion3`](types.RPC.RPCSPEC08.API.md#etransactionversion3-1)

#### Defined in

[src/provider/types/spec.type.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L63)

[src/provider/types/spec.type.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L64)

---

### BLOCK_HASH

Ƭ **BLOCK_HASH**: `Merge`<[`BLOCK_HASH`](types.RPC.RPCSPEC08.API.md#block_hash), [`BLOCK_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#block_hash)\>

#### Defined in

[src/provider/types/spec.type.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L67)

---

### BLOCK_NUMBER

Ƭ **BLOCK_NUMBER**: `Merge`<[`BLOCK_NUMBER`](types.RPC.RPCSPEC08.API.md#block_number), [`BLOCK_NUMBER`](types.RPC.RPCSPEC07.API.SPEC.md#block_number)\>

#### Defined in

[src/provider/types/spec.type.ts:68](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L68)

---

### FELT

Ƭ **FELT**: `Merge`<[`FELT`](types.RPC.RPCSPEC08.API.md#felt), [`FELT`](types.RPC.RPCSPEC07.API.SPEC.md#felt)\>

#### Defined in

[src/provider/types/spec.type.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L69)

---

### TXN_HASH

Ƭ **TXN_HASH**: `Merge`<[`TXN_HASH`](types.RPC.RPCSPEC08.API.md#txn_hash), [`TXN_HASH`](types.RPC.RPCSPEC07.API.SPEC.md#txn_hash)\>

#### Defined in

[src/provider/types/spec.type.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L70)

---

### PRICE_UNIT

Ƭ **PRICE_UNIT**: `Merge`<[`PRICE_UNIT`](types.RPC.RPCSPEC08.API.md#price_unit), [`PRICE_UNIT`](types.RPC.RPCSPEC07.API.SPEC.md#price_unit)\>

#### Defined in

[src/provider/types/spec.type.ts:72](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L72)

---

### RESOURCE_PRICE

Ƭ **RESOURCE_PRICE**: `Merge`<[`RESOURCE_PRICE`](types.RPC.RPCSPEC08.API.md#resource_price), [`RESOURCE_PRICE`](types.RPC.RPCSPEC07.API.SPEC.md#resource_price)\>

#### Defined in

[src/provider/types/spec.type.ts:73](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L73)

---

### SIMULATION_FLAG

Ƭ **SIMULATION_FLAG**: `Merge`<[`SIMULATION_FLAG`](types.RPC.RPCSPEC08.API.md#simulation_flag), [`SIMULATION_FLAG`](types.RPC.RPCSPEC07.API.SPEC.md#simulation_flag)\>

#### Defined in

[src/provider/types/spec.type.ts:74](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L74)

---

### STATE_UPDATE

Ƭ **STATE_UPDATE**: `Merge`<[`STATE_UPDATE`](types.RPC.RPCSPEC08.API.md#state_update), [`STATE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#state_update)\>

#### Defined in

[src/provider/types/spec.type.ts:76](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L76)

---

### PENDING_STATE_UPDATE

Ƭ **PENDING_STATE_UPDATE**: `Merge`<[`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC08.API.md#pending_state_update), [`PENDING_STATE_UPDATE`](types.RPC.RPCSPEC07.API.SPEC.md#pending_state_update)\>

#### Defined in

[src/provider/types/spec.type.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L77)

---

### PENDING_INVOKE_TXN_RECEIPT

Ƭ **PENDING_INVOKE_TXN_RECEIPT**: [`IsPending`](types.RPC.RPCSPEC08.API.md#ispending)<[`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"INVOKE"`\>\>

#### Defined in

[src/provider/types/spec.type.ts:90](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L90)

---

### PENDING_DECLARE_TXN_RECEIPT

Ƭ **PENDING_DECLARE_TXN_RECEIPT**: [`IsPending`](types.RPC.RPCSPEC08.API.md#ispending)<[`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"DECLARE"`\>\>

#### Defined in

[src/provider/types/spec.type.ts:93](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L93)

---

### PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT

Ƭ **PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT**: [`IsPending`](types.RPC.RPCSPEC08.API.md#ispending)<[`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"DEPLOY_ACCOUNT"`\>\>

#### Defined in

[src/provider/types/spec.type.ts:96](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L96)

---

### PENDING_L1_HANDLER_TXN_RECEIPT

Ƭ **PENDING_L1_HANDLER_TXN_RECEIPT**: [`IsPending`](types.RPC.RPCSPEC08.API.md#ispending)<[`IsType`](types.RPC.RPCSPEC08.API.md#istype)<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), `"L1_HANDLER"`\>\>

#### Defined in

[src/provider/types/spec.type.ts:99](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L99)

---

### BlockWithTxHashes

Ƭ **BlockWithTxHashes**: `Merge`<[`BlockWithTxHashes`](types.RPC.RPCSPEC08.API.md#blockwithtxhashes), [`BlockWithTxHashes`](types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Defined in

[src/provider/types/spec.type.ts:104](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L104)

---

### ContractClassPayload

Ƭ **ContractClassPayload**: `Merge`<[`ContractClass`](types.RPC.RPCSPEC08.API.md#contractclass), [`ContractClass`](types.RPC.RPCSPEC07.API.md#contractclass)\>

#### Defined in

[src/provider/types/spec.type.ts:105](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L105)

---

### DeclaredTransaction

Ƭ **DeclaredTransaction**: `Merge`<[`DeclaredTransaction`](types.RPC.RPCSPEC08.API.md#declaredtransaction), [`DeclaredTransaction`](types.RPC.RPCSPEC07.API.md#declaredtransaction)\>

#### Defined in

[src/provider/types/spec.type.ts:106](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L106)

---

### InvokedTransaction

Ƭ **InvokedTransaction**: `Merge`<[`InvokedTransaction`](types.RPC.RPCSPEC08.API.md#invokedtransaction), [`InvokedTransaction`](types.RPC.RPCSPEC07.API.md#invokedtransaction)\>

#### Defined in

[src/provider/types/spec.type.ts:110](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L110)

---

### DeployedAccountTransaction

Ƭ **DeployedAccountTransaction**: `Merge`<[`DeployedAccountTransaction`](types.RPC.RPCSPEC08.API.md#deployedaccounttransaction), [`DeployedAccountTransaction`](types.RPC.RPCSPEC07.API.md#deployedaccounttransaction)\>

#### Defined in

[src/provider/types/spec.type.ts:111](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L111)

---

### L1Message

Ƭ **L1Message**: `Merge`<[`L1Message`](types.RPC.RPCSPEC08.API.md#l1message), [`L1Message`](types.RPC.RPCSPEC07.API.md#l1message)\>

#### Defined in

[src/provider/types/spec.type.ts:116](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L116)

---

### EventFilter

Ƭ **EventFilter**: [`EventFilter`](types.RPC.RPCSPEC08.API.md#eventfilter)

#### Defined in

[src/provider/types/spec.type.ts:117](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L117)

---

### L1_HANDLER_TXN

Ƭ **L1_HANDLER_TXN**: [`L1_HANDLER_TXN`](types.RPC.RPCSPEC08.API.md#l1_handler_txn)

#### Defined in

[src/provider/types/spec.type.ts:118](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L118)

---

### EDataAvailabilityMode

Ƭ **EDataAvailabilityMode**: [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1)

#### Defined in

[src/provider/types/spec.type.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L119)

[src/provider/types/spec.type.ts:120](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L120)

---

### EDAMode

Ƭ **EDAMode**: [`EDAMode`](types.RPC.RPCSPEC08.API.md#edamode-1)

#### Defined in

[src/provider/types/spec.type.ts:121](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L121)

[src/provider/types/spec.type.ts:122](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L122)

---

### EmittedEvent

Ƭ **EmittedEvent**: `Merge`<[`EmittedEvent`](types.RPC.RPCSPEC08.API.md#emittedevent), [`EmittedEvent`](types.RPC.RPCSPEC07.API.md#emittedevent)\>

#### Defined in

[src/provider/types/spec.type.ts:123](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L123)

---

### Event

Ƭ **Event**: `Merge`<[`Event`](types.RPC.RPCSPEC08.API.md#event-1), [`Event`](types.RPC.RPCSPEC07.API.md#event-1)\>

#### Defined in

[src/provider/types/spec.type.ts:124](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L124)

---

### PendingReceipt

Ƭ **PendingReceipt**: `Merge`<[`TransactionReceiptPendingBlock`](types.RPC.RPCSPEC08.API.md#transactionreceiptpendingblock), [`PendingReceipt`](types.RPC.RPCSPEC07.API.md#pendingreceipt)\>

#### Defined in

[src/provider/types/spec.type.ts:126](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L126)

---

### Receipt

Ƭ **Receipt**: `Merge`<[`TransactionReceiptProductionBlock`](types.RPC.RPCSPEC08.API.md#transactionreceiptproductionblock), [`Receipt`](types.RPC.RPCSPEC07.API.md#receipt)\>

#### Defined in

[src/provider/types/spec.type.ts:130](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L130)

---

### FeeEstimate

Ƭ **FeeEstimate**: `SimpleOneOf`<[`FEE_ESTIMATE`](types.RPC.RPCSPEC08.API.md#fee_estimate), [`FEE_ESTIMATE`](types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)\>

#### Defined in

[src/provider/types/spec.type.ts:133](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L133)

---

### ResourceBounds

Ƭ **ResourceBounds**: [`Simplify`](types.md#simplify)<`SimpleOneOf`<[`ResourceBounds`](types.RPC.RPCSPEC08.API.md#resourcebounds), [`ResourceBounds`](types.RPC.RPCSPEC07.API.md#resourcebounds)\>\>

#### Defined in

[src/provider/types/spec.type.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L140)

---

### ResourceBoundsOverhead

Ƭ **ResourceBoundsOverhead**: [`ResourceBoundsOverheadRPC08`](types.md#resourceboundsoverheadrpc08) \| [`ResourceBoundsOverheadRPC07`](types.md#resourceboundsoverheadrpc07)

overhead percentage on estimate fee

#### Defined in

[src/provider/types/spec.type.ts:151](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L151)

---

### ResourceBoundsOverheadRPC08

Ƭ **ResourceBoundsOverheadRPC08**: `Object`

percentage overhead on estimated fee

#### Type declaration

| Name                             | Type                                                         |
| :------------------------------- | :----------------------------------------------------------- |
| `l1_gas`                         | \{ `max_amount`: `number` ; `max_price_per_unit`: `number` } |
| `l1_gas.max_amount`              | `number`                                                     |
| `l1_gas.max_price_per_unit`      | `number`                                                     |
| `l2_gas`                         | \{ `max_amount`: `number` ; `max_price_per_unit`: `number` } |
| `l2_gas.max_amount`              | `number`                                                     |
| `l2_gas.max_price_per_unit`      | `number`                                                     |
| `l1_data_gas`                    | \{ `max_amount`: `number` ; `max_price_per_unit`: `number` } |
| `l1_data_gas.max_amount`         | `number`                                                     |
| `l1_data_gas.max_price_per_unit` | `number`                                                     |

#### Defined in

[src/provider/types/spec.type.ts:156](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L156)

---

### ResourceBoundsOverheadRPC07

Ƭ **ResourceBoundsOverheadRPC07**: `Object`

#### Type declaration

| Name                        | Type                                                         |
| :-------------------------- | :----------------------------------------------------------- |
| `l1_gas`                    | \{ `max_amount`: `number` ; `max_price_per_unit`: `number` } |
| `l1_gas.max_amount`         | `number`                                                     |
| `l1_gas.max_price_per_unit` | `number`                                                     |

#### Defined in

[src/provider/types/spec.type.ts:171](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L171)

---

### SimulateTransaction

Ƭ **SimulateTransaction**: [`SimulateTransaction`](types.RPC.RPCSPEC08.API.md#simulatetransaction)

#### Defined in

[src/provider/types/spec.type.ts:179](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L179)

---

### TransactionWithHash

Ƭ **TransactionWithHash**: `Merge`<[`TransactionWithHash`](types.RPC.RPCSPEC08.API.md#transactionwithhash), [`TransactionWithHash`](types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Defined in

[src/provider/types/spec.type.ts:181](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L181)

---

### TransactionReceipt

Ƭ **TransactionReceipt**: `Merge`<[`TransactionReceipt`](types.RPC.RPCSPEC08.API.md#transactionreceipt), [`TransactionReceipt`](types.RPC.RPCSPEC07.API.md#transactionreceipt)\>

#### Defined in

[src/provider/types/spec.type.ts:186](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L186)

---

### Methods

Ƭ **Methods**: [`Methods`](types.RPC.RPCSPEC08.API.md#methods)

#### Defined in

[src/provider/types/spec.type.ts:187](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L187)

---

### TXN_STATUS

Ƭ **TXN_STATUS**: `Merge`<[`TXN_STATUS`](types.RPC.RPCSPEC08.API.md#txn_status), [`TXN_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#txn_status)\>

#### Defined in

[src/provider/types/spec.type.ts:188](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L188)

---

### TXN_EXECUTION_STATUS

Ƭ **TXN_EXECUTION_STATUS**: `Merge`<[`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC08.API.md#txn_execution_status), [`TXN_EXECUTION_STATUS`](types.RPC.RPCSPEC07.API.SPEC.md#txn_execution_status)\>

#### Defined in

[src/provider/types/spec.type.ts:189](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L189)

---

### TransactionStatus

Ƭ **TransactionStatus**: `Merge`<[`TransactionStatus`](types.RPC.RPCSPEC08.API.md#transactionstatus), [`TransactionStatus`](types.RPC.RPCSPEC07.API.md#transactionstatus)\>

#### Defined in

[src/provider/types/spec.type.ts:193](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L193)

---

### ETransactionStatus

Ƭ **ETransactionStatus**: [`ETransactionStatus`](types.RPC.RPCSPEC08.API.md#etransactionstatus-1)

#### Defined in

[src/provider/types/spec.type.ts:194](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L194)

[src/provider/types/spec.type.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L195)

---

### ETransactionExecutionStatus

Ƭ **ETransactionExecutionStatus**: [`ETransactionExecutionStatus`](types.RPC.RPCSPEC08.API.md#etransactionexecutionstatus-1)

#### Defined in

[src/provider/types/spec.type.ts:196](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L196)

[src/provider/types/spec.type.ts:197](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L197)

---

### TRANSACTION_TRACE

Ƭ **TRANSACTION_TRACE**: `Merge`<[`TRANSACTION_TRACE`](types.RPC.RPCSPEC08.API.md#transaction_trace), [`TRANSACTION_TRACE`](types.RPC.RPCSPEC07.API.SPEC.md#transaction_trace)\>

#### Defined in

[src/provider/types/spec.type.ts:198](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L198)

---

### FEE_ESTIMATE

Ƭ **FEE_ESTIMATE**: `Merge`<[`FEE_ESTIMATE`](types.RPC.RPCSPEC08.API.md#fee_estimate), [`FEE_ESTIMATE`](types.RPC.RPCSPEC07.API.SPEC.md#fee_estimate)\>

#### Defined in

[src/provider/types/spec.type.ts:202](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L202)

---

### EVENTS_CHUNK

Ƭ **EVENTS_CHUNK**: `Merge`<[`EVENTS_CHUNK`](types.RPC.RPCSPEC08.API.md#events_chunk), [`EVENTS_CHUNK`](types.RPC.RPCSPEC07.API.SPEC.md#events_chunk)\>

#### Defined in

[src/provider/types/spec.type.ts:203](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L203)

---

### UniversalSuggestedFee

Ƭ **UniversalSuggestedFee**: `Object`

#### Type declaration

| Name             | Type                                        |
| :--------------- | :------------------------------------------ |
| `maxFee`         | [`BigNumberish`](types.md#bignumberish)     |
| `resourceBounds` | [`ResourceBounds`](types.md#resourcebounds) |

#### Defined in

[src/types/account.ts:22](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L22)

---

### EstimateFeeBulk

Ƭ **EstimateFeeBulk**: [`EstimateFee`](../interfaces/types.EstimateFee.md)[]

#### Defined in

[src/types/account.ts:27](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L27)

---

### AccountInvocationsFactoryDetails

Ƭ **AccountInvocationsFactoryDetails**: \{ `versions`: \`$\{ETransactionVersion}\`[] ; `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate?`: `boolean` } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/account.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L30)

---

### MultiDeployContractResponse

Ƭ **MultiDeployContractResponse**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `contract_address` | `string`[] |
| `transaction_hash` | `string`   |

#### Defined in

[src/types/account.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L64)

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

[src/types/account.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L69)

---

### DeclareDeployUDCResponse

Ƭ **DeclareDeployUDCResponse**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                       |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declare` | \{ `class_hash`: [`BigNumberish`](types.md#bignumberish) } & `Partial`<[`DeclareTransactionReceiptResponse`](types.md#declaretransactionreceiptresponse)\> |
| `deploy`  | [`DeployContractUDCResponse`](types.md#deploycontractudcresponse)                                                                                          |

#### Defined in

[src/types/account.ts:81](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L81)

---

### SimulateTransactionDetails

Ƭ **SimulateTransactionDetails**: \{ `nonce?`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate?`: `boolean` ; `skipExecute?`: `boolean` } & `Partial`<[`V3TransactionDetails`](types.md#v3transactiondetails)\>

#### Defined in

[src/types/account.ts:88](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L88)

---

### EstimateFeeAction

Ƭ **EstimateFeeAction**: \{ `type`: typeof [`INVOKE`](types.md#invoke) ; `payload`: [`AllowArray`](types.md#allowarray)<[`Call`](types.md#call)\> } \| \{ `type`: typeof [`DECLARE`](types.md#declare) ; `payload`: [`DeclareContractPayload`](types.md#declarecontractpayload) } \| \{ `type`: typeof [`DEPLOY_ACCOUNT`](types.md#deploy_account) ; `payload`: [`DeployAccountContractPayload`](types.md#deployaccountcontractpayload) } \| \{ `type`: typeof [`DEPLOY`](types.md#deploy) ; `payload`: [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload) }

#### Defined in

[src/types/account.ts:95](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L95)

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

[src/types/account.ts:113](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/account.ts#L113)

---

### CairoEnum

Ƭ **CairoEnum**: [`CairoCustomEnum`](../classes/CairoCustomEnum.md) \| [`CairoOption`](../classes/CairoOption.md)<`any`\> \| [`CairoResult`](../classes/CairoResult.md)<`any`, `any`\>

#### Defined in

[src/types/cairoEnum.ts:3](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/cairoEnum.ts#L3)

---

### ValidateType

Ƭ **ValidateType**: `ValuesType`<typeof [`ValidateType`](types.md#validatetype-1)\>

#### Defined in

[src/types/calldata.ts:3](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L3)

[src/types/calldata.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L9)

---

### Uint

Ƭ **Uint**: `ValuesType`<typeof [`Uint`](types.md#uint-1)\>

#### Defined in

[src/types/calldata.ts:11](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L11)

[src/types/calldata.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L21)

---

### Literal

Ƭ **Literal**: `ValuesType`<typeof [`Literal`](types.md#literal-1)\>

#### Defined in

[src/types/calldata.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L23)

[src/types/calldata.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L30)

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

[src/types/contract.ts:13](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L13)

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

[src/types/contract.ts:14](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L14)

---

### Result

Ƭ **Result**: \{ `[key: string]`: `any`; } \| [`Result`](types.md#result)[] \| `bigint` \| `string` \| `boolean` \| [`CairoEnum`](types.md#cairoenum)

#### Defined in

[src/types/contract.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L16)

---

### ArgsOrCalldata

Ƭ **ArgsOrCalldata**: [`RawArgsArray`](types.md#rawargsarray) \| [[`Calldata`](types.md#calldata)] \| [`Calldata`](types.md#calldata)

#### Defined in

[src/types/contract.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L30)

---

### ArgsOrCalldataWithOptions

Ƭ **ArgsOrCalldataWithOptions**: [...RawArgsArray] \| [...RawArgsArray, [`ContractOptions`](types.md#contractoptions)] \| [[`Calldata`](types.md#calldata)] \| [[`Calldata`](types.md#calldata), [`ContractOptions`](types.md#contractoptions)] \| [...Calldata] \| [...Calldata, [`ContractOptions`](types.md#contractoptions)]

#### Defined in

[src/types/contract.ts:41](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L41)

---

### ContractOptions

Ƭ **ContractOptions**: `Object`

#### Type declaration

| Name               | Type                                          | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier) | -                                                                                                                                                                                                                                                                                                                                                                                                       |
| `parseRequest?`    | `boolean`                                     | compile and validate arguments                                                                                                                                                                                                                                                                                                                                                                          |
| `parseResponse?`   | `boolean`                                     | Parse elements of the response array and structuring them into response object                                                                                                                                                                                                                                                                                                                          |
| `formatResponse?`  | \{ `[key: string]`: `any`; }                  | Advance formatting used to get js types data as result **`Description`** https://starknetjs.com/docs/guides/define_call_message/#formatresponse **`Example`** `typescript // assign custom or existing method to resulting data formatResponse: { balance: uint256ToBN }, ` **`Example`** `typescript // define resulting data js types const formatAnswer = { id: 'number', description: 'string' }; ` |
| `maxFee?`          | [`BigNumberish`](types.md#bignumberish)       | -                                                                                                                                                                                                                                                                                                                                                                                                       |
| `nonce?`           | [`BigNumberish`](types.md#bignumberish)       | -                                                                                                                                                                                                                                                                                                                                                                                                       |
| `signature?`       | [`Signature`](types.md#signature)             | -                                                                                                                                                                                                                                                                                                                                                                                                       |
| `addressSalt?`     | `string`                                      | -                                                                                                                                                                                                                                                                                                                                                                                                       |

#### Defined in

[src/types/contract.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L57)

---

### CallOptions

Ƭ **CallOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"blockIdentifier"` \| `"parseRequest"` \| `"parseResponse"` \| `"formatResponse"`\>

#### Defined in

[src/types/contract.ts:88](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L88)

---

### InvokeOptions

Ƭ **InvokeOptions**: `Pick`<[`ContractOptions`](types.md#contractoptions), `"maxFee"` \| `"nonce"` \| `"signature"` \| `"parseRequest"`\>

#### Defined in

[src/types/contract.ts:93](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L93)

---

### ParsedEvent

Ƭ **ParsedEvent**: \{ `[name: string]`: [`ParsedStruct`](types.md#parsedstruct); } & \{ `block_hash?`: [`BlockHash`](types.RPC.RPCSPEC07.API.md#blockhash) ; `block_number?`: [`BlockNumber`](types.md#blocknumber) ; `transaction_hash?`: [`TransactionHash`](types.RPC.RPCSPEC07.API.md#transactionhash) }

#### Defined in

[src/types/contract.ts:98](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L98)

---

### ParsedEvents

Ƭ **ParsedEvents**: [`ParsedEvent`](types.md#parsedevent)[]

#### Defined in

[src/types/contract.ts:104](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/contract.ts#L104)

---

### RPC_ERROR_SET

Ƭ **RPC_ERROR_SET**: `Object`

#### Type declaration

| Name                                    | Type                                                                                                                  |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `FAILED_TO_RECEIVE_TXN`                 | [`FAILED_TO_RECEIVE_TXN`](../interfaces/types.RPC.RPCSPEC08.API.FAILED_TO_RECEIVE_TXN.md)                             |
| `NO_TRACE_AVAILABLE`                    | [`NO_TRACE_AVAILABLE`](../interfaces/types.RPC.RPCSPEC08.API.NO_TRACE_AVAILABLE.md)                                   |
| `CONTRACT_NOT_FOUND`                    | [`CONTRACT_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_NOT_FOUND.md)                                   |
| `ENTRYPOINT_NOT_FOUND`                  | [`ENTRYPOINT_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.ENTRYPOINT_NOT_FOUND.md)                               |
| `BLOCK_NOT_FOUND`                       | [`BLOCK_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.BLOCK_NOT_FOUND.md)                                         |
| `INVALID_TXN_INDEX`                     | [`INVALID_TXN_INDEX`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_TXN_INDEX.md)                                     |
| `CLASS_HASH_NOT_FOUND`                  | [`CLASS_HASH_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.CLASS_HASH_NOT_FOUND.md)                               |
| `TXN_HASH_NOT_FOUND`                    | [`TXN_HASH_NOT_FOUND`](../interfaces/types.RPC.RPCSPEC08.API.TXN_HASH_NOT_FOUND.md)                                   |
| `PAGE_SIZE_TOO_BIG`                     | [`PAGE_SIZE_TOO_BIG`](../interfaces/types.RPC.RPCSPEC08.API.PAGE_SIZE_TOO_BIG.md)                                     |
| `NO_BLOCKS`                             | [`NO_BLOCKS`](../interfaces/types.RPC.RPCSPEC08.API.NO_BLOCKS.md)                                                     |
| `INVALID_CONTINUATION_TOKEN`            | [`INVALID_CONTINUATION_TOKEN`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_CONTINUATION_TOKEN.md)                   |
| `TOO_MANY_KEYS_IN_FILTER`               | [`TOO_MANY_KEYS_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_KEYS_IN_FILTER.md)                         |
| `CONTRACT_ERROR`                        | [`CONTRACT_ERROR`](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_ERROR.md)                                           |
| `TRANSACTION_EXECUTION_ERROR`           | [`TRANSACTION_EXECUTION_ERROR`](../interfaces/types.RPC.RPCSPEC08.API.TRANSACTION_EXECUTION_ERROR.md)                 |
| `STORAGE_PROOF_NOT_SUPPORTED`           | [`STORAGE_PROOF_NOT_SUPPORTED`](../interfaces/types.RPC.RPCSPEC08.API.STORAGE_PROOF_NOT_SUPPORTED.md)                 |
| `CLASS_ALREADY_DECLARED`                | [`CLASS_ALREADY_DECLARED`](../interfaces/types.RPC.RPCSPEC08.API.CLASS_ALREADY_DECLARED.md)                           |
| `INVALID_TRANSACTION_NONCE`             | [`INVALID_TRANSACTION_NONCE`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_TRANSACTION_NONCE.md)                     |
| `INSUFFICIENT_RESOURCES_FOR_VALIDATE`   | [`INSUFFICIENT_RESOURCES_FOR_VALIDATE`](../interfaces/types.RPC.RPCSPEC08.API.INSUFFICIENT_RESOURCES_FOR_VALIDATE.md) |
| `INSUFFICIENT_ACCOUNT_BALANCE`          | [`INSUFFICIENT_ACCOUNT_BALANCE`](../interfaces/types.RPC.RPCSPEC08.API.INSUFFICIENT_ACCOUNT_BALANCE.md)               |
| `VALIDATION_FAILURE`                    | [`VALIDATION_FAILURE`](../interfaces/types.RPC.RPCSPEC08.API.VALIDATION_FAILURE.md)                                   |
| `COMPILATION_FAILED`                    | [`COMPILATION_FAILED`](../interfaces/types.RPC.RPCSPEC08.API.COMPILATION_FAILED.md)                                   |
| `CONTRACT_CLASS_SIZE_IS_TOO_LARGE`      | [`CONTRACT_CLASS_SIZE_IS_TOO_LARGE`](../interfaces/types.RPC.RPCSPEC08.API.CONTRACT_CLASS_SIZE_IS_TOO_LARGE.md)       |
| `NON_ACCOUNT`                           | [`NON_ACCOUNT`](../interfaces/types.RPC.RPCSPEC08.API.NON_ACCOUNT.md)                                                 |
| `DUPLICATE_TX`                          | [`DUPLICATE_TX`](../interfaces/types.RPC.RPCSPEC08.API.DUPLICATE_TX.md)                                               |
| `COMPILED_CLASS_HASH_MISMATCH`          | [`COMPILED_CLASS_HASH_MISMATCH`](../interfaces/types.RPC.RPCSPEC08.API.COMPILED_CLASS_HASH_MISMATCH.md)               |
| `UNSUPPORTED_TX_VERSION`                | [`UNSUPPORTED_TX_VERSION`](../interfaces/types.RPC.RPCSPEC08.API.UNSUPPORTED_TX_VERSION.md)                           |
| `UNSUPPORTED_CONTRACT_CLASS_VERSION`    | [`UNSUPPORTED_CONTRACT_CLASS_VERSION`](../interfaces/types.RPC.RPCSPEC08.API.UNSUPPORTED_CONTRACT_CLASS_VERSION.md)   |
| `UNEXPECTED_ERROR`                      | [`UNEXPECTED_ERROR`](../interfaces/types.RPC.RPCSPEC08.API.UNEXPECTED_ERROR.md)                                       |
| `INVALID_SUBSCRIPTION_ID`               | [`INVALID_SUBSCRIPTION_ID`](../interfaces/types.RPC.RPCSPEC08.API.INVALID_SUBSCRIPTION_ID.md)                         |
| `TOO_MANY_ADDRESSES_IN_FILTER`          | [`TOO_MANY_ADDRESSES_IN_FILTER`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_ADDRESSES_IN_FILTER.md)               |
| `TOO_MANY_BLOCKS_BACK`                  | [`TOO_MANY_BLOCKS_BACK`](../interfaces/types.RPC.RPCSPEC08.API.TOO_MANY_BLOCKS_BACK.md)                               |
| `COMPILATION_ERROR`                     | [`COMPILATION_ERROR`](../interfaces/types.RPC.RPCSPEC08.API.COMPILATION_ERROR.md)                                     |
| `INVALID_ADDRESS`                       | [`INVALID_ADDRESS`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_ADDRESS.md)                               |
| `TOKEN_NOT_SUPPORTED`                   | [`TOKEN_NOT_SUPPORTED`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.TOKEN_NOT_SUPPORTED.md)                       |
| `INVALID_SIGNATURE`                     | [`INVALID_SIGNATURE`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_SIGNATURE.md)                           |
| `MAX_AMOUNT_TOO_LOW`                    | [`MAX_AMOUNT_TOO_LOW`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.MAX_AMOUNT_TOO_LOW.md)                         |
| `CLASS_HASH_NOT_SUPPORTED`              | [`CLASS_HASH_NOT_SUPPORTED`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.CLASS_HASH_NOT_SUPPORTED.md)             |
| `PAYMASTER_TRANSACTION_EXECUTION_ERROR` | [`TRANSACTION_EXECUTION_ERROR`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.TRANSACTION_EXECUTION_ERROR.md)       |
| `INVALID_TIME_BOUNDS`                   | [`INVALID_TIME_BOUNDS`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_TIME_BOUNDS.md)                       |
| `INVALID_DEPLOYMENT_DATA`               | [`INVALID_DEPLOYMENT_DATA`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_DEPLOYMENT_DATA.md)               |
| `INVALID_CLASS_HASH`                    | [`INVALID_CLASS_HASH`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_CLASS_HASH.md)                         |
| `INVALID_ID`                            | [`INVALID_ID`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.INVALID_ID.md)                                         |
| `UNKNOWN_ERROR`                         | [`UNKNOWN_ERROR`](../interfaces/types.RPC.RPCSPEC08.PAYMASTER_API.UNKNOWN_ERROR.md)                                   |

#### Defined in

[src/types/errors.ts:5](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/errors.ts#L5)

---

### RPC_ERROR

Ƭ **RPC_ERROR**: [`RPC_ERROR_SET`](types.md#rpc_error_set)[keyof [`RPC_ERROR_SET`](types.md#rpc_error_set)]

#### Defined in

[src/types/errors.ts:51](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/errors.ts#L51)

---

### OutsideExecutionVersion

Ƭ **OutsideExecutionVersion**: `ValuesType`<typeof [`OutsideExecutionVersion`](types.md#outsideexecutionversion-1)\>

#### Defined in

[src/types/outsideExecution.ts:78](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L78)

[src/types/outsideExecution.ts:83](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L83)

---

### InvocationsSignerDetails

Ƭ **InvocationsSignerDetails**: [`V2InvocationsSignerDetails`](types.md#v2invocationssignerdetails) \| [`V3InvocationsSignerDetails`](types.md#v3invocationssignerdetails) & \{ `version`: \`$\{ETransactionVersion}\` ; `skipValidate?`: `boolean` }

#### Defined in

[src/types/signer.ts:11](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L11)

---

### V2InvocationsSignerDetails

Ƭ **V2InvocationsSignerDetails**: `Object`

#### Type declaration

| Name            | Type                                                |
| :-------------- | :-------------------------------------------------- |
| `walletAddress` | `string`                                            |
| `cairoVersion`  | [`CairoVersion`](types.md#cairoversion)             |
| `chainId`       | [`StarknetChainId`](constants.md#starknetchainid-1) |
| `nonce`         | [`BigNumberish`](types.md#bignumberish)             |
| `maxFee`        | [`BigNumberish`](types.md#bignumberish)             |
| `version`       | \`$\{ETransactionVersion2}\`                        |

#### Defined in

[src/types/signer.ts:16](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L16)

---

### V3InvocationsSignerDetails

Ƭ **V3InvocationsSignerDetails**: [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `walletAddress`: `string` ; `cairoVersion`: [`CairoVersion`](types.md#cairoversion) ; `chainId`: [`StarknetChainId`](constants.md#starknetchainid-1) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L25)

---

### DeclareSignerDetails

Ƭ **DeclareSignerDetails**: [`V3DeclareSignerDetails`](types.md#v3declaresignerdetails) \| [`V2DeclareSignerDetails`](types.md#v2declaresignerdetails) & \{ `version`: \`$\{ETransactionVersion}\` }

#### Defined in

[src/types/signer.ts:32](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L32)

---

### V2DeclareSignerDetails

Ƭ **V2DeclareSignerDetails**: `Required`<[`InvocationsDetails`](types.md#invocationsdetails)\> & \{ `classHash`: `string` ; `compiledClassHash?`: `string` ; `senderAddress`: `string` ; `chainId`: [`StarknetChainId`](constants.md#starknetchainid-1) ; `version`: \`$\{ETransactionVersion2}\` }

#### Defined in

[src/types/signer.ts:36](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L36)

---

### V3DeclareSignerDetails

Ƭ **V3DeclareSignerDetails**: [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `classHash`: `string` ; `compiledClassHash`: `string` ; `senderAddress`: `string` ; `chainId`: [`StarknetChainId`](constants.md#starknetchainid-1) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:44](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L44)

---

### DeployAccountSignerDetails

Ƭ **DeployAccountSignerDetails**: [`V2DeployAccountSignerDetails`](types.md#v2deployaccountsignerdetails) \| [`V3DeployAccountSignerDetails`](types.md#v3deployaccountsignerdetails)

#### Defined in

[src/types/signer.ts:52](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L52)

---

### V2DeployAccountSignerDetails

Ƭ **V2DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> & `Required`<[`InvocationsDetails`](types.md#invocationsdetails)\> & \{ `contractAddress`: [`BigNumberish`](types.md#bignumberish) ; `chainId`: [`StarknetChainId`](constants.md#starknetchainid-1) ; `version`: \`$\{ETransactionVersion2}\` }

#### Defined in

[src/types/signer.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L56)

---

### V3DeployAccountSignerDetails

Ƭ **V3DeployAccountSignerDetails**: `Required`<[`DeployAccountContractPayload`](types.md#deployaccountcontractpayload)\> & [`V3TransactionDetails`](types.md#v3transactiondetails) & \{ `contractAddress`: [`BigNumberish`](types.md#bignumberish) ; `chainId`: [`StarknetChainId`](constants.md#starknetchainid-1) ; `version`: \`$\{ETransactionVersion3}\` }

#### Defined in

[src/types/signer.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L63)

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

[src/types/signer.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/signer.ts#L70)

---

### TransactionStatusReceiptSets

Ƭ **TransactionStatusReceiptSets**: `Object`

#### Type declaration

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `success`  | [`SuccessfulTransactionReceiptResponse`](types.md#successfultransactionreceiptresponse) |
| `reverted` | [`RevertedTransactionReceiptResponse`](types.md#revertedtransactionreceiptresponse)     |
| `error`    | `Error`                                                                                 |

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:6](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L6)

---

### TransactionReceiptStatus

Ƭ **TransactionReceiptStatus**: keyof [`TransactionStatusReceiptSets`](types.md#transactionstatusreceiptsets)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L12)

---

### TransactionReceiptValue

Ƭ **TransactionReceiptValue**: [`TransactionStatusReceiptSets`](types.md#transactionstatusreceiptsets)[[`TransactionReceiptStatus`](types.md#transactionreceiptstatus)]

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:13](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L13)

---

### TransactionReceiptCallbacksDefined

Ƭ **TransactionReceiptCallbacksDefined**: \{ [key in TransactionReceiptStatus]: Function }

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:15](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L15)

---

### TransactionReceiptCallbacksDefault

Ƭ **TransactionReceiptCallbacksDefault**: `Partial`<[`TransactionReceiptCallbacksDefined`](types.md#transactionreceiptcallbacksdefined)\> & \{ `_`: () => `void` }

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:18](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L18)

---

### TransactionReceiptCallbacks

Ƭ **TransactionReceiptCallbacks**: [`TransactionReceiptCallbacksDefined`](types.md#transactionreceiptcallbacksdefined) \| [`TransactionReceiptCallbacksDefault`](types.md#transactionreceiptcallbacksdefault)

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L21)

---

### GetTransactionReceiptResponse

Ƭ **GetTransactionReceiptResponse**<`T`\>: \{ `statusReceipt`: `T` ; `value`: [`TransactionStatusReceiptSets`](types.md#transactionstatusreceiptsets)[`T`] ; `match`: (`callbacks`: [`TransactionReceiptCallbacks`](types.md#transactionreceiptcallbacks)) => `void` } & \{ [key in \`is$\{Capitalize<TransactionReceiptStatus\>}\`]: Function }

#### Type parameters

| Name | Type                                                                                                                                      |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`TransactionReceiptStatus`](types.md#transactionreceiptstatus) = [`TransactionReceiptStatus`](types.md#transactionreceiptstatus) |

#### Defined in

[src/utils/transactionReceipt/transactionReceipt.type.ts:28](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/transactionReceipt/transactionReceipt.type.ts#L28)

---

### PaymasterRpcOptions

Ƭ **PaymasterRpcOptions**: `Object`

#### Type declaration

| Name         | Type                                                    |
| :----------- | :------------------------------------------------------ |
| `nodeUrl?`   | `string` \| [`NetworkName`](constants.md#networkname-1) |
| `default?`   | `boolean`                                               |
| `headers?`   | `object`                                                |
| `baseFetch?` | `WindowOrWorkerGlobalScope`[``"fetch"``]                |

#### Defined in

[src/types/paymaster/configuration.ts:5](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/configuration.ts#L5)

---

### PaymasterFeeEstimate

Ƭ **PaymasterFeeEstimate**: `Object`

#### Type declaration

| Name                             | Type                                    |
| :------------------------------- | :-------------------------------------- |
| `gas_token_price_in_strk`        | [`BigNumberish`](types.md#bignumberish) |
| `estimated_fee_in_strk`          | [`BigNumberish`](types.md#bignumberish) |
| `estimated_fee_in_gas_token`     | [`BigNumberish`](types.md#bignumberish) |
| `suggested_max_fee_in_strk`      | [`BigNumberish`](types.md#bignumberish) |
| `suggested_max_fee_in_gas_token` | [`BigNumberish`](types.md#bignumberish) |

#### Defined in

[src/types/paymaster/response.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L9)

---

### PreparedDeployTransaction

Ƭ **PreparedDeployTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `parameters` | [`ExecutionParameters`](types.md#executionparameters)                                     |
| `fee`        | [`PaymasterFeeEstimate`](types.md#paymasterfeeestimate)                                   |

#### Defined in

[src/types/paymaster/response.ts:17](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L17)

---

### PreparedInvokeTransaction

Ƭ **PreparedInvokeTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `type`       | `"invoke"`                                                                                 |
| `typed_data` | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `parameters` | [`ExecutionParameters`](types.md#executionparameters)                                      |
| `fee`        | [`PaymasterFeeEstimate`](types.md#paymasterfeeestimate)                                    |

#### Defined in

[src/types/paymaster/response.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L23)

---

### PreparedDeployAndInvokeTransaction

Ƭ **PreparedDeployAndInvokeTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                      |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data)  |
| `typed_data` | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `parameters` | [`ExecutionParameters`](types.md#executionparameters)                                      |
| `fee`        | [`PaymasterFeeEstimate`](types.md#paymasterfeeestimate)                                    |

#### Defined in

[src/types/paymaster/response.ts:29](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L29)

---

### PreparedTransaction

Ƭ **PreparedTransaction**: [`PreparedDeployTransaction`](types.md#prepareddeploytransaction) \| [`PreparedInvokeTransaction`](types.md#preparedinvoketransaction) \| [`PreparedDeployAndInvokeTransaction`](types.md#prepareddeployandinvoketransaction)

#### Defined in

[src/types/paymaster/response.ts:36](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L36)

---

### DeployTransaction

Ƭ **DeployTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |

#### Defined in

[src/types/paymaster/response.ts:47](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L47)

---

### InvokeTransaction

Ƭ **InvokeTransaction**: `Object`

#### Type declaration

| Name     | Type                                |
| :------- | :---------------------------------- |
| `type`   | `"invoke"`                          |
| `invoke` | [`UserInvoke`](types.md#userinvoke) |

#### Defined in

[src/types/paymaster/response.ts:51](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L51)

---

### UserInvoke

Ƭ **UserInvoke**: `Object`

#### Type declaration

| Name          | Type                      |
| :------------ | :------------------------ |
| `userAddress` | `string`                  |
| `calls`       | [`Call`](types.md#call)[] |

#### Defined in

[src/types/paymaster/response.ts:55](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L55)

---

### DeployAndInvokeTransaction

Ƭ **DeployAndInvokeTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                     |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `invoke`     | [`UserInvoke`](types.md#userinvoke)                                                       |

#### Defined in

[src/types/paymaster/response.ts:59](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L59)

---

### UserTransaction

Ƭ **UserTransaction**: [`DeployTransaction`](types.md#deploytransaction) \| [`InvokeTransaction`](types.md#invoketransaction) \| [`DeployAndInvokeTransaction`](types.md#deployandinvoketransaction)

#### Defined in

[src/types/paymaster/response.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L64)

---

### ExecutableDeployTransaction

Ƭ **ExecutableDeployTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy"`                                                                                |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |

#### Defined in

[src/types/paymaster/response.ts:66](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L66)

---

### ExecutableInvokeTransaction

Ƭ **ExecutableInvokeTransaction**: `Object`

#### Type declaration

| Name     | Type                                                    |
| :------- | :------------------------------------------------------ |
| `type`   | `"invoke"`                                              |
| `invoke` | [`ExecutableUserInvoke`](types.md#executableuserinvoke) |

#### Defined in

[src/types/paymaster/response.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L70)

---

### ExecutableUserInvoke

Ƭ **ExecutableUserInvoke**: `Object`

#### Type declaration

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `userAddress` | `string`                                                                                   |
| `typedData`   | [`OutsideExecutionTypedData`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddata) |
| `signature`   | `string`[]                                                                                 |

#### Defined in

[src/types/paymaster/response.ts:74](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L74)

---

### ExecutableDeployAndInvokeTransaction

Ƭ **ExecutableDeployAndInvokeTransaction**: `Object`

#### Type declaration

| Name         | Type                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------- |
| `type`       | `"deploy_and_invoke"`                                                                     |
| `deployment` | [`ACCOUNT_DEPLOYMENT_DATA`](types.RPC.RPCSPEC08.PAYMASTER_API.md#account_deployment_data) |
| `invoke`     | [`ExecutableUserInvoke`](types.md#executableuserinvoke)                                   |

#### Defined in

[src/types/paymaster/response.ts:79](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L79)

---

### ExecutableUserTransaction

Ƭ **ExecutableUserTransaction**: [`ExecutableDeployTransaction`](types.md#executabledeploytransaction) \| [`ExecutableInvokeTransaction`](types.md#executableinvoketransaction) \| [`ExecutableDeployAndInvokeTransaction`](types.md#executabledeployandinvoketransaction)

#### Defined in

[src/types/paymaster/response.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L84)

---

### FeeMode

Ƭ **FeeMode**: \{ `mode`: `"sponsored"` } \| \{ `mode`: `"default"` ; `gasToken`: `string` }

#### Defined in

[src/types/paymaster/response.ts:89](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L89)

---

### ExecutionParameters

Ƭ **ExecutionParameters**: `Object`

#### Type declaration

| Name          | Type                                                                |
| :------------ | :------------------------------------------------------------------ |
| `version`     | `"0x1"`                                                             |
| `feeMode`     | [`FeeMode`](types.md#feemode)                                       |
| `timeBounds?` | [`PaymasterTimeBounds`](../interfaces/types.PaymasterTimeBounds.md) |

#### Defined in

[src/types/paymaster/response.ts:90](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/paymaster/response.ts#L90)

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

[src/types/lib/index.ts:171](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L171)

[src/types/lib/index.ts:178](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L178)

---

### TransactionFinalityStatus

• `Const` **TransactionFinalityStatus**: `Object`

new statuses are defined by props: finality_status and execution_status
to be #deprecated

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `NOT_RECEIVED`   | `"NOT_RECEIVED"`   |
| `RECEIVED`       | `"RECEIVED"`       |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

[src/types/lib/index.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L195)

[src/types/lib/index.ts:202](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L202)

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

[src/types/lib/index.ts:204](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L204)

[src/types/lib/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L210)

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

[src/types/lib/index.ts:212](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L212)

[src/types/lib/index.ts:219](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L219)

---

### BlockTag

• `Const` **BlockTag**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `PENDING` | `"pending"` |
| `LATEST`  | `"latest"`  |

#### Defined in

[src/types/lib/index.ts:221](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L221)

[src/types/lib/index.ts:226](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/index.ts#L226)

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

[src/types/lib/contract/index.ts:24](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L24)

[src/types/lib/contract/index.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/lib/contract/index.ts#L30)

---

### ETransactionVersion

• **ETransactionVersion**: `Object`

#### Type declaration

| Name | Type                                    | Description                                                      |
| :--- | :-------------------------------------- | :--------------------------------------------------------------- |
| `V0` | `"0x0"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V1` | `"0x1"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V2` | `"0x2"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V3` | `"0x3"`                                 | -                                                                |
| `F0` | `"0x100000000000000000000000000000000"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F1` | `"0x100000000000000000000000000000001"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F2` | `"0x100000000000000000000000000000002"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F3` | `"0x100000000000000000000000000000003"` | -                                                                |

#### Defined in

[src/provider/types/spec.type.ts:57](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L57)

[src/provider/types/spec.type.ts:58](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L58)

---

### ETransactionVersion2

• **ETransactionVersion2**: `Object`

#### Type declaration

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `V0` | `"0x0"`                                 |
| `V1` | `"0x1"`                                 |
| `V2` | `"0x2"`                                 |
| `F0` | `"0x100000000000000000000000000000000"` |
| `F1` | `"0x100000000000000000000000000000001"` |
| `F2` | `"0x100000000000000000000000000000002"` |

#### Defined in

[src/provider/types/spec.type.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L60)

[src/provider/types/spec.type.ts:61](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L61)

---

### ETransactionVersion3

• **ETransactionVersion3**: `Object`

#### Type declaration

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `V3` | `"0x3"`                                 |
| `F3` | `"0x100000000000000000000000000000003"` |

#### Defined in

[src/provider/types/spec.type.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L63)

[src/provider/types/spec.type.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L64)

---

### EDataAvailabilityMode

• **EDataAvailabilityMode**: `Object`

#### Type declaration

| Name | Type   |
| :--- | :----- |
| `L1` | `"L1"` |
| `L2` | `"L2"` |

#### Defined in

[src/provider/types/spec.type.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L119)

[src/provider/types/spec.type.ts:120](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L120)

---

### EDAMode

• **EDAMode**: `Object`

#### Type declaration

| Name | Type |
| :--- | :--- |
| `L1` | `0`  |
| `L2` | `1`  |

#### Defined in

[src/provider/types/spec.type.ts:121](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L121)

[src/provider/types/spec.type.ts:122](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L122)

---

### ETransactionStatus

• **ETransactionStatus**: `Object`

#### Type declaration

| Name             | Type               |
| :--------------- | :----------------- |
| `RECEIVED`       | `"RECEIVED"`       |
| `REJECTED`       | `"REJECTED"`       |
| `ACCEPTED_ON_L2` | `"ACCEPTED_ON_L2"` |
| `ACCEPTED_ON_L1` | `"ACCEPTED_ON_L1"` |

#### Defined in

[src/provider/types/spec.type.ts:194](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L194)

[src/provider/types/spec.type.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L195)

---

### ETransactionExecutionStatus

• **ETransactionExecutionStatus**: `Object`

#### Type declaration

| Name        | Type          |
| :---------- | :------------ |
| `SUCCEEDED` | `"SUCCEEDED"` |
| `REVERTED`  | `"REVERTED"`  |

#### Defined in

[src/provider/types/spec.type.ts:196](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L196)

[src/provider/types/spec.type.ts:197](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L197)

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

[src/types/calldata.ts:3](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L3)

[src/types/calldata.ts:9](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L9)

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

[src/types/calldata.ts:11](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L11)

[src/types/calldata.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L21)

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

[src/types/calldata.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L23)

[src/types/calldata.ts:30](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L30)

---

### ETH_ADDRESS

• `Const` **ETH_ADDRESS**: `"core::starknet::eth_address::EthAddress"`

#### Defined in

[src/types/calldata.ts:32](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L32)

---

### NON_ZERO_PREFIX

• `Const` **NON_ZERO_PREFIX**: `"core::zeroable::NonZero::"`

#### Defined in

[src/types/calldata.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/calldata.ts#L33)

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

[src/types/outsideExecution.ts:34](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L34)

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

[src/types/outsideExecution.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L56)

---

### OutsideExecutionVersion

• `Const` **OutsideExecutionVersion**: `Object`

#### Type declaration

| Name          | Type  |
| :------------ | :---- |
| `UNSUPPORTED` | `"0"` |
| `V1`          | `"1"` |
| `V2`          | `"2"` |

#### Defined in

[src/types/outsideExecution.ts:78](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L78)

[src/types/outsideExecution.ts:83](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/types/outsideExecution.ts#L83)

## Functions

### isRPC08_FeeEstimate

▸ **isRPC08_FeeEstimate**(`entry`): entry is FEE_ESTIMATE

#### Parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `entry` | [`FeeEstimate`](types.md#feeestimate) |

#### Returns

entry is FEE_ESTIMATE

#### Defined in

[src/provider/types/spec.type.ts:135](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L135)

---

### isRPC08_ResourceBounds

▸ **isRPC08_ResourceBounds**(`entry`): entry is RESOURCE_BOUNDS_MAPPING

#### Parameters

| Name    | Type                                        |
| :------ | :------------------------------------------ |
| `entry` | [`ResourceBounds`](types.md#resourcebounds) |

#### Returns

entry is RESOURCE_BOUNDS_MAPPING

#### Defined in

[src/provider/types/spec.type.ts:144](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/types/spec.type.ts#L144)
