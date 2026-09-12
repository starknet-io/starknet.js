# Class: RpcChannel

Defined in: [src/channel/rpc_0_9_0.ts:54](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L54)

## Constructors

### Constructor

> **new RpcChannel**(`optionsOrProvider?`): `RpcChannel`

Defined in: [src/channel/rpc_0_9_0.ts:87](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L87)

#### Parameters

##### optionsOrProvider?

[`RpcProviderOptions`](../../../../type-aliases/RpcProviderOptions.md)

#### Returns

`RpcChannel`

## Properties

### id

> `readonly` **id**: `"RPC090"` = `'RPC090'`

Defined in: [src/channel/rpc_0_9_0.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L55)

---

### channelSpecVersion

> `readonly` **channelSpecVersion**: `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `SupportedRpcVersion.v0_9_0`

Defined in: [src/channel/rpc_0_9_0.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L60)

RPC specification version this Channel class implements

---

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/channel/rpc_0_9_0.ts:62](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L62)

---

### headers

> **headers**: `object`

Defined in: [src/channel/rpc_0_9_0.ts:64](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L64)

---

### requestId

> **requestId**: `number`

Defined in: [src/channel/rpc_0_9_0.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L66)

---

### blockIdentifier

> `readonly` **blockIdentifier**: [`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

Defined in: [src/channel/rpc_0_9_0.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L68)

---

### retries

> `readonly` **retries**: `number`

Defined in: [src/channel/rpc_0_9_0.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L70)

---

### waitMode

> `readonly` **waitMode**: `boolean`

Defined in: [src/channel/rpc_0_9_0.ts:72](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L72)

## Methods

### readSpecVersion()

> **readSpecVersion**(): `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

Defined in: [src/channel/rpc_0_9_0.ts:138](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L138)

#### Returns

`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

---

### setChainId()

> **setChainId**(`chainId`): `void`

Defined in: [src/channel/rpc_0_9_0.ts:146](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L146)

#### Parameters

##### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Returns

`void`

---

### fetch()

> **fetch**(`method`, `params?`, `id?`): `Promise`\<`Response`\>

Defined in: [src/channel/rpc_0_9_0.ts:150](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L150)

#### Parameters

##### method

`string`

##### params?

`object`

##### id?

`string` \| `number`

#### Returns

`Promise`\<`Response`\>

---

### errorHandler()

> `protected` **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

Defined in: [src/channel/rpc_0_9_0.ts:164](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L164)

#### Parameters

##### method

`string`

##### params

`any`

##### rpcError?

[`Error`](../../RPC/namespaces/JRPC/type-aliases/Error.md)

##### otherError?

`any`

#### Returns

`void`

---

### fetchEndpoint()

> `protected` **fetchEndpoint**\<`T`\>(`method`, `params?`): `Promise`\<[`Methods`](../../RPC/namespaces/RPCSPEC09/type-aliases/Methods.md)\[`T`\]\[`"result"`\]\>

Defined in: [src/channel/rpc_0_9_0.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L176)

#### Type Parameters

##### T

`T` _extends_ keyof ReadMethods \| keyof WriteMethods \| keyof TraceMethods

#### Parameters

##### method

`T`

##### params?

[`Methods`](../../RPC/namespaces/RPCSPEC09/type-aliases/Methods.md)\[`T`\]\[`"params"`\]

#### Returns

`Promise`\<[`Methods`](../../RPC/namespaces/RPCSPEC09/type-aliases/Methods.md)\[`T`\]\[`"result"`\]\>

---

### getChainId()

> **getChainId**(): `Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Defined in: [src/channel/rpc_0_9_0.ts:204](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L204)

#### Returns

`Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

---

### getSpecVersion()

> **getSpecVersion**(): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_9_0.ts:213](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L213)

fetch rpc node specVersion

#### Returns

`Promise`\<`string`\>

#### Example

```ts
this.specVersion = '0.9.0';
```

---

### setUpSpecVersion()

