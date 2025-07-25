---
id: 'ProviderInterface'
title: 'Class: ProviderInterface'
sidebar_label: 'ProviderInterface'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`ProviderInterface`**

  ↳ [`AccountInterface`](AccountInterface.md)

## Constructors

### constructor

• **new ProviderInterface**(): [`ProviderInterface`](ProviderInterface.md)

#### Returns

[`ProviderInterface`](ProviderInterface.md)

## Properties

### channel

• `Abstract` **channel**: [`RpcChannel`](RPC07.RpcChannel.md) \| [`RpcChannel`](RPC08.RpcChannel.md)

#### Defined in

[src/provider/interface.ts:37](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L37)

## Methods

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Gets the Starknet chain Id

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

#### Defined in

[src/provider/interface.ts:44](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L44)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                                        | Description              |
| :----------------- | :---------------------------------------------------------- | :----------------------- |
| `call`             | [`Call`](../namespaces/types.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../namespaces/types.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Defined in

[src/provider/interface.ts:53](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L53)

---

### getBlock

▸ **getBlock**(`blockIdentifier?`): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

Gets the block information

#### Parameters

| Name               | Type        | Description      |
| :----------------- | :---------- | :--------------- |
| `blockIdentifier?` | `"pending"` | block identifier |

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

the block object

#### Defined in

[src/provider/interface.ts:64](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L64)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Defined in

[src/provider/interface.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L65)

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../namespaces/types.md#getblockresponse)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetBlockResponse`](../namespaces/types.md#getblockresponse)\>

#### Defined in

[src/provider/interface.ts:66](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L66)

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

#### Defined in

[src/provider/interface.ts:75](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L75)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier`): `Promise`<`string`\>

Gets the price of l1 gas in the block

#### Parameters

| Name              | Type                                                        | Description      |
| :---------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

gas price of the block

#### Defined in

[src/provider/interface.ts:86](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L86)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`<`string`\>

Get L1 message hash from L2 transaction hash

#### Parameters

| Name       | Type                                                  | Description         |
| :--------- | :---------------------------------------------------- | :------------------ |
| `l2TxHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) | L2 transaction hash |

#### Returns

`Promise`<`string`\>

Hex string of L1 message hash

**`Example`**

In Sepolia Testnet :

```typescript
const result = provider.getL1MessageHash(
  '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819'
);
// result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
```

#### Defined in

[src/provider/interface.ts:99](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L99)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the contract class hash in the given block for the contract deployed at the given address

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Defined in

[src/provider/interface.ts:108](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L108)

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

#### Defined in

[src/provider/interface.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L119)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the nonce associated with the given address in the given block

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `contractAddress`  | `string`                                                    | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Defined in

[src/provider/interface.ts:127](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L127)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Get the value of the storage (contract's variable) at the given address and key

#### Parameters

| Name               | Type                                                        | Description                                                |
| :----------------- | :---------------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | `string`                                                    |                                                            |
| `key`              | [`BigNumberish`](../namespaces/types.md#bignumberish)       | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Defined in

[src/provider/interface.ts:140](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L140)

---

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<[`TransactionWithHash`](../namespaces/types.md#transactionwithhash)\>

Gets the transaction information from a tx id.

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.md#transactionwithhash)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Defined in

[src/provider/interface.ts:152](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L152)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Defined in

[src/provider/interface.ts:160](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L160)

---

### deployAccountContract

▸ **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                                  | Description                                                                                       |
| :-------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractPayload`](../namespaces/types.md#deployaccountcontractpayload) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)   | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/types.DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:173](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L173)

---

### invokeFunction

▸ **invokeFunction**(`invocation`, `details`): `Promise`<\{ `transaction_hash`: `string` }\>

Invokes a function on starknet

#### Parameters

| Name         | Type                                                                                | Description                                                                                                                                                                                                             |
| :----------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation` | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`    | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                           |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

response from addTransaction

#### Defined in

[src/provider/interface.ts:192](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L192)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                                | Description                                                                                          |
| :------------ | :---------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:209](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L209)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                                | Description                                                                                                                                                                                                             |
| :----------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../namespaces/types.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - the entrypoint of the contract - calldata - (defaults to []) the calldata - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                      |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                             |
| `skipValidate?`    | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                                                                                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:229](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L229)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                                | Description                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                           | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:251](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L251)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                          | Description                                                                                                                                 |
| :----------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                                     | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:274](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L274)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                            | Description                                                              |
| :------------ | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details     |
| `options?`    | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:289](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L289)

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

#### Defined in

[src/provider/interface.ts:302](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L302)

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

#### Defined in

[src/provider/interface.ts:317](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L317)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

Gets the state changes in a specific block (result of executing the requested block)

#### Parameters

| Name               | Type                                                        | Description      |
| :----------------- | :---------------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

StateUpdateResponse

#### Defined in

[src/provider/interface.ts:328](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L328)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                            | Description                                                                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | `string`                                                                        | string                                                                                                                                                               |
| `classHash?`      | `undefined`                                                                     | undefined                                                                                                                                                            |
| `options?`        | [`getContractVersionOptions`](../namespaces/types.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Defined in

[src/provider/interface.ts:338](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L338)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                            | Description                                                                                                                                                          |
| :---------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | `undefined`                                                                     | undefined                                                                                                                                                            |
| `classHash`       | `string`                                                                        |                                                                                                                                                                      |
| `options?`        | [`getContractVersionOptions`](../namespaces/types.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Defined in

[src/provider/interface.ts:352](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/provider/interface.ts#L352)
