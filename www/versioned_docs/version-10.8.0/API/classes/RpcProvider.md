# Class: RpcProvider

Defined in: [src/provider/rpc.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L70)

Provider methods added by the FastExecute plugin

## Extends

- [`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md).[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`FastExecuteProviderMethods`](../interfaces/FastExecuteProviderMethods.md)

## Implements

- [`ProviderInterface`](ProviderInterface.md)

## Constructors

### Constructor

> **new RpcProvider**(`optionsOrProvider?`): `RpcProvider`

Defined in: [src/provider/rpc.ts:81](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L81)

#### Parameters

##### optionsOrProvider?

[`RpcProviderOptions`](../type-aliases/RpcProviderOptions.md) \| [`ProviderInterface`](ProviderInterface.md) \| `RpcProvider`

#### Returns

`RpcProvider`

#### Inherited from

`StarknetIdProviderMethods.constructor`

## Properties

### responseParser

> **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

Defined in: [src/provider/rpc.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L74)

#### Implementation of

[`ProviderInterface`](ProviderInterface.md).[`responseParser`](ProviderInterface.md#responseparser)

---

### channel

> **channel**: [`RpcChannel`](../Starknet.js-API/namespaces/RPC09/classes/RpcChannel.md) \| [`RpcChannel`](../Starknet.js-API/namespaces/RPC0102/classes/RpcChannel.md) \| [`RpcChannel`](../Starknet.js-API/namespaces/RPC0103/classes/RpcChannel.md) \| [`RpcChannel`](RpcChannel.md)

Defined in: [src/provider/rpc.ts:76](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L76)

#### Implementation of

[`ProviderInterface`](ProviderInterface.md).[`channel`](ProviderInterface.md#channel)

---

### pluginManager

> `readonly` **pluginManager**: [`PluginManager`](PluginManager.md)

Defined in: [src/provider/rpc.ts:79](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L79)

**`Internal`**

Plugin management infrastructure

---

### getStateUpdate

> **getStateUpdate**: \{(): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>; (`blockIdentifier`): `Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>; (`blockIdentifier`): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>; (`blockIdentifier?`, `contractAddresses?`): `Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>; \}

Defined in: [src/provider/rpc.ts:333](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L333)

Gets the state changes in a specific block (result of executing the requested block)

#### Call Signature

> (): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

StateUpdateResponse

#### Call Signature

> (`blockIdentifier`): `Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

##### Parameters

###### blockIdentifier

`"pre_confirmed"`

##### Returns

`Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

#### Call Signature

> (`blockIdentifier`): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

##### Parameters

###### blockIdentifier

`"latest"`

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

#### Call Signature

> (`blockIdentifier?`, `contractAddresses?`): `Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

##### Parameters

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

###### contractAddresses?

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

##### Returns

`Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

#### Param

block identifier

#### Returns

StateUpdateResponse

#### Implementation of

[`ProviderInterface`](ProviderInterface.md).[`getStateUpdate`](ProviderInterface.md#getstateupdate)

## Methods

### create()

> `static` **create**\<`T`\>(`this`, `optionsOrProvider?`): `Promise`\<`T`\>

Defined in: [src/provider/rpc.ts:129](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L129)

auto configure channel based on provided node
leave space for other async before constructor

#### Type Parameters

##### T

`T` _extends_ `RpcProvider`

#### Parameters

##### this

(...`args`) => `T`

##### optionsOrProvider?

[`RpcProviderOptions`](../type-aliases/RpcProviderOptions.md)

#### Returns

`Promise`\<`T`\>

---

### use()

> **use**\<`T`\>(`plugin`): `RpcProvider` & `T`

Defined in: [src/provider/rpc.ts:173](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L173)

Install a plugin at runtime. Returns the instance typed with plugin methods.

#### Type Parameters

##### T

`T` _extends_ `Record`\<`string`, `any`\>

#### Parameters

##### plugin

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<`T`, `any`\>

#### Returns

`RpcProvider` & `T`

#### Example

```typescript
const provider = new RpcProvider({ nodeUrl: '...' }).use(myPlugin());
provider.myMethod(); // typed
```

---

### fetch()

> **fetch**(`method`, `params?`, `id?`): `Promise`\<`any`\>

Defined in: [src/provider/rpc.ts:178](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L178)

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

### getChainId()

> **getChainId**(): `Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Defined in: [src/provider/rpc.ts:196](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L196)

Gets the Starknet chain Id

#### Returns

`Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

---

### readSpecVersion()

> **readSpecVersion**(): `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

Defined in: [src/provider/rpc.ts:200](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L200)

Read channel spec version

#### Returns

`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` \| `undefined`

Spec version string or undefined if not set

---

### getSpecVersion()

> **getSpecVersion**(): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:204](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L204)

