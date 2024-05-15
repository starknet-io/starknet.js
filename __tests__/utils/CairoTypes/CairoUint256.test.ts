/* eslint-disable no-new */
import { Uint256 } from '../../../src';
import {
  CairoUint256,
  UINT_256_HIGH_MAX,
  UINT_256_HIGH_MIN,
  UINT_256_LOW_MAX,
  UINT_256_LOW_MIN,
  UINT_256_MAX,
  UINT_256_MIN,
} from '../../../src/utils/cairoDataTypes/uint256';

describe('CairoUint256 class test', () => {
  test('constructor 1 should throw on < UINT_256_MIN', () => {
    expect(() => {
      new CairoUint256(UINT_256_MIN - 1n);
    }).toThrow('bigNumberish is smaller than UINT_256_MIN');
  });

  test('constructor 1 should throw on > UINT_256_MAX', () => {
    expect(() => {
      new CairoUint256(UINT_256_MAX + 1n);
    }).toThrow('bigNumberish is bigger than UINT_256_MAX');
  });

  test('constructor 2 (low, high)', () => {
    const u256 = new CairoUint256(1000, 1000);
    expect(u256.toApiRequest()).toEqual(['1000', '1000']);
  });

  test('constructor 2 should throw out of bounds', () => {
    expect(() => {
      new CairoUint256(UINT_256_LOW_MIN - 1n, 1000);
    }).toThrow('low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX');
  });

  test('constructor 2 should throw out of bounds', () => {
    expect(() => {
      new CairoUint256(UINT_256_LOW_MAX + 1n, 1000);
    }).toThrow('low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX');
  });

  test('constructor 2 should throw out of bounds', () => {
    expect(() => {
      new CairoUint256(1000, UINT_256_HIGH_MIN - 1n);
    }).toThrow('high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX');
  });

  test('constructor 2 should throw out of bounds', () => {
    expect(() => {
      new CairoUint256(1000, UINT_256_HIGH_MAX + 1n);
    }).toThrow('high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX');
  });

  test('constructor 3 ({low, high})', () => {
    const u256 = new CairoUint256({ low: 1000, high: 1000 });
    expect(u256.toApiRequest()).toEqual(['1000', '1000']);
  });

  test('constructor 3 should throw out of bounds', () => {
    expect(() => {
      new CairoUint256({ low: 1000, high: UINT_256_HIGH_MAX + 1n });
    }).toThrow('high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX');
  });

  test('validate should throw on < UINT_256_MIN', () => {
    expect(() => {
      CairoUint256.validate(UINT_256_MIN - 1n);
    }).toThrow('bigNumberish is smaller than UINT_256_MIN');
  });

  test('validate should throw on > UINT_256_MAX', () => {
    expect(() => {
      CairoUint256.validate(UINT_256_MAX + 1n);
    }).toThrow('bigNumberish is bigger than UINT_256_MAX');
  });

  test('validate should pass and return bigint', () => {
    const validate = CairoUint256.validate(UINT_256_MAX);
    expect(typeof validate).toBe('bigint');
  });

  test('is should return true', () => {
    const is = CairoUint256.is(UINT_256_MIN);
    expect(is).toBe(true);
  });

  test('is should return false', () => {
    const is = CairoUint256.is(UINT_256_MAX + 1n);
    expect(is).toBe(false);
  });

  test('constructor 1 should support BigNumberish', () => {
    const case1 = new CairoUint256(10n);
    const case2 = new CairoUint256(10);
    const case3 = new CairoUint256('10');
    const case4 = new CairoUint256('0xA');

    expect(case1).toEqual(case2);
    expect(case3).toEqual(case4);
    expect(case1).toEqual(case4);
  });

  test('constructor 2 should support Uint256 {low, high}', () => {
    const cases: Uint256[] = [];
    cases[cases.length] = new CairoUint256({ low: 0, high: 0 });
    cases[cases.length] = new CairoUint256({ low: '0', high: '0' });
    cases[cases.length] = new CairoUint256({ low: 0n, high: 0n });
    cases[cases.length] = new CairoUint256({ low: '0x0', high: '0x0' });

    const cases2: Uint256[] = [];
    cases2[cases2.length] = new CairoUint256({ low: 10000, high: 10000 });
    cases2[cases2.length] = new CairoUint256({ low: '10000', high: '10000' });
    cases2[cases2.length] = new CairoUint256({ low: 10000n, high: 10000n });
    cases2[cases2.length] = new CairoUint256({ low: '0x2710', high: '0x2710' });

    expect(
      cases.every((it) => {
        return it.low === 0n && it.high === 0n;
      })
    ).toEqual(true);

    expect(
      cases2.every((it) => {
        return it.low === 10000n && it.high === 10000n;
      })
    ).toEqual(true);
  });

  test('should convert UINT_256_MAX to Uint256 dec struct', () => {
    const u256 = new CairoUint256(UINT_256_MAX);
    const u256Hex = u256.toUint256DecimalString();
    expect(u256Hex).toMatchInlineSnapshot(`
      Object {
        "high": "340282366920938463463374607431768211455",
        "low": "340282366920938463463374607431768211455",
      }
    `);
  });

  test('should convert UINT_256_MAX to Uint256 hex struct', () => {
    const u256 = new CairoUint256(UINT_256_MAX);
    const u256Decimal = u256.toUint256HexString();
    expect(u256Decimal).toMatchInlineSnapshot(`
      Object {
        "high": "0xffffffffffffffffffffffffffffffff",
        "low": "0xffffffffffffffffffffffffffffffff",
      }
    `);
  });

  test('isAbiType should return true', () => {
    const isAbiType = CairoUint256.isAbiType('core::integer::u256');
    expect(isAbiType).toBe(true);
  });

  test('should convert UINT_256_MAX to BN', () => {
    const u256 = new CairoUint256(UINT_256_MAX);
    expect(u256.toBigInt()).toEqual(UINT_256_MAX);
  });

  test('should convert UINT_256_MAX to API Request', () => {
    const u256 = new CairoUint256(UINT_256_MAX);
    expect(u256.toApiRequest()).toEqual([
      '340282366920938463463374607431768211455',
      '340282366920938463463374607431768211455',
    ]);
  });
});
