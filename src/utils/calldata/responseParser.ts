/* eslint-disable no-case-declarations */
import { AbiEntry, AbiStructs, Args, ParsedStruct } from '../../types';
import { BigNumberish } from '../num';
import { uint256ToBN } from '../uint256';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeBool,
  isTypeTuple,
  isTypeUint256,
} from './cairo';
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
  structs: AbiStructs
): BigNumberish | ParsedStruct | boolean | any[] {
  // type struct
  if (element.type in structs && structs[element.type]) {
    return structs[element.type].members.reduce((acc, el) => {
      acc[el.name] = parseResponseValue(responseIterator, el, structs);
      return acc;
    }, {} as any);
  }

  // type tuple
  if (isTypeTuple(element.type)) {
    const memberTypes = extractTupleMemberTypes(element.type);
    return memberTypes.reduce((acc, it: any, idx) => {
      const name = it?.name ? it.name : idx;
      const type = it?.type ? it.type : it;
      const el = { name, type };
      acc[name] = parseResponseValue(responseIterator, el, structs);
      return acc;
    }, {} as any);
  }

  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[])[] = [];
    const el = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, structs));
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
  output: AbiEntry,
  structs: AbiStructs,
  parsedResult?: Args
): any {
  const { name, type } = output;
  let temp;

  switch (true) {
    case isLen(name):
      temp = responseIterator.next().value;
      return BigInt(temp);

    case type in structs || isTypeTuple(type):
      return parseResponseValue(responseIterator, output, structs);

    case isTypeArray(type):
      // C1 Array
      if (isCairo1Type(type)) {
        return parseResponseValue(responseIterator, output, structs);
      }
      // C0 Array
      // eslint-disable-next-line no-case-declarations
      const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[])[] = [];
      if (parsedResult && parsedResult[`${name}_len`]) {
        const arrLen = parsedResult[`${name}_len`] as number;
        while (parsedDataArr.length < arrLen) {
          parsedDataArr.push(
            parseResponseValue(
              responseIterator,
              { name, type: output.type.replace('*', '') },
              structs
            )
          );
        }
      }
      return parsedDataArr;

    default:
      return parseBaseTypes(type, responseIterator);
  }
}
