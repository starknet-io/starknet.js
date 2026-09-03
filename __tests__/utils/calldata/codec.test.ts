import {
  Abi,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CallData,
  type MultiType,
} from '../../../src';

/**
 * The composites, driven end to end through a real abi.
 *
 * What the class tests in `__tests__/utils/cairoDataTypes/` check is each class on its own, built
 * with a strategy handed to it. What this file checks is the trajectory : the abi is read, a parser
 * is chosen, the strategy is assembled from the contract's own structs and enums, the class is
 * built, and the felts come out — then the same felts are read back. Nothing else offline covers
 * a composite along that path, and it is where a silent regression would sit.
 *
 * Every expectation here is an absolute value, so the file says what the codec does rather than
 * that two implementations agree.
 */

/**
 * What a real abi declares as structs even though the library has a class for each.
 *
 * Present in every fixture because that is the realistic shape, and because it is what a struct
 * strategy could shadow : a name registered from the abi is a direct key, and a direct key wins
 * over the dynamic selector that should have recognized the type.
 */
const CORE_STRUCTS = [
  {
    type: 'struct',
    name: 'core::byte_array::ByteArray',
    members: [
      { name: 'data', type: 'core::array::Array::<core::bytes_31::bytes31>' },
      { name: 'pending_word', type: 'core::felt252' },
      { name: 'pending_word_len', type: 'core::integer::u32' },
    ],
  },
  {
    type: 'struct',
    name: 'core::starknet::eth_address::EthAddress',
    members: [{ name: 'address', type: 'core::felt252' }],
  },
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      { name: 'low', type: 'core::integer::u128' },
      { name: 'high', type: 'core::integer::u128' },
    ],
  },
];

/** An abi exposing `f(x: T) -> T`, behind an interface, plus whatever T needs declared. */
const abiFor = (type: string, extra: any[] = []): Abi =>
  [
    ...CORE_STRUCTS,
    ...extra,
    {
      type: 'interface',
      name: 'test::ITest',
      items: [
        {
          type: 'function',
          name: 'f',
          inputs: [{ name: 'x', type }],
          outputs: [{ type }],
          state_mutability: 'view',
        },
      ],
    },
  ] as unknown as Abi;

const POINT = {
  type: 'struct',
  name: 'test::Point',
  members: [
    { name: 'x', type: 'core::integer::u8' },
    { name: 'y', type: 'core::integer::u32' },
  ],
};

const LINE = {
  type: 'struct',
  name: 'test::Line',
  members: [
    { name: 'a', type: 'test::Point' },
    { name: 'b', type: 'test::Point' },
  ],
};

const MIXED = {
  type: 'struct',
  name: 'test::Mixed',
  members: [
    { name: 'list', type: 'core::array::Array::<core::integer::u8>' },
    { name: 'pair', type: '(core::integer::u8, core::integer::u16)' },
  ],
};

/** A Span is a struct in a real abi, which is exactly what must not shadow the array selector. */
const SPAN_U8 = {
  type: 'struct',
  name: 'core::array::Span::<core::integer::u8>',
  members: [{ name: 'snapshot', type: '@core::array::Array::<core::integer::u8>' }],
};

const OPTION_U8 = {
  type: 'enum',
  name: 'core::option::Option::<core::integer::u8>',
  variants: [
    { name: 'Some', type: 'core::integer::u8' },
    { name: 'None', type: '()' },
  ],
};

const RESULT_U8 = {
  type: 'enum',
  name: 'core::result::Result::<core::integer::u8, core::felt252>',
  variants: [
    { name: 'Ok', type: 'core::integer::u8' },
    { name: 'Err', type: 'core::felt252' },
  ],
};

const CHOICE = {
  type: 'enum',
  name: 'test::Choice',
  variants: [
    { name: 'Empty', type: '()' },
    { name: 'Number', type: 'core::integer::u8' },
    { name: 'Pair', type: '(core::integer::u8, core::integer::u8)' },
  ],
};

