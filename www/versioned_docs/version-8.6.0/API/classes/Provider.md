---
id: 'Provider'
title: 'Class: Provider'
sidebar_label: 'Provider'
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RpcProvider`<`this`\> & `StarknetId`<`this`\> & `BrotherId`<`this`\>

  ↳ **`Provider`**

  ↳↳ [`Account`](Account.md)

## Constructors

### constructor

• **new Provider**(`optionsOrProvider?`): [`Provider`](Provider.md)

#### Parameters

| Name                 | Type                                                                                                                     |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `optionsOrProvider?` | [`RpcProviderOptions`](../modules.md#rpcprovideroptions) \| [`ProviderInterface`](ProviderInterface.md) \| `RpcProvider` |

#### Returns

[`Provider`](Provider.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).constructor

#### Defined in

[src/provider/rpc.ts:66](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L66)

• **new Provider**(): [`Provider`](Provider.md)

#### Returns

[`Provider`](Provider.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).constructor

## Properties

### responseParser

• **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).responseParser

#### Defined in

[src/provider/rpc.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L62)

---

### channel

• **channel**: [`RpcChannel`](RPC08.RpcChannel.md) \| [`RpcChannel`](RPC09.RpcChannel.md)

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).channel

#### Defined in

[src/provider/rpc.ts:64](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L64)

---

### getStateUpdate

• **getStateUpdate**: () => `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>(`blockIdentifier`: `"pre_confirmed"`) => `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>(`blockIdentifier`: `"latest"`) => `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>(`blockIdentifier?`: [`BlockIdentifier`](../modules.md#blockidentifier)) => `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Type declaration

▸ (): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

##### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

▸ (`blockIdentifier`): `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

##### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

##### Returns

`Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

▸ (`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

##### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

##### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

▸ (`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

##### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

##### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStateUpdate

#### Defined in

[src/provider/rpc.ts:256](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L256)

## Methods

### create

▸ **create**<`T`\>(`this`, `optionsOrProvider?`): `Promise`<`T`\>

auto configure channel based on provided node
leave space for other async before constructor

#### Type parameters

| Name | Type                  |
| :--- | :-------------------- |
| `T`  | extends `RpcProvider` |

#### Parameters

| Name                 | Type                                                                                             |
| :------------------- | :----------------------------------------------------------------------------------------------- |
| `this`               | (...`args`: [optionsOrProvider?: RpcProviderOptions \| ProviderInterface \| RpcProvider]) => `T` |
| `optionsOrProvider?` | [`RpcProviderOptions`](../modules.md#rpcprovideroptions)                                         |

#### Returns

`Promise`<`T`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).create

#### Defined in

[src/provider/rpc.ts:98](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L98)

---

### getStarkName

▸ **getStarkName**(`provider`, `address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                         |
| :-------------------- | :------------------------------------------- |
| `provider`            | [`ProviderInterface`](ProviderInterface.md)  |
| `address`             | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?` | `string`                                     |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L62)

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

Mixin(BaseRpcProvider, StarknetId, BrotherId).getAddressFromStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:96](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L96)

---

### getStarkProfile

▸ **getStarkProfile**(`provider`, `address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Parameters

| Name                           | Type                                         |
| :----------------------------- | :------------------------------------------- |
| `provider`                     | [`ProviderInterface`](ProviderInterface.md)  |
| `address`                      | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                     |
| `StarknetIdIdentityContract?`  | `string`                                     |
| `StarknetIdVerifierContract?`  | `string`                                     |
| `StarknetIdPfpContract?`       | `string`                                     |
| `StarknetIdPopContract?`       | `string`                                     |
| `StarknetIdMulticallContract?` | `string`                                     |

#### Returns

`Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStarkProfile

#### Defined in

[src/provider/extensions/starknetId.ts:128](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L128)

---

### getBrotherName

▸ **getBrotherName**(`provider`, `address`, `BrotherIdContract?`): `Promise`<`string`\>

Static implementation of getBrotherName

#### Parameters

| Name                 | Type                                         | Description                       |
| :------------------- | :------------------------------------------- | :-------------------------------- |
| `provider`           | [`ProviderInterface`](ProviderInterface.md)  | The provider interface            |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the domain for |
| `BrotherIdContract?` | `string`                                     | Optional contract address         |

#### Returns

`Promise`<`string`\>

The domain name with .brother suffix

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBrotherName

#### Defined in

[src/provider/extensions/brotherId.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L148)

---

### getAddressFromBrotherName

▸ **getAddressFromBrotherName**(`provider`, `name`, `BrotherIdContract?`): `Promise`<`string`\>

Static implementation of getAddressFromBrotherName

#### Parameters

| Name                 | Type                                        | Description               |
| :------------------- | :------------------------------------------ | :------------------------ |
| `provider`           | [`ProviderInterface`](ProviderInterface.md) | The provider interface    |
| `name`               | `string`                                    | The domain name           |
| `BrotherIdContract?` | `string`                                    | Optional contract address |

#### Returns

`Promise`<`string`\>

The resolver address

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getAddressFromBrotherName

#### Defined in

[src/provider/extensions/brotherId.ts:186](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L186)

---

### getBrotherProfile

▸ **getBrotherProfile**(`provider`, `address`, `BrotherIdContract?`): `Promise`<`BrotherProfile`\>

Static implementation of getBrotherProfile

#### Parameters

| Name                 | Type                                         | Description                        |
| :------------------- | :------------------------------------------- | :--------------------------------- |
| `provider`           | [`ProviderInterface`](ProviderInterface.md)  | The provider interface             |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the profile for |
| `BrotherIdContract?` | `string`                                     | Optional contract address          |

#### Returns

`Promise`<`BrotherProfile`\>

The complete Brother profile

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBrotherProfile

#### Defined in

[src/provider/extensions/brotherId.ts:226](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L226)

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

Mixin(BaseRpcProvider, StarknetId, BrotherId).fetch

#### Defined in

[src/provider/rpc.ts:128](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L128)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getChainId

#### Defined in

[src/provider/rpc.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L132)

---

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.8.1"` \| `"0.9.0"`

#### Returns

`undefined` \| `"0.8.1"` \| `"0.9.0"`

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).readSpecVersion

#### Defined in

[src/provider/rpc.ts:136](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L136)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getSpecVersion

#### Defined in

[src/provider/rpc.ts:140](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L140)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.8.1"` \| `"0.9.0"`\>

#### Returns

`Promise`<`"0.8.1"` \| `"0.9.0"`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).setUpSpecVersion

#### Defined in

[src/provider/rpc.ts:144](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L144)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getNonceForAddress

#### Defined in

[src/provider/rpc.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L148)

---

### getBlock

▸ **getBlock**(): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlock

#### Defined in

[src/provider/rpc.ts:155](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L155)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlock

#### Defined in

[src/provider/rpc.ts:156](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L156)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlock

#### Defined in

[src/provider/rpc.ts:157](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L157)

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlock

#### Defined in

[src/provider/rpc.ts:158](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L158)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockLatestAccepted

#### Defined in

[src/provider/rpc.ts:165](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L165)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockNumber

#### Defined in

[src/provider/rpc.ts:169](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L169)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockWithTxHashes

#### Defined in

[src/provider/rpc.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L173)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockWithTxs

#### Defined in

[src/provider/rpc.ts:177](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L177)

---

### waitForBlock

▸ **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`<`void`\>

#### Parameters

| Name              | Type                                               | Default value     |
| :---------------- | :------------------------------------------------- | :---------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | `BlockTag.LATEST` |
| `retryInterval`   | `number`                                           | `5000`            |

#### Returns

`Promise`<`void`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).waitForBlock

#### Defined in

[src/provider/rpc.ts:181](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L181)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getL1GasPrice

#### Defined in

[src/provider/rpc.ts:212](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L212)

---

### getGasPrices

▸ **getGasPrices**(`blockIdentifier?`): `Promise`<[`GasPrices`](../modules.md#gasprices)\>

Get the gas prices related to a block.

#### Parameters

| Name               | Type                                               | Description                                                               |
| :----------------- | :------------------------------------------------- | :------------------------------------------------------------------------ |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | Optional. Can be 'pending', 'latest' or a block number (an integer type). |

#### Returns

`Promise`<[`GasPrices`](../modules.md#gasprices)\>

an object with l1DataGasPrice, l1GasPrice, l2GasPrice properties (all bigint type).

**`Example`**

```ts
const result = await myProvider.getGasPrices();
// result = { l1DataGasPrice: 3039n, l1GasPrice: 55590341542890n, l2GasPrice: 8441845008n }
```

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getGasPrices

#### Defined in

[src/provider/rpc.ts:228](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L228)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`<`string`\>

#### Parameters

| Name       | Type                                         |
| :--------- | :------------------------------------------- |
| `l2TxHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getL1MessageHash

#### Defined in

[src/provider/rpc.ts:236](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L236)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockWithReceipts

#### Defined in

[src/provider/rpc.ts:252](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L252)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:258](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L258)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:259](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L259)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:262](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L262)

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockStateUpdate

#### Defined in

[src/provider/rpc.ts:263](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L263)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockTransactionsTraces

#### Defined in

[src/provider/rpc.ts:268](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L268)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`number`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBlockTransactionCount

#### Defined in

[src/provider/rpc.ts:272](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L272)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransaction

#### Defined in

[src/provider/rpc.ts:276](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L276)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransactionByHash

#### Defined in

[src/provider/rpc.ts:280](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L280)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |
| `index`           | `number`                                           |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransactionByBlockIdAndIndex

#### Defined in

[src/provider/rpc.ts:284](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L284)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransactionReceipt

#### Defined in

[src/provider/rpc.ts:288](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L288)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransactionTrace

#### Defined in

[src/provider/rpc.ts:295](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L295)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result) \| [`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result) \| [`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getTransactionStatus

#### Defined in

[src/provider/rpc.ts:301](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L301)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

#### Parameters

| Name          | Type                                                                           |
| :------------ | :----------------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)                       |
| `options?`    | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) |

#### Returns

`Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getSimulateTransaction

#### Defined in

[src/provider/rpc.ts:305](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L305)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

#### Parameters

| Name       | Type                                                                   |
| :--------- | :--------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).waitForTransaction

