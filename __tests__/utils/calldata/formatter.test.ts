import formatter from '../../../src/utils/calldata/formatter';
import { toBigInt } from '../../../src/utils/num';

describe('formatter', () => {
  test('should format one level depth object', () => {
    const data = { value: toBigInt(1000), name: toBigInt(1) };
    const type = { value: 'number', name: 'string' };
    const formatted = formatter(data, type);
    expect(formatted).toEqual({ value: 1000, name: '1' });
  });

  test('should format nested object', () => {
    const data = { user: { id: toBigInt(123), age: toBigInt(30) }, active: toBigInt(1) };
    const type = { user: { id: 'number', age: 'number' }, active: 'number' };
    const formatted = formatter(data, type);
    expect(formatted).toEqual({ user: { id: 123, age: 30 }, active: 1 });
  });

  test('should format object that has arrays in it', () => {
    const data = { items: [toBigInt(1), toBigInt(2), toBigInt(3)], name: toBigInt(1) };
    const type = { items: ['number'], name: 'string' };
    const formatted = formatter(data, type);
    expect(formatted).toEqual({ items: [1, 2, 3], name: '1' });
  });

  test('should throw an error if at least one of the value is not Big Int', () => {
    const data = { value: '123', name: toBigInt(1) };
    const type = { value: 'number', name: 'string' };
    expect(() => formatter(data, type)).toThrow(
      new Error(
        'Data and formatter mismatch on value:number, expected response data value:123 to be BN instead it is string'
      )
    );
  });

  test('should throw an error for unhandled formatter types', () => {
    const data = { value: toBigInt(1) };
    const type = { value: 'symbol' };
    expect(() => formatter(data, type)).toThrow(
      new Error('Unhandled formatter type on value:symbol for data value:1')
    );
  });
});
