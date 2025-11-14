import { CairoTuple, CallData, hdParsingStrategy } from '../../../src';

describe('CairoTuple class Unit test', () => {
  test('inputs for a CairoTuple instance', () => {
    expect(
      new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', hdParsingStrategy)
    ).toBeDefined();
    expect(
      new CairoTuple({ 0: 1, 1: 2 }, '(core::integer::u8, core::integer::u32)', hdParsingStrategy)
    ).toBeDefined();
    expect(() => new CairoTuple([1, 2], 'invalid::type', hdParsingStrategy)).toThrow();
    expect(() => new CairoTuple([1, 2], '[core::integer::u8; 2]', hdParsingStrategy)).toThrow();
    expect(() => new CairoTuple([1, 2], 'core::integer::u8', hdParsingStrategy)).toThrow();
  });

  test('use static class methods', () => {
    const myTuple = new CairoTuple(
      [1, 2],
      '(core::integer::u8, core::integer::u32)',
      hdParsingStrategy
    );
    expect(CairoTuple.getTupleElementTypes(myTuple.tupleType)).toEqual([
      'core::integer::u8',
      'core::integer::u32',
    ]);
    expect(CairoTuple.isAbiType('(core::integer::u8, core::integer::u32)')).toBe(true);
    expect(CairoTuple.isAbiType('(x:core::integer::u8, y:core::integer::u32)')).toBe(true);
    expect(CairoTuple.isAbiType('[core::integer::u8; 2]')).toBe(false);
    expect(CairoTuple.isAbiType('core::integer::u8')).toBe(false);
  });

  test('CairoTuple works with CallData.compile()', () => {
    const myTuple = new CairoTuple(
      [10, 20],
      '(core::integer::u8, core::integer::u32)',
      hdParsingStrategy
    );
    const compiled = CallData.compile([myTuple]);
    // Should NOT include length prefix: ['10', '20']
    expect(compiled).toEqual(['10', '20']);
  });

  test('constructor with API response data (no length prefix)', () => {
    // Test simple tuple
    const response = ['0x1', '0x2']; // elements=[1, 2] (no length prefix)
    const iterator = response[Symbol.iterator]();
    const result = new CairoTuple(
      iterator,
      '(core::integer::u8, core::integer::u8)',
      hdParsingStrategy
    );
    expect(result.decompose(hdParsingStrategy)).toEqual([1n, 2n]);

    // Test with different types
    const response2 = ['0x10', '0x20']; // elements=[16, 32]
    const iterator2 = response2[Symbol.iterator]();
    const result2 = new CairoTuple(
      iterator2,
      '(core::integer::u8, core::integer::u32)',
      hdParsingStrategy
    );
    expect(result2.decompose(hdParsingStrategy)).toEqual([16n, 32n]);
  });

  test('constructor with nested tuples API response', () => {
    // Test nested tuples: ((u8, u8), u32) = ((1, 2), 3)
    // API format: [elem1, elem2, elem3] - no length prefixes for tuples
    const nestedResponse = ['0x1', '0x2', '0x3'];
    const nestedIterator = nestedResponse[Symbol.iterator]();
    const nestedResult = new CairoTuple(
      nestedIterator,
      '((core::integer::u8, core::integer::u8), core::integer::u32)',
      hdParsingStrategy
    );
    expect(nestedResult.decompose(hdParsingStrategy)).toEqual([[1n, 2n], 3n]);
  });

  test('constructor error handling with unsupported types', () => {
    const response = ['0x1', '0x2'];
    const iterator = response[Symbol.iterator]();

    // Test with unsupported element type - error should occur during decompose()
    const tuple = new CairoTuple(
      iterator,
      '(unsupported::type, core::integer::u8)',
      hdParsingStrategy
    );
    expect(() => {
      tuple.decompose(hdParsingStrategy);
    }).toThrow('No parser found for element type: unsupported::type in parsing strategy');
  });

  describe('named tuple support', () => {
    test('should handle named tuple input and type', () => {
      const namedTuple = new CairoTuple(
        { x: 1, y: 2 },
        '(x:core::integer::u8, y:core::integer::u32)',
        hdParsingStrategy
      );
      expect(namedTuple.content.length).toBe(2);
      expect(namedTuple.decompose(hdParsingStrategy)).toEqual([1n, 2n]);
    });

    test('should get named tuple element types', () => {
      const elementTypes = CairoTuple.getTupleElementTypes(
        '(x:core::integer::u8, y:core::integer::u32)'
      );
      expect(elementTypes).toEqual([
        { name: 'x', type: 'core::integer::u8' },
        { name: 'y', type: 'core::integer::u32' },
      ]);
    });

    test('should handle mixed named and positional access', () => {
      // Test that positional input works even with named tuple type
      const tuple1 = new CairoTuple(
        [1, 2],
        '(x:core::integer::u8, y:core::integer::u32)',
        hdParsingStrategy
      );
      expect(tuple1.decompose(hdParsingStrategy)).toEqual([1n, 2n]);

      // Test that named input works with named tuple type
      const tuple2 = new CairoTuple(
        { x: 1, y: 2 },
        '(x:core::integer::u8, y:core::integer::u32)',
        hdParsingStrategy
      );
      expect(tuple2.decompose(hdParsingStrategy)).toEqual([1n, 2n]);

      // Test object with indices on named tuple type
      const tuple3 = new CairoTuple(
        { 0: 1, 1: 2 },
        '(x:core::integer::u8, y:core::integer::u32)',
        hdParsingStrategy
      );
      expect(tuple3.decompose(hdParsingStrategy)).toEqual([1n, 2n]);
    });
  });

  describe('validate() static method', () => {
    test('should validate valid tuple inputs', () => {
      expect(() => {
        CairoTuple.validate([1, 2], '(core::integer::u8, core::integer::u32)');
      }).not.toThrow();

      expect(() => {
        CairoTuple.validate({ 0: 1, 1: 2 }, '(core::integer::u8, core::integer::u32)');
      }).not.toThrow();

      expect(() => {
        CairoTuple.validate({ x: 1, y: 2 }, '(x:core::integer::u8, y:core::integer::u32)');
      }).not.toThrow();
    });

    test('should reject invalid type formats', () => {
      expect(() => {
        CairoTuple.validate([1, 2], 'invalid');
      }).toThrow('The type invalid is not a Cairo tuple');

      expect(() => {
        CairoTuple.validate([1, 2], '[core::integer::u8; 2]');
      }).toThrow('The type [core::integer::u8; 2] is not a Cairo tuple');

      expect(() => {
        CairoTuple.validate([1, 2], 'core::integer::u8');
      }).toThrow('The type core::integer::u8 is not a Cairo tuple');
    });

    test('should reject invalid input types', () => {
      expect(() => {
        CairoTuple.validate('invalid', '(core::integer::u8, core::integer::u32)');
      }).toThrow('Invalid input: expected Array or Object, got string');

      expect(() => {
        CairoTuple.validate(123, '(core::integer::u8, core::integer::u32)');
      }).toThrow('Invalid input: expected Array or Object, got number');

      expect(() => {
        CairoTuple.validate(null, '(core::integer::u8, core::integer::u32)');
      }).toThrow('Invalid input: expected Array or Object, got object');

      expect(() => {
        CairoTuple.validate(undefined, '(core::integer::u8, core::integer::u32)');
      }).toThrow('Invalid input: expected Array or Object, got undefined');
    });
  });

  describe('is() static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoTuple.is([1, 2], '(core::integer::u8, core::integer::u32)')).toBe(true);
      expect(CairoTuple.is({ 0: 1, 1: 2 }, '(core::integer::u8, core::integer::u32)')).toBe(true);
      expect(CairoTuple.is({ x: 1, y: 2 }, '(x:core::integer::u8, y:core::integer::u32)')).toBe(
        true
      );
    });

    test('should return false for invalid inputs', () => {
      expect(CairoTuple.is('invalid', '(core::integer::u8, core::integer::u32)')).toBe(false);
      expect(CairoTuple.is(123, '(core::integer::u8, core::integer::u32)')).toBe(false);
      expect(CairoTuple.is(null, '(core::integer::u8, core::integer::u32)')).toBe(false);
      expect(CairoTuple.is(undefined, '(core::integer::u8, core::integer::u32)')).toBe(false);
      expect(CairoTuple.is([1, 2], 'invalid')).toBe(false);
      expect(CairoTuple.is([1, 2], '[core::integer::u8; 2]')).toBe(false);
    });
  });

  describe('constructor + toApiRequest() pattern', () => {
    test('should create and serialize from array input', () => {
      const tuple = new CairoTuple(
        [1, 2, 3],
        '(core::integer::u8, core::integer::u8, core::integer::u8)',
        hdParsingStrategy
      );
      const result = tuple.toApiRequest();
      // Should NOT have length prefix: ['0x1', '0x2', '0x3']
      expect(result).toEqual(['0x1', '0x2', '0x3']);
    });

    test('should create and serialize from object input', () => {
      const tuple = new CairoTuple(
        { 0: 1, 1: 2, 2: 3 },
        '(core::integer::u8, core::integer::u8, core::integer::u8)',
        hdParsingStrategy
      );
      const result = tuple.toApiRequest();
      // Should NOT have length prefix: ['0x1', '0x2', '0x3']
      expect(result).toEqual(['0x1', '0x2', '0x3']);
    });

    test('should create and serialize from named object input', () => {
      const tuple = new CairoTuple(
        { x: 1, y: 2, z: 3 },
        '(x:core::integer::u8, y:core::integer::u8, z:core::integer::u8)',
        hdParsingStrategy
      );
      const result = tuple.toApiRequest();
      // Should NOT have length prefix: ['0x1', '0x2', '0x3']
      expect(result).toEqual(['0x1', '0x2', '0x3']);
    });

    test('should work with parsing strategy', () => {
      const tuple1 = new CairoTuple(
        [1, 2],
        '(core::integer::u8, core::integer::u32)',
        hdParsingStrategy
      );
      const tuple2 = new CairoTuple(
        [1, 2],
        '(core::integer::u8, core::integer::u32)',
        hdParsingStrategy
      );

      const result1 = tuple1.toApiRequest();
      const result2 = tuple2.toApiRequest();

      // Both should serialize the same way (no length prefix)
      expect(result1).toEqual(['0x1', '0x2']);
      expect(result2).toEqual(['0x1', '0x2']);
    });

    test('should throw for invalid inputs', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-new
        new CairoTuple('invalid', '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
      }).toThrow('Invalid input: expected Array or Object');
    });

    test('should handle nested tuples', () => {
      const tuple = new CairoTuple(
        [[1, 2], 3],
        '((core::integer::u8, core::integer::u8), core::integer::u32)',
        hdParsingStrategy
      );
      const result = tuple.toApiRequest();
      // Nested tuple should be flattened: [inner_elem1, inner_elem2, outer_elem]
      expect(result).toEqual(['0x1', '0x2', '0x3']);
    });

    test('should handle tuple size mismatch', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new CairoTuple(
          [1, 2, 3], // 3 elements
          '(core::integer::u8, core::integer::u32)', // but only 2 expected
          hdParsingStrategy
        );
      }).toThrow('Tuple size mismatch: expected 2 elements, got 3');
    });
  });

  describe('toApiRequest() method', () => {
    test('should serialize tuples without length prefix', () => {
      const tuple = new CairoTuple(
        [1, 2, 3],
        '(core::integer::u8, core::integer::u8, core::integer::u8)',
        hdParsingStrategy
      );
      const result = tuple.toApiRequest();
      // No length prefix for tuples
      expect(result).toEqual(['0x1', '0x2', '0x3']);
    });

    test('should work with hdParsingStrategy', () => {
      const tuple1 = new CairoTuple(
        [100, 200],
        '(core::integer::u8, core::integer::u8)',
        hdParsingStrategy
      );

      const result = tuple1.toApiRequest();
      expect(result).toEqual(['0x64', '0xc8']);
    });

    test('should handle nested tuples with proper flattening', () => {
      const nestedTuple = new CairoTuple(
        [
          [1, 2],
          [3, 4],
        ],
        '((core::integer::u8, core::integer::u8), (core::integer::u8, core::integer::u8))',
        hdParsingStrategy
      );
      const result = nestedTuple.toApiRequest();
      // Should be completely flattened (no length prefixes anywhere)
      expect(result).toEqual(['0x1', '0x2', '0x3', '0x4']);
    });

    test('should throw for unsupported element types', () => {
      const tuple = new CairoTuple(
        [1, 2],
        '(unsupported::type, core::integer::u8)',
        hdParsingStrategy
      );
      expect(() => {
        tuple.toApiRequest();
      }).toThrow();
    });
  });

  describe('static properties', () => {
    test('should have correct dynamicSelector', () => {
      expect(CairoTuple.dynamicSelector).toBe('CairoTuple');
    });
  });

  describe('edge cases and boundary conditions', () => {
    test('should handle empty tuples', () => {
      const emptyTuple = new CairoTuple([], '()', hdParsingStrategy);
      expect(emptyTuple.content).toEqual([]);
      expect(emptyTuple.toApiRequest()).toEqual([]);
    });

    test('should handle single-element tuples', () => {
      const singleTuple = new CairoTuple([42], '(core::integer::u8)', hdParsingStrategy);
      expect(singleTuple.content.length).toBe(1);
      expect(singleTuple.toApiRequest()).toEqual(['0x2a']);
    });

    test('should handle complex nested structures', () => {
      // Test 3-level nesting: (((u8, u8), u8), u8) = (((1, 2), 3), 4)
      const deepNested = [[[1, 2], 3], 4];
      const complexTuple = new CairoTuple(
        deepNested,
        '(((core::integer::u8, core::integer::u8), core::integer::u8), core::integer::u8)',
        hdParsingStrategy
      );
      const result = complexTuple.toApiRequest();
      // Expected: all flattened
      expect(result).toEqual(['0x1', '0x2', '0x3', '0x4']);
    });

    test('should handle mixed data types in content', () => {
      const mixedContent = [1, '2', 3n];
      const mixedTuple = new CairoTuple(
        mixedContent,
        '(core::felt252, core::felt252, core::felt252)',
        hdParsingStrategy
      );
      const result = mixedTuple.toApiRequest();
      expect(result.length).toBe(3);
    });

    test('should validate type format edge cases', () => {
      // Valid edge cases
      expect(CairoTuple.isAbiType('(a)')).toBe(true);
      expect(CairoTuple.isAbiType('(very::long::type::name)')).toBe(true);
      expect(
        CairoTuple.isAbiType('((core::integer::u8, core::integer::u8), core::integer::u32)')
      ).toBe(true);
      expect(CairoTuple.isAbiType('(x:core::integer::u8, y:core::integer::u32)')).toBe(true);

      // Invalid edge cases
      expect(CairoTuple.isAbiType('[type; 0]')).toBe(false); // array
      expect(CairoTuple.isAbiType('core::integer::u32')).toBe(false); // not a tuple
      expect(CairoTuple.isAbiType('tuple_but_no_parens')).toBe(false); // missing parens
    });
  });

  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another CairoTuple', () => {
      const original = new CairoTuple(
        [1, 2, 3],
        '(core::integer::u8, core::integer::u8, core::integer::u8)',
        hdParsingStrategy
      );

      const copy = new CairoTuple(
        original,
        '(core::integer::u32, core::integer::u32, core::integer::u32)',
        hdParsingStrategy
      );

      // Should copy content and tupleType from original, ignoring new parameters
      expect(copy.content).toBe(original.content);
      expect(copy.tupleType).toBe(original.tupleType);
      expect(copy.tupleType).toBe('(core::integer::u8, core::integer::u8, core::integer::u8)'); // Original type, not new one
    });
  });
});
