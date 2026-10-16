# Falcon-512 account of S2morrow

Compiled class of the S2morrow account, which checks Falcon-512 signatures on-chain. Used by
`__tests__/falconAccount.test.ts`, which declares it on devnet before the tests.

- Source: `packages/falcon_account/src/preset.cairo` in https://github.com/feltroidprime/s2morrow.
  The exact commit is not known: this class was compiled with Cairo 2.12.3 (`compiler_version` of the
  `.casm` file), while S2morrow at commit `4eff9ab` uses Cairo 2.15.1.
- Class hash: `0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5`. It is the class declared
  on Sepolia and on Mainnet (checked on 2026-10-16 with `starknet_getClass` on both networks).
- Constructor: `pk_packed`, the 29 felts of the packed public key (`Falcon512Signer.getPackedPublicKey()`).
