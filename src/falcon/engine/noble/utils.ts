/* eslint-disable -- vendored copy of @noble/post-quantum 0.7.1, kept as is: see PATCH.md */
/**
 * Utilities for hex, bytearray and number handling.
 * @module
 */
/*! noble-post-quantum - MIT License (c) 2024 Paul Miller (paulmillr.com) */
import {
  type CHash,
  type TypedArray,
  abytes,
  abytes as abytes_,
  ahash as ahash_,
  anumber,
  bytesToHex,
  concatBytes,
  isBytes,
  isLE,
  randomBytes as randb,
} from '@noble/hashes/utils.js';
/**
 * Bytes API type helpers for old + new TypeScript.
 *
 * TS 5.6 has `Uint8Array`, while TS 5.9+ made it generic `Uint8Array<ArrayBuffer>`.
 * We can't use specific return type, because TS 5.6 will error.
 * We can't use generic return type, because most TS 5.9 software will expect specific type.
 *
 * Maps typed-array input leaves to broad forms.
 * These are compatibility adapters, not ownership guarantees.
 *
 * - `TArg` keeps byte inputs broad.
 * - `TRet` marks byte outputs for TS 5.6 and TS 5.9+ compatibility.
 */
export type TypedArg<T> = T extends BigInt64Array
  ? BigInt64Array
  : T extends BigUint64Array
    ? BigUint64Array
    : T extends Float32Array
      ? Float32Array
      : T extends Float64Array
        ? Float64Array
        : T extends Int16Array
          ? Int16Array
          : T extends Int32Array
            ? Int32Array
            : T extends Int8Array
              ? Int8Array
              : T extends Uint16Array
                ? Uint16Array
                : T extends Uint32Array
                  ? Uint32Array
                  : T extends Uint8ClampedArray
                    ? Uint8ClampedArray
                    : T extends Uint8Array
                      ? Uint8Array
                      : never;
/** Maps typed-array output leaves to narrow TS-compatible forms. */
export type TypedRet<T> = T extends BigInt64Array
  ? ReturnType<typeof BigInt64Array.of>
  : T extends BigUint64Array
    ? ReturnType<typeof BigUint64Array.of>
    : T extends Float32Array
      ? ReturnType<typeof Float32Array.of>
      : T extends Float64Array
        ? ReturnType<typeof Float64Array.of>
        : T extends Int16Array
          ? ReturnType<typeof Int16Array.of>
          : T extends Int32Array
            ? ReturnType<typeof Int32Array.of>
            : T extends Int8Array
              ? ReturnType<typeof Int8Array.of>
              : T extends Uint16Array
                ? ReturnType<typeof Uint16Array.of>
                : T extends Uint32Array
                  ? ReturnType<typeof Uint32Array.of>
                  : T extends Uint8ClampedArray
                    ? ReturnType<typeof Uint8ClampedArray.of>
                    : T extends Uint8Array
                      ? ReturnType<typeof Uint8Array.of>
                      : never;
/** Recursively adapts byte-carrying API input types. See {@link TypedArg}. */
export type TArg<T> =
  | T
  | ([TypedArg<T>] extends [never]
      ? T extends (...args: infer A) => infer R
        ? ((...args: { [K in keyof A]: TRet<A[K]> }) => TArg<R>) & {
            [K in keyof T]: T[K] extends (...args: any) => any ? T[K] : TArg<T[K]>;
          }
        : T extends [infer A, ...infer R]
          ? [TArg<A>, ...{ [K in keyof R]: TArg<R[K]> }]
          : T extends readonly [infer A, ...infer R]
            ? readonly [TArg<A>, ...{ [K in keyof R]: TArg<R[K]> }]
            : T extends (infer A)[]
              ? TArg<A>[]
              : T extends readonly (infer A)[]
                ? readonly TArg<A>[]
                : T extends Promise<infer A>
                  ? Promise<TArg<A>>
                  : T extends object
                    ? { [K in keyof T]: TArg<T[K]> }
                    : T
      : TypedArg<T>);