> **setUpSpecVersion**(): `Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

Defined in: [src/channel/rpc_0_9_0.ts:221](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L221)

fetch if undefined else just return this.specVersion

#### Returns

`Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

#### Example

```ts
this.specVersion = '0.9.0';
```

---

### getMessagesStatus()

> **getMessagesStatus**(`txHash`): `Promise`\<[`L1L2MessagesStatus`](../../RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:250](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L250)

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

##### txHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`L1L2MessagesStatus`](../../RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md)\>

---

### getStorageProof()

> **getStorageProof**(`classHashes?`, `contractAddresses?`, `contractsStorageKeys?`, `blockIdentifier?`): `Promise`\<[`StorageProof`](../../RPC/namespaces/RPCSPEC09/type-aliases/StorageProof.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:258](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L258)

#### Parameters

##### classHashes?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `[]`

##### contractAddresses?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[] = `[]`

##### contractsStorageKeys?

[`CONTRACT_STORAGE_KEYS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_STORAGE_KEYS.md)[] = `[]`

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<[`StorageProof`](../../RPC/namespaces/RPCSPEC09/type-aliases/StorageProof.md)\>

---

### getCompiledCasm()

> **getCompiledCasm**(`classHash`): `Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CASM_COMPILED_CONTRACT_CLASS.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:277](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L277)

#### Parameters

##### classHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CASM_COMPILED_CONTRACT_CLASS.md)\>

---

### getNonceForAddress()

> **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_9_0.ts:285](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L285)

#### Parameters

##### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

---

### getStarknetVersion()

> **getStarknetVersion**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_9_0.ts:301](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L301)

Helper method to get the starknet version from the block, default latest block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

Starknet version

---

### getBlockLatestAccepted()

> **getBlockLatestAccepted**(): `Promise`\<[`BlockHashAndNumber`](../../RPC/namespaces/RPCSPEC09/type-aliases/BlockHashAndNumber.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:309](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L309)

Get the most recent accepted block hash and number

#### Returns

`Promise`\<[`BlockHashAndNumber`](../../RPC/namespaces/RPCSPEC09/type-aliases/BlockHashAndNumber.md)\>

---

### getBlockNumber()

> **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [src/channel/rpc_0_9_0.ts:318](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L318)

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`\<`number`\>

Number of the latest block

---

### getBlockWithTxHashes()

> **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:322](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L322)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

---

### getBlockWithTxs()

> **getBlockWithTxs**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:327](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L327)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

---

### getBlockWithReceipts()

> **getBlockWithReceipts**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:332](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L332)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../../RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

---

### getBlockStateUpdate()

> **getBlockStateUpdate**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md), [`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md) & [`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md), [`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md) & [`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:337](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L337)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md), [`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md) & [`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md), [`STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/STATE_UPDATE.md) & [`PRE_CONFIRMED_STATE_UPDATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_STATE_UPDATE.md)\>\>

---

### getBlockTransactionsTraces()

> **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`\<[`BlockTransactionsTraces`](../../RPC/namespaces/RPCSPEC09/type-aliases/BlockTransactionsTraces.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:342](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L342)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<[`BlockTransactionsTraces`](../../RPC/namespaces/RPCSPEC09/type-aliases/BlockTransactionsTraces.md)\>

---

### getBlockTransactionCount()

> **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

Defined in: [src/channel/rpc_0_9_0.ts:347](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L347)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`number`\>

---

### getTransactionByHash()

> **getTransactionByHash**(`txHash`): `Promise`\<[`TXN_WITH_HASH`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_WITH_HASH.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:352](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L352)

#### Parameters

##### txHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`TXN_WITH_HASH`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_WITH_HASH.md)\>

---

### getTransactionByBlockIdAndIndex()

> **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`\<[`TXN_WITH_HASH`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_WITH_HASH.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:359](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L359)

#### Parameters

##### blockIdentifier

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md)

##### index

`number`

#### Returns

`Promise`\<[`TXN_WITH_HASH`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_WITH_HASH.md)\>

---

### getTransactionReceipt()

> **getTransactionReceipt**(`txHash`): `Promise`\<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:364](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L364)

#### Parameters

##### txHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`TXN_RECEIPT_WITH_BLOCK_INFO`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT_WITH_BLOCK_INFO.md)\>

---

### getTransactionTrace()

> **getTransactionTrace**(`txHash`): `Promise`\<[`TRANSACTION_TRACE`](../../RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:369](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L369)

#### Parameters

##### txHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`TRANSACTION_TRACE`](../../RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md)\>

---

### getTransactionStatus()

> **getTransactionStatus**(`transactionHash`): `Promise`\<[`TXN_STATUS_RESULT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_STATUS_RESULT.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:377](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L377)

