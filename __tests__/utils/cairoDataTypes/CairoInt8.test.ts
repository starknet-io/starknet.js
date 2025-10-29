import { CairoInt8, constants } from '../../../src';

const { PRIME } = constants;
describe('CairoInt8 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle positive number input', () => {
      const i8 = new CairoInt8(42);
      expect(i8.data).toBe(42n);
    });

    test('should handle negative number input', () => {
      const i8 = new CairoInt8(-42);
      expect(i8.data).toBe(-42n);
    });

    test('should handle bigint input', () => {
      const i8 = new CairoInt8(123n);
      expect(i8.data).toBe(123n);
    });

    test('should handle negative bigint input', () => {
      const i8 = new CairoInt8(-100n);
      expect(i8.data).toBe(-100n);
    });

    test('should handle zero values', () => {
      const i8FromNumber = new CairoInt8(0);
      const i8FromBigint = new CairoInt8(0n);

      expect(i8FromNumber.data).toBe(0n);
      expect(i8FromBigint.data).toBe(0n);
    });

    test('should handle maximum i8 value', () => {
      const maxI8 = 127n;
      const i8 = new CairoInt8(maxI8);
      expect(i8.data).toBe(maxI8);
    });

    test('should handle minimum i8 value', () => {
      const minI8 = -128n;
      const i8 = new CairoInt8(minI8);
      expect(i8.data).toBe(minI8);
    });
  });

  describe('validation', () => {
    test('should accept valid i8 values', () => {
      expect(() => new CairoInt8(-128)).not.toThrow();
      expect(() => new CairoInt8(0)).not.toThrow();
      expect(() => new CairoInt8(127)).not.toThrow();
      expect(() => new CairoInt8('A')).not.toThrow(); // UTF-8 encoded to 65
      expect(() => new CairoInt8(100n)).not.toThrow();
      expect(() => new CairoInt8(-50n)).not.toThrow();
    });

    test('should reject values less than -128', () => {
      expect(() => new CairoInt8(-129)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => new CairoInt8(-200n)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => new CairoInt8('-150')).toThrow('Value is out of i8 range [-128, 127]');
    });

    test('should reject values greater than 127', () => {
      expect(() => new CairoInt8(128)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => new CairoInt8(200n)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => new CairoInt8('150')).toThrow('Value is out of i8 range [-128, 127]');
    });

    test('should handle valid string inputs correctly', () => {
      const i8FromCharString = new CairoInt8('A'); // UTF-8 encoded to 65
      const i8FromNumString = new CairoInt8('5'); // Parsed as number 5
      const i8FromHexString = new CairoInt8('0x7f');

      expect(i8FromCharString.data).toBe(65n); // ASCII value of 'A'
      expect(i8FromNumString.data).toBe(5n); // Parsed as number
      expect(i8FromHexString.data).toBe(127n);
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoInt8(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoInt8(-1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoInt8.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt8.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt8.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt8.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should handle unknown data types properly', () => {
      // Valid unknown data types that can be converted
      expect(() => new CairoInt8('100' as unknown)).not.toThrow();
      expect(() => new CairoInt8(100 as unknown)).not.toThrow();
      expect(() => new CairoInt8(-100 as unknown)).not.toThrow();
      expect(() => new CairoInt8(100n as unknown)).not.toThrow();
      expect(() => new CairoInt8(-100n as unknown)).not.toThrow();
      expect(() => new CairoInt8(true as unknown)).not.toThrow(); // true -> 1
      expect(() => new CairoInt8(false as unknown)).not.toThrow(); // false -> 0

      // Invalid unknown data types
      expect(() => new CairoInt8({} as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoInt8([] as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoInt8(null as unknown)).toThrow('Invalid input: null or undefined');
      expect(() => new CairoInt8(undefined as unknown)).toThrow('Invalid input: null or undefined');
      expect(() => new CairoInt8(Symbol('test') as unknown)).toThrow();

      // Out of range values as unknown
      expect(() => new CairoInt8(128 as unknown)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => new CairoInt8(-129 as unknown)).toThrow('Value is out of i8 range [-128, 127]');
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [-128, -50, 0, 50, 127];
      values.forEach((val) => {
        const i8 = new CairoInt8(val);
        expect(i8.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle negative values', () => {
      const i8 = new CairoInt8(-100);
      expect(i8.toBigInt()).toBe(-100n);
    });

    test('should handle boundary values', () => {
      const minI8 = new CairoInt8(-128);
      const maxI8 = new CairoInt8(127);
      expect(minI8.toBigInt()).toBe(-128n);
      expect(maxI8.toBigInt()).toBe(127n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const i8 = new CairoInt8(0);
      expect(i8.toHexString()).toBe('0x0');
    });

    test('should convert positive numbers to hex', () => {
      const i8 = new CairoInt8(15);
      expect(i8.toHexString()).toBe('0xf');
    });

    test('should convert negative numbers to hex using field element representation', () => {
      const i8 = new CairoInt8(-1);
      // -1 becomes PRIME + (-1) = PRIME - 1
      const fieldElement = PRIME - 1n;
      expect(i8.toHexString()).toBe(`0x${fieldElement.toString(16)}`);
    });

    test('should convert boundary values to hex', () => {
      const minI8 = new CairoInt8(-128);
      const maxI8 = new CairoInt8(127);
      const minFieldElement = PRIME - 128n;
      expect(minI8.toHexString()).toBe(`0x${minFieldElement.toString(16)}`);
      expect(maxI8.toHexString()).toBe('0x7f');
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoInt8.validate(-128)).not.toThrow();
      expect(() => CairoInt8.validate(0)).not.toThrow();
      expect(() => CairoInt8.validate(127)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoInt8.validate(-128n)).not.toThrow();
      expect(() => CairoInt8.validate(0n)).not.toThrow();
      expect(() => CairoInt8.validate(127n)).not.toThrow();
    });

    test('should reject out-of-range values', () => {
      expect(() => CairoInt8.validate(-129)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => CairoInt8.validate(128)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => CairoInt8.validate(-200n)).toThrow('Value is out of i8 range [-128, 127]');
      expect(() => CairoInt8.validate(200n)).toThrow('Value is out of i8 range [-128, 127]');
    });

    test('should reject invalid types', () => {
      expect(() => CairoInt8.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoInt8.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoInt8.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoInt8.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoInt8.is(-128)).toBe(true);
      expect(CairoInt8.is(0)).toBe(true);
      expect(CairoInt8.is(127)).toBe(true);
      expect(CairoInt8.is(-50n)).toBe(true);
      expect(CairoInt8.is('A')).toBe(true); // UTF-8 encoded to 65
      expect(CairoInt8.is('0')).toBe(true); // UTF-8 encoded to 48
    });

    test('should return false for invalid inputs', () => {
      expect(CairoInt8.is(-129)).toBe(false);
      expect(CairoInt8.is(128)).toBe(false);
      expect(CairoInt8.is(null as any)).toBe(false);
      expect(CairoInt8.is(undefined as any)).toBe(false);
      expect(CairoInt8.is({} as any)).toBe(false);
      expect(CairoInt8.is(42.5)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoInt8.isAbiType('core::integer::i8')).toBe(true);
      expect(CairoInt8.isAbiType('core::integer::i16')).toBe(false);
      expect(CairoInt8.isAbiType('core::integer::u8')).toBe(false);
      expect(CairoInt8.isAbiType('felt252')).toBe(false);
    });
  });

  describe('signed integer specific tests', () => {
    test('should handle negative values correctly', () => {
      const negativeValues = [-128, -100, -50, -1];
      negativeValues.forEach((val) => {
        const i8 = new CairoInt8(val);
        expect(i8.data).toBe(BigInt(val));
        expect(i8.toBigInt()).toBe(BigInt(val));
      });
    });

    test("should handle two's complement boundary correctly", () => {
      const minI8 = new CairoInt8(-128);
      const maxI8 = new CairoInt8(127);

      expect(minI8.data).toBe(-128n);
      expect(maxI8.data).toBe(127n);

      // Test that -129 and 128 are rejected
      expect(() => new CairoInt8(-129)).toThrow();
      expect(() => new CairoInt8(128)).toThrow();
    });

    test('should maintain sign consistency', () => {
      const testCases = [
        { input: -100, expected: -100n },
        { input: 100, expected: 100n },
        { input: 'A', expected: 65n }, // UTF-8 encoded
        { input: '5', expected: 5n }, // Parsed as number
        { input: -1n, expected: -1n },
        { input: 1n, expected: 1n },
      ];

      testCases.forEach(({ input, expected }) => {
        const i8 = new CairoInt8(input as any);
        expect(i8.data).toBe(expected);
        expect(i8.toBigInt()).toBe(expected);
      });
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode UTF-8 bytes correctly for positive values', () => {
      const i8 = new CairoInt8(65); // ASCII 'A'
      expect(i8.decodeUtf8()).toBe('A');
    });

    test('should decode UTF-8 bytes for character values', () => {
      const testCases = [
        { input: 72, expected: 'H' }, // ASCII 'H'
        { input: 48, expected: '0' }, // ASCII '0'
        { input: 33, expected: '!' }, // ASCII '!'
      ];

      testCases.forEach(({ input, expected }) => {
        const i8 = new CairoInt8(input);
        expect(i8.decodeUtf8()).toBe(expected);
      });
    });

    test('should handle zero value', () => {
      const i8 = new CairoInt8(0);
      expect(i8.decodeUtf8()).toBe('\x00'); // null character
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const i8 = new CairoInt8(0);
      const result = i8.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for positive numbers', () => {
      const i8 = new CairoInt8(100);
      const result = i8.toApiRequest();
      expect(result).toEqual(['100']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return field element hex representation for negative numbers', () => {
      const i8 = new CairoInt8(-100);
      const result = i8.toApiRequest();
      // Negative value -100 becomes PRIME + (-100) = PRIME - 100
      const fieldElement = PRIME - 100n;
      const expectedValue = fieldElement.toString(10);
      expect(result).toEqual([expectedValue]);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle boundary values', () => {
      const minI8 = new CairoInt8(-128);
      const maxI8 = new CairoInt8(127);
      const minFieldElement = PRIME - 128n;
      const expectedMinValue = minFieldElement.toString(10);
      expect(minI8.toApiRequest()).toEqual([expectedMinValue]);
      expect(maxI8.toApiRequest()).toEqual(['127']);
    });
  });

  describe('factoryFromApiResponse method', () => {
    test('should create CairoInt8 from API response iterator', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '100', done: false }),
      };
      const i8 = CairoInt8.factoryFromApiResponse(mockIterator as any);
      expect(i8.data).toBe(100n);
    });

    test('should handle positive values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '127', done: false }),
      };
      const i8 = CairoInt8.factoryFromApiResponse(mockIterator as any);
      expect(i8.data).toBe(127n);
    });

    test('should handle boundary values from API response', () => {
      const mockIterator = {
        next: jest.fn().mockReturnValue({ value: '127', done: false }),
      };
      const i8 = CairoInt8.factoryFromApiResponse(mockIterator as any);
      expect(i8.data).toBe(127n);
    });
  });

  describe('round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValues = [-128, -50, 0, 50, 127];
      testValues.forEach((val) => {
        const i8FromNumber = new CairoInt8(val);
        const i8FromBigint = new CairoInt8(BigInt(val));
        // Skip string comparison as strings are UTF-8 encoded and produce different values

        expect(i8FromNumber.toBigInt()).toBe(i8FromBigint.toBigInt());
      });
    });

    test('should handle round-trip conversions', () => {
      const originalValue = -100;
      const i8 = new CairoInt8(originalValue);
      const bigintValue = i8.toBigInt();
      const newI8 = new CairoInt8(bigintValue);

      expect(newI8.toBigInt()).toBe(BigInt(originalValue));
      expect(newI8.data).toBe(i8.data);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minI8 = new CairoInt8(-128);
      const maxI8 = new CairoInt8(127);

      expect(minI8.data).toBe(-128n);
      expect(maxI8.data).toBe(127n);
      expect(minI8.toBigInt()).toBe(-128n);
      expect(maxI8.toBigInt()).toBe(127n);
    });

    test('should maintain consistency across methods', () => {
      const values = [-128, -100, 0, 100, 127];
      values.forEach((val) => {
        const i8 = new CairoInt8(val);
        const bigintVal = i8.toBigInt();
        const decimalVal = i8.toDecimalString();
        const apiRequest = i8.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        // For negative values, hex uses field element representation
        if (val < 0) {
          const fieldElement = PRIME + BigInt(val);
          expect(decimalVal).toBe(fieldElement.toString(10));
        } else {
          expect(decimalVal).toBe(val.toString(10));
        }
        // apiRequest should equal hexVal
        expect(apiRequest[0]).toBe(decimalVal);
      });
    });

    test('should preserve exact values without precision loss', () => {
      const testValues = [-128, -100, 0, 100, 127];
      testValues.forEach((val) => {
        const i8 = new CairoInt8(val);
        expect(i8.toBigInt()).toBe(BigInt(val));
        expect(Number(i8.toBigInt())).toBe(val);
      });
    });

    test('should handle min and max edge cases', () => {
      const minValue = -128;
      const maxValue = 127;

      const minI8 = new CairoInt8(minValue);
      const maxI8 = new CairoInt8(maxValue);

      expect(minI8.toBigInt()).toBe(BigInt(minValue));
      expect(maxI8.toBigInt()).toBe(BigInt(maxValue));

      const minFieldElement = PRIME - 128n;
      expect(minI8.toHexString()).toBe(`0x${minFieldElement.toString(16)}`);
      expect(maxI8.toHexString()).toBe('0x7f');
    });
  });
});