#### Defined in

[src/provider/rpc.ts:315](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L315)

---

### fastWaitForTransaction

▸ **fastWaitForTransaction**(`txHash`, `address`, `initNonce`, `options?`): `Promise`<`boolean`\>

Wait up until a new transaction is possible with same the account.
This method is fast, but Events and transaction report are not yet
available. Useful for gaming activity.

- only rpc 0.9 and onwards.

#### Parameters

| Name        | Type                                                                           | Description                                                                                               |
| :---------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `txHash`    | [`BigNumberish`](../modules.md#bignumberish)                                   | transaction hash                                                                                          |
| `address`   | `string`                                                                       | address of the account                                                                                    |
| `initNonce` | [`BigNumberish`](../modules.md#bignumberish)                                   | initial nonce of the account (before the transaction).                                                    |
| `options?`  | [`fastWaitForTransactionOptions`](../modules.md#fastwaitfortransactionoptions) | options to scan the network for the next possible transaction. `retries` is the number of times to retry. |

#### Returns

`Promise`<`boolean`\>

Returns true if the next transaction is possible,
false if the timeout has been reached,
throw an error in case of provider communication.

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).fastWaitForTransaction

#### Defined in

[src/provider/rpc.ts:340](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L340)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |
| `key`              | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStorageAt

#### Defined in

[src/provider/rpc.ts:358](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L358)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getClassHashAt

#### Defined in

[src/provider/rpc.ts:366](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L366)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name        | Type                                         |
| :---------- | :------------------------------------------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getClassByHash

#### Defined in

[src/provider/rpc.ts:370](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L370)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `classHash`        | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getClass

#### Defined in

[src/provider/rpc.ts:374](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L374)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getClassAt

#### Defined in

[src/provider/rpc.ts:380](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L380)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Parameters

| Name              | Type                                                                   |
| :---------------- | :--------------------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)                           |
| `classHash?`      | `undefined`                                                            |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getContractVersion

#### Defined in

[src/provider/rpc.ts:386](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L386)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Parameters

| Name              | Type                                                                   |
| :---------------- | :--------------------------------------------------------------------- |
| `contractAddress` | `undefined`                                                            |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)                           |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getContractVersion

