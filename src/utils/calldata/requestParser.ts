import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  AllowArray,
  BigNumberish,
  CairoEnum,
  ParsedStruct,
  Tupled,
} from '../../types';
import assert from '../assert';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../cairoDataTypes/bytes31';
import { CairoFelt252 } from '../cairoDataTypes/felt';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { CairoUint8 } from '../cairoDataTypes/uint8';
import { CairoUint16 } from '../cairoDataTypes/uint16';
import { CairoUint64 } from '../cairoDataTypes/uint64';
import { CairoUint96 } from '../cairoDataTypes/uint96';
import { CairoUint128 } from '../cairoDataTypes/uint128';
import { CairoInt8 } from '../cairoDataTypes/int8';
import { CairoInt16 } from '../cairoDataTypes/int16';
import { CairoInt32 } from '../cairoDataTypes/int32';
import { CairoInt64 } from '../cairoDataTypes/int64';
import { CairoInt128 } from '../cairoDataTypes/int128';
import { unwrapCairoScalar } from '../cairoDataTypes/scalar';
import { addHexPrefix, buf2hex, removeHexPrefix, utf8ToUint8Array } from '../encode';
import { toHex } from '../num';
import { isText, splitLongString } from '../shortString';
import { isUndefined } from '../typed';
import {
  felt,
  getArrayType,
  isTypeArray,
  isTypeEnum,
  isTypeEthAddress,
  isTypeFelt,
  isTypeNonZero,
  isTypeOption,
  isTypeResult,
  isTypeSecp256k1Point,
  isTypeStruct,
  isTypeTuple,
  uint256,
} from './cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import { AbiParserInterface } from './parser';
import extractTupleMemberTypes from './tuple';

// TODO: cleanup implementations to work with unknown, instead of blind casting with 'as'

/**
 * Test if a long string can be provided in place of an array of values.
 * Only an array of felt252 can be filled this way, as a felt252 holds up to 31 characters of text.
 * @param {string} type type from abi
 * @returns {boolean} Returns true if a long string is a valid input for this type
 * @example
 * ```typescript
 * const result = acceptsLongString('core::array::Array::<core::felt252>');
 * // result = true
 * const result2 = acceptsLongString('core::array::Array::<core::integer::u8>');
 * // result2 = false
 * ```
 */
function acceptsLongString(type: string): boolean {
  return isTypeArray(type) && isTypeFelt(getArrayType(type));
}

/**
 * Convert a long string to the array of felt252 that Cairo is expecting.
 * Each chunk is encoded to its explicit hex value : the value has already been identified as text,
 * so a chunk that looks like a number ('67') or like a hex string ('0x12') has to stay text.
 * @param {string} longStr text to convert
 * @returns {string[]} an array of hex strings, one per chunk of 31 characters
 * @example
 * ```typescript
 * const result = longStringToFeltArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567');
 * // result = [
 * //   '0x4142434445464748494a4b4c4d4e4f505152535455565758595a3132333435',
 * //   '0x3637'
 * // ]
 * ```
 */
function longStringToFeltArray(longStr: string): string[] {
  return splitLongString(longStr).map((chunk) => addHexPrefix(buf2hex(utf8ToUint8Array(chunk))));
}

/**
 * Build the message of the error thrown when an array type receives an unusable value
 * @param {string} subject faulty input, as described in the error message
 * @param {string} type type from abi
 * @param {unknown} value value provided
 * @returns {string} the error message
 * @example
 * ```typescript
 * const result = arrayInputErrorMessage('parameter tokens', 'core::array::Array::<core::integer::u8>', 'abc');
 * // result = "ABI expected parameter tokens to be array, got abc"
 * ```
 */
function arrayInputErrorMessage(subject: string, type: string, value: unknown): string {
  const expected = acceptsLongString(type) ? 'array or long string' : 'array';
  return `ABI expected ${subject} to be ${expected}, got ${value}`;
}

/**
 * parse base types
 * @param type type from abi
 * @param val value provided
 * @returns string | string[]
 */
