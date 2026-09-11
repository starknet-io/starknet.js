# Function: computeCompiledClassHashPoseidon()

> **computeCompiledClassHashPoseidon**(`casm`): `string`

Defined in: [src/utils/hash/classHash/poseidon.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/poseidon.ts#L75)

Compute compiled class hash for contract (Cairo 1)

## Parameters

### casm

[`CairoAssembly`](../../../../type-aliases/CairoAssembly.md)

Cairo 1 compiled contract content

## Returns

`string`

hex-string of class hash

## Example

```typescript
const compiledCasm = json.parse(fs.readFileSync('./cairo260.casm.json').toString('ascii'));
const result = hash.computeCompiledClassHash(compiledCasm);
// result = "0x4087905743b4fa2b3affc1fc71333f1390c8c5d1e8ea47d6ba70786de3fc01a"
```
