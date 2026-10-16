import { N, Q } from '../../../src/falcon/s2morrow/constants';
import {
  divZq,
  intt,
  invMod,
  modQ,
  mulNegacyclicInt,
  mulZq,
  ntt,
  nttRoots,
} from '../../../src/falcon/s2morrow/ntt';
import { NTT_ROOTS_ALL } from '../../../src/falcon/s2morrow/nttRoots';
import { readJsonBig, SerdeReader, toNumbers } from './helpers/fixtures';

const randomPoly = (n = N): number[] =>
  Array.from({ length: n }, () => Math.floor(Math.random() * Q));
const cairoInput = (file: string): number[] =>
  toNumbers(new SerdeReader(readJsonBig(`cairo/${file}`).input).array());

describe('NTT roots table', () => {
  test('has 1022 entries', () => {
    expect(NTT_ROOTS_ALL).toHaveLength(1022);
  });

  test('roots at size n are roots of x^n + 1, grouped in (r, -r) pairs', () => {
    for (let n = 2; n <= N; n *= 2) {
      const w = nttRoots(n);
      expect(w).toHaveLength(n);
      for (let i = 0; i < n; i += 1) expect(BigInt(w[i]) ** BigInt(n) % 12289n).toBe(12288n);
      for (let i = 0; i < n; i += 2) expect(w[i] + w[i + 1]).toBe(Q);
    }
  });
});

describe('ntt / intt', () => {
  test('round trip on random polynomials', () => {
    for (let k = 0; k < 5; k += 1) {
      const f = randomPoly();
      expect(intt(ntt(f))).toEqual(f);
    }
  });

  test('accepts negative coefficients', () => {
    const f = randomPoly().map((v) => v - 6144);
    expect(intt(ntt(f))).toEqual(f.map(modQ));
  });

  test('rejects sizes that are not a power of 2', () => {
    expect(() => ntt(new Array(511).fill(0))).toThrow('power of 2');
  });

  test('matches the Cairo reference data (s2morrow tests/data)', () => {
    const nttInput = cairoInput('ntt_input_512_int.json');
    const inttInput = cairoInput('intt_input_512_int.json');
    const inttExpected = cairoInput('intt_expected_512_int.json');
    expect(ntt(nttInput)).toEqual(inttInput);
    expect(intt(inttInput)).toEqual(inttExpected);
  });
});

describe('polynomial arithmetic', () => {
  test('mulNegacyclicInt on small known values', () => {
    expect(mulNegacyclicInt([1, 1, 0, 0], [1, 1, 0, 0])).toEqual([1, 2, 1, 0]);
    expect(mulNegacyclicInt([1, 0, 0, 1], [1, 0, 0, 1])).toEqual([1, 0, -1, 2]);
  });

  test('mulZq equals the schoolbook negacyclic product mod q', () => {
    const a = randomPoly();
    const b = randomPoly();
    expect(mulZq(a, b)).toEqual(mulNegacyclicInt(a, b).map(modQ));
  });

  test('divZq inverts mulZq', () => {
    const a = randomPoly();
    let b = randomPoly();
    while (ntt(b).includes(0)) b = randomPoly();
    expect(divZq(mulZq(a, b), b)).toEqual(a);
  });

  test('divZq rejects a non-invertible divisor', () => {
    expect(() => divZq(randomPoly(), new Array(N).fill(0))).toThrow('not invertible');
  });

  test('invMod', () => {
    expect((invMod(1479) * 1479) % Q).toBe(1);
    expect(() => invMod(0)).toThrow();
  });
});
