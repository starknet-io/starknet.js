# Reference data of the Falcon-512 tests (`starknet/falcon`)

Frozen files. Each one gives inputs and the expected outputs produced by another implementation.
They were copied from the starknet.js workshop and formatted with Prettier: the values are unchanged.

## `cairo/` — copied from the S2morrow repository

Source: `s2morrow/packages/falcon/tests/data/` (https://github.com/feltroidprime/s2morrow, commit `4eff9ab`).
Cairo Serde layout: arrays are `[length, v0, v1, …]`; large felts are JSON numbers (read them with
`__tests__/utils/falcon/helpers/fixtures.ts`, which keeps every number as a bigint).

| File                          | Content                                                                                                | Used by the Cairo test      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- |
| `ntt_input_512_int.json`      | `{ input: [512, x…] }`                                                                                 | `test_ntt.cairo`            |
| `intt_input_512_int.json`     | `{ input: [512, NTT(x)…] }`                                                                            | `test_intt.cairo`           |
| `intt_expected_512_int.json`  | `{ input: [512, x…] }` = INTT of the previous file                                                     | `test_intt.cairo`           |
| `hash_to_point_test_int.json` | message `[42]`, salt `[1, 2]`, 512 expected coefficients (computed by falcon-rs)                       | `test_cross_language.cairo` |
| `packing_test_int.json`       | 512 values, 29 expected packed felts (computed by falcon-rs)                                           | `test_cross_language.cairo` |
| `verify_test_int.json`        | message `[42]`, salt `[1, 2]`, `pk_ntt`, `s1`, `mul_hint` of a valid signature (computed by falcon-rs) | `test_cross_language.cairo` |

## `falconRs.json` — generated with the falcon-rs WASM

Produced once in the starknet.js workshop, by
`src/scripts/signature/falcon512/pureTS/tools/generateFixtures.ts`, with the falcon-rs WASM (commit
`fbf38fe`): a key pair from a fixed public seed (never use it for a real account), its NTT and packed
public key, and WASM signatures of fixed hashes.
