# Abstract Class: ProviderInterface

Defined in: [src/provider/interface.ts:46](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L46)

## Constructors

### Constructor

> **new ProviderInterface**(): `ProviderInterface`

#### Returns

`ProviderInterface`

## Properties

### channel

> `abstract` **channel**: [`RpcChannel`](../Starknet.js-API/namespaces/RPC09/classes/RpcChannel.md) \| [`RpcChannel`](../Starknet.js-API/namespaces/RPC0102/classes/RpcChannel.md) \| [`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md) \| [`RpcChannel`](RpcChannel.md)

Defined in: [src/provider/interface.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L47)

---

### responseParser

> `abstract` **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

Defined in: [src/provider/interface.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L53)

## Methods

### getChainId()

> `abstract` **getChainId**(): `Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Defined in: [src/provider/interface.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L60)

Gets the Starknet chain Id

#### Returns

`Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

---

### callContract()

> `abstract` **callContract**(`call`, `blockIdentifier?`): `Promise`\<[`CallContractResponse`](../type-aliases/CallContractResponse.md)\>

Defined in: [src/provider/interface.ts:69](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L69)

Calls a function on the Starknet contract.

#### Parameters

##### call

[`Call`](../type-aliases/Call.md)

transaction to be called

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`CallContractResponse`](../type-aliases/CallContractResponse.md)\>

the result of the function on the smart contract.

---

### getBlock()

#### Call Signature

> `abstract` **getBlock**(): `Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

Defined in: [src/provider/interface.ts:118](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L118)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](#getblockwithreceipts).

##### Returns

`Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

the block header together with the list of its transaction hashes

##### Example

```typescript
const block = await provider.getBlock('latest');
// {
//   status: 'ACCEPTED_ON_L2',
//   block_hash: '0x3a1b...',
//   block_number: 123456,
//   parent_hash: '0x28f5...',
//   timestamp: 1700000000,
//   sequencer_address: '0x1176a1...',
//   transactions: ['0x1d2c...', '0x5e8f...'],  // transaction hashes only
//   ...
// }

// By block number or hash:
await provider.getBlock(123456);
await provider.getBlock('0x3a1b...');

// Block still being built (fields differ from a closed block):
const pending = await provider.getBlock('pre_confirmed');
```

#### Call Signature

> `abstract` **getBlock**(`blockIdentifier`): `Promise`\<\{ `transactions`: `string`[]; `block_number`: `number`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; \}\>

Defined in: [src/provider/interface.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L119)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](#getblockwithreceipts).

##### Parameters

###### blockIdentifier

`"pre_confirmed"`

which block to fetch. Accepts:

- a block number: `number` or decimal `string` (e.g. `123456`)
- a block hash: hex `string` or `bigint` (e.g. `'0x3a1b...'`)
- a block tag `string`:
  - `'latest'` — the most recent block already accepted on L2
  - `'pre_confirmed'` — the block currently being built, not yet closed (its fields differ:
    no `block_hash`/`status`, hence the dedicated [PreConfirmedBlock](../type-aliases/PreConfirmedBlock.md) return type)
- `null` — resolved as the `'latest'` tag

When omitted, the provider's default block identifier is used (`'latest'`).

##### Returns

`Promise`\<\{ `transactions`: `string`[]; `block_number`: `number`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; \}\>

the block header together with the list of its transaction hashes

##### Example

```typescript
const block = await provider.getBlock('latest');
// {
//   status: 'ACCEPTED_ON_L2',
//   block_hash: '0x3a1b...',
//   block_number: 123456,
//   parent_hash: '0x28f5...',
//   timestamp: 1700000000,
//   sequencer_address: '0x1176a1...',
//   transactions: ['0x1d2c...', '0x5e8f...'],  // transaction hashes only
//   ...
// }

// By block number or hash:
await provider.getBlock(123456);
await provider.getBlock('0x3a1b...');

// Block still being built (fields differ from a closed block):
const pending = await provider.getBlock('pre_confirmed');
```

#### Call Signature

> `abstract` **getBlock**(`blockIdentifier`): `Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

Defined in: [src/provider/interface.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L120)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](#getblockwithreceipts).

##### Parameters

###### blockIdentifier

`"latest"`

which block to fetch. Accepts:

- a block number: `number` or decimal `string` (e.g. `123456`)
- a block hash: hex `string` or `bigint` (e.g. `'0x3a1b...'`)
- a block tag `string`:
  - `'latest'` — the most recent block already accepted on L2
  - `'pre_confirmed'` — the block currently being built, not yet closed (its fields differ:
    no `block_hash`/`status`, hence the dedicated [PreConfirmedBlock](../type-aliases/PreConfirmedBlock.md) return type)
- `null` — resolved as the `'latest'` tag

When omitted, the provider's default block identifier is used (`'latest'`).

##### Returns

`Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

the block header together with the list of its transaction hashes

##### Example

```typescript
const block = await provider.getBlock('latest');
// {
//   status: 'ACCEPTED_ON_L2',
//   block_hash: '0x3a1b...',
//   block_number: 123456,
//   parent_hash: '0x28f5...',
//   timestamp: 1700000000,
//   sequencer_address: '0x1176a1...',
//   transactions: ['0x1d2c...', '0x5e8f...'],  // transaction hashes only
//   ...
// }

// By block number or hash:
await provider.getBlock(123456);
await provider.getBlock('0x3a1b...');

// Block still being built (fields differ from a closed block):
const pending = await provider.getBlock('pre_confirmed');
```

#### Call Signature

> `abstract` **getBlock**(`blockIdentifier`): `Promise`\<[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)\>

Defined in: [src/provider/interface.ts:121](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L121)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](#getblockwithreceipts).

##### Parameters

###### blockIdentifier

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

which block to fetch. Accepts:

- a block number: `number` or decimal `string` (e.g. `123456`)
- a block hash: hex `string` or `bigint` (e.g. `'0x3a1b...'`)
- a block tag `string`:
  - `'latest'` — the most recent block already accepted on L2
  - `'pre_confirmed'` — the block currently being built, not yet closed (its fields differ:
    no `block_hash`/`status`, hence the dedicated [PreConfirmedBlock](../type-aliases/PreConfirmedBlock.md) return type)
- `null` — resolved as the `'latest'` tag

When omitted, the provider's default block identifier is used (`'latest'`).

##### Returns

`Promise`\<[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)\>

the block header together with the list of its transaction hashes

##### Example

```typescript
const block = await provider.getBlock('latest');
// {
//   status: 'ACCEPTED_ON_L2',
//   block_hash: '0x3a1b...',
//   block_number: 123456,
//   parent_hash: '0x28f5...',
//   timestamp: 1700000000,
//   sequencer_address: '0x1176a1...',
//   transactions: ['0x1d2c...', '0x5e8f...'],  // transaction hashes only
//   ...
// }

// By block number or hash:
await provider.getBlock(123456);
await provider.getBlock('0x3a1b...');

// Block still being built (fields differ from a closed block):
const pending = await provider.getBlock('pre_confirmed');
```

---

### getClassAt()

> `abstract` **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Defined in: [src/provider/interface.ts:130](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L130)

Gets the contract class of the deployed contract.

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

contract address

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Contract class of compiled contract

---

### getL1GasPrice()

> `abstract` **getL1GasPrice**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:141](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L141)

Gets the price of l1 gas in the block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`string`\>

gas price of the block

---

### getL1MessageHash()

> `abstract` **getL1MessageHash**(`l2TxHash`): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:154](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L154)

Get L1 message hash from L2 transaction hash

#### Parameters

##### l2TxHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

L2 transaction hash

#### Returns

`Promise`\<`string`\>

Hex string of L1 message hash

#### Example

In Sepolia Testnet :

```typescript
const result = provider.getL1MessageHash(
  '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819'
);
// result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
```

---

### getClassHashAt()

> `abstract` **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:163](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L163)

Returns the contract class hash in the given block for the contract deployed at the given address

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

contract address

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`string`\>

Class hash

---

### getClassByHash()

> `abstract` **getClassByHash**(`classHash`): `Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Defined in: [src/provider/interface.ts:174](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L174)

Returns the contract class deployed under the given class hash.

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

class hash

#### Returns

`Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Contract class of compiled contract

---

### getNonceForAddress()

> `abstract` **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:182](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L182)

Returns the nonce associated with the given address in the given block

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

contract address

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

#### Returns

`Promise`\<`string`\>

the hex nonce

---

### getStorageAt()

> `abstract` **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`, `responseFlags?`): `Promise`\<[`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)\>

Defined in: [src/provider/interface.ts:195](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L195)

Get the value of the storage (contract's variable) at the given address and key

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### key

[`BigNumberish`](../type-aliases/BigNumberish.md)

from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### responseFlags?

`"INCLUDE_LAST_UPDATE_BLOCK"`[]

#### Returns

`Promise`\<[`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)\>