#### Defined in

[src/provider/rpc.ts:391](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L391)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Parameters

| Name               | Type                                                                       |
| :----------------- | :------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../modules.md#invocation)                                   |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         |
| `skipValidate?`    | `boolean`                                                                  |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getInvokeEstimateFee

#### Defined in

[src/provider/rpc.ts:424](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L424)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Parameters

| Name               | Type                                                                       |
| :----------------- | :------------------------------------------------------------------------- |
| `invocation`       | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         |
| `skipValidate?`    | `boolean`                                                                  |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getDeclareEstimateFee

#### Defined in

[src/provider/rpc.ts:438](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L438)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Parameters

| Name               | Type                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- |
| `invocation`       | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                                   |
| `skipValidate?`    | `boolean`                                                                            |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getDeployAccountEstimateFee

#### Defined in

[src/provider/rpc.ts:452](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L452)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

#### Parameters

| Name          | Type                                                                   |
| :------------ | :--------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)               |
| `options?`    | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) |

#### Returns

`Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getEstimateFeeBulk

#### Defined in

[src/provider/rpc.ts:466](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L466)

---

### invokeFunction

▸ **invokeFunction**(`functionInvocation`, `details`): `Promise`<\{ `transaction_hash`: `string` }\>

#### Parameters

| Name                 | Type                                                                       |
| :------------------- | :------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../modules.md#invocation)                                   |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).invokeFunction

#### Defined in

[src/provider/rpc.ts:475](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L475)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

#### Parameters

| Name          | Type                                                                       |
| :------------ | :------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).declareContract

#### Defined in

[src/provider/rpc.ts:482](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L482)

---

### deployAccountContract

▸ **deployAccountContract**(`transaction`, `details`): `Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

