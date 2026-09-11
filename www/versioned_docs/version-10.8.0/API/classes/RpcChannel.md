# Class: RpcChannel

Defined in: [src/channel/rpc_0_10_4.ts:4](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_4.ts#L4)

## Extends

- [`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md)

## Constructors

### Constructor

> **new RpcChannel**(`optionsOrProvider?`): `RpcChannel`

Defined in: [src/channel/rpc_0_10_2.ts:87](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L87)

#### Parameters

##### optionsOrProvider?

[`RpcProviderOptions`](../type-aliases/RpcProviderOptions.md)

#### Returns

`RpcChannel`

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`constructor`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#constructor)

## Properties

### id

> `readonly` **id**: `"RPC0.10.4"` = `'RPC0.10.4'`

Defined in: [src/channel/rpc_0_10_4.ts:5](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_4.ts#L5)

#### Overrides

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`id`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#id)

---

### channelSpecVersion

> `readonly` **channelSpecVersion**: `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `SupportedRpcVersion.v0_10_4`

Defined in: [src/channel/rpc_0_10_4.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_4.ts#L7)

RPC specification version this Channel class implements

#### Overrides

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`channelSpecVersion`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#channelspecversion)

---

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/channel/rpc_0_10_2.ts:62](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L62)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`nodeUrl`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#nodeurl)

---

### headers

> **headers**: `object`

Defined in: [src/channel/rpc_0_10_2.ts:64](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L64)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`headers`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#headers)

---

### requestId

> **requestId**: `number`

Defined in: [src/channel/rpc_0_10_2.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L66)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`requestId`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#requestid)

---

### blockIdentifier

> `readonly` **blockIdentifier**: [`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

Defined in: [src/channel/rpc_0_10_2.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L68)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`blockIdentifier`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#blockidentifier)

---

### retries

> `readonly` **retries**: `number`

Defined in: [src/channel/rpc_0_10_2.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L70)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`retries`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#retries)

---

### waitMode

> `readonly` **waitMode**: `boolean`

Defined in: [src/channel/rpc_0_10_2.ts:72](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L72)

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`waitMode`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#waitmode)

## Methods

### readSpecVersion()

> **readSpecVersion**(): `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

Defined in: [src/channel/rpc_0_10_2.ts:137](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L137)

#### Returns

`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`readSpecVersion`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#readspecversion)

---

### setChainId()

> **setChainId**(`chainId`): `void`

Defined in: [src/channel/rpc_0_10_2.ts:145](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L145)

#### Parameters

##### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Returns

`void`

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`setChainId`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#setchainid)

---

### fetch()

> **fetch**(`method`, `params?`, `id?`): `Promise`\<`Response`\>

Defined in: [src/channel/rpc_0_10_2.ts:149](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L149)

#### Parameters

##### method

`string`

##### params?

`object`

##### id?

`string` \| `number`

#### Returns

`Promise`\<`Response`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`fetch`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#fetch)

---

### errorHandler()

> `protected` **errorHandler**(`method`, `params`, `rpcError?`, `otherError?`): `void`

Defined in: [src/channel/rpc_0_10_2.ts:163](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L163)

#### Parameters

##### method

`string`

##### params

`any`

##### rpcError?

[`Error`](../Starknet.js-API/namespaces/RPC/namespaces/JRPC/type-aliases/Error.md)

##### otherError?

`any`

#### Returns

`void`

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`errorHandler`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#errorhandler)

---

### fetchEndpoint()

> `protected` **fetchEndpoint**\<`T`\>(`method`, `params?`): `Promise`\<`Methods`\[`T`\]\[`"result"`\]\>

Defined in: [src/channel/rpc_0_10_2.ts:175](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L175)

#### Type Parameters

##### T

`T` _extends_ keyof ReadMethods \| keyof WriteMethods \| keyof TraceMethods

#### Parameters

##### method

`T`

##### params?

`Methods`\[`T`\]\[`"params"`\]

#### Returns

`Promise`\<`Methods`\[`T`\]\[`"result"`\]\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`fetchEndpoint`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#fetchendpoint)

---

### getChainId()

> **getChainId**(): `Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Defined in: [src/channel/rpc_0_10_2.ts:203](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L203)

#### Returns

`Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getChainId`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getchainid)

---

### getSpecVersion()

> **getSpecVersion**(): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_10_2.ts:212](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L212)

fetch rpc node specVersion

#### Returns

`Promise`\<`string`\>

#### Example

```ts
this.specVersion = '0.9.0';
```

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getSpecVersion`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getspecversion)

---

### setUpSpecVersion()

> **setUpSpecVersion**(): `Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

Defined in: [src/channel/rpc_0_10_2.ts:220](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L220)

fetch if undefined else just return this.specVersion

#### Returns

`Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

#### Example

```ts
this.specVersion = '0.9.0';
```

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`setUpSpecVersion`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#setupspecversion)

---

### getMessagesStatus()

> **getMessagesStatus**(`txHash`): `Promise`\<`L1L2MessagesStatus`\>

Defined in: [src/channel/rpc_0_10_2.ts:249](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L249)

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`L1L2MessagesStatus`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getMessagesStatus`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getmessagesstatus)