the value of the storage variable

---

### getTransaction()

> `abstract` **getTransaction**(`transactionHash`, `options?`): `Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

Defined in: [src/provider/interface.ts:210](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L210)

Gets the transaction information from a tx id.

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

---

### getTransactionReceipt()

> `abstract` **getTransactionReceipt**(`transactionHash`): `Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

Defined in: [src/provider/interface.ts:221](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L221)

Gets the transaction receipt from a tx hash.

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

the transaction receipt object

---

### deployAccountContract()

> `abstract` **deployAccountContract**(`payload`, `details`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/provider/interface.ts:234](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L234)

Deploys a given compiled Account contract (json) to starknet

#### Parameters

##### payload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

payload to be deployed containing:

- compiled contract code
- constructor calldata
- address salt

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

---

### invokeFunction()

> `abstract` **invokeFunction**(`invocation`, `details`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/provider/interface.ts:253](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L253)

Invokes a function on starknet

#### Parameters

##### invocation

[`Invocation`](../type-aliases/Invocation.md)

the invocation object containing:

- contractAddress - the address of the contract
- entrypoint - (optional) the entrypoint of the contract
- calldata - (optional, defaults to []) the calldata
- signature - (optional, defaults to []) the signature

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

optional details containing:

- nonce - optional nonce
- version - optional version
- maxFee - optional maxFee

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

