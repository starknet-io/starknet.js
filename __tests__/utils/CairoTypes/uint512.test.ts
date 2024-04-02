/* eslint-disable no-new */
import { UINT_128_MAX, Uint512, num } from '../../../src';
import {
  CairoUint512,
  UINT_128_MIN,
  UINT_512_MAX,
  UINT_512_MIN,
} from '../../../src/utils/cairoDataTypes/uint512';

describe('CairoUint512 class test', () => {
  test('constructor 1 should throw on < UINT_512_MIN', () => {
    expect(() => {
      new CairoUint512(UINT_512_MIN - 1n);
    }).toThrow('bigNumberish is smaller than UINT_512_MIN');
  });

  test('constructor 1 should throw on > UINT_512_MAX', () => {
    expect(() => {
      new CairoUint512(UINT_512_MAX + 1n);
    }).toThrow('bigNumberish is bigger than UINT_512_MAX');
  });

  test('constructor 1 should support BigNumberish', () => {
    const case1 = new CairoUint512(10n);
    const case2 = new CairoUint512(10);
    const case3 = new CairoUint512('10');
    const case4 = new CairoUint512('0xA');
    expect(case1.toBigInt()).toBe(10n);
    expect(case2.toBigInt()).toBe(10n);
    expect(case3.toBigInt()).toBe(10n);
    expect(case4.toBigInt()).toBe(10n);
  });

  test('constructor 2 (limb0, limb1, limb2, limb3)', () => {
    const u512 = new CairoUint512(1000, 1001, 1002, 1003);
    expect(u512.toApiRequest()).toEqual(['1000', '1001', '1002', '1003']);
  });

  test('constructor 2 should throw out of bounds', () => {
    expect(() => {
      new CairoUint512(UINT_128_MIN - 1n, 1000, 1000, 1000);
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(UINT_128_MAX + 1n, 1000, 1000, 1000);
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, UINT_128_MIN - 1n, 1000, 1000);
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, UINT_128_MAX + 1n, 1000, 1000);
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, 1000, UINT_128_MIN - 1n, 1000);
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, 1000, UINT_128_MAX + 1n, 1000);
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, 1000, 1000, UINT_128_MIN - 1n);
    }).toThrow('limb3 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512(1000, 1000, 1000, UINT_128_MAX + 1n);
    }).toThrow('limb3 is not in the range of a u128 number');
  });

  test('constructor 2 should support Uint512 {limb0, limb1, limb2, limb3}', () => {
    const cases: Uint512[] = [];
    cases[cases.length] = new CairoUint512({ limb0: 1000, limb1: 1001, limb2: 1002, limb3: 1003 });
    cases[cases.length] = new CairoUint512({
      limb0: '1000',
      limb1: '1001',
      limb2: '1002',
      limb3: '1003',
    });
    cases[cases.length] = new CairoUint512({
      limb0: 1000n,
      limb1: 1001n,
      limb2: 1002n,
      limb3: 1003n,
    });
    cases[cases.length] = new CairoUint512({
      limb0: '0x3e8',
      limb1: '0x3e9',
      limb2: '0x3ea',
      limb3: '0x3eb',
    });
    expect(
      cases.every((it) => {
        return it.limb0 === 1000n && it.limb1 === 1001n && it.limb2 === 1002n && it.limb3 === 1003n;
      })
    ).toEqual(true);
  });

  test('constructor 3 ({limb0, limb1, limb2, limb3})', () => {
    const u512 = new CairoUint512({ limb0: 1000, limb1: 1001, limb2: 1002, limb3: 1003 });
    expect(u512.toApiRequest()).toEqual(['1000', '1001', '1002', '1003']);
  });

  test('constructor 3 should throw out of bounds', () => {
    expect(() => {
      new CairoUint512({ limb0: UINT_128_MIN - 1n, limb1: 1001, limb2: 1002, limb3: 1003 });
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: UINT_128_MAX + 1n, limb1: 1001, limb2: 1002, limb3: 1003 });
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: UINT_128_MIN - 1n, limb2: 1002, limb3: 1003 });
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: UINT_128_MAX + 1n, limb2: 1002, limb3: 1003 });
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: 1001, limb2: UINT_128_MIN - 1n, limb3: 1003 });
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: 1001, limb2: UINT_128_MAX + 1n, limb3: 1003 });
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: 1001, limb2: 1002, limb3: UINT_128_MIN - 1n });
    }).toThrow('limb3 is not in the range of a u128 number');
    expect(() => {
      new CairoUint512({ limb0: 1000, limb1: 1001, limb2: 1002, limb3: UINT_128_MAX + 1n });
    }).toThrow('limb3 is not in the range of a u128 number');
  });

  test('validate should throw on < UINT_512_MIN', () => {
    expect(() => {
      CairoUint512.validate(UINT_512_MIN - 1n);
    }).toThrow('bigNumberish is smaller than UINT_512_MIN');
  });

  test('validate should throw on > UINT_512_MAX', () => {
    expect(() => {
      CairoUint512.validate(UINT_512_MAX + 1n);
    }).toThrow('bigNumberish is bigger than UINT_512_MAX');
  });

  test('validate should pass and return bigint', () => {
    const validate = CairoUint512.validate(UINT_512_MAX);
    expect(typeof validate).toBe('bigint');
  });

  test('validateProps should pass', () => {
    expect(CairoUint512.validateProps(1000, 1001, 1002, 1003)).toEqual({
      limb0: 1000n,
      limb1: 1001n,
      limb2: 1002n,
      limb3: 1003n,
    });
  });

  test('validateProps out of range', () => {
    expect(() => {
      CairoUint512.validateProps(UINT_128_MIN - 1n, 1001, 1002, 1003);
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(UINT_128_MAX + 1n, 1001, 1002, 1003);
    }).toThrow('limb0 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, UINT_128_MIN - 1n, 1002, 1003);
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, UINT_128_MAX + 1n, 1002, 1003);
    }).toThrow('limb1 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, 1001, UINT_128_MIN - 1n, 1003);
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, 1001, UINT_128_MAX + 1n, 1003);
    }).toThrow('limb2 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, 1001, 1002, UINT_128_MIN - 1n);
    }).toThrow('limb3 is not in the range of a u128 number');
    expect(() => {
      CairoUint512.validateProps(1000, 1001, 1002, UINT_128_MAX + 1n);
    }).toThrow('limb3 is not in the range of a u128 number');
  });

  test('isAbiType', () => {
    expect(CairoUint512.isAbiType('core::integer::u512')).toBe(true);
  });

  test('is should return true', () => {
    const is = CairoUint512.is(UINT_512_MIN);
    expect(is).toBe(true);
  });

  test('is should return false', () => {
    const is = CairoUint512.is(UINT_512_MAX + 1n);
    expect(is).toBe(false);
  });

  test('should convert UINT_512_MAX to Uint512 bigint', () => {
    const numb =
      '0x33333333333333333333333333333333222222222222222222222222222222221111111111111111111111111111111100000000000000000000000000000000';
    const u512 = new CairoUint512(numb);
    const u512bigint = u512.toBigInt();
    expect(num.toHex(u512bigint)).toBe(numb);
  });

  test('should convert UINT_512_MAX to Uint512 dec struct', () => {
    const numb =
      '0x33333333333333333333333333333333222222222222222222222222222222221111111111111111111111111111111100000000000000000000000000000000';
    const u512 = new CairoUint512(numb);
    const u512Hex = u512.toUint512DecimalString();
    expect(u512Hex).toEqual({
      limb0: '0',
      limb1: '22685491128062564230891640495451214097',
      limb2: '45370982256125128461783280990902428194',
      limb3: '68056473384187692692674921486353642291',
    });
  });

  test('should convert UINT_512_MAX to Uint512 hex struct', () => {
    const numb =
      '0x33333333333333333333333333333333222222222222222222222222222222221111111111111111111111111111111100000000000000000000000000000000';
    const u512 = new CairoUint512(numb);
    const u512Decimal = u512.toUint512HexString();
    expect(u512Decimal).toEqual({
      limb0: '0x0',
      limb1: '0x11111111111111111111111111111111',
      limb2: '0x22222222222222222222222222222222',
      limb3: '0x33333333333333333333333333333333',
    });
  });
});
