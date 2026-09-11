# Function: hashByteCodeSegmentsBlake()

> **hashByteCodeSegmentsBlake**(`casm`): `bigint`

Defined in: [src/utils/hash/classHash/blake.ts:123](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/blake.ts#L123)

Compute hash of the bytecode using Blake2s for nested segments.
Each segment is Blake2s hashed according to the segment structure.
For non-leaf nodes: 1 + Blake2sHash(len0, h0, len1, h1, ...)

## Parameters

### casm

[`CairoAssembly`](../../../../type-aliases/CairoAssembly.md)

compiled Sierra CASM file content.

## Returns

`bigint`

the bytecode hash as bigint.

## Example

```typescript
const compiledCasm = json.parse(fs.readFileSync('./contractC260.casm.json').toString('ascii'));
const result = hash.hashByteCodeSegmentsBlake(compiledCasm);
```
