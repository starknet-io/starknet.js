---
id: 'types.Sequencer'
title: 'Namespace: Sequencer'
sidebar_label: 'Sequencer'
custom_edit_url: null
---

[types](types.md).Sequencer

## Interfaces

- [InvokeFunctionTransactionResponse](../interfaces/types.Sequencer.InvokeFunctionTransactionResponse.md)

## Type Aliases

### TransactionTraceResponse

Ƭ **TransactionTraceResponse**: `Object`

#### Type declaration

| Name                       | Type                                                |
| :------------------------- | :-------------------------------------------------- |
| `validate_invocation?`     | [`FunctionInvocation`](types.md#functioninvocation) |
| `function_invocation?`     | [`FunctionInvocation`](types.md#functioninvocation) |
| `fee_transfer_invocation?` | [`FunctionInvocation`](types.md#functioninvocation) |
| `constructor_invocation?`  | [`FunctionInvocation`](types.md#functioninvocation) |
| `signature`                | `string`[]                                          |

#### Defined in

[src/types/api/sequencer.ts:75](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L75)

---

### DeclareTransaction

Ƭ **DeclareTransaction**: `Object`

#### Type declaration

| Name                   | Type                                                   |
| :--------------------- | :----------------------------------------------------- |
| `type`                 | [`DECLARE`](../enums/types.TransactionType.md#declare) |
| `sender_address`       | `string`                                               |
| `contract_class`       | [`ContractClass`](types.md#contractclass)              |
| `signature?`           | `string`[]                                             |
| `nonce`                | [`BigNumberish`](types.md#bignumberish)                |
| `max_fee?`             | [`BigNumberish`](types.md#bignumberish)                |
| `version?`             | [`BigNumberish`](types.md#bignumberish)                |
| `compiled_class_hash?` | `string`                                               |

#### Defined in

[src/types/api/sequencer.ts:83](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L83)

---

### DeployTransaction

Ƭ **DeployTransaction**: `Object`

#### Type declaration

| Name                    | Type                                                 |
| :---------------------- | :--------------------------------------------------- |
| `type`                  | [`DEPLOY`](../enums/types.TransactionType.md#deploy) |
| `contract_definition`   | [`ContractClass`](types.md#contractclass)            |
| `contract_address_salt` | [`BigNumberish`](types.md#bignumberish)              |
| `constructor_calldata`  | `string`[]                                           |
| `nonce?`                | [`BigNumberish`](types.md#bignumberish)              |

#### Defined in

[src/types/api/sequencer.ts:94](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L94)

---

### DeployAccountTransaction

Ƭ **DeployAccountTransaction**: `Object`

#### Type declaration

| Name                    | Type                                                                 |
| :---------------------- | :------------------------------------------------------------------- |
| `type`                  | [`DEPLOY_ACCOUNT`](../enums/types.TransactionType.md#deploy_account) |
| `class_hash`            | `string`                                                             |
| `contract_address_salt` | [`BigNumberish`](types.md#bignumberish)                              |
| `constructor_calldata`  | `string`[]                                                           |
| `signature?`            | `string`[]                                                           |
| `max_fee?`              | [`BigNumberish`](types.md#bignumberish)                              |
| `version?`              | [`BigNumberish`](types.md#bignumberish)                              |
| `nonce?`                | [`BigNumberish`](types.md#bignumberish)                              |

#### Defined in

[src/types/api/sequencer.ts:102](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L102)

---

### InvokeFunctionTransaction

Ƭ **InvokeFunctionTransaction**: `Object`

#### Type declaration

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `type`              | [`INVOKE`](../enums/types.TransactionType.md#invoke)    |
| `sender_address`    | `string`                                                |
| `signature?`        | `string`[]                                              |
| `entry_point_type?` | [`EXTERNAL`](../enums/types.EntryPointType.md#external) |
| `calldata?`         | [`RawCalldata`](types.md#rawcalldata)                   |
| `nonce`             | [`BigNumberish`](types.md#bignumberish)                 |
| `max_fee?`          | [`BigNumberish`](types.md#bignumberish)                 |
| `version?`          | [`BigNumberish`](types.md#bignumberish)                 |

#### Defined in

[src/types/api/sequencer.ts:113](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L113)

---

### Transaction

Ƭ **Transaction**: [`DeclareTransaction`](types.Sequencer.md#declaretransaction) \| [`DeployTransaction`](types.Sequencer.md#deploytransaction) \| [`InvokeFunctionTransaction`](types.Sequencer.md#invokefunctiontransaction) \| [`DeployAccountTransaction`](types.Sequencer.md#deployaccounttransaction)

#### Defined in

[src/types/api/sequencer.ts:124](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L124)

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

[src/types/api/sequencer.ts:130](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L130)

---

### GetCodeResponse

Ƭ **GetCodeResponse**: `Object`

#### Type declaration

| Name       | Type                            |
| :--------- | :------------------------------ |
| `bytecode` | [`ByteCode`](types.md#bytecode) |
| `abi`      | [`Abi`](types.md#abi)           |

#### Defined in

[src/types/api/sequencer.ts:137](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L137)

---

### TransactionResponse

Ƭ **TransactionResponse**: [`DeclareTransaction`](types.Sequencer.md#declaretransaction) \| [`DeployTransaction`](types.Sequencer.md#deploytransaction) \| [`InvokeFunctionTransactionResponse`](../interfaces/types.Sequencer.InvokeFunctionTransactionResponse.md)

#### Defined in

[src/types/api/sequencer.ts:147](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L147)

---

### SuccessfulTransactionResponse

Ƭ **SuccessfulTransactionResponse**: `Object`

#### Type declaration

| Name                | Type                                                            |
| :------------------ | :-------------------------------------------------------------- |
| `status`            | [`TransactionStatus`](../enums/types.TransactionStatus.md)      |
| `transaction`       | [`TransactionResponse`](types.Sequencer.md#transactionresponse) |
| `block_hash`        | `string`                                                        |
| `block_number`      | [`BlockNumber`](types.md#blocknumber)                           |
| `transaction_index` | `number`                                                        |

#### Defined in

[src/types/api/sequencer.ts:152](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L152)

---

### FailedTransactionResponse

Ƭ **FailedTransactionResponse**: `Object`

#### Type declaration

| Name                                       | Type                                                            |
| :----------------------------------------- | :-------------------------------------------------------------- |
| `status`                                   | [`REJECTED`](../enums/types.TransactionStatus.md#rejected)      |
| `transaction_failure_reason`               | { `code`: `string` ; `error_message`: `string` }                |
| `transaction_failure_reason.code`          | `string`                                                        |
| `transaction_failure_reason.error_message` | `string`                                                        |
| `transaction`                              | [`TransactionResponse`](types.Sequencer.md#transactionresponse) |

#### Defined in

[src/types/api/sequencer.ts:160](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L160)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`SuccessfulTransactionResponse`](types.Sequencer.md#successfultransactionresponse) \| [`FailedTransactionResponse`](types.Sequencer.md#failedtransactionresponse)

#### Defined in

[src/types/api/sequencer.ts:169](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L169)

---

### TransactionReceiptResponse

Ƭ **TransactionReceiptResponse**: [`SuccessfulTransactionReceiptResponse`](types.Sequencer.md#successfultransactionreceiptresponse) \| [`FailedTransactionReceiptResponse`](types.Sequencer.md#failedtransactionreceiptresponse)

#### Defined in

[src/types/api/sequencer.ts:171](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L171)

---

### SuccessfulTransactionReceiptResponse

Ƭ **SuccessfulTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `status`              | [`TransactionStatus`](../enums/types.TransactionStatus.md) |
| `transaction_hash`    | `string`                                                   |
| `transaction_index`   | `number`                                                   |
| `block_hash`          | `string`                                                   |
| `block_number`        | [`BlockNumber`](types.md#blocknumber)                      |
| `l2_to_l1_messages`   | `string`[]                                                 |
| `events`              | `string`[]                                                 |
| `actual_fee`          | `string`                                                   |
| `execution_resources` | [`ExecutionResources`](types.md#executionresources)        |

#### Defined in

[src/types/api/sequencer.ts:175](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L175)

---

### FailedTransactionReceiptResponse

Ƭ **FailedTransactionReceiptResponse**: `Object`

#### Type declaration

| Name                                       | Type                                                       |
| :----------------------------------------- | :--------------------------------------------------------- |
| `status`                                   | [`REJECTED`](../enums/types.TransactionStatus.md#rejected) |
| `transaction_failure_reason`               | { `code`: `string` ; `error_message`: `string` }           |
| `transaction_failure_reason.code`          | `string`                                                   |
| `transaction_failure_reason.error_message` | `string`                                                   |
| `transaction_hash`                         | `string`                                                   |
| `l2_to_l1_messages`                        | `string`[]                                                 |
| `events`                                   | `string`[]                                                 |

#### Defined in

[src/types/api/sequencer.ts:187](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L187)

---

### GetBlockResponse

Ƭ **GetBlockResponse**: `Object`

#### Type declaration

| Name                   | Type                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_number`         | `number`                                                                                                                                                                                                                                                                                                                                                 |
| `state_root`           | `string`                                                                                                                                                                                                                                                                                                                                                 |
| `block_hash`           | `string`                                                                                                                                                                                                                                                                                                                                                 |
| `transactions`         | { `[txHash: string]`: [`TransactionResponse`](types.Sequencer.md#transactionresponse); }                                                                                                                                                                                                                                                                 |
| `timestamp`            | `number`                                                                                                                                                                                                                                                                                                                                                 |
| `transaction_receipts` | { `[txHash: string]`: { `block_hash`: `string` ; `transaction_hash`: `string` ; `l2_to_l1_messages`: { `to_address`: `string` ; `payload`: `string`[] ; `from_address`: `string` }[] ; `block_number`: [`BlockNumber`](types.md#blocknumber) ; `status`: [`TransactionStatus`](../enums/types.TransactionStatus.md) ; `transaction_index`: `number` }; } |
| `parent_block_hash`    | `string`                                                                                                                                                                                                                                                                                                                                                 |
| `status`               | [`BlockStatus`](../enums/types.BlockStatus.md)                                                                                                                                                                                                                                                                                                           |
| `gas_price`            | `string`                                                                                                                                                                                                                                                                                                                                                 |
| `sequencer_address`    | `string`                                                                                                                                                                                                                                                                                                                                                 |
| `starknet_version`     | `string`                                                                                                                                                                                                                                                                                                                                                 |

#### Defined in

[src/types/api/sequencer.ts:198](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L198)

---

### CallContractTransaction

Ƭ **CallContractTransaction**: { `calldata?`: [`RawCalldata`](types.md#rawcalldata) ; `max_fee?`: [`BigNumberish`](types.md#bignumberish) ; `version?`: [`BigNumberish`](types.md#bignumberish) ; `entry_point_selector`: `string` } & { `sender_address`: `string` ; `signature`: `string`[] } \| { `contract_address`: `string` ; `signature?`: `never` }

#### Defined in

[src/types/api/sequencer.ts:227](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L227)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/api/sequencer.ts:243](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L243)

---

### InvokeEstimateFee

Ƭ **InvokeEstimateFee**: `Omit`<[`InvokeFunctionTransaction`](types.Sequencer.md#invokefunctiontransaction), `"max_fee"` \| `"entry_point_type"`\>

#### Defined in

[src/types/api/sequencer.ts:247](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L247)

---

### DeclareEstimateFee

Ƭ **DeclareEstimateFee**: `Omit`<[`DeclareTransaction`](types.Sequencer.md#declaretransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:248](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L248)

---

### DeployAccountEstimateFee

Ƭ **DeployAccountEstimateFee**: `Omit`<[`DeployAccountTransaction`](types.Sequencer.md#deployaccounttransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:249](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L249)

---

### DeployEstimateFee

Ƭ **DeployEstimateFee**: [`DeployTransaction`](types.Sequencer.md#deploytransaction)

#### Defined in

[src/types/api/sequencer.ts:250](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L250)

---

### SimulateTransactionResponse

Ƭ **SimulateTransactionResponse**: `Object`

#### Type declaration

| Name             | Type                                                                      |
| :--------------- | :------------------------------------------------------------------------ |
| `trace`          | [`TransactionTraceResponse`](types.Sequencer.md#transactiontraceresponse) |
| `fee_estimation` | [`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse)           |

#### Defined in

[src/types/api/sequencer.ts:252](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L252)

---

### AccountTransactionItem

Ƭ **AccountTransactionItem**: [`InvokeEstimateFee`](types.Sequencer.md#invokeestimatefee) \| [`DeclareEstimateFee`](types.Sequencer.md#declareestimatefee) \| [`DeployEstimateFee`](types.Sequencer.md#deployestimatefee) \| [`DeployAccountEstimateFee`](types.Sequencer.md#deployaccountestimatefee)

#### Defined in

[src/types/api/sequencer.ts:257](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L257)

---

### AccountTransaction

Ƭ **AccountTransaction**: [`AllowArray`](types.md#allowarray)<[`AccountTransactionItem`](types.Sequencer.md#accounttransactionitem)\>

Transaction filled with account data

#### Defined in

[src/types/api/sequencer.ts:266](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L266)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: { `overall_fee`: `number` ; `gas_price`: `number` ; `gas_usage`: `number` ; `uint`: `string` } \| { `amount`: `bigint` ; `unit`: `string` }

#### Defined in

[src/types/api/sequencer.ts:269](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L269)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`AllowArray`](types.md#allowarray)<[`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse)\>

#### Defined in

[src/types/api/sequencer.ts:281](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L281)

---

### BlockTransactionTracesResponse

Ƭ **BlockTransactionTracesResponse**: `Object`

#### Type declaration

| Name     | Type                                                                                                           |
| :------- | :------------------------------------------------------------------------------------------------------------- |
| `traces` | [`TransactionTraceResponse`](types.Sequencer.md#transactiontraceresponse) & { `transaction_hash`: `string` }[] |

#### Defined in

[src/types/api/sequencer.ts:283](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L283)

---

### Storage

Ƭ **Storage**: `string`

#### Defined in

[src/types/api/sequencer.ts:287](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L287)

---

### StateUpdateResponse

Ƭ **StateUpdateResponse**: `Object`

#### Type declaration

| Name                                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_hash`                        | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `new_root`                          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `old_root`                          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `state_diff`                        | { `storage_diffs`: [`StorageDiffs`](types.Sequencer.md#storagediffs) ; `nonces`: [`Nonces`](types.Sequencer.md#nonces) ; `deployed_contracts`: [`DeployedContractItem`](types.md#deployedcontractitem)[] ; `old_declared_contracts`: [`OldDeclaredContracts`](types.Sequencer.md#olddeclaredcontracts) ; `declared_classes`: [`DeclaredClasses`](types.Sequencer.md#declaredclasses) ; `replaced_classes`: [`ReplacedClasses`](types.Sequencer.md#replacedclasses) } |
| `state_diff.storage_diffs`          | [`StorageDiffs`](types.Sequencer.md#storagediffs)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `state_diff.nonces`                 | [`Nonces`](types.Sequencer.md#nonces)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `state_diff.deployed_contracts`     | [`DeployedContractItem`](types.md#deployedcontractitem)[]                                                                                                                                                                                                                                                                                                                                                                                                            |
| `state_diff.old_declared_contracts` | [`OldDeclaredContracts`](types.Sequencer.md#olddeclaredcontracts)                                                                                                                                                                                                                                                                                                                                                                                                    |
| `state_diff.declared_classes`       | [`DeclaredClasses`](types.Sequencer.md#declaredclasses)                                                                                                                                                                                                                                                                                                                                                                                                              |
| `state_diff.replaced_classes`       | [`ReplacedClasses`](types.Sequencer.md#replacedclasses)                                                                                                                                                                                                                                                                                                                                                                                                              |

#### Defined in

[src/types/api/sequencer.ts:289](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L289)

---

### StorageDiffs

Ƭ **StorageDiffs**: `Object`

#### Index signature

▪ [address: `string`]: [`StateDiffItem`](types.Sequencer.md#statediffitem)[]

#### Defined in

[src/types/api/sequencer.ts:303](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L303)

---

### StateDiffItem

Ƭ **StateDiffItem**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `string` |

#### Defined in

[src/types/api/sequencer.ts:305](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L305)

---

### Nonces

Ƭ **Nonces**: `Object`

#### Index signature

▪ [address: `string`]: [`Nonce`](types.Sequencer.md#nonce)

#### Defined in

[src/types/api/sequencer.ts:307](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L307)

---

### Nonce

Ƭ **Nonce**: `string`

#### Defined in

[src/types/api/sequencer.ts:309](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L309)

---

### DeployedContracts

Ƭ **DeployedContracts**: [`DeployedContractItem`](types.md#deployedcontractitem)[]

#### Defined in

[src/types/api/sequencer.ts:311](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L311)

---

### OldDeclaredContracts

Ƭ **OldDeclaredContracts**: `string`[]

#### Defined in

[src/types/api/sequencer.ts:313](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L313)

---

### DeclaredClasses

Ƭ **DeclaredClasses**: [`DeclaredClass`](types.Sequencer.md#declaredclass)[]

#### Defined in

[src/types/api/sequencer.ts:315](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L315)

---

### DeclaredClass

Ƭ **DeclaredClass**: `Object`

#### Type declaration

| Name                  | Type     |
| :-------------------- | :------- |
| `class_hash`          | `string` |
| `compiled_class_hash` | `string` |

#### Defined in

[src/types/api/sequencer.ts:317](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L317)

---

### ReplacedClasses

Ƭ **ReplacedClasses**: `string`[]

#### Defined in

[src/types/api/sequencer.ts:319](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L319)

---

### Endpoints

Ƭ **Endpoints**: `Object`

#### Type declaration

| Name                                                      | Type                                                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_contract_addresses`                                  | { `QUERY`: `never` ; `REQUEST`: `never` ; `RESPONSE`: [`GetContractAddressesResponse`](types.md#getcontractaddressesresponse) }                                                                                                                                                        |
| `get_contract_addresses.QUERY`                            | `never`                                                                                                                                                                                                                                                                                |
| `get_contract_addresses.REQUEST`                          | `never`                                                                                                                                                                                                                                                                                |
| `get_contract_addresses.RESPONSE`                         | [`GetContractAddressesResponse`](types.md#getcontractaddressesresponse)                                                                                                                                                                                                                |
| `add_transaction`                                         | { `QUERY`: `never` ; `REQUEST`: [`Transaction`](types.Sequencer.md#transaction) ; `RESPONSE`: [`AddTransactionResponse`](types.Sequencer.md#addtransactionresponse) }                                                                                                                  |
| `add_transaction.QUERY`                                   | `never`                                                                                                                                                                                                                                                                                |
| `add_transaction.REQUEST`                                 | [`Transaction`](types.Sequencer.md#transaction)                                                                                                                                                                                                                                        |
| `add_transaction.RESPONSE`                                | [`AddTransactionResponse`](types.Sequencer.md#addtransactionresponse)                                                                                                                                                                                                                  |
| `get_transaction`                                         | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionResponse`](types.Sequencer.md#gettransactionresponse) }                                                                                                                                  |
| `get_transaction.QUERY`                                   | { `transactionHash`: `string` }                                                                                                                                                                                                                                                        |
| `get_transaction.QUERY.transactionHash`                   | `string`                                                                                                                                                                                                                                                                               |
| `get_transaction.REQUEST`                                 | `never`                                                                                                                                                                                                                                                                                |
| `get_transaction.RESPONSE`                                | [`GetTransactionResponse`](types.Sequencer.md#gettransactionresponse)                                                                                                                                                                                                                  |
| `get_transaction_status`                                  | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionStatusResponse`](types.md#gettransactionstatusresponse) }                                                                                                                                |
| `get_transaction_status.QUERY`                            | { `transactionHash`: `string` }                                                                                                                                                                                                                                                        |
| `get_transaction_status.QUERY.transactionHash`            | `string`                                                                                                                                                                                                                                                                               |
| `get_transaction_status.REQUEST`                          | `never`                                                                                                                                                                                                                                                                                |
| `get_transaction_status.RESPONSE`                         | [`GetTransactionStatusResponse`](types.md#gettransactionstatusresponse)                                                                                                                                                                                                                |
| `get_transaction_trace`                                   | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionTraceResponse`](types.Sequencer.md#transactiontraceresponse) }                                                                                                                              |
| `get_transaction_trace.QUERY`                             | { `transactionHash`: `string` }                                                                                                                                                                                                                                                        |
| `get_transaction_trace.QUERY.transactionHash`             | `string`                                                                                                                                                                                                                                                                               |
| `get_transaction_trace.REQUEST`                           | `never`                                                                                                                                                                                                                                                                                |
| `get_transaction_trace.RESPONSE`                          | [`TransactionTraceResponse`](types.Sequencer.md#transactiontraceresponse)                                                                                                                                                                                                              |
| `get_transaction_receipt`                                 | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionReceiptResponse`](types.Sequencer.md#transactionreceiptresponse) }                                                                                                                          |
| `get_transaction_receipt.QUERY`                           | { `transactionHash`: `string` }                                                                                                                                                                                                                                                        |
| `get_transaction_receipt.QUERY.transactionHash`           | `string`                                                                                                                                                                                                                                                                               |
| `get_transaction_receipt.REQUEST`                         | `never`                                                                                                                                                                                                                                                                                |
| `get_transaction_receipt.RESPONSE`                        | [`TransactionReceiptResponse`](types.Sequencer.md#transactionreceiptresponse)                                                                                                                                                                                                          |
| `get_nonce`                                               | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`Nonce`](types.Sequencer.md#nonce) }                                                                                                 |
| `get_nonce.QUERY`                                         | { `contractAddress`: `string` ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                     |
| `get_nonce.QUERY.contractAddress`                         | `string`                                                                                                                                                                                                                                                                               |
| `get_nonce.QUERY.blockIdentifier`                         | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_nonce.REQUEST`                                       | `never`                                                                                                                                                                                                                                                                                |
| `get_nonce.RESPONSE`                                      | [`Nonce`](types.Sequencer.md#nonce)                                                                                                                                                                                                                                                    |
| `get_storage_at`                                          | { `QUERY`: { `contractAddress`: `string` ; `key`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`Storage`](types.Sequencer.md#storage) }                                            |
| `get_storage_at.QUERY`                                    | { `contractAddress`: `string` ; `key`: [`BigNumberish`](types.md#bignumberish) ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                    |
| `get_storage_at.QUERY.contractAddress`                    | `string`                                                                                                                                                                                                                                                                               |
| `get_storage_at.QUERY.key`                                | [`BigNumberish`](types.md#bignumberish)                                                                                                                                                                                                                                                |
| `get_storage_at.QUERY.blockIdentifier`                    | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_storage_at.REQUEST`                                  | `never`                                                                                                                                                                                                                                                                                |
| `get_storage_at.RESPONSE`                                 | [`Storage`](types.Sequencer.md#storage)                                                                                                                                                                                                                                                |
| `get_code`                                                | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`GetCodeResponse`](types.Sequencer.md#getcoderesponse) }                                                                             |
| `get_code.QUERY`                                          | { `contractAddress`: `string` ; `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                     |
| `get_code.QUERY.contractAddress`                          | `string`                                                                                                                                                                                                                                                                               |
| `get_code.QUERY.blockIdentifier`                          | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_code.REQUEST`                                        | `never`                                                                                                                                                                                                                                                                                |
| `get_code.RESPONSE`                                       | [`GetCodeResponse`](types.Sequencer.md#getcoderesponse)                                                                                                                                                                                                                                |
| `get_block`                                               | { `QUERY`: { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`GetBlockResponse`](types.Sequencer.md#getblockresponse) }                                                                                                         |
| `get_block.QUERY`                                         | { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                                                   |
| `get_block.QUERY.blockIdentifier`                         | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_block.REQUEST`                                       | `never`                                                                                                                                                                                                                                                                                |
| `get_block.RESPONSE`                                      | [`GetBlockResponse`](types.Sequencer.md#getblockresponse)                                                                                                                                                                                                                              |
| `call_contract`                                           | { `QUERY`: { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: [`CallContractTransaction`](types.Sequencer.md#callcontracttransaction) ; `RESPONSE`: [`CallContractResponse`](types.Sequencer.md#callcontractresponse) }                                 |
| `call_contract.QUERY`                                     | { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                                                   |
| `call_contract.QUERY.blockIdentifier`                     | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `call_contract.REQUEST`                                   | [`CallContractTransaction`](types.Sequencer.md#callcontracttransaction)                                                                                                                                                                                                                |
| `call_contract.RESPONSE`                                  | [`CallContractResponse`](types.Sequencer.md#callcontractresponse)                                                                                                                                                                                                                      |
| `estimate_fee`                                            | { `QUERY`: { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` } ; `REQUEST`: [`AccountTransactionItem`](types.Sequencer.md#accounttransactionitem) ; `RESPONSE`: [`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse) }         |
| `estimate_fee.QUERY`                                      | { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` }                                                                                                                                                                                       |
| `estimate_fee.QUERY.blockIdentifier`                      | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `estimate_fee.QUERY.skipValidate`                         | `boolean`                                                                                                                                                                                                                                                                              |
| `estimate_fee.REQUEST`                                    | [`AccountTransactionItem`](types.Sequencer.md#accounttransactionitem)                                                                                                                                                                                                                  |
| `estimate_fee.RESPONSE`                                   | [`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse)                                                                                                                                                                                                                        |
| `get_class_by_hash`                                       | { `QUERY`: { `classHash`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`CompiledContract`](types.md#compiledcontract) }                                                                                          |
| `get_class_by_hash.QUERY`                                 | { `classHash`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                          |
| `get_class_by_hash.QUERY.classHash`                       | `string`                                                                                                                                                                                                                                                                               |
| `get_class_by_hash.QUERY.blockIdentifier?`                | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_class_by_hash.REQUEST`                               | `never`                                                                                                                                                                                                                                                                                |
| `get_class_by_hash.RESPONSE`                              | [`CompiledContract`](types.md#compiledcontract)                                                                                                                                                                                                                                        |
| `get_class_hash_at`                                       | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: `string` }                                                                                                                           |
| `get_class_hash_at.QUERY`                                 | { `contractAddress`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                    |
| `get_class_hash_at.QUERY.contractAddress`                 | `string`                                                                                                                                                                                                                                                                               |
| `get_class_hash_at.QUERY.blockIdentifier?`                | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_class_hash_at.REQUEST`                               | `never`                                                                                                                                                                                                                                                                                |
| `get_class_hash_at.RESPONSE`                              | `string`                                                                                                                                                                                                                                                                               |
| `get_state_update`                                        | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](types.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`StateUpdateResponse`](types.Sequencer.md#stateupdateresponse) }                                                                                     |
| `get_state_update.QUERY`                                  | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](types.md#blocknumber) }                                                                                                                                                                                                     |
| `get_state_update.QUERY.blockHash?`                       | `string`                                                                                                                                                                                                                                                                               |
| `get_state_update.QUERY.blockNumber?`                     | [`BlockNumber`](types.md#blocknumber)                                                                                                                                                                                                                                                  |
| `get_state_update.REQUEST`                                | `never`                                                                                                                                                                                                                                                                                |
| `get_state_update.RESPONSE`                               | [`StateUpdateResponse`](types.Sequencer.md#stateupdateresponse)                                                                                                                                                                                                                        |
| `get_full_contract`                                       | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `never` ; `RESPONSE`: [`CompiledContract`](types.md#compiledcontract) }                                                                                    |
| `get_full_contract.QUERY`                                 | { `contractAddress`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                    |
| `get_full_contract.QUERY.contractAddress`                 | `string`                                                                                                                                                                                                                                                                               |
| `get_full_contract.QUERY.blockIdentifier?`                | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_full_contract.REQUEST`                               | `never`                                                                                                                                                                                                                                                                                |
| `get_full_contract.RESPONSE`                              | [`CompiledContract`](types.md#compiledcontract)                                                                                                                                                                                                                                        |
| `estimate_message_fee`                                    | { `QUERY`: `any` ; `REQUEST`: `any` ; `RESPONSE`: [`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse) }                                                                                                                                                                    |
| `estimate_message_fee.QUERY`                              | `any`                                                                                                                                                                                                                                                                                  |
| `estimate_message_fee.REQUEST`                            | `any`                                                                                                                                                                                                                                                                                  |
| `estimate_message_fee.RESPONSE`                           | [`EstimateFeeResponse`](types.Sequencer.md#estimatefeeresponse)                                                                                                                                                                                                                        |
| `simulate_transaction`                                    | { `QUERY`: { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` } ; `REQUEST`: [`AccountTransaction`](types.Sequencer.md#accounttransaction) ; `RESPONSE`: [`SimulateTransactionResponse`](types.Sequencer.md#simulatetransactionresponse) } |
| `simulate_transaction.QUERY`                              | { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` }                                                                                                                                                                                       |
| `simulate_transaction.QUERY.blockIdentifier`              | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `simulate_transaction.QUERY.skipValidate`                 | `boolean`                                                                                                                                                                                                                                                                              |
| `simulate_transaction.REQUEST`                            | [`AccountTransaction`](types.Sequencer.md#accounttransaction)                                                                                                                                                                                                                          |
| `simulate_transaction.RESPONSE`                           | [`SimulateTransactionResponse`](types.Sequencer.md#simulatetransactionresponse)                                                                                                                                                                                                        |
| `estimate_fee_bulk`                                       | { `QUERY`: { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` } ; `REQUEST`: [`AccountTransaction`](types.Sequencer.md#accounttransaction) ; `RESPONSE`: [`EstimateFeeResponseBulk`](types.Sequencer.md#estimatefeeresponsebulk) }         |
| `estimate_fee_bulk.QUERY`                                 | { `blockIdentifier`: [`BlockIdentifier`](types.md#blockidentifier) ; `skipValidate`: `boolean` }                                                                                                                                                                                       |
| `estimate_fee_bulk.QUERY.blockIdentifier`                 | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `estimate_fee_bulk.QUERY.skipValidate`                    | `boolean`                                                                                                                                                                                                                                                                              |
| `estimate_fee_bulk.REQUEST`                               | [`AccountTransaction`](types.Sequencer.md#accounttransaction)                                                                                                                                                                                                                          |
| `estimate_fee_bulk.RESPONSE`                              | [`EstimateFeeResponseBulk`](types.Sequencer.md#estimatefeeresponsebulk)                                                                                                                                                                                                                |
| `get_block_traces`                                        | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](types.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`BlockTransactionTracesResponse`](types.Sequencer.md#blocktransactiontracesresponse) }                                                               |
| `get_block_traces.QUERY`                                  | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](types.md#blocknumber) }                                                                                                                                                                                                     |
| `get_block_traces.QUERY.blockHash?`                       | `string`                                                                                                                                                                                                                                                                               |
| `get_block_traces.QUERY.blockNumber?`                     | [`BlockNumber`](types.md#blocknumber)                                                                                                                                                                                                                                                  |
| `get_block_traces.REQUEST`                                | `never`                                                                                                                                                                                                                                                                                |
| `get_block_traces.RESPONSE`                               | [`BlockTransactionTracesResponse`](types.Sequencer.md#blocktransactiontracesresponse)                                                                                                                                                                                                  |
| `get_compiled_class_by_class_hash`                        | { `QUERY`: { `classHash`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) } ; `REQUEST`: `any` ; `RESPONSE`: [`CairoAssembly`](types.md#cairoassembly) }                                                                                                  |
| `get_compiled_class_by_class_hash.QUERY`                  | { `classHash`: `string` ; `blockIdentifier?`: [`BlockIdentifier`](types.md#blockidentifier) }                                                                                                                                                                                          |
| `get_compiled_class_by_class_hash.QUERY.classHash`        | `string`                                                                                                                                                                                                                                                                               |
| `get_compiled_class_by_class_hash.QUERY.blockIdentifier?` | [`BlockIdentifier`](types.md#blockidentifier)                                                                                                                                                                                                                                          |
| `get_compiled_class_by_class_hash.REQUEST`                | `any`                                                                                                                                                                                                                                                                                  |
| `get_compiled_class_by_class_hash.RESPONSE`               | [`CairoAssembly`](types.md#cairoassembly)                                                                                                                                                                                                                                              |

#### Defined in

[src/types/api/sequencer.ts:321](https://github.com/0xs34n/starknet.js/blob/develop/src/types/api/sequencer.ts#L321)
