/* eslint-disable no-new */
import { Cairoint128, INT_128_MAX, INT_128_MIN } from '../../../src/utils/cairoDataTypes/int128';

describe('Cairoint128 class test', () => {
  test('constructor 1 should throw on < INT_128_MIN', () => {
    expect(() => {
      new Cairoint128(INT_128_MIN - 1n);
    }).toThrow('bigNumberish is smaller than the int minimum');
  });

  test('constructor should throw on > INT_128_MAX', () => {
    expect(() => {
      new Cairoint128(INT_128_MAX + 1n);
    }).toThrow('bigNumberish is bigger than the int maximum');
  });

  test('should convert INT_128_MAX to API Request', () => {
    const i128 = new Cairoint128(INT_128_MAX);
    expect(i128.toApiRequest()).toEqual('170141183460469231731687303715884105727');
  });

  test('should serialize negative number to felt252', () => {
    const i128 = new Cairoint128(INT_128_MIN);
    expect(i128.toApiRequest()).toEqual(
      '3618502788666131213697322783095070105452966031871127468241404752419987914754'
    );
  });

  test('should convert negative serialized number to BigInt', () => {
    const i128 = new Cairoint128(INT_128_MIN);
    expect(i128.negativeFelt252ToBigInt()).toEqual(-170141183460469231731687303715884105727n);
  });

  test('validate should throw on < INT_128_MIN', () => {
    expect(() => {
      Cairoint128.validate(INT_128_MIN - 1n);
    }).toThrow('bigNumberish is smaller than INT_128_MIN');
  });

  test('validate should throw on > INT_128_MAX', () => {
    expect(() => {
      Cairoint128.validate(INT_128_MAX + 1n);
    }).toThrow('bigNumberish is bigger than INT_128_MAX');
  });

  test('validate should pass and return bigint', () => {
    const validate = Cairoint128.validate(INT_128_MAX);
    expect(typeof validate).toBe('bigint');
  });

  test('is should return true', () => {
    const is = Cairoint128.is(INT_128_MAX);
    expect(is).toBe(true);
  });

  test('is should return false', () => {
    const is = Cairoint128.is(INT_128_MAX + 1n);
    expect(is).toBe(false);
  });

  test('constructor should support BigNumberish', () => {
    const case1 = new Cairoint128(10n);
    const case2 = new Cairoint128(10);
    const case3 = new Cairoint128('10');
    const case4 = new Cairoint128('0xA');

    expect(case1).toEqual(case2);
    expect(case3).toEqual(case4);
    expect(case1).toEqual(case4);
  });

  test('should convert INT_128_MAX to Int128 dec struct', () => {
    const i128 = new Cairoint128(INT_128_MAX);
    const i128Decimal = i128.toIntDecimalString();
    expect(i128Decimal).toEqual('170141183460469231731687303715884105727');
  });

  test('should convert INT_128_MAX to Int128 hex struct', () => {
    const i128 = new Cairoint128(INT_128_MAX);
    const i128Hex = i128.toIntHexString();
    expect(i128Hex).toEqual('0x7fffffffffffffffffffffffffffffff');
  });

  test('isAbiType should return true', () => {
    const isAbiType = Cairoint128.isAbiType('core::integer::i128');
    expect(isAbiType).toBe(true);
  });

  test('should convert INT_128_MAX to BigInt', () => {
    const i128 = new Cairoint128(INT_128_MAX);
    expect(i128.toBigInt()).toEqual(INT_128_MAX);
  });
});
