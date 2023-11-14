---
id: 'merkle.MerkleTree'
title: 'Class: MerkleTree'
sidebar_label: 'MerkleTree'
custom_edit_url: null
---

[merkle](../namespaces/merkle.md).MerkleTree

## Constructors

### constructor

• **new MerkleTree**(`leafHashes`)

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `leafHashes` | `string`[] |

#### Defined in

[src/utils/merkle.ts:11](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L11)

## Properties

### leaves

• **leaves**: `string`[]

#### Defined in

[src/utils/merkle.ts:5](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L5)

---

### branches

• **branches**: `string`[][] = `[]`

#### Defined in

[src/utils/merkle.ts:7](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L7)

---

### root

• **root**: `string`

#### Defined in

[src/utils/merkle.ts:9](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L9)

## Methods

### hash

▸ `Static` **hash**(`a`, `b`): `string`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `string` |
| `b`  | `string` |

#### Returns

`string`

#### Defined in

[src/utils/merkle.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L34)

---

### build

▸ `Private` **build**(`leaves`): `string`

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `leaves` | `string`[] |

#### Returns

`string`

#### Defined in

[src/utils/merkle.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L16)

---

### getProof

▸ **getProof**(`leaf`, `branch?`, `hashPath?`): `string`[]

#### Parameters

| Name       | Type       | Default value |
| :--------- | :--------- | :------------ |
| `leaf`     | `string`   | `undefined`   |
| `branch`   | `string`[] | `undefined`   |
| `hashPath` | `string`[] | `[]`          |

#### Returns

`string`[]

#### Defined in

[src/utils/merkle.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/merkle.ts#L39)
