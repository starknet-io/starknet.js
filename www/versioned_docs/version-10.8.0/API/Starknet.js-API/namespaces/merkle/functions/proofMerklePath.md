# Function: proofMerklePath()

> **proofMerklePath**(`root`, `leaf`, `path`, `hashMethod?`): `boolean`

Defined in: [src/utils/merkle.ts:148](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L148)

Tests a Merkle tree path

## Parameters

### root

`string`

hex-string

### leaf

`string`

hex-string

### path

`string`[]

hex-string array

### hashMethod?

(`a`, `b`) => `string`

hash method to use, default: Pedersen

## Returns

`boolean`

true if the path is valid, false otherwise

## Example

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
