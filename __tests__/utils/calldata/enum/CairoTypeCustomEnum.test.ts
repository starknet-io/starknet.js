/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CairoTypeCustomEnum,
  type ParsingStrategy,
  type AbiEnum,
  createAbiParser,
  type AllowArray,
  type BigNumberish,
  CairoCustomEnum,
  CairoStruct,
  type AbiStruct,
  CairoFixedArray,
  cairo,
  CairoArray,
  hdParsingStrategy,
  CairoTuple,
  CairoOption,
  CairoOptionVariant,
  CairoTypeOption,
  CairoResult,
  CairoResultVariant,
  CairoTypeResult,
  CallData,
} from '../../../../src';
import { contracts } from '../../../config/fixtures';

describe('CairoTypeCustomEnum', () => {
  const { abi } = contracts.TestCairoType.sierra;
  const enumAbi = abi.find((item) => item.name === 'enums::MyEnum') as AbiEnum;
  const pointAbi = abi.find((item) => item.name === 'enums::Point') as AbiStruct;
  const parser = createAbiParser(abi, hdParsingStrategy);
  const strategies: AllowArray<ParsingStrategy> = parser.parsingStrategies;
  const iter = ['1', '100', '200'][Symbol.iterator]();
  type Point = { x: BigNumberish; y: BigNumberish };
  const myPoint: Point = { y: 200, x: 100 };
  const point = new CairoStruct(myPoint, pointAbi, strategies);

  describe('constructor variant', () => {
    const r = new CairoTypeCustomEnum(myPoint, enumAbi, strategies, 1);
    test('should throw an error if wrong variant is provided', () => {
      expect(() => new CairoTypeCustomEnum(myPoint, enumAbi, strategies, 100)).toThrow(
        new Error(
          'The custom enum enums::MyEnum variant must be in the range 0..8. You requested variant #100'
        )
      );
    });

    test('should throw an error if content is undefined', () => {
      expect(() => new CairoTypeCustomEnum(undefined, enumAbi, strategies)).toThrow(
        new Error('"content" parameter has to be defined.')
      );
      expect(() => new CairoTypeCustomEnum(null, enumAbi, strategies)).toThrow(
        new Error('"content" parameter has to be defined.')
      );
    });

    test('accept optional array of parsing strategies', () => {
      const mergedStrategy: ParsingStrategy = {
        ...(strategies as ParsingStrategy[])[0],
        ...(strategies as ParsingStrategy[])[1],
      };
      expect(() => new CairoTypeCustomEnum(myPoint, enumAbi, strategies, 1)).not.toThrow();
      expect(() => new CairoTypeCustomEnum(myPoint, enumAbi, mergedStrategy, 1)).not.toThrow();
    });

    test('if content is an iterator, no variant is authorized', () => {
      expect(() => new CairoTypeCustomEnum(iter, enumAbi, strategies, 1)).toThrow(
        new Error('when "content" parameter is an iterator, do not define "variant" parameter.')
      );
    });
  });

  describe('constructor content', () => {
    test('content is a CairoCustomEnum', () => {
      const myCairoCustomEnum = new CairoCustomEnum({ LocationError: myPoint });
      const cairoTypeCustomEnum0 = new CairoTypeCustomEnum(myCairoCustomEnum, enumAbi, strategies);
      expect(cairoTypeCustomEnum0.enumVariant).toBe(1);
      expect(cairoTypeCustomEnum0.content).toEqual(point);
      expect(cairoTypeCustomEnum0.abiEnum).toEqual(enumAbi);
    });

    test('content is a CairoTypeCustomEnum', () => {
      const cairoTypeCustomEnum0 = new CairoTypeCustomEnum(myPoint, enumAbi, strategies, 1);
      const cairoTypeCustomEnum1 = new CairoTypeCustomEnum(
        cairoTypeCustomEnum0,
        enumAbi,
        strategies
      );
      expect(cairoTypeCustomEnum1.enumVariant).toBe(1);
      expect(cairoTypeCustomEnum1.content).toEqual(point);
      expect(cairoTypeCustomEnum1.abiEnum).toEqual(enumAbi);
      expect(() => new CairoTypeCustomEnum(cairoTypeCustomEnum0, enumAbi, strategies, 1)).toThrow(
        new Error(
          'when "content" parameter is a CairoTypeCustomEnum do not define "variant" parameter.'
        )
      );
    });

    test('content is an iterator', () => {
      const cairoTypeCustomEnum0 = new CairoTypeCustomEnum(iter, enumAbi, strategies);
      expect(cairoTypeCustomEnum0.enumVariant).toBe(1);
      expect(cairoTypeCustomEnum0.content).toEqual(point);
      expect(cairoTypeCustomEnum0.abiEnum).toEqual(enumAbi);
      expect(cairoTypeCustomEnum0.toApiRequest()).toEqual(['1', '100', '200']);
      const iter1 = ['3', '10', '11'][Symbol.iterator]();
      const cairoTypeCustomEnum1 = new CairoTypeCustomEnum(iter1, enumAbi, strategies);
      expect(cairoTypeCustomEnum1.enumVariant).toBe(3);
      expect(cairoTypeCustomEnum1.abiEnum).toEqual(enumAbi);
      expect(cairoTypeCustomEnum1.toApiRequest()).toEqual(['3', '10', '11']);
    });
  });

  describe('constructor custom enum CairoType', () => {
    test('customEnumCairoType: enum of an array', () => {
      const myEnum0 = new CairoTypeCustomEnum([1, 2, 3], enumAbi, strategies, 4);
      const myEnum1 = new CairoTypeCustomEnum(
        new CairoArray([1, 2, 3], 'core::array::Span::<core::integer::u256>', strategies),
        enumAbi,
        strategies,
        4
      );
      expect(myEnum0.toApiRequest()).toEqual(['4', '3', '1', '0', '2', '0', '3', '0']);
      expect(myEnum0.decompose(strategies)).toEqual(
        new CairoCustomEnum({ ErrorList: [1n, 2n, 3n] })
      );
      expect(myEnum1.toApiRequest()).toEqual(['4', '3', '1', '0', '2', '0', '3', '0']);
      expect(myEnum1.decompose(strategies)).toEqual(
        new CairoCustomEnum({ ErrorList: [1n, 2n, 3n] })
      );
      expect(() => new CairoTypeCustomEnum([1, 2, 3], enumAbi, strategies)).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo custom enum from a Cairo Enum or raw data.'
        )
      );
    });

    test('customEnumCairoType: enum of a fixed array', () => {
      const myEnum0 = new CairoTypeCustomEnum([1, 2], enumAbi, strategies, 3);
      const myEnum1 = new CairoTypeCustomEnum(
        new CairoFixedArray([1, 2], '[core::integer::u32; 2]', strategies),
        enumAbi,
        strategies,
        3
      );
      expect(myEnum0.toApiRequest()).toEqual(['3', '1', '2']);
      const empty = {
        Damage: undefined,
        Empty: undefined,
        ErrorList: undefined,
        LocationError: undefined,
        Parents: undefined,
        Report: undefined,
        Status: undefined,
        Success: undefined,
      };
      const enRes = { TwoErrors: [1n, 2n] };
      expect(myEnum0.decompose(strategies)).toEqual(new CairoCustomEnum({ ...empty, ...enRes }));
      expect(myEnum1.toApiRequest()).toEqual(['3', '1', '2']);
      expect(myEnum1.decompose(strategies)).toEqual(new CairoCustomEnum({ TwoErrors: [1n, 2n] }));
      expect(() => new CairoTypeCustomEnum([1, 2], enumAbi, strategies)).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo custom enum from a Cairo Enum or raw data.'
        )
      );
    });

    test('customEnumCairoType: enum of a tuple', () => {
      const myEnum0 = new CairoTypeCustomEnum([5, 6], enumAbi, strategies, 5);
      const myEnum1 = new CairoTypeCustomEnum(
        new CairoTuple([5, 6], '(core::integer::u64, core::integer::u128)', strategies),
        enumAbi,
        strategies,
        5
      );
      expect(myEnum0.toApiRequest()).toEqual(['5', '5', '6']);
      expect(myEnum0.decompose(strategies)).toEqual(
        new CairoCustomEnum({ Parents: { '0': 5n, '1': 6n } })
      );
      expect(myEnum1.toApiRequest()).toEqual(['5', '5', '6']);
      expect(myEnum1.decompose(strategies)).toEqual(
        new CairoCustomEnum({ Parents: { '0': 5n, '1': 6n } })
      );
      expect(() => new CairoTypeCustomEnum([5, 6], enumAbi, strategies)).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo custom enum from a Cairo Enum or raw data.'
        )
      );
    });

    test('customEnumCairoType: enum of an option', () => {
      const option0 = new CairoOption<BigNumberish>(CairoOptionVariant.Some, 5n);
      const myTypeOption = new CairoTypeOption(
        5,
        'core::option::Option::<core::integer::u8>',
        strategies,
        CairoOptionVariant.Some
      );
      const myEnum0 = new CairoTypeCustomEnum(option0, enumAbi, strategies, 6);
      const myEnum1 = new CairoTypeCustomEnum(myTypeOption, enumAbi, strategies, 6);
      expect(myEnum0.toApiRequest()).toEqual(['6', '0', '5']);
      expect(myEnum0.decompose(strategies)).toEqual(new CairoCustomEnum({ Damage: option0 }));
      expect(myEnum1.toApiRequest()).toEqual(['6', '0', '5']);
      expect(myEnum1.decompose(strategies)).toEqual(new CairoCustomEnum({ Damage: option0 }));
      expect(() => new CairoTypeCustomEnum(option0, enumAbi, strategies)).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoOption.'
        )
      );
    });

    test('customEnumCairoType: enum of a result', () => {
      const result0 = new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 5n);
      const myTypeResult = new CairoTypeResult(
        5,
        'core::result::Result::<core::integer::u32, core::integer::u64>',
        strategies,
        CairoResultVariant.Ok
      );
      const myEnum0 = new CairoTypeCustomEnum(result0, enumAbi, strategies, 7);
      const myEnum1 = new CairoTypeCustomEnum(myTypeResult, enumAbi, strategies, 7);
      expect(myEnum0.toApiRequest()).toEqual(['7', '0', '5']);
      expect(myEnum0.decompose(strategies)).toEqual(new CairoCustomEnum({ Report: result0 }));
      expect(myEnum1.toApiRequest()).toEqual(['7', '0', '5']);
      expect(myEnum1.decompose(strategies)).toEqual(new CairoCustomEnum({ Report: result0 }));
      expect(() => new CairoTypeCustomEnum(result0, enumAbi, strategies)).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoResult.'
        )
      );
    });

    test('customEnumCairoType: enum of a struct', () => {
      const struct0: Point = { x: 4, y: 5 };
      const myEnum0 = new CairoTypeCustomEnum(struct0, enumAbi, strategies, 1);
      const myTypeStruct0 = new CairoStruct(struct0, pointAbi, strategies);
      const myEnum1 = new CairoTypeCustomEnum(myEnum0, enumAbi, strategies);
      const myEnum2 = new CairoTypeCustomEnum(myTypeStruct0, enumAbi, strategies, 1);
      expect(myEnum1.toApiRequest()).toEqual(['1', '4', '5']);
      expect(myEnum1.decompose(strategies)).toEqual(
        new CairoCustomEnum({ LocationError: { x: 4n, y: 5n } })
      );
      expect(myEnum2.toApiRequest()).toEqual(['1', '4', '5']);
      expect(myEnum2.decompose(strategies)).toEqual(
        new CairoCustomEnum({ LocationError: { x: 4n, y: 5n } })
      );
    });

    test('customEnumCairoType: nested enums', () => {
      const enum0 = new CairoCustomEnum({ Success: cairo.tuple(10, 20) });
      const enum1 = new CairoCustomEnum({ Status: enum0 });
      const myEnum = new CairoTypeCustomEnum(enum1, enumAbi, strategies);
      expect(myEnum.toApiRequest()).toEqual(['2', '0', '10', '20']);
      const empty = {
        Damage: undefined,
        Empty: undefined,
        ErrorList: undefined,
        LocationError: undefined,
        Parents: undefined,
        Report: undefined,
        Success: undefined,
        TwoErrors: undefined,
      };
      const empty2 = { Error: undefined, NoAnswer: undefined };
      const enRes2 = { Success: cairo.tuple(10n, 20n) };
      const res2 = new CairoCustomEnum({ ...empty2, ...enRes2 });
      const enRes = { Status: res2 };
      expect(myEnum.decompose(strategies)).toEqual(new CairoCustomEnum({ ...empty, ...enRes }));
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(CairoTypeCustomEnum.is(200, 'enum::MyEnum', 0)).toBe(true);
    });

    test('isAbiType', () => {
      expect(CairoTypeCustomEnum.isAbiType('enum::MyEnum')).toBe(true);
      expect(CairoTypeCustomEnum.isAbiType('felt')).toBe(false);
    });

    test('validate', () => {
      expect(() => CairoTypeCustomEnum.validate(200, 'enum::MyEnum', 0)).not.toThrow();
      expect(() => CairoTypeCustomEnum.validate(200, 'MyEnum', 0)).toThrow(
        new Error('The type MyEnum is not a Cairo Enum. Needs impl::name.')
      );
    });

    test('getVariantTypes', () => {
      expect(CairoTypeCustomEnum.extractEnumMembersNames(enumAbi)).toEqual([
        'Success',
        'LocationError',
        'Status',
        'TwoErrors',
        'ErrorList',
        'Parents',
        'Damage',
        'Report',
        'Empty',
      ]);
    });
  });

  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another Cairo Result', () => {
      const fakeAbi = abi.find((item) => item.name === 'enums::StatusEnum') as AbiEnum;
      const original = new CairoTypeCustomEnum(10, enumAbi, strategies, 0);

      const copy = new CairoTypeCustomEnum(original, fakeAbi, (strategies as ParsingStrategy[])[0]);
      expect(copy.content).toBe(original.content);
      expect(copy.enumVariant).toBe(original.enumVariant);
      expect(copy.abiEnum).toEqual(original.abiEnum);
    });
  });

  describe('encoding without Abi', () => {
    test('number', () => {
      expect(CallData.compile([new CairoTypeCustomEnum(7, enumAbi, strategies, 0)])).toEqual([
        '0',
        '7',
      ]);

      expect(
        CallData.compile({
          input: new CairoTypeCustomEnum(7, enumAbi, strategies, CairoResultVariant.Ok),
        })
      ).toEqual(['0', '7']);
    });
  });
});
