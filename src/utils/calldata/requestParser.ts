import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  AllowArray,
  BigNumberish,
  ByteArray,
  CairoEnum,
  ParsedStruct,
  Tupled,
} from '../../types';
import assert from '../assert';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { addHexPrefix, removeHexPrefix } from '../encode';
import { toHex } from '../num';
import { encodeShortString, isText, splitLongString } from '../shortString';
import { isUndefined, isString } from '../typed';
import { byteArrayFromString } from './byteArray';
import {
  felt,
  getArrayType,
  isTypeArray,
  isTypeByteArray,
  isTypeBytes31,
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
import extractTupleMemberTypes from './tuple';

/**
 * parse base types
 * @param type type from abi
 * @param val value provided
 * @returns string | string[]
 */
function parseBaseTypes(type: string, val: BigNumberish): AllowArray<string> {
  switch (true) {
    case CairoUint256.isAbiType(type):
      return new CairoUint256(val).toApiRequest();
    case CairoUint512.isAbiType(type):
      return new CairoUint512(val).toApiRequest();
    case isTypeBytes31(type):
      return encodeShortString(val.toString());
    case isTypeSecp256k1Point(type): {
      const pubKeyETH = removeHexPrefix(toHex(val)).padStart(128, '0');
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
      return felt(val);
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

function parseByteArray(element: string): string[] {
  const myByteArray: ByteArray = byteArrayFromString(element);
  return [
    myByteArray.data.length.toString(),
    ...myByteArray.data.map((bn) => bn.toString()),
    myByteArray.pending_word.toString(),
    myByteArray.pending_word_len.toString(),
  ];
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
function parseCalldataValue(
  element:
    | ParsedStruct
    | BigNumberish
    | BigNumberish[]
    | CairoOption<any>
    | CairoResult<any, any>
    | CairoEnum,
  type: string,
  structs: AbiStructs,
  enums: AbiEnums
): string | string[] {
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
      values = Object.values(element);
      assert(
        values.length === CairoFixedArray.getFixedArraySize(type),
        `ABI type ${type}: object provided do not includes  ${CairoFixedArray.getFixedArraySize(type)} items. ${values.length} items provided.`
      );
    } else {
      throw new Error(`ABI type ${type}: not an Array representing a cairo.fixedArray() provided.`);
    }
    return values.reduce((acc, it) => {
      return acc.concat(parseCalldataValue(it, arrayType, structs, enums));
    }, [] as string[]);
  }

  // value is Array
  if (Array.isArray(element)) {
    const result: string[] = [];
    result.push(felt(element.length)); // Add length to array
    const arrayType = getArrayType(type);

    return element.reduce((acc, it) => {
      return acc.concat(parseCalldataValue(it, arrayType, structs, enums));
    }, result);
  }

  // checking if the passed element is struct
  if (structs[type] && structs[type].members.length) {
    if (CairoUint256.isAbiType(type)) {
      return new CairoUint256(element as any).toApiRequest();
    }
    if (CairoUint512.isAbiType(type)) {
      return new CairoUint512(element as any).toApiRequest();
    }
    if (isTypeEthAddress(type)) return parseBaseTypes(type, element as BigNumberish);

    if (isTypeByteArray(type)) return parseByteArray(element as string);

    const { members } = structs[type];
    const subElement = element as any;

    return members.reduce((acc, it: AbiEntry) => {
      return acc.concat(parseCalldataValue(subElement[it.name], it.type, structs, enums));
    }, [] as string[]);
  }
  // check if abi element is tuple
  if (isTypeTuple(type)) {
    const tupled = parseTuple(element as object, type);

    return tupled.reduce((acc, it: Tupled) => {
      const parsedData = parseCalldataValue(it.element, it.type, structs, enums);
      return acc.concat(parsedData);
    }, [] as string[]);
  }
  // check if u256 C1v0
  if (CairoUint256.isAbiType(type)) {
    return new CairoUint256(element as any).toApiRequest();
  }
  // check if u512
  if (CairoUint512.isAbiType(type)) {
    return new CairoUint512(element as any).toApiRequest();
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
        const parsedParameter = parseCalldataValue(
          myOption.unwrap(),
          typeVariantSome,
          structs,
          enums
        );
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
        const parsedParameter = parseCalldataValue(
          myResult.unwrap(),
          typeVariantOk,
          structs,
          enums
        );
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
      const parsedParameter = parseCalldataValue(myResult.unwrap(), typeVariantErr, structs, enums);
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
    const parsedParameter = parseCalldataValue(myEnum.unwrap(), typeActiveVariant, structs, enums);
    if (Array.isArray(parsedParameter)) {
      return [numActiveVariant.toString(), ...parsedParameter];
    }
    return [numActiveVariant.toString(), parsedParameter];
  }

  if (isTypeNonZero(type)) {
    return parseBaseTypes(getArrayType(type), element as BigNumberish);
  }

  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return parseBaseTypes(type, element);
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
export function parseCalldataField(
  argsIterator: Iterator<any>,
  input: AbiEntry,
  structs: AbiStructs,
  enums: AbiEnums
): string | string[] {
  const { name, type } = input;
  let { value } = argsIterator.next();

  switch (true) {
    // Fixed array
    case CairoFixedArray.isTypeFixedArray(type):
      if (!Array.isArray(value) && !(typeof value === 'object')) {
        throw Error(`ABI expected parameter ${name} to be an array or an object, got ${value}`);
      }
      return parseCalldataValue(value, input.type, structs, enums);
    // Normal Array
    case isTypeArray(type):
      if (!Array.isArray(value) && !isText(value)) {
        throw Error(`ABI expected parameter ${name} to be array or long string, got ${value}`);
      }
      if (isString(value)) {
        // long string match cairo felt*
        value = splitLongString(value);
      }
      return parseCalldataValue(value, input.type, structs, enums);
    case isTypeNonZero(type):
      return parseBaseTypes(getArrayType(type), value);
    case isTypeEthAddress(type):
      return parseBaseTypes(type, value);
    // Struct or Tuple
    case isTypeStruct(type, structs) || isTypeTuple(type) || CairoUint256.isAbiType(type):
      return parseCalldataValue(value as ParsedStruct | BigNumberish[], type, structs, enums);

    // Enums
    case isTypeEnum(type, enums):
      return parseCalldataValue(
        value as CairoOption<any> | CairoResult<any, any> | CairoEnum,
        type,
        structs,
        enums
      );

    // Felt or unhandled
    default:
      return parseBaseTypes(type, value);
  }
}