---

### getStorageProof()

> **getStorageProof**(`classHashes?`, `contractAddresses?`, `contractsStorageKeys?`, `blockIdentifier?`): `Promise`\<`StorageProof`\>

Defined in: [src/channel/rpc_0_10_2.ts:257](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L257)

#### Parameters

##### classHashes?

[`BigNumberish`](../type-aliases/BigNumberish.md)[] = `[]`

##### contractAddresses?

[`BigNumberish`](../type-aliases/BigNumberish.md)[] = `[]`

##### contractsStorageKeys?

`CONTRACT_STORAGE_KEYS`[] = `[]`

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`StorageProof`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getStorageProof`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getstorageproof)

---

### getCompiledCasm()

> **getCompiledCasm**(`classHash`): `Promise`\<`CASM_COMPILED_CONTRACT_CLASS`\>

Defined in: [src/channel/rpc_0_10_2.ts:276](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L276)

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`CASM_COMPILED_CONTRACT_CLASS`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getCompiledCasm`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getcompiledcasm)

---

### getNonceForAddress()

> **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_10_2.ts:284](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L284)

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getNonceForAddress`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getnonceforaddress)

---

### getStarknetVersion()

> **getStarknetVersion**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_10_2.ts:300](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L300)

Helper method to get the starknet version from the block, default latest block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

Starknet version

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getStarknetVersion`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getstarknetversion)

---

### getBlockLatestAccepted()

> **getBlockLatestAccepted**(): `Promise`\<`BlockHashAndNumber`\>

Defined in: [src/channel/rpc_0_10_2.ts:308](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L308)

Get the most recent accepted block hash and number

#### Returns

`Promise`\<`BlockHashAndNumber`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockLatestAccepted`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblocklatestaccepted)

---

### getBlockNumber()

> **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [src/channel/rpc_0_10_2.ts:317](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L317)

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`\<`number`\>

Number of the latest block

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockNumber`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblocknumber)

---

### getBlockWithTxHashes()

> **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<`BLOCK_WITH_TX_HASHES`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TX_HASHES` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TX_HASHES` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:321](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L321)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<`BLOCK_WITH_TX_HASHES`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TX_HASHES` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TX_HASHES` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockWithTxHashes`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblockwithtxhashes)

---

### getBlockWithTxs()

> **getBlockWithTxs**(`blockIdentifier?`, `options?`): `Promise`\<`OnlyFirst`\<`BLOCK_WITH_TXS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TXS` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_TXS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TXS` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:332](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L332)

Get block information with full transactions

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

block identifier

##### options?

optional flags

- includeProofFacts - include proof facts in the response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`OnlyFirst`\<`BLOCK_WITH_TXS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TXS` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_TXS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_TXS` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockWithTxs`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblockwithtxs)

---

### getBlockWithReceipts()

> **getBlockWithReceipts**(`blockIdentifier?`, `options?`): `Promise`\<`OnlyFirst`\<`BLOCK_WITH_RECEIPTS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_RECEIPTS` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_RECEIPTS` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:352](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L352)

