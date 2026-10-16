import { constants } from '../../../src';
import { N, Q } from '../../../src/falcon/s2morrow/constants';
import { hashToPoint } from '../../../src/falcon/s2morrow/hashToPoint';
import { readJsonBig, SerdeReader, toNumbers } from './helpers/fixtures';

describe('hashToPoint (Poseidon, S2morrow)', () => {
  test('matches the Rust/Cairo reference data: message [42], salt [1, 2]', () => {
    const reader = new SerdeReader(
      readJsonBig('cairo/hash_to_point_test_int.json').hash_to_point_test
    );
    const message = reader.array();
    const salt = reader.array();
    const expected = toNumbers(reader.array());
    expect(reader.done()).toBe(true);
    expect(message).toEqual([42n]);
    expect(salt).toEqual([1n, 2n]);
    expect(Array.from(hashToPoint(message, salt))).toEqual(expected);
  });

  test('returns 512 coefficients in [0, q)', () => {
    const c = hashToPoint([123n], [4n, 5n]);
    expect(c).toHaveLength(N);
    expect(Array.from(c).every((v) => v < Q)).toBe(true);
  });

  test('is deterministic and depends on message and salt', () => {
    const a = Array.from(hashToPoint([1n], [2n, 3n]));
    expect(Array.from(hashToPoint([1n], [2n, 3n]))).toEqual(a);
    expect(Array.from(hashToPoint([2n], [2n, 3n]))).not.toEqual(a);
    expect(Array.from(hashToPoint([1n], [2n, 4n]))).not.toEqual(a);
  });

  test('rejects values that are not felt252', () => {
    expect(() => hashToPoint([constants.PRIME], [1n, 2n])).toThrow('out of felt252 range');
    expect(() => hashToPoint([1n], [-1n, 2n])).toThrow('out of felt252 range');
  });
});
