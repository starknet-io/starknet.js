/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import { isBytes } from '@noble/hashes/utils.js';
import * as starknet from 'starknet';
import { nobleEngine } from '../engine/engine';
import { N, Q } from './constants';
import { divZq, modQ, mulNegacyclicInt, mulZq, ntt } from './ntt';
import { packPoly } from './packing';

export const SECRET_KEY_LENGTH = 1281;
export const PUBLIC_KEY_LENGTH = 897;
export const SEED_LENGTH = 48;
export const FALCON_RS_SECRET_KEY_LENGTH = 3584;
const FALCON_RS_POLY_LENGTH = 896;
const SECRET_KEY_HEADER = 0x59; // 0x50 + log2(512)
const PUBLIC_KEY_HEADER = 0x09; // 0x00 + log2(512)
const FG_BITS = 6;
const CAPITAL_FG_BITS = 8;
const FG_MAX = 31; // 2^(6-1) - 1
const CAPITAL_FG_MAX = 127; // 2^(8-1) - 1
const FG_BYTES = (N * FG_BITS) / 8; // 384

export type Falcon512KeyPair = { secretKey: Uint8Array; publicKey: Uint8Array };
/** NTRU secret polynomials, with f·G − g·F = q. */
export type SecretPolys = { f: Int8Array; g: Int8Array; F: Int8Array; G: Int8Array };

/** An array that `wipe` can overwrite with zeros. */
type Wipeable = { fill(value: number): unknown };

/**
 * Copies a Uint8Array, or reads a hex string (with or without 0x), of exactly `expectedLength`
 * bytes. The length is checked first, so `num.hexToBytes` never pads an odd-length string.
 * @param {Uint8Array | string} input the bytes, or their hex string
 * @param {number} expectedLength the number of bytes expected
 * @param {string} label the name of the value, used in the error messages
 * @returns {Uint8Array} a copy of the bytes
 * @throws {Error} when the input is neither bytes nor a hex string, or has another length
 * @example
 * ```typescript
 * const result = toBytes('0x0102', 2, 'key');
 * // result = Uint8Array(2) [1, 2]
 * toBytes('0x010', 2, 'key');
 * // throws Error("Falcon512: key must have 4 hex digits, got 3")
 * ```
 */
export function toBytes(
  input: Uint8Array | string,
  expectedLength: number,
  label: string
): Uint8Array {
  if (isBytes(input)) {
    if (input.length !== expectedLength) {
      throw new Error(`Falcon512: ${label} must be ${expectedLength} bytes, got ${input.length}`);
    }
    return Uint8Array.from(input);
  }
  if (typeof input !== 'string') {
    throw new Error(`Falcon512: ${label} must be a Uint8Array or a hex string`);
  }
  const hex = starknet.encode.removeHexPrefix(input);
  if (!/^[0-9a-fA-F]*$/.test(hex)) {
    throw new Error(`Falcon512: ${label} is not a valid hex string`);
  }
  if (hex.length !== 2 * expectedLength) {
    throw new Error(
      `Falcon512: ${label} must have ${2 * expectedLength} hex digits, got ${hex.length}`
    );
  }
  return starknet.num.hexToBytes(starknet.encode.addHexPrefix(hex));
}

/**
 * Overwrites arrays with zeros (best-effort wiping of secret values).
 * @param {...Wipeable} arrays the arrays to wipe
 * @example
 * ```typescript
 * const secret = Uint8Array.from([1, 2]);
 * wipe(secret);
 * // secret = Uint8Array(2) [0, 0]
 * ```
 */
const wipe = (...arrays: Wipeable[]): void => {
  arrays.forEach((a) => a.fill(0));
};

/**
 * Centers a value of [0, q) in (-q/2, q/2].
 * @param {number} x a value in [0, q)
 * @returns {number} the centered value
 * @example
 * ```typescript
 * const result = center(12288);
 * // result = -1
 * const result2 = center(6144);
 * // result2 = 6144
 * const result3 = center(6145);
 * // result3 = -6144
 * ```
 */
const center = (x: number): number => (x > Q >> 1 ? x - Q : x);

/**
 * Reads the low `bits` bits of raw as a two's complement number.
 * @param {number} raw the unsigned value
 * @param {number} bits the width of the value
 * @returns {number} the signed value
 * @example
 * ```typescript
 * const result = toSigned(0x3f, 6);
 * // result = -1
 * const result2 = toSigned(0x1f, 6);
 * // result2 = 31
 * ```
 */
