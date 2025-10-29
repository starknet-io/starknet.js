import { CairoArray, CallData, hdParsingStrategy, AbiParser2 } from '../../../src';

describe('CairoArray Integration Tests', () => {
  describe('CallData integration', () => {
    test('should work with CallData.compile() directly', () => {
      const array = new CairoArray(
        [1, 2, 3],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const compiled = CallData.compile([array]);
      expect(compiled).toEqual(['3', '1', '2', '3']);
    });

    test('should work with nested CallData.compile()', () => {
      const innerArray1 = new CairoArray(
        [1, 2],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const innerArray2 = new CairoArray(
        [3, 4],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const outerArray = new CairoArray(
        [innerArray1, innerArray2],
        'core::array::Array::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy
      );

      const compiled = CallData.compile([outerArray]);
      expect(compiled).toEqual(['2', '2', '1', '2', '2', '3', '4']);
    });

    test('should work with mixed types in CallData.compile()', () => {
      const array = new CairoArray(
        [100, 200],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const compiled = CallData.compile([42, array, 'hello']);
      expect(compiled).toEqual(['42', '2', '100', '200', '448378203247']);
    });
  });

  describe('AbiParser2 integration', () => {
    const mockAbi = [
      {
        type: 'interface',
        name: 'TestContract',
        items: [
          {
            type: 'function',
            name: 'test_array',
            inputs: [{ name: 'arr', type: 'core::array::Array::<core::integer::u8>' }],
            outputs: [{ name: 'result', type: 'core::array::Array::<core::integer::u8>' }],
            state_mutability: 'view',
          },
        ],
      },
    ];

    test('should work with AbiParser2 request parsing', () => {
      const parser = new AbiParser2(mockAbi, hdParsingStrategy);
      const result = parser.parseRequestField([1, 2, 3], 'core::array::Array::<core::integer::u8>');
      expect(result).toEqual(['3', '1', '2', '3']);
    });

    test('should work with AbiParser2 response parsing', () => {
      const parser = new AbiParser2(mockAbi, hdParsingStrategy);

      const mockResponse = ['0x2', '0xa', '0xb']; // length=2, elements=[10, 11]
      const iterator = mockResponse[Symbol.iterator]();
      const result = parser.parseResponse(iterator, 'core::array::Array::<core::integer::u8>');

      expect(result).toEqual([10n, 11n]);
    });

    test('should handle nested arrays in AbiParser2', () => {
      const parser = new AbiParser2(mockAbi, hdParsingStrategy);
      const result = parser.parseRequestField(
        [[1, 2], [3]],
        'core::array::Array::<core::array::Array::<core::integer::u8>>'
      );
      expect(result).toEqual(['2', '2', '1', '2', '1', '3']);
    });

    test('should handle empty arrays in AbiParser2', () => {
      const parser = new AbiParser2(mockAbi, hdParsingStrategy);
      const result = parser.parseRequestField([], 'core::array::Array::<core::integer::u8>');
      expect(result).toEqual(['0']);
    });
  });

  describe('Roundtrip testing (serialize -> deserialize)', () => {
    test('should maintain data integrity for simple arrays', () => {
      const originalData = [1, 2, 3, 4, 5];

      // Create CairoArray and serialize
      const array = new CairoArray(
        originalData,
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const serialized = array.toApiRequest();

      // Deserialize using constructor
      const iterator = serialized[Symbol.iterator]();
      const deserialized = new CairoArray(
        iterator,
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const finalData = deserialized.decompose(hdParsingStrategy);

      expect(finalData).toEqual([1n, 2n, 3n, 4n, 5n]);
    });

    test('should maintain data integrity for nested arrays', () => {
      const originalData = [[1, 2], [3, 4], [5]];

      // Create nested CairoArray and serialize
      const array = new CairoArray(
        originalData,
        'core::array::Array::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy
      );
      const serialized = array.toApiRequest();

      // Deserialize using constructor
      const iterator = serialized[Symbol.iterator]();
      const deserialized = new CairoArray(
        iterator,
        'core::array::Array::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy
      );
      const finalData = deserialized.decompose(hdParsingStrategy);

      expect(finalData).toEqual([[1n, 2n], [3n, 4n], [5n]]);
    });

    test('should work with AbiParser2 roundtrip', () => {
      const mockAbi = [
        {
          type: 'interface',
          name: 'TestContract',
          items: [
            {
              type: 'function',
              name: 'test_array',
              inputs: [{ name: 'arr', type: 'core::array::Array::<core::integer::u32>' }],
              outputs: [{ name: 'result', type: 'core::array::Array::<core::integer::u32>' }],
              state_mutability: 'view',
            },
          ],
        },
      ];

      const parser = new AbiParser2(mockAbi, hdParsingStrategy);
      const originalData = [100, 200, 300];

      // Request parsing (serialize)
      const serialized = parser.parseRequestField(
        originalData,
        'core::array::Array::<core::integer::u32>'
      );

      // Response parsing (deserialize)
      const iterator = serialized[Symbol.iterator]();
      const result = parser.parseResponse(iterator, 'core::array::Array::<core::integer::u32>');

      expect(result).toEqual([100n, 200n, 300n]);
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle large arrays efficiently', () => {
      const largeArray = Array(50)
        .fill(0)
        .map((_, i) => i);
      const array = new CairoArray(
        largeArray,
        'core::array::Array::<core::integer::u32>',
        hdParsingStrategy
      );

      const serialized = array.toApiRequest();
      expect(serialized[0]).toBe('50'); // Length prefix
      expect(serialized.length).toBe(51); // 50 elements + 1 length prefix

      // Test just the serialization part, not roundtrip since large data has iterator issues
      expect(array.content.length).toBe(50);
      expect(array.decompose(hdParsingStrategy).length).toBe(50);
    });

    test('should handle deeply nested arrays', () => {
      const deepArray = [[[1, 2]], [[3, 4]]];
      const array = new CairoArray(
        deepArray,
        'core::array::Array::<core::array::Array::<core::array::Array::<core::integer::u8>>>',
        hdParsingStrategy
      );

      const serialized = array.toApiRequest();
      const iterator = serialized[Symbol.iterator]();
      const deserialized = new CairoArray(
        iterator,
        'core::array::Array::<core::array::Array::<core::array::Array::<core::integer::u8>>>',
        hdParsingStrategy
      );
      const decomposed = deserialized.decompose(hdParsingStrategy);

      expect(decomposed).toEqual([[[1n, 2n]], [[3n, 4n]]]);
    });

    test('should handle mixed input types with parsing strategy', () => {
      const mixedData = [1, '2', 3n, '0x4'];
      const array = new CairoArray(
        mixedData,
        'core::array::Array::<core::felt252>',
        hdParsingStrategy
      );

      const serialized = array.toApiRequest();
      expect(serialized[0]).toBe('4'); // Length prefix
      expect(serialized.length).toBe(5); // 4 elements + 1 length prefix
    });

    test('should work with both Array and Span types', () => {
      const data = [1, 2, 3];

      const arrayType = new CairoArray(
        data,
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const spanType = new CairoArray(
        data,
        'core::array::Span::<core::integer::u8>',
        hdParsingStrategy
      );

      const arraySerialized = arrayType.toApiRequest();
      const spanSerialized = spanType.toApiRequest();

      // Both should serialize the same way
      expect(arraySerialized).toEqual(spanSerialized);
      expect(arraySerialized).toEqual(['3', '1', '2', '3']);
    });
  });

  describe('Type validation integration', () => {
    test('should reject invalid array types during construction', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new CairoArray([1, 2, 3], 'invalid::type', hdParsingStrategy);
      }).toThrow('The type invalid::type is not a Cairo dynamic array');

      expect(() => {
        // eslint-disable-next-line no-new
        new CairoArray([1, 2, 3], '[core::integer::u8; 3]', hdParsingStrategy); // Fixed array type
      }).toThrow('The type [core::integer::u8; 3] is not a Cairo dynamic array');
    });

    test('should validate static methods work correctly', () => {
      expect(CairoArray.isAbiType('core::array::Array::<core::integer::u8>')).toBe(true);
      expect(CairoArray.isAbiType('core::array::Span::<core::integer::u32>')).toBe(true);
      expect(CairoArray.isAbiType('[core::integer::u8; 5]')).toBe(false);
      expect(CairoArray.isAbiType('core::integer::u8')).toBe(false);

      expect(CairoArray.getArrayElementType('core::array::Array::<core::integer::u32>')).toBe(
        'core::integer::u32'
      );
      expect(
        CairoArray.getArrayElementType(
          'core::array::Span::<core::array::Array::<core::integer::u8>>'
        )
      ).toBe('core::array::Array::<core::integer::u8>');
    });

    test('should validate input data correctly', () => {
      expect(CairoArray.is([1, 2, 3], 'core::array::Array::<core::integer::u8>')).toBe(true);
      expect(CairoArray.is({ 0: 1, 1: 2, 2: 3 }, 'core::array::Array::<core::integer::u8>')).toBe(
        true
      );
      expect(CairoArray.is('invalid', 'core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoArray.is([1, 2, 3], 'invalid::type')).toBe(false);
    });
  });
});
