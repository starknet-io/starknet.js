---
id: 'Provider'
title: 'Class: Provider'
sidebar_label: 'Provider'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RpcProvider`<`this`\> & `StarknetId`<`this`\>

  ↳ **`Provider`**

  ↳↳ [`Account`](Account.md)

## Constructors

### constructor

• **new Provider**(`optionsOrProvider?`): [`Provider`](Provider.md)

#### Parameters

| Name                 | Type                                                                                                                              |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions) \| [`ProviderInterface`](ProviderInterface.md) \| `RpcProvider` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).constructor

#### Defined in

[src/provider/rpc.ts:69](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L69)

• **new Provider**(): [`Provider`](Provider.md)

#### Returns

[`Provider`](Provider.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).constructor

## Properties

### responseParser

• **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).responseParser

#### Defined in

[src/provider/rpc.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L65)

---

### channel

• **channel**: [`RpcChannel`](RPC07.RpcChannel.md) \| [`RpcChannel`](RPC08.RpcChannel.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).channel

#### Defined in

[src/provider/rpc.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L67)

---

### getStateUpdate

• **getStateUpdate**: () => `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>(`blockIdentifier`: `"pending"`) => `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>(`blockIdentifier`: `"latest"`) => `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>(`blockIdentifier?`: [`BlockIdentifier`](../namespaces/types.md#blockidentifier)) => `Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

#### Type declaration

▸ (): `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

##### Returns

`Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

▸ (`blockIdentifier`): `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

##### Parameters

| Name              | Type        |
| :---------------- | :---------- |
| `blockIdentifier` | `"pending"` |

##### Returns

`Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

▸ (`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

##### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

##### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

▸ (`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

##### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

##### Returns

`Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStateUpdate

#### Defined in

[src/provider/rpc.ts:268](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L268)

## Methods

### create

▸ **create**<`T`\>(`this`, `optionsOrProvider?`): `Promise`<`T`\>

auto configure channel based on provided node
leave space for other async before constructor

#### Type parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `T`  | extends `RpcProvider`<`T`\> |

#### Parameters

| Name                 | Type                                                                                             |
| :------------------- | :----------------------------------------------------------------------------------------------- |
| `this`               | (...`args`: [optionsOrProvider?: RpcProviderOptions \| ProviderInterface \| RpcProvider]) => `T` |
| `optionsOrProvider?` | [`RpcProviderOptions`](../namespaces/types.md#rpcprovideroptions)                                |

#### Returns

`Promise`<`T`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).create

#### Defined in

[src/provider/rpc.ts:101](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L101)

---

### getStarkName

▸ **getStarkName**(`provider`, `address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `provider`            | [`ProviderInterface`](ProviderInterface.md)           |
| `address`             | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?` | `string`                                              |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:62](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L62)

---

### getAddressFromStarkName

▸ **getAddressFromStarkName**(`provider`, `name`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                        |
| :-------------------- | :------------------------------------------ |
| `provider`            | [`ProviderInterface`](ProviderInterface.md) |
| `name`                | `string`                                    |
| `StarknetIdContract?` | `string`                                    |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getAddressFromStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:96](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L96)

---

### getStarkProfile

▸ **getStarkProfile**(`provider`, `address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../namespaces/types.md#starkprofile)\>

#### Parameters

| Name                           | Type                                                  |
| :----------------------------- | :---------------------------------------------------- |
| `provider`                     | [`ProviderInterface`](ProviderInterface.md)           |
| `address`                      | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                              |
| `StarknetIdIdentityContract?`  | `string`                                              |
| `StarknetIdVerifierContract?`  | `string`                                              |
| `StarknetIdPfpContract?`       | `string`                                              |
| `StarknetIdPopContract?`       | `string`                                              |
| `StarknetIdMulticallContract?` | `string`                                              |

#### Returns

`Promise`<[`StarkProfile`](../namespaces/types.md#starkprofile)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStarkProfile

#### Defined in

[src/provider/extensions/starknetId.ts:128](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L128)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`<`Response`\>

#### Parameters

| Name      | Type                 | Default value |
| :-------- | :------------------- | :------------ |
| `method`  | `string`             | `undefined`   |
| `params?` | `object`             | `undefined`   |
| `id`      | `string` \| `number` | `0`           |

#### Returns

`Promise`<`Response`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).fetch

#### Defined in

[src/provider/rpc.ts:131](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L131)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getChainId

#### Defined in

[src/provider/rpc.ts:135](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L135)

---

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.7.1"` \| `"0.8.1"`

read channel spec version

#### Returns

`undefined` \| `"0.7.1"` \| `"0.8.1"`

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).readSpecVersion

#### Defined in

[src/provider/rpc.ts:142](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L142)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

get channel spec version

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getSpecVersion

#### Defined in

[src/provider/rpc.ts:149](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L149)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.7.1"` \| `"0.8.1"`\>

setup channel spec version and return it

#### Returns

`Promise`<`"0.7.1"` \| `"0.8.1"`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).setUpSpecVersion

#### Defined in

[src/provider/rpc.ts:156](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L156)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getNonceForAddress

#### Defined in

[src/provider/rpc.ts:160](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L160)

---

### getBlock

▸ **getBlock**(): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlock

#### Defined in

[src/provider/rpc.ts:167](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L167)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

#### Parameters

| Name              | Type        |
| :---------------- | :---------- |
| `blockIdentifier` | `"pending"` |

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlock

#### Defined in

[src/provider/rpc.ts:168](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L168)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/types.RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/types.RPC.RPCSPEC08.API.md#l1_da_mode-1) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlock

#### Defined in

[src/provider/rpc.ts:169](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L169)

▸ **getBlock**(`blockIdentifier?`): `Promise`<[`GetBlockResponse`](../namespaces/types.md#getblockresponse)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`GetBlockResponse`](../namespaces/types.md#getblockresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlock

#### Defined in

[src/provider/rpc.ts:170](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L170)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/types.RPC.RPCSPEC07.API.md#blockhashandnumber)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockLatestAccepted

#### Defined in

[src/provider/rpc.ts:180](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L180)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number
redundant use getBlockLatestAccepted();

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockNumber

#### Defined in

[src/provider/rpc.ts:189](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L189)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockWithTxHashes`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxhashes)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockWithTxHashes

#### Defined in

[src/provider/rpc.ts:193](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L193)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxs)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockWithTxs`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxs)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockWithTxs

#### Defined in

[src/provider/rpc.ts:197](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L197)

---

### waitForBlock

▸ **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`<`void`\>

Pause the execution of the script until a specified block is created.

#### Parameters

| Name              | Type                                                        | Default value | Description                                                                                                                |
| :---------------- | :---------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | `'pending'`   | bloc number (BigNumberish) or 'pending' or 'latest'. Use of 'latest" or of a block already created will generate no pause. |
| `retryInterval?`  | `number`                                                    | `5000`        | number of milliseconds between 2 requests to the node                                                                      |

#### Returns

`Promise`<`void`\>

**`Example`**

```typescript
await myProvider.waitForBlock();
// wait the creation of the pending block
```

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).waitForBlock

#### Defined in

[src/provider/rpc.ts:212](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L212)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getL1GasPrice

#### Defined in

[src/provider/rpc.ts:242](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L242)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`<`string`\>

#### Parameters

| Name       | Type                                                  |
| :--------- | :---------------------------------------------------- |
| `l2TxHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getL1MessageHash

#### Defined in

[src/provider/rpc.ts:248](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L248)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| [`BlockWithTxReceipts`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxreceipts)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/types.RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/types.RPC.RPCSPEC08.API.md#pending_block_header)\> \| [`BlockWithTxReceipts`](../namespaces/types.RPC.RPCSPEC07.API.md#blockwithtxreceipts)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockWithReceipts

#### Defined in

[src/provider/rpc.ts:264](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L264)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(): `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Returns

`Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:270](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L270)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Parameters

| Name              | Type        |
| :---------------- | :---------- |
| `blockIdentifier` | `"pending"` |

#### Returns

`Promise`<\{ `block_hash`: `never` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:271](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L271)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ storage_diffs: \{ address: string; storage_entries: \{ key: string; value: string; }[]; }[]; deprecated_declared_classes: string[]; declared_classes: \{ class_hash: string; compiled_class_hash: string; }[]; deployed_contracts: \{ address: string; class_hash: string; }[]; replaced_classes: \{ contract_address: string; class_hash: string; }[]; nonces: \{ nonce: string; contract_address: string; }[]; } }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:272](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L272)

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`StateUpdateResponse`](../namespaces/types.md#stateupdateresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:273](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L273)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC07.API.md#blocktransactionstraces)\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/types.RPC.RPCSPEC07.API.md#blocktransactionstraces)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockTransactionsTraces

#### Defined in

[src/provider/rpc.ts:278](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L278)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`number`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getBlockTransactionCount

#### Defined in

[src/provider/rpc.ts:282](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L282)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransaction

#### Defined in

[src/provider/rpc.ts:286](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L286)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransactionByHash

#### Defined in

[src/provider/rpc.ts:290](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L290)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Parameters

| Name              | Type                                                        |
| :---------------- | :---------------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |
| `index`           | `number`                                                    |

#### Returns

`Promise`<[`TransactionWithHash`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionwithhash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransactionByBlockIdAndIndex

#### Defined in

[src/provider/rpc.ts:294](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L294)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransactionReceipt

#### Defined in

[src/provider/rpc.ts:298](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L298)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/types.md#transaction_trace)\>

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `txHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/types.md#transaction_trace)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransactionTrace

#### Defined in

[src/provider/rpc.ts:305](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L305)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionstatus)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`TransactionStatus`](../namespaces/types.RPC.RPCSPEC07.API.md#transactionstatus)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getTransactionStatus

#### Defined in

[src/provider/rpc.ts:312](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L312)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

#### Parameters

| Name          | Type                                                                                    | Description                                                                                                                                                     |
| :------------ | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)                       | AccountInvocations                                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../namespaces/types.md#getsimulatetransactionoptions) | blockIdentifier and flags to skip validation and fee charge<br/> - blockIdentifier<br/> - skipValidate (default false)<br/> - skipFeeCharge (default true)<br/> |

