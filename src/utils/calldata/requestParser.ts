import { AbiEntry, AbiStructs, ParsedStruct, Tupled } from '../../types';
import { BigNumberish } from '../num';
import { isText, splitLongString } from '../shortString';
import { felt, isTypeArray, isTypeFeltArray, isTypeStruct, isTypeTuple } from './cairo';
import extractTupleMemberTypes from './tuple';

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
  if (Array.isArray(element)) {
    throw Error(`Array inside array (nD) are not supported by cairo. Element: ${element} ${type}`);
  }
  // checking if the passed element is struct
  if (structs[type] && structs[type].members.length) {
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
  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return felt(element as BigNumberish);
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
      // eslint-disable-next-line no-case-declarations
      const result: string[] = [];
      result.push(felt(value.length)); // Add length to array

      return (value as (BigNumberish | ParsedStruct)[]).reduce((acc, el) => {
        if (isTypeFeltArray(type)) {
          acc.push(felt(el as BigNumberish));
        } else {
          // structure or tuple
          acc.push(...parseCalldataValue(el, type.replace('*', ''), structs));
        }
        return acc;
      }, result);
    // Struct or Tuple
    case isTypeStruct(type, structs) || isTypeTuple(type):
      return parseCalldataValue(value as ParsedStruct | BigNumberish[], type, structs);
    // Felt or unhandled
    default:
      return felt(value as BigNumberish);
  }
}
