# Function: computeSierraContractClassHash()

> **computeSierraContractClassHash**(`sierra`): `string`

Defined in: [src/utils/hash/classHash/poseidon.ts:127](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/poseidon.ts#L127)

Compute sierra contract class hash (Cairo 1)

## Parameters

### sierra

[`CompiledSierra`](../../../../type-aliases/CompiledSierra.md)

Cairo 1 Sierra contract content

## Returns

`string`

hex-string of class hash

## Example

```typescript
const compiledSierra = json.parse(fs.readFileSync('./cairo260.sierra.json').toString('ascii'));
const result = hash.computeSierraContractClassHash(compiledSierra);
// result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
