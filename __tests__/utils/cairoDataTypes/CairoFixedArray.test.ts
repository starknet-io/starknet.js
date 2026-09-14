import {
  CairoArray,
  CairoFixedArray,
  CairoTuple,
  CairoUint8,
  CallData,
  cairoTypeStrategy as S,
} from '../../../src';

const F3 = '[core::integer::u8; 3]';
const F2 = '[core::integer::u8; 2]';
const U3 = '[core::integer::u32; 3]';
const NESTED = '[[core::integer::u8; 2]; 2]';

describe('CairoFixedArray class Unit Tests', () => {
  describe('reading a fixed array type', () => {
    test('should give the item type and the size', () => {
      expect(CairoFixedArray.getFixedArrayType('[core::integer::u32; 8]')).toBe(
        'core::integer::u32'
      );
      expect(CairoFixedArray.getFixedArraySize('[core::integer::u32; 8]')).toBe(8);
    });

    test('should keep a nested inner array whole', () => {
      expect(CairoFixedArray.getFixedArrayType(NESTED)).toBe('[core::integer::u8; 2]');
      expect(CairoFixedArray.getFixedArraySize(NESTED)).toBe(2);
      expect(CairoFixedArray.getFixedArrayType('[[core::integer::u32; 2]; 8]')).toBe(
        '[core::integer::u32; 2]'
      );
      expect(CairoFixedArray.getFixedArraySize('[[core::integer::u32; 2]; 8]')).toBe(8);
    });

    test('should raise on a type it cannot read', () => {
      expect(() => CairoFixedArray.getFixedArraySize('[core::integer::u32; zorg]')).toThrow();
      expect(() => CairoFixedArray.getFixedArrayType('[; 8]')).toThrow();
    });

    test('should read the type from the instance too', () => {
      const fArray = new CairoFixedArray([1, 2, 3], U3, S);
      expect(fArray.getFixedArraySize()).toBe(3);
      expect(fArray.getFixedArrayType()).toBe('core::integer::u32');
      expect(fArray.arrayType).toBe(U3);
    });
  });

  describe('construction from the values a caller passes', () => {
    test('should build from an array, with no length on the wire', () => {
      expect([...new CairoFixedArray([1, 2, 3], F3, S).toApiRequest()]).toEqual(['1', '2', '3']);
    });

    test('should build from the object CairoFixedArray.compile produces', () => {
      const compiled = CairoFixedArray.compile([1, 2, 3]);
      expect([...new CairoFixedArray(compiled, F3, S).toApiRequest()]).toEqual(['1', '2', '3']);
    });

    test('should take an item that is already built', () => {
      expect([...new CairoFixedArray([new CairoUint8(1), 2], F2, S).toApiRequest()]).toEqual([
        '1',
        '2',
      ]);
    });

    test('should copy a CairoFixedArray handed to it whole', () => {
      const copy = new CairoFixedArray(new CairoFixedArray([1, 2, 3], F3, S), F3, S);
      expect([...copy.toApiRequest()]).toEqual(['1', '2', '3']);
      expect(copy.arrayType).toBe(F3);
    });

    test('the constructor refuses in exactly two ways', () => {
      // whatever a type is malformed by — not bracketed, no item type, no length, a length that is
      // not digits — the first assert catches it, and its message is the only one a bad type gives.
      // The item count is the other, checked once the type is known to be a well formed one.
      const malformed = [
        'core::integer::u32',
        'core::integer::u32; 3',
        '[core::integer::u32]',
        '[core::integer::u32;3]',
        '[core::integer::u32; ]',
        '[core::integer::u32; zorg]',
        '[; 3]',
        '[; ]',
        '[]',
        '',
      ];
      malformed.forEach((arrayType) => {
        expect(() => new CairoFixedArray([2, 4, 6], arrayType, S)).toThrow(
          `The type ${arrayType} is not a Cairo fixed array. Needs [type; length].`
        );
      });

      expect(() => new CairoFixedArray([2, 4], U3, S)).toThrow(
        'The ABI type [core::integer::u32; 3] is expecting 3 items. 2 items provided.'
      );
      expect(() => new CairoFixedArray([1, 2, 3, 4], F3, S)).toThrow(
        'The ABI type [core::integer::u8; 3] is expecting 3 items. 4 items provided.'
      );
    });

    test('should refuse an item type the strategy does not know', () => {
      expect(() => new CairoFixedArray([1], '[core::foo::Bar; 1]', S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });
  });

  describe('construction from a response', () => {
    test('should read as many items as the type declares', () => {
      const array = new CairoFixedArray(['0x1', '0x2', '0x3'].values(), F3, S);
      expect(array.decompose(S)).toEqual([1n, 2n, 3n]);
    });

    test('should consume exactly that many, leaving the rest', () => {
      const iterator = ['0x1', '0x2', '0x3', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoFixedArray(iterator, F3, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('nesting', () => {
    test('should hold fixed arrays, none of them carrying a length', () => {
      const array = new CairoFixedArray(
        [
          [1, 2],
          [3, 4],
        ],
        NESTED,
        S
      );
      expect([...array.toApiRequest()]).toEqual(['1', '2', '3', '4']);
      expect(array.decompose(S)).toEqual([
        [1n, 2n],
        [3n, 4n],
      ]);
    });

    test('should read a nested fixed array back off a flat response', () => {
      const array = new CairoFixedArray(['0x1', '0x2', '0x3', '0x4'].values(), NESTED, S);
      expect(array.decompose(S)).toEqual([
        [1n, 2n],
        [3n, 4n],
      ]);
    });

    test('should sit inside a dynamic array, which does carry its length', () => {
      const array = new CairoArray([[1, 2, 3]], `core::array::Array::<${F3}>`, S);
      expect([...array.toApiRequest()]).toEqual(['1', '1', '2', '3']);
      expect(array.decompose(S)).toEqual([[1n, 2n, 3n]]);
    });

    test('should sit inside a tuple', () => {
      const tuple = new CairoTuple([[1, 2], 9], `(${F2}, core::integer::u8)`, S);
      expect([...tuple.toApiRequest()]).toEqual(['1', '2', '9']);
    });
  });

  describe('validate, is and the two type predicates', () => {
    test('should check the count, unlike a dynamic array', () => {
      expect(() => CairoFixedArray.validate([1, 2, 3], F3)).not.toThrow();
      expect(() => CairoFixedArray.validate([1, 2], F3)).toThrow(
        'The ABI type [core::integer::u8; 3] is expecting 3 items. 2 items provided.'
      );
    });

    test('should refuse a type that is not a fixed array', () => {
      expect(() => CairoFixedArray.validate([1], 'core::integer::u8')).toThrow(
        'The type core::integer::u8 is not a Cairo fixed array. Needs [type; length].'
      );
    });

    test('should refuse an input that is neither an array nor an object', () => {
      expect(() => CairoFixedArray.validate('nope', F3)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('is should be the non-throwing form of validate', () => {
      expect(CairoFixedArray.is([1, 2, 3], F3)).toBe(true);
      expect(CairoFixedArray.is([1, 2], F3)).toBe(false);
      expect(CairoFixedArray.is('nope', F3)).toBe(false);
    });

    test('isAbiType should tell a fixed array from a dynamic one', () => {
      expect(CairoFixedArray.isAbiType('[core::integer::u32; 8]')).toBe(true);
      expect(CairoFixedArray.isAbiType(NESTED)).toBe(true);
      expect(CairoFixedArray.isAbiType('[core::integer::u32;8]')).toBe(false);
      expect(CairoFixedArray.isAbiType('core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoFixedArray.isAbiType('core::integer::u32')).toBe(false);
    });

    test('isTypeFixedArray should answer exactly as isAbiType does', () => {
      // the name the library has always exposed, kept as an alias of the one the composites use
      const types = [
        '[core::integer::u32; 8]',
        '[[core::integer::u32; 2]; 8]',
        NESTED,
        '[core::integer::u32;8]',
        '[core::integer::u32; zorg]',
        'core::integer::u32',
        `[; ${'; '.repeat(10_000)}]`,
      ];
      types.forEach((type) => {
        expect(CairoFixedArray.isTypeFixedArray(type)).toBe(CairoFixedArray.isAbiType(type));
      });
      expect(CairoFixedArray.isTypeFixedArray('[core::integer::u32; 8]')).toBe(true);
      expect(CairoFixedArray.isTypeFixedArray('[core::integer::u32;8]')).toBe(false);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoFixedArray.dynamicSelector).toBe('CairoFixedArray');
      expect(new CairoFixedArray([1, 2, 3], F3, S).dynamicSelector).toBe('CairoFixedArray');
    });

    test('should be registered in the strategy, which is what makes nesting work', () => {
      expect(S.dynamicSelectors.CairoFixedArray(F3)).toBe(true);
      expect(S.dynamicSelectors.CairoFixedArray('core::integer::u8')).toBe(false);
      expect(typeof S.constructors.CairoFixedArray).toBe('function');
      expect(typeof S.response.CairoFixedArray).toBe('function');
    });
  });

  describe('toApiRequest method', () => {
    test('should carry no length, the type having it', () => {
      expect([...new CairoFixedArray([1, 2, 3], F3, S).toApiRequest()]).toHaveLength(3);
    });

    test('should flag the result as compiled', () => {
      expect(new CairoFixedArray([1, 2, 3], F3, S).toApiRequest()).toHaveProperty(
        '__compiled__',
        true
      );
    });
  });

  describe('compile, the object CallData.compile expects', () => {
    test('should key the items by index', () => {
      // the values are the built items now, which changes nothing for the calldata: what
      // CallData.compile serializes is anything that knows its own wire format
      const fArray = new CairoFixedArray([10, 20, 30], U3, S);
      expect(Object.keys(fArray.compile())).toEqual(['0', '1', '2']);
      expect(CallData.compile(fArray.compile() as any)).toEqual(['10', '20', '30']);
    });

    test('should key a plain list by index too, without needing an instance', () => {
      expect(CairoFixedArray.compile([10, 20, 30])).toStrictEqual({ '0': 10, '1': 20, '2': 30 });
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its items', () => {
      expect(CallData.compile([new CairoFixedArray([1, 2, 3], F3, S)] as any)).toEqual([
        '1',
        '2',
        '3',
      ]);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any[]][] = [
        [F3, [1, 2, 3]],
        [F2, [7, 8]],
        [
          NESTED,
          [
            [1, 2],
            [3, 4],
          ],
        ],
      ];
      cases.forEach(([type, values]) => {
        const array = new CairoFixedArray(values, type, S);
        const response = [...array.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);
        const readBack = new CairoFixedArray(response.values(), type, S);
        expect(readBack.decompose(S)).toEqual(array.decompose(S));
      });
    });
  });
});