Get channel spec version

#### Returns

`Promise`\<`string`\>

Promise resolving to spec version

---

### setUpSpecVersion()

> **setUpSpecVersion**(): `Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

Defined in: [src/provider/rpc.ts:208](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L208)

Setup channel spec version and return it

#### Returns

`Promise`\<`"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`\>

Promise resolving to spec version

---

### getStarknetVersion()

> **getStarknetVersion**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:212](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L212)

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

#### Returns

`Promise`\<`string`\>

---

### getNonceForAddress()

> **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:216](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L216)

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

### getBlock()

#### Call Signature

> **getBlock**(): `Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

Defined in: [src/provider/rpc.ts:223](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L223)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](ProviderInterface.md#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](ProviderInterface.md#getblockwithreceipts).

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

> **getBlock**(`blockIdentifier`): `Promise`\<\{ `transactions`: `string`[]; `block_number`: `number`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; \}\>

Defined in: [src/provider/rpc.ts:224](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L224)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](ProviderInterface.md#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](ProviderInterface.md#getblockwithreceipts).

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

> **getBlock**(`blockIdentifier`): `Promise`\<\{ `status`: [`EBlockStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/EBlockStatus.md); `block_hash`: `string`; `parent_hash`: `string`; `block_number`: `number`; `new_root`: `string`; `timestamp`: `number`; `sequencer_address`: `string`; `l1_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l2_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_data_gas_price`: [`RESOURCE_PRICE`](../Starknet.js-API/namespaces/RPC/type-aliases/RESOURCE_PRICE.md); `l1_da_mode`: [`L1_DA_MODE`](../Starknet.js-API/namespaces/RPC/type-aliases/L1_DA_MODE.md); `starknet_version`: `string`; `event_commitment`: `string`; `transaction_commitment`: `string`; `receipt_commitment`: `string`; `state_diff_commitment`: `string`; `event_count`: `number`; `transaction_count`: `number`; `state_diff_length`: `number`; `transactions`: `string`[]; \}\>

Defined in: [src/provider/rpc.ts:225](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L225)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](ProviderInterface.md#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](ProviderInterface.md#getblockwithreceipts).

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

> **getBlock**(`blockIdentifier`): `Promise`\<[`GetBlockResponse`](../type-aliases/GetBlockResponse.md)\>

Defined in: [src/provider/rpc.ts:226](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L226)

Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).

The response contains the block metadata (hash, number, parent hash, timestamp, status,
gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
of the transactions included in the block — not their content.
To get the full transactions use [getBlockWithTxs](ProviderInterface.md#getblockwithtxs), and for their receipts use
[getBlockWithReceipts](ProviderInterface.md#getblockwithreceipts).

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

### getBlockLatestAccepted()

> **getBlockLatestAccepted**(): `Promise`\<[`BlockHashAndNumber`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BlockHashAndNumber.md)\>

Defined in: [src/provider/rpc.ts:233](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L233)

Get the most recent accepted block hash and number

#### Returns

`Promise`\<[`BlockHashAndNumber`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BlockHashAndNumber.md)\>

Object containing block hash and number

---

### getBlockNumber()

> **getBlockNumber**(): `Promise`\<`number`\>

Defined in: [src/provider/rpc.ts:237](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L237)

Get the most recent accepted block number

#### Returns

`Promise`\<`number`\>

Number of the latest block

---

### getBlockWithTxHashes()

> **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/provider/rpc.ts:241](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L241)

Get block information with transaction hashes

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TX_HASHES.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TX_HASHES`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TX_HASHES.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Block with transaction hashes

---

### getBlockWithTxs()

> **getBlockWithTxs**(`blockIdentifier?`, `options?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/provider/rpc.ts:245](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L245)

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

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_TXS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_TXS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_TXS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Block with full transactions

---

### waitForBlock()

> **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`\<`void`\>

Defined in: [src/provider/rpc.ts:255](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L255)

Pause execution until a specified block is created

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `BlockTag.LATEST`

block number or tag

##### retryInterval?

`number` = `5000`

milliseconds between requests (default: 5000)

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await provider.waitForBlock(12345);
await provider.waitForBlock('latest');
```

---

### getL1GasPrice()

> **getL1GasPrice**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:285](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L285)

