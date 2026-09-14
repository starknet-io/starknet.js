import {
  CallData,
  CairoResult,
  CairoResultVariant,
  CairoOption,
  CairoOptionVariant,
  CairoCustomEnum,
  type AbiEnum,
  type AbiStruct,
  CairoArray,
  CairoTypeOption,
  CairoTypeResult,
  CairoTuple,
  CairoUint8,
  CairoUint16,
  cairoTypeStrategy,
  enumStrategy,
  structStrategy,
} from '../../../src';
import type { CairoTypeStrategy } from '../../../src/utils/calldata/parser/cairoTypeStrategy.type';

const { Ok, Err } = CairoResultVariant;

const MY_ENUM = {
  type: 'enum',
  name: 'test::MyEnum',
  variants: [
    { name: 'Empty', type: '()' },
    { name: 'Number', type: 'core::integer::u8' },
  ],
} as AbiEnum;

const POINT = {
  type: 'struct',
  name: 'test::Point',
  members: [
    { name: 'x', type: 'core::integer::u8' },
    { name: 'y', type: 'core::integer::u32' },
  ],
} as AbiStruct;

const S = [cairoTypeStrategy, structStrategy([POINT]), enumStrategy([MY_ENUM])];

const T = 'core::result::Result::<core::integer::u8, core::integer::u16>';
const OF_ARRAY =
  'core::result::Result::<core::array::Array::<core::integer::u8>, core::integer::u16>';
const OF_TUPLE =
  'core::result::Result::<(core::integer::u8, core::integer::u8), core::integer::u16>';
const OF_OPTION =
  'core::result::Result::<core::option::Option::<core::integer::u8>, core::integer::u16>';
const OF_STRUCT = 'core::result::Result::<test::Point, core::integer::u16>';
const T3 =
  'core::result::Result::<core::integer::u16, core::result::Result::<core::result::Result::<core::integer::u16, core::integer::u8>, core::integer::u16>>';

