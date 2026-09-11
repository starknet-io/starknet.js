# Function: computeContractClassHash()

> **computeContractClassHash**(`contract`): `string`

Defined in: [src/utils/hash/classHash/index.ts:33](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/index.ts#L33)

Compute ClassHash (sierra or legacy) based on provided contract

## Parameters

### contract

`string` \| [`CompiledContract`](../../../../type-aliases/CompiledContract.md)

Cairo 1 contract content

## Returns

`string`

hex-string of class hash

## Example

```typescript
const compiledSierra = json.parse(fs.readFileSync('./cairo260.sierra.json').toString('ascii'));
const result = hash.computeContractClassHash(compiledSierra);
// result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