/** Recursively adapts byte-carrying API output types. See {@link TypedArg}. */
export type TRet<T> = T extends unknown
  ? T &
      ([TypedRet<T>] extends [never]
        ? T extends (...args: infer A) => infer R
          ? ((...args: { [K in keyof A]: TArg<A[K]> }) => TRet<R>) & {
              [K in keyof T]: T[K] extends (...args: any) => any ? T[K] : TRet<T[K]>;
            }
          : T extends [infer A, ...infer R]
            ? [TRet<A>, ...{ [K in keyof R]: TRet<R[K]> }]
            : T extends readonly [infer A, ...infer R]
              ? readonly [TRet<A>, ...{ [K in keyof R]: TRet<R[K]> }]
              : T extends (infer A)[]
                ? TRet<A>[]
                : T extends readonly (infer A)[]
                  ? readonly TRet<A>[]
                  : T extends Promise<infer A>
                    ? Promise<TRet<A>>
                    : T extends object
                      ? { [K in keyof T]: TRet<T[K]> }
                      : T
        : TypedRet<T>)
  : never;
/**
 * Asserts that a value is a byte array and optionally checks its length.
 * Returns the original reference unchanged on success, and currently also accepts Node `Buffer`
 * values through the upstream validator.
 * This helper throws on malformed input, so APIs that must return `false` need to guard lengths
 * before decoding or before calling it.
 * @example
 * Validate that a value is a byte array with the expected length.
 * ```ts
 * abytes(new Uint8Array([1]), 1);
 * ```
 */
const abytesDoc: typeof abytes = abytes;
export { abytesDoc as abytes };
/**
 * Concatenates byte arrays into a new `Uint8Array`.
 * Zero arguments return an empty `Uint8Array`.
 * Invalid segments throw before allocation because each argument is validated first.
 * @example
 * Concatenate two byte arrays into one result.
 * ```ts
 * concatBytes(new Uint8Array([1]), new Uint8Array([2]));
 * ```
 */
const concatBytesDoc: typeof concatBytes = concatBytes;
export { concatBytesDoc as concatBytes };
/**
 * Returns cryptographically secure random bytes.
 * Requires `globalThis.crypto.getRandomValues` and throws if that API is unavailable.
 * `bytesLength` is validated by the upstream helper as a non-negative integer before allocation,
 * so negative and fractional values both throw instead of truncating through JS `ToIndex`.
 * @param bytesLength - Number of random bytes to generate.
 * @returns Fresh random bytes.
 * @example
 * Generate a fresh random seed.
 * ```ts
 * const seed = randomBytes(4);
 * ```
 */
export const randomBytes: typeof randb = randb;

export function aarray<T>(
  item: unknown,
  title: string,
  inner: (elm: T, title: string) => void = () => {}
): T[] {
  if (!Array.isArray(item))
    throw new TypeError(`"${title}" expected array, got type=${typeof item}`);
  for (let i = 0; i < item.length; i++) inner(item[i], `${title}[${i}]`);
  return item;
}

export function aobject<T extends object>(value: unknown, title = 'object'): T {
  if (value === null || typeof value !== 'object' || Array.isArray(value))
    throw new TypeError(
      title === 'object'
        ? 'expected valid options object'
        : `"${title}" expected object, got type=${typeof value}`
    );
  return value as T;
}

/**
 * Compares two byte arrays in a length-constant way for equal lengths.
 * Inputs are validated as byte arrays; unequal lengths return `false` immediately.
 * @param a - First byte array.
 * @param b - Second byte array.
 * @returns Whether both arrays contain the same bytes.
 * @example
 * Compare two byte arrays for equality.
 * ```ts
 * equalBytes(new Uint8Array([1]), new Uint8Array([1]));
 * ```
 */
