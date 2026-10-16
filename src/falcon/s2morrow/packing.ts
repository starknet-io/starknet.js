/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import * as starknet from 'starknet';
import { N, PACKED_SLOTS, Q, QB, VALUES_PER_HALF } from './constants';
import { assertFelt } from './felt';

/**
 * Horner evaluation in base q of values[start..end): values[start] + values[start + 1]·q + …
 * @param {ArrayLike<number>} values the Zq values
 * @param {number} start index of the first value (lowest power of q)
 * @param {number} end index after the last value
 * @returns {bigint} the packed number
 * @example
 * ```typescript
 * const result = horner([1, 2], 0, 2);
 * // result = 24579n   (1 + 2 × 12289)
 * ```
 */
const horner = (values: ArrayLike<number>, start: number, end: number): bigint => {
  let acc = 0n;
  for (let i = end - 1; i >= start; i--) acc = acc * QB + BigInt(values[i]);
  return acc;
};

/**
 * Packs 512 Zq values into 29 felt252 (falcon-rs packing.rs / Cairo packing.cairo):
 * felt = horner(v0..v8) + horner(v9..v17) * 2^128; the last felt holds 8 values in its low half.
 * @param {ArrayLike<number>} poly 512 integers in [0, q)
 * @returns {bigint[]} the 29 packed felts
 * @throws {Error} when poly does not have 512 coefficients, or one of them is not in [0, q)
 * @example
 * ```typescript
 * const result = packPoly(Array.from({ length: 512 }, (_, i) => i));
 * // result = [3009220298763626926401032896359925372832289177998513310902944456849637412n, …] (29 felts)
 * ```
 */
export function packPoly(poly: ArrayLike<number>): bigint[] {
  if (poly.length !== N) throw new Error(`Falcon512: polynomial must have ${N} coefficients`);
  for (let i = 0; i < N; i++) {
    const v = poly[i];
    if (!Number.isInteger(v) || v < 0 || v >= Q) {
      throw new Error('Falcon512: polynomial coefficient out of range');
    }
  }
  const out: bigint[] = [];
  for (let start = 0; start < N; start += 2 * VALUES_PER_HALF) {
    const mid = Math.min(start + VALUES_PER_HALF, N);
    const end = Math.min(start + 2 * VALUES_PER_HALF, N);
    out.push(horner(poly, start, mid) + (horner(poly, mid, end) << 128n));
  }
  return out;
}

/**
 * Unpacks 29 felt252 into 512 Zq values; only the canonical encoding is accepted.
 * @param {bigint[]} felts the 29 packed felts
 * @returns {Uint16Array} the 512 values, in [0, q)
 * @throws {Error} when there are not 29 felts, a felt is out of range, or the encoding is not
 * canonical
 * @example
 * ```typescript
 * const result = unpackPoly(packPoly(Array.from({ length: 512 }, (_, i) => i)));
 * // result = Uint16Array(512) [0, 1, 2, 3, …]
 * unpackPoly(new Array(28).fill(0n));
 * // throws Error("Falcon512: packed polynomial must have 29 felts")
 * ```
 */
export function unpackPoly(felts: readonly bigint[]): Uint16Array {
  if (felts.length !== PACKED_SLOTS) {
    throw new Error(`Falcon512: packed polynomial must have ${PACKED_SLOTS} felts`);
  }
  const out = new Uint16Array(N);
  let idx = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const felt of felts) {
    assertFelt(felt, 'packed polynomial slot');
    // eslint-disable-next-line no-restricted-syntax
    for (const half of [felt & starknet.UINT_128_MAX, felt >> 128n]) {
      const count = Math.min(VALUES_PER_HALF, N - idx);
      if (half >= QB ** BigInt(count)) {
        throw new Error('Falcon512: non-canonical packed polynomial');
      }
      let v = half;
      for (let i = 0; i < count; i++) {
        out[idx++] = Number(v % QB);
        v /= QB;
      }
    }
  }
  return out;
}
