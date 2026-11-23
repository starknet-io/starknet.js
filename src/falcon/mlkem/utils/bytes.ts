import { isBytes } from '@noble/hashes/utils.js';
import * as starknet from 'starknet';

/**
 * Checks that a value is a Uint8Array of the expected size.
 * @param {unknown} value the value to check
 * @param {number} size the expected number of bytes
 * @param {string} name the name of the value, for the error message
 * @returns {Uint8Array} the value
 * @throws {Error} when the value is not a Uint8Array of this size
 * @example
 * ```typescript
 * const result = checkBytes(new Uint8Array(64), 64, 'seed');
 * // result = the same Uint8Array
 * checkBytes('0x1234', 64, 'seed');
 * // throws Error('ML-KEM: the seed must be a Uint8Array of 64 bytes.')
 * ```
 */
export function checkBytes(value: unknown, size: number, name: string): Uint8Array {
  if (!isBytes(value) || value.length !== size) {
    throw new Error(`ML-KEM: the ${name} must be a Uint8Array of ${size} bytes.`);
  }
  return value;
}

/**
 * Hash of bytes, with Poseidon. The bytes are cut into groups of 31 bytes, in order. Each group
 * becomes one felt, with its first byte as the highest byte (big-endian). The last group holds the
 * bytes that are left.
 *
 * Use it only for bytes of a fixed size: an ML-KEM-768 public key (1184 bytes, so 39 felts) or a
 * capsule (1088 bytes, so 36 felts). With a fixed size, two different series of bytes always give
 * different felts.
 * @param {Uint8Array} bytes the bytes to hash
 * @returns {string} the hash: one felt, in hex
 * @example
 * ```typescript
 * const result = hashBytes(new Uint8Array(32).fill(1));
 * // The felts are 0x0101…01 (31 bytes) and 0x01 (1 byte).
 * // result = '0x56657fe3500667466b4fc95fff44a7e6799c982fff4c85fbd18a5641b51f70d'
 * ```
 */
export function hashBytes(bytes: Uint8Array): string {
  // 31 bytes always fit in a felt. It is also the maximum length of a short string.
  const groupSize = starknet.constants.TEXT_TO_FELT_MAX_LEN;
  const felts: string[] = [];
  for (let start = 0; start < bytes.length; start += groupSize) {
    const group = bytes.subarray(start, start + groupSize);
    felts.push(starknet.encode.addHexPrefix(starknet.encode.buf2hex(group)));
  }
  return starknet.hash.computePoseidonHashOnElements(felts);
}
