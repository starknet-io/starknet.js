import { AbiEntry, AbiStructs, Args, ParsedStruct } from '../../types';
import { BigNumberish } from '../num';
import { isCairo1Type, isLen, isTypeArray, isTypeBool, isTypeTuple } from './cairo';
import extractTupleMemberTypes from './tuple';

/**
 * Parse of the response elements that are converted to Object (Struct) by using the abi
 *
 * @param responseIterator - iterator of the response
 * @param type - type of the struct
 * @param structs - structs from abi
 * @return {BigNumberish | ParsedStruct} - parsed arguments in format that contract is expecting
 */
function parseResponseStruct(
  responseIterator: Iterator<string>,
  type: string,
  structs: AbiStructs
): BigNumberish | ParsedStruct {
  // type struct
  if (type in structs && structs[type]) {
    return structs[type].members.reduce((acc, el) => {
      acc[el.name] = parseResponseStruct(responseIterator, el.type, structs);
      return acc;
    }, {} as any);
  }
  // type tuple
  if (isTypeTuple(type)) {
    const memberTypes = extractTupleMemberTypes(type);
    return memberTypes.reduce((acc, it: any, idx) => {
      const tName = it?.name ? it.name : idx;
      const tType = it?.type ? it.type : it;
      acc[tName] = parseResponseStruct(responseIterator, tType, structs);
      return acc;
    }, {} as any);
  }
  const temp = responseIterator.next().value;
  return BigInt(temp);
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
    case isTypeBool(type):
      temp = responseIterator.next().value;
      return Boolean(BigInt(temp));
    case isTypeArray(type):
      // eslint-disable-next-line no-case-declarations
      const parsedDataArr: (BigNumberish | ParsedStruct)[] = [];

      // Cairo 1 Array
      if (isCairo1Type(type)) {
        responseIterator.next(); // skip length
        let it = responseIterator.next();

        while (!it.done) {
          parsedDataArr.push(BigInt(it.value));
          it = responseIterator.next();
        }
        return parsedDataArr;
      }

      if (parsedResult && parsedResult[`${name}_len`]) {
        const arrLen = parsedResult[`${name}_len`] as number;
        while (parsedDataArr.length < arrLen) {
          parsedDataArr.push(
            parseResponseStruct(responseIterator, output.type.replace('*', ''), structs)
          );
        }
      }
      return parsedDataArr;
    case type in structs || isTypeTuple(type):
      return parseResponseStruct(responseIterator, type, structs);
    default:
      temp = responseIterator.next().value;
      return BigInt(temp);
  }
}
