# Reference data of the Falcon-512 tests (`starknet/falcon`)

Frozen files. Each one gives inputs and the expected outputs produced by another implementation.
The files of `cairo/` and `falconRs.json` were copied from the starknet.js workshop and formatted with
Prettier: the values are unchanged. The files of `oz/` are byte-for-byte copies.

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

## `oz/` — copied from OpenZeppelin Contracts for Cairo

Source: `packages/test_common/src/falcon_512/` of https://github.com/OpenZeppelin/cairo-contracts, tag
`v4.1.0-rc.0` (commit `37b0ce0`), MIT license. Read the files with
`__tests__/utils/falcon/helpers/ozFixtures.ts`. Their keys and signatures are test material of
OpenZeppelin, made with the `tprest/falcon.py` signer: never use them for a real account.

| File                      | Content                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `fixture.cairo`           | `msg` (`'BENCH_MSG'`), a public key (29 felts), a 60-felt signature of `msg`; the 40 salt bytes in the header                                  |
| `rotation_fixture.cairo`  | the account address `'FALCON_ACCOUNT'`, a new public key, the acceptance hashes and signatures of two key changes, a signed SNIP-9 V2 message  |
| `migration_fixture.cairo` | the account address `'FALCON_MIGRATION'`, a public key, the acceptance hash and signature with an empty current key, a signed transaction hash |

To check that the copies are unchanged, from the root of the repository:

```bash
for f in fixture rotation_fixture migration_fixture; do
  gh api "repos/OpenZeppelin/cairo-contracts/contents/packages/test_common/src/falcon_512/$f.cairo?ref=v4.1.0-rc.0" \
    -H "Accept: application/vnd.github.raw" | diff - "__mocks__/falcon/oz/$f.cairo" && echo "$f: identical"
done
```
