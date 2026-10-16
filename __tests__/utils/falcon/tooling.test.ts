import { chacha20 } from '@noble/ciphers/chacha.js';
import { randomBytes } from '@noble/hashes/utils.js';
import { poseidonHashMany, poseidonSmall } from '@scure/starknet';
import { hash, num } from '../../../src';

describe('tooling: ESM-only packages under Jest', () => {
  test('@scure/starknet Poseidon matches starknet.js', () => {
    expect(hash.computePoseidonHashOnElements([1n, 2n])).toBe(
      num.toHex(poseidonHashMany([1n, 2n]))
    );
    expect(poseidonSmall([1n, 2n, 3n])).toHaveLength(3);
  });

  test('@noble/hashes and @noble/ciphers load', () => {
    expect(randomBytes(48)).toHaveLength(48);
    expect(chacha20(new Uint8Array(32), new Uint8Array(12), new Uint8Array(4))).toHaveLength(4);
  });
});
