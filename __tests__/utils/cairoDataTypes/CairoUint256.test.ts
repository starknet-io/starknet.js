/* eslint-disable no-new */
import {
  Uint256,
  CairoUint256,
  UINT_256_HIGH_MAX,
  UINT_256_HIGH_MIN,
  UINT_256_LOW_MAX,
  UINT_256_LOW_MIN,
  UINT_256_MAX,
  UINT_256_MIN,
  transaction,
} from '../../../src';

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

  test('constructor 1 should throw on null', () => {
    expect(() => {
      new CairoUint256(null as any);
    }).toThrow('null value is not allowed for u256');
  });

  test('constructor 1 should throw on undefined', () => {
    expect(() => {
      new CairoUint256(undefined as any);
    }).toThrow('undefined value is not allowed for u256');
  });

  test('constructor 1 should throw on invalid types', () => {
    expect(() => {
      new CairoUint256(Symbol('test') as any);
    }).toThrow("Unsupported data type 'symbol' for u256");

    expect(() => {
      new CairoUint256((() => {}) as any);
    }).toThrow("Unsupported data type 'function' for u256");
  });

  test('constructor 1 should throw on a decimal number', () => {
    expect(() => {
      new CairoUint256(1.5);
    }).toThrow('Invalid input: decimal numbers are not supported, only integers');
  });

  test("constructor 1 should throw on text, and on '0x' which holds no digit", () => {
    expect(() => {
      new CairoUint256('abc');
    }).toThrow('Invalid input: a u256 cannot be built from text');
    // a minus sign makes a number of a string for the signed integers only
    expect(() => {
      new CairoUint256('-1');
    }).toThrow('Invalid input: a u256 cannot be built from text');
    expect(() => {
      new CairoUint256('0x');
    }).toThrow("Invalid input: '0x' holds no hexadecimal digit");
  });

  test('constructor 1 should throw on an object that is not a Uint256', () => {
    // BigInt would read a Date, or any object with a numeric valueOf, but a u256 is not built so
    expect(() => {
      new CairoUint256({} as any);
    }).toThrow("Unsupported data type 'object' for u256");
    expect(() => {
      new CairoUint256({ low: 1 } as any);
    }).toThrow("Unsupported data type 'object' for u256");
    expect(() => {
      new CairoUint256(new Date(0) as any);
    }).toThrow("Unsupported data type 'object' for u256");
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

  test('constructors 2 and 3 should name the half that is not a number', () => {
    expect(() => {
      new CairoUint256(null as any, 0);
    }).toThrow('low cannot be null');
    expect(() => {
      new CairoUint256(0, undefined as any);
    }).toThrow('high cannot be undefined');
    expect(() => {
      new CairoUint256(1.5, 0);
    }).toThrow('low must be an integer');
    expect(() => {
      new CairoUint256({ low: 0, high: 1.5 });
    }).toThrow('high must be an integer');
    // a half is read as isBigNumberish reads it, which is stricter than BigInt : BigInt would take
    // every one of these strings but 'abc', and '' would even be 0
    ['abc', '-1', '', ' 12 ', '0b101'].forEach((half) => {
      expect(() => {
        new CairoUint256(half, 0);
      }).toThrow('low cannot be built from text');
    });
    expect(() => {
      new CairoUint256('0x', 0);
    }).toThrow("low cannot be '0x', which holds no hexadecimal digit");
    expect(() => {
      new CairoUint256(new Date(0) as any, 0);
    }).toThrow('low must be a BigNumberish');
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

  test('validate should reject null with specific error message', () => {
    expect(() => {
      CairoUint256.validate(null as any);
    }).toThrow('null value is not allowed for u256');
  });

  test('validate should reject undefined with specific error message', () => {
    expect(() => {
      CairoUint256.validate(undefined as any);
    }).toThrow('undefined value is not allowed for u256');
  });

  test('validate should reject unsupported data types with specific error messages', () => {
    expect(() => {
      CairoUint256.validate(Symbol('test') as any);
    }).toThrow(
      "Unsupported data type 'symbol' for u256. Expected a numeric string (decimal or hexadecimal), number, bigint, or Uint256 object"
    );

    expect(() => {
      CairoUint256.validate((() => {}) as any);
    }).toThrow(
      "Unsupported data type 'function' for u256. Expected a numeric string (decimal or hexadecimal), number, bigint, or Uint256 object"
    );

    expect(() => {
      CairoUint256.validate(true as any);
    }).toThrow(
      "Unsupported data type 'boolean' for u256. Expected a numeric string (decimal or hexadecimal), number, bigint, or Uint256 object"
    );
  });

  test('validate should reject a decimal number', () => {
    expect(() => {
      CairoUint256.validate(1.5);
    }).toThrow('Invalid input: decimal numbers are not supported, only integers');
  });

  test('validate should reject an object, a Uint256 one included', () => {
    // a Uint256 object is checked by validateProps, which the constructor calls for it
    expect(() => {
      CairoUint256.validate({ low: 1, high: 0 });
    }).toThrow("Unsupported data type 'object' for u256");
    expect(CairoUint256.is({ low: 1, high: 0 })).toBe(false);
  });

  test('is should return true', () => {
    const is = CairoUint256.is(UINT_256_MIN);
    expect(is).toBe(true);
  });

  test('is should return false', () => {
    const is = CairoUint256.is(UINT_256_MAX + 1n);
    expect(is).toBe(false);
  });

  test('is should return false for unknown invalid data types', () => {
    expect(CairoUint256.is(null as any)).toBe(false);
    expect(CairoUint256.is(undefined as any)).toBe(false);
    expect(CairoUint256.is(Symbol('test') as any)).toBe(false);
    expect(CairoUint256.is((() => {}) as any)).toBe(false);
    expect(CairoUint256.is(true as any)).toBe(false);
    expect(CairoUint256.is(false as any)).toBe(false);
    expect(CairoUint256.is(new Date(0) as any)).toBe(false);
    expect(CairoUint256.is(new Map() as any)).toBe(false);
    expect(CairoUint256.is(1.5)).toBe(false);
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

  describe('toApiRequest is flagged as compiled', () => {
    test('should carry the __compiled__ flag', () => {
      const result = new CairoUint256(255).toApiRequest();
      expect(result).toEqual(['255', '0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should be taken as calldata by a call that skips request parsing', () => {
      // the shape `Contract.invoke` builds under `withOptions({ parseRequest: false })` : `args` is
      // the argument list, its only item is already serialized, and the callback hands `args` back
      // untouched. Only the flag tells the two apart, and without it the calldata stays nested.
      const args = [new CairoUint256(255).toApiRequest()];
      expect(transaction.getCompiledCalldata(args, () => args)).toEqual(['255', '0']);
    });
  });
});
