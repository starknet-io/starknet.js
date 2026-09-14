import {
  CallData,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  type AbiEnum,
  type AbiStruct,
  CairoStruct,
  CairoTypeCustomEnum,
  CairoTypeOption,
  CairoTypeResult,
  cairoTypeStrategy,
  enumStrategy,
  structStrategy,
} from '../../../src';

const POINT = {
  type: 'struct',
  name: 'test::Point',
  members: [
    { name: 'x', type: 'core::integer::u8' },
    { name: 'y', type: 'core::integer::u8' },
  ],
} as AbiStruct;

const INNER = {
  type: 'enum',
  name: 'test::Inner',
  variants: [
    { name: 'NoAnswer', type: '()' },
    { name: 'Success', type: '(core::integer::u8, core::integer::u8)' },
  ],
} as AbiEnum;

const MY_ENUM = {
  type: 'enum',
  name: 'test::MyEnum',
  variants: [
    { name: 'Empty', type: '()' },
    { name: 'LocationError', type: 'test::Point' },
    { name: 'Status', type: 'test::Inner' },
    { name: 'Damage', type: 'core::option::Option::<core::integer::u8>' },
    { name: 'Report', type: 'core::result::Result::<core::integer::u32, core::integer::u64>' },
    { name: 'ErrorList', type: 'core::array::Array::<core::integer::u8>' },
    { name: 'Coords', type: '[core::integer::u8; 3]' },
  ],
} as AbiEnum;

const S = [cairoTypeStrategy, structStrategy([POINT]), enumStrategy([MY_ENUM, INNER])];

/** A CairoCustomEnum names every variant, the inactive ones undefined. */
const asEnum = (abi: AbiEnum, active: string, value: unknown) =>
  new CairoCustomEnum(
    Object.fromEntries(
      abi.variants.map((variant) => [variant.name, variant.name === active ? value : undefined])
    )
  );