Get block information with transaction receipts

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

block identifier

##### options?

optional flags

- includeProofFacts - include proof facts in the response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`OnlyFirst`\<`BLOCK_WITH_RECEIPTS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_RECEIPTS` & `PRE_CONFIRMED_BLOCK_HEADER`\> \| `OnlyFirst`\<`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`, `object` & `BLOCK_HEADER` & `BLOCK_BODY_WITH_RECEIPTS` & `PRE_CONFIRMED_BLOCK_HEADER`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockWithReceipts`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblockwithreceipts)

---

### getBlockStateUpdate()

> **getBlockStateUpdate**(`blockIdentifier?`, `contractAddresses?`): `Promise`\<`OnlyFirst`\<`STATE_UPDATE`, `STATE_UPDATE` & `PRE_CONFIRMED_STATE_UPDATE`\> \| `OnlyFirst`\<`PRE_CONFIRMED_STATE_UPDATE`, `STATE_UPDATE` & `PRE_CONFIRMED_STATE_UPDATE`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:366](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L366)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

##### contractAddresses?

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

#### Returns

`Promise`\<`OnlyFirst`\<`STATE_UPDATE`, `STATE_UPDATE` & `PRE_CONFIRMED_STATE_UPDATE`\> \| `OnlyFirst`\<`PRE_CONFIRMED_STATE_UPDATE`, `STATE_UPDATE` & `PRE_CONFIRMED_STATE_UPDATE`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockStateUpdate`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblockstateupdate)

---

### getBlockTransactionsTraces()

> **getBlockTransactionsTraces**(`blockIdentifier?`, `options?`): `Promise`\<`BlockTransactionsTraces`\>

Defined in: [src/channel/rpc_0_10_2.ts:385](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L385)

Get transaction traces for all transactions in a block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

block identifier

##### options?

optional flags

- returnInitialReads - include initial storage reads in traces (RPC 0.10.1+)

###### returnInitialReads?

`boolean`

#### Returns

`Promise`\<`BlockTransactionsTraces`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockTransactionsTraces`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblocktransactionstraces)

---

### getBlockTransactionCount()

> **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

Defined in: [src/channel/rpc_0_10_2.ts:399](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L399)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`number`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getBlockTransactionCount`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getblocktransactioncount)

---

### getTransactionByHash()

> **getTransactionByHash**(`txHash`, `options?`): `Promise`\<`TXN_WITH_HASH`\>

Defined in: [src/channel/rpc_0_10_2.ts:410](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L410)

Get transaction by hash

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

##### options?

optional flags

- includeProofFacts - include proof facts in the response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`TXN_WITH_HASH`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getTransactionByHash`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#gettransactionbyhash)

---

### getTransactionByBlockIdAndIndex()

> **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`, `options?`): `Promise`\<`TXN_WITH_HASH`\>

Defined in: [src/channel/rpc_0_10_2.ts:428](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L428)

Get transaction by block identifier and index

#### Parameters

##### blockIdentifier

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### index

`number`

transaction index in the block

##### options?

optional flags

- includeProofFacts - include proof facts in the response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<`TXN_WITH_HASH`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getTransactionByBlockIdAndIndex`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#gettransactionbyblockidandindex)

---

### getTransactionReceipt()

> **getTransactionReceipt**(`txHash`): `Promise`\<`TXN_RECEIPT_WITH_BLOCK_INFO`\>

Defined in: [src/channel/rpc_0_10_2.ts:444](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L444)

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`TXN_RECEIPT_WITH_BLOCK_INFO`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getTransactionReceipt`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#gettransactionreceipt)

---

### getTransactionTrace()