#### Parameters

| Name          | Type                                                                                 |
| :------------ | :----------------------------------------------------------------------------------- |
| `transaction` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           |

#### Returns

`Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).deployAccountContract

#### Defined in

[src/provider/rpc.ts:489](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L489)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<`string`[]\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `call`             | [`Call`](../modules.md#call)                       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).callContract

#### Defined in

[src/provider/rpc.ts:496](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L496)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

#### Parameters

| Name               | Type                                                            |
| :----------------- | :-------------------------------------------------------------- |
| `message`          | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC09.API.md#msg_from_l1) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)              |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).estimateMessageFee

#### Defined in

[src/provider/rpc.ts:500](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L500)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

#### Returns

`Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getSyncingStats

#### Defined in

[src/provider/rpc.ts:507](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L507)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

#### Parameters

| Name          | Type                                                                                                                               |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC08.API.md#eventfilter) \| [`EventFilter`](../namespaces/RPC.RPCSPEC09.API.md#eventfilter) |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getEvents

#### Defined in

[src/provider/rpc.ts:511](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L511)

---

### verifyMessageInStarknet

▸ **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`<`boolean`\>

#### Parameters

| Name                                        | Type                                                                                                               |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| `message`                                   | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) \| [`BigNumberish`](../modules.md#bignumberish) |
| `signature`                                 | [`Signature`](../modules.md#signature)                                                                             |
| `accountAddress`                            | [`BigNumberish`](../modules.md#bignumberish)                                                                       |
| `signatureVerificationFunctionName?`        | `string`                                                                                                           |
| `signatureVerificationResponse?`            | `Object`                                                                                                           |
| `signatureVerificationResponse.okResponse`  | `string`[]                                                                                                         |
| `signatureVerificationResponse.nokResponse` | `string`[]                                                                                                         |
| `signatureVerificationResponse.error`       | `string`[]                                                                                                         |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).verifyMessageInStarknet

#### Defined in

[src/provider/rpc.ts:523](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L523)

---

### isClassDeclared

▸ **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`<`boolean`\>

#### Parameters

