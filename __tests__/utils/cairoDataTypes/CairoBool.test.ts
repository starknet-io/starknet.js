import { CairoBool } from '../../../src';

describe('CairoBool class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle boolean input', () => {
      expect(new CairoBool(true).data).toBe(true);
      expect(new CairoBool(false).data).toBe(false);
    });

    test('should handle the two numbers a bool occupies', () => {
      expect(new CairoBool(1).data).toBe(true);
      expect(new CairoBool(0).data).toBe(false);
    });

    test('should handle bigint input', () => {
      expect(new CairoBool(1n).data).toBe(true);
      expect(new CairoBool(0n).data).toBe(false);
    });

    test('should handle decimal string input', () => {
      expect(new CairoBool('1').data).toBe(true);
      expect(new CairoBool('0').data).toBe(false);
    });

    test('should handle hexadecimal string input, as a response felt arrives', () => {
      expect(new CairoBool('0x1').data).toBe(true);
      expect(new CairoBool('0x0').data).toBe(false);
    });

    test('should always store a boolean', () => {
      expect(typeof new CairoBool(1).data).toBe('boolean');
      expect(typeof new CairoBool('0x0').data).toBe('boolean');
    });
  });

  describe('a bool is exactly two values', () => {
    test('should reject any other number, naming the value received', () => {
      expect(() => new CairoBool(2)).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 2'
      );
      expect(() => new CairoBool(255)).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 255'
      );
      expect(() => new CairoBool('0x2')).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 2'
      );
    });

    test('should reject a negative value', () => {
      // the message comes from the encoding layer rather than from this class
      expect(() => new CairoBool(-1)).toThrow('Cannot convert negative bigint');
    });
  });

  describe('text is not a bool', () => {
    test('should reject free-form text', () => {
      expect(() => new CairoBool('abc')).toThrow(
        'Invalid input: a core::bool cannot be built from text'
      );
      expect(() => new CairoBool('true')).toThrow(
        'Invalid input: a core::bool cannot be built from text'
      );
      expect(() => new CairoBool('')).toThrow(
        'Invalid input: a core::bool cannot be built from text'
      );
    });
  });

  describe('inputs a felt252 does not read', () => {
    test('should reject null and undefined', () => {
      expect(() => new CairoBool(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoBool(undefined)).toThrow('undefined value is not allowed for felt252');
    });

    test('should reject objects and arrays', () => {
      expect(() => new CairoBool({})).toThrow("Unsupported data type 'object' for felt252");
      expect(() => new CairoBool([])).toThrow("Unsupported data type 'object' for felt252");
    });

    test('should reject a decimal number', () => {
      expect(() => new CairoBool(1.5)).toThrow("1.5 can't be computed by felt()");
    });
  });

  describe('toBoolean method', () => {
    test('should return the stored boolean', () => {
      expect(new CairoBool(true).toBoolean()).toBe(true);
      expect(new CairoBool(0).toBoolean()).toBe(false);
      expect(new CairoBool('0x1').toBoolean()).toBe(true);
    });
  });

  describe('toHexString method', () => {
    test('should return the felt a bool occupies', () => {
      expect(new CairoBool(true).toHexString()).toBe('0x1');
      expect(new CairoBool(false).toHexString()).toBe('0x0');
    });
  });

  describe('toApiRequest method', () => {
    test('should return one decimal-string felt', () => {
      expect([...new CairoBool(true).toApiRequest()]).toEqual(['1']);
      expect([...new CairoBool(false).toApiRequest()]).toEqual(['0']);
    });

    test('should flag the result as compiled', () => {
      const request = new CairoBool(true).toApiRequest();
      expect(request).toHaveProperty('__compiled__', true);
      // the flag is not enumerable, so it does not show up as an element
      expect(Object.keys(request)).toEqual(['0']);
    });
  });

  describe('validate static method', () => {
    test('should pass for the accepted inputs', () => {
      expect(() => CairoBool.validate(true)).not.toThrow();
      expect(() => CairoBool.validate(false)).not.toThrow();
      expect(() => CairoBool.validate(1)).not.toThrow();
      expect(() => CairoBool.validate(0n)).not.toThrow();
      expect(() => CairoBool.validate('0x1')).not.toThrow();
    });

    test('should throw for a number that is neither 0 nor 1', () => {
      expect(() => CairoBool.validate(2)).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 2'
      );
    });

    test('should throw for text', () => {
      expect(() => CairoBool.validate('abc')).toThrow(
        'Invalid input: a core::bool cannot be built from text'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for a valid bool', () => {
      expect(CairoBool.is(true)).toBe(true);
      expect(CairoBool.is(false)).toBe(true);
      expect(CairoBool.is(1)).toBe(true);
      expect(CairoBool.is(0)).toBe(true);
      expect(CairoBool.is('0x1')).toBe(true);
    });

    test('should return false for anything this class refuses', () => {
      expect(CairoBool.is(2)).toBe(false);
      expect(CairoBool.is(-1)).toBe(false);
      expect(CairoBool.is(1.5)).toBe(false);
      expect(CairoBool.is('abc')).toBe(false);
      expect(CairoBool.is(null)).toBe(false);
      expect(CairoBool.is(undefined)).toBe(false);
      expect(CairoBool.is({})).toBe(false);
      expect(CairoBool.is([])).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should recognise its own abi type', () => {
      expect(CairoBool.abiSelector).toBe('core::bool');
      expect(CairoBool.isAbiType('core::bool')).toBe(true);
    });

    test('should reject any other abi type', () => {
      expect(CairoBool.isAbiType('core::felt252')).toBe(false);
      expect(CairoBool.isAbiType('core::integer::u8')).toBe(false);
    });
  });

  describe('factoryFromApiResponse static method', () => {
    test('should read one bool off a response', () => {
      expect(CairoBool.factoryFromApiResponse(['0x1'].values()).toBoolean()).toBe(true);
      expect(CairoBool.factoryFromApiResponse(['0x0'].values()).toBoolean()).toBe(false);
    });

    test('should consume exactly one felt per call', () => {
      const iterator = ['0x1', '0x0'].values();
      expect(CairoBool.factoryFromApiResponse(iterator).toBoolean()).toBe(true);
      expect(CairoBool.factoryFromApiResponse(iterator).toBoolean()).toBe(false);
    });

    test('should refuse a felt that is neither 0 nor 1', () => {
      expect(() => CairoBool.factoryFromApiResponse(['0x2'].values())).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 2'
      );
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      [true, false].forEach((value) => {
        const felts = [...new CairoBool(value).toApiRequest()];
        expect(CairoBool.factoryFromApiResponse(felts.values()).toBoolean()).toBe(value);
      });
    });
  });
});
