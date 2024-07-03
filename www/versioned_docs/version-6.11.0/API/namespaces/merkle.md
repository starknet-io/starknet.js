---
id: 'merkle'
title: 'Namespace: merkle'
sidebar_label: 'merkle'
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [MerkleTree](../classes/merkle.MerkleTree.md)

## Functions

### proofMerklePath

▸ **proofMerklePath**(`root`, `leaf`, `path`, `hashMethod?`): `boolean`

Tests a Merkle tree path

#### Parameters

| Name         | Type                                                                                                     | Default value         | Description                           |
| :----------- | :------------------------------------------------------------------------------------------------------- | :-------------------- | :------------------------------------ |
| `root`       | `string`                                                                                                 | `undefined`           | hex-string                            |
| `leaf`       | `string`                                                                                                 | `undefined`           | hex-string                            |
| `path`       | `string`[]                                                                                               | `undefined`           | hex-string array                      |
| `hashMethod` | (`a`: [`BigNumberish`](types.md#bignumberish), `b`: [`BigNumberish`](types.md#bignumberish)) => `string` | `computePedersenHash` | hash method to use, default: Pedersen |

#### Returns

`boolean`

true if the path is valid, false otherwise

**`Example`**

```typescript
const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
const tree = new MerkleTree(leaves);
const result = proofMerklePath(tree.root, '0x3', [
  '0x4',
  '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
  '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
]);
// result = true
```

#### Defined in

[src/utils/merkle.ts:148](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/merkle.ts#L148)
