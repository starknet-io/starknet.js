import {
  Abi,
  type AbiEnum,
  type AbiStruct,
  CairoArray,
  CairoByteArray,
  CairoBytes31,
  CairoCustomEnum,
  CairoFelt252,
  CairoFixedArray,
  CairoInt8,
  CairoInt16,
  CairoInt32,
  CairoInt64,
  CairoInt128,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CairoStruct,
  CairoTuple,
  CairoTypeCustomEnum,
  CairoTypeOption,
  CairoTypeResult,
  CairoUint8,
  CairoUint16,
  CairoUint32,
  CairoUint64,
  CairoUint96,
  CairoUint128,
  CairoUint256,
  CallData,
  cairoTypeStrategy,
  enumStrategy,
  structStrategy,
} from '../../../src';

const { Some } = CairoOptionVariant;
const { Err } = CairoResultVariant;

const BYTE_ARRAY_STRUCT = {
  type: 'struct',
  name: 'core::byte_array::ByteArray',
  members: [
    { name: 'data', type: 'core::array::Array::<core::bytes_31::bytes31>' },
    { name: 'pending_word', type: 'core::felt252' },
    { name: 'pending_word_len', type: 'core::integer::u32' },
  ],
};

const PAIR_STRUCT = {
  type: 'struct',
  name: 'test::Pair',
  members: [
    { name: 'a', type: 'core::integer::u64' },
    { name: 'b', type: 'core::felt252' },
  ],
} as AbiStruct;

const OUTER_STRUCT = {
  type: 'struct',
  name: 'test::Outer',
  members: [
    { name: 'p', type: 'test::Pair' },
    { name: 'n', type: 'core::integer::u8' },
  ],
} as AbiStruct;

const SHAPE_ENUM = {
  type: 'enum',
  name: 'test::Shape',
  variants: [
    { name: 'Dot', type: 'test::Pair' },
    { name: 'Nothing', type: '()' },
  ],
} as AbiEnum;

const OPTION_OF_PAIR = 'core::option::Option::<test::Pair>';
const RESULT_OF_PAIR = 'core::result::Result::<core::felt252, test::Pair>';
const OPTION_OF_U8 = 'core::option::Option::<core::integer::u8>';
const OPTION_OF_OPTION = `core::option::Option::<${OPTION_OF_U8}>`;

/**
 * The enums that a Cairo compiler writes in the abi for the types above.
 *
 * Property ordering only works inside an enum listed in the abi. Without them, the object form
 * would not run the code that these tests check.
 */
const ABI_ENUMS = [
  SHAPE_ENUM,
  {
    type: 'enum',
    name: OPTION_OF_PAIR,
    variants: [
      { name: 'Some', type: 'test::Pair' },
      { name: 'None', type: '()' },
    ],
  },
  {
    type: 'enum',
    name: RESULT_OF_PAIR,
    variants: [
      { name: 'Ok', type: 'core::felt252' },
      { name: 'Err', type: 'test::Pair' },
    ],
  },
  {
    type: 'enum',
    name: OPTION_OF_U8,
    variants: [
      { name: 'Some', type: 'core::integer::u8' },
      { name: 'None', type: '()' },
    ],
  },
  {
    type: 'enum',
    name: OPTION_OF_OPTION,
    variants: [
      { name: 'Some', type: OPTION_OF_U8 },
      { name: 'None', type: '()' },
    ],
  },
];

/** What the Cairo type classes need to build a `Pair` or a `Shape` by hand. */
const STRATEGIES = [cairoTypeStrategy, structStrategy([PAIR_STRUCT]), enumStrategy([SHAPE_ENUM])];

/** A `Pair` already built, which serializes as `['44', '7']`. */
const builtPair = () => new CairoStruct({ a: 44, b: 7 }, PAIR_STRUCT, STRATEGIES);

/** An abi whose only function takes one parameter `v` of the given type. */
const abiFor = (type: string): Abi =>
  [
    BYTE_ARRAY_STRUCT,
    PAIR_STRUCT,
    OUTER_STRUCT,
    ...ABI_ENUMS,
    {
      type: 'function',
      name: 'fn',
      inputs: [{ name: 'v', type }],
      outputs: [],
      state_mutability: 'external',
    },
  ] as Abi;

