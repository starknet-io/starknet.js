import { parseCalldataField } from '../../../src/utils/calldata/requestParser';
import { getAbiEnums, getAbiStructs, getAbiEntry } from '../../factories/abi';
import {
  CairoCustomEnum,
  CairoOption,
  CairoResult,
  ETH_ADDRESS,
  NON_ZERO_PREFIX,
} from '../../../src';

describe('requestParser', () => {
  describe('parseCalldataField', () => {
    test('should return parsed calldata field for base type', () => {
      const args = [256n, 128n];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('felt'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual('256');
    });

    test('should return parsed calldata field for Array type', () => {
      const args = [[256n, 128n]];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::array::Array::<felt>'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual(['2', '256', '128']);
    });

    test('should return parsed calldata field for Array type(string input)', () => {
      const args = ['some_test_value'];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::array::Array::<felt>'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual(['1', '599374153440608178282648329058547045']);
    });

    test('should return parsed calldata field for NonZero type', () => {
      const args = [true];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry(`${NON_ZERO_PREFIX}core::bool`),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual('1');
    });

    test('should return parsed calldata field for EthAddress type', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry(`${ETH_ADDRESS}felt`),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual('1952805748');
    });

    test('should return parsed calldata field for Struct type', () => {
      const args = [{ test_name: 'test' }];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('struct'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual(['1952805748']);
    });

    test('should return parsed calldata field for Tuple type', () => {
      const args = [{ min: true, max: true }];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('(core::bool, core::bool)'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual(['1', '1']);
    });

    test('should return parsed calldata field for CairoUint256 abi type', () => {
      const args = [252n];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::integer::u256'),
        getAbiStructs(),
        getAbiEnums()
      );
      expect(parsedField).toEqual(['252', '0']);
    });

    test('should return parsed calldata field for Enum Option type None', () => {
      const args = [new CairoOption<string>(1, 'content')];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::option::Option::core::bool'),
        getAbiStructs(),
        { 'core::option::Option::core::bool': getAbiEnums().enum }
      );
      expect(parsedField).toEqual('1');
    });

    test('should return parsed calldata field for Enum Option type Some', () => {
      const args = [new CairoOption<string>(0, 'content')];
      const argsIterator = args[Symbol.iterator]();
      const abiEnum = getAbiEnums().enum;
      abiEnum.variants.push({
        name: 'Some',
        type: 'cairo_struct_variant',
        offset: 1,
      });
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::option::Option::core::bool'),
        getAbiStructs(),
        { 'core::option::Option::core::bool': abiEnum }
      );
      expect(parsedField).toEqual(['0', '27988542884245108']);
    });

    test('should throw an error for Enum Option has no "Some" variant', () => {
      const args = [new CairoOption<string>(0, 'content')];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(
          argsIterator,
          getAbiEntry('core::option::Option::core::bool'),
          getAbiStructs(),
          { 'core::option::Option::core::bool': getAbiEnums().enum }
        )
      ).toThrow(new Error(`Error in abi : Option has no 'Some' variant.`));
    });

    test('should return parsed calldata field for Enum Result type Ok', () => {
      const args = [new CairoResult<string, string>(0, 'Ok')];
      const argsIterator = args[Symbol.iterator]();
      const abiEnum = getAbiEnums().enum;
      abiEnum.variants.push({
        name: 'Ok',
        type: 'cairo_struct_variant',
        offset: 1,
      });
      const parsedField = parseCalldataField(
        argsIterator,
        getAbiEntry('core::result::Result::core::bool'),
        getAbiStructs(),
        { 'core::result::Result::core::bool': abiEnum }
      );
      expect(parsedField).toEqual(['0', '20331']);
    });

    test('should throw an error for Enum Result has no "Ok" variant', () => {
      const args = [new CairoResult<string, string>(0, 'Ok')];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(
          argsIterator,
          getAbiEntry('core::result::Result::core::bool'),
          getAbiStructs(),
          { 'core::result::Result::core::bool': getAbiEnums().enum }
        )
      ).toThrow(new Error(`Error in abi : Result has no 'Ok' variant.`));
    });

    test('should return parsed calldata field for Custom Enum type', () => {
      const activeVariantName = 'custom_enum';
      const args = [new CairoCustomEnum({ [activeVariantName]: 'content' })];
      const argsIterator = args[Symbol.iterator]();
      const abiEnum = getAbiEnums().enum;
      abiEnum.variants.push({
        name: activeVariantName,
        type: 'cairo_struct_variant',
        offset: 1,
      });
      const parsedField = parseCalldataField(argsIterator, getAbiEntry('enum'), getAbiStructs(), {
        enum: abiEnum,
      });
      expect(parsedField).toEqual(['1', '27988542884245108']);
    });

    test('should throw an error for Custon Enum type when there is not active variant', () => {
      const args = [new CairoCustomEnum({ test: 'content' })];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(argsIterator, getAbiEntry('enum'), getAbiStructs(), getAbiEnums())
      ).toThrow(new Error(`Not find in abi : Enum has no 'test' variant.`));
    });

    test('should throw an error for CairoUint256 abi type when wrong arg is provided', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(
          argsIterator,
          getAbiEntry('core::integer::u256'),
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(new Error('Cannot convert test to a BigInt'));
    });

    test('should throw an error if provided tuple size do not match', () => {
      const args = [{ min: true }, { max: true }];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(
          argsIterator,
          getAbiEntry('(core::bool, core::bool)'),
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(
        new Error(
          `ParseTuple: provided and expected abi tuple size do not match.
      provided: true
      expected: core::bool,core::bool`
        )
      );
    });

    test('should throw an error if there is missing parameter for type Struct', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(argsIterator, getAbiEntry('struct'), getAbiStructs(), getAbiEnums())
      ).toThrow(new Error('Missing parameter for type test_type'));
    });

    test('should throw an error if args for array type are not valid', () => {
      const args = [256n, 128n];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField(
          argsIterator,
          getAbiEntry('core::array::Array::<felt>'),
          getAbiStructs(),
          getAbiEnums()
        )
      ).toThrow(new Error('ABI expected parameter test to be array or long string, got 256'));
    });
  });
});
