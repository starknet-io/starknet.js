import { CairoInt128 } from '../../../src/utils/cairoDataTypes/int128';

describe('CairoInt128 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle positive number input', () => {
      const i128 = new CairoInt128(1000000);
      expect(i128.data).toBe(1000000n);
    });

    test('should handle negative number input', () => {
      const i128 = new CairoInt128(-1000000);
      expect(i128.data).toBe(-1000000n);
    });

    test('should handle bigint input', () => {
      const i128 = new CairoInt128(123456789012345678901234567890n);
      expect(i128.data).toBe(123456789012345678901234567890n);
    });

    test('should handle negative bigint input', () => {
      const i128 = new CairoInt128(-123456789012345678901234567890n);
      expect(i128.data).toBe(-123456789012345678901234567890n);
    });

    test('should handle zero values', () => {
      const i128FromNumber = new CairoInt128(0);
      const i128FromBigint = new CairoInt128(0n);

      expect(i128FromNumber.data).toBe(0n);
      expect(i128FromBigint.data).toBe(0n);
    });

    test('should handle maximum i128 value', () => {
      const maxI128 = 2n ** 127n - 1n;
      const i128 = new CairoInt128(maxI128);
      expect(i128.data).toBe(maxI128);
    });

    test('should handle minimum i128 value', () => {
      const minI128 = -(2n ** 127n);
      const i128 = new CairoInt128(minI128);
      expect(i128.data).toBe(minI128);
    });
  });

  describe('validation', () => {
    test('should accept valid i128 values', () => {
      expect(() => new CairoInt128(-(2n ** 127n))).not.toThrow();
      expect(() => new CairoInt128(0)).not.toThrow();
      expect(() => new CairoInt128(2n ** 127n - 1n)).not.toThrow();
      expect(() => new CairoInt128('A')).not.toThrow(); // UTF-8 encoded to 65
      expect(() => new CairoInt128(1000000n)).not.toThrow();
      expect(() => new CairoInt128(-1000000n)).not.toThrow();
    });

    test('should reject values less than -2^127', () => {
      expect(() => new CairoInt128(-(2n ** 127n) - 1n)).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
      expect(() => new CairoInt128(-(2n ** 128n))).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
    });

    test('should reject values greater than 2^127-1', () => {
      expect(() => new CairoInt128(2n ** 127n)).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
      expect(() => new CairoInt128(2n ** 128n)).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
    });

    test('should handle valid string inputs correctly', () => {
      const i128FromCharString = new CairoInt128('A'); // UTF-8 encoded to 65
      const i128FromNumString = new CairoInt128('1000000'); // Parsed as number
      const i128FromHexString = new CairoInt128('0x7fffffffffffffffffffffffffffffff');

      expect(i128FromCharString.data).toBe(65n); // ASCII value of 'A'
      expect(i128FromNumString.data).toBe(1000000n); // Parsed as number
      expect(i128FromHexString.data).toBe(2n ** 127n - 1n);
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoInt128(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoInt128(-1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoInt128.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt128.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt128.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt128.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [-1000000000n, -1000000n, 0n, 1000000n, 1000000000n];
      values.forEach((val) => {
        const i128 = new CairoInt128(val);
        expect(i128.toBigInt()).toBe(val);
      });
    });

    test('should handle negative values', () => {
      const i128 = new CairoInt128(-123456789012345678901234567890n);
      expect(i128.toBigInt()).toBe(-123456789012345678901234567890n);
    });

    test('should handle boundary values', () => {
      const minI128 = new CairoInt128(-(2n ** 127n));
      const maxI128 = new CairoInt128(2n ** 127n - 1n);
      expect(minI128.toBigInt()).toBe(-(2n ** 127n));
      expect(maxI128.toBigInt()).toBe(2n ** 127n - 1n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const i128 = new CairoInt128(0);
      expect(i128.toHexString()).toBe('0x0');
    });

    test('should convert positive numbers to hex', () => {
      const i128 = new CairoInt128(0xffffffffffffffffn);
      expect(i128.toHexString()).toBe('0xffffffffffffffff');
    });

    test('should convert negative numbers to hex', () => {
      const i128 = new CairoInt128(-1);
      expect(i128.toHexString()).toBe('0x-1');
    });

    test('should convert boundary values to hex', () => {
      const minI128 = new CairoInt128(-(2n ** 127n));
      const maxI128 = new CairoInt128(2n ** 127n - 1n);
      expect(minI128.toHexString()).toBe('0x-80000000000000000000000000000000');
      expect(maxI128.toHexString()).toBe('0x7fffffffffffffffffffffffffffffff');
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoInt128.validate(-1000000)).not.toThrow();
      expect(() => CairoInt128.validate(0)).not.toThrow();
      expect(() => CairoInt128.validate(1000000)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoInt128.validate(-(2n ** 127n))).not.toThrow();
      expect(() => CairoInt128.validate(0n)).not.toThrow();
      expect(() => CairoInt128.validate(2n ** 127n - 1n)).not.toThrow();
    });

    test('should reject out-of-range values', () => {
      expect(() => CairoInt128.validate(-(2n ** 127n) - 1n)).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
      expect(() => CairoInt128.validate(2n ** 127n)).toThrow(
        'Value is out of i128 range [-170141183460469231731687303715884105728, 170141183460469231731687303715884105727]'
      );
    });

    test('should reject invalid types', () => {
      expect(() => CairoInt128.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt128.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt128.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt128.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoInt128.is(-(2n ** 127n))).toBe(true);
      expect(CairoInt128.is(0)).toBe(true);
      expect(CairoInt128.is(2n ** 127n - 1n)).toBe(true);
      expect(CairoInt128.is(-1000000n)).toBe(true);
      expect(CairoInt128.is('A')).toBe(true); // UTF-8 encoded to 65
      expect(CairoInt128.is('1000000')).toBe(true); // Parsed as number
    });

    test('should return false for invalid inputs', () => {
      expect(CairoInt128.is(-(2n ** 127n) - 1n)).toBe(false);
      expect(CairoInt128.is(2n ** 127n)).toBe(false);
      expect(CairoInt128.is(null as any)).toBe(false);
      expect(CairoInt128.is(undefined as any)).toBe(false);
      expect(CairoInt128.is({} as any)).toBe(false);
      expect(CairoInt128.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoInt128.isAbiType('core::integer::i128')).toBe(true);
      expect(CairoInt128.isAbiType('core::integer::i64')).toBe(false);
      expect(CairoInt128.isAbiType('core::integer::u128')).toBe(false);
      expect(CairoInt128.isAbiType('felt252')).toBe(false);
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const i128 = new CairoInt128(0);
      const result = i128.toApiRequest();
      expect(result).toEqual(['0x0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for positive numbers', () => {
      const i128 = new CairoInt128(10000000000000000000n);
      const result = i128.toApiRequest();
      expect(result).toEqual(['0x8ac7230489e80000']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for negative numbers', () => {
      const i128 = new CairoInt128(-10000000000000000000n);
      const result = i128.toApiRequest();
      expect(result).toEqual(['0x-8ac7230489e80000']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle boundary values', () => {
      const minI128 = new CairoInt128(-(2n ** 127n));
      const maxI128 = new CairoInt128(2n ** 127n - 1n);
      expect(minI128.toApiRequest()).toEqual(['0x-80000000000000000000000000000000']);
      expect(maxI128.toApiRequest()).toEqual(['0x7fffffffffffffffffffffffffffffff']);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoInt128 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0x8ac7230489e80000', done: false }),
      };
      const i128 = CairoInt128.factoryFromApiResponse(mockIterator as any);
      expect(i128.data).toBe(10000000000000000000n);
    });

    test('should handle positive values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '10000000000000000000', done: false }),
      };
      const i128 = CairoInt128.factoryFromApiResponse(mockIterator as any);
      expect(i128.data).toBe(10000000000000000000n);
    });

    test('should handle boundary values from API response', () => {
      const maxValue = (2n ** 127n - 1n).toString();
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: maxValue, done: false }),
      };
      const i128 = CairoInt128.factoryFromApiResponse(mockIterator as any);
      expect(i128.data).toBe(2n ** 127n - 1n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValues = [-1000000000n, -1000000n, 0n, 1000000n, 1000000000n];
      testValues.forEach((val) => {
        const i128FromBigint = new CairoInt128(val);
        // Note: string representations may differ due to UTF-8 encoding

        expect(i128FromBigint.toBigInt()).toBe(val);
      });
    });

    test('should handle round-trip conversions', () => {
      const originalValue = -123456789012345678901234567890n;
      const i128 = new CairoInt128(originalValue);
      const bigintValue = i128.toBigInt();
      const newI128 = new CairoInt128(bigintValue);

      expect(newI128.toBigInt()).toBe(originalValue);
      expect(newI128.data).toBe(i128.data);
    });
  });

  describe('extremely large number handling', () => {
    test('should handle values much larger than i64 range', () => {
      const veryLargeValue = 2n ** 126n;
      const i128Pos = new CairoInt128(veryLargeValue);
      const i128Neg = new CairoInt128(-veryLargeValue);
      expect(i128Pos.toBigInt()).toBe(veryLargeValue);
      expect(i128Neg.toBigInt()).toBe(-veryLargeValue);
    });

    test('should handle powers of 2 within range', () => {
      const powersOf2 = [2n ** 64n, 2n ** 80n, 2n ** 96n, 2n ** 112n, 2n ** 126n];
      powersOf2.forEach((power) => {
        const i128Pos = new CairoInt128(power);
        const i128Neg = new CairoInt128(-power);
        expect(i128Pos.toBigInt()).toBe(power);
        expect(i128Neg.toBigInt()).toBe(-power);
      });
    });

    test('should handle hex representations of very large numbers', () => {
      const hexValue = '0x7ffffffffffffffffffffffffffffffe'; // Valid i128 value
      const i128 = new CairoInt128(hexValue);
      expect(i128.toHexString().toLowerCase()).toBe(hexValue.toLowerCase());
    });
  });

  describe('comparison with smaller integer types', () => {
    test('should handle all i64 values correctly', () => {
      const maxI64 = 2n ** 63n - 1n;
      const minI64 = -(2n ** 63n);
      const i128Max = new CairoInt128(maxI64);
      const i128Min = new CairoInt128(minI64);
      expect(i128Max.toBigInt()).toBe(maxI64);
      expect(i128Min.toBigInt()).toBe(minI64);
    });

    test('should handle values beyond i64 range', () => {
      const beyondI64 = 2n ** 64n;
      const i128Pos = new CairoInt128(beyondI64);
      const i128Neg = new CairoInt128(-beyondI64);
      expect(i128Pos.toBigInt()).toBe(beyondI64);
      expect(i128Neg.toBigInt()).toBe(-beyondI64);
    });
  });

  describe('signed integer specific tests', () => {
    test('should handle negative values correctly', () => {
      const negativeValues = [-(2n ** 127n), -(2n ** 100n), -1000000n, -1n];
      negativeValues.forEach((val) => {
        const i128 = new CairoInt128(val);
        expect(i128.data).toBe(val);
        expect(i128.toBigInt()).toBe(val);
      });
    });

    test("should handle two's complement boundary correctly", () => {
      const minI128 = new CairoInt128(-(2n ** 127n));
      const maxI128 = new CairoInt128(2n ** 127n - 1n);

      expect(minI128.data).toBe(-(2n ** 127n));
      expect(maxI128.data).toBe(2n ** 127n - 1n);

      // Test that values outside range are rejected
      expect(() => new CairoInt128(-(2n ** 127n) - 1n)).toThrow();
      expect(() => new CairoInt128(2n ** 127n)).toThrow();
    });

    test('should maintain sign consistency', () => {
      const testCases = [
        { input: -1000000000n, expected: -1000000000n },
        { input: 1000000000n, expected: 1000000000n },
        { input: 'A', expected: 65n }, // UTF-8 encoded
        { input: '5', expected: 5n }, // Parsed as number
        { input: -1n, expected: -1n },
        { input: 1n, expected: 1n },
      ];

      testCases.forEach(({ input, expected }) => {
        const i128 = new CairoInt128(input as any);
        expect(i128.data).toBe(expected);
        expect(i128.toBigInt()).toBe(expected);
      });
    });
  });
});