Get the status of a transaction

#### Parameters

##### transactionHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`TXN_STATUS_RESULT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_STATUS_RESULT.md)\>

---

### simulateTransaction()

> **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`\<[`SimulateTransactionResponse`](../../RPC/namespaces/RPCSPEC09/type-aliases/SimulateTransactionResponse.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:389](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L389)

#### Parameters

##### invocations

[`AccountInvocations`](../../../../type-aliases/AccountInvocations.md)

AccountInvocations

##### simulateTransactionOptions?

[`getSimulateTransactionOptions`](../../../../type-aliases/getSimulateTransactionOptions.md) = `{}`

blockIdentifier and flags to skip validation and fee charge<br/>

- blockIdentifier<br/>
- skipValidate (default true)<br/>
- skipFeeCharge (default true)<br/>

#### Returns

`Promise`\<[`SimulateTransactionResponse`](../../RPC/namespaces/RPCSPEC09/type-aliases/SimulateTransactionResponse.md)\>

---

### waitForTransaction()

> **waitForTransaction**(`txHash`, `options?`): `Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:412](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L412)

#### Parameters

##### txHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### options?

[`waitForTransactionOptions`](../../../../type-aliases/waitForTransactionOptions.md)

#### Returns

`Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md)\>

---

### getStorageAt()

> **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_9_0.ts:506](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L506)

#### Parameters

##### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### key

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

---

### getClassHashAt()

> **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_9_0.ts:521](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L521)

#### Parameters

##### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

---

### getClass()

> **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\> \| `OnlyFirst`\<[`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:533](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L533)

#### Parameters

##### classHash

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\> \| `OnlyFirst`\<[`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\>\>

---

### getClassAt()

> **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\> \| `OnlyFirst`\<[`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\>\>

Defined in: [src/channel/rpc_0_9_0.ts:545](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L545)

#### Parameters

##### contractAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<[`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\> \| `OnlyFirst`\<[`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md), [`CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/CONTRACT_CLASS.md) & [`DEPRECATED_CONTRACT_CLASS`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPRECATED_CONTRACT_CLASS.md)\>\>

---

### getEstimateFee()

> **getEstimateFee**(`invocations`, `options?`): `Promise`\<[`FEE_ESTIMATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/FEE_ESTIMATE.md)[]\>

Defined in: [src/channel/rpc_0_9_0.ts:557](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L557)

#### Parameters

##### invocations

[`AccountInvocations`](../../../../type-aliases/AccountInvocations.md)

##### options?

[`getEstimateFeeBulkOptions`](../../../../type-aliases/getEstimateFeeBulkOptions.md) = `{}`

#### Returns

`Promise`\<[`FEE_ESTIMATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/FEE_ESTIMATE.md)[]\>

---

### invoke()

> **invoke**(`functionInvocation`, `details`): `Promise`\<[`InvokedTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/InvokedTransaction.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:579](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L579)

#### Parameters

##### functionInvocation

[`Invocation`](../../../../type-aliases/Invocation.md)

##### details

[`InvocationsDetailsWithNonce`](../../../../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<[`InvokedTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/InvokedTransaction.md)\>

---

### invokeSignedTx()

> **invokeSignedTx**(`transaction`): `Promise`\<[`InvokedTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/InvokedTransaction.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:596](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L596)

#### Parameters

##### transaction

[`INVOKE_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md)

#### Returns

`Promise`\<[`InvokedTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/InvokedTransaction.md)\>

---

### declare()

> **declare**(`declareTransaction`, `details`): `Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md) \| [`DeclaredTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/DeclaredTransaction.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:603](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L603)

#### Parameters

##### declareTransaction

[`DeclareContractTransaction`](../../../../type-aliases/DeclareContractTransaction.md)

##### details

[`InvocationsDetailsWithNonce`](../../../../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md) \| [`DeclaredTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/DeclaredTransaction.md)\>

---

### deployAccount()

> **deployAccount**(`deployAccountTransaction`, `details`): `Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md) \| [`DeployedAccountTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/DeployedAccountTransaction.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:623](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L623)

