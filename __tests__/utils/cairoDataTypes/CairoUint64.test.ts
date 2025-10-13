import { CairoUint64 } from '../../../src';

describe('CairoUint64 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u64 = new CairoUint64(42);
      expect(u64.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u64 = new CairoUint64(123n);
      expect(u64.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u64FromNumber = new CairoUint64(0);
      const u64FromBigint = new CairoUint64(0n);

      expect(u64FromNumber.data).toBe(0n);
      expect(u64FromBigint.data).toBe(0n);
    });

    test('should handle maximum u64 value', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u64 = new CairoUint64(maxU64);
      expect(u64.data).toBe(maxU64);
    });

    test('should handle large values', () => {
      const largeValue = 9223372036854775807n; // 2^63 - 1
      const u64 = new CairoUint64(largeValue);
      expect(u64.data).toBe(largeValue);
    });

    test('should convert number to bigint internally', () => {
      const u64 = new CairoUint64(1000000);
      expect(typeof u64.data).toBe('bigint');
      expect(u64.data).toBe(1000000n);
    });
  });

  describe('validation', () => {
    test('should accept valid u64 values', () => {
      expect(() => new CairoUint64(0)).not.toThrow();
      expect(() => new CairoUint64(1000000)).not.toThrow();
      expect(() => new CairoUint64(2n ** 32n)).not.toThrow();
      expect(() => new CairoUint64('1000000')).not.toThrow();
      expect(() => new CairoUint64(1000000n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint64(-1)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
      expect(() => new CairoUint64(-100n)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
    });

    test('should reject values greater than 2^64-1', () => {
      const overMax = 2n ** 64n;
      expect(() => new CairoUint64(overMax)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
      expect(() => new CairoUint64(overMax + 1n)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
    });

    test('should handle valid string inputs correctly', () => {
      const u64FromDecString = new CairoUint64('1000000');
      const u64FromHexString = new CairoUint64('0xffffffff');

      expect(u64FromDecString.data).toBe(1000000n);
      expect(u64FromHexString.data).toBe(0xffffffffn);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      const u64FromChar = new CairoUint64('A');
      expect(u64FromChar.data).toBe(65n); // ASCII value of 'A'
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoUint64.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint64.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint64.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint64.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint64(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoUint64(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 1000000, 2147483647, Number.MAX_SAFE_INTEGER];
      values.forEach((val) => {
        const u64 = new CairoUint64(val);
        expect(u64.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const u64 = new CairoUint64(0);
      expect(u64.toBigInt()).toBe(0n);
    });

    test('should handle maximum u64 value', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u64 = new CairoUint64(maxU64);
      expect(u64.toBigInt()).toBe(maxU64);
    });

    test('should handle large values', () => {
      const largeValue = 9223372036854775807n;
      const u64 = new CairoUint64(largeValue);
      expect(u64.toBigInt()).toBe(largeValue);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u64 = new CairoUint64(0);
      expect(u64.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u64 = new CairoUint64(255);
      expect(u64.toHexString()).toBe('0xff');
    });

    test('should convert medium numbers to hex', () => {
      const u64 = new CairoUint64(1000000);
      expect(u64.toHexString()).toBe('0xf4240');
    });

    test('should convert large numbers to hex', () => {
      const u64 = new CairoUint64(0xffffffffn);
      expect(u64.toHexString()).toBe('0xffffffff');
    });

    test('should convert maximum u64 value to hex', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u64 = new CairoUint64(maxU64);
      expect(u64.toHexString()).toBe('0xffffffffffffffff');
    });

    test('should handle bigint input', () => {
      const u64 = new CairoUint64(0x123456789abcdefn);
      expect(u64.toHexString()).toBe('0x123456789abcdef');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values to Unicode', () => {
      const u64A = new CairoUint64(65); // 'A'
      const u64Z = new CairoUint64(90); // 'Z'
      const u64Zero = new CairoUint64(48); // '0'

      expect(u64A.decodeUtf8()).toBe('A');
      expect(u64Z.decodeUtf8()).toBe('Z');
      expect(u64Zero.decodeUtf8()).toBe('0');
    });

    test('should convert zero to null character', () => {
      const u64 = new CairoUint64(0);
      expect(u64.decodeUtf8()).toBe('\0');
    });

    test('should handle special ASCII characters', () => {
      const u64Space = new CairoUint64(32); // ' '
      const u64Exclamation = new CairoUint64(33); // '!'
      const u64AtSign = new CairoUint64(64); // '@'

      expect(u64Space.decodeUtf8()).toBe(' ');
      expect(u64Exclamation.decodeUtf8()).toBe('!');
      expect(u64AtSign.decodeUtf8()).toBe('@');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const u64 = new CairoUint64(0);
      const result = u64.toApiRequest();
      expect(result).toEqual(['0x0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for small numbers', () => {
      const u64 = new CairoUint64(42);
      const result = u64.toApiRequest();
      expect(result).toEqual(['0x2a']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for large numbers', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u64 = new CairoUint64(maxU64);
      const result = u64.toApiRequest();
      expect(result).toEqual(['0xffffffffffffffff']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const u64 = new CairoUint64(0x123456789abcdefn);
      const result = u64.toApiRequest();
      expect(result).toEqual(['0x123456789abcdef']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint64.validate(0)).not.toThrow();
      expect(() => CairoUint64.validate(1000000)).not.toThrow();
      expect(() => CairoUint64.validate(Number.MAX_SAFE_INTEGER)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint64.validate(0n)).not.toThrow();
      expect(() => CairoUint64.validate(1000000n)).not.toThrow();
      expect(() => CairoUint64.validate(2n ** 64n - 1n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint64.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint64.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint64.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint64.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoUint64.validate(-1)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
      expect(() => CairoUint64.validate(-100n)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
    });

    test('should reject values exceeding u64 range', () => {
      expect(() => CairoUint64.validate(2n ** 64n)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
      expect(() => CairoUint64.validate(2n ** 64n + 1n)).toThrow(
        'Value is out of u64 range [0, 18446744073709551615]'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoUint64.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint64.is(0)).toBe(true);
      expect(CairoUint64.is(1000000)).toBe(true);
      expect(CairoUint64.is(2n ** 32n)).toBe(true);
      expect(CairoUint64.is(1000000n)).toBe(true);
      expect(CairoUint64.is('1000000')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint64.is(-1)).toBe(false);
      expect(CairoUint64.is(2n ** 64n)).toBe(false);
      expect(CairoUint64.is(null as any)).toBe(false);
      expect(CairoUint64.is(undefined as any)).toBe(false);
      expect(CairoUint64.is({} as any)).toBe(false);
      expect(CairoUint64.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint64.isAbiType('core::integer::u64')).toBe(true);
      expect(CairoUint64.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoUint64.isAbiType('core::integer::u128')).toBe(false);
      expect(CairoUint64.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minU64 = new CairoUint64(0);
      const maxU64 = new CairoUint64(2n ** 64n - 1n);

      expect(minU64.data).toBe(0n);
      expect(maxU64.data).toBe(2n ** 64n - 1n);
      expect(minU64.toBigInt()).toBe(0n);
      expect(maxU64.toBigInt()).toBe(2n ** 64n - 1n);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 1000000, 4294967295]; // Test values within safe integer range
      values.forEach((val) => {
        const u64 = new CairoUint64(val);
        const bigintVal = u64.toBigInt();
        const hexVal = u64.toHexString();
        const apiRequest = u64.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(hexVal).toBe(`0x${val.toString(16)}`);
        expect(apiRequest[0]).toBe(hexVal);
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 100, 1000000, 2147483647];
      testValues.forEach((val) => {
        const u64FromNumber = new CairoUint64(val);
        const u64FromBigint = new CairoUint64(BigInt(val));

        expect(u64FromNumber.data).toBe(u64FromBigint.data);
        expect(u64FromNumber.toBigInt()).toBe(u64FromBigint.toBigInt());
        expect(u64FromNumber.toHexString()).toBe(u64FromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u64 = new CairoUint64(maxU64);
      expect(u64.toBigInt()).toBe(maxU64);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoUint64 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xf4240', done: false }),
      };
      const u64 = CairoUint64.factoryFromApiResponse(mockIterator as any);
      expect(u64.data).toBe(0xf4240n);
    });

    test('should handle hex string from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xffffffffffffffff', done: false }),
      };
      const u64 = CairoUint64.factoryFromApiResponse(mockIterator as any);
      expect(u64.data).toBe(2n ** 64n - 1n);
    });

    test('should handle large values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '9223372036854775807', done: false }),
      };
      const u64 = CairoUint64.factoryFromApiResponse(mockIterator as any);
      expect(u64.data).toBe(9223372036854775807n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 1000000;
      const u64FromNumber = new CairoUint64(testValue);
      const u64FromBigint = new CairoUint64(BigInt(testValue));
      const u64FromString = new CairoUint64(testValue.toString());

      expect(u64FromNumber.toBigInt()).toBe(u64FromBigint.toBigInt());
      expect(u64FromNumber.toBigInt()).toBe(u64FromString.toBigInt());
      expect(u64FromBigint.toBigInt()).toBe(u64FromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 1000000;
      const u64 = new CairoUint64(originalValue);
      const bigintValue = u64.toBigInt();
      const newU64 = new CairoUint64(bigintValue);

      expect(newU64.toBigInt()).toBe(BigInt(originalValue));
      expect(newU64.data).toBe(u64.data);
    });
  });

  describe('large number handling', () => {
    test('should handle values larger than JavaScript safe integer', () => {
      const largeValue = BigInt(Number.MAX_SAFE_INTEGER) * 2n;
      const u64 = new CairoUint64(largeValue);
      expect(u64.toBigInt()).toBe(largeValue);
      expect(u64.toHexString()).toBe(`0x${largeValue.toString(16)}`);
    });

    test('should handle powers of 2 correctly', () => {
      const powersOf2 = [2n ** 32n, 2n ** 48n, 2n ** 56n, 2n ** 63n];
      powersOf2.forEach((power) => {
        const u64 = new CairoUint64(power);
        expect(u64.toBigInt()).toBe(power);
      });
    });
  });
});
