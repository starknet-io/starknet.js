import { parseCalldataField } from '../../../src/utils/calldata/requestParser';
import { getAbiEnums, getAbiStructs, getAbiEntry } from '../../factories/abi';
import {
  AbiParser1,
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
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('felt'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('felt')]),
      });
      expect(parsedField).toEqual(['0x100']);
    });

    test('should return parsed calldata field for Array type', () => {
      const args = [[256n, 128n]];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::array::Array::<felt>'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('core::array::Array::<felt>')]),
      });
      expect(parsedField).toEqual(['0x2', '0x100', '0x80']);
    });

    test('should return parsed calldata field for Array type(string input)', () => {
      const args = ['some_test_value'];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::array::Array::<felt>'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('core::array::Array::<felt>')]),
      });
      expect(parsedField).toEqual(['0x1', '0x736f6d655f746573745f76616c7565']);
    });

    test('should return parsed calldata field for NonZero type', () => {
      const args = [true];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry(`${NON_ZERO_PREFIX}core::bool`),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry(`${NON_ZERO_PREFIX}core::bool`)]),
      });
      expect(parsedField).toEqual(['0x1']);
    });

    test('should return parsed calldata field for EthAddress type', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry(`${ETH_ADDRESS}felt`),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry(`${ETH_ADDRESS}felt`)]),
      });
      expect(parsedField).toEqual(['0x74657374']);
    });

    test('should return parsed calldata field for Struct type', () => {
      const args = [{ test_name: 'test' }];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('struct'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('struct')]),
      });
      expect(parsedField).toEqual(['0x74657374']);
    });

    test('should return parsed calldata field for Tuple type', () => {
      const args = [{ min: true, max: true }];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('(core::bool, core::bool)'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('(core::bool, core::bool)')]),
      });
      expect(parsedField).toEqual(['1', '1']);
    });

    test('should return parsed calldata field for CairoUint256 abi type', () => {
      const args = [252n];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::integer::u256'),
        structs: getAbiStructs(),
        enums: getAbiEnums(),
        parser: new AbiParser1([getAbiEntry('core::integer::u256')]),
      });
      expect(parsedField).toEqual(['252', '0']);
    });

    test('should return parsed calldata field for Enum Option type None', () => {
      const args = [new CairoOption<string>(1, 'content')];
      const argsIterator = args[Symbol.iterator]();
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::option::Option::<core::bool>'),
        structs: getAbiStructs(),
        enums: { 'core::option::Option::<core::bool>': getAbiEnums().enum },
        parser: new AbiParser1([getAbiEntry('core::option::Option::<core::bool>')]),
      });
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
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::option::Option::<core::bool>'),
        structs: getAbiStructs(),
        enums: { 'core::option::Option::<core::bool>': abiEnum },
        parser: new AbiParser1([getAbiEntry('core::option::Option::<core::bool>')]),
      });
      expect(parsedField).toEqual(['0', '27988542884245108']);
    });

    test('should throw an error for Enum Option has no "Some" variant', () => {
      const args = [new CairoOption<string>(0, 'content')];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('core::option::Option::core::bool'),
          structs: getAbiStructs(),
          enums: { 'core::option::Option::core::bool': getAbiEnums().enum },
          parser: new AbiParser1([getAbiEntry('core::option::Option::core::bool')]),
        })
      ).toThrow(
        new Error(`ABI type core::option::Option::core::bool do not includes a valid type of data.`)
      );
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
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::result::Result::core::bool'),
        structs: getAbiStructs(),
        enums: { 'core::result::Result::core::bool': abiEnum },
        parser: new AbiParser1([getAbiEntry('core::result::Result::core::bool')]),
      });
      expect(parsedField).toEqual(['0x0', '0x4f6b']);
    });

    test('should throw an error for Enum Result has no "Ok" variant', () => {
      const args = [new CairoResult<string, string>(0, 'Ok')];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('core::result::Result::core::bool'),
          structs: getAbiStructs(),
          enums: { 'core::result::Result::core::bool': getAbiEnums().enum },
          parser: new AbiParser1([getAbiEntry('core::result::Result::core::bool')]),
        })
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
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('enum'),
        structs: getAbiStructs(),
        enums: { enum: abiEnum },
        parser: new AbiParser1([getAbiEntry('enum')]),
      });
      expect(parsedField).toEqual(['0x1', '0x636f6e74656e74']);
    });

    test('should throw an error for Custom Enum type when there is not active variant', () => {
      const args = [new CairoCustomEnum({ test: 'content' })];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('enum'),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry('enum')]),
        })
      ).toThrow(new Error(`Not find in abi : Enum has no 'test' variant.`));
    });

    test('should throw an error for CairoUint256 abi type when wrong arg is provided', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('core::integer::u256'),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry('core::integer::u256')]),
        })
      ).toThrow(
        new Error(
          "Unsupported data type 'string' for u256. Expected string, number, bigint, or Uint256 object"
        )
      );
    });

    test('should throw an error if provided tuple size do not match', () => {
      const args = [{ min: true }, { max: true }];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('(core::bool, core::bool)'),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry('(core::bool, core::bool)')]),
        })
      ).toThrow(new Error('"core::bool,core::bool" is not a valid Cairo type'));
    });

    test('should throw an error if there is missing parameter for type Struct', () => {
      const args = ['test'];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('struct'),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry('struct')]),
        })
      ).toThrow(new Error('Missing parameter for type test_type'));
    });

    test('should throw an error if args for array type are not valid', () => {
      const args = [256n, 128n];
      const argsIterator = args[Symbol.iterator]();
      expect(() =>
        parseCalldataField({
          argsIterator,
          input: getAbiEntry('core::array::Array::<felt>'),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry('core::array::Array::<felt>')]),
        })
      ).toThrow(new Error('ABI expected parameter test to be array or long string, got 256'));
    });
  });
});
