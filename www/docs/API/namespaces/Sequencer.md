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

| Name             | Type                                              |
| :--------------- | :------------------------------------------------ |
| `type`           | `"DECLARE"`                                       |
| `sender_address` | `string`                                          |
| `contract_class` | [`ContractClass`](../interfaces/ContractClass.md) |
| `signature?`     | `string`[]                                        |
| `nonce`          | [`BigNumberish`](num.md#bignumberish)             |
| `max_fee?`       | [`BigNumberish`](num.md#bignumberish)             |
| `version?`       | [`BigNumberish`](num.md#bignumberish)             |

#### Defined in

[src/types/api/sequencer.ts:93](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L93)

---

### DeployTransaction

Ƭ **DeployTransaction**: `Object`

#### Type declaration

| Name                    | Type                                              |
| :---------------------- | :------------------------------------------------ |
| `type`                  | `"DEPLOY"`                                        |
| `contract_definition`   | [`ContractClass`](../interfaces/ContractClass.md) |
| `contract_address_salt` | [`BigNumberish`](num.md#bignumberish)             |
| `constructor_calldata`  | `string`[]                                        |
| `nonce?`                | [`BigNumberish`](num.md#bignumberish)             |

#### Defined in

[src/types/api/sequencer.ts:103](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L103)

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

[src/types/api/sequencer.ts:111](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L111)

---

### InvokeFunctionTransaction

Ƭ **InvokeFunctionTransaction**: `Object`

#### Type declaration

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `type`              | `"INVOKE_FUNCTION"`                              |
| `contract_address`  | `string`                                         |
| `signature?`        | `string`[]                                       |
| `entry_point_type?` | [`EntryPointType`](../modules.md#entrypointtype) |
| `calldata?`         | [`RawCalldata`](../modules.md#rawcalldata)       |
| `nonce`             | [`BigNumberish`](num.md#bignumberish)            |
| `max_fee?`          | [`BigNumberish`](num.md#bignumberish)            |
| `version?`          | [`BigNumberish`](num.md#bignumberish)            |

#### Defined in

[src/types/api/sequencer.ts:122](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L122)

---

### Transaction

Ƭ **Transaction**: [`DeclareTransaction`](Sequencer.md#declaretransaction) \| [`DeployTransaction`](Sequencer.md#deploytransaction) \| [`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction) \| [`DeployAccountTransaction`](Sequencer.md#deployaccounttransaction)

#### Defined in

[src/types/api/sequencer.ts:133](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L133)

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

[src/types/api/sequencer.ts:139](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L139)

---

### GetCodeResponse

Ƭ **GetCodeResponse**: `Object`

#### Type declaration

| Name       | Type                       |
| :--------- | :------------------------- |
| `bytecode` | `string`[]                 |
| `abi`      | [`Abi`](../modules.md#abi) |

#### Defined in

[src/types/api/sequencer.ts:146](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L146)

---

### TransactionResponse

Ƭ **TransactionResponse**: [`DeclareTransaction`](Sequencer.md#declaretransaction) \| [`DeployTransaction`](Sequencer.md#deploytransaction) \| [`InvokeFunctionTransactionResponse`](../interfaces/Sequencer.InvokeFunctionTransactionResponse.md)

#### Defined in

[src/types/api/sequencer.ts:156](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L156)

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

[src/types/api/sequencer.ts:161](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L161)

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

[src/types/api/sequencer.ts:169](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L169)

---

### GetTransactionResponse

Ƭ **GetTransactionResponse**: [`SuccessfulTransactionResponse`](Sequencer.md#successfultransactionresponse) \| [`FailedTransactionResponse`](Sequencer.md#failedtransactionresponse)

#### Defined in

[src/types/api/sequencer.ts:178](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L178)

---

### TransactionReceiptResponse

Ƭ **TransactionReceiptResponse**: [`SuccessfulTransactionReceiptResponse`](Sequencer.md#successfultransactionreceiptresponse) \| [`FailedTransactionReceiptResponse`](Sequencer.md#failedtransactionreceiptresponse)

#### Defined in

[src/types/api/sequencer.ts:180](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L180)

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

[src/types/api/sequencer.ts:184](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L184)

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

[src/types/api/sequencer.ts:196](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L196)

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

[src/types/api/sequencer.ts:207](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L207)

---

### CallContractTransaction

Ƭ **CallContractTransaction**: `Omit`<[`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction), `"type"` \| `"entry_point_type"` \| `"nonce"`\> & { `entry_point_selector`: `string` }

#### Defined in

[src/types/api/sequencer.ts:236](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L236)

---

### CallContractResponse

Ƭ **CallContractResponse**: `Object`

#### Type declaration

| Name     | Type       |
| :------- | :--------- |
| `result` | `string`[] |

#### Defined in

[src/types/api/sequencer.ts:241](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L241)

---

### InvokeEstimateFee

Ƭ **InvokeEstimateFee**: `Omit`<[`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction), `"max_fee"` \| `"entry_point_type"`\>

#### Defined in

[src/types/api/sequencer.ts:245](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L245)

---

### DeclareEstimateFee

Ƭ **DeclareEstimateFee**: `Omit`<[`DeclareTransaction`](Sequencer.md#declaretransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:246](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L246)

---

### DeployAccountEstimateFee

Ƭ **DeployAccountEstimateFee**: `Omit`<[`DeployAccountTransaction`](Sequencer.md#deployaccounttransaction), `"max_fee"`\>

#### Defined in

[src/types/api/sequencer.ts:247](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L247)

---

### DeployEstimateFee

Ƭ **DeployEstimateFee**: [`DeployTransaction`](Sequencer.md#deploytransaction)

#### Defined in

[src/types/api/sequencer.ts:248](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L248)

---

### EstimateFeeRequest

Ƭ **EstimateFeeRequest**: [`InvokeEstimateFee`](Sequencer.md#invokeestimatefee) \| [`DeclareEstimateFee`](Sequencer.md#declareestimatefee) \| [`DeployEstimateFee`](Sequencer.md#deployestimatefee) \| [`DeployAccountEstimateFee`](Sequencer.md#deployaccountestimatefee)

#### Defined in

[src/types/api/sequencer.ts:250](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L250)

---

### TransactionSimulationResponse

Ƭ **TransactionSimulationResponse**: `Object`

#### Type declaration

| Name             | Type                                                                 |
| :--------------- | :------------------------------------------------------------------- |
| `trace`          | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) |
| `fee_estimation` | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)            |

#### Defined in

[src/types/api/sequencer.ts:256](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L256)

---

### SimulateTransaction

Ƭ **SimulateTransaction**: `Omit`<[`InvokeFunctionTransaction`](Sequencer.md#invokefunctiontransaction), `"entry_point_type"`\>

#### Defined in

[src/types/api/sequencer.ts:261](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L261)

---

### EstimateFeeRequestBulk

Ƭ **EstimateFeeRequestBulk**: [`AllowArray`](../modules.md#allowarray)<[`InvokeEstimateFee`](Sequencer.md#invokeestimatefee) \| [`DeclareEstimateFee`](Sequencer.md#declareestimatefee) \| [`DeployEstimateFee`](Sequencer.md#deployestimatefee) \| [`DeployAccountEstimateFee`](Sequencer.md#deployaccountestimatefee)\>

#### Defined in

[src/types/api/sequencer.ts:263](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L263)

---

### EstimateFeeResponse

Ƭ **EstimateFeeResponse**: { `overall_fee`: `number` ; `gas_price`: `number` ; `gas_usage`: `number` ; `uint`: `string` } \| { `amount`: `bigint` ; `unit`: `string` }

#### Defined in

[src/types/api/sequencer.ts:268](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L268)

---

### EstimateFeeResponseBulk

Ƭ **EstimateFeeResponseBulk**: [`AllowArray`](../modules.md#allowarray)<[`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)\>

#### Defined in

[src/types/api/sequencer.ts:280](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L280)

---

### BlockTransactionTracesResponse

Ƭ **BlockTransactionTracesResponse**: `Object`

#### Type declaration

| Name     | Type                                                                                                      |
| :------- | :-------------------------------------------------------------------------------------------------------- |
| `traces` | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) & { `transaction_hash`: `string` }[] |

#### Defined in

[src/types/api/sequencer.ts:282](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L282)

---

### StateUpdateResponse

Ƭ **StateUpdateResponse**: `Object`

#### Type declaration

| Name                                  | Type                                                                                                                                                                                                                                                                             |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `block_hash`                          | `string`                                                                                                                                                                                                                                                                         |
| `new_root`                            | `string`                                                                                                                                                                                                                                                                         |
| `old_root`                            | `string`                                                                                                                                                                                                                                                                         |
| `state_diff`                          | { `storage_diffs`: { `[address: string]`: [`StateDiffItem`](../modules.md#statediffitem)[]; }[] ; `declared_contract_hashes`: `string`[] ; `deployed_contracts`: [`DeployedContractItem`](../modules.md#deployedcontractitem)[] ; `nonces`: [`Nonces`](../modules.md#nonces)[] } |
| `state_diff.storage_diffs`            | { `[address: string]`: [`StateDiffItem`](../modules.md#statediffitem)[]; }[]                                                                                                                                                                                                     |
| `state_diff.declared_contract_hashes` | `string`[]                                                                                                                                                                                                                                                                       |
| `state_diff.deployed_contracts`       | [`DeployedContractItem`](../modules.md#deployedcontractitem)[]                                                                                                                                                                                                                   |
| `state_diff.nonces`                   | [`Nonces`](../modules.md#nonces)[]                                                                                                                                                                                                                                               |

#### Defined in

[src/types/api/sequencer.ts:286](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L286)

---

### Endpoints

Ƭ **Endpoints**: `Object`

#### Type declaration

| Name                                            | Type                                                                                                                                                                                                                     |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_contract_addresses`                        | { `QUERY`: `never` ; `REQUEST`: `never` ; `RESPONSE`: [`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse) }                                                                                     |
| `get_contract_addresses.QUERY`                  | `never`                                                                                                                                                                                                                  |
| `get_contract_addresses.REQUEST`                | `never`                                                                                                                                                                                                                  |
| `get_contract_addresses.RESPONSE`               | [`GetContractAddressesResponse`](../modules.md#getcontractaddressesresponse)                                                                                                                                             |
| `add_transaction`                               | { `QUERY`: `never` ; `REQUEST`: [`Transaction`](Sequencer.md#transaction) ; `RESPONSE`: [`AddTransactionResponse`](Sequencer.md#addtransactionresponse) }                                                                |
| `add_transaction.QUERY`                         | `never`                                                                                                                                                                                                                  |
| `add_transaction.REQUEST`                       | [`Transaction`](Sequencer.md#transaction)                                                                                                                                                                                |
| `add_transaction.RESPONSE`                      | [`AddTransactionResponse`](Sequencer.md#addtransactionresponse)                                                                                                                                                          |
| `get_transaction`                               | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionResponse`](Sequencer.md#gettransactionresponse) }                                                                          |
| `get_transaction.QUERY`                         | { `transactionHash`: `string` }                                                                                                                                                                                          |
| `get_transaction.QUERY.transactionHash`         | `string`                                                                                                                                                                                                                 |
| `get_transaction.REQUEST`                       | `never`                                                                                                                                                                                                                  |
| `get_transaction.RESPONSE`                      | [`GetTransactionResponse`](Sequencer.md#gettransactionresponse)                                                                                                                                                          |
| `get_transaction_status`                        | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse) }                                                             |
| `get_transaction_status.QUERY`                  | { `transactionHash`: `string` }                                                                                                                                                                                          |
| `get_transaction_status.QUERY.transactionHash`  | `string`                                                                                                                                                                                                                 |
| `get_transaction_status.REQUEST`                | `never`                                                                                                                                                                                                                  |
| `get_transaction_status.RESPONSE`               | [`GetTransactionStatusResponse`](../modules.md#gettransactionstatusresponse)                                                                                                                                             |
| `get_transaction_trace`                         | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionTraceResponse`](../modules.md#transactiontraceresponse) }                                                                     |
| `get_transaction_trace.QUERY`                   | { `transactionHash`: `string` }                                                                                                                                                                                          |
| `get_transaction_trace.QUERY.transactionHash`   | `string`                                                                                                                                                                                                                 |
| `get_transaction_trace.REQUEST`                 | `never`                                                                                                                                                                                                                  |
| `get_transaction_trace.RESPONSE`                | [`TransactionTraceResponse`](../modules.md#transactiontraceresponse)                                                                                                                                                     |
| `get_transaction_receipt`                       | { `QUERY`: { `transactionHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: [`TransactionReceiptResponse`](Sequencer.md#transactionreceiptresponse) }                                                                  |
| `get_transaction_receipt.QUERY`                 | { `transactionHash`: `string` }                                                                                                                                                                                          |
| `get_transaction_receipt.QUERY.transactionHash` | `string`                                                                                                                                                                                                                 |
| `get_transaction_receipt.REQUEST`               | `never`                                                                                                                                                                                                                  |
| `get_transaction_receipt.RESPONSE`              | [`TransactionReceiptResponse`](Sequencer.md#transactionreceiptresponse)                                                                                                                                                  |
| `get_nonce`                                     | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`BigNumberish`](num.md#bignumberish) }                                                             |
| `get_nonce.QUERY`                               | { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                   |
| `get_nonce.QUERY.contractAddress`               | `string`                                                                                                                                                                                                                 |
| `get_nonce.QUERY.blockIdentifier`               | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_nonce.REQUEST`                             | `never`                                                                                                                                                                                                                  |
| `get_nonce.RESPONSE`                            | [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                    |
| `get_storage_at`                                | { `QUERY`: { `contractAddress`: `string` ; `key`: [`BigNumberish`](num.md#bignumberish) ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: `string` }                                           |
| `get_storage_at.QUERY`                          | { `contractAddress`: `string` ; `key`: [`BigNumberish`](num.md#bignumberish) ; `blockIdentifier`: `BlockIdentifier` }                                                                                                    |
| `get_storage_at.QUERY.contractAddress`          | `string`                                                                                                                                                                                                                 |
| `get_storage_at.QUERY.key`                      | [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                    |
| `get_storage_at.QUERY.blockIdentifier`          | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_storage_at.REQUEST`                        | `never`                                                                                                                                                                                                                  |
| `get_storage_at.RESPONSE`                       | `string`                                                                                                                                                                                                                 |
| `get_code`                                      | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetCodeResponse`](Sequencer.md#getcoderesponse) }                                                 |
| `get_code.QUERY`                                | { `contractAddress`: `string` ; `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                   |
| `get_code.QUERY.contractAddress`                | `string`                                                                                                                                                                                                                 |
| `get_code.QUERY.blockIdentifier`                | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_code.REQUEST`                              | `never`                                                                                                                                                                                                                  |
| `get_code.RESPONSE`                             | [`GetCodeResponse`](Sequencer.md#getcoderesponse)                                                                                                                                                                        |
| `get_block`                                     | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: [`GetBlockResponse`](Sequencer.md#getblockresponse) }                                                                             |
| `get_block.QUERY`                               | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                 |
| `get_block.QUERY.blockIdentifier`               | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_block.REQUEST`                             | `never`                                                                                                                                                                                                                  |
| `get_block.RESPONSE`                            | [`GetBlockResponse`](Sequencer.md#getblockresponse)                                                                                                                                                                      |
| `call_contract`                                 | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`CallContractTransaction`](Sequencer.md#callcontracttransaction) ; `RESPONSE`: [`CallContractResponse`](Sequencer.md#callcontractresponse) }           |
| `call_contract.QUERY`                           | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                 |
| `call_contract.QUERY.blockIdentifier`           | `BlockIdentifier`                                                                                                                                                                                                        |
| `call_contract.REQUEST`                         | [`CallContractTransaction`](Sequencer.md#callcontracttransaction)                                                                                                                                                        |
| `call_contract.RESPONSE`                        | [`CallContractResponse`](Sequencer.md#callcontractresponse)                                                                                                                                                              |
| `estimate_fee`                                  | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`EstimateFeeRequest`](Sequencer.md#estimatefeerequest) ; `RESPONSE`: [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse) }                       |
| `estimate_fee.QUERY`                            | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                 |
| `estimate_fee.QUERY.blockIdentifier`            | `BlockIdentifier`                                                                                                                                                                                                        |
| `estimate_fee.REQUEST`                          | [`EstimateFeeRequest`](Sequencer.md#estimatefeerequest)                                                                                                                                                                  |
| `estimate_fee.RESPONSE`                         | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)                                                                                                                                                                |
| `get_class_by_hash`                             | { `QUERY`: { `classHash`: `string` } ; `REQUEST`: `never` ; `RESPONSE`: `any` }                                                                                                                                          |
| `get_class_by_hash.QUERY`                       | { `classHash`: `string` }                                                                                                                                                                                                |
| `get_class_by_hash.QUERY.classHash`             | `string`                                                                                                                                                                                                                 |
| `get_class_by_hash.REQUEST`                     | `never`                                                                                                                                                                                                                  |
| `get_class_by_hash.RESPONSE`                    | `any`                                                                                                                                                                                                                    |
| `get_class_hash_at`                             | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: `string` }                                                                                         |
| `get_class_hash_at.QUERY`                       | { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                  |
| `get_class_hash_at.QUERY.contractAddress`       | `string`                                                                                                                                                                                                                 |
| `get_class_hash_at.QUERY.blockIdentifier?`      | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_class_hash_at.REQUEST`                     | `never`                                                                                                                                                                                                                  |
| `get_class_hash_at.RESPONSE`                    | `string`                                                                                                                                                                                                                 |
| `get_state_update`                              | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`StateUpdateResponse`](Sequencer.md#stateupdateresponse) }                        |
| `get_state_update.QUERY`                        | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) }                                                                                                                                  |
| `get_state_update.QUERY.blockHash?`             | `string`                                                                                                                                                                                                                 |
| `get_state_update.QUERY.blockNumber?`           | [`BlockNumber`](../modules.md#blocknumber)                                                                                                                                                                               |
| `get_state_update.REQUEST`                      | `never`                                                                                                                                                                                                                  |
| `get_state_update.RESPONSE`                     | [`StateUpdateResponse`](Sequencer.md#stateupdateresponse)                                                                                                                                                                |
| `get_full_contract`                             | { `QUERY`: { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` } ; `REQUEST`: `never` ; `RESPONSE`: `any` }                                                                                            |
| `get_full_contract.QUERY`                       | { `contractAddress`: `string` ; `blockIdentifier?`: `BlockIdentifier` }                                                                                                                                                  |
| `get_full_contract.QUERY.contractAddress`       | `string`                                                                                                                                                                                                                 |
| `get_full_contract.QUERY.blockIdentifier?`      | `BlockIdentifier`                                                                                                                                                                                                        |
| `get_full_contract.REQUEST`                     | `never`                                                                                                                                                                                                                  |
| `get_full_contract.RESPONSE`                    | `any`                                                                                                                                                                                                                    |
| `estimate_message_fee`                          | { `QUERY`: `any` ; `REQUEST`: `any` ; `RESPONSE`: [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse) }                                                                                                            |
| `estimate_message_fee.QUERY`                    | `any`                                                                                                                                                                                                                    |
| `estimate_message_fee.REQUEST`                  | `any`                                                                                                                                                                                                                    |
| `estimate_message_fee.RESPONSE`                 | [`EstimateFeeResponse`](Sequencer.md#estimatefeeresponse)                                                                                                                                                                |
| `simulate_transaction`                          | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`SimulateTransaction`](Sequencer.md#simulatetransaction) ; `RESPONSE`: [`TransactionSimulationResponse`](Sequencer.md#transactionsimulationresponse) } |
| `simulate_transaction.QUERY`                    | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                 |
| `simulate_transaction.QUERY.blockIdentifier`    | `BlockIdentifier`                                                                                                                                                                                                        |
| `simulate_transaction.REQUEST`                  | [`SimulateTransaction`](Sequencer.md#simulatetransaction)                                                                                                                                                                |
| `simulate_transaction.RESPONSE`                 | [`TransactionSimulationResponse`](Sequencer.md#transactionsimulationresponse)                                                                                                                                            |
| `estimate_fee_bulk`                             | { `QUERY`: { `blockIdentifier`: `BlockIdentifier` } ; `REQUEST`: [`EstimateFeeRequestBulk`](Sequencer.md#estimatefeerequestbulk) ; `RESPONSE`: [`EstimateFeeResponseBulk`](Sequencer.md#estimatefeeresponsebulk) }       |
| `estimate_fee_bulk.QUERY`                       | { `blockIdentifier`: `BlockIdentifier` }                                                                                                                                                                                 |
| `estimate_fee_bulk.QUERY.blockIdentifier`       | `BlockIdentifier`                                                                                                                                                                                                        |
| `estimate_fee_bulk.REQUEST`                     | [`EstimateFeeRequestBulk`](Sequencer.md#estimatefeerequestbulk)                                                                                                                                                          |
| `estimate_fee_bulk.RESPONSE`                    | [`EstimateFeeResponseBulk`](Sequencer.md#estimatefeeresponsebulk)                                                                                                                                                        |
| `get_block_traces`                              | { `QUERY`: { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) } ; `REQUEST`: `never` ; `RESPONSE`: [`BlockTransactionTracesResponse`](Sequencer.md#blocktransactiontracesresponse) }  |
| `get_block_traces.QUERY`                        | { `blockHash?`: `string` ; `blockNumber?`: [`BlockNumber`](../modules.md#blocknumber) }                                                                                                                                  |
| `get_block_traces.QUERY.blockHash?`             | `string`                                                                                                                                                                                                                 |
| `get_block_traces.QUERY.blockNumber?`           | [`BlockNumber`](../modules.md#blocknumber)                                                                                                                                                                               |
| `get_block_traces.REQUEST`                      | `never`                                                                                                                                                                                                                  |
| `get_block_traces.RESPONSE`                     | [`BlockTransactionTracesResponse`](Sequencer.md#blocktransactiontracesresponse)                                                                                                                                          |

#### Defined in

[src/types/api/sequencer.ts:300](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/types/api/sequencer.ts#L300)