response from addTransaction

---

### declareContract()

> `abstract` **declareContract**(`transaction`, `details`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/provider/interface.ts:270](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L270)

Declares a given compiled contract (json) to starknet

#### Parameters

##### transaction

[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)

transaction payload to be deployed containing:

- compiled contract code
- sender address
- signature

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

Invocation Details containing:

- nonce
- optional version
- optional maxFee

#### Returns

`Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

a confirmation of sending a transaction on the starknet contract

---

### ~~getInvokeEstimateFee()~~

> `abstract` **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/interface.ts:298](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L298)

Estimates the fee for a given INVOKE transaction

#### Parameters

##### invocation

[`Invocation`](../type-aliases/Invocation.md)

the invocation object containing:

- contractAddress - the address of the contract
- entrypoint - (optional) the entrypoint of the contract
- calldata - (optional, defaults to []) the calldata
- signature - (optional, defaults to []) the signature

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

optional details containing:

- nonce - optional nonce
- version - optional version

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

(optional) block identifier

##### skipValidate?

`boolean`

(optional) skip cairo **validate** method

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

the estimated fee

#### Deprecated

Consider using getEstimateFeeBulk for multiple transactions

#### Example

```typescript
const feeEstimate = await provider.getInvokeEstimateFee(invocation, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.INVOKE, ...invocation, ...details }],
  options
);
```

#### Remarks

This method is an alias that calls getEstimateFeeBulk with a single transaction

---

### ~~getDeclareEstimateFee()~~

> `abstract` **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/interface.ts:328](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L328)

Estimates the fee for a given DECLARE transaction

#### Parameters

##### transaction

[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)

transaction payload to be declared containing:

- compiled contract code
- sender address
- signature - (defaults to []) the signature

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

optional details containing:

- nonce
- version - optional version
- optional maxFee

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

(optional) block identifier

##### skipValidate?

`boolean`

(optional) skip cairo **validate** method

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

the estimated fee

#### Deprecated

Consider using getEstimateFeeBulk for multiple transactions

#### Example

```typescript
const feeEstimate = await provider.getDeclareEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DECLARE, ...transaction, ...details }],
  options
);
```

#### Remarks

This method is an alias that calls getEstimateFeeBulk with a single transaction

---

### ~~getDeployAccountEstimateFee()~~

> `abstract` **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/interface.ts:359](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L359)

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

##### transaction

[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)

transaction payload to be deployed containing:

- classHash
- constructorCalldata
- addressSalt
- signature - (defaults to []) the signature

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

optional details containing:

- nonce
- version - optional version
- optional maxFee

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

(optional) block identifier

##### skipValidate?

`boolean`

(optional) skip cairo **validate** method

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

the estimated fee

#### Deprecated

Consider using getEstimateFeeBulk for multiple transactions

#### Example

```typescript
const feeEstimate = await provider.getDeployAccountEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DEPLOY_ACCOUNT, ...transaction, ...details }],
  options
);
```

#### Remarks

This method is an alias that calls getEstimateFeeBulk with a single transaction

---

### getEstimateFeeBulk()

> `abstract` **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`\<[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)\>

Defined in: [src/provider/interface.ts:374](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L374)

