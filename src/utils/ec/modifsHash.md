## pedersen :

| V4                                                       | current V5                                                        | will be                                                  |
| :------------------------------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------- |
| `hash.pedersen(x: PedersenArg, y: PedersenArg): string ` | `ec.starkCurve.pedersen(x: PedersenArg, y: PedersenArg): string ` | `hash.pedersen(x: PedersenArg, y: PedersenArg): string ` |

Keep back pedersen() to hash.

## keccak :

| V4               | current V5       | will be                                    |
| :--------------- | :--------------- | :----------------------------------------- |
| `hash.keccakBn`  | `hash.keccakBn`  | `hash.keccakBn` (\*)                       |
| `hash.keccakHex` | `hash.keccakHex` | `hash.keccakHex` (\*)                      |
|                  |                  | `hash.keccak = (data: Uint8Array): bigint` |

(\*) In V4 & current V5, `keccakBn` & `keccakHex` uses 'ethereum-cryptography/keccak.js'.  
With this PR, they are using Noble lib, and `ethereum-cryptography` lib is removed.

## hashChain :

| V4  | current V5                                                    | will be                                              |
| :-- | :------------------------------------------------------------ | :--------------------------------------------------- |
|     | `ec.starkCurve.hashChain(data: PedersenArg[], fn = pedersen)` | `hash.hashChain(data: PedersenArg[], fn = pedersen)` |

new hashChain moved from `ec` to `hash`.

## poseidon hash :

Add export of utils for Poseidon (currently not imported in V5) :
`export * as poseidon from '@noble/curves/abstract/poseidon'`  
The following Noble new constants/methods/interfaces for poseidon hash are in current V5 in `ec`. This PR move them to `hash` :

- Fp251,
- Fp253,
- \_poseidonMDS,
- PoseidonOpts,
- poseidonBasic,
- poseidonCreate,
- poseidonHash,