export function equalBytes(a: TArg<Uint8Array>, b: TArg<Uint8Array>): boolean {
  a = abytes(a);
  b = abytes(b);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Copies bytes into a fresh `Uint8Array`.
 * Returns a detached plain `Uint8Array` after validating that the input is real bytes.
 * @param bytes - Source bytes.
 * @returns Copy of the input bytes.
 * @example
 * Copy bytes into a fresh array.
 * ```ts
 * copyBytes(new Uint8Array([1, 2]));
 * ```
 */
export function copyBytes(bytes: TArg<Uint8Array>): TRet<Uint8Array> {
  // The typed-array constructor copies a typed-array source through its internal byte storage.
  // Unlike `Uint8Array.from`, it does not invoke a subclass-overridden iterator. Keep the explicit
  // validation because the constructor itself would also accept arrays and other typed arrays.
  return new Uint8Array(abytes(bytes)) as TRet<Uint8Array>;
}

/**
 * Byte-swaps each 64-bit lane in place.
 * Falcon's exact binary64 tables are stored as little-endian byte payloads, so BE runtimes need
 * this boundary helper before aliasing them as host `Float64Array` lanes.
 * @param arr - Byte buffer whose length is a multiple of 8.
 * @returns The same buffer after in-place 64-bit lane byte swaps.
 * @example
 * Byte-swap one 64-bit lane in place.
 * ```ts
 * byteSwap64(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]));
 * ```
 */
export function byteSwap64<T extends ArrayBufferView>(arr: T): T {
  const bytes = new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  for (let i = 0; i < bytes.length; i += 8) {
    const a0 = bytes[i + 0];
    const a1 = bytes[i + 1];
    const a2 = bytes[i + 2];
    const a3 = bytes[i + 3];
    bytes[i + 0] = bytes[i + 7];
    bytes[i + 1] = bytes[i + 6];
    bytes[i + 2] = bytes[i + 5];
    bytes[i + 3] = bytes[i + 4];
    bytes[i + 4] = a3;
    bytes[i + 5] = a2;
    bytes[i + 6] = a1;
    bytes[i + 7] = a0;
  }
  return arr;
}
/**
 * Byte-swaps 64-bit lanes on big-endian runtimes and returns the input unchanged on little-endian.
 * This keeps Falcon's binary64 tables in canonical little-endian order before aliasing them as
 * `Float64Array` lanes on the current host.
 * @param arr - Buffer to pass through or swap in place.
 * @returns The same buffer, normalized for Falcon's little-endian table layout.
 * @example
 * Normalize one host-endian buffer for Falcon's float tables.
 * ```ts
 * baswap64If(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]));
 * ```
 */
export const baswap64If: <T extends ArrayBufferView>(arr: T) => T = isLE
  ? (arr) => arr
  : byteSwap64;

/** Shared key-generation surface for signers and KEMs. */
export type CryptoKeys = {
  /** Optional metadata about the algorithm family or variant. */
  info?: { type?: string };
  /** Public byte lengths for the exported key material. */
  lengths: { seed?: number; publicKey?: number; secretKey?: number };
  /**
   * Generate one secret/public keypair.
   * @param seed - Optional seed bytes for deterministic key generation.
   * @returns Fresh secret/public keypair.
   */
  keygen: (seed?: TArg<Uint8Array>) => {
    secretKey: TRet<Uint8Array>;
    publicKey: TRet<Uint8Array>;
  };
  /**
   * Derive one public key from a secret key.
   * @param secretKey - Secret key bytes.
   * @returns Public key bytes.
   */
  getPublicKey: (secretKey: TArg<Uint8Array>) => TRet<Uint8Array>;
};

/** Verification options shared by the signature APIs. */
export type VerOpts = {
  /** Optional application-defined context string. */
  context?: Uint8Array;
};
/** Signing options shared by the signature APIs. */
export type SigOpts = VerOpts & {
  // Compatibility with @noble/curves: false to disable, enabled by default, user can pass U8A
  /** Optional extra entropy or `false` to disable randomized signing. */
  extraEntropy?: Uint8Array | false;
};

/**
 * Validates that an options bag is a plain object.
 * @param opts - Options object to validate.
 * @throws On wrong argument types. {@link TypeError}
 * @example
 * Validate that an options bag is a plain object.
 * ```ts
 * validateOpts({});
 * ```
 */
export function validateOpts(opts: object): void {
  // Arrays silently passed here before, but these call sites expect named option-bag fields.
  if (isBytes(opts)) throw new TypeError('"opts" expected object, got Uint8Array');
  aobject(opts, 'opts');
  const proto = Object.getPrototypeOf(opts);
  // Options are security parameters, not general class instances. Restricting the bag to own
  // properties prevents values injected through Object.prototype (or a custom shared prototype)
  // from silently changing signing behavior. Null-prototype records remain supported.
  if (proto !== null && proto !== Object.prototype)
    throw new TypeError('"opts" expected a plain object');
}

// Frozen because they are exported: an unfrozen array export lets anything in the
// process push a key onto the accepted set and silently re-open exactly the hole this
// validation closes.
/** Keys accepted by `verify`. */
export const VER_OPT_KEYS: readonly ['context'] = /* @__PURE__ */ Object.freeze([
  'context',
] as const);
/** Keys accepted by `sign`. */
export const SIG_OPT_KEYS: readonly ['context', 'extraEntropy'] = /* @__PURE__ */ Object.freeze([
  'context',
  'extraEntropy',
] as const);

/**
 * Rejects option keys the caller did not mean to set.
 *
 * Validating the types of known keys while ignoring unknown ones makes a typo
 * indistinguishable from an omission, and for these options an omission is a
 * security downgrade rather than a no-op: `{ ctx }` instead of `{ context }` signs
 * with no domain separation, succeeds, and verifies for anyone who also supplies
 * none. Nothing at any layer reports it. TypeScript catches this through excess
 * property checks, so the exposure is JavaScript callers specifically.
 *
 * @param opts - Options object to check.
 * @param allowed - The keys this call site accepts.
 * Returns a frozen null-prototype snapshot so later reads cannot fall through to a polluted
 * prototype. Like `checkOpts()` in noble-hashes, only enumerable own properties are copied.
 * @throws If any other copied key is present or the bag has a custom prototype. {@link TypeError}
 * @returns Sanitized snapshot of the enumerable own options.
 * @example
 * Accept a known option key. A key the list does not name, such as `ctx`, throws instead.
 * ```ts
 * import { checkOptKeys } from '@noble/post-quantum/utils.js';
 * checkOptKeys({ context: new Uint8Array() }, ['context']);
 * ```
 */
export function checkOptKeys<T extends object>(opts: T, allowed: readonly string[]): T {
  validateOpts(opts);
  // Snapshot once before validation: Object.assign follows the same own-enumerable option-bag
  // semantics as noble-hashes, while the null prototype keeps omitted fields immune to pollution.
  const normalized = Object.assign(Object.create(null), opts) as Record<string, unknown>;
  for (const [k, v] of Object.entries(normalized)) {
    // `undefined` means unset everywhere else in these validators, and building an options bag by
    // spread is a normal way to reach these calls, so present-but-undefined stays equivalent to
    // omission.
    if (v === undefined) continue;
    if (!allowed.includes(k))
      throw new TypeError(
        'unexpected option "' + String(k) + '"; expected one of: ' + allowed.join(', ')
      );
  }
  return Object.freeze(normalized) as T;
}

/**
 * Validates common verification options.
 * `context` itself is validated with `abytes(...)`, and individual algorithms may narrow support
 * further after this shared plain-object gate.
 * @param opts - Verification options. See {@link VerOpts}.
 * @param allowed - Keys this call site accepts. Defaults to {@link VER_OPT_KEYS}; surfaces that
 * take extra keys, or take fewer, pass their own list.
 * @throws On wrong argument types. {@link TypeError}
 * @returns Frozen null-prototype snapshot of the validated options.
 * @example
 * Validate common verification options.
 * ```ts
 * validateVerOpts({ context: new Uint8Array([1]) });
 * ```
 */
export function validateVerOpts<T extends TArg<VerOpts>>(
  opts: T,
  allowed: readonly string[] = VER_OPT_KEYS
): T {
  const normalized = checkOptKeys(opts, allowed);
  if (normalized.context !== undefined) abytes(normalized.context, undefined, 'opts.context');
  return normalized;
}

/**
 * Validates common signing options.
 * `extraEntropy` is validated with `abytes(...)`; exact lengths and extra algorithm-specific
 * restrictions are enforced later by callers.
 * @param opts - Signing options. See {@link SigOpts}.
 * @param allowed - Keys this call site accepts. Defaults to {@link SIG_OPT_KEYS}; surfaces that
 * take extra keys, or take fewer, pass their own list.
 * @throws On wrong argument types. {@link TypeError}
 * @returns Frozen null-prototype snapshot of the validated options.
 * @example
 * Validate common signing options.
 * ```ts
 * validateSigOpts({ extraEntropy: new Uint8Array([1]) });
 * ```
 */
export function validateSigOpts<T extends TArg<SigOpts>>(
  opts: T,
  allowed: readonly string[] = SIG_OPT_KEYS
): T {
  const normalized = checkOptKeys(opts, allowed);
  if (normalized.context !== undefined) abytes(normalized.context, undefined, 'opts.context');
  if (normalized.extraEntropy !== false && normalized.extraEntropy !== undefined)
    abytes(normalized.extraEntropy, undefined, 'opts.extraEntropy');
  return normalized;
}

/** Generic signature interface with key generation, signing, and verification. */
export type Signer = CryptoKeys & {
  /** Public byte lengths for signatures and signing randomness. */
  lengths: { signRand?: number; signature?: number };
  /**
   * Sign one message.
   * @param msg - Message bytes to sign.
   * @param secretKey - Secret key bytes.
   * @param opts - Optional signing options.
   * @returns Signature bytes.
   */
  sign: (
    msg: TArg<Uint8Array>,
    secretKey: TArg<Uint8Array>,
    opts?: TArg<SigOpts>
  ) => TRet<Uint8Array>;
  /**
   * Verify one signature.
   * @param sig - Signature bytes.
   * @param msg - Signed message bytes.
   * @param publicKey - Public key bytes.
   * @param opts - Optional verification options.
   * @returns `true` when the signature is valid, `false` when all inputs are well-formed but the
   * signature check does not pass. Some implementations also treat malformed signature encodings as
   * a verification failure and return `false`.
   * @throws On malformed API arguments or unsupported verification options.
   */
  verify: (
    sig: TArg<Uint8Array>,
    msg: TArg<Uint8Array>,
    publicKey: TArg<Uint8Array>,
    opts?: TArg<VerOpts>
  ) => boolean;
};

/** Generic key encapsulation mechanism interface. */
export type KEM = CryptoKeys & {
  /** Public byte lengths for ciphertexts and optional message randomness. */
  lengths: { cipherText?: number; msg?: number; msgRand?: number };
  /**
   * Encapsulate one shared secret to a recipient public key.
   * @param publicKey - Recipient public key bytes.
   * @param msg - Optional caller-provided randomness/message seed.
   * @returns Ciphertext plus shared secret.
   */
  encapsulate: (
    publicKey: TArg<Uint8Array>,
    msg?: TArg<Uint8Array>
  ) => {
    cipherText: TRet<Uint8Array>;
    sharedSecret: TRet<Uint8Array>;
  };
  /**
   * Recover the shared secret from a ciphertext and recipient secret key.
   * @param cipherText - Ciphertext bytes.
   * @param secretKey - Recipient secret key bytes.
   * @returns Decapsulated shared secret.
   */
  decapsulate: (cipherText: TArg<Uint8Array>, secretKey: TArg<Uint8Array>) => TRet<Uint8Array>;
};

/** Bidirectional encoder/decoder interface. */
export interface Coder<F, T> {
  /**
   * Serialize one value.
   * @param from - Value to encode.
   * @returns Encoded representation.
   */
  encode(from: F): T;
  /**
   * Parse one serialized value.
   * @param to - Encoded representation.
   * @returns Decoded value.
   */
  decode(to: T): F;
}

/** Encoder/decoder interface specialized for byte arrays. */
export interface BytesCoder<T> extends Coder<T, Uint8Array> {
  /**
   * Serialize one value into bytes.
   * @param data - Value to encode.
   * @returns Encoded bytes.
   */
  encode: (data: T) => Uint8Array;
  /**
   * Parse one byte array into a value.
   * @param bytes - Encoded bytes.
   * @returns Decoded value.
   */
  decode: (bytes: Uint8Array) => T;
}

/** Fixed-length byte encoder/decoder. */
export type BytesCoderLen<T> = BytesCoder<T> & { bytesLen: number };

// nano-packed, because struct encoding is hard.
type UnCoder<T> = T extends BytesCoder<infer U> ? U : never;
type SplitOut<T extends (number | BytesCoderLen<any>)[]> = {
  [K in keyof T]: T[K] extends number ? Uint8Array : UnCoder<T[K]>;
};
/**
 * Builds a fixed-layout coder from byte lengths and nested coders.
 * Raw-length fields decode as zero-copy `subarray(...)` views, and nested coders may preserve that
 * aliasing too. Nested coder `encode(...)` results are treated as owned scratch: `splitCoder`
 * copies them into the output and then zeroizes them with `fill(0)`. If a nested encoder forwards
 * caller-owned bytes, it must do so only after detaching them into a disposable copy.
 * @param label - Label used in validation errors.
 * @param lengths - Field lengths or nested coders.
 * @returns Composite fixed-length coder.
 * @example
 * Build a fixed-layout coder from byte lengths and nested coders.
 * ```ts
 * splitCoder('demo', 1, 2).encode([new Uint8Array([1]), new Uint8Array([2, 3])]);
 * ```
 */
export function splitCoder<T extends (number | BytesCoderLen<any>)[]>(
  label: string,
  ...lengths: T
): TRet<BytesCoder<SplitOut<T>> & { bytesLen: number }> {
  const getLength = (c: TArg<number | BytesCoderLen<any>>) =>
    typeof c === 'number' ? c : (c as BytesCoderLen<any>).bytesLen;
  const bytesLen: number = lengths.reduce((sum: number, a) => sum + getLength(a), 0);
  return {
    bytesLen,
    encode: (bufs: T) => {
      const res = new Uint8Array(bytesLen);
      for (let i = 0, pos = 0; i < lengths.length; i++) {
        const c = lengths[i];
        const l = getLength(c);
        const b: Uint8Array = typeof c === 'number' ? (bufs[i] as any) : c.encode(bufs[i]);
        abytes_(b, l, label);
        res.set(b, pos);
        if (typeof c !== 'number') b.fill(0); // clean
        pos += l;
      }
      return res;
    },
    decode: (buf: TArg<Uint8Array>) => {
      abytes_(buf, bytesLen, label);
      const res = [];
      for (const c of lengths) {
        const l = getLength(c);
        const b = buf.subarray(0, l);
        res.push(typeof c === 'number' ? b : c.decode(b));
        buf = buf.subarray(l);
      }
      return res as SplitOut<T>;
    },
  } as any;
}
// nano-packed.array (fixed size)
/**
 * Builds a fixed-length vector coder from another fixed-length coder.
 * Element decoding receives `subarray(...)` views, so aliasing depends on the element coder.
 * Element coder `encode(...)` results are treated as owned scratch: `vecCoder` copies them into
 * the output and then zeroizes them with `fill(0)`. If an element encoder forwards caller-owned
 * bytes, it must do so only after detaching them into a disposable copy. `vecCoder` also trusts
 * the `BytesCoderLen` contract: each encoded element must already be exactly `c.bytesLen` bytes.
 * @param c - Element coder.
 * @param vecLen - Number of elements in the vector.
 * @returns Fixed-length vector coder.
 * @example
 * Build a fixed-length vector coder from another fixed-length coder.
 * ```ts
 * vecCoder(
 *   { bytesLen: 1, encode: (n: number) => Uint8Array.of(n), decode: (b: Uint8Array) => b[0] || 0 },
 *   2
 * ).encode([1, 2]);
 * ```
 */
export function vecCoder<T>(c: TArg<BytesCoderLen<T>>, vecLen: number): TRet<BytesCoderLen<T[]>> {
  const coder = c as BytesCoderLen<T>;
  const bytesLen = vecLen * coder.bytesLen;
  return {
    bytesLen,
    encode: (u: TArg<T[]>): TRet<Uint8Array> => {
      const uArr = aarray<T>(u, 'u');
      if (uArr.length !== vecLen)
        throw new RangeError(`vecCoder.encode: wrong length=${uArr.length}. Expected: ${vecLen}`);
      const res = new Uint8Array(bytesLen);
      for (let i = 0, pos = 0; i < uArr.length; i++) {
        const b = coder.encode(uArr[i] as T);
        res.set(b, pos);
        b.fill(0); // clean
        pos += b.length;
      }
      return res as TRet<Uint8Array>;
    },
    decode: (a: TArg<Uint8Array>): TRet<T[]> => {
      abytes_(a, bytesLen);
      const r: T[] = [];
      for (let i = 0; i < a.length; i += coder.bytesLen)
        r.push(coder.decode(a.subarray(i, i + coder.bytesLen)));
      return r as TRet<T[]>;
    },
  } as any;
}

/**
 * Overwrites supported typed-array inputs with zeroes in place.
 * Accepts direct typed arrays and one-level arrays of them.
 * @param list - Typed arrays or one-level lists of typed arrays to clear.
 * @example
 * Overwrite typed arrays with zeroes.
 * ```ts
 * const buf = Uint8Array.of(1, 2, 3);
 * cleanBytes(buf);
 * ```
 */
export function cleanBytes(...list: (TypedArray | TypedArray[])[]): void {
  for (const t of list) {
    if (Array.isArray(t)) for (const b of t) b.fill(0);
    else t.fill(0);
  }
}

/**
 * Creates a 32-bit mask with the lowest `bits` bits set.
 * @param bits - Number of low bits to keep.
 * @returns Bit mask with `bits` ones.
 * @throws On wrong argument types. {@link TypeError}
 * @throws On wrong argument ranges or values. {@link RangeError}
 * @example
 * Create a low-bit mask for packed-field operations.
 * ```ts
 * const mask = getMask(4);
 * ```
 */
export function getMask(bits: number): number {
  anumber(bits, 'bits');
  if (bits > 32) throw new RangeError('"bits" expected <= 32, got ' + bits);
  // JS shifts are modulo 32, so bit 32 needs an explicit full-width mask.
  return bits === 32 ? 0xffffffff : ~(-1 << bits) >>> 0;
}

/** Shared empty byte array used as the default context. */
export const EMPTY: TRet<Uint8Array> = /* @__PURE__ */ Uint8Array.of();

/**
 * Builds the domain-separated message payload for the pure sign/verify paths.
 * Context length `255` is valid; only `ctx.length > 255` is rejected.
 * @param msg - Message bytes.
 * @param ctx - Optional context bytes.
 * @returns Domain-separated message payload.
 * @throws On wrong argument ranges or values. {@link RangeError}
 * @example
 * Build the domain-separated payload before direct signing.
 * ```ts
 * const payload = getMessage(new Uint8Array([1, 2]));
 * ```
 */
export function getMessage(msg: TArg<Uint8Array>, ctx: TArg<Uint8Array> = EMPTY): TRet<Uint8Array> {
  abytes_(msg, undefined, 'msg');
  abytes_(ctx, undefined, 'ctx');
  if (ctx.length > 255) throw new RangeError('context should be 255 bytes or less');
  return concatBytes(new Uint8Array([0, ctx.length]), ctx, msg);
}

// DER tag+length plus the shared NIST hash OID arc 2.16.840.1.101.3.4.2.* used by the
// FIPS 204 / FIPS 205 pre-hash wrappers; the final byte selects SHA-256, SHA-512, SHAKE128,
// SHAKE256, or another approved hash/XOF under that subtree.
// 06 09 60 86 48 01 65 03 04 02
const oidNistP = /* @__PURE__ */ Uint8Array.from([6, 9, 0x60, 0x86, 0x48, 1, 0x65, 3, 4, 2]);

/**
 * Output length, in bytes, that each XOF OID under this arc denotes.
 *
 * Unlike a fixed hash, an XOF's OID is a promise about the digest length: RFC 8702
 * defines id-shake128 as SHAKE128 with 256-bit output and id-shake256 as SHAKE256 with
 * 512-bit output, and FIPS 204 / FIPS 205 use exactly those pairings for pre-hash. Both
 * bare noble-hashes defaults are half these values, so neither can be signed under its
 * own OID.
 */
const XOF_OID_OUTPUT_LEN: Record<string, number> = /* @__PURE__ */ (() => ({
  '060960864801650304020b': 32, // id-shake128, SHAKE128(M, 256)
  '060960864801650304020c': 64, // id-shake256, SHAKE256(M, 512)
}))();

/**
 * Validates that a hash exposes a NIST hash OID and enough collision resistance.
 * Current accepted surface is broader than the FIPS algorithm tables: any hash/XOF under the NIST
 * `2.16.840.1.101.3.4.2.*` subtree is accepted if its effective `outputLen` is strong enough.
 * XOF callers must pass a callable whose `outputLen` matches the digest length they actually intend
 * to sign; bare `shake128` / `shake256` defaults are too short for the stronger prehash modes.
 * @param hash - Hash function to validate.
 * @param requiredStrength - Minimum required collision-resistance strength in bits.
 * @throws If the hash metadata or collision resistance is insufficient. {@link Error}
 * @example
 * Validate that a hash exposes a NIST hash OID and enough collision resistance.
 * ```ts
 * import { sha256 } from '@noble/hashes/sha2.js';
 * import { checkHash } from '@noble/post-quantum/utils.js';
 * checkHash(sha256, 128);
 * ```
 */
export function checkHash(hash: CHash, requiredStrength: number = 0): void {
  if (typeof hash !== 'function' || typeof (hash as any).create !== 'function')
    throw new TypeError('"hash" expected hash function, got type=' + typeof hash);
  ahash_(hash);
  anumber(requiredStrength, 'requiredStrength');
  const oid = hash.oid as unknown as TArg<Uint8Array>;
  abytes_(oid, undefined, 'hash.oid');
  if (!equalBytes(oid.subarray(0, 10), oidNistP))
    throw new Error('"hash.oid" is invalid: expected NIST hash');
  // FIPS 204 / FIPS 205 require both collision and second-preimage strength; for approved NIST
  // hashes/XOFs under this OID subtree, the collision bound from the configured digest length is
  // the tighter runtime check, so enforce that lower bound here.
  // XOFs under this arc are identified by an OID that fixes their output length:
  // FIPS 204 §5.4.1 (SHAKE128) and FIPS 205 §10.2.2 (both SHAKEs), matching RFC 8702, pair
  // id-shake128 with SHAKE128(M, 256) and id-shake256 with SHAKE256(M, 512). getMessagePrehash embeds
  // hash.oid beside hash(msg), so a shorter digest signs an M' that claims a length
  // it does not have: noble-hashes' bare shake256 defaults to 32 bytes and cleared
  // the collision bound at the 128-bit level, producing signatures a conformant
  // verifier rejects because it recomputes 512 bits. Check the length the OID
  // denotes rather than the generic bound.
  const xofLen = XOF_OID_OUTPUT_LEN[bytesToHex(oid as Uint8Array)];
  if (xofLen !== undefined && hash.outputLen !== xofLen) {
    throw new Error(
      'Pre-hash XOF output length must be ' + xofLen + ' bytes for this OID, got: ' + hash.outputLen
    );
  }
  const collisionResistance = (hash.outputLen * 8) / 2;
  if (requiredStrength > collisionResistance) {
    throw new Error(
      'Pre-hash security strength too low: ' +
        collisionResistance +
        ', required: ' +
        requiredStrength
    );
  }
}

/**
 * Builds the domain-separated prehash payload for the prehash sign/verify paths.
 * Callers are expected to vet `hash.oid` first, e.g. via `checkHash(...)`; calling this helper
 * directly with a hash object that lacks `oid` currently throws later inside `concatBytes(...)`.
 * Context length `255` is valid; only `ctx.length > 255` is rejected.
 * @param hash - Prehash function.
 * @param msg - Message bytes.
 * @param ctx - Optional context bytes.
 * @returns Domain-separated prehash payload.
 * @throws On wrong argument ranges or values. {@link RangeError}
 * @example
 * Build the domain-separated prehash payload for external hashing.
 * ```ts
 * import { sha256 } from '@noble/hashes/sha2.js';
 * import { getMessagePrehash } from '@noble/post-quantum/utils.js';
 * getMessagePrehash(sha256, new Uint8Array([1, 2]));
 * ```
 */
export function getMessagePrehash(
  hash: CHash,
  msg: TArg<Uint8Array>,
  ctx: TArg<Uint8Array> = EMPTY
): TRet<Uint8Array> {
  checkHash(hash);
  abytes_(msg, undefined, 'msg');
  abytes_(ctx, undefined, 'ctx');
  if (ctx.length > 255) throw new RangeError('context should be 255 bytes or less');
  const hashed = hash(msg);
  return concatBytes(new Uint8Array([1, ctx.length]), ctx, hash.oid!, hashed);
}

/**
 * Asserts something is a string.
 * @param value - Value to validate.
 * @param title - Label included in thrown errors.
 * @returns The validated string.
 * @throws On wrong argument types. {@link TypeError}
 * @example
 * Validate a label string.
 *
 * ```ts
 * astring('example', 'label');
 * ```
 */
export function astring(value: unknown, title: string = ''): string {
  if (typeof value !== 'string') {
    const prefix = title && `"${title}" `;
    throw new TypeError(prefix + 'expected string, got type=' + typeof value);
  }
  return value;
}
