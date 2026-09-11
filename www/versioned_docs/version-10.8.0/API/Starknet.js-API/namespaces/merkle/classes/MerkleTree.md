# Class: MerkleTree

Defined in: [src/utils/merkle.ts:4](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L4)

## Constructors

### Constructor

> **new MerkleTree**(`leafHashes`, `hashMethod?`): `MerkleTree`

Defined in: [src/utils/merkle.ts:31](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L31)

Create a Merkle tree

#### Parameters

##### leafHashes

`string`[]

hex-string array

##### hashMethod?

(`a`, `b`) => `string`

hash method to use, default: Pedersen

#### Returns

`MerkleTree`

created Merkle tree

#### Example

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

## Properties

### leaves

> **leaves**: `string`[]

Defined in: [src/utils/merkle.ts:5](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L5)

---

### branches

> **branches**: `string`[][] = `[]`

Defined in: [src/utils/merkle.ts:7](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L7)

---

### root

> **root**: `string`

Defined in: [src/utils/merkle.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L9)

---

### hashMethod

> **hashMethod**: (`a`, `b`) => `string`

Defined in: [src/utils/merkle.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L11)

#### Parameters

##### a

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

##### b

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

#### Returns

`string`

## Methods

### hash()

> `static` **hash**(`a`, `b`, `hashMethod?`): `string`

Defined in: [src/utils/merkle.ts:76](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L76)

Calculate hash from ordered a and b, Pedersen hash default

#### Parameters

##### a

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

first value

##### b

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

second value

##### hashMethod?

(`a`, `b`) => `string`

hash method to use, default: Pedersen

#### Returns

`string`

result of the hash function

#### Example

```typescript
const result1 = MerkleTree.hash('0xabc', '0xdef');
// result1 = '0x484f029da7914ada038b1adf67fc83632364a3ebc2cd9349b41ab61626d9e82'

const customHashMethod = (a, b) => `custom_${a}_${b}`;
const result2 = MerkleTree.hash('0xabc', '0xdef', customHashMethod);
// result2 = 'custom_2748_3567'
```

---

### getProof()

> **getProof**(`leaf`, `branch?`, `hashPath?`): `string`[]

Defined in: [src/utils/merkle.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/merkle.ts#L104)

Calculates the merkle membership proof path

#### Parameters

##### leaf

`string`

hex-string

##### branch?

`string`[] = `...`

hex-string array

##### hashPath?

`string`[] = `[]`

hex-string array

#### Returns

`string`[]

collection of merkle proof hex-string hashes

#### Example

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
