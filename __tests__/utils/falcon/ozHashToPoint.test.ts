import { createHash } from 'node:crypto';
import { constants } from '../../../src';
import { hashToPointShake, saltFeltsToBytes } from '../../../src/falcon/oz/hashToPoint';
import { hashToPoint } from '../../../src/falcon/s2morrow/hashToPoint';
import { unpackPoly } from '../../../src/falcon/s2morrow/packing';
import { checkSignatureEquation } from '../../../src/falcon/s2morrow/signature';
import { readOzFelts, readOzFixtureSalt } from './helpers/ozFixtures';

const Q = 12289;

/** x as 32 bytes, least significant byte first. */
const le32 = (x: bigint): Uint8Array =>
  Uint8Array.from({ length: 32 }, (_, i) => Number((x / 256n ** BigInt(i)) % 256n));

/**
 * The OpenZeppelin hash-to-point (README of packages/account, "Key and signature encoding"),
 * written again with the SHAKE-256 of node:crypto: SHAKE-256(salt ‖ hash in 32 LE bytes), read as
 * big-endian 16-bit words, words of 5q or more skipped, the others reduced modulo q.
 */
function referenceHashToPoint(salt: Uint8Array, msgHash: bigint): number[] {
  const input = Buffer.concat([salt, le32(msgHash)]);
  for (let size = 1024; ; size += 136) {
    const stream = createHash('shake256', { outputLength: size }).update(input).digest();
    const out: number[] = [];
    for (let i = 0; i + 1 < size && out.length < 512; i += 2) {
      const word = stream.readUInt16BE(i);
      if (word < 5 * Q) out.push(word % Q);
    }
    if (out.length === 512) return out;
  }
}

// OpenZeppelin reference data: a 60-felt signature (s1, salt_a, salt_b, hint) of `msg`.
const msg = readOzFelts('fixture', 'msg')[0];
const key = readOzFelts('fixture', 'public_key');
const sig = readOzFelts('fixture', 'signature');

describe('OpenZeppelin hash-to-point (SHAKE-256)', () => {
  test('matches an independent SHAKE-256 (node:crypto) on the fixture message and salt', () => {
    const result = hashToPointShake(msg, sig[29], sig[30]);
    expect(Array.from(result)).toEqual(referenceHashToPoint(readOzFixtureSalt(), msg));
  });

  test('the salt in the header of fixture.cairo is its two salt felts, read little-endian', () => {
    expect(saltFeltsToBytes(sig[29], sig[30])).toEqual(readOzFixtureSalt());
  });

  test('the OZ reference signature satisfies the signature equation with this hash point', () => {
    const hashPoint = hashToPointShake(msg, sig[29], sig[30]);
    const s1 = unpackPoly(sig.slice(0, 29));
    const mulHint = unpackPoly(sig.slice(31, 60));
    expect(checkSignatureEquation(hashPoint, s1, mulHint, unpackPoly(key))).toBe(true);
  });

  test('the S2morrow Poseidon hash point does not satisfy it', () => {
    const hashPoint = hashToPoint([msg], [sig[29], sig[30]]);
    const s1 = unpackPoly(sig.slice(0, 29));
    const mulHint = unpackPoly(sig.slice(31, 60));
    expect(checkSignatureEquation(hashPoint, s1, mulHint, unpackPoly(key))).toBe(false);
  });

  test('refuses a salt felt of 2^160, and accepts 2^160 - 1', () => {
    expect(() => hashToPointShake(1n, 2n ** 160n, 0n)).toThrow('below 2^160');
    expect(() => hashToPointShake(1n, 0n, 2n ** 160n)).toThrow('below 2^160');
    expect(saltFeltsToBytes(2n ** 160n - 1n, 0n).slice(0, 20)).toEqual(
      new Uint8Array(20).fill(255)
    );
  });

  test('refuses a message hash outside felt252', () => {
    expect(() => hashToPointShake(-1n, 0n, 0n)).toThrow('felt252');
    expect(() => hashToPointShake(constants.PRIME, 0n, 0n)).toThrow('felt252');
  });
});