Gets the price of l1 gas in the block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`string`\>

gas price of the block

---

### getGasPrices()

> **getGasPrices**(`blockIdentifier?`): `Promise`\<[`GasPrices`](../type-aliases/GasPrices.md)\>

Defined in: [src/provider/rpc.ts:301](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L301)

Get the gas prices related to a block.

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md) = `...`

#### Returns

`Promise`\<[`GasPrices`](../type-aliases/GasPrices.md)\>

an object with l1DataGasPrice, l1GasPrice, l2GasPrice properties (all bigint type).

#### Example

```ts
const result = await myProvider.getGasPrices();
// result = { l1DataGasPrice: 3039n, l1GasPrice: 55590341542890n, l2GasPrice: 8441845008n }
```

---

### getL1MessageHash()

> **getL1MessageHash**(`l2TxHash`): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:307](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L307)

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

### getBlockWithReceipts()

> **getBlockWithReceipts**(`blockIdentifier?`, `options?`): `Promise`\<`OnlyFirst`\<[`BLOCK_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Defined in: [src/provider/rpc.ts:323](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L323)

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

`Promise`\<`OnlyFirst`\<[`BLOCK_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\> \| `OnlyFirst`\<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_WITH_RECEIPTS.md), `object` & [`BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_HEADER.md) & [`BLOCK_BODY_WITH_RECEIPTS`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BLOCK_BODY_WITH_RECEIPTS.md) & [`PRE_CONFIRMED_BLOCK_HEADER`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/PRE_CONFIRMED_BLOCK_HEADER.md)\>\>

Block with transaction receipts

---

### getBlockStateUpdate()

#### Call Signature

> **getBlockStateUpdate**(): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

Defined in: [src/provider/rpc.ts:335](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L335)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

StateUpdateResponse

#### Call Signature

> **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

Defined in: [src/provider/rpc.ts:336](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L336)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier

`"pre_confirmed"`

##### Returns

`Promise`\<\{ `block_hash`: `never`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; `old_root?`: `string`; \}\>

StateUpdateResponse

#### Call Signature

> **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

Defined in: [src/provider/rpc.ts:339](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L339)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier

`"latest"`

##### Returns

`Promise`\<\{ `block_hash`: `string`; `new_root`: `string`; `old_root`: `string`; `state_diff`: \{ `storage_diffs`: `object`[]; `deprecated_declared_classes`: `string`[]; `declared_classes`: `object`[]; `deployed_contracts`: `object`[]; `replaced_classes`: `object`[]; `nonces`: `object`[]; `migrated_compiled_classes?`: `object`[]; \}; \}\>

StateUpdateResponse

#### Call Signature

> **getBlockStateUpdate**(`blockIdentifier?`, `contractAddresses?`): `Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

Defined in: [src/provider/rpc.ts:340](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L340)

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

##### Parameters

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

###### contractAddresses?

[`BigNumberish`](../type-aliases/BigNumberish.md)[]

##### Returns

`Promise`\<[`StateUpdateResponse`](../type-aliases/StateUpdateResponse.md)\>

StateUpdateResponse

---

### getBlockTransactionsTraces()

> **getBlockTransactionsTraces**(`blockIdentifier?`, `options?`): `Promise`\<[`BlockTransactionsTraces`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BlockTransactionsTraces.md) \| `BlockTransactionsTracesWithInitialReads`\>

Defined in: [src/provider/rpc.ts:351](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L351)

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

`Promise`\<[`BlockTransactionsTraces`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/BlockTransactionsTraces.md) \| `BlockTransactionsTracesWithInitialReads`\>

Array of transaction traces

---

### getBlockTransactionCount()

> **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

Defined in: [src/provider/rpc.ts:361](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L361)

Get the number of transactions in a block

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`number`\>

Transaction count

---

### getTransaction()

> **getTransaction**(`txHash`, `options?`): `Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

Defined in: [src/provider/rpc.ts:365](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L365)

Gets the transaction information from a tx id.

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### options?

(optional) additional request options

- includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)

###### includeProofFacts?

`boolean`

#### Returns

`Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

---

### getTransactionByHash()

> **getTransactionByHash**(`txHash`, `options?`): `Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

Defined in: [src/provider/rpc.ts:369](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L369)

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

`Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

Transaction information

---

### getTransactionByBlockIdAndIndex()

> **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`, `options?`): `Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

Defined in: [src/provider/rpc.ts:379](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L379)

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

`Promise`\<[`INVOKE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V0.md) & `object` \| [`INVOKE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V1.md) & `object` \| [`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/INVOKE_TXN_V3.md) & `object` \| `object` & [`FUNCTION_CALL`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/FUNCTION_CALL.md) & `object` \| [`DECLARE_TXN_V0`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V0.md) & `object` \| [`DECLARE_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V1.md) & `object` \| [`DECLARE_TXN_V2`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V2.md) & `object` \| [`DECLARE_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DECLARE_TXN_V3.md) & `object` \| [`DEPLOY_TXN`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_TXN.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V1.md) & `object` \| [`DEPLOY_ACCOUNT_TXN_V3`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/DEPLOY_ACCOUNT_TXN_V3.md) & `object`\>

Transaction information

---

### getTransactionReceipt()

> **getTransactionReceipt**(`txHash`): `Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

Defined in: [src/provider/rpc.ts:390](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L390)

Gets the transaction receipt from a tx hash.

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

the transaction receipt object

---

### getTransactionTrace()

#### Call Signature

> **getTransactionTrace**\<`V`\>(`txHash`): `Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md) : [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md)\>

Defined in: [src/provider/rpc.ts:397](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L397)

Gets the transaction trace

##### Type Parameters

###### V

`V` _extends_ `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

##### Parameters

###### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

##### Returns

`Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md) : [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md)\>

Transaction trace

#### Call Signature

> **getTransactionTrace**(`txHash`): `Promise`\<[`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md) \| [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md)\>

Defined in: [src/provider/rpc.ts:402](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L402)

##### Parameters

###### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### Returns

`Promise`\<[`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TRANSACTION_TRACE.md) \| [`TRANSACTION_TRACE`](../Starknet.js-API/namespaces/RPC/type-aliases/TRANSACTION_TRACE.md)\>

---

### getTransactionStatus()

> **getTransactionStatus**(`transactionHash`): `Promise`\<[`TXN_STATUS_RESULT`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TXN_STATUS_RESULT.md)\>

Defined in: [src/provider/rpc.ts:411](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L411)

Get the status of a transaction

#### Parameters

##### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

transaction hash

#### Returns

`Promise`\<[`TXN_STATUS_RESULT`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/TXN_STATUS_RESULT.md)\>

Transaction status

---

### getSimulateTransaction()

> **getSimulateTransaction**(`invocations`, `options?`): `Promise`\<[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)\>

Defined in: [src/provider/rpc.ts:415](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L415)

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

### waitForTransaction()

> **waitForTransaction**(`txHash`, `options?`): `Promise`\<[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)\>

Defined in: [src/provider/rpc.ts:425](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L425)

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

### getStorageAt()

> **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`, `responseFlags?`): `Promise`\<[`STORAGE_RESULT`](../Starknet.js-API/namespaces/RPC/type-aliases/STORAGE_RESULT.md)\>

Defined in: [src/provider/rpc.ts:437](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L437)

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

### getClassHashAt()

> **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/provider/rpc.ts:452](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L452)

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

