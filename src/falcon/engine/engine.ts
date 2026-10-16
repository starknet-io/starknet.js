import { falcon512 } from './noble/falcon';

/**
 * Falcon-512 primitives used by the S2morrow layer (NIST key formats). `nobleEngine` is the only
 * implementation: this interface keeps the rest of `starknet/falcon` independent from the place the
 * Falcon code comes from.
 */
export interface FalconEngine {
  /**
   * New key pair.
   * @param {Uint8Array} [seed] 48 random bytes; by default, drawn by noble
   * @returns {{ secretKey: Uint8Array; publicKey: Uint8Array }} the NIST secret key (1281 bytes)
   * and the NIST public key (897 bytes)
   * @example
   * ```typescript
   * const result = nobleEngine.keygen(new Uint8Array(48).fill(1));
   * // result = { secretKey: Uint8Array(1281) [89, 0, 31, 1, 255, 255, …],
   * //   publicKey: Uint8Array(897) [9, 100, 145, 86, 69, 182, …] }
   * ```
   */
  keygen(seed?: Uint8Array): { secretKey: Uint8Array; publicKey: Uint8Array };
  /**
   * Public key of a NIST secret key. Not used by the signer, which computes h = g / f itself: kept
   * to cross-check that code in the tests.
   * @param {Uint8Array} secretKey the NIST secret key (1281 bytes)
   * @returns {Uint8Array} the NIST public key (897 bytes)
   * @example
   * ```typescript
   * const { secretKey } = nobleEngine.keygen(new Uint8Array(48).fill(1));
   * const result = nobleEngine.getPublicKey(secretKey);
   * // result = Uint8Array(897) [9, 100, 145, 86, 69, 182, …]
   * ```
   */
  getPublicKey(secretKey: Uint8Array): Uint8Array;
  /**
   * Signs a hash point. Draws a new sampler seed at each call.
   * @param {Uint16Array} hashPoint the 512 coefficients of the hash point, in [0, q)
   * @param {Uint8Array} secretKey the NIST secret key (1281 bytes)
   * @returns {Int16Array} s2, the 512 coefficients that the signature carries (the S2morrow
   * account names this polynomial s1)
   * @example
   * ```typescript
   * const hashPoint = hashToPoint([42n], [1n, 2n]);
   * const result = nobleEngine.signHashPoint(hashPoint, secretKey);
   * // result = Int16Array(512) [-248, -33, -9, -221, …] (random: a new sampler seed at each call)
   * ```
   */
  signHashPoint(hashPoint: Uint16Array, secretKey: Uint8Array): Int16Array;
  /**
   * Checks s2 against a hash point, with the norm check of noble. Not used by the signer, which
   * checks the equation of the S2morrow account instead: kept for the tests.
   * @param {Int16Array} s2 the 512 coefficients returned by `signHashPoint`
   * @param {Uint16Array} hashPoint the 512 coefficients of the hash point, in [0, q)
   * @param {Uint8Array} publicKey the NIST public key (897 bytes)
   * @returns {boolean} true when s2 is a valid signature of the hash point
   * @example
   * ```typescript
   * const s2 = nobleEngine.signHashPoint(hashPoint, secretKey);
   * const result = nobleEngine.verifyHashPoint(s2, hashPoint, publicKey);
   * // result = true
   * ```
   */
  verifyHashPoint(s2: Int16Array, hashPoint: Uint16Array, publicKey: Uint8Array): boolean;
}

/**
 * The engine of `starknet/falcon`, backed by a copy of `@noble/post-quantum` 0.7.1. This file is
 * the only one of `src/falcon/` that imports the copy.
 *
 * What is copied: `noble/falcon.ts`, `noble/_crystals.ts`, `noble/utils.ts` and `noble/LICENSE`
 * (MIT, Paul Miller), from the npm package `@noble/post-quantum@0.7.1`. The copy adds one thing:
 * `falcon512.internal`, with `sign(hashPoint, secretKey)` and `verify(s2, hashPoint, publicKey)`.
 * noble 0.7.1 computes the hash point itself, with SHAKE256, inside `genFalcon`; the S2morrow
 * account needs a Poseidon hash point, computed by `s2morrow/hashToPoint.ts`. `noble/PATCH.md`
 * lists the changes, the exact diff and the SHA-256 of each copied file, checked by
 * `__tests__/utils/falcon/vendor.test.ts`. ESLint and Prettier skip the copy.
 *
 * Why a copy: this API is proposed to noble in
 * https://github.com/paulmillr/noble-post-quantum/pull/55, not merged yet (2026-10-16).
 *
 * The switch, once noble publishes this API:
 * 1. `package.json`: add `@noble/post-quantum` to the dependencies, and remove `@noble/ciphers`
 *    (only the copy imports it; noble brings its own).
 * 2. Here: import `falcon512` from `@noble/post-quantum/falcon.js`, and adapt the four functions
 *    below if the published names differ.
 * 3. Delete the folder `noble/`, its line in `.prettierignore` (and the file, if no other line is
 *    left), the test `__tests__/utils/falcon/vendor.test.ts`, and the point "Traceable vendored
 *    code" of `src/falcon/SECURITY.md`.
 * 4. Tests: in `engine.test.ts`, `keys.test.ts` and `signature.test.ts`, import `falcon512` from
 *    `@noble/post-quantum/falcon.js`; `engine.test.ts` checks the patched API: adapt it to the
 *    published one. In `boundaries.test.ts`, replace `@noble/ciphers` with `@noble/post-quantum`.
 * 5. Docs: remove the mention of the copy from the JSDoc of `Falcon512Signer` and from the module
 *    comment of `src/falcon/index.ts`.
 *
 * The public API of `starknet/falcon` does not change, and the other tests pass unchanged.
 */
export const nobleEngine: FalconEngine = Object.freeze({
  keygen: (seed?: Uint8Array) => falcon512.keygen(seed),
  getPublicKey: (secretKey: Uint8Array) => falcon512.getPublicKey(secretKey),
  signHashPoint: (hashPoint: Uint16Array, secretKey: Uint8Array) =>
    falcon512.internal.sign(hashPoint, secretKey),
  verifyHashPoint: (s2: Int16Array, hashPoint: Uint16Array, publicKey: Uint8Array) =>
    falcon512.internal.verify(s2, hashPoint, publicKey),
});