#### Parameters

##### deployAccountTransaction

[`DeployAccountContractTransaction`](../../../../type-aliases/DeployAccountContractTransaction.md)

##### details

[`InvocationsDetailsWithNonce`](../../../../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<[`TXN_RECEIPT`](../../RPC/namespaces/RPCSPEC09/type-aliases/TXN_RECEIPT.md) \| [`DeployedAccountTransaction`](../../RPC/namespaces/RPCSPEC09/type-aliases/DeployedAccountTransaction.md)\>

---

### callContract()

> **callContract**(`call`, `blockIdentifier?`): `Promise`\<`string`[]\>

Defined in: [src/channel/rpc_0_9_0.ts:643](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L643)

#### Parameters

##### call

[`Call`](../../../../type-aliases/Call.md)

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`[]\>

---

### estimateMessageFee()

> **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<[`MESSAGE_FEE_ESTIMATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:659](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L659)

NEW: Estimate the fee for a message from L1

#### Parameters

##### message

[`MSG_FROM_L1`](../../RPC/namespaces/RPCSPEC09/type-aliases/MSG_FROM_L1.md)

Message From L1

##### blockIdentifier?

[`BlockIdentifier`](../../../../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<[`MESSAGE_FEE_ESTIMATE`](../../RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md)\>

---

### getSyncingStats()

> **getSyncingStats**(): `Promise`\<[`Syncing`](../../RPC/namespaces/RPCSPEC09/type-aliases/Syncing.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:682](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L682)

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`\<[`Syncing`](../../RPC/namespaces/RPCSPEC09/type-aliases/Syncing.md)\>

Object with the stats data

---

### getEvents()

> **getEvents**(`eventFilter`): `Promise`\<[`EVENTS_CHUNK`](../../RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md)\>

Defined in: [src/channel/rpc_0_9_0.ts:690](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L690)

Returns all events matching the given filter

#### Parameters

##### eventFilter

[`EventFilter`](../../RPC/namespaces/RPCSPEC09/type-aliases/EventFilter.md)

#### Returns

`Promise`\<[`EVENTS_CHUNK`](../../RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md)\>

events and the pagination of the events

---

### buildTransaction()

> **buildTransaction**\<`T`\>(`invocation`, `versionType?`): `Promise`\<`T` _extends_ `object` ? [`INVOKE_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) : `T` _extends_ `object` ? [`BROADCASTED_DECLARE_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/BROADCASTED_DECLARE_TXN_V3.md) : `T` _extends_ `object` ? [`DEPLOY_ACCOUNT_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) : `never`\>

Defined in: [src/channel/rpc_0_9_0.ts:695](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_9_0.ts#L695)

#### Type Parameters

##### T

`T` _extends_ [`AccountInvocationItem`](../../../../type-aliases/AccountInvocationItem.md)

#### Parameters

##### invocation

`T`

##### versionType?

`"fee"` \| `"transaction"`

#### Returns

`Promise`\<`T` _extends_ `object` ? [`INVOKE_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) : `T` _extends_ `object` ? [`BROADCASTED_DECLARE_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/BROADCASTED_DECLARE_TXN_V3.md) : `T` _extends_ `object` ? [`DEPLOY_ACCOUNT_TXN_V3`](../../RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) : `never`\>
