/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import { N, Q } from './constants';
import { NTT_ROOTS_ALL } from './nttRoots';

/** Inverse of 2 mod q. */
const I2 = 6145;
/** Square root of -1 mod q (NTT root for n = 2). */
const SQR1 = 1479;

/**
 * Reduces an integer to [0, q).
 * @param {number} a an integer, possibly negative
 * @returns {number} a mod q, in [0, q)
 * @example
 * ```typescript
 * const result = modQ(-1);
 * // result = 12288
 * const result2 = modQ(12290);
 * // result2 = 1
 * ```
 */
export const modQ = (a: number): number => ((a % Q) + Q) % Q;

/**
 * base^exponent mod q, by square and multiply.
 * @param {number} base the base
 * @param {number} exponent a non-negative integer
 * @returns {number} the power, in [0, q)
 * @example
 * ```typescript
 * const result = powMod(2, 10);
 * // result = 1024
 * const result2 = powMod(1479, 2);
 * // result2 = 12288   (1479 is a square root of -1 mod q)
 * ```
 */
function powMod(base: number, exponent: number): number {
  let result = 1;
  let b = modQ(base);
  for (let e = exponent; e > 0; e >>= 1) {
    if (e & 1) result = (result * b) % Q;
    b = (b * b) % Q;
  }
  return result;
}

/**
 * Inverse mod q (Fermat); throws for 0. No cache: inputs may be derived from secret keys.
 * @param {number} x an integer that is not a multiple of q
 * @returns {number} the inverse of x mod q, in [1, q)
 * @throws {Error} when x is a multiple of q
 * @example
 * ```typescript
 * const result = invMod(1479);
 * // result = 10810
 * invMod(0);
 * // throws Error("Falcon512: 0 has no inverse mod q")
 * ```
 */
export function invMod(x: number): number {
  const r = modQ(x);
  if (r === 0) throw new Error('Falcon512: 0 has no inverse mod q');
  return powMod(r, Q - 2);
}

/**
 * Roots used at size n (falcon.py `roots_dict_Zq[n]`).
 * @param {number} n a power of 2, from 2 to 512
 * @returns {number[]} the n roots of x^n + 1 mod q, in (r, -r) pairs
 * @example
 * ```typescript
 * const result = nttRoots(4);
 * // result = [4043, 8246, 5146, 7143]
 * ```
 */
export const nttRoots = (n: number): readonly number[] => NTT_ROOTS_ALL.slice(n - 2, 2 * n - 2);

/**
 * Throws unless n is a power of 2 from 2 to 512 (the sizes of the NTT).
 * @param {number} n the size to check
 * @throws {Error} when n is not a power of 2 in [2, 512]
 * @example
 * ```typescript
 * checkSize(4);
 * // passes
 * checkSize(3);
 * // throws Error("Falcon512: NTT size must be a power of 2 in [2, 512], got 3")
 * ```
 */
function checkSize(n: number): void {
  if (n < 2 || n > N || (n & (n - 1)) !== 0) {
    throw new Error(`Falcon512: NTT size must be a power of 2 in [2, ${N}], got ${n}`);
  }
}

/**
 * Recursive NTT of coefficients already in [0, q); `ntt` checks and reduces its input first.
 * @param {number[]} f the coefficients, in [0, q), of size a power of 2
 * @returns {number[]} the NTT of f
 * @example
 * ```typescript
 * const result = nttRec([1, 2]);
 * // result = [2959, 9332]
 * ```
 */
function nttRec(f: number[]): number[] {
  const n = f.length;
  if (n === 2) {
    const t = (SQR1 * f[1]) % Q;
    return [modQ(f[0] + t), modQ(f[0] - t)];
  }
  const half = n / 2;
  const even: number[] = new Array(half);
  const odd: number[] = new Array(half);
  for (let i = 0; i < half; i++) {
    even[i] = f[2 * i];
    odd[i] = f[2 * i + 1];
  }
  const a = nttRec(even);
  const b = nttRec(odd);
  const w = nttRoots(n);
  const out: number[] = new Array(n);
  for (let i = 0; i < half; i++) {
    const wb = (w[2 * i] * b[i]) % Q;
    out[2 * i] = modQ(a[i] + wb);
    out[2 * i + 1] = modQ(a[i] - wb);
  }
  return out;
}

/**
 * Recursive inverse NTT of values already in [0, q); `intt` checks and reduces its input first.
 * @param {number[]} fNtt the NTT values, in [0, q), of size a power of 2
 * @returns {number[]} the coefficients, in [0, q)
 * @example
 * ```typescript
 * const result = inttRec([2959, 9332]);
 * // result = [1, 2]
 * ```
 */