describe('CairoTypeResult class Unit Tests', () => {
  describe('the variant', () => {
    test('should build the Ok branch from the first type', () => {
      const result = new CairoTypeResult(8, T, S, Ok);
      expect(result.isVariantOk).toBe(true);
      expect(result.content).toEqual(new CairoUint8(8));
      expect(result.resultCairoType).toBe(T);
      expect([...result.toApiRequest()]).toEqual(['0', '8']);
    });

    test('should build the Err branch from the second type', () => {
      const result = new CairoTypeResult(8, T, S, Err);
      expect(result.isVariantOk).toBe(false);
      // the same value, read as the other branch's type
      expect(result.content).toEqual(new CairoUint16(8));
      expect([...result.toApiRequest()]).toEqual(['1', '8']);
    });

    test('should refuse a variant that is neither branch', () => {
      expect(() => new CairoTypeResult(8, T, S, 3)).toThrow(
        'In Cairo Result, only 0 or 1 variants are authorized.'
      );
    });

    test('should refuse a result with nothing to carry', () => {
      // unlike an option, both branches of a result carry a value
      expect(() => new CairoTypeResult(undefined, T, S, Ok)).toThrow(
        '"content" parameter has to be defined.'
      );
      expect(() => new CairoTypeResult(null, T, S, Ok)).toThrow(
        '"content" parameter has to be defined.'
      );
    });

    test('should refuse raw data with no variant to go by', () => {
      expect(() => new CairoTypeResult(8, T, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
      );
    });

    test('should accept several strategies, and search them in order', () => {
      const empty: CairoTypeStrategy = { constructors: {}, dynamicSelectors: {}, response: {} };
      expect(() => new CairoTypeResult(8, T, [cairoTypeStrategy, empty], Ok)).not.toThrow();
      expect(() => new CairoTypeResult(8, T, [empty, cairoTypeStrategy], Ok)).not.toThrow();
    });

    test('should refuse a variant alongside a response iterator', () => {
      expect(() => new CairoTypeResult(['0', '100'].values(), T, S, Ok)).toThrow(
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
    });
  });

  describe('what the content may be', () => {
    test('should take a CairoResult, which says its own branch', () => {
      const result = new CairoTypeResult(new CairoResult(Ok, 8n), T, S);
      expect(result.isVariantOk).toBe(true);
      expect(result.content).toEqual(new CairoUint8(8));
      expect(result.resultCairoType).toBe(T);
    });

    test('should refuse a variant alongside a CairoResult', () => {
      expect(() => new CairoTypeResult(new CairoResult(Ok, 8n), T, S, Ok)).toThrow(
        'when "content" parameter is a CairoResult and subType is false, do not define "variant" parameter.'
      );
    });

    test('should copy a CairoTypeResult, keeping what it carried', () => {
      const original = new CairoTypeResult('0x0a', T, S, Err);
      const copy = new CairoTypeResult(original, T, S);
      expect(copy.isVariantOk).toBe(false);
      expect(copy.content).toEqual(new CairoUint16(10));
      expect(copy.resultCairoType).toBe(T);
    });

    test('should refuse a variant alongside a CairoTypeResult', () => {
      const original = new CairoTypeResult('0x0a', T, S, Err);
      expect(() => new CairoTypeResult(original, T, S, Err)).toThrow(
        'when "content" parameter is a CairoTypeResult, do not define "variant" parameter.'
      );
    });

    test('should require the variant for a CairoType already built', () => {
      // the guard CairoTypeOption does not have: a built value says nothing about its branch
      expect(() => new CairoTypeResult(new CairoUint8(8), T, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo Result from a CairoType.'
      );
      expect([...new CairoTypeResult(new CairoUint8(8), T, S, Ok).toApiRequest()]).toEqual([
        '0',
        '8',
      ]);
    });

    test('should read the branch and the value off a response', () => {
      const result = new CairoTypeResult(['0', '100'].values(), T, S);
      expect(result.isVariantOk).toBe(true);
      expect(result.content).toEqual(new CairoUint8(100));
    });

    test('should consume exactly its own felts, leaving the rest', () => {
      const iterator = ['0x0', '0x7', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoTypeResult(iterator, T, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('what the result may carry', () => {
    test('should carry an array on the Ok branch', () => {
      const result = new CairoTypeResult([1, 2, 3], OF_ARRAY, S, Ok);
      expect([...result.toApiRequest()]).toEqual(['0', '3', '1', '2', '3']);
      expect(result.decompose(S)).toEqual(new CairoResult(Ok, [1n, 2n, 3n]));
    });

    test('should carry the other type on the Err branch', () => {
      const result = new CairoTypeResult(9, OF_ARRAY, S, Err);
      expect([...result.toApiRequest()]).toEqual(['1', '9']);
      expect(result.decompose(S)).toEqual(new CairoResult(Err, 9n));
    });

    test('should carry a tuple', () => {
      const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u8)', S);
      expect([...new CairoTypeResult(tuple, OF_TUPLE, S, Ok).toApiRequest()]).toEqual([
        '0',
        '1',
        '2',
      ]);
    });

    test('should carry an option', () => {
      const option = new CairoTypeOption(
        7,
        'core::option::Option::<core::integer::u8>',
        S,
        CairoOptionVariant.Some
      );
      expect([...new CairoTypeResult(option, OF_OPTION, S, Ok).toApiRequest()]).toEqual([
        '0',
        '0',
        '7',
      ]);
    });

    test('should carry a struct', () => {
      const result = new CairoTypeResult({ x: 1, y: 2 }, OF_STRUCT, S, Ok);
      expect([...result.toApiRequest()]).toEqual(['0', '1', '2']);
      expect(result.decompose(S)).toEqual(new CairoResult(Ok, { x: 1n, y: 2n }));
    });

    test('should carry a fixed array, on either branch', () => {
      const type = 'core::result::Result::<core::integer::u8, [core::integer::u16; 2]>';
      expect([...new CairoTypeResult([100, 2], type, S, Err).toApiRequest()]).toEqual([
        '1',
        '100',
        '2',
      ]);
      // the same felts read back, which is the case PR #1484 asserted
      expect([...new CairoTypeResult(['1', '100', '2'].values(), type, S).toApiRequest()]).toEqual([
        '1',
        '100',
        '2',
      ]);
    });

    test('should carry a custom enum', () => {
      const type = 'core::result::Result::<test::MyEnum, core::integer::u16>';
      const result = new CairoTypeResult(new CairoCustomEnum({ Number: 7 }), type, S, Ok);
      expect([...result.toApiRequest()]).toEqual(['0', '1', '7']);
    });
  });

  describe('results of results', () => {
    test('should nest three deep, with the branches mixed', () => {
      const result0 = new CairoResult(Err, 5n);
      const result1 = new CairoResult(Ok, result0);
      const result2 = new CairoResult(Err, result1);
      const result = new CairoTypeResult(result2, T3, S);
      expect([...result.toApiRequest()]).toEqual(['1', '0', '1', '5']);
      expect(result.decompose(S)).toEqual(result2);
    });

    test('should read the same three levels back off a response', () => {
      const result = new CairoTypeResult(['0x1', '0x0', '0x1', '0x5'].values(), T3, S);
      expect([...result.toApiRequest()]).toEqual(['1', '0', '1', '5']);
    });
  });

  describe('results mixed with the other composites', () => {
    test('should sit in an array', () => {
      const type = `core::array::Array::<${T}>`;
      const array = new CairoArray([new CairoResult(Ok, 7), new CairoResult(Err, 9)], type, S);
      expect([...array.toApiRequest()]).toEqual(['2', '0', '7', '1', '9']);
      expect(array.decompose(S)).toEqual([new CairoResult(Ok, 7n), new CairoResult(Err, 9n)]);
    });

    test('should sit in a tuple', () => {
      const type = `(${T}, core::integer::u8)`;
      const tuple = new CairoTuple([new CairoResult(Ok, 7), 9], type, S);
      expect([...tuple.toApiRequest()]).toEqual(['0', '7', '9']);
    });

    test('should hold an option that holds a value', () => {
      const value = new CairoResult(Ok, new CairoOption(CairoOptionVariant.Some, 7));
      expect([...new CairoTypeResult(value, OF_OPTION, S).toApiRequest()]).toEqual(['0', '0', '7']);
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(CairoTypeResult.is(200, T, Ok)).toBe(true);
      expect(CairoTypeResult.is(200, 'wrong', 3)).toBe(false);
    });

    test('isAbiType', () => {
      expect(CairoTypeResult.isAbiType(T)).toBe(true);
      expect(CairoTypeResult.isAbiType('core::integer::u16')).toBe(false);
    });

    test('validate', () => {
      expect(() => CairoTypeResult.validate(200, T, Err)).not.toThrow();
      expect(() => CairoTypeResult.validate(200, 'core::wrong::<core::integer::u16>', Ok)).toThrow(
        'The type core::wrong::<core::integer::u16> is not a Cairo Result. Needs core::result::Result::<type1, type2>.'
      );
      expect(() => CairoTypeResult.validate(200, T, 5)).toThrow(
        'In Cairo Result, only 0 or 1 variants are authorized.'
      );
    });

    test('getVariantTypes', () => {
      expect(CairoTypeResult.getVariantTypes(T)).toEqual([
        'core::integer::u8',
        'core::integer::u16',
      ]);
      expect(() =>
        CairoTypeResult.getVariantTypes('core::result::Result::core::integer::u16>')
      ).toThrow(
        'ABI type core::result::Result::core::integer::u16> do not includes 2 types enclosed in <>.'
      );
    });

    test('getVariantTypes should keep a composite branch whole', () => {
      expect(CairoTypeResult.getVariantTypes(OF_TUPLE)).toEqual([
        '(core::integer::u8, core::integer::u8)',
        'core::integer::u16',
      ]);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoTypeResult.dynamicSelector).toBe('CairoTypeResult');
      expect(new CairoTypeResult(8, T, S, Ok).dynamicSelector).toBe('CairoTypeResult');
    });

    test('should be registered in the strategy, and forward the variant', () => {
      expect(cairoTypeStrategy.dynamicSelectors.CairoTypeResult(T)).toBe(true);
      const built = cairoTypeStrategy.constructors.CairoTypeResult(8, S, T, Err);
      expect([...built.toApiRequest()]).toEqual(['1', '8']);
    });
  });

  describe('copy constructor behavior', () => {
    test('should keep what the original carried, its own type included', () => {
      const original = new CairoTypeResult(10, T, S, Ok);
      const copy = new CairoTypeResult(
        original,
        'core::result::Result::<core::integer::u32, core::integer::u64>',
        S
      );
      expect(copy.content).toBe(original.content);
      expect(copy.isVariantOk).toBe(original.isVariantOk);
      // the type given to the copy is ignored: the original's is what survives
      expect(copy.resultCairoType).toBe(T);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize either branch', () => {
      expect(CallData.compile([new CairoTypeResult(7, T, S, Ok)] as any)).toEqual(['0', '7']);
      expect(CallData.compile([new CairoTypeResult(7, T, S, Err)] as any)).toEqual(['1', '7']);
      expect(CallData.compile({ input: new CairoTypeResult(7, T, S, Ok) } as any)).toEqual([
        '0',
        '7',
      ]);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any][] = [
        [T, new CairoResult(Ok, 7)],
        [T, new CairoResult(Err, 9)],
        [OF_ARRAY, new CairoResult(Ok, [1, 2, 3])],
        [OF_STRUCT, new CairoResult(Ok, { x: 1, y: 2 })],
        [T3, new CairoResult(Err, new CairoResult(Ok, new CairoResult(Err, 5n)))],
      ];
      cases.forEach(([type, value]) => {
        const result = new CairoTypeResult(value, type, S);
        const response = [...result.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);
        const readBack = new CairoTypeResult(response.values(), type, S);
        expect([...readBack.toApiRequest()]).toEqual([...result.toApiRequest()]);
      });
    });
  });
});