> **getTransactionTrace**(`txHash`): `Promise`\<`TRANSACTION_TRACE`\>

Defined in: [src/channel/rpc_0_10_2.ts:449](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L449)

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`TRANSACTION_TRACE`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getTransactionTrace`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#gettransactiontrace)

---

### getTransactionStatus()

> **getTransactionStatus**(`transactionHash`): `Promise`\<`TXN_STATUS_RESULT`\>

Defined in: [src/channel/rpc_0_10_2.ts:457](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L457)

Get the status of a transaction

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`TXN_STATUS_RESULT`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getTransactionStatus`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#gettransactionstatus)

---

### simulateTransaction()

> **simulateTransaction**(`invocations`, `simulateTransactionOptions?`): `Promise`\<`SimulateTransactionResponse`\>

Defined in: [src/channel/rpc_0_10_2.ts:470](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L470)

#### Parameters

##### invocations

[`AccountInvocations`](../type-aliases/AccountInvocations.md)

AccountInvocations

##### simulateTransactionOptions?

[`getSimulateTransactionOptions`](../type-aliases/getSimulateTransactionOptions.md) = `{}`

blockIdentifier and flags to skip validation and fee charge<br/>

- blockIdentifier<br/>
- skipValidate (default true)<br/>
- skipFeeCharge (default true)<br/>
- returnInitialReads (default false) - include initial storage reads in trace (RPC 0.10.1+)<br/>

#### Returns

`Promise`\<`SimulateTransactionResponse`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`simulateTransaction`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#simulatetransaction)

---

### waitForTransaction()

> **waitForTransaction**(`txHash`, `options?`): `Promise`\<`TXN_RECEIPT`\>

Defined in: [src/channel/rpc_0_10_2.ts:497](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L497)

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### options?

[`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md)

#### Returns

`Promise`\<`TXN_RECEIPT`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`waitForTransaction`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#waitfortransaction)

---

### getStorageAt()

> **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`, `responseFlags?`): `Promise`\<`string` \| `STORAGE_RESULT`\>

Defined in: [src/channel/rpc_0_10_2.ts:591](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L591)

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### key

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

##### responseFlags?

`"INCLUDE_LAST_UPDATE_BLOCK"`[]

#### Returns

`Promise`\<`string` \| `STORAGE_RESULT`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getStorageAt`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getstorageat)

---

### getClassHashAt()

> **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/channel/rpc_0_10_2.ts:608](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L608)

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getClassHashAt`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getclasshashat)

---

### getClass()

> **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<`OnlyFirst`\<`CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\> \| `OnlyFirst`\<`DEPRECATED_CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:620](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L620)

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<`CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\> \| `OnlyFirst`\<`DEPRECATED_CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getClass`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getclass)

---

### getClassAt()

> **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`OnlyFirst`\<`CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\> \| `OnlyFirst`\<`DEPRECATED_CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\>\>

Defined in: [src/channel/rpc_0_10_2.ts:632](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L632)

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`OnlyFirst`\<`CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\> \| `OnlyFirst`\<`DEPRECATED_CONTRACT_CLASS`, `CONTRACT_CLASS` & `DEPRECATED_CONTRACT_CLASS`\>\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getClassAt`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getclassat)

---

### getEstimateFee()

> **getEstimateFee**(`invocations`, `options?`): `Promise`\<`FEE_ESTIMATE`[]\>

Defined in: [src/channel/rpc_0_10_2.ts:644](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L644)

#### Parameters

##### invocations

[`AccountInvocations`](../type-aliases/AccountInvocations.md)

##### options?

[`getEstimateFeeBulkOptions`](../type-aliases/getEstimateFeeBulkOptions.md) = `{}`

#### Returns

`Promise`\<`FEE_ESTIMATE`[]\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getEstimateFee`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getestimatefee)

---

### invoke()

> **invoke**(`functionInvocation`, `details`): `Promise`\<`InvokedTransaction`\>

Defined in: [src/channel/rpc_0_10_2.ts:666](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L666)

