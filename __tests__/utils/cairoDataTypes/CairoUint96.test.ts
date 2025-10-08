import { CairoUint96 } from '../../../src';

describe('CairoUint96 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u96 = new CairoUint96(42);
      expect(u96.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u96 = new CairoUint96(123n);
      expect(u96.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u96FromNumber = new CairoUint96(0);
      const u96FromBigint = new CairoUint96(0n);

      expect(u96FromNumber.data).toBe(0n);
      expect(u96FromBigint.data).toBe(0n);
    });

    test('should handle maximum u96 value', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u96 = new CairoUint96(maxU96);
      expect(u96.data).toBe(maxU96);
    });

    test('should handle large values', () => {
      const largeValue = 2n ** 80n;
      const u96 = new CairoUint96(largeValue);
      expect(u96.data).toBe(largeValue);
    });

    test('should convert number to bigint internally', () => {
      const u96 = new CairoUint96(1000000);
      expect(typeof u96.data).toBe('bigint');
      expect(u96.data).toBe(1000000n);
    });
  });

  describe('validation', () => {
    test('should accept valid u96 values', () => {
      expect(() => new CairoUint96(0)).not.toThrow();
      expect(() => new CairoUint96(1000000)).not.toThrow();
      expect(() => new CairoUint96(2n ** 64n)).not.toThrow();
      expect(() => new CairoUint96('1000000')).not.toThrow();
      expect(() => new CairoUint96(1000000n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint96(-1)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
      expect(() => new CairoUint96(-100n)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
    });

    test('should reject values greater than 79228162514264337593543950335', () => {
      const overMax = 2n ** 96n;
      expect(() => new CairoUint96(overMax)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
      expect(() => new CairoUint96(overMax + 1n)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
    });

    test('should handle valid string inputs correctly', () => {
      const u96FromDecString = new CairoUint96('1000000');
      const u96FromHexString = new CairoUint96('0xffffffff');

      expect(u96FromDecString.data).toBe(1000000n);
      expect(u96FromHexString.data).toBe(0xffffffffn);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      const u96FromChar = new CairoUint96('A');
      expect(u96FromChar.data).toBe(65n); // ASCII value of 'A'
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoUint96.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint96.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint96.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint96.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint96(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoUint96(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 1000000, 2147483647, Number.MAX_SAFE_INTEGER];
      values.forEach((val) => {
        const u96 = new CairoUint96(val);
        expect(u96.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const u96 = new CairoUint96(0);
      expect(u96.toBigInt()).toBe(0n);
    });

    test('should handle maximum u96 value', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u96 = new CairoUint96(maxU96);
      expect(u96.toBigInt()).toBe(maxU96);
    });

    test('should handle large values', () => {
      const largeValue = 2n ** 80n;
      const u96 = new CairoUint96(largeValue);
      expect(u96.toBigInt()).toBe(largeValue);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u96 = new CairoUint96(0);
      expect(u96.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u96 = new CairoUint96(255);
      expect(u96.toHexString()).toBe('0xff');
    });

    test('should convert medium numbers to hex', () => {
      const u96 = new CairoUint96(1000000);
      expect(u96.toHexString()).toBe('0xf4240');
    });

    test('should convert large numbers to hex', () => {
      const u96 = new CairoUint96(0xffffffffffffffffn);
      expect(u96.toHexString()).toBe('0xffffffffffffffff');
    });

    test('should convert maximum u96 value to hex', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u96 = new CairoUint96(maxU96);
      expect(u96.toHexString()).toBe('0xffffffffffffffffffffffff');
    });

    test('should handle bigint input', () => {
      const u96 = new CairoUint96(0x123456789abcdef0123456n);
      expect(u96.toHexString()).toBe('0x123456789abcdef0123456');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values to Unicode', () => {
      const u96A = new CairoUint96(65); // 'A'
      const u96Z = new CairoUint96(90); // 'Z'
      const u96Zero = new CairoUint96(48); // '0'

      expect(u96A.decodeUtf8()).toBe('A');
      expect(u96Z.decodeUtf8()).toBe('Z');
      expect(u96Zero.decodeUtf8()).toBe('0');
    });

    test('should convert zero to null character', () => {
      const u96 = new CairoUint96(0);
      expect(u96.decodeUtf8()).toBe('\0');
    });

    test('should handle special ASCII characters', () => {
      const u96Space = new CairoUint96(32); // ' '
      const u96Exclamation = new CairoUint96(33); // '!'
      const u96AtSign = new CairoUint96(64); // '@'

      expect(u96Space.decodeUtf8()).toBe(' ');
      expect(u96Exclamation.decodeUtf8()).toBe('!');
      expect(u96AtSign.decodeUtf8()).toBe('@');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const u96 = new CairoUint96(0);
      const result = u96.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for small numbers', () => {
      const u96 = new CairoUint96(42);
      const result = u96.toApiRequest();
      expect(result).toEqual(['42']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for large numbers', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u96 = new CairoUint96(maxU96);
      const result = u96.toApiRequest();
      expect(result).toEqual(['79228162514264337593543950335']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const u96 = new CairoUint96(0x123456789abcdef0123456n);
      const result = u96.toApiRequest();
      expect(result).toEqual(['22007822920628982378542166']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint96.validate(0)).not.toThrow();
      expect(() => CairoUint96.validate(1000000)).not.toThrow();
      expect(() => CairoUint96.validate(Number.MAX_SAFE_INTEGER)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint96.validate(0n)).not.toThrow();
      expect(() => CairoUint96.validate(1000000n)).not.toThrow();
      expect(() => CairoUint96.validate(2n ** 96n - 1n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint96.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint96.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint96.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint96.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoUint96.validate(-1)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
      expect(() => CairoUint96.validate(-100n)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
    });

    test('should reject values exceeding u96 range', () => {
      expect(() => CairoUint96.validate(2n ** 96n)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
      expect(() => CairoUint96.validate(2n ** 96n + 1n)).toThrow(
        'Value is out of u96 range [0, 79228162514264337593543950335]'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoUint96.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint96.is(0)).toBe(true);
      expect(CairoUint96.is(1000000)).toBe(true);
      expect(CairoUint96.is(2n ** 64n)).toBe(true);
      expect(CairoUint96.is(1000000n)).toBe(true);
      expect(CairoUint96.is('1000000')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint96.is(-1)).toBe(false);
      expect(CairoUint96.is(2n ** 96n)).toBe(false);
      expect(CairoUint96.is(null as any)).toBe(false);
      expect(CairoUint96.is(undefined as any)).toBe(false);
      expect(CairoUint96.is({} as any)).toBe(false);
      expect(CairoUint96.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint96.isAbiType('core::integer::u96')).toBe(true);
      expect(CairoUint96.isAbiType('core::integer::u64')).toBe(false);
      expect(CairoUint96.isAbiType('core::integer::u128')).toBe(false);
      expect(CairoUint96.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minU96 = new CairoUint96(0);
      const maxU96 = new CairoUint96(2n ** 96n - 1n);

      expect(minU96.data).toBe(0n);
      expect(maxU96.data).toBe(2n ** 96n - 1n);
      expect(minU96.toBigInt()).toBe(0n);
      expect(maxU96.toBigInt()).toBe(2n ** 96n - 1n);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 1000000, 4294967295]; // Test values within safe integer range
      values.forEach((val) => {
        const u96 = new CairoUint96(val);
        const bigintVal = u96.toBigInt();
        const apiRequest = u96.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(apiRequest[0]).toBe(val.toString(10));
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 100, 1000000, 2147483647];
      testValues.forEach((val) => {
        const u96FromNumber = new CairoUint96(val);
        const u96FromBigint = new CairoUint96(BigInt(val));

        expect(u96FromNumber.data).toBe(u96FromBigint.data);
        expect(u96FromNumber.toBigInt()).toBe(u96FromBigint.toBigInt());
        expect(u96FromNumber.toHexString()).toBe(u96FromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const maxU96 = 2n ** 96n - 1n;
      const u96 = new CairoUint96(maxU96);
      expect(u96.toBigInt()).toBe(maxU96);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoUint96 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xf4240', done: false }),
      };
      const u96 = CairoUint96.factoryFromApiResponse(mockIterator as any);
      expect(u96.data).toBe(0xf4240n);
    });

    test('should handle hex string from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xffffffffffffffffffffffff', done: false }),
      };
      const u96 = CairoUint96.factoryFromApiResponse(mockIterator as any);
      expect(u96.data).toBe(2n ** 96n - 1n);
    });

    test('should handle large values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '79228162514264337593543950335', done: false }),
      };
      const u96 = CairoUint96.factoryFromApiResponse(mockIterator as any);
      expect(u96.data).toBe(2n ** 96n - 1n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 1000000;
      const u96FromNumber = new CairoUint96(testValue);
      const u96FromBigint = new CairoUint96(BigInt(testValue));
      const u96FromString = new CairoUint96(testValue.toString());

      expect(u96FromNumber.toBigInt()).toBe(u96FromBigint.toBigInt());
      expect(u96FromNumber.toBigInt()).toBe(u96FromString.toBigInt());
      expect(u96FromBigint.toBigInt()).toBe(u96FromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 1000000;
      const u96 = new CairoUint96(originalValue);
      const bigintValue = u96.toBigInt();
      const newU96 = new CairoUint96(bigintValue);

      expect(newU96.toBigInt()).toBe(BigInt(originalValue));
      expect(newU96.data).toBe(u96.data);
    });
  });

  describe('very large number handling', () => {
    test('should handle values much larger than u64 range', () => {
      const veryLargeValue = 2n ** 95n;
      const u96 = new CairoUint96(veryLargeValue);
      expect(u96.toBigInt()).toBe(veryLargeValue);
      expect(u96.toHexString()).toBe(`0x${veryLargeValue.toString(16)}`);
    });

    test('should handle powers of 2 correctly', () => {
      const powersOf2 = [2n ** 64n, 2n ** 72n, 2n ** 80n, 2n ** 88n, 2n ** 95n];
      powersOf2.forEach((power) => {
        const u96 = new CairoUint96(power);
        expect(u96.toBigInt()).toBe(power);
      });
    });

    test('should handle hex representations of large numbers', () => {
      const hexValue = '0x123456789abcdef012345678'; // Valid u96 value
      const u96 = new CairoUint96(hexValue);
      expect(u96.toHexString().toLowerCase()).toBe(hexValue.toLowerCase());
    });
  });

  describe('comparison with u64 behavior', () => {
    test('should handle all u64 values correctly', () => {
      const maxU64 = 2n ** 64n - 1n;
      const u96 = new CairoUint96(maxU64);
      expect(u96.toBigInt()).toBe(maxU64);
      expect(u96.data).toBe(maxU64);
    });

    test('should handle values just above u64 range', () => {
      const justAboveU64 = 2n ** 64n;
      const u96 = new CairoUint96(justAboveU64);
      expect(u96.toBigInt()).toBe(justAboveU64);
      expect(u96.data).toBe(justAboveU64);
    });
  });
});
