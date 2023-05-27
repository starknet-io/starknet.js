---
id: 'typedData'
title: 'Namespace: typedData'
sidebar_label: 'typedData'
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

- [StarkNetDomain](../interfaces/typedData.StarkNetDomain.md)
- [TypedData](../interfaces/typedData.TypedData.md)

## Type Aliases

### StarkNetMerkleType

Ƭ **StarkNetMerkleType**: `Object`

#### Type declaration

| Name       | Type           |
| :--------- | :------------- |
| `name`     | `string`       |
| `type`     | `"merkletree"` |
| `contains` | `string`       |

#### Defined in

[src/utils/typedData/types.ts:1](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L1)

---

### StarkNetType

Ƭ **StarkNetType**: { `name`: `string` ; `type`: `string` } \| [`StarkNetMerkleType`](typedData.md#starknetmerkletype)

A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.

Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
standard.

#### Defined in

[src/utils/typedData/types.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/types.ts#L13)

## Functions

### prepareSelector

▸ **prepareSelector**(`selector`): `string`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `selector` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/typedData/index.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L21)

---

### isMerkleTreeType

▸ **isMerkleTreeType**(`type`): type is StarkNetMerkleType

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `type` | [`StarkNetType`](typedData.md#starknettype) |

#### Returns

type is StarkNetMerkleType

#### Defined in

[src/utils/typedData/index.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L25)

---

### getDependencies

▸ **getDependencies**(`types`, `type`, `dependencies?`): `string`[]

Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
in the resulting array.

#### Parameters

| Name            | Type                                                               | Default value |
| :-------------- | :----------------------------------------------------------------- | :------------ |
| `types`         | `Record`<`string`, [`StarkNetType`](typedData.md#starknettype)[]\> | `undefined`   |
| `type`          | `string`                                                           | `undefined`   |
| `dependencies?` | `string`[]                                                         | `[]`          |

#### Returns

`string`[]

#### Defined in

[src/utils/typedData/index.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L43)

---

### encodeType

▸ **encodeType**(`types`, `type`): `string`

Encode a type to a string. All dependant types are alphabetically sorted.

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `types` | `Record`<`string`, [`StarkNetType`](typedData.md#starknettype)[]\> |
| `type`  | `string`                                                           |

#### Returns

`string`

#### Defined in

[src/utils/typedData/index.ts:99](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L99)

---

### getTypeHash

▸ **getTypeHash**(`types`, `type`): `string`

Get a type string as hash.

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `types` | `Record`<`string`, [`StarkNetType`](typedData.md#starknettype)[]\> |
| `type`  | `string`                                                           |

#### Returns

`string`

#### Defined in

[src/utils/typedData/index.ts:117](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L117)

---

### encodeValue

▸ **encodeValue**(`types`, `type`, `data`, `ctx?`): [`string`, `string`]

Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as tuple, which consists of
an array of ABI compatible types, and an array of corresponding values.

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `types` | `Record`<`string`, [`StarkNetType`](typedData.md#starknettype)[]\> |
| `type`  | `string`                                                           |
| `data`  | `unknown`                                                          |
| `ctx`   | `Context`                                                          |

#### Returns

[`string`, `string`]

#### Defined in

[src/utils/typedData/index.ts:130](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L130)

---

### encodeData

▸ **encodeData**<`T`\>(`types`, `type`, `data`): `string`[][]

Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values. All
dependant types are automatically encoded.

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`TypedData`](../interfaces/typedData.TypedData.md) |

#### Parameters

| Name    | Type               |
| :------ | :----------------- |
| `types` | `T`[``"types"``]   |
| `type`  | `string`           |
| `data`  | `T`[``"message"``] |

#### Returns

`string`[][]

#### Defined in

[src/utils/typedData/index.ts:182](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L182)

---

### getStructHash

▸ **getStructHash**<`T`\>(`types`, `type`, `data`): `string`

Get encoded data as a hash. The data should be a key -> value object with all the required values. All dependant
types are automatically encoded.

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`TypedData`](../interfaces/typedData.TypedData.md) |

#### Parameters

| Name    | Type               |
| :------ | :----------------- |
| `types` | `T`[``"types"``]   |
| `type`  | `string`           |
| `data`  | `T`[``"message"``] |

#### Returns

`string`

#### Defined in

[src/utils/typedData/index.ts:219](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L219)

---

### getMessageHash

▸ **getMessageHash**(`typedData`, `account`): `string`

Get the EIP-191 encoded message to sign, from the typedData object.

#### Parameters

| Name        | Type                                                |
| :---------- | :-------------------------------------------------- |
| `typedData` | [`TypedData`](../interfaces/typedData.TypedData.md) |
| `account`   | [`BigNumberish`](num.md#bignumberish)               |

#### Returns

`string`

#### Defined in

[src/utils/typedData/index.ts:234](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/typedData/index.ts#L234)
