import { parseCalldataField } from '../../../src/utils/calldata/requestParser';
import { getAbiEnums, getAbiStructs, getAbiEntry } from '../../factories/abi';
import { CairoOption, ETH_ADDRESS, NON_ZERO_PREFIX } from '../../../src';

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

    test('should return parsed calldata field for Enum type', () => {
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
