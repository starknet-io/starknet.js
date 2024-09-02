import { isUndefined } from '../../src/utils/typed';

describe('isUndefined', () => {
  test('should return true if value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('should return false if value is not undefined', () => {
    const value = 'existing value';
    expect(isUndefined(value)).toBe(false);
  });
});