function inttRec(fNtt: number[]): number[] {
  const n = fNtt.length;
  if (n === 2) {
    const s = modQ(fNtt[0] + fNtt[1]);
    const d = modQ(fNtt[0] - fNtt[1]);
    return [(I2 * s) % Q, (((I2 * invMod(SQR1)) % Q) * d) % Q];
  }
  const half = n / 2;
  const w = nttRoots(n);
  const f0: number[] = new Array(half);
  const f1: number[] = new Array(half);
  for (let i = 0; i < half; i++) {
    const s = modQ(fNtt[2 * i] + fNtt[2 * i + 1]);
    const d = modQ(fNtt[2 * i] - fNtt[2 * i + 1]);
    f0[i] = (I2 * s) % Q;
    f1[i] = (((I2 * d) % Q) * invMod(w[2 * i])) % Q;
  }
  const a = inttRec(f0);
  const b = inttRec(f1);
  const out: number[] = new Array(n);
  for (let i = 0; i < half; i++) {
    out[2 * i] = a[i];
    out[2 * i + 1] = b[i];
  }
  return out;
}

/**
 * NTT in the falcon.py convention (same as falcon-rs and falcon.cairo). Coefficients may be negative.
 * @param {ArrayLike<number>} f the coefficients, of size a power of 2 from 2 to 512
 * @returns {number[]} the NTT of f, in [0, q)
 * @throws {Error} when the size of f is not a power of 2 in [2, 512]
 * @example
 * ```typescript
 * const result = ntt([1, 2]);
 * // result = [2959, 9332]
 * ntt([1, 2, 3]);
 * // throws Error("Falcon512: NTT size must be a power of 2 in [2, 512], got 3")
 * ```
 */
export function ntt(f: ArrayLike<number>): number[] {
  checkSize(f.length);
  return nttRec(Array.from(f, modQ));
}

/**
 * Inverse NTT; output in [0, q).
 * @param {ArrayLike<number>} fNtt the NTT values, of size a power of 2 from 2 to 512
 * @returns {number[]} the coefficients, in [0, q)
 * @throws {Error} when the size of fNtt is not a power of 2 in [2, 512]
 * @example
 * ```typescript
 * const result = intt([2959, 9332]);
 * // result = [1, 2]
 * ```
 */
export function intt(fNtt: ArrayLike<number>): number[] {
  checkSize(fNtt.length);
  return inttRec(Array.from(fNtt, modQ));
}

/**
 * Product in Zq[x]/(x^n + 1).
 * @param {ArrayLike<number>} a the first polynomial
 * @param {ArrayLike<number>} b the second polynomial, of the same size
 * @returns {number[]} a·b mod (x^n + 1, q), in [0, q)
 * @throws {Error} when the sizes differ, or are not a power of 2 in [2, 512]
 * @example
 * ```typescript
 * const result = mulZq([1, 1], [1, 1]);
 * // result = [0, 2]   ((1 + x)² = 2x, since x² = -1)
 * ```
 */
export function mulZq(a: ArrayLike<number>, b: ArrayLike<number>): number[] {
  if (a.length !== b.length) throw new Error('Falcon512: polynomial sizes differ');
  const an = ntt(a);
  const bn = ntt(b);
  return intt(an.map((v, i) => (v * bn[i]) % Q));
}

/**
 * Quotient a / b in Zq[x]/(x^n + 1); throws if b is not invertible.
 * @param {ArrayLike<number>} a the dividend
 * @param {ArrayLike<number>} b the divisor, of the same size
 * @returns {number[]} a / b mod (x^n + 1, q), in [0, q)
 * @throws {Error} when the sizes differ, or b is not invertible mod q
 * @example
 * ```typescript
 * const result = divZq([0, 2], [1, 1]);
 * // result = [1, 1]
 * divZq([1, 2], [0, 0]);
 * // throws Error("Falcon512: polynomial is not invertible mod q")
 * ```
 */
export function divZq(a: ArrayLike<number>, b: ArrayLike<number>): number[] {
  if (a.length !== b.length) throw new Error('Falcon512: polynomial sizes differ');
  const an = ntt(a);
  const bn = ntt(b);
  if (bn.some((v) => v === 0)) throw new Error('Falcon512: polynomial is not invertible mod q');
  return intt(an.map((v, i) => (v * invMod(bn[i])) % Q));
}

/**
 * Exact integer product in Z[x]/(x^n + 1). Only for small coefficients (NTRU equation check,
 * test reference): every partial sum must stay below 2^53.
 * @param {ArrayLike<number>} a the first polynomial
 * @param {ArrayLike<number>} b the second polynomial, of the same size
 * @returns {number[]} the exact product, not reduced mod q
 * @throws {Error} when the sizes differ
 * @example
 * ```typescript
 * const result = mulNegacyclicInt([1, 1, 0, 0], [1, 1, 0, 0]);
 * // result = [1, 2, 1, 0]
 * const result2 = mulNegacyclicInt([1, 0, 0, 1], [1, 0, 0, 1]);
 * // result2 = [1, 0, -1, 2]   (x^3 · x^3 = x^6 = -x^2)
 * ```
 */
export function mulNegacyclicInt(a: ArrayLike<number>, b: ArrayLike<number>): number[] {
  const n = a.length;
  if (b.length !== n) throw new Error('Falcon512: polynomial sizes differ');
  const r: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const ai = a[i];
    if (ai !== 0) {
      for (let j = 0; j < n; j++) {
        const k = i + j;
        if (k < n) r[k] += ai * b[j];
        else r[k - n] -= ai * b[j];
      }
    }
  }
  return r;
}
