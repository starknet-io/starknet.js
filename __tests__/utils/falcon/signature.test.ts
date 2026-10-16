import { randomBytes } from '@noble/hashes/utils.js';
import { constants, encode, num } from '../../../src';
import { falcon512 } from '../../../src/falcon';
import { nobleEngine, type FalconEngine } from '../../../src/falcon/engine/engine';
import { falcon512 as nobleFalcon512 } from '../../../src/falcon/engine/noble/falcon';
import { PACKED_SLOTS, Q, QB } from '../../../src/falcon/s2morrow/constants';
import { hashToPoint } from '../../../src/falcon/s2morrow/hashToPoint';
import { publicKeyToNtt } from '../../../src/falcon/s2morrow/keys';
// Not exported by starknet/falcon (no blind signing): reached through their module.
import {
  checkSignatureEquation,
  formatSignature,
  parseSignature,
  signHash,
  verifyHash,
  type SignDeps,
} from '../../../src/falcon/s2morrow/signature';
import { loadFalconRsFixture } from './helpers/falconRsFixture';
import { readJsonBig, SerdeReader, toNumbers } from './helpers/fixtures';

const fixture = loadFalconRsFixture();
const { secretKey, publicKey } = falcon512.generateKeyPair();
const pkNtt = publicKeyToNtt(publicKey);
const MSG = 0x1234abcdn;
const OTHER_MSG = 0x1234abcen; // a hash other than MSG

describe('signHash / verifyHash', () => {
  test('round trip; 61 hex felts; salt length 2', () => {
    const sig = signHash(MSG, secretKey, pkNtt);
    expect(sig).toHaveLength(61);
    expect(sig.every((s) => /^0x[0-9a-f]+$/.test(s))).toBe(true);
    expect(sig[PACKED_SLOTS]).toBe('0x2');
    expect(verifyHash(MSG, sig, pkNtt)).toBe(true);
  });

  test('two signatures of the same hash use different salts', () => {
    const a = parseSignature(signHash(MSG, secretKey, pkNtt));
    const b = parseSignature(signHash(MSG, secretKey, pkNtt));
    expect(a.salt).not.toEqual(b.salt);
  });

  test('accepts decimal strings and bigints (e.g. a signature read back from the chain)', () => {
    const sig = signHash(MSG, secretKey, pkNtt);
    const asDecimal = sig.map((x) => BigInt(x).toString(10));
    const asBigInt = sig.map((x) => BigInt(x));
    expect(verifyHash(MSG, asDecimal, pkNtt)).toBe(true);
    expect(verifyHash(MSG, asBigInt, pkNtt)).toBe(true);
  });

  test('rejects another hash, another key and malformed signatures', () => {
    const sig = signHash(MSG, secretKey, pkNtt);
    const otherPkNtt = publicKeyToNtt(falcon512.generateKeyPair().publicKey);
    const withFelt5 = (felt: string): string[] => [...sig.slice(0, 5), felt, ...sig.slice(6)];
    expect(verifyHash(OTHER_MSG, sig, pkNtt)).toBe(false);
    expect(verifyHash(MSG, sig, otherPkNtt)).toBe(false);
    expect(verifyHash(MSG, sig.slice(0, 60), pkNtt)).toBe(false);
    expect(verifyHash(MSG, [...sig.slice(0, 29), '0x3', ...sig.slice(30)], pkNtt)).toBe(false);
    expect(verifyHash(MSG, withFelt5('zz'), pkNtt)).toBe(false);
    expect(verifyHash(MSG, withFelt5(num.toHex(constants.PRIME)), pkNtt)).toBe(false);
    expect(verifyHash(MSG, withFelt5(num.toHex(QB ** 9n)), pkNtt)).toBe(false);
    expect(verifyHash(constants.PRIME, sig, pkNtt)).toBe(false);
  });

  test('each tampered component is rejected', () => {
    const d = parseSignature(signHash(MSG, secretKey, pkNtt));
    const bump = (p: Uint16Array, i: number): Uint16Array => {
      const c = p.slice();
      c[i] = (c[i] + 1) % Q;
      return c;
    };
    const tamperedS1 = formatSignature({ ...d, s1: bump(d.s1, 0) });
    const tamperedHint = formatSignature({ ...d, mulHint: bump(d.mulHint, 100) });
    const tamperedSalt = formatSignature({ ...d, salt: [d.salt[0] + 1n, d.salt[1]] });
    expect(verifyHash(MSG, formatSignature(d), pkNtt)).toBe(true);
    expect(verifyHash(MSG, tamperedS1, pkNtt)).toBe(false);
    expect(verifyHash(MSG, tamperedHint, pkNtt)).toBe(false);
    expect(verifyHash(MSG, tamperedSalt, pkNtt)).toBe(false);
    expect(verifyHash(MSG, formatSignature(d), bump(pkNtt, 7))).toBe(false);
  });

  test('signHash rejects a hash that is not a felt252', () => {
    expect(() => signHash(constants.PRIME, secretKey, pkNtt)).toThrow('out of felt252 range');
  });
});

