/* eslint-disable -- vendored copy of @noble/post-quantum 0.7.1, kept as is: see PATCH.md */
/**
 * Falcon pq-friendly signature algorithm.
 * Will change in backwards-incompatible way once FIPS-206 gets finalized.
 * @module
 */
/*! noble-post-quantum - MIT License (c) 2024 Paul Miller (paulmillr.com) */
import { rngAesCtrDrbg256 } from '@noble/ciphers/aes.js';
import { chacha20 } from '@noble/ciphers/chacha.js';
import { FFTCore } from '@noble/curves/abstract/fft.js';
import type { IField } from '@noble/curves/abstract/modular.js';
import { invert } from '@noble/curves/abstract/modular.js';
import { bytesToNumberLE, numberToHexUnpadded } from '@noble/curves/utils.js';
import { shake256 } from '@noble/hashes/sha3.js';
import {
  abytes,
  bytesToHex,
  createView,
  hexToBytes,
  randomBytes,
  swap32IfBE,
  type TypedArray,
  u32,
  u8,
} from '@noble/hashes/utils.js';
import { genCrystals, type TypedCons } from './_crystals';
import {
  baswap64If,
  type BytesCoderLen,
  cleanBytes,
  copyBytes,
  type Coder,
  type CryptoKeys,
  getMask,
  type Signer,
  type SigOpts,
  splitCoder,
  type TArg,
  type TRet,
  validateSigOpts,
  validateVerOpts,
  SIG_OPT_KEYS,
  type VerOpts,
} from './utils';
/*
FIPS-206 would likely improve the situation with spec.

Falcon (non-FIPS) spec is terrible. Two main issues: non-deterministic keys & floats.

## Summary

- NIST round3 KATs pass
- No interop with other JS libraries, because they are incorrect
- No recoverPublicKey: it requires s1, which is calculated from public+s2. Sig only has s2.
- Code has verify_recover, but it's unused
- Mediocre code quality, primarily because it follows implementation-specific (C lib) tidbits
- Samplers are fragile

## Non-deterministic keys

Falcon spec doesn't provide enough data to re-create keys from KAT vectors. Spec mentions:
> This process reduces the maximum sizes of coefficients of F and G
> by about 30 bits at each iteration
While actual implementation reduces them by 25 bits (scale_k), which is very important detail.

There are also various implementation checks not mentioned in spec, like
> let's skip this perfectly valid key, because it doesn't fit into our bigint implementation

Without these, it's hard to produce correct keys. This means that,
unless NIST specifies full process with all operations,
**all keys are implementation-specific**.

Which means, we cannot use any key derivation schemes here: same seed will return
different keys in different implementations.

This also complicates testing a lot. If a key succesfully signs a message and other implementations
confirm it, there is still zero assurance with regards to quality / entropy of the key.
One can create a valid key, which nevertheless doesn't have enough entropy.

## Floats

Partially fixed by "fixed point" primitive. Falcon basically impelements floats on top of u64.

It's more constant-time, but in JS there is no **fast** u64:

- Using bigint backend would drop const-timeness
- Using u32 {hi, low} tuples means unnecessary allocations / jit deopt,
  and is still 4 times slower than Floats

Then, there are rounding issues. This is implementation specific.
This matters more for C, since 'double' is not neccesarily binary64.
In js, floats guaranteed to be IEEE-754 binary64.

In theory floats are nice, but since fixed point format is not specified in spec
(other that "it is binary64"), this is even more fragile, since it doesn't implement exact
full spec of binary64 (two zeros/subnomarls/nans/etc). Those parts should not be used inside falcon,
but may cause some differences.

Lack of specification is also hard to debug, brings precision loss (a+b+c !== a+c+b):
there are no serialized floats, all float arithmetic happens inside of an algorithm, so
we can produce same results (small differences rounded at the end).

For byte-to-byte result in falcon, one needs to copy implementation-specific details, unspecced.

## CSPRNG

NIST KATs randomness situation is bad:

1. aes-drbg generates seed
2. The seed passes CSPRNG into sign, which uses shake256 to produce another seed and nonce
3. Then a separate rejection sampling chacha20 CSPRNG is created, based on that seed.

## Detached vs non-detached

The API is different between detached / non-detached signatures,
however only non-detached (sm) is included in KAT, so we implement them
(crypto_sign_open instead of crypto_sign_verify).
*/

// Utils
// MSB first. Current Falcon uses are byte-aligned only, and outer wrappers must still enforce
// exact body lengths / canonical padding because this helper neither flushes nor rejects a final
// partial field on its own.
const bitsCoderMSB = <T extends TypedArray>(
  newPoly: TypedCons<T>,
  N: number,
  d: number,
  c: Coder<number, number>
): TRet<BytesCoderLen<T>> => {
  const mask = getMask(d);
  const bytesLen = d * (N / 8);
  return {
    bytesLen,
    encode: (poly: TArg<T>): TRet<Uint8Array> => {
      if (poly.length !== N) throw new Error(`wrong length: expected ${N}, got ${poly.length}`);
      const r = new Uint8Array(bytesLen);
      for (let i = 0, buf = 0, bufLen = 0, pos = 0; i < poly.length; i++) {
        buf = (buf << d) | (c.encode(poly[i]) & mask);
        bufLen += d;
        for (; bufLen >= 8; bufLen -= 8) r[pos++] = (buf >>> (bufLen - 8)) & 0xff;
      }
      return r as TRet<Uint8Array>;
    },
    decode: (bytes: TArg<Uint8Array>): TRet<T> => {
      const r = newPoly(N);
      for (let i = 0, buf = 0, bufLen = 0, pos = 0; i < bytes.length; i++) {
        buf = (buf << 8) | bytes[i];
        bufLen += 8;
        for (; bufLen >= d; bufLen -= d) r[pos++] = c.decode((buf >>> (bufLen - d)) & mask);
      }
      return r as TRet<T>;
    },
  } as TRet<BytesCoderLen<T>>;
};
// Adds a single leading tag byte. Exact body validation is delegated to `restCoder.decode()`.
// encode() zeroizes the temporary encoded body after copying, so wrapped encoders must return
// owned scratch bytes rather than caller-owned buffers.
const headerCoder = <T>(tag: number, restCoder: TArg<BytesCoderLen<T>>): TRet<BytesCoderLen<T>> => {
  const coder = restCoder as BytesCoderLen<T>;
  return {
    bytesLen: 1 + coder.bytesLen,
    encode(value: TArg<T>): TRet<Uint8Array> {
      const body = coder.encode(value as T);
      const out = new Uint8Array(1 + body.length);
      out[0] = tag;
      out.set(body, 1);
      cleanBytes(body);
      return out as TRet<Uint8Array>;
    },
    decode(data: TArg<Uint8Array>): TRet<T> {
      if (data[0] !== tag) throw new Error(`wrong tag: expected ${tag}, got 0x${data[0]}`);
      return coder.decode(data.subarray(1)) as TRet<T>;
    },
  } as TRet<BytesCoderLen<T>>;
};

// Fun, but overengineered. Hoping FIPS would fix this.
// Falcon-specific Golomb-Rice compressed format:
// Vec<[1bit sign, 7 bit low, array(1 terminated).length==high <<7]>.
// decode() returns only coefficients, so callers must still enforce exact consumed length /
// canonical framing around the payload.
const compCoder = (n: number) => {
  const LIMIT = 2047;
  return {
    encode(data: TArg<Int16Array>): TRet<Uint8Array> {
      // Algorithm 17: Compress(s, slen) (Page 47)
      // Require: A polynomial s = Σ sᵢxⁱ ∈ Z[x] of degree < n, a string bitlength slen
      // Ensure: A compressed representation str of s of slen bits, or ⊥
      // 1: str ← {} ▷ str is the empty string
      // 2: for i from 0 to n-1 do ▷ At each step, str ← (str||strᵢ), where strᵢ encodes sᵢ
      // 3:     str ← (str||b), where b = 1 if sᵢ < 0, b = 0 otherwise ▷ Encode the sign of sᵢ
      // 4:     str ← (str||b₆b₅...b₀), where bⱼ = (|sᵢ| >> j) & 0x1
      //        ▷ Encode in binary the low bits of |sᵢ|
      // 5:     k ← |sᵢ| >> 7
      // 6:     str ← (str||0ᵏ1) ▷ Encode in unary the high bits of |sᵢ|
      // 7: if |str| > slen then
      // 8:     str ← ⊥ ▷ Abort if str is too long
      // 9: else
      // 10:     str ← (str||0^{slen-|str|}) ▷ Pad str to slen bits
      // 11: return str
      if (data.length !== n) throw new Error('wrong length');
      const res: number[] = [];
      let buf = 0;
      let bufLen = 0;
      const writeBits = (n: number, v: number) => {
        bufLen += n;
        buf = (buf << n) | v;
        // flush buffer if bigger than byte
        for (; bufLen >= 8; buf &= getMask(bufLen)) {
          bufLen -= 8;
          res.push((buf >>> bufLen) & 0xff);
        }
      };
      for (let i = 0; i < n; i++) {
        let v = data[i];
        if (!Number.isInteger(v) || v < -LIMIT || v > LIMIT)
          throw new Error(`data[${i}]=${v} out of range`);
        const sign = v < 0 ? 1 : 0;
        v = Math.abs(v);
        writeBits(1, sign);
        writeBits(7, v & 0b0111_1111); // low
        writeBits((v >>> 7) + 1, 1); // high (unary)
      }
      if (bufLen > 0) res.push((buf << (8 - bufLen)) & 0xff);
      return new Uint8Array(res) as TRet<Uint8Array>;
    },
    decode(data: TArg<Uint8Array>): TRet<Int16Array> {
      // Algorithm 18: Decompress(str, slen), (Page 48)
      // Require: A bitstring str = (str[i])_{i=0,...,slen-1}, a bitlength slen
      // Ensure: A polynomial s = Σ sᵢxⁱ ∈ Z[x], or ⊥
      // 1: if |str| ≠ slen then ▷ Enforce fixed bitlength
      // 2:     return ⊥
      // 3: for i from 0 to (n-1) do
      // 4:     s'ᵢ ← Σ_{j=0 to 6} 2⁶⁻ʲ · str[1 + j] ▷ We recover the lowest bits of |sᵢ|.
      // 5:     k ← 0
      // 6:     while str[8 + k] = 0 do ▷ We recover the highest bits of |sᵢ|.
      // 7:         k ← k + 1
      // 8:     sᵢ ← (-1)^{str[0]} · (s'ᵢ + 2⁷k) ▷ We recompute sᵢ.
      // 9:     if (sᵢ = 0) and (str[0] = 1) then ▷ Enforce unique encoding if sᵢ = 0
      // 10:         return ⊥
      // 11:     str ← str with first 9 + k bits removed ▷ We remove the bits of str that encode sᵢ.
      // 12: if str contains any non-zero bits then ▷ Enforce trailing bits at 0
      // 13:     return ⊥
      // 14: return s = Σ_{i=0}^{n-1} sᵢxⁱ
      const res = new Int16Array(n);
      let buf = 0;
      let bufLen = 0;
      let pos = 0;
      const readBits = (n: number) => {
        for (; bufLen < n && pos < data.length; bufLen += 8) buf = (buf << 8) | data[pos++];
        if (bufLen < n)
          throw new Error(`end of buffer: len=${bufLen} buf=${buf} lastByte=${data[pos]}`);
        bufLen -= n;
        const val = buf >>> bufLen;
        buf &= getMask(bufLen);
        return val;
      };
      for (let resPos = 0; resPos < n; resPos++) {
        const sign = readBits(1);
        const low = readBits(7);
        let high = 0;
        // Reference comp_decode adds 128 for each unary zero and rejects immediately above 2047.
        // Waiting for the terminating one first lets an invalid coefficient scan the entire input.
        while (!readBits(1)) {
          high++;
          if (high > LIMIT >>> 7) throw new Error(`limit: ${low | (high << 7)} > ${LIMIT}`);
        }
        const v = low | (high << 7);
        if (sign && v === 0) throw new Error('negative zero encoding');
        if (v > LIMIT) throw new Error(`limit: ${v} > ${LIMIT}`);
        res[resPos] = sign ? -v : v;
      }
      if (buf) throw new Error('non-empty accumulator');
      return res as TRet<Int16Array>;
    },
  };
};

// Falcon padded-signature helper. encode() assumes `data.length <= len`; decode() strips trailing
// zero padding and returns a subarray view, so it is not a generic byte-string codec.
const pad = (len: number) => ({
  encode(data: TArg<Uint8Array>) {
    const res = new Uint8Array(len);
    res.set(data);
    return res;
  },
  decode(data: TArg<Uint8Array>) {
    let end = data.length;
    while (end > 0 && data[end - 1] === 0) end--;
    return data.subarray(0, end);
  },
});
// TODO: merge with noble-curves bls?
type ComplexElm<T> = { re: T; im: T };
// Zero complex-polynomial temporaries in place. Requires fully initialized `{ re, im }` entries.
const cleanCPoly = (...list: CPoly[]): void => {
  for (const p of list) {
    for (let i = 0; i < p.length; i++) {
      p[i].re = 0;
      p[i].im = 0;
    }
  }
};
// Generic complex helper used by Falcon's FFT code. Current audited use relies on
// add/sub/mul/conj/scale/magSqSum/neg; inv() is intentionally unimplemented.
function getComplex<T>(field: IField<T>) {
  const F = field;
  return {
    lift: (x: ComplexElm<T> | T): ComplexElm<T> => {
      // Reuse existing complex objects verbatim; callers that need isolation must clone first.
      if ((x as any).re !== undefined && (x as any).im !== undefined) return x as ComplexElm<T>;
      return { re: x as T, im: F.ZERO };
    },
    add: (a: ComplexElm<T>, b: ComplexElm<T>): ComplexElm<T> => ({
      re: F.add(a.re, b.re),
      im: F.add(a.im, b.im),
    }),
    sub: (a: ComplexElm<T>, b: ComplexElm<T>): ComplexElm<T> => ({
      re: F.sub(a.re, b.re),
      im: F.sub(a.im, b.im),
    }),
    mul: (a: ComplexElm<T>, b: ComplexElm<T>): ComplexElm<T> => ({
      re: F.sub(F.mul(a.re, b.re), F.mul(a.im, b.im)),
      im: F.add(F.mul(a.re, b.im), F.mul(a.im, b.re)),
    }),
    div: (a: ComplexElm<T>, b: ComplexElm<T>): ComplexElm<T> => {
      const denom = F.add(F.mul(b.re, b.re), F.mul(b.im, b.im));
      return {
        re: F.div(F.add(F.mul(a.re, b.re), F.mul(a.im, b.im)), denom),
        im: F.div(F.sub(F.mul(a.im, b.re), F.mul(a.re, b.im)), denom),
      };
    },
    neg: (a: ComplexElm<T>): ComplexElm<T> => ({ re: F.neg(a.re), im: F.neg(a.im) }),
    conj: (a: ComplexElm<T>): ComplexElm<T> => ({ re: a.re, im: F.neg(a.im) }),
    scale: (a: ComplexElm<T>, x: T | bigint): ComplexElm<T> => ({
      re: F.mul(a.re, x),
      im: F.mul(a.im, x),
    }),
    // a.re * a.re + a.im * a.im + b.re * b.re + b.im * b.im;
    magSqSum: (a: ComplexElm<T>, b: ComplexElm<T>): T =>
      F.add(
        F.add(F.add(F.mul(a.re, a.re), F.mul(a.im, a.im)), F.mul(b.re, b.re)),
        F.mul(b.im, b.im)
      ),
    eql: (a: ComplexElm<T>, b: ComplexElm<T>): boolean => F.eql(a.re, b.re) && F.eql(a.im, b.im),
    clone: (a: ComplexElm<T>): ComplexElm<T> => ({ re: a.re, im: a.im }),
    inv: () => {
      throw new Error('not implemented');
    },
  };
}
// Falcon real-polynomial FFT layout: [...re, ...im]. Requires an even-length flat array and
// copies into fresh JS objects / arrays instead of creating views.
const ComplexArr = {
  decode(lst: number[]): ComplexElm<number>[] {
    const N = lst.length;
    const hn = N >> 1;
    const len = lst.length;
    if (len === 0) return [];
    if (len % 2 !== 0)
      throw new Error('Array length must be even to pair real and imaginary parts.');
    const res = [];
    for (let i = 0; i < hn; i++) {
      res.push({ re: lst[i], im: lst[i + hn] });
    }
    return res;
  },
  encode(lst: ComplexElm<number>[]): number[] {
    const re = [];
    const im = [];
    for (const i of lst) {
      re.push(i.re);
      im.push(i.im);
    }
    return [...re, ...im];
  },
};
// Precomputed root-table layout [re[0], im[0], re[1], im[1], ...]. Used for `COMPLEX_ROOTS`,
// not Falcon's packed polynomial FFT layout; encode() is currently unused.
// decode() / encode() copy between the flat root table
// and detached `{ re, im }` objects; they never create aliasing views.
const ComplexArrInterleaved = {
  decode(lst: ArrayLike<number>): ComplexElm<number>[] {
    const len = lst.length;
    if (len === 0) return [];
    if (len % 2 !== 0)
      throw new Error('Array length must be even to pair real and imaginary parts.');
    const res: ComplexElm<number>[] = [];
    // Iterate through the list, taking two elements at a time
    for (let i = 0; i < len; i += 2) {
      res.push({ re: lst[i], im: lst[i + 1] });
    }
    return res;
  },
  encode(lst: ComplexElm<number>[]): number[] {
    const res: number[] = [];
    for (const complexNum of lst) {
      res.push(complexNum.re);
      res.push(complexNum.im);
    }
    return res;
  },
};
// Alias a Float64Array as bytes for the root-table hash pin; not a portable serialization.
const u8f = (arr: TArg<Float64Array>): TRet<Uint8Array> =>
  new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength) as TRet<Uint8Array>;

// Alias bytes as Float64Array lanes. Falcon's exact binary64 tables are stored as little-endian
// payload bytes, so BE runtimes must decode lane-by-lane instead of aliasing host-endian floats.
// Copy/truncate to whole 8-byte lanes first
// so BE byte swaps cannot mutate caller-owned bytes
// or read a partial float.
const f64a = (arr: TArg<Uint8Array>): TRet<Float64Array> =>
  new Float64Array(
    baswap64If(Uint8Array.from(arr.subarray(0, Math.floor(arr.byteLength / 8) * 8))).buffer
  ) as TRet<Float64Array>;

// Exact big-endian binary64 hex helper for constants. Only decode() is currently used; malformed
// inputs fail through lower-level hex / DataView checks instead of an explicit wrapper guard.
const Float = /* @__PURE__ */ Object.freeze({
  encode(n: number): string {
    const bytes = new Uint8Array(8);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    view.setFloat64(0, n, false);
    return bytesToHex(bytes);
  },
  decode(s: string): number {
    const bytes = hexToBytes(s);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return view.getFloat64(0, false);
  },
});
// Decode a 64-bit bigint bit pattern into the exact binary64 value.
const f64b = (n: bigint): number => Float.decode(numberToHexUnpadded(n));

// Types
type SignatureRaw = { msg: Uint8Array; nonce: Uint8Array; s2: Uint8Array };
type BPoly = bigint[];
type FPoly = Float64Array;
type SPoly = Int8Array; // Small poly (f/g/F/G)
type IPoly = Uint16Array; // Integer poly mod Q

// Constants
const EMPTY_CHACHA20_BLOCK = /** @__PURE__ */ new Uint8Array(64);
// Falcon's randomized hashing salt r is always 320 bits / 40 bytes, and the same width
// also drives the detached and attached signature wire formats.
const NONCELEN = 40;

// Falcon's public modulus q = 12289 is also the NTT parameter chosen in round 3.
const Q: number = 12289; // 12 * 1024 + 1
// Falcon's midpoint floor(q/2); the only live use is the mirrored G-reconstruction reduction below.
const Qhalf: number = Q >> 1;
const QBig = BigInt(Q);
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _10n = /* @__PURE__ */ BigInt(10);
const _25n = /* @__PURE__ */ BigInt(25);
const _31n = /* @__PURE__ */ BigInt(31);
const _32n = /* @__PURE__ */ BigInt(32);
const _63n = /* @__PURE__ */ BigInt(63);
const _64n = /* @__PURE__ */ BigInt(64);
// Low 32 bits and low 63 bits of a bigint, used by the chacha20 counter and gaussian sampler.
const MASK_32n = /* @__PURE__ */ BigInt('0xffffffff');
const MASK_63n = /* @__PURE__ */ BigInt('0x7fffffffffffffff');
//const R = 4091; // 2^16 mod q
// This 16-bit Montgomery kernel uses R = 2^16, so mul(x, R2) converts x into Montgomery form.
const R2 = 10952; // 2^32 mod q
// falcon.pdf page 55 says "1/q mod 2^16",
// but the reduction formula and the round-3 Falcon code both require -1/q.
const Q0I = 12287; // -1/q mod 2^16
const F_INV_Q = 1.0 / Q;
const F_MINUS_INV_Q = -F_INV_Q;
// Round-3 bigint keygen keeps these tables coupled: MAX_BL_SMALL and MAX_BL_LARGE are measured
// 31-bit word bounds, and BITLENGTH is the measured avg/stddev heuristic. Edits must recheck the
// next-depth relation and the current 31 * wordCount headroom used by reduce().
const MAX_BL_SMALL = [1, 1, 2, 2, 4, 7, 14, 27, 53, 106, 209];
// Unreduced F/G word bounds for reduce(); the same round-3 source also couples this table to the
// top-10-word floating approximation there,
// so it must stay in sync with MAX_BL_SMALL and BITLENGTH.
const MAX_BL_LARGE = [2, 2, 5, 7, 12, 21, 40, 78, 157, 308];
// Exact binary64 encoding of Falcon's Gram-Schmidt keygen bound (1.17^2) * q = 16822.4121.
const BNORM_MAX = f64b(BigInt('4670353323383631276'));
// Measured round-3 bigint-keygen heuristic, not a normative Falcon parameter table or proof bound.
const BITLENGTH = [
  { avg: 4, std: 0 },
  { avg: 11, std: 1 },
  { avg: 24, std: 1 },
  { avg: 50, std: 1 },
  { avg: 102, std: 1 },
  { avg: 202, std: 2 },
  { avg: 401, std: 4 },
  { avg: 794, std: 5 },
  { avg: 1577, std: 8 },
  { avg: 3138, std: 13 },
  { avg: 6308, std: 25 },
];
// First entry is P(x = 0); the remaining entries are conditional tail thresholds scaled by 2^63.
// Smaller Falcon dimensions reuse the N = 1024, q = 12289 table by summing 2^(10-logn) draws.
// The trailing 0 sentinel guarantees gaussSingle()
// always selects a tail bucket when x = 0 is missed.
const gauss_1024_12289 = /* @__PURE__ */ [
  '1283868770400643928',
  '6416574995475331444',
  '4078260278032692663',
  '2353523259288686585',
  '1227179971273316331',
  '575931623374121527',
  '242543240509105209',
  '91437049221049666',
  '30799446349977173',
  '9255276791179340',
  '2478152334826140',
  '590642893610164',
  '125206034929641',
  '23590435911403',
  '3948334035941',
  '586753615614',
  '77391054539',
  '9056793210',
  '940121950',
  '86539696',
  '7062824',
  '510971',
  '32764',
  '1862',
  '94',
  '4',
  '0',
].map(BigInt);

