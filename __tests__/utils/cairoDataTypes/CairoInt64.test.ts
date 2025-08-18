import { CairoInt64, constants } from '../../../src';

const { PRIME } = constants;

describe('CairoInt64 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle positive number input', () => {
      const i64 = new CairoInt64(1000000);
      expect(i64.data).toBe(1000000n);
    });

    test('should handle negative number input', () => {
      const i64 = new CairoInt64(-1000000);
      expect(i64.data).toBe(-1000000n);
    });

    test('should handle bigint input', () => {
      const i64 = new CairoInt64(123456789012345n);
      expect(i64.data).toBe(123456789012345n);
    });

    test('should handle negative bigint input', () => {
      const i64 = new CairoInt64(-123456789012345n);
      expect(i64.data).toBe(-123456789012345n);
    });

    test('should handle zero values', () => {
      const i64FromNumber = new CairoInt64(0);
      const i64FromBigint = new CairoInt64(0n);

      expect(i64FromNumber.data).toBe(0n);
      expect(i64FromBigint.data).toBe(0n);
    });

    test('should handle maximum i64 value', () => {
      const maxI64 = 2n ** 63n - 1n;
      const i64 = new CairoInt64(maxI64);
      expect(i64.data).toBe(maxI64);
    });

    test('should handle minimum i64 value', () => {
      const minI64 = -(2n ** 63n);
      const i64 = new CairoInt64(minI64);
      expect(i64.data).toBe(minI64);
    });
  });

  describe('validation', () => {
    test('should accept valid i64 values', () => {
      expect(() => new CairoInt64(-(2n ** 63n))).not.toThrow();
      expect(() => new CairoInt64(0)).not.toThrow();
      expect(() => new CairoInt64(2n ** 63n - 1n)).not.toThrow();
      expect(() => new CairoInt64('A')).not.toThrow(); // UTF-8 encoded to 65
      expect(() => new CairoInt64(1000000n)).not.toThrow();
      expect(() => new CairoInt64(-1000000n)).not.toThrow();
    });

    test('should reject values less than -2^63', () => {
      expect(() => new CairoInt64(-(2n ** 63n) - 1n)).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
      expect(() => new CairoInt64(-(2n ** 64n))).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
    });

    test('should reject values greater than 2^63-1', () => {
      expect(() => new CairoInt64(2n ** 63n)).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
      expect(() => new CairoInt64(2n ** 64n)).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
    });

    test('should handle valid string inputs correctly', () => {
      const i64FromCharString = new CairoInt64('A'); // UTF-8 encoded to 65
      const i64FromNumString = new CairoInt64('1000000'); // Parsed as number
      const i64FromHexString = new CairoInt64('0x7fffffffffffffff');

      expect(i64FromCharString.data).toBe(65n); // ASCII value of 'A'
      expect(i64FromNumString.data).toBe(1000000n); // Parsed as number
      expect(i64FromHexString.data).toBe(2n ** 63n - 1n);
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoInt64(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoInt64(-1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoInt64.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt64.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt64.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt64.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [-1000000000n, -1000000n, 0n, 1000000n, 1000000000n];
      values.forEach((val) => {
        const i64 = new CairoInt64(val);
        expect(i64.toBigInt()).toBe(val);
      });
    });

    test('should handle negative values', () => {
      const i64 = new CairoInt64(-123456789012345n);
      expect(i64.toBigInt()).toBe(-123456789012345n);
    });

    test('should handle boundary values', () => {
      const minI64 = new CairoInt64(-(2n ** 63n));
      const maxI64 = new CairoInt64(2n ** 63n - 1n);
      expect(minI64.toBigInt()).toBe(-(2n ** 63n));
      expect(maxI64.toBigInt()).toBe(2n ** 63n - 1n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const i64 = new CairoInt64(0);
      expect(i64.toHexString()).toBe('0x0');
    });

    test('should convert positive numbers to hex', () => {
      const i64 = new CairoInt64(0xffffffffn);
      expect(i64.toHexString()).toBe('0xffffffff');
    });

    test('should convert negative numbers to hex using field element representation', () => {
      const i64 = new CairoInt64(-1);
      // -1 becomes PRIME + (-1) = PRIME - 1
      const fieldElement = PRIME - 1n;
      expect(i64.toHexString()).toBe(`0x${fieldElement.toString(16)}`);
    });

    test('should convert boundary values to hex', () => {
      const minI64 = new CairoInt64(-(2n ** 63n));
      const maxI64 = new CairoInt64(2n ** 63n - 1n);
      const minFieldElement = PRIME - 2n ** 63n;
      expect(minI64.toHexString()).toBe(`0x${minFieldElement.toString(16)}`);
      expect(maxI64.toHexString()).toBe('0x7fffffffffffffff');
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoInt64.validate(-1000000)).not.toThrow();
      expect(() => CairoInt64.validate(0)).not.toThrow();
      expect(() => CairoInt64.validate(1000000)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoInt64.validate(-(2n ** 63n))).not.toThrow();
      expect(() => CairoInt64.validate(0n)).not.toThrow();
      expect(() => CairoInt64.validate(2n ** 63n - 1n)).not.toThrow();
    });

    test('should reject out-of-range values', () => {
      expect(() => CairoInt64.validate(-(2n ** 63n) - 1n)).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
      expect(() => CairoInt64.validate(2n ** 63n)).toThrow(
        'Value is out of i64 range [-9223372036854775808, 9223372036854775807]'
      );
    });

    test('should reject invalid types', () => {
      expect(() => CairoInt64.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt64.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt64.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt64.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoInt64.is(-(2n ** 63n))).toBe(true);
      expect(CairoInt64.is(0)).toBe(true);
      expect(CairoInt64.is(2n ** 63n - 1n)).toBe(true);
      expect(CairoInt64.is(-1000000n)).toBe(true);
      expect(CairoInt64.is('A')).toBe(true); // UTF-8 encoded to 65
      expect(CairoInt64.is('1000000')).toBe(true); // Parsed as number
    });

    test('should return false for invalid inputs', () => {
      expect(CairoInt64.is(-(2n ** 63n) - 1n)).toBe(false);
      expect(CairoInt64.is(2n ** 63n)).toBe(false);
      expect(CairoInt64.is(null as any)).toBe(false);
      expect(CairoInt64.is(undefined as any)).toBe(false);
      expect(CairoInt64.is({} as any)).toBe(false);
      expect(CairoInt64.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoInt64.isAbiType('core::integer::i64')).toBe(true);
      expect(CairoInt64.isAbiType('core::integer::i32')).toBe(false);
      expect(CairoInt64.isAbiType('core::integer::u64')).toBe(false);
      expect(CairoInt64.isAbiType('felt252')).toBe(false);
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const i64 = new CairoInt64(0);
      const result = i64.toApiRequest();
      expect(result).toEqual(['0x0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for positive numbers', () => {
      const i64 = new CairoInt64(1000000000n);
      const result = i64.toApiRequest();
      expect(result).toEqual(['0x3b9aca00']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return field element hex representation for negative numbers', () => {
      const i64 = new CairoInt64(-1000000000n);
      const result = i64.toApiRequest();
      // Negative value -1000000000 becomes PRIME + (-1000000000) = PRIME - 1000000000
      const fieldElement = PRIME - 1000000000n;
      const expectedValue = `0x${fieldElement.toString(16)}`;
      expect(result).toEqual([expectedValue]);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle boundary values', () => {
      const minI64 = new CairoInt64(-(2n ** 63n));
      const maxI64 = new CairoInt64(2n ** 63n - 1n);
      const minFieldElement = PRIME - 2n ** 63n;
      const expectedMinValue = `0x${minFieldElement.toString(16)}`;
      const expectedMaxValue = `0x${(2n ** 63n - 1n).toString(16)}`;
      expect(minI64.toApiRequest()).toEqual([expectedMinValue]);
      expect(maxI64.toApiRequest()).toEqual([expectedMaxValue]);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoInt64 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0x3b9aca00', done: false }),
      };
      const i64 = CairoInt64.factoryFromApiResponse(mockIterator as any);
      expect(i64.data).toBe(1000000000n);
    });

    test('should handle positive values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '1000000000', done: false }),
      };
      const i64 = CairoInt64.factoryFromApiResponse(mockIterator as any);
      expect(i64.data).toBe(1000000000n);
    });

    test('should handle boundary values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '9223372036854775807', done: false }),
      };
      const i64 = CairoInt64.factoryFromApiResponse(mockIterator as any);
      expect(i64.data).toBe(2n ** 63n - 1n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValues = [-1000000000n, -1000000n, 0n, 1000000n, 1000000000n];
      testValues.forEach((val) => {
        const i64FromBigint = new CairoInt64(val);
        // Note: string representations may differ due to UTF-8 encoding

        expect(i64FromBigint.toBigInt()).toBe(val);
      });
    });

    test('should handle round-trip conversions', () => {
      const originalValue = -123456789012345n;
      const i64 = new CairoInt64(originalValue);
      const bigintValue = i64.toBigInt();
      const newI64 = new CairoInt64(bigintValue);

      expect(newI64.toBigInt()).toBe(originalValue);
      expect(newI64.data).toBe(i64.data);
    });
  });

  describe('large number handling', () => {
    test('should handle values larger than JavaScript safe integer', () => {
      const largeValue = BigInt(Number.MAX_SAFE_INTEGER) * 100n;
      const i64 = new CairoInt64(largeValue);
      expect(i64.toBigInt()).toBe(largeValue);
    });

    test('should handle negative values larger than JavaScript safe integer', () => {
      const largeNegValue = BigInt(Number.MIN_SAFE_INTEGER) * 100n;
      const i64 = new CairoInt64(largeNegValue);
      expect(i64.toBigInt()).toBe(largeNegValue);
    });

    test('should handle powers of 2 within range', () => {
      const powersOf2 = [2n ** 32n, 2n ** 40n, 2n ** 48n, 2n ** 56n, 2n ** 62n];
      powersOf2.forEach((power) => {
        const i64Pos = new CairoInt64(power);
        const i64Neg = new CairoInt64(-power);
        expect(i64Pos.toBigInt()).toBe(power);
        expect(i64Neg.toBigInt()).toBe(-power);
      });
    });
  });
});