describe('reference data', () => {
  test('falcon-rs WASM signatures are accepted, and rejected for another hash', () => {
    fixture.signatures.forEach(({ msgHash, signature }) => {
      expect(verifyHash(BigInt(msgHash), signature, fixture.pkNtt)).toBe(true);
      expect(verifyHash(BigInt(msgHash) + 1n, signature, fixture.pkNtt)).toBe(false);
    });
  });

  test('the Rust/Cairo verify_test signature (message [42], salt [1, 2]) is accepted', () => {
    const reader = new SerdeReader(readJsonBig('cairo/verify_test_int.json').verify_test);
    const message = reader.array();
    const salt = reader.array();
    const refPkNtt = toNumbers(reader.array());
    const s1 = Uint16Array.from(toNumbers(reader.array()));
    const mulHint = Uint16Array.from(toNumbers(reader.array()));
    expect(reader.done()).toBe(true);
    expect(message).toEqual([42n]);
    expect(checkSignatureEquation(hashToPoint(message, salt), s1, mulHint, refPkNtt)).toBe(true);
    expect(verifyHash(42n, formatSignature({ s1, salt, mulHint }), refPkNtt)).toBe(true);
  });
});

describe('dependability', () => {
  test('self-verification discards a faulty signature (fault injected in the engine)', () => {
    const faulty: FalconEngine = {
      ...nobleEngine,
      signHashPoint: (hashPoint, sk) => {
        const s2 = nobleEngine.signHashPoint(hashPoint, sk);
        s2[0] += 1;
        return s2;
      },
    };
    const deps: SignDeps = { engine: faulty, randomBytes };
    expect(() => signHash(MSG, secretKey, pkNtt, deps)).toThrow('self-verification failed');
  });

  test('the sampler seed never comes from the salt bytes', () => {
    const saltRandom = jest.fn((n: number) => new Uint8Array(n).fill(0xab));
    const samplerRandom = jest.fn((n?: number) => new Uint8Array(n ?? 0).fill(0x11));
    const engineCalls: unknown[][] = [];
    const engine: FalconEngine = {
      ...nobleEngine,
      signHashPoint: (...args) => {
        engineCalls.push(args);
        return nobleFalcon512.internal.sign(args[0], args[1], { random: samplerRandom });
      },
    };
    const sig = signHash(MSG, secretKey, pkNtt, { engine, randomBytes: saltRandom });
    const saltFelt = BigInt(`0x${'ab'.repeat(31)}`);
    expect(saltRandom.mock.calls).toEqual([[31], [31]]);
    // The engine receives (hashPoint, secretKey) only: the salt reaches it through the hash point.
    expect(engineCalls).toHaveLength(1);
    expect(engineCalls[0]).toHaveLength(2);
    expect(Array.from(engineCalls[0][0] as Uint16Array)).toEqual(
      Array.from(hashToPoint([MSG], [saltFelt, saltFelt]))
    );
    expect(samplerRandom.mock.calls).toEqual([[48]]);
    expect(verifyHash(MSG, sig, pkNtt)).toBe(true);
  });

  test('with the default engine, a fixed salt still gives a different s1 (fresh sampler seed)', () => {
    const fixedSalt = (n: number): Uint8Array => new Uint8Array(n).fill(0x42);
    const deps: SignDeps = { engine: nobleEngine, randomBytes: fixedSalt };
    const a = parseSignature(signHash(MSG, secretKey, pkNtt, deps));
    const b = parseSignature(signHash(MSG, secretKey, pkNtt, deps));
    expect(a.salt).toEqual(b.salt);
    expect(Array.from(a.s1)).not.toEqual(Array.from(b.s1));
  });
});

describe('randomized', () => {
  test('5 keys x 4 hashes: valid for its own key, invalid for another key', () => {
    const keys = Array.from({ length: 5 }, () => {
      const kp = falcon512.generateKeyPair();
      return { sk: kp.secretKey, pkNtt: publicKeyToNtt(kp.publicKey) };
    });
    for (let k = 0; k < keys.length; k += 1) {
      for (let m = 0; m < 4; m += 1) {
        const h = BigInt(`0x${encode.buf2hex(randomBytes(31))}`);
        const sig = signHash(h, keys[k].sk, keys[k].pkNtt);
        expect(verifyHash(h, sig, keys[k].pkNtt)).toBe(true);
        expect(verifyHash(h, sig, keys[(k + 1) % keys.length].pkNtt)).toBe(false);
      }
    }
  });
});