// Exact binary64 1/sigma payloads from round-3 fpr.h. Nearby decimal spellings round 1 ULP low in
// JS, so keep these as decoded bit patterns and recheck the raw payloads after edits.
const INV_SIGMA = /* @__PURE__ */ Object.freeze([
  0.0, // unused
  f64b(BigInt('4574611497772390042')),
  f64b(BigInt('4574501679055810265')),
  f64b(BigInt('4574396282908341804')),
  f64b(BigInt('4574245855758572086')),
  f64b(BigInt('4574103865040221165')),
  f64b(BigInt('4573969550563515544')),
  f64b(BigInt('4573842244705920822')),
  f64b(BigInt('4573721358406441454')),
  f64b(BigInt('4573606369665796042')),
  f64b(BigInt('4573496814039276259')),
]);

// Exact binary64 sigma_min constants from round-3 fpr.h indexed by logn; despite one PQClean
// summary comment, these are sigma_min itself, not 1/sigma_min, which is why this table stays
// separate from INV_SIGMA.
const SIGMA_MIN = /* @__PURE__ */ Object.freeze([
  0.0, // unused
  f64b(BigInt('4607707126469777035')),
  f64b(BigInt('4607777455861499430')),
  f64b(BigInt('4607846828256951418')),
  f64b(BigInt('4607949175006100261')),
  f64b(BigInt('4608049571757433526')),
  f64b(BigInt('4608148125896792003')),
  f64b(BigInt('4608244935301382692')),
  f64b(BigInt('4608340089478362016')),
  f64b(BigInt('4608433670533905013')),
  f64b(BigInt('4608525754002622308')),
]);
// Upper end of the SamplerZ proof interval from Falcon section 3.9.1. The per-leaf sigma is
// derived from the reconstructed private basis, so imported keys must be checked against it.
const SIGMA_MAX = 1.8205;

// Falcon Table 3.1 RCDT values for chi, split into 24-bit limbs; storage is [high, mid, low],
// so gaussian0() intentionally compares them against v0, v1, v2 in reverse order. The final
// RCDT[18] = 0 row is omitted because the algorithm iterates only over i = 0..17.
const GAUSS0 = new Uint32Array([
  10745844, 3068844, 3741698, 5559083, 1580863, 8248194, 2260429, 13669192, 2736639, 708981,
  4421575, 10046180, 169348, 7122675, 4136815, 30538, 13063405, 7650655, 4132, 14505003, 7826148,
  417, 16768101, 11363290, 31, 8444042, 8086568, 1, 12844466, 265321, 0, 1232676, 13644283, 0,
  38047, 9111839, 0, 870, 6138264, 0, 14, 12545723, 0, 0, 3104126, 0, 0, 28824, 0, 0, 198, 0, 0, 1,
]);

// Inclusive floor(beta^2) signature-acceptance bounds indexed by logn; the Falcon PDF publishes
// only Falcon-512 and Falcon-1024 directly, while the smaller rows are mirrored from the round-3
// NIST submission package.
const L2BOUND = [
  0, // unused
  101498,
  208714,
  428865,
  892039,
  1852696,
  3842630,
  7959734,
  16468416,
  34034726,
  70265242,
];