function parseBaseTypes({
  type,
  val: rawVal,
  parser,
}: {
  type: string;
  val: unknown;
  parser: AbiParserInterface;
}): AllowArray<string> {
  // an instance of the very type declared here stands for the number it carries, so a value the
  // caller has already typed is read exactly like a bare one. Every base type passes through here
  const val = unwrapCairoScalar(rawVal, type);
  switch (true) {
    case CairoUint256.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint512.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint8.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint16.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint64.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint96.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint128.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt8.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt16.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt32.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt64.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt128.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoBytes31.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case isTypeSecp256k1Point(type): {
      const pubKeyETH = removeHexPrefix(toHex(val as BigNumberish)).padStart(128, '0');
      const pubKeyETHy = uint256(addHexPrefix(pubKeyETH.slice(-64)));
      const pubKeyETHx = uint256(addHexPrefix(pubKeyETH.slice(0, -64)));
      return [
        felt(pubKeyETHx.low),
        felt(pubKeyETHx.high),
        felt(pubKeyETHy.low),
        felt(pubKeyETHy.high),
      ];
    }
    default:
      // TODO: check but u32 should land here with rest of the simple types, at the moment handle as felt
      return parser.getRequestParser(CairoFelt252.abiSelector)(val);
  }
}

/**
 * Parse tuple type string to array of known objects
 * @param element request element
 * @param typeStr tuple type string
 * @returns Tupled[]
 */
function parseTuple(element: object, typeStr: string): Tupled[] {
  const memberTypes = extractTupleMemberTypes(typeStr);
  const elements = Object.values(element);

  if (elements.length !== memberTypes.length) {
    throw Error(
      `ParseTuple: provided and expected abi tuple size do not match.
      provided: ${elements}
      expected: ${memberTypes}`
    );
  }

  return memberTypes.map((it: any, dx: number) => {
    return {
      element: elements[dx],
      type: it.type ?? it,
    };
  });
}

/**
 * Deep parse of the object that has been passed to the method
 *
 * @param element - element that needs to be parsed
 * @param type  - name of the method
 * @param structs - structs from abi
 * @param enums - enums from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 */
