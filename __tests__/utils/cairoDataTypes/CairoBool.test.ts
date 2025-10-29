import { CairoBool } from '../../../src/utils/cairoDataTypes';

describe('CairoBool class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const bool = new CairoBool(1);
      expect(bool.data).toBe(true);
    });

    test('should handle bigint input', () => {
      const bool = new CairoBool(1n);
      expect(bool.data).toBe(true);
    });

    test('should handle zero values', () => {
      const boolFromNumber = new CairoBool(0);
      const boolFromBigint = new CairoBool(0n);

      expect(boolFromNumber.data).toBe(false);
      expect(boolFromBigint.data).toBe(false);
    });
  });

  describe('validation', () => {
    test('should reject negative values', () => {
      expect(() => new CairoBool(-1)).toThrow('Only values 0 or 1 are possible in a core::bool');
      expect(() => new CairoBool(-100n)).toThrow('Only values 0 or 1 are possible in a core::bool');
      expect(() => new CairoBool('-1')).toThrow('Only values 0 or 1 are possible in a core::bool');
    });

    test('should reject values greater than 1', () => {
      expect(() => new CairoBool(256)).toThrow('Only values 0 or 1 are possible in a core::bool');
      expect(() => new CairoBool(1000n)).toThrow('Only values 0 or 1 are possible in a core::bool');
      expect(() => new CairoBool('300')).toThrow('Only values 0 or 1 are possible in a core::bool');
    });

    test('should handle valid string inputs correctly', () => {
      const boolFromDecString = new CairoBool('0');
      const boolFromHexString = new CairoBool('0x1');

      expect(boolFromDecString.data).toBe(false);
      expect(boolFromHexString.data).toBe(true);
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoBool.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoBool.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoBool.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoBool.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should handle unknown data types properly', () => {
      // Valid unknown data types that can be converted
      expect(() => new CairoBool('1' as unknown)).not.toThrow();
      expect(() => new CairoBool(1 as unknown)).not.toThrow();
      expect(() => new CairoBool(1n as unknown)).not.toThrow();
      expect(() => new CairoBool(true as unknown)).not.toThrow();
      expect(() => new CairoBool(false as unknown)).not.toThrow();

      // Invalid unknown data types
      expect(() => new CairoBool({} as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoBool([] as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoBool(null as unknown)).toThrow('Invalid input: null or undefined');
      expect(() => new CairoBool(undefined as unknown)).toThrow('Invalid input: null or undefined');
      expect(() => new CairoBool(Symbol('test') as unknown)).toThrow();

      // Out of range values as unknown
      expect(() => new CairoBool(2 as unknown)).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
      expect(() => new CairoBool(-1 as unknown)).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoBool(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoBool(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should validate string inputs with out-of-range values', () => {
      expect(() => new CairoBool('256')).toThrow('Only values 0 or 1 are possible in a core::bool');
      expect(() => new CairoBool('0x100')).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
    });
  });

  describe('toBoolean method', () => {
    test('should return the stored boolean value', () => {
      const values = [0, 1];
      values.forEach((val) => {
        const bool = new CairoBool(val);
        expect(bool.toBoolean()).toBe(Boolean(val));
      });
    });

    test('should handle zero', () => {
      const bool = new CairoBool(0);
      expect(bool.toBoolean()).toBe(false);
    });

    test('should handle one', () => {
      const bool = new CairoBool(1);
      expect(bool.toBoolean()).toBe(true);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const bool = new CairoBool(0);
      expect(bool.toHexString()).toBe('0x0');
    });

    test('should convert 1 value to hex', () => {
      const bool = new CairoBool(1);
      expect(bool.toHexString()).toBe('0x1');
    });

    test('should handle bigint input', () => {
      const bool = new CairoBool(1n);
      expect(bool.toHexString()).toBe('0x1');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const bool = new CairoBool(0);
      const result = bool.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should return hex string array for 1 number', () => {
      const bool = new CairoBool(1);
      const result = bool.toApiRequest();
      expect(result).toEqual(['1']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const bool = new CairoBool(1n);
      const result = bool.toApiRequest();
      expect(result).toEqual(['1']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoBool.validate(0)).not.toThrow();
      expect(() => CairoBool.validate(1)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoBool.validate(0n)).not.toThrow();
      expect(() => CairoBool.validate(1n)).not.toThrow();
    });
    test('should validate correct bigint inputs', () => {
      expect(() => CairoBool.validate(false)).not.toThrow();
      expect(() => CairoBool.validate(true)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoBool.validate(null as any)).toThrow('Invalid input: null or undefined');
      expect(() => CairoBool.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoBool.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoBool.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoBool.validate(-1)).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
      expect(() => CairoBool.validate(-100n)).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
    });

    test('should reject values exceeding bool range', () => {
      expect(() => CairoBool.validate(2)).toThrow(
        'Only values 0 or 1 are possible in a core::bool'
      );
      // eslint-disable-next-line no-underscore-dangle
      expect(() => CairoBool.__processData(2)).toThrow('Invalid input for a core::bool');
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoBool.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoBool.is(0)).toBe(true);
      expect(CairoBool.is(1)).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoBool.is(-1)).toBe(false);
      expect(CairoBool.is(2)).toBe(false);
      expect(CairoBool.is(null as any)).toBe(false);
      expect(CairoBool.is(undefined as any)).toBe(false);
      expect(CairoBool.is({} as any)).toBe(false);
      expect(CairoBool.is(42.5)).toBe(false);
    });

    test('should handle unknown data types in is method', () => {
      // Valid unknown types
      expect(CairoBool.is(1 as unknown)).toBe(true);
      expect(CairoBool.is('0' as unknown)).toBe(true);
      expect(CairoBool.is(true as unknown)).toBe(true);
      expect(CairoBool.is(false as unknown)).toBe(true);

      // Invalid unknown types
      expect(CairoBool.is({} as unknown)).toBe(false);
      expect(CairoBool.is([] as unknown)).toBe(false);
      expect(CairoBool.is(null as unknown)).toBe(false);
      expect(CairoBool.is(undefined as unknown)).toBe(false);
      expect(CairoBool.is(Symbol('test') as unknown)).toBe(false);
      expect(CairoBool.is(2 as unknown)).toBe(false); // out of range
      expect(CairoBool.is(-1 as unknown)).toBe(false); // out of range
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoBool.isAbiType('core::bool')).toBe(true);
      expect(CairoBool.isAbiType('core::integer::u16')).toBe(false);
      expect(CairoBool.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoBool.isAbiType('felt252')).toBe(false);
    });
  });

  describe('Static methods', () => {
    describe('factoryFromApiResponse method', () => {
      test('should create CairoBool from API response iterator', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0x1', done: false }),
        };
        const bool = CairoBool.factoryFromApiResponse(mockIterator as any);
        expect(bool.data).toBe(true);
      });
    });
  });

  describe('Round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = true;
      const boolFromNumber = new CairoBool(testValue);
      const boolFromBigint = new CairoBool(1n);
      const boolFromString = new CairoBool('1');
      expect(boolFromNumber.toBoolean()).toBe(boolFromBigint.toBoolean());
      expect(boolFromNumber.toBoolean()).toBe(boolFromString.toBoolean());
      expect(boolFromBigint.toBoolean()).toBe(boolFromString.toBoolean());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 1;
      const bool = new CairoBool(originalValue);
      const bigintValue = bool.toBoolean();
      const newBool = new CairoBool(bigintValue);

      expect(newBool.toBoolean()).toBe(true);
      expect(newBool.data).toBe(bool.data);
    });
  });
});