describe('CairoTypeCustomEnum class Unit Tests', () => {
  describe('the variant', () => {
    test('should serialize the index then the value', () => {
      const custom = new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S, 1);
      expect(custom.enumVariant).toBe(1);
      expect(custom.dynamicSelector).toBe('test::MyEnum');
      expect([...custom.toApiRequest()]).toEqual(['1', '4', '5']);
    });

    test('should refuse an index the abi does not declare', () => {
      expect(() => new CairoTypeCustomEnum(1, MY_ENUM, S, 99)).toThrow(
        'The custom enum test::MyEnum variant must be in the range 0..6. You requested variant #99'
      );
    });

    test('should refuse an enum with nothing to carry', () => {
      expect(() => new CairoTypeCustomEnum(undefined, MY_ENUM, S, 1)).toThrow(
        '"content" parameter has to be defined.'
      );
      expect(() => new CairoTypeCustomEnum(null, MY_ENUM, S, 1)).toThrow(
        '"content" parameter has to be defined.'
      );
    });

    test('should refuse raw data with no index to go by', () => {
      expect(() => new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a Cairo Enum or raw data.'
      );
    });

    test('should refuse an index alongside a response iterator', () => {
      expect(() => new CairoTypeCustomEnum(['1'].values(), MY_ENUM, S, 1)).toThrow(
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
    });
  });

  describe('what the content may be', () => {
    test('should take a CairoCustomEnum, which names its own variant', () => {
      const custom = new CairoTypeCustomEnum(
        new CairoCustomEnum({ LocationError: { x: 4, y: 5 } }),
        MY_ENUM,
        S
      );
      expect(custom.enumVariant).toBe(1);
      expect([...custom.toApiRequest()]).toEqual(['1', '4', '5']);
    });

    test('should refuse a CairoCustomEnum whose variant the abi does not declare', () => {
      expect(() => new CairoTypeCustomEnum(new CairoCustomEnum({ Nope: 1 }), MY_ENUM, S)).toThrow(
        'Nope activeVariant is unknown in AbiEnum.'
      );
    });

    test('should take a CairoType already built, with the index spelled out', () => {
      const point = new CairoStruct({ x: 4, y: 5 }, POINT, S);
      expect([...new CairoTypeCustomEnum(point, MY_ENUM, S, 1).toApiRequest()]).toEqual([
        '1',
        '4',
        '5',
      ]);
      expect(() => new CairoTypeCustomEnum(point, MY_ENUM, S)).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo enum from a CairoType.'
      );
    });

    test('should copy a CairoTypeCustomEnum, keeping what it carried', () => {
      const original = new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S, 1);
      const copy = new CairoTypeCustomEnum(original, MY_ENUM, S);
      expect(copy.enumVariant).toBe(1);
      expect(copy.abiEnum).toEqual(MY_ENUM);
      expect([...copy.toApiRequest()]).toEqual(['1', '4', '5']);
    });

    test('should refuse an index alongside a CairoTypeCustomEnum', () => {
      const original = new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S, 1);
      expect(() => new CairoTypeCustomEnum(original, MY_ENUM, S, 1)).toThrow(
        'when "content" parameter is a CairoTypeCustomEnum do not define "variant" parameter.'
      );
    });

    test('should read the index and the value off a response', () => {
      const custom = new CairoTypeCustomEnum(['1', '4', '5'].values(), MY_ENUM, S);
      expect(custom.enumVariant).toBe(1);
      expect([...custom.toApiRequest()]).toEqual(['1', '4', '5']);
    });

    test('should consume exactly its own felts, leaving the rest', () => {
      const iterator = ['1', '4', '5', '9'].values();
      // eslint-disable-next-line no-new
      new CairoTypeCustomEnum(iterator, MY_ENUM, S);
      expect(iterator.next().value).toBe('9');
    });
  });

  describe('an option or a result as a variant', () => {
    // these two are built here rather than through the strategy: the strategy is handed the enum's
    // index, and an option or a result would read it as its own branch
    test('should take a CairoOption for an option variant', () => {
      const option = new CairoOption(CairoOptionVariant.Some, 5n);
      const custom = new CairoTypeCustomEnum(option, MY_ENUM, S, 3);
      expect([...custom.toApiRequest()]).toEqual(['3', '0', '5']);
      expect(custom.decompose(S)).toEqual(asEnum(MY_ENUM, 'Damage', option));
    });

    test('should take a CairoTypeOption just as well', () => {
      const option = new CairoTypeOption(
        5,
        'core::option::Option::<core::integer::u8>',
        S,
        CairoOptionVariant.Some
      );
      expect([...new CairoTypeCustomEnum(option, MY_ENUM, S, 3).toApiRequest()]).toEqual([
        '3',
        '0',
        '5',
      ]);
    });

    test('should require the index for a CairoOption', () => {
      expect(
        () => new CairoTypeCustomEnum(new CairoOption(CairoOptionVariant.Some, 5n), MY_ENUM, S)
      ).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoOption.'
      );
    });

    test('should take a CairoResult for a result variant', () => {
      const result = new CairoResult(CairoResultVariant.Ok, 5n);
      const custom = new CairoTypeCustomEnum(result, MY_ENUM, S, 4);
      expect([...custom.toApiRequest()]).toEqual(['4', '0', '5']);
      expect(custom.decompose(S)).toEqual(asEnum(MY_ENUM, 'Report', result));
    });

    test('should take a CairoTypeResult just as well', () => {
      const result = new CairoTypeResult(
        5,
        'core::result::Result::<core::integer::u32, core::integer::u64>',
        S,
        CairoResultVariant.Ok
      );
      expect([...new CairoTypeCustomEnum(result, MY_ENUM, S, 4).toApiRequest()]).toEqual([
        '4',
        '0',
        '5',
      ]);
    });

    test('should require the index for a CairoResult', () => {
      expect(
        () => new CairoTypeCustomEnum(new CairoResult(CairoResultVariant.Ok, 5n), MY_ENUM, S)
      ).toThrow(
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoResult.'
      );
    });
  });

  describe('enums of enums', () => {
    test('should nest one enum inside another', () => {
      const inner = new CairoCustomEnum({ Success: { 0: 10, 1: 20 } });
      const outer = new CairoCustomEnum({ Status: inner });
      const custom = new CairoTypeCustomEnum(outer, MY_ENUM, S);
      // the outer index, the inner index, then the tuple
      expect([...custom.toApiRequest()]).toEqual(['2', '1', '10', '20']);
    });

    test('should read a nested enum back', () => {
      const custom = new CairoTypeCustomEnum(['2', '1', '10', '20'].values(), MY_ENUM, S);
      expect([...custom.toApiRequest()]).toEqual(['2', '1', '10', '20']);
      expect(custom.decompose(S)).toEqual(
        asEnum(MY_ENUM, 'Status', asEnum(INNER, 'Success', { 0: 10n, 1: 20n }))
      );
    });
  });

  describe('other composites as variants', () => {
    test('should carry a struct', () => {
      const custom = new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S, 1);
      expect(custom.decompose(S)).toEqual(asEnum(MY_ENUM, 'LocationError', { x: 4n, y: 5n }));
    });

    test('should carry an array', () => {
      const custom = new CairoTypeCustomEnum([7, 8], MY_ENUM, S, 5);
      expect([...custom.toApiRequest()]).toEqual(['5', '2', '7', '8']);
      expect(custom.decompose(S)).toEqual(asEnum(MY_ENUM, 'ErrorList', [7n, 8n]));
    });

    test('should read an array variant back off a response', () => {
      const custom = new CairoTypeCustomEnum(['5', '2', '7', '8'].values(), MY_ENUM, S);
      expect([...custom.toApiRequest()]).toEqual(['5', '2', '7', '8']);
    });

    test('should carry a fixed array, which adds no length of its own', () => {
      const custom = new CairoTypeCustomEnum([1, 2, 3], MY_ENUM, S, 6);
      expect([...custom.toApiRequest()]).toEqual(['6', '1', '2', '3']);
      expect(custom.decompose(S)).toEqual(asEnum(MY_ENUM, 'Coords', [1n, 2n, 3n]));
    });

    test('should read a fixed array variant back off a response', () => {
      const custom = new CairoTypeCustomEnum(['6', '1', '2', '3'].values(), MY_ENUM, S);
      expect([...custom.toApiRequest()]).toEqual(['6', '1', '2', '3']);
    });
  });

  describe('static methods', () => {
    test('getVariantTypes', () => {
      expect(CairoTypeCustomEnum.getVariantTypes(INNER)).toEqual([
        '()',
        '(core::integer::u8, core::integer::u8)',
      ]);
    });

    test('extractEnumMembersNames', () => {
      expect(CairoTypeCustomEnum.extractEnumMembersNames(INNER)).toEqual(['NoAnswer', 'Success']);
    });

    test('isAbiType says no more than that the name could be one', () => {
      expect(CairoTypeCustomEnum.isAbiType('test::MyEnum')).toBe(true);
      expect(CairoTypeCustomEnum.isAbiType('wrong')).toBe(false);
    });

    test('validate and is', () => {
      expect(() => CairoTypeCustomEnum.validate(7, 'test::MyEnum', 1)).not.toThrow();
      expect(() => CairoTypeCustomEnum.validate(7, 'wrong', 1)).toThrow(
        'The type wrong is not a Cairo Enum. Needs impl::name.'
      );
      expect(CairoTypeCustomEnum.is(7, 'test::MyEnum', 1)).toBe(true);
      expect(CairoTypeCustomEnum.is(7, 'wrong', 1)).toBe(false);
    });
  });

  describe('enumStrategy', () => {
    test('should key one entry per enum, by its abi name', () => {
      const strategy = enumStrategy([MY_ENUM, INNER]);
      expect(Object.keys(strategy.constructors)).toEqual(['test::MyEnum', 'test::Inner']);
      expect(Object.keys(strategy.response)).toEqual(['test::MyEnum', 'test::Inner']);
    });

    test('should add no dynamic selector, which would shadow every other type', () => {
      expect(enumStrategy([MY_ENUM]).dynamicSelectors).toEqual({});
    });

    test('should forward the variant, which a raw value cannot say', () => {
      const strategy = enumStrategy([MY_ENUM]);
      const built = strategy.constructors['test::MyEnum']({ x: 4, y: 5 }, S, 'test::MyEnum', 1);
      expect([...built.toApiRequest()]).toEqual(['1', '4', '5']);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its index and value', () => {
      expect(
        CallData.compile([new CairoTypeCustomEnum({ x: 4, y: 5 }, MY_ENUM, S, 1)] as any)
      ).toEqual(['1', '4', '5']);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [number, any][] = [
        [1, { x: 4, y: 5 }],
        [3, new CairoOption(CairoOptionVariant.Some, 5n)],
        [4, new CairoResult(CairoResultVariant.Ok, 5n)],
        [5, [7, 8]],
      ];
      cases.forEach(([variant, value]) => {
        const custom = new CairoTypeCustomEnum(value, MY_ENUM, S, variant);
        const response = [...custom.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);
        const readBack = new CairoTypeCustomEnum(response.values(), MY_ENUM, S);
        expect([...readBack.toApiRequest()]).toEqual([...custom.toApiRequest()]);
      });
    });
  });
});