| Name                      | Type                                                               |
| :------------------------ | :----------------------------------------------------------------- |
| `contractClassIdentifier` | [`ContractClassIdentifier`](../modules.md#contractclassidentifier) |
| `blockIdentifier?`        | [`BlockIdentifier`](../modules.md#blockidentifier)                 |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).isClassDeclared

#### Defined in

[src/provider/rpc.ts:540](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L540)

---

### prepareInvocations

▸ **prepareInvocations**(`invocations`): `Promise`<[`Invocations`](../modules.md#invocations)\>

#### Parameters

| Name          | Type                                       |
| :------------ | :----------------------------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations) |

#### Returns

`Promise`<[`Invocations`](../modules.md#invocations)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).prepareInvocations

#### Defined in

[src/provider/rpc.ts:568](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L568)

---

### getL1MessagesStatus

▸ **getL1MessagesStatus**(`transactionHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getL1MessagesStatus

#### Defined in

[src/provider/rpc.ts:589](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L589)

---

### getStorageProof

▸ **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

#### Parameters

| Name                   | Type                                                                                  |
| :--------------------- | :------------------------------------------------------------------------------------ |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                        |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                        |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC09.API.md#contract_storage_keys)[] |
| `blockIdentifier?`     | [`BlockIdentifier`](../modules.md#blockidentifier)                                    |

#### Returns

`Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStorageProof

#### Defined in

[src/provider/rpc.ts:595](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L595)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

#### Parameters

| Name        | Type                                         |
| :---------- | :------------------------------------------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getCompiledCasm

#### Defined in

[src/provider/rpc.ts:609](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L609)

---

### getEstimateTip

▸ **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

#### Parameters

| Name               | Type                                                     |
| :----------------- | :------------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)       |
| `options`          | [`TipAnalysisOptions`](../modules.md#tipanalysisoptions) |

#### Returns

`Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getEstimateTip

#### Defined in

[src/provider/rpc.ts:613](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L613)

---

### getStarkName

▸ **getStarkName**(`address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                         |
| :-------------------- | :------------------------------------------- |
| `address`             | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?` | `string`                                     |

#### Returns

`Promise`<`string`\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L22)

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

Mixin(BaseRpcProvider, StarknetId, BrotherId).getAddressFromStarkName

#### Defined in

[src/provider/extensions/starknetId.ts:31](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L31)

---

### getStarkProfile

▸ **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Parameters

| Name                           | Type                                         |
| :----------------------------- | :------------------------------------------- |
| `address`                      | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                     |
| `StarknetIdIdentityContract?`  | `string`                                     |
| `StarknetIdVerifierContract?`  | `string`                                     |
| `StarknetIdPfpContract?`       | `string`                                     |
| `StarknetIdPopContract?`       | `string`                                     |
| `StarknetIdMulticallContract?` | `string`                                     |

#### Returns

`Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getStarkProfile

#### Defined in

[src/provider/extensions/starknetId.ts:40](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L40)

---

### getBrotherName

▸ **getBrotherName**(`address`, `BrotherIdContract?`): `Promise`<`string`\>

Gets the primary Brother domain name for an address

#### Parameters

| Name                 | Type                                         | Description                       |
| :------------------- | :------------------------------------------- | :-------------------------------- |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the domain for |
| `BrotherIdContract?` | `string`                                     | Optional contract address         |

#### Returns

`Promise`<`string`\>

The domain name with .brother suffix

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBrotherName

#### Defined in

[src/provider/extensions/brotherId.ts:99](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L99)

---

### getAddressFromBrotherName

▸ **getAddressFromBrotherName**(`name`, `BrotherIdContract?`): `Promise`<`string`\>

Gets the address associated with a Brother domain name

#### Parameters

| Name                 | Type     | Description                                       |
| :------------------- | :------- | :------------------------------------------------ |
| `name`               | `string` | The domain name (with or without .brother suffix) |
| `BrotherIdContract?` | `string` | Optional contract address                         |

#### Returns

`Promise`<`string`\>

The resolver address for the domain

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getAddressFromBrotherName

#### Defined in

[src/provider/extensions/brotherId.ts:114](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L114)

---

### getBrotherProfile

▸ **getBrotherProfile**(`address`, `BrotherIdContract?`): `Promise`<`BrotherProfile`\>

Gets the complete profile information for a Brother domain

#### Parameters

| Name                 | Type                                         | Description                        |
| :------------------- | :------------------------------------------- | :--------------------------------- |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the profile for |
| `BrotherIdContract?` | `string`                                     | Optional contract address          |

#### Returns

`Promise`<`BrotherProfile`\>

The complete Brother profile information

#### Inherited from

Mixin(BaseRpcProvider, StarknetId, BrotherId).getBrotherProfile

#### Defined in

[src/provider/extensions/brotherId.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L132)