const toSigned = (raw: number, bits: number): number => (raw << (32 - bits)) >> (32 - bits);

/**
 * NIST encoding: packs values of `bits` bits each, most significant bit first.
 * @param {ArrayLike<number>} values the values (only their low `bits` bits are kept)
 * @param {number} bits the width of each value
 * @returns {Uint8Array} the packed bytes
 * @example
 * ```typescript
 * const result = encodeBitsMSB([1, 2, 3, 4], 6);
 * // result = Uint8Array(3) [4, 32, 196]
 * ```
 */
function encodeBitsMSB(values: ArrayLike<number>, bits: number): Uint8Array {
  const out = new Uint8Array((values.length * bits) / 8);
  const mask = (1 << bits) - 1;
  let acc = 0;
  let accBits = 0;
  let pos = 0;
  for (let i = 0; i < values.length; i++) {
    acc = (acc << bits) | (values[i] & mask);
    accBits += bits;
    while (accBits >= 8) {
      accBits -= 8;
      out[pos++] = (acc >>> accBits) & 0xff;
    }
    acc &= (1 << accBits) - 1;
  }
  return out;
}

/**
 * NIST decoding: reads `count` values of `bits` bits each, most significant bit first.
 * @param {Uint8Array} bytes the packed bytes
 * @param {number} count the number of values
 * @param {number} bits the width of each value
 * @returns {number[]} the unsigned values
 * @throws {Error} when the number of bytes does not match count × bits
 * @example
 * ```typescript
 * const result = decodeBitsMSB(Uint8Array.from([4, 32, 196]), 4, 6);
 * // result = [1, 2, 3, 4]
 * ```
 */
function decodeBitsMSB(bytes: Uint8Array, count: number, bits: number): number[] {
  if (bytes.length * 8 !== count * bits) throw new Error('Falcon512: invalid encoding length');
  const out: number[] = [];
  const mask = (1 << bits) - 1;
  let acc = 0;
  let accBits = 0;
  for (let i = 0; i < bytes.length; i++) {
    acc = (acc << 8) | bytes[i];
    accBits += 8;
    while (accBits >= bits) {
      accBits -= bits;
      out.push((acc >>> accBits) & mask);
    }
    acc &= (1 << accBits) - 1;
  }
  return out;
}

/**
 * falcon-rs encoding: packs values mod q on 14 bits each, least significant bit first, into 896
 * bytes.
 * @param {ArrayLike<number>} values the values, in [0, q)
 * @returns {Uint8Array} the 896 bytes
 * @example
 * ```typescript
 * const result = encode14LSB([1, 2]);
 * // result = Uint8Array(896) [1, 128, 0, 0, …]
 * ```
 */
function encode14LSB(values: ArrayLike<number>): Uint8Array {
  const out = new Uint8Array(FALCON_RS_POLY_LENGTH);
  let acc = 0;
  let accBits = 0;
  let pos = 0;
  for (let i = 0; i < values.length; i++) {
    acc |= values[i] << accBits;
    accBits += 14;
    while (accBits >= 8) {
      out[pos++] = acc & 0xff;
      acc >>>= 8;
      accBits -= 8;
    }
  }
  return out;
}

/**
 * falcon-rs decoding: reads 512 values of 14 bits, least significant bit first. A partial result
 * is wiped when a value is refused.
 * @param {Uint8Array} bytes the 896 bytes of one polynomial
 * @returns {number[]} the 512 values, in [0, q)
 * @throws {Error} when a value is not below q
 * @example
 * ```typescript
 * const result = decode14LSB(encode14LSB(new Array(512).fill(5)));
 * // result = [5, 5, 5, …] (512 values)
 * ```
 */
function decode14LSB(bytes: Uint8Array): number[] {
  const out: number[] = [];
  let acc = 0;
  let accBits = 0;
  let pos = 0;
  try {
    for (let i = 0; i < N; i++) {
      while (accBits < 14) {
        acc |= bytes[pos++] << accBits;
        accBits += 8;
      }
      const v = acc & 0x3fff;
      acc >>>= 14;
      accBits -= 14;
      if (v >= Q) {
        throw new Error('Falcon512: invalid falcon-rs secret key (coefficient out of range)');
      }
      out.push(v);
    }
    return out;
  } catch (error) {
    wipe(out);
    throw error;
  }
}

