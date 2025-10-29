import { CairoFixedArray, CallData, hdParsingStrategy } from '../../../src';

describe('CairoFixedArray class Unit test', () => {
  test('inputs for a CairoFixedArray instance', () => {
    expect(
      new CairoFixedArray([2, 4, 6], '[core::integer::u32; 3]', hdParsingStrategy)
    ).toBeDefined();
    expect(
      () => new CairoFixedArray([2, 4, 6], '[core::integer::u32; zorg]', hdParsingStrategy)
    ).toThrow();
    expect(
      () => new CairoFixedArray([2, 4, 6], '[core::integer::u32]', hdParsingStrategy)
    ).toThrow();
    expect(
      () => new CairoFixedArray([2, 4, 6], 'core::integer::u32; 3', hdParsingStrategy)
    ).toThrow();
    expect(() => new CairoFixedArray([2, 4, 6], '[; 3]', hdParsingStrategy)).toThrow();
  });

  test('use static class methods', () => {
    const myFixedArray = new CairoFixedArray(
      [1, 2, 3],
      '[core::integer::u32; 3]',
      hdParsingStrategy
    );
    expect(CairoFixedArray.getFixedArraySize(myFixedArray.arrayType)).toBe(3);
    expect(CairoFixedArray.getFixedArrayType(myFixedArray.arrayType)).toBe('core::integer::u32');
  });

  test('use static methods for CallData.compile()', () => {
    expect(CairoFixedArray.getFixedArraySize('[core::integer::u32; 8]')).toBe(8);
    expect(() => CairoFixedArray.getFixedArraySize('[core::integer::u32; zorg]')).toThrow();
    expect(CairoFixedArray.getFixedArrayType('[core::integer::u32; 8]')).toBe('core::integer::u32');
    expect(() => CairoFixedArray.getFixedArrayType('[; 8]')).toThrow();
    expect(CairoFixedArray.isAbiType('[core::integer::u32; 8]')).toBe(true);
    expect(CairoFixedArray.isAbiType('[core::integer::u32;8]')).toBe(false);
    expect(CairoFixedArray.isAbiType('[core::integer::u32; zorg]')).toBe(false);
  });

  test('CairoFixedArray works with CallData.compile()', () => {
    const myFixedArray = new CairoFixedArray(
      [10, 20, 30],
      '[core::integer::u32; 3]',
      hdParsingStrategy
    );
    const compiled = CallData.compile([myFixedArray]);
    expect(compiled).toEqual(['10', '20', '30']);
  });

  test('constructor with API response data', () => {
    // Test simple u8 array
    const u8Response = ['0x1', '0x2', '0x3'];
    const u8Iterator = u8Response[Symbol.iterator]();
    const u8Result = new CairoFixedArray(u8Iterator, '[core::integer::u8; 3]', hdParsingStrategy);
    expect(u8Result.decompose(hdParsingStrategy)).toEqual([1n, 2n, 3n]);

    // Test with same parsing strategy (hdParsingStrategy)
    const u8ResponseSecond = ['0x10', '0x20', '0x30'];
    const u8IteratorSecond = u8ResponseSecond[Symbol.iterator]();
    const u8ResultSecond = new CairoFixedArray(
      u8IteratorSecond,
      '[core::integer::u8; 3]',
      hdParsingStrategy
    );
    expect(u8ResultSecond.decompose(hdParsingStrategy)).toEqual([16n, 32n, 48n]);
  });

  test('constructor with nested fixed arrays API response', () => {
    // Test nested arrays: [[u8; 2]; 2] = [[1, 2], [3, 4]]
    const nestedResponse = ['0x1', '0x2', '0x3', '0x4'];
    const nestedIterator = nestedResponse[Symbol.iterator]();
    const nestedResult = new CairoFixedArray(
      nestedIterator,
      '[[core::integer::u8; 2]; 2]',
      hdParsingStrategy
    );
    expect(nestedResult.decompose(hdParsingStrategy)).toEqual([
      [1n, 2n],
      [3n, 4n],
    ]);

    // Test deeply nested arrays: [[[u8; 3]; 2]; 2]
    const deeplyNestedResponse = [
      '0x1',
      '0x2',
      '0x3',
      '0x4',
      '0x5',
      '0x6',
      '0x7',
      '0x8',
      '0x9',
      '0xa',
      '0xb',
      '0xc',
    ];
    const deeplyNestedIterator = deeplyNestedResponse[Symbol.iterator]();
    const deeplyNestedResult = new CairoFixedArray(
      deeplyNestedIterator,
      '[[[core::integer::u8; 3]; 2]; 2]',
      hdParsingStrategy
    );
    expect(deeplyNestedResult.decompose(hdParsingStrategy)).toEqual([
      [
        [1n, 2n, 3n],
        [4n, 5n, 6n],
      ],
      [
        [7n, 8n, 9n],
        [10n, 11n, 12n],
      ],
    ]);
  });

  test('constructor error handling with unsupported types', () => {
    const response = ['0x1', '0x2'];
    const iterator = response[Symbol.iterator]();

    // Test with unsupported element type - error should occur during decompose()
    const fixedArray = new CairoFixedArray(iterator, '[unsupported::type; 2]', hdParsingStrategy);
    expect(() => {
      fixedArray.decompose(hdParsingStrategy);
    }).toThrow('No parser found for element type: unsupported::type in parsing strategy');
  });

  describe('validate() static method', () => {
    test('should validate valid array inputs', () => {
      expect(() => {
        CairoFixedArray.validate([1, 2, 3], '[core::integer::u8; 3]');
      }).not.toThrow();

      expect(() => {
        CairoFixedArray.validate([1n, 2n, 3n], '[core::integer::u256; 3]');
      }).not.toThrow();

      expect(() => {
        CairoFixedArray.validate([], '[core::integer::u8; 0]');
      }).not.toThrow();
    });

    test('should validate valid object inputs', () => {
      expect(() => {
        CairoFixedArray.validate({ 0: 1, 1: 2, 2: 3 }, '[core::integer::u8; 3]');
      }).not.toThrow();

      expect(() => {
        CairoFixedArray.validate({ 0: 'a', 1: 'b' }, '[core::bytes31; 2]');
      }).not.toThrow();

      expect(() => {
        CairoFixedArray.validate({}, '[core::integer::u8; 0]');
      }).not.toThrow();
    });

    test('should reject invalid type formats', () => {
      expect(() => {
        CairoFixedArray.validate([1, 2, 3], 'invalid');
      }).toThrow('The type invalid is not a Cairo fixed array');

      expect(() => {
        CairoFixedArray.validate([1, 2, 3], '[core::integer::u8]');
      }).toThrow('The type [core::integer::u8] is not a Cairo fixed array');

      expect(() => {
        CairoFixedArray.validate([1, 2, 3], 'core::integer::u8; 3');
      }).toThrow('The type core::integer::u8; 3 is not a Cairo fixed array');

      expect(() => {
        CairoFixedArray.validate([1, 2, 3], '[; 3]');
      }).toThrow('The type [; 3] is not a Cairo fixed array');
    });

    test('should reject invalid input types', () => {
      expect(() => {
        CairoFixedArray.validate('invalid', '[core::integer::u8; 3]');
      }).toThrow('Invalid input: expected Array or Object, got string');

      expect(() => {
        CairoFixedArray.validate(123, '[core::integer::u8; 3]');
      }).toThrow('Invalid input: expected Array or Object, got number');

      expect(() => {
        CairoFixedArray.validate(null, '[core::integer::u8; 3]');
      }).toThrow('Invalid input: expected Array or Object, got object');

      expect(() => {
        CairoFixedArray.validate(undefined, '[core::integer::u8; 3]');
      }).toThrow('Invalid input: expected Array or Object, got undefined');
    });

    test('should reject mismatched array sizes', () => {
      expect(() => {
        CairoFixedArray.validate([1, 2], '[core::integer::u8; 3]');
      }).toThrow('ABI type [core::integer::u8; 3]: expected 3 items, got 2 items');

      expect(() => {
        CairoFixedArray.validate([1, 2, 3, 4], '[core::integer::u8; 3]');
      }).toThrow('ABI type [core::integer::u8; 3]: expected 3 items, got 4 items');

      expect(() => {
        CairoFixedArray.validate({ 0: 1, 1: 2 }, '[core::integer::u8; 3]');
      }).toThrow('ABI type [core::integer::u8; 3]: expected 3 items, got 2 items');
    });

    test('should handle edge cases', () => {
      // Empty arrays
      expect(() => {
        CairoFixedArray.validate([], '[core::integer::u8; 0]');
      }).not.toThrow();

      // Large arrays
      const largeArray = Array(1000).fill(1);
      expect(() => {
        CairoFixedArray.validate(largeArray, '[core::integer::u8; 1000]');
      }).not.toThrow();

      // Object with non-sequential keys
      expect(() => {
        CairoFixedArray.validate({ 0: 1, 2: 2, 1: 3 }, '[core::integer::u8; 3]');
      }).not.toThrow();
    });
  });

  describe('is() static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoFixedArray.is([1, 2, 3], '[core::integer::u8; 3]')).toBe(true);
      expect(CairoFixedArray.is({ 0: 1, 1: 2, 2: 3 }, '[core::integer::u8; 3]')).toBe(true);
      expect(CairoFixedArray.is([], '[core::integer::u8; 0]')).toBe(true);
      expect(CairoFixedArray.is([1n, 2n], '[core::integer::u256; 2]')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoFixedArray.is('invalid', '[core::integer::u8; 3]')).toBe(false);
      expect(CairoFixedArray.is(123, '[core::integer::u8; 3]')).toBe(false);
      expect(CairoFixedArray.is(null, '[core::integer::u8; 3]')).toBe(false);
      expect(CairoFixedArray.is(undefined, '[core::integer::u8; 3]')).toBe(false);
      expect(CairoFixedArray.is([1, 2], '[core::integer::u8; 3]')).toBe(false);
      expect(CairoFixedArray.is([1, 2, 3], 'invalid')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(CairoFixedArray.is([], '[core::integer::u8; 0]')).toBe(true);
      expect(CairoFixedArray.is({}, '[core::integer::u8; 0]')).toBe(true);

      const largeArray = Array(100).fill(1);
      expect(CairoFixedArray.is(largeArray, '[core::integer::u8; 100]')).toBe(true);
      expect(CairoFixedArray.is(largeArray, '[core::integer::u8; 99]')).toBe(false);
    });
  });

  describe('constructor + toApiRequest() pattern', () => {
    test('should create and serialize from array input', () => {
      const fixedArray = new CairoFixedArray(
        [1, 2, 3],
        '[core::integer::u8; 3]',
        hdParsingStrategy
      );
      const result = fixedArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3']);
    });

    test('should create and serialize from object input', () => {
      const fixedArray = new CairoFixedArray(
        { 0: 1, 1: 2, 2: 3 },
        '[core::integer::u8; 3]',
        hdParsingStrategy
      );
      const result = fixedArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3']);
    });

    test('should work with parsing strategy', () => {
      const array1 = new CairoFixedArray([1, 2], '[core::integer::u8; 2]', hdParsingStrategy);
      const array2 = new CairoFixedArray([1, 2], '[core::integer::u8; 2]', hdParsingStrategy);

      const result1 = array1.toApiRequest();
      const result2 = array2.toApiRequest();

      // Unified parsing strategy approach for API serialization
      expect(result1).toEqual(['1', '2']);
      expect(result2).toEqual(['1', '2']);
    });

    test('should throw for invalid inputs', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new CairoFixedArray('invalid', '[core::integer::u8; 3]', hdParsingStrategy);
      }).toThrow('Invalid input: expected Array or Object');

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new CairoFixedArray([1, 2], '[core::integer::u8; 3]', hdParsingStrategy);
      }).toThrow('expected 3 items, got 2 items');
    });

    test('should handle nested arrays', () => {
      const fixedArray = new CairoFixedArray(
        [
          [1, 2],
          [3, 4],
        ],
        '[[core::integer::u8; 2]; 2]',
        hdParsingStrategy
      );
      const result = fixedArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3', '4']);
    });

    test('should handle edge cases', () => {
      // Empty arrays
      const emptyArray = new CairoFixedArray([], '[core::integer::u8; 0]', hdParsingStrategy);
      const emptyResult = emptyArray.toApiRequest();
      expect(emptyResult).toEqual([]);

      // Single element
      const singleArray = new CairoFixedArray([42], '[core::integer::u8; 1]', hdParsingStrategy);
      const singleResult = singleArray.toApiRequest();
      expect(singleResult).toEqual(['42']);
    });
  });

  describe('toApiRequest() method', () => {
    test('should serialize simple arrays', () => {
      const fixedArray = new CairoFixedArray(
        [1, 2, 3],
        '[core::integer::u8; 3]',
        hdParsingStrategy
      );
      const result = fixedArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3']);
    });

    test('should work with hdParsingStrategy', () => {
      const array1 = new CairoFixedArray([100, 200], '[core::integer::u8; 2]', hdParsingStrategy);
      const array2 = new CairoFixedArray([100, 200], '[core::integer::u8; 2]', hdParsingStrategy);

      const result1 = array1.toApiRequest();
      const result2 = array2.toApiRequest();

      expect(result1).toEqual(['100', '200']);
      expect(result2).toEqual(['100', '200']);
    });

    test('should handle nested arrays', () => {
      const nestedArray = new CairoFixedArray(
        [
          [1, 2],
          [3, 4],
        ],
        '[[core::integer::u8; 2]; 2]',
        hdParsingStrategy
      );
      const result = nestedArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3', '4']);
    });

    test('should throw for unsupported element types', () => {
      expect(() => {
        new CairoFixedArray([1, 2], '[unsupported::type; 2]', hdParsingStrategy).toApiRequest();
      }).toThrow();
    });
  });

  describe('static properties', () => {
    test('should have correct dynamicSelector', () => {
      expect(CairoFixedArray.dynamicSelector).toBe('CairoFixedArray');
    });
  });

  describe('edge cases and boundary conditions', () => {
    test('should handle zero-length arrays', () => {
      const emptyArray = new CairoFixedArray([], '[core::integer::u8; 0]', hdParsingStrategy);
      expect(emptyArray.content).toEqual([]);
      expect(CairoFixedArray.getFixedArraySize(emptyArray.arrayType)).toBe(0);
      expect(emptyArray.toApiRequest()).toEqual([]);
    });

    test('should handle large arrays', () => {
      const largeContent = Array(1000).fill(1);
      const largeArray = new CairoFixedArray(
        largeContent,
        '[core::integer::u8; 1000]',
        hdParsingStrategy
      );
      expect(largeArray.content.length).toBe(1000);
      expect(CairoFixedArray.getFixedArraySize(largeArray.arrayType)).toBe(1000);
    });

    test('should handle complex nested structures', () => {
      // Test 3-level nesting: [[[u8; 2]; 2]; 2]
      const deepNested = [
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ];
      const complexArray = new CairoFixedArray(
        deepNested,
        '[[[core::integer::u8; 2]; 2]; 2]',
        hdParsingStrategy
      );
      const result = complexArray.toApiRequest();
      expect(result).toEqual(['1', '2', '3', '4', '5', '6', '7', '8']);
    });

    test('should handle mixed data types in content', () => {
      const mixedContent = [1, '2', 3n, 4];
      const mixedArray = new CairoFixedArray(mixedContent, '[core::felt252; 4]', hdParsingStrategy);
      const result = mixedArray.toApiRequest();
      expect(result.length).toBe(4);
    });

    test('should validate type format edge cases', () => {
      // Valid edge cases
      expect(CairoFixedArray.isAbiType('[a; 1]')).toBe(true);
      expect(CairoFixedArray.isAbiType('[very::long::type::name; 999]')).toBe(true);

      // Invalid edge cases
      expect(CairoFixedArray.isAbiType('[type; 0]')).toBe(true); // 0-length should be valid
      expect(CairoFixedArray.isAbiType('[type;1]')).toBe(false); // missing space
      expect(CairoFixedArray.isAbiType('[type ; 1]')).toBe(false); // extra space
      expect(CairoFixedArray.isAbiType('[type; 01]')).toBe(true); // leading zero is valid
    });
  });
});
