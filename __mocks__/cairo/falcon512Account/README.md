# Falcon-512 account of S2morrow

Compiled class of the S2morrow account, which checks Falcon-512 signatures on-chain, and its source.
Used by `__tests__/falconAccount.test.ts`, which declares it on devnet before the tests.

- Class hash: `0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5`. It is the class declared
  on Sepolia and on Mainnet (checked on 2026-10-16 with `starknet_getClass` on both networks).
- Constructor: `pk_packed`, the 29 felts of the packed public key (`Falcon512Signer.getPackedPublicKey()`).
- Source: `s2morrow-4eff9ab.tar.gz`, from https://github.com/feltroidprime/s2morrow at commit `4eff9ab`
  (MIT license, included). The contract is `packages/falcon_account/src/preset.cairo`. The archive holds
  the four packages of the Scarb workspace, without their tests: `falcon_old` and `falcon_zknox` are only
  needed to resolve the workspace.
- `falcon512Account.sierra.json` is the Sierra built from this source with Scarb 2.15.1 (Cairo 2.15.0,
  Sierra 1.7.0). The commits from `c5405df` to `4eff9ab` all give this class hash.
- `falcon512Account.casm` was compiled by another tool, with Cairo 2.12.3 (its `compiler_version`). It is
  stored on one line, without spaces.

To rebuild the Sierra and check its class hash:

```bash
tar -xzf s2morrow-4eff9ab.tar.gz
cd s2morrow-4eff9ab
scarb build -p falcon_account # Scarb 2.15.1, as in .tool-versions
# then: hash.computeContractClassHash() of target/dev/falcon_account_FalconAccount.contract_class.json
```