> **getClassByHash**(`classHash`): `Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Defined in: [src/provider/rpc.ts:456](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L456)

Returns the contract class deployed under the given class hash.

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

class hash

#### Returns

`Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Contract class of compiled contract

---

### getClass()

> **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Defined in: [src/provider/rpc.ts:460](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L460)

Get contract class by hash with optional block identifier

#### Parameters

##### classHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

class hash

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Contract class

---

### getClassAt()

> **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Defined in: [src/provider/rpc.ts:466](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L466)

Gets the contract class of the deployed contract.

#### Parameters

##### contractAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

contract address

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<[`LegacyContractClass`](../type-aliases/LegacyContractClass.md) \| `Omit`\<[`CompiledSierra`](../type-aliases/CompiledSierra.md), `"sierra_program_debug_info"`\>\>

Contract class of compiled contract

---

### getContractVersion()

#### Call Signature

> **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/provider/rpc.ts:472](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L472)

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

> **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/provider/rpc.ts:477](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L477)

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

### ~~getInvokeEstimateFee()~~

> **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/rpc.ts:510](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L510)

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

> **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/rpc.ts:524](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L524)

Estimates the fee for a given DECLARE transaction

#### Parameters

##### invocation

[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)

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

> **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/provider/rpc.ts:538](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L538)

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

