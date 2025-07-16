---
id: 'provider-1'
title: 'Namespace: provider'
sidebar_label: 'provider'
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Block](../classes/provider-1.Block.md)

## Variables

### validBlockTags

• `Const` **validBlockTags**: (`"pending"` \| `"latest"`)[]

#### Defined in

[src/utils/provider.ts:155](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L155)

## Functions

### wait

▸ **wait**(`delay`): `Promise`<`unknown`\>

Helper - Async Sleep for 'delay' time

#### Parameters

| Name    | Type     | Description                     |
| :------ | :------- | :------------------------------ |
| `delay` | `number` | Number of milliseconds to delay |

#### Returns

`Promise`<`unknown`\>

**`Example`**

```typescript
await provider.wait(1000); // 1000 milliseconds == 1 second
```

#### Defined in

[src/utils/provider.ts:32](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L32)

---

### createSierraContractClass

▸ **createSierraContractClass**(`contract`): [`SierraContractClass`](types.md#sierracontractclass)

Create Sierra compressed Contract Class from a given Compiled Sierra

CompiledSierra -> SierraContractClass

#### Parameters

| Name       | Type                                        | Description                         |
| :--------- | :------------------------------------------ | :---------------------------------- |
| `contract` | [`CompiledSierra`](types.md#compiledsierra) | sierra code from the Cairo compiler |

#### Returns

[`SierraContractClass`](types.md#sierracontractclass)

compressed Sierra

**`Example`**

```typescript
const result = provider.createSierraContractClass({
   "sierra_program": [
       "0x1",
       "0x4",
       "0x0",
       "0x2",
       "0x4",
       "0x1",
       "0x3b4",
       "0x4c",
       "0x65",
       "0x52616e6765436865636b",...})
// result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
```

#### Defined in

[src/utils/provider.ts:62](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L62)

---

### parseContract

▸ **parseContract**(`contract`): [`ContractClass`](types.md#contractclass)

Create a compressed contract from a given compiled Cairo 0 & 1 contract or a string.

#### Parameters

| Name       | Type                                                        | Description                                     |
| :--------- | :---------------------------------------------------------- | :---------------------------------------------- |
| `contract` | `string` \| [`CompiledContract`](types.md#compiledcontract) | Compiled Cairo 0 or Cairo 1 contract, or string |

#### Returns

[`ContractClass`](types.md#contractclass)

Cairo 0 or Cairo 1 compressed contract

**`Example`**

```typescript
const result = provider.parseContract({
   "sierra_program": [
       "0x1",
       "0x4",
       "0x0",
       "0x2",
       "0x4",
       "0x1",
       "0x3b4",
       "0x4c",
       "0x65",
       "0x52616e6765436865636b",...})
// result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
```

#### Defined in

[src/utils/provider.ts:92](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L92)

---

### getDefaultNodes

▸ **getDefaultNodes**(`rpcVersion`): `any`

return Defaults RPC Nodes endpoints

#### Parameters

| Name         | Type                   |
| :----------- | :--------------------- |
| `rpcVersion` | `"0.7.1"` \| `"0.8.1"` |

#### Returns

`any`

#### Defined in

[src/utils/provider.ts:135](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L135)

---

### getSupportedRpcVersions

▸ **getSupportedRpcVersions**(): [`SupportedRpcVersion`](constants.md#supportedrpcversion-1)[]

Return supported RPC versions

#### Returns

[`SupportedRpcVersion`](constants.md#supportedrpcversion-1)[]

available RPC versions

#### Defined in

[src/utils/provider.ts:151](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L151)

---

### getDefaultNodeUrl

▸ **getDefaultNodeUrl**(`networkName?`, `mute?`, `rpcVersion?`): `string`

Return randomly select available public node

#### Parameters

| Name           | Type                          | Default value | Description              |
| :------------- | :---------------------------- | :------------ | :----------------------- |
| `networkName?` | `"SN_MAIN"` \| `"SN_SEPOLIA"` | `undefined`   | NetworkName              |
| `mute`         | `boolean`                     | `false`       | mute public node warning |
| `rpcVersion?`  | `"0.7.1"` \| `"0.8.1"`        | `undefined`   | -                        |

#### Returns

`string`

default node url

**`Example`**

```typescript
const result = provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN, false);
// console : "Using default public node url, please provide nodeUrl in provider options!"
// result = "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"
```

#### Defined in

[src/utils/provider.ts:117](https://github.com/starknet-io/starknet.js/blob/v7.6.4/src/utils/provider.ts#L117)
