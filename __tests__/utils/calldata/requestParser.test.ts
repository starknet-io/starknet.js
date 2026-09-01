import { parseCalldataField } from '../../../src/utils/calldata/requestParser';
import { getAbiEnums, getAbiStructs, getAbiEntry } from '../../factories/abi';
import {
  Abi,
  AbiParser1,
  CairoByteArray,
  CairoBytes31,
  CairoCustomEnum,
  CairoOption,
  CairoResult,
  CallData,
  ETH_ADDRESS,
  NON_ZERO_PREFIX,
  ValidateType,
} from '../../../src';
import { byteArrayFromString } from '../../../src/utils/calldata/byteArray';
import { ABI as StringABI } from '../../../__mocks__/cairo/cairo240/string';

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
      expect(parsedField).toEqual(['256']);
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
      expect(parsedField).toEqual(['2', '256', '128']);
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
      expect(parsedField).toEqual(['1', '599374153440608178282648329058547045']);
    });

    describe('long string in place of an Array<felt252>', () => {
      // 33 characters : the split isolates a chunk that looks like a decimal number
      const longText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567';
      // 37 characters : the split isolates a chunk that looks like a hex string
      const longTextHex = `${'A'.repeat(31)}0x1234`;
      const firstChunk =
        '115302387975643577911206786302384344998065844015382184106956994275072750645';
      const firstChunkHex =
        '115295431991813000957906158479851623934781694290236468482915792900036051265';

      const parse = (type: string, value: unknown) =>
        parseCalldataField({
          argsIterator: [value][Symbol.iterator](),
          input: getAbiEntry(type),
          structs: getAbiStructs(),
          enums: getAbiEnums(),
          parser: new AbiParser1([getAbiEntry(type)]),
        });

      test('should encode a chunk that looks like a number as text', () => {
        expect(parse('core::array::Array::<core::felt252>', longText)).toEqual([
          '2',
          firstChunk,
          '13879', // '67' encoded as text, not as the number 67
        ]);
      });

      test('should encode a chunk that looks like a hex string as text', () => {
        expect(parse('core::array::Array::<core::felt252>', longTextHex)).toEqual([
          '2',
          firstChunkHex,
          '53292779582260', // '0x1234' encoded as text, not as the number 4660
        ]);
      });

      test('should not convert the items of an array provided by the caller', () => {
        expect(parse('core::array::Array::<core::felt252>', ['67'])).toEqual(['1', '67']);
      });

      test('should convert a long string in a struct member', () => {
        expect(parse('struct_with_felt_array', { felt_array: longText })).toEqual([
          '2',
          firstChunk,
          '13879',
        ]);
      });

      test('should convert a long string in a tuple member', () => {
        expect(
          parse('(core::array::Array::<core::felt252>, core::felt252)', { 0: longText, 1: 5 })
        ).toEqual(['2', firstChunk, '13879', '5']);
      });

      test('should convert a long string in an array of arrays', () => {
        expect(
          parse('core::array::Array::<core::array::Array::<core::felt252>>', [longText])
        ).toEqual(['1', '2', firstChunk, '13879']);
      });

      test('should convert a long string in an enum variant', () => {
        expect(
          parse(
            'core::option::Option::<core::array::Array::<core::felt252>>',
            new CairoOption<string>(0, longText)
          )
        ).toEqual(['0', '2', firstChunk, '13879']);
      });

      test('should throw when the array is not an array of felt252', () => {
        expect(() => parse('core::array::Array::<core::integer::u8>', longText)).toThrow(
          new Error(`ABI expected parameter test to be array, got ${longText}`)
        );
      });

      test('should throw when a nested array is not an array of felt252', () => {
        expect(() =>
          parse('core::array::Array::<core::array::Array::<core::integer::u8>>', [longText])
        ).toThrow(
          new Error(
            `ABI expected type core::array::Array::<core::integer::u8> to be array, got ${longText}`
          )
        );
      });

      test('should throw when a struct member is not an array of felt252', () => {
        expect(() => parse('struct_with_u8_array', { u8_array: longText })).toThrow(
          new Error(
            `ABI expected type core::array::Array::<core::integer::u8> to be array, got ${longText}`
          )
        );
      });
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
      expect(parsedField).toEqual(['1']);
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
      expect(parsedField).toEqual(['1952805748']);
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
      expect(parsedField).toEqual(['1952805748']);
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
        input: getAbiEntry('core::option::Option::core::bool'),
        structs: getAbiStructs(),
        enums: { 'core::option::Option::core::bool': getAbiEnums().enum },
        parser: new AbiParser1([getAbiEntry('core::option::Option::core::bool')]),
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
        input: getAbiEntry('core::option::Option::core::bool'),
        structs: getAbiStructs(),
        enums: { 'core::option::Option::core::bool': abiEnum },
        parser: new AbiParser1([getAbiEntry('core::option::Option::core::bool')]),
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
      const parsedField = parseCalldataField({
        argsIterator,
        input: getAbiEntry('core::result::Result::core::bool'),
        structs: getAbiStructs(),
        enums: { 'core::result::Result::core::bool': abiEnum },
        parser: new AbiParser1([getAbiEntry('core::result::Result::core::bool')]),
      });
      expect(parsedField).toEqual(['0', '20331']);
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
      expect(parsedField).toEqual(['1', '27988542884245108']);
    });

    test('should throw an error for Custon Enum type when there is not active variant', () => {
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
          "Unsupported data type 'string' for u256. Expected a numeric string (decimal or hexadecimal), number, bigint, or Uint256 object"
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

  describe('a text that spells a number, through the abi', () => {
    // proceed_string(mess: core::byte_array::ByteArray) and proceed_bytes31(str: bytes31),
    // taken from the compiled test contract rather than from a hand-written abi
    const stringCallData = new CallData(StringABI as Abi);

    // Buffer.from('12345', 'utf8').toString('hex') is '3132333435', whose BigInt is this
    const textFelt = '211295614005';

    test('should keep reading a bare string the way calldata does', () => {
      // '12345' is the decimal number 12345, whose two bytes 0x30 0x39 spell the text '09'
      expect(stringCallData.compile('proceed_string', ['12345'])).toEqual(['0', '12345', '2']);
      expect(stringCallData.compile('proceed_bytes31', ['12345'])).toEqual(['12345']);
    });

    test('should send the text itself when it is built with fromText', () => {
      expect(stringCallData.compile('proceed_string', [CairoByteArray.fromText('12345')])).toEqual([
        '0',
        textFelt,
        '5',
      ]);
      expect(stringCallData.compile('proceed_bytes31', [CairoBytes31.fromText('12345')])).toEqual([
        textFelt,
      ]);
    });

    test('should accept the object returned by byteArrayFromString', () => {
      expect(stringCallData.compile('proceed_string', [byteArrayFromString('12345')])).toEqual([
        '0',
        textFelt,
        '5',
      ]);
    });

    test('should pass the validation a contract call runs before compiling', () => {
      expect(() =>
        stringCallData.validate(ValidateType.CALL, 'proceed_string', [
          CairoByteArray.fromText('12345'),
        ])
      ).not.toThrow();
      expect(() =>
        stringCallData.validate(ValidateType.CALL, 'proceed_bytes31', [
          CairoBytes31.fromText('12345'),
        ])
      ).not.toThrow();
    });

    test('should validate and compile named arguments in a single call', () => {
      // named arguments are the only form that validates from inside compile
      expect(
        stringCallData.compile('proceed_string', { mess: CairoByteArray.fromText('12345') })
      ).toEqual(['0', textFelt, '5']);
      expect(
        stringCallData.compile('proceed_bytes31', { str: CairoBytes31.fromText('12345') })
      ).toEqual([textFelt]);
    });

    describe('at any abi depth', () => {
      // no compiled contract of the repository exposes a nested ByteArray, so the two nesting
      // cases are declared on top of the real abi - the ByteArray struct itself still comes
      // from the contract, it is not written again here
      const nestedCallData = new CallData([
        ...StringABI,
        {
          type: 'struct',
          name: 'string::string::Labelled',
          members: [
            { name: 'label', type: 'core::byte_array::ByteArray' },
            { name: 'n', type: 'core::integer::u8' },
          ],
        },
        {
          type: 'function',
          name: 'proceed_labelled',
          inputs: [{ name: 'item', type: 'string::string::Labelled' }],
          outputs: [],
          state_mutability: 'view',
        },
        {
          type: 'function',
          name: 'proceed_many',
          inputs: [{ name: 'items', type: 'core::array::Array::<core::byte_array::ByteArray>' }],
          outputs: [],
          state_mutability: 'view',
        },
      ] as Abi);

      test('should reach a ByteArray held by a struct member', () => {
        expect(
          nestedCallData.compile('proceed_labelled', [
            { label: CairoByteArray.fromText('12345'), n: 1 },
          ])
        ).toEqual(['0', textFelt, '5', '1']);
      });

      test('should reach a ByteArray held by an array', () => {
        expect(
          nestedCallData.compile('proceed_many', [[CairoByteArray.fromText('12345')]])
        ).toEqual(['1', '0', textFelt, '5']);
      });

      test('should reach a byteArrayFromString object held by an array', () => {
        expect(
          nestedCallData.compile('proceed_many', { items: [byteArrayFromString('12345')] })
        ).toEqual(['1', '0', textFelt, '5']);
      });
    });
  });
});
