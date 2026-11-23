// Signature layouts of the OpenZeppelin Falcon-512 accounts (OpenZeppelin Contracts for Cairo
// v4.1.0-rc.0): direct = s1 (29 felts) ‖ salt_a ‖ salt_b; hint = direct ‖ s1·h (29 felts).
import { randomBytes as cryptoRandomBytes } from '@noble/hashes/utils.js';
import * as starknet from 'starknet';
import { nobleEngine } from '../engine/engine';
import { PACKED_SLOTS } from '../s2morrow/constants';
import { assertFelt, parseFelt } from '../s2morrow/felt';
import { modQ } from '../s2morrow/ntt';
import { packPoly, unpackPoly } from '../s2morrow/packing';
import { checkSignatureEquation, computeMulHint, type SignDeps } from '../s2morrow/signature';
import { hashToPointShake, SALT_BYTES, saltFeltsToBytes } from './hashToPoint';

/** The two signature layouts of the OpenZeppelin Falcon-512 accounts. */
export type OzVariant = 'hint' | 'direct';

/** Signature length: s1 (29) and the salt (2), plus the hint s1·h (29) in the hint layout. */
export const OZ_SIGNATURE_FELTS: Readonly<Record<OzVariant, number>> = Object.freeze({
  hint: 2 * PACKED_SLOTS + 2,
  direct: PACKED_SLOTS + 2,
});

/** Decoded OpenZeppelin signature. `mulHint` is present in the hint layout only. */
export type OzSignature = { s1: Uint16Array; saltA: bigint; saltB: bigint; mulHint?: Uint16Array };

const defaultDeps: SignDeps = { engine: nobleEngine, randomBytes: cryptoRandomBytes };

/**
 * Reads bytes as a number, least significant byte first.
 * @param {Uint8Array} bytes the bytes to read
 * @returns {bigint} the number
 * @example
 * ```typescript
 * const result = readLittleEndian(Uint8Array.from([2, 1]));
 * // result = 258n   (0x0102)
 * ```
 */
const readLittleEndian = (bytes: Uint8Array): bigint =>
  bytes.reduceRight((acc, byte) => acc * 256n + BigInt(byte), 0n);

/**
 * Encodes a signature in an OpenZeppelin layout: s1 packed (29 felts), salt_a, salt_b, then the
 * hint s1·h packed (29 felts) in the hint layout.
 * @param {OzSignature} sig the decoded signature
 * @param {OzVariant} variant the layout: 'hint' (60 felts) or 'direct' (31 felts)
 * @returns {string[]} the felts, as hex strings
 * @throws {Error} when the hint layout is asked without the hint polynomial
 * @example
 * ```typescript
 * const signature = signHashOz(0x1234n, secretKey, pkNtt, 'hint');
 * const result = formatOzSignature(parseOzSignature(signature, 'hint'), 'hint');
 * // result = signature (the same 60 felts)
 * ```
 */
export function formatOzSignature(sig: OzSignature, variant: OzVariant): string[] {
  const felts = [...packPoly(sig.s1), sig.saltA, sig.saltB];
  if (variant === 'hint') {
    if (!sig.mulHint) throw new Error('Falcon512: the hint layout needs the hint polynomial');
    felts.push(...packPoly(sig.mulHint));
  }
  return felts.map((x) => starknet.num.toHex(x));
}

/**
 * Strict parsing of a signature in an OpenZeppelin layout (hex or decimal strings, numbers,
 * bigints).
 * @param {unknown[]} signature the felts of the signature
 * @param {OzVariant} variant the expected layout: 'hint' (60 felts) or 'direct' (31 felts)
 * @returns {OzSignature} s1, the two salt felts and, in the hint layout, the hint
 * @throws {Error} when the signature does not have the length of the layout, a felt is invalid, a
 * polynomial is not canonical, or a salt felt is not below 2^160
 * @example
 * ```typescript
 * const result = parseOzSignature(signHashOz(0x1234n, secretKey, pkNtt, 'direct'), 'direct');
 * // result = { s1: Uint16Array(512) […], saltA: …n, saltB: …n, mulHint: undefined }
 * parseOzSignature(['0x1'], 'hint');
 * // throws Error("Falcon512: signature must have 60 felts")
 * ```
 */
