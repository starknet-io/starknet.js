import { randomBytes as cryptoRandomBytes } from '@noble/hashes/utils.js';
import * as starknet from 'starknet';
import { nobleEngine, type FalconEngine } from '../engine/engine';
import { N, PACKED_SLOTS, Q, SALT_FELTS, SIG_BOUND_512, SIGNATURE_FELTS } from './constants';
import { assertFelt, parseFelt } from './felt';
import { hashToPoint } from './hashToPoint';
import { intt, modQ, ntt } from './ntt';
import { packPoly, unpackPoly } from './packing';

/** Decoded S2morrow signature (Serde of PackedFalconSignatureWithHint). */
export type FalconStarknetSignature = { s1: Uint16Array; salt: bigint[]; mulHint: Uint16Array };
/** Injectable dependencies of signHash (tests only). */
export type SignDeps = { engine: FalconEngine; randomBytes: (length: number) => Uint8Array };

const defaultDeps: SignDeps = { engine: nobleEngine, randomBytes: cryptoRandomBytes };

/**
 * mul_hint = INTT(NTT(s1) ⊙ pkNtt) = s1·h mod (x^512 + 1, q).
 * @param {ArrayLike<number>} s1 the 512 coefficients of s1, in [0, q)
 * @param {ArrayLike<number>} pkNtt the NTT of the public polynomial h
 * @returns {number[]} the 512 coefficients of s1·h, in [0, q)
 * @example
 * ```typescript
 * const { publicKey } = generateKeyPair(new Uint8Array(48).fill(1));
 * const s1 = [1, ...new Array(511).fill(0)];
 * const result = computeMulHint(s1, publicKeyToNtt(publicKey));
 * // result = [6436, 5476, 5849, 5158, …] (512 values): h itself, since s1 = 1
 * ```
 */
export function computeMulHint(s1: ArrayLike<number>, pkNtt: ArrayLike<number>): number[] {
  const s1Ntt = ntt(s1);
  return intt(s1Ntt.map((v, i) => (v * pkNtt[i]) % Q));
}

/**
 * Square of x after centering it in (-q/2, q/2]: the norm used by falcon.cairo.
 * @param {number} x a value in [0, q)
 * @returns {number} the square of the centered value
 * @example
 * ```typescript
 * const result = centeredSquare(12288);
 * // result = 1   (12288 is -1 once centered)
 * const result2 = centeredSquare(3);
 * // result2 = 9
 * ```
 */
const centeredSquare = (x: number): number => {
  const c = x <= (Q - 1) / 2 ? x : Q - x;
  return c * c;
};

/**
 * Mirror of falcon.cairo `verify_with_msg_point`: NTT(s1) ⊙ pkNtt = NTT(mulHint), and
 * ‖hashPoint − mulHint‖² + ‖s1‖² ≤ SIG_BOUND_512 (centered norms). Inputs in [0, q).
 * @param {ArrayLike<number>} hashPoint the 512 coefficients of the hash point
 * @param {ArrayLike<number>} s1 the 512 coefficients of s1
 * @param {ArrayLike<number>} mulHint the 512 coefficients of the hint s1·h
 * @param {ArrayLike<number>} pkNtt the NTT of the public polynomial h
 * @returns {boolean} true when the hint is right and the signature is short enough
 * @example
 * ```typescript
 * const signature = signHash(0x1234n, secretKey, pkNtt);
 * const { s1, salt, mulHint } = parseSignature(signature);
 * const result = checkSignatureEquation(hashToPoint([0x1234n], salt), s1, mulHint, pkNtt);
 * // result = true
 * ```
 */
export function checkSignatureEquation(
  hashPoint: ArrayLike<number>,
  s1: ArrayLike<number>,
  mulHint: ArrayLike<number>,
  pkNtt: ArrayLike<number>
): boolean {
  if (hashPoint.length !== N || s1.length !== N || mulHint.length !== N || pkNtt.length !== N) {
    return false;
  }
  const s1Ntt = ntt(s1);
  const hintNtt = ntt(mulHint);
  for (let i = 0; i < N; i += 1) {
    if ((s1Ntt[i] * pkNtt[i]) % Q !== hintNtt[i]) return false;
  }
  let norm = 0;
  for (let i = 0; i < N; i += 1) {
    norm += centeredSquare(modQ(hashPoint[i] - mulHint[i])) + centeredSquare(s1[i]);
  }
  return norm <= SIG_BOUND_512;
}

/**
 * 61 felts: [s1 packed (29)] [salt length] [salt…] [mul_hint packed (29)].
 * @param {FalconStarknetSignature} sig the decoded signature
 * @returns {string[]} the 61 felts, as hex strings
 * @example
 * ```typescript
 * const signature = signHash(0x1234n, secretKey, pkNtt);
 * const result = formatSignature(parseSignature(signature));
 * // result = signature (the same 61 felts); result[29] = '0x2' (salt length)
 * ```
 */
export function formatSignature(sig: FalconStarknetSignature): string[] {
  const felts = [
    ...packPoly(sig.s1),
    BigInt(sig.salt.length),
    ...sig.salt,
    ...packPoly(sig.mulHint),
  ];
  return felts.map((x) => starknet.num.toHex(x));
}

