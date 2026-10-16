/* eslint-disable no-bitwise */
import { runInNewContext } from 'node:vm';
import { encode } from '../../../src';
import { falcon512 } from '../../../src/falcon';
import { falcon512 as nobleFalcon512 } from '../../../src/falcon/engine/noble/falcon';
import { N, Q } from '../../../src/falcon/s2morrow/constants';
// Not exported by starknet/falcon: reached through their module.
import {
  decodePublicKey,
  decodeSecretKey,
  encodePublicKey,
  encodeSecretKey,
  publicKeyToNtt,
  toBytes,
} from '../../../src/falcon/s2morrow/keys';
import { loadFalconRsFixture } from './helpers/falconRsFixture';

const fixture = loadFalconRsFixture();
const { buf2hex } = encode;

describe('NIST key codecs, cross-checked with noble', () => {
  const pairs = [0, 1, 2].map(() => nobleFalcon512.keygen());

  test('secret key decode then encode is byte-exact', () => {
    pairs.forEach(({ secretKey }) => {
      expect(buf2hex(encodeSecretKey(decodeSecretKey(secretKey)))).toBe(buf2hex(secretKey));
    });
  });

  test('falcon512.getPublicKey equals the public key produced by noble', () => {
    pairs.forEach(({ secretKey, publicKey }) => {
      expect(buf2hex(falcon512.getPublicKey(secretKey))).toBe(buf2hex(publicKey));
    });
  });

  test('public key decode then encode is byte-exact, coefficients < q', () => {
    pairs.forEach(({ publicKey }) => {
      const h = decodePublicKey(publicKey);
      expect(Array.from(h).every((v) => v < Q)).toBe(true);
      expect(buf2hex(encodePublicKey(h))).toBe(buf2hex(publicKey));
    });
  });

  test('decodeSecretKey returns the four NTRU polynomials', () => {
    const { f, g, F, G } = decodeSecretKey(pairs[0].secretKey);
    expect([f.length, g.length, F.length, G.length]).toEqual([N, N, N, N]);
  });
});

describe('secret key validation', () => {
  const { secretKey } = nobleFalcon512.keygen();

  test('rejects a wrong length or header', () => {
    expect(() => decodeSecretKey(secretKey.slice(1))).toThrow('1281 bytes');
    const bad = secretKey.slice();
    bad[0] = 0x58;
    expect(() => decodeSecretKey(bad)).toThrow('header');
  });

  test('rejects the forbidden coefficient -32 in f', () => {
    const bad = secretKey.slice();
    bad[1] = 0x80 | (bad[1] & 0x03);
    expect(() => decodeSecretKey(bad)).toThrow('forbidden');
  });

  test('rejects a tampered F (the recomputed G is out of range)', () => {
    const bad = secretKey.slice();
    bad[769] = (bad[769] + 1) & 0xff;
    expect(() => decodeSecretKey(bad)).toThrow('Falcon512: invalid secret key');
  });

  test('rejects a negated F, which only the NTRU equation check catches', () => {
    const { f, g, F } = decodeSecretKey(secretKey);
    const bad = encodeSecretKey({ f, g, F: Int8Array.from(F, (v) => -v) });
    expect(() => decodeSecretKey(bad)).toThrow('NTRU equation not satisfied');
  });

  test('accepts hex strings with or without 0x, in any case', () => {
    const hex = buf2hex(secretKey);
    const expected = buf2hex(falcon512.getPublicKey(secretKey));
    expect(buf2hex(falcon512.getPublicKey(`0x${hex}`))).toBe(expected);
    expect(buf2hex(falcon512.getPublicKey(hex))).toBe(expected);
    expect(buf2hex(falcon512.getPublicKey(hex.toUpperCase()))).toBe(expected);
  });

  test('rejects bad hex, with the expected number of hex digits in the message', () => {
    const hex = buf2hex(secretKey);
    expect(() => falcon512.getPublicKey(`0x${hex.slice(0, -1)}`)).toThrow(
      'secret key must have 2562 hex digits, got 2561'
    );
    expect(() => falcon512.getPublicKey(`0x${hex.slice(0, -2)}`)).toThrow(
      'secret key must have 2562 hex digits, got 2560'
    );
    expect(() => falcon512.getPublicKey(`0xzz${hex.slice(2)}`)).toThrow(
      'secret key is not a valid hex string'
    );
  });

  test('toBytes copies its input', () => {
    const source = new Uint8Array([1, 2, 3]);
    const copy = toBytes(source, 3, 'x');
    source[0] = 9;
    expect(copy[0]).toBe(1);
  });

  test('toBytes accepts a Uint8Array created in another JavaScript realm', () => {
    const foreign = runInNewContext('new Uint8Array([1, 2, 3])');
    expect(foreign instanceof Uint8Array).toBe(false);
    expect(Array.from(toBytes(foreign, 3, 'x'))).toEqual([1, 2, 3]);
  });
});