/**
 * Throws if a coefficient is outside [-max, max].
 * @param {ArrayLike<number>} poly the coefficients
 * @param {number} max the largest absolute value allowed
 * @param {string} label the name of the polynomial, used in the error message
 * @throws {Error} when a coefficient is out of range
 * @example
 * ```typescript
 * checkRange([1, -2, 31], 31, 'f');
 * // passes
 * checkRange([32], 31, 'f');
 * // throws Error("Falcon512: invalid secret key (f coefficient out of range)")
 * ```
 */
function checkRange(poly: ArrayLike<number>, max: number, label: string): void {
  for (let i = 0; i < poly.length; i++) {
    if (poly[i] < -max || poly[i] > max) {
      throw new Error(`Falcon512: invalid secret key (${label} coefficient out of range)`);
    }
  }
}

/**
 * G = g·F / f mod q, centered; throws if f is not invertible or G is not small.
 * @param {Int8Array} f the secret polynomial f
 * @param {Int8Array} g the secret polynomial g
 * @param {Int8Array} F the secret polynomial F
 * @returns {Int8Array} the secret polynomial G
 * @throws {Error} when f is not invertible mod q, or G has a coefficient out of range
 * @example
 * ```typescript
 * const { f, g, F } = decodeSecretKey(generateKeyPair(new Uint8Array(48).fill(1)).secretKey);
 * const result = completeG(f, g, F);
 * // result = Int8Array(512) [37, 8, 43, -40, …]
 * ```
 */
function completeG(f: Int8Array, g: Int8Array, F: Int8Array): Int8Array {
  const gF = mulZq(g, F);
  let quotient: number[] = [];
  let G: number[] = [];
  try {
    quotient = divZq(gF, f);
    G = quotient.map(center);
    checkRange(G, CAPITAL_FG_MAX, 'G');
    return Int8Array.from(G);
  } finally {
    wipe(gF, quotient, G);
  }
}

/**
 * Checks the NTRU equation f·G − g·F = q over Z[x]/(x^512 + 1).
 * @param {SecretPolys} polys the four secret polynomials
 * @throws {Error} when the equation does not hold
 * @example
 * ```typescript
 * const { f, g, F, G } = decodeSecretKey(secretKey);
 * checkNtruEquation({ f, g, F, G });
 * // passes
 * checkNtruEquation({ f, g, F: Int8Array.from(F, (v) => -v), G });
 * // throws Error("Falcon512: invalid secret key (NTRU equation not satisfied)")
 * ```
 */
function checkNtruEquation({ f, g, F, G }: SecretPolys): void {
  const fG = mulNegacyclicInt(f, G);
  const gF = mulNegacyclicInt(g, F);
  try {
    for (let i = 0; i < N; i++) {
      if (fG[i] - gF[i] !== (i === 0 ? Q : 0)) {
        throw new Error('Falcon512: invalid secret key (NTRU equation not satisfied)');
      }
    }
  } finally {
    wipe(fG, gF);
  }
}

/**
 * Decodes one signed polynomial of a NIST secret key; the smallest value of the width is refused.
 * @param {Uint8Array} bytes the encoded polynomial
 * @param {number} bits the width of each coefficient (6 for f and g, 8 for F)
 * @param {string} label the name of the polynomial, used in the error message
 * @returns {Int8Array} the 512 coefficients
 * @throws {Error} when a coefficient has the forbidden value -2^(bits-1)
 * @example
 * ```typescript
 * const { secretKey } = generateKeyPair(new Uint8Array(48).fill(1));
 * const result = decodeSigned(secretKey.subarray(1, 385), 6, 'f');
 * // result = Int8Array(512) [0, 1, -4, 1, …]
 * ```
 */
function decodeSigned(bytes: Uint8Array, bits: number, label: string): Int8Array {
  const min = -(1 << (bits - 1));
  const raw = decodeBitsMSB(bytes, N, bits);
  try {
    return Int8Array.from(raw, (value) => {
      const v = toSigned(value, bits);
      if (v === min) {
        throw new Error(`Falcon512: invalid secret key (forbidden ${label} coefficient)`);
      }
      return v;
    });
  } finally {
    wipe(raw);
  }
}