Estimates the fee for a list of INVOKE transaction

#### Parameters

##### invocations

[`AccountInvocations`](../type-aliases/AccountInvocations.md)

AccountInvocations - Complete invocations array with account details

##### options?

[`getEstimateFeeBulkOptions`](../type-aliases/getEstimateFeeBulkOptions.md)

getEstimateFeeBulkOptions

- (optional) blockIdentifier - BlockIdentifier

#### Returns

`Promise`\<[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)\>

the estimated fee

---

### waitForTransaction()

> `abstract` **waitForTransaction**(`txHash`, `options?`): `Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

Defined in: [src/provider/interface.ts:387](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L387)

Wait for the transaction to be accepted

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

##### options?

[`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md)

waitForTransactionOptions

- (optional) retryInterval: number | undefined;
- (optional) successStates: TransactionStatus[] | undefined;

#### Returns

`Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

GetTransactionReceiptResponse

---

### getSimulateTransaction()

> `abstract` **getSimulateTransaction**(`invocations`, `options?`): `Promise`\<[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)\>

Defined in: [src/provider/interface.ts:403](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L403)

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

##### invocations

[`AccountInvocations`](../type-aliases/AccountInvocations.md)

AccountInvocations - Complete invocations array with account details

##### options?

[`getSimulateTransactionOptions`](../type-aliases/getSimulateTransactionOptions.md)

getSimulateTransactionOptions

- (optional) blockIdentifier - block identifier
- (optional) skipValidate - skip cairo **validate** method
- (optional) skipExecute - skip cairo **execute** method
- (optional) returnInitialReads - include initial storage reads in the trace response (RPC 0.10.1+)

#### Returns

`Promise`\<[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)\>

an array of transaction trace and estimated fee

---

### getStateUpdate()

> `abstract` **getStateUpdate**(`blockIdentifier?`, `contractAddresses?`): `Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

Defined in: [src/provider/interface.ts:414](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L414)

Gets the state changes in a specific block (result of executing the requested block)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### contractAddresses?

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

#### Returns

`Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

StateUpdateResponse

---

### getBlockStateUpdate()

#### Call Signature

> `abstract` **getBlockStateUpdate**(): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

Defined in: [src/provider/interface.ts:425](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L425)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

StateUpdateResponse

#### Call Signature

> `abstract` **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

Defined in: [src/provider/interface.ts:426](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L426)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier

`"pre_confirmed"`

##### Returns

`Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

StateUpdateResponse

#### Call Signature

> `abstract` **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

Defined in: [src/provider/interface.ts:429](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L429)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier

`"latest"`

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

StateUpdateResponse

#### Call Signature

> `abstract` **getBlockStateUpdate**(`blockIdentifier?`): `Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

Defined in: [src/provider/interface.ts:430](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L430)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

##### Returns

`Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

StateUpdateResponse

---

### getContractVersion()

#### Call Signature

> `abstract` **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/provider/interface.ts:442](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L442)

Gets the contract version from the provided address

##### Parameters

###### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

string

###### classHash?

`undefined`

undefined

###### options?

[`getContractVersionOptions`](../type-aliases/getContractVersionOptions.md)

getContractVersionOptions

- (optional) compiler - (default true) extract compiler version using type tactic from abi
- (optional) blockIdentifier - block identifier

##### Returns

`Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

#### Call Signature

> `abstract` **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/provider/interface.ts:456](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L456)

Gets the contract version from the provided address

##### Parameters

###### contractAddress

`undefined`

undefined

###### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

###### options?

[`getContractVersionOptions`](../type-aliases/getContractVersionOptions.md)

getContractVersionOptions

- (optional) compiler - (default true) extract compiler version using type tactic from abi
- (optional) blockIdentifier - block identifier

##### Returns

`Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

---

### getBlockLatestAccepted()

> `abstract` **getBlockLatestAccepted**(): `Promise`\<\{ `block_hash`: `string`; `block_number`: `number`; \}\>

Defined in: [src/provider/interface.ts:467](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L467)

Get the most recent accepted block hash and number

#### Returns

`Promise`\<\{ `block_hash`: `string`; `block_number`: `number`; \}\>

Object containing block hash and number

---

### getBlockNumber()

> `abstract` **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [src/provider/interface.ts:473](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L473)

Get the most recent accepted block number

#### Returns

`Promise`\<`number`\>

Number of the latest block

---

### getBlockWithTxHashes()

> `abstract` **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:480](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L480)

Get block information with transaction hashes

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`any`\>

