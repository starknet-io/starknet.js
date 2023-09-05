---
id: 'Sequencer'
title: 'Namespace: Sequencer'
sidebar_label: 'Sequencer'
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [InvokeFunctionTransactionResponse](../interfaces/Sequencer.InvokeFunctionTransactionResponse.md)

## Type Aliases

### DeclareTransaction

Ƭ **DeclareTransaction**: `Object`

#### Type declaration

| Name                   | Type                                           |
| :--------------------- | :--------------------------------------------- |
| `type`                 | `"DECLARE"`                                    |
| `sender_address`       | `string`                                       |
| `contract_class`       | [`ContractClass`](../modules.md#contractclass) |
| `signature?`           | `string`[]                                     |
| `nonce`                | [`BigNumberish`](num.md#bignumberish)          |
| `max_fee?`             | [`BigNumberish`](num.md#bignumberish)          |
| `version?`             | [`BigNumberish`](num.md#bignumberish)          |
| `compiled_class_hash?` | `string`                                       |

#### Defined in

[src/types/api/sequencer.ts:81](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L81)

---

### DeployTransaction

Ƭ **DeployTransaction**: `Object`

#### Type declaration

| Name                    | Type                                           |
| :---------------------- | :--------------------------------------------- |
| `type`                  | `"DEPLOY"`                                     |
| `contract_definition`   | [`ContractClass`](../modules.md#contractclass) |
| `contract_address_salt` | [`BigNumberish`](num.md#bignumberish)          |
| `constructor_calldata`  | `string`[]                                     |
| `nonce?`                | [`BigNumberish`](num.md#bignumberish)          |

#### Defined in

[src/types/api/sequencer.ts:92](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L92)

---

### DeployAccountTransaction

Ƭ **DeployAccountTransaction**: `Object`

#### Type declaration

| Name                    | Type                                  |
| :---------------------- | :------------------------------------ |
| `type`                  | `"DEPLOY_ACCOUNT"`                    |
| `class_hash`            | `string`                              |
| `contract_address_salt` | [`BigNumberish`](num.md#bignumberish) |
| `constructor_calldata`  | `string`[]                            |
| `signature?`            | `string`[]                            |
| `max_fee?`              | [`BigNumberish`](num.md#bignumberish) |
| `version?`              | [`BigNumberish`](num.md#bignumberish) |
| `nonce?`                | [`BigNumberish`](num.md#bignumberish) |

#### Defined in

[src/types/api/sequencer.ts:100](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L100)

---

### InvokeFunctionTransaction

Ƭ **InvokeFunctionTransaction**: `Object`

#### Type declaration

| Name                | Type                                              |
| :------------------ | :------------------------------------------------ |
| `type`              | `"INVOKE_FUNCTION"`                               |
| `sender_address`    | `string`                                          |
| `signature?`        | `string`[]                                        |
| `entry_point_type?` | [`EXTERNAL`](../enums/EntryPointType.md#external) |
| `calldata?`         | [`RawCalldata`](../modules.md#rawcalldata)        |
| `nonce`             | [`BigNumberish`](num.md#bignumberish)             |
| `max_fee?`          | [`BigNumberish`](num.md#bignumberish)             |
| `version?`          | [`BigNumberish`](num.md#bignumberish)             |

#### Defined in

[src/types/api/sequencer.ts:111](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L111)

---

### Transaction

Ƭ **Transaction**: [`DeclareTransaction`](Sequencer.md#declaretransaction) \| [`DeployTransaction`](Sequencer.md#deploytransaction) \| [`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction) \| [`DeployAccountTransaction`](Sequencer.md#deployaccounttransaction)

#### Defined in

[src/types/api/sequencer.ts:122](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L122)

---

### AddTransactionResponse

Ƭ **AddTransactionResponse**: `Object`

#### Type declaration

| Name               | Type                     |
| :----------------- | :----------------------- |
| `transaction_hash` | `string`                 |
| `code?`            | `"TRANSACTION_RECEIVED"` |
| `address?`         | `string`                 |
| `class_hash?`      | `string`                 |

#### Defined in

[src/types/api/sequencer.ts:128](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L128)

---

### GetCodeResponse

Ƭ **GetCodeResponse**: `Object`

#### Type declaration

| Name       | Type                                 |
| :--------- | :----------------------------------- |
| `bytecode` | [`ByteCode`](../modules.md#bytecode) |
| `abi`      | [`Abi`](../modules.md#abi)           |

#### Defined in

[src/types/api/sequencer.ts:135](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L135)

---

### TransactionResponse

Ƭ **TransactionResponse**: [`DeclareTransaction`](Sequencer.md#declaretransaction) \| [`DeployTransaction`](Sequencer.md#deploytransaction) \| [`InvokeFunctionTransactionResponse`](../interfaces/Sequencer.InvokeFunctionTransactionResponse.md)

#### Defined in

[src/types/api/sequencer.ts:145](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L145)

---

### SuccessfulTransactionResponse

Ƭ **SuccessfulTransactionResponse**: `Object`

#### Type declaration

| Name                | Type                                                      |
| :------------------ | :-------------------------------------------------------- |
| `status`            | [`Status`](../modules.md#status)                          |
| `transaction`       | [`TransactionResponse`](Sequencer.md#transactionresponse) |
| `block_hash`        | `string`                                                  |
| `block_number`      | [`BlockNumber`](../modules.md#blocknumber)                |
| `transaction_index` | `number`                                                  |

#### Defined in

[src/types/api/sequencer.ts:150](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L150)

---

### FailedTransactionResponse

Ƭ **FailedTransactionResponse**: `Object`

#### Type declaration

| Name                                       | Type                                                      |
| :----------------------------------------- | :-------------------------------------------------------- |
| `status`                                   | `"REJECTED"`                                              |
| `transaction_failure_reason`               | { `code`: `string` ; `error_message`: `string` }          |
| `transaction_failure_reason.code`          | `string`                                                  |
| `transaction_failure_reason.error_message` | `string`                                                  |
| `transaction`                              | [`TransactionResponse`](Sequencer.md#transactionresponse) |

#### Defined in

[src/types/api/sequencer.ts:158](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L158)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`SuccessfulTransactionResponse`](Sequencer.md#successfultransactionresponse) \| [`FailedTransactionResponse`](Sequencer.md#failedtransactionresponse)

#### Defined in

[src/types/api/sequencer.ts:167](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L167)

---

### TransactionReceiptResponse

Ƭ **TransactionReceiptResponse**: [`SuccessfulTransactionReceiptResponse`](Sequencer.md#successfultransactionreceiptresponse) \| [`FailedTransactionReceiptResponse`](Sequencer.md#failedtransactionreceiptresponse)

#### Defined in

[src/types/api/sequencer.ts:169](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L169)

---

### SuccessfulTransactionReceiptResponse

Ƭ **SuccessfulTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                  | Type                                                     |
| :-------------------- | :------------------------------------------------------- |
| `status`              | [`Status`](../modules.md#status)                         |
| `transaction_hash`    | `string`                                                 |
| `transaction_index`   | `number`                                                 |
| `block_hash`          | `string`                                                 |
| `block_number`        | [`BlockNumber`](../modules.md#blocknumber)               |
| `l2_to_l1_messages`   | `string`[]                                               |
| `events`              | `string`[]                                               |
| `actual_fee`          | `string`                                                 |
| `execution_resources` | [`ExecutionResources`](../modules.md#executionresources) |

#### Defined in

[src/types/api/sequencer.ts:173](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L173)

---

### FailedTransactionReceiptResponse

Ƭ **FailedTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                                       | Type                                             |
| :----------------------------------------- | :----------------------------------------------- |
| `status`                                   | `"REJECTED"`                                     |
| `transaction_failure_reason`               | { `code`: `string` ; `error_message`: `string` } |
| `transaction_failure_reason.code`          | `string`                                         |
| `transaction_failure_reason.error_message` | `string`                                         |
| `transaction_hash`                         | `string`                                         |
| `l2_to_l1_messages`                        | `string`[]                                       |
| `events`                                   | `string`[]                                       |

#### Defined in

[src/types/api/sequencer.ts:185](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L185)

---

### GetBlockResponse

Ƭ **GetBlockResponse**: `Object`

#### Type declaration

| Name                   | Type                                                                                                                                                                                                                                                                                                                                |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_number`         | `number`                                                                                                                                                                                                                                                                                                                            |
| `state_root`           | `string`                                                                                                                                                                                                                                                                                                                            |
| `block_hash`           | `string`                                                                                                                                                                                                                                                                                                                            |
| `transactions`         | { `[txHash: string]`: [`TransactionResponse`](Sequencer.md#transactionresponse); }                                                                                                                                                                                                                                                  |
| `timestamp`            | `number`                                                                                                                                                                                                                                                                                                                            |
| `transaction_receipts` | { `[txHash: string]`: { `block_hash`: `string` ; `transaction_hash`: `string` ; `l2_to_l1_messages`: { `to_address`: `string` ; `payload`: `string`[] ; `from_address`: `string` }[] ; `block_number`: [`BlockNumber`](../modules.md#blocknumber) ; `status`: [`Status`](../modules.md#status) ; `transaction_index`: `number` }; } |
| `parent_block_hash`    | `string`                                                                                                                                                                                                                                                                                                                            |
| `status`               | [`Status`](../modules.md#status)                                                                                                                                                                                                                                                                                                    |
| `gas_price`            | `string`                                                                                                                                                                                                                                                                                                                            |
| `sequencer_address`    | `string`                                                                                                                                                                                                                                                                                                                            |
| `starknet_version`     | `string`                                                                                                                                                                                                                                                                                                                            |

#### Defined in

[src/types/api/sequencer.ts:196](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L196)

---

### CallContractTransaction

Ƭ **CallContractTransaction**: { `calldata?`: [`RawCalldata`](../modules.md#rawcalldata) ; `max_fee?`: [`BigNumberish`](num.md#bignumberish) ; `version?`: [`BigNumberish`](num.md#bignumberish) ; `entry_point_selector`: `string` } & { `sender_address`: `string` ; `signature`: `string`[] } \| { `contract_address`: `string` ; `signature?`: `never` }

#### Defined in

[src/types/api/sequencer.ts:225](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L225)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/api/sequencer.ts:241](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L241)

---

### InvokeEstimateFee

Ƭ **InvokeEstimateFee**: `Omit`<[`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction), `"max_fee"` \| `"entry_point_type"`\>

#### Defined in

[src/types/api/sequencer.ts:245](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L245)

---

### DeclareEstimateFee

Ƭ **DeclareEstimateFee**: `Omit`<[`DeclareTransaction`](Sequencer.md#declaretransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:246](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L246)

---

### DeployAccountEstimateFee

Ƭ **DeployAccountEstimateFee**: `Omit`<[`DeployAccountTransaction`](Sequencer.md#deployaccounttransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:247](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L247)

---

### DeployEstimateFee

Ƭ **DeployEstimateFee**: [`DeployTransaction`](Sequencer.md#deploytransaction)

#### Defined in

[src/types/api/sequencer.ts:248](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L248)

---

### EstimateFeeRequest

Ƭ **EstimateFeeRequest**: [`InvokeEstimateFee`](Sequencer.md#invokeestimatefee) \| [`DeclareEstimateFee`](Sequencer.md#declareestimatefee) \| [`DeployEstimateFee`](Sequencer.md#deployestimatefee) \| [`DeployAccountEstimateFee`](Sequencer.md#deployaccountestimatefee)

#### Defined in

[src/types/api/sequencer.ts:250](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L250)

---

### TransactionSimulationResponse

Ƭ **TransactionSimulationResponse**: `Object`

#### Type declaration

| Name             | Type                                                                 |
| :--------------- | :------------------------------------------------------------------- |
| `trace`          | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) |
| `fee_estimation` | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)            |

#### Defined in

[src/types/api/sequencer.ts:256](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L256)

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Omit`<[`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction), `"entry_point_type"`\>

#### Defined in

[src/types/api/sequencer.ts:261](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L261)

---

### EstimateFeeRequestBulk

Ƭ **EstimateFeeRequestBulk**: [`AllowArray`](../modules.md#allowarray)<[`InvokeEstimateFee`](Sequencer.md#invokeestimatefee) \| [`DeclareEstimateFee`](Sequencer.md#declareestimatefee) \| [`DeployEstimateFee`](Sequencer.md#deployestimatefee) \| [`DeployAccountEstimateFee`](Sequencer.md#deployaccountestimatefee)\>

#### Defined in

[src/types/api/sequencer.ts:263](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L263)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: { `overall_fee`: `number` ; `gas_price`: `number` ; `gas_usage`: `number` ; `uint`: `string` } \| { `amount`: `bigint` ; `unit`: `string` }

#### Defined in

[src/types/api/sequencer.ts:268](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L268)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`AllowArray`](../modules.md#allowarray)<[`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)\>

#### Defined in

[src/types/api/sequencer.ts:280](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L280)

---

### BlockTransactionTracesResponse

Ƭ **BlockTransactionTracesResponse**: `Object`

#### Type declaration

| Name     | Type                                                                                                      |
| :------- | :-------------------------------------------------------------------------------------------------------- |
| `traces` | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) & { `transaction_hash`: `string` }[] |

#### Defined in

[src/types/api/sequencer.ts:282](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L282)

---

### Storage

Ƭ **Storage**: `string`

#### Defined in

[src/types/api/sequencer.ts:286](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L286)

---

### StateUpdateResponse

Ƭ **StateUpdateResponse**: `Object`

#### Type declaration

| Name                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `block_hash`                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `new_root`                          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `old_root`                          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `state_diff`                        | { `storage_diffs`: [`StorageDiffs`](Sequencer.md#storagediffs) ; `nonces`: [`Nonces`](Sequencer.md#nonces) ; `deployed_contracts`: [`DeployedContractItem`](../modules.md#deployedcontractitem)[] ; `old_declared_contracts`: [`OldDeclaredContracts`](Sequencer.md#olddeclaredcontracts) ; `declared_classes`: [`DeclaredClasses`](Sequencer.md#declaredclasses) ; `replaced_classes`: [`ReplacedClasses`](Sequencer.md#replacedclasses) } |
| `state_diff.storage_diffs`          | [`StorageDiffs`](Sequencer.md#storagediffs)                                                                                                                                                                                                                                                                                                                                                                                                 |
| `state_diff.nonces`                 | [`Nonces`](Sequencer.md#nonces)                                                                                                                                                                                                                                                                                                                                                                                                             |
| `state_diff.deployed_contracts`     | [`DeployedContractItem`](../modules.md#deployedcontractitem)[]                                                                                                                                                                                                                                                                                                                                                                              |
| `state_diff.old_declared_contracts` | [`OldDeclaredContracts`](Sequencer.md#olddeclaredcontracts)                                                                                                                                                                                                                                                                                                                                                                                 |
| `state_diff.declared_classes`       | [`DeclaredClasses`](Sequencer.md#declaredclasses)                                                                                                                                                                                                                                                                                                                                                                                           |
| `state_diff.replaced_classes`       | [`ReplacedClasses`](Sequencer.md#replacedclasses)                                                                                                                                                                                                                                                                                                                                                                                           |

#### Defined in

[src/types/api/sequencer.ts:288](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L288)

---

### StorageDiffs

Ƭ **StorageDiffs**: `Object`

#### Index signature

▪ [address: `string`]: [`StateDiffItem`](Sequencer.md#statediffitem)[]

#### Defined in

[src/types/api/sequencer.ts:302](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L302)

---

### StateDiffItem

Ƭ **StateDiffItem**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `string` |

#### Defined in

[src/types/api/sequencer.ts:304](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L304)

---

### Nonces

Ƭ **Nonces**: `Object`

#### Index signature

▪ [address: `string`]: [`Nonce`](Sequencer.md#nonce)

#### Defined in

[src/types/api/sequencer.ts:306](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L306)

---

### Nonce

Ƭ **Nonce**: `string`

#### Defined in

[src/types/api/sequencer.ts:308](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L308)

---

### DeployedContracts

Ƭ **DeployedContracts**: [`DeployedContractItem`](../modules.md#deployedcontractitem)[]

#### Defined in

[src/types/api/sequencer.ts:310](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L310)

---

### OldDeclaredContracts

Ƭ **OldDeclaredContracts**: `string`[]

#### Defined in

[src/types/api/sequencer.ts:312](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L312)

---

### DeclaredClasses

Ƭ **DeclaredClasses**: [`DeclaredClass`](Sequencer.md#declaredclass)[]

#### Defined in

[src/types/api/sequencer.ts:314](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L314)

---

### DeclaredClass

Ƭ **DeclaredClass**: `Object`

#### Type declaration

| Name                  | Type     |
| :-------------------- | :------- |
| `class_hash`          | `string` |
| `compiled_class_hash` | `string` |

#### Defined in

[src/types/api/sequencer.ts:316](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L316)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: `string`[]

#### Defined in

[src/types/api/sequencer.ts:318](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L318)

---

### Endpoints

Ƭ **Endpoints**: `Object`

#### Type declaration

| Name                                                      | Type                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_contract_addresses`                                  | { `QUERY`: `never` ; `REQUEST`: `never` ; `RESPONSE`: [`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse) }                                                                                                                 |
| `get_contract_addresses.QUERY`                            | `never`                                                                                                                                                                                                                                              |
| `get_contract_addresses.REQUEST`                          | `never`                                                                                                                                                                                                                                              |
| `get_contract_addresses.RESPONSE`                         | [`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse)                                                                                                                                                                         |
| `add_transaction`                                         | { `QUERY`: `never` ; `REQUEST`: [`Transaction`](Sequencer.md#transaction) ; `RESPONSE`: [`AddTransactionResponse`](Sequencer.md#addtransactionresponse) }                                                                                            |
| `add_transaction.QUERY`                                   | `never`                                                                                                                                                                                                                                              |
| `add_transaction.REQUEST`                                 | [`Transaction`](Sequencer.md#transaction)                                                                                                                                                                                                            |
| `add_transaction.RESPONSE`                                | [`AddTransactionResponse`](Sequencer.md#addtransactionresponse)                                                                                                                                                                                      |
| `get_transaction`                                         | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionResponse`](Sequencer.md#gettransactionresponse) }                                                                                                      |
| `get_transaction.QUERY`                                   | { `transactionHash`: `string` }                                                                                                                                                                                                                      |
| `get_transaction.QUERY.transactionHash`                   | `string`                                                                                                                                                                                                                                             |
| `get_transaction.REQUEST`                                 | `never`                                                                                                                                                                                                                                              |
| `get_transaction.RESPONSE`                                | [`GetTransactionResponse`](Sequencer.md#gettransactionresponse)                                                                                                                                                                                      |
| `get_transaction_status`                                  | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse) }                                                                                         |
| `get_transaction_status.QUERY`                            | { `transactionHash`: `string` }                                                                                                                                                                                                                      |
| `get_transaction_status.QUERY.transactionHash`            | `string`                                                                                                                                                                                                                                             |
| `get_transaction_status.REQUEST`                          | `never`                                                                                                                                                                                                                                              |
| `get_transaction_status.RESPONSE`                         | [`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse)                                                                                                                                                                         |
| `get_transaction_trace`                                   | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) }                                                                                                 |
| `get_transaction_trace.QUERY`                             | { `transactionHash`: `string` }                                                                                                                                                                                                                      |
| `get_transaction_trace.QUERY.transactionHash`             | `string`                                                                                                                                                                                                                                             |
| `get_transaction_trace.REQUEST`                           | `never`                                                                                                                                                                                                                                              |
| `get_transaction_trace.RESPONSE`                          | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse)                                                                                                                                                                                 |
| `get_transaction_receipt`                                 | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionReceiptResponse`](Sequencer.md#transactionreceiptresponse) }                                                                                              |
| `get_transaction_receipt.QUERY`                           | { `transactionHash`: `string` }                                                                                                                                                                                                                      |
| `get_transaction_receipt.QUERY.transactionHash`           | `string`                                                                                                                                                                                                                                             |
| `get_transaction_receipt.REQUEST`                         | `never`                                                                                                                                                                                                                                              |
| `get_transaction_receipt.RESPONSE`                        | [`TransactionReceiptResponse`](Sequencer.md#transactionreceiptresponse)                                                                                                                                                                              |
| `get_nonce`                                               | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`Nonce`](Sequencer.md#nonce) }                                                                                                 |
| `get_nonce.QUERY`                                         | { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                               |
| `get_nonce.QUERY.contractAddress`                         | `string`                                                                                                                                                                                                                                             |
| `get_nonce.QUERY.blockIdentifier`                         | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_nonce.REQUEST`                                       | `never`                                                                                                                                                                                                                                              |
| `get_nonce.RESPONSE`                                      | [`Nonce`](Sequencer.md#nonce)                                                                                                                                                                                                                        |
| `get_storage_at`                                          | { `QUERY`: { `contractAddress`: `string` ; `key`: [`BigNumberish`](num.md#bignumberish) ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`Storage`](Sequencer.md#storage) }                                              |
| `get_storage_at.QUERY`                                    | { `contractAddress`: `string` ; `key`: [`BigNumberish`](num.md#bignumberish) ; `blockIdentifier`: `BlockIdentifier` }                                                                                                                                |
| `get_storage_at.QUERY.contractAddress`                    | `string`                                                                                                                                                                                                                                             |
| `get_storage_at.QUERY.key`                                | [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                                                |
| `get_storage_at.QUERY.blockIdentifier`                    | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_storage_at.REQUEST`                                  | `never`                                                                                                                                                                                                                                              |
| `get_storage_at.RESPONSE`                                 | [`Storage`](Sequencer.md#storage)                                                                                                                                                                                                                    |
| `get_code`                                                | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetCodeResponse`](Sequencer.md#getcoderesponse) }                                                                             |
| `get_code.QUERY`                                          | { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                               |
| `get_code.QUERY.contractAddress`                          | `string`                                                                                                                                                                                                                                             |
| `get_code.QUERY.blockIdentifier`                          | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_code.REQUEST`                                        | `never`                                                                                                                                                                                                                                              |
| `get_code.RESPONSE`                                       | [`GetCodeResponse`](Sequencer.md#getcoderesponse)                                                                                                                                                                                                    |
| `get_block`                                               | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetBlockResponse`](Sequencer.md#getblockresponse) }                                                                                                         |
| `get_block.QUERY`                                         | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                                             |
| `get_block.QUERY.blockIdentifier`                         | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_block.REQUEST`                                       | `never`                                                                                                                                                                                                                                              |
| `get_block.RESPONSE`                                      | [`GetBlockResponse`](Sequencer.md#getblockresponse)                                                                                                                                                                                                  |
| `call_contract`                                           | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`CallContractTransaction`](Sequencer.md#callcontracttransaction) ; `RESPONSE`: [`CallContractResponse`](Sequencer.md#callcontractresponse) }                                       |
| `call_contract.QUERY`                                     | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                                             |
| `call_contract.QUERY.blockIdentifier`                     | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `call_contract.REQUEST`                                   | [`CallContractTransaction`](Sequencer.md#callcontracttransaction)                                                                                                                                                                                    |
| `call_contract.RESPONSE`                                  | [`CallContractResponse`](Sequencer.md#callcontractresponse)                                                                                                                                                                                          |
| `estimate_fee`                                            | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` ; `skipValidate`: `boolean` } ; `REQUEST`: [`EstimateFeeRequest`](Sequencer.md#estimatefeerequest) ; `RESPONSE`: [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse) }                       |
| `estimate_fee.QUERY`                                      | { `blockIdentifier`: `BlockIdentifier` ; `skipValidate`: `boolean` }                                                                                                                                                                                 |
| `estimate_fee.QUERY.blockIdentifier`                      | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `estimate_fee.QUERY.skipValidate`                         | `boolean`                                                                                                                                                                                                                                            |
| `estimate_fee.REQUEST`                                    | [`EstimateFeeRequest`](Sequencer.md#estimatefeerequest)                                                                                                                                                                                              |
| `estimate_fee.RESPONSE`                                   | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)                                                                                                                                                                                            |
| `get_class_by_hash`                                       | { `QUERY`: { `classHash`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`CompiledContract`](../modules.md#compiledcontract) }                                                                               |
| `get_class_by_hash.QUERY`                                 | { `classHash`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                                                    |
| `get_class_by_hash.QUERY.classHash`                       | `string`                                                                                                                                                                                                                                             |
| `get_class_by_hash.QUERY.blockIdentifier?`                | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_class_by_hash.REQUEST`                               | `never`                                                                                                                                                                                                                                              |
| `get_class_by_hash.RESPONSE`                              | [`CompiledContract`](../modules.md#compiledcontract)                                                                                                                                                                                                 |
| `get_class_hash_at`                                       | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: `string` }                                                                                                                     |
| `get_class_hash_at.QUERY`                                 | { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                                              |
| `get_class_hash_at.QUERY.contractAddress`                 | `string`                                                                                                                                                                                                                                             |
| `get_class_hash_at.QUERY.blockIdentifier?`                | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_class_hash_at.REQUEST`                               | `never`                                                                                                                                                                                                                                              |
| `get_class_hash_at.RESPONSE`                              | `string`                                                                                                                                                                                                                                             |
| `get_state_update`                                        | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`StateUpdateResponse`](Sequencer.md#stateupdateresponse) }                                                    |
| `get_state_update.QUERY`                                  | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) }                                                                                                                                                              |
| `get_state_update.QUERY.blockHash?`                       | `string`                                                                                                                                                                                                                                             |
| `get_state_update.QUERY.blockNumber?`                     | [`BlockNumber`](../modules.md#blocknumber)                                                                                                                                                                                                           |
| `get_state_update.REQUEST`                                | `never`                                                                                                                                                                                                                                              |
| `get_state_update.RESPONSE`                               | [`StateUpdateResponse`](Sequencer.md#stateupdateresponse)                                                                                                                                                                                            |
| `get_full_contract`                                       | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`CompiledContract`](../modules.md#compiledcontract) }                                                                         |
| `get_full_contract.QUERY`                                 | { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                                              |
| `get_full_contract.QUERY.contractAddress`                 | `string`                                                                                                                                                                                                                                             |
| `get_full_contract.QUERY.blockIdentifier?`                | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_full_contract.REQUEST`                               | `never`                                                                                                                                                                                                                                              |
| `get_full_contract.RESPONSE`                              | [`CompiledContract`](../modules.md#compiledcontract)                                                                                                                                                                                                 |
| `estimate_message_fee`                                    | { `QUERY`: `any` ; `REQUEST`: `any` ; `RESPONSE`: [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse) }                                                                                                                                        |
| `estimate_message_fee.QUERY`                              | `any`                                                                                                                                                                                                                                                |
| `estimate_message_fee.REQUEST`                            | `any`                                                                                                                                                                                                                                                |
| `estimate_message_fee.RESPONSE`                           | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)                                                                                                                                                                                            |
| `simulate_transaction`                                    | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` ; `skipValidate`: `boolean` } ; `REQUEST`: [`SimulateTransaction`](Sequencer.md#simulatetransaction) ; `RESPONSE`: [`TransactionSimulationResponse`](Sequencer.md#transactionsimulationresponse) } |
| `simulate_transaction.QUERY`                              | { `blockIdentifier`: `BlockIdentifier` ; `skipValidate`: `boolean` }                                                                                                                                                                                 |
| `simulate_transaction.QUERY.blockIdentifier`              | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `simulate_transaction.QUERY.skipValidate`                 | `boolean`                                                                                                                                                                                                                                            |
| `simulate_transaction.REQUEST`                            | [`SimulateTransaction`](Sequencer.md#simulatetransaction)                                                                                                                                                                                            |
| `simulate_transaction.RESPONSE`                           | [`TransactionSimulationResponse`](Sequencer.md#transactionsimulationresponse)                                                                                                                                                                        |
| `estimate_fee_bulk`                                       | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`EstimateFeeRequestBulk`](Sequencer.md#estimatefeerequestbulk) ; `RESPONSE`: [`EstimateFeeResponseBulk`](Sequencer.md#estimatefeeresponsebulk) }                                   |
| `estimate_fee_bulk.QUERY`                                 | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                                             |
| `estimate_fee_bulk.QUERY.blockIdentifier`                 | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `estimate_fee_bulk.REQUEST`                               | [`EstimateFeeRequestBulk`](Sequencer.md#estimatefeerequestbulk)                                                                                                                                                                                      |
| `estimate_fee_bulk.RESPONSE`                              | [`EstimateFeeResponseBulk`](Sequencer.md#estimatefeeresponsebulk)                                                                                                                                                                                    |
| `get_block_traces`                                        | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`BlockTransactionTracesResponse`](Sequencer.md#blocktransactiontracesresponse) }                              |
| `get_block_traces.QUERY`                                  | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) }                                                                                                                                                              |
| `get_block_traces.QUERY.blockHash?`                       | `string`                                                                                                                                                                                                                                             |
| `get_block_traces.QUERY.blockNumber?`                     | [`BlockNumber`](../modules.md#blocknumber)                                                                                                                                                                                                           |
| `get_block_traces.REQUEST`                                | `never`                                                                                                                                                                                                                                              |
| `get_block_traces.RESPONSE`                               | [`BlockTransactionTracesResponse`](Sequencer.md#blocktransactiontracesresponse)                                                                                                                                                                      |
| `get_compiled_class_by_class_hash`                        | { `QUERY`: { `classHash`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `any` ; `RESPONSE`: [`CairoAssembly`](../modules.md#cairoassembly) }                                                                                       |
| `get_compiled_class_by_class_hash.QUERY`                  | { `classHash`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                                                    |
| `get_compiled_class_by_class_hash.QUERY.classHash`        | `string`                                                                                                                                                                                                                                             |
| `get_compiled_class_by_class_hash.QUERY.blockIdentifier?` | `BlockIdentifier`                                                                                                                                                                                                                                    |
| `get_compiled_class_by_class_hash.REQUEST`                | `any`                                                                                                                                                                                                                                                |
| `get_compiled_class_by_class_hash.RESPONSE`               | [`CairoAssembly`](../modules.md#cairoassembly)                                                                                                                                                                                                       |

#### Defined in

[src/types/api/sequencer.ts:320](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L320)
