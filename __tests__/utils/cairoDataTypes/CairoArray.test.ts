import { CairoArray, CallData, hdParsingStrategy } from '../../../src';

describe('CairoArray class Unit test', () => {
  test('inputs for a CairoArray instance', () => {
    expect(
      new CairoArray([2, 4, 6], 'core::array::Array::<core::integer::u32>', hdParsingStrategy)
    ).toBeDefined();
    expect(
      new CairoArray([2, 4, 6], 'core::array::Span::<core::integer::u32>', hdParsingStrategy)
    ).toBeDefined();
    expect(() => new CairoArray([2, 4, 6], 'invalid::type', hdParsingStrategy)).toThrow();
    expect(() => new CairoArray([2, 4, 6], '[core::integer::u32; 3]', hdParsingStrategy)).toThrow();
    expect(() => new CairoArray([2, 4, 6], 'core::integer::u32', hdParsingStrategy)).toThrow();
  });

  test('use static class methods', () => {
    const myArray = new CairoArray(
      [1, 2, 3],
      'core::array::Array::<core::integer::u32>',
      hdParsingStrategy
    );
    expect(CairoArray.getArrayElementType(myArray.arrayType)).toBe('core::integer::u32');
    expect(CairoArray.isAbiType('core::array::Array::<core::integer::u32>')).toBe(true);
    expect(CairoArray.isAbiType('core::array::Span::<core::integer::u32>')).toBe(true);
    expect(CairoArray.isAbiType('[core::integer::u32; 8]')).toBe(false);
    expect(CairoArray.isAbiType('core::integer::u32')).toBe(false);
  });

  test('CairoArray works with CallData.compile()', () => {
    const myArray = new CairoArray(
      [10, 20, 30],
      'core::array::Array::<core::integer::u32>',
      hdParsingStrategy
    );
    const compiled = CallData.compile([myArray]);
    // Should include length prefix: ['3', '10', '20', '30']
    expect(compiled).toEqual(['3', '10', '20', '30']);
  });

  test('constructor with API response data (with length prefix)', () => {
    // Test simple u8 array
    const u8Response = ['0x2', '0x1', '0x2']; // length=2, elements=[1, 2]
    const u8Iterator = u8Response[Symbol.iterator]();
    const u8Result = new CairoArray(
      u8Iterator,
      'core::array::Array::<core::integer::u8>',
      hdParsingStrategy
    );
    expect(u8Result.decompose(hdParsingStrategy)).toEqual([1n, 2n]);

    // Test with same parsing strategy (hdParsingStrategy)
    const u8ResponseSecond = ['0x3', '0x10', '0x20', '0x30']; // length=3, elements=[16, 32, 48]
    const u8IteratorSecond = u8ResponseSecond[Symbol.iterator]();
    const u8ResultSecond = new CairoArray(
      u8IteratorSecond,
      'core::array::Array::<core::integer::u8>',
      hdParsingStrategy
    );
    expect(u8ResultSecond.decompose(hdParsingStrategy)).toEqual([16n, 32n, 48n]);
  });

  test('constructor with nested dynamic arrays API response', () => {
    // Test nested arrays: Array<Array<u8>> = [[1, 2], [3, 4]]
    // API format: [outerLength, innerLength1, elem1, elem2, innerLength2, elem3, elem4]
    const nestedResponse = ['0x2', '0x2', '0x1', '0x2', '0x2', '0x3', '0x4'];
    const nestedIterator = nestedResponse[Symbol.iterator]();
    const nestedResult = new CairoArray(
      nestedIterator,
      'core::array::Array::<core::array::Array::<core::integer::u8>>',
      hdParsingStrategy
    );
    expect(nestedResult.decompose(hdParsingStrategy)).toEqual([
      [1n, 2n],
      [3n, 4n],
    ]);

    // Test deeply nested arrays: Array<Array<Array<u8>>> = [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9]]]
    const deeplyNestedResponse = [
      '0x2', // outer length = 2
      '0x2', // first inner array length = 2
      '0x3',
      '0x1',
      '0x2',
      '0x3', // first inner-inner array: length=3, elements=[1,2,3]
      '0x3',
      '0x4',
      '0x5',
      '0x6', // second inner-inner array: length=3, elements=[4,5,6]
      '0x1', // second inner array length = 1
      '0x3',
      '0x7',
      '0x8',
      '0x9', // third inner-inner array: length=3, elements=[7,8,9]
    ];
    const deeplyNestedIterator = deeplyNestedResponse[Symbol.iterator]();
    const deeplyNestedResult = new CairoArray(
      deeplyNestedIterator,
      'core::array::Array::<core::array::Array::<core::array::Array::<core::integer::u8>>>',
      hdParsingStrategy
    );
    expect(deeplyNestedResult.decompose(hdParsingStrategy)).toEqual([
      [
        [1n, 2n, 3n],
        [4n, 5n, 6n],
      ],
      [[7n, 8n, 9n]],
    ]);
  });

  test('constructor error handling with unsupported types', () => {
    const response = ['0x2', '0x1', '0x2'];
    const iterator = response[Symbol.iterator]();

    // Test with unsupported element type - error should occur during decompose()
    const array = new CairoArray(
      iterator,
      'core::array::Array::<unsupported::type>',
      hdParsingStrategy
    );
    expect(() => {
      array.decompose(hdParsingStrategy);
    }).toThrow('No parser found for element type: unsupported::type in parsing strategy');
  });

  describe('validate() static method', () => {
    test('should validate valid array inputs', () => {
      expect(() => {
        CairoArray.validate([1, 2, 3], 'core::array::Array::<core::integer::u8>');
      }).not.toThrow();

      expect(() => {
        CairoArray.validate([1n, 2n, 3n], 'core::array::Span::<core::integer::u256>');
      }).not.toThrow();

      expect(() => {
        CairoArray.validate([], 'core::array::Array::<core::integer::u8>');
      }).not.toThrow();
    });

    test('should validate valid object inputs', () => {
      expect(() => {
        CairoArray.validate({ 0: 1, 1: 2, 2: 3 }, 'core::array::Array::<core::integer::u8>');
      }).not.toThrow();

      expect(() => {
        CairoArray.validate({ 0: 'a', 1: 'b' }, 'core::array::Array::<core::bytes31>');
      }).not.toThrow();

      expect(() => {
        CairoArray.validate({}, 'core::array::Array::<core::integer::u8>');
      }).not.toThrow();
    });

    test('should reject invalid type formats', () => {
      expect(() => {
        CairoArray.validate([1, 2, 3], 'invalid');
      }).toThrow('The type invalid is not a Cairo dynamic array');

      expect(() => {
        CairoArray.validate([1, 2, 3], '[core::integer::u8; 3]');
      }).toThrow('The type [core::integer::u8; 3] is not a Cairo dynamic array');

      expect(() => {
        CairoArray.validate([1, 2, 3], 'core::integer::u8');
      }).toThrow('The type core::integer::u8 is not a Cairo dynamic array');
    });

    test('should reject invalid input types', () => {
      expect(() => {
        CairoArray.validate('invalid', 'core::array::Array::<core::integer::u8>');
      }).toThrow('Invalid input: expected Array or Object, got string');

      expect(() => {
        CairoArray.validate(123, 'core::array::Array::<core::integer::u8>');
      }).toThrow('Invalid input: expected Array or Object, got number');

      expect(() => {
        CairoArray.validate(null, 'core::array::Array::<core::integer::u8>');
      }).toThrow('Invalid input: expected Array or Object, got object');

      expect(() => {
        CairoArray.validate(undefined, 'core::array::Array::<core::integer::u8>');
      }).toThrow('Invalid input: expected Array or Object, got undefined');
    });
  });

  describe('is() static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoArray.is([1, 2, 3], 'core::array::Array::<core::integer::u8>')).toBe(true);
      expect(CairoArray.is({ 0: 1, 1: 2, 2: 3 }, 'core::array::Span::<core::integer::u8>')).toBe(
        true
      );
      expect(CairoArray.is([], 'core::array::Array::<core::integer::u8>')).toBe(true);
      expect(CairoArray.is([1n, 2n], 'core::array::Array::<core::integer::u256>')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoArray.is('invalid', 'core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoArray.is(123, 'core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoArray.is(null, 'core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoArray.is(undefined, 'core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoArray.is([1, 2, 3], 'invalid')).toBe(false);
      expect(CairoArray.is([1, 2, 3], '[core::integer::u8; 3]')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(CairoArray.is([], 'core::array::Array::<core::integer::u8>')).toBe(true);
      expect(CairoArray.is({}, 'core::array::Array::<core::integer::u8>')).toBe(true);

      const largeArray = Array(100).fill(1);
      expect(CairoArray.is(largeArray, 'core::array::Array::<core::integer::u8>')).toBe(true);
    });
  });

  describe('constructor + toApiRequest() pattern', () => {
    test('should create and serialize from array input', () => {
      const array = new CairoArray(
        [1, 2, 3],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const result = array.toApiRequest();
      expect(result).toEqual(['3', '1', '2', '3']);
    });

    test('should create and serialize from object input', () => {
      const array = new CairoArray(
        { 0: 1, 1: 2, 2: 3 },
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const result = array.toApiRequest();
      expect(result).toEqual(['3', '1', '2', '3']);
    });

    test('should work with parsing strategy', () => {
      const array1 = new CairoArray(
        [1, 2],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const array2 = new CairoArray(
        [1, 2],
        'core::array::Span::<core::integer::u8>',
        hdParsingStrategy
      );

      const result1 = array1.toApiRequest();
      const result2 = array2.toApiRequest();

      // Unified parsing strategy approach for API serialization with length prefix
      expect(result1).toEqual(['2', '1', '2']);
      expect(result2).toEqual(['2', '1', '2']);
    });

    test('should throw for invalid inputs', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = new CairoArray(
          'invalid',
          'core::array::Array::<core::integer::u8>',
          hdParsingStrategy
        );
      }).toThrow('Invalid input: expected Array or Object');
    });

    test('should handle nested arrays', () => {
      const array = new CairoArray(
        [
          [1, 2],
          [3, 4],
        ],
        'core::array::Array::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy
      );
      const result = array.toApiRequest();
      // Outer length=2, first inner [length=2, 1, 2], second inner [length=2, 3, 4]
      expect(result).toEqual(['2', '2', '1', '2', '2', '3', '4']);
    });

    test('should handle edge cases', () => {
      // Empty arrays
      const emptyArray = new CairoArray(
        [],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const emptyResult = emptyArray.toApiRequest();
      // Just the length prefix: ['0x0']
      expect(emptyResult).toEqual(['0']);

      // Single element
      const singleArray = new CairoArray(
        [42],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const singleResult = singleArray.toApiRequest();
      expect(singleResult).toEqual(['1', '42']);
    });
  });

  describe('toApiRequest() method', () => {
    test('should serialize simple arrays with length prefix', () => {
      const array = new CairoArray(
        [1, 2, 3],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const result = array.toApiRequest();
      // Length prefix + elements
      expect(result).toEqual(['3', '1', '2', '3']);
    });

    test('should work with hdParsingStrategy', () => {
      const array1 = new CairoArray(
        [100, 200],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const array2 = new CairoArray(
        [100, 200],
        'core::array::Span::<core::integer::u8>',
        hdParsingStrategy
      );

      const result1 = array1.toApiRequest();
      const result2 = array2.toApiRequest();

      expect(result1).toEqual(['2', '100', '200']);
      expect(result2).toEqual(['2', '100', '200']);
    });

    test('should handle nested arrays with proper length prefixes', () => {
      const nestedArray = new CairoArray(
        [
          [1, 2],
          [3, 4],
        ],
        'core::array::Array::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy
      );
      const result = nestedArray.toApiRequest();
      // Outer array: length=2, then two inner arrays each with their own length prefixes
      expect(result).toEqual(['2', '2', '1', '2', '2', '3', '4']);
    });

    test('should throw for unsupported element types', () => {
      expect(() => {
        new CairoArray(
          [1, 2],
          'core::array::Array::<unsupported::type>',
          hdParsingStrategy
        ).toApiRequest();
      }).toThrow();
    });
  });

  describe('static properties', () => {
    test('should have correct dynamicSelector', () => {
      expect(CairoArray.dynamicSelector).toBe('CairoArray');
    });
  });

  describe('edge cases and boundary conditions', () => {
    test('should handle zero-length arrays', () => {
      const emptyArray = new CairoArray(
        [],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      expect(emptyArray.content).toEqual([]);
      expect(CairoArray.getArrayElementType(emptyArray.arrayType)).toBe('core::integer::u8');
      expect(emptyArray.toApiRequest()).toEqual(['0']); // Just length prefix
    });

    test('should handle large arrays', () => {
      const largeContent = Array(100).fill(1); // Use smaller number for test performance
      const largeArray = new CairoArray(
        largeContent,
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      expect(largeArray.content.length).toBe(100);
      expect(CairoArray.getArrayElementType(largeArray.arrayType)).toBe('core::integer::u8');
      const result = largeArray.toApiRequest();
      expect(result[0]).toBe('100'); // Length prefix
      expect(result.length).toBe(101); // 100 elements + 1 length prefix
    });

    test('should handle complex nested structures', () => {
      // Test 3-level nesting: Array<Array<Array<u8>>> = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
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
      const complexArray = new CairoArray(
        deepNested,
        'core::array::Array::<core::array::Array::<core::array::Array::<core::integer::u8>>>',
        hdParsingStrategy
      );
      const result = complexArray.toApiRequest();
      // Expected: outer_len=2, first_mid_len=2, first_inner_len=2, 1, 2, second_inner_len=2, 3, 4,
      //           second_mid_len=2, third_inner_len=2, 5, 6, fourth_inner_len=2, 7, 8
      expect(result).toEqual([
        '2',
        '2',
        '2',
        '1',
        '2',
        '2',
        '3',
        '4',
        '2',
        '2',
        '5',
        '6',
        '2',
        '7',
        '8',
      ]);
    });

    test('should handle mixed data types in content', () => {
      const mixedContent = [1, '2', 3n, '0x04'];
      const mixedArray = new CairoArray(
        mixedContent,
        'core::array::Array::<core::felt252>',
        hdParsingStrategy
      );
      const result = mixedArray.toApiRequest();
      expect(result.length).toBe(5); // 1 length prefix + 4 elements
      expect(result[0]).toBe('4'); // Length prefix
    });

    test('should validate type format edge cases', () => {
      // Valid edge cases
      expect(CairoArray.isAbiType('core::array::Array::<a>')).toBe(true);
      expect(CairoArray.isAbiType('core::array::Span::<very::long::type::name>')).toBe(true);
      expect(
        CairoArray.isAbiType('core::array::Array::<core::array::Array::<core::integer::u8>>')
      ).toBe(true);

      // Invalid edge cases
      expect(CairoArray.isAbiType('[type; 0]')).toBe(false); // fixed array
      expect(CairoArray.isAbiType('core::array::Vector::<type>')).toBe(false); // wrong container type
      expect(CairoArray.isAbiType('core::array::Array')).toBe(false); // missing element type
    });
  });

  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another CairoArray', () => {
      const original = new CairoArray(
        [1, 2, 3],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );

      const copy = new CairoArray(
        original,
        'core::array::Array::<core::integer::u32>',
        hdParsingStrategy
      );

      // Should copy content and arrayType from original, ignoring new parameters
      expect(copy.content).toBe(original.content);
      expect(copy.arrayType).toBe(original.arrayType);
      expect(copy.arrayType).toBe('core::array::Array::<core::integer::u8>'); // Original type, not new one
    });
  });
});
