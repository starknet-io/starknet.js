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
import { uint256ToBN } from '../uint256';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeBool,
  isTypeEnum,
  isTypeTuple,
  isTypeUint256,
} from './cairo';
import {
  CairoCustomEnum,
  CairoEnumRaw,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import extractTupleMemberTypes from './tuple';

/**
 * Parse base types
 * @param type type of element
 * @param it iterator
 * @returns bigint | boolean
 */
function parseBaseTypes(type: string, it: Iterator<string>) {
  let temp;
  switch (true) {
    case isTypeBool(type):
      temp = it.next().value;
      return Boolean(BigInt(temp));
    case isTypeUint256(type):
      const low = it.next().value;
      const high = it.next().value;
      return uint256ToBN({ low, high });
    case type === 'core::starknet::eth_address::EthAddress':
      temp = it.next().value;
      return BigInt(temp);
    default:
      temp = it.next().value;
      return BigInt(temp);
  }
}

/**
 * Parse of the response elements that are converted to Object (Struct) by using the abi
 *
 * @param responseIterator - iterator of the response
 * @param element - element of the field {name: string, type: string}
 * @param structs - structs from abi
 * @return {any} - parsed arguments in format that contract is expecting
 */
function parseResponseValue(
  responseIterator: Iterator<string>,
  element: { name: string; type: string },
  structs?: AbiStructs,
  enums?: AbiEnums
): BigNumberish | ParsedStruct | boolean | any[] | CairoEnum {
  if (element.type === '()') {
    return {};
  }
  // type uint256 struct (c1v2)
  if (isTypeUint256(element.type)) {
    const low = responseIterator.next().value;
    const high = responseIterator.next().value;
    return uint256ToBN({ low, high });
  }

  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el: AbiEntry = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, structs, enums));
    }
    return parsedDataArr;
  }

  // type struct
  if (structs && element.type in structs && structs[element.type]) {
    if (element.type === 'core::starknet::eth_address::EthAddress') {
      return parseBaseTypes(element.type, responseIterator);
    }
    return structs[element.type].members.reduce((acc, el) => {
      acc[el.name] = parseResponseValue(responseIterator, el, structs, enums);
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
      acc[name] = parseResponseValue(responseIterator, el, structs, enums);
      return acc;
    }, {} as any);
  }

  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[] | CairoEnum)[] = [];
    const el = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, structs, enums));
    }
    return parsedDataArr;
  }

  // base type
  return parseBaseTypes(element.type, responseIterator);
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
export default function responseParser(
  responseIterator: Iterator<string>,
  output: AbiEntry | EventEntry,
  structs?: AbiStructs,
  enums?: AbiEnums,
  parsedResult?: Args | ParsedStruct
): any {
  const { name, type } = output;
  let temp;

  switch (true) {
    case isLen(name):
      temp = responseIterator.next().value;
      return BigInt(temp);

    case (structs && type in structs) || isTypeTuple(type):
      return parseResponseValue(responseIterator, output, structs, enums);

    case enums && isTypeEnum(type, enums):
      return parseResponseValue(responseIterator, output, structs, enums);

    case isTypeArray(type):
      // C1 Array
      if (isCairo1Type(type)) {
        return parseResponseValue(responseIterator, output, structs, enums);
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
              structs,
              enums
            )
          );
        }
      }
      return parsedDataArr;

    default:
      return parseBaseTypes(type, responseIterator);
  }
}