const ARRAY_U8 = 'core::array::Array::<core::integer::u8>';
const SPAN_TYPE = 'core::array::Span::<core::integer::u8>';
const OPTION_TYPE = 'core::option::Option::<core::integer::u8>';
const RESULT_TYPE = 'core::result::Result::<core::integer::u8, core::felt252>';

/** Serialize one value for `f`, in the positional form. */
const compile = (type: string, value: MultiType, extra: any[] = []) =>
  new CallData(abiFor(type, extra)).compile('f', [value]);

/** The same, in the named form, which is ordered against the abi before being built. */
const compileNamed = (type: string, value: MultiType, extra: any[] = []) =>
  new CallData(abiFor(type, extra)).compile('f', { x: value });

/** Read felts back as `f` returns them. */
const parse = (type: string, felts: string[], extra: any[] = []) =>
  new CallData(abiFor(type, extra)).parse('f', felts);

describe('the composites, through an abi', () => {
  describe('dynamic arrays', () => {
    test('should carry the count in front, and read it back', () => {
      expect(compile(ARRAY_U8, [1, 2, 3])).toEqual(['3', '1', '2', '3']);
      expect(parse(ARRAY_U8, ['3', '1', '2', '3'])).toEqual([1n, 2n, 3n]);
    });

    test('should hold nothing at all', () => {
      expect(compile(ARRAY_U8, [])).toEqual(['0']);
      expect(parse(ARRAY_U8, ['0'])).toEqual([]);
    });

    test('should give every level of a nested array its own count', () => {
      const type = 'core::array::Array::<core::array::Array::<core::integer::u8>>';
      const felts = ['2', '1', '10', '2', '11', '12'];
      expect(compile(type, [[10], [11, 12]])).toEqual(felts);
      expect(parse(type, felts)).toEqual([[10n], [11n, 12n]]);
    });

    test('should read a Span as the array it is, not as the struct the abi declares', () => {
      // the trap: `Span` is declared as a struct, and a struct is registered under its exact name,
      // which a lookup tries before any dynamic selector. Registered, it would be read member by
      // member — one felt for `snapshot` — instead of as a counted array
      expect(compile(SPAN_TYPE, [1, 2], [SPAN_U8])).toEqual(['2', '1', '2']);
      expect(parse(SPAN_TYPE, ['2', '1', '2'], [SPAN_U8])).toEqual([1n, 2n]);
    });

    test('should accept a long string where the items hold text', () => {
      const type = 'core::array::Array::<core::felt252>';
      expect(compile(type, 'hello')).toEqual(['1', '448378203247']);
      expect(parse(type, ['1', '448378203247'])).toEqual([448378203247n]);
    });
  });

  describe('fixed arrays', () => {
    test('should carry no count, the type holding it', () => {
      expect(compile('[core::integer::u8; 3]', [1, 2, 3])).toEqual(['1', '2', '3']);
      expect(parse('[core::integer::u8; 3]', ['1', '2', '3'])).toEqual([1n, 2n, 3n]);
    });

    test('should refuse a count the type does not declare', () => {
      expect(() => compile('[core::integer::u8; 3]', [1, 2])).toThrow(
        'The ABI type [core::integer::u8; 3] is expecting 3 items. 2 items provided.'
      );
    });
  });

  describe('tuples', () => {
    test('should lay the members out with nothing in front', () => {
      const type = '(core::integer::u8, core::integer::u16)';
      expect(compile(type, [1, 2])).toEqual(['1', '2']);
      expect(parse(type, ['1', '2'])).toEqual({ 0: 1n, 1: 2n });
    });

    test('should carry the unit type without a felt', () => {
      expect(compile('()', {})).toEqual([]);
      expect(parse('()', [])).toEqual({});
    });

    test('should flatten a tuple of tuples', () => {
      const type = '((core::integer::u8, core::integer::u8), core::integer::u16)';
      expect(compile(type, [[1, 2], 3])).toEqual(['1', '2', '3']);
      expect(parse(type, ['1', '2', '3'])).toEqual({ 0: { 0: 1n, 1: 2n }, 1: 3n });
    });
  });

  describe('structs', () => {
    test('should lay the members out in the abi order', () => {
      expect(compile('test::Point', { x: 1, y: 2 }, [POINT])).toEqual(['1', '2']);
      expect(parse('test::Point', ['1', '2'], [POINT])).toEqual({ x: 1n, y: 2n });
    });

    test('should read an object by its member names, whatever order they came in', () => {
      // the abi order is the one that reaches the calldata, in both call forms
      expect(compile('test::Point', { y: 2, x: 1 }, [POINT])).toEqual(['1', '2']);
      expect(compileNamed('test::Point', { y: 2, x: 1 }, [POINT])).toEqual(['1', '2']);
    });

    test('should refuse an object with too few members', () => {
      // the count is checked before the names, so this is what a short object gets
      expect(() => compile('test::Point', { x: 1 }, [POINT])).toThrow(
        'Invalid input: expected 2 members, got 1'
      );
    });

    test('should name the member it cannot find, once the count is right', () => {
      expect(() => compile('test::Point', { x: 1, z: 9 }, [POINT])).toThrow(
        'Your object needs a property with key : y .'
      );
    });

    test('should nest', () => {
      const value = { a: { x: 1, y: 2 }, b: { x: 3, y: 4 } };
      expect(compile('test::Line', value, [POINT, LINE])).toEqual(['1', '2', '3', '4']);
      expect(parse('test::Line', ['1', '2', '3', '4'], [POINT, LINE])).toEqual(value2Bigint(value));
    });

    test('should hold an array and a tuple side by side', () => {
      const felts = ['2', '10', '11', '1', '2'];
      expect(compile('test::Mixed', { list: [10, 11], pair: [1, 2] }, [MIXED])).toEqual(felts);
      expect(parse('test::Mixed', felts, [MIXED])).toEqual({
        list: [10n, 11n],
        pair: { 0: 1n, 1: 2n },
      });
    });
  });

  describe('Option', () => {
    test('should put the variant in front of a Some', () => {
      const value = new CairoOption(CairoOptionVariant.Some, 44);
      expect(compile(OPTION_TYPE, value, [OPTION_U8])).toEqual(['0', '44']);
      expect(parse(OPTION_TYPE, ['0', '44'], [OPTION_U8])).toEqual(
        new CairoOption(CairoOptionVariant.Some, 44n)
      );
    });

    test('should spend a single felt on a None', () => {
      const value = new CairoOption(CairoOptionVariant.None, undefined);
      expect(compile(OPTION_TYPE, value, [OPTION_U8])).toEqual(['1']);
      const read = parse(OPTION_TYPE, ['1'], [OPTION_U8]) as CairoOption<bigint>;
      expect(read.isNone()).toBe(true);
    });
  });

  describe('Result', () => {
    test('should put the variant in front of an Ok', () => {
      const value = new CairoResult(CairoResultVariant.Ok, 44);
      expect(compile(RESULT_TYPE, value, [RESULT_U8])).toEqual(['0', '44']);
      expect(parse(RESULT_TYPE, ['0', '44'], [RESULT_U8])).toEqual(
        new CairoResult(CairoResultVariant.Ok, 44n)
      );
    });

    test('should take the Err branch with its own type', () => {
      const value = new CairoResult(CairoResultVariant.Err, 1000);
      expect(compile(RESULT_TYPE, value, [RESULT_U8])).toEqual(['1', '1000']);
      expect(parse(RESULT_TYPE, ['1', '1000'], [RESULT_U8])).toEqual(
        new CairoResult(CairoResultVariant.Err, 1000n)
      );
    });
  });

  describe('custom enums', () => {
    test('should spend a single felt on a variant that holds nothing', () => {
      const value = new CairoCustomEnum({ Empty: {}, Number: undefined, Pair: undefined });
      expect(compile('test::Choice', value, [CHOICE])).toEqual(['0']);
      const read = parse('test::Choice', ['0'], [CHOICE]) as CairoCustomEnum;
      expect(read.activeVariant()).toBe('Empty');
    });

    test('should number the variant by its position in the abi', () => {
      const value = new CairoCustomEnum({ Empty: undefined, Number: 44, Pair: undefined });
      expect(compile('test::Choice', value, [CHOICE])).toEqual(['1', '44']);
      const read = parse('test::Choice', ['1', '44'], [CHOICE]) as CairoCustomEnum;
      expect(read.activeVariant()).toBe('Number');
      expect(read.unwrap()).toBe(44n);
    });

    test('should hold a composite in a variant', () => {
      const value = new CairoCustomEnum({ Empty: undefined, Number: undefined, Pair: [1, 2] });
      expect(compile('test::Choice', value, [CHOICE])).toEqual(['2', '1', '2']);
      const read = parse('test::Choice', ['2', '1', '2'], [CHOICE]) as CairoCustomEnum;
      expect(read.activeVariant()).toBe('Pair');
      expect(read.unwrap()).toEqual({ 0: 1n, 1: 2n });
    });
  });

  describe('NonZero', () => {
    test('should serialize as the type it wraps', () => {
      const type = 'core::zeroable::NonZero::<core::integer::u8>';
      expect(compile(type, 44)).toEqual(['44']);
      expect(parse(type, ['44'])).toBe(44n);
    });
  });

  describe('what a node answers outside the declared type', () => {
    // Reading a response builds the declared type from the felts, and building it is what checks
    // the range — one constructor serves both directions. So a value the codec refuses on the way
    // out is refused on the way in, at whatever depth it sits.
    test('should refuse it at the top level', () => {
      expect(() => parse('core::integer::u8', ['0x123456'])).toThrow(
        'Value is out of u8 range [0, 255]'
      );
    });

    test('should refuse it inside an array', () => {
      expect(() => parse('core::array::Array::<core::integer::u16>', ['1', '0x123456'])).toThrow(
        'Value is out of u16 range [0, 65535]'
      );
    });

    test('should refuse it inside a struct member', () => {
      expect(() => parse('test::Point', ['1', '0x123456789'], [POINT])).toThrow(
        'Value is out of u32 range [0, 4294967295]'
      );
    });
  });

  describe('an abi type no strategy knows', () => {
    test('should raise rather than be read as a felt252', () => {
      // it used to fall through to the felt252 default, so a typo in an abi produced a plausible
      // number instead of an error
      expect(() => compile('test::Unknown', 1)).toThrow('Parser for test::Unknown not found');
      expect(() => parse('test::Unknown', ['0x1'])).toThrow('Parser for test::Unknown not found');
    });
  });

  describe('round trips', () => {
    const trips: [string, MultiType, any[]][] = [
      [ARRAY_U8, [1, 2, 3], []],
      [SPAN_TYPE, [1, 2], [SPAN_U8]],
      ['[core::integer::u8; 3]', [1, 2, 3], []],
      ['(core::integer::u8, core::integer::u16)', [1, 2], []],
      ['()', {}, []],
      ['test::Point', { x: 1, y: 2 }, [POINT]],
      ['test::Mixed', { list: [10, 11], pair: [1, 2] }, [MIXED]],
      [OPTION_TYPE, new CairoOption(CairoOptionVariant.Some, 44), [OPTION_U8]],
      [OPTION_TYPE, new CairoOption(CairoOptionVariant.None, undefined), [OPTION_U8]],
      [RESULT_TYPE, new CairoResult(CairoResultVariant.Ok, 44), [RESULT_U8]],
      [RESULT_TYPE, new CairoResult(CairoResultVariant.Err, 1000), [RESULT_U8]],
      [
        'test::Choice',
        new CairoCustomEnum({ Empty: undefined, Number: 44, Pair: undefined }),
        [CHOICE],
      ],
    ];

    test.each(trips)('%s should come back as what went in', (type, value, extra) => {
      const felts = compile(type, value, extra);
      // read back through a second CallData, so nothing is carried over from the first
      const read = parse(type, felts, extra);
      expect(compile(type, read, extra)).toEqual(felts);
    });
  });
});

/** Turn the numbers of an expected object into the bigints a response yields. */
function value2Bigint(value: any): any {
  if (typeof value === 'number') return BigInt(value);
  if (Array.isArray(value)) return value.map(value2Bigint);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, value2Bigint(v)]));
  }
  return value;
}