/**
 * Decodes and fully validates a NIST Falcon-512 secret key. The caller must wipe the result.
 * @param {Uint8Array | string} secretKey the NIST secret key (1281 bytes), or its hex string
 * @returns {SecretPolys} the four NTRU polynomials f, g, F, G
 * @throws {Error} when the key has a wrong length or header, a coefficient out of range, or does
 * not satisfy the NTRU equation
 * @example
 * ```typescript
 * const result = decodeSecretKey(generateKeyPair(new Uint8Array(48).fill(1)).secretKey);
 * // result = { f: Int8Array(512) [0, 1, -4, 1, …], g: Int8Array(512) [1, 3, -1, -2, …],
 * //   F: Int8Array(512) [-32, 20, -61, -5, …], G: Int8Array(512) [37, 8, 43, -40, …] }
 * ```
 */
export function decodeSecretKey(secretKey: Uint8Array | string): SecretPolys {
  const bytes = toBytes(secretKey, SECRET_KEY_LENGTH, 'secret key');
  const parts: Int8Array[] = [];
  try {
    if (bytes[0] !== SECRET_KEY_HEADER) throw new Error('Falcon512: invalid secret key header');
    const f = decodeSigned(bytes.subarray(1, 1 + FG_BYTES), FG_BITS, 'f');
    parts.push(f);
    const g = decodeSigned(bytes.subarray(1 + FG_BYTES, 1 + 2 * FG_BYTES), FG_BITS, 'g');
    parts.push(g);
    const F = decodeSigned(bytes.subarray(1 + 2 * FG_BYTES), CAPITAL_FG_BITS, 'F');
    parts.push(F);
    const G = completeG(f, g, F);
    parts.push(G);
    const polys = { f, g, F, G };
    checkNtruEquation(polys);
    return polys;
  } catch (error) {
    wipe(...parts);
    throw error;
  } finally {
    wipe(bytes);
  }
}

/**
 * Encodes f, g, F into a NIST Falcon-512 secret key.
 * @param {Pick<SecretPolys, 'f' | 'g' | 'F'>} polys the secret polynomials f, g and F
 * @returns {Uint8Array} the NIST secret key (1281 bytes)
 * @throws {Error} when a coefficient is out of range
 * @example
 * ```typescript
 * const { secretKey } = generateKeyPair(new Uint8Array(48).fill(1));
 * const result = encodeSecretKey(decodeSecretKey(secretKey));
 * // result = Uint8Array(1281) [89, 0, 31, 1, 255, 255, …] (the same bytes as secretKey)
 * ```
 */
export function encodeSecretKey({ f, g, F }: Pick<SecretPolys, 'f' | 'g' | 'F'>): Uint8Array {
  checkRange(f, FG_MAX, 'f');
  checkRange(g, FG_MAX, 'g');
  checkRange(F, CAPITAL_FG_MAX, 'F');
  const fBits = Array.from(f, (v) => v & 0x3f);
  const gBits = Array.from(g, (v) => v & 0x3f);
  const capitalFBits = Array.from(F, (v) => v & 0xff);
  const encoded = [
    encodeBitsMSB(fBits, FG_BITS),
    encodeBitsMSB(gBits, FG_BITS),
    encodeBitsMSB(capitalFBits, CAPITAL_FG_BITS),
  ];
  try {
    const out = new Uint8Array(SECRET_KEY_LENGTH);
    out[0] = SECRET_KEY_HEADER;
    out.set(encoded[0], 1);
    out.set(encoded[1], 1 + FG_BYTES);
    out.set(encoded[2], 1 + 2 * FG_BYTES);
    return out;
  } finally {
    wipe(fBits, gBits, capitalFBits, ...encoded);
  }
}

/**
 * Decodes a NIST Falcon-512 public key into h (coefficients in [0, q)).
 * @param {Uint8Array | string} publicKey the NIST public key (897 bytes), or its hex string
 * @returns {Uint16Array} the 512 coefficients of h
 * @throws {Error} when the key has a wrong length or header, or a coefficient is not below q
 * @example
 * ```typescript
 * const result = decodePublicKey(generateKeyPair(new Uint8Array(48).fill(1)).publicKey);
 * // result = Uint16Array(512) [6436, 5476, 5849, 5158, …]
 * ```
 */
