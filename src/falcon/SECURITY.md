# Security of `starknet/falcon`: the Falcon-512 signer and the ML-KEM key exchange

## What is covered

- **Valid signatures only.** Every signature is re-checked before being returned (hint equation and
  norm bound checked by the account contract, on the encoded output; for the OpenZeppelin direct
  layout, the hint is computed again for this check). A faulty computation throws instead of
  producing a signature the contract would reject.
- **Randomness.** The salt (S2morrow: 2 × 248-bit felts; OpenZeppelin: 40 bytes, so 2 × 160-bit
  felts) and the 48-byte Gaussian sampler seed come from `crypto.getRandomValues` through two
  separate draws. The sampler seed never depends on the public salt (unlike falcon-rs, whose
  sampler seed is the first 40 bytes of the published salt).
- **Strict validation, never repair.**
  - NIST secret key: 1281 bytes, header `0x59`, coefficient bounds, forbidden values, f invertible,
    NTRU equation `f·G − g·F = q` checked.
  - falcon-rs secret key: 3584 bytes, coefficients < q, NIST bounds, provided G equal to the
    recomputed G.
  - NIST public key: 897 bytes, header `0x09`, coefficients < q.
  - Packed polynomials and packed public keys (29 felts): canonical encoding only.
  - Signatures: exactly the length of the account type (S2morrow: 61 felts, salt length 2;
    OpenZeppelin: 60 or 31 felts, salt felts below 2^160). A signature in another layout is
    refused.
  - Options: an unknown option or account type is an error, never a silent fallback to S2morrow.
- **No secret in the API surface.** The secret key is copied at construction and kept in an ES
  private field (not shown by `console.log` / `JSON.stringify`); there is no getter. Errors carry
  lengths or codes only. Raw-hash signing (`signHash`, `signHashOz`) is not exported by
  `starknet/falcon`, to avoid blind signing. `signOwnershipAcceptance` computes the hash it signs
  (the acceptance message of an OpenZeppelin key change): it is not blind signing either. Like
  every starknet.js signer, `Falcon512Signer` keeps a `protected signRaw` method: a subclass (or a
  cast) can reach it. It is the extension point of the signers, not a security boundary.
- **Best-effort wiping** of secret intermediates (f, g, F, G, their encodings and the arrays
  derived from them, FFT basis) in `finally` blocks, also when an error is thrown.
- **Bounded work.** Sampling is capped at 1000 attempts. A felt string longer than any felt252
  (more than 64 hex or 76 decimal digits) is refused before any conversion.
- **Traceable vendored code.** `src/falcon/engine/noble/PATCH.md` records the upstream package, the
  exact diff and the SHA-256 of every vendored file, checked by
  `__tests__/utils/falcon/vendor.test.ts`.

## What is NOT covered

- **Side channels.** No constant-time guarantee: floating-point FFT and variable-time Gaussian
  sampling (noble states the same for its whole library).
- **Guaranteed memory wiping.** Impossible in JavaScript (garbage collector copies, immutable
  strings). A secret key passed as a hex string cannot be wiped at all: prefer `Uint8Array`.
- **Standardization.** This is Falcon Round 3, not FN-DSA (FIPS-206), which may be incompatible.
- **Independent audit of noble.** `@noble/post-quantum` is self-audited only.
- **The design of the account contracts** (S2morrow: Poseidon hash-to-point, hint-based
  verification; OpenZeppelin, pre-release v4.1.0-rc.0: SHAKE-256 hash-to-point, hint or direct
  verification) and wallet key storage.
- **Single use of an acceptance.** An OpenZeppelin acceptance of a key change holds no chain id,
  nonce or expiry (as in OpenZeppelin): it is not single-use. The current key must still sign each
  key change.

## Keys that already signed with the falcon-rs WASM

falcon-rs seeds its Gaussian sampler with the public salt: in `sign_for_starknet` (`src/wasm.rs` of
https://github.com/feltroidprime/falcon-rs, commit `fbf38fe`), the 56-byte seed of the sampler is the
first 40 bytes of the published salt followed by 16 zero bytes (later attempts derive their seed from
it). Anyone who sees a signature can recompute this seed, so every signature it published may leak
information about the secret key. `importFalconRsSecretKey` / `fromFalconRs` exist for continuity
only: for real funds, generate a new key. The S2morrow account has no key-rotation entry point (the
ABI of class `0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5` has no function to
change the key, checked on 2026-10-16), so moving to a new key means deploying a new account and
transferring the funds. An OpenZeppelin account can change its key instead, at the same address
(`signOwnershipAcceptance`).

## The ML-KEM key exchange (`mlkem`)

Two Falcon accounts share a secret with ML-KEM-768 (FIPS 203): Alice signs her ML-KEM public key,
Bob signs the capsule he sends to her, and both get the same 32-byte secret.

What is covered:

- **Both sides are authenticated, with a post-quantum signature.** The two SNIP-12 messages (domain
  `ML-KEM key exchange`, version 1) are signed by the Falcon accounts. `encapsulate` and
  `decapsulate` check each signature off-chain, with the Falcon key that the account stores
  (`get_public_key`), read again at each call. Only the Falcon-512 accounts of OpenZeppelin are
  accepted: a Stark account, an S2morrow account (no `get_public_key`) or an address without an
  account is refused. A missing signature is refused too.
- **Each signature covers the whole exchange.** The signature of Bob covers the address of Alice,
  the hash of her key, the hash of the capsule and the timestamp. The chain id is in the domain, and
  the address of the signer is in the SNIP-12 hash. So a capsule changed on the way, made for another
  key or another account, or signed for another chain is refused.
- **The secret depends on the context.** The secret returned is not the raw ML-KEM secret:
  HKDF-SHA-256 mixes it with the chain id, the two addresses, the hash of the key and the hash of
  the capsule. If a third account signs the capsule of Bob again, Alice gets another secret than
  Bob, so the third account cannot pass for Bob.
- **Strict validation.** Exact sizes (public key 1184 bytes, capsule 1088 bytes, seed 64 bytes).
  Times are whole seconds up to 4294967295: a time in milliseconds is refused. `encapsulate`
  refuses an expired key.
- **Best-effort wiping** of the ML-KEM secret key (built again from the seed at each
  `decapsulate`, and wiped in a `finally` block) and of the raw ML-KEM secret.
- **Reference data.** The copy of ML-KEM-768 gives the results of three NIST ACVP cases of FIPS
  203 (`__tests__/utils/falcon/engine.test.ts`).

What is NOT covered:

- **Storage of the seed.** `createKey` gives the 64-byte seed to the caller, and the dapp must
  store it. A wallet only signs the two messages: it does not keep the ML-KEM key. The seed cannot
  be built again from the wallet, because each Falcon signature has a random salt.
- **Forward secrecy.** If a seed leaks, every capsule made for its key can be opened. Keep
  `validUntil` short, or use one key per session.
- **Replay.** A capsule received twice gives the same secret again: `decapsulate` does not check
  the age of the timestamp. Refusing an old or repeated capsule is the job of the application.
- **The use of the secret.** The secret is a 32-byte key. How the application uses it (for
  example AES-GCM, with a new nonce for each message) is not checked.
- **What the account accepts.** The check is off-chain, with the stored key: it proves that the key
  of the account signed, not that the account itself would accept the signature
  (`is_valid_signature`).
- **Side channels.** As for Falcon, no constant-time guarantee: noble says that JavaScript gives
  none for its ML-KEM code either.
- **A standard protocol.** The two messages and the derivation of the secret are specific to
  starknet.js: no SNIP defines them yet.
