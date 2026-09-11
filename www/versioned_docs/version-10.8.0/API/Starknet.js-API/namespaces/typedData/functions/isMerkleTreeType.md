# Function: isMerkleTreeType()

> **isMerkleTreeType**(`type`): `type is StarknetMerkleType`

Defined in: [src/utils/typedData.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L155)

Checks if the given Starknet type is a Merkle tree type.

## Parameters

### type

[`StarknetType`](../../RPC/type-aliases/StarknetType.md)

The StarkNet type to check.

## Returns

`type is StarknetMerkleType`

- True if the type is a Merkle tree type, false otherwise.

## Example

```typescript
const type = { name: 'test', type: 'merkletree' };
const result1 = isMerkleTreeType(type);
// result1 = true

const type2 = { name: 'test', type: 'non-merkletree' };
const result2 = isMerkleTreeType(type2);
// result2 = false
```
