import {
  CairoOptionVariant,
  CairoTypeOption,
  CairoUint8,
  hdParsingStrategy,
  type BigNumberish,
  CairoOption,
  CairoArray,
  CallData,
  CairoTypeResult,
  CairoResultVariant,
  CairoResult,
  type AbiStruct,
  type ParsingStrategy,
  CairoStruct,
  type AbiEnum,
  CairoTypeCustomEnum,
  CairoCustomEnum,
} from '../../../../src';
import { contracts } from '../../../config/fixtures';

describe('CairoTypeOption', () => {
  describe('constructor variant', () => {
    const val = 8;
    const typeCairo = 'core::option::Option::<core::integer::u8>';
    const iter = ['0', '100'][Symbol.iterator]();

    test('should set "Some" if variant is 0', () => {
      const cairoTypeOption0 = new CairoTypeOption(
        val,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(cairoTypeOption0.isVariantSome).toBe(true);
      expect(cairoTypeOption0.content).toEqual(new CairoUint8(8));
      expect(cairoTypeOption0.optionCairoType).toBe(typeCairo);
    });

    test('should set "None" if variant is 1', () => {
      const cairoTypeOption = new CairoTypeOption(
        undefined,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.None
      );
      expect(cairoTypeOption.isVariantSome).toBe(false);
      expect(cairoTypeOption.content).toBeUndefined();
      expect(cairoTypeOption.optionCairoType).toBe(typeCairo);
    });

    test('should throw an error if wrong variant is provided', () => {
      expect(() => new CairoTypeOption(undefined, typeCairo, hdParsingStrategy, 3)).toThrow(
        new Error('In Cairo option, only 0 or 1 variants are authorized.')
      );
    });

    test('should throw an error if content is undefined in a Some option', () => {
      expect(
        () => new CairoTypeOption(undefined, typeCairo, hdParsingStrategy, CairoOptionVariant.Some)
      ).toThrow(new Error('"content" parameter has to be defined when Some variant is selected'));
    });

    test('should throw an error if content is defined in a None option', () => {
      expect(
        () => new CairoTypeOption(val, typeCairo, hdParsingStrategy, CairoOptionVariant.None)
      ).toThrow(
        new Error('"content" parameter has to be NOT defined when None variant is selected')
      );
    });

    test('if content is an iterator, no variant is authorized', () => {
      expect(
        () => new CairoTypeOption(iter, typeCairo, hdParsingStrategy, CairoOptionVariant.None)
      ).toThrow(
        new Error('"content" parameter has to be NOT defined when None variant is selected')
      );
    });
  });

  describe('constructor content', () => {
    const val = 8n;
    const typeCairo = 'core::option::Option::<core::integer::u8>';
    const iter = ['0', '100'][Symbol.iterator]();

    test('content is a CairoOption', () => {
      const myCairoOption = new CairoOption<BigNumberish>(CairoOptionVariant.Some, val);
      const cairoTypeOption0 = new CairoTypeOption(
        myCairoOption,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(cairoTypeOption0.isVariantSome).toBe(true);
      expect(cairoTypeOption0.content).toEqual(new CairoUint8(8));
      expect(cairoTypeOption0.optionCairoType).toBe(typeCairo);
    });

    test('content is a CairoTypeOption', () => {
      const cairoTypeOption0 = new CairoTypeOption(
        '0x0a',
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      const cairoTypeOption1 = new CairoTypeOption(
        cairoTypeOption0,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(cairoTypeOption1.isVariantSome).toBe(true);
      expect(cairoTypeOption1.content).toEqual(new CairoUint8(10));
      expect(cairoTypeOption1.optionCairoType).toBe(typeCairo);
    });

    test('content is an iterator', () => {
      const cairoTypeOption0 = new CairoTypeOption(iter, typeCairo, hdParsingStrategy);
      expect(cairoTypeOption0.isVariantSome).toBe(true);
      expect(cairoTypeOption0.content).toEqual(new CairoUint8(100));
      expect(cairoTypeOption0.optionCairoType).toBe(typeCairo);
    });
  });

  describe('constructor optionCairoType', () => {
    test('proper start of string', () => {
      expect(
        () =>
          new CairoTypeOption(undefined, 'cairo::wrong', hdParsingStrategy, CairoOptionVariant.None)
      ).toThrow(
        new Error(
          'The type cairo::wrong is not a Cairo option. Needs core::option::Option::<type>.'
        )
      );
    });

    test('optionCairoType: option of an array', () => {
      const myOption = new CairoTypeOption(
        [1, 2, 3],
        'core::option::Option::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption.toApiRequest()).toEqual(['0', '3', '1', '2', '3']);
      expect(myOption.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<Array<bigint>>(CairoOptionVariant.Some, [1n, 2n, 3n])
      );
    });

    test('optionCairoType: option of a fixed array', () => {
      const myOption = new CairoTypeOption(
        [1, 2, 3],
        'core::option::Option::<[core::integer::u8; 3]>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption.toApiRequest()).toEqual(['0', '1', '2', '3']);
      expect(myOption.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<Array<bigint>>(CairoOptionVariant.Some, [1n, 2n, 3n])
      );
    });

    test('optionCairoType: option of a tuple', () => {
      const myOption = new CairoTypeOption(
        [5, 6],
        'core::option::Option::<(core::integer::u8, core::integer::u16)>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption.toApiRequest()).toEqual(['0', '5', '6']);
      expect(myOption.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<object>(CairoOptionVariant.Some, { '0': 5n, '1': 6n })
      );
    });

    test('optionCairoType: option of a result', () => {
      const myResult = new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, 6n);
      const myOption0 = new CairoTypeOption(
        myResult,
        'core::option::Option::<core::result::Result::<core::integer::u8, core::integer::u16>>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      const myOption1 = new CairoTypeOption(
        new CairoTypeResult(
          6,
          'core::result::Result::<core::integer::u8, core::integer::u16>',
          hdParsingStrategy,
          CairoResultVariant.Ok
        ),
        'core::option::Option::<core::result::Result::<core::integer::u8, core::integer::u16>>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption0.toApiRequest()).toEqual(['0', '0', '6']);
      expect(myOption0.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<CairoResult<BigNumberish, BigNumberish>>(CairoOptionVariant.Some, myResult)
      );
      expect(myOption1.toApiRequest()).toEqual(['0', '0', '6']);
      expect(myOption1.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<CairoResult<BigNumberish, BigNumberish>>(CairoOptionVariant.Some, myResult)
      );
    });

    test('optionCairoType: option of a struct', () => {
      type Point = { x: BigNumberish; y: BigNumberish };
      const struct0: Point = { x: 4, y: 5 };
      const abiPoint: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'enums::Point'
      );
      const myCallData = new CallData(contracts.TestCairoType.sierra.abi);
      const strategies = myCallData.parser.parsingStrategies as ParsingStrategy[];
      const myTypeStruct0 = new CairoStruct(struct0, abiPoint, strategies);
      const myOption0 = new CairoTypeOption(
        struct0,
        'core::option::Option::<enums::Point>',
        strategies,
        CairoOptionVariant.Some
      );
      const myOption1 = new CairoTypeOption(
        myTypeStruct0,
        'core::option::Option::<enums::Point>',
        strategies,
        CairoOptionVariant.Some
      );
      expect(myOption0.toApiRequest()).toEqual(['0', '4', '5']);
      expect(myOption0.decompose(strategies)).toEqual(
        new CairoOption<Point>(CairoOptionVariant.Some, { x: 4n, y: 5n })
      );
      expect(myOption1.toApiRequest()).toEqual(['0', '4', '5']);
      expect(myOption1.decompose(strategies)).toEqual(
        new CairoOption<Point>(CairoOptionVariant.Some, { x: 4n, y: 5n })
      );
    });

    test('optionCairoType: option of an enum', () => {
      const abiEnum: AbiEnum = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'enums::MyEnum'
      );
      const myCallData = new CallData(contracts.TestCairoType.sierra.abi);
      const strategies = myCallData.parser.parsingStrategies as ParsingStrategy[];
      const myEnum0 = new CairoCustomEnum({ Success: 5 });
      const myTypeEnum0 = new CairoTypeCustomEnum(myEnum0, abiEnum, strategies);
      const myOption0 = new CairoTypeOption(
        myEnum0,
        'core::option::Option::<enums::MyEnum>',
        strategies,
        CairoOptionVariant.Some
      );
      const myOption1 = new CairoTypeOption(
        myTypeEnum0,
        'core::option::Option::<enums::MyEnum>',
        strategies,
        CairoOptionVariant.Some
      );
      expect(myOption0.toApiRequest()).toEqual(['0', '0', '5']);
      const empty = {
        Damage: undefined,
        Empty: undefined,
        ErrorList: undefined,
        LocationError: undefined,
        Parents: undefined,
        Report: undefined,
        Status: undefined,
        Success: undefined,
        TwoErrors: undefined,
      };
      const enRes = { Success: 5n };
      expect(myOption0.decompose(strategies)).toEqual(
        new CairoOption<CairoCustomEnum>(
          CairoOptionVariant.Some,
          new CairoCustomEnum({ ...empty, ...enRes })
        )
      );
      expect(myOption1.toApiRequest()).toEqual(['0', '0', '5']);
      expect(myOption1.decompose(strategies)).toEqual(
        new CairoOption<CairoCustomEnum>(
          CairoOptionVariant.Some,
          new CairoCustomEnum({ ...empty, ...enRes })
        )
      );
    });

    test('optionCairoType: nested options', () => {
      const option0 = new CairoOption<BigNumberish>(CairoOptionVariant.Some, 5n);
      const option1 = new CairoOption<CairoOption<BigNumberish>>(CairoOptionVariant.Some, option0);
      const option2 = new CairoOption<CairoOption<CairoOption<BigNumberish>>>(
        CairoOptionVariant.Some,
        option1
      );
      const myOption = new CairoTypeOption(
        option2,
        'core::option::Option::<core::option::Option::<core::option::Option::<core::integer::u8>>>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption.toApiRequest()).toEqual(['0', '0', '0', '5']);
      expect(myOption.decompose(hdParsingStrategy)).toEqual(option2);
    });

    test('optionCairoType: option of a CairoType', () => {
      const myArray = new CairoArray(
        [7, 8],
        'core::array::Array::<core::integer::u8>',
        hdParsingStrategy
      );
      const myOption = new CairoTypeOption(
        myArray,
        'core::option::Option::<core::array::Array::<core::integer::u8>>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(myOption.toApiRequest()).toEqual(['0', '2', '7', '8']);
      expect(myOption.decompose(hdParsingStrategy)).toEqual(
        new CairoOption<Array<bigint>>(CairoOptionVariant.Some, [7n, 8n])
      );
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(
        CairoTypeOption.is(
          200,
          'core::option::Option::<core::integer::u16>',
          CairoOptionVariant.Some
        )
      ).toBe(true);
      expect(
        CairoTypeOption.is(200, 'core::error::<core::integer::u16>', CairoOptionVariant.Some)
      ).toBe(false);
    });

    test('isAbiType', () => {
      expect(CairoTypeOption.isAbiType('core::option::Option::<core::integer::u16>')).toBe(true);
      expect(CairoTypeOption.isAbiType('core::wrong::<core::integer::u16>')).toBe(false);
    });

    test('validate', () => {
      expect(() =>
        CairoTypeOption.validate(
          200,
          'core::option::Option::<core::integer::u16>',
          CairoOptionVariant.Some
        )
      ).not.toThrow();
      expect(() =>
        CairoTypeOption.validate(200, 'core::wrong::<core::integer::u16>', CairoOptionVariant.Some)
      ).toThrow(
        new Error(
          'The type core::wrong::<core::integer::u16> is not a Cairo option. Needs core::option::Option::<type>.'
        )
      );
      expect(() =>
        CairoTypeOption.validate(200, 'core::option::Option::<core::integer::u16>', 5)
      ).toThrow(new Error('In Cairo option, only 0 or 1 variants are authorized.'));
    });

    test('getVariantSomeType', () => {
      expect(CairoTypeOption.getVariantSomeType('core::option::Option::<core::integer::u16>')).toBe(
        'core::integer::u16'
      );
      expect(() =>
        CairoTypeOption.getVariantSomeType('core::option::Option::core::integer::u16>')
      ).toThrow(
        new Error(
          'ABI type core::option::Option::core::integer::u16> do not includes a valid type of data.'
        )
      );
    });
  });
  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another Cairo option', () => {
      const original = new CairoTypeOption(
        10,
        'core::option::Option::<core::integer::u8>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );

      const copy = new CairoTypeOption(
        original,
        'core::option::Option::<core::integer::u16>',
        hdParsingStrategy
      );
      expect(copy.content).toBe(original.content);
      expect(copy.isVariantSome).toBe(original.isVariantSome);
      expect(copy.optionCairoType).toBe(original.optionCairoType);
      expect(copy.optionCairoType).toBe('core::option::Option::<core::integer::u8>');
    });
  });

  describe('encoding without Abi', () => {
    test('number', () => {
      expect(
        CallData.compile([
          new CairoTypeOption(
            7,
            'core::option::Option::<core::integer::u8>',
            hdParsingStrategy,
            CairoOptionVariant.Some
          ),
        ])
      ).toEqual(['0', '7']);

      expect(
        CallData.compile([
          new CairoTypeOption(
            undefined,
            'core::option::Option::<core::integer::u8>',
            hdParsingStrategy,
            CairoOptionVariant.None
          ),
        ])
      ).toEqual(['1']);

      expect(
        CallData.compile({
          input: new CairoTypeOption(
            7,
            'core::option::Option::<core::integer::u8>',
            hdParsingStrategy,
            CairoOptionVariant.Some
          ),
        })
      ).toEqual(['0', '7']);

      expect(
        CallData.compile({
          input: new CairoTypeOption(
            undefined,
            'core::option::Option::<core::integer::u8>',
            hdParsingStrategy,
            CairoOptionVariant.None
          ),
        })
      ).toEqual(['1']);
    });
  });
});