export function parseOzSignature(signature: readonly unknown[], variant: OzVariant): OzSignature {
  const length = OZ_SIGNATURE_FELTS[variant];
  if (!Array.isArray(signature) || signature.length !== length) {
    throw new Error(`Falcon512: signature must have ${length} felts`);
  }
  const felts = signature.map((x, i) => parseFelt(x, `signature[${i}]`));
  const saltA = felts[PACKED_SLOTS];
  const saltB = felts[PACKED_SLOTS + 1];
  saltFeltsToBytes(saltA, saltB); // throws when a salt felt is not below 2^160
  return {
    s1: unpackPoly(felts.slice(0, PACKED_SLOTS)),
    saltA,
    saltB,
    mulHint: variant === 'hint' ? unpackPoly(felts.slice(PACKED_SLOTS + 2)) : undefined,
  };
}

/**
 * Signs a message hash for an OpenZeppelin account (internal: never exported by index.ts, to avoid
 * blind signing). The salt is 40 random bytes; the engine draws its own sampler seed, independent
 * from the public salt. The encoded signature is checked again before being returned.
 * @param {bigint} msgHash the hash to sign, a felt252
 * @param {Uint8Array} secretKey the NIST Falcon-512 secret key (1281 bytes)
 * @param {Uint16Array} pkNtt the NTT of the public polynomial h
 * @param {OzVariant} variant the layout: 'hint' (60 felts) or 'direct' (31 felts)
 * @param {SignDeps} [deps] the engine and the random source (tests only)
 * @returns {string[]} the felts of the signature, as hex strings
 * @throws {Error} when msgHash is not a felt252, or the self-verification fails
 * @example
 * ```typescript
 * const { secretKey, publicKey } = generateKeyPair();
 * const result = signHashOz(0x1234n, secretKey, publicKeyToNtt(publicKey), 'hint');
 * // result = ['0x…', …] (60 felts, random salt)
 * ```
 */
export function signHashOz(
  msgHash: bigint,
  secretKey: Uint8Array,
  pkNtt: Uint16Array,
  variant: OzVariant,
  deps: SignDeps = defaultDeps
): string[] {
  assertFelt(msgHash, 'message hash');
  const salt = deps.randomBytes(2 * SALT_BYTES);
  const saltA = readLittleEndian(salt.subarray(0, SALT_BYTES));
  const saltB = readLittleEndian(salt.subarray(SALT_BYTES));
  const hashPoint = hashToPointShake(msgHash, saltA, saltB);
  const s1 = Uint16Array.from(deps.engine.signHashPoint(hashPoint, secretKey), modQ);
  const mulHint = variant === 'hint' ? Uint16Array.from(computeMulHint(s1, pkNtt)) : undefined;
  const signature = formatOzSignature({ s1, saltA, saltB, mulHint }, variant);
  const decoded = parseOzSignature(signature, variant);
  const decodedHint = decoded.mulHint ?? computeMulHint(decoded.s1, pkNtt);
  if (!checkSignatureEquation(hashPoint, decoded.s1, decodedHint, pkNtt)) {
    throw new Error('Falcon512: self-verification failed, signature discarded');
  }
  return signature;
}

/**
 * Verifies a signature of msgHash in an OpenZeppelin layout; false for any malformed input. In the
 * direct layout, the product s1·h is computed here, as the direct account does on-chain.
 * @param {bigint} msgHash the signed hash
 * @param {unknown[]} signature the felts of the signature
 * @param {ArrayLike<number>} pkNtt the NTT of the public polynomial h
 * @param {OzVariant} variant the expected layout: 'hint' (60 felts) or 'direct' (31 felts)
 * @returns {boolean} true for a valid signature of msgHash in this layout, false otherwise
 * @example
 * ```typescript
 * const signature = signHashOz(0x1234n, secretKey, pkNtt, 'direct');
 * const result = verifyHashOz(0x1234n, signature, pkNtt, 'direct');
 * // result = true
 * const result2 = verifyHashOz(0x1234n, signature, pkNtt, 'hint');
 * // result2 = false (31 felts, not 60)
 * ```
 */
export function verifyHashOz(
  msgHash: bigint,
  signature: readonly unknown[],
  pkNtt: ArrayLike<number>,
  variant: OzVariant
): boolean {
  let decoded: OzSignature;
  try {
    assertFelt(msgHash, 'message hash');
    decoded = parseOzSignature(signature, variant);
  } catch {
    return false;
  }
  const mulHint = decoded.mulHint ?? computeMulHint(decoded.s1, pkNtt);
  return checkSignatureEquation(
    hashToPointShake(msgHash, decoded.saltA, decoded.saltB),
    decoded.s1,
    mulHint,
    pkNtt
  );
}
