import { concatBytes, hexToBytes } from '@noble/hashes/utils.js';
import nistMlKem768 from '../../../__mocks__/falcon/nistMlKem768.json';
import { ml_kem768, nobleEngine } from '../../../src/falcon/engine/engine';
import { falcon512 } from '../../../src/falcon/engine/noble/falcon';

const N = 512;
const Q = 12289;
const randomHashPoint = (): Uint16Array =>
  Uint16Array.from({ length: N }, () => Math.floor(Math.random() * Q));
const { secretKey, publicKey } = falcon512.keygen();

describe('patched noble: falcon512.internal', () => {
  test('sign returns an s2 accepted by verify', () => {
    const hp = randomHashPoint();
    const s2 = falcon512.internal.sign(hp, secretKey);
    expect(s2).toBeInstanceOf(Int16Array);
    expect(s2).toHaveLength(N);
    expect(falcon512.internal.verify(s2, hp, publicKey)).toBe(true);
  });

  test('verify rejects s2 for another hash point', () => {
    const s2 = falcon512.internal.sign(randomHashPoint(), secretKey);
    expect(falcon512.internal.verify(s2, randomHashPoint(), publicKey)).toBe(false);
  });

  test('sign does not modify the caller hash point', () => {
    const hp = randomHashPoint();
    const copy = hp.slice();
    falcon512.internal.sign(hp, secretKey);
    expect(Array.from(hp)).toEqual(Array.from(copy));
  });

  test('sign is deterministic with an injected random, drawn once for 48 bytes', () => {
    const hp = randomHashPoint();
    const random = jest.fn((n?: number) => new Uint8Array(n ?? 0).fill(7));
    const a = falcon512.internal.sign(hp, secretKey, { random });
    const b = falcon512.internal.sign(hp, secretKey, { random });
    expect(Array.from(a)).toEqual(Array.from(b));
    expect(random.mock.calls).toEqual([[48], [48]]);
  });

  test('sign throws when the iteration cap is exhausted', () => {
    expect(() =>
      falcon512.internal.sign(randomHashPoint(), secretKey, { maxIterations: 0 })
    ).toThrow('iteration cap');
  });

  test('sign and verify reject malformed inputs', () => {
    const hp = randomHashPoint();
    expect(() => falcon512.internal.sign(hp.slice(1), secretKey)).toThrow('hashPoint');
    const bad = hp.slice();
    bad[3] = Q;
    expect(() => falcon512.internal.sign(bad, secretKey)).toThrow('out of range');
    expect(() => falcon512.internal.sign(hp, secretKey.slice(1))).toThrow();
    const s2 = falcon512.internal.sign(hp, secretKey);
    expect(() => falcon512.internal.verify(s2.slice(1), hp, publicKey)).toThrow('s2');
  });

  test('the upstream detached API still works', () => {
    const msg = new Uint8Array([1, 2, 3]);
    expect(falcon512.verify(falcon512.sign(msg, secretKey), msg, publicKey)).toBe(true);
  });
});

describe('nobleEngine', () => {
  test('keygen returns NIST lengths and getPublicKey agrees', () => {
    const kp = nobleEngine.keygen();
    expect(kp.secretKey).toHaveLength(1281);
    expect(kp.publicKey).toHaveLength(897);
    expect(Array.from(nobleEngine.getPublicKey(kp.secretKey))).toEqual(Array.from(kp.publicKey));
  });

  test('signHashPoint / verifyHashPoint round trip', () => {
    const hp = randomHashPoint();
    const s2 = nobleEngine.signHashPoint(hp, secretKey);
    expect(nobleEngine.verifyHashPoint(s2, hp, publicKey)).toBe(true);
  });
});

// The copy of noble for ML-KEM-768 (`noble/ml-kem.ts`) must give the results that the NIST gives
// for FIPS 203. Data and source: __mocks__/falcon/README.md.
describe('noble copy: ML-KEM-768 gives the results of the NIST', () => {
  test('creating the keys: from d and z, the expected public key and secret key', () => {
    const { keyGen } = nistMlKem768;
    // The seed is d, then z (64 bytes). It is also the seed that `mlkem.createKey` gives to Alice.
    const seed = concatBytes(hexToBytes(keyGen.d), hexToBytes(keyGen.z));
    const { publicKey: ek, secretKey: dk } = ml_kem768.keygen(seed);
    expect(ek).toEqual(hexToBytes(keyGen.ek));
    expect(dk).toEqual(hexToBytes(keyGen.dk));
  });

  test('encapsulation: from a public key and a random value, the expected capsule and secret', () => {
    const { encapsulation } = nistMlKem768;
    // noble calls the capsule `cipherText`.
    const { cipherText, sharedSecret } = ml_kem768.encapsulate(
      hexToBytes(encapsulation.ek),
      hexToBytes(encapsulation.m)
    );
    expect(cipherText).toEqual(hexToBytes(encapsulation.c));
    expect(sharedSecret).toEqual(hexToBytes(encapsulation.k));
  });

  test('decapsulation: from a secret key and a capsule, the expected secret', () => {
    const { decapsulation } = nistMlKem768;
    const sharedSecret = ml_kem768.decapsulate(
      hexToBytes(decapsulation.c),
      hexToBytes(decapsulation.dk)
    );
    expect(sharedSecret).toEqual(hexToBytes(decapsulation.k));
  });
});
