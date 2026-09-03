import {
  CallData,
  CairoOption,
  CairoOptionVariant,
  CairoCustomEnum,
  CairoResult,
  CairoResultVariant,
  type AbiEnum,
  type AbiStruct,
  CairoArray,
  CairoStruct,
  CairoTypeOption,
  CairoTuple,
  CairoUint8,
  cairoTypeStrategy,
  enumStrategy,
  structStrategy,
} from '../../../src';

const { Some, None } = CairoOptionVariant;

const POINT = {
  type: 'struct',
  name: 'test::Point',
  members: [
    { name: 'x', type: 'core::integer::u8' },
    { name: 'y', type: 'core::integer::u32' },
  ],
} as AbiStruct;

const MY_ENUM = {
  type: 'enum',
  name: 'test::MyEnum',
  variants: [
    { name: 'Empty', type: '()' },
    { name: 'Number', type: 'core::integer::u8' },
  ],
} as AbiEnum;

const S = [cairoTypeStrategy, structStrategy([POINT]), enumStrategy([MY_ENUM])];

const U8 = 'core::option::Option::<core::integer::u8>';
const U16 = 'core::option::Option::<core::integer::u16>';
const OF_ARRAY = 'core::option::Option::<core::array::Array::<core::integer::u8>>';
const OF_TUPLE =
  'core::option::Option::<(core::integer::u8, core::array::Array::<core::integer::u8>)>';
const OF_STRUCT = 'core::option::Option::<test::Point>';

/** `Option<Option<...<u8>>>`, nested `depth` times. */
const optionType = (depth: number): string =>
  depth === 0 ? 'core::integer::u8' : `core::option::Option::<${optionType(depth - 1)}>`;

/** `Some(Some(...Some(value)))`, nested `depth` times. */
const someChain = (depth: number, value: any): CairoOption<any> =>
  depth === 0 ? value : new CairoOption(Some, someChain(depth - 1, value));

/** Peel a decomposed option down to what it finally carries. */
const peel = (option: any): any => {
  if (!(option instanceof CairoOption)) {
    return option;
  }
  return option.isNone() ? 'None' : peel(option.unwrap());
};