// 32kb in hex.
// Could be 4x smaller by using 2 bytes per root. However, that would mean using sin/cos.
// Different JS engines give different sin / cos result, which means the result would be unreliable.
// See "COMPLEX ROOT GENERATION FOR FALCON" in tests.
// Those exact roots are taken from the round-3 Falcon submission, preserving its original
// bit-reversed order here and remapping it only later for FFTCore.
const COMPLEX_ROOTS = /** @__PURE__ */ (() => {
  const roots = f64a(
    hexToBytes(
      '000000000000000000000000000000000000000000000080000000000000f03fcd3b7f669ea0e63fcd3b7f66' +
        '9ea0e63fcd3b7f669ea0e6bfcd3b7f669ea0e63f468d32cf6b90ed3f63a9aea6e27dd83f63a9aea6e27dd8bf' +
        '468d32cf6b90ed3f63a9aea6e27dd83f468d32cf6b90ed3f468d32cf6b90edbf63a9aea6e27dd83fb05cf7cf' +
        '9762ef3f0ba6693cb8f8c83f0ba6693cb8f8c8bfb05cf7cf9762ef3fc868ae393bc7e13fa3a10e29669bea3f' +
        'a3a10e29669beabfc868ae393bc7e13fa3a10e29669bea3fc868ae393bc7e13fc868ae393bc7e1bfa3a10e29' +
        '669bea3f0ba6693cb8f8c83fb05cf7cf9762ef3fb05cf7cf9762efbf0ba6693cb8f8c83f2625d1a38dd8ef3f' +
        '2cb429bca617b93f2cb429bca617b9bf2625d1a38dd8ef3fd61d0925f34ce43f4117156b80bce83f4117156b' +
        '80bce8bfd61d0925f34ce43fb1bd80f1b238ec3f3bf606385d2bde3f3bf606385d2bdebfb1bd80f1b238ec3f' +
        '069fd52e0694d23fda2dc656419fee3fda2dc656419feebf069fd52e0694d23fda2dc656419fee3f069fd52e' +
        '0694d23f069fd52e0694d2bfda2dc656419fee3f3bf606385d2bde3fb1bd80f1b238ec3fb1bd80f1b238ecbf' +
        '3bf606385d2bde3f4117156b80bce83fd61d0925f34ce43fd61d0925f34ce4bf4117156b80bce83f2cb429bc' +
        'a617b93f2625d1a38dd8ef3f2625d1a38dd8efbf2cb429bca617b93f7e6d79e321f6ef3f14d80df1651fa93f' +
        '14d80df1651fa9bf7e6d79e321f6ef3fa0ec8c34697de53fafaf6a22dfb5e73fafaf6a22dfb5e7bfa0ec8c34' +
        '697de53f73c73cf47aedec3fc05ce109105ddb3fc05ce109105ddbbf73c73cf47aedec3fdd1fab759a8fd53f' +
        'e586f6042121ee3fe586f6042121eebfdd1fab759a8fd53fd73092fb7e0aef3f1b5f217bf919cf3f1b5f217b' +
        'f919cfbfd73092fb7e0aef3feeff22998773e03f3e6e19458372eb3f3e6e19458372ebbfeeff22998773e03f' +
        '4187f347e0b3e93f3570e1fcf70fe33f3570e1fcf70fe3bf4187f347e0b3e93f3a618e6e10c8c23f17a5087f' +
        '55a7ef3f17a5087f55a7efbf3a618e6e10c8c23f17a5087f55a7ef3f3a618e6e10c8c23f3a618e6e10c8c2bf' +
        '17a5087f55a7ef3f3570e1fcf70fe33f4187f347e0b3e93f4187f347e0b3e9bf3570e1fcf70fe33f3e6e1945' +
        '8372eb3feeff22998773e03feeff22998773e0bf3e6e19458372eb3f1b5f217bf919cf3fd73092fb7e0aef3f' +
        'd73092fb7e0aefbf1b5f217bf919cf3fe586f6042121ee3fdd1fab759a8fd53fdd1fab759a8fd5bfe586f604' +
        '2121ee3fc05ce109105ddb3f73c73cf47aedec3f73c73cf47aedecbfc05ce109105ddb3fafaf6a22dfb5e73f' +
        'a0ec8c34697de53fa0ec8c34697de5bfafaf6a22dfb5e73f14d80df1651fa93f7e6d79e321f6ef3f7e6d79e3' +
        '21f6efbf14d80df1651fa93f0dcd846088fdef3f7e66a3f75521993f7e66a3f7552199bf0dcd846088fdef3f' +
        'df2c1d55b710e63f96ffef37082de73f96ffef37082de7bfdf2c1d55b710e63f3ac94dd13441ed3f8aeda843' +
        '79efd93f8aeda84379efd9bf3ac94dd13441ed3f9f45fa308508d73f3cc2ccb613dbed3f3cc2ccb613dbedbf' +
        '9f45fa308508d73f89e564acf338ef3f634f7e6a820bcc3f634f7e6a820bccbf89e564acf338ef3f234b1b54' +
        'b31ee13f000215580a09eb3f000215580a09ebbf234b1b54b31ee13f822746a0a729ea3fdf12dd4c056de23f' +
        'df12dd4c056de2bf822746a0a729ea3fc63f8b4414e2c53fa94b71fa6487ef3fa94b71fa6487efbfc63f8b44' +
        '14e2c53fd39fe17064c2ef3f0e73a9564e56bf3f0e73a9564e56bfbfd39fe17064c2ef3fb9502029faafe33f' +
        'fb639249223ae93ffb639249223ae9bfb9502029faafe33f2a956facc0d7eb3fba9af8dba48bdf3fba9af8db' +
        'a48bdfbf2a956facc0d7eb3f77f6b162d211d13f634968e740d7ee3f634968e740d7eebf77f6b162d211d13f' +
        '12e148ec8862ee3f016617945c13d43f016617945c13d4bf12e148ec8862ee3f5ec431996ec6dc3ff5113421' +
        '4b95ec3ff51134214b95ecbf5ec431996ec6dc3f6e97ff0b0e3be83fe9e5e3bbcae6e43fe9e5e3bbcae6e4bf' +
        '6e97ff0b0e3be83ff619ce9220d5b23f3a8801adcde9ef3f3a8801adcde9efbff619ce9220d5b23f3a8801ad' +
        'cde9ef3ff619ce9220d5b23ff619ce9220d5b2bf3a8801adcde9ef3fe9e5e3bbcae6e43f6e97ff0b0e3be83f' +
        '6e97ff0b0e3be8bfe9e5e3bbcae6e43ff51134214b95ec3f5ec431996ec6dc3f5ec431996ec6dcbff5113421' +
        '4b95ec3f016617945c13d43f12e148ec8862ee3f12e148ec8862eebf016617945c13d43f634968e740d7ee3f' +
        '77f6b162d211d13f77f6b162d211d1bf634968e740d7ee3fba9af8dba48bdf3f2a956facc0d7eb3f2a956fac' +
        'c0d7ebbfba9af8dba48bdf3ffb639249223ae93fb9502029faafe33fb9502029faafe3bffb639249223ae93f' +
        '0e73a9564e56bf3fd39fe17064c2ef3fd39fe17064c2efbf0e73a9564e56bf3fa94b71fa6487ef3fc63f8b44' +
        '14e2c53fc63f8b4414e2c5bfa94b71fa6487ef3fdf12dd4c056de23f822746a0a729ea3f822746a0a729eabf' +
        'df12dd4c056de23f000215580a09eb3f234b1b54b31ee13f234b1b54b31ee1bf000215580a09eb3f634f7e6a' +
        '820bcc3f89e564acf338ef3f89e564acf338efbf634f7e6a820bcc3f3cc2ccb613dbed3f9f45fa308508d73f' +
        '9f45fa308508d7bf3cc2ccb613dbed3f8aeda84379efd93f3ac94dd13441ed3f3ac94dd13441edbf8aeda843' +
        '79efd93f96ffef37082de73fdf2c1d55b710e63fdf2c1d55b710e6bf96ffef37082de73f7e66a3f75521993f' +
        '0dcd846088fdef3f0dcd846088fdefbf7e66a3f75521993fdb929b1662ffef3f84c7defcd121893f84c7defc' +
        'd12189bfdb929b1662ffef3f3d78f0251959e63fafa8ea5444e7e63fafa8ea5444e7e6bf3d78f0251959e63f' +
        '8be6c9736169ed3fd793bc632a37d93fd793bc632a37d9bf8be6c9736169ed3fe7cc1d31a9c3d73f9ba03862' +
        '52b6ed3f9ba0386252b6edbfe7cc1d31a9c3d73f2d2f0b3b604eef3f5104b025a082ca3f5104b025a082cabf' +
        '2d2f0b3b604eef3f49dbde634d73e13f11d5219ebcd2ea3f11d5219ebcd2eabf49dbde634d73e13fe2fa021b' +
        '0963ea3f59eb3399791ae23f59eb3399791ae2bfe2fa021b0963ea3f31bf50ded96dc73f7720a1a39975ef3f' +
        '7720a1a39975efbf31bf50ded96dc73f7ba66dfd15ceef3fd5c29ec78537bc3fd5c29ec78537bcbf7ba66dfd' +
        '15ceef3fd4564553d9fee33f0d94efa3ccfbe83f0d94efa3ccfbe8bfd4564553d9fee33f49557226c408ec3f' +
        'd678ef5219dcde3fd678ef5219dcdebf49557226c408ec3f3edb4c3f44d3d13f740bdfc8d8bbee3f740bdfc8' +
        'd8bbeebf3edb4c3f44d3d13f0dd14cab7b81ee3f5281e1c21054d33f5281e1c21054d3bf0dd14cab7b81ee3f' +
        '89e3865b7779dd3f9b7388348b67ec3f9b7388348b67ecbf89e3865b7779dd3fbf2eba0f407ce83f39099b9b' +
        '449ae43f39099b9b449ae4bfbf2eba0f407ce83f19a49a0ad0f6b53f095bbdfccae1ef3f095bbdfccae1efbf' +
        '19a49a0ad0f6b53fad718e6595f0ef3fe020f8796e65af3fe020f8796e65afbfad718e6595f0ef3f9655a392' +
        '8232e53f711757e3ecf8e73f711757e3ecf8e7bf9655a3928232e53f5cfcfcf3f0c1ec3fe71e01d84912dc3f' +
        'e71e01d84912dcbf5cfcfcf3f0c1ec3f6ae77842e2d1d43f7ec12b4b6a42ee3f7ec12b4b6a42eebf6ae77842' +
        'e2d1d43fc273e4a378f1ee3faefd370eb84fd03faefd370eb84fd0bfc273e4a378f1ee3fb73e4c87fc1ce03f' +
        'd2903567aaa5eb3fd2903567aaa5ebbfb73e4c87fc1ce03f42d7c7f47e77e93ff35906b15860e33ff35906b1' +
        '5860e3bf42d7c7f47e77e93f77f5dacef039c13f41d7957179b5ef3f41d7957179b5efbf77f5dacef039c13f' +
        '9b09c924f997ef3f5a3e29b17655c43f5a3e29b17655c4bf9b09c924f997ef3feaf3fa25dbbee23f94af29ef' +
        '43efe93f94af29ef43efe9bfeaf3fa25dbbee23f1257f53e4d3eeb3f8f895d4d70c9e03f8f895d4d70c9e0bf' +
        '1257f53e4d3eeb3f114345e54f93cd3fda3a76f75222ef3fda3a76f75222efbf114345e54f93cd3f2bbe2d62' +
        'aefeed3fc6273fdd7d4cd63fc6273fdd7d4cd6bf2bbe2d62aefeed3fca3f6d2bc8a6da3fdc353e74e717ed3f' +
        'dc353e74e717edbfca3f6d2bc8a6da3f6172035fe771e73f8c0165be7bc7e53f8c0165be7bc7e5bf6172035f' +
        'e771e73fcd55947565d8a23f5df7feef72faef3f5df7feef72faefbfcd55947565d8a23f5df7feef72faef3f' +
        'cd55947565d8a23fcd55947565d8a2bf5df7feef72faef3f8c0165be7bc7e53f6172035fe771e73f6172035f' +
        'e771e7bf8c0165be7bc7e53fdc353e74e717ed3fca3f6d2bc8a6da3fca3f6d2bc8a6dabfdc353e74e717ed3f' +
        'c6273fdd7d4cd63f2bbe2d62aefeed3f2bbe2d62aefeedbfc6273fdd7d4cd63fda3a76f75222ef3f114345e5' +
        '4f93cd3f114345e54f93cdbfda3a76f75222ef3f8f895d4d70c9e03f1257f53e4d3eeb3f1257f53e4d3eebbf' +
        '8f895d4d70c9e03f94af29ef43efe93feaf3fa25dbbee23feaf3fa25dbbee2bf94af29ef43efe93f5a3e29b1' +
        '7655c43f9b09c924f997ef3f9b09c924f997efbf5a3e29b17655c43f41d7957179b5ef3f77f5dacef039c13f' +
        '77f5dacef039c1bf41d7957179b5ef3ff35906b15860e33f42d7c7f47e77e93f42d7c7f47e77e9bff35906b1' +
        '5860e33fd2903567aaa5eb3fb73e4c87fc1ce03fb73e4c87fc1ce0bfd2903567aaa5eb3faefd370eb84fd03f' +
        'c273e4a378f1ee3fc273e4a378f1eebfaefd370eb84fd03f7ec12b4b6a42ee3f6ae77842e2d1d43f6ae77842' +
        'e2d1d4bf7ec12b4b6a42ee3fe71e01d84912dc3f5cfcfcf3f0c1ec3f5cfcfcf3f0c1ecbfe71e01d84912dc3f' +
        '711757e3ecf8e73f9655a3928232e53f9655a3928232e5bf711757e3ecf8e73fe020f8796e65af3fad718e65' +
        '95f0ef3fad718e6595f0efbfe020f8796e65af3f095bbdfccae1ef3f19a49a0ad0f6b53f19a49a0ad0f6b5bf' +
        '095bbdfccae1ef3f39099b9b449ae43fbf2eba0f407ce83fbf2eba0f407ce8bf39099b9b449ae43f9b738834' +
        '8b67ec3f89e3865b7779dd3f89e3865b7779ddbf9b7388348b67ec3f5281e1c21054d33f0dd14cab7b81ee3f' +
        '0dd14cab7b81eebf5281e1c21054d33f740bdfc8d8bbee3f3edb4c3f44d3d13f3edb4c3f44d3d1bf740bdfc8' +
        'd8bbee3fd678ef5219dcde3f49557226c408ec3f49557226c408ecbfd678ef5219dcde3f0d94efa3ccfbe83f' +
        'd4564553d9fee33fd4564553d9fee3bf0d94efa3ccfbe83fd5c29ec78537bc3f7ba66dfd15ceef3f7ba66dfd' +
        '15ceefbfd5c29ec78537bc3f7720a1a39975ef3f31bf50ded96dc73f31bf50ded96dc7bf7720a1a39975ef3f' +
        '59eb3399791ae23fe2fa021b0963ea3fe2fa021b0963eabf59eb3399791ae23f11d5219ebcd2ea3f49dbde63' +
        '4d73e13f49dbde634d73e1bf11d5219ebcd2ea3f5104b025a082ca3f2d2f0b3b604eef3f2d2f0b3b604eefbf' +
        '5104b025a082ca3f9ba0386252b6ed3fe7cc1d31a9c3d73fe7cc1d31a9c3d7bf9ba0386252b6ed3fd793bc63' +
        '2a37d93f8be6c9736169ed3f8be6c9736169edbfd793bc632a37d93fafa8ea5444e7e63f3d78f0251959e63f' +
        '3d78f0251959e6bfafa8ea5444e7e63f84c7defcd121893fdb929b1662ffef3fdb929b1662ffefbf84c7defc' +
        'd121893f928a8e85d8ffef3f710067fef021793f710067fef02179bf928a8e85d8ffef3f10af9184f77ce63f' +
        '7582c1730dc4e63f7582c1730dc4e6bf10af9184f77ce63ff9ecb8020b7ded3fb0a4c82ea5dad83fb0a4c82e' +
        'a5dad8bff9ecb8020b7ded3fc4aa4eb0e320d83f888966a983a3ed3f888966a983a3edbfc4aa4eb0e320d83f' +
        '849e78b1a258ef3f6643dcf2cbbdc93f6643dcf2cbbdc9bf849e78b1a258ef3fb8b9f2095a9de13fd4c01659' +
        '32b7ea3fd4c0165932b7eabfb8b9f2095a9de13f9de69f52587fea3f1b86bc8bf0f0e13f1b86bc8bf0f0e1bf' +
        '9de69f52587fea3fc6649ce86633c83fb7bbf57d3f6cef3fb7bbf57d3f6cefbfc6649ce86633c83f840b2214' +
        '79d3ef3f035c4924b7a7ba3f035c4924b7a7babf840b221479d3ef3fb16b8e17ff25e43fcc98163345dce83f' +
        'cc98163345dce8bfb16b8e17ff25e43fb071a93fde20ec3f1451f8eae083de3f1451f8eae083debfb071a93f' +
        'de20ec3f71bbc3abbb33d23f8ea8e7e8b2adee3f8ea8e7e8b2adeebf71bbc3abbb33d23ff2f71d368490ee3f' +
        '8703ecda22f4d23f8703ecda22f4d2bff2f71d368490ee3f58cc81148fd2dd3f07692b014250ec3f07692b01' +
        '4250ecbf58cc81148fd2dd3faad44d9a7e9ce83f4773981bb573e43f4773981bb573e4bfaad44d9a7e9ce83f' +
        '215b5d6a5887b73f56f4f19f53ddef3f56f4f19f53ddefbf215b5d6a5887b73f5c578d0f83f3ef3fe3d7c012' +
        '8d42ac3fe3d7c0128d42acbf5c578d0f83f3ef3f375197381058e53fb23dc36c83d7e73fb23dc36c83d7e7bf' +
        '375197381058e53ff6328b89d9d7ec3f01bd0423cfb7db3f01bd0423cfb7dbbff6328b89d9d7ec3f243caf80' +
        'd830d53f25ce70e8ea31ee3f25ce70e8ea31eebf243caf80d830d53fec950b0c22feee3ff9eddf1adcdccf3f' +
        'f9eddf1adcdccfbfec950b0c22feee3f1a22ae265648e03fe90475d2388ceb3fe90475d2388cebbf1a22ae26' +
        '5648e03f220dd82ecf95e93f578e0c0d4038e33f578e0c0d4038e3bf220dd82ecf95e93fcf7becd41601c23f' +
        'bbcf468e8eaeef3fbbcf468e8eaeefbfcf7becd41601c23fc8b2ad55ce9fef3f148dcdb0db8ec33f148dcdb0' +
        'db8ec3bfc8b2ad55ce9fef3f17eae8e380e7e23fd580eaf5b1d1e93fd580eaf5b1d1e9bf17eae8e380e7e23f' +
        '051492fe8958eb3fe1c51774909ee03fe1c51774909ee0bf051492fe8958eb3f1b1a101eca56ce3f5d20f753' +
        '8f16ef3f5d20f7538f16efbf1b1a101eca56ce3fac8029ca0c10ee3f93a69e3727eed53f93a69e3727eed5bf' +
        'ac8029ca0c10ee3f09407f6c0d02db3f92bdb2fed402ed3f92bdb2fed402edbf09407f6c0d02db3fe5554f57' +
        '0094e73f50725d2a8da2e53f50725d2a8da2e5bfe5554f570094e73f43cd90d200fca53fdf81dbda71f8ef3f' +
        'df81dbda71f8efbf43cd90d200fca53ff8d3f11d25fcef3f01cfd13137699f3f01cfd13137699fbff8d3f11d' +
        '25fcef3f7470839534ece53f8dd2a88d944fe73f8dd2a88d944fe7bf7470839534ece53f9fefe020b22ced3f' +
        'e5a1de27414bda3fe5a1de27414bdabf9fefe020b22ced3f177ec77d9daad63fda47def705eded3fda47def7' +
        '05ededbf177ec77d9daad63f9d9a08c9c92def3f86b212b38ccfcc3f86b212b38ccfccbf9d9a08c9c92def3f' +
        '7e8e2abb26f4e03fb4130047cd23eb3fb4130047cd23ebbf7e8e2abb26f4e03f37f9baea950cea3fa89c6227' +
        '0796e23fa89c62270796e2bf37f9baea950cea3ff2c59785df1bc53fdb41aeffd58fef3fdb41aeffd58fefbf' +
        'f2c59785df1bc53f8641e41716bcef3f1d83ba47a072c03f1d83ba47a072c0bf8641e41716bcef3f22ebdf85' +
        '4188e33fd76d8ee4ef58e93fd76d8ee4ef58e9bf22ebdf854188e33fea8093c4d7beeb3f1012e74bf6e2df3f' +
        '1012e74bf6e2dfbfea8093c4d7beeb3f90dbdbcfd9b0d03fbc9d5ae282e4ee3fbc9d5ae282e4eebf90dbdbcf' +
        'd9b0d03ffc9f72049f52ee3f541057a5b872d43f541057a5b872d4bffc9f72049f52ee3f0b0097497f6cdc3f' +
        '00b9a069c1abec3f00b9a069c1abecbf0b0097497f6cdc3fcc7ab5331b1ae83f9ba0599fc00ce53f9ba0599f' +
        'c00ce5bfcc7ab5331b1ae83fb309d7340144b13fc473b6ec58edef3fc473b6ec58edefbfb309d7340144b13f' +
        '40392eaff3e5ef3f962027791166b43f962027791166b4bf40392eaff3e5ef3f0400ec45a1c0e43fcc58e91a' +
        'c55be83fcc58e91ac55be8bf0400ec45a1c0e43ff33c23528e7eec3f5bdbe9e81620dd3f5bdbe9e81620ddbf' +
        'f33c23528e7eec3fb71404faceb3d33f44976adb2772ee3f44976adb2772eebfb71404faceb3d33f84bfc3d3' +
        'b2c9ee3f775176d7a072d13f775176d7a072d1bf84bfc3d3b2c9ee3f67d03f960534df3fdd7753e164f0eb3f' +
        'dd7753e164f0ebbf67d03f960534df3fa29dd46f161be93f4483c53882d7e33f4483c53882d7e3bfa29dd46f' +
        '161be93fc99faecb0ec7bd3f21b7fe6c64c8ef3f21b7fe6c64c8efbfc99faecb0ec7bd3f6e3de629a67eef3f' +
        'b24af60413a8c63fb24af60413a8c6bf6e3de629a67eef3f1fac98fbd543e23fc89a11c87846ea3fc89a11c8' +
        '7846eabf1fac98fbd543e23f74143cb404eeea3feb6c33af1549e13feb6c33af1549e1bf74143cb404eeea3f' +
        '22673def3247cb3fdd92ff85d043ef3fdd92ff85d043efbf22673def3247cb3f600241cbd7c8ed3ff618240f' +
        '3466d73ff618240f3466d7bf600241cbd7c8ed3fffbd41617193d93fb13ee9526f55ed3fb13ee9526f55edbf' +
        'ffbd41617193d93f7a6d17b3420ae73fe91b1ca30335e63fe91b1ca30335e6bf7a6d17b3420ae73ffd0ee3bb' +
        '36d9923fa1514bb49cfeef3fa1514bb49cfeefbffd0ee3bb36d9923fa1514bb49cfeef3ffd0ee3bb36d9923f' +
        'fd0ee3bb36d992bfa1514bb49cfeef3fe91b1ca30335e63f7a6d17b3420ae73f7a6d17b3420ae7bfe91b1ca3' +
        '0335e63fb13ee9526f55ed3fffbd41617193d93fffbd41617193d9bfb13ee9526f55ed3ff618240f3466d73f' +
        '600241cbd7c8ed3f600241cbd7c8edbff618240f3466d73fdd92ff85d043ef3f22673def3247cb3f22673def' +
        '3247cbbfdd92ff85d043ef3feb6c33af1549e13f74143cb404eeea3f74143cb404eeeabfeb6c33af1549e13f' +
        'c89a11c87846ea3f1fac98fbd543e23f1fac98fbd543e2bfc89a11c87846ea3fb24af60413a8c63f6e3de629' +
        'a67eef3f6e3de629a67eefbfb24af60413a8c63f21b7fe6c64c8ef3fc99faecb0ec7bd3fc99faecb0ec7bdbf' +
        '21b7fe6c64c8ef3f4483c53882d7e33fa29dd46f161be93fa29dd46f161be9bf4483c53882d7e33fdd7753e1' +
        '64f0eb3f67d03f960534df3f67d03f960534dfbfdd7753e164f0eb3f775176d7a072d13f84bfc3d3b2c9ee3f' +
        '84bfc3d3b2c9eebf775176d7a072d13f44976adb2772ee3fb71404faceb3d33fb71404faceb3d3bf44976adb' +
        '2772ee3f5bdbe9e81620dd3ff33c23528e7eec3ff33c23528e7eecbf5bdbe9e81620dd3fcc58e91ac55be83f' +
        '0400ec45a1c0e43f0400ec45a1c0e4bfcc58e91ac55be83f962027791166b43f40392eaff3e5ef3f40392eaf' +
        'f3e5efbf962027791166b43fc473b6ec58edef3fb309d7340144b13fb309d7340144b1bfc473b6ec58edef3f' +
        '9ba0599fc00ce53fcc7ab5331b1ae83fcc7ab5331b1ae8bf9ba0599fc00ce53f00b9a069c1abec3f0b009749' +
        '7f6cdc3f0b0097497f6cdcbf00b9a069c1abec3f541057a5b872d43ffc9f72049f52ee3ffc9f72049f52eebf' +
        '541057a5b872d43fbc9d5ae282e4ee3f90dbdbcfd9b0d03f90dbdbcfd9b0d0bfbc9d5ae282e4ee3f1012e74b' +
        'f6e2df3fea8093c4d7beeb3fea8093c4d7beebbf1012e74bf6e2df3fd76d8ee4ef58e93f22ebdf854188e33f' +
        '22ebdf854188e3bfd76d8ee4ef58e93f1d83ba47a072c03f8641e41716bcef3f8641e41716bcefbf1d83ba47' +
        'a072c03fdb41aeffd58fef3ff2c59785df1bc53ff2c59785df1bc5bfdb41aeffd58fef3fa89c62270796e23f' +
        '37f9baea950cea3f37f9baea950ceabfa89c62270796e23fb4130047cd23eb3f7e8e2abb26f4e03f7e8e2abb' +
        '26f4e0bfb4130047cd23eb3f86b212b38ccfcc3f9d9a08c9c92def3f9d9a08c9c92defbf86b212b38ccfcc3f' +
        'da47def705eded3f177ec77d9daad63f177ec77d9daad6bfda47def705eded3fe5a1de27414bda3f9fefe020' +
        'b22ced3f9fefe020b22cedbfe5a1de27414bda3f8dd2a88d944fe73f7470839534ece53f7470839534ece5bf' +
        '8dd2a88d944fe73f01cfd13137699f3ff8d3f11d25fcef3ff8d3f11d25fcefbf01cfd13137699f3fdf81dbda' +
        '71f8ef3f43cd90d200fca53f43cd90d200fca5bfdf81dbda71f8ef3f50725d2a8da2e53fe5554f570094e73f' +
        'e5554f570094e7bf50725d2a8da2e53f92bdb2fed402ed3f09407f6c0d02db3f09407f6c0d02dbbf92bdb2fe' +
        'd402ed3f93a69e3727eed53fac8029ca0c10ee3fac8029ca0c10eebf93a69e3727eed53f5d20f7538f16ef3f' +
        '1b1a101eca56ce3f1b1a101eca56cebf5d20f7538f16ef3fe1c51774909ee03f051492fe8958eb3f051492fe' +
        '8958ebbfe1c51774909ee03fd580eaf5b1d1e93f17eae8e380e7e23f17eae8e380e7e2bfd580eaf5b1d1e93f' +
        '148dcdb0db8ec33fc8b2ad55ce9fef3fc8b2ad55ce9fefbf148dcdb0db8ec33fbbcf468e8eaeef3fcf7becd4' +
        '1601c23fcf7becd41601c2bfbbcf468e8eaeef3f578e0c0d4038e33f220dd82ecf95e93f220dd82ecf95e9bf' +
        '578e0c0d4038e33fe90475d2388ceb3f1a22ae265648e03f1a22ae265648e0bfe90475d2388ceb3ff9eddf1a' +
        'dcdccf3fec950b0c22feee3fec950b0c22feeebff9eddf1adcdccf3f25ce70e8ea31ee3f243caf80d830d53f' +
        '243caf80d830d5bf25ce70e8ea31ee3f01bd0423cfb7db3ff6328b89d9d7ec3ff6328b89d9d7ecbf01bd0423' +
        'cfb7db3fb23dc36c83d7e73f375197381058e53f375197381058e5bfb23dc36c83d7e73fe3d7c0128d42ac3f' +
        '5c578d0f83f3ef3f5c578d0f83f3efbfe3d7c0128d42ac3f56f4f19f53ddef3f215b5d6a5887b73f215b5d6a' +
        '5887b7bf56f4f19f53ddef3f4773981bb573e43faad44d9a7e9ce83faad44d9a7e9ce8bf4773981bb573e43f' +
        '07692b014250ec3f58cc81148fd2dd3f58cc81148fd2ddbf07692b014250ec3f8703ecda22f4d23ff2f71d36' +
        '8490ee3ff2f71d368490eebf8703ecda22f4d23f8ea8e7e8b2adee3f71bbc3abbb33d23f71bbc3abbb33d2bf' +
        '8ea8e7e8b2adee3f1451f8eae083de3fb071a93fde20ec3fb071a93fde20ecbf1451f8eae083de3fcc981633' +
        '45dce83fb16b8e17ff25e43fb16b8e17ff25e4bfcc98163345dce83f035c4924b7a7ba3f840b221479d3ef3f' +
        '840b221479d3efbf035c4924b7a7ba3fb7bbf57d3f6cef3fc6649ce86633c83fc6649ce86633c8bfb7bbf57d' +
        '3f6cef3f1b86bc8bf0f0e13f9de69f52587fea3f9de69f52587feabf1b86bc8bf0f0e13fd4c0165932b7ea3f' +
        'b8b9f2095a9de13fb8b9f2095a9de1bfd4c0165932b7ea3f6643dcf2cbbdc93f849e78b1a258ef3f849e78b1' +
        'a258efbf6643dcf2cbbdc93f888966a983a3ed3fc4aa4eb0e320d83fc4aa4eb0e320d8bf888966a983a3ed3f' +
        'b0a4c82ea5dad83ff9ecb8020b7ded3ff9ecb8020b7dedbfb0a4c82ea5dad83f7582c1730dc4e63f10af9184' +
        'f77ce63f10af9184f77ce6bf7582c1730dc4e63f710067fef021793f928a8e85d8ffef3f928a8e85d8ffefbf' +
        '710067fef021793f021d6221f6ffef3fbaa4ccbef821693fbaa4ccbef82169bf021d6221f6ffef3f719ca1ea' +
        'd18ee63f9ce22fed5cb2e63f9ce22fed5cb2e6bf719ca1ead18ee63f4fa44584c486ed3f44edd5864bacd83f' +
        '44edd5864bacd8bf4fa44584c486ed3f3f90f3aa6a4fd83f463d8bdd009aed3f463d8bdd009aedbf3f90f3aa' +
        '6a4fd83f5d6843eda65def3ffa2ab6e9495bc93ffa2ab6e9495bc9bf5d6843eda65def3fbf73131750b2e13f' +
        '8eb92c7a54a9ea3f8eb92c7a54a9eabfbf73131750b2e13fd25a546e678dea3f7248dc641bdce13f7248dc64' +
        '1bdce1bfd25a546e678dea3f0418c4271796c83fee3c88567567ef3fee3c88567567efbf0418c4271796c83f' +
        '9e5ca72d0dd6ef3f5ca824ebb6dfb93f5ca824ebb6dfb9bf9e5ca72d0dd6ef3f80432a5b7f39e43f55461875' +
        '6acce83f554618756acce8bf80432a5b7f39e43ff1e33149d12cec3f25d83c6da857de3f25d83c6da857debf' +
        'f1e33149d12cec3fba545599e663d23f0058e69383a6ee3f0058e69383a6eebfba545599e663d23f306b0136' +
        'ec97ee3f2045954e1ac4d23f2045954e1ac4d2bf306b0136ec97ee3fde41a966fffedd3f04c041318344ec3f' +
        '04c041318344ecbfde41a966fffedd3f881dde1e87ace83fa2322b695a60e43fa2322b695a60e4bf881dde1e' +
        '87ace83fa130c112874fb83f8c531475fadaef3f8c531475fadaefbfa130c112874fb83fd3beb154dcf4ef3f' +
        '17835fbd01b1aa3f17835fbd01b1aabfd3beb154dcf4ef3f9f649751c36ae53f33d3e29cb8c6e73f33d3e29c' +
        'b8c6e7bf9f649751c36ae53f60a09927b3e2ec3f9356fd14788adb3f9356fd14788adbbf60a09927b3e2ec3f' +
        'b467f4124060d53f7a1939448f29ee3f7a1939448f29eebfb467f4124060d53f8c73cf145a04ef3f0238bd80' +
        '747bcf3f0238bd80747bcfbf8c73cf145a04ef3fb7b831ecf35de03fe992e786667feb3fe992e786667febbf' +
        'b7b831ecf35de03fb2062ba4dfa4e93f1fa649ec2124e33f1fa649ec2124e3bfb2062ba4dfa4e93f0934fd4d' +
        '9964c23fdcfd0ccbfbaaef3fdcfd0ccbfbaaefbf0934fd4d9964c23f91177aac9ba3ef3fa71645f97b2bc33f' +
        'a71645f97b2bc3bf91177aac9ba3ef3f1510444bc2fbe23fc275f010d1c2e93fc275f010d1c2e9bf1510444b' +
        'c2fbe23f47bcfd148f65eb3f8cb032201189e03f8cb032201189e0bf47bcfd148f65eb3f48e32d466bb8ce3f' +
        '5f8f89bc9010ef3f5f8f89bc9010efbf48e32d466bb8ce3fd966dc2fa018ee3fb6b39d8be7bed53fb6b39d8b' +
        'e7bed5bfd966dc2fa018ee3f7219b31d972fdb3f7b46cee830f8ec3f7b46cee830f8ecbf7219b31d972fdb3f' +
        'd297bf07f7a4e73fdf23f7d50190e53fdf23f7d50190e5bfd297bf07f7a4e73f864687a5ba8da73f64911bbb' +
        '53f7ef3f64911bbb53f7efbf864687a5ba8da73f79a6e29ce0fcef3f1d3be54c4f459c3f1d3be54c4f459cbf' +
        '79a6e29ce0fcef3f106ae5bd7cfee53f4299078e553ee73f4299078e553ee7bf106ae5bd7cfee53fdcfbcb7b' +
        'fc36ed3fc00ab543651dda3fc00ab543651ddabfdcfbcb7bfc36ed3fb60c8a6398d9d63f818d6d0f16e4ed3f' +
        '818d6d0f16e4edbfb60c8a6398d9d63ff0ae3a5a6833ef3fdd745d53906dcc3fdd745d53906dccbff0ae3a5a' +
        '6833ef3f57a9d0487209e13ff5a24c2a7416eb3ff5a24c2a7416ebbf57a9d0487209e13f5ea7c0d2261bea3f' +
        'ba3c4def8b81e23fba3c4def8b81e2bf5ea7c0d2261bea3fdecb5486007fc53f784bcb37a78bef3f784bcb37' +
        'a78befbfdecb5486007fc53f888d0a0f47bfef3f5bb86fade80ec03f5bb86fade80ec0bf888d0a0f47bfef3f' +
        '2930d6e3239ce33f6c4aace39049e93f6c4aace39049e9bf2930d6e3239ce33f27230dcb54cbeb3fded2245c' +
        '57b7df3fded2245c57b7dfbf27230dcb54cbeb3fce49174e5be1d03f5186076aebddee3f5186076aebddeebf' +
        'ce49174e5be1d03fd36704559d5aee3ff03689dc1043d43ff03689dc1043d4bfd36704559d5aee3f895386c3' +
        '7f99dc3f49c4b9198fa0ec3f49c4b9198fa0ecbf895386c37f99dc3fff45f5139c2ae83f86a4cc25ccf9e43f' +
        '86a4cc25ccf9e4bfff45f5139c2ae83f4d44ed74960cb23f0f4130259debef3f0f4130259debefbf4d44ed74' +
        '960cb23f602d4885eae7ef3f99a2c5129f9db33f99a2c5129f9db3bf602d4885eae7ef3f7f9f586dbcd3e43f' +
        'fa83af11714be83ffa83af11714be8bf7f9f586dbcd3e43f139c0287f589ec3f21cde1ae4bf3dc3f21cde1ae' +
        '4bf3dcbf139c0287f589ec3f71c26ee99be3d33fa7535dc5616aee3fa7535dc5616aeebf71c26ee99be3d33f' +
        '0990995e83d0ee3f7893c6ef3e42d13f7893c6ef3e42d1bf0990995e83d0ee3fa3cd56e6de5fdf3fc1541161' +
        '1be4eb3fc15411611be4ebbfa3cd56e6de5fdf3f15a8c51fa42ae93f18c58149c4c3e33f18c58149c4c3e3bf' +
        '15a8c51fa42ae93f3faae4fdb78ebe3ff69a7d3b6ec5ef3ff69a7d3b6ec5efbf3faae4fdb78ebe3f0cc6404a' +
        '0f83ef3f0d831d831a45c63f0d831d831a45c6bf0cc6404a0f83ef3f1071bb4c7358e23fc63b594a1838ea3f' +
        'c63b594a1838eabf1071bb4c7358e23fb6579fd88ffbea3f4f25eecfe933e13f4f25eecfe933e1bfb6579fd8' +
        '8ffbea3fad5df13463a9cb3f65bc1bbc6b3eef3f65bc1bbc6b3eefbfad5df13463a9cb3f5a918af3fed1ed3f' +
        '921026c96337d73f921026c96337d7bf5a918af3fed1ed3ff2f90d447dc1d93f2475181b5b4bed3f2475181b' +
        '5b4bedbff2f90d447dc1d93fbf410e96ac1be73fff22ec4fe422e63fff22ec4fe422e6bfbf410e96ac1be73f' +
        '26b2fa214dfd953f77cb70681cfeef3f77cb70681cfeefbf26b2fa214dfd953fd13bc54309ffef3fcb97b96a' +
        '296a8f3fcb97b96a296a8fbfd13bc54309ffef3f5b537f431547e63f755bc999caf8e63f755bc999caf8e6bf' +
        '5b537f431547e63f7f8a8872715fed3f8f94abb75565d93f8f94abb75565d9bf7f8a8872715fed3faedf13e6' +
        'f594d73f9a7595439ebfed3f9a7595439ebfedbfaedf13e6f594d73fb4abbc062249ef3fabb9f3d5f1e4ca3f' +
        'abb9f3d5f1e4cabfb4abbc062249ef3fbce2dbe4365ee13fefec45f368e0ea3fefec45f368e0eabfbce2dbe4' +
        '365ee13f23f59010c954ea3fe2132c662d2fe23fe2132c662d2fe2bf23f59010c954ea3fffc4088dfd0ac73f' +
        '2a321a9c297aef3f2a321a9c297aefbfffc4088dfd0ac73f5443910347cbef3fc17d303b53ffbc3fc17d303b' +
        '53ffbcbf5443910347cbef3f8006beea33ebe33ffe5e5743790be93ffe5e5743790be9bf8006beea33ebe33f' +
        '47b1a1259dfceb3ffef7bf061908df3ffef7bf061908dfbf47b1a1259dfceb3f43f2e8fbf7a2d13fb2f61a4b' +
        'cfc2ee3fb2f61a4bcfc2eebf43f2e8fbf7a2d13f5a16a529db79ee3fabb653e3f583d33fabb653e3f583d3bf' +
        '5a16a529db79ee3f9d60a82bd04cdd3fd7aa9e891573ec3fd7aa9e891573ecbf9d60a82bd04cdd3f95a19a1d' +
        '0a6ce83ff122675179ade43ff122675179ade4bf95a19a1d0a6ce83f0a4d4d4a772eb53f86d8e92be9e3ef3f' +
        '86d8e92be9e3efbf0a4d4d4a772eb53f9161820201efef3f6430464e617bb03f6430464e617bb0bf91618202' +
        '01efef3fa69ad91ca81fe53ffa526e758b09e83ffa526e758b09e8bfa69ad91ca81fe53f99da000ae2b6ec3f' +
        '293126476d3fdc3f293126476d3fdcbf99da000ae2b6ec3ff3821bd153a2d43f5ece81ff8d4aee3f5ece81ff' +
        '8d4aeebff3821bd153a2d43f44a5504c07ebee3f1e66eb054e80d03f1e66eb054e80d0bf44a5504c07ebee3f' +
        'e1822bc84007e03f0dc4b6a049b2eb3f0dc4b6a049b2ebbfe1822bc84007e03fe17fbd423f68e93f8d7f811b' +
        '5374e33f8d7f811b5374e3bfe17fbd423f68e93f8667b2bc4dd6c03fb7ad668dd1b8ef3fb7ad668dd1b8efbf' +
        '8667b2bc4dd6c03f08ac854ff193ef3f88fa797fb1b8c43f88fa797fb1b8c4bf08ac854ff193ef3f58eb7ae8' +
        '76aae23fde4931f1f4fde93fde4931f1f4fde9bf58eb7ae876aae23ff37bf3a51531eb3fb6c44bb8d0dee03f' +
        'b6c44bb8d0dee0bff37bf3a51531eb3feebd2c4d7731cd3fce0946fc1728ef3fce0946fc1728efbfeebd2c4d' +
        '7731cd3f9ca59b6ae3f5ed3fcb63ad9c947bd63fcb63ad9c947bd6bf9ca59b6ae3f5ed3f1bf3dbd30c79da3f' +
        'e1a4e5c65522ed3fe1a4e5c65522edbf1bf3dbd30c79da3f6447302cc560e73f5c343ee7ded9e53f5c343ee7' +
        'ded9e5bf6447302cc560e73f7fc142db8546a13faefd25e455fbef3faefd25e455fbefbf7fc142db8546a13f' +
        '14c008427cf9ef3f7961f86f396aa43f7961f86f396aa4bf14c008427cf9ef3f48744f260bb5e53f5bb3901b' +
        'fb82e73f5bb3901bfb82e7bf48744f260bb5e53fb9d2592f670ded3f09dc5c1273d4da3f09dc5c1273d4dabf' +
        'b9d2592f670ded3f02c2885c591dd63f540f28d96607ee3f540f28d96607eebf02c2885c591dd63f084728be' +
        '7a1cef3f9a09013f16f5cd3f9a09013f16f5cdbf084728be7a1cef3fec858f8705b4e03f2579de09744beb3f' +
        '2579de09744bebbfec858f8705b4e03f7224b4ed82e0e93fb89b4ed333d3e23fb89b4ed333d3e2bf7224b4ed' +
        '82e0e93f9348db572ff2c33f29defb7ced9bef3f29defb7ced9befbf9348db572ff2c33f4dd581c60db2ef3f' +
        'e724be40899dc13fe724be40899dc1bf4dd581c60db2ef3fe14dc152524ce33f947545f1ae86e93f947545f1' +
        'ae86e9bfe14dc152524ce33f5e15d91ffa98eb3f96bded55ae32e03f96bded55ae32e0bf5e15d91ffa98eb3f' +
        'd2fdb906181fd03fc0a31ce5d6f7ee3fc0a31ce5d6f7eebfd2fdb906181fd03f85ce75ec333aee3f487019dc' +
        '6301d53f487019dc6301d5bf85ce75ec333aee3fd9c0ff1715e5db3fa0dec220eeccec3fa0dec220eeccecbf' +
        'd9c0ff1715e5db3f8636b0873fe8e73ffc9d15f54f45e53ffc9d15f54f45e5bf8636b0873fe8e73fc98e80f9' +
        '06d4ad3fed31e11416f2ef3fed31e11416f2efbfc98e80f906d4ad3f0733f72299dfef3f29b1793e1bbfb63f' +
        '29b1793e1bbfb6bf0733f72299dfef3fff9160300387e43fa11b48e7668ce83fa11b48e7668ce8bfff916030' +
        '0387e43f5af8fe59ef5bec3fd910fa5c0ca6dd3fd910fa5c0ca6ddbf5af8fe59ef5bec3fafba38b61f24d33f' +
        '2560ad5b0989ee3f2560ad5b0989eebfafba38b61f24d33f11885b51cfb4ee3fbe27d7838503d23fbe27d783' +
        '8503d2bf11885b51cfb4ee3f2056f29506b0de3f575e46dcd914ec3f575e46dcd914ecbf2056f29506b0de3f' +
        '496c489b10ece83f8c103d667212e43f8c103d667212e4bf496c489b10ece83f4cf638eca66fbb3f8760d858' +
        'd1d0ef3f8760d858d1d0efbf4cf638eca66fbb3fb77e4b43f670ef3f1ccbd2bba7d0c73f1ccbd2bba7d0c7bf' +
        'b77e4b43f670ef3fd66075a1ba05e23ff5609dde3871ea3ff5609dde3871eabfd66075a1ba05e23fc8fa3ebd' +
        'ffc4ea3fe5463a1f5988e13fe5463a1f5988e1bfc8fa3ebdffc4ea3fda31181b3e20ca3f072daf1f8b53ef3f' +
        '072daf1f8b53efbfda31181b3e20ca3fb98ae62cf4aced3fe44173d34df2d73fe44173d34df2d7bfb98ae62c' +
        'f4aced3fd17bef81ef08d93fff0d8c503f73ed3fff0d8c503f73edbfd17bef81ef08d93fcdaf4aefafd5e63f' +
        '86b3523f0f6be63f86b3523f0f6be6bfcdaf4aefafd5e63f0397500e6bd9823f4f8c972ca7ffef3f4f8c972c' +
        'a7ffefbf0397500e6bd9823f4f8c972ca7ffef3f0397500e6bd9823f0397500e6bd982bf4f8c972ca7ffef3f' +
        '86b3523f0f6be63fcdaf4aefafd5e63fcdaf4aefafd5e6bf86b3523f0f6be63fff0d8c503f73ed3fd17bef81' +
        'ef08d93fd17bef81ef08d9bfff0d8c503f73ed3fe44173d34df2d73fb98ae62cf4aced3fb98ae62cf4acedbf' +
        'e44173d34df2d73f072daf1f8b53ef3fda31181b3e20ca3fda31181b3e20cabf072daf1f8b53ef3fe5463a1f' +
        '5988e13fc8fa3ebdffc4ea3fc8fa3ebdffc4eabfe5463a1f5988e13ff5609dde3871ea3fd66075a1ba05e23f' +
        'd66075a1ba05e2bff5609dde3871ea3f1ccbd2bba7d0c73fb77e4b43f670ef3fb77e4b43f670efbf1ccbd2bb' +
        'a7d0c73f8760d858d1d0ef3f4cf638eca66fbb3f4cf638eca66fbbbf8760d858d1d0ef3f8c103d667212e43f' +
        '496c489b10ece83f496c489b10ece8bf8c103d667212e43f575e46dcd914ec3f2056f29506b0de3f2056f295' +
        '06b0debf575e46dcd914ec3fbe27d7838503d23f11885b51cfb4ee3f11885b51cfb4eebfbe27d7838503d23f' +
        '2560ad5b0989ee3fafba38b61f24d33fafba38b61f24d3bf2560ad5b0989ee3fd910fa5c0ca6dd3f5af8fe59' +
        'ef5bec3f5af8fe59ef5becbfd910fa5c0ca6dd3fa11b48e7668ce83fff9160300387e43fff9160300387e4bf' +
        'a11b48e7668ce83f29b1793e1bbfb63f0733f72299dfef3f0733f72299dfefbf29b1793e1bbfb63fed31e114' +
        '16f2ef3fc98e80f906d4ad3fc98e80f906d4adbfed31e11416f2ef3ffc9d15f54f45e53f8636b0873fe8e73f' +
        '8636b0873fe8e7bffc9d15f54f45e53fa0dec220eeccec3fd9c0ff1715e5db3fd9c0ff1715e5dbbfa0dec220' +
        'eeccec3f487019dc6301d53f85ce75ec333aee3f85ce75ec333aeebf487019dc6301d53fc0a31ce5d6f7ee3f' +
        'd2fdb906181fd03fd2fdb906181fd0bfc0a31ce5d6f7ee3f96bded55ae32e03f5e15d91ffa98eb3f5e15d91f' +
        'fa98ebbf96bded55ae32e03f947545f1ae86e93fe14dc152524ce33fe14dc152524ce3bf947545f1ae86e93f' +
        'e724be40899dc13f4dd581c60db2ef3f4dd581c60db2efbfe724be40899dc13f29defb7ced9bef3f9348db57' +
        '2ff2c33f9348db572ff2c3bf29defb7ced9bef3fb89b4ed333d3e23f7224b4ed82e0e93f7224b4ed82e0e9bf' +
        'b89b4ed333d3e23f2579de09744beb3fec858f8705b4e03fec858f8705b4e0bf2579de09744beb3f9a09013f' +
        '16f5cd3f084728be7a1cef3f084728be7a1cefbf9a09013f16f5cd3f540f28d96607ee3f02c2885c591dd63f' +
        '02c2885c591dd6bf540f28d96607ee3f09dc5c1273d4da3fb9d2592f670ded3fb9d2592f670dedbf09dc5c12' +
        '73d4da3f5bb3901bfb82e73f48744f260bb5e53f48744f260bb5e5bf5bb3901bfb82e73f7961f86f396aa43f' +
        '14c008427cf9ef3f14c008427cf9efbf7961f86f396aa43faefd25e455fbef3f7fc142db8546a13f7fc142db' +
        '8546a1bfaefd25e455fbef3f5c343ee7ded9e53f6447302cc560e73f6447302cc560e7bf5c343ee7ded9e53f' +
        'e1a4e5c65522ed3f1bf3dbd30c79da3f1bf3dbd30c79dabfe1a4e5c65522ed3fcb63ad9c947bd63f9ca59b6a' +
        'e3f5ed3f9ca59b6ae3f5edbfcb63ad9c947bd63fce0946fc1728ef3feebd2c4d7731cd3feebd2c4d7731cdbf' +
        'ce0946fc1728ef3fb6c44bb8d0dee03ff37bf3a51531eb3ff37bf3a51531ebbfb6c44bb8d0dee03fde4931f1' +
        'f4fde93f58eb7ae876aae23f58eb7ae876aae2bfde4931f1f4fde93f88fa797fb1b8c43f08ac854ff193ef3f' +
        '08ac854ff193efbf88fa797fb1b8c43fb7ad668dd1b8ef3f8667b2bc4dd6c03f8667b2bc4dd6c0bfb7ad668d' +
        'd1b8ef3f8d7f811b5374e33fe17fbd423f68e93fe17fbd423f68e9bf8d7f811b5374e33f0dc4b6a049b2eb3f' +
        'e1822bc84007e03fe1822bc84007e0bf0dc4b6a049b2eb3f1e66eb054e80d03f44a5504c07ebee3f44a5504c' +
        '07ebeebf1e66eb054e80d03f5ece81ff8d4aee3ff3821bd153a2d43ff3821bd153a2d4bf5ece81ff8d4aee3f' +
        '293126476d3fdc3f99da000ae2b6ec3f99da000ae2b6ecbf293126476d3fdc3ffa526e758b09e83fa69ad91c' +
        'a81fe53fa69ad91ca81fe5bffa526e758b09e83f6430464e617bb03f9161820201efef3f9161820201efefbf' +
        '6430464e617bb03f86d8e92be9e3ef3f0a4d4d4a772eb53f0a4d4d4a772eb5bf86d8e92be9e3ef3ff1226751' +
        '79ade43f95a19a1d0a6ce83f95a19a1d0a6ce8bff122675179ade43fd7aa9e891573ec3f9d60a82bd04cdd3f' +
        '9d60a82bd04cddbfd7aa9e891573ec3fabb653e3f583d33f5a16a529db79ee3f5a16a529db79eebfabb653e3' +
        'f583d33fb2f61a4bcfc2ee3f43f2e8fbf7a2d13f43f2e8fbf7a2d1bfb2f61a4bcfc2ee3ffef7bf061908df3f' +
        '47b1a1259dfceb3f47b1a1259dfcebbffef7bf061908df3ffe5e5743790be93f8006beea33ebe33f8006beea' +
        '33ebe3bffe5e5743790be93fc17d303b53ffbc3f5443910347cbef3f5443910347cbefbfc17d303b53ffbc3f' +
        '2a321a9c297aef3fffc4088dfd0ac73fffc4088dfd0ac7bf2a321a9c297aef3fe2132c662d2fe23f23f59010' +
        'c954ea3f23f59010c954eabfe2132c662d2fe23fefec45f368e0ea3fbce2dbe4365ee13fbce2dbe4365ee1bf' +
        'efec45f368e0ea3fabb9f3d5f1e4ca3fb4abbc062249ef3fb4abbc062249efbfabb9f3d5f1e4ca3f9a759543' +
        '9ebfed3faedf13e6f594d73faedf13e6f594d7bf9a7595439ebfed3f8f94abb75565d93f7f8a8872715fed3f' +
        '7f8a8872715fedbf8f94abb75565d93f755bc999caf8e63f5b537f431547e63f5b537f431547e6bf755bc999' +
        'caf8e63fcb97b96a296a8f3fd13bc54309ffef3fd13bc54309ffefbfcb97b96a296a8f3f77cb70681cfeef3f' +
        '26b2fa214dfd953f26b2fa214dfd95bf77cb70681cfeef3fff22ec4fe422e63fbf410e96ac1be73fbf410e96' +
        'ac1be7bfff22ec4fe422e63f2475181b5b4bed3ff2f90d447dc1d93ff2f90d447dc1d9bf2475181b5b4bed3f' +
        '921026c96337d73f5a918af3fed1ed3f5a918af3fed1edbf921026c96337d73f65bc1bbc6b3eef3fad5df134' +
        '63a9cb3fad5df13463a9cbbf65bc1bbc6b3eef3f4f25eecfe933e13fb6579fd88ffbea3fb6579fd88ffbeabf' +
        '4f25eecfe933e13fc63b594a1838ea3f1071bb4c7358e23f1071bb4c7358e2bfc63b594a1838ea3f0d831d83' +
        '1a45c63f0cc6404a0f83ef3f0cc6404a0f83efbf0d831d831a45c63ff69a7d3b6ec5ef3f3faae4fdb78ebe3f' +
        '3faae4fdb78ebebff69a7d3b6ec5ef3f18c58149c4c3e33f15a8c51fa42ae93f15a8c51fa42ae9bf18c58149' +
        'c4c3e33fc15411611be4eb3fa3cd56e6de5fdf3fa3cd56e6de5fdfbfc15411611be4eb3f7893c6ef3e42d13f' +
        '0990995e83d0ee3f0990995e83d0eebf7893c6ef3e42d13fa7535dc5616aee3f71c26ee99be3d33f71c26ee9' +
        '9be3d3bfa7535dc5616aee3f21cde1ae4bf3dc3f139c0287f589ec3f139c0287f589ecbf21cde1ae4bf3dc3f' +
        'fa83af11714be83f7f9f586dbcd3e43f7f9f586dbcd3e4bffa83af11714be83f99a2c5129f9db33f602d4885' +
        'eae7ef3f602d4885eae7efbf99a2c5129f9db33f0f4130259debef3f4d44ed74960cb23f4d44ed74960cb2bf' +
        '0f4130259debef3f86a4cc25ccf9e43fff45f5139c2ae83fff45f5139c2ae8bf86a4cc25ccf9e43f49c4b919' +
        '8fa0ec3f895386c37f99dc3f895386c37f99dcbf49c4b9198fa0ec3ff03689dc1043d43fd36704559d5aee3f' +
        'd36704559d5aeebff03689dc1043d43f5186076aebddee3fce49174e5be1d03fce49174e5be1d0bf5186076a' +
        'ebddee3fded2245c57b7df3f27230dcb54cbeb3f27230dcb54cbebbfded2245c57b7df3f6c4aace39049e93f' +
        '2930d6e3239ce33f2930d6e3239ce3bf6c4aace39049e93f5bb86fade80ec03f888d0a0f47bfef3f888d0a0f' +
        '47bfefbf5bb86fade80ec03f784bcb37a78bef3fdecb5486007fc53fdecb5486007fc5bf784bcb37a78bef3f' +
        'ba3c4def8b81e23f5ea7c0d2261bea3f5ea7c0d2261beabfba3c4def8b81e23ff5a24c2a7416eb3f57a9d048' +
        '7209e13f57a9d0487209e1bff5a24c2a7416eb3fdd745d53906dcc3ff0ae3a5a6833ef3ff0ae3a5a6833efbf' +
        'dd745d53906dcc3f818d6d0f16e4ed3fb60c8a6398d9d63fb60c8a6398d9d6bf818d6d0f16e4ed3fc00ab543' +
        '651dda3fdcfbcb7bfc36ed3fdcfbcb7bfc36edbfc00ab543651dda3f4299078e553ee73f106ae5bd7cfee53f' +
        '106ae5bd7cfee5bf4299078e553ee73f1d3be54c4f459c3f79a6e29ce0fcef3f79a6e29ce0fcefbf1d3be54c' +
        '4f459c3f64911bbb53f7ef3f864687a5ba8da73f864687a5ba8da7bf64911bbb53f7ef3fdf23f7d50190e53f' +
        'd297bf07f7a4e73fd297bf07f7a4e7bfdf23f7d50190e53f7b46cee830f8ec3f7219b31d972fdb3f7219b31d' +
        '972fdbbf7b46cee830f8ec3fb6b39d8be7bed53fd966dc2fa018ee3fd966dc2fa018eebfb6b39d8be7bed53f' +
        '5f8f89bc9010ef3f48e32d466bb8ce3f48e32d466bb8cebf5f8f89bc9010ef3f8cb032201189e03f47bcfd14' +
        '8f65eb3f47bcfd148f65ebbf8cb032201189e03fc275f010d1c2e93f1510444bc2fbe23f1510444bc2fbe2bf' +
        'c275f010d1c2e93fa71645f97b2bc33f91177aac9ba3ef3f91177aac9ba3efbfa71645f97b2bc33fdcfd0ccb' +
        'fbaaef3f0934fd4d9964c23f0934fd4d9964c2bfdcfd0ccbfbaaef3f1fa649ec2124e33fb2062ba4dfa4e93f' +
        'b2062ba4dfa4e9bf1fa649ec2124e33fe992e786667feb3fb7b831ecf35de03fb7b831ecf35de0bfe992e786' +
        '667feb3f0238bd80747bcf3f8c73cf145a04ef3f8c73cf145a04efbf0238bd80747bcf3f7a1939448f29ee3f' +
        'b467f4124060d53fb467f4124060d5bf7a1939448f29ee3f9356fd14788adb3f60a09927b3e2ec3f60a09927' +
        'b3e2ecbf9356fd14788adb3f33d3e29cb8c6e73f9f649751c36ae53f9f649751c36ae5bf33d3e29cb8c6e73f' +
        '17835fbd01b1aa3fd3beb154dcf4ef3fd3beb154dcf4efbf17835fbd01b1aa3f8c531475fadaef3fa130c112' +
        '874fb83fa130c112874fb8bf8c531475fadaef3fa2322b695a60e43f881dde1e87ace83f881dde1e87ace8bf' +
        'a2322b695a60e43f04c041318344ec3fde41a966fffedd3fde41a966fffeddbf04c041318344ec3f2045954e' +
        '1ac4d23f306b0136ec97ee3f306b0136ec97eebf2045954e1ac4d23f0058e69383a6ee3fba545599e663d23f' +
        'ba545599e663d2bf0058e69383a6ee3f25d83c6da857de3ff1e33149d12cec3ff1e33149d12cecbf25d83c6d' +
        'a857de3f554618756acce83f80432a5b7f39e43f80432a5b7f39e4bf554618756acce83f5ca824ebb6dfb93f' +
        '9e5ca72d0dd6ef3f9e5ca72d0dd6efbf5ca824ebb6dfb93fee3c88567567ef3f0418c4271796c83f0418c427' +
        '1796c8bfee3c88567567ef3f7248dc641bdce13fd25a546e678dea3fd25a546e678deabf7248dc641bdce13f' +
        '8eb92c7a54a9ea3fbf73131750b2e13fbf73131750b2e1bf8eb92c7a54a9ea3ffa2ab6e9495bc93f5d6843ed' +
        'a65def3f5d6843eda65defbffa2ab6e9495bc93f463d8bdd009aed3f3f90f3aa6a4fd83f3f90f3aa6a4fd8bf' +
        '463d8bdd009aed3f44edd5864bacd83f4fa44584c486ed3f4fa44584c486edbf44edd5864bacd83f9ce22fed' +
        '5cb2e63f719ca1ead18ee63f719ca1ead18ee6bf9ce22fed5cb2e63fbaa4ccbef821693f021d6221f6ffef3f' +
        '021d6221f6ffefbfbaa4ccbef821693f'
    )
  );

  // Sanity check (shake256 because used already): catch byte-level corruption, endianness/layout
  // mistakes, or accidental regeneration through engine-dependent sin/cos results.
  const rootBytes = u8f(baswap64If(Float64Array.from(roots)));
  if (
    bytesToHex(shake256(rootBytes)) !==
    'f45a496cf56ccc6e3e3395a20209206d81d71a7905a661447bd5bc0e24e0af1e'
  ) {
    throw new Error('COMPLEX_ROOTS mismatch');
  }
  return roots;
})();

