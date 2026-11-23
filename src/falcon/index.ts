/**
 * Entry point of `starknet/falcon`: a signer for the Falcon-512 accounts (the S2morrow account, and
 * the two Falcon-512 accounts of OpenZeppelin Contracts for Cairo), a post-quantum signature. Import
 * it from `starknet/falcon`, not from `starknet`:
 *
 * ```typescript
 * import { Falcon512Signer, falcon512 } from 'starknet/falcon';
 * const { secretKey, publicKey } = falcon512.generateKeyPair();
 * const mySigner = new Falcon512Signer(secretKey); // for an S2morrow account
 * const myOzSigner = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
 * ```
 *
 * The Falcon code is a copy of `@noble/post-quantum` 0.7.1 (MIT, Paul Miller), with one addition:
 * signing and verifying a hash point computed outside noble, because the S2morrow account hashes
 * the transaction with Poseidon, not with SHAKE256. This addition is proposed to noble in
 * https://github.com/paulmillr/noble-post-quantum/pull/55. Once noble publishes it,
 * `starknet/falcon` will use the npm package and drop the copy, with no change to its own API.
 *
 * Status: Falcon as submitted to Round 3 of the NIST post-quantum standardization, not FN-DSA
 * (FIPS 206); noble has no independent audit (its author audited version 0.6.1); signing is not
 * constant-time. Details in the documentation of `Falcon512Signer`.
 * @module
 */
export { Falcon512Signer } from './Falcon512Signer';
export * as falcon512 from './falcon512';
export type { Falcon512KeyPair } from './s2morrow/keys';
export type { Falcon512AccountType, Falcon512Options } from './accountType';
