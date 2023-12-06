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

[src/utils/merkle.ts:11](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L11)

## Properties

### leaves

• **leaves**: `string`[]

#### Defined in

[src/utils/merkle.ts:5](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L5)

---

### branches

• **branches**: `string`[][] = `[]`

#### Defined in

[src/utils/merkle.ts:7](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L7)

---

### root

• **root**: `string`

#### Defined in

[src/utils/merkle.ts:9](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L9)

## Methods

### hash

▸ `Static` **hash**(`a`, `b`): `string`

Create pedersen hash from a and b

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | `string` |
| `b`  | `string` |

#### Returns

`string`

format: hex-string

#### Defined in

[src/utils/merkle.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L43)

---

### build

▸ `Private` **build**(`leaves`): `string`

Create Merkle tree

#### Parameters

| Name     | Type       | Description      |
| :------- | :--------- | :--------------- |
| `leaves` | `string`[] | hex-string array |

#### Returns

`string`

format: hex-string; Merkle tree root

#### Defined in

[src/utils/merkle.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L21)

---

### getProof

▸ **getProof**(`leaf`, `branch?`, `hashPath?`): `string`[]

Return path to leaf

#### Parameters

| Name       | Type       | Default value | Description      |
| :--------- | :--------- | :------------ | :--------------- |
| `leaf`     | `string`   | `undefined`   | hex-string       |
| `branch`   | `string`[] | `undefined`   | hex-string array |
| `hashPath` | `string`[] | `[]`          | hex-string array |

#### Returns

`string`[]

format: hex-string array

#### Defined in

[src/utils/merkle.ts:55](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/merkle.ts#L55)
