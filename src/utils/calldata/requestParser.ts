import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  AllowArray,
  BigNumberish,
  CairoEnum,
  ParsedStruct,
} from '../../types';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../cairoDataTypes/bytes31';
import { CairoFelt252 } from '../cairoDataTypes/felt';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoArray } from '../cairoDataTypes/array';
import { CairoTuple } from '../cairoDataTypes/tuple';
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
import { addHexPrefix, removeHexPrefix } from '../encode';
import { toHex } from '../num';
import { isText, splitLongString } from '../shortString';
import { isUndefined, isString } from '../typed';
import {
  felt,
  getArrayType,
  isTypeArray,
  isTypeEnum,
  isTypeEthAddress,
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

// TODO: cleanup implementations to work with unknown, instead of blind casting with 'as'

/**
 * parse base types
 * @param type type from abi
 * @param val value provided
 * @returns string | string[]
 */
function parseBaseTypes({
  type,
  val,
  parser,
}: {
  type: string;
  val: unknown;
  parser: AbiParserInterface;
}): AllowArray<string> {
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
  if (CairoFixedArray.isAbiType(type)) {
    return parser.getRequestParser(CairoFixedArray.dynamicSelector)(element, type);
  }

  // value is CairoArray instance
  if (element instanceof CairoArray) {
    return element.toApiRequest();
  }

  // value is CairoTuple instance
  if (element instanceof CairoTuple) {
    return element.toApiRequest();
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
    // Create CairoTuple instance and use its toApiRequest method
    const tuple = new CairoTuple(element, type, parser.parsingStrategy);
    return tuple.toApiRequest();
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

  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return parseBaseTypes({ type, val: element, parser });
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @param argsIterator - Iterator for value of the field
 * @param input  - input(field) information from the abi that will be used to parse the data
 * @param structs - structs from abi
 * @param enums - enums from abi
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
  argsIterator: Iterator<any>;
  input: AbiEntry;
  structs: AbiStructs;
  enums: AbiEnums;
  parser: AbiParserInterface;
}): string | string[] {
  const { name, type } = input;
  let { value } = argsIterator.next();

  switch (true) {
    // Fixed array
    case CairoFixedArray.isAbiType(type):
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    // Normal Array
    case isTypeArray(type):
      if (value instanceof CairoArray) {
        return value.toApiRequest();
      }
      if (!Array.isArray(value) && !isText(value)) {
        throw Error(`ABI expected parameter ${name} to be array or long string, got ${value}`);
      }
      if (isString(value)) {
        // long string match cairo felt*
        value = splitLongString(value);
      }
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    case isTypeNonZero(type):
      return parseBaseTypes({ type: getArrayType(type), val: value, parser });
    case isTypeEthAddress(type):
      return parseBaseTypes({ type, val: value, parser });
    // CairoTuple instance
    case value instanceof CairoTuple:
      return value.toApiRequest();
    // Tuple type - create CairoTuple from raw input
    case isTypeTuple(type): {
      const tuple = new CairoTuple(value, type, parser.parsingStrategy);
      return tuple.toApiRequest();
    }
    // Struct
    case isTypeStruct(type, structs) || CairoUint256.isAbiType(type):
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