#### Returns

`Promise`<[`SimulateTransactionResponse`](../namespaces/types.md#simulatetransactionresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getSimulateTransaction

#### Defined in

[src/provider/rpc.ts:323](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L323)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

#### Parameters

| Name       | Type                                                                            |
| :--------- | :------------------------------------------------------------------------------ |
| `txHash`   | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../namespaces/types.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).waitForTransaction

#### Defined in

[src/provider/rpc.ts:333](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L333)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `key`              | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStorageAt

#### Defined in

[src/provider/rpc.ts:345](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L345)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getClassHashAt

#### Defined in

[src/provider/rpc.ts:353](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L353)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name        | Type                                                  |
| :---------- | :---------------------------------------------------- |
| `classHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getClassByHash

#### Defined in

[src/provider/rpc.ts:357](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L357)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `classHash`        | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getClass

#### Defined in

[src/provider/rpc.ts:361](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L361)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../namespaces/types.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<[`LegacyContractClass`](../namespaces/types.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../namespaces/types.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getClassAt

#### Defined in

[src/provider/rpc.ts:367](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L367)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Parameters

| Name              | Type                                                                            |
| :---------------- | :------------------------------------------------------------------------------ |
| `contractAddress` | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `classHash?`      | `undefined`                                                                     |
| `options?`        | [`getContractVersionOptions`](../namespaces/types.md#getcontractversionoptions) |

#### Returns

`Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getContractVersion

