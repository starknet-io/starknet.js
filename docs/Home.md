# StarkNet.js Docs

## Table of contents

### Properties

- [default](../wiki/Home#default)

### Functions

- [addTransaction](../wiki/Home#addtransaction)
- [callContract](../wiki/Home#callcontract)
- [getBlock](../wiki/Home#getblock)
- [getCode](../wiki/Home#getcode)
- [getContractAddresses](../wiki/Home#getcontractaddresses)
- [getStorageAt](../wiki/Home#getstorageat)
- [getTransaction](../wiki/Home#gettransaction)
- [getTransactionStatus](../wiki/Home#gettransactionstatus)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addTransaction` | (`tx`: `object`) => `Promise`<`object`\> |
| `callContract` | (`invokeTx`: `object`, `blockId`: `number`) => `Promise`<`object`\> |
| `getBlock` | (`blockId`: `number`) => `Promise`<`object`\> |
| `getCode` | (`contractAddress`: `string`, `blockId`: `number`) => `Promise`<`object`\> |
| `getContractAddresses` | () => `Promise`<`object`\> |
| `getStorageAt` | (`contractAddress`: `string`, `key`: `number`, `blockId`: `number`) => `Promise`<`object`\> |
| `getTransaction` | (`txId`: `number`) => `Promise`<`object`\> |
| `getTransactionStatus` | (`txId`: `number`) => `Promise`<`object`\> |

## Functions

### addTransaction

▸ **addTransaction**(`tx`): `Promise`<`object`\>

Invoke a function on the starknet contract
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `object` | transaction to be invoked (WIP) |

#### Returns

`Promise`<`object`\>

a confirmation of invoking a function on the starknet contract

#### Defined in

[index.ts:141](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L141)

___

### callContract

▸ **callContract**(`invokeTx`, `blockId`): `Promise`<`object`\>

Calls a function on the StarkNet contract.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `invokeTx` | `object` | transaction to be invoked (WIP) |
| `blockId` | `number` |  |

#### Returns

`Promise`<`object`\>

the result of the function on the smart contract.

#### Defined in

[index.ts:30](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L30)

___

### getBlock

▸ **getBlock**(`blockId`): `Promise`<`object`\>

Gets the block information from a block ID.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L27-L31

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `number` |

#### Returns

`Promise`<`object`\>

the block object { block_id, previous_block_id, state_root, status, timestamp, transaction_receipts, transactions }

#### Defined in

[index.ts:47](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L47)

___

### getCode

▸ **getCode**(`contractAddress`, `blockId`): `Promise`<`object`\>

Gets the code of the deployed contract.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L33-L36

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `blockId` | `number` |

#### Returns

`Promise`<`object`\>

ABI of compiled contract in JSON

#### Defined in

[index.ts:65](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L65)

___

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<`object`\>

Gets the smart contract address on the goerli testnet.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15

#### Returns

`Promise`<`object`\>

starknet smart contract address

#### Defined in

[index.ts:12](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L12)

___

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockId`): `Promise`<`object`\>

Gets the contract's storage variable at a specific key.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L38-L46

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` |  |
| `key` | `number` | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockId` | `number` |  |

#### Returns

`Promise`<`object`\>

the value of the storage variable

#### Defined in

[index.ts:84](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L84)

___

### getTransaction

▸ **getTransaction**(`txId`): `Promise`<`object`\>

Gets the transaction information from a tx id.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58

#### Parameters

| Name | Type |
| :------ | :------ |
| `txId` | `number` |

#### Returns

`Promise`<`object`\>

the transacton object { transaction_id, status, transaction, block_id?, block_number?, transaction_index?, transaction_failure_reason? }

#### Defined in

[index.ts:124](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L124)

___

### getTransactionStatus

▸ **getTransactionStatus**(`txId`): `Promise`<`object`\>

Gets the status of a transaction.
https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52

#### Parameters

| Name | Type |
| :------ | :------ |
| `txId` | `number` |

#### Returns

`Promise`<`object`\>

the transaction status object { block_id, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }

#### Defined in

[index.ts:107](https://github.com/seanjameshan/starknet.js/blob/898c23a/src/index.ts#L107)