export function decodePublicKey(publicKey: Uint8Array | string): Uint16Array {
  const bytes = toBytes(publicKey, PUBLIC_KEY_LENGTH, 'public key');
  if (bytes[0] !== PUBLIC_KEY_HEADER) throw new Error('Falcon512: invalid public key header');
  const h = decodeBitsMSB(bytes.subarray(1), N, 14);
  if (h.some((v) => v >= Q)) {
    throw new Error('Falcon512: invalid public key (coefficient out of range)');
  }
  return Uint16Array.from(h);
}

/**
 * Encodes h into a NIST Falcon-512 public key.
 * @param {ArrayLike<number>} h the 512 coefficients of h, in [0, q)
 * @returns {Uint8Array} the NIST public key (897 bytes)
 * @throws {Error} when h does not have 512 coefficients, or one of them is not in [0, q)
 * @example
 * ```typescript
 * const { publicKey } = generateKeyPair(new Uint8Array(48).fill(1));
 * const result = encodePublicKey(decodePublicKey(publicKey));
 * // result = Uint8Array(897) [9, 100, 145, 86, 69, 182, …] (the same bytes as publicKey)
 * ```
 */
export function encodePublicKey(h: ArrayLike<number>): Uint8Array {
  if (h.length !== N) {
    throw new Error(`Falcon512: public key polynomial must have ${N} coefficients`);
  }
  for (let i = 0; i < N; i++) {
    if (!Number.isInteger(h[i]) || h[i] < 0 || h[i] >= Q) {
      throw new Error('Falcon512: invalid public key (coefficient out of range)');
    }
  }
  const out = new Uint8Array(PUBLIC_KEY_LENGTH);
  out[0] = PUBLIC_KEY_HEADER;
  out.set(encodeBitsMSB(h, 14), 1);
  return out;
}

/**
 * New key pair (NIST formats). The optional seed must be 48 bytes from a CSPRNG.
 * @param {Uint8Array} [seed] 48 random bytes; by default, drawn by the engine
 * @returns {Falcon512KeyPair} the secret key (1281 bytes) and the public key (897 bytes)
 * @throws {Error} when the seed is not 48 bytes
 * @example
 * ```typescript
 * const result = falcon512.generateKeyPair();
 * // result = { secretKey: Uint8Array(1281) [89, …], publicKey: Uint8Array(897) [9, …] }
 * // A new random key at each call; 89 (0x59) and 9 (0x09) are the headers of the two formats.
 * ```
 */
export function generateKeyPair(seed?: Uint8Array): Falcon512KeyPair {
  if (seed !== undefined && (!isBytes(seed) || seed.length !== SEED_LENGTH)) {
    throw new Error(`Falcon512: seed must be a Uint8Array of ${SEED_LENGTH} bytes`);
  }
  return nobleEngine.keygen(seed);
}

/**
 * Public key h = g / f mod q of a validated secret key (NIST format).
 * @param {Uint8Array | string} secretKey the NIST secret key (1281 bytes), or its hex string
 * @returns {Uint8Array} the NIST public key (897 bytes)
 * @throws {Error} when the secret key is invalid
 * @example
 * ```typescript
 * const { secretKey, publicKey } = falcon512.generateKeyPair();
 * const result = falcon512.getPublicKey(secretKey);
 * // result = Uint8Array(897) [9, …] (the same bytes as publicKey)
 * ```
 */
export function getPublicKey(secretKey: Uint8Array | string): Uint8Array {
  const polys = decodeSecretKey(secretKey);
  try {
    return encodePublicKey(divZq(polys.g, polys.f));
  } finally {
    wipe(polys.f, polys.g, polys.F, polys.G);
  }
}

/**
 * NTT of h, as stored by the S2morrow account.
 * @param {Uint8Array | string} publicKey the NIST public key (897 bytes), or its hex string
 * @returns {Uint16Array} the 512 values of NTT(h)
 * @throws {Error} when the public key is invalid
 * @example
 * ```typescript
 * const result = publicKeyToNtt(generateKeyPair(new Uint8Array(48).fill(1)).publicKey);
 * // result = Uint16Array(512) [11282, 2302, 6547, 2550, …]
 * ```
 */
export function publicKeyToNtt(publicKey: Uint8Array | string): Uint16Array {
  return Uint16Array.from(ntt(decodePublicKey(publicKey)));
}