// Falcon's q-field Montgomery kernel: mul() operates on Montgomery residues and returns one.
// inv() accepts a normal residue but returns its inverse in Montgomery form, so div(x, y) can stay
// `mul(x, inv(y))`; callers like toMontgomery() manage the representation boundaries.
const intField = {
  mul(x: number, y: number) {
    let z = Math.imul(x, y);
    let w = Math.imul(Q, Math.imul(z, Q0I) & 0xffff);
    z = ((z + w) >>> 16) - Q;
    z += Q & (z >> 31);
    return z >>> 0;
  },
  inv(y: number): number {
    // y^(q-2) mod q
    if (y === 0) throw new Error('divison by zero');
    const e00 = this.mul(y, R2); // e0 = 1
    const e01 = this.mul(e00, e00); // 2 * e0 = 2
    const e02 = this.mul(e01, e00); // e1 + e0 = 3
    const e03 = this.mul(e02, e01); // e3 = e2 + e1 = 5
    const e04 = this.mul(e03, e03); // e4 = 2 * e3 = 10
    const e05 = this.mul(e04, e04); // e5 = 2 * e4 = 20
    const e06 = this.mul(e05, e05); // e6 = 2 * e5 = 40
    const e07 = this.mul(e06, e06); // e7 = 2 * e6 = 80
    const e08 = this.mul(e07, e07); // e8 = 2 * e7 = 160
    const e09 = this.mul(e08, e02); // e9 = e8 + e2 = 163
    const e10 = this.mul(e09, e08); // e10 = e9 + e8 = 323
    const e11 = this.mul(e10, e10); // e11 = 2 * e10 = 646
    const e12 = this.mul(e11, e11); // e12 = 2 * e11 = 1292
    const e13 = this.mul(e12, e09); // e13 = e12 + e9 = 1455
    const e14 = this.mul(e13, e13); // e14 = 2 * e13 = 2910
    const e15 = this.mul(e14, e14); // e15 = 2 * e14 = 5820
    const e16 = this.mul(e15, e10); // e16 = e15 + e10 = 6143
    const e17 = this.mul(e16, e16); // e17 = 2 * e16 = 12286
    const e18 = this.mul(e17, e00); // e18 = e17 + e0 = 12287
    return e18;
  },
  div: (x: number, y: number): number => intField.mul(x, intField.inv(y)),
};