#### Parameters

##### functionInvocation

[`Invocation`](../type-aliases/Invocation.md)

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<`InvokedTransaction`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`invoke`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#invoke)

---

### invokeSignedTx()

> **invokeSignedTx**(`transaction`): `Promise`\<`InvokedTransaction`\>

Defined in: [src/channel/rpc_0_10_2.ts:683](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L683)

#### Parameters

##### transaction

`INVOKE_TXN_V3`

#### Returns

`Promise`\<`InvokedTransaction`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`invokeSignedTx`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#invokesignedtx)

---

### declare()

> **declare**(`declareTransaction`, `details`): `Promise`\<`TXN_RECEIPT` \| `DeclaredTransaction`\>

Defined in: [src/channel/rpc_0_10_2.ts:690](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L690)

#### Parameters

##### declareTransaction

[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<`TXN_RECEIPT` \| `DeclaredTransaction`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`declare`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#declare)

---

### deployAccount()

> **deployAccount**(`deployAccountTransaction`, `details`): `Promise`\<`TXN_RECEIPT` \| `DeployedAccountTransaction`\>

Defined in: [src/channel/rpc_0_10_2.ts:710](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L710)

#### Parameters

##### deployAccountTransaction

[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<`TXN_RECEIPT` \| `DeployedAccountTransaction`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`deployAccount`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#deployaccount)

---

### callContract()

> **callContract**(`call`, `blockIdentifier?`): `Promise`\<`string`[]\>

Defined in: [src/channel/rpc_0_10_2.ts:730](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L730)

#### Parameters

##### call

[`Call`](../type-aliases/Call.md)

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`string`[]\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`callContract`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#callcontract)

---

### estimateMessageFee()

> **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<`MESSAGE_FEE_ESTIMATE`\>

Defined in: [src/channel/rpc_0_10_2.ts:746](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L746)

NEW: Estimate the fee for a message from L1

#### Parameters

##### message

`MSG_FROM_L1`

Message From L1

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<`MESSAGE_FEE_ESTIMATE`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`estimateMessageFee`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#estimatemessagefee)

---

### getSyncingStats()

> **getSyncingStats**(): `Promise`\<`Syncing`\>

Defined in: [src/channel/rpc_0_10_2.ts:769](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L769)

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`\<`Syncing`\>

Object with the stats data

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getSyncingStats`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getsyncingstats)

---

### getEvents()

> **getEvents**(`eventFilter`): `Promise`\<`EVENTS_CHUNK`\>

Defined in: [src/channel/rpc_0_10_2.ts:777](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L777)

Returns all events matching the given filter

#### Parameters

##### eventFilter

`EventFilter`

#### Returns

`Promise`\<`EVENTS_CHUNK`\>

events and the pagination of the events

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`getEvents`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#getevents)

---

### buildTransaction()

> **buildTransaction**\<`T`\>(`invocation`, `versionType?`): `Promise`\<`T` _extends_ `object` ? `BROADCASTED_INVOKE_TXN` : `T` _extends_ `object` ? `BROADCASTED_DECLARE_TXN_V3` : `T` _extends_ `object` ? `DEPLOY_ACCOUNT_TXN_V3` : `never`\>

Defined in: [src/channel/rpc_0_10_2.ts:782](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/rpc_0_10_2.ts#L782)

#### Type Parameters

##### T

`T` _extends_ [`AccountInvocationItem`](../type-aliases/AccountInvocationItem.md)

#### Parameters

##### invocation

`T`

##### versionType?

`"fee"` \| `"transaction"`

#### Returns

`Promise`\<`T` _extends_ `object` ? `BROADCASTED_INVOKE_TXN` : `T` _extends_ `object` ? `BROADCASTED_DECLARE_TXN_V3` : `T` _extends_ `object` ? `DEPLOY_ACCOUNT_TXN_V3` : `never`\>

#### Inherited from

[`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md).[`buildTransaction`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md#buildtransaction)
