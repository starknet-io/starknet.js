StarkNet.js Docs

# StarkNet.js Docs

## Table of contents

### Functions

- [addTransaction](README.md#addtransaction)
- [callContract](README.md#callcontract)
- [compressProgram](README.md#compressprogram)
- [deployContract](README.md#deploycontract)
- [getBlock](README.md#getblock)
- [getCode](README.md#getcode)
- [getContractAddresses](README.md#getcontractaddresses)
- [getStorageAt](README.md#getstorageat)
- [getTransaction](README.md#gettransaction)
- [getTransactionStatus](README.md#gettransactionstatus)

## Functions

### addTransaction

▸ **addTransaction**(`tx`): `Promise`<`AddTransactionResponse`\>

Invoke a function on the starknet contract

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)

#### Parameters

| Name | Type          | Description                     |
| :--- | :------------ | :------------------------------ |
| `tx` | `Transaction` | transaction to be invoked (WIP) |

#### Returns

`Promise`<`AddTransactionResponse`\>

a confirmation of invoking a function on the starknet contract

---

### callContract

▸ **callContract**(`invokeTx`, `blockId`): `Promise`<`object`\>

Calls a function on the StarkNet contract.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25)

#### Parameters

| Name       | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `invokeTx` | `object` | transaction to be invoked (WIP) |
| `blockId`  | `number` |                                 |

#### Returns

`Promise`<`object`\>

the result of the function on the smart contract.

---

### compressProgram

▸ **compressProgram**(`jsonProgram`): `CompressedProgram`

Function to compress compiled cairo program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                 | Description                                       |
| :------------ | :------------------- | :------------------------------------------------ |
| `jsonProgram` | `string` \| `object` | json file representing the compiled cairo program |

#### Returns

`CompressedProgram`

Compressed cairo program

---

### deployContract

▸ **deployContract**(`contract`, `address?`): `Promise`<`AddTransactionResponse`\>

Deploys a given compiled contract (json) to starknet

#### Parameters

| Name       | Type                           | Description                                                                                        |
| :--------- | :----------------------------- | :------------------------------------------------------------------------------------------------- |
| `contract` | `string` \| `CompiledContract` | a json object containing the compiled contract                                                     |
| `address`  | `string`                       | (optional, defaults to a random address) the address where the contract should be deployed (alpha) |

#### Returns

`Promise`<`AddTransactionResponse`\>

a confirmation of sending a transaction on the starknet contract

---

### getBlock

▸ **getBlock**(`blockId`): `Promise`<`GetBlockResponse`\>

Gets the block information from a block ID.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L27-L31)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `blockId` | `number` |

#### Returns

`Promise`<`GetBlockResponse`\>

the block object { block_id, previous_block_id, state_root, status, timestamp, transaction_receipts, transactions }

---

### getCode

▸ **getCode**(`contractAddress`, `blockId`): `Promise`<`GetCode`\>

Gets the code of the deployed contract.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L33-L36)

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `contractAddress` | `string` |
| `blockId`         | `number` |

#### Returns

`Promise`<`GetCode`\>

Bytecode and ABI of compiled contract

---

### getContractAddresses

▸ **getContractAddresses**(): `Promise`<`GetContractAddressesResponse`\>

Gets the smart contract address on the goerli testnet.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)

#### Returns

`Promise`<`GetContractAddressesResponse`\>

starknet smart contract addresses

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockId`): `Promise`<`object`\>

Gets the contract's storage variable at a specific key.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L38-L46)

#### Parameters

| Name              | Type     | Description                                                |
| :---------------- | :------- | :--------------------------------------------------------- |
| `contractAddress` | `string` |                                                            |
| `key`             | `number` | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockId`         | `number` |                                                            |

#### Returns

`Promise`<`object`\>

the value of the storage variable

---

### getTransaction

▸ **getTransaction**(`txId`): `Promise`<`GetTransactionResponse`\>

Gets the transaction information from a tx id.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `txId` | `number` |

#### Returns

`Promise`<`GetTransactionResponse`\>

the transacton object { transaction_id, status, transaction, block_id?, block_number?, transaction_index?, transaction_failure_reason? }

---

### getTransactionStatus

▸ **getTransactionStatus**(`txId`): `Promise`<`GetTransactionStatusResponse`\>

Gets the status of a transaction.

[Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `txId` | `number` |

#### Returns

`Promise`<`GetTransactionStatusResponse`\>

the transaction status object { block_id, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