##### invocation

[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)

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

> **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`\<[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)\>

Defined in: [src/provider/rpc.ts:552](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L552)

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

### invokeFunction()

> **invokeFunction**(`functionInvocation`, `details`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/provider/rpc.ts:561](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L561)

Invokes a function on starknet

#### Parameters

##### functionInvocation

[`Invocation`](../type-aliases/Invocation.md)

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

### invokeSignedTx()

> **invokeSignedTx**(`transaction`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/provider/rpc.ts:593](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L593)

Submit a pre-signed INVOKE_TXN_V3 transaction to the network.

Broadcasts a transaction previously built and signed by `Account.getSignedTransaction()`.
Fees are already included in the signed transaction and will not be re-estimated.

#### Parameters

##### transaction

[`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/type-aliases/INVOKE_TXN_V3.md)

A fully signed `RPC.INVOKE_TXN_V3` object, as returned by `Account.getSignedTransaction()`

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

The transaction hash if `waitMode` is disabled (default), or the transaction receipt if `waitMode` is enabled.

#### Remarks

- The transaction must be signed before calling this method ; use `Account.getSignedTransaction()` to produce it.
- Resubmitting the same signed transaction (same nonce) will be rejected by the network.
- If `waitMode` is enabled on the provider, this method waits for the transaction to be included in a block before returning.

#### Example

```typescript
const signedTx = await account.getSignedTransaction([
  { contractAddress: erc20Address, entrypoint: 'transfer', calldata: [recipient, amount, 0] },
]);
// inspect or store signedTx, then submit when ready:
const { transaction_hash } = await provider.invokeSignedTx(signedTx);
await provider.waitForTransaction(transaction_hash);
```

---

### declareContract()

> **declareContract**(`transaction`, `details`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/provider/rpc.ts:597](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L597)

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

### deployAccountContract()

> **deployAccountContract**(`transaction`, `details`): `Promise`\<\{ `contract_address`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/provider/rpc.ts:604](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L604)

Deploys a given compiled Account contract (json) to starknet

#### Parameters

##### transaction

[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)

##### details

[`InvocationsDetailsWithNonce`](../type-aliases/InvocationsDetailsWithNonce.md)

#### Returns

`Promise`\<\{ `contract_address`: `string`; `transaction_hash`: `string`; \}\>

a confirmation of sending a transaction on the starknet contract

---

### callContract()

> **callContract**(`call`, `blockIdentifier?`): `Promise`\<`string`[]\>

Defined in: [src/provider/rpc.ts:611](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L611)

Calls a function on the Starknet contract.

#### Parameters

##### call

[`Call`](../type-aliases/Call.md)

transaction to be called

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

#### Returns

`Promise`\<`string`[]\>

the result of the function on the smart contract.

---

### estimateMessageFee()

#### Call Signature

> **estimateMessageFee**\<`V`\>(`message`, `blockIdentifier?`): `Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md) : [`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md)\>

