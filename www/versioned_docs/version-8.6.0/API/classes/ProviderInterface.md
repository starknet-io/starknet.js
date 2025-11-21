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

• `Abstract` **channel**: [`RpcChannel`](RPC08.RpcChannel.md) \| [`RpcChannel`](RPC09.RpcChannel.md)

#### Defined in

[src/provider/interface.ts:47](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L47)

---

### responseParser

• `Abstract` **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

#### Defined in

[src/provider/interface.ts:49](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L49)

## Methods

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Gets the Starknet chain Id

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

#### Defined in

[src/provider/interface.ts:56](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L56)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                               | Description              |
| :----------------- | :------------------------------------------------- | :----------------------- |
| `call`             | [`Call`](../modules.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Defined in

[src/provider/interface.ts:65](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L65)

---

### getBlock

▸ **getBlock**(): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

Gets the block information

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

the block object

#### Defined in

[src/provider/interface.ts:76](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L76)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Defined in

[src/provider/interface.ts:77](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L77)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Defined in

[src/provider/interface.ts:78](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L78)

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Defined in

[src/provider/interface.ts:79](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L79)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class of compiled contract

#### Defined in

[src/provider/interface.ts:88](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L88)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier?`): `Promise`<`string`\>

Gets the price of l1 gas in the block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

gas price of the block

#### Defined in

[src/provider/interface.ts:99](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L99)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`<`string`\>

Get L1 message hash from L2 transaction hash

#### Parameters

| Name       | Type                                         | Description         |
| :--------- | :------------------------------------------- | :------------------ |
| `l2TxHash` | [`BigNumberish`](../modules.md#bignumberish) | L2 transaction hash |

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

[src/provider/interface.ts:112](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L112)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the contract class hash in the given block for the contract deployed at the given address

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Defined in

[src/provider/interface.ts:121](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L121)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class of compiled contract

#### Defined in

[src/provider/interface.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L132)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the nonce associated with the given address in the given block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Defined in

[src/provider/interface.ts:140](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L140)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Get the value of the storage (contract's variable) at the given address and key

#### Parameters

| Name               | Type                                               | Description                                                |
| :----------------- | :------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |                                                            |
| `key`              | [`BigNumberish`](../modules.md#bignumberish)       | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Defined in

[src/provider/interface.ts:153](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L153)

---

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets the transaction information from a tx id.

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Defined in

[src/provider/interface.ts:165](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L165)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Defined in

[src/provider/interface.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L173)

---

### deployAccountContract

▸ **deployAccountContract**(`payload`, `details`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                         | Description                                                                                       |
| :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)   | -                                                                                                 |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:186](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L186)

---

### invokeFunction

▸ **invokeFunction**(`invocation`, `details`): `Promise`<\{ `transaction_hash`: `string` }\>

Invokes a function on starknet

#### Parameters

| Name         | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :----------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`    | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                                                          |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

response from addTransaction

#### Defined in

[src/provider/interface.ts:205](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L205)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                       | Description                                                                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

a confirmation of sending a transaction on the starknet contract

#### Defined in

[src/provider/interface.ts:222](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L222)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                                                     |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                                                            |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                                                                                                                                              |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getInvokeEstimateFee(invocation, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.INVOKE, ...invocation, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Defined in

[src/provider/interface.ts:250](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L250)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getDeclareEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DECLARE, ...transaction, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Defined in

[src/provider/interface.ts:280](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L280)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                 | Description                                                                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                            | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getDeployAccountEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DEPLOY_ACCOUNT, ...transaction, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Defined in

[src/provider/interface.ts:311](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L311)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                   | Description                                                              |
| :------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details     |
| `options?`    | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier |

#### Returns

`Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

the estimated fee

#### Defined in

[src/provider/interface.ts:326](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L326)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description                                                                                                                              |
| :--------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Defined in

[src/provider/interface.ts:339](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L339)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                           | Description                                                                                                                                                                                       |
| :------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

an array of transaction trace and estimated fee

#### Defined in

[src/provider/interface.ts:354](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L354)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

Gets the state changes in a specific block (result of executing the requested block)

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

StateUpdateResponse

#### Defined in

[src/provider/interface.ts:365](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L365)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

StateUpdateResponse

#### Defined in

[src/provider/interface.ts:374](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L374)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Defined in

[src/provider/interface.ts:375](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L375)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Defined in

[src/provider/interface.ts:378](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L378)

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Defined in

[src/provider/interface.ts:379](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L379)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)                           | string                                                                                                                                                               |
| `classHash?`      | `undefined`                                                            | undefined                                                                                                                                                            |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Defined in

[src/provider/interface.ts:391](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L391)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | `undefined`                                                            | undefined                                                                                                                                                            |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)                           |                                                                                                                                                                      |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Defined in

[src/provider/interface.ts:405](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L405)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<\{ `block_hash`: `string` ; `block_number`: `number` }\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<\{ `block_hash`: `string` ; `block_number`: `number` }\>

Object containing block hash and number

#### Defined in

[src/provider/interface.ts:416](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L416)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Defined in

[src/provider/interface.ts:422](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L422)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`any`\>

Get block information with transaction hashes

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`any`\>

Block with transaction hashes

#### Defined in

[src/provider/interface.ts:429](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L429)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`any`\>

Get block information with full transactions

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`any`\>

Block with full transactions

#### Defined in

[src/provider/interface.ts:436](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L436)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`any`\>

Get block information with transaction receipts

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`any`\>

Block with transaction receipts

#### Defined in

[src/provider/interface.ts:443](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L443)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<`any`\>

Get transaction traces for all transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`any`\>

Array of transaction traces

#### Defined in

[src/provider/interface.ts:450](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L450)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

Get the number of transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`number`\>

Transaction count

#### Defined in

[src/provider/interface.ts:457](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L457)

---

### waitForBlock

▸ **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`<`void`\>

Pause execution until a specified block is created

#### Parameters

| Name               | Type                                               | Description                                   |
| :----------------- | :------------------------------------------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block number or tag                           |
| `retryInterval?`   | `number`                                           | milliseconds between requests (default: 5000) |

#### Returns

`Promise`<`void`\>

**`Example`**

```typescript
await provider.waitForBlock(12345);
await provider.waitForBlock('latest');
```

#### Defined in

[src/provider/interface.ts:469](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L469)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets the transaction information from a tx hash (alias for getTransaction)

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Transaction information

#### Defined in

[src/provider/interface.ts:480](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L480)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets transaction by block identifier and index

#### Parameters

| Name              | Type                                               | Description                    |
| :---------------- | :------------------------------------------------- | :----------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier               |
| `index`           | `number`                                           | transaction index in the block |

#### Returns

`Promise`<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Transaction information

#### Defined in

[src/provider/interface.ts:488](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L488)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

Gets the transaction trace

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

Transaction trace

#### Defined in

[src/provider/interface.ts:498](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L498)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<`any`\>

Get the status of a transaction

#### Parameters

| Name              | Type                                         | Description      |
| :---------------- | :------------------------------------------- | :--------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<`any`\>

Transaction status

#### Defined in

[src/provider/interface.ts:507](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L507)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`<`any`\>

Direct RPC method call

#### Parameters

| Name      | Type                 | Description       |
| :-------- | :------------------- | :---------------- |
| `method`  | `string`             | RPC method name   |
| `params?` | `object`             | method parameters |
| `id?`     | `string` \| `number` | request ID        |

#### Returns

`Promise`<`any`\>

RPC response

#### Defined in

[src/provider/interface.ts:517](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L517)

---

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `string`

Read channel spec version

#### Returns

`undefined` \| `string`

Spec version string or undefined if not set

#### Defined in

[src/provider/interface.ts:523](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L523)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

Get channel spec version

#### Returns

`Promise`<`string`\>

Promise resolving to spec version

#### Defined in

[src/provider/interface.ts:529](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L529)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`string`\>

Setup channel spec version and return it

#### Returns

`Promise`<`string`\>

Promise resolving to spec version

#### Defined in

[src/provider/interface.ts:535](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L535)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Get contract class by hash with optional block identifier

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `classHash`        | [`BigNumberish`](../modules.md#bignumberish)       | class hash       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class

#### Defined in

[src/provider/interface.ts:544](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L544)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

Estimate the fee for a message from L1

#### Parameters

| Name               | Type                                                            | Description      |
| :----------------- | :-------------------------------------------------------------- | :--------------- |
| `message`          | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC09.API.md#msg_from_l1) | L1 message       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)              | block identifier |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

Fee estimate

#### Defined in

[src/provider/interface.ts:555](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L555)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<`any`\>

Get node synchronization status

#### Returns

`Promise`<`any`\>

Sync status or false if not syncing

#### Defined in

[src/provider/interface.ts:564](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L564)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

Get events matching the given filter

#### Parameters

| Name          | Type                                                                                                                               | Description  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC08.API.md#eventfilter) \| [`EventFilter`](../namespaces/RPC.RPCSPEC09.API.md#eventfilter) | event filter |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

Events and pagination info

#### Defined in

[src/provider/interface.ts:571](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L571)

---

### verifyMessageInStarknet

▸ **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`<`boolean`\>

Verify in Starknet a signature of a TypedData object or of a given hash.

#### Parameters

| Name                                        | Type                                                                                                               | Description                                                               |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `message`                                   | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) \| [`BigNumberish`](../modules.md#bignumberish) | TypedData object to be verified, or message hash to be verified.          |
| `signature`                                 | [`Signature`](../modules.md#signature)                                                                             | signature of the message.                                                 |
| `accountAddress`                            | [`BigNumberish`](../modules.md#bignumberish)                                                                       | address of the account that has signed the message.                       |
| `signatureVerificationFunctionName?`        | `string`                                                                                                           | if account contract with non standard account verification function name. |
| `signatureVerificationResponse?`            | `Object`                                                                                                           | if account contract with non standard response of verification function.  |
| `signatureVerificationResponse.okResponse`  | `string`[]                                                                                                         | -                                                                         |
| `signatureVerificationResponse.nokResponse` | `string`[]                                                                                                         | -                                                                         |
| `signatureVerificationResponse.error`       | `string`[]                                                                                                         | -                                                                         |

#### Returns

`Promise`<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

#### Defined in

[src/provider/interface.ts:593](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L593)

---

### isClassDeclared

▸ **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`<`boolean`\>

Test if class is already declared

#### Parameters

| Name                      | Type                                                               | Description               |
| :------------------------ | :----------------------------------------------------------------- | :------------------------ |
| `contractClassIdentifier` | [`ContractClassIdentifier`](../modules.md#contractclassidentifier) | contract class identifier |
| `blockIdentifier?`        | [`BlockIdentifier`](../modules.md#blockidentifier)                 | block identifier          |

#### Returns

`Promise`<`boolean`\>

true if class is declared

#### Defined in

[src/provider/interface.ts:611](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L611)

---

### prepareInvocations

▸ **prepareInvocations**(`invocations`): `Promise`<[`Invocations`](../modules.md#invocations)\>

Build bulk invocations with auto-detect declared class

#### Parameters

| Name          | Type                                       | Description          |
| :------------ | :----------------------------------------- | :------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations) | array of invocations |

#### Returns

`Promise`<[`Invocations`](../modules.md#invocations)\>

Prepared invocations

#### Defined in

[src/provider/interface.ts:621](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L621)

---

### getL1MessagesStatus

▸ **getL1MessagesStatus**(`transactionHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

Get L1 messages status for a transaction

#### Parameters

| Name              | Type                                         | Description         |
| :---------------- | :------------------------------------------- | :------------------ |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | L1 transaction hash |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

L1 message status

#### Defined in

[src/provider/interface.ts:628](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L628)

---

### getStorageProof

▸ **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

Get Merkle paths in state tries

#### Parameters

| Name                   | Type                                                                                  | Description        |
| :--------------------- | :------------------------------------------------------------------------------------ | :----------------- |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                        | class hashes       |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                        | contract addresses |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC09.API.md#contract_storage_keys)[] | storage keys       |
| `blockIdentifier?`     | [`BlockIdentifier`](../modules.md#blockidentifier)                                    | block identifier   |

#### Returns

`Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

Storage proof

#### Defined in

[src/provider/interface.ts:640](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L640)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

Get compiled CASM contract class

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

Compiled CASM contract class

#### Defined in

[src/provider/interface.ts:652](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L652)

---

### getEstimateTip

▸ **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

Get transaction tip estimation based on network analysis

#### Parameters

| Name               | Type                                                     | Description                      |
| :----------------- | :------------------------------------------------------- | :------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)       | block identifier to analyze from |
| `options?`         | [`TipAnalysisOptions`](../modules.md#tipanalysisoptions) | tip analysis options             |

#### Returns

`Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

Tip estimation with statistics

**`Example`**

```typescript
const tipEstimate = await provider.getEstimateTip('latest', {
  maxBlocks: 10,
  minTxsNecessary: 5,
});
console.log('Recommended tip:', tipEstimate.recommendedTip);
```

#### Defined in

[src/provider/interface.ts:670](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/interface.ts#L670)
