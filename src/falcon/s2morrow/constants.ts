// Falcon-512 / S2morrow constants shared by the pure-TypeScript implementation.

/** Falcon modulus q. */
export const Q = 12289;
/** q as a bigint. */
export const QB = 12289n;
/** Degree of the polynomials (Falcon-512). */
export const N = 512;
/** Squared-norm bound of a Falcon-512 signature; identical to SIG_BOUND_512 in falcon.cairo. */
export const SIG_BOUND_512 = 34034726;
/** Number of felt252 of a packed 512-coefficient polynomial. */
export const PACKED_SLOTS = 29;
/** Zq values packed in each u128 half of a felt252 (base-Q Horner encoding). */
export const VALUES_PER_HALF = 9;
/** Number of salt felts produced by this signer. */
export const SALT_FELTS = 2;
/** Signature length: s1 (29) + salt length (1) + salt (2) + mul_hint (29). */
export const SIGNATURE_FELTS = 61;
