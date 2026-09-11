# Function: hashByteCodeSegments()

> **hashByteCodeSegments**(`casm`): `bigint`

Defined in: [src/utils/hash/classHash/poseidon.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/classHash/poseidon.ts#L53)

Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
Each segment is Poseidon hashed.
The global hash is : 1 + PoseidonHash(len0, h0, len1, h1, ...)

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
const result = hash.hashByteCodeSegments(compiledCasm);
// result = 80499149343908132326491548897246987792410240503053732367044713070598981699n
```
