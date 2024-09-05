import assert from '../../src/utils/assert';

describe('assert', () => {
  test('should throw an error if condition is not true', () => {
    expect(() => assert(false)).toThrow(new Error('Assertion failure'));
  });

  test('should throw an error with a specific message', () => {
    expect(() => assert(false, 'Error message')).toThrow(new Error('Error message'));
  });

  test('should not throw an error if condition is true', () => {
    expect(() => assert(true)).toBeTruthy();
  });
});