function getIntPoly(logn: number) {
  const n = 1 << logn;
  const newPoly = (n: number) => new Uint16Array(n);
  const F = Number(invert(BigInt(n), QBig));
  const { mod, smod, NTT } = genCrystals({
    N: n,
    Q,
    F: F,
    ROOT_OF_UNITY: 7,
    newPoly,
    isKyber: false,
    brvBits: 10,
  });
  // Keep Falcon source compatible with older TS parsers: avoid spelling newer
  // `Uint16Array<ArrayBuffer>` syntax directly and cast the callee side at the boundary.
  const ntt = (r: TArg<IPoly>): TRet<IPoly> => (NTT.encode as any)(r);
  const intt = (r: TArg<IPoly>): TRet<IPoly> => (NTT.decode as any)(r);
  // Falcon integer helpers mutate their first argument in place; div() also performs intt()
  // before returning, so callers must treat these as owned-temporary transforms, not pure helpers.
  // Centered representatives are in [-6144, 6144] for odd q = 12289,
  // not a generic [-q/2, q/2] range.
  const signedCoder = {
    encode: (p: TArg<IPoly>) => Int16Array.from(p, (x) => smod(x)),
    decode: (p: TArg<SPoly | Int16Array>) => Uint16Array.from(p, (x) => mod(x)),
  };
  const intPoly = {
    create: newPoly,
    smallSqnorm(f: TArg<SPoly>) {
      let s = 0;
      let ng = 0;
      for (let u = 0; u < n; u++) {
        const z = f[u];
        s = (s + z * z) >>> 0;
        ng |= s;
      }
      return (s | -(ng >>> 31)) >>> 0;
    },
    isShort(s1: TArg<Int16Array>, s2: TArg<Int16Array>) {
      let s = 0 >>> 0;
      let ng = 0 >>> 0;
      for (let u = 0; u < n; u++) {
        let z1 = (s1[u] << 16) >> 16;
        s = (s + ((z1 * z1) >>> 0)) >>> 0;
        ng |= s;
        let z2 = (s2[u] << 16) >> 16;
        s = (s + ((z2 * z2) >>> 0)) >>> 0;
        ng |= s;
      }
      if (ng & 0x80000000) s = 0xffffffff;
      return s <= L2BOUND[logn];
    },
    sub(a: TArg<IPoly>, b: TArg<IPoly>): TRet<IPoly> {
      for (let i = 0; i < n; i++) a[i] = mod(a[i] - b[i]);
      return a as TRet<IPoly>;
    },
    ntt,
    intt,
    toMontgomery(d: TArg<IPoly>): TRet<IPoly> {
      for (let i = 0; i < n; i++) d[i] = intField.mul(d[i], R2);
      return d as TRet<IPoly>;
    },
    mul(f: TArg<IPoly>, d: TArg<IPoly>): TRet<IPoly> {
      for (let i = 0; i < n; i++) f[i] = intField.mul(f[i], d[i]);
      return f as TRet<IPoly>;
    },
    div(f: TArg<IPoly>, d: TArg<IPoly>): TRet<IPoly> {
      for (let i = 0; i < n; i++) f[i] = intField.div(f[i], d[i]);
      this.intt(f);
      return f as TRet<IPoly>;
    },
  };
  return { newPoly, intPoly, signedCoder };
}

// Falcon's JS binary64 complex field wrapper for FFT/sampler paths. Current uses are the
// ordinary finite-number operations add/sub/neg/mul/conj/scale/magSqSum; the inherited wider API
// exists because getComplex() exposes it, not because all methods are relied on by Falcon today.
const fComplex = getComplex({
  ZERO: 0,
  ONE: 1,
  add: (x: number, y: number) => x + y,
  sub: (x: number, y: number) => x - y,
  mul: (x: number, y: number) => x * y,
  div: (x: number, y: number) => x / y,
  eql: (x: number, y: number) => x === y,
  inv: (x: number) => 1 / x,
  neg: (x: number) => -x,
} as any as IField<number>);

// Detached object copy of the exact round-3 / PQClean fpr_gm_tab payload in its original order.
const COMPLEX_ROOTS_O = ComplexArrInterleaved.decode(COMPLEX_ROOTS);
// Re-map roots into the local forward FFTCore schedule
// `{ dit: false, invertButterflies: true, brp: false }`.
// Index 0 stays intentionally unused because FFTCore's forward group counter starts at 1.
const FFTCoreRoots: Record<number, ComplexElm<number>[]> = {};
// Inverse FFTCore reads roots as `N - grp`, so fill this table from the end and store `-conj(root)`
// rather than plain conjugates
// to match Falcon's split/iFFT sign convention under the local butterfly.
const FFTCoreRootsConj: Record<number, ComplexElm<number>[]> = {};
for (let logn = 0; logn < 10; logn++) {
  const out = new Array(1 << logn);
  const outC = new Array(1 << logn);
  for (let i = 0, g1 = 1, g2 = 1; i < logn; i++) {
    const ng = 1 << i;
    for (let k = 0; k < ng; k++) out[g1++] = COMPLEX_ROOTS_O[(ng << 1) + k];
    const ng2 = 1 << (logn - i);
    for (let k = 0; k < ng2 >> 1; k++)
      outC[out.length - g2++] = fComplex.neg(fComplex.conj(COMPLEX_ROOTS_O[ng2 + k]));
  }
  FFTCoreRoots[logn] = out;
  FFTCoreRootsConj[logn] = outC;
}

type CPoly = ComplexElm<number>[];
// Mixed float-poly helper surface: most methods allocate / return fresh values,
// but FFT() and iFFT() mutate their CPoly input in place.
// Flat Float64Array buffers use ComplexArr's [...re, ...im] layout.
function getFloatPoly(logn: number) {
  const n = 1 << logn;
  const N_COMPLEX = n >> 1;
  const hn = Math.log2(N_COMPLEX);
  const fftOpts = { N: N_COMPLEX, invertButterflies: true, skipStages: 0, brp: false };
  const inv = 1.0 / N_COMPLEX;
  return {
    to: (f: TArg<FPoly>) => ComplexArr.decode(Array.from(f)),
    from: (f: CPoly): TRet<FPoly> => new Float64Array(ComplexArr.encode(f)) as TRet<FPoly>,
    // Runtime callers also pass HashToPoint's Uint16Array output here;
    // the implementation only needs a numeric typed-array shape,
    // even though the local type is narrower.
    convSmall: (f: TArg<SPoly>): CPoly => ComplexArr.decode(Array.from(f)),
    add: (a: CPoly, b: CPoly): CPoly => a.map((i, j) => fComplex.add(i, b[j])),
    sub: (a: CPoly, b: CPoly): CPoly => a.map((i, j) => fComplex.sub(i, b[j])),
    neg: (a: CPoly): CPoly => a.map((i) => fComplex.neg(i)),
    mul: (a: CPoly, b: CPoly): CPoly => a.map((i, j) => fComplex.mul(i, b[j])),
    conj: (a: CPoly): CPoly => a.map((i) => fComplex.conj(i)),
    mulConst: (a: CPoly, x: number): CPoly => a.map((i) => fComplex.scale(i, x)),
    scaleNorm: (a: CPoly, b: TArg<FPoly>): CPoly => a.map((i, j) => fComplex.scale(i, b[j])),
    invNorm: (a: CPoly, b: CPoly) =>
      new Float64Array(a.map((i, j) => 1.0 / fComplex.magSqSum(i, b[j]))),
    FFT: (f: CPoly): CPoly =>
      FFTCore(fComplex, { ...fftOpts, dit: false, roots: FFTCoreRoots[hn] })(f),
    iFFT(f: CPoly): CPoly {
      FFTCore(fComplex, { ...fftOpts, dit: true, roots: FFTCoreRootsConj[hn] })(f);
      for (let i = 0; i < f.length; i++) f[i] = fComplex.scale(f[i], inv);
      return f;
    },
  };
}

function ldlFFT(logn: number, g00t: CPoly, g01t: CPoly, g11t: CPoly) {
  // Algorithm 8: LDL*(G)
  // (Page 37)
  // Require: A full-rank self-adjoint matrix G = (Gᵢⱼ) ∈ FFT(Q[x]/(φ))²ˣ²
  // Ensure: The LDL* decomposition G = LDL* over FFT(Q[x]/(φ))
  // Format: All polynomials are in FFT representation.
  // 1: D₀₀ ← G₀₀
  // 2: L₁₀ ← G₁₀/G₀₀
  // 3: D₁₁ ← G₁₁ - L₁₀ ⊙ L₁₀* ⊙ G₀₀
  // 4: L ← [ 1 0 ; L₁₀ 1 ], D ← [ D₀₀ 0 ; 0 D₁₁ ]
  // 5: return (L, D)

  // Algorithm 9: ffLDL*(G)
  // (Page 37)
  // Require: A full-rank Gram matrix G ∈ FFT(Q[x]/(xⁿ + 1))²ˣ²
  // Ensure: A binary tree T
  // Format: All polynomials are in FFT representation.
  // 1: (L, D) ← LDL*(G) ▷ L = [ 1 0 ; L₁₀ 1 ], D = [ D₀₀ 0 ; 0 D₁₁ ]
  // 2: T.value ← L₁₀
  // 3: if (n = 2) then
  // 4:     T.leftchild ← D₀₀
  // 5:     T.rightchild ← D₁₁
  // 6:     return T
  // 7: else
  // 8:     d₀₀, d₀₁ ← splitfft(D₀₀) ▷ dᵢⱼ ∈ FFT(Q[x]/(x^{n/2} + 1))
  // 9:     d₁₀, d₁₁ ← splitfft(D₁₁)
  // 10:     G₀ ← [ d₀₀ d₀₁ ; d₀₁* d₀₀ ], G₁ ← [ d₁₀ d₁₁ ; d₁₁* d₁₀ ]
  //         ▷ Since D₀₀, D₁₁ are self-adjoint, (3.30) applies
  // 11:     T.leftchild ← ffLDL*(G₀) ▷ Recursive calls
  // 12:     T.rightchild ← ffLDL*(G₁)
  // 13:     return T

  // Recursive calls may alias g00t and g11t, and the top-level arrays persist across signing
  // retries. LDL replaces array entries, so shallow copies keep both kinds of caller state intact.
  g00t = g00t.slice();
  g01t = g01t.slice();
  g11t = g11t.slice();
  const hn = 1 << (logn - 1);
  for (let i = 0; i < hn; i++) {
    const g01 = g01t[i];
    const g11 = g11t[i];
    const mu = fComplex.scale(g01, 1.0 / g00t[i].re);
    g11t[i] = { re: g11.re - (mu.re * g01.re + mu.im * g01.im), im: g11.im };
    g01t[i] = fComplex.conj(mu);
  }
  return { g00: g00t, g01: g01t, g11: g11t };
}

function ApproxExp(x: number, ccs: number): number {
  // Algorithm 13: ApproxExp(x, ccs), (Page 42)
  // Require: Floating-point values x ∈ [0, ln(2)] and ccs ∈ [0, 1]
  // Ensure: A floating approximation of ccs · exp(-x); berExp() applies the later 2^63 scaling.
  // 1: C = [0x00000004741183A3, ...]
  // 2: y ← C[0] ▷ y and z remain in {0, ..., 2⁶³ - 1} the whole algorithm.
  // 3: z ← ⌊2⁶³ · x⌋
  // 4: for i = 1, ..., 12 do
  // 5:     y ← C[i] - (z · y) >> 63 ▷ (z · y) fits in 126 bits, but we only need the top 63 bits
  // 6: z ← ⌊2⁶³ · ccs⌋
  // 7: y ← (z · y) >> 63
  // 8: return y
  // FACCT / round-3 Falcon's leading 1.0 coefficient is implicit in `return ccs * (1.0 + z * y)`,
  // so the decimal list below stores the remaining 12 polynomial coefficients only.
  const ev = [
    0.99999999999999489297408672428, 0.500000000000019206858326015208,
    0.166666666666984014666397229121, 0.041666666666110491190622155955,
    0.008333333327800835146903501993, 0.001388888894063186997887560103,
    0.000198412739277311890541063977, 0.000024801566833585381209939524,
    0.000002755586350219122514855659, 0.000000275607356160477811864927,
    0.000000025299506379442070029551, 0.000000002073772366009083061987,
  ];
  const y = -x;
  let z = ev[ev.length - 1];
  for (let i = ev.length - 2; i >= 0; i--) z = z * y + ev[i];
  return ccs * (1.0 + z * y);
}

// Actual api
type FalconOpts = {
  N: number;
  // Table 3.3 total padded detached bytes. In padded mode it drives `.lengths.signature` and the
  // payload width `sigLen - 1 - NONCELEN`.
  sigLen: number;
  padded: boolean;
  fgBits: number;
  FGBits: number;
  // Compressed-s payload bytes only, excluding the detached header byte and 40-byte nonce.
  paddedLen: number;
  // Maximum compressed-s payload emitted by sign(). Unpadded detached verification enforces the
  // same Round-3 ceiling before decoding.
  maxS2Len: number;
};

type FalconRandom = (bytesLength?: number) => TRet<Uint8Array>;
type FalconSigOpts = SigOpts & { random?: FalconRandom };
/** Falcon attached-signature API. */
export type FalconAttached = CryptoKeys & {
  /** Key lengths plus the 48-byte sampler-seed hook for signing. */
  lengths: CryptoKeys['lengths'] & { signRand?: number };
  /**
   * Signs a message and appends it to the returned attached signature.
   * @param msg Message bytes to sign.
   * @param secretKey Falcon secret key bytes.
   * @param opts Optional Falcon signing options.
   * @returns Attached signature containing both the message and signature.
   */
  seal(msg: Uint8Array, secretKey: Uint8Array, opts?: FalconSigOpts): Uint8Array;
  /**
   * Verifies an attached signature and returns the embedded message.
   * @param sig Attached Falcon signature bytes.
   * @param publicKey Falcon public key bytes.
   * @param opts Optional verification options.
   * @returns Fresh message bytes that do not alias either input when the signature is valid.
   */
  open(sig: Uint8Array, publicKey: Uint8Array, opts?: VerOpts): Uint8Array;
};
/** PATCH: options of `internal.sign` (tests only). */
export type FalconInternalSignOpts = {
  /** Sampler-seed source (48 bytes). Default: crypto.getRandomValues. */
  random?: (bytesLength?: number) => Uint8Array;
  /** Maximum sampling attempts before throwing. Default: 1000. */
  maxIterations?: number;
};
/** PATCH: signing / verification of an externally computed hash point (like ml-dsa `internal`). */
export type FalconInternal = {
  /** Signs a hash point (N coefficients mod q); returns the raw signed s2 polynomial. */
  sign(hashPoint: Uint16Array, secretKey: Uint8Array, opts?: FalconInternalSignOpts): Int16Array;
  /** Checks that s2 is a valid signature of the hash point for the public key. */
  verify(s2: Int16Array, hashPoint: Uint16Array, publicKey: Uint8Array): boolean;
};
/** Falcon detached-signature API with an attached-signature helper. */
export type Falcon = Signer & {
  /** Attached-signature helper for the same Falcon parameter set. */
  attached: FalconAttached;
  /** PATCH: external hash-point API. */
  internal: FalconInternal;
};

