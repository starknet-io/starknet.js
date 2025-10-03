import { CairoUint128 } from '../../../src/utils/cairoDataTypes/uint128';

describe('CairoUint128 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u128 = new CairoUint128(42);
      expect(u128.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u128 = new CairoUint128(123n);
      expect(u128.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u128FromNumber = new CairoUint128(0);
      const u128FromBigint = new CairoUint128(0n);

      expect(u128FromNumber.data).toBe(0n);
      expect(u128FromBigint.data).toBe(0n);
    });

    test('should handle maximum u128 value', () => {
      const maxU128 = 2n ** 128n - 1n;
      const u128 = new CairoUint128(maxU128);
      expect(u128.data).toBe(maxU128);
    });

    test('should handle very large values', () => {
      const largeValue = 2n ** 100n;
      const u128 = new CairoUint128(largeValue);
      expect(u128.data).toBe(largeValue);
    });

    test('should convert number to bigint internally', () => {
      const u128 = new CairoUint128(1000000);
      expect(typeof u128.data).toBe('bigint');
      expect(u128.data).toBe(1000000n);
    });
  });

  describe('validation', () => {
    test('should accept valid u128 values', () => {
      expect(() => new CairoUint128(0)).not.toThrow();
      expect(() => new CairoUint128(1000000)).not.toThrow();
      expect(() => new CairoUint128(2n ** 64n)).not.toThrow();
      expect(() => new CairoUint128(2n ** 96n)).not.toThrow();
      expect(() => new CairoUint128('1000000')).not.toThrow();
      expect(() => new CairoUint128(1000000n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint128(-1)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
      expect(() => new CairoUint128(-100n)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
    });

    test('should reject values greater than 340282366920938463463374607431768211455', () => {
      const overMax = 2n ** 128n;
      expect(() => new CairoUint128(overMax)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
      expect(() => new CairoUint128(overMax + 1n)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
    });

    test('should handle valid string inputs correctly', () => {
      const u128FromDecString = new CairoUint128('1000000');
      const u128FromHexString = new CairoUint128('0xffffffff');

      expect(u128FromDecString.data).toBe(1000000n);
      expect(u128FromHexString.data).toBe(0xffffffffn);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      const u128FromChar = new CairoUint128('A');
      expect(u128FromChar.data).toBe(65n); // ASCII value of 'A'
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoUint128.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint128.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint128.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint128.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint128(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoUint128(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 1000000, 2147483647, Number.MAX_SAFE_INTEGER];
      values.forEach((val) => {
        const u128 = new CairoUint128(val);
        expect(u128.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const u128 = new CairoUint128(0);
      expect(u128.toBigInt()).toBe(0n);
    });

    test('should handle maximum u128 value', () => {
      const maxU128 = 2n ** 128n - 1n;
      const u128 = new CairoUint128(maxU128);
      expect(u128.toBigInt()).toBe(maxU128);
    });

    test('should handle very large values', () => {
      const largeValue = 2n ** 120n;
      const u128 = new CairoUint128(largeValue);
      expect(u128.toBigInt()).toBe(largeValue);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u128 = new CairoUint128(0);
      expect(u128.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u128 = new CairoUint128(255);
      expect(u128.toHexString()).toBe('0xff');
    });

    test('should convert medium numbers to hex', () => {
      const u128 = new CairoUint128(1000000);
      expect(u128.toHexString()).toBe('0xf4240');
    });

    test('should convert large numbers to hex', () => {
      const u128 = new CairoUint128(0xffffffffffffffffn);
      expect(u128.toHexString()).toBe('0xffffffffffffffff');
    });

    test('should convert maximum u128 value to hex', () => {
      const maxU128 = 2n ** 128n - 1n;
      const u128 = new CairoUint128(maxU128);
      expect(u128.toHexString()).toBe('0xffffffffffffffffffffffffffffffff');
    });

    test('should handle bigint input', () => {
      const u128 = new CairoUint128(0x123456789abcdef0123456789abcdefn);
      expect(u128.toHexString()).toBe('0x123456789abcdef0123456789abcdef');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values to Unicode', () => {
      const u128A = new CairoUint128(65); // 'A'
      const u128Z = new CairoUint128(90); // 'Z'
      const u128Zero = new CairoUint128(48); // '0'

      expect(u128A.decodeUtf8()).toBe('A');
      expect(u128Z.decodeUtf8()).toBe('Z');
      expect(u128Zero.decodeUtf8()).toBe('0');
    });

    test('should convert zero to null character', () => {
      const u128 = new CairoUint128(0);
      expect(u128.decodeUtf8()).toBe('\0');
    });

    test('should handle special ASCII characters', () => {
      const u128Space = new CairoUint128(32); // ' '
      const u128Exclamation = new CairoUint128(33); // '!'
      const u128AtSign = new CairoUint128(64); // '@'

      expect(u128Space.decodeUtf8()).toBe(' ');
      expect(u128Exclamation.decodeUtf8()).toBe('!');
      expect(u128AtSign.decodeUtf8()).toBe('@');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const u128 = new CairoUint128(0);
      const result = u128.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for small numbers', () => {
      const u128 = new CairoUint128(42);
      const result = u128.toApiRequest();
      expect(result).toEqual(['42']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for large numbers', () => {
      const maxU128 = 2n ** 128n - 1n;
      const u128 = new CairoUint128(maxU128);
      const result = u128.toApiRequest();
      expect(result).toEqual(['340282366920938463463374607431768211455']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const u128 = new CairoUint128(0x123456789abcdef0123456789abcdefn);
      const result = u128.toApiRequest();
      expect(result).toEqual(['1512366075204170929049582354406559215']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint128.validate(0)).not.toThrow();
      expect(() => CairoUint128.validate(1000000)).not.toThrow();
      expect(() => CairoUint128.validate(Number.MAX_SAFE_INTEGER)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint128.validate(0n)).not.toThrow();
      expect(() => CairoUint128.validate(1000000n)).not.toThrow();
      expect(() => CairoUint128.validate(2n ** 128n - 1n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint128.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint128.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint128.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint128.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoUint128.validate(-1)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
      expect(() => CairoUint128.validate(-100n)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
    });

    test('should reject values exceeding u128 range', () => {
      expect(() => CairoUint128.validate(2n ** 128n)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
      expect(() => CairoUint128.validate(2n ** 128n + 1n)).toThrow(
        'Value is out of u128 range [0, 340282366920938463463374607431768211455]'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoUint128.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint128.is(0)).toBe(true);
      expect(CairoUint128.is(1000000)).toBe(true);
      expect(CairoUint128.is(2n ** 64n)).toBe(true);
      expect(CairoUint128.is(2n ** 96n)).toBe(true);
      expect(CairoUint128.is(1000000n)).toBe(true);
      expect(CairoUint128.is('1000000')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint128.is(-1)).toBe(false);
      expect(CairoUint128.is(2n ** 128n)).toBe(false);
      expect(CairoUint128.is(null as any)).toBe(false);
      expect(CairoUint128.is(undefined as any)).toBe(false);
      expect(CairoUint128.is({} as any)).toBe(false);
      expect(CairoUint128.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint128.isAbiType('core::integer::u128')).toBe(true);
      expect(CairoUint128.isAbiType('core::integer::u64')).toBe(false);
      expect(CairoUint128.isAbiType('core::integer::u256')).toBe(false);
      expect(CairoUint128.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minU128 = new CairoUint128(0);
      const maxU128 = new CairoUint128(2n ** 128n - 1n);

      expect(minU128.data).toBe(0n);
      expect(maxU128.data).toBe(2n ** 128n - 1n);
      expect(minU128.toBigInt()).toBe(0n);
      expect(maxU128.toBigInt()).toBe(2n ** 128n - 1n);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 1000000, 4294967295]; // Test values within safe integer range
      values.forEach((val) => {
        const u128 = new CairoUint128(val);
        const bigintVal = u128.toBigInt();
        const apiRequest = u128.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(apiRequest[0]).toBe(val.toString(10));
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 100, 1000000, 2147483647];
      testValues.forEach((val) => {
        const u128FromNumber = new CairoUint128(val);
        const u128FromBigint = new CairoUint128(BigInt(val));

        expect(u128FromNumber.data).toBe(u128FromBigint.data);
        expect(u128FromNumber.toBigInt()).toBe(u128FromBigint.toBigInt());
        expect(u128FromNumber.toHexString()).toBe(u128FromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const maxU128 = 2n ** 128n - 1n;
      const u128 = new CairoUint128(maxU128);
      expect(u128.toBigInt()).toBe(maxU128);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoUint128 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xf4240', done: false }),
      };
      const u128 = CairoUint128.factoryFromApiResponse(mockIterator as any);
      expect(u128.data).toBe(0xf4240n);
    });

    test('should handle hex string from API response', () => {
      const mockIterator = {
        next: jest
          .fn()
          .mockReturnValue({ value: '0xffffffffffffffffffffffffffffffff', done: false }),
      };
      const u128 = CairoUint128.factoryFromApiResponse(mockIterator as any);
      expect(u128.data).toBe(2n ** 128n - 1n);
    });

    test('should handle large decimal values from API response', () => {
      const largeValue = (2n ** 127n).toString();
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: largeValue, done: false }),
      };
      const u128 = CairoUint128.factoryFromApiResponse(mockIterator as any);
      expect(u128.data).toBe(2n ** 127n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 1000000;
      const u128FromNumber = new CairoUint128(testValue);
      const u128FromBigint = new CairoUint128(BigInt(testValue));
      const u128FromString = new CairoUint128(testValue.toString());

      expect(u128FromNumber.toBigInt()).toBe(u128FromBigint.toBigInt());
      expect(u128FromNumber.toBigInt()).toBe(u128FromString.toBigInt());
      expect(u128FromBigint.toBigInt()).toBe(u128FromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 1000000;
      const u128 = new CairoUint128(originalValue);
      const bigintValue = u128.toBigInt();
      const newU128 = new CairoUint128(bigintValue);

      expect(newU128.toBigInt()).toBe(BigInt(originalValue));
      expect(newU128.data).toBe(u128.data);
    });
  });

  describe('extremely large number handling', () => {
    test('should handle values much larger than u64 and u96 ranges', () => {
      const extremelyLargeValue = 2n ** 127n;
      const u128 = new CairoUint128(extremelyLargeValue);
      expect(u128.toBigInt()).toBe(extremelyLargeValue);
      expect(u128.toHexString()).toBe(`0x${extremelyLargeValue.toString(16)}`);
    });

    test('should handle powers of 2 correctly', () => {
      const powersOf2 = [2n ** 64n, 2n ** 80n, 2n ** 96n, 2n ** 112n, 2n ** 127n];
      powersOf2.forEach((power) => {
        const u128 = new CairoUint128(power);
        expect(u128.toBigInt()).toBe(power);
      });
    });

    test('should handle hex representations of very large numbers', () => {
      const hexValue = '0x123456789abcdef0123456789abcdef0'; // Valid u128 value
      const u128 = new CairoUint128(hexValue);
      expect(u128.toHexString().toLowerCase()).toBe(hexValue.toLowerCase());
    });
  });

  describe('comparison with smaller integer types', () => {
    test('should handle all u64 values correctly', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u128 = new CairoUint128(maxU64);
      expect(u128.toBigInt()).toBe(maxU64);
      expect(u128.data).toBe(maxU64);
    });

    test('should handle all u96 values correctly', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u128 = new CairoUint128(maxU96);
      expect(u128.toBigInt()).toBe(maxU96);
      expect(u128.data).toBe(maxU96);
    });

    test('should handle values just above u96 range', () => {
      const justAboveU96 = 2n ** 96n;
      const u128 = new CairoUint128(justAboveU96);
      expect(u128.toBigInt()).toBe(justAboveU96);
      expect(u128.data).toBe(justAboveU96);
    });
  });
});
