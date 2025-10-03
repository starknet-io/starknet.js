import { CairoUint16 } from '../../../src/utils/cairoDataTypes/uint16';

describe('CairoUint16 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u16 = new CairoUint16(42);
      expect(u16.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u16 = new CairoUint16(123n);
      expect(u16.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u16FromNumber = new CairoUint16(0);
      const u16FromBigint = new CairoUint16(0n);

      expect(u16FromNumber.data).toBe(0n);
      expect(u16FromBigint.data).toBe(0n);
    });

    test('should handle maximum u16 value', () => {
      const maxU16 = 65535n;
      const u16 = new CairoUint16(maxU16);
      expect(u16.data).toBe(maxU16);
    });

    test('should handle maximum u16 value as number', () => {
      const u16 = new CairoUint16(65535);
      expect(u16.data).toBe(65535n);
    });

    test('should convert number to bigint internally', () => {
      const u16 = new CairoUint16(32768);
      expect(typeof u16.data).toBe('bigint');
      expect(u16.data).toBe(32768n);
    });
  });

  describe('validation', () => {
    test('should accept valid u16 values', () => {
      expect(() => new CairoUint16(0)).not.toThrow();
      expect(() => new CairoUint16(32768)).not.toThrow();
      expect(() => new CairoUint16(65535)).not.toThrow();
      expect(() => new CairoUint16('1000')).not.toThrow();
      expect(() => new CairoUint16(1000n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint16(-1)).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => new CairoUint16(-100n)).toThrow('Value is out of u16 range [0, 65535]');
      // Note: '-1' as string gets UTF-8 encoded and produces a large value, not -1
    });

    test('should reject values greater than 65535', () => {
      expect(() => new CairoUint16(65536)).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => new CairoUint16(100000n)).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => new CairoUint16('70000')).toThrow('Value is out of u16 range [0, 65535]');
    });

    test('should handle valid string inputs correctly', () => {
      const u16FromDecString = new CairoUint16('32768');
      const u16FromHexString = new CairoUint16('0xffff');

      expect(u16FromDecString.data).toBe(32768n);
      expect(u16FromHexString.data).toBe(65535n);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      const u16FromChar = new CairoUint16('A');
      expect(u16FromChar.data).toBe(65n); // ASCII value of 'A'
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoUint16.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint16.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint16.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint16.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint16(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoUint16(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should validate string inputs with out-of-range values', () => {
      expect(() => new CairoUint16('65536')).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => new CairoUint16('0x10000')).toThrow('Value is out of u16 range [0, 65535]');
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 1000, 32768, 65535];
      values.forEach((val) => {
        const u16 = new CairoUint16(val);
        expect(u16.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const u16 = new CairoUint16(0);
      expect(u16.toBigInt()).toBe(0n);
    });

    test('should handle maximum u16 value', () => {
      const u16 = new CairoUint16(65535);
      expect(u16.toBigInt()).toBe(65535n);
    });

    test('should handle large values', () => {
      const u16 = new CairoUint16(32768);
      expect(u16.toBigInt()).toBe(32768n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u16 = new CairoUint16(0);
      expect(u16.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u16 = new CairoUint16(15);
      expect(u16.toHexString()).toBe('0xf');
    });

    test('should convert medium numbers to hex', () => {
      const u16 = new CairoUint16(1000);
      expect(u16.toHexString()).toBe('0x3e8');
    });

    test('should convert large numbers to hex', () => {
      const u16 = new CairoUint16(32768);
      expect(u16.toHexString()).toBe('0x8000');
    });

    test('should convert maximum u16 value to hex', () => {
      const u16 = new CairoUint16(65535);
      expect(u16.toHexString()).toBe('0xffff');
    });

    test('should handle bigint input', () => {
      const u16 = new CairoUint16(4096n);
      expect(u16.toHexString()).toBe('0x1000');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values to Unicode', () => {
      const u16A = new CairoUint16(65); // 'A'
      const u16Z = new CairoUint16(90); // 'Z'
      const u16Zero = new CairoUint16(48); // '0'

      expect(u16A.decodeUtf8()).toBe('A');
      expect(u16Z.decodeUtf8()).toBe('Z');
      expect(u16Zero.decodeUtf8()).toBe('0');
    });

    test('should convert zero to null character', () => {
      const u16 = new CairoUint16(0);
      expect(u16.decodeUtf8()).toBe('\0');
    });

    test('should handle special ASCII characters', () => {
      const u16Space = new CairoUint16(32); // ' '
      const u16Exclamation = new CairoUint16(33); // '!'
      const u16AtSign = new CairoUint16(64); // '@'

      expect(u16Space.decodeUtf8()).toBe(' ');
      expect(u16Exclamation.decodeUtf8()).toBe('!');
      expect(u16AtSign.decodeUtf8()).toBe('@');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const u16 = new CairoUint16(0);
      const result = u16.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for small numbers', () => {
      const u16 = new CairoUint16(42);
      const result = u16.toApiRequest();
      expect(result).toEqual(['42']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for large numbers', () => {
      const u16 = new CairoUint16(65535);
      const result = u16.toApiRequest();
      expect(result).toEqual(['65535']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const u16 = new CairoUint16(32768n);
      const result = u16.toApiRequest();
      expect(result).toEqual(['32768']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint16.validate(0)).not.toThrow();
      expect(() => CairoUint16.validate(32768)).not.toThrow();
      expect(() => CairoUint16.validate(65535)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint16.validate(0n)).not.toThrow();
      expect(() => CairoUint16.validate(32768n)).not.toThrow();
      expect(() => CairoUint16.validate(65535n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint16.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint16.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint16.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint16.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoUint16.validate(-1)).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => CairoUint16.validate(-100n)).toThrow('Value is out of u16 range [0, 65535]');
    });

    test('should reject values exceeding u16 range', () => {
      expect(() => CairoUint16.validate(65536)).toThrow('Value is out of u16 range [0, 65535]');
      expect(() => CairoUint16.validate(100000n)).toThrow('Value is out of u16 range [0, 65535]');
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoUint16.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint16.is(0)).toBe(true);
      expect(CairoUint16.is(32768)).toBe(true);
      expect(CairoUint16.is(65535)).toBe(true);
      expect(CairoUint16.is(1000n)).toBe(true);
      expect(CairoUint16.is('32768')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint16.is(-1)).toBe(false);
      expect(CairoUint16.is(65536)).toBe(false);
      expect(CairoUint16.is(null as any)).toBe(false);
      expect(CairoUint16.is(undefined as any)).toBe(false);
      expect(CairoUint16.is({} as any)).toBe(false);
      expect(CairoUint16.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint16.isAbiType('core::integer::u16')).toBe(true);
      expect(CairoUint16.isAbiType('core::integer::u8')).toBe(false);
      expect(CairoUint16.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoUint16.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minU16 = new CairoUint16(0);
      const maxU16 = new CairoUint16(65535);

      expect(minU16.data).toBe(0n);
      expect(maxU16.data).toBe(65535n);
      expect(minU16.toBigInt()).toBe(0n);
      expect(maxU16.toBigInt()).toBe(65535n);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 1000, 32768, 65535];
      values.forEach((val) => {
        const u16 = new CairoUint16(val);
        const bigintVal = u16.toBigInt();
        const apiRequest = u16.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(apiRequest[0]).toBe(val.toString(10));
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 100, 1000, 32768, 65535];
      testValues.forEach((val) => {
        const u16FromNumber = new CairoUint16(val);
        const u16FromBigint = new CairoUint16(BigInt(val));

        expect(u16FromNumber.data).toBe(u16FromBigint.data);
        expect(u16FromNumber.toBigInt()).toBe(u16FromBigint.toBigInt());
        expect(u16FromNumber.toHexString()).toBe(u16FromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const u16 = new CairoUint16(65535);
      expect(u16.toBigInt()).toBe(65535n);
      expect(Number(u16.toBigInt())).toBe(65535);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoUint16 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0x1000', done: false }),
      };
      const u16 = CairoUint16.factoryFromApiResponse(mockIterator as any);
      expect(u16.data).toBe(0x1000n);
    });

    test('should handle hex string from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '0xffff', done: false }),
      };
      const u16 = CairoUint16.factoryFromApiResponse(mockIterator as any);
      expect(u16.data).toBe(65535n);
    });

    test('should handle max u16 value from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '65535', done: false }),
      };
      const u16 = CairoUint16.factoryFromApiResponse(mockIterator as any);
      expect(u16.data).toBe(65535n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 32768;
      const u16FromNumber = new CairoUint16(testValue);
      const u16FromBigint = new CairoUint16(BigInt(testValue));
      const u16FromString = new CairoUint16(testValue.toString());

      expect(u16FromNumber.toBigInt()).toBe(u16FromBigint.toBigInt());
      expect(u16FromNumber.toBigInt()).toBe(u16FromString.toBigInt());
      expect(u16FromBigint.toBigInt()).toBe(u16FromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 32768;
      const u16 = new CairoUint16(originalValue);
      const bigintValue = u16.toBigInt();
      const newU16 = new CairoUint16(bigintValue);

      expect(newU16.toBigInt()).toBe(BigInt(originalValue));
      expect(newU16.data).toBe(u16.data);
    });
  });
});
