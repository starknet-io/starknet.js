/* eslint-disable -- vendored copy of @noble/post-quantum 0.7.1, kept as is: see PATCH.md */
/**
 * Internal methods for lattice-based ML-KEM and ML-DSA.
 * @module
 */
/*! noble-post-quantum - MIT License (c) 2024 Paul Miller (paulmillr.com) */
import { FFTCore, reverseBits } from '@noble/curves/abstract/fft.js';
import { shake128, shake256 } from '@noble/hashes/sha3.js';
import type { TypedArray } from '@noble/hashes/utils.js';
import {
  type BytesCoderLen,
  cleanBytes,
  type Coder,
  getMask,
  type TArg,
  type TRet,
} from './utils';

/** Extendable-output reader used by the CRYSTALS implementations. */
export type XOF = (
  seed: Uint8Array,
  blockLen?: number
) => {
  /**
   * Read diagnostic counters for the current XOF session.
   * @returns Current call and XOF block counters.
   */
  stats: () => { calls: number; xofs: number };
  /**
   * Select one `(x, y)` coordinate pair and get a block reader for it.
   * Only one coordinate stream is live at a time: a later `get(...)` call rebinds the shared
   * SHAKE state and invalidates older readers.
   * Each squeeze aliases one mutable internal output buffer, so callers must copy blocks they
   * want to retain before the next read.
   * @param x - First matrix coordinate.
   * @param y - Second matrix coordinate.
   * @returns Lazy block reader for that coordinate pair.
   */
  get: (x: number, y: number) => () => Uint8Array; // return block aligned to blockLen and 3
  /** Wipe any buffered state once the reader is no longer needed. */
  clean: () => void;
};

/** CRYSTALS (ml-kem, ml-dsa) options */
/** Shared polynomial and NTT parameters for CRYSTALS algorithms. */
export type CrystalOpts<T extends TypedArray> = {
  /**
   * Allocate one zeroed polynomial/vector container.
   * @param n - Number of coefficients to allocate.
   * @returns Fresh typed container.
   */
  newPoly: TypedCons<T>;
  /** Polynomial size, typically `256`. */
  N: number;
  /** Prime modulus used for all coefficient arithmetic. */
  Q: number;
  /** Inverse transform normalization factor:
   * `256**-1 mod q` for Dilithium, `128**-1 mod q` for Kyber.
   */
  F: number;
  /** Principal root of unity for the transform domain. */
  ROOT_OF_UNITY: number;
  /** Number of bits used for bit-reversal ordering. */
  brvBits: number;
  /** `true` for Kyber/ML-KEM mode, `false` for Dilithium/ML-DSA mode. */
  isKyber: boolean;
};

/** Constructor function for typed polynomial containers. */
export type TypedCons<T extends TypedArray> = (n: number) => T;

type Crystals<T extends TypedArray> = {
  mod: (a: number, modulo?: number) => number;
  smod: (a: number, modulo?: number) => number;
  nttZetas: T;
  NTT: {
    /**
     * Forward transform in place. Mutates and returns `r`.
     * Kyber-mode input coefficients must already use canonical representatives in `[0, Q)`.
     */
    encode: (r: T) => T;
    /**
     * Inverse transform in place. Mutates and returns `r`.
     * Kyber-mode input coefficients must already use canonical representatives in `[0, Q)`.
     */
    decode: (r: T) => T;
  };
  bitsCoder: (d: number, c: Coder<number, number>) => BytesCoderLen<T>;
};

/**
 * Creates shared modular arithmetic, NTT, and packing helpers for CRYSTALS schemes.
 * @param opts - Polynomial and transform parameters. See {@link CrystalOpts}.
 * @returns CRYSTALS arithmetic and encoding helpers.
 * @example
 * Create shared modular arithmetic and NTT helpers for a CRYSTALS parameter set.
 * ```ts
 * const crystals = genCrystals({
 *   newPoly: (n) => new Uint16Array(n),
 *   N: 256,
 *   Q: 3329,
 *   F: 3303,
 *   ROOT_OF_UNITY: 17,
 *   brvBits: 7,
 *   isKyber: true,
 * });
 * const reduced = crystals.mod(-1);
 * ```
 */
