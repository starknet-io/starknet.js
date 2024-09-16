import {
  isUndefined,
  isBigInt,
  isBoolean,
  isNumber,
  isString,
  isObject,
} from '../../src/utils/typed';

describe('isUndefined', () => {
  test('should return true if value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('should return false if value is not undefined', () => {
    const value = 'existing value';
    expect(isUndefined(value)).toBe(false);
  });
});

describe('isNumber', () => {
  test('should correctly determine if value is a number', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(123)).toBe(true);
    expect(isNumber(-123)).toBe(true);

    expect(isNumber(123n)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});

describe('isBoolean', () => {
  test('should correctly determine if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);

    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('false')).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});

describe('isBigInt', () => {
  test('should return true for big integers', () => {
    expect(isBigInt(BigInt(10))).toBe(true);
    expect(isBigInt(BigInt('9007199254740991'))).toBe(true);
  });

  test('should return false for non-big integers', () => {
    expect(isBigInt(10)).toBe(false);
    expect(isBigInt('10')).toBe(false);
    expect(isBigInt(undefined)).toBe(false);
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt({})).toBe(false);
    expect(isBigInt([])).toBe(false);
    expect(isBigInt(true)).toBe(false);
  });
});

describe('isString', () => {
  test('should return true for strings', () => {
    expect(isString('test')).toBe(true);
    expect(isString('')).toBe(true);
  });

  test('should return false for non-string values', () => {
    expect(isString(10)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(true)).toBe(false);
  });
});

describe('isObject', () => {
  test('should return true if value is object', () => {
    expect(isObject({ test: 'test' })).toEqual(true);
    expect(isObject({})).toEqual(true);
  });

  test('should return false if value is not object', () => {
    expect(isObject(10)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject(true)).toBe(false);
  });
});
