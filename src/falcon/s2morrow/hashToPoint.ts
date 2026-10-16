/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import { poseidonHashMany, poseidonSmall } from '@scure/starknet';
import * as starknet from 'starknet';
import { N, QB } from './constants';
import { assertFelt } from './felt';

/**
 * S2morrow Poseidon hash-to-point (same as falcon-rs poseidon_hash.rs and the Cairo contract):
 * seed = poseidon_hash_span(message ‖ salt); state = [seed, 0, 0]; 21 Hades permutations each give
 * 12 base-Q digits from state[0] and 12 from state[1], a 22nd gives the last 8 from state[0].
 * Each felt yields 6 digits from its low u128, then 6 from its high u128.
 * @param {bigint[]} message the felts of the message (here, one felt: the hash to sign)
 * @param {bigint[]} salt the felts of the salt (two felts for this signer)
 * @returns {Uint16Array} the hash point: 512 coefficients in [0, q)
 * @throws {Error} when an element is not a felt252
 * @example
 * ```typescript
 * const result = hashToPoint([42n], [1n, 2n]);
 * // result = Uint16Array(512) [3798, 10958, 659, 9391, …]
 * ```
 */
export function hashToPoint(message: readonly bigint[], salt: readonly bigint[]): Uint16Array {
  message.forEach((m) => assertFelt(m, 'message element'));
  salt.forEach((s) => assertFelt(s, 'salt element'));
  const out = new Uint16Array(N);
  let idx = 0;
  const extract6 = (value: bigint): void => {
    let v = value;
    for (let i = 0; i < 6 && idx < N; i++) {
      out[idx++] = Number(v % QB);
      v /= QB;
    }
  };
  const extract12 = (felt: bigint): void => {
    extract6(felt & starknet.UINT_128_MAX);
    extract6(felt >> 128n);
  };
  let state: bigint[] = [poseidonHashMany([...message, ...salt]), 0n, 0n];
  for (let round = 0; round < 21; round++) {
    state = poseidonSmall(state);
    extract12(state[0]);
    extract12(state[1]);
  }
  state = poseidonSmall(state);
  extract12(state[0]);
  return out;
}