#### Defined in

[src/provider/rpc.ts:373](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L373)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Parameters

| Name              | Type                                                                            |
| :---------------- | :------------------------------------------------------------------------------ |
| `contractAddress` | `undefined`                                                                     |
| `classHash`       | [`BigNumberish`](../namespaces/types.md#bignumberish)                           |
| `options?`        | [`getContractVersionOptions`](../namespaces/types.md#getcontractversionoptions) |

#### Returns

`Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getContractVersion

#### Defined in

[src/provider/rpc.ts:378](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L378)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `invocationDetails`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Parameters

| Name                | Type                                                                                |
| :------------------ | :---------------------------------------------------------------------------------- |
| `invocation`        | [`Invocation`](../namespaces/types.md#invocation)                                   |
| `invocationDetails` | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |
| `blockIdentifier?`  | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         |
| `skipValidate?`     | `boolean`                                                                           |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getInvokeEstimateFee

#### Defined in

[src/provider/rpc.ts:411](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L411)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Parameters

| Name               | Type                                                                                |
| :----------------- | :---------------------------------------------------------------------------------- |
| `invocation`       | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                         |
| `skipValidate?`    | `boolean`                                                                           |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getDeclareEstimateFee

#### Defined in

[src/provider/rpc.ts:431](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L431)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Parameters

| Name               | Type                                                                                          |
| :----------------- | :-------------------------------------------------------------------------------------------- |
| `invocation`       | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) |
| `details`          | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                   |
| `skipValidate?`    | `boolean`                                                                                     |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getDeployAccountEstimateFee

#### Defined in

[src/provider/rpc.ts:451](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L451)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options`): `Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

#### Parameters

| Name          | Type                                                                            |
| :------------ | :------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../namespaces/types.md#accountinvocations)               |
| `options`     | [`getEstimateFeeBulkOptions`](../namespaces/types.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`EstimateFeeResponseBulk`](../namespaces/types.md#estimatefeeresponsebulk)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getEstimateFeeBulk

#### Defined in

[src/provider/rpc.ts:471](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L471)

---

### invokeFunction

▸ **invokeFunction**(`functionInvocation`, `details`): `Promise`<\{ `transaction_hash`: `string` }\>

#### Parameters

| Name                 | Type                                                                                |
| :------------------- | :---------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../namespaces/types.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).invokeFunction

#### Defined in

[src/provider/rpc.ts:480](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L480)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

#### Parameters

| Name          | Type                                                                                |
| :------------ | :---------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../namespaces/types.md#declarecontracttransaction)   |
| `details`     | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).declareContract

#### Defined in

[src/provider/rpc.ts:487](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L487)

---

### deployAccountContract

▸ **deployAccountContract**(`transaction`, `details`): `Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

#### Parameters

| Name          | Type                                                                                          |
| :------------ | :-------------------------------------------------------------------------------------------- |
| `transaction` | [`DeployAccountContractTransaction`](../namespaces/types.md#deployaccountcontracttransaction) |
| `details`     | [`InvocationsDetailsWithNonce`](../namespaces/types.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).deployAccountContract

#### Defined in

[src/provider/rpc.ts:494](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L494)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<`string`[]\>

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `call`             | [`Call`](../namespaces/types.md#call)                       |
| `blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).callContract

#### Defined in

[src/provider/rpc.ts:501](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L501)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<\{ `unit`: `"WEI"` \| `"FRI"` ; `overall_fee`: `string` \| `number` ; `l1_gas_price`: `undefined` \| `number` ; `l2_gas_price`: `undefined` \| `number` ; `l1_data_gas_price`: `undefined` \| `number` ; `l1_gas_consumed`: `undefined` \| `number` ; `l2_gas_consumed`: `undefined` \| `number` ; `l1_data_gas_consumed`: `undefined` \| `number` ; `gas_consumed`: `undefined` \| `string` ; `gas_price`: `undefined` \| `string` ; `data_gas_consumed`: `undefined` \| `string` ; `data_gas_price`: `undefined` \| `string` }\>

NEW: Estimate the fee for a message from L1

#### Parameters

| Name                           | Type                                                        | Description     |
| :----------------------------- | :---------------------------------------------------------- | :-------------- |
| `message`                      | `Object`                                                    | Message From L1 |
| `message.entry_point_selector` | `string`                                                    | -               |
| `message.from_address`         | `string`                                                    | -               |
| `message.to_address`           | `string`                                                    | -               |
| `message.payload`              | `string`[]                                                  | -               |
| `blockIdentifier?`             | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -               |

#### Returns

`Promise`<\{ `unit`: `"WEI"` \| `"FRI"` ; `overall_fee`: `string` \| `number` ; `l1_gas_price`: `undefined` \| `number` ; `l2_gas_price`: `undefined` \| `number` ; `l1_data_gas_price`: `undefined` \| `number` ; `l1_gas_consumed`: `undefined` \| `number` ; `l2_gas_consumed`: `undefined` \| `number` ; `l1_data_gas_consumed`: `undefined` \| `number` ; `gas_consumed`: `undefined` \| `string` ; `gas_price`: `undefined` \| `string` ; `data_gas_consumed`: `undefined` \| `string` ; `data_gas_price`: `undefined` \| `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).estimateMessageFee

#### Defined in

[src/provider/rpc.ts:509](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L509)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Returns an object about the sync status, or false if the node is not synching

#### Returns

`Promise`<[`Syncing`](../namespaces/types.RPC.RPCSPEC07.API.md#syncing)\>

Object with the stats data

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getSyncingStats

#### Defined in

[src/provider/rpc.ts:520](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L520)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<\{ `events`: \{ keys: string[]; data: string[]; block_number: number; block_hash: string; transaction_hash: string; from_address: string; }[] ; `continuation_token`: `undefined` \| `string` }\>

Returns all events matching the given filter

#### Parameters

| Name          | Type                                                                  |
| :------------ | :-------------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/types.RPC.RPCSPEC08.API.md#eventfilter) |

#### Returns

`Promise`<\{ `events`: \{ keys: string[]; data: string[]; block_number: number; block_hash: string; transaction_hash: string; from_address: string; }[] ; `continuation_token`: `undefined` \| `string` }\>

events and the pagination of the events

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getEvents

#### Defined in

[src/provider/rpc.ts:528](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L528)

---

### verifyMessageInStarknet

▸ **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`<`boolean`\>

Verify in Starknet a signature of a TypedData object or of a given hash.

#### Parameters

| Name                                        | Type                                                                                                                              | Description                                                               |
| :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `message`                                   | [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) \| [`BigNumberish`](../namespaces/types.md#bignumberish) | TypedData object to be verified, or message hash to be verified.          |
| `signature`                                 | [`Signature`](../namespaces/types.md#signature)                                                                                   | signature of the message.                                                 |
| `accountAddress`                            | [`BigNumberish`](../namespaces/types.md#bignumberish)                                                                             | address of the account that has signed the message.                       |
| `signatureVerificationFunctionName?`        | `string`                                                                                                                          | if account contract with non standard account verification function name. |
| `signatureVerificationResponse?`            | `Object`                                                                                                                          | if account contract with non standard response of verification function.  |
| `signatureVerificationResponse.okResponse`  | `string`[]                                                                                                                        | -                                                                         |
| `signatureVerificationResponse.nokResponse` | `string`[]                                                                                                                        | -                                                                         |
| `signatureVerificationResponse.error`       | `string`[]                                                                                                                        | -                                                                         |

#### Returns

`Promise`<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).verifyMessageInStarknet

#### Defined in

[src/provider/rpc.ts:550](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L550)

---

### isClassDeclared

▸ **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`<`boolean`\>

Test if class is already declared from ContractClassIdentifier
Helper method using getClass

#### Parameters

| Name                      | Type                                                                        |
| :------------------------ | :-------------------------------------------------------------------------- |
| `contractClassIdentifier` | [`ContractClassIdentifier`](../namespaces/types.md#contractclassidentifier) |
| `blockIdentifier?`        | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                 |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).isClassDeclared

#### Defined in

[src/provider/rpc.ts:636](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L636)

---

### prepareInvocations

▸ **prepareInvocations**(`invocations`): `Promise`<[`Invocations`](../namespaces/types.md#invocations)\>

Build bulk invocations with auto-detect declared class

1. Test if class is declared if not declare it preventing already declared class error and not declared class errors
2. Order declarations first

#### Parameters

| Name          | Type                                                |
| :------------ | :-------------------------------------------------- |
| `invocations` | [`Invocations`](../namespaces/types.md#invocations) |

#### Returns

`Promise`<[`Invocations`](../namespaces/types.md#invocations)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).prepareInvocations

#### Defined in

[src/provider/rpc.ts:667](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L667)

---

### getL1MessagesStatus

▸ **getL1MessagesStatus**(`transactionHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/types.RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order

#### Parameters

| Name              | Type                                                  |
| :---------------- | :---------------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/types.RPC.RPCSPEC08.API.md#l1l2messagesstatus)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getL1MessagesStatus

#### Defined in

[src/provider/rpc.ts:691](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L691)

---

### getStorageProof

▸ **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/types.RPC.RPCSPEC08.API.md#storageproof)\>

Get merkle paths in one of the state tries: global state, classes, individual contract

#### Parameters

| Name                   | Type                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------ |
| `classHashes`          | [`BigNumberish`](../namespaces/types.md#bignumberish)[]                                     |
| `contractAddresses`    | [`BigNumberish`](../namespaces/types.md#bignumberish)[]                                     |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/types.RPC.RPCSPEC08.API.md#contract_storage_keys)[] |
| `blockIdentifier?`     | [`BlockIdentifier`](../namespaces/types.md#blockidentifier)                                 |

#### Returns

`Promise`<[`StorageProof`](../namespaces/types.RPC.RPCSPEC08.API.md#storageproof)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStorageProof

#### Defined in

[src/provider/rpc.ts:702](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L702)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

Get the contract class definition in the given block associated with the given hash

#### Parameters

| Name        | Type                                                  |
| :---------- | :---------------------------------------------------- |
| `classHash` | [`BigNumberish`](../namespaces/types.md#bignumberish) |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/types.RPC.RPCSPEC08.API.md#casm_compiled_contract_class)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getCompiledCasm

#### Defined in

[src/provider/rpc.ts:723](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/rpc.ts#L723)

---

### getStarkName

▸ **getStarkName**(`address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `address`             | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?` | `string`                                              |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:22](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L22)

---

### getAddressFromStarkName

▸ **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `name`                | `string` |
| `StarknetIdContract?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getAddressFromStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:31](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L31)

---

### getStarkProfile

▸ **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../namespaces/types.md#starkprofile)\>

#### Parameters

| Name                           | Type                                                  |
| :----------------------------- | :---------------------------------------------------- |
| `address`                      | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                              |
| `StarknetIdIdentityContract?`  | `string`                                              |
| `StarknetIdVerifierContract?`  | `string`                                              |
| `StarknetIdPfpContract?`       | `string`                                              |
| `StarknetIdPopContract?`       | `string`                                              |
| `StarknetIdMulticallContract?` | `string`                                              |

#### Returns

`Promise`<[`StarkProfile`](../namespaces/types.md#starkprofile)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId).getStarkProfile

#### Defined in

[src/provider/extensions/starknetId.ts:40](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/provider/extensions/starknetId.ts#L40)
