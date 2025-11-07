---
id: 'RPC.RPCSPEC09.WALLET_API.WatchAssetParameters'
title: 'Interface: WatchAssetParameters'
sidebar_label: 'WatchAssetParameters'
custom_edit_url: null
---

[RPCSPEC09](../namespaces/RPC.RPCSPEC09.md).[WALLET_API](../namespaces/RPC.RPCSPEC09.WALLET_API.md).WatchAssetParameters

EIP-747:

**`See`**

https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md

## Hierarchy

- [`Asset`](../namespaces/RPC.RPCSPEC09.WALLET_API.md#asset)

  ↳ **`WatchAssetParameters`**

## Properties

### type

• **type**: `"ERC20"`

#### Inherited from

Asset.type

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/components.d.ts:32

---

### options

• **options**: `Object`

#### Type declaration

| Name        | Type     |
| :---------- | :------- |
| `address`   | `string` |
| `symbol?`   | `string` |
| `decimals?` | `number` |
| `image?`    | `string` |
| `name?`     | `string` |

#### Inherited from

Asset.options

#### Defined in

node_modules/@starknet-io/starknet-types-09/dist/types/wallet-api/components.d.ts:33