Defined in: [src/provider/rpc.ts:615](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L615)

Estimate the fee for a message from L1

##### Type Parameters

###### V

`V` _extends_ `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

##### Parameters

###### message

[`MSG_FROM_L1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MSG_FROM_L1.md)

L1 message

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier

##### Returns

`Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md) : [`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md)\>

Fee estimate

#### Call Signature

> **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<[`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md) \| [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md)\>

Defined in: [src/provider/rpc.ts:621](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L621)

##### Parameters

###### message

[`MSG_FROM_L1`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MSG_FROM_L1.md)

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

##### Returns

`Promise`\<[`MESSAGE_FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/MESSAGE_FEE_ESTIMATE.md) \| [`FEE_ESTIMATE`](../Starknet.js-API/namespaces/RPC/type-aliases/FEE_ESTIMATE.md)\>

---

### getSyncingStats()

> **getSyncingStats**(): `Promise`\<[`Syncing`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/Syncing.md)\>

Defined in: [src/provider/rpc.ts:632](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L632)

Get node synchronization status

#### Returns

`Promise`\<[`Syncing`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/Syncing.md)\>

Sync status or false if not syncing

---

### getEvents()

#### Call Signature

> **getEvents**\<`V`\>(`eventFilter`): `Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md) : [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md)\>

Defined in: [src/provider/rpc.ts:636](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L636)

Get events matching the given filter

##### Type Parameters

###### V

`V` _extends_ `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

##### Parameters

###### eventFilter

`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`EventFilter`](../Starknet.js-API/namespaces/RPC/type-aliases/EventFilter.md) : [`EventFilter`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EventFilter.md)

event filter

##### Returns

`Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md) : [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md)\>

Events and pagination info

#### Call Signature

> **getEvents**(`eventFilter`): `Promise`\<[`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md) \| [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md)\>

Defined in: [src/provider/rpc.ts:639](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L639)

##### Parameters

###### eventFilter

[`EventFilter`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EventFilter.md) \| [`EventFilter`](../Starknet.js-API/namespaces/RPC/type-aliases/EventFilter.md)

##### Returns

`Promise`\<[`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/EVENTS_CHUNK.md) \| [`EVENTS_CHUNK`](../Starknet.js-API/namespaces/RPC/type-aliases/EVENTS_CHUNK.md)\>

---

### verifyMessageInStarknet()

> **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`\<`boolean`\>

Defined in: [src/provider/rpc.ts:654](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L654)

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

> **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`\<`boolean`\>

Defined in: [src/provider/rpc.ts:671](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L671)

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

> **prepareInvocations**(`invocations`): `Promise`\<[`Invocations`](../type-aliases/Invocations.md)\>

Defined in: [src/provider/rpc.ts:699](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L699)

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

#### Call Signature

> **getL1MessagesStatus**\<`V`\>(`transactionHash`): `Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md) : [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md)\>

Defined in: [src/provider/rpc.ts:720](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L720)

Get L1 messages status for a transaction

##### Type Parameters

###### V

`V` _extends_ `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"` = `"0.9.0"` \| `"0.10.0"` \| `"0.10.2"` \| `"0.10.3"` \| `"0.10.4"`

##### Parameters

###### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

L1 transaction hash

##### Returns

`Promise`\<`V` _extends_ [`SupportedRpcVersion0_10`](../Starknet.js-API/namespaces/constants/type-aliases/SupportedRpcVersion0_10.md) ? [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md) : [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md)\>

L1 message status

#### Call Signature

> **getL1MessagesStatus**(`transactionHash`): `Promise`\<[`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md) \| [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md)\>

Defined in: [src/provider/rpc.ts:727](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L727)

##### Parameters

###### transactionHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### Returns

`Promise`\<[`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/namespaces/RPCSPEC09/type-aliases/L1L2MessagesStatus.md) \| [`L1L2MessagesStatus`](../Starknet.js-API/namespaces/RPC/type-aliases/L1L2MessagesStatus.md)\>

---

### getStorageProof()