/**
 * Strict parsing of a 61-felt signature (hex or decimal strings, numbers, bigints).
 * @param {unknown[]} signature the 61 felts
 * @returns {FalconStarknetSignature} s1, the salt (2 felts) and mul_hint
 * @throws {Error} when the signature does not have 61 felts, a felt is invalid, or the salt
 * length is not 2
 * @example
 * ```typescript
 * const result = parseSignature(signHash(0x1234n, secretKey, pkNtt));
 * // result = { s1: Uint16Array(512) [12275, 53, 11941, 226, …], salt: [two felts], mulHint: Uint16Array(512) […] }
 * parseSignature(['0x1']);
 * // throws Error("Falcon512: signature must have 61 felts")
 * ```
 */
export function parseSignature(signature: readonly unknown[]): FalconStarknetSignature {
  if (!Array.isArray(signature) || signature.length !== SIGNATURE_FELTS) {
    throw new Error(`Falcon512: signature must have ${SIGNATURE_FELTS} felts`);
  }
  const felts = signature.map((x, i) => parseFelt(x, `signature[${i}]`));
  if (felts[PACKED_SLOTS] !== BigInt(SALT_FELTS)) {
    throw new Error('Falcon512: unexpected salt length');
  }
  const saltStart = PACKED_SLOTS + 1;
  return {
    s1: unpackPoly(felts.slice(0, PACKED_SLOTS)),
    salt: felts.slice(saltStart, saltStart + SALT_FELTS),
    mulHint: unpackPoly(felts.slice(saltStart + SALT_FELTS)),
  };
}

/**
 * A salt felt of 248 random bits (31 bytes), always below P.
 * @param {(length: number) => Uint8Array} randomBytes the source of random bytes
 * @returns {bigint} the salt felt
 * @example
 * ```typescript
 * const result = randomSaltFelt((n) => new Uint8Array(n).fill(1));
 * // result = 1773775876797123091660094745843871137458179912157484130506396813846708481n (0x0101…01)
 * ```
 */
const randomSaltFelt = (randomBytes: SignDeps['randomBytes']): bigint =>
  BigInt(`0x${starknet.encode.buf2hex(randomBytes(31))}`); // 248 bits < P

/**
 * Signs a message hash for the S2morrow account (internal: never exported by index.ts, to avoid
 * blind signing). The engine draws its own sampler seed, independent from the public salt. The
 * encoded signature is re-checked (reusing the hash point) before being returned.
 * @param {bigint} msgHash the hash to sign, a felt252
 * @param {Uint8Array} secretKey the NIST Falcon-512 secret key (1281 bytes)
 * @param {Uint16Array} pkNtt the NTT of the public polynomial h
 * @param {SignDeps} [deps] the engine and the random source (tests only)
 * @returns {string[]} the 61 felts of the signature
 * @throws {Error} when msgHash is not a felt252, or the self-verification fails
 * @example
 * ```typescript
 * const { secretKey, publicKey } = generateKeyPair(new Uint8Array(48).fill(1));
 * const result = signHash(0x1234n, secretKey, publicKeyToNtt(publicKey));
 * // result = ['0x…', …] (61 felts, random salt); result[29] = '0x2'
 * ```
 */
export function signHash(
  msgHash: bigint,
  secretKey: Uint8Array,
  pkNtt: Uint16Array,
  deps: SignDeps = defaultDeps
): string[] {
  assertFelt(msgHash, 'message hash');
  const salt = [randomSaltFelt(deps.randomBytes), randomSaltFelt(deps.randomBytes)];
  const hashPoint = hashToPoint([msgHash], salt);
  const s2 = deps.engine.signHashPoint(hashPoint, secretKey);
  const s1 = Uint16Array.from(s2, modQ);
  const mulHint = Uint16Array.from(computeMulHint(s1, pkNtt));
  const signature = formatSignature({ s1, salt, mulHint });
  const decoded = parseSignature(signature);
  if (!checkSignatureEquation(hashPoint, decoded.s1, decoded.mulHint, pkNtt)) {
    throw new Error('Falcon512: self-verification failed, signature discarded');
  }
  return signature;
}

/**
 * Verifies a 61-felt signature of msgHash; false for any malformed input.
 * @param {bigint} msgHash the signed hash
 * @param {unknown[]} signature the 61 felts
 * @param {ArrayLike<number>} pkNtt the NTT of the public polynomial h
 * @returns {boolean} true for a valid signature of msgHash, false otherwise
 * @example
 * ```typescript
 * const signature = signHash(0x1234n, secretKey, pkNtt);
 * const result = verifyHash(0x1234n, signature, pkNtt);
 * // result = true
 * const result2 = verifyHash(0x1235n, signature, pkNtt);
 * // result2 = false
 * ```
 */
export function verifyHash(
  msgHash: bigint,
  signature: readonly unknown[],
  pkNtt: ArrayLike<number>
): boolean {
  let decoded: FalconStarknetSignature;
  try {
    assertFelt(msgHash, 'message hash');
    decoded = parseSignature(signature);
  } catch {
    return false;
  }
  return checkSignatureEquation(
    hashToPoint([msgHash], decoded.salt),
    decoded.s1,
    decoded.mulHint,
    pkNtt
  );
}
