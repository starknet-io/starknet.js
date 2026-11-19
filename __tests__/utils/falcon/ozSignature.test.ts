import { constants, num } from '../../../src';
import { falcon512 } from '../../../src/falcon';
import { nobleEngine, type FalconEngine } from '../../../src/falcon/engine/engine';
import { falcon512 as nobleFalcon512 } from '../../../src/falcon/engine/noble/falcon';
import { hashToPointShake } from '../../../src/falcon/oz/hashToPoint';
// Not exported by starknet/falcon (no blind signing): reached through their module.
import {
  formatOzSignature,
  parseOzSignature,
  signHashOz,
  verifyHashOz,
} from '../../../src/falcon/oz/signature';
import { publicKeyToNtt } from '../../../src/falcon/s2morrow/keys';
import { unpackPoly } from '../../../src/falcon/s2morrow/packing';
import { readOzFelts } from './helpers/ozFixtures';

// OpenZeppelin reference data: a 60-felt signature (s1, salt_a, salt_b, hint) of `ozMsg`.
const ozMsg = readOzFelts('fixture', 'msg')[0];
const ozKeyNtt = unpackPoly(readOzFelts('fixture', 'public_key'));
const ozSignature = readOzFelts('fixture', 'signature');

const { secretKey, publicKey } = falcon512.generateKeyPair();
const pkNtt = publicKeyToNtt(publicKey);
const MSG = 0x1234abcdn;

describe('OpenZeppelin signature format, with the OpenZeppelin reference data', () => {
  test('the OZ reference signature (60 felts) is valid as hint', () => {
    expect(verifyHashOz(ozMsg, ozSignature, ozKeyNtt, 'hint')).toBe(true);
  });

  test('its first 31 felts are a valid direct signature', () => {
    expect(verifyHashOz(ozMsg, ozSignature.slice(0, 31), ozKeyNtt, 'direct')).toBe(true);
  });

  test('a hint signature is refused as direct, and a direct one as hint', () => {
    expect(verifyHashOz(ozMsg, ozSignature, ozKeyNtt, 'direct')).toBe(false);
    expect(verifyHashOz(ozMsg, ozSignature.slice(0, 31), ozKeyNtt, 'hint')).toBe(false);
  });

  test('an altered salt felt makes it invalid', () => {
    const altered = [...ozSignature];
    altered[29] += 1n;
    expect(verifyHashOz(ozMsg, altered, ozKeyNtt, 'hint')).toBe(false);
  });

  test('an altered hint felt makes the hint signature invalid', () => {
    const altered = [...ozSignature];
    altered[31] += 1n;
    expect(verifyHashOz(ozMsg, altered, ozKeyNtt, 'hint')).toBe(false);
  });

  test('a salt felt of 2^160 gives false, not an error', () => {
    const altered = [...ozSignature];
    altered[30] = 2n ** 160n;
    expect(verifyHashOz(ozMsg, altered, ozKeyNtt, 'hint')).toBe(false);
  });

  test('parseOzSignature refuses a wrong length', () => {
    expect(() => parseOzSignature(ozSignature.slice(0, 59), 'hint')).toThrow('must have 60 felts');
    expect(() => parseOzSignature(ozSignature, 'direct')).toThrow('must have 31 felts');
  });

  test('formatOzSignature refuses the hint layout without the hint polynomial', () => {
    const sig = { s1: new Uint16Array(512), saltA: 0n, saltB: 0n };
    expect(() => formatOzSignature(sig, 'hint')).toThrow('needs the hint polynomial');
  });
});

describe('signHashOz / verifyHashOz', () => {
  test('round trip with a generated key: 60 felts as hint, 31 as direct', () => {
    const hint = signHashOz(MSG, secretKey, pkNtt, 'hint');
    const direct = signHashOz(MSG, secretKey, pkNtt, 'direct');
    expect(hint).toHaveLength(60);
    expect(direct).toHaveLength(31);
    expect(verifyHashOz(MSG, hint, pkNtt, 'hint')).toBe(true);
    expect(verifyHashOz(MSG, direct, pkNtt, 'direct')).toBe(true);
  });

  test('a message hash of P - 1 signs and verifies', () => {
    const msgHash = constants.PRIME - 1n;
    const sig = signHashOz(msgHash, secretKey, pkNtt, 'hint');
    expect(verifyHashOz(msgHash, sig, pkNtt, 'hint')).toBe(true);
  });

  test('with fixed random bytes, the salt felts are those bytes read little-endian', () => {
    const deps = { engine: nobleEngine, randomBytes: (n: number) => new Uint8Array(n).fill(1) };
    const sig = signHashOz(MSG, secretKey, pkNtt, 'direct', deps);
    const expectedSalt = num.toHex(BigInt(`0x${'01'.repeat(20)}`));
    expect(sig[29]).toBe(expectedSalt);
    expect(sig[30]).toBe(expectedSalt);
  });

  test('self-verification discards a faulty signature (fault injected in the engine)', () => {
    const faulty: FalconEngine = {
      ...nobleEngine,
      signHashPoint: (hashPoint, sk) => {
        const s2 = nobleEngine.signHashPoint(hashPoint, sk);
        s2[0] += 1;
        return s2;
      },
    };
    const deps = { engine: faulty, randomBytes: (n: number) => new Uint8Array(n).fill(7) };
    expect(() => signHashOz(MSG, secretKey, pkNtt, 'hint', deps)).toThrow(
      'self-verification failed'
    );
    expect(() => signHashOz(MSG, secretKey, pkNtt, 'direct', deps)).toThrow(
      'self-verification failed'
    );
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
    const sig = signHashOz(MSG, secretKey, pkNtt, 'hint', { engine, randomBytes: saltRandom });
    const saltFelt = BigInt(`0x${'ab'.repeat(20)}`);
    expect(saltRandom.mock.calls).toEqual([[40]]);
    // The engine receives (hashPoint, secretKey) only: the salt reaches it through the hash point.
    expect(engineCalls).toHaveLength(1);
    expect(engineCalls[0]).toHaveLength(2);
    expect(Array.from(engineCalls[0][0] as Uint16Array)).toEqual(
      Array.from(hashToPointShake(MSG, saltFelt, saltFelt))
    );
    expect(samplerRandom.mock.calls).toEqual([[48]]);
    expect(verifyHashOz(MSG, sig, pkNtt, 'hint')).toBe(true);
  });
});
