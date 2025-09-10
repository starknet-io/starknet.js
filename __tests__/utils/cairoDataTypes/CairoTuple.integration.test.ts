import { CairoTuple, CallData, hdParsingStrategy } from '../../../src';

describe('CairoTuple integration tests', () => {
  describe('End-to-End: User Input → API → Response Parsing', () => {
    test('simple tuple: user input → API request → response parsing', () => {
      // User provides input
      const userInput = [42, 100];
      const tupleType = '(core::integer::u8, core::integer::u32)';

      // Create CairoTuple from user input
      const inputTuple = new CairoTuple(userInput, tupleType, hdParsingStrategy);

      // Convert to API request format
      const apiRequest = inputTuple.toApiRequest();
      expect(apiRequest).toEqual(['0x2a', '0x64']);

      // Simulate API response (same values back)
      const apiResponse = ['0x2a', '0x64'];
      const responseIterator = apiResponse[Symbol.iterator]();

      // Parse response back to CairoTuple
      const responseTuple = new CairoTuple(responseIterator, tupleType, hdParsingStrategy);

      // Decompose to final values
      const finalValues = responseTuple.decompose(hdParsingStrategy);
      expect(finalValues).toEqual({ '0': 42n, '1': 100n });
    });

    test('named tuple: user input → API request → response parsing', () => {
      // User provides named input
      const userInput = { x: 10, y: 20 };
      const namedTupleType = '(x:core::integer::u8, y:core::integer::u32)';

      // Create CairoTuple from named input
      const inputTuple = new CairoTuple(userInput, namedTupleType, hdParsingStrategy);

      // Convert to API request format (no length prefix)
      const apiRequest = inputTuple.toApiRequest();
      expect(apiRequest).toEqual(['0xa', '0x14']);

      // Simulate API response
      const apiResponse = ['0xa', '0x14'];
      const responseIterator = apiResponse[Symbol.iterator]();

      // Parse response back to CairoTuple
      const responseTuple = new CairoTuple(responseIterator, namedTupleType, hdParsingStrategy);

      // Decompose to final values
      const finalValues = responseTuple.decompose(hdParsingStrategy);
      expect(finalValues).toEqual({ x: 10n, y: 20n });
    });

    test('nested tuple: user input → API request → response parsing', () => {
      // User provides nested tuple input
      const userInput = [[1, 2], 3];
      const nestedTupleType = '((core::integer::u8, core::integer::u8), core::integer::u32)';

      // Create CairoTuple from nested input
      const inputTuple = new CairoTuple(userInput, nestedTupleType, hdParsingStrategy);

      // Convert to API request (flattened, no length prefixes)
      const apiRequest = inputTuple.toApiRequest();
      expect(apiRequest).toEqual(['0x1', '0x2', '0x3']);

      // Simulate API response
      const apiResponse = ['0x1', '0x2', '0x3'];
      const responseIterator = apiResponse[Symbol.iterator]();

      // Parse response back to CairoTuple
      const responseTuple = new CairoTuple(responseIterator, nestedTupleType, hdParsingStrategy);

      // Decompose to final values (nested structure preserved)
      const finalValues = responseTuple.decompose(hdParsingStrategy);
      expect(finalValues).toEqual({ '0': { '0': 1n, '1': 2n }, '1': 3n });
    });

    test('empty tuple: user input → API request → response parsing', () => {
      // User provides empty tuple input
      const userInput: never[] = [];
      const emptyTupleType = '()';

      // Create CairoTuple from empty input
      const inputTuple = new CairoTuple(userInput, emptyTupleType, hdParsingStrategy);

      // Convert to API request (empty array)
      const apiRequest = inputTuple.toApiRequest();
      expect(apiRequest).toEqual([]);

      // Simulate API response (empty)
      const apiResponse: string[] = [];
      const responseIterator = apiResponse[Symbol.iterator]();

      // Parse response back to CairoTuple
      const responseTuple = new CairoTuple(responseIterator, emptyTupleType, hdParsingStrategy);

      // Decompose to final values (empty array)
      const finalValues = responseTuple.decompose(hdParsingStrategy);
      expect(finalValues).toEqual({});
    });
  });

  describe('CallData Integration', () => {
    test('CairoTuple instances work seamlessly with CallData.compile()', () => {
      // Create various tuple types
      const simpleTuple = new CairoTuple(
        [1, 2],
        '(core::integer::u8, core::integer::u32)',
        hdParsingStrategy
      );
      const namedTuple = new CairoTuple(
        { x: 3, y: 4 },
        '(x:core::integer::u8, y:core::integer::u32)',
        hdParsingStrategy
      );
      const nestedTuple = new CairoTuple(
        [[5, 6], 7],
        '((core::integer::u8, core::integer::u8), core::integer::u32)',
        hdParsingStrategy
      );

      // Compile all together
      const compiled = CallData.compile([simpleTuple, namedTuple, nestedTuple]);

      // Expected: flattened values, no length prefixes for tuples
      expect(compiled).toEqual([
        '1',
        '2', // simpleTuple elements
        '3',
        '4', // namedTuple elements
        '5',
        '6',
        '7', // nestedTuple elements (flattened)
      ]);
    });

    test('mixed CairoTuple with other data types in CallData.compile()', () => {
      const tuple = new CairoTuple(
        [10, 20],
        '(core::integer::u8, core::integer::u32)',
        hdParsingStrategy
      );
      const regularNumber = 30;
      const regularString = 'test';

      const compiled = CallData.compile([tuple, regularNumber, regularString]);

      expect(compiled).toEqual([
        '10',
        '20', // tuple elements
        '30', // regular number
        '1952805748', // regular string (encoded)
      ]);
    });
  });

  describe('Response Parsing Integration', () => {
    test('CairoTuple can be constructed directly from response iterators', () => {
      // Simulate API response with tuple data
      const apiResponse = ['0xa', '0x14']; // [10, 20]

      // Create iterator and parse as tuple
      const responseIterator = apiResponse[Symbol.iterator]();
      const tupleType = '(core::integer::u8, core::integer::u32)';

      // Parse using CairoTuple constructor directly
      const parsedTuple = new CairoTuple(responseIterator, tupleType, hdParsingStrategy);
      const finalValues = parsedTuple.decompose(hdParsingStrategy);

      expect(finalValues).toEqual({ '0': 10n, '1': 20n });
    });
  });

  describe('Complex Integration Scenarios', () => {
    test('tuple containing mixed basic types', () => {
      // Tuple with different basic element types supported by hdParsingStrategy
      const userInput = [
        100, // felt252
        200, // u8
      ];
      const mixedType = '(core::felt252, core::integer::u8)';

      // Create tuple
      const inputTuple = new CairoTuple(userInput, mixedType, hdParsingStrategy);

      // Convert to API format
      const apiRequest = inputTuple.toApiRequest();

      // Expected: [felt_value, u8_value]
      expect(apiRequest).toHaveLength(2);
      expect(apiRequest[0]).toBe('0x64'); // 100 in hex
      expect(apiRequest[1]).toBe('0xc8'); // 200 in hex

      // Simulate API response and parse back
      const responseIterator = apiRequest[Symbol.iterator]();
      const responseTuple = new CairoTuple(responseIterator, mixedType, hdParsingStrategy);

      // Verify structure is preserved
      expect(responseTuple.content).toHaveLength(2);
      expect(responseTuple.tupleType).toBe(mixedType);

      // Verify values can be decomposed
      const finalValues = responseTuple.decompose(hdParsingStrategy);
      expect(finalValues).toEqual({ '0': 100n, '1': 200n });
    });

    test('deeply nested tuples with multiple levels', () => {
      // Deep nesting: (((u8, u8), u8), u8)
      const deepInput = [[[1, 2], 3], 4];
      const deepType =
        '(((core::integer::u8, core::integer::u8), core::integer::u8), core::integer::u8)';

      const inputTuple = new CairoTuple(deepInput, deepType, hdParsingStrategy);

      // Should flatten completely
      const apiRequest = inputTuple.toApiRequest();
      expect(apiRequest).toEqual(['0x1', '0x2', '0x3', '0x4']);

      // Parse back and verify nesting is preserved
      const responseIterator = apiRequest[Symbol.iterator]();
      const responseTuple = new CairoTuple(responseIterator, deepType, hdParsingStrategy);
      const finalValues = responseTuple.decompose(hdParsingStrategy);

      expect(finalValues).toEqual({ '0': { '0': { '0': 1n, '1': 2n }, '1': 3n }, '1': 4n });
    });

    test('tuple size validation across different construction paths', () => {
      const tupleType = '(core::integer::u8, core::integer::u32)';

      // Should succeed - correct size
      expect(() => new CairoTuple([1, 2], tupleType, hdParsingStrategy)).not.toThrow();
      expect(() => new CairoTuple({ 0: 1, 1: 2 }, tupleType, hdParsingStrategy)).not.toThrow();
      expect(
        () =>
          new CairoTuple(
            { x: 1, y: 2 },
            '(x:core::integer::u8, y:core::integer::u32)',
            hdParsingStrategy
          )
      ).not.toThrow();

      // Should fail - incorrect size
      expect(() => new CairoTuple([1], tupleType, hdParsingStrategy)).toThrow(
        'ABI type (core::integer::u8, core::integer::u32): expected 2 items, got 1 items.'
      );
      expect(() => new CairoTuple([1, 2, 3], tupleType, hdParsingStrategy)).toThrow(
        `Cannot read properties of undefined (reading 'startsWith')`
      );
    });
  });

  describe('Performance and Edge Cases', () => {
    test('large tuple with many elements', () => {
      // Create a tuple with 50 elements
      const largeInput = Array.from({ length: 50 }, (_, i) => i + 1);
      const largeType = `(${Array(50).fill('core::integer::u8').join(', ')})`;

      const largeTuple = new CairoTuple(largeInput, largeType, hdParsingStrategy);
      const apiRequest = largeTuple.toApiRequest();

      expect(apiRequest).toHaveLength(50);
      expect(apiRequest[0]).toBe('0x1');
      expect(apiRequest[49]).toBe('0x32'); // 50 in hex
    });

    test('tuple with single element (not confused with primitive)', () => {
      const singleInput = [42];
      const singleType = '(core::integer::u32)';

      const singleTuple = new CairoTuple(singleInput, singleType, hdParsingStrategy);
      const apiRequest = singleTuple.toApiRequest();

      // Should still be tuple format (no length prefix)
      expect(apiRequest).toEqual(['0x2a']);

      // Parse back
      const responseIterator = apiRequest[Symbol.iterator]();
      const responseTuple = new CairoTuple(responseIterator, singleType, hdParsingStrategy);
      const finalValues = responseTuple.decompose(hdParsingStrategy);

      expect(finalValues).toEqual({ '0': 42n });
    });
  });
});
