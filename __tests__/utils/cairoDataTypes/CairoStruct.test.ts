import {
  CairoOptionVariant,
  CairoTypeOption,
  hdParsingStrategy,
  type BigNumberish,
  CairoOption,
  CairoArray,
  CallData,
  CairoTypeResult,
  CairoResultVariant,
  CairoResult,
  CairoTuple,
  CairoFixedArray,
  type ParsingStrategy,
  type AbiStruct,
  CairoStruct,
} from '../../../src';
import { contracts } from '../../config/fixtures';

describe('CairoStruct', () => {
  const myCallData = new CallData(contracts.TestCairoType.sierra.abi);
  const strategies = myCallData.parser.parsingStrategies as ParsingStrategy[];
  const abiPoint: AbiStruct = contracts.TestCairoType.sierra.abi.find(
    (item) => item.name === 'test_enums::Point'
  );
  const abiCat: AbiStruct = contracts.TestCairoType.sierra.abi.find(
    (item) => item.name === 'test_enums::Cat'
  );
  describe('constructor variant', () => {
    test('content is an object', () => {
      const myCairoStruct = new CairoStruct({ x: 1, y: 2 }, abiPoint, strategies);
      expect(myCairoStruct.toApiRequest()).toEqual(['0x1', '0x2']);
      expect(myCairoStruct.decompose(strategies)).toEqual({ x: 1n, y: 2n });
    });

    test('content is an array', () => {
      const myCairoStruct = new CairoStruct([1, 2], abiPoint, strategies);
      expect(myCairoStruct.toApiRequest()).toEqual(['0x1', '0x2']);
      expect(myCairoStruct.decompose(strategies)).toEqual({ x: 1n, y: 2n });
    });

    test('content is an iterator', () => {
      const iter = ['0', '100'][Symbol.iterator]();
      const myCairoStruct = new CairoStruct(iter, abiPoint, strategies);
      expect(myCairoStruct.toApiRequest()).toEqual(['0x0', '0x64']);
      expect(myCairoStruct.decompose(strategies)).toEqual({ x: 0n, y: 100n });
      const iter2 = ['2', '11', '12', '13', '14'][Symbol.iterator]();
      const myCairoStruct2 = new CairoStruct(iter2, abiCat, strategies);
      expect(myCairoStruct2.toApiRequest()).toEqual(['0x2', '0xb', '0xc', '0xd', '0xe']);
      expect(myCairoStruct2.decompose(strategies)).toEqual({
        age: 2n,
        legs: { '0': 11n, '1': 12n, '2': 13n, '3': 14n },
      });
    });

    test('accept single strategy', () => {
      const customStrategy: ParsingStrategy = {
        constructors: {
          ...strategies[0].constructors,
          ...strategies[1].constructors,
        },
        dynamicSelectors: {
          ...strategies[0].dynamicSelectors,
          ...strategies[1].dynamicSelectors,
        },
        response: {
          ...strategies[0].response,
          ...strategies[1].response,
        },
      };
      const myCairoStruct = new CairoStruct({ x: 1, y: 2 }, abiPoint, customStrategy);
      expect(myCairoStruct.toApiRequest()).toEqual(['0x1', '0x2']);
      expect(myCairoStruct.decompose(customStrategy)).toEqual({ x: 1n, y: 2n });
    });
  });

  describe('constructor CairoType', () => {
    test('proper abi definition', () => {
      expect(
        () =>
          new CairoStruct(
            { x: 2, y: 3 },
            { name: 'error', type: 'struct', members: [] },
            strategies
          )
      ).toThrow(new Error('Invalid input: expected 0 members, got 2'));
    });

    test('CairoType: result of an array', () => {
      const abiDog: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Dog'
      );
      const myStruct0 = new CairoStruct({ age: 2, colors: [1, 2, 3] }, abiDog, strategies);
      const myStruct1 = new CairoStruct(
        {
          age: 2,
          colors: new CairoArray(
            [1, 2, 3],
            'core::array::Array::<core::integer::u8>',
            hdParsingStrategy
          ),
        },
        abiDog,
        strategies
      );
      expect(myStruct0.toApiRequest()).toEqual(['0x2', '0x3', '0x1', '0x2', '0x3']);
      expect(myStruct0.decompose(hdParsingStrategy)).toEqual({ age: 2n, colors: [1n, 2n, 3n] });
      expect(myStruct1.toApiRequest()).toEqual(['0x2', '0x3', '0x1', '0x2', '0x3']);
      expect(myStruct1.decompose(hdParsingStrategy)).toEqual({ age: 2n, colors: [1n, 2n, 3n] });
    });

    test('CairoType: result of a fixed array', () => {
      const abiHorse: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Horse'
      );
      const myResult0 = new CairoStruct({ age: 2, legs_color: [1, 2, 3, 4] }, abiHorse, strategies);
      const myResult1 = new CairoStruct(
        {
          age: 2,
          legs_color: new CairoFixedArray([1, 2, 3, 4], '[core::integer::u16; 4]', strategies),
        },
        abiHorse,
        strategies
      );
      expect(myResult0.toApiRequest()).toEqual(['0x2', '0x1', '0x2', '0x3', '0x4']);
      expect(myResult0.decompose(hdParsingStrategy)).toEqual({
        age: 2n,
        legs_color: [1n, 2n, 3n, 4n],
      });
      expect(myResult1.toApiRequest()).toEqual(['0x2', '0x1', '0x2', '0x3', '0x4']);
      expect(myResult1.decompose(hdParsingStrategy)).toEqual({
        age: 2n,
        legs_color: [1n, 2n, 3n, 4n],
      });
    });

    test('CairoType: result of a tuple', () => {
      const myStruct0 = new CairoStruct({ age: 2, legs: [5, 6, 7, 8] }, abiCat, strategies);
      const myStruct1 = new CairoStruct(
        {
          age: 2,
          legs: new CairoTuple(
            [5, 6, 7, 8],
            '(core::integer::u8, core::integer::u16, core::integer::u32, core::integer::u64)',
            strategies
          ),
        },
        abiCat,
        strategies
      );
      expect(myStruct0.toApiRequest()).toEqual(['0x2', '0x5', '0x6', '0x7', '0x8']);
      expect(myStruct0.decompose(strategies)).toEqual({
        age: 2n,
        legs: { '0': 5n, '1': 6n, '2': 7n, '3': 8n },
      });
      expect(myStruct1.toApiRequest()).toEqual(['0x2', '0x5', '0x6', '0x7', '0x8']);
      expect(myStruct1.decompose(strategies)).toEqual({
        age: 2n,
        legs: { '0': 5n, '1': 6n, '2': 7n, '3': 8n },
      });
    });

    test('CairoType: result of an option', () => {
      const abiTruck: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Truck'
      );
      const option0 = new CairoOption<BigNumberish>(CairoOptionVariant.Some, 2n);
      const myTypeOption = new CairoTypeOption(
        2,
        'core::option::Option::<core::integer::u8>',
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      const myStruct0 = new CairoStruct({ power: 512, turbo: option0 }, abiTruck, strategies);
      const myStruct1 = new CairoStruct({ power: 512, turbo: myTypeOption }, abiTruck, strategies);
      expect(myStruct0.toApiRequest()).toEqual(['0x200', '0x00', '0x2']);
      expect(myStruct0.decompose(hdParsingStrategy)).toEqual({ power: 512n, turbo: option0 });
      expect(myStruct1.toApiRequest()).toEqual(['0x200', '0x00', '0x2']);
      expect(myStruct1.decompose(hdParsingStrategy)).toEqual({ power: 512n, turbo: option0 });
    });

    test('CairoType: result from a result', () => {
      const abiDestruction: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Destruction'
      );
      const result = new CairoResult<BigNumberish, BigNumberish>(CairoResultVariant.Err, 5n);
      const typeResult = new CairoTypeResult(
        result,
        'core::result::Result::<core::integer::u8, core::integer::u64>',
        strategies
      );
      const myStruct0 = new CairoStruct({ area: 512, res: result }, abiDestruction, strategies);
      const myStruct1 = new CairoStruct({ area: 512, res: typeResult }, abiDestruction, strategies);
      expect(myStruct0.toApiRequest()).toEqual(['0x200', '0x01', '0x5']);
      expect(myStruct0.decompose(strategies)).toEqual({ area: 512n, res: result });
      expect(myStruct1.toApiRequest()).toEqual(['0x200', '0x01', '0x5']);
      expect(myStruct1.decompose(strategies)).toEqual({ area: 512n, res: result });
    });

    test('CairoType: nested structs', () => {
      const abiPoint2: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Point2'
      );
      const point1 = { x: 1, y: 2 };
      const structPoint1 = new CairoStruct(point1, abiPoint, strategies);
      const point2 = { thickness: 3, location: point1 };
      const structPoint2 = new CairoStruct(
        { thickness: 3, location: structPoint1 },
        abiPoint2,
        strategies
      );
      const struct0 = new CairoStruct(point2, abiPoint2, strategies);
      const struct2 = new CairoStruct(structPoint2, abiPoint2, strategies);
      expect(struct0.toApiRequest()).toEqual(['0x3', '0x1', '0x2']);
      expect(struct0.decompose(strategies)).toEqual({
        thickness: 3n,
        location: { x: 1n, y: 2n },
      });
      expect(struct2.toApiRequest()).toEqual(['0x3', '0x1', '0x2']);
      expect(struct2.decompose(strategies)).toEqual({
        thickness: 3n,
        location: { x: 1n, y: 2n },
      });
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(CairoStruct.is([200, 201])).toBe(true);
      expect(CairoStruct.is(200)).toBe(false);
    });

    test('validate', () => {
      expect(() => CairoStruct.validate([200, 300], abiPoint)).not.toThrow();
      expect(() => CairoStruct.validate({ x: 200, y: 300 }, abiPoint)).not.toThrow();
      expect(() => CairoStruct.validate({ x: 200, y: 300 })).not.toThrow();
      expect(() => CairoStruct.validate([200, 300], 'core::wrong' as unknown as AbiStruct)).toThrow(
        new Error('Invalid ABI: expected struct, got undefined')
      );
      expect(() =>
        CairoStruct.validate([200, 300], {
          name: 'test',
          type: 'struct',
          members: [{ name: 'x', type: 'core::integer::u16' }],
        })
      ).toThrow(new Error('Invalid input: expected 1 members, got 2'));
    });

    test('extractStructMembersNames', () => {
      expect(CairoStruct.extractStructMembersNames(abiPoint)).toEqual(['x', 'y']);
    });
  });
  describe('copy constructor behavior', () => {
    test('should copy properties when constructed from another CairoStruct', () => {
      const original = new CairoStruct({ x: 1, y: 2 }, abiPoint, strategies);
      const abiPoint2: AbiStruct = contracts.TestCairoType.sierra.abi.find(
        (item) => item.name === 'test_enums::Point2'
      );
      const copy = new CairoStruct(original, abiPoint2, strategies);
      expect(copy.content).toEqual(original.content);
      expect(copy.abiStruct).toEqual(original.abiStruct);
      expect(copy.dynamicSelector).toEqual(original.dynamicSelector);
    });
  });

  describe('encoding without Abi', () => {
    test('number', () => {
      expect(CallData.compile([new CairoStruct({ x: 4, y: 5 }, abiPoint, strategies)])).toEqual([
        '4',
        '5',
      ]);

      expect(
        CallData.compile({ x: new CairoStruct({ x: 4, y: 5 }, abiPoint, strategies) })
      ).toEqual(['4', '5']);
    });
  });
});