export const genCrystals = <T extends TypedArray>(opts: CrystalOpts<T>): TRet<Crystals<T>> => {
  // isKyber: true means Kyber, false means Dilithium
  const { newPoly, N, Q, F, ROOT_OF_UNITY, brvBits, isKyber } = opts;
  // Normalize JS `%` into the canonical Z_m representative `[0, modulo-1]` expected by
  // FIPS 203 §2.3 / FIPS 204 §2.3 before downstream mod-q arithmetic.
  const mod = (a: number, modulo = Q): number => {
    const result = (a % modulo) | 0;
    return (result >= 0 ? result | 0 : (modulo + result) | 0) | 0;
  };
  // FIPS 204 §7.4 uses the centered `mod ±` representative for low bits, keeping the
  // positive midpoint when `modulo` is even.
  // Center to `[-floor((modulo-1)/2), floor(modulo/2)]`.
  const smod = (a: number, modulo = Q): number => {
    const r = mod(a, modulo) | 0;
    return (r > modulo >> 1 ? (r - modulo) | 0 : r) | 0;
  };
  // Kyber uses the FIPS 203 Appendix A `BitRev_7` table here via the first 128 entries, while
  // Dilithium uses the FIPS 204 §7.5 / Appendix B `BitRev_8` zetas table over all 256 entries.
  function getZettas() {
    const out = newPoly(N);
    for (let i = 0; i < N; i++) {
      const b = reverseBits(i, brvBits);
      const p = BigInt(ROOT_OF_UNITY) ** BigInt(b) % BigInt(Q);
      out[i] = Number(p) | 0;
    }
    return out;
  }
  const nttZetas = getZettas();

  // Number-Theoretic Transform
  // Explained: https://electricdusk.com/ntt.html

  // Kyber has slightly different params, since there is no 512th primitive root of unity mod q,
  // only 256th primitive root of unity mod. Which also complicates MultiplyNTT.

  const inv = (_a: number) => {
    throw new Error('not implemented');
  };
  // ML-KEM (Kyber) polynomials always enter the transform reduced to [0, Q), so add/sub only
  // need one conditional correction instead of `%`; measured ~20% faster NTT there.
  // ML-DSA keeps the generic mod() path on purpose: its first forward stage sees centered
  // (negative) coefficients, and `sub(a, t)` can drop below -Q (t is a mul output in [0, Q)),
  // so a single correction is not enough. A guarded fast path with mod() fallback was measured
  // slower than plain `%` for the 23-bit Q (V8 int32 modulo is one div; the branches lose).
  const field = isKyber
    ? {
        add: (a: number, b: number) => {
          const r = (a + b) | 0;
          return r >= Q ? (r - Q) | 0 : r;
        },
        sub: (a: number, b: number) => {
          const r = (a - b) | 0;
          return r < 0 ? (r + Q) | 0 : r;
        },
        mul: (a: number, b: number) => mod((a | 0) * (b | 0)) | 0,
        inv,
      }
    : {
        add: (a: number, b: number) => mod((a | 0) + (b | 0)) | 0,
        sub: (a: number, b: number) => mod((a | 0) - (b | 0)) | 0,
        mul: (a: number, b: number) => mod((a | 0) * (b | 0)) | 0,
        inv,
      };
  const nttOpts = {
    N,
    roots: nttZetas as any,
    invertButterflies: true,
    skipStages: isKyber ? 1 : 0,
    brp: false,
  };
  const dif = FFTCore(field, { dit: false, ...nttOpts });
  const dit = FFTCore(field, { dit: true, ...nttOpts });
  const NTT = {
    encode: (r: T): T => {
      return dif(r) as any;
    },
    decode: (r: T): T => {
      dit(r as any);
      // The inverse-NTT normalization factor is family-specific: FIPS 203 Algorithm 10 line 14
      // uses `128^-1 mod q` for Kyber, while FIPS 204 Algorithm 42 lines 21-23 use `256^-1 mod q`.
      // kyber uses 128 here, because brv && stuff
      for (let i = 0; i < r.length; i++) r[i] = mod(F * r[i]);
      return r;
    },
  };
  // Pack one little-endian `d`-bit word per coefficient, matching FIPS 203 ByteEncode /
  // ByteDecode and the FIPS 204 BitsToBytes-based polynomial packing helpers.
  const bitsCoder = (d: number, c: Coder<number, number>): TRet<BytesCoderLen<T>> => {
    // Validate the carry shape once: JS bitwise operations silently truncate wider accumulators.
    for (let i = 0, bufLen = 0; i < N; i++) {
      bufLen += d;
      if (bufLen > 32) getMask(bufLen);
      bufLen %= 8;
    }
    const mask = getMask(d);
    const bytesLen = d * (N / 8);
    return {
      bytesLen,
      encode: (poly_: TArg<T>): TRet<Uint8Array> => {
        const poly = poly_ as T;
        const r = new Uint8Array(bytesLen);
        for (let i = 0, buf = 0, bufLen = 0, pos = 0; i < poly.length; i++) {
          buf |= (c.encode(poly[i]) & mask) << bufLen;
          bufLen += d;
          // Take the low byte directly: `& 0xff` matches the previous getMask(bufLen) result
          // after Uint8Array truncation, without a validated function call per output byte.
          for (; bufLen >= 8; bufLen -= 8, buf >>= 8) r[pos++] = buf & 0xff;
        }
        return r as TRet<Uint8Array>;
      },
      decode: (bytes: TArg<Uint8Array>): TRet<T> => {
        const r = newPoly(N);
        for (let i = 0, buf = 0, bufLen = 0, pos = 0; i < bytes.length; i++) {
          buf |= bytes[i] << bufLen;
          bufLen += 8;
          for (; bufLen >= d; bufLen -= d, buf >>= d) r[pos++] = c.decode(buf & mask);
        }
        return r as TRet<T>;
      },
    } as TRet<BytesCoderLen<T>>;
  };

  return {
    mod,
    smod,
    nttZetas: nttZetas as TRet<T>,
    NTT: {
      encode: (r: TArg<T>): TRet<T> => NTT.encode(r as T) as TRet<T>,
      decode: (r: TArg<T>): TRet<T> => NTT.decode(r as T) as TRet<T>,
    },
    bitsCoder: bitsCoder as TRet<Crystals<T>>['bitsCoder'],
  };
};