describe('public key validation', () => {
  const { publicKey } = nobleFalcon512.keygen();

  test('rejects a wrong length or header', () => {
    expect(() => decodePublicKey(publicKey.slice(1))).toThrow('897 bytes');
    const bad = publicKey.slice();
    bad[0] = 0x0a;
    expect(() => decodePublicKey(bad)).toThrow('header');
  });

  test('rejects a coefficient >= q', () => {
    const bad = publicKey.slice();
    bad[1] = 0xff;
    bad[2] |= 0xfc;
    expect(() => decodePublicKey(bad)).toThrow('out of range');
  });
});

describe('falcon512.generateKeyPair', () => {
  test('returns NIST lengths', () => {
    const kp = falcon512.generateKeyPair();
    expect(kp.secretKey).toHaveLength(1281);
    expect(kp.publicKey).toHaveLength(897);
  });

  test('is deterministic for a 48-byte seed', () => {
    const seed = new Uint8Array(48).fill(5);
    expect(buf2hex(falcon512.generateKeyPair(seed).secretKey)).toBe(
      buf2hex(falcon512.generateKeyPair(seed).secretKey)
    );
  });

  test('rejects a seed that is not 48 bytes', () => {
    expect(() => falcon512.generateKeyPair(new Uint8Array(32))).toThrow('48 bytes');
  });
});

describe('falcon-rs key format (reference data generated with the falcon-rs WASM)', () => {
  test('import then export gives back the falcon-rs bytes', () => {
    const nist = falcon512.importFalconRsSecretKey(fixture.secretKey);
    expect(nist).toHaveLength(1281);
    expect(`0x${buf2hex(falcon512.exportFalconRsSecretKey(nist))}`).toBe(fixture.secretKey);
  });

  test('the imported key gives the falcon-rs NTT public key and packed public key', () => {
    const publicKey = falcon512.getPublicKey(falcon512.importFalconRsSecretKey(fixture.secretKey));
    expect(Array.from(publicKeyToNtt(publicKey))).toEqual(fixture.pkNtt);
    expect(falcon512.getPackedPublicKey(publicKey)).toEqual(fixture.packedPublicKey);
  });

  test('rejects a tampered G, a coefficient >= q and a wrong length', () => {
    const tamperedG = toBytes(fixture.secretKey, 3584, 'fixture');
    tamperedG[3 * 896] ^= 0x01;
    expect(() => falcon512.importFalconRsSecretKey(tamperedG)).toThrow('Falcon512: invalid');
    const tooBig = toBytes(fixture.secretKey, 3584, 'fixture');
    tooBig[0] = 0xff;
    tooBig[1] |= 0x3f;
    expect(() => falcon512.importFalconRsSecretKey(tooBig)).toThrow('out of range');
    expect(() => falcon512.importFalconRsSecretKey(tooBig.slice(1))).toThrow('3584 bytes');
  });
});
