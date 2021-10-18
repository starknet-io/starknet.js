# StarkNet.js Docs

## Table of contents

### Functions

- [addTransaction](../wiki/Home#addtransaction)
- [callContract](../wiki/Home#callcontract)
- [getBlock](../wiki/Home#getblock)
- [getCode](../wiki/Home#getcode)
- [getContractAddresses](../wiki/Home#getcontractaddresses)
- [getStorageAt](../wiki/Home#getstorageat)
- [getTransaction](../wiki/Home#gettransaction)
- [getTransactionStatus](../wiki/Home#gettransactionstatus)

## Functions

### addTransaction

▸ **addTransaction**(`tx`): `Promise`<`object`\>

Invoke a function on the starknet contract

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `object` | transaction to be invoked (WIP) |

#### Returns

`Promise`<`object`\>

a confirmation of invoking a function on the starknet contract

#### Defined in

[index.ts:156](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L156)

___

### callContract

▸ **callContract**(`invokeTx`, `blockId`): `Promise`<`object`\>

Calls a function on the StarkNet contract.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `invokeTx` | `object` | transaction to be invoked (WIP) |
| `blockId` | `number` |  |

#### Returns

`Promise`<`object`\>

the result of the function on the smart contract.

#### Defined in

[index.ts:33](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L33)

___

### getBlock

▸ **getBlock**(`blockId`): `Promise`<`object`\>

Gets the block information from a block ID.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L27-L31)

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockId` | `number` |

#### Returns

`Promise`<`object`\>

the block object { block_id, previous_block_id, state_root, status, timestamp, transaction_receipts, transactions }

#### Defined in

[index.ts:52](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L52)

___

### getCode

▸ **getCode**(`contractAddress`, `blockId`): `Promise`<`object`\>

Gets the code of the deployed contract.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L33-L36)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `blockId` | `number` |

#### Returns

`Promise`<`object`\>

ABI of compiled contract in JSON

#### Defined in

[index.ts:72](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L72)

___

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<`object`\>

Gets the smart contract address on the goerli testnet.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)

#### Returns

`Promise`<`object`\>

starknet smart contract address

#### Defined in

[index.ts:13](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L13)

___

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockId`): `Promise`<`object`\>

Gets the contract's storage variable at a specific key.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L38-L46)

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

[index.ts:93](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L93)

___

### getTransaction

▸ **getTransaction**(`txId`): `Promise`<`object`\>

Gets the transaction information from a tx id.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txId` | `number` |

#### Returns

`Promise`<`object`\>

the transacton object { transaction_id, status, transaction, block_id?, block_number?, transaction_index?, transaction_failure_reason? }

#### Defined in

[index.ts:137](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L137)

___

### getTransactionStatus

▸ **getTransactionStatus**(`txId`): `Promise`<`object`\>

Gets the status of a transaction.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txId` | `number` |

#### Returns

`Promise`<`object`\>

the transaction status object { block_id, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }

#### Defined in

[index.ts:118](https://github.com/seanjameshan/starknet.js/blob/8e7389f/src/index.ts#L118)
