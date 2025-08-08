import { CairoFelt252 } from '../../../src/utils/cairoDataTypes/felt';
import { CairoUint32 } from '../../../src/utils/cairoDataTypes/uint32';

describe('CairoUint32 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u32 = new CairoUint32(42);
      expect(u32.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u32 = new CairoUint32(123n);
      expect(u32.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u32FromNumber = new CairoUint32(0);
      const u32FromBigint = new CairoUint32(0n);

      expect(u32FromNumber.data).toBe(0n);
      expect(u32FromBigint.data).toBe(0n);
    });

    test('should handle maximum u32 value', () => {
      const maxU32 = 2n ** 32n - 1n; // 4294967295
      const u32 = new CairoUint32(maxU32);
      expect(u32.data).toBe(maxU32);
    });

    test('should handle maximum u32 value as number', () => {
      const maxU32Number = 4294967295; // 2^32 - 1
      const u32 = new CairoUint32(maxU32Number);
      expect(u32.data).toBe(BigInt(maxU32Number));
    });

    test('should convert number to bigint internally', () => {
      const u32 = new CairoUint32(256);
      expect(typeof u32.data).toBe('bigint');
      expect(u32.data).toBe(256n);
    });
  });

  describe('validation', () => {
    test('should accept valid u32 values', () => {
      expect(() => new CairoUint32(0)).not.toThrow();
      expect(() => new CairoUint32(1)).not.toThrow();
      expect(() => new CairoUint32(4294967295)).not.toThrow(); // 2^32 - 1
      expect(() => new CairoUint32(0n)).not.toThrow();
      expect(() => new CairoUint32(1n)).not.toThrow();
      expect(() => new CairoUint32(2n ** 32n - 1n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint32(-1)).toThrow('Value is out of u32 range [0, 2^32)');
      expect(() => new CairoUint32(-100n)).toThrow('Value is out of u32 range [0, 2^32)');
    });

    test('should reject values greater than 2^32 - 1', () => {
      const overflowValue = 2n ** 32n; // 4294967296
      expect(() => new CairoUint32(overflowValue)).toThrow('Value is out of u32 range [0, 2^32)');
      expect(() => new CairoUint32(4294967296)).toThrow('Value is out of u32 range [0, 2^32)');
    });

    test('should handle valid string inputs correctly', () => {
      // Hex strings
      const u32FromHex = new CairoUint32('0x7b'); // 123 in hex
      expect(u32FromHex.data).toBe(123n);

      // Decimal strings
      const u32FromDecimal = new CairoUint32('456');
      expect(u32FromDecimal.data).toBe(456n);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      // UTF-8 text strings should be converted via UTF-8 encoding
      const u32FromA = new CairoUint32('A');
      expect(u32FromA.data).toBe(65n); // 'A' as UTF-8 = 65

      const u32FromHi = new CairoUint32('Hi');
      expect(u32FromHi.data).toBe(18537n); // 'Hi' as UTF-8 bytes

      // Long strings should also work if they fit in u32 range
      const u32FromShort = new CairoUint32('test');
      expect(u32FromShort.data).toBe(1952805748n); // 'test' as UTF-8 bytes
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => new CairoUint32({} as any)).toThrow();
      expect(() => new CairoUint32(undefined as any)).toThrow();
      expect(() => new CairoUint32(null as any)).toThrow();
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint32(3.14)).toThrow();
      expect(() => new CairoUint32(1.5)).toThrow();
    });

    test('should validate string inputs with out-of-range values', () => {
      expect(() => new CairoUint32('4294967296')).toThrow('Value is out of u32 range [0, 2^32)');
      // Note: '-1' is treated as text and converted via UTF-8, not as a number string
      // because it fails isStringWholeNumber (which only matches positive digits)
      expect(() => new CairoUint32('0x100000000')).toThrow('Value is out of u32 range [0, 2^32)');
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const u32 = new CairoUint32(42);
      expect(u32.toBigInt()).toBe(42n);
    });

    test('should handle zero', () => {
      const u32 = new CairoUint32(0);
      expect(u32.toBigInt()).toBe(0n);
    });

    test('should handle maximum u32 value', () => {
      const maxU32 = 2n ** 32n - 1n;
      const u32 = new CairoUint32(maxU32);
      expect(u32.toBigInt()).toBe(maxU32);
    });

    test('should handle large values', () => {
      const largeValue = 1000000000n;
      const u32 = new CairoUint32(largeValue);
      expect(u32.toBigInt()).toBe(largeValue);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u32 = new CairoUint32(0);
      expect(u32.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u32 = new CairoUint32(255);
      expect(u32.toHexString()).toBe('0xff');
    });

    test('should convert medium numbers to hex', () => {
      const u32 = new CairoUint32(4096);
      expect(u32.toHexString()).toBe('0x1000');
    });

    test('should convert large numbers to hex', () => {
      const u32 = new CairoUint32(0xdeadbeef);
      expect(u32.toHexString()).toBe('0xdeadbeef');
    });

    test('should convert maximum u32 value to hex', () => {
      const maxU32 = 2n ** 32n - 1n; // 0xffffffff
      const u32 = new CairoUint32(maxU32);
      expect(u32.toHexString()).toBe('0xffffffff');
    });

    test('should handle bigint input', () => {
      const u32 = new CairoUint32(256n);
      expect(u32.toHexString()).toBe('0x100');
    });
  });

  describe('toUnicode method', () => {
    test('should convert single byte values to Unicode', () => {
      const u32 = new CairoUint32(65); // ASCII 'A'
      expect(u32.decodeUtf8()).toBe('A');
    });

    test('should convert zero to null character', () => {
      const u32 = new CairoUint32(0);
      expect(u32.decodeUtf8()).toBe('\x00');
    });

    test('should convert multi-byte values to Unicode', () => {
      const u32 = new CairoUint32(0x4142); // 'AB' in ASCII
      expect(u32.decodeUtf8()).toBe('AB');
    });

    test('should handle special ASCII characters', () => {
      const u32 = new CairoUint32(33); // '!'
      expect(u32.decodeUtf8()).toBe('!');
    });

    test('should handle larger multi-byte sequences', () => {
      const u32 = new CairoUint32(0x48656c6c); // 'Hell' in ASCII
      expect(u32.decodeUtf8()).toBe('Hell');
    });

    test('should handle 4-byte values', () => {
      // Test with a 4-byte value that represents valid UTF-8
      const u32 = new CairoUint32(0x74657374); // 'test' in ASCII
      expect(u32.decodeUtf8()).toBe('test');
    });
  });

  describe('toApiRequest method', () => {
    test('should return decimal string array for zero', () => {
      const u32 = new CairoUint32(0);
      expect(u32.toApiRequest()).toEqual(['0']);
    });

    test('should return decimal string array for small numbers', () => {
      const u32 = new CairoUint32(42);
      expect(u32.toApiRequest()).toEqual(['42']);
    });

    test('should return decimal string array for large numbers', () => {
      const u32 = new CairoUint32(1000000);
      expect(u32.toApiRequest()).toEqual(['1000000']);
    });

    test('should return decimal string array for maximum u32', () => {
      const maxU32 = 2n ** 32n - 1n;
      const u32 = new CairoUint32(maxU32);
      expect(u32.toApiRequest()).toEqual(['4294967295']);
    });

    test('should handle bigint input', () => {
      const u32 = new CairoUint32(12345n);
      expect(u32.toApiRequest()).toEqual(['12345']);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint32.validate(0)).not.toThrow();
      expect(() => CairoUint32.validate(42)).not.toThrow();
      expect(() => CairoUint32.validate(4294967295)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint32.validate(0n)).not.toThrow();
      expect(() => CairoUint32.validate(42n)).not.toThrow();
      expect(() => CairoUint32.validate(2n ** 32n - 1n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint32.validate({} as any)).toThrow();
      expect(() => CairoUint32.validate(null as any)).toThrow();
      expect(() => CairoUint32.validate(undefined as any)).toThrow();
      expect(() => CairoUint32.validate('invalid' as any)).toThrow();
    });

    test('should reject negative values', () => {
      expect(() => CairoUint32.validate(-1)).toThrow('Value is out of u32 range [0, 2^32)');
      expect(() => CairoUint32.validate(-100n)).toThrow('Value is out of u32 range [0, 2^32)');
    });

    test('should reject values exceeding u32 range', () => {
      expect(() => CairoUint32.validate(2n ** 32n)).toThrow('Value is out of u32 range [0, 2^32)');
      expect(() => CairoUint32.validate(4294967296)).toThrow('Value is out of u32 range [0, 2^32)');
    });

    test('should reject decimal numbers', () => {
      // Decimal numbers throw when converting to BigInt
      expect(() => CairoUint32.validate(3.14)).toThrow();
      expect(() => CairoUint32.validate(1.5)).toThrow();
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint32.is(0)).toBe(true);
      expect(CairoUint32.is(42)).toBe(true);
      expect(CairoUint32.is(4294967295)).toBe(true);
      expect(CairoUint32.is(0n)).toBe(true);
      expect(CairoUint32.is(42n)).toBe(true);
      expect(CairoUint32.is(2n ** 32n - 1n)).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint32.is(2n ** 32n)).toBe(false);
      expect(CairoFelt252.is({} as any)).toBe(false);
      expect(CairoFelt252.is([] as any)).toBe(false);
      expect(CairoFelt252.is(null as any)).toBe(false);
      expect(CairoFelt252.is(3.14 as any)).toBe(false);
      expect(CairoFelt252.is(-1)).toBe(false);
      expect(CairoFelt252.is(-1n)).toBe(false);
      expect(CairoFelt252.is(undefined as any)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint32.isAbiType('core::u32::u32')).toBe(true);
      expect(CairoUint32.isAbiType('u32')).toBe(false);
      expect(CairoUint32.isAbiType('core::u64::u64')).toBe(false);
      expect(CairoUint32.isAbiType('core::felt252')).toBe(false);
      expect(CairoUint32.isAbiType('')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      // Test exactly at boundaries
      const minValue = 0;
      const maxValue = 4294967295; // 2^32 - 1

      const minU32 = new CairoUint32(minValue);
      const maxU32 = new CairoUint32(maxValue);

      expect(minU32.toBigInt()).toBe(0n);
      expect(maxU32.toBigInt()).toBe(4294967295n);
      expect(minU32.toHexString()).toBe('0x0');
      expect(maxU32.toHexString()).toBe('0xffffffff');
    });

    test('should maintain consistency across methods', () => {
      const testValues = [0, 1, 255, 256, 65535, 65536, 16777215, 16777216];

      testValues.forEach((value) => {
        const u32 = new CairoUint32(value);
        const bigintValue = u32.toBigInt();
        const hexValue = u32.toHexString();
        const apiValue = u32.toApiRequest();

        // Verify consistency
        expect(bigintValue).toBe(BigInt(value));
        expect(BigInt(hexValue)).toBe(bigintValue);
        expect(BigInt(apiValue[0])).toBe(bigintValue);
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValue = 12345;
      const u32FromNumber = new CairoUint32(testValue);
      const u32FromBigint = new CairoUint32(BigInt(testValue));

      expect(u32FromNumber.data).toBe(u32FromBigint.data);
      expect(u32FromNumber.toBigInt()).toBe(u32FromBigint.toBigInt());
      expect(u32FromNumber.toHexString()).toBe(u32FromBigint.toHexString());
      expect(u32FromNumber.toApiRequest()).toEqual(u32FromBigint.toApiRequest());
    });

    test('should preserve exact values without precision loss', () => {
      const testValues = [
        0,
        1,
        255,
        256,
        65535,
        65536,
        1000000,
        2147483647, // 2^31 - 1
        2147483648, // 2^31
        4294967294,
        4294967295, // 2^32 - 2, 2^32 - 1
      ];

      testValues.forEach((value) => {
        const u32 = new CairoUint32(value);
        expect(u32.toBigInt()).toBe(BigInt(value));
        expect(Number(u32.toBigInt())).toBe(value);
      });
    });

    test('should handle powers of 2 correctly', () => {
      const powersOf2 = [
        1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536,
      ];

      powersOf2.forEach((power) => {
        const u32 = new CairoUint32(power);
        expect(u32.toBigInt()).toBe(BigInt(power));
        expect(u32.toHexString()).toBe(`0x${power.toString(16)}`);
      });
    });

    test('should handle hexadecimal patterns correctly', () => {
      const hexValues = [0x0, 0x1, 0xff, 0x100, 0xffff, 0x10000, 0xffffff, 0x1000000, 0xffffffff];

      hexValues.forEach((hex) => {
        const u32 = new CairoUint32(hex);
        expect(u32.toBigInt()).toBe(BigInt(hex));
        expect(u32.toHexString()).toBe(`0x${hex.toString(16)}`);
      });
    });
  });

  describe('String handling', () => {
    describe('Hex strings', () => {
      test('should handle hex strings with 0x prefix', () => {
        const u32 = new CairoUint32('0xff');
        expect(u32.toBigInt()).toBe(255n);
        expect(u32.toHexString()).toBe('0xff');
      });

      test('should handle large hex strings', () => {
        const u32 = new CairoUint32('0xffffffff'); // Max u32
        expect(u32.toBigInt()).toBe(4294967295n);
        expect(u32.toHexString()).toBe('0xffffffff');
      });
    });

    describe('Decimal strings', () => {
      test('should handle decimal strings', () => {
        const u32 = new CairoUint32('12345');
        expect(u32.toBigInt()).toBe(12345n);
        expect(u32.decodeUtf8()).toBe('09'); // 12345 as bytes
      });

      test('should handle zero as decimal string', () => {
        const u32 = new CairoUint32('0');
        expect(u32.toBigInt()).toBe(0n);
        expect(u32.toHexString()).toBe('0x0');
      });

      test('should handle max u32 as decimal string', () => {
        const u32 = new CairoUint32('4294967295');
        expect(u32.toBigInt()).toBe(4294967295n);
        expect(u32.toHexString()).toBe('0xffffffff');
      });
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values', () => {
      const u32 = new CairoUint32(65); // 'A'
      expect(u32.decodeUtf8()).toBe('A');
    });

    test('should decode multi-byte values', () => {
      const u32 = new CairoUint32(0x48656c6c); // "Hell" (fits in u32)
      expect(u32.decodeUtf8()).toBe('Hell');
    });

    test('should handle zero', () => {
      const u32 = new CairoUint32(0);
      expect(u32.decodeUtf8()).toBe('\x00');
    });

    test('should handle ASCII range values', () => {
      for (let i = 32; i < 127; i += 1) {
        // Printable ASCII
        const u32 = new CairoUint32(i);
        expect(u32.decodeUtf8()).toBe(String.fromCharCode(i));
      }
    });
  });

  describe('Static methods', () => {
    describe('validate method', () => {
      test('should validate valid u32 range', () => {
        expect(() => CairoUint32.validate(0)).not.toThrow();
        expect(() => CairoUint32.validate(4294967295)).not.toThrow();
        expect(() => CairoUint32.validate(0n)).not.toThrow();
        expect(() => CairoUint32.validate(2n ** 32n - 1n)).not.toThrow();
      });

      test('should reject out-of-range values', () => {
        expect(() => CairoUint32.validate(-1)).toThrow('Value is out of u32 range [0, 2^32)');
        expect(() => CairoUint32.validate(4294967296)).toThrow(
          'Value is out of u32 range [0, 2^32)'
        );
        expect(() => CairoUint32.validate(2n ** 32n)).toThrow(
          'Value is out of u32 range [0, 2^32)'
        );
      });
    });

    describe('is method', () => {
      test('should return true for valid values', () => {
        expect(CairoUint32.is(0)).toBe(true);
        expect(CairoUint32.is(4294967295)).toBe(true);
        expect(CairoUint32.is(0n)).toBe(true);
        expect(CairoUint32.is(2n ** 32n - 1n)).toBe(true);
      });

      test('should return false for invalid values', () => {
        expect(CairoUint32.is(-1)).toBe(false);
        expect(CairoUint32.is(4294967296)).toBe(false);
        expect(CairoUint32.is(2n ** 32n)).toBe(false);
      });
    });

    describe('isAbiType method', () => {
      test('should return true for correct ABI selector', () => {
        expect(CairoUint32.isAbiType('core::u32::u32')).toBe(true);
      });

      test('should return false for incorrect ABI selector', () => {
        expect(CairoUint32.isAbiType('core::u64::u64')).toBe(false);
        expect(CairoUint32.isAbiType('core::felt252')).toBe(false);
        expect(CairoUint32.isAbiType('')).toBe(false);
      });
    });

    describe('factoryFromApiResponse method', () => {
      test('should create CairoUint32 from API response iterator', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '12345', done: false }),
        } as Iterator<string>;

        const u32 = CairoUint32.factoryFromApiResponse(mockIterator);
        expect(u32).toBeInstanceOf(CairoUint32);
        expect(u32.toBigInt()).toBe(12345n);
        expect(mockIterator.next).toHaveBeenCalledTimes(1);
      });

      test('should handle hex string from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0xff', done: false }),
        } as Iterator<string>;

        const u32 = CairoUint32.factoryFromApiResponse(mockIterator);
        expect(u32.toBigInt()).toBe(255n);
      });

      test('should handle max u32 value from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '4294967295', done: false }),
        } as Iterator<string>;

        const u32 = CairoUint32.factoryFromApiResponse(mockIterator);
        expect(u32.toBigInt()).toBe(4294967295n);
      });
    });
  });

  describe('Round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValues = [0, 1, 255, 65536, 4294967295];

      testValues.forEach((value) => {
        const u32FromNumber = new CairoUint32(value);
        const u32FromBigint = new CairoUint32(BigInt(value));
        const u32FromString = new CairoUint32(value.toString());
        const u32FromHex = new CairoUint32(`0x${value.toString(16)}`);

        // All should have the same internal value
        expect(u32FromNumber.toBigInt()).toBe(u32FromBigint.toBigInt());
        expect(u32FromNumber.toBigInt()).toBe(u32FromString.toBigInt());
        expect(u32FromNumber.toBigInt()).toBe(u32FromHex.toBigInt());

        // All should produce the same API request
        expect(u32FromNumber.toApiRequest()).toEqual(u32FromBigint.toApiRequest());
        expect(u32FromNumber.toApiRequest()).toEqual(u32FromString.toApiRequest());
        expect(u32FromNumber.toApiRequest()).toEqual(u32FromHex.toApiRequest());
      });
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const testStrings = ['123', '0xff'];

      testStrings.forEach((str) => {
        const u32 = new CairoUint32(str);
        const bigintValue = u32.toBigInt();
        const hexValue = u32.toHexString();

        // Creating from the hex should yield the same result
        const u32FromHex = new CairoUint32(hexValue);
        expect(u32FromHex.toBigInt()).toBe(bigintValue);
      });

      // Test numeric values for consistency
      const u32FromNumber = new CairoUint32(65); // 'A' as number
      const bigintFromNumber = u32FromNumber.toBigInt();
      const hexFromNumber = u32FromNumber.toHexString();
      const u32FromHex = new CairoUint32(hexFromNumber);
      expect(u32FromHex.toBigInt()).toBe(bigintFromNumber);
    });
  });
});