/**
 * The 29 felts of the account constructor argument `pk_packed`.
 * @param {Uint8Array | string} publicKey the NIST public key (897 bytes), or its hex string
 * @returns {string[]} the 29 felts, as hex strings
 * @throws {Error} when the public key is invalid
 * @example
 * ```typescript
 * const { publicKey } = falcon512.generateKeyPair();
 * const result = falcon512.getPackedPublicKey(publicKey);
 * // result = ['0x…', …] (29 felts)
 * ```
 */
export function getPackedPublicKey(publicKey: Uint8Array | string): string[] {
  return packPoly(publicKeyToNtt(publicKey)).map((x) => starknet.num.toHex(x));
}

/**
 * Converts a falcon-rs secret key (f‖g‖F‖G, 4 × 896 bytes) into a NIST secret key.
 *
 * Warning: falcon-rs derives the seed of its sampler from the public salt of each signature, so the
 * signatures it produced may leak information about the secret key. Import such a key for
 * continuity only; for real funds, generate a new key with `generateKeyPair`.
 * @param {Uint8Array | string} secretKey the falcon-rs secret key (3584 bytes), or its hex string
 * @returns {Uint8Array} the NIST secret key (1281 bytes)
 * @throws {Error} when the key has a wrong length, a coefficient out of range, a G that does not
 * match f, g, F, or does not satisfy the NTRU equation
 * @example
 * ```typescript
 * const result = falcon512.importFalconRsSecretKey(falconRsSecretKey);
 * // result = Uint8Array(1281) [89, …] (NIST header 0x59)
 * ```
 */
export function importFalconRsSecretKey(secretKey: Uint8Array | string): Uint8Array {
  const bytes = toBytes(secretKey, FALCON_RS_SECRET_KEY_LENGTH, 'falcon-rs secret key');
  const parts: Wipeable[] = [];
  try {
    const names = ['f', 'g', 'F', 'G'];
    const [f, g, F, G] = names.map((name, k) => {
      const chunk = bytes.subarray(k * FALCON_RS_POLY_LENGTH, (k + 1) * FALCON_RS_POLY_LENGTH);
      const decoded = decode14LSB(chunk);
      parts.push(decoded);
      const poly = decoded.map(center);
      parts.push(poly);
      checkRange(poly, k < 2 ? FG_MAX : CAPITAL_FG_MAX, name);
      const p = Int8Array.from(poly);
      parts.push(p);
      return p;
    });
    const recomputed = completeG(f, g, F);
    parts.push(recomputed);
    if (recomputed.some((v, i) => v !== G[i])) {
      throw new Error('Falcon512: invalid falcon-rs secret key (G does not match f, g, F)');
    }
    checkNtruEquation({ f, g, F, G });
    return encodeSecretKey({ f, g, F });
  } finally {
    wipe(bytes, ...parts);
  }
}

/**
 * Converts a NIST secret key into the falcon-rs format (f‖g‖F‖G, 4 × 896 bytes).
 *
 * Warning: falcon-rs derives the seed of its sampler from the public salt of each signature, so
 * signing with falcon-rs exposes the key: keep signing with this library.
 * @param {Uint8Array | string} secretKey the NIST secret key (1281 bytes), or its hex string
 * @returns {Uint8Array} the falcon-rs secret key (3584 bytes)
 * @throws {Error} when the secret key is invalid
 * @example
 * ```typescript
 * const { secretKey } = falcon512.generateKeyPair();
 * const result = falcon512.exportFalconRsSecretKey(secretKey);
 * // result = Uint8Array(3584) […]
 * ```
 */
export function exportFalconRsSecretKey(secretKey: Uint8Array | string): Uint8Array {
  const polys = decodeSecretKey(secretKey);
  const parts: Wipeable[] = [];
  try {
    const out = new Uint8Array(FALCON_RS_SECRET_KEY_LENGTH);
    [polys.f, polys.g, polys.F, polys.G].forEach((p, k) => {
      const values = Array.from(p, modQ);
      const encoded = encode14LSB(values);
      parts.push(values, encoded);
      out.set(encoded, k * FALCON_RS_POLY_LENGTH);
    });
    return out;
  } finally {
    wipe(polys.f, polys.g, polys.F, polys.G, ...parts);
  }
}