Block with transaction hashes

---

### getBlockWithTxs()

> `abstract` **getBlockWithTxs**(`blockIdentifier?`, `options?`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:489](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L489)

Get block information with full transactions

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`any`\>

Block with full transactions

---

### getBlockWithReceipts()

> `abstract` **getBlockWithReceipts**(`blockIdentifier?`, `options?`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:501](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L501)

Get block information with transaction receipts

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`any`\>

Block with transaction receipts

---

### getBlockTransactionsTraces()

> `abstract` **getBlockTransactionsTraces**(`blockIdentifier?`, `options?`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:513](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L513)

Get transaction traces for all transactions in a block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### options?

(optional) additional request options

- returnInitialReads - include initial storage reads in the trace response (RPC 0.10.1+)

###### returnInitialReads?

`boolean`

#### Returns

`Promise`\<`any`\>

Array of transaction traces

---

### getBlockTransactionCount()

> `abstract` **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

Defined in: [src/provider/interface.ts:523](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L523)

Get the number of transactions in a block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`number`\>

Transaction count

---

### waitForBlock()

> `abstract` **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`\<`void`\>

Defined in: [src/provider/interface.ts:535](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L535)

Pause execution until a specified block is created

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block number or tag

##### retryInterval?

`number`

milliseconds between requests (default: 5000)

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await provider.waitForBlock(12345);
await provider.waitForBlock('latest');
```

---

### getTransactionByHash()

> `abstract` **getTransactionByHash**(`txHash`, `options?`): `Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

Defined in: [src/provider/interface.ts:548](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L548)

Gets the transaction information from a tx hash (alias for getTransaction)

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

Transaction information

---

### getTransactionByBlockIdAndIndex()

> `abstract` **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`, `options?`): `Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

Defined in: [src/provider/interface.ts:561](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L561)

Gets transaction by block identifier and index

#### Parameters

##### blockIdentifier

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### index

`number`

transaction index in the block

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<[`TransactionWithHash`](../type-aliases/TransactionWithHash.md)\>

Transaction information

---

### getTransactionTrace()

> `abstract` **getTransactionTrace**(`txHash`): `Promise`\<[`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md) \| [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md)\>

Defined in: [src/provider/interface.ts:572](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L572)

Gets the transaction trace

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

#### Returns

`Promise`\<[`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md) \| [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md)\>

Transaction trace

---

### getTransactionStatus()

> `abstract` **getTransactionStatus**(`transactionHash`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:581](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L581)

Get the status of a transaction

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

#### Returns

`Promise`\<`any`\>

Transaction status

---

### fetch()

> `abstract` **fetch**(`method`, `params?`, `id?`): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:591](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L591)

Direct RPC method call

#### Parameters

##### method

`string`

RPC method name

##### params?

`object`

method parameters

##### id?

`string` \| `number`

request ID

#### Returns

`Promise`\<`any`\>

RPC response

---

### readSpecVersion()

> `abstract` **readSpecVersion**(): `string` \| `undefined`

Defined in: [src/provider/interface.ts:597](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L597)

Read channel spec version

#### Returns

`string` \| `undefined`

Spec version string or undefined if not set

---

### getSpecVersion()

> `abstract` **getSpecVersion**(): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:603](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L603)

Get channel spec version

#### Returns

`Promise`\<`string`\>

Promise resolving to spec version

---

### setUpSpecVersion()

> `abstract` **setUpSpecVersion**(): `Promise`\<`string`\>

Defined in: [src/provider/interface.ts:609](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L609)

Setup channel spec version and return it

#### Returns

`Promise`\<`string`\>

Promise resolving to spec version

---

### getClass()

> `abstract` **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Defined in: [src/provider/interface.ts:618](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L618)

Get contract class by hash with optional block identifier

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

class hash

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`ContractClassResponse`](../type-aliases/ContractClassResponse.md)\>

Contract class

---

### estimateMessageFee()

> `abstract` **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<[`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md) \| [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md)\>

Defined in: [src/provider/interface.ts:629](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L629)

Estimate the fee for a message from L1

#### Parameters

##### message

[`MSG_FROM_L1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MSG_FROM_L1.md)

L1 message

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md) \| [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md)\>

Fee estimate

---

### getSyncingStats()

> `abstract` **getSyncingStats**(): `Promise`\<`any`\>

Defined in: [src/provider/interface.ts:638](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L638)

Get node synchronization status

#### Returns

`Promise`\<`any`\>

Sync status or false if not syncing

---

### getEvents()

> `abstract` **getEvents**(`eventFilter`): `Promise`\<[`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md) \| [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md)\>