function parseCalldataValue({
  element,
  type,
  structs,
  enums,
  parser,
}: {
  element: unknown;
  type: string;
  structs: AbiStructs;
  enums: AbiEnums;
  parser: AbiParserInterface;
}): string | string[] {
  if (element === undefined) {
    throw Error(`Missing parameter for type ${type}`);
  }

  // value is fixed array
  if (CairoFixedArray.isTypeFixedArray(type)) {
    const arrayType = CairoFixedArray.getFixedArrayType(type);
    let values: any[] = [];
    if (Array.isArray(element)) {
      const array = new CairoFixedArray(element, type);
      values = array.content;
    } else if (typeof element === 'object') {
      // an instance holds its items in `content`; enumerating it would yield its two fields
      // instead. The size is still checked against the abi, whose type prevails over the
      // instance's own
      values =
        element instanceof CairoFixedArray ? element.content : Object.values(element as object);
      assert(
        values.length === CairoFixedArray.getFixedArraySize(type),
        `ABI type ${type}: object provided do not includes  ${CairoFixedArray.getFixedArraySize(type)} items. ${values.length} items provided.`
      );
    } else {
      throw new Error(`ABI type ${type}: not an Array representing a cairo.fixedArray() provided.`);
    }
    return values.reduce((acc, it) => {
      return acc.concat(
        parseCalldataValue({ element: it, type: arrayType, structs, enums, parser })
      );
    }, [] as string[]);
  }

  // value is a long string provided in place of an Array<felt252>, at any depth
  if (isTypeArray(type) && !Array.isArray(element)) {
    if (!acceptsLongString(type) || !isText(element)) {
      throw Error(arrayInputErrorMessage(`type ${type}`, type, element));
    }
    return parseCalldataValue({
      element: longStringToFeltArray(element),
      type,
      structs,
      enums,
      parser,
    });
  }

  // value is Array
  if (Array.isArray(element)) {
    const result: string[] = [];
    result.push(felt(element.length)); // Add length to array
    const arrayType = getArrayType(type);

    return element.reduce((acc, it) => {
      return acc.concat(
        parseCalldataValue({ element: it, type: arrayType, structs, enums, parser })
      );
    }, result);
  }

  // check if u256 C1v0
  if (CairoUint256.isAbiType(type)) {
    return parser.getRequestParser(type)(element);
  }
  // check if u512
  if (CairoUint512.isAbiType(type)) {
    return parser.getRequestParser(type)(element);
  }

  // checking if the passed element is struct
  if (structs[type] && structs[type].members.length) {
    if (isTypeEthAddress(type)) {
      return parseBaseTypes({ type, val: element as BigNumberish, parser });
    }

    if (CairoByteArray.isAbiType(type)) {
      return parser.getRequestParser(type)(element);
    }

    const { members } = structs[type];
    const subElement = element as any;

    return members.reduce((acc, it: AbiEntry) => {
      return acc.concat(
        parseCalldataValue({
          element: subElement[it.name],
          type: it.type,
          structs,
          enums,
          parser,
        })
      );
    }, [] as string[]);
  }
  // check if abi element is tuple
  if (isTypeTuple(type)) {
    const tupled = parseTuple(element as object, type);

    return tupled.reduce((acc, it: Tupled) => {
      const parsedData = parseCalldataValue({
        element: it.element,
        type: it.type,
        structs,
        enums,
        parser,
      });
      return acc.concat(parsedData);
    }, [] as string[]);
  }

  // check if Enum
  if (isTypeEnum(type, enums)) {
    const { variants } = enums[type];
    // Option Enum
    if (isTypeOption(type)) {
      const myOption = element as CairoOption<any>;
      if (myOption.isSome()) {
        const listTypeVariant = variants.find((variant) => variant.name === 'Some');
        if (isUndefined(listTypeVariant)) {
          throw Error(`Error in abi : Option has no 'Some' variant.`);
        }
        const typeVariantSome = listTypeVariant.type;
        if (typeVariantSome === '()') {
          return CairoOptionVariant.Some.toString();
        }
        const parsedParameter = parseCalldataValue({
          element: myOption.unwrap(),
          type: typeVariantSome,
          structs,
          enums,
          parser,
        });
        if (Array.isArray(parsedParameter)) {
          return [CairoOptionVariant.Some.toString(), ...parsedParameter];
        }
        return [CairoOptionVariant.Some.toString(), parsedParameter];
      }
      return CairoOptionVariant.None.toString();
    }
    // Result Enum
    if (isTypeResult(type)) {
      const myResult = element as CairoResult<any, any>;
      if (myResult.isOk()) {
        const listTypeVariant = variants.find((variant) => variant.name === 'Ok');
        if (isUndefined(listTypeVariant)) {
          throw Error(`Error in abi : Result has no 'Ok' variant.`);
        }
        const typeVariantOk = listTypeVariant.type;
        if (typeVariantOk === '()') {
          return CairoResultVariant.Ok.toString();
        }
        const parsedParameter = parseCalldataValue({
          element: myResult.unwrap(),
          type: typeVariantOk,
          structs,
          enums,
          parser,
        });
        if (Array.isArray(parsedParameter)) {
          return [CairoResultVariant.Ok.toString(), ...parsedParameter];
        }
        return [CairoResultVariant.Ok.toString(), parsedParameter];
      }

      // is Result::Err
      const listTypeVariant = variants.find((variant) => variant.name === 'Err');
      if (isUndefined(listTypeVariant)) {
        throw Error(`Error in abi : Result has no 'Err' variant.`);
      }
      const typeVariantErr = listTypeVariant.type;
      if (typeVariantErr === '()') {
        return CairoResultVariant.Err.toString();
      }
      const parsedParameter = parseCalldataValue({
        element: myResult.unwrap(),
        type: typeVariantErr,
        structs,
        enums,
        parser,
      });
      if (Array.isArray(parsedParameter)) {
        return [CairoResultVariant.Err.toString(), ...parsedParameter];
      }
      return [CairoResultVariant.Err.toString(), parsedParameter];
    }
    // Custom Enum
    const myEnum = element as CairoCustomEnum;
    const activeVariant: string = myEnum.activeVariant();
    const listTypeVariant = variants.find((variant) => variant.name === activeVariant);
    if (isUndefined(listTypeVariant)) {
      throw Error(`Not find in abi : Enum has no '${activeVariant}' variant.`);
    }
    const typeActiveVariant = listTypeVariant.type;
    const numActiveVariant = variants.findIndex((variant) => variant.name === activeVariant); // can not fail due to check of listTypeVariant
    if (typeActiveVariant === '()') {
      return numActiveVariant.toString();
    }
    const parsedParameter = parseCalldataValue({
      element: myEnum.unwrap(),
      type: typeActiveVariant,
      structs,
      enums,
      parser,
    });
    if (Array.isArray(parsedParameter)) {
      return [numActiveVariant.toString(), ...parsedParameter];
    }
    return [numActiveVariant.toString(), parsedParameter];
  }

  if (isTypeNonZero(type)) {
    return parseBaseTypes({ type: getArrayType(type), val: element, parser });
  }

  // reached at any depth: a one-felt instance of the declared type is a value, not a composite to
  // be walked into, so it is reduced before this guard rather than refused by it
  const scalar = unwrapCairoScalar(element, type);
  // a bytes31 stays an instance rather than becoming a number, and is the only Cairo type to reach
  // this guard as one — ByteArray, u256, u512 and fixed arrays all return above. Its own class
  // reads it just below
  if (typeof scalar === 'object' && !(scalar instanceof CairoBytes31)) {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return parseBaseTypes({ type, val: scalar, parser });
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 *
 * @example
 * const abiEntry = { name: 'test', type: 'struct' };
 * const abiStructs: AbiStructs = {
 *  struct: {
 *    members: [
 *        {
 *          name: 'test_name',
 *          type: 'test_type',
 *          offset: 1,
 *        },
 *    ],
 *    size: 2,
 *    name: 'cairo__struct',
 *    type: 'struct',
 *   },
 * };
 *
 * const abiEnums: AbiEnums = {
 *   enum: {
 *     variants: [
 *       {
 *         name: 'test_name',
 *         type: 'cairo_struct_variant',
 *         offset: 1,
 *       },
 *     ],
 *     size: 2,
 *     name: 'test_cairo',
 *     type: 'enum',
 *   },
 * };
 *
 * const args = [{ test_name: 'test' }];
 * const argsIterator = args[Symbol.iterator]();
 * const parsedField = parseCalldataField(
 *   argsIterator,
 *   abiEntry,
 *   abiStructs,
 *   abiEnums
 * );
 * // parsedField === ['1952805748']
 */
export function parseCalldataField({
  argsIterator,
  input,
  structs,
  enums,
  parser,
}: {
  /** Iterator for value of the field */
  argsIterator: Iterator<any>;
  /** input(field) information from the abi that will be used to parse the data */
  input: AbiEntry;
  /** structs from abi */
  structs: AbiStructs;
  /** enums from abi */
  enums: AbiEnums;
  /** parser used to serialize the value */
  parser: AbiParserInterface;
}): string | string[] {
  const { name, type } = input;
  const { value } = argsIterator.next();

  switch (true) {
    // Fixed array
    case CairoFixedArray.isTypeFixedArray(type):
      if (!Array.isArray(value) && !(typeof value === 'object')) {
        throw Error(`ABI expected parameter ${name} to be an array or an object, got ${value}`);
      }
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    // Normal Array
    case isTypeArray(type):
      if (!Array.isArray(value) && !(acceptsLongString(type) && isText(value))) {
        throw Error(arrayInputErrorMessage(`parameter ${name}`, type, value));
      }
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    case isTypeNonZero(type):
      return parseBaseTypes({ type: getArrayType(type), val: value, parser });
    case isTypeEthAddress(type):
      return parseBaseTypes({ type, val: value, parser });
    // Struct or Tuple
    case isTypeStruct(type, structs) || isTypeTuple(type) || CairoUint256.isAbiType(type):
      return parseCalldataValue({
        element: value as ParsedStruct | BigNumberish[],
        type,
        structs,
        enums,
        parser,
      });

    // Enums
    case isTypeEnum(type, enums):
      return parseCalldataValue({
        element: value as CairoOption<any> | CairoResult<any, any> | CairoEnum,
        type,
        structs,
        enums,
        parser,
      });

    // Felt or unhandled
    default:
      return parseBaseTypes({ type, val: value, parser });
  }
}