function genFalcon(opts: FalconOpts): TRet<Falcon> {
  const { N } = opts;
  const logn = Math.log2(N);
  const id = <T>(n: T): T => n;
  const { newPoly, intPoly, signedCoder } = getIntPoly(logn);
  const floatPoly = getFloatPoly(logn);
  // Kinda like FFT Sampler: single function, but a lot of private deps and internal rng stake
  class NTRU {
    private logn: number;
    private shake: ReturnType<typeof shake256.create>;
    constructor(logn: number, seed: Uint8Array) {
      this.logn = logn;
      this.shake = shake256.create().update(seed);
    }
    private gaussSingle() {
      const g = 1 << (10 - this.logn);
      let val = 0;
      for (let i = 0; i < g; i++) {
        const r128 = bytesToNumberLE(this.shake.xof(16));
        const r1 = r128 & MASK_63n;
        const r2 = (r128 >> _64n) & MASK_63n;
        const sign = Number((r128 >> _63n) & _1n);
        let f = r1 < gauss_1024_12289[0] ? 1 : 0;
        let v = 0;
        for (let k = 1; k < gauss_1024_12289.length; k++) {
          const tBit = r2 >= gauss_1024_12289[k] ? 1 : 0;
          v |= k & -(tBit & (f ^ 1));
          f |= tBit;
        }
        val += sign === 1 ? -v : v;
      }
      return val;
    }
    private polyGauss(): SPoly {
      const n = 1 << this.logn;
      let mod2 = 0; // xor sum of previous elements
      const f = new Int8Array(n);
      for (let u = 0; u < n; u++) {
        let s;
        while (true) {
          s = this.gaussSingle();
          if (s < -127 || s > 127) continue;
          if (u === n - 1) if ((mod2 ^ (s & 1)) === 0) continue;
          break;
        }
        if (u < n - 1) mod2 ^= s & 1;
        f[u] = s;
      }
      return f;
    }
    private galoisNorm(logn: number, a: BPoly): BPoly {
      const n = 1 << logn;
      const d = new Array(n >> 1);
      for (let k = 0; k < n; k += 2) {
        let s: bigint = _0n;
        for (let i = 0; i <= k; i += 2) s += a[i] * a[k - i];
        for (let i = k + 2; i < n; i += 2) s -= a[i] * a[k + n - i];
        d[k >>> 1] = s;
      }
      for (let k = 0; k < n; k += 2) {
        let s: bigint = _0n;
        for (let i = 1; i < k; i += 2) s += a[i] * a[k - i];
        for (let i = k + 1; i < n; i += 2) s -= a[i] * a[k + n - i];
        d[k >>> 1] -= s;
      }
      return d;
    }
    private mulConjD(logn: number, d: BPoly, a: BPoly, b: BPoly): BPoly {
      const n = 1 << logn;
      for (let k = 0; k < n; k++) {
        let s: bigint = _0n;
        for (let i = 0; i <= k; i += 2) s += b[i >>> 1] * a[k - i];
        for (let i = k + 2 - (k & 1); i < n; i += 2) s -= b[i >>> 1] * a[k + n - i];
        if ((k & 1) === 0) d[k] = s;
        else d[k] = -s;
      }
      return d;
    }
    private subMul(logn: number, a: BPoly, b: BPoly, c: BPoly, e: bigint): BPoly {
      const n = 1 << logn;
      for (let k = 0; k < n; k++) {
        let s: bigint = _0n;
        for (let i = 0; i <= k; i++) s += b[i] * c[k - i];
        for (let i = k + 1; i < n; i++) s -= b[i] * c[k + n - i];
        a[k] -= s << e;
      }
      return a;
    }
    private reduce(logn: number, f: BPoly, g: BPoly, F: BPoly, G: BPoly, logn_top: number) {
      // Algorithm 7: Reduce(f, g, F, G)
      // (Page 35)
      // Require: Polynomials f, g, F, G ∈ Z[x]/(φ)
      // Ensure: (F, G) is reduced with respect to (f, g)
      // 1: do
      // 2:     k ← ⌊(Ff*+Gg*)/(ff*+gg*)⌋ ▷ (Ff*+Gg*)/(ff*+gg*) ∈ Q[x]/(φ) and k ∈ Z[x]/(φ)
      // 3:     F ← F - kf
      // 4:     G ← G - kg
      // 5: while k ≠ 0
      //    ▷ Multiple iterations may be needed, e.g. if k is computed in small precision.
      const n = 1 << logn;
      const depth = logn_top - logn;
      const floatPoly = getFloatPoly(logn);
      const slen = MAX_BL_SMALL[depth];
      const llen = MAX_BL_LARGE[depth];
      let maxFGBits = BigInt(31 * llen);
      let FGlen = BigInt(llen);
      const scalefg = BigInt(31 * (slen - 10));
      const fgMaxBits = BITLENGTH[depth].avg + 6 * BITLENGTH[depth].std;
      const fgMinBits = BITLENGTH[depth].avg - 6 * BITLENGTH[depth].std;
      let scaleK = BigInt(Math.round(31 * llen - fgMinBits));
      let fx = new Float64Array(n);
      let gx = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        fx[i] = Number(f[i] >> scalefg);
        gx[i] = Number(g[i] >> scalefg);
      }
      const rt3 = floatPoly.conj(floatPoly.FFT(floatPoly.to(fx)));
      const rt4 = floatPoly.conj(floatPoly.FFT(floatPoly.to(gx)));
      const rt5 = floatPoly.invNorm(rt3, rt4);

      const Fx = new Float64Array(n);
      const Gx = new Float64Array(n);
      const k = new Array(n);
      while (true) {
        let scaleFG = _31n * (FGlen - _10n);
        for (let i = 0; i < n; i++) {
          Fx[i] = Number(F[i] >> scaleFG);
          Gx[i] = Number(G[i] >> scaleFG);
        }
        const rt2 = floatPoly.mul(floatPoly.FFT(floatPoly.to(Gx)), rt4);
        const rt1 = floatPoly.mul(floatPoly.FFT(floatPoly.to(Fx)), rt3);
        // convert to float64array
        const rt2f = floatPoly.from(
          floatPoly.iFFT(floatPoly.scaleNorm(floatPoly.add(rt2, rt1), rt5))
        );
        const pdc = 2 ** Number(scaleFG - scalefg - scaleK);
        for (let i = 0; i < n; i++) {
          const BOUND = 2147483647.0;
          const val = rt2f[i] * pdc;
          if (val <= -BOUND || val >= BOUND) return false;
          k[i] = BigInt(Math.round(val));
        }
        F = this.subMul(logn, F, f, k, scaleK); // 3:     F ← F - kf
        G = this.subMul(logn, G, g, k, scaleK); // 4:     G ← G - kg
        const maxfgNew = scaleK + BigInt(Math.round(fgMaxBits)) + _10n;
        if (maxfgNew < maxFGBits) maxFGBits = maxfgNew;
        if (FGlen > _1n && FGlen * _31n >= maxFGBits + _31n) FGlen--;
        if (scaleK <= _0n) break;
        scaleK -= _25n;
        if (scaleK < _0n) scaleK = _0n;
      }
      return true;
    }
    // This is recursive thing that goes from logn to 0
    private solveBranch(logn: number, f: BPoly, g: BPoly, F: BPoly, G: BPoly, logn_top?: number) {
      // Algorithm 6: NTRUSolve_{n,q}(f, g), (Page 35)
      // Require: f, g ∈ Z[x]/(xⁿ + 1) with n a power of two
      // Ensure: Polynomials F, G such that (3.15) is verified
      // 1: if n = 1 then
      // 2:     Compute u, v ∈ Z such that uf - vg = gcd(f, g) ▷ Using the extended GCD
      // 3:     if gcd(f, g) ≠ 1 then
      // 4:         abort and return ⊥
      // 5:     (F, G) ← (vq, uq)
      // 6:     return (F, G)
      // 7: else
      // 8:     f' ← N(f) ▷ f', g', F', G' ∈ Z[x]/(x^{n/2} + 1)
      // 9:     g' ← N(g) ▷ N as defined in either (3.25) or (3.26)
      // 10:     (F', G') ← NTRUSolve_{n/2,q}(f', g') ▷ Recursive call
      // 11:     F ← F'(x²)g(-x) ▷ F, G ∈ Z[x]/(xⁿ + 1)
      // 12:     G ← G'(x²)f(-x)
      // 13:     Reduce(f, g, F, G) ▷ (F, G) is reduced with respect to (f, g)
      // 14:     return (F, G)
      if (logn === 0) {
        // // 1: if n = 1 then
        const xf = f[0];
        const xg = g[0];
        // We can rely on 'invert' to throw if they are not coprime.
        if (xf <= _0n || xg <= _0n) return false;
        try {
          const u1 = invert(xf, xg); //  if gcd(f, g) ≠ 1 then
          const v1 = (_1n - u1 * xf) / xg;
          F[0] = -v1 * QBig; // 5:     (F, G) ← (vq, uq)
          G[0] = u1 * QBig;
          return true;
        } catch (e) {
          return false;
        }
      }
      if (logn_top === undefined) logn_top = logn;
      const n = 1 << logn;
      const hn = n >>> 1;
      if (!f || f.length < n || !g || g.length < n) return false;
      const fp = this.galoisNorm(logn, f); // 8:     f' ← N(f)
      const gp = this.galoisNorm(logn, g); // 9:     g' ← N(g)
      const Fp = new Array(hn); // 10:    (F', G') ← NTRUSolve_{n/2,q}(f', g')
      const Gp = new Array(hn);
      // 10:     (F', G') ← NTRUSolve_{n/2,q}(f', g')
      //         ▷ Recursive call
      if (!this.solveBranch(logn - 1, fp, gp, Fp, Gp, logn_top)) return false;
      F = this.mulConjD(logn, F, g, Fp); // 11:    F ← F'(x²)g(-x)
      G = this.mulConjD(logn, G, f, Gp); // 12:    G ← G'(x²)f(-x)
      // 13:     Reduce(f, g, F, G)
      //         ▷ (F, G) is reduced with respect to (f, g)
      return this.reduce(logn, f, g, F, G, logn_top);
    }
    private solve(f: SPoly, g: SPoly) {
      // Algorithm 5: NTRUGen(φ, q)
      // (Page 34)
      // Require: A monic polynomial φ ∈ Z[x] of degree n, a modulus q
      // Ensure: Polynomials f, g, F, G
      // 1: σ{f,g} ← 1.17√q/2n ▷ σ{f,g} is chosen so that E[||(f, g)||] = 1.17√q
      // 2: for i from 0 to n-1 do
      // 3:     fᵢ ← DZ,σ{f,g},0 ▷ See also (3.29)
      // 4:     gᵢ ← DZ,σ{f,g},0
      // 5: f ← Σᵢ fᵢxⁱ ▷ f ∈ Z[x]/(φ)
      // 6: g ← Σᵢ gᵢxⁱ ▷ g ∈ Z[x]/(φ)
      // 7: if NTT(f) contains 0 as a coefficient then ▷ Check that f is invertible mod q
      // 8:     restart
      // 9: γ ← max{||(g, -f)||, ||( (qf*)/(ff*+gg*), (qg*)/(ff*+gg*) )||}
      //    ▷ Using (3.9) with (3.8) or (3.10)
      // 10: if γ > 1.17√q then ▷ Check that γ = ||B||_GS is short
      // 11:     restart
      // 12: F, G ← NTRUSolve_{n,q}(f, g) ▷ Computing F, G such that fG - gF = q mod φ
      // 13: if (F, G) = ⊥ then
      // 14:     restart
      // 15: return f, g, F, G
      const n = 1 << logn;
      const bf = Array.from(f).map(BigInt);
      const bg = Array.from(g).map(BigInt);
      const bF = new Array(n);
      const bG = new Array(n);
      // 12: F, G ← NTRUSolve_{n,q}(f, g)
      //     ▷ Computing F, G such that fG - gF = q mod φ
      if (!this.solveBranch(logn, bf, bg, bF, bG)) return false;
      const F = new Int8Array(n);
      const G = new Int8Array(n);
      for (let i = 0; i < n; i++) {
        const x = bF[i];
        const y = bG[i];
        if (x < -127 || x > +127 || y < -127 || y > +127) return false;
        F[i] = Number(x);
        G[i] = Number(y);
      }
      return [F, G];
    }
    generate(): [SPoly, SPoly, SPoly, SPoly, IPoly] {
      // Algorithm 4: Keygen(φ, q)
      // (Page 33)
      // Require: A monic polynomial φ ∈ Z[x], a modulus q
      // Ensure: A secret key sk, a public key pk
      // 1: f, g, F, G ← NTRUGen(φ, q) ▷ Solving the NTRU equation
      // 2: B ← [ g -f ; G -F ]
      // 3: B̂ ← FFT(B) ▷ Compute the FFT for each of the 4 components {g, -f, G, -F}
      // 4: G ← B̂ × B̂*
      // 5: T ← ffLDL*(G) ▷ Computing the LDL* tree
      // 6: for each leaf leaf of T do
      // 7:     leaf.value ← σ/√leaf.value ▷ Normalization step
      // 8: sk ← (B̂, T)
      // 9: h ← gf⁻¹ mod q
      // 10: pk ← h
      // 11: return sk, pk
      let max = 1_000_000;
      let curr = 0;
      while (true) {
        if (curr++ === max) throw new Error("can't generate key");
        const f = this.polyGauss();
        const g = this.polyGauss();
        let lim = 1 << (opts.fgBits - 1);
        for (let u = 0; u < N; u++) {
          if (f[u] >= lim || f[u] <= -lim || g[u] >= lim || g[u] <= -lim) {
            lim = -1;
            break;
          }
        }
        if (lim < 0) continue;
        const normf = intPoly.smallSqnorm(f);
        const normg = intPoly.smallSqnorm(g);
        const norm = (normf + normg) | -((normf | normg) >>> 31);
        // Cheap integer prefilter for the same 1.17^2*q Gram-Schmidt bound;
        // ceil(BNORM_MAX) = 16823.
        if (norm >= 16823) continue;
        let rt1 = floatPoly.FFT(floatPoly.convSmall(f));
        let rt2 = floatPoly.FFT(floatPoly.convSmall(g));
        const rt3 = floatPoly.invNorm(rt1, rt2);
        rt1 = floatPoly.iFFT(floatPoly.scaleNorm(floatPoly.mulConst(floatPoly.conj(rt1), Q), rt3));
        rt2 = floatPoly.iFFT(floatPoly.scaleNorm(floatPoly.mulConst(floatPoly.conj(rt2), Q), rt3));
        // Separate reals and then imaginary to enforce numerical stability
        let bnorm = 0;
        for (let u = 0; u < rt1.length; u++) {
          bnorm += rt1[u].re * rt1[u].re;
          bnorm += rt2[u].re * rt2[u].re;
        }
        for (let u = 0; u < rt1.length; u++) {
          bnorm += rt1[u].im * rt1[u].im;
          bnorm += rt2[u].im * rt2[u].im;
        }
        if (!(bnorm < BNORM_MAX)) continue;
        let pub;
        try {
          pub = computePublic(f, g);
        } catch (_) {
          continue;
        }
        const solved = this.solve(f, g);
        if (solved === false) continue;
        return [f, g, solved[0], solved[1], pub]; // f g F G h
      }
    }
  }
  // same as ml-dsa id, but MSB bits :(
  const modqCoder = () => {
    const coder = bitsCoderMSB(newPoly, N, 14, {
      encode: id,
      decode: id,
    }) as BytesCoderLen<IPoly>;
    return {
      bytesLen: coder.bytesLen,
      encode(poly: TArg<Uint16Array>) {
        // Keep these raw checks in sync with Q:
        // Falcon public-key coefficients must stay in [0, q - 1].
        for (let i = 0; i < poly.length; i++)
          if (poly[i] >= 12289) throw new Error('public key coeff out of range');
        return coder.encode(poly);
      },
      decode(bytes: TArg<Uint8Array>) {
        // Round-3 Falcon requires exact body length here;
        // otherwise truncated keys decode as zero-padded
        // and overlong keys silently ignore the tail in this generic bit decoder.
        if (bytes.length !== coder.bytesLen) throw new Error('wrong public key length');
        const poly = coder.decode(bytes);
        // Keep these raw checks in sync with Q:
        // Falcon public-key coefficients must stay in [0, q - 1].
        for (let i = 0; i < poly.length; i++)
          if (poly[i] >= 12289) throw new Error('public key coeff out of range');
        const normalized = coder.encode(poly);
        if (normalized.length !== bytes.length) throw new Error('wrong public key length');
        for (let i = 0; i < bytes.length; i++)
          if (bytes[i] !== normalized[i]) throw new Error('wrong public key encoding');
        return poly;
      },
    };
  };
  const trimI8Coder = (bits: number) => {
    const shift = 32 - bits;
    const coder = bitsCoderMSB((len) => new Int8Array(len), N, bits, {
      encode: (v) => v & ((1 << bits) - 1),
      decode: (w) => ((w & getMask(bits)) << shift) >> shift,
    }) as BytesCoderLen<SPoly>;
    return {
      bytesLen: coder.bytesLen,
      encode(poly: TArg<Int8Array>) {
        // Secret-key trim encodings keep a symmetric signed range and reserve the most-negative
        // value as a non-canonical sentinel,
        // so encode() and decode() intentionally use different bounds.
        const max = (1 << (bits - 1)) - 1;
        const min = -max;
        for (let i = 0; i < poly.length; i++)
          if (poly[i] < min || poly[i] > max) throw new Error('private key coeff out of range');
        return coder.encode(poly);
      },
      decode(bytes: TArg<Uint8Array>) {
        const poly = coder.decode(bytes);
        const min = -(1 << (bits - 1));
        for (let i = 0; i < poly.length; i++)
          if (poly[i] === min) throw new Error('forbidden private key coeff');
        return poly;
      },
    };
  };
  const fgCoder = trimI8Coder(opts.fgBits);
  const FGCoder = trimI8Coder(opts.FGBits);
  // Current utils.splitCoder requires a label first;
  // without it Falcon key/sig encodings drift and KATs fail.
  // 0x50 + logn || f || g || F
  const secretKeyCoder = headerCoder(
    0x50 + logn,
    splitCoder('falcon.secretKey', fgCoder, fgCoder, FGCoder)
  ) as BytesCoderLen<[Int8Array, Int8Array, Int8Array]>;
  const publicKeyCoder = headerCoder(0x00 + logn, modqCoder()) as BytesCoderLen<Uint16Array>;
  const decodePaddedSig = (s2: TArg<Uint8Array>) => {
    // The fixed padded form accepts only a canonical compressed payload
    // followed by an all-zero tail.
    const normalized = compCoder(N).encode(compCoder(N).decode(s2));
    for (let i = normalized.length; i < s2.length; i++)
      if (s2[i] !== 0) throw new Error('non-zero padding');
    return normalized;
  };
  const decodeUnpaddedSig = (s2: TArg<Uint8Array>) => {
    // Unpadded attached and detached signatures require the compressed payload to use its exact
    // canonical bitlength. Appending a zero tail and adjusting the outer container length must
    // still be rejected.
    const normalized = compCoder(N).encode(compCoder(N).decode(s2));
    if (normalized.length !== s2.length) throw new Error('wrong signature length');
    return s2;
  };
  const decodeSig = opts.padded ? decodePaddedSig : decodeUnpaddedSig;
  // Unpadded: [ 2B sig_len ] [ 40B nonce ] [ message ] [ 1B header ] [ compressed_sig ]
  // Padded [ 1B header ] [ 40B nonce ] [ compressed_sig ] [ padding ] | [ message ]
  const SignatureCoderBasic = (logn: number) => {
    const TYPE_BYTE = 0x20 + logn;
    return {
      encode({ msg, nonce, s2 }: TArg<SignatureRaw>): TRet<Uint8Array> {
        let compressed: Uint8Array = s2;
        const payloadLen = 1 + compressed.length;
        const totalLen = 2 + NONCELEN + msg.length + payloadLen;
        const out = new Uint8Array(totalLen);
        let i = 0;
        out[i++] = (payloadLen >> 8) & 0xff;
        out[i++] = payloadLen & 0xff;
        out.set(nonce, i);
        i += NONCELEN;
        out.set(msg, i);
        i += msg.length;
        out[i++] = TYPE_BYTE;
        out.set(compressed, i);
        return out as TRet<Uint8Array>;
      },
      decode(data: TArg<Uint8Array>): TRet<SignatureRaw> {
        if (!data || data.length < NONCELEN + 3) throw new Error('signature coder: wrong length');
        const len = (data[0] << 8) | data[1];
        const s2Len = len - 1;
        const msgLen = data.length - NONCELEN - 3 - s2Len;
        if (msgLen < 0) throw new Error('signature coder: wrong msg length');
        const typeByte = data[2 + NONCELEN + msgLen];
        if (typeByte !== TYPE_BYTE) throw new Error('signature coder: wrong type byte');
        const nonce = data.subarray(2, 2 + NONCELEN);
        const msg = data.subarray(2 + NONCELEN, 2 + NONCELEN + msgLen);
        const s2 = decodeUnpaddedSig(data.subarray(2 + NONCELEN + msgLen + 1));
        if (s2.length !== s2Len) throw new Error('signature coder: wrong s2 length');
        return { msg, nonce, s2 } as TRet<SignatureRaw>;
      },
    };
  };
  const SignatureCoderPadded = (logn: number) => {
    const sigLen = opts.paddedLen;
    return {
      encode({ msg, nonce, s2 }: TArg<SignatureRaw>): TRet<Uint8Array> {
        return headerCoder(
          0x30 + logn,
          splitCoder('falcon.signature', NONCELEN, sigLen, msg.length)
        ).encode([nonce, pad(sigLen).encode(s2), msg]);
      },
      decode(data: TArg<Uint8Array>): TRet<SignatureRaw> {
        // Keep API misuse on the coder's TypeError path before reading the container length.
        abytes(data, undefined, 'signature');
        // The compressed-signature field is fixed-width here; only the message is variable. A
        // container shorter than the fixed part would make the s2 field borrow bytes from nowhere
        // and let a truncated encoding open to the same message.
        const msgLen = data.length - NONCELEN - sigLen - 1;
        if (msgLen < 0) throw new Error('signature coder: wrong length');
        const [nonce, s2, msg] = headerCoder(
          0x30 + logn,
          splitCoder('falcon.signature', NONCELEN, sigLen, msgLen)
        ).decode(data);
        return { nonce, s2: decodeSig(s2), msg } as TRet<SignatureRaw>;
      },
    };
  };
  // [ 1B header ] [ 40B nonce ] [ compressed_sig ]
  const SignatureCoderDetached = (logn: number) => {
    const paddedSigLen = opts.sigLen - 1 - NONCELEN;
    const getSigLen = (s2: TArg<Uint8Array>) => (opts.padded ? paddedSigLen : s2.length);
    return {
      encode({ nonce, s2 }: TArg<{ nonce: Uint8Array; s2: Uint8Array }>): TRet<Uint8Array> {
        return headerCoder(
          0x30 + logn,
          splitCoder('falcon.detachedSignature', NONCELEN, getSigLen(s2))
        ).encode([nonce, opts.padded ? pad(paddedSigLen).encode(s2) : s2]);
      },
      decode(data: TArg<Uint8Array>): TRet<{
        nonce: Uint8Array;
        s2: Uint8Array;
      }> {
        // Unpadded Round-3 signatures have parameter-set maxima (header + nonce + s2):
        // 752 bytes for Falcon-512 and 1462 for Falcon-1024. Reject before creating views or
        // entering the bit decoder so attacker-sized inputs cannot cause proportional work.
        if (!opts.padded && data.length > 1 + NONCELEN + opts.maxS2Len)
          throw new Error('detached signature too long');
        // Padded detached signatures are fixed-length (`lengths.signature`), so the payload width
        // must come from the parameter set, not from the input: deriving it would accept appended
        // zero bytes and truncated padding as extra valid encodings of the same signature.
        // Unpadded signatures are variable-length; decodeUnpaddedSig() enforces the exact canonical
        // bitlength of whatever remains.
        const payloadLen = opts.padded ? paddedSigLen : data.length - NONCELEN - 1;
        const [nonce, raw] = headerCoder(
          0x30 + logn,
          splitCoder('falcon.detachedSignature', NONCELEN, payloadLen)
        ).decode(data);
        const s2 = decodeSig(raw);
        return { nonce, s2 } as TRet<{ nonce: Uint8Array; s2: Uint8Array }>;
      },
    };
  };
  const SignatureCoder = (opts.padded ? SignatureCoderPadded : SignatureCoderBasic)(logn);
  // Round-3 Falcon rejects non-invertible f before division;
  // otherwise malformed secret keys leak a raw arithmetic error.
  // Returns NTT(f) after the nonzero-lane check;
  // callers still apply f^{-1} via coefficient-wise division.
  const invertF = (f: TArg<SPoly>) => {
    const tt = intPoly.ntt(signedCoder.decode(f));
    for (let u = 0; u < N; u++)
      if (tt[u] === 0) throw new Error('invalid secretKey: non-invertible f');
    return tt;
  };
  function computePublic(f: TArg<SPoly>, g: TArg<SPoly>) {
    const tt = invertF(f);
    const h = intPoly.ntt(signedCoder.decode(g));
    // intPoly.div() returns to coefficient form via intt(), so public keys are encoded from the
    // canonical polynomial h = g/f and verifyRaw() re-enters the NTT domain later.
    const res = intPoly.div(h, tt); // h = g/f
    cleanBytes(tt);
    return res;
  }
  // Reconstruct the omitted secret-key limb G as g*F/f mod q, then mirror round-3 Falcon's centered
  // reduction and small-coefficient check before using the completed basis for signing.
  function completePrivate(f: TArg<SPoly>, g: TArg<SPoly>, F: TArg<SPoly>) {
    let t1 = intPoly.toMontgomery(intPoly.ntt(signedCoder.decode(g)));
    const t2 = intPoly.ntt(signedCoder.decode(F));
    const tt = invertF(f);
    t1 = intPoly.div(intPoly.mul(t1, t2), tt);
    const G = new Int8Array(N);
    for (let u = 0; u < N; u++) {
      let w = t1[u];
      // This mirrors round-3 Falcon's secret-key G reconstruction, not a generic centered reduction
      // helper:
      // the threshold is floor(q/2), and w = Qhalf maps to -Qhalf - 1 here on purpose.
      w -= Q & ~-((w - Qhalf) >>> 31);
      const gi = w | 0;
      if (gi < -127 || gi > 127) {
        cleanBytes(t1, t2, tt, G);
        throw new Error('Coefficient out of bounds');
      }
      G[u] = gi;
    }
    cleanBytes(t1, t2, tt);
    return G;
  }
  function HashToPoint(nonce: TArg<Uint8Array>, msg: TArg<Uint8Array>): TRet<IPoly> {
    // Algorithm 3: HashToPoint(str, q, n)
    // (Page 31)
    // Require: A string str, a modulus q ≤ 2¹⁶, a degree n ∈ N*
    // Ensure: An polynomial c = Σᵢ cᵢxⁱ in Zq[x]
    // 1: k ← ⌈2¹⁶/q⌉
    // 2: ctx ← SHAKE-256-Init()
    // 3: SHAKE-256-Inject(ctx, str)
    // 4: i ← 0
    // 5: while i < n do
    // 6:     t ← SHAKE-256-Extract(ctx, 16)
    // 7:     if t < kq then
    // 8:         cᵢ ← t mod q
    // 9:         i ← i + 1
    // 10: return c
    const h = shake256.create().update(nonce).update(msg); // 3: SHAKE-256-Inject(ctx, str)
    const c = new Uint16Array(N);
    // Round-3 Falcon keeps 16-bit draws only in 0..61444, i.e. below 61445 = 5*q, the largest
    // 16-bit multiple of q below 2^16; a literal ceil(2^16/q)*q would accept every sample.
    const kQ = 5 * Q;
    for (let i = 0; i < N;) {
      const tmp = h.xof(2); // 6:     t ← SHAKE-256-Extract(ctx, 16)
      let w = (tmp[0] << 8) | tmp[1];
      if (w < kQ) c[i++] = w % Q; // 8:         cᵢ ← t mod q
    }
    return c as TRet<IPoly>;
  }
  // This is basically one sampling routine,
  // but it carries a lot of internal state and gets complex quickly.
  class FFSampler {
    private logn: number;
    // Shake
    private shake: ReturnType<typeof shake256.create>;
    private shakeBuf: Uint8Array;
    private ctrView: DataView;
    // ChaCha
    private ctr: bigint = _0n;
    private buf: Uint8Array;
    private buf32: Uint32Array;
    private pos: number;
    private key: Uint8Array;
    private nonce32: Uint32Array;
    private curBlock: Uint8Array;
    private curBlock32: Uint32Array;
    private view: DataView;
    // Sampler
    private b01: CPoly;
    private b11: CPoly;
    private g00: CPoly;
    private g01: CPoly;
    private g11: CPoly;

    constructor(logn: number, seed: Uint8Array, b00: CPoly, b01: CPoly, b10: CPoly, b11: CPoly) {
      this.logn = logn;
      // Shake
      this.shake = shake256.create().update(seed);
      this.shakeBuf = new Uint8Array(56);
      this.key = this.shakeBuf.subarray(0, 32);
      this.nonce32 = u32(this.shakeBuf.subarray(32, 48)); // 4 u32s
      this.ctrView = createView(this.shakeBuf.subarray(48, 56));
      // Signle chacha20 instance buffer
      this.curBlock = new Uint8Array(64);
      this.curBlock32 = u32(this.curBlock);
      // whole rng buffer
      this.buf = new Uint8Array(8 * this.curBlock.length);
      this.buf32 = u32(this.buf);
      this.pos = this.buf.length; // not filled yet!
      this.view = createView(this.buf);
      // Sampler
      this.b01 = b01;
      this.b11 = b11;
      const { g00, g01, g11 } = this.gramFFT(b00, b10);
      this.g00 = g00;
      this.g01 = g01;
      this.g11 = g11;
    }
    destroy() {
      this.shake.destroy();
      cleanBytes(this.shakeBuf, this.curBlock, this.buf);
      cleanCPoly(this.b01, this.b11, this.g00, this.g01, this.g11);
    }
    private refill(minBytes: number): void {
      if (this.buf.length - this.pos >= minBytes) return;
      const out32 = swap32IfBE(this.buf32);
      for (let i = 0; i < 8; i++, this.ctr++) {
        const n = swap32IfBE(this.nonce32.slice()); // [n0, n1, n2, n3]
        n[2] ^= Number(this.ctr & MASK_32n);
        n[3] ^= Number(this.ctr >> _32n);
        // chacha20() takes raw nonce bytes; on BE the word-normalized temp must be swapped back.
        swap32IfBE(n.subarray(1));
        chacha20(this.key, u8(n.subarray(1)), EMPTY_CHACHA20_BLOCK, this.curBlock, n[0]);
        // Interleave like Falcon's AVX2 layout (by u32 chunks from 8 parallel chacha20)
        const block32 = swap32IfBE(this.curBlock32);
        for (let j = 0; j < 16; j++) out32[i + j * 8] = block32[j];
        swap32IfBE(block32);
      }
      swap32IfBE(out32);
      this.pos = 0;
    }
    // Sampler
    private gaussian0(): number {
      // Algorithm 12: BaseSampler()
      // (Page 41)
      // Require: -
      // Ensure: An integer z₀ ∈ {0, ..., 18} such that z ~ χ ▷ χ is uniquely defined by (3.33)
      // 1: u ← UniformBits(72) ▷ See (3.32)
      // 2: z₀ ← 0
      // 3: for i = 0, ..., 17 do
      // 4:     z₀ ← z₀ + [u < RCDT[i]] ▷ Note that one should use RCDT, not pdt or cdt
      // 5: return z₀
      this.refill(9);
      const t0 = this.view.getUint32(this.pos, true);
      const t1 = this.view.getUint32(this.pos + 4, true);
      const t2 = this.buf[this.pos + 8];
      this.pos += 9;
      const v0 = t0 & 0xffffff;
      const v1 = ((t0 >>> 24) & 0xff) | ((t1 & 0xffff) << 8);
      const v2 = ((t1 >>> 16) & 0xffff) | (t2 << 16);
      let z = 0;
      for (let i = 0; i < GAUSS0.length; i += 3) {
        let cc = (v0 - GAUSS0[i + 2]) >>> 31;
        cc = (((v1 - GAUSS0[i + 1]) | 0) - cc) >>> 31;
        cc = (((v2 - GAUSS0[i + 0]) | 0) - cc) >>> 31;
        z += cc;
      }
      return z;
    }
    private berExp(x: number, ccs: any) {
      // Algorithm 14: BerExp(x, ccs) (Page 43)
      // Require: Floating point values x, ccs ≥ 0
      // Ensure: A single bit, equal to 1 with probability ≈ ccs · exp(-x)
      // 1: s ← ⌊x/ln(2)⌋
      //    ▷ Compute the unique decomposition x = s · ln(2) + r,
      //      with (r, s) ∈ [0, ln 2) × Z⁺
      // 2: r ← x - s · ln(2)
      // 3: s ← min(s, 63)
      // 4: z ← (2 · ApproxExp(r, ccs) - 1) >> s ▷ z ≈ 2⁶⁴⁻ˢ · ccs · exp(-r) = 2⁶⁴ · ccs · exp(-x)
      // 5: i ← 64
      // 6: do
      // 7:     i ← i - 8
      // 8:     w ← UniformBits(8) - ((z >> i) & 0xFF)
      //        ▷ This loop does not need to be done in constant-time
      // 9: while ((w = 0) and (i > 0))
      // 10: return [w < 0] ▷ Return 1 with probability 2⁻⁶⁴ · z ≈ ccs · exp(-x)
      let s = Math.trunc(x * 1.4426950408889633870046509401);
      const r = x - s * 0.69314718055994530941723212146;
      let e = ApproxExp(r, ccs);
      e *= 2147483648.0;
      let z1 = e | 0;
      e = (e - z1) * 4294967296.0;
      let z0 = e | 0;
      z1 = (z1 << 1) | (z0 >>> 31);
      z0 <<= 1;
      s = (s | ((63 - s) >>> 26)) & 63;
      const sm = -(s >>> 5) | 0;
      z0 ^= sm & (z0 ^ z1);
      z1 &= ~sm;
      s &= 31;
      z0 = (z0 >>> s) | ((z1 << (31 - s)) << 1);
      z1 >>>= s;
      for (let j = 0; j < 2; j++) {
        for (let i = 24; i >= 0; i -= 8) {
          this.refill(1);
          const w = this.buf[this.pos++];
          const bz = (z1 >>> i) & 0xff;
          if (w !== bz) return w < bz;
        }
        z1 = z0;
      }
      return false;
    }
    private samplerZ(mu: number, isigma: number) {
      // Algorithm 15: SamplerZ(μ, σ'), (Page 43)
      // Require: Floating-point values μ, σ' ∈ R such that σ' ∈ [σ_{min}, σ_{max}]
      // Ensure: An integer z ∈ Z sampled from a distribution very close to DZ,μ,σ'
      // 1: r ← μ - ⌊μ⌋ ▷ r must be in [0, 1)
      // 2: ccs ← σ_{min}/σ' ▷ ccs helps to make the algorithm running time independent of σ'
      // 3: while (1) do
      // 4:     z₀ ← BaseSampler()
      // 5:     b ← UniformBits(8) & 0x1
      // 6:     z ← b + (2 · b - 1)z₀
      // 7:     x ← ((z-r)²)/(2σ'²)
      // 8:     if (BerExp(x, ccs) = 1) then
      // 9:         return z + ⌊μ⌋
      const s = Math.floor(mu);
      const r = mu - s;
      const dss = isigma * isigma * 0.5;
      const ccs = isigma * SIGMA_MIN[this.logn];
      for (;;) {
        const z0 = this.gaussian0();
        this.refill(1);
        const b = this.buf[this.pos++] & 1;
        const z = (((z0 << 1) + 1) & -b) - z0;
        let x = z - r;
        x = x * x * dss - z0 * z0 * 0.1508650488753727203494747755;
        if (this.berExp(x, ccs)) return s + z;
      }
    }
    private splitFFT(logn: number, f: CPoly) {
      // Algorithm 1: splitfft(FFT(f))
      // (Page 29)
      // Require: FFT(f) = (f(ζ))ζ for some f ∈ Q[x]/(φ)
      // Ensure: FFT(f₀) = (f₀(ζ'))ζ' and FFT(f₁) = (f₁(ζ'))ζ' for some f₀, f₁ ∈ Q[x]/(φ')
      // Format: All polynomials are in FFT representation.
      // 1: for ζ such that φ(ζ) = 0 and Im(ζ) > 0 do ▷ See eq. (3.19) with 0 ≤ k < n/2
      // 2:     ζ' ← ζ²
      // 3:     f₀(ζ') ← ½ [f(ζ) + f(−ζ)]
      // 4:     f₁(ζ') ← (1/(2ζ)) [f(ζ) − f(−ζ)]
      // 5: return (FFT(f₀), FFT(f₁))
      const hn = 1 << (logn - 1);
      const qn = hn >> 1;
      if (logn === 1) return { f0: [{ re: f[0].re, im: 0.0 }], f1: [{ re: f[0].im, im: 0.0 }] };
      const f0t = new Array(qn);
      const f1t = new Array(qn);
      const ft = f;
      for (let i = 0; i < qn; i++) {
        const a = ft[(i << 1) + 0];
        const b = ft[(i << 1) + 1];
        f0t[i] = fComplex.scale(fComplex.add(a, b), 0.5);
        f1t[i] = fComplex.scale(
          fComplex.mul(fComplex.sub(a, b), fComplex.conj(COMPLEX_ROOTS_O[i + hn])),
          0.5
        );
      }
      return { f0: f0t, f1: f1t };
    }
    private splitSelfAdjFFT(logn: number, f: CPoly) {
      const hn = 1 << (logn - 1);
      const qn = hn >> 1;
      if (logn === 1) return { f0: [{ re: f[0].re, im: 0.0 }], f1: [{ re: 0.0, im: 0.0 }] };
      const f0t = new Array(qn);
      const f1t = new Array(qn);
      const ft = f;
      for (let i = 0; i < qn; i++) {
        const a = ft[(i << 1) + 0];
        const b = ft[(i << 1) + 1];
        f0t[i] = fComplex.scale(fComplex.add(a, b), 0.5);
        f1t[i] = fComplex.scale(
          fComplex.scale(fComplex.conj(COMPLEX_ROOTS_O[i + hn]), fComplex.sub(a, b).re),
          0.5
        );
      }
      return { f0: f0t, f1: f1t };
    }
    private mergeFFT(logn: number, f0: CPoly, f1: CPoly): CPoly {
      // Algorithm 2: mergefft(f₀, f₁)
      // (Page 29)
      // Require: FFT(f₀) = (f₀(ζ'))ζ' and FFT(f₁) = (f₁(ζ'))ζ' for some f₀, f₁ ∈ Q[x]/(φ')
      // Ensure: FFT(f) = (f(ζ))ζ for some f ∈ Q[x]/(φ)
      // Format: All polynomials are in FFT representation.
      // 1: for ζ such that φ(ζ) = 0 do ▷ See eq. (3.19)
      // 2:     ζ' ← ζ²
      // 3:     f(ζ) ← f₀(ζ') + ζf₁(ζ')
      // 4: return FFT(f)
      const hn = 1 << (logn - 1);
      const qn = hn >> 1;
      if (logn === 1) return [{ re: f0[0].re, im: f1[0].re }];
      const ft = new Array(2 * qn);
      for (let i = 0; i < qn; i++) {
        const a = f0[i];
        const c = fComplex.mul(f1[i], COMPLEX_ROOTS_O[i + hn]);
        ft[(i << 1) + 0] = fComplex.add(a, c);
        ft[(i << 1) + 1] = fComplex.sub(a, c);
      }
      return ft;
    }
    private gramFFT(b00: CPoly, b10: CPoly) {
      const { b01, b11 } = this;
      const hn = (1 << this.logn) >> 1;
      const g00: CPoly = new Array(hn);
      const g01: CPoly = new Array(hn);
      const g11: CPoly = new Array(hn);
      for (let i = 0; i < hn; i++) {
        const b00t = b00[i];
        const b01t = b01[i];
        const b10t = b10[i];
        const b11t = b11[i];
        const u = fComplex.mul(b00t, fComplex.conj(b10t));
        const v = fComplex.mul(b01t, fComplex.conj(b11t));
        g00[i] = { re: fComplex.magSqSum(b00t, b01t), im: 0.0 };
        g01[i] = fComplex.add(u, v);
        g11[i] = { re: fComplex.magSqSum(b10t, b11t), im: 0.0 };
      }
      return { g00, g01, g11 };
    }
    private ffsampRec(
      logn: number,
      t0: CPoly,
      t1: CPoly,
      g00i: CPoly,
      g01i: CPoly,
      g11i: CPoly
    ): { t0: CPoly; t1: CPoly } {
      // Algorithm 11: ffSamplingₙ(t, T)
      // (Page 40)
      // Require: t = (t₀, t₁) ∈ FFT(Q[x]/(xⁿ + 1))², a FALCON tree T
      // Ensure: z = (z₀, z₁) ∈ FFT(Z[x]/(xⁿ + 1))²
      // Format: All polynomials are in FFT representation.
      // 1: if n = 1 then
      // 2:     σ' ← T.value ▷ It is always the case that σ' ∈ [σ_{min}, σ_{max}]
      // 3:     z₀ ← SamplerZ(t₀, σ') ▷ Since n=1, tᵢ = invFFT(tᵢ) ∈ Q and zᵢ = invFFT(zᵢ) ∈ Z
      // 4:     z₁ ← SamplerZ(t₁, σ')
      // 5:     return z = (z₀, z₁)
      // 6: (l, T₀, T₁) ← (T.value, T.leftchild, T.rightchild)
      // 7: t'₁ ← splitfft(t₁) ▷ t₀, t'₁ ∈ FFT(Q[x]/(x^{n/2} + 1))²
      // 8: z'₁ ← ffSampling_{n/2}(t'₁, T₁) ▷ First recursive call to ffSampling_{n/2}
      // 9: z₁ ← mergefft(z'₁) ▷ z₀, z₁ ∈ FFT(Z[x]/(x^{n/2} + 1))²
      // 10: t'₀ ← t₀ + (t₁ - z₁) ⊙ l
      // 11: t''₀ ← splitfft(t'₀)
      // 12: z'₀ ← ffSampling_{n/2}(t''₀, T₀) ▷ Second recursive call to ffSampling_{n/2}
      // 13: z₀ ← mergefft(z'₀)
      // 14: return z = (z₀, z₁)
      if (logn === 0) {
        // The dynamic sampler stores 1/σ' instead of σ'. Keygen guarantees this interval,
        // but an imported compact key may reconstruct an invalid basis. Check the actual LDL*
        // leaf before it can drive SamplerZ; the negated comparison also rejects NaN/infinity.
        const leaf = Math.sqrt(g00i[0].re) * INV_SIGMA[this.logn];
        const sigmaPrime = 1 / leaf;
        if (!(sigmaPrime >= SIGMA_MIN[this.logn] && sigmaPrime <= SIGMA_MAX))
          throw new Error('invalid secretKey: sampler sigma out of range');
        // 3:     z₀ ← SamplerZ(t₀, σ')
        //        ▷ Since n=1, tᵢ = invFFT(tᵢ) ∈ Q and zᵢ = invFFT(zᵢ) ∈ Z
        const t0re = this.samplerZ(t0[0].re, leaf);
        const t1re = this.samplerZ(t1[0].re, leaf); // 4:     z₁ ← SamplerZ(t₁, σ')
        return { t0: [{ re: t0re, im: 0.0 }], t1: [{ re: t1re, im: 0.0 }] };
      }
      // 6: (l, T₀, T₁) ← (T.value, T.leftchild, T.rightchild)
      const { g00, g01, g11 } = ldlFFT(logn, g00i, g01i, g11i);
      const { f0: g00f0, f1: g00f1 } = this.splitSelfAdjFFT(logn, g00);
      const { f0: g11f0, f1: g11f1 } = this.splitSelfAdjFFT(logn, g11);
      // 7: t'₁ ← splitfft(t₁)
      //    ▷ t₀, t'₁ ∈ FFT(Q[x]/(x^{n/2} + 1))²
      const { f0: t1f0in, f1: t1f1in } = this.splitFFT(logn, t1);
      const { t0: t1f0out, t1: t1f1out } = this.ffsampRec(
        logn - 1,
        t1f0in,
        t1f1in,
        g11f0,
        g11f1,
        g11f0
      ); // 8: z'₁ ← ffSampling_{n/2}(t'₁, T₁) ▷ First recursive call to ffSampling_{n/2}
      // 9: z₁ ← mergefft(z'₁)
      //    ▷ z₀, z₁ ∈ FFT(Z[x]/(x^{n/2} + 1))²
      const t1new = this.mergeFFT(logn, t1f0out, t1f1out);
      // 10: t'₀ ← t₀ + (t₁ - z₁) ⊙ l
      const t0tmp = floatPoly.add(t0, floatPoly.mul(g01, floatPoly.sub(t1, t1new)));
      const { f0: t0f0in, f1: t0f1in } = this.splitFFT(logn, t0tmp); // 11: t''₀ ← splitfft(t'₀)
      const { t0: t0f0out, t1: t0f1out } = this.ffsampRec(
        logn - 1,
        t0f0in,
        t0f1in,
        g00f0,
        g00f1,
        g00f0
      ); // 12: z'₀ ← ffSampling_{n/2}(t''₀, T₀) ▷ Second recursive call to ffSampling_{n/2}
      const z1 = this.mergeFFT(logn, t0f0out, t0f1out); // 13: z₀ ← mergefft(z'₀)
      return { t0: z1, t1: t1new };
    }
    // sampling a preimage in FFT domain
    sample(hm: Uint16Array) {
      const t0t = floatPoly.FFT(floatPoly.convSmall(hm as any));
      const t0f = floatPoly.mulConst(floatPoly.mul(t0t, this.b11), F_INV_Q);
      const t1f = floatPoly.mulConst(floatPoly.mul(t0t, this.b01), F_MINUS_INV_Q);
      // Set seed
      this.shake.xofInto(this.shakeBuf);
      this.ctr = this.ctrView.getBigUint64(0, true);
      // Actual sampling
      return this.ffsampRec(this.logn, t0f, t1f, this.g00, this.g01, this.g11);
    }
  }

  const signRaw = (
    sk: TArg<Uint8Array>,
    msg: TArg<Uint8Array>,
    maxLen: number,
    rnd: TArg<FalconRandom> = randomBytes
  ): TRet<SignatureRaw> => {
    // Algorithm 10: Sign(m, sk, [β²]), (Page 39)
    // Require: A message m, a secret key sk, a bound [β²]
    // Ensure: A signature sig of m
    // 1: r ← {0, 1}³²⁰ uniformly
    // 2: c ← HashToPoint(r||m, q, n)
    // 3: t ← ( (1/q)FFT(c) ⊙ FFT(F), (1/q)FFT(c) ⊙ FFT(f) ) ▷ t = (FFT(c), FFT(0)) · B̂⁻¹
    // 4: do
    // 5:     do
    // 6:         z ← ffSamplingₙ(t, T)
    // 7:         s = (t - z)B̂
    //            ▷ At this point, s follows a Gaussian distribution:
    //              s ~ D_{(c,0)+Λ(B),σ,0}
    // 8:     while ||s||² > [β²]
    //        ▷ Since s is in FFT representation, one may use (3.8) to compute ||s||²
    // 9:     (s₁, s₂) ← invFFT(s) ▷ s₁ + s₂h = c mod (φ, q)
    // 10:     s ← Compress(s₂, 8 · sbytelen - 328)
    //         ▷ Remove 1 byte for the header, and 40 bytes for r
    // 11: while (s = ⊥)
    // 12: return sig = (r, s)
    abytes(msg, undefined, 'msg');
    abytes(sk, secretKeyCoder.bytesLen, 'secretKey');
    // One RNG stream drives both the public 40-byte nonce and the 48-byte sampler seed, so
    // deterministic rnd hooks make signatures deterministic for fixed secretKey/message inputs.
    const nonce = rnd(40);
    // Keep these raw 40-byte checks in sync with NONCELEN: Falcon's r <- {0,1}^320 nonce
    // feeds HashToPoint(r || m) and the public signature framing, so callback bugs must fail fast.
    abytes(nonce, 40, 'nonce');
    const hm = HashToPoint(nonce, msg); // 2: c ← HashToPoint(r||m, q, n)
    const seed = rnd(48);
    // Falcon implementations here use a fixed 48-byte sampler seed; reject callback bugs up front.
    abytes(seed, 48, 'seed');
    try {
      const [f, g, F] = secretKeyCoder.decode(sk);
      try {
        const G = completePrivate(f, g, F);
        const b00 = floatPoly.FFT(floatPoly.convSmall(g));
        const b01 = floatPoly.FFT(floatPoly.neg(floatPoly.convSmall(f)));
        const b10 = floatPoly.FFT(floatPoly.convSmall(G));
        const b11 = floatPoly.FFT(floatPoly.neg(floatPoly.convSmall(F)));
        const sampler = new FFSampler(logn, seed, b00, b01, b10, b11);
        const s2 = new Int16Array(N);
        try {
          while (true) {
            const { t0, t1 } = sampler.sample(hm);
            // t2 = b00*t0 + b10*t1
            const t2 = floatPoly.add(floatPoly.mul(t0, b00), floatPoly.mul(t1, b10));
            const t3 = floatPoly.mul(t0, b01); // t3 = b01*t0
            const t4 = floatPoly.iFFT(t2); // t4 = iFFT(tx)
            // t5 = iFFT(b11*t1 + ty)
            const t5 = floatPoly.iFFT(floatPoly.add(floatPoly.mul(t1, b11), t3));
            // Traverse imaginary in exact same order to avoid numerical instability
            const hn = N >> 1;
            let sqn = 0;
            for (let i = 0; i < hn; i++) {
              sqn += (hm[i] - (Math.round(t4[i].re) | 0)) ** 2;
              sqn += (hm[hn + i] - (Math.round(t4[i].im) | 0)) ** 2;
              const z = -Math.round(t5[i].re);
              sqn += z * z;
              s2[i] = z & 0xffff;
              const z2 = -Math.round(t5[i].im);
              sqn += z2 * z2;
              s2[i + hn] = z2 & 0xffff;
            }
            cleanCPoly(t0, t1, t2, t3, t4, t5);
            if (!(sqn <= L2BOUND[logn])) continue;
            // 10:     s ← Compress(s₂, 8 · sbytelen - 328)
            //         ▷ Remove 1 byte for the header, and 40 bytes for r
            const s2comp = compCoder(N).encode(s2);
            if (s2comp.length > maxLen) {
              cleanBytes(s2comp);
              continue;
            }
            return { s2: s2comp, nonce, msg } as TRet<SignatureRaw>;
          }
        } finally {
          cleanBytes(s2);
          sampler.destroy();
          cleanCPoly(b00, b01, b10, b11);
          cleanBytes(G);
        }
      } finally {
        cleanBytes(f, g, F);
      }
    } finally {
      cleanBytes(seed);
    }
  };

  // Raw helper: malformed encodings or wrong lengths still throw here; the public verify()/open()
  // wrappers decide whether to translate those failures into false or an exception.
  const verifyRaw = (
    pk: TArg<Uint8Array>,
    s2comp: TArg<Uint8Array>,
    nonce: TArg<Uint8Array>,
    msg: TArg<Uint8Array>
  ) => {
    // Algorithm 16: Verify(m, sig, pk, [β²])
    // (Page 45)
    // Require: A message m, a signature sig = (r, s), a public key pk = h ∈ Zq[x]/(φ), a bound [β²]
    // Ensure: Accept or reject
    // 1: c ← HashToPoint(r||m, q, n)
    // 2: s₂ ← Decompress(s, 8 · sbytelen - 328)
    // 3: if (s₂ = ⊥) then
    // 4:     reject ▷ Reject invalid encodings
    // 5: s₁ ← c - s₂h mod q ▷ s₁ should be normalized between -q/2 and q/2
    // 6: if ||(s₁, s₂)||² < [β²] then
    // 7:     accept
    // 8: else
    // 9:     reject ▷ Reject signatures that are too long
    const s2 = compCoder(N).decode(s2comp); // 2: s₂ ← Decompress(s, 8 · sbytelen - 328)
    const c0 = HashToPoint(nonce, msg); // 1: c ← HashToPoint(r||m, q, n)
    const h = intPoly.toMontgomery(intPoly.ntt(publicKeyCoder.decode(pk)));
    const s1 = intPoly.intt(intPoly.mul(intPoly.ntt(signedCoder.decode(s2)), h));
    intPoly.sub(s1, c0); // 5: s₁ ← c - s₂h mod q ▷ s₁ should be normalized between -q/2 and q/2
    return intPoly.isShort(signedCoder.encode(s1), s2); // 6: if ||(s₁, s₂)||² < [β²] then
  };

  const info = Object.freeze({ type: 'falcon' });
  const keyLengths = Object.freeze({
    seed: 48,
    publicKey: publicKeyCoder.bytesLen,
    secretKey: secretKeyCoder.bytesLen,
  });
  // Falcon takes a sampler callback the other schemes do not, and rejects `context`
  // with its own message; both stay in the accepted set so the specific errors fire.
  const FALCON_SIG_OPT_KEYS = [...SIG_OPT_KEYS, 'random'] as const;
  // Noble exposes a 48-byte sampler-seed hook,
  // but Falcon still samples/encodes a separate 40-byte nonce per signature.
  const getRnd = (opts: TArg<FalconSigOpts> = {}): TRet<FalconRandom> => {
    // `context` stays in the accepted set so the specific "not supported" error below
    // still fires, rather than the generic unexpected-option one.
    opts = validateSigOpts(opts, FALCON_SIG_OPT_KEYS);
    if (opts.context !== undefined) throw new Error('context is not supported');
    if (opts.random !== undefined && typeof opts.random !== 'function')
      throw new TypeError('"opts.random" expected function, got type=' + typeof opts.random);
    if (opts.random !== undefined) return opts.random as TRet<FalconRandom>;
    if (opts.extraEntropy === undefined) return randomBytes;
    const seed = opts.extraEntropy === false ? new Uint8Array(48) : opts.extraEntropy;
    abytes(seed, 48, 'opts.extraEntropy');
    const drbg = rngAesCtrDrbg256(seed);
    return (len = 0) => drbg.randomBytes(len) as TRet<Uint8Array>;
  };
  const checkVerOpts = (opts: TArg<VerOpts> = {}) => {
    const normalized = validateVerOpts(opts);
    if (normalized.context !== undefined) throw new Error('context is not supported');
  };
  const tests = Object.freeze({
    publicKeyCoder: Object.freeze(publicKeyCoder),
    privateKeyCoder: Object.freeze(secretKeyCoder),
    maxS2Len: opts.maxS2Len,
  });
  // `signRand` documents only the sampler-seed input length;
  // detached/attached signatures still include their own 40-byte nonce.
  const attachedLengths = Object.freeze({ ...keyLengths, signRand: 48 });
  const lengths = opts.padded
    ? Object.freeze({ ...attachedLengths, signature: opts.sigLen })
    : attachedLengths;
  const keygen = (
    seed?: TArg<Uint8Array>
  ): TRet<{ publicKey: Uint8Array; secretKey: Uint8Array }> => {
    const randSeed = seed === undefined;
    if (randSeed) seed = randomBytes(48);
    abytes(seed!, 48, 'seed');
    const [f, g, F, _G, pub] = new NTRU(logn, seed!).generate();
    const sk = secretKeyCoder.encode([f, g, F]);
    const pk = publicKeyCoder.encode(pub);
    if (randSeed) cleanBytes(seed!);
    cleanBytes(f, g, F, _G);
    return { publicKey: pk, secretKey: sk } as TRet<{
      publicKey: Uint8Array;
      secretKey: Uint8Array;
    }>;
  };
  const getPublicKey = (sk: TArg<Uint8Array>): TRet<Uint8Array> => {
    abytes(sk, secretKeyCoder.bytesLen, 'secretKey');
    const [f, g, F] = secretKeyCoder.decode(sk);
    try {
      const h = computePublic(f, g);
      cleanBytes(f, g, F);
      return publicKeyCoder.encode(h) as TRet<Uint8Array>;
    } catch (e) {
      cleanBytes(f, g, F);
      throw e;
    }
  };
  const sign = (
    msg: TArg<Uint8Array>,
    sk: TArg<Uint8Array>,
    sigOpts: TArg<FalconSigOpts> = {}
  ): TRet<Uint8Array> => {
    const { s2, nonce } = signRaw(sk, msg, opts.maxS2Len, getRnd(sigOpts));
    return SignatureCoderDetached(logn).encode({ nonce, s2 });
  };
  /** Verify one detached Falcon signature.
   * Returns `false` for malformed detached signature encodings, non-canonical detached signatures,
   * and well-formed signatures that do not validate. Throws on malformed API argument types or
   * unsupported verification options.
   */
  const verify = (
    sig: TArg<Uint8Array>,
    msg: TArg<Uint8Array>,
    pk: TArg<Uint8Array>,
    verOpts: TArg<VerOpts> = {}
  ) => {
    checkVerOpts(verOpts);
    abytes(sig, undefined, 'signature');
    abytes(msg, undefined, 'msg');
    // Length/canonical public-key failures are decoded below and return false; only type is fatal.
    abytes(pk, undefined, 'publicKey');
    try {
      const { s2, nonce } = SignatureCoderDetached(logn).decode(sig);
      return verifyRaw(pk, s2, nonce, msg);
    } catch {
      return false;
    }
  };
  const attached: TRet<FalconAttached> = Object.freeze({
    info,
    lengths: attachedLengths,
    keygen,
    getPublicKey,
    seal(msg: TArg<Uint8Array>, sk: TArg<Uint8Array>, sigOpts: TArg<FalconSigOpts> = {}) {
      const { s2, nonce } = signRaw(sk, msg, opts.maxS2Len, getRnd(sigOpts));
      return SignatureCoder.encode({ msg, nonce, s2 });
    },
    open(sig: TArg<Uint8Array>, pk: TArg<Uint8Array>, verOpts: TArg<VerOpts> = {}) {
      checkVerOpts(verOpts);
      // Wrong argument types are caller bugs and must stay TypeErrors; only what happens
      // after this is untrusted input. Detached verify() type-checks the public key the same
      // way, so open() does too: a wrong type is fatal, and a malformed (wrong-length or
      // non-canonical) key folds into the single rejection below rather than leaking a raw
      // codec error, exactly as detached verify() folds it into `false`.
      abytes(sig, undefined, 'signature');
      abytes(pk, undefined, 'publicKey');
      // Decode and verify owned snapshots. Apart from keeping the authenticated result stable
      // after open() returns, this ensures every verification step observes the same bytes when
      // an input is backed by SharedArrayBuffer or has subclass-overridden view methods.
      const ownedSig = copyBytes(sig);
      const ownedPk = copyBytes(pk);
      // Decode failures and malformed-key failures are rejected signatures, not internal
      // faults. Letting the codec's own errors out gave a caller handling untrusted input
      // several different messages for one corrupt byte, including "end of buffer: len=2
      // buf=0 lastByte=undefined", which reads as a library bug. Detached verify already
      // treats every such failure uniformly; open() collapses them into one Error (the
      // original preserved as `cause`). A well-formed signature that simply does not
      // validate falls through to the same message with no cause.
      try {
        let verifiedMsg: Uint8Array | undefined;
        try {
          const { s2, nonce, msg } = SignatureCoder.decode(ownedSig);
          if (verifyRaw(ownedPk, s2, nonce, msg)) verifiedMsg = msg;
        } catch (cause) {
          throw new Error('invalid signature', { cause });
        }
        if (verifiedMsg === undefined) throw new Error('invalid signature');
        // Do not retain or expose the full attached-signature allocation through `.buffer`.
        return copyBytes(verifiedMsg);
      } finally {
        cleanBytes(ownedSig, ownedPk);
      }
    },
  });
  // PATCH (starknet.js-workshop pureTS): signing / verification of an externally computed hash
  // point, mirroring ml-dsa `internal` + `externalMu`. See PATCH.md.
  const INTERNAL_MAX_ITERATIONS = 1000;
  const checkHashPoint = (hashPoint: TArg<Uint16Array>): void => {
    if (!(hashPoint instanceof Uint16Array) || hashPoint.length !== N)
      throw new Error(`hashPoint: expected Uint16Array(${N})`);
    for (let i = 0; i < N; i++)
      if (hashPoint[i] >= Q) throw new Error('hashPoint: coefficient out of range');
  };
  const internal: TRet<FalconInternal> = Object.freeze({
    sign(
      hashPoint: TArg<Uint16Array>,
      sk: TArg<Uint8Array>,
      internalOpts: TArg<FalconInternalSignOpts> = {}
    ): TRet<Int16Array> {
      checkHashPoint(hashPoint);
      abytes(sk, secretKeyCoder.bytesLen, 'secretKey');
      const rnd = (internalOpts.random ?? randomBytes) as FalconRandom;
      const maxIterations = internalOpts.maxIterations ?? INTERNAL_MAX_ITERATIONS;
      const hm = Uint16Array.from(hashPoint) as IPoly;
      const seed = rnd(48);
      abytes(seed, 48, 'seed');
      try {
        const [f, g, F] = secretKeyCoder.decode(sk);
        try {
          const G = completePrivate(f, g, F);
          const b00 = floatPoly.FFT(floatPoly.convSmall(g));
          const b01 = floatPoly.FFT(floatPoly.neg(floatPoly.convSmall(f)));
          const b10 = floatPoly.FFT(floatPoly.convSmall(G));
          const b11 = floatPoly.FFT(floatPoly.neg(floatPoly.convSmall(F)));
          const sampler = new FFSampler(logn, seed, b00, b01, b10, b11);
          const s2 = new Int16Array(N);
          try {
            for (let iteration = 0; iteration < maxIterations; iteration++) {
              const { t0, t1 } = sampler.sample(hm);
              const t2 = floatPoly.add(floatPoly.mul(t0, b00), floatPoly.mul(t1, b10));
              const t3 = floatPoly.mul(t0, b01);
              const t4 = floatPoly.iFFT(t2);
              const t5 = floatPoly.iFFT(floatPoly.add(floatPoly.mul(t1, b11), t3));
              const hn = N >> 1;
              let sqn = 0;
              for (let i = 0; i < hn; i++) {
                sqn += (hm[i] - (Math.round(t4[i].re) | 0)) ** 2;
                sqn += (hm[hn + i] - (Math.round(t4[i].im) | 0)) ** 2;
                const z = -Math.round(t5[i].re);
                sqn += z * z;
                s2[i] = z & 0xffff;
                const z2 = -Math.round(t5[i].im);
                sqn += z2 * z2;
                s2[i + hn] = z2 & 0xffff;
              }
              cleanCPoly(t0, t1, t2, t3, t4, t5);
              if (sqn <= L2BOUND[logn]) return s2.slice() as TRet<Int16Array>;
            }
            throw new Error('internal.sign: no short signature found within the iteration cap');
          } finally {
            cleanBytes(s2);
            sampler.destroy();
            cleanCPoly(b00, b01, b10, b11);
            cleanBytes(G);
          }
        } finally {
          cleanBytes(f, g, F);
        }
      } finally {
        cleanBytes(seed);
      }
    },
    verify(
      s2: TArg<Int16Array>,
      hashPoint: TArg<Uint16Array>,
      pk: TArg<Uint8Array>
    ): boolean {
      checkHashPoint(hashPoint);
      if (!(s2 instanceof Int16Array) || s2.length !== N)
        throw new Error(`s2: expected Int16Array(${N})`);
      abytes(pk, publicKeyCoder.bytesLen, 'publicKey');
      const h = intPoly.toMontgomery(intPoly.ntt(publicKeyCoder.decode(pk)));
      const s1 = intPoly.intt(intPoly.mul(intPoly.ntt(signedCoder.decode(s2 as Int16Array)), h));
      intPoly.sub(s1, hashPoint as IPoly);
      return intPoly.isShort(signedCoder.encode(s1), s2 as Int16Array);
    },
  });
  const res = {
    info,
    lengths,
    attached,
    keygen,
    getPublicKey,
    sign,
    verify,
    internal,
  };
  (res as any).__test = tests;
  return Object.freeze(res);
}

