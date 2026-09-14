import { CairoArray, CairoTuple, CairoUint8, CallData, cairoTypeStrategy } from '../../../src';

const S = cairoTypeStrategy;
const U8 = 'core::array::Array::<core::integer::u8>';
const SPAN = 'core::array::Span::<core::integer::u8>';
const NESTED = 'core::array::Array::<core::array::Array::<core::integer::u8>>';
const FELTS = 'core::array::Array::<core::felt252>';
const BYTES31 = 'core::array::Array::<core::bytes_31::bytes31>';
const OF_TUPLES = 'core::array::Array::<(core::integer::u8, core::integer::u8)>';

const LONG_TEXT = 'Bug is back, for ever, here and everywhere';
/** Two chunks of 31 bytes at most, which is what a felt252 and a bytes31 each hold. */
const LONG_TEXT_FELTS = [
  '2',
  '117422190885827407409664260607192623408641871979684112605616397634538401380',
  '39164769268277364419555941',
];

/** The felts an array serializes to, as the hex strings a node would answer with. */
const asResponse = (array: CairoArray): string[] =>
  [...array.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);

describe('CairoArray class Unit Tests', () => {
  describe('construction from the values a caller passes', () => {
    test('should build from an array, length first', () => {
      expect([...new CairoArray([1, 2, 3], U8, S).toApiRequest()]).toEqual(['3', '1', '2', '3']);
    });

    test('should build from an object, read by its values', () => {
      expect([...new CairoArray({ 0: 1, 1: 2 }, U8, S).toApiRequest()]).toEqual(['2', '1', '2']);
    });

    test('should take an element that is already built', () => {
      expect([...new CairoArray([new CairoUint8(1), 2], U8, S).toApiRequest()]).toEqual([
        '2',
        '1',
        '2',
      ]);
    });

    test('should copy an array handed to it whole', () => {
      const copy = new CairoArray(new CairoArray([1, 2], U8, S), U8, S);
      expect([...copy.toApiRequest()]).toEqual(['2', '1', '2']);
      expect(copy.arrayType).toBe(U8);
    });

    test('should hold no elements at all', () => {
      expect([...new CairoArray([], U8, S).toApiRequest()]).toEqual(['0']);
      expect(new CairoArray([], U8, S).decompose(S)).toEqual([]);
    });

    test('should hold as many elements as it is given', () => {
      const size = 100;
      const values = Array.from({ length: size }, (_, index) => index % 256);
      const felts = [...new CairoArray(values, U8, S).toApiRequest()];
      expect(felts).toHaveLength(size + 1);
      expect(felts[0]).toBe(String(size));
    });

    test('should treat Array and Span the same way', () => {
      expect([...new CairoArray([1, 2], SPAN, S).toApiRequest()]).toEqual(['2', '1', '2']);
      expect(new CairoArray([1], SPAN, S).arrayType).toBe(SPAN);
    });

    test('should refuse an element type the strategy does not know', () => {
      expect(() => new CairoArray([1], 'core::array::Array::<core::foo::Bar>', S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });

    test('should refuse an unknown element type even with nothing to build', () => {
      // the element type is looked up once, before the elements: an empty array of a type that
      // does not exist is still an array of a type that does not exist
      expect(() => new CairoArray([], 'core::array::Array::<core::foo::Bar>', S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });
  });

  describe('text becomes the chunks a felt252 or a bytes31 holds', () => {
    test('should split a long string for an array of felt252', () => {
      expect([...new CairoArray(LONG_TEXT, FELTS, S).toApiRequest()]).toEqual(LONG_TEXT_FELTS);
    });

    test('should split it the same way for an array of bytes31', () => {
      expect([...new CairoArray(LONG_TEXT, BYTES31, S).toApiRequest()]).toEqual(LONG_TEXT_FELTS);
    });

    test('should split it for a Span as well as an Array', () => {
      expect([
        ...new CairoArray(LONG_TEXT, 'core::array::Span::<core::felt252>', S).toApiRequest(),
      ]).toEqual(LONG_TEXT_FELTS);
    });

    test('should leave text alone where the elements do not hold text', () => {
      // a u8 is one byte, so there is nothing sensible to split a sentence into
      expect(() => new CairoArray(LONG_TEXT, U8, S)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('should not split a string that spells a number', () => {
      // '123' is the number, not text; one element is written as ['123']
      expect(() => new CairoArray('123', FELTS, S)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });
  });

  describe('construction from a response', () => {
    test('should read the length then that many elements', () => {
      const array = new CairoArray(['0x2', '0x1', '0x2'].values(), U8, S);
      expect(array.decompose(S)).toEqual([1n, 2n]);
    });

    test('should consume exactly what the length announces, leaving the rest', () => {
      const iterator = ['0x2', '0x1', '0x2', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoArray(iterator, U8, S);
      expect(iterator.next().value).toBe('0x9');
    });

    test('should read a length written in decimal as well as in hexadecimal', () => {
      // this class writes the length in decimal and a node answers in hexadecimal; reading it in
      // a fixed base would turn a decimal 10 into 16
      const values = Array.from({ length: 10 }, (_, index) => index + 1);
      const decimal = [...new CairoArray(values, U8, S).toApiRequest()];
      const hexadecimal = decimal.map((felt) => `0x${BigInt(felt).toString(16)}`);
      expect(new CairoArray(decimal.values(), U8, S).content).toHaveLength(10);
      expect(new CairoArray(hexadecimal.values(), U8, S).content).toHaveLength(10);
    });
  });

  describe('nesting', () => {
    test('should give every level its own length prefix', () => {
      expect([...new CairoArray([[1, 2], [3]], NESTED, S).toApiRequest()]).toEqual([
        '2',
        '2',
        '1',
        '2',
        '1',
        '3',
      ]);
    });

    test('should read a nested array back off a flat response', () => {
      const array = new CairoArray(['0x2', '0x2', '0x1', '0x2', '0x1', '0x3'].values(), NESTED, S);
      expect(array.decompose(S)).toEqual([[1n, 2n], [3n]]);
    });

    test('should hold tuples, which have no length of their own', () => {
      const array = new CairoArray(
        [
          [1, 2],
          [3, 4],
        ],
        OF_TUPLES,
        S
      );
      expect([...array.toApiRequest()]).toEqual(['2', '1', '2', '3', '4']);
      expect(array.decompose(S)).toEqual([
        { 0: 1n, 1: 2n },
        { 0: 3n, 1: 4n },
      ]);
    });

    test('should sit inside a tuple in turn', () => {
      const tuple = new CairoTuple([[1, 2, 3], 9], `(${U8}, core::integer::u8)`, S);
      expect([...tuple.toApiRequest()]).toEqual(['3', '1', '2', '3', '9']);
    });
  });

  describe('reading an array type', () => {
    test('should give the element type', () => {
      expect(CairoArray.getArrayElementType('core::array::Array::<core::integer::u32>')).toBe(
        'core::integer::u32'
      );
      expect(CairoArray.getArrayElementType(SPAN)).toBe('core::integer::u8');
    });
  });

  describe('validate, is and isAbiType', () => {
    test('should accept an array or an object for an array type', () => {
      expect(() => CairoArray.validate([1, 2], U8)).not.toThrow();
      expect(() => CairoArray.validate({ 0: 1 }, U8)).not.toThrow();
    });

    test('should refuse a type that is not a dynamic array', () => {
      expect(() => CairoArray.validate([1, 2], 'core::integer::u8')).toThrow(
        'The type core::integer::u8 is not a Cairo dynamic array. Needs core::array::Array::<T> or core::array::Span::<T>.'
      );
    });

    test('should refuse an input that is neither an array nor an object', () => {
      expect(() => CairoArray.validate('nope', U8)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('is should be the non-throwing form of validate', () => {
      expect(CairoArray.is([1, 2], U8)).toBe(true);
      expect(CairoArray.is([], U8)).toBe(true);
      expect(CairoArray.is('nope', U8)).toBe(false);
      expect(CairoArray.is([1, 2], 'core::integer::u8')).toBe(false);
    });

    test('isAbiType should tell a dynamic array from a fixed one', () => {
      expect(CairoArray.isAbiType(U8)).toBe(true);
      expect(CairoArray.isAbiType(SPAN)).toBe(true);
      expect(CairoArray.isAbiType(NESTED)).toBe(true);
      expect(CairoArray.isAbiType('[core::integer::u32; 8]')).toBe(false);
      expect(CairoArray.isAbiType('core::integer::u32')).toBe(false);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoArray.dynamicSelector).toBe('CairoArray');
      expect(new CairoArray([1], U8, S).dynamicSelector).toBe('CairoArray');
    });

    test('should be registered in the strategy, which is what makes nesting work', () => {
      expect(S.dynamicSelectors[CairoArray.dynamicSelector](U8)).toBe(true);
      expect(S.dynamicSelectors[CairoArray.dynamicSelector]('core::integer::u8')).toBe(false);
      expect(typeof S.constructors[CairoArray.dynamicSelector]).toBe('function');
      expect(typeof S.response[CairoArray.dynamicSelector]).toBe('function');
    });

    test('should refuse to build without the abi type it stands for', () => {
      expect(() => S.constructors[CairoArray.dynamicSelector]([1, 2], S)).toThrow(
        'A CairoArray cannot be built without the abi type it stands for'
      );
    });
  });

  describe('toApiRequest method', () => {
    test('should put the count in front', () => {
      // the whole difference with a tuple: an array declares no size in its type
      expect([...new CairoArray([1, 2, 3], U8, S).toApiRequest()][0]).toBe('3');
    });

    test('should flag the result as compiled', () => {
      expect(new CairoArray([1], U8, S).toApiRequest()).toHaveProperty('__compiled__', true);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance with its length prefix', () => {
      expect(CallData.compile([new CairoArray([1, 2, 3], U8, S)] as any)).toEqual([
        '3',
        '1',
        '2',
        '3',
      ]);
    });

    test('should sit alongside ordinary values', () => {
      expect(CallData.compile([new CairoArray([1, 2], U8, S), 30] as any)).toEqual([
        '2',
        '1',
        '2',
        '30',
      ]);
    });

    test('should flatten a nested array, prefixes and all', () => {
      expect(CallData.compile([new CairoArray([[1, 2], [3]], NESTED, S)] as any)).toEqual([
        '2',
        '2',
        '1',
        '2',
        '1',
        '3',
      ]);
    });
  });

  describe('decompose method', () => {
    test('should return the elements in order', () => {
      expect(new CairoArray([1, 2, 3], U8, S).decompose(S)).toEqual([1n, 2n, 3n]);
    });

    test('should decompose each level of a nested array', () => {
      expect(new CairoArray([[1, 2], [3]], NESTED, S).decompose(S)).toEqual([[1n, 2n], [3n]]);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any[]][] = [
        [U8, []],
        [U8, [1, 2, 3]],
        [SPAN, [7]],
        [NESTED, [[1, 2], [3]]],
        [
          OF_TUPLES,
          [
            [1, 2],
            [3, 4],
          ],
        ],
      ];
      cases.forEach(([type, values]) => {
        const array = new CairoArray(values, type, S);
        const readBack = new CairoArray(asResponse(array).values(), type, S);
        expect(readBack.decompose(S)).toEqual(array.decompose(S));
      });
    });

    test('should read a long string back as its chunks', () => {
      const array = new CairoArray(LONG_TEXT, FELTS, S);
      const readBack = new CairoArray(asResponse(array).values(), FELTS, S);
      expect([...readBack.toApiRequest()]).toEqual(LONG_TEXT_FELTS);
    });
  });
});
