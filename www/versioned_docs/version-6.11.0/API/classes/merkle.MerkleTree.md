---
id: 'merkle.MerkleTree'
title: 'Class: MerkleTree'
sidebar_label: 'MerkleTree'
custom_edit_url: null
---

[merkle](../namespaces/merkle.md).MerkleTree

## Constructors

### constructor

• **new MerkleTree**(`leafHashes`, `hashMethod?`): [`MerkleTree`](merkle.MerkleTree.md)

Create a Merkle tree

#### Parameters

| Name         | Type                                                                                                                                 | Default value         | Description                           |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------ |
| `leafHashes` | `string`[]                                                                                                                           | `undefined`           | hex-string array                      |
| `hashMethod` | (`a`: [`BigNumberish`](../namespaces/types.md#bignumberish), `b`: [`BigNumberish`](../namespaces/types.md#bignumberish)) => `string` | `computePedersenHash` | hash method to use, default: Pedersen |

#### Returns

[`MerkleTree`](merkle.MerkleTree.md)

created Merkle tree

**`Example`**

```typescript
const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
const tree = new MerkleTree(leaves);
// tree = {
//   branches: [['0x5bb9440e2...', '0x262697b88...', ...], ['0x38118a340...', ...], ...],
//   leaves: ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'],
//   root: '0x7f748c75e5bdb7ae28013f076b8ab650c4e01d3530c6e5ab665f9f1accbe7d4',
//   hashMethod: [Function computePedersenHash],
// }
```

#### Defined in

[src/utils/merkle.ts:31](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L31)

## Properties

### leaves

• **leaves**: `string`[]

#### Defined in

[src/utils/merkle.ts:5](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L5)

---

### branches

• **branches**: `string`[][] = `[]`

#### Defined in

[src/utils/merkle.ts:7](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L7)

---

### root

• **root**: `string`

#### Defined in

[src/utils/merkle.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L9)

---

### hashMethod

• **hashMethod**: (`a`: [`BigNumberish`](../namespaces/types.md#bignumberish), `b`: [`BigNumberish`](../namespaces/types.md#bignumberish)) => `string`

#### Type declaration

▸ (`a`, `b`): `string`

##### Parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `a`  | [`BigNumberish`](../namespaces/types.md#bignumberish) |
| `b`  | [`BigNumberish`](../namespaces/types.md#bignumberish) |

##### Returns

`string`

#### Defined in

[src/utils/merkle.ts:11](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L11)

## Methods

### hash

▸ **hash**(`a`, `b`, `hashMethod?`): `string`

Calculate hash from ordered a and b, Pedersen hash default

#### Parameters

| Name         | Type                                                                                                                                 | Default value         | Description                           |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------ |
| `a`          | [`BigNumberish`](../namespaces/types.md#bignumberish)                                                                                | `undefined`           | first value                           |
| `b`          | [`BigNumberish`](../namespaces/types.md#bignumberish)                                                                                | `undefined`           | second value                          |
| `hashMethod` | (`a`: [`BigNumberish`](../namespaces/types.md#bignumberish), `b`: [`BigNumberish`](../namespaces/types.md#bignumberish)) => `string` | `computePedersenHash` | hash method to use, default: Pedersen |

#### Returns

`string`

result of the hash function

**`Example`**

```typescript
const result1 = MerkleTree.hash('0xabc', '0xdef');
// result1 = '0x484f029da7914ada038b1adf67fc83632364a3ebc2cd9349b41ab61626d9e82'

const customHashMethod = (a, b) => `custom_${a}_${b}`;
const result2 = MerkleTree.hash('0xabc', '0xdef', customHashMethod);
// result2 = 'custom_2748_3567'
```

#### Defined in

[src/utils/merkle.ts:76](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L76)

---

### getProof

▸ **getProof**(`leaf`, `branch?`, `hashPath?`): `string`[]

Calculates the merkle membership proof path

#### Parameters

| Name       | Type       | Default value | Description      |
| :--------- | :--------- | :------------ | :--------------- |
| `leaf`     | `string`   | `undefined`   | hex-string       |
| `branch`   | `string`[] | `undefined`   | hex-string array |
| `hashPath` | `string`[] | `[]`          | hex-string array |

#### Returns

`string`[]

collection of merkle proof hex-string hashes

**`Example`**

```typescript
const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
const tree = new MerkleTree(leaves);
const result = tree.getProof('0x3');
// result = [
//   '0x4',
//   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
//   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
// ]
```

#### Defined in

[src/utils/merkle.ts:104](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L104)