const falcon512opts = {
  N: 512,
  // Keep the mode an own property: omitted config fields must not inherit from Object.prototype.
  padded: false,
  // Table 3.3 fixed padded detached bytes, including the detached header byte and 40-byte nonce.
  sigLen: 666,
  fgBits: 6,
  FGBits: 8,
  // Compressed-s payload bytes only, excluding the detached header byte and 40-byte nonce.
  paddedLen: 625,
};
/**
 * Falcon-512 detached-signature API with the attached helper exposed as `.attached`.
 * @example
 * Generate a Falcon-512 keypair and verify one detached signature.
 * ```ts
 * const { secretKey, publicKey } = falcon512.keygen();
 * const msg = new Uint8Array([1, 2, 3]);
 * const sig = falcon512.sign(msg, secretKey);
 * falcon512.verify(sig, msg, publicKey);
 * ```
 */
export const falcon512: TRet<Falcon> = /* @__PURE__ */ (() =>
  genFalcon({ ...falcon512opts, maxS2Len: 711 }))();
/**
 * Falcon-512 padded detached-signature API with the attached helper exposed as `.attached`.
 * @example
 * Generate a Falcon-512 padded keypair and verify one detached signature.
 * ```ts
 * const { secretKey, publicKey } = falcon512padded.keygen();
 * const msg = new Uint8Array([1, 2, 3]);
 * const sig = falcon512padded.sign(msg, secretKey);
 * falcon512padded.verify(sig, msg, publicKey);
 * ```
 */
