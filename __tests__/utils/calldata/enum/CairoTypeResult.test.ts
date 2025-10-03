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
  CairoUint16,
  CairoResult,
  CairoTuple,
  CairoFixedArray,
  type ParsingStrategy,
  CairoStruct,
  type AbiStruct,
} from '../../../../src';
import { contracts } from '../../../config/fixtures';

describe('CairoTypeResult', () => {
  describe('constructor variant', () => {
    const val = 8;
    const typeCairo = 'core::result::Result::<core::integer::u8, core::integer::u16>';
    const iter = ['0', '100'][Symbol.iterator]();

    test('should set "Ok" if variant is 0', () => {
      const cairoTypeResult0 = new CairoTypeResult(
        val,
        typeCairo,
        hdParsingStrategy,
        CairoResultVariant.Ok
      );
      expect(cairoTypeResult0.isVariantOk).toBe(true);
      expect(cairoTypeResult0.content).toEqual(new CairoUint8(8));
      expect(cairoTypeResult0.resultCairoType).toBe(typeCairo);
    });

    test('should set "Err" if variant is 1', () => {
      const cairoTypeResult = new CairoTypeResult(
        val,
        typeCairo,
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      expect(cairoTypeResult.isVariantOk).toBe(false);
      expect(cairoTypeResult.content).toEqual(new CairoUint16(8));
      expect(cairoTypeResult.resultCairoType).toBe(typeCairo);
    });

    test('should throw an error if wrong variant is provided', () => {
      expect(() => new CairoTypeResult(val, typeCairo, hdParsingStrategy, 3)).toThrow(
        new Error('In Cairo Result, only 0 or 1 variants are authorized.')
      );
    });

    test('should throw an error if content is undefined', () => {
      expect(
        () => new CairoTypeResult(undefined, typeCairo, hdParsingStrategy, CairoResultVariant.Ok)
      ).toThrow(new Error('"content" parameter has to be defined.'));
      expect(
        () => new CairoTypeResult(null, typeCairo, hdParsingStrategy, CairoResultVariant.Ok)
      ).toThrow(new Error('"content" parameter has to be defined.'));
    });

    test('accept array of parsing strategies', () => {
      const customStrategy: ParsingStrategy = {
        constructors: {},
        dynamicSelectors: {},
        response: {},
      };
      expect(
        () =>
          new CairoTypeResult(
            val,
            typeCairo,
            [hdParsingStrategy, customStrategy],
            CairoResultVariant.Ok
          )
      ).not.toThrow();
    });

    test('if content is an iterator, no variant is authorized', () => {
      expect(
        () => new CairoTypeResult(iter, typeCairo, hdParsingStrategy, CairoResultVariant.Ok)
      ).toThrow(
        new Error('when "content" parameter is an iterator, do not define "variant" parameter.')
      );
    });
  });

  describe('constructor content', () => {
    const val = 8n;
    const typeCairo = 'core::result::Result::<core::integer::u8, core::integer::u16>';

    test('content is a CairoResult', () => {
      const myCairoResult = new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Ok, val);
      const cairoTypeResult0 = new CairoTypeResult(myCairoResult, typeCairo, hdParsingStrategy);
      expect(cairoTypeResult0.isVariantOk).toBe(true);
      expect(cairoTypeResult0.content).toEqual(new CairoUint8(8));
      expect(cairoTypeResult0.resultCairoType).toBe(typeCairo);
      expect(
        () =>
          new CairoTypeResult(myCairoResult, typeCairo, hdParsingStrategy, CairoResultVariant.Ok)
      ).toThrow(
        new Error(
          'when "content" parameter is a CairoResult and subType is false, do not define "variant" parameter.'
        )
      );
    });

    test('content is a CairoTypeResult', () => {
      const cairoTypeResult0 = new CairoTypeResult(
        '0x0a',
        typeCairo,
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      const cairoTypeResult1 = new CairoTypeResult(cairoTypeResult0, typeCairo, hdParsingStrategy);
      expect(cairoTypeResult1.isVariantOk).toBe(false);
      expect(cairoTypeResult1.content).toEqual(new CairoUint16(10));
      expect(cairoTypeResult1.resultCairoType).toBe(typeCairo);
      expect(
        () =>
          new CairoTypeResult(
            cairoTypeResult0,
            typeCairo,
            hdParsingStrategy,
            CairoResultVariant.Err
          )
      ).toThrow(
        new Error(
          'when "content" parameter is a CairoTypeResult, do not define "variant" parameter.'
        )
      );
    });

    test('content is an iterator', () => {
      const iter0 = ['0', '100'][Symbol.iterator]();
      const cairoTypeResult0 = new CairoTypeResult(iter0, typeCairo, hdParsingStrategy);
      expect(cairoTypeResult0.isVariantOk).toBe(true);
      expect(cairoTypeResult0.content).toEqual(new CairoUint8(100));
      expect(cairoTypeResult0.resultCairoType).toBe(typeCairo);
      const iter1 = ['1', '100', '2'][Symbol.iterator]();
      const typeCairo1 = 'core::result::Result::<core::integer::u8, [core::integer::u16; 2]>';
      const cairoTypeResult1 = new CairoTypeResult(iter1, typeCairo1, hdParsingStrategy);
      expect(cairoTypeResult1.toApiRequest()).toEqual(['1', '100', '2']);
    });
  });

  describe('constructor resultCairoType', () => {
    test('proper start of string', () => {
      expect(
        () => new CairoTypeResult(8, 'cairo::wrong', hdParsingStrategy, CairoResultVariant.Err)
      ).toThrow(
        new Error(
          'The type cairo::wrong is not a Cairo Result. Needs core::result::Result::<type1, type2>.'
        )
      );
    });

    test('resultCairoType: result of an array', () => {
      const myResult0 = new CairoTypeResult(
        [1, 2, 3],
        'core::result::Result::<core::array::Array::<core::integer::u8>, core::integer::u16>',
        hdParsingStrategy,
        CairoResultVariant.Ok
      );
      const myResult1 = new CairoTypeResult(
        new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', hdParsingStrategy),
        'core::result::Result::<core::array::Array::<core::integer::u8>, core::integer::u16>',
        hdParsingStrategy,
        CairoResultVariant.Ok
      );
      expect(myResult0.toApiRequest()).toEqual(['0', '3', '1', '2', '3']);
      expect(myResult0.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<Array<bigint>, bigint>(CairoResultVariant.Ok, [1n, 2n, 3n])
      );
      expect(myResult1.toApiRequest()).toEqual(['0', '3', '1', '2', '3']);
      expect(myResult1.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<Array<bigint>, bigint>(CairoResultVariant.Ok, [1n, 2n, 3n])
      );
      expect(
        () =>
          new CairoTypeResult(
            [1, 2, 3],
            'core::result::Result::<core::array::Array::<core::integer::u8>, core::integer::u16>',
            hdParsingStrategy
          )
      ).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
        )
      );
    });

    test('resultCairoType: result of a fixed array', () => {
      const myResult0 = new CairoTypeResult(
        [1, 2, 3],
        'core::result::Result::<core::integer::u16, [core::integer::u8; 3]>',
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      const myResult1 = new CairoTypeResult(
        new CairoFixedArray([1, 2, 3], '[core::integer::u8; 3]', hdParsingStrategy),
        'core::result::Result::<core::integer::u16, [core::integer::u8; 3]>',
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      expect(myResult0.toApiRequest()).toEqual(['1', '1', '2', '3']);
      expect(myResult0.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<bigint, Array<bigint>>(CairoResultVariant.Err, [1n, 2n, 3n])
      );
      expect(myResult1.toApiRequest()).toEqual(['1', '1', '2', '3']);
      expect(myResult1.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<bigint, Array<bigint>>(CairoResultVariant.Err, [1n, 2n, 3n])
      );
      expect(
        () =>
          new CairoTypeResult(
            [1, 2, 3],
            'core::result::Result::<core::integer::u16, [core::integer::u8; 3]>',
            hdParsingStrategy
          )
      ).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
        )
      );
    });

    test('resultCairoType: result of a tuple', () => {
      const myResult0 = new CairoTypeResult(
        [5, 6],
        'core::result::Result::<(core::integer::u8, core::integer::u16), core::integer::u32>',
        hdParsingStrategy,
        CairoResultVariant.Ok
      );
      const myResult1 = new CairoTypeResult(
        new CairoTuple([5, 6], '(core::integer::u8, core::integer::u16)', hdParsingStrategy),
        'core::result::Result::<(core::integer::u8, core::integer::u16), core::integer::u32>',
        hdParsingStrategy,
        CairoResultVariant.Ok
      );
      expect(myResult0.toApiRequest()).toEqual(['0', '5', '6']);
      expect(myResult0.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<object, BigNumberish>(CairoResultVariant.Ok, { '0': 5n, '1': 6n })
      );
      expect(myResult1.toApiRequest()).toEqual(['0', '5', '6']);
      expect(myResult1.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<object, BigNumberish>(CairoResultVariant.Ok, { '0': 5n, '1': 6n })
      );
      expect(
        () =>
          new CairoTypeResult(
            [5, 6],
            'core::result::Result::<(core::integer::u8, core::integer::u16), core::integer::u32>',
            hdParsingStrategy
          )
      ).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
        )
      );
    });

    test('resultCairoType: result of an option', () => {
      const option0 = new CairoOption<BigNumberish>(CairoOptionVariant.Some, 5n);
      const myTypeOption = new CairoTypeOption(
        5,
        'core::option::Option::<core::integer::u8>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      const myResult0 = new CairoTypeResult(
        option0,
        'core::result::Result::<core::integer::u32, core::option::Option::<core::integer::u8>>',
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      const myResult1 = new CairoTypeResult(
        myTypeOption,
        'core::result::Result::<core::integer::u32, core::option::Option::<core::integer::u8>>',
        hdParsingStrategy,
        CairoResultVariant.Err
      );
      expect(myResult0.toApiRequest()).toEqual(['1', '0', '5']);
      expect(myResult0.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<BigNumberish, CairoOption<BigNumberish>>(CairoResultVariant.Err, option0)
      );
      expect(myResult1.toApiRequest()).toEqual(['1', '0', '5']);
      expect(myResult1.decompose(hdParsingStrategy)).toEqual(
        new CairoResult<BigNumberish, CairoOption<BigNumberish>>(CairoResultVariant.Err, option0)
      );
      expect(
        () =>
          new CairoTypeResult(
            option0,
            'core::result::Result::<core::integer::u32, core::option::Option::<core::integer::u8>>',
            hdParsingStrategy
          )
      ).toThrow(
        new Error(
          '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
        )
      );
    });

    test('resultCairoType: result of a struct', () => {
      type Point = { x: BigNumberish; y: BigNumberish };
      const struct0: Point = { x: 4, y: 5 };
      const abiPoint: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'enums::Point'
      );
      const myCallData = new CallData(contracts.TestCairoType.sierra.abi);
      const strategies = myCallData.parser.parsingStrategies as ParsingStrategy[];
      const myTypeStruct0 = new CairoStruct(struct0, abiPoint, strategies);
      const myResult0 = new CairoResult<BigNumberish, Point>(CairoResultVariant.Err, struct0);
      const myResult1 = new CairoTypeResult(
        myResult0,
        'core::result::Result::<core::integer::u16, enums::Point>',
        strategies
      );
      const myResult2 = new CairoTypeResult(
        myTypeStruct0,
        'core::result::Result::<core::integer::u16, enums::Point>',
        strategies,
        CairoResultVariant.Err
      );
      expect(myResult1.toApiRequest()).toEqual(['1', '4', '5']);
      expect(myResult1.decompose(strategies)).toEqual(
        new CairoResult<BigNumberish, Point>(CairoResultVariant.Err, { x: 4n, y: 5n })
      );
      expect(myResult2.toApiRequest()).toEqual(['1', '4', '5']);
      expect(myResult2.decompose(strategies)).toEqual(
        new CairoResult<BigNumberish, Point>(CairoResultVariant.Err, { x: 4n, y: 5n })
      );
    });

    test('resultCairoType: nested results', () => {
      const result0 = new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Err, 5n);
      const result1 = new CairoResult<CairoResult<BigNumberish, BigNumberish>, BigNumberish>(
        CairoResultVariant.Ok,
        result0
      );
      const result2 = new CairoResult<
        BigNumberish,
        CairoResult<CairoResult<BigNumberish, BigNumberish>, BigNumberish>
      >(CairoResultVariant.Err, result1);
      const myResult = new CairoTypeResult(
        result2,
        'core::result::Result::<core::integer::u16, core::result::Result::<core::result::Result::<core::integer::u16, core::integer::u8>, core::integer::u16>>',
        hdParsingStrategy
      );
      expect(myResult.toApiRequest()).toEqual(['1', '0', '1', '5']);
      expect(myResult.decompose(hdParsingStrategy)).toEqual(result2);
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(
        CairoTypeResult.is(
          200,
          'core::result::Result::<core::integer::u8, core::integer::u16>',
          CairoResultVariant.Ok
        )
      ).toBe(true);
      expect(
        CairoTypeResult.is(200, 'core::error::<core::integer::u16>', CairoResultVariant.Err)
      ).toBe(false);
    });

    test('isAbiType', () => {
      expect(
        CairoTypeResult.isAbiType('core::result::Result::<core::integer::u8, core::integer::u16>')
      ).toBe(true);
      expect(CairoTypeResult.isAbiType('core::wrong::<core::integer::u16>')).toBe(false);
    });

    test('validate', () => {
      expect(() =>
        CairoTypeResult.validate(
          200,
          'core::result::Result::<core::integer::u8, core::integer::u16>',
          CairoResultVariant.Ok
        )
      ).not.toThrow();
      expect(() =>
        CairoTypeResult.validate(200, 'core::wrong::<core::integer::u16>', CairoResultVariant.Err)
      ).toThrow(
        new Error(
          'The type core::wrong::<core::integer::u16> is not a Cairo Result. Needs core::result::Result::<type1, type2>.'
        )
      );
      expect(() =>
        CairoTypeResult.validate(
          200,
          'core::result::Result::<core::integer::u8, core::integer::u16>',
          5
        )
      ).toThrow(new Error('In Cairo Result, only 0 or 1 variants are authorized.'));
    });

    test('getVariantTypes', () => {
      expect(
        CairoTypeResult.getVariantTypes(
          'core::result::Result::<core::integer::u8, core::integer::u16>'
        )
      ).toEqual(['core::integer::u8', 'core::integer::u16']);
      expect(() =>
        CairoTypeResult.getVariantTypes('core::result::Result::core::integer::u16>')
      ).toThrow(
        new Error(
          'ABI type core::result::Result::core::integer::u16> do not includes 2 types enclosed in <>.'
        )
      );
    });
  });
  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another Cairo Result', () => {
      const original = new CairoTypeResult(
        10,
        'core::result::Result::<core::integer::u8, core::integer::u16>',
        hdParsingStrategy,
        CairoResultVariant.Ok
      );

      const copy = new CairoTypeResult(
        original,
        'core::result::Result::<core::integer::u32, core::integer::u64>',
        hdParsingStrategy
      );
      expect(copy.content).toBe(original.content);
      expect(copy.isVariantOk).toBe(original.isVariantOk);
      expect(copy.resultCairoType).toBe(original.resultCairoType);
      expect(copy.resultCairoType).toBe(
        'core::result::Result::<core::integer::u8, core::integer::u16>'
      );
    });
  });

  describe('encoding without Abi', () => {
    test('number', () => {
      expect(
        CallData.compile([
          new CairoTypeResult(
            7,
            'core::result::Result::<core::integer::u8, core::integer::u16>',
            hdParsingStrategy,
            CairoResultVariant.Ok
          ),
        ])
      ).toEqual(['0', '7']);

      expect(
        CallData.compile([
          new CairoTypeResult(
            7,
            'core::result::Result::<core::integer::u8, core::integer::u16>',
            hdParsingStrategy,
            CairoResultVariant.Err
          ),
        ])
      ).toEqual(['1', '7']);

      expect(
        CallData.compile({
          input: new CairoTypeResult(
            7,
            'core::result::Result::<core::integer::u8, core::integer::u16>',
            hdParsingStrategy,
            CairoResultVariant.Ok
          ),
        })
      ).toEqual(['0', '7']);

      expect(
        CallData.compile({
          input: new CairoTypeResult(
            7,
            'core::result::Result::<core::integer::u8, core::integer::u16>',
            hdParsingStrategy,
            CairoResultVariant.Err
          ),
        })
      ).toEqual(['1', '7']);
    });
  });
});