describe('CairoTypeOption class Unit Tests', () => {
  describe('the variant', () => {
    test('should serialize Some as its branch then the value', () => {
      const option = new CairoTypeOption(7, U8, S, Some);
      expect(option.isVariantSome).toBe(true);
      expect([...option.toApiRequest()]).toEqual(['0', '7']);
    });

    test('should serialize None as one felt, and nothing else', () => {
      const option = new CairoTypeOption(undefined, U8, S, None);
      expect(option.isVariantSome).toBe(false);
      expect(option.content).toBeUndefined();
      expect([...option.toApiRequest()]).toEqual(['1']);
    });

    test('should refuse a variant that is neither branch', () => {
      expect(() => new CairoTypeOption(undefined, U8, S, 3)).toThrow(
        'In Cairo option, only 0 or 1 variants are authorized.'
      );
    });

    test('should refuse a Some with nothing to carry', () => {
      expect(() => new CairoTypeOption(undefined, U8, S, Some)).toThrow(
        '"content" parameter has to be defined when Some variant is selected'
      );
    });

    test('should refuse a None that carries something', () => {
      expect(() => new CairoTypeOption(7, U8, S, None)).toThrow(
        '"content" parameter has to be NOT defined when None variant is selected'
      );
    });

    test('should refuse a variant alongside a response iterator', () => {
      expect(() => new CairoTypeOption(['0x0'].values(), U8, S, Some)).toThrow(
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
    });

    test('should refuse raw data with no variant to go by', () => {
      // nothing distinguishes Some(0) from None, so the caller has to say
      expect(() => new CairoTypeOption(7, U8, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo option from a "CairoType" or raw data.'
      );
    });
  });

  describe('what the content may be', () => {
    test('should take a CairoOption, which says its own branch', () => {
      expect([...new CairoTypeOption(new CairoOption(Some, 7), U8, S).toApiRequest()]).toEqual([
        '0',
        '7',
      ]);
      expect([...new CairoTypeOption(new CairoOption(None), U8, S).toApiRequest()]).toEqual(['1']);
    });

    test('should take a CairoType already built, with the branch spelled out', () => {
      const inner = new CairoTypeOption('0x0a', U8, S, Some);
      const outer = new CairoTypeOption(inner, U8, S, Some);
      expect(outer.isVariantSome).toBe(true);
      // a CairoTypeOption handed in is copied, not wrapped: what it carried is what is kept
      expect(outer.content).toEqual(new CairoUint8(10));
      expect(outer.optionCairoType).toBe(U8);
      expect([...outer.toApiRequest()]).toEqual(['0', '10']);
    });

    test('should require the variant for a CairoType already built', () => {
      // a built value says nothing about its branch, so leaving the variant out would quietly
      // make it a None and drop what it carries. CairoTypeResult and CairoTypeCustomEnum guard
      // this the same way.
      expect(() => new CairoTypeOption(new CairoUint8(7), U8, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo option from a CairoType.'
      );
      expect([...new CairoTypeOption(new CairoUint8(7), U8, S, Some).toApiRequest()]).toEqual([
        '0',
        '7',
      ]);
    });

    test('should read the branch and the value off a response', () => {
      expect([...new CairoTypeOption(['0x0', '0x64'].values(), U8, S).toApiRequest()]).toEqual([
        '0',
        '100',
      ]);
      expect([...new CairoTypeOption(['0x1'].values(), U8, S).toApiRequest()]).toEqual(['1']);
    });

    test('should refuse a branch a response cannot hold', () => {
      expect(() => new CairoTypeOption(['0x5'].values(), U8, S)).toThrow(
        'Invalid Option variant in iterator.'
      );
    });

    test('should consume exactly its own felts, leaving the rest', () => {
      const iterator = ['0x0', '0x7', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoTypeOption(iterator, U8, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('what the option may carry', () => {
    test('should carry an array', () => {
      const option = new CairoTypeOption([1, 2, 3], OF_ARRAY, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '3', '1', '2', '3']);
      expect(option.decompose(S).unwrap()).toEqual([1n, 2n, 3n]);
    });

    test('should carry an array already built', () => {
      const array = new CairoArray([7, 8], 'core::array::Array::<core::integer::u8>', S);
      const option = new CairoTypeOption(array, OF_ARRAY, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '2', '7', '8']);
      expect(option.decompose(S)).toEqual(new CairoOption(Some, [7n, 8n]));
    });

    test('should carry a tuple', () => {
      const tuple = new CairoTuple(
        [234, [1, 2, 3]],
        '(core::integer::u8, core::array::Array::<core::integer::u8>)',
        S
      );
      const option = new CairoTypeOption(tuple, OF_TUPLE, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '234', '3', '1', '2', '3']);
    });

    test('should carry a struct', () => {
      const option = new CairoTypeOption({ x: 1, y: 2 }, OF_STRUCT, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '1', '2']);
      expect(option.decompose(S).unwrap()).toEqual({ x: 1n, y: 2n });
    });

    test('should carry a struct already built', () => {
      const option = new CairoTypeOption(
        new CairoStruct({ x: 1, y: 2 }, POINT, S),
        OF_STRUCT,
        S,
        Some
      );
      expect([...option.toApiRequest()]).toEqual(['0', '1', '2']);
    });

    test('should carry a fixed array', () => {
      const type = 'core::option::Option::<[core::integer::u8; 3]>';
      const option = new CairoTypeOption([1, 2, 3], type, S, Some);
      // the fixed array adds no length of its own, so only the branch precedes the elements
      expect([...option.toApiRequest()]).toEqual(['0', '1', '2', '3']);
      expect(option.decompose(S).unwrap()).toEqual([1n, 2n, 3n]);
    });

    test('should carry a result', () => {
      const type =
        'core::option::Option::<core::result::Result::<core::integer::u8, core::integer::u16>>';
      const option = new CairoTypeOption(new CairoResult(CairoResultVariant.Ok, 7), type, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '0', '7']);
    });

    test('should carry a custom enum', () => {
      const type = 'core::option::Option::<test::MyEnum>';
      const option = new CairoTypeOption(new CairoCustomEnum({ Number: 7 }), type, S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '1', '7']);
    });
  });

  describe('options of options', () => {
    test('should nest three deep, which is the shape that used to fail', () => {
      const option2 = someChain(3, 5n);
      const option = new CairoTypeOption(option2, optionType(3), S, Some);
      expect([...option.toApiRequest()]).toEqual(['0', '0', '0', '5']);
      expect(option.decompose(S)).toEqual(option2);
    });

    test('should nest as deep as the type goes, in both directions', () => {
      [1, 2, 3, 4, 5].forEach((depth) => {
        const type = optionType(depth);
        const value = someChain(depth, 8);
        const felts = [...new CairoTypeOption(value, type, S).toApiRequest()];
        expect(felts).toEqual([...Array(depth).fill('0'), '8']);

        const response = felts.map((felt) => `0x${BigInt(felt).toString(16)}`);
        expect(peel(new CairoTypeOption(response.values(), type, S).decompose(S))).toBe(8n);
      });
    });

    test('should carry a None at the innermost level', () => {
      const value = new CairoOption(Some, new CairoOption(Some, new CairoOption(None)));
      expect([...new CairoTypeOption(value, optionType(3), S).toApiRequest()]).toEqual([
        '0',
        '0',
        '1',
      ]);
    });

    test('should carry a None at an intermediate level', () => {
      const value = new CairoOption(Some, new CairoOption(None));
      expect([...new CairoTypeOption(value, optionType(3), S).toApiRequest()]).toEqual(['0', '1']);
    });

    test('should be a None at the outermost level', () => {
      expect([
        ...new CairoTypeOption(new CairoOption(None), optionType(3), S).toApiRequest(),
      ]).toEqual(['1']);
    });
  });

  describe('options mixed with the other composites', () => {
    test('should sit in an array', () => {
      const type = 'core::array::Array::<core::option::Option::<core::integer::u8>>';
      const array = new CairoArray([new CairoOption(Some, 7), new CairoOption(None)], type, S);
      expect([...array.toApiRequest()]).toEqual(['2', '0', '7', '1']);
      expect(array.decompose(S).map(peel)).toEqual([7n, 'None']);
    });

    test('should hold an array that holds options', () => {
      const type =
        'core::option::Option::<core::array::Array::<core::option::Option::<core::integer::u8>>>';
      const value = new CairoOption(Some, [new CairoOption(Some, 7), new CairoOption(None)]);
      const option = new CairoTypeOption(value, type, S);
      expect([...option.toApiRequest()]).toEqual(['0', '2', '0', '7', '1']);
      expect(option.decompose(S).unwrap().map(peel)).toEqual([7n, 'None']);
    });

    test('should sit in a tuple that sits in nothing else', () => {
      const type =
        '(core::option::Option::<(core::integer::u8, core::integer::u8)>, core::integer::u8)';
      const tuple = new CairoTuple([new CairoOption(Some, [1, 2]), 9], type, S);
      expect([...tuple.toApiRequest()]).toEqual(['0', '1', '2', '9']);
    });

    test('should refuse raw elements in an array of options', () => {
      // a bare 7 says nothing about the branch, so the caller passes CairoOption instances
      const type = 'core::array::Array::<core::option::Option::<core::integer::u8>>';
      expect(() => new CairoArray([7, 8], type, S)).toThrow('"variant" parameter is mandatory');
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(CairoTypeOption.is(200, U16, Some)).toBe(true);
      expect(CairoTypeOption.is(200, 'core::error::<core::integer::u16>', Some)).toBe(false);
    });

    test('isAbiType', () => {
      expect(CairoTypeOption.isAbiType(U16)).toBe(true);
      expect(CairoTypeOption.isAbiType('core::wrong::<core::integer::u16>')).toBe(false);
    });

    test('validate', () => {
      expect(() => CairoTypeOption.validate(200, U16, Some)).not.toThrow();
      expect(() =>
        CairoTypeOption.validate(200, 'core::wrong::<core::integer::u16>', Some)
      ).toThrow(
        'The type core::wrong::<core::integer::u16> is not a Cairo option. Needs core::option::Option::<type>.'
      );
      expect(() => CairoTypeOption.validate(200, U16, 5)).toThrow(
        'In Cairo option, only 0 or 1 variants are authorized.'
      );
    });

    test('getVariantSomeType', () => {
      expect(CairoTypeOption.getVariantSomeType(U16)).toBe('core::integer::u16');
      expect(() =>
        CairoTypeOption.getVariantSomeType('core::option::Option::core::integer::u16>')
      ).toThrow(
        'ABI type core::option::Option::core::integer::u16> do not includes a valid type of data.'
      );
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoTypeOption.dynamicSelector).toBe('CairoTypeOption');
      expect(new CairoTypeOption(7, U8, S, Some).dynamicSelector).toBe('CairoTypeOption');
    });

    test('should be registered in the strategy, and forward the variant', () => {
      expect(cairoTypeStrategy.dynamicSelectors.CairoTypeOption(U8)).toBe(true);
      // the only entry that reads the fourth argument
      const built = cairoTypeStrategy.constructors.CairoTypeOption(7, S, U8, Some);
      expect([...built.toApiRequest()]).toEqual(['0', '7']);
    });
  });

  describe('copy constructor behavior', () => {
    test('should keep what the original carried, its own type included', () => {
      const original = new CairoTypeOption(10, U8, S, Some);
      const copy = new CairoTypeOption(original, U16, S);
      expect(copy.content).toBe(original.content);
      expect(copy.isVariantSome).toBe(original.isVariantSome);
      // the type given to the copy is ignored: the original's is what survives
      expect(copy.optionCairoType).toBe(U8);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance, in the array form and the object form', () => {
      const some = () => new CairoTypeOption(7, U8, S, Some);
      const none = () => new CairoTypeOption(undefined, U8, S, None);
      expect(CallData.compile([some()] as any)).toEqual(['0', '7']);
      expect(CallData.compile([none()] as any)).toEqual(['1']);
      expect(CallData.compile({ input: some() } as any)).toEqual(['0', '7']);
      expect(CallData.compile({ input: none() } as any)).toEqual(['1']);
    });
  });

  describe('calls the contract does not cover', () => {
    // outside what the API ever emits, and asserted here so that a change of behaviour shows up
    // rather than passing unnoticed
    test('a CairoOption wrapping a built option is flattened by the copy', () => {
      const inner = new CairoTypeOption(10, U8, S, Some);
      const option = new CairoTypeOption(new CairoOption(Some, inner), U8, S);
      expect([...option.toApiRequest()]).toEqual(['0', '10']);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any][] = [
        [U8, new CairoOption(Some, 7)],
        [U8, new CairoOption(None)],
        [OF_ARRAY, new CairoOption(Some, [1, 2, 3])],
        [OF_STRUCT, new CairoOption(Some, { x: 1, y: 2 })],
        [optionType(3), someChain(3, 5)],
      ];
      cases.forEach(([type, value]) => {
        const option = new CairoTypeOption(value, type, S);
        const response = [...option.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);
        const readBack = new CairoTypeOption(response.values(), type, S);
        expect([...readBack.toApiRequest()]).toEqual([...option.toApiRequest()]);
      });
    });
  });
});