export const falcon512padded: TRet<Falcon> = /* @__PURE__ */ (() =>
  genFalcon({
    ...falcon512opts,
    padded: true,
    maxS2Len: 625,
  }))();

const falcon1024opts = {
  N: 1024,
  padded: false,
  // Table 3.3 fixed padded detached bytes, including the detached header byte and 40-byte nonce.
  sigLen: 1280,
  fgBits: 5,
  FGBits: 8,
  // Compressed-s payload bytes only, excluding the detached header byte and 40-byte nonce.
  paddedLen: 1239,
};
/**
 * Falcon-1024 detached-signature API with the attached helper exposed as `.attached`.
 * @example
 * Generate a Falcon-1024 keypair and verify one detached signature.
 * ```ts
 * const { secretKey, publicKey } = falcon1024.keygen();
 * const msg = new Uint8Array([1, 2, 3]);
 * const sig = falcon1024.sign(msg, secretKey);
 * falcon1024.verify(sig, msg, publicKey);
 * ```
 */
export const falcon1024: TRet<Falcon> = /* @__PURE__ */ (() =>
  genFalcon({
    ...falcon1024opts,
    maxS2Len: 1421,
  }))();
/**
 * Falcon-1024 padded detached-signature API with the attached helper exposed as `.attached`.
 * @example
 * Generate a Falcon-1024 padded keypair and verify one detached signature.
 * ```ts
 * const { secretKey, publicKey } = falcon1024padded.keygen();
 * const msg = new Uint8Array([1, 2, 3]);
 * const sig = falcon1024padded.sign(msg, secretKey);
 * falcon1024padded.verify(sig, msg, publicKey);
 * ```
 */
export const falcon1024padded: TRet<Falcon> = /* @__PURE__ */ (() =>
  genFalcon({
    ...falcon1024opts,
    padded: true,
    maxS2Len: 1239,
  }))();

// NOTE: for tests only, don't use
export const __tests: any = /* @__PURE__ */ (() =>
  Object.freeze({
    BNORM_MAX,
    COMPLEX_ROOTS,
    Float,
    INV_SIGMA,
    SIGMA_MIN,
    getFloatPoly,
    ldlFFT,
    cleanCPoly,
    falcon512: (falcon512 as any).__test,
    falcon512padded: (falcon512padded as any).__test,
    falcon1024: (falcon1024 as any).__test,
    falcon1024padded: (falcon1024padded as any).__test,
  }))();
