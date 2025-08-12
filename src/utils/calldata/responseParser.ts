/* eslint-disable no-case-declarations */
import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  Args,
  BigNumberish,
  CairoEnum,
  EventEntry,
  ParsedStruct,
} from '../../types';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../cairoDataTypes/bytes31';
import { CairoFelt252 } from '../cairoDataTypes/felt';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { addHexPrefix, removeHexPrefix } from '../encode';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeBool,
  isTypeEnum,
  isTypeEthAddress,
  isTypeNonZero,
  isTypeSecp256k1Point,
  isTypeTuple,
} from './cairo';
import {
  CairoCustomEnum,
  CairoEnumRaw,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import { AbiParserInterface } from './parser/interface';
import extractTupleMemberTypes from './tuple';

/**
 * Parse base types
 * @param type type of element
 * @param it iterator
 * @returns bigint | boolean
 */
function parseBaseTypes(type: string, it: Iterator<string>, parser: AbiParserInterface) {
  let temp;
  switch (true) {
    case isTypeBool(type):
      temp = it.next().value;
      return Boolean(BigInt(temp));
    case CairoUint256.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint512.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case isTypeEthAddress(type):
      temp = it.next().value;
      return BigInt(temp);
    case CairoBytes31.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case isTypeSecp256k1Point(type):
      const xLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const xHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const yLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const yHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const pubK = BigInt(addHexPrefix(xHigh + xLow + yHigh + yLow));
      return pubK;
    default:
      // TODO: this is for all simple types felt and rest to BN, at the moment handle as felt
      return parser.getResponseParser(CairoFelt252.abiSelector)(it);
  }
}

/**
 * Parse of the response elements that are converted to Object (Struct) by using the abi
 *
 * @param responseIterator - iterator of the response
 * @param element - element of the field {name: string, type: string}
 * @param structs - structs from abi
 * @param enums
 * @return {any} - parsed arguments in format that contract is expecting
 */
function parseResponseValue(
  responseIterator: Iterator<string>,
  element: { name: string; type: string },
  parser: AbiParserInterface,
  structs?: AbiStructs,
  enums?: AbiEnums
): BigNumberish | ParsedStruct | boolean | any[] | CairoEnum {
  if (element.type === '()') {
    return {};
  }
  // type uint256 struct (c1v2)
  if (CairoUint256.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }
  // type uint512 struct
  if (CairoUint512.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }
  // type ByteArray struct
  if (CairoByteArray.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }

  // type fixed-array
  if (CairoFixedArray.isTypeFixedArray(element.type)) {
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el: AbiEntry = { name: '', type: CairoFixedArray.getFixedArrayType(element.type) };
    const arraySize = CairoFixedArray.getFixedArraySize(element.type);
    while (parsedDataArr.length < arraySize) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }

  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el: AbiEntry = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }

  // type NonZero
  if (isTypeNonZero(element.type)) {
    // eslint-disable-next-line no-case-declarations
    // const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el: AbiEntry = { name: '', type: getArrayType(element.type) };
    // parsedDataArr.push();
    return parseResponseValue(responseIterator, el, parser, structs, enums);
  }

  // type struct
  if (structs && element.type in structs && structs[element.type]) {
    if (isTypeEthAddress(element.type)) {
      return parseBaseTypes(element.type, responseIterator, parser);
    }
    return structs[element.type].members.reduce((acc, el) => {
      acc[el.name] = parseResponseValue(responseIterator, el, parser, structs, enums);
      return acc;
    }, {} as any);
  }

  // type Enum (only CustomEnum)
  if (enums && element.type in enums && enums[element.type]) {
    const variantNum: number = Number(responseIterator.next().value); // get variant number
    const rawEnum = enums[element.type].variants.reduce((acc, variant, num) => {
      if (num === variantNum) {
        acc[variant.name] = parseResponseValue(
          responseIterator,
          { name: '', type: variant.type },
          parser,
          structs,
          enums
        );
        return acc;
      }
      acc[variant.name] = undefined;
      return acc;
    }, {} as CairoEnumRaw);
    // Option
    if (element.type.startsWith('core::option::Option')) {
      const content = variantNum === CairoOptionVariant.Some ? rawEnum.Some : undefined;
      return new CairoOption<Object>(variantNum, content);
    }
    // Result
    if (element.type.startsWith('core::result::Result')) {
      let content: Object;
      if (variantNum === CairoResultVariant.Ok) {
        content = rawEnum.Ok;
      } else {
        content = rawEnum.Err;
      }
      return new CairoResult<Object, Object>(variantNum, content);
    }
    // Cairo custom Enum
    const customEnum = new CairoCustomEnum(rawEnum);
    return customEnum;
  }

  // type tuple
  if (isTypeTuple(element.type)) {
    const memberTypes = extractTupleMemberTypes(element.type);
    return memberTypes.reduce((acc, it: any, idx) => {
      const name = it?.name ? it.name : idx;
      const type = it?.type ? it.type : it;
      const el = { name, type };
      acc[name] = parseResponseValue(responseIterator, el, parser, structs, enums);
      return acc;
    }, {} as any);
  }

  // TODO: duplicated, investigate why and what was an issue then de-duplicate
  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }

  // base type
  return parseBaseTypes(element.type, responseIterator, parser);
}

/**
 * Parse elements of the response and structuring them into one field by using output property from the abi for that method
 *
 * @param responseIterator - iterator of the response
 * @param output - output(field) information from the abi that will be used to parse the data
 * @param structs - structs from abi
 * @param parsedResult
 * @return - parsed response corresponding to the abi structure of the field
 */
export default function responseParser({
  responseIterator,
  output,
  structs,
  enums,
  parsedResult,
  parser,
}: {
  responseIterator: Iterator<string>;
  output: AbiEntry | EventEntry;
  structs: AbiStructs;
  enums: AbiEnums;
  parsedResult?: Args | ParsedStruct;
  parser: AbiParserInterface;
}): any {
  const { name, type } = output;
  let temp;

  switch (true) {
    case isLen(name):
      temp = responseIterator.next().value;
      return BigInt(temp);

    case (structs && type in structs) || isTypeTuple(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);

    case enums && isTypeEnum(type, enums):
      return parseResponseValue(responseIterator, output, parser, structs, enums);

    case CairoFixedArray.isTypeFixedArray(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);

    case isTypeArray(type):
      // C1 Array
      if (isCairo1Type(type)) {
        return parseResponseValue(responseIterator, output, parser, structs, enums);
      }
      // C0 Array
      // eslint-disable-next-line no-case-declarations
      const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
      if (parsedResult && parsedResult[`${name}_len`]) {
        const arrLen = parsedResult[`${name}_len`] as number;
        while (parsedDataArr.length < arrLen) {
          parsedDataArr.push(
            parseResponseValue(
              responseIterator,
              { name, type: output.type.replace('*', '') },
              parser,
              structs,
              enums
            )
          );
        }
      }
      return parsedDataArr;

    case isTypeNonZero(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);

    default:
      return parseBaseTypes(type, responseIterator, parser);
  }
}
