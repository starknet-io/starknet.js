# Function: computeCompiledClassHashBlake()

> **computeCompiledClassHashBlake**(`casm`): `string`

Defined in: [src/utils/hash/classHash/blake.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/blake.ts#L155)

Compute compiled class hash for contract (Cairo 1) using Blake2s hashing (V2).
This implements the V2 hash version as specified in Starknet.

## Parameters

### casm

[`CairoAssembly`](../../../../type-aliases/CairoAssembly.md)

Cairo 1 compiled contract content

## Returns

`string`

hex-string of compiled class hash

## Example

```typescript
const compiledCasm = json.parse(fs.readFileSync('./cairo260.casm.json').toString('ascii'));
const result = hash.computeCompiledClassHashBlake(compiledCasm);
```
