import { CairoUint8 } from '../../../src';

describe('CairoUint8 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const u8 = new CairoUint8(42);
      expect(u8.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const u8 = new CairoUint8(123n);
      expect(u8.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const u8FromNumber = new CairoUint8(0);
      const u8FromBigint = new CairoUint8(0n);

      expect(u8FromNumber.data).toBe(0n);
      expect(u8FromBigint.data).toBe(0n);
    });

    test('should handle maximum u8 value', () => {
      const maxU8 = 255n;
      const u8 = new CairoUint8(maxU8);
      expect(u8.data).toBe(maxU8);
    });

    test('should handle maximum u8 value as number', () => {
      const u8 = new CairoUint8(255);
      expect(u8.data).toBe(255n);
    });

    test('should convert number to bigint internally', () => {
      const u8 = new CairoUint8(200);
      expect(typeof u8.data).toBe('bigint');
      expect(u8.data).toBe(200n);
    });
  });

  describe('validation', () => {
    test('should accept valid u8 values', () => {
      expect(() => new CairoUint8(0)).not.toThrow();
      expect(() => new CairoUint8(128)).not.toThrow();
      expect(() => new CairoUint8(255)).not.toThrow();
      expect(() => new CairoUint8('100')).not.toThrow();
      expect(() => new CairoUint8(100n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoUint8(-1)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8(-100n)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8('-1')).toThrow('Value is out of u8 range [0, 255]');
    });

    test('should reject values greater than 255', () => {
      expect(() => new CairoUint8(256)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8(1000n)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8('300')).toThrow('Value is out of u8 range [0, 255]');
    });

    test('should handle valid string inputs correctly', () => {
      const u8FromDecString = new CairoUint8('200');
      const u8FromHexString = new CairoUint8('0xff');

      expect(u8FromDecString.data).toBe(200n);
      expect(u8FromHexString.data).toBe(255n);
    });

    test('should accept text strings and convert via UTF-8 encoding', () => {
      const u8FromChar = new CairoUint8('A');
      expect(u8FromChar.data).toBe(65n); // ASCII value of 'A'
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoUint8.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint8.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint8.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint8.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should handle unknown data types properly', () => {
      // Valid unknown data types that can be converted
      expect(() => new CairoUint8('100' as unknown)).not.toThrow();
      expect(() => new CairoUint8(100 as unknown)).not.toThrow();
      expect(() => new CairoUint8(100n as unknown)).not.toThrow();
      expect(() => new CairoUint8(true as unknown)).not.toThrow();
      expect(() => new CairoUint8(false as unknown)).not.toThrow();

      // Invalid unknown data types
      expect(() => new CairoUint8({} as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoUint8([] as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoUint8(null as unknown)).toThrow('Invalid input: null or undefined');
      expect(() => new CairoUint8(undefined as unknown)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => new CairoUint8(Symbol('test') as unknown)).toThrow();

      // Out of range values as unknown
      expect(() => new CairoUint8(256 as unknown)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8(-1 as unknown)).toThrow('Value is out of u8 range [0, 255]');
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoUint8(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoUint8(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should validate string inputs with out-of-range values', () => {
      expect(() => new CairoUint8('256')).toThrow('Value is out of u8 range [0, 255]');
      expect(() => new CairoUint8('0x100')).toThrow('Value is out of u8 range [0, 255]');
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 100, 200, 255];
      values.forEach((val) => {
        const u8 = new CairoUint8(val);
        expect(u8.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const u8 = new CairoUint8(0);
      expect(u8.toBigInt()).toBe(0n);
    });

    test('should handle maximum u8 value', () => {
      const u8 = new CairoUint8(255);
      expect(u8.toBigInt()).toBe(255n);
    });

    test('should handle large values', () => {
      const u8 = new CairoUint8(200);
      expect(u8.toBigInt()).toBe(200n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const u8 = new CairoUint8(0);
      expect(u8.toHexString()).toBe('0x0');
    });

    test('should convert small numbers to hex', () => {
      const u8 = new CairoUint8(15);
      expect(u8.toHexString()).toBe('0xf');
    });

    test('should convert medium numbers to hex', () => {
      const u8 = new CairoUint8(100);
      expect(u8.toHexString()).toBe('0x64');
    });

    test('should convert large numbers to hex', () => {
      const u8 = new CairoUint8(200);
      expect(u8.toHexString()).toBe('0xc8');
    });

    test('should convert maximum u8 value to hex', () => {
      const u8 = new CairoUint8(255);
      expect(u8.toHexString()).toBe('0xff');
    });

    test('should handle bigint input', () => {
      const u8 = new CairoUint8(170n);
      expect(u8.toHexString()).toBe('0xaa');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode single byte values to Unicode', () => {
      const u8A = new CairoUint8(65); // 'A'
      const u8Z = new CairoUint8(90); // 'Z'
      const u8Zero = new CairoUint8(48); // '0'

      expect(u8A.decodeUtf8()).toBe('A');
      expect(u8Z.decodeUtf8()).toBe('Z');
      expect(u8Zero.decodeUtf8()).toBe('0');
    });

    test('should convert zero to null character', () => {
      const u8 = new CairoUint8(0);
      expect(u8.decodeUtf8()).toBe('\0');
    });

    test('should handle special ASCII characters', () => {
      const u8Space = new CairoUint8(32); // ' '
      const u8Exclamation = new CairoUint8(33); // '!'
      const u8AtSign = new CairoUint8(64); // '@'

      expect(u8Space.decodeUtf8()).toBe(' ');
      expect(u8Exclamation.decodeUtf8()).toBe('!');
      expect(u8AtSign.decodeUtf8()).toBe('@');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const u8 = new CairoUint8(0);
      const result = u8.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for small numbers', () => {
      const u8 = new CairoUint8(42);
      const result = u8.toApiRequest();
      expect(result).toEqual(['42']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for large numbers', () => {
      const u8 = new CairoUint8(255);
      const result = u8.toApiRequest();
      expect(result).toEqual(['255']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const u8 = new CairoUint8(128n);
      const result = u8.toApiRequest();
      expect(result).toEqual(['128']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoUint8.validate(0)).not.toThrow();
      expect(() => CairoUint8.validate(128)).not.toThrow();
      expect(() => CairoUint8.validate(255)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoUint8.validate(0n)).not.toThrow();
      expect(() => CairoUint8.validate(128n)).not.toThrow();
      expect(() => CairoUint8.validate(255n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoUint8.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoUint8.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoUint8.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoUint8.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoUint8.validate(-1)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => CairoUint8.validate(-100n)).toThrow('Value is out of u8 range [0, 255]');
    });

    test('should reject values exceeding u8 range', () => {
      expect(() => CairoUint8.validate(256)).toThrow('Value is out of u8 range [0, 255]');
      expect(() => CairoUint8.validate(1000n)).toThrow('Value is out of u8 range [0, 255]');
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoUint8.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoUint8.is(0)).toBe(true);
      expect(CairoUint8.is(128)).toBe(true);
      expect(CairoUint8.is(255)).toBe(true);
      expect(CairoUint8.is(100n)).toBe(true);
      expect(CairoUint8.is('200')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoUint8.is(-1)).toBe(false);
      expect(CairoUint8.is(256)).toBe(false);
      expect(CairoUint8.is(null as any)).toBe(false);
      expect(CairoUint8.is(undefined as any)).toBe(false);
      expect(CairoUint8.is({} as any)).toBe(false);
      expect(CairoUint8.is(42.5)).toBe(false);
    });

    test('should handle unknown data types in is method', () => {
      // Valid unknown types
      expect(CairoUint8.is(100 as unknown)).toBe(true);
      expect(CairoUint8.is('200' as unknown)).toBe(true);
      expect(CairoUint8.is(true as unknown)).toBe(true);
      expect(CairoUint8.is(false as unknown)).toBe(true);

      // Invalid unknown types
      expect(CairoUint8.is({} as unknown)).toBe(false);
      expect(CairoUint8.is([] as unknown)).toBe(false);
      expect(CairoUint8.is(null as unknown)).toBe(false);
      expect(CairoUint8.is(undefined as unknown)).toBe(false);
      expect(CairoUint8.is(Symbol('test') as unknown)).toBe(false);
      expect(CairoUint8.is(256 as unknown)).toBe(false); // out of range
      expect(CairoUint8.is(-1 as unknown)).toBe(false); // out of range
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoUint8.isAbiType('core::integer::u8')).toBe(true);
      expect(CairoUint8.isAbiType('core::integer::u16')).toBe(false);
      expect(CairoUint8.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoUint8.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minU8 = new CairoUint8(0);
      const maxU8 = new CairoUint8(255);

      expect(minU8.data).toBe(0n);
      expect(maxU8.data).toBe(255n);
      expect(minU8.toBigInt()).toBe(0n);
      expect(maxU8.toBigInt()).toBe(255n);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 100, 200, 255];
      values.forEach((val) => {
        const u8 = new CairoUint8(val);
        const bigintVal = u8.toBigInt();
        const apiRequest = u8.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(apiRequest[0]).toBe(val.toString(10));
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 50, 100, 200, 255];
      testValues.forEach((val) => {
        const u8FromNumber = new CairoUint8(val);
        const u8FromBigint = new CairoUint8(BigInt(val));

        expect(u8FromNumber.data).toBe(u8FromBigint.data);
        expect(u8FromNumber.toBigInt()).toBe(u8FromBigint.toBigInt());
        expect(u8FromNumber.toHexString()).toBe(u8FromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const u8 = new CairoUint8(255);
      expect(u8.toBigInt()).toBe(255n);
      expect(Number(u8.toBigInt())).toBe(255);
    });
  });

  describe('String handling', () => {
    describe('Hex strings', () => {
      test('should handle hex strings with 0x prefix', () => {
        const u8 = new CairoUint8('0xff');
        expect(u8.data).toBe(255n);
      });

      test('should handle small hex-like strings as text', () => {
        const u8 = new CairoUint8('A'); // Hex-like character as text
        expect(u8.data).toBe(65n); // ASCII value of 'A'
      });
    });

    describe('Decimal strings', () => {
      test('should handle decimal strings', () => {
        const u8 = new CairoUint8('200');
        expect(u8.data).toBe(200n);
      });

      test('should handle zero as decimal string', () => {
        const u8 = new CairoUint8('0');
        expect(u8.data).toBe(0n);
      });

      test('should handle max u8 as decimal string', () => {
        const u8 = new CairoUint8('255');
        expect(u8.data).toBe(255n);
      });
    });
  });

  describe('Static methods', () => {
    describe('validate method', () => {
      test('should validate valid u8 range', () => {
        expect(() => CairoUint8.validate(0)).not.toThrow();
        expect(() => CairoUint8.validate(255)).not.toThrow();
        expect(() => CairoUint8.validate(128)).not.toThrow();
      });

      test('should reject out-of-range values', () => {
        expect(() => CairoUint8.validate(-1)).toThrow();
        expect(() => CairoUint8.validate(256)).toThrow();
      });
    });

    describe('is method', () => {
      test('should return true for valid values', () => {
        expect(CairoUint8.is(0)).toBe(true);
        expect(CairoUint8.is(255)).toBe(true);
        expect(CairoUint8.is('128')).toBe(true);
      });

      test('should return false for invalid values', () => {
        expect(CairoUint8.is(-1)).toBe(false);
        expect(CairoUint8.is(256)).toBe(false);
        expect(CairoUint8.is(null as any)).toBe(false);
      });
    });

    describe('isAbiType method', () => {
      test('should return true for correct ABI selector', () => {
        expect(CairoUint8.isAbiType('core::integer::u8')).toBe(true);
      });

      test('should return false for incorrect ABI selector', () => {
        expect(CairoUint8.isAbiType('core::integer::u16')).toBe(false);
        expect(CairoUint8.isAbiType('felt252')).toBe(false);
      });
    });

    describe('factoryFromApiResponse method', () => {
      test('should create CairoUint8 from API response iterator', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0x42', done: false }),
        };
        const u8 = CairoUint8.factoryFromApiResponse(mockIterator as any);
        expect(u8.data).toBe(0x42n);
      });

      test('should handle hex string from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0xff', done: false }),
        };
        const u8 = CairoUint8.factoryFromApiResponse(mockIterator as any);
        expect(u8.data).toBe(255n);
      });

      test('should handle max u8 value from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '255', done: false }),
        };
        const u8 = CairoUint8.factoryFromApiResponse(mockIterator as any);
        expect(u8.data).toBe(255n);
      });
    });
  });

  describe('Round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 200;
      const u8FromNumber = new CairoUint8(testValue);
      const u8FromBigint = new CairoUint8(BigInt(testValue));
      const u8FromString = new CairoUint8(testValue.toString());

      expect(u8FromNumber.toBigInt()).toBe(u8FromBigint.toBigInt());
      expect(u8FromNumber.toBigInt()).toBe(u8FromString.toBigInt());
      expect(u8FromBigint.toBigInt()).toBe(u8FromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 200;
      const u8 = new CairoUint8(originalValue);
      const bigintValue = u8.toBigInt();
      const newU8 = new CairoUint8(bigintValue);

      expect(newU8.toBigInt()).toBe(BigInt(originalValue));
      expect(newU8.data).toBe(u8.data);
    });
  });
});