> **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`\<[`StorageProof`](../Starknet.js-API/namespaces/RPC/type-aliases/StorageProof.md)\>

Defined in: [src/provider/rpc.ts:736](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L736)

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

> **getCompiledCasm**(`classHash`): `Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../Starknet.js-API/namespaces/RPC/type-aliases/CASM_COMPILED_CONTRACT_CLASS.md)\>

Defined in: [src/provider/rpc.ts:750](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L750)

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

> **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`\<[`TipEstimate`](../type-aliases/TipEstimate.md)\>

Defined in: [src/provider/rpc.ts:754](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/rpc.ts#L754)

Get transaction tip estimation based on network analysis

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

block identifier to analyze from

##### options?

[`TipAnalysisOptions`](../type-aliases/TipAnalysisOptions.md) = `{}`

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

---

### getStarkName()

> **getStarkName**(`address`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L26)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md).[`getStarkName`](../interfaces/StarknetIdProviderMethods.md#getstarkname)

---

### getAddressFromStarkName()

> **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L27)

#### Parameters

##### name

`string`

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md).[`getAddressFromStarkName`](../interfaces/StarknetIdProviderMethods.md#getaddressfromstarkname)

---

### getStarkProfile()

> **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

Defined in: [src/plugins/starknet-id/index.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L28)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

##### StarknetIdIdentityContract?

`string`

##### StarknetIdVerifierContract?

`string`

##### StarknetIdPfpContract?

`string`

##### StarknetIdPopContract?

`string`

##### StarknetIdMulticallContract?

`string`

#### Returns

`Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

#### Inherited from

[`StarknetIdProviderMethods`](../interfaces/StarknetIdProviderMethods.md).[`getStarkProfile`](../interfaces/StarknetIdProviderMethods.md#getstarkprofile)

---

### getBrotherName()

> **getBrotherName**(`address`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L47)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getBrotherName`](../interfaces/BrotherIdProviderMethods.md#getbrothername)

---

### getAddressFromBrotherName()

> **getAddressFromBrotherName**(`name`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L48)

#### Parameters

##### name

`string`

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getAddressFromBrotherName`](../interfaces/BrotherIdProviderMethods.md#getaddressfrombrothername)

---

### getBrotherProfile()

> **getBrotherProfile**(`address`, `BrotherIdContract?`): `Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

Defined in: [src/plugins/brother-id/index.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L49)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

#### Inherited from

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getBrotherProfile`](../interfaces/BrotherIdProviderMethods.md#getbrotherprofile)

---

### fastWaitForTransaction()

> **fastWaitForTransaction**(`txHash`, `address`, `initNonce`, `options?`): `Promise`\<`boolean`\>

Defined in: [src/plugins/fast-execute/types.ts:60](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L60)

Wait for transaction confirmation with polling optimization for gaming.

This method is fast but Events and transaction reports are not yet available.
Useful for gaming activity and rapid-fire transaction scenarios.

Only available on RPC 0.9 and onwards.

#### Parameters

##### txHash

[`BigNumberish`](../type-aliases/BigNumberish.md)

Transaction hash to monitor

##### address

`string`

Address of the account (used to track nonce changes)

##### initNonce

[`BigNumberish`](../type-aliases/BigNumberish.md)

Initial nonce of the account (before the transaction)

##### options?

[`FastWaitForTransactionOptions`](../type-aliases/FastWaitForTransactionOptions.md)

Polling configuration
options. `retries` is the number of times to retry (default: 50), `retryInterval` is the time in ms
between retries (default: 500).

#### Returns

`Promise`\<`boolean`\>

Returns true if the next transaction is possible (nonce increment detected),
false if the timeout has been reached, or throws an error in case of provider communication failure
or transaction reversion.

#### Example

```typescript
const isReady = await provider.fastWaitForTransaction('0x123abc...', '0x456def...', 10, {
  retries: 30,
  retryInterval: 500,
});

if (isReady) {
  // Next transaction can be sent
}
```

#### Inherited from

[`FastExecuteProviderMethods`](../interfaces/FastExecuteProviderMethods.md).[`fastWaitForTransaction`](../interfaces/FastExecuteProviderMethods.md#fastwaitfortransaction)