/**
 * Compile one argument both ways.
 *
 * The two forms are two pipelines, not one: an argument object goes through property ordering and
 * field validation first, where an argument array goes straight to serialization. A fix that holds
 * for one says nothing about the other.
 */
const bothForms = (type: string, value: any) => {
  const callData = new CallData(abiFor(type));
  return {
    positional: () => callData.compile('fn', [value]),
    named: () => callData.compile('fn', { v: value }),
  };
};

const expectBothForms = (type: string, value: any, expected: string[]) => {
  const { positional, named } = bothForms(type, value);
  expect(positional()).toEqual(expected);
  expect(named()).toEqual(expected);
};

const expectRefusedBothForms = (type: string, value: any) => {
  const { positional, named } = bothForms(type, value);
  expect(positional).toThrow();
  expect(named).toThrow();
};

describe('an argument already typed by the caller', () => {
  describe('an instance fills the slot its own type declares', () => {
    test.each([
      ['core::felt252', new CairoFelt252('Hello')],
      ['core::integer::u8', new CairoUint8(5)],
      ['core::integer::u16', new CairoUint16(500)],
      ['core::integer::u32', new CairoUint32(70000)],
      ['core::integer::u64', new CairoUint64(44)],
      ['core::integer::u96', new CairoUint96(5)],
      ['core::integer::u128', new CairoUint128(5)],
      ['core::integer::i8', new CairoInt8(-5)],
      ['core::integer::i16', new CairoInt16(-5)],
      ['core::integer::i32', new CairoInt32(-5)],
      ['core::integer::i64', new CairoInt64(-5)],
      ['core::integer::i128', new CairoInt128(-5)],
    ])('%s', (type, instance) => {
      expectBothForms(type, instance, instance.toApiRequest());
    });

    test('bytes31, which is read as an instance rather than as a number', () => {
      const bytes31 = new CairoBytes31('ab');
      expectBothForms(CairoBytes31.abiSelector, bytes31, bytes31.toApiRequest());
    });

    test('a plain value is still accepted, and says the same thing', () => {
      expectBothForms('core::integer::u64', 44, new CairoUint64(44).toApiRequest());
    });
  });

  describe('only its own type: a one-felt instance is not a number to be re-typed', () => {
    test('a wider type is refused, even holding a value that would fit', () => {
      expectRefusedBothForms('core::integer::u64', new CairoUint128(44));
    });

    test('a narrower type is refused too', () => {
      expectRefusedBothForms('core::integer::u128', new CairoUint8(5));
    });

    test('a bytes31 is refused where a felt252 is declared', () => {
      expectRefusedBothForms('core::felt252', new CairoBytes31('ab'));
    });
  });

  describe('at any depth', () => {
    test('a struct member', () => {
      expectBothForms('test::Pair', { a: new CairoUint64(44), b: 7 }, ['44', '7']);
    });

    test('an item of a dynamic array', () => {
      expectBothForms(
        'core::array::Array::<core::integer::u64>',
        [new CairoUint64(44)],
        ['1', '44']
      );
      expectBothForms(
        'core::array::Array::<core::felt252>',
        [new CairoFelt252('ab')],
        ['1', ...new CairoFelt252('ab').toApiRequest()]
      );
    });

    test('an item of an array of bytes31, typed or not', () => {
      // the named form used to refuse the whole array, for any value: validateArray had no
      // bytes31 branch and fell through to its "Validate Unhandled" default
      const bytes31 = new CairoBytes31('ab');
      expectBothForms(
        'core::array::Array::<core::bytes_31::bytes31>',
        [bytes31],
        ['1', ...bytes31.toApiRequest()]
      );
      expectBothForms(
        'core::array::Array::<core::bytes_31::bytes31>',
        ['ab'],
        ['1', ...bytes31.toApiRequest()]
      );
    });

    test('the items of a fixed array', () => {
      expectBothForms(
        '[core::integer::u8; 3]',
        [new CairoUint8(10), new CairoUint8(20), new CairoUint8(30)],
        ['10', '20', '30']
      );
    });

    test('a fixed array passed as its own instance', () => {
      // its two fields used to be counted as the items, giving "2 items provided"
      const fixedArray = new CairoFixedArray(
        [10, 20, 30],
        '[core::integer::u32; 3]',
        cairoTypeStrategy
      );
      expectBothForms('[core::integer::u32; 3]', fixedArray, ['10', '20', '30']);
    });

    test('a fixed array instance whose size disagrees with the abi is refused', () => {
      const fixedArray = new CairoFixedArray(
        [10, 20],
        '[core::integer::u32; 2]',
        cairoTypeStrategy
      );
      expectRefusedBothForms('[core::integer::u32; 3]', fixedArray);
    });
  });

  describe('the multi-felt types keep working as they did', () => {
    test('u256 and its two felts', () => {
      const uint256 = new CairoUint256(5);
      expectBothForms(CairoUint256.abiSelector, uint256, uint256.toApiRequest());
      expectBothForms(
        'core::array::Array::<core::integer::u256>',
        [uint256],
        ['1', ...uint256.toApiRequest()]
      );
    });

    test('ByteArray, flat and in an array', () => {
      const byteArray = CairoByteArray.fromText('ab');
      expectBothForms(CairoByteArray.abiSelector, byteArray, byteArray.toApiRequest());
      expectBothForms(
        'core::array::Array::<core::byte_array::ByteArray>',
        [byteArray],
        ['1', ...byteArray.toApiRequest()]
      );
    });
  });

  describe('a composite passed as its own instance', () => {
    test('a struct', () => {
      expectBothForms('test::Pair', builtPair(), ['44', '7']);
    });

    test('a dynamic array', () => {
      const type = 'core::array::Array::<core::integer::u64>';
      expectBothForms(type, new CairoArray([44, 45], type, STRATEGIES), ['2', '44', '45']);
    });

    test('a tuple', () => {
      const type = '(core::integer::u8, test::Pair)';
      const tuple = new CairoTuple({ 0: 7, 1: { a: 44, b: 7 } }, type, STRATEGIES);
      expectBothForms(type, tuple, ['7', '44', '7']);
    });

    test('an option', () => {
      const option = new CairoTypeOption({ a: 44, b: 7 }, OPTION_OF_PAIR, STRATEGIES, Some);
      expectBothForms(OPTION_OF_PAIR, option, ['0', '44', '7']);
    });

    test('a result', () => {
      const result = new CairoTypeResult({ a: 44, b: 7 }, RESULT_OF_PAIR, STRATEGIES, Err);
      expectBothForms(RESULT_OF_PAIR, result, ['1', '44', '7']);
    });

    test('a custom enum', () => {
      // `Dot` is the variant of index 0
      const shape = new CairoTypeCustomEnum({ a: 44, b: 7 }, SHAPE_ENUM, STRATEGIES, 0);
      expectBothForms('test::Shape', shape, ['0', '44', '7']);
    });
  });

  describe('a struct already built, held by plain data or by an enum', () => {
    test('as a member of a plain struct', () => {
      expectBothForms('test::Outer', { n: 1, p: builtPair() }, ['44', '7', '1']);
    });

    test('as an item of a plain array', () => {
      expectBothForms('core::array::Array::<test::Pair>', [builtPair()], ['1', '44', '7']);
    });

    test('in the Some of a CairoOption', () => {
      expectBothForms(OPTION_OF_PAIR, new CairoOption(Some, builtPair()), ['0', '44', '7']);
    });

    test('in the Err of a CairoResult', () => {
      expectBothForms(RESULT_OF_PAIR, new CairoResult(Err, builtPair()), ['1', '44', '7']);
    });

    test('in the active variant of a CairoCustomEnum', () => {
      expectBothForms('test::Shape', new CairoCustomEnum({ Dot: builtPair() }), ['0', '44', '7']);
    });
  });

  describe('an option already built, wrapped in a CairoOption', () => {
    test('is refused by both forms, in the same words', () => {
      // the abi expects two levels of option, but this value would be sent with one:
      // Some(Some(1)) as ["0", "1"], which is the calldata of Some(None)
      const inner = new CairoTypeOption(1, OPTION_OF_U8, STRATEGIES, Some);
      const { positional, named } = bothForms(OPTION_OF_OPTION, new CairoOption(Some, inner));
      const refusal =
        'when "content" parameter is a CairoTypeOption, do not define "variant" parameter.';
      expect(positional).toThrow(refusal);
      expect(named).toThrow(refusal);
    });
  });
});
