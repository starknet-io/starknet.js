import { constants } from '../../../src';
import { N, PACKED_SLOTS, Q, QB } from '../../../src/falcon/s2morrow/constants';
import { parseFelt } from '../../../src/falcon/s2morrow/felt';
import { packPoly, unpackPoly } from '../../../src/falcon/s2morrow/packing';
import { readJsonBig, SerdeReader, toNumbers } from './helpers/fixtures';

const randomPoly = (): number[] => Array.from({ length: N }, () => Math.floor(Math.random() * Q));

describe('packPoly / unpackPoly (base-Q, 29 felts)', () => {
  test('matches the Rust/Cairo reference data', () => {
    const reader = new SerdeReader(readJsonBig('cairo/packing_test_int.json').packing_test);
    const values = toNumbers(reader.array());
    const packed = reader.array();
    expect(reader.done()).toBe(true);
    expect(packPoly(values)).toEqual(packed);
    expect(Array.from(unpackPoly(packed))).toEqual(values);
  });

  test('round trip of a random polynomial', () => {
    const p = randomPoly();
    const packed = packPoly(p);
    expect(packed).toHaveLength(PACKED_SLOTS);
    expect(Array.from(unpackPoly(packed))).toEqual(p);
  });

  test('round trip of the zero polynomial', () => {
    const p = new Array(N).fill(0);
    const packed = packPoly(p);
    expect(packed).toHaveLength(PACKED_SLOTS);
    expect(Array.from(unpackPoly(packed))).toEqual(p);
  });

  test('round trip of a polynomial with all coefficients at q - 1', () => {
    const p = new Array(N).fill(Q - 1);
    const packed = packPoly(p);
    expect(packed).toHaveLength(PACKED_SLOTS);
    expect(Array.from(unpackPoly(packed))).toEqual(p);
  });

  test('packPoly rejects bad polynomials', () => {
    expect(() => packPoly(new Array(N - 1).fill(0))).toThrow('512 coefficients');
    const p = randomPoly();
    p[7] = Q;
    expect(() => packPoly(p)).toThrow('out of range');
    p[7] = -1;
    expect(() => packPoly(p)).toThrow('out of range');
    p[7] = 1.5;
    expect(() => packPoly(p)).toThrow('out of range');
  });

  test('unpackPoly rejects non-canonical encodings', () => {
    const packed = packPoly(randomPoly());
    expect(() => unpackPoly(packed.slice(0, 28))).toThrow('29 felts');
    expect(() => unpackPoly([...packed, 0n])).toThrow('29 felts');
    const lowTooBig = [...packed];
    lowTooBig[0] = QB ** 9n;
    expect(() => unpackPoly(lowTooBig)).toThrow('non-canonical');
    const highTooBig = [...packed];
    highTooBig[0] = QB ** 9n * 2n ** 128n;
    expect(() => unpackPoly(highTooBig)).toThrow('non-canonical');
    const lastHigh = [...packed];
    lastHigh[28] = packed[28] + 2n ** 128n;
    expect(() => unpackPoly(lastHigh)).toThrow('non-canonical');
    const lastLow = [...packed];
    lastLow[28] = QB ** 8n;
    expect(() => unpackPoly(lastLow)).toThrow('non-canonical');
    const notFelt = [...packed];
    notFelt[3] = constants.PRIME;
    expect(() => unpackPoly(notFelt)).toThrow('out of felt252 range');
  });
});

describe('parseFelt', () => {
  test('accepts a bigint, a safe integer, a hex string and a decimal string', () => {
    expect(parseFelt(5n, 'x')).toBe(5n);
    expect(parseFelt(5, 'x')).toBe(5n);
    expect(parseFelt('0x1F', 'x')).toBe(31n);
    expect(parseFelt('31', 'x')).toBe(31n);
  });

  test('rejects what is not the spelling of a felt252', () => {
    expect(() => parseFelt('', 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(' ', 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt('0x', 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt('zz', 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt('-1', 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(1.5, 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(-1n, 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(true, 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(null, 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt(undefined, 'x')).toThrow('x is not a felt252');
    expect(() => parseFelt({}, 'x')).toThrow('x is not a felt252');
  });

  test('rejects a value out of the felt252 range', () => {
    expect(() => parseFelt(constants.PRIME, 'x')).toThrow('out of felt252 range');
  });

  test('rejects a string longer than any felt252, before converting it', () => {
    expect(parseFelt(`0x${'0'.repeat(63)}1`, 'x')).toBe(1n);
    expect(() => parseFelt(`0x${'0'.repeat(64)}1`, 'x')).toThrow('x is not a felt252');
    expect(parseFelt((constants.PRIME - 1n).toString(), 'x')).toBe(constants.PRIME - 1n);
    expect(() => parseFelt('1'.repeat(77), 'x')).toThrow('x is not a felt252');
  });
});