const createXofShake =
  (shake: typeof shake128): TRet<XOF> =>
  (seed: TArg<Uint8Array>, blockLen?: number) => {
    if (!blockLen) blockLen = shake.blockLen;
    // Optimizations that won't mater:
    // - cached seed update (two .update(), on start and on the end)
    // - another cache which cloned into working copy

    // Faster than multiple updates, since seed less than blockLen
    const _seed = new Uint8Array(seed.length + 2);
    _seed.set(seed);
    const seedLen = seed.length;
    const buf = new Uint8Array(blockLen); // == shake128.blockLen
    let h = shake.create({});
    let calls = 0;
    let xofs = 0;
    return {
      stats: () => ({ calls, xofs }),
      get: (x: number, y: number) => {
        // Rebind to `seed || x || y` so callers can implement the spec's per-coordinate
        // SHAKE inputs like `rho || j || i` and `rho || IntegerToBytes(counter, 2)`.
        _seed[seedLen + 0] = x;
        _seed[seedLen + 1] = y;
        h.destroy();
        h = shake.create({}).update(_seed);
        calls++;
        return () => {
          xofs++;
          return h.xofInto(buf) as TRet<Uint8Array>;
        };
      },
      clean: () => {
        h.destroy();
        cleanBytes(buf, _seed);
      },
    };
  };

/**
 * SHAKE128-based extendable-output reader factory used by ML-KEM.
 * `get(x, y)` selects one coordinate pair at a time; calling it again invalidates previously
 * returned readers, and each squeeze reuses one mutable internal output buffer.
 * @param seed - Seed bytes for the reader.
 * @param blockLen - Optional output block length.
 * @returns Stateful XOF reader.
 * @example
 * Build the ML-KEM SHAKE128 matrix expander and read one block.
 * ```ts
 * import { randomBytes } from '@noble/post-quantum/utils.js';
 * import { XOF128 } from '@noble/post-quantum/_crystals.js';
 * const reader = XOF128(randomBytes(32));
 * const block = reader.get(0, 0)();
 * ```
 */
export const XOF128: TRet<XOF> = /* @__PURE__ */ createXofShake(shake128);
/**
 * SHAKE256-based extendable-output reader factory used by ML-DSA.
 * `get(x, y)` appends raw one-byte coordinates to the seed, invalidates previously returned
 * readers, and reuses one mutable internal output buffer for each squeeze.
 * @param seed - Seed bytes for the reader.
 * @param blockLen - Optional output block length.
 * @returns Stateful XOF reader.
 * @example
 * Build the ML-DSA SHAKE256 coefficient expander and read one block.
 * ```ts
 * import { randomBytes } from '@noble/post-quantum/utils.js';
 * import { XOF256 } from '@noble/post-quantum/_crystals.js';
 * const reader = XOF256(randomBytes(32));
 * const block = reader.get(0, 0)();
 * ```
 */
export const XOF256: TRet<XOF> = /* @__PURE__ */ createXofShake(shake256);
