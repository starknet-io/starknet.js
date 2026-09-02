import { CallData } from '../../../src';
import { CairoArray } from '../../../src/utils/cairoDataTypes/array';
import { CairoTypeFixedArray } from '../../../src/utils/cairoDataTypes/cairoTypeFixedArray';
import { CairoFixedArray } from '../../../src/utils/cairoDataTypes/fixedArray';
import { CairoTuple } from '../../../src/utils/cairoDataTypes/tuple';
import { CairoUint8 } from '../../../src/utils/cairoDataTypes/uint8';
import { cairoTypeStrategy as S } from '../../../src/utils/calldata/parser/cairoTypeStrategy';

const F3 = '[core::integer::u8; 3]';
const F2 = '[core::integer::u8; 2]';
const NESTED = '[[core::integer::u8; 2]; 2]';

describe('CairoTypeFixedArray class Unit Tests', () => {
  describe('the public CairoFixedArray is left alone', () => {
    test('should still compile a list into the struct CallData expects', () => {
      expect(new CairoFixedArray([10, 20, 30], F3).compile()).toEqual({ 0: 10, 1: 20, 2: 30 });
    });

    test('should still not serialize itself, which is what this class adds', () => {
      expect('toApiRequest' in new CairoFixedArray([1, 2, 3], F3)).toBe(false);
    });
  });

  describe('construction from the values a caller passes', () => {
    test('should build from an array, with no length on the wire', () => {
      expect([...new CairoTypeFixedArray([1, 2, 3], F3, S).toApiRequest()]).toEqual([
        '1',
        '2',
        '3',
      ]);
    });

    test('should build from the object CairoFixedArray.compile produces', () => {
      const compiled = CairoFixedArray.compile([1, 2, 3]);
      expect([...new CairoTypeFixedArray(compiled, F3, S).toApiRequest()]).toEqual(['1', '2', '3']);
    });

    test('should take an element that is already built', () => {
      expect([...new CairoTypeFixedArray([new CairoUint8(1), 2], F2, S).toApiRequest()]).toEqual([
        '1',
        '2',
      ]);
    });

    test('should copy a CairoTypeFixedArray handed to it whole', () => {
      const copy = new CairoTypeFixedArray(new CairoTypeFixedArray([1, 2, 3], F3, S), F3, S);
      expect([...copy.toApiRequest()]).toEqual(['1', '2', '3']);
      expect(copy.arrayType).toBe(F3);
    });

    test('should refuse a count the type does not declare', () => {
      expect(() => new CairoTypeFixedArray([1, 2], F3, S)).toThrow(
        'ABI type [core::integer::u8; 3]: expected 3 items, got 2 items'
      );
      expect(() => new CairoTypeFixedArray([1, 2, 3, 4], F3, S)).toThrow(
        'ABI type [core::integer::u8; 3]: expected 3 items, got 4 items'
      );
    });

    test('should refuse an element type the strategy does not know', () => {
      expect(() => new CairoTypeFixedArray([1], '[core::foo::Bar; 1]', S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });
  });

  describe('construction from a response', () => {
    test('should read as many elements as the type declares', () => {
      const array = new CairoTypeFixedArray(['0x1', '0x2', '0x3'].values(), F3, S);
      expect(array.decompose(S)).toEqual([1n, 2n, 3n]);
    });

    test('should consume exactly that many, leaving the rest', () => {
      const iterator = ['0x1', '0x2', '0x3', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoTypeFixedArray(iterator, F3, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('nesting', () => {
    test('should hold fixed arrays, none of them carrying a length', () => {
      const array = new CairoTypeFixedArray(
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
      const array = new CairoTypeFixedArray(['0x1', '0x2', '0x3', '0x4'].values(), NESTED, S);
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

  describe('reading a fixed array type', () => {
    test('should give the element type and the size', () => {
      expect(CairoTypeFixedArray.getFixedArrayType('[core::integer::u32; 8]')).toBe(
        'core::integer::u32'
      );
      expect(CairoTypeFixedArray.getFixedArraySize('[core::integer::u32; 8]')).toBe(8);
    });

    test('should keep a nested inner array whole', () => {
      expect(CairoTypeFixedArray.getFixedArrayType(NESTED)).toBe('[core::integer::u8; 2]');
      expect(CairoTypeFixedArray.getFixedArraySize(NESTED)).toBe(2);
    });

    test('should read a type exactly as the public class does', () => {
      // both delegate to the same reader, so a type cannot mean two things
      [F3, F2, NESTED, '[core::integer::u32; 8]'].forEach((type) => {
        expect(CairoTypeFixedArray.getFixedArrayType(type)).toBe(
          CairoFixedArray.getFixedArrayType(type)
        );
        expect(CairoTypeFixedArray.getFixedArraySize(type)).toBe(
          CairoFixedArray.getFixedArraySize(type)
        );
      });
    });
  });

  describe('validate, is and isAbiType', () => {
    test('should check the count, unlike a dynamic array', () => {
      expect(() => CairoTypeFixedArray.validate([1, 2, 3], F3)).not.toThrow();
      expect(() => CairoTypeFixedArray.validate([1, 2], F3)).toThrow(
        'expected 3 items, got 2 items'
      );
    });

    test('should refuse a type that is not a fixed array', () => {
      expect(() => CairoTypeFixedArray.validate([1], 'core::integer::u8')).toThrow(
        'The type core::integer::u8 is not a Cairo fixed array. Needs [type; length].'
      );
    });

    test('should refuse an input that is neither an array nor an object', () => {
      expect(() => CairoTypeFixedArray.validate('nope', F3)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('is should be the non-throwing form of validate', () => {
      expect(CairoTypeFixedArray.is([1, 2, 3], F3)).toBe(true);
      expect(CairoTypeFixedArray.is([1, 2], F3)).toBe(false);
      expect(CairoTypeFixedArray.is('nope', F3)).toBe(false);
    });

    test('isAbiType should tell a fixed array from a dynamic one', () => {
      expect(CairoTypeFixedArray.isAbiType('[core::integer::u32; 8]')).toBe(true);
      expect(CairoTypeFixedArray.isAbiType(NESTED)).toBe(true);
      expect(CairoTypeFixedArray.isAbiType('[core::integer::u32;8]')).toBe(false);
      expect(CairoTypeFixedArray.isAbiType('core::array::Array::<core::integer::u8>')).toBe(false);
      expect(CairoTypeFixedArray.isAbiType('core::integer::u32')).toBe(false);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoTypeFixedArray.dynamicSelector).toBe('CairoTypeFixedArray');
      expect(new CairoTypeFixedArray([1, 2, 3], F3, S).dynamicSelector).toBe('CairoTypeFixedArray');
    });

    test('should be registered in the strategy, which is what makes nesting work', () => {
      expect(S.dynamicSelectors.CairoTypeFixedArray(F3)).toBe(true);
      expect(S.dynamicSelectors.CairoTypeFixedArray('core::integer::u8')).toBe(false);
      expect(typeof S.constructors.CairoTypeFixedArray).toBe('function');
      expect(typeof S.response.CairoTypeFixedArray).toBe('function');
    });
  });

  describe('toApiRequest method', () => {
    test('should carry no length, the type having it', () => {
      expect([...new CairoTypeFixedArray([1, 2, 3], F3, S).toApiRequest()]).toHaveLength(3);
    });

    test('should flag the result as compiled', () => {
      expect(new CairoTypeFixedArray([1, 2, 3], F3, S).toApiRequest()).toHaveProperty(
        '__compiled__',
        true
      );
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its elements', () => {
      expect(CallData.compile([new CairoTypeFixedArray([1, 2, 3], F3, S)] as any)).toEqual([
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
        const array = new CairoTypeFixedArray(values, type, S);
        const response = [...array.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);
        const readBack = new CairoTypeFixedArray(response.values(), type, S);
        expect(readBack.decompose(S)).toEqual(array.decompose(S));
      });
    });
  });
});