Defined in: [src/provider/interface.ts:645](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L645)

Get events matching the given filter

#### Parameters

##### eventFilter

[`EventFilter`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EventFilter.md) \| [`EventFilter`](../Starknet.js-API/namespaces/RPC/type-aliases/EventFilter.md)

event filter

#### Returns

`Promise`\<[`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md) \| [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md)\>

Events and pagination info

---

### verifyMessageInStarknet()

> `abstract` **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`\<`boolean`\>

Defined in: [src/provider/interface.ts:667](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L667)

Verify in Starknet a signature of a TypedData object or of a given hash.

#### Parameters

##### message

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md) \| [`BigNumberish`](../type-aliases/BigNumberish.md)

TypedData object to be verified, or message hash to be verified.

##### signature

[`Signature`](../type-aliases/Signature.md)

signature of the message.

##### accountAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

address of the account that has signed the message.

##### signatureVerificationFunctionName?

`string`

if account contract with non standard account verification function name.

##### signatureVerificationResponse?

if account contract with non standard response of verification function.

###### okResponse

`string`[]

###### nokResponse

`string`[]

###### error

`string`[]

#### Returns

`Promise`\<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

---

### isClassDeclared()

> `abstract` **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`\<`boolean`\>

Defined in: [src/provider/interface.ts:685](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L685)

Test if class is already declared

#### Parameters

##### contractClassIdentifier

[`ContractClassIdentifier`](../type-aliases/ContractClassIdentifier.md)

contract class identifier

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`boolean`\>

true if class is declared

---

### prepareInvocations()

> `abstract` **prepareInvocations**(`invocations`): `Promise`\<[`Invocations`](../type-aliases/Invocations.md)\>

Defined in: [src/provider/interface.ts:695](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L695)

Build bulk invocations with auto-detect declared class

#### Parameters

##### invocations

[`Invocations`](../type-aliases/Invocations.md)

array of invocations

#### Returns

`Promise`\<[`Invocations`](../type-aliases/Invocations.md)\>

Prepared invocations

---

### getL1MessagesStatus()

> `abstract` **getL1MessagesStatus**(`transactionHash`): `Promise`\<[`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md) \| [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md)\>

Defined in: [src/provider/interface.ts:702](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L702)

Get L1 messages status for a transaction

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

L1 transaction hash

#### Returns

`Promise`\<[`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md) \| [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md)\>

L1 message status

---

### getStorageProof()

> `abstract` **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`\<[`StorageProof`](../Starknet.js-API/namespaces/RPC/type-aliases/StorageProof.md)\>

Defined in: [src/provider/interface.ts:714](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L714)

Get Merkle paths in state tries

#### Parameters

##### classHashes

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

class hashes

##### contractAddresses

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

contract addresses

##### contractsStorageKeys

[`CONTRACT_STORAGE_KEYS`](../Starknet.js-API/namespaces/RPC/type-aliases/CONTRACT_STORAGE_KEYS.md)[]

storage keys

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`StorageProof`](../Starknet.js-API/namespaces/RPC/type-aliases/StorageProof.md)\>

Storage proof

---

### getCompiledCasm()

> `abstract` **getCompiledCasm**(`classHash`): `Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../Starknet.js-API/namespaces/RPC/type-aliases/CASM_COMPILED_CONTRACT_CLASS.md)\>

Defined in: [src/provider/interface.ts:726](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L726)

Get compiled CASM contract class

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

class hash

#### Returns

`Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../Starknet.js-API/namespaces/RPC/type-aliases/CASM_COMPILED_CONTRACT_CLASS.md)\>

Compiled CASM contract class

---

### getEstimateTip()

> `abstract` **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`\<[`TipEstimate`](../type-aliases/TipEstimate.md)\>

Defined in: [src/provider/interface.ts:744](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/interface.ts#L744)

Get transaction tip estimation based on network analysis

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier to analyze from

##### options?

[`TipAnalysisOptions`](../type-aliases/TipAnalysisOptions.md)

tip analysis options

#### Returns

`Promise`\<[`TipEstimate`](../type-aliases/TipEstimate.md)\>

Tip estimation with statistics

#### Example

```typescript
const tipEstimate = await provider.getEstimateTip('latest', {
  maxBlocks: 10,
  minTxsNecessary: 5,
});
console.log('Recommended tip:', tipEstimate.recommendedTip);
```
