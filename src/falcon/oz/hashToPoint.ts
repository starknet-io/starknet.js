/* eslint-disable no-bitwise */
// Hash-to-point of the OpenZeppelin Falcon-512 accounts (OpenZeppelin Contracts for Cairo
// v4.1.0-rc.0, README of packages/account, "Key and signature encoding").
import { shake256 } from '@noble/hashes/sha3.js';
import { N, Q } from '../s2morrow/constants';
import { assertFelt } from '../s2morrow/felt';

/** Number of bytes that one salt felt of an OpenZeppelin signature encodes. */
export const SALT_BYTES = 20;

/** A salt felt must be below 2^160 (20 bytes). */
const SALT_LIMIT = 1n << BigInt(8 * SALT_BYTES);

/** Words of 5q or more are skipped: 61445 is the largest multiple of q below 2^16. */
const KQ = 5 * Q;

/**
 * Writes x into out[offset … offset + length - 1], least significant byte first.
 * @param {bigint} x the value to write; it must fit in `length` bytes
 * @param {Uint8Array} out the array that receives the bytes
 * @param {number} offset index of the first byte to write
 * @param {number} length number of bytes to write
 * @example
 * ```typescript
 * const out = new Uint8Array(4);
 * writeLittleEndian(0x0102n, out, 0, 4);
 * // out = Uint8Array(4) [2, 1, 0, 0]
 * ```
 */
const writeLittleEndian = (x: bigint, out: Uint8Array, offset: number, length: number): void => {
  let v = x;
  for (let i = 0; i < length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    out[offset + i] = Number(v & 0xffn);
    v >>= 8n;
  }
};

/**
 * The 40 bytes of the salt of an OpenZeppelin signature: salt_a, then salt_b, each on 20 bytes,
 * least significant byte first.
 * @param {bigint} saltA the first salt felt
 * @param {bigint} saltB the second salt felt
 * @returns {Uint8Array} the 40 bytes of the salt
 * @throws {Error} when a salt felt is negative, or not below 2^160
 * @example
 * ```typescript
 * const result = saltFeltsToBytes(1n, 2n);
 * // result = Uint8Array(40) [1, 0, 0, …, 2, 0, 0, …] (1 at index 0, 2 at index 20)
 * ```
 */
export function saltFeltsToBytes(saltA: bigint, saltB: bigint): Uint8Array {
  [saltA, saltB].forEach((salt) => {
    if (typeof salt !== 'bigint' || salt < 0n || salt >= SALT_LIMIT) {
      throw new Error('Falcon512: salt felt must be non-negative and below 2^160');
    }
  });
  const out = new Uint8Array(2 * SALT_BYTES);
  writeLittleEndian(saltA, out, 0, SALT_BYTES);
  writeLittleEndian(saltB, out, SALT_BYTES, SALT_BYTES);
  return out;
}

/**
 * OpenZeppelin hash-to-point: SHAKE-256 over salt_a (20 bytes) ‖ salt_b (20 bytes) ‖ the message
 * hash (32 bytes), all little-endian. The output is read as big-endian 16-bit words; words of 5q
 * (61445) or more are skipped, the others are reduced modulo q, until there are 512 coefficients.
 * This is the HashToPoint of the Falcon submission, with the 40 salt bytes as its nonce.
 * @param {bigint} msgHash the hash to sign, a felt252
 * @param {bigint} saltA the first salt felt, below 2^160
 * @param {bigint} saltB the second salt felt, below 2^160
 * @returns {Uint16Array} the hash point: 512 coefficients in [0, q)
 * @throws {Error} when msgHash is not a felt252, or a salt felt is not below 2^160
 * @example
 * ```typescript
 * const result = hashToPointShake(42n, 1n, 2n);
 * // result = Uint16Array(512) [5836, 973, 11428, 8040, …]
 * ```
 */
export function hashToPointShake(msgHash: bigint, saltA: bigint, saltB: bigint): Uint16Array {
  assertFelt(msgHash, 'message hash');
  const message = new Uint8Array(32);
  writeLittleEndian(msgHash, message, 0, 32);
  const xof = shake256.create().update(saltFeltsToBytes(saltA, saltB)).update(message);
  const out = new Uint16Array(N);
  for (let i = 0; i < N;) {
    const [high, low] = xof.xof(2);
    const word = (high << 8) | low;
    if (word < KQ) {
      out[i] = word % Q;
      i += 1;
    }
  }
  return out;
}
