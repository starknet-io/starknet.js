# Falcon-512 accounts

Compiled classes of accounts that check Falcon-512 signatures on-chain. Used by
`__tests__/falconAccount.test.ts`, which declares them (`declareIfNot`) before the tests.

## S2morrow

- Class hash: `0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5`. It is the class declared
  on Sepolia and on Mainnet (checked on 2026-10-16 with `starknet_getClass` on both networks).
- Constructor: `pk_packed`, the 29 felts of the packed public key (`Falcon512Signer.getPackedPublicKey()`).
- Source: `s2morrow-4eff9ab.tar.gz`, from https://github.com/feltroidprime/s2morrow at commit `4eff9ab`
  (MIT license, included). The contract is `packages/falcon_account/src/preset.cairo`. The archive holds
  the four packages of the Scarb workspace, without their tests: `falcon_old` and `falcon_zknox` are only
  needed to resolve the workspace.
- `falcon512s2morrowAccount.sierra.json` is the Sierra built from this source with Scarb 2.15.1 (Cairo
  2.15.0, Sierra 1.7.0). The commits from `c5405df` to `4eff9ab` all give this class hash.
- `falcon512s2morrowAccount.casm` was compiled by another tool, with Cairo 2.12.3 (its
  `compiler_version`). It is stored on one line, without spaces.

To rebuild the Sierra and check its class hash:

```bash
tar -xzf s2morrow-4eff9ab.tar.gz
cd s2morrow-4eff9ab
scarb build -p falcon_account # Scarb 2.15.1, as in .tool-versions
# then: hash.computeContractClassHash() of target/dev/falcon_account_FalconAccount.contract_class.json
```

## OpenZeppelin

The two Falcon-512 presets of OpenZeppelin Contracts for Cairo, compiled without any change.

| Files                                         | Variant   | Signature | Class hash                                                           | Compiled class hash                                                 |
| --------------------------------------------- | --------- | --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `oz_Falcon512ShakeAccountUpgradeable.*`       | with hint | 60 felts  | `0x014660ce3739fbde6e33d994cebd6a9fb20e800516b2e1b6c253d4d09baa9ae0` | `0x70a9d08c913d3f61f940241547141e4688ea59c87e0ece0caf400aa37a31f7f` |
| `oz_Falcon512ShakeDirectAccountUpgradeable.*` | direct    | 31 felts  | `0x016111958d61eedfa5a950b608997abb4981b548f1862d620cc9247461ddeeb1` | `0x3928427a4e2fef7542c9ece069a561f928bafbf1d57efb10e4f0abc52d2af`   |

- Constructor: `public_key: Array<felt252>`. The calldata is `29`, followed by the 29 felts of
  `Falcon512Signer.getPackedPublicKey()`.
- Source: tag [`v4.1.0-rc.0`](https://github.com/OpenZeppelin/cairo-contracts/releases/tag/v4.1.0-rc.0)
  (pre-release of 2026-11-16), commit `37b0ce066755a68ee7af44bccb746d02cb0da8a9` (MIT license).
- Build: Scarb 2.21.0 (Cairo 2.21.0, Sierra 1.9.5), `scarb --release build`, in a package with this
  `Scarb.toml` (extract):

```toml
[dependencies]
starknet = "2.21.0"
openzeppelin_presets = { git = "https://github.com/OpenZeppelin/cairo-contracts.git", tag = "v4.1.0-rc.0" }

[[target.starknet-contract]]
sierra = true
casm = true
build-external-contracts = [
    "openzeppelin_presets::falcon_512_shake_account::Falcon512ShakeAccountUpgradeable",
    "openzeppelin_presets::falcon_512_shake_direct_account::Falcon512ShakeDirectAccountUpgradeable",
]
```

- The package keeps the default libfunc list of Scarb. In the OpenZeppelin repository itself,
  `scarb --release build -p openzeppelin_presets` fails with Cairo 2.21: it asks for the
  `experimental` libfunc list, which Cairo 2.21 no longer has.
- With Scarb 2.18.0, the version used by OpenZeppelin, the class hashes are different.
- The compiled class hashes are the ones accepted by starknet-devnet 0.11.0. `hash.computeCompiledClassHash`
  of starknet.js gives the same values.
- The `.sierra.json` files are the `.contract_class.json` artifacts of Scarb, renamed. The `.casm` files
  are the `.compiled_contract_class.json` artifacts, stored on one line, without spaces (content and
  hashes unchanged).
