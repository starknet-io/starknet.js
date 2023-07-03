import { AbiEntry, AbiStructs, BigNumberish, ParsedStruct, Tupled, Uint256 } from '../../types';
import { isText, splitLongString } from '../shortString';
import {
  felt,
  getArrayType,
  isTypeArray,
  isTypeStruct,
  isTypeTuple,
  isTypeUint256,
  uint256,
} from './cairo';
import extractTupleMemberTypes from './tuple';

/**
 * parse base types
 * @param type type from abi
 * @param val value provided
 * @returns string | string[]
 */
function parseBaseTypes(type: string, val: BigNumberish) {
  switch (true) {
    case isTypeUint256(type):
      // eslint-disable-next-line no-case-declarations
      const el_uint256 = uint256(val);
      return [felt(el_uint256.low), felt(el_uint256.high)];
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

function parseUint256(element: object | BigNumberish) {
  if (typeof element === 'object') {
    const { low, high } = element as Uint256;
    return [felt(low as BigNumberish), felt(high as BigNumberish)];
  }
  const el_uint256 = uint256(element);
  return [felt(el_uint256.low), felt(el_uint256.high)];
}

/**
 * Deep parse of the object that has been passed to the method
 *
 * @param element - element that needs to be parsed
 * @param type  - name of the method
 * @param structs - structs from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 */
function parseCalldataValue(
  element: ParsedStruct | BigNumberish | BigNumberish[],
  type: string,
  structs: AbiStructs
): string | string[] {
  if (element === undefined) {
    throw Error(`Missing parameter for type ${type}`);
  }

  // value is Array
  if (Array.isArray(element)) {
    const result: string[] = [];
    result.push(felt(element.length)); // Add length to array
    const arrayType = getArrayType(type);

    return element.reduce((acc, it) => {
      return acc.concat(parseCalldataValue(it, arrayType, structs));
    }, result);
  }

  // checking if the passed element is struct
  if (structs[type] && structs[type].members.length) {
    if (isTypeUint256(type)) {
      return parseUint256(element);
    }

    const { members } = structs[type];
    const subElement = element as any;

    return members.reduce((acc, it: AbiEntry) => {
      return acc.concat(parseCalldataValue(subElement[it.name], it.type, structs));
    }, [] as string[]);
  }
  // check if abi element is tuple
  if (isTypeTuple(type)) {
    const tupled = parseTuple(element as object, type);

    return tupled.reduce((acc, it: Tupled) => {
      const parsedData = parseCalldataValue(it.element, it.type, structs);
      return acc.concat(parsedData);
    }, [] as string[]);
  }
  // check if u256 C1v0
  if (isTypeUint256(type)) {
    return parseUint256(element);
  }
  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return parseBaseTypes(type, element);
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @param argsIterator - Iterator<any> for value of the field
 * @param input  - input(field) information from the abi that will be used to parse the data
 * @param structs - structs from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 */
export function parseCalldataField(
  argsIterator: Iterator<any>,
  input: AbiEntry,
  structs: AbiStructs
): string | string[] {
  const { name, type } = input;
  let { value } = argsIterator.next();

  switch (true) {
    // Array
    case isTypeArray(type):
      if (!Array.isArray(value) && !isText(value)) {
        throw Error(`ABI expected parameter ${name} to be array or long string, got ${value}`);
      }
      if (typeof value === 'string') {
        // long string match cairo felt*
        value = splitLongString(value);
      }
      return parseCalldataValue(value, input.type, structs);

    // Struct or Tuple
    case isTypeStruct(type, structs) || isTypeTuple(type) || isTypeUint256(type):
      return parseCalldataValue(value as ParsedStruct | BigNumberish[], type, structs);

    // Felt or unhandled
    default:
      return parseBaseTypes(type, value);
  }
}
